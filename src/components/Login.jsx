import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await loginUser({ email, password });

      const access_token = response?.access_token;
      if (!access_token) {
        throw new Error("Access token not received from the server");
      }

      localStorage.setItem("token", access_token);
      navigate("/"); // Redirect to the homepage after successful login
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.error || "Server returned an error");
      } else if (err.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(err.message || "An unexpected error occurred");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="/images/blog97.jpg" alt="Blog" />
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h2>Login to Your Account</h2>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          {error && <p className="error">{error}</p>}

          <div className="signup-link">
            <p>Don't have an account? <a href="/register">Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
