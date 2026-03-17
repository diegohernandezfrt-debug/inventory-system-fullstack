import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await api.post("/users/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (error) {

      alert("Login failed");

    }
  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h2 className="login-title">Inventory Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="login-button" type="submit">
            Login
          </button>

        </form>

      </div>

    </div>

  );
}

export default Login;