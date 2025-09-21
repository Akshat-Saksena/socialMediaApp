import {
  Email,
  FacebookTwoTone,
  Instagram,
  Language,
  LinkedIn,
  MoreVert,
  Pinterest,
  Place,
  X,
} from "@mui/icons-material";
import "./profilePage.scss";
import Posts from "../../components/posts/posts";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../../axios";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { currentUser } = useContext(AuthContext);
  const { userName } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, [userName]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["profile", userName],
    queryFn: async () => {
      const res = await request.get("/user/profile/" + userName);
      console.log(res.data);
      return res.data;
    },
  });

  const { isLoading: status, data: following } = useQuery({
    queryKey: ["isFollowing"],
    queryFn: async () => {
      const res = await request.get("/relation/status", {
        params: { id: userName },
      });
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (body) => {
      if (following) await request.post("/relation/unFollow", body);
      else await request.post("/relation/follow", body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isFollowing"] });
    },
  });

  const handleFollow = (e) => {
    e.preventDefault();
    mutation.mutate({ id: userName });
  };

  return (
    <div className="profile">
      <div className="images">
        <img src={data && data.coverPic} alt="" className="cover" />
        <img src={data && data.profilePic} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="left">
          <a href="http://facebook.com">
            <FacebookTwoTone fontSize="large" />
          </a>
          <a href={data && data.webSite}>
            <Instagram fontSize="large" />
          </a>
          <a href="http://x.com">
            <X fontSize="large" />
          </a>
          <a href="http://linkedin.com">
            <LinkedIn fontSize="large" />
          </a>
          <a href="http://pinterest.com">
            <Pinterest fontSize="large" />
          </a>
        </div>
        <div className="center">
          <span>{data && data.name}</span>
          <div className="info">
            <div className="item">
              <Place />
              <span>{data && data.city}</span>
            </div>
            <div className="item">
              <Language />
              <span>Engilsh</span>
            </div>
          </div>
          {currentUser.userName === userName ? (
            <button>Update</button>
          ) : (
            <button onClick={handleFollow}>
              {status ? "Loading" : following ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className="right">
          <Email />
          <MoreVert />
        </div>
      </div>
      <Posts userName={userName} />
    </div>
  );
}

export default ProfilePage;
