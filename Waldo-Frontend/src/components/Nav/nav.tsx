import { Link } from "react-router-dom";

function Nav() {
    return (
        <div className="nav">
            <div className="titleDesc">
                <h1>Character Finder</h1>
                <h3>Find the Characters! Can you top the leaderboard?</h3>
            </div>
            <Link to={'/Leaderboard'}>Leaderboard</Link>
        </div>
    )
}

export default Nav