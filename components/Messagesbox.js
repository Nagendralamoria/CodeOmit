import React from 'react'
import dashnav from '../styles/DashboardNavbar.module.css';
import {MdDelete} from 'react-icons/md';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
function Messagesbox(props) {
  
  const deleteitem=(Id)=>{
        deleteDoc(doc(db,"Messages",`${Id}`)).then(()=>{
          alert("deleted");
          window.location.reload();
          })
       }
  return (
    <div className={dashnav.messagebody}>
      <h3>{props.email}</h3>
      <p>{props.msg}</p>
      <MdDelete className={dashnav.deleteicon} onClick={()=>{deleteitem(props.id)}}/>
    </div>
  )
}

export default Messagesbox