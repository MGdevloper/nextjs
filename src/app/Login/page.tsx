"use client"

import React, { useState } from 'react'
import Link from 'next/link';
import axios from 'axios';    
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState({ email: "", password: "" });
  const router = useRouter();
  const [processing,setprocessing]=useState(false)
  async function handlesubmit() {
    setprocessing(true)
    let res;
    try{
      let id=toast.loading("processing...")
      res =await axios.post("/api/user/login", user)
      toast.dismiss(id)
      setTimeout(() => {
        
        setprocessing(false)
      }, 2000);
      console.log("response from login",res.data);
      if(res.data.message=="All fields are required"){
        toast.error("All fields are required")
      }
      if(res.data.message=="Invalid credentials"){
        toast.error("Invalid credentials")
      }

      if(res.data.message=="success"){
        toast.success("Login successful")
        router.push("/profile")
      }
      
    }
    catch(err){
      console.log("error in login",err);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-black p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Login</h2>
            <br />
            <p className="text-sm text-white/80">Sign in to continue to your account</p>
          </div>

          <form className="flex flex-col gap-4" action="" method="post" noValidate>
            <label htmlFor="email" className="block">
              <span className="sr-only">Email</span>
              <input
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value })
                }}
                id="email"
                value={user.email}
                name="email"
                type="email"
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
              onClick={(e) => {
                e.preventDefault();
                handlesubmit();
              }}
              type="submit"
              disabled={processing}
              className="mt-2 w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 shadow-sm"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/70">
            Don't have an account?
            <Link href={"/Signup"}>
              <span className='text-indigo-300 hover:underline'> Sign up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login