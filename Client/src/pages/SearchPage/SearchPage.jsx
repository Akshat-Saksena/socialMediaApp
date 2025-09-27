import { useNavigate, useParams } from "react-router-dom";
import "./SearchPage.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../../axios";
import { toast } from "react-toastify";

function SearchPage() {
  const { query } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      //if (!query) return;
      const res = await request.get("/search/full", {
        params: { query: query },
      });
      return res.data;
    },
  });

  const handleError = () => {
    toast.error("Something went wrong");
  };

  return (
    <div className="SearchPage">
      {error && handleError}
      {isLoading && <div className="spinner" />}
      {data &&
        data.map((user) => (
          <div
            className="item"
            onClick={() => navigate("/profile/" + user.userName)}
          >
            <div className="user">
              <img src={user.profilePic} alt="" />
              <span className="name">{user.name}</span>
            </div>
            <span className="userName">@{user.userName}</span>
          </div>
        ))}
    </div>
  );
}

export default SearchPage;
