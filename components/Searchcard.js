import mainpagecss from '../styles/Home.module.css'

import Link from 'next/link'

function Itemcard(props) {
  return (<Link href={`item/${props.Id}`}>
        <div className={mainpagecss.itemcard}>
        <img src={props.imageref} alt='new'/>
      {/* <h3>{props.name}</h3> */}
    </div></Link>
  )
}

export default Itemcard