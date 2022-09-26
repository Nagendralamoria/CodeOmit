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
function Dashboard() {
  const [userin,SetUserIn]=useState(false);
 

 const [name,setName]=useState("");
 const [openTab,setOpenTab]=useState("1");
 const[nameofcoder,setNameofcoder]=useState("");
 const [compImg,setCompImg]=useState(null);
 const [progress,setProgress]=useState(0);
 const [langhtml,setLanghtml]=useState("");
 const [langreact,setLangreact]=useState("");
 const [langangular,setLangangular]=useState("");
 const [codeinst,setCodeinst]=useState("");
 const [componentscode,setComponentcode]=useState([]);
 const componentsCollectionRef = collection(db,"componentscode");

 useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
   
      const uid = user.uid;
      SetUserIn(true);
      console.log(uid);
      // ...
    } else {
           Router.push('/codeomitadmintitanicthanos');
      console.log("nothing");
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
          const newRef = doc(collection(db, "componentscode"));


           setDoc(newRef, {
            name: name,
            nameofcoder:nameofcoder,
            codeinst:codeinst,
            html:langhtml,
            reactjs:langreact,
            angular:langangular,
            compId:newRef.id,
            compimage:url,
          })
            .then(() => {
              setCodeinst(""),
              setLanghtml(""),
              setLangangular(""),
              setLangreact(""),
              setOpenTab("1"),
              setName(""),
              setNameofcoder(""),
              
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
            <div className={dashcss.designcodebox}>
                <div className={dashcss.designcodeinputbox}>
                        <h3>Enter the data</h3>
                        <form onSubmit={formshandleSubmit} className={dashcss.designcodeform} >
                        <label for="fname">Name of component:</label>
                        <input type="text" id="cName" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                        <label for="fname">Name of designer/coder:</label>
                        <input type="text" id="cName" name="name" value={nameofcoder} onChange={(e)=>{setNameofcoder(e.target.value)}}/>
                        
                        <label for="sl">Select Language</label>
                        <select name="language" id="language" onClick={(e)=>{setOpenTab(e.target.value)}} className={dashcss.designselect}>
                          <option value="1">Html</option>
                          <option value="2">ReactJs</option>
                          <option value="3">NextJs</option>
                        
                        </select>
                        <label for="fname" >Code of component:</label>
                        <textarea style={{
                            display: openTab==="1" ? 'block':'none',
                            height:'10rem',
                            }} value={langhtml} onChange={(e)=>{setLanghtml(e.target.value)}}  id="cCode" name="code"/>
                        <textarea style={{
                            display: openTab==="2" ? 'block':'none',
                            height:'10rem',
                            }} value={langreact} onChange={(e)=>{setLangreact(e.target.value)}}  id="cCode" name="code"/>
                <textarea style={{
                        display: openTab==="3" ? 'block':'none',
                        height:'10rem',
              }} value={langangular} onChange={(e)=>{setLangangular(e.target.value)}}  id="cCode" name="code"/>
                        <label for="fname" >Instruction:</label>
                        <textarea value={codeinst} onChange={(e)=>{setCodeinst(e.target.value)}} style={{height:'10rem'}} id="cCode" name="code"/>
                       
                        <label for="lname">Design Png </label>
                        <input type="file" id="lname" name="lname" onChange={handleChange}/>
                        <input className={dashcss.submitbutton}   type="submit" value="Submit"/>
                        </form>
                </div>
                <div className={dashcss.designcodeshowbox}>
                {
      componentscode.map((Componentscod)=>{
        return(
          <div>
            
              <Dashboarditemcard name={Componentscod.name} imageref={Componentscod.compimage} lang={componentscode.language} code={Componentscod.code} Id={Componentscod.compId}/>
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

export default Dashboard