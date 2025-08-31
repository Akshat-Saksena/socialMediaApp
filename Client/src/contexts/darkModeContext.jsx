import { createContext, useEffect } from "react";
import { useState } from "react";

export const ModeContext = createContext();

export const ModeProvider = (props) => {
  const [darkMode, setMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const toggle = () => {
    setMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <ModeContext.Provider value={{ darkMode, toggle }}>
      {props.children}
    </ModeContext.Provider>
  );
};
