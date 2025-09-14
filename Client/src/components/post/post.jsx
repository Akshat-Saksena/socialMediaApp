import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  MoreHoriz,
  ShareOutlined,
  Textsms,
  TextsmsOutlined,
} from "@mui/icons-material";
import "./post.scss";
import { Link } from "react-router-dom";
import Comments from "../comments/comments";
import { useState } from "react";
import { TimeAgo } from "../../contexts/timeContext";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="post">
      <div className="user">
        <div className="userInfo">
          <Link to={"./profile/" + post.user._id}>
            <img src={post.user.profilePic} />
          </Link>
          <div className="details">
            <Link
              to={"/profile/" + post.user._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="name">{post.user.name}</span>
            </Link>
            <span className="date">
              <TimeAgo timestamp={post.createdAt} />
            </span>
          </div>
        </div>
        <MoreHoriz />
      </div>
      <div className="content">
        <span>{post.desc}</span>
        {post.img &&
          (post.img.endsWith(".mp4") || post.img.endsWith(".mkv") ? (
            <video src={post.img} controls />
          ) : (
            <img src={post.img} onClick={() => setExpanded(true)} />
          ))}
        {expanded && (
          <div className="lightbox" onClick={() => setExpanded(false)}>
            <img src={post.img} alt="expanded" />
          </div>
        )}
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
      {commentOpen && <Comments postId={post._id} />}
    </div>
  );
};

export default Post;
