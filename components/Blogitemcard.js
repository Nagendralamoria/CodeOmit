import Link from 'next/link'
import React from 'react'
import mainpagecss from '../styles/Home.module.css'
import {AiFillDelete} from 'react-icons/ai'
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from '../firebase';
import { toast } from 'react-toastify';
import {  ref, deleteObject } from "firebase/storage";
import Swal from 'sweetalert2';

function Blogitemcard(props) {

      const desertRef = ref(storage,`${props.imageref}` );
    
     const deleteitem=(Id)=>{
      deleteObject(desertRef)
        .then(()=>{
          deleteDoc(doc(db,"blogs",`${Id}`)).then(()=>{
            Swal.fire({
                   
              icon: "success",
              title: "Component Deleted",
            }).then(()=>{
              window.location.reload();
            });
          })
          
        }) .catch(()=>{
            toast.error('Error in deletion', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        })
      }
      return (
       
        <div className={mainpagecss.itemcard}>
             <Link href={`edititem/${props.Id}`}>
        <img src={props.imageref} alt='new'/>
        </Link>
        <div className={mainpagecss.ediitemrow}>
        <h3>{props.name}</h3>
        <AiFillDelete onClick={()=>{deleteitem(props.Id)}} className={mainpagecss.edititemdelete}></AiFillDelete>
            </div>
    </div>
      )
    }
    


export default Blogitemcard