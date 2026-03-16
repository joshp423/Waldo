import { Link } from "react-router-dom";

type GameSelectProps = {
  image: string;
  title: string;
  gameLink: string;
};

function GameSelect({ image, title, gameLink }: GameSelectProps) {
  return (
    <div className="gameSelect">
      <Link to={gameLink}>
      <div>
        <img src={image} alt={title} />
      </div>
        <h1>
          {title}
        </h1>
      </Link>
    </div>
  );
}

export default GameSelect;
