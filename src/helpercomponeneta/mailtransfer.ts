import usersmodel from "@/model/user.model.mjs"
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"

import base64url from 'base64url'
const emailtransfer = async ({ email, emailtype, userid }: any) => {
    try {

        let user = await usersmodel.findById(userid)

        console.log({ email, emailtype, userid });
        
        if (!user) {
            throw new Error("user not found!")
        }

        let token = await bcrypt.hash(userid.toString(), 10)

        token=base64url.encode(token)
        
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        const mailoption = {
            from: "gandhimanav91@gmail.com",
            to: email.toString(),
            subject: emailtype == "VERIFY" ? "Verify email" : "Reset password",
            html: emailtype == "VERIFY" ? `<p>click <a href=${process.env.DOMAIN}/verify/${token}>here</a> </br> or copy <div>${process.env.DOMAIN}/verify/${token}</div></p>` : `<p>click <a href=${process.env.DOMAIN}/resetpassword/${token}>here</a> or copy <div>${process.env.DOMAIN}/resetpassword/${token}</div></p>`

        }

        if (emailtype=="VERIFY"){
            user.verifytoken=token
            user.verifytokenexp=Date.now()+3600000
        }

        else if(emailtype=="RESETPASS"){
            user.forgotpasswordtoken=token
            user.forgotpasswordtokenexp=Date.now()+3600000
        }

        await user.save()
        let res = await transporter.sendMail(mailoption)
        
        return res

    } catch (error: any) {
        return error

    }
}

export default emailtransfer;