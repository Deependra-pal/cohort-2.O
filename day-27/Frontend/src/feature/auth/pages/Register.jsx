import React,{useState} from "react";
import "../style/register.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { loading, handleRegister } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    await handleRegister({username,email,password});
    navigate("/");
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup label="Name" placeholder="Enter your Name" />
          <FormGroup label="email" placeholder="Enter your email" />
          <FormGroup label="password" placeholder="Enter your password" />
          <button className="button" type="submit">
            Register
            </button>
            
        </form>
        <p>
          Already have an account ? <Link to="/login">Login here</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
