import spaceImage from '../../assets/Space.jpg'
import toyImage from '../../assets/Toys.jpg'
import troyImage from '../../assets/Troy.jpeg'
import GameSelect from "./gameSelect/gameSelect"

function Homepage () {
    return (
        <div className="homePage">
            <div className="spaceGameSelect">
                <GameSelect image={spaceImage} title={"Space Station"} gameLink={"http://localhost:5173/game/space-station"}/>
            </div>
            <div className="troyGameSelect">
                <GameSelect image={troyImage} title={"The Battle of Troy"} gameLink={"http://localhost:5173/game/battle-of-troy"}/>
            </div>
            <div className="toyGameSelect">
                <GameSelect image={toyImage} title={"Toy Store"} gameLink={"http://localhost:5173/game/toy-store"}/>
            </div>
        </div>
    )
}

export default Homepage