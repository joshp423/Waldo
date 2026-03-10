import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GameControls from "./gameControls/gameControls"
import spaceImage from '../../assets/Space.jpg'
import toyImage from '../../assets/Toys.jpg'
import troyImage from '../../assets/Troy.jpeg'

function Game () {

    const { gameTitle } = useParams();

    // establish controls
    const [selectedTarget, setSelectedTarget] = useState("");
    const [cursor, setCursor] = useState("");
    const [targets, setTargets] = useState([]);
    const [image, setImage] = useState("");

    // pull game targets from API
    useEffect(() => {
        async function getTargets() {
            try {
                const response = await fetch("/get-targets", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "GET",
                    body: JSON.stringify({ gameTitle: gameTitle }),
                },
            );
            const data = await response.json();
            setTargets(data.targets);
            } catch (error) {
                console.log(error) // change to proper handling
            }
        };
        getTargets()

    }, []);

    
        if (selectedTarget !== "") {
            setCursor('targeting')
        }

        switch (gameTitle) {
            case "space-station":
                setImage(spaceImage);
                break;
            case "battle-of-troy":
                setImage(troyImage);
                break;
            case "toy-store":
                setImage(toyImage);
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
            <div className={`gameImageContainer ${cursor !== "targeting" ? "" : "targetSelected"}`}>
                <img src={image} alt={gameTitle} />
            </div>
            
        </div>
    )
}

export default Game