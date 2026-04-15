import { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const fronHanlder = (e) => {
    e.preventDefault();

    console.log(username);
    console.log(password);
    console.log(email);
  };

  return (
    <main>
      <div className="from-container">
        <h1>Register</h1>
        <form onSubmit={fronHanlder}>
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

          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            onInput={(e) => setEmail(e.target.value)}
          />

          <button className="button primary-button">Register</button>
        </form>
        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
