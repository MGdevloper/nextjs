import { NextRequest, NextResponse } from "next/server";

import usersmodel from "@/model/user.model.mjs"
import bcrypt from "bcryptjs";
import dbConnect from "@/dbconnection/dbconnect.mjs";
import emailtransfer from "@/helpercomponeneta/mailtransfer";

dbConnect();

export async function POST(Req: NextRequest) {


    const { username, email, password } = await Req.json();
    // console.log();

    const user = await usersmodel.findOne({ username: username });
    console.log(user);

    if (username == "" || email == "" || password == "") {
        return NextResponse.json({ message: "All fields are required" });
    }
    if (user) {
        console.log("user already exists");

        return NextResponse.json({ message: "user already exists" })
    }
    else {
        console.log("else part");

        try {

            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt);

            const newuser = new usersmodel({
                username: username,
                email: email,
                password: hash
            })

            await newuser.save()
            console.log(newuser);
            let { email:any, _id } = newuser
            await emailtransfer({email,emailtype:"VERIFY",userid:_id})
            return NextResponse.json({ message: "User created successfully" });
        }
        catch (error: any) {
            console.log(error.message);


            return NextResponse.json({ message: "Error creating user", error: error.message });
        }
    }


}
