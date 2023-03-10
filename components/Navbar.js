import Navbarcss from "../styles/Navbar.module.css";
import logo from "../public/Images/logo.png";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import { useState } from "react";
function Navbar() {
  const [showbutton, setShowButoon] = useState(false);
  return (
    <div className={Navbarcss.navbarmain}>
      <Link href="/">
        <div className={Navbarcss.logo}>
          <Image
            src="/Images/logo1.webp"
            width="50"
            height="50"
            className={Navbarcss.Imagert}
          ></Image>
          <h2>Codeomit</h2>
        </div>
      </Link>
      <div className={Navbarcss.closeicon}>
        <AiOutlineClose
          style={{ display: showbutton ? "block" : "none" }}
          onClick={() => {
            setShowButoon(false);
          }}
          className={Navbarcss.navicons}
        />
        <AiOutlineMenu
          style={{ display: showbutton ? "none" : "block" }}
          onClick={() => {
            setShowButoon(true);
          }}
          className={Navbarcss.navicons}
        />
      </div>
      <div
        className={`${
          showbutton ? Navbarcss.displayclass : Navbarcss.hideclass
        }`}
      >
        <div className={Navbarcss.navbarlinks}>
          <Link href="/">
            <h3>Home</h3>
          </Link>
          <Link href="/blogs">
            <h3>Blogs</h3>
          </Link>
          <Link href="/contactus">
            <h3>Contact Us</h3>
          </Link>
        </div>
        {/* <div className={Navbarcss.navbarlist}>
            <h3>Contact Us</h3>
          
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
