import GameControlTarget from "./gameControlTarget/gameControlTarget";
import type { target } from "../../../../types/target";

type GameControlsProps = {
  targets: target[];
  selectedTarget: string;
  setSelectedTarget: React.Dispatch<React.SetStateAction<string>>;
  completedTargets: string[];
};

function GameControls({
  targets,
  selectedTarget,
  setSelectedTarget,
  completedTargets,
}: GameControlsProps) {
  return (
    <div className="gameControls">
      {targets?.map((target) => (
        <GameControlTarget
          key={target.id}
          target={target}
          selectedTarget={selectedTarget}
          setSelectedTarget={setSelectedTarget}
          completedTargets={completedTargets}
        />
      ))}
    </div>
  );
}

export default GameControls;
