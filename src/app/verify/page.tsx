"use client"
import axios from 'axios'
import React, { useState } from 'react'

export default function Verify() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{

        await axios.post("/api/user/sendverificationemail")
    }
    catch(err){
        console.log("error in sending verification email",err);
        
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-black p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Verify your email</h2>
            <p className="text-sm text-white/80">Enter your email to receive a verification link.</p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="email" className="block">
              <span className="sr-only">Email</span>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="w-full rounded-lg px-4 py-3 bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 shadow-sm"
            >
              Send verification email
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/70">
            Back to
            <a href="/Login" className="text-indigo-300 hover:underline ml-1">Login</a>
          </div>
        </div>
      </div>
    </div>
  )
}