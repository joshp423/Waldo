import GameControlTarget from "./gameControlTarget/gameControlTarget";
import type { target } from "../../../../types/target";

type GameControlsProps = {
  targets: target[];
  selectedTarget: string;
  setSelectedTarget: React.Dispatch<React.SetStateAction<string>>;
};

function GameControls({ targets, selectedTarget, v }: GameControlsProps) {
  return <div className="gameControls"></div>;
}

export default GameControls;
