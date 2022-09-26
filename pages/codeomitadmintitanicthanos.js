import React, { useState } from 'react'
import dashcss from '../styles/Dashboard.module.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import Router from 'next/router'
import Swal from 'sweetalert2';
function Codeomitadminlogin() {
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const sigin=()=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    console.log(userCredential); 
    // alert("login");
    Router.push('/codeomitwebsiteadimndetaileddashboard')
    // ...
  })
  .catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Sorry error",errorMessage);
  });
  }
  return (
    <div className={dashcss.loginbox}>
      <div className={dashcss.loginmini}>
      <h1>Log in</h1>
      <div className={dashcss.logininput}>
      <input type="email" id="cName" name="name" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"/>
      <input type="password" id="cName" name="name" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>
      <button onClick={sigin}>Signin</button>
      </div>

      </div>
    </div>
  )
}

export default Codeomitadminlogin