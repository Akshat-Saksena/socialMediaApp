import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Leftbar from "./components/Leftbar/Leftbar";
import Rightbar from "./components/Rightbar/Rightbar";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import "./app.scss";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { ModeContext } from "./contexts/darkModeContext";

function App() {
  const { darkMode } = useContext(ModeContext);

  let Layout = () => {
    return (
      <div className={"theme-" + (darkMode ? "dark" : "light")}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Leftbar />
          <div
            style={{
              flex: 6,
            }}
          >
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
    );
  };
  let router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        {
          path: "/",
          Component: HomePage,
        },
        {
          path: "/profile/:id",
          Component: ProfilePage,
        },
      ],
    },
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/register",
      Component: Register,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
