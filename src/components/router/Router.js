import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../../App";
import Player from "../Player/Player";
import Film from "../Films/Film";
import Contact from "../contact/Contact";
import About from "../about/About";
import Detail from "../Films/Detail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../access/NotFound";
import LimitedAccess from "../access/LimitedAccess";
import Dashboard from "../manage/Dashboard";

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
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute name="dashboard">
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/no-access",
    element: <LimitedAccess />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const Router = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default Router;
