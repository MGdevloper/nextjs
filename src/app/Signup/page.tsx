"use client"


import React, { useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    async function handlesubmit() {

        setLoading(true);
        try {

            toast.loading("Loading...")
            let res = await axios.post("/api/user/signup", user)
            toast.dismiss();
            setTimeout(() => {

                setLoading(false);
            }, 2000);
            if (res.data.message == "All fields are required") {

                toast.error("All fields are required")
                return;
            }
            if (res.data.message === "User created successfully") {
                toast.success("User created successfully")
            }
            else if (res.data.message === "user already exists") {
                toast.error("User already exists")
            }
            else if (res.data.message === "Error creating user") {
                toast.error(res.data.error);
            }

        } catch (err:any) {
            console.log(err);
            toast.dismiss();
            toast.error(err.message)
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-black p-6">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-white">Sign up</h2>
                        <br />
                        <p className="text-sm text-white/80">Create an account to continue</p>
                    </div>

                    <form className="flex flex-col gap-4" action="" method="post" noValidate>
                        <label htmlFor="username" className="block">
                            <span className="sr-only">Username</span>
                            <input

                                onChange={(e) => {
                                    setUser({ ...user, username: e.target.value })
                                }}
                                value={user.username}
                                id="username"
                                name="username"
                                type="text"
                                required
                                placeholder="Username"
                                className="w-full rounded-lg px-4 py-3 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </label>

                        <label htmlFor="email" className="block">
                            <span className="sr-only">Email</span>
                            <input

                                onChange={(e) => {
                                    setUser({ ...user, email: e.target.value })
                                }}
                                id="email"
                                name="email"
                                type="email"
                                value={user.email}
                                required
                                placeholder="Email"
                                className="w-full rounded-lg px-4 py-3 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </label>

                        <label htmlFor="password" className="block relative">
                            <span className="sr-only">Password</span>
                            <input

                                onChange={(e) => {
                                    setUser({ ...user, password: e.target.value })
                                }}
                                id="password"
                                name="password"
                                value={user.password}
                                type={showPassword ? 'text' : 'password'}
                                required
                                placeholder="Password"
                                className="w-full rounded-lg px-4 py-3 pr-20 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                aria-pressed={showPassword}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-3 py-1 text-sm bg-white/80 text-neutral-700 hover:bg-white"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </label>

                        <button
                            onClick={async (e) => {
                                e.preventDefault();
                                handlesubmit();
                            }}
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 shadow-sm"
                        >
                            {loading ? 'processing...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-white/70">
                        Do you have an account?
                        <Link href={"/Login"}>
                            <span className='text-indigo-300 hover:underline'> Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup