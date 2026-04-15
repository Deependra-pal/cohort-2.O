import { useState } from "react";
import "../style/form.scss";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setuser, setloading, handleLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formHanlder = async (e) => {
    e.preventDefault();

    await handleLogin(username, password);
     
    Navigate("/")

    // console.log("user loggedIn");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="from-container">
        <h1>Login</h1>
        <form onSubmit={formHanlder}>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            onInput={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            name="username"
            onInput={(e) => setPassword(e.target.value)}
          />

          <button className="button primary-button">Login</button>
        </form>
        <p>
          Dot't have an account ? <Link to="/register">Create One.</Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Login;
