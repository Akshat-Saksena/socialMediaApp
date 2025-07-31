import "./Login.scss";

function Login() {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Social Media</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet
            consectetur adipiscing elit quisque faucibus ex. Adipiscing elit
            quisque faucibus ex sapien vitae pellentesque.
          </p>
          <span>Don't have an account?</span>
          <button>Register</button>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
