import "../style/form.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const { handleLogin } = useAuth();

  handleLogin(username, password).then((res) => {
    console.log(res.data);
    handleLogin(username, password).then((res) => {
      console.log(res.data);
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <main>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            onInput={(e) => setusername(e.target.value)}
            placeholder="Enter username"
          />

          <input
            type="password"
            name="password"
            onInput={(e) => setpassword(e.target.value)}
            placeholder="Enter password"
          />

          <button>Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="toggleAuthFrom" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
