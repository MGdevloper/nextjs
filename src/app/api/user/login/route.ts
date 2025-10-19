import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import usersmodel from "@/model/user.model.mjs"
import bcrypt from "bcryptjs";
import dbConnect from "@/dbconnection/dbconnect.mjs";
import jwt from "jsonwebtoken"

dbConnect();

export async function POST(req: NextRequest) {
	try {
		let { email, password } = await req.json()

		if (email == "" || password == "") {
			return NextResponse.json({ message: "All fields are required" })
		}
		//user exist or not
		//if not then :
		//hash the password and compare yes:Logdnin & store varification token in cookie no:ivalid credentials

		let user = await usersmodel.findOne({ email: email })

		if (!user) {
			return NextResponse.json({ message: "Invalid credentials" })
		}

		let checkpassword = await bcrypt.compare(password, user.password)


		if (checkpassword == false) {
			return NextResponse.json({ message: "Invalid credentials" })
		}

		let payload = {
			id: user._id,
			email: user.email,
			username: user.username

		}
		let token = jwt.sign(payload, process.env.TOKEN_SECRET as string, { expiresIn: "3h" })

		let res = NextResponse.json({ message: "success" })

		res.cookies.set("token", token, { httpOnly: true })

		return res
	} catch (error) {
		console.log(error);
		
		return error
	}
}