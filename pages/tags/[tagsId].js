import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Searchcard from '../../components/Itemcard'
import { db } from '../../firebase';
import Navbar from '../../components/Navbar'
import Fuse from 'fuse.js';
import Searchpagecss from '../../styles/Tagspage.module.css'
import { async } from '@firebase/util';
import Searchbar from '../../components/Searchbar';
import Footer from '../../components/Footer';
import Skeletongrey from '../../components/Skeletongrey';
function TagsId() {
  const router = useRouter();
  const r = router.query.tagsId;
  const [querydata,setQueryData]=useState([]);
  const [searchdata,setSearchData]=useState();
  const [componentscode,setComponentcode]=useState([]);
  const componentsCollectionRef = collection(db,"componentscode");
 const [loadingpage,setLoadingPage]=useState(false);
  const fuse = new Fuse(componentscode, {
    keys: ['name', 'compinst']
})

  useEffect(()=>{

    const getComponents = async()=>{
      const data = await getDocs(componentsCollectionRef);
      await setComponentcode(data.docs.map((doc)=>({
        ...doc.data()
      })
      ))
      setLoadingPage(true);
    };
   
    getComponents();
     
  },[])
   useEffect(()=>{
    // console.log("asdasdsad",componentscode);
    
    const getSearchedData = async()=>{
      const res = await(fuse.search(`${searchdata}`));
      await setQueryData(res); 
    
    } 
    setSearchData(router.query.tagsId);
    getSearchedData();
   },[componentscode,searchdata,r])

  // useEffect(()=>{
  //   const getSearchedData = async()=>{
  //     const res = await(fuse.search(`${ searchdata}`));
  //     await setQueryData(res); 
    
  //   } 
  //   getSearchedData();
  // },[searchdata])
       
  return (

    <>
   
    <div className={Searchpagecss.searchmainbody}>
      <Navbar/>
      <h1>{searchdata}</h1>
    <p>Looking for more such impressive components? <br></br>Browse our search results</p>
      <div className={Searchpagecss.searchinput}>
        <Searchbar data={searchdata} getdata={setSearchData}/>
        </div>
      {loadingpage?<div className={Searchpagecss.cardsgrid}>
      {querydata.map((Componentscod)=>{
        return(
         
          <div key={Componentscod.item.compId}>
               <Searchcard name={Componentscod.item.name} imageref={Componentscod.item.compimage} lang={Componentscod.item.language} code={Componentscod.item.code} Id={Componentscod.item.compId}/>
            </div>
        )
      })}
      </div>:
      <div className={Searchpagecss.cardsgrid}>
        <Skeletongrey/>
        <Skeletongrey/>
        <Skeletongrey/>
        <Skeletongrey/>
        <Skeletongrey/>
        <Skeletongrey/>
        <Skeletongrey/>
        <Skeletongrey/>
        <Skeletongrey/>
        <Skeletongrey/>
        <Skeletongrey/>
        <Skeletongrey/>
        <Skeletongrey/>
        <Skeletongrey/>
        <Skeletongrey/>
        
      </div>
      }

    </div>
    <Footer/>
    </>
  )
}

export default TagsId