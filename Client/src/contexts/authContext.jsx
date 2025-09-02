import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (input) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      input,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {props.children}
    </AuthContext.Provider>
  );
};
