import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const [input, setInput] = useState({
    userName: "",
    email: "",
    name: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localHost:8800/api/auth/register", input);
      toast.success("Registration Successfull");
      navigate("/login");
    } catch (err) {
      toast.error("Registration Failed");
      setError(err.response.data);
    }
  };

  //console.log(err);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form>
            <input
              name="userName"
              type="text"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {err && <p style={{ color: "red" }}>{err.error}</p>}
            <button onClick={handleClick}>Register</button>
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
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
