import { createContext, useEffect, useState } from "react";
import { request } from "../axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (input) => {
    const res = await request.post("/auth/login", input);

    setCurrentUser(res.data);
  };

  const logout = () => {
    setCurrentUser(null);
    toast.success("Logged Out");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, setCurrentUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
