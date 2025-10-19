'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
export default function ResetWithToken({ params }: any) {
    const [newPassword, setNewPassword] = useState('')
    const [token, setToken] = useState('')
    async function gettoken() {
        let { token } = await params
        console.log(token);

        setToken(token)
    }
    useEffect(() => {
        gettoken()

    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        
        try {

            let res = await axios.post("/api/user/resetpassword", { token,newPassword})
            console.log(res);

            if(res.data.result==false){
                toast.error("error in changing password")
            }

            else if(res.data.result==true){
                toast.success("password reset successfully")
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-black p-6">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-white">Set a new password</h2>
                        <p className="text-sm text-white/80">Enter your new password for this account.</p>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <label htmlFor="newPassword" className="block">
                            <span className="sr-only">New Password</span>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                placeholder="New password"
                                className="w-full rounded-lg px-4 py-3 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </label>

                        <button
                            type="submit"
                            className="mt-2 w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 shadow-sm"
                        >
                            Set new password
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-white/70">
                        or go back to
                        <a href="/Login" className="text-indigo-300 hover:underline ml-1">Login</a>
                    </div>
                </div>
            </div>
        </div>
    )
}