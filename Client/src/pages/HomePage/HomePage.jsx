import Share from "../../components/share/share";
import Posts from "../../components/posts/posts";
import Stories from "../../components/stories/stories";
import "./homepage.scss";

function HomePage() {
  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts />
    </div>
  );
}

export default HomePage;
