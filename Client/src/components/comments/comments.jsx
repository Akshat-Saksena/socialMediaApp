import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../contexts/authContext";

const Comments = () => {
  const { currentUser } = useContext(AuthContext);

  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum iaculis quam, cursus auctor lorem malesuada sit amet.",
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://r4.wallpaperflare.com/wallpaper/236/33/139/ikari-shinji-eva-unit-01-mech-neon-genesis-evangelion-anime-boys-hd-wallpaper-b72d5041d0273650e911d3021d61022d.jpg",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum iaculis quam, cursus auctor lorem malesuada sit amet.",
      name: "Jane Doe",
      userId: 2,
      profilePic:
        "https://r4.wallpaperflare.com/wallpaper/995/415/579/4k-superheroes-black-8k-wallpaper-f3cb630d3d891b35cf460217984b8858.jpg",
    },
    {
      id: 3,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum iaculis quam, cursus auctor lorem malesuada sit amet.",
      name: "Janet Doe",
      userId: 3,
      profilePic:
        "https://r4.wallpaperflare.com/wallpaper/403/855/787/sword-blood-fantasy-armor-wallpaper-d98038ede1ba3dfb264758af0061862d.jpg",
    },
  ];
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} />
        <input type="text" placeholder="write a comment" />
        <button>Post</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePic} />
          <div className="details">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 min ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
