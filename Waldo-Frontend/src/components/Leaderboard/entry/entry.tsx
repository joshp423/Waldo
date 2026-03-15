import type { entry } from "../../types/entry";

type LeaderBoardEntryProps = {
  entry: entry;
};

function LeaderBoardEntry({ entry }: LeaderBoardEntryProps) {
  return (
    <tr>
      <td>{entry.username}</td>
      <td>
        Time:{" "}
        {Math.floor(entry.time / 60) //round down timer to minutes for first half then get seconds with amount / 60
          .toString()}
        :{(entry.time % 60).toString().padStart(2, "0")}
      </td>
    </tr>
  );
}

export default LeaderBoardEntry;
