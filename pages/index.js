
import mainpagecss from '../styles/Home.module.css'
import {GoSearch} from 'react-icons/go'
import Itemcard from '../components/Itemcard'
import Navbar from '../components/Navbar'
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import Image  from 'next/image';
import logo from '../public/Images/4.png'
export default function Home() {
 
  const [componentscode,setComponentcode]=useState([]);
  const componentsCollectionRef = collection(db,"componentscode");
  useEffect(()=>{

    const getComponents = async()=>{
      const data = await getDocs(componentsCollectionRef);
      setComponentcode(data.docs.map((doc)=>({
        ...doc.data(),id:doc.compId
      })));
    };
    getComponents();
  },[]) 
  return (
    <>
    <Navbar/>
    <div className={mainpagecss.homemain}>
     <div className={mainpagecss.homemainhead}>
          <div className={mainpagecss.homemainheadtext}>
              <h1>How we Ease
             Work of Developer </h1>
                <h1>In a Creative Way</h1>
          
              <h3>Awesome free components  for your next project</h3>
          </div>
          {/* <div className={mainpagecss.homemainheadimg}>
          <Image alt="Vercel logo" src={logo}   />
          </div> */}
          
          
     </div>
      <div className={mainpagecss.searchbar}>
         <input type="text" placeholder='Search the code </>'/>
          <GoSearch className={mainpagecss.icons}/>
      </div>
     <div className={mainpagecss.cardsgrid}> 
    {
      componentscode.map((Componentscod)=>{
        return(
          <div key={Componentscod.compId}>
               <Itemcard name={Componentscod.name} imageref={Componentscod.compimage} lang={componentscode.language} code={Componentscod.code} Id={Componentscod.compId}/>
            </div>
        )
      })
    }
     
     </div>
    </div>
    </>
  )
}
