
import React from 'react'

async function Profile({params}: any) {
    let {id}=await params;
  return (
    <div>Profile: {id}</div>
  )
}

export default Profile