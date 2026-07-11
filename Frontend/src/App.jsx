import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import NavBar from "./Components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Medicine from "./pages/Medicine.jsx";
import AddEditMedicine from "./pages/AddEditMedicine.jsx";
import History from "./pages/History.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";

const AppContent = () => {
  return (
    <div className="app-shell">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<NavBar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/medicines" element={<Medicine />} />
            <Route path="/medicines/add" element={<AddEditMedicine />} />
            <Route path="/medicines/:id/edit" element={<AddEditMedicine />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
const App = () => (
  <AuthProvider>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
