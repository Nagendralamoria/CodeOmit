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
import Head from 'next/head';
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
    <Head>
        <title>{searchdata} responsive free code using ReactJS, HTML5, Angular - Codeomit</title>
        <meta name="keywords" content="Data Structures,Algorithms,UI,UI Design,UX/UI,Figma,Python,Java,C,C++,JavaScript,Android Development,SQL,Data Science,Machine Learning,PHP,Web Development,System Design,Tutorial,Technical Blogs,Interview Experience,Interview Preparation,Programming,Competitive Programming,SDE Sheet,Job-a-thon,Coding Contests,GATE CSE,HTML,CSS,React,NodeJS,Placement,Aptitude,Quiz,Computer Science,Programming Examples,GeeksforGeeks Courses,Puzzles"></meta>
        <meta name="description" content={`${searchdata} UI Design with its code in React Js, Angular and HTML 5.`} />
        <meta property="og:title" content={`${searchdata} responsive code using ReactJS, HTML5, Angular - Codeomit`} />
        <meta property="og:description" content={`All the components code you need to create a amazing website at one place. It contains well written, well optimize code in different languages  like React JS, HTML5, Angular.... `} />
        <meta property="og:url" content={`https://codeomit/tags/${searchdata}`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
</Head>
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