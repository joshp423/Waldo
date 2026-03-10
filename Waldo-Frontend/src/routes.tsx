import App from "./App";
import Homepage from "./components/Homepage/homepage";
import Game from "./components/Homepage/gameSelect/game/game";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/game/:gameTitle", element: <Game /> },
    ],
  },
];

export default routes;
