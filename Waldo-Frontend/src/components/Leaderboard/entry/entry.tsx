import type { Entry } from "../../types/entry";

type LeaderBoardEntryProps = {
  entry: Entry;
};

function LeaderBoardEntry({ entry }: LeaderBoardEntryProps) {
  const title =
    entry.game.title.charAt(0).toUpperCase() + entry.game.title.slice(1);
  return (
    <tr>
      <td>{entry.username}</td>
      <td>
        {Math.floor(entry.time / 60) //round down timer to minutes for first half then get seconds with amount / 60
          .toString()}
        :{(entry.time % 60).toString().padStart(2, "0")}
      </td>
      <td>{title}</td>
    </tr>
  );
}

export default LeaderBoardEntry;
