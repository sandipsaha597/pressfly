import React from 'react'
import logo from '../../../src/logo.svg'



export default function Account() {
  
  return (
    <div className="account" style={{display: "flex", alignItems: "center"}}>
      <img src={logo} alt="user image" style={{width: "32px"}} />
      <span style={{fontSize: "12px"}} >User Name</span>
      <button type="button">i</button>
    </div>
  )
}
