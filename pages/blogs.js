import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Blogscard from '../components/Blogscard'
import blogspagecss from '../styles/Blogshomepage.module.css'
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
function blogs() {
  const [loadingpage,setLoadingPage] = useState(false);
   const [componentscode,setComponentcode]=useState([]);
   const componentsCollectionRef = collection(db,"blogs");
   useEffect(()=>{

    const getComponents = async()=>{
      const data = await getDocs(componentsCollectionRef);
      setLoadingPage(true);
      await setComponentcode(data.docs.map((doc)=>({
        ...doc.data(),id:doc.compId
      })));
      
    };
    getComponents();
  },[]) 
 
  return (
    <>
    <Navbar/>
    <div className={blogspagecss.blogs_home_parent}>
       <div className={blogspagecss.blogs_home_maintexxt}>
          <h1>Blogs</h1>
          <h2>Mindfulls From Our Team</h2>
          <p>Blogs on knowledge about latest industry, projects and all knowledge for your website  </p>
       
       </div>
       <div className={blogspagecss.blogs_card_grid}>
            { 
                    componentscode.map((item) => ( 
                
                         <Blogscard name={item.title} Id={item.compId} key={item.compId} image={item.compimage} inst={item.introduction}/>
                      
                    ))
                
            }
           
       </div>
    </div>
    </>

  )
}

export default blogs