import App from "./App";
import Homepage from "./components/Homepage/homepage";
import Game from "./components/Homepage/gameSelect/game/game";
import Leaderboard from "./components/Leaderboard/leaderboard";
import NotFound from "./components/Errors/404";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/game/:gameTitle", element: <Game /> },
      { path: "/Leaderboard", element: <Leaderboard /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
