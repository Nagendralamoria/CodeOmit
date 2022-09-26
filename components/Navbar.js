import Navbarcss from '../styles/Navbar.module.css'
import logo from '../public/Images/3.png';
function Navbar() {
  return (
    <div className={Navbarcss.navbarmain}>
        {/* <img src={logo} alt='logo'/> */}
        <h2>Codeomit</h2>
        <h3>Contact Us</h3>
        {/* <div className={Navbarcss.navbarlist}>
            <h3>Contact Us</h3>
          
        </div> */}
    </div>
  )
}

export default Navbar