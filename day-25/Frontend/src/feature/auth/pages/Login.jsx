import { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, loading, handleLogin } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFrom = async (e) => {
    e.preventDefault();

    await handleLogin(username, password);
    console.log("user loggedin");

    navigate("/");
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
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleFrom}>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            onInput={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onInput={(e) => setPassword(e.target.value)}
          />

          <button className="button primary-button">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
