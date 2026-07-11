import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/medicines", label: "Medicines", icon: "medication" },
  { to: "/history", label: "History", icon: "history" },
  { to: "/profile", label: "Profile", icon: "person" },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-icon">
          <span className="material-symbols-outlined">medication</span>
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
    </aside>
  );
};

export default Sidebar;
