import {
  Favorite,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  MoreHoriz,
  ShareOutlined,
  TextsmsOutlined,
} from "@mui/icons-material";
import "./post.scss";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const liked = false;

  return (
    <div className="post">
      <div className="user">
        <div className="userInfo">
          <img src={post.profilePic} />
          <div className="details">
            <Link
              to={"/profile/" + post.userId}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="name">{post.name}</span>
            </Link>
            <span className="date">1 min ago</span>
          </div>
        </div>
        <MoreHoriz />
      </div>
      <div className="content">
        <span>{post.desc}</span>
        <img src={post.img} />
      </div>
      <div className="info">
        <div className="item">
          {liked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
          12 Likes
        </div>
        <div className="item">
          <TextsmsOutlined />
          12 Comments
        </div>
        <div className="item">
          <ShareOutlined />
          Share
        </div>
      </div>
    </div>
  );
};

export default Post;
