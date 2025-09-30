'use client'

import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center w-full h-[100vh] bg-[rgba(10,10,10,1)] gap-10 font-semibold ">

        <Link href={"/Login"}>
          <div className="login active:scale-95 hover:scale-105 hover:cursor-pointer flex justify-center items-center rounded-full">
            Login
          </div>
        </Link>
        <Link href={"/Signup"}>
          <div className="signup active:scale-95  hover:scale-105 hover:cursor-pointer flex justify-center items-center rounded-full">
            Signup
          </div>
        </Link>
      </div>
    </>
  );
}
