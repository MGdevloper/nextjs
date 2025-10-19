"use client"
import React, { useState } from 'react'
import emailtransfer from '../../helpercomponeneta/mailtransfer'
import axios from 'axios'
import toast from 'react-hot-toast'
export default function ResetPassword() {
    const [email, setEmail] = useState('')

    const [token, settoken] = useState("")
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-black p-6">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-white">Reset password</h2>
                        <p className="text-sm text-white/80">Enter your email and we'll send reset instructions.</p>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={async (e) => {
                        e.preventDefault();
                        try {

                            let res = await axios.post("/api/user/checkuser", { email })

                            if (res.data.result == false) {
                                toast.error(res.data.message)
                                return new Error("error", res.data.message)

                            }
                            else {


                                let uid = res.data.uid

                                try {
                                    let response = await axios.post("api/user/resetemailsend", { email, uid })
                                    console.log("response", response);

                                    if (response.data.message == true) {
                                        toast.success("reset password link send on email")
                                    }

                                }
                                catch (error: any) {
                                    console.log("error in sending mail", error);
                                    toast.error(error)

                                }
                            }

                        } catch (error: any) {
                            toast.error(error)
                        }

                    }}>
                        <label htmlFor="email" className="block">
                            <span className="sr-only">Email</span>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Email"
                                className="w-full rounded-lg px-4 py-3 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </label>

                        <button
                            type="submit"
                            className="mt-2 w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 shadow-sm"
                        >
                            Send reset link
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-white/70">
                        Remembered your password?
                        <a href="/Login" className="text-indigo-300 hover:underline ml-1">Login</a>
                    </div>
                </div>
            </div>
        </div>
    )
}