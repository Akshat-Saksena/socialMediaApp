import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { useContext, useState } from "react";
import { ModeContext } from "../../contexts/darkModeContext.jsx";
import { AuthContext } from "../../contexts/authContext.jsx";

function Navbar() {
  const { darkMode, toggle } = useContext(ModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [userDropDown, setUserDropDown] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Social Media</span>
        </Link>
        <HomeFilledIcon />
        {darkMode ? (
          <DarkModeIcon onClick={toggle} style={{ cursor: "pointer" }} />
        ) : (
          <LightModeIcon onClick={toggle} style={{ cursor: "pointer" }} />
        )}
        <AppsIcon />
        <div className="search">
          <SearchIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonIcon />
        <EmailIcon />
        <NotificationsIcon />
        <div className="account" onClick={() => setUserDropDown(!userDropDown)}>
          <img src={currentUser.profilePic} />
          <span>{currentUser.name}</span>
        </div>
        {userDropDown && (
          <div className="dropDown">
            <button onClick={logout}>Logout</button>
            <button onClick={() => navigate("/profile/:" + 1)}>Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
