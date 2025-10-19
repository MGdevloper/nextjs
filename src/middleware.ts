import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"
import dbConnect from "./dbconnection/dbconnect.mjs";
import usersmodel from "./model/user.model.mjs";

await dbConnect()

export async function middleware(req: NextRequest) {

    let path = req.nextUrl.pathname



    let token = req.cookies.get("token")?.value || ""

    if (path.startsWith("/profile")) {



        if (token == "") return NextResponse.redirect(new URL("/Login", req.nextUrl))
        else {
            try {



                let data = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET))
                let { email } = data.payload

                let res = await usersmodel.findOne({ email })
                console.log(res);


                if (res.verifyed == false) {
                    return NextResponse.redirect(new URL("/verify", req.nextUrl))


                }


                // return NextResponse.redirect(new URL("/profile", req.nextUrl))





            }

            catch (err) {
                console.log("error", err);
                let res = NextResponse.redirect(new URL("/Login", req.nextUrl))
                // res.cookies.delete("token")
                return res;


            }
        }
    }


    if (path == "/Login") {
        console.log("in login");

        if (token != "") {
            try {
                let res = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET))
                if (res) {
                    console.log(res);
                    return NextResponse.redirect(new URL("/profile", req.nextUrl))

                }
            }
            catch (err) {
                return NextResponse.redirect(new URL("/Login", req.nextUrl))
            }
        }
    }

    if (path == "/verify") {
        let data = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET))
        let { email } = data.payload

        let res = await usersmodel.findOne({ email })
        console.log(res);


        if (res.verifyed == true) {
            return NextResponse.redirect(new URL("/profile", req.nextUrl))


        }


    }


    return NextResponse.next()

}


export const config = {
    matcher: ["/", "/Login", "/Signup", "/profile/:path*", "/verify/:token*"],
    runtime: "nodejs"
}