
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



function Itempage() {
    const [isActive, setIsActive] = useState(true);
      const[loadingpage,setLoadingPage]=useState(false);
    const [openTab, setOpenTab] = useState(1);
  
     const router = useRouter()
    const  itemId  = router.query.itemId;
    const [componentscode,setComponentcode]=useState([]);
    const [relatedpost,setRelatedPost]=useState([]);
    const componentsCollectionRef = doc(db,"componentscode",`${itemId}`);
 
    useEffect(()=>{
  
      const getComponents = async()=>{
        const data = await getDoc(componentsCollectionRef);
        setComponentcode(data.data());
        setLoadingPage(true);
        // if (data.exists()) {
        //     console.log("Document data:", data.data().name);
            
        //   } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        //   }
    };
    
      getComponents();
    },[itemId])
  return (
    <>
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
              <h1>{componentscode?.name}</h1>

              <div className={pagecss.pagetext}>
              <p>
                {componentscode?.codeinst}
              </p>
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