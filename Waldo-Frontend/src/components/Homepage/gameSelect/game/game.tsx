import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GameControls from "./gameControls/gameControls";
import spaceImage from "../../../../assets/Space.jpg";
import toyImage from "../../../../assets/Toys.jpg";
import troyImage from "../../../../assets/Troy.jpeg";

function Game() {
  const { gameTitle } = useParams();
  let image;

  // establish controls
  const [selectedTarget, setSelectedTarget] = useState("");
  const [targets, setTargets] = useState([]);
  const cursor = selectedTarget !== "" ? "targeting" : "";
  
  console.log(gameTitle)

  // pull game targets from API
  useEffect(() => {
    async function getTargets() {
      try {
        const response = await fetch(`/get-targets/${gameTitle}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        const data = await response.json();
        setTargets(data.targets);
      } catch (error) {
        console.log(error); // change to proper handling
      }
    }
    
    getTargets();
  }, [gameTitle]);

  

  switch (gameTitle) {
    case "space-station":
      image = spaceImage;
      break;
    case "battle-of-troy":
      image = troyImage;
      break;
    case "toy-store":
      image = toyImage;
      break;
  }

  // , load image from assets

  // , gamelogic
  // , timer
  // , control visuals
  // , postgame popup

  return (
    <div className="gameContainer">
      <GameControls
        targets={targets}
        setSelectedTarget={setSelectedTarget}
        selectedTarget={selectedTarget}
      />
      <div
        className={`gameImageContainer ${cursor !== "targeting" ? "" : "targetSelected"}`}
      >
        <img src={image} alt={gameTitle} />
      </div>
    </div>
  );
}

export default Game;
