export function createHandler({verifyToken, runReport, allowedUids, propertyId, origin, now = Date.now}) {
  if (!allowedUids.size || !/^\d+$/.test(propertyId) || !origin) throw Error("Missing server configuration");
  const cache = new Map();
  const pending = new Map();
  async function reports(days) {
    const dateRanges = [{startDate:`${days - 1}daysAgo`,endDate:"today"}];
    const query = (dimensions,metrics,limit) => ({
      dateRanges,dimensions:dimensions.map(name=>({name})),metrics:metrics.map(name=>({name})),
      ...(limit ? {limit,orderBys:[{metric:{metricName:metrics[0]},desc:true}]} : {})
    });
    const requests = [
      ["runReport",query([],["totalUsers","sessions","screenPageViews"])],
      ["runRealtimeReport",{metrics:[{name:"activeUsers"}]}],
      ["runReport",query(["date"],["totalUsers","screenPageViews"])],
      ["runReport",query(["pagePath"],["screenPageViews"],10)],
      ["runReport",query(["sessionDefaultChannelGroup"],["sessions"],8)],
      ["runReport",query(["deviceCategory"],["totalUsers"],8)]
    ];
    const settled = await Promise.allSettled(requests.map(([method,body])=>runReport(propertyId,method,body)));
    if (settled.every(item=>item.status==="rejected")) throw Error("Analytics unavailable");
    return {
      propertyId, days, updatedAt:now(),
      reports:settled.map(item=>item.status==="fulfilled"?item.value:null)
    };
  }
  return async function handler(req,res) {
    res.setHeader("Cache-Control","no-store");
    res.setHeader("Vary","Origin");
    res.setHeader("X-Content-Type-Options","nosniff");
    const reply = (code,body) => { res.statusCode=code; res.setHeader("Content-Type","application/json");res.end(JSON.stringify(body)); };
    if (req.headers.origin && req.headers.origin !== origin) return reply(403,{error:"Origin not allowed"});
    if (req.headers.origin === origin) res.setHeader("Access-Control-Allow-Origin",origin);
    if (req.method==="OPTIONS") {
      res.setHeader("Access-Control-Allow-Methods","GET, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers","Authorization");
      res.statusCode=204; return res.end();
    }
    if (req.method!=="GET") return reply(405,{error:"Method not allowed"});
    const url=new URL(req.url,"http://localhost");
    if(url.pathname!=="/reports") return reply(404,{error:"Not found"});
    const bearer=/^Bearer (\S+)$/.exec(req.headers.authorization||"");
    if(!bearer) return reply(401,{error:"Sign in required"});
    let user;
    try { user=await verifyToken(bearer[1]); } catch { return reply(401,{error:"Invalid or expired session"}); }
    if(!allowedUids.has(user.uid)) return reply(403,{error:"Admin access required"});
    const days=Number(url.searchParams.get("days")||30);
    if(![7,30,90].includes(days)) return reply(400,{error:"Invalid date range"});
    try {
      const saved=cache.get(days);
      if(saved && now()-saved.updatedAt < 60000) return reply(200,saved);
      if(!pending.has(days)) {
        const promise=reports(days).then(data=>{cache.set(days,data);return data;}).finally(()=>pending.delete(days));
        pending.set(days,promise);
      }
      return reply(200,await pending.get(days));
    } catch { return reply(502,{error:"Analytics unavailable. Check service account access and API settings."}); }
  };
}
