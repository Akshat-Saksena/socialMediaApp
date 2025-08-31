import {
  Favorite,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  MoreHoriz,
  ShareOutlined,
  Textsms,
  TextsmsOutlined,
  TextsmsTwoTone,
} from "@mui/icons-material";
import "./post.scss";
import { Link } from "react-router-dom";
import Comments from "../comments/comments";
import { useState } from "react";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);

  return (
    <div className="post">
      <div className="user">
        <div className="userInfo">
          <Link to={"./profile/" + post.userId}>
            <img src={post.profilePic} />
          </Link>
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
        <div className="item" onClick={() => setLiked(!liked)}>
          {liked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
          12 Likes
        </div>
        <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
          {commentOpen ? <Textsms /> : <TextsmsOutlined />}
          12 Comments
        </div>
        <div className="item">
          <ShareOutlined />
          Share
        </div>
      </div>
      {commentOpen && <Comments />}
    </div>
  );
};

export default Post;
