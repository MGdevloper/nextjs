import { NextRequest, NextResponse } from "next/server";
import emailtransfer from "@/helpercomponeneta/mailtransfer";
export async function POST(req:NextRequest){
    let{email,uid}=await req.json()

    try {
        let res=await emailtransfer({email,emailtype:"RESETPASS",userid:uid})
        console.log(res);
    
        return NextResponse.json({message:true})
        
        
    } catch (error) {
        return NextResponse.json({message:false,because:error})

    }
}