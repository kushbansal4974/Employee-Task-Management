import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Navbar from "./components/Navbar";

export default function App() {
  const { user, logoutUser } = useAuth();

  return (
    <Router>
      {user && <Navbar user={user} onLogout={logoutUser} />}
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={`/${user.role}-dashboard`} />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to={`/${user.role}-dashboard`} />}
        />
        <Route
          path="/admin-dashboard"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/employee-dashboard"
          element={user?.role === "employee" ? <EmployeeDashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={user ? `/${user.role}-dashboard` : "/login"} />} />
      </Routes>
    </Router>
  );
}