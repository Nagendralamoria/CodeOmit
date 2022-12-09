import React, { useEffect, useState } from 'react'
import Fuse from 'fuse.js';
import Searchpagecss from '../styles/Searchpage.module.css'
function tagssearcheddata(props) {

    const [querydata,setQueryData]=useState([]);
    // const fuse = new Fuse(props.componentscode, {
    //     keys: ['name', 'compinst']
    // })
    useEffect(()=>{
        console.log(props.name)
        // const getSearchedData = async()=>{
        //   const res = fuse.search(`${props.searchdata}`);
        //   await setQueryData(res); 
        //   console.log(querydata,"searched",props.searchdata);
        // } 
        // getSearchedData();
      },[])
  return (
    <div className={Searchpagecss.cardsgrid}> 
    <h1>{props.searchdata}</h1> 
     {/* {
       props.componentscode.map((Componentscod)=>{
         return(
           <div key={Componentscod.compId}>
                <Itemcard Id={Componentscod.compId} imageref={Componentscod.compimage} />
             </div>
         )
       })
     } */}
      
      </div>
  )
}

export default tagssearcheddata