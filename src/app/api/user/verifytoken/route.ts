import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import usersmodel from "@/model/user.model.mjs";
import dbConnect from "@/dbconnection/dbconnect.mjs";
dbConnect()
export async function POST(req: NextRequest) {
    let data: any = await req.json()
    let user=await usersmodel.findOne({ verifytoken: data }).where({ verifytokenexp: { $gt: Date.now() } })
    
    if(!user){
        return NextResponse.json({message:"invalid or expaire token"})
    }
    user.verifyed=true
    user.verifytoken=""
    user.verifytokenexp=""
    await user.save()

    return NextResponse.json({ success: true })

}