import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../../App";
import Player from "../Player/Player";
import Film from "../Films/Film";
import Contact from "../contact/Contact";
import About from "../about/About";
import Detail from "../Films/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Player />,
      },
      {
        path: "/players",
        element: <Player />,
      },
      {
        path: "/Movies",
        element: <Film />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
