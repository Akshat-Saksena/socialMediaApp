import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const { login } = useContext(AuthContext);
  const [input, setInput] = useState({
    userName: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(input);
      toast.success("Login Successfull");
      navigate("/");
    } catch (err) {
      toast.error("Login Failed");
      setError(err.response.data);
    }
  };

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              name="userName"
              type="text"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {err && <p style={{ color: "red" }}>{err.message}</p>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
