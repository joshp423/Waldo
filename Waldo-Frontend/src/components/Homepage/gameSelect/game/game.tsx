import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import GameControls from "./gameControls/gameControls";
import spaceImage from "../../../../assets/Space.jpg";
import toyImage from "../../../../assets/Toys.jpg";
import troyImage from "../../../../assets/Troy.jpeg";

function Game() {
  const { gameTitle } = useParams();
  let image;
  console.log(gameTitle)

  // establish controls
  const [selectedTarget, setSelectedTarget] = useState("");
  const [targets, setTargets] = useState([]);
  const cursor = selectedTarget !== "" ? "targeting" : "";
  const [userClickX, setUserClickX] = useState<number | null> (null)
  const [userClickY, setUserClickY] = useState<number | null> (null)

  //get image using useRef
  const gameImage = useRef<HTMLImageElement>(null);

  // pull game targets from API
  useEffect(() => {
    async function getTargets() {
      try {
        const response = await fetch(`http://localhost:3000/get-targets/${gameTitle}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        const data = await response.json();
        console.log(data)
        setTargets(data.targets);
      } catch (error) {
        console.log(error); // change to proper handling
      }
    }
    
    getTargets();
  }, [gameTitle]);

  console.log(targets)


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

  // function recordClickCoords() {

  // }
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
        <img
          src={image}
          alt={gameTitle}
          ref={gameImage}
          onClick={
            (e: React.MouseEvent<HTMLImageElement>) => {
              if (!gameImage.current) {
                return;
              }
              //getBoundingCLientRect returns object with size and position of element relative to viewport
              const imageDetails = gameImage.current.getBoundingClientRect();

              //set client click minus bounding rectangle then set to percentage for calculation on BE
              setUserClickX((e.clientX - imageDetails.left) / imageDetails.width);
              setUserClickY((e.clientY - imageDetails.top) / imageDetails.height);
              console.log(userClickX,userClickY)
            }
          }
        />
      </div>
    </div>
  );
}

export default Game;
