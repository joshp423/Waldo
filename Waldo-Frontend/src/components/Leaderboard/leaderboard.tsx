import { useEffect, useState } from "react";
import LeaderBoardEntry from "./entry/entry";
import type { entry } from "../types/entry";

function Leaderboard() {
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    async function getLeaderboard() {
      try {
        const response = await fetch("http://localhost:3000/get-leaderboard", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        const data = await response.json();
        setLeaderBoard(data);
      } catch (error) {
        console.log(error);
      }
    }
    getLeaderboard();
  }, []);

  if (leaderBoard.length > 0 ) {
    return (
        <div className="leaderboard">
            <table>
                <tr>
                <th>Username</th>
                <th>Time</th>
                </tr>
                {leaderBoard?.map((entry: entry) => (
                    <LeaderBoardEntry key={entry.id} entry={entry} />
                ))}
            </table>
        </div>
    );
  }
  return(
    <h1>No scores</h1>
  )
  
}

export default Leaderboard;
