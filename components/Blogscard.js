import  Router  from 'next/router'
import React from 'react'
import blogcardcss from '../styles/Blogscard.module.css'
function Blogscard(props) {
    const getlinkfunction=()=>{
     Router.push('/blogs/'+`${props.Id}`)
      }
    return (
           
        <div className={blogcardcss.cardbody} onClick={()=>{getlinkfunction()}}>
            <img alt='card' src={props.image}/>
            <div className={blogcardcss.cardtext}>
                <h2>{props.name}</h2>
                <p>{props.inst} </p>
            </div>
        </div>
        

  )
}

export default Blogscard