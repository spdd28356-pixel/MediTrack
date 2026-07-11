import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "../assets/images/MediTrack_Logo.png";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/medicines", label: "Medicines", icon: "medication" },
  { to: "/history", label: "History", icon: "history" },
  { to: "/profile", label: "Profile", icon: "person" },
];

const getPageTitle = (pathname) => {
  if (pathname.startsWith("/medicines")) return "Medicines";
  if (pathname.startsWith("/history")) return "Medication History";
  if (pathname.startsWith("/profile")) return "Profile";
  return "Dashboard";
};

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = (user?.fullName || user?.email || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "U";

  return (
    <div className="shell-layout">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <div className="sidebar__brand-icon">
            <img src={Logo} alt="MediTrack logo" style={{ width: "24px", height: "24px" }} />
          </div>
          <div>
            <h1 className="sidebar__brand-title">MediTrack</h1>
            <p className="sidebar__brand-subtitle">Clinical Precision</p>
          </div>
        </div>

        <nav className="sidebar__nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar__nav-item${isActive ? " sidebar__nav-item--active" : ""}`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <button className="sidebar__logout" onClick={handleLogout} type="button">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="shell-main">
        <header className="topbar">
          <div className="topbar__title">
            <h2>{getPageTitle(location.pathname)}</h2>
            <p>Stay on top of your medication plan</p>
          </div>

          <div className="topbar__actions">
            <button className="topbar__button" type="button" aria-label="Notifications">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="topbar__button" type="button" aria-label="Settings">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="avatar" title={user?.fullName || user?.email || "User"}>
              {initials}
            </div>
          </div>
        </header>

        <div className="content-area"><Outlet/></div>
      </div>
    </div>
  );
};

export default NavBar;
