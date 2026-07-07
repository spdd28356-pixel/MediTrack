import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav-bar">
      <div className="brand">
        <NavLink to="/dashboard">MediTrack</NavLink>
      </div>
      <div className="nav-links">
        <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/medicines">
          Medicines
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/history">
          History
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/profile">
          Profile
        </NavLink>
      </div>
      <div className="nav-actions">
        <span>{user?.fullName || user?.email}</span>
        <button className="btn-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
