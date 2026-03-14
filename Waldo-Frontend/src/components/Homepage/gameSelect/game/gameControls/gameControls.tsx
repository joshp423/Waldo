import GameControlTarget from "./gameControlTarget/gameControlTarget";
import type { target } from "../../../../types/target";

type GameControlsProps = {
  targets: target[];
  selectedTarget: string;
  setSelectedTarget: React.Dispatch<React.SetStateAction<string>>;
  completedTargets: string[];
  timerAmount: number;
};

function GameControls({
  targets,
  selectedTarget,
  setSelectedTarget,
  completedTargets,
  timerAmount,
}: GameControlsProps) {
  return (
    <div className="gameControls">
      <div className="timer">
        Completion Time: {Math.floor(timerAmount / 60) //round down timer to minutes for first half then get seconds with amount / 60
          .toString()}
        :
        {(timerAmount % 60).toString().padStart(2, "0") }
      </div>
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
