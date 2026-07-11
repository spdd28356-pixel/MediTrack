import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar.jsx";

const MainLayout = () => {
  return (
    <div className="shell-layout">
      <Sidebar />
      <div className="shell-main">
        <header className="topbar">
          <div className="topbar__title">
            <h2>MediTrack</h2>
            <p>Stay on top of your medication plan</p>
          </div>
        </header>
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
