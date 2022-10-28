import mainpagecss from '../styles/Home.module.css'

import Link from 'next/link'
import Router from 'next/router'

function Itemcard(props) {
  const getlinkfunction=()=>{
    Router.push('/item/'+`${props.Id}`)
  }
  return (
        <div className={mainpagecss.itemcard} onClick={()=>{getlinkfunction()}}>
        <img src={props.imageref} alt='new'/>
      {/* <h3>{props.name}</h3> */}
    </div>
  )
}

export default Itemcard