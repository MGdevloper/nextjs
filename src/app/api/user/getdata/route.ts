import { NextRequest,NextResponse } from "next/server";
import jwt  from "jsonwebtoken";
import { jwtVerify } from "jose";
export async function POST(req:NextRequest){
    let token:any=req.cookies.get("token")?.value
    
    let data:any=await jwtVerify(token,new TextEncoder().encode(process.env.TOKEN_SECRET))
    let id=(data.payload.id);
    
    return NextResponse.json({id:id});
}