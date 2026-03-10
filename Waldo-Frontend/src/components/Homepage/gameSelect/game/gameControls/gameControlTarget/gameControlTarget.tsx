import type { target } from "../../../../../types/target";

type GameControlTargetProps = {
  target: target;
  selectedCharacter: string;
};
function GameControlTarget({
  target,
  selectedCharacter,
}: GameControlTargetProps) {
  return (
    <div
      className={`gameControlTarget ${selectedCharacter === target.title ? "active" : ""}`}
    >
      <img src={target.image} alt={target.title} />
      <h3>{target.title}</h3>
    </div>
  );
}

export default GameControlTarget;
