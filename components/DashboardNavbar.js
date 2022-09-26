import dashnav from '../styles/DashboardNavbar.module.css'
import {HiHome} from 'react-icons/hi'
import{IoIosLogOut} from 'react-icons/io'
import {IoNotificationsSharp} from 'react-icons/io5'
import { auth } from '../firebase';
import { Router } from 'next/router';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
function DashboardNavbar() {
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
  return (
    <div className={dashnav.main}>
        <HiHome />
        <IoNotificationsSharp/>
        <IoIosLogOut className='iconexit' onClick={sigoutuser}/>
        {/* <button > logOut</button> */}
    </div>
  )
}

export default DashboardNavbar