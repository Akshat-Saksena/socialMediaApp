import Post from "../post/post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { request } from "../../axios";
import { useEffect } from "react";
import socket from "../../sockets";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TimeProvider } from "../../contexts/timeContext";

const Posts = ({ userName }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("newPost", () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    });

    return () => {
      socket.off("newPost");
    };
  }, [queryClient]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", userName],
    queryFn: async () => {
      let res;
      if (userName) res = await request.get("/posts/" + userName);
      else res = await request.get("/posts");
      return res.data;
    },
  });

  if (error) {
    if (error.response?.status === 401) {
      toast.error("Token Expired. Please Login again", {
        autoClose: false,
        closeOnClick: true,
      });
    }
  }

  return (
    <TimeProvider>
      <div className="posts">
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error:{error.message}</p>}
        {data && data.map((post) => <Post post={post} key={post._id} />)}
      </div>
    </TimeProvider>
  );
};

export default Posts;
