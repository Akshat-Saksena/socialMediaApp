import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Leftbar from "./components/Leftbar/Leftbar";
import Rightbar from "./components/Rightbar/Rightbar";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import "./app.scss";

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { ModeContext } from "./contexts/darkModeContext";
import { AuthContext } from "./contexts/authContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  let Layout = () => {
    const { darkMode } = useContext(ModeContext);

    useEffect(() => {
      document.body.className = "theme-" + (darkMode ? "dark" : "light");
      return () => {
        document.body.className = "";
      };
    }, [darkMode]);

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

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
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
