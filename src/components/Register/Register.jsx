import "./Register.scss";

function Register() {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Re-type Password" />
            <button>Register</button>
          </form>
        </div>
        <div className="right">
          <h1>Social Media</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet
            consectetur adipiscing elit quisque faucibus ex. Adipiscing elit
            quisque faucibus ex sapien vitae pellentesque.
          </p>
          <span>Do you have an account?</span>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
