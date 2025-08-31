import {
  Email,
  FacebookTwoTone,
  Instagram,
  Language,
  LinkedIn,
  MoreVert,
  Pinterest,
  Place,
  PlaceOutlined,
  X,
} from "@mui/icons-material";
import "./profilePage.scss";
import Posts from "../../components/posts/posts";
import { useEffect } from "react";

function ProfilePage() {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://r4.wallpaperflare.com/wallpaper/236/33/139/ikari-shinji-eva-unit-01-mech-neon-genesis-evangelion-anime-boys-hd-wallpaper-b72d5041d0273650e911d3021d61022d.jpg"
          alt=""
          className="cover"
        />
        <img
          src="https://c4.wallpaperflare.com/wallpaper/764/505/66/baby-groot-4k-hd-superheroes-wallpaper-preview.jpg"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="left">
          <a href="http://facebook.com">
            <FacebookTwoTone fontSize="large" />
          </a>
          <a href="http://facebook.com">
            <Instagram fontSize="large" />
          </a>
          <a href="http://facebook.com">
            <X fontSize="large" />
          </a>
          <a href="http://facebook.com">
            <LinkedIn fontSize="large" />
          </a>
          <a href="http://facebook.com">
            <Pinterest fontSize="large" />
          </a>
        </div>
        <div className="center">
          <span>John Doe</span>
          <div className="info">
            <div className="item">
              <Place />
              <span>SAMANA</span>
            </div>
            <div className="item">
              <Language />
              <span>Engilsh</span>
            </div>
          </div>
          <button>Follow</button>
        </div>
        <div className="right">
          <Email />
          <MoreVert />
        </div>
      </div>
      <Posts />
    </div>
  );
}

export default ProfilePage;
