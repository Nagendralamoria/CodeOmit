import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { db } from '../../firebase';
import blogsindicss from '../../styles/Blogsindipage.module.css'
function blogsId() {
    const router = useRouter();
    const  itemId  = router.query.blogsId;
    const[loadingpage,setLoadingPage]=useState(false);
    const [componentscode,setComponentcode]=useState([]);
    const [creditsofimage,setCreditsofimages]=useState([]);
    const componentsCollectionRef = doc(db,"blogs",`${itemId}`);
      
      useEffect(()=>{
    
        const getComponents = async()=>{
          const data = await getDoc(componentsCollectionRef);
          console.log(data.data());
          setComponentcode(data.data());
          setLoadingPage(true);
         
      };
      
        getComponents();
      },[itemId])
    //   useEffect(()=>{
    //        setCreditsofimages(componentscode?.codecred);
    //   },[componentscode])
  return (
   <>
   <Navbar/>
    <div className={blogsindicss.blog_indi_parent}>
        <h1>{componentscode?.title}</h1>
        <p>{componentscode?.introduction} </p>
        <img alt='card' src={componentscode?.compimage}/>
        <div className={blogsindicss.blog_indi_textarea}>
            <div className={blogsindicss.blog_indi_suggestedblogs}>
            <img alt='card' src="https://cdn.pixabay.com/photo/2023/01/05/22/35/flower-7700011_960_720.jpg"/>
            <h4>Full Stack Developer</h4>
            </div>
            
            <div className={blogsindicss.blog_indi_textare_line}>
            <p></p>             
            </div>
            <div>
                <p>{componentscode?.codeinst}</p>    </div>
        </div>
    </div>
   </>
  )
}

export default blogsId