import Link from "next/link";
import React from "react";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import footercss from "../styles/Footer.module.css";
function Footer() {
  return (
    <div className={footercss.footermainbody}>
      <div className={footercss.footerlogo}>
        <h1>Codeomit</h1>
        <div className={footercss.footericons}>
          <Link target="_blank" href={"https://www.instagram.com/codeomit/"}>
            <BsInstagram className={footercss.cd} />
          </Link>
          <Link target="_blank" href={"https://www.youtube.com/@codeomit"}>
            <BsYoutube className={footercss.cd} />
          </Link>
          <Link
            target="_blank"
            href={"https://www.facebook.com/people/CodeOmit/100087959933825/"}
          >
            <BsFacebook className={footercss.cd} />
          </Link>
        </div>
      </div>

      <p>Codeomit Copyright © 2022. All rights reserved. </p>
    </div>
  );
}

export default Footer;
