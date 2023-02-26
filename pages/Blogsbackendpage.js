import DashboardNavbar from "../components/DashboardNavbar"
import Dashboarditemcard from "../components/Dashboarditemcard";
import dashcss from '../styles/Dashboard.module.css'
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { auth, db,storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import Swal from "sweetalert2";
import { onAuthStateChanged } from "firebase/auth";
import Router from 'next/router'
import Blogitemcard from "../components/Blogitemcard";
function blogsbackednpage() {
  const [userin,SetUserIn]=useState(false);
 const [name,setName]=useState("");
 const [nameUrl,setNameUrl]=useState("");
 const [titlename,setTitlename]=useState("");
 const[nameofcoder,setNameofcoder]=useState("");
 const [compImg,setCompImg]=useState(null);
 const [progress,setProgress]=useState(0);
 const [codeinst,setCodeinst]=useState("");
 const [codecred,setCodecred]=useState("");
 const [componentscode,setComponentcode]=useState([]);
 const componentsCollectionRef = collection(db,"blogs");

 useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
   
      const uid = user.uid;
      SetUserIn(true);

    } else {
           Router.push('/codeomitadmintitanicthanos');
    }
  });

   const getComponents = async()=>{
     const data = await getDocs(componentsCollectionRef);
     setComponentcode(data.docs.map((doc)=>({
       ...doc.data(),id:doc.compId
     })));
   };
   getComponents();
 },[])


  const handleChange = (e) => {
    if (e.target.files[0]) {
      setCompImg(e.target.files[0]);
      }
   };

  const formshandleSubmit=(e)=>{
    e.preventDefault();
    const storageRef = ref(storage, `images/${compImg.name}`);
    
      const uploadTask = uploadBytesResumable(storageRef,compImg) ;

  uploadTask.on(
    "state_changes",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
      if(progress<100){
        Swal.showLoading();
      }
    },
    (error) => {
      console.log(error);
      alert(error.message);
    },() => {
      const storageRef = ref(storage, `images/${compImg.name}`);
      getDownloadURL(storageRef).then((url) => {
          const newRef = doc(collection(db, "blogs"),`${nameUrl}`);

           setDoc(newRef, {
            title: name,
            introduction:titlename,
            codeinst:codeinst,
            codecred:codecred,
            compId:nameUrl,
            compimage:url,
          })
            .then(() => {
              setCodeinst(""),
              setName(""),
              setCodecred(""),
              setTitlename(""),
              
              Swal.fire({
               
                icon: "success",
                title: "Component posted",
              }).then(()=>{
                window.location.reload();
              });
             
            })
            .catch((error) => {
              alert(error.message);
            });
        });
    }
  );
    
    
 }
  
    
  

  return (userin ? ( 
    
    <div className={dashcss.mainbody}>
        <DashboardNavbar/>
        <div className={dashcss.designcodemainbody}>
            <h2>Dashboard</h2>
            {name.replace(/\s/g, '')}
            <div className={dashcss.designcodebox}>
                <div className={dashcss.designcodeinputbox}>
                        <h3>Enter the data</h3>
                        <form onSubmit={formshandleSubmit} className={dashcss.designcodeform} >
                        <label htmlFor="fname">Blog Heading:</label>
                        <input type="text" id="cName" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                       
                        <label htmlFor="fname">Blog Heading url:</label>
                        <input type="text" id="cName" name="name" value={nameUrl} onChange={(e)=>{setNameUrl(e.target.value)}}/>
                        <label htmlFor="fname">Blog Introduction:</label>
                        <input type="text" id="tName" name="tname" value={titlename} onChange={(e)=>{setTitlename(e.target.value)}}/>
                    
                        <label htmlFor="fname" >Blog data:</label>
                        <textarea value={codeinst} onChange={(e)=>{setCodeinst(e.target.value)}} style={{height:'10rem'}} id="cCode" name="code"/>
                       
                        <label htmlFor="fname" >Credits:</label>
                        <textarea value={codecred} onChange={(e)=>{setCodecred(e.target.value)}} style={{height:'10rem'}} id="ccCode" name="code"/>
                       
                        <label htmlFor="lname">Blog Image </label>
                        <input type="file" id="lname" name="lname" onChange={handleChange}/>
                        <input className={dashcss.submitbutton}   type="submit" value="Submit"/>
                        </form>
                </div>
                <div className={dashcss.designcodeshowbox}>
                {
      componentscode.map((Componentscod)=>{
        return(
          <div key={Componentscod.compId}>
            
              <Blogitemcard name={Componentscod.title} imageref={Componentscod.compimage} lang={componentscode.language} code={Componentscod.code}  Id={Componentscod.compId}/>
            </div>
        )
      })
    }
                </div>
            </div>
        </div>
    </div>):(<h1>loading</h1>)
  )
}

export default blogsbackednpage