
import React from 'react'

async function Profile({params}: any) {
    let {id}=await params;
  return (
    <div className='w-full h-[100vh] bg-[black] text-white'>Profile: {id}</div>
    
  )
}

export default Profile