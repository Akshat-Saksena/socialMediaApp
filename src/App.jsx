import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  let router = createBrowserRouter([
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
