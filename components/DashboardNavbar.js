import dashnav from '../styles/DashboardNavbar.module.css'
import {HiHome} from 'react-icons/hi'
import{IoIosLogOut} from 'react-icons/io'
import {IoNotificationsSharp} from 'react-icons/io5'
import { auth, db } from '../firebase';
import { Router } from 'next/router';
import { signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import Messagesbox from './Messagesbox';
function DashboardNavbar() {
  const[datamessage,setDataMessage]=useState([]);
  const componentsCollectionRef = collection(db,"Messages");
  const [notify,setNotify]=useState(false);
  useEffect(()=>{
    const getComponents = async()=>{
      const data = await getDocs(componentsCollectionRef);
      setDataMessage(data.docs.map((doc)=>({
        ...doc.data(),id:doc.compId
      })));
    };
    getComponents();
  },[])
  const sigoutuser=()=>{
  signOut(auth).then(() => {
    // alert("logout done")
    Swal.fire({
               
      icon: "success",
      title: "logged out",
    }).then(()=>{
      window.location.reload();
    });
    Router.push('/codeomitadmintitanicthanos')
  }).catch((error) => {
   
  });

}
const opennotify=()=>setNotify(!notify);

  return (
    <>
    <div className={dashnav.main}>
        <HiHome />
        <IoNotificationsSharp onClick={()=>opennotify()}/>
        <IoIosLogOut className='iconexit' onClick={sigoutuser}/>
        {/* <button > logOut</button> */}
    </div>{notify?(
    <div className={dashnav.opennotifybox}>
       
        {
          datamessage.map((message)=>{
            return(
              <div key={message.email}>
                  <Messagesbox email={message.email} msg={message.message}/>
              </div>
            )
          })
        }
       
    </div>):null}
    </>
  )
}

export default DashboardNavbar