import App from "./App";
import Homepage from "./components/Homepage/homepage";
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      // { path: "posts/:postId", element: <BlogPost /> },
    ],
  },
];

export default routes;
