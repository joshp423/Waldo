import { Link } from "react-router-dom"
type GameSelectProps = {
    image: string;
    title: string;
    gameLink: string;
}
function GameSelect ({image, title, gameLink}:GameSelectProps) {


    return (
        <div className="gameSelect">
            <img src={image} alt={title} />
            <h1><Link to={gameLink}>{title}</Link></h1>
        </div>
    )
}

export default GameSelect