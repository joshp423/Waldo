import { useEffect, useState } from "react";
import LeaderBoardEntry from "./entry/entry";
import type { Entry } from "../types/entry";
import "./leaderboard.css";
function Leaderboard() {
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    async function getLeaderboard() {
      try {
        const response = await fetch("https://waldo-backend-4a7r.onrender.com/get-leaderboard", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        const data = await response.json();
        setLeaderBoard(data.leaderboard);
        console.log(data.leaderboard);
      } catch (error) {
        console.log(error);
      }
    }
    getLeaderboard();
  }, []);

  if (leaderBoard.length > 0) {
    return (
      <>
        <h1 className="leaderboardTitle">Leaderboard</h1>
        <div className="leaderboard">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Time</th>
                <th>Game</th>
              </tr>
            </thead>
            <tbody>
              {leaderBoard?.map((entry: Entry) => (
                <LeaderBoardEntry key={entry.id} entry={entry} />
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  return <h1>No scores</h1>;
}

export default Leaderboard;
