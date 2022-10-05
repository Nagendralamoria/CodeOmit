import React from 'react'
import {BsInstagram} from 'react-icons/bs'
import {BsTwitter,BsLinkedin} from 'react-icons/bs'
import footercss from '../styles/Footer.module.css'
function Footer() {
  return (
    <div className={footercss.footermainbody}>
        <div className={footercss.footerlogo}>
            <h1>Codeomit</h1>
            <div className={footercss.footericons}>
          <BsInstagram/>
          <BsTwitter/>
          <BsLinkedin/>
        </div>
        </div>
     
            <p>Codeomit Copyright © 2022. All rights reserved. </p>
          
    </div>
  )
}

export default Footer