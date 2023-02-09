
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
import {BiArrowBack} from 'react-icons/bi'
import pagecss from '../../styles/Page.module.css'
import {AiOutlineEye,AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai'
import Itemcard from '../../components/Itemcard'
import {BsCodeSlash} from 'react-icons/bs'
import { CopyBlock, dracula } from 'react-code-blocks';
import Footer from '../../components/Footer';
import Skeletongrey from '../../components/Skeletongrey';
import Imageskeleton from '../../components/Imageskeleton';
import Head from 'next/head';

import Link from 'next/link';
import { async } from '@firebase/util';

function Itempage() {
    const [isActive, setIsActive] = useState(true);
      const[loadingpage,setLoadingPage]=useState(false);
    const [openTab, setOpenTab] = useState(1);
  
     const router = useRouter()
    const  itemId  = router.query.itemId;
    const [componentscode,setComponentcode]=useState([]);
    const [relatedpost,setRelatedPost]=useState([]);
    const [creditsofimage,setCreditsofimages]=useState([]);
    const componentsCollectionRef = doc(db,"componentscode",`${itemId}`);
     
    const credimg = ()=>{
      if(creditsofimage){
      const xyz = creditsofimage.toString().split(",");  
      return (
           xyz.map((ccs)=>{
               return(
                <>  <Link href={ccs} target="_blank">{ccs}</Link> <br></br></>
              
               )
            }) 
        )
          }
    } 
    useEffect(()=>{
  
      const getComponents = async()=>{
        const data = await getDoc(componentsCollectionRef);
        setComponentcode(data.data());
        setLoadingPage(true);
       
    };
    
      getComponents();
    },[itemId])
    useEffect(()=>{
         setCreditsofimages(componentscode.codecred);
    },[componentscode])
  return (
    <>
    <Head>
        <title>{componentscode?.name} - Codeomit</title>
        <meta name="description" content={`${componentscode?.codeinst}`} />
        <meta property="og:title" content={`${componentscode?.name} - Codeomit`} />
        <meta property="og:description" content={`${componentscode?.codeinst}`} />
        <meta property="og:url" content={`https://codeomit/item/${itemId}`} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
</Head>
    <div className={pagecss.pagemain}  >
        <BiArrowBack className={pagecss.backicon} onClick={() => router.back()}/>
        <h2>{componentscode?.nameofcoder}</h2>
        
        <div className={pagecss.designgrid}>
          <div className={pagecss.previewcodebuttonbody}>
          {/* <h2>{componentscode?.name}</h2> */}
            <div className={pagecss.previewcodebutton}>

              <button 
                className={pagecss.previewbutton} 
                style={{
                        backgroundColor: isActive ? 'white' : 'rgb(80, 80, 80)',
                        color: isActive ? 'rgb(80, 80, 80)' : 'white',
                }}
                onClick={()=>setIsActive(true)}
              >
                <AiOutlineEye style={{fontSize:'20px'}}/><h4>Preview</h4>
              </button>
              <button 
                  className={pagecss.previewbutton} 
                  style={{
                    backgroundColor: isActive ? 'rgb(80, 80, 80)' : 'white',
                  color: isActive ? 'white' : 'rgb(80, 80, 80)',
                  }}
                  onClick={()=>setIsActive(false)} >
                    <BsCodeSlash style={{fontSize:'20px'}}/>
                    <h4>Code</h4></button>
          </div>
        </div>
          {isActive?(
                 
            <div className={pagecss.designbox} >
                {loadingpage?
                <img src={componentscode?.compimage}/>
                :
                <Imageskeleton />
                }
              </div>
              // <div className={pagecss.zoomin} onClick={()=>{setZoomimg(true)}} >
              //   <MapInteractionCSS>
              //     <img src="https://cdn.dribbble.com/userupload/3068978/file/original-3e939a628d47acf60f57abd54cd28d2d.png?compress=1&resize=1024x768"/>
              //   </MapInteractionCSS>
              // </div>
              ):(
              
                <div className={pagecss.codebox}>
                  <div className={pagecss.codeboxtabs} style={{transition:'2s',}}>
                    <h3 style={{
                        backgroundColor: openTab===1 ? '#282a36':'white',
                        color: openTab===1 ? 'white' : 'rgb(80, 80, 80)',
                }}
                    onClick={()=> {
                      setOpenTab(1);
                    }}
                    >HTML</h3>
                    <h3  style={{
                        backgroundColor: openTab===2 ? '#282a36':'white',
                        color: openTab===2 ? 'white' : 'rgb(80, 80, 80)',
                }}
                    onClick={()=> {
                      setOpenTab(2);
                    }}>React JS</h3>
                    <h3  style={{
                        backgroundColor: openTab===3 ? '#282a36':'white',
                        color: openTab===3 ? 'white' : 'rgb(80, 80, 80)',
                        
                      }}
                    onClick={() => {
                      setOpenTab(3);
                    }}>Angular</h3>
                  </div>
                  <div  style={{
                        display: openTab===1 ? 'block':'none',
                }}>
                      <div className={pagecss.maxheightcontainer}>
                  <CopyBlock  style={{whiteSpace: 'pre-line'}}
            
          language="html"
          text={componentscode?.html}
          codeBlock
          theme={dracula}
          showLineNumbers={true}
          wrapLines
        />
        </div>
        <h2>CSS</h2>
        <div className={pagecss.maxheightcontainer}>
         <CopyBlock  style={{whiteSpace: 'pre-line'}}
            
            language="css"
            text={componentscode?.CSS}
            codeBlock
            theme={dracula}
            showLineNumbers={true}
            wrapLines
          />
          </div>
          
           {componentscode?.JS!=''?
           <> <h2>JS</h2>
           <div className={pagecss.maxheightcontainer}>
         <CopyBlock  style={{whiteSpace: 'pre-line'}}
            
            language="js"
            text={componentscode?.JS}
            codeBlock
            theme={dracula}
            showLineNumbers={true}
            wrapLines
          />
          </div></>:null}
        </div>
        
        <div style={{
                        display: openTab===2 ? 'block':'none',
                   
              }}>
                    <div className={pagecss.maxheightcontainer}>
         <CopyBlock  
          language="jsx"
          text={componentscode?.reactjs}
          codeBlock
          theme={dracula}
          showLineNumbers={false}
        />
        </div>
        <h2>CSS</h2>
        <div className={pagecss.maxheightcontainer}>
         <CopyBlock  
          language="css"
          text={componentscode?.reactcss}
          codeBlock
          theme={dracula}
          showLineNumbers={false}
        />
        </div>
        </div>
        
        <div  style={{
                        display: openTab===3 ? 'block':'none',
                }}>
                  <div className={pagecss.maxheightcontainer}>
         <CopyBlock 
          language="html"
          text={componentscode?.angularHtml}
          codeBlock
                
          theme={dracula}
          showLineNumbers={true}
        />
        </div>
         <h2>CSS</h2>
         <div className={pagecss.maxheightcontainer}>
         <CopyBlock  style={{whiteSpace: 'pre-line'}}
            language="css"
            text={componentscode?.angularCss}
            codeBlock
            theme={dracula}
            showLineNumbers={true}
            wrapLines
          />
          </div>
          {componentscode?.JS!=''?<>
           <h2>TS</h2>
           <div className={pagecss.maxheightcontainer}>
         <CopyBlock className={pagecss.maxheightcontainer} style={{whiteSpace: 'pre-line',
         }}
            language="js"
            text={componentscode?.angularJs}
            codeBlock
            theme={dracula}
            showLineNumbers={true}
            wrapLines

          />
        </div>
        </>:null}
        </div>
                </div>
              )}
              <h1>{componentscode?.titlename}</h1>
              
              <div className={pagecss.pagetext}>
              <h2>Introduction</h2>
              <p>
                {componentscode?.codeinst}
              </p>
           
            
              <h2>{componentscode?.name} using HTML/CSS</h2>
              
             <div className={pagecss.miniblogdivs}>
             <h3>Step 1: Create Files</h3>
              <p>The first step is to create two files: an HTML file and a CSS file or if you already have a project file and looking for component you can skip these step. The HTML file should be named index.html and the CSS file should be named style.css these are the first criteria for creating a {componentscode?.name}. </p>
              
              <h3>Step 2: Insert the Code</h3>
              <p>Once you have created the files, insert the provided codes into each file and place the flip card code on assumed place. The HTML code should go into index.html and the CSS code should go into style.css.</p>
              
              <h3>Step 3: Link the CSS File</h3>
              <p>In order for the {componentscode?.name} to work properly, you must link the CSS file to the HTML file.To do this, insert the below code before the title tag.</p>
              <CopyBlock  style={{whiteSpace: 'pre-line'}}
            
          language="html"
          text={`<link rel="stylesheet" href="style.css"> `}
          codeBlock
          theme={dracula}
          showLineNumbers={true}
          wrapLines
        />
             </div>

              <h2>How To Create {componentscode?.name} Components in React.</h2>
              <p>Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML.
To create a {componentscode?.name} component we requires a project file. If you have a project file you can skip the first step.</p>
<div className={pagecss.miniblogdivs}>
              <h3>Step 1: Create a New React app using:</h3>
              <p>Run this command in VS Code terminal.</p>
              <CopyBlock  style={{whiteSpace: 'pre-line'}}
            
          language="js"
          text={`npx create-react-app my-app 
cd my-app
npm start`}
          codeBlock
          theme={dracula}
          showLineNumbers={true}
          wrapLines
        />
        <h3>Step 2: Create the Component</h3>
        <p>To do this, create a new file in the src/ components directory called {componentscode?.name}.js. In this file, you’ll need to import the {componentscode?.name} code at the top and then create a class component called {componentscode?.name}. Within the component, you’ll need to add the code.</p>
        <p>And that’s it! You now have a fully functional {componentscode?.name} on your React app. You can customize it further by adding additional styling and behavior</p>
        </div>
        <h2>How To Create {componentscode?.name} Components in AngularJS</h2>
        <div className={pagecss.miniblogdivs}>
        <h3>Step 1: Create Component</h3>
        <CopyBlock  style={{whiteSpace: 'pre-line'}}
            
            language="js"
            text={`ng generate component FlipCard`}
            codeBlock
            theme={dracula}
            showLineNumbers={true}
            wrapLines
          />
        <h3>Step 2: Insert the Code</h3>
        <p>When you run this code, a folder with the same name as the component will be created. This folder will contain one TypeScript file, one HTML file, and one CSS file. Copy the given codes and put them in the right files, and put the code for the {componentscode?.name} in the correct place.</p>
       </div>
        <h2>Image Credits</h2>
        <p>
              { credimg()} 
              </p>
              
        </div>
        <div className={pagecss.maxheightcontainer}>
              </div>
              
            </div>
          {/* <div className={pagecss.relatedpostmain}>
                <h3>Related Posts </h3>
                <div className={pagecss.relatedpostgrid}>
                  <Itemcard/>
                  <Itemcard/>
                  <Itemcard/>
                  <Itemcard/>
                  <Itemcard/>
                  <Itemcard/>
                  <Itemcard/>
                  <Itemcard/>
                
                </div>
          </div>   */}
          {/* <div className={pagecss.relatedmarketgoodmain}>
           <hr className={pagecss.realtedline}/> <h3 >Something you may like</h3>
            <div className={pagecss.relatedmarketgrid}>
            <AiOutlineArrowLeft className={pagecss.backicon} />
                  <Itemcard/>
                    <Itemcard/>
                    <Itemcard/>
                    <Itemcard/>
            <AiOutlineArrowRight className={pagecss.backicon} />
            </div>
          </div> */}
    </div>
    <Footer/>
    </>
  )
}

export default Itempage