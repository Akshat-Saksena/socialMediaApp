import "./Leftbar.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import GroupsIcon from "@mui/icons-material/Groups";
import StorefrontIcon from "@mui/icons-material/Storefront";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CollectionsIcon from "@mui/icons-material/Collections";
import EmergencyRecordingIcon from "@mui/icons-material/EmergencyRecording";
import {
  EmailOutlined,
  LocalLibraryOutlined,
  SchoolOutlined,
  ScienceOutlined,
} from "@mui/icons-material";
function Leftbar() {
  return (
    <div className="bar">
      <div className="container">
        <div className="item">
          <AccountCircleIcon />
          <span>Username</span>
        </div>
        <div className="item">
          <Diversity1Icon />
          <span>Freinds</span>
        </div>
        <div className="item">
          <GroupsIcon />
          <span>Groups</span>
        </div>
        <div className="item">
          <StorefrontIcon />
          <span>Marketplace</span>
        </div>
        <div className="item">
          <OndemandVideoIcon />
          <span>Watch</span>
        </div>
        <div className="item">
          <ShutterSpeedIcon />
          <span>Memories</span>
        </div>
      </div>
      <hr />
      <div className="container">
        <span>Shortcuts</span>
        <div className="item">
          <CalendarMonthIcon />
          <span>Events</span>
        </div>
        <div className="item">
          <SportsEsportsIcon />
          <span>Gaming</span>
        </div>
        <div className="item">
          <CollectionsIcon />
          <span>Gallery</span>
        </div>
        <div className="item">
          <EmergencyRecordingIcon />
          <span>Videos</span>
        </div>
        <div className="item">
          <EmailOutlined />
          <span>Messages</span>
        </div>
      </div>
      <hr />
      <div className="container">
        <span>Others</span>
        <div className="item">
          <ScienceOutlined />
          <span>Fundraiser</span>
        </div>
        <div className="item">
          <LocalLibraryOutlined />
          <span>Tutorials</span>
        </div>
        <div className="item">
          <SchoolOutlined />
          <span>Courses</span>
        </div>
      </div>
    </div>
  );
}

export default Leftbar;
