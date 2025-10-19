import dbConnect from "@/dbconnection/dbconnect.mjs";
import usersmodel from "@/model/user.model.mjs";
import { NextRequest, NextResponse } from "next/server";

dbConnect()
export async function POST(req: NextRequest) {
    try {

        let { email } = await req.json()
        console.log(email);
        
        let user = await usersmodel.findOne({ email })
        console.log(user);
        
        if (!user) {
            return NextResponse.json({ message: "user not found", result: false })
        }

        return NextResponse.json({ message: "user found", result: true, uid: user._id })

    } catch (error) {
        console.log("error from /checkuser:",error);
        return NextResponse.json({error})
    }
}