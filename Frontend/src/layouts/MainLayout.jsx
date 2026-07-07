import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import Sidebar from "../Components/Sidebar.jsx";

const MainLayout = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="layout-shell">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
