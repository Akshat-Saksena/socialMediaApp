import "./rightbar.scss";

function Rightbar() {
  return (
    <div className="rbar">
      <div className="container">
        <span>Suggestions</span>
        <div className="item">
          <div className="account">
            <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg" />
            <span>User Name</span>
          </div>
          <div className="respond">
            <button>follow</button>
            <button>dismiss</button>
          </div>
        </div>
        <div className="item">
          <div className="account">
            <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg" />
            <span>User Name</span>
          </div>
          <div className="respond">
            <button>follow</button>
            <button>dismiss</button>
          </div>
        </div>
      </div>
      <div className="container">
        <span>Latest Activites</span>
        <div className="item">
          <div className="account">
            <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg" />
            <span>User Name</span>
          </div>
          <p>changed their cover picture</p>
          <span>1 min ago</span>
        </div>
        <div className="item">
          <div className="account">
            <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg" />
            <span>User Name</span>
          </div>
          <p>liked a post</p>
          <span>1 min ago</span>
        </div>
        <div className="item">
          <div className="account">
            <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg" />
            <span>User Name</span>
          </div>
          <p>liked a comment</p>
          <span>1 min ago</span>
        </div>
        <div className="item">
          <div className="account">
            <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg" />
            <span>User Name</span>
          </div>
          <p>posted</p>
          <span>1 min ago</span>
        </div>
      </div>
      <div className="container">
        <span>Online Friends</span>
        <div className="item">
          <div className="account">
            <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg" />
            <span>User Name</span>
            <div className="online" />
          </div>
        </div>
        <div className="item">
          <div className="account">
            <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg" />
            <span>User Name</span>
            <div className="online" />
          </div>
        </div>
        <div className="item">
          <div className="account">
            <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg" />
            <span>User Name</span>
            <div className="online" />
          </div>
        </div>
        <div className="item">
          <div className="account">
            <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg" />
            <span>User Name</span>
            <div className="online" />
          </div>
        </div>
        <div className="item">
          <div className="account">
            <img src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg" />
            <span>User Name</span>
            <div className="online" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
