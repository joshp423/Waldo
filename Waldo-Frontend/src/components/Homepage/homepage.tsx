import spaceImage from "../../assets/Space.jpg";
import toyImage from "../../assets/Toys.jpg";
import troyImage from "../../assets/Troy.jpeg";
import GameSelect from "./gameSelect/gameSelect";
import "./homepage.css";

function Homepage() {
  return (
    <>
      <h1 id="chooseLevel">Choose a level</h1>
      <div className="homePage">
        
        <div className="spaceGameSelect">
          <GameSelect
            image={spaceImage}
            title={"Space Station"}
            gameLink={"https://waldo-frontend-eta.vercel.app/game/space-station"}
          />
        </div>
        <div className="troyGameSelect">
          <GameSelect
            image={troyImage}
            title={"The Battle of Troy"}
            gameLink={"https://waldo-frontend-eta.vercel.app/game/battle-of-troy"}
          />
        </div>
        <div className="toyGameSelect">
          <GameSelect
            image={toyImage}
            title={"Toy Store"}
            gameLink={"https://waldo-frontend-eta.vercel.app/game/toy-store"}
          />
        </div>
      </div>
    </>
  );
}

export default Homepage;
