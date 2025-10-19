import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import mailtransfer from '../../../../helpercomponeneta/mailtransfer'
import dbConnect from "@/dbconnection/dbconnect.mjs";

await dbConnect()
export async function POST(req: NextRequest) {
    let token: any = req.cookies.get("token")?.value

    try {
        let paylod = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET))
        console.log("sendemailpaylod", paylod.payload);


        let { email,id } = paylod.payload
        console.log(email,id);
        
        let res = await mailtransfer({ email, emailtype: "VERIFY",userid:id })

        console.log(res);



        return NextResponse.json({ message: paylod.payload })

    }
    catch (err) {
        console.log(err);

        return NextResponse.json({ message:err })

    }
}