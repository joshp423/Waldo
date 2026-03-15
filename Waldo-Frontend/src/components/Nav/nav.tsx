import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="nav">
      <div className="titleDesc">
        <h1>
          <Link to={"/"}>Character Finder</Link>
        </h1>
        <h3>Find the Characters! Can you top the leaderboard?</h3>
      </div>
      <Link to={"/"}>Home</Link>
      <Link to={"/Leaderboard"}>Leaderboard</Link>
    </div>
  );
}

export default Nav;
