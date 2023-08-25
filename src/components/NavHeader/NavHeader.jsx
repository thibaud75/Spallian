import { Link } from "react-router-dom";
import "./NavHeader.css";


export default function NavHeader() {

  return (
    <header>
        <div className="HeaderDiv">
      <Link to="/">
        <img
          className="Logo"
          alt= "Logo Spallian"
          src="https://www.spallian.com/wp-content/themes/spallian/assets/img/logo.svg"
        />
      </Link>
        <nav className="HeaderNav">
            <li>
                <Link to= "/project">Project</Link>
            </li>
            <li>
                <Link to= "/presentation">Presentation</Link> 
             </li>
        </nav>
        </div>
    </header>
  );
}