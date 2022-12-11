import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {BiArrowBack} from 'react-icons/bi'
import contactcss from '../styles/Contactus.module.css'
import { db } from '../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import Head from 'next/head';
function Contactus() {
  const [email,setEmail]=useState('');
  const [message,setMessage]=useState('');
  const formshandleSubmit=(e)=>{
    e.preventDefault();
  const docRef = doc(collection(db,"Messages")); 

  setDoc(docRef,{
    messageId:docRef.id,
    email:email,
    message:message
  }).then(()=>{
    Swal.fire({
               
      icon: "success",
      title: "Message Sent",
    });
    setEmail('');
    setMessage('');
  });}
 
  
  const router = useRouter()
  return (
    <>
       <Head>
    <link rel="icon" href="/favicon.ico" />
       
      </Head> 
  
    <div className={contactcss.mainbox} >
      <BiArrowBack className={contactcss.arrow} onClick={() => router.back()}/>
      <div className={contactcss.insidebox}>
        <h1> Lets have a talk</h1>
        <form onSubmit={formshandleSubmit}  method="post" className={contactcss.messageform}>
          <label htmlFor="last">Email:</label>
          <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" id="last" name="last" />
          <label htmlFor="first">Message:</label>
          <textarea onChange={(e)=>{setMessage(e.target.value)}} value={message} id="w3review" name="w3review" rows="4" cols="50"></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>

    </div>
    </>
  )
}

export default Contactus