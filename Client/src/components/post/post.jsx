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
import { useEffect, useState } from "react";
import { TimeAgo } from "../../contexts/timeContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../../axios";
import socket from "../../sockets";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post._id],
    queryFn: async () => {
      const res = await request.get("/likes", {
        params: { id: post._id },
      });
      if (res.data.liked) setLiked(true);
      return res.data.number;
    },
  });

  const likeMutation = useMutation({
    mutationFn: async (newLike) => {
      await request.post("/likes", newLike);
    },
    onSuccess: () => {
      setLiked(true);
    },
  });

  const disMutation = useMutation({
    mutationFn: async () => {
      await request.delete("/likes", {
        params: { id: post._id },
      });
    },
    onSuccess: () => {
      setLiked(false);
    },
  });

  useEffect(() => {
    socket.on("changeLike", (postId) => {
      queryClient.invalidateQueries({ queryKey: ["likes", postId] });
    });
    return () => {
      socket.off("changeLike");
    };
  }, []);

  const handleClick = () => {
    if (liked) {
      disMutation.mutate();
    } else {
      likeMutation.mutate({ postId: post._id });
    }
  };

  return (
    <div className="post">
      <div className="user">
        <div className="userInfo">
          <Link to={"./profile/" + post.user.userName}>
            <img src={post.user.profilePic} />
          </Link>
          <div className="details">
            <Link
              to={"/profile/" + post.user.userName}
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
        <div className="item" onClick={handleClick}>
          {liked ? (
            <FavoriteOutlined style={{ color: "red" }} />
          ) : (
            <FavoriteBorderOutlined />
          )}
          {isLoading ? "Loading..." : (data ? data : 0) + " Likes"}
        </div>
        <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
          {commentOpen ? <Textsms /> : <TextsmsOutlined />}
          Comments
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
