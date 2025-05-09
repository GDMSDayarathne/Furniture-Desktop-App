import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Form({ setIsLoggedIn, setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userRole", user.role);

        setIsLoading(false);

        if (setIsLoggedIn) setIsLoggedIn(true);
        if (setUserRole) setUserRole(user.role);

        navigate("/user/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Invalid email or password. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-section">
        <div className="login-form">
          <h1 className="login-title">Sign in</h1>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="show-password">SHOW</span>
            </div>

            <div className="divider">
              <span>or</span>
            </div>

            <button type="button" className="google-button">
              Continue with Google
            </button>

            <div className="not-registered">
              Not registered yet? <Link to="/signup">Create an account</Link>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          {message && <p className="error-message">{message}</p>}
        </div>
      </div>
      <div className="login-image" />
    </div>
  );
}
