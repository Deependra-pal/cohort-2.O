import { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { loading, handleRegister } = useAuth();

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    await handleRegister(username, email, password);

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
        <h1>Register</h1>

        <form onSubmit={handleForm}>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            onInput={(e) => setusername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter email"
            name="email"
            onInput={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onInput={(e) => setPassword(e.target.value)}
          />

          <button className="button primary-button">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
