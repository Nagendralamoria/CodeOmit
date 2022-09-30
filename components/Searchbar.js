import  Router  from 'next/router';
import React, { useState } from 'react'
import { GoSearch } from 'react-icons/go'

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
    <div>  <input type="text" onChange={(e)=>{setSearchData(e.target.value)}} value={searchdata} placeholder='Search the code </>'/>
    <GoSearch onClick={senddata}  /></div>
  )
}

export default Searchbar