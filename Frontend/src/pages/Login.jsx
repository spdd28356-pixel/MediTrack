import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    if (!email.trim()) return "Email is required.";
    if (!emailPattern.test(email)) return "Please enter a valid email address.";
    if (!password.trim()) return "Password is required.";
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);

    const validationError = validate();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    try {
      await login({ email, password, remember });
      navigate("/dashboard");
    } catch (exception) {
      setMessage(exception.message || "Unable to login.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--split">
        <div className="auth-card__hero">
          <span className="auth-badge">Secure access</span>
          <h1 className="auth-title">Welcome back to MediTrack</h1>
          <p className="auth-subtitle">
            Sign in to review your reminders, track progress, and stay on top of each care routine.
          </p>

          <div className="auth-info">
            <div className="auth-info__item">
              <span className="material-symbols-outlined">shield</span>
              <span>Protected account access</span>
            </div>
            <div className="auth-info__item">
              <span className="material-symbols-outlined">calendar_month</span>
              <span>Medication schedule at a glance</span>
            </div>
            <div className="auth-info__item">
              <span className="material-symbols-outlined">monitor_heart</span>
              <span>Health tracking from one place</span>
            </div>
          </div>
        </div>

        <div className="auth-card__form">
          <div className="auth-header">
            <p className="auth-subtitle">Welcome back</p>
            <h2 className="auth-title">Sign in to your account</h2>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="form-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <div className="auth-options">
              <label className="remember-row">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember me
              </label>
              <a className="forgot-link" href="#">
                Forgot Password?
              </a>
            </div>
            <button className="button button--primary" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
            {(message || error) && <p className="form-error">{message || error}</p>}
          </form>

          <p className="auth-footer">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
