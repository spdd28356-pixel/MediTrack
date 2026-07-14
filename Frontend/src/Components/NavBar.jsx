import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "../assets/images/MediTrack_Logo.png";
import Setting from "../assets/icons/Setting.png"
import Notification from "../assets/icons/notification.png"
import Logout from "../assets/icons/Logout.png"
import Dashboard from "../assets/icons/Dashboard.png"
import Medication from "../assets/icons/Medicines.png"
import History from "../assets/icons/History.png"
import Person from "../assets/icons/Profile.png"

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Dashboard },
  { to: "/medicines", label: "Medicines", icon: Medication },
  { to: "/history", label: "History", icon: History },
  { to: "/profile", label: "Profile", icon: Person },
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

          <img 
                  src={item.icon} 
                  alt="" // Leave empty for decorative icons since you have the text label right below
                  className="sidebar__nav-icon" 
                  style={{ width: "20px", height: "20px" }} // Adjust sizing as needed
                />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <button className="sidebar__logout" onClick={handleLogout} type="button">
            <span className="material-symbols-outlined"><img src={Logout} alt="logout" style={{height:"20px", width:"20px"}} /></span>
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
              <span className="material-symbols-outlined"><img src={Notification} alt="notification" /></span>
            </button>
            <button className="topbar__button" type="button" aria-label="Settings">
              <span className="material-symbols-outlined"><img src={Setting} alt="setting" /></span>
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
 