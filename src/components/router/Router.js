import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../../App";
import Player from "../Player/Player";
import Film from "../Films/Film";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/players",
        element: <Player />,
      },
      {
        path: "/Movies",
        element: <Film />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
