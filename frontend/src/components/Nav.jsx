import { Link } from "react-router-dom";
import "../styles/Nav.css";

function Nav() {
  return (
    <div className="Nav">
      <div className="logoName">
        <Link to={"/"}>Yo-Blog</Link>
      </div>
      <div className="links">
        <Link to={"/"}>Home</Link>
        <Link to={"/posts"}>Posts</Link>
      </div>
    </div>
  );
}

export default Nav;
