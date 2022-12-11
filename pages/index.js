
import mainpagecss from '../styles/Home.module.css'
import {GoSearch} from 'react-icons/go'
import Itemcard from '../components/Itemcard'
import Navbar from '../components/Navbar'
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Footer from '../components/Footer';
import Skeletongrey from '../components/Skeletongrey';
import Head from 'next/head';
export default function Home() {
  const [loadingpage,setLoadingPage] = useState(false);
 const[searchedcode,setSearchedCode]=useState([]);

  const [componentscode,setComponentcode]=useState([]);
  const componentsCollectionRef = collection(db,"componentscode");
  const [searchdata,setSearchData]=useState("");
 const senddata =()=>{

     
       if (searchdata=='') {
      
         console.log('nothing');
         // console.log(uid);
         // ...
       } else {
              Router.push(`search/${searchdata}`);
         
       }

   
}
   
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
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // console.log('do validate')
      senddata();
    }
  }

  return (
    <>
    <Navbar/>
    <Head>
        <title>Codeomit</title>
            <meta name="description" content="All the components code you need to create a amazing website at one place. It contains well written, well optimize code in different languages  like React JS, HTML5, Angular....  "  />
            <meta name="keywords" content="Data Structures,Algorithms,UI,UI Design,UX/UI,Figma,Python,Java,C,C++,JavaScript,Android Development,SQL,Data Science,Machine Learning,PHP,Web Development,System Design,Tutorial,Technical Blogs,Interview Experience,Interview Preparation,Programming,Competitive Programming,SDE Sheet,Job-a-thon,Coding Contests,GATE CSE,HTML,CSS,React,NodeJS,Placement,Aptitude,Quiz,Computer Science,Programming Examples,GeeksforGeeks Courses,Puzzles"></meta>
            <meta property="og:title" content="Codeomit" />
            <meta property="og:description" content="All the components code you need to create a amazing website at one place. It contains well written, well optimize code in different languages  like React JS, HTML5, Angular....  " />
            <meta property="og:url" content="https://codeomit.com/" />
            <meta property="og:type" content="website" />
            <link rel="icon" href="/favicon.ico" />
       
      </Head>
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
         {/* <input type="text" onChange={(e)=>{setSearchData(e.target.value)}} placeholder='Search the code </>'/>
          <GoSearch className={mainpagecss.icons} /> */}
             <input type="text" onKeyDown={handleKeyDown} onChange={(e)=>{setSearchData(e.target.value)}} value={searchdata} placeholder='Search the code </>'/>
    <GoSearch className={mainpagecss.icons} onClick={senddata}  />
    </div>
          {/* <Searchbar/> */}
      {loadingpage?
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
     
     </div>:
     <div className={mainpagecss.cardsgrid}> 
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
    
     </div>}
    </div>
   <Footer/>
    </>
  )
}
