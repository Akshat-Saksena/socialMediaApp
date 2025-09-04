import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import ImageIcon from "@mui/icons-material/Image";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PeopleIcon from "@mui/icons-material/People";
import "./share.scss";

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="share">
      <div className="top">
        <img src={currentUser.profilePic} alt="" />
        <textarea placeholder="Whats on your mind?" />
      </div>
      <div className="bottom">
        <div className="left">
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <div className="item">
              <ImageIcon />
              <span>Add Image</span>
            </div>
          </label>
          <div className="item">
            <AddLocationAltIcon />
            <span>Add Location</span>
          </div>
          <div className="item">
            <PeopleIcon />
            <span>Tag Friends</span>
          </div>
        </div>
        <div className="right">
          <button>Share</button>
        </div>
      </div>
    </div>
  );
};

export default Share;
