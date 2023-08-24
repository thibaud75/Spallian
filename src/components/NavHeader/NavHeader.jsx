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
        <h1 className="HeaderTitle">
          Welcome Spallian !
        </h1>
        <nav className="HeaderNav">
            <li>
                <Link to= "/project">Project</Link>
            </li>
            <li>
                <Link to= "/spallian">Spallian</Link> 
             </li>
        </nav>
        </div>
    </header>
  );
}