import  Router  from 'next/router';
import React, { useState } from 'react'
import { GoSearch } from 'react-icons/go'
import Searchpagecss from '../styles/Searchpage.module.css';
function Searchbar(props) {
    const [searchdata,setSearchData]=useState(props.searchdata);
   const senddata =()=>{
 
        
          if (searchdata=='') {
         
            console.log('nothing');
            // console.log(uid);
            // ...
          } else {
                 props.getdata(searchdata);
                 Router.push(`${searchdata}`);
               
                 
          }

      
   }
      
    
  return (
    <div className={Searchpagecss.innersearchbar}>  <input type="text" onChange={(e)=>{setSearchData(e.target.value)}} value={searchdata} placeholder='Search the code </>'/>
    <GoSearch onClick={senddata}  className={Searchpagecss.searchicon} /></div>
  )
}

export default Searchbar