import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import ImageIcon from "@mui/icons-material/Image";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PeopleIcon from "@mui/icons-material/People";
import "./share.scss";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { request } from "../../axios";

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState(null);
  const [file, setFile] = useState(null);

  const mutation = useMutation({
    mutationFn: async (newPost) => await request.post("/posts", newPost),
    onSuccess: () => {
      setDesc("");
      setFile(null);
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    mutation.mutate({ desc: desc });
  };

  return (
    <div className="share">
      <div className="top">
        <img src={currentUser.profilePic} alt="" />
        <textarea
          value={desc}
          placeholder="Whats on your mind?"
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      {mutation.isError && <p color="red">{mutation.error.message}</p>}
      <div className="bottom">
        <div className="left">
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
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
          <button onClick={handleClick} disabled={mutation.isPending}>
            {mutation.isPending ? <span className="spinner" /> : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
