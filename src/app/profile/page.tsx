"use client"


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

async function logout(router: any) {
  try {
    let tid = toast.loading("logouting..")
    let result = await axios.post("api/user/Logout")
    if (result.data.message == "logout success") {
      toast.dismiss(tid)
      router.push("/Login")
    }
    console.log(result);
  }
  catch (err) {
    console.log(err);

  }


}

async function getdata(setdata: any) {
  let res = await axios.post("api/user/getdata")
  console.log(res.data);

  setdata(res.data.id)

}



function Profile() {
  let [data, setdata] = useState("")

  const router = useRouter();

  return (
    
    <div className='w-full h-[100vh] bg-[black] flex  flex-col gap-3 justify-center items-center  text-white '>
      {
        data ?

          <>
            <Link href={`profile/${data}`}>
              <button className='bg-orange-400 p-2 rounded-md'>click here</button>
            </Link>
          </>

          :
          <>
            <button>click on get data</button>

          </>
      }
      <button

        disabled={data ? true : false}
        onClick={() => getdata(setdata)} className='bg-emerald-400 p-2 rounded-md'>getData</button>
      <button

        onClick={() => logout(router)} className='active:scale-95 bg-blue-600 p-2 rounded-md'>logout</button>
    </div>
  )
}

export default Profile