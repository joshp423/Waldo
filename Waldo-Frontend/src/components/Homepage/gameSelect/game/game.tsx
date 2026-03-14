import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import GameControls from "./gameControls/gameControls";
import spaceImage from "../../../../assets/Space.jpg";
import toyImage from "../../../../assets/Toys.jpg";
import troyImage from "../../../../assets/Troy.jpeg";
import "./game.css";
import type { target } from "../../../types/target";

function Game() {
  const { gameTitle } = useParams();
  let image;

  // establish controls
  const [selectedTarget, setSelectedTarget] = useState("");
  const [completedTargets, setCompletedTargets] = useState<string[]>([]);
  const [targets, setTargets] = useState<target[]>([]);
  const cursor = !selectedTarget ? "" : "targeting";

  const [userClickX, setUserClickX] = useState<number | null>(null);
  const [userClickY, setUserClickY] = useState<number | null>(null);

  const [imageZoom, setImageZoom] = useState<number>(100);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const [imagePan, setImagePan] = useState({ x: 0, y: 0 });
  const [Dragging, setDragging] = useState(false);
  const lastCursor = useRef({ x: 0, y: 0 });

  function getZoomOrigin(e: MouseEvent | WheelEvent) {
    if (!gameImage.current) return { x: 0.5, y: 0.5 };
    const imageDetails = gameImage.current.getBoundingClientRect();
    return {
      x: (e.clientX - imageDetails.left) / imageDetails.width,
      y: (e.clientY - imageDetails.top) / imageDetails.height,
    };
  }

  //get image using useRef
  const gameImage = useRef<HTMLImageElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);

  // pull game targets from API
  useEffect(() => {
    async function getTargets() {
      try {
        const response = await fetch(
          `http://localhost:3000/get-targets/${gameTitle}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          },
        );
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
      const sensitivity = 0.02;
      const difference = e.deltaY;

      const cursorPosition = getZoomOrigin(e);
      setZoomOrigin({ x: cursorPosition.x * 100, y: cursorPosition.y * 100 });

      setImageZoom((prevZoom) => {
        const newZoom = Math.round(prevZoom - difference * sensitivity); //round to clean up zoom
        return Math.min(Math.max(newZoom, 50), 300);
      });
    };

    // have to attach with passive: false because passive events can't call preventDefault
    container.addEventListener("wheel", wheelZoom, { passive: false });

    // Once done remove
    return () => {
      container.removeEventListener("wheel", wheelZoom);
    };
  }, []); // call just on mount

  // load image from assets
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

  async function checkClick(clickX: number, clickY: number) {
    const checkTarget = targets.find((target) => {
      return target.title === selectedTarget;
    });
    if (checkTarget) {
      if (
        Number(checkTarget.x) > clickX - 0.01 &&
        Number(checkTarget.x) < clickX + 0.01 &&
        Number(checkTarget.y) > clickY - 0.03 &&
        Number(checkTarget.y) < clickY + 0.03
      ) {
        console.log("success");
        setCompletedTargets([...completedTargets, selectedTarget]);
        setSelectedTarget("");
      }
    }
  }
  

  // , timer

  const [timerAmount, setTimerAmount] = useState(0); // start timer at 0
  const timerStatus = useRef<number | null>(null); // keep a record of timerStatus, doesn't need to impact rendering so useRef

  useEffect(() => {
    //set timer and interval on mount
    timerStatus.current = setInterval(() => {
      setTimerAmount((prev) => prev + 1);
    }, 1000 ); //every 1000ms it puts amount up by prev + 1
    //
    return () => { //stop interval if it unmounts to stop timer.
      if (timerStatus.current) clearInterval(timerStatus.current);
    };
  }, []);

  function stopTimer() {
    if (timerStatus.current) {
      clearInterval(timerStatus.current); //stops the timer
    }
    return;
  }

  // gamelogic

  useEffect(() => {
    if (completedTargets.length === 3) {
      stopTimer();
      console.log(timerStatus)
    }
  },[completedTargets])

  // postgame popup


  // , control visuals

  

  return (
    <div className="gameContainer">
      <GameControls
        targets={targets}
        setSelectedTarget={setSelectedTarget}
        selectedTarget={selectedTarget}
        completedTargets={completedTargets}
        timerAmount={timerAmount}
      />
      <div
        className={`gameImageContainer ${cursor !== "targeting" ? "" : "targetSelected"}`}
        ref={imageContainer}
        style={{
          cursor: !selectedTarget ? "" : "crosshair",
        }}
      >
        <img
          src={image}
          alt={gameTitle}
          ref={gameImage}
          style={{
            transform: `translate(${imagePan.x}px, ${imagePan.y}px) scale(${imageZoom / 100})`,
            transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
            cursor: Dragging ? "grabbing" : "",
          }}
          onMouseDown={(e: React.MouseEvent<HTMLImageElement>) => {
            if (e.button === 2) {
              e.preventDefault();
              setDragging(true);
              lastCursor.current = { x: e.clientX, y: e.clientY };
            }
          }}
          onClick={(e: React.MouseEvent<HTMLImageElement>) => {
            if (selectedTarget) {
              if (!gameImage.current) {
                return;
              }

              //getBoundingCLientRect returns object with size and position of element relative to viewport
              const imageDetails = gameImage.current.getBoundingClientRect();

              //set client click minus bounding rectangle then set to percentage for calculation on BE

              const clickX =
                (e.clientX - imageDetails.left) / imageDetails.width;
              const clickY =
                (e.clientY - imageDetails.top) / imageDetails.height;
              setUserClickX(clickX);
              setUserClickY(clickY);

              checkClick(clickX, clickY);
            }
          }}
          onMouseMove={(e) => {
            if (!Dragging) return;

            // calculate the difference between current cursor and last cursor
            const amountDraggedY = e.clientY - lastCursor.current.y;
            const amountDraggedX = e.clientX - lastCursor.current.x;

            setImagePan((prev) => ({
              // set image pan on previous + new amount dragged
              x: prev.x + amountDraggedX,
              y: prev.y + amountDraggedY,
            }));

            lastCursor.current = { x: e.clientX, y: e.clientY }; // set current lastCursor to current cursor
          }}
          onMouseOut={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onMouseUp={() => setDragging(false)}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}

export default Game;
