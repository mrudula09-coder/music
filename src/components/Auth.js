import React, { useState } from "react";
import "../App.css";
import AuthService from "../services/authService";

function Auth({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    
    if (isSignUp) {
      // Signup validation
      if (!email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
        setMessage({ text: "Please fill in all fields!", type: "error" });
        setIsLoading(false);
        return;
      }
      
      if (password !== confirmPassword) {
        setMessage({ text: "Passwords don't match!", type: "error" });
        setIsLoading(false);
        return;
      }
      
      if (password.length < 6) {
        setMessage({ text: "Password must be at least 6 characters long!", type: "error" });
        setIsLoading(false);
        return;
      }

      // Call signup API
      const result = await AuthService.signup({
        email: email.trim(),
        username: username.trim(),
        password: password
      });

      if (result.success) {
        setMessage({ text: result.message, type: "success" });
        // Clear form and switch to login after successful signup
        setTimeout(() => {
          setIsSignUp(false);
          setEmail("");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setMessage({ text: "Account created! Please sign in.", type: "success" });
        }, 2000);
      } else {
        setMessage({ text: result.message, type: "error" });
      }
    } else {
      // Login validation
      if (!username.trim() || !password.trim()) {
        setMessage({ text: "Please enter username and password!", type: "error" });
        setIsLoading(false);
        return;
      }

      // Call login API
      const result = await AuthService.login({
        username: username.trim(),
        password: password
      });

      if (result.success) {
        setMessage({ text: result.message, type: "success" });
        // Login successful, call parent onLogin
        setTimeout(() => {
          onLogin(result.user);
        }, 1000);
      } else {
        setMessage({ text: result.message, type: "error" });
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          MusicCC
        </div>
        
        <h1 className="auth-title">
          {isSignUp ? "Create Account" : "Welcome back"}
        </h1>
        <p className="auth-subtitle">
          {isSignUp 
            ? "Create your account to start your music journey" 
            : "Sign in to your account to continue your music journey"
          }
        </p>

        <div className="auth-card">
          {message.text && (
            <div className={`auth-message ${message.type}`}>
              {message.text}
            </div>
          )}
          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="input-group">
                <label>Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
            )}



            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading 
                ? (isSignUp ? "Creating Account..." : "Signing In...") 
                : (isSignUp ? "Sign up" : "Sign in")
              }
            </button>

            <div className="auth-footer">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <span className="auth-link" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Sign in" : "Sign up"}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;