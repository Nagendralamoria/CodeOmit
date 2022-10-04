import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Searchcard from '../../components/Itemcard'
import { db } from '../../firebase';
import Navbar from '../../components/Navbar'
import Fuse from 'fuse.js';
import Searchpagecss from '../../styles/Searchpage.module.css'
import { async } from '@firebase/util';
import Searchbar from '../../components/Searchbar';
function Searchpage() {
  const router = useRouter();
  const [querydata,setQueryData]=useState([]);
  const [searchdata,setSearchData]=useState();
  const [componentscode,setComponentcode]=useState([]);
  const componentsCollectionRef = collection(db,"componentscode");


  const fuse = new Fuse(componentscode, {
    keys: ['name', 'compinst']
})

  useEffect(()=>{

    const getComponents = async()=>{
      const data = await getDocs(componentsCollectionRef);
      await setComponentcode(data.docs.map((doc)=>({
        ...doc.data(),id:doc.compId
      })
      ))
      setSearchData(router.query.search);
    };
   
    getComponents();
     
  },[])
   
  useEffect(()=>{
    const getSearchedData = async()=>{
      const res = await(fuse.search(`${ searchdata}`));
      await setQueryData(res); 
    
    } 
    getSearchedData();
  },[searchdata])
       
  return (
    <div className={Searchpagecss.searchmainbody}>
      <Navbar/>
      <h1>{searchdata}</h1>
      <div className={Searchpagecss.searchinput}>
        <Searchbar data={searchdata} getdata={setSearchData}/>
        </div>
      <div className={Searchpagecss.cardsgrid}>
      {querydata.map((Componentscod)=>{
        return(
         
          <div key={Componentscod.item.compId}>
               <Searchcard name={Componentscod.item.name} imageref={Componentscod.item.compimage} lang={Componentscod.item.language} code={Componentscod.item.code} Id={Componentscod.item.compId}/>
            </div>
        )
      })}
      </div>
    </div>
  )
}

export default Searchpage