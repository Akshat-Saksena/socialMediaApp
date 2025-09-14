import Post from "../post/post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { request } from "../../axios";
import { useEffect } from "react";
import socket from "../../sockets";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TimeProvider } from "../../contexts/timeContext";

const Posts = () => {
  // const posts = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     userId: 1,
  //     profilePic:
  //       "https://r4.wallpaperflare.com/wallpaper/236/33/139/ikari-shinji-eva-unit-01-mech-neon-genesis-evangelion-anime-boys-hd-wallpaper-b72d5041d0273650e911d3021d61022d.jpg",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     img: "https://r4.wallpaperflare.com/wallpaper/1020/1/213/world-of-warcraft-battle-for-azeroth-video-games-warcraft-alliance-wallpaper-086b954bc6da1845f849d9255fdf6b11.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePic:
  //       "https://r4.wallpaperflare.com/wallpaper/995/415/579/4k-superheroes-black-8k-wallpaper-f3cb630d3d891b35cf460217984b8858.jpg",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     img: "https://r4.wallpaperflare.com/wallpaper/948/863/762/video-games-ghost-of-tsushima-playstation-hd-wallpaper-08268d28d0909c78805cd19e18d204aa.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Janet Doe",
  //     userId: 3,
  //     profilePic:
  //       "https://r4.wallpaperflare.com/wallpaper/403/855/787/sword-blood-fantasy-armor-wallpaper-d98038ede1ba3dfb264758af0061862d.jpg",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //   },
  // ];

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
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await request.get("/posts");
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
