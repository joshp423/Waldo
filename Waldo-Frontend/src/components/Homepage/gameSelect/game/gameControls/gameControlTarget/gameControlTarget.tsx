import type { target } from "../../../../../types/target";

type GameControlTargetProps = {
  target: target;
  selectedTarget: string;
  setSelectedTarget: React.Dispatch<React.SetStateAction<string>>;
};
function GameControlTarget({
  target,
  selectedTarget,
  setSelectedTarget
}: GameControlTargetProps) {

    const setNewTarget = () => {
        setSelectedTarget(target.title);
    }

  return (
    <div
      className={`gameControlTarget ${selectedTarget === target.title ? "active" : ""}`}
      onClick={setNewTarget}
    >
      <img src={target.image} alt={target.title} />
      <h3>{target.title}</h3>
    </div>
  );
}

export default GameControlTarget;
