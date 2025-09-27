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
import { useContext, useEffect, useRef, useState } from "react";
import { ModeContext } from "../../contexts/darkModeContext.jsx";
import { AuthContext } from "../../contexts/authContext.jsx";
import { request } from "../../axios.js";
import { toast } from "react-toastify";

function Navbar() {
  const { darkMode, toggle } = useContext(ModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [userDropDown, setUserDropDown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  let delay = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }

    delay = setTimeout(async () => {
      try {
        const res = await request.get("/search", {
          params: { query: searchQuery },
        });
        setSuggestions(res.data);
      } catch (err) {
        // On error, keep suggestions as an empty array to avoid runtime errors
        console.error("Search error:", err);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchQuery === "") {
        toast.error("Nothing to search");
        return;
      }
      setSuggestions([]);
      clearTimeout(delay);
      navigate("/search/full/" + searchQuery);
    }
  };
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
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((user) => (
                <div
                  className="user"
                  key={user.userName}
                  onClick={() => {
                    setSuggestions([]);
                    navigate("/profile/" + user.userName);
                  }}
                >
                  <div className="info">
                    <img src={user.profilePic} />
                    <span className="name">{user.name}</span>
                  </div>
                  <span className="userName">@{user.userName}</span>
                </div>
              ))}
            </div>
          )}
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
            <button
              onClick={() => navigate("/profile/" + currentUser.userName)}
            >
              Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
