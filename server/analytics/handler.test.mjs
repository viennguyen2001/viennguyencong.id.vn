import test from "node:test";
import assert from "node:assert/strict";
import {createHandler} from "./handler.mjs";
function setup(overrides={}) {
  let calls=0, clock=100000;
  const handler=createHandler({
    verifyToken:async token=>{if(token==="bad")throw Error();return {uid:token};},
    runReport:async()=>{calls++;return {rows:[]};},
    allowedUids:new Set(["admin"]),propertyId:"428241957",origin:"https://viennguyencong.id.vn",
    now:()=>clock,...overrides
  });
  const request=async({token="admin",origin="https://viennguyencong.id.vn",url="/reports?days=30",method="GET"}={})=>{
    const headers={origin,...(token?{authorization:`Bearer ${token}`}:{})};
    let result;
    await handler({headers,url,method},{setHeader(){},set statusCode(v){this.code=v},end(body){result={status:this.code,body:body?JSON.parse(body):null}}});
    return result;
  };
  return {request,calls:()=>calls,advance:()=>clock+=61000};
}
test("rejects unauthenticated, expired, non-admin and cross-origin access before reports",async()=>{
  const s=setup();
  for(const [opts,code] of [[{token:null},401],[{token:"bad"},401],[{token:"other"},403],[{origin:"https://evil.example"},403]])assert.equal((await s.request(opts)).status,code);
  assert.equal(s.calls(),0);
});
test("serves six reports, caches only after auth, validates range and refreshes after 60s",async()=>{
  const s=setup();const first=await s.request();
  assert.equal(first.status,200);assert.equal(first.body.reports.length,6);assert.equal(s.calls(),6);
  await s.request();assert.equal(s.calls(),6);
  assert.equal((await s.request({token:"other"})).status,403);
  assert.equal((await s.request({url:"/reports?days=999"})).status,400);
  s.advance();await s.request();assert.equal(s.calls(),12);
});
test("partial errors return null, total failure returns 502",async()=>{
  let n=0;const s=setup({runReport:async()=>{if(n++===0)throw Error();return {rows:[]}}});
  assert.equal((await s.request()).body.reports[0],null);
  const failed=setup({runReport:async()=>{throw Error("secret error")}});
  const result=await failed.request();assert.equal(result.status,502);
  assert(!JSON.stringify(result).includes("secret error"));
});
