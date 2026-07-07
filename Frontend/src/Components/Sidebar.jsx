import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <p className="sidebar__title">Quick Links</p>
      <ul className="sidebar__list">
        <li>
          <NavLink className="sidebar__link" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className="sidebar__link" to="/medicines">
            Medicines
          </NavLink>
        </li>
        <li>
          <NavLink className="sidebar__link" to="/history">
            History
          </NavLink>
        </li>
        <li>
          <NavLink className="sidebar__link" to="/profile">
            Profile
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
