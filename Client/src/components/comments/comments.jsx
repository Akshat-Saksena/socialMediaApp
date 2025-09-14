import { useContext, useEffect, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../contexts/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../../axios";
import { TimeAgo } from "../../contexts/timeContext";
import socket from "../../sockets";
import { toast } from "react-toastify";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("newComment", ({ postId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    });
    return () => {
      socket.off("newComment");
    };
  }, [queryClient]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      console.log(postId);

      const res = await request.get("/comments", {
        params: { id: postId },
      });
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      await request.post("/comments", newComment);
    },
    onSuccess: () => {
      setDesc(null);
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (!desc) return toast.error("Cannot add empty comment");
    mutation.mutate({ desc: desc, postId: postId });
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} />
        <textarea
          value={desc || ""}
          placeholder="write a comment"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <button onClick={handleClick} disabled={mutation.isPending}>
          {mutation.isPending ? <div className="spinner" /> : "Post"}
        </button>
        {mutation.isError && (
          <p style={{ color: "red" }}>{mutation.error.message}</p>
        )}
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error:{error.message}</p>}
      {data &&
        data.map((comment) => (
          <div className="comment" key={comment._id}>
            <img src={comment.userInfo.profilePic} />
            <div className="details">
              <span>{comment.userInfo.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">
              <TimeAgo timestamp={comment.createdAt} />
            </span>
          </div>
        ))}
    </div>
  );
};

export default Comments;
