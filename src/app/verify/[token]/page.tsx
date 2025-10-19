'use client'

import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-hot-toast"
// import g from "../../api/user/verifytoken"
function verify({ params }: any) {
  let [token, settoken] = useState("")
  let [verifyed, setverifyed] = useState(false)
  async function getToken() {
    let { token } = await params

    token = decodeURIComponent(token)

    try {
     let res= await axios.post(`/api/user/verifytoken`,JSON.stringify(token))
      console.log(res.data);
      
     if(res.data.success==true){
      console.log("if");
      
      setverifyed(true)
     }
     else{
      console.log("else");
      
      toast.error(res.data.message)
     }
     

      
    } catch (error) {

        console.log(error);
        
    }
    settoken(token)
  }

  useEffect(() => {
    console.log("token", token);

  }, [token])

  return (
    <div className="w-full  h-[100vh] bg-[#0a0a0a] text-white flex justify-center items-center flex-col gap-3">
      {verifyed ? <>
        <h2 className="text-white">verifyed✅</h2>

      </> : <>
        <h2 className="text-white">click on verify</h2>

      </>}
      <button onClick={getToken} className="bg-[orange] font-semibold p-2 px-5 rounded-md active:scale-95">Verify</button>
    </div>
  )
}

export default verify