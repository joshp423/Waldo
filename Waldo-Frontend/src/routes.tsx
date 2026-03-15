import App from "./App";
import Homepage from "./components/Homepage/homepage";
import Game from "./components/Homepage/gameSelect/game/game";
import Leaderboard from "./components/Leaderboard/leaderboard";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/game/:gameTitle", element: <Game /> },
      { path: "/Leaderboard", element: <Leaderboard /> },
    ],
  },
];

export default routes;
