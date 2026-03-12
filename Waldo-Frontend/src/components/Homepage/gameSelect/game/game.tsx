import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import GameControls from "./gameControls/gameControls";
import spaceImage from "../../../../assets/Space.jpg";
import toyImage from "../../../../assets/Toys.jpg";
import troyImage from "../../../../assets/Troy.jpeg";
import "./game.css"

function Game() {
  const { gameTitle } = useParams();
  let image;
  console.log(gameTitle)

  // establish controls
  const [selectedTarget, setSelectedTarget] = useState("");
  const [targets, setTargets] = useState([]);
  const cursor = !selectedTarget ? "" : "targeting";
  
  const [userClickX, setUserClickX] = useState<number | null> (null)
  const [userClickY, setUserClickY] = useState<number | null> (null)

  const [imageZoom, setImageZoom] = useState<number>(100)

  //get image using useRef
  const gameImage = useRef<HTMLImageElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null)

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
        setTargets(data);
      } catch (error) {
        console.log(error); // change to proper handling
      }
    }
    
    getTargets();
  }, [gameTitle]);

  useEffect(() => {
    if (userClickX !== null && userClickY !== null) {
      console.log(userClickX, userClickY);
    }
  }, [userClickX, userClickY]);

  useEffect(() => {
    const container = imageContainer.current; //use the actual dom object given imageContainer is just a ref
    if (!container) return;

    const wheelZoom = (e: WheelEvent) => {
      e.preventDefault(); // now safe
      const sensitivity = 0.05;
      const difference = e.deltaY;

      setImageZoom(prevZoom => {
        const newZoom = Math.round(prevZoom - difference * sensitivity); //round to clean up zoom
        return Math.min(Math.max(newZoom, 100), 300);
      });
    };

    // have to attach with passive: false because passive events can't call preventDefault
    container.addEventListener("wheel", wheelZoom, { passive: false });

    // Once done remove
    return () => {
      container.removeEventListener("wheel", wheelZoom);
    };
  }, []); // call just on mount

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
        ref={imageContainer}
      >
        <img
          src={image}
          alt={gameTitle}
          ref={gameImage}
          style={{ transform: `scale(${imageZoom / 100})` }}
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
            }
          }
          
          // style={{zoom = }}
        />
      </div>
    </div>
  );
}

export default Game;
