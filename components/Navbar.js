import Navbarcss from '../styles/Navbar.module.css'
import logo from '../public/Images/logo.png';
import Link from 'next/link';
import Image from 'next/image';
function Navbar() {
  return (
    <div className={Navbarcss.navbarmain}>
        
      <Link href='/'>
        <div className={Navbarcss.logo}><Image src='/Images/logo1.webp' width="40px" height="50px"></Image> <h2>Codeomit</h2></div>
         </Link>
       <Link href='/contactus'>
       <h3>Contact Us</h3>
        </Link> 
        {/* <div className={Navbarcss.navbarlist}>
            <h3>Contact Us</h3>
          
        </div> */}
    </div>
  )
}

export default Navbar