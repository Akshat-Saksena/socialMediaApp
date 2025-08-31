import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = () => {
    //to do
    setCurrentUser({
      id: 1,
      name: "John Doe",
      profilePic:
        "https://c4.wallpaperflare.com/wallpaper/764/505/66/baby-groot-4k-hd-superheroes-wallpaper-preview.jpg",
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {props.children}
    </AuthContext.Provider>
  );
};
