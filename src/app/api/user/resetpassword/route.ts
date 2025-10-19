import dbConnect from "@/dbconnection/dbconnect.mjs";
import usersmodel from "@/model/user.model.mjs";
import bcrypt from "bcryptjs";
import { NextRequest,NextResponse } from "next/server";

dbConnect()

export async function POST(req:NextRequest){

    let {token,newPassword}:any=await req.json()
    console.log(token,newPassword);
    
    let user= await usersmodel.findOne({forgotpasswordtoken:token}).where({forgotpasswordtokenexp:{$gt:Date.now()}})
  
    if(!user){
        return NextResponse.json({message:"token is invalid or expire",result:false})
    }

    let salt=await bcrypt.genSalt()

    let hash=await bcrypt.hash(newPassword,salt)

    user.password=hash
    user.forgotpasswordtoken=""
    user.forgotpasswordtokenexp=""
    await user.save()

    return NextResponse.json({message:"success",result:true})
    

}