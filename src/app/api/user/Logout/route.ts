import { NextRequest,NextResponse } from "next/server";
export async function POST(req:NextRequest){
    console.log("post ");
    
    let res= NextResponse.json({message:"logout success"})
    res.cookies.delete("token")

    return res
}