import GameControlTarget from "./gameControlTarget/gameControlTarget";
import type { target } from "../../../../types/target";

type GameControlsProps = {
  targets: target[];
  selectedTarget: string;
  setSelectedTarget: React.Dispatch<React.SetStateAction<string>>;
};

function GameControls({ targets, selectedTarget, setSelectedTarget }: GameControlsProps) {

  return (
  <div className="gameControls">
    {targets?.map((target) => (
        <GameControlTarget 
            key={target.id}
            target={target}
            selectedTarget={selectedTarget}
            setSelectedTarget={setSelectedTarget}
        />
    ))}
  </div>
  )
}

export default GameControls;
