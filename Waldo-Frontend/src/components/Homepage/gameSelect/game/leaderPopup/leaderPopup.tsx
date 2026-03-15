import { useNavigate } from "react-router-dom";
import "./leaderPopup.css";
import { useState, type SyntheticEvent } from "react";


type LeaderPopupProps = {
  gameComplete: boolean;
  timerAmount: number;
  gameTitle: string | undefined;
};

function LeaderPopup({ gameComplete, timerAmount, gameTitle}: LeaderPopupProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  
  const submitTime = async(e:SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rsp = await fetch(
      `http://localhost:3000/${gameTitle}/submit-score`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          gameid: gameTitle,
          time: timerAmount,
          username: username
        }),
      },
    );
    if (rsp.status !=201) {
      return console.log(rsp.body);
    }
    navigate("/Leaderboard")
  };

  return (
    <div className={`popup ${gameComplete === true ? "" : "hidden"}`}>
      <form action="Post" onSubmit={submitTime}>
        <h1>Level Complete!</h1>
        <h3>
          Your time:{" "}
          {Math.floor(timerAmount / 60) //round down timer to minutes for first half then get seconds with amount / 60
            .toString()}
          :{(timerAmount % 60).toString().padStart(2, "0")}
        </h3>
        <label htmlFor="username">
          Enter a username to add your time to the leaderboard
        </label>
        <input type="text" name="username" onChange={(e) => {setUsername(e.target.value)}}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LeaderPopup;
