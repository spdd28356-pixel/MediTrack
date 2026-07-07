import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const { register, loading, error } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    if (!fullName.trim()) return "Full name is required.";
    if (!email.trim()) return "Email is required.";
    if (!emailPattern.test(email)) return "Please enter a valid email address.";
    if (!password.trim()) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setSuccessMessage(null);

    const validationError = validate();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    try {
      await register({ fullName, email, password });
      setSuccessMessage("Account created successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (exception) {
      setMessage(exception.message || "Unable to register.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div>
            <p className="auth-subtitle">Create account</p>
            <h1 className="auth-title">Register with MediTrack</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label htmlFor="register-fullname">Full Name</label>
            <input
              id="register-fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
            />
          </div>
          <div className="form-field">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="form-field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>
          <div className="form-field">
            <label htmlFor="register-confirm">Confirm Password</label>
            <input
              id="register-confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <button className="button button--primary" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
          {(message || error || successMessage) && (
            <p className={`form-info ${successMessage ? "form-success" : "form-error"}`}>
              {successMessage || message || error}
            </p>
          )}
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
