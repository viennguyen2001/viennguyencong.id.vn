import http from "node:http";
import {initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
import {GoogleAuth} from "google-auth-library";
import {createHandler} from "./handler.mjs";

const firebaseApp=initializeApp({projectId:process.env.FIREBASE_PROJECT_ID||"vien-portfolio"});
const auth=new GoogleAuth({scopes:["https://www.googleapis.com/auth/analytics.readonly"]});
const client=await auth.getClient();
const handler=createHandler({
  verifyToken:token=>getAuth(firebaseApp).verifyIdToken(token,true),
  allowedUids:new Set((process.env.ADMIN_UIDS||"").split(",").map(s=>s.trim()).filter(Boolean)),
  propertyId:process.env.GA_PROPERTY_ID||"428241957",
  origin:process.env.DASHBOARD_ORIGIN||"https://viennguyencong.id.vn",
  runReport:async(property,method,data)=>{
    const response=await client.request({
      url:`https://analyticsdata.googleapis.com/v1beta/properties/${property}:${method}`,
      method:"POST",data,timeout:20000
    });
    // Only report data returns to the dashboard; Google credentials never do.
    return response.data;
  }
});
http.createServer((req,res)=>handler(req,res).catch(()=>{
  if(!res.headersSent){res.statusCode=500;res.setHeader("Content-Type","application/json");}
  res.end(JSON.stringify({error:"Internal error"}));
})).listen(Number(process.env.PORT)||8080,"0.0.0.0");
