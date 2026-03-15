import type { target } from "../../../../../types/target";
import "./gameControlTarget.css";

type GameControlTargetProps = {
  target: target;
  selectedTarget: string;
  setSelectedTarget: React.Dispatch<React.SetStateAction<string>>;
  completedTargets: string[];
};

function GameControlTarget({
  target,
  selectedTarget,
  setSelectedTarget,
  completedTargets,
}: GameControlTargetProps) {
  const setNewTarget = () => {
    if (
      completedTargets.length !== 3 &&
      !completedTargets.find((completedTarget) => {
        return completedTarget === target.title;
      })
    ) {
      setSelectedTarget(target.title);
    }
  };

  return (
    <div
      className={`gameControlTarget ${selectedTarget === target.title ? "active" : ""} ${
        completedTargets.find((completedTarget) => {
          return completedTarget === target.title;
        }) === undefined
          ? ""
          : "completed"
      }`}
      onClick={setNewTarget}
    >
      <img src={target.imageurl} alt={target.title} />
      <h3>{target.title}</h3>
    </div>
  );
}

export default GameControlTarget;
