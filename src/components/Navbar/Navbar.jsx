import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import "./navbar.scss";

function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Social Media</span>
        </Link>
        <HomeFilledIcon />
        <DarkModeIcon />
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
        <div className="account">
          <img src="https://c4.wallpaperflare.com/wallpaper/329/713/280/funny-business-internet-computer-wallpaper-preview.jpg" />
          <span>User Name</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
