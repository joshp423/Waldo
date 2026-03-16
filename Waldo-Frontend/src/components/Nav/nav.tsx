import { Link } from "react-router-dom";
import "./nav.css";

function Nav() {
  return (
    <div className="nav">
      <div className="titleDesc">
        <h1>
          <Link to={"/"}>Character Finder</Link>
        </h1>
        <h3>Find the Characters! Can you top the leaderboard?</h3>
      </div>
      <h3>
        <Link to={"/"}>Home</Link>
      </h3>
      <h3>
        <Link to={"/Leaderboard"}>Leaderboard</Link>
      </h3>
    </div>
  );
}

export default Nav;
