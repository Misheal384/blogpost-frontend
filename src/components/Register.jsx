// Register.js
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from '../api/authApi';
import '../register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ username, email, password, confirmPassword });
    setError(""); // Clear previous errors

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Log the user data before making the API call
      const userData = { username, email, password, confirmPassword };
      console.log("Sending userData:", userData);  // Add this to debug
  
      // Make API call to register user
      const response = await registerUser(userData); // Ensure this includes confirmPassword
      navigate("/login"); // Redirect to login page on success
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during registration");
      console.error("Registration error:", err);
    }
    
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="/images/blog97.jpg" alt="Register" />
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>

          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
            />
          </div>

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

          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <button type="submit" className="login-button">
            Register
          </button>

          {error && <p className="error">{error}</p>}

          <div className="signup-link">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
    







