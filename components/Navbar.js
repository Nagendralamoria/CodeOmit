import Navbarcss from '../styles/Navbar.module.css'
import logo from '../public/Images/3.png';
import Link from 'next/link';
function Navbar() {
  return (
    <div className={Navbarcss.navbarmain}>
        {/* <img src={logo} alt='logo'/> */}
        <h2>Codeomit</h2>
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