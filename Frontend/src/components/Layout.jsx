import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => navigate("/login"))
      .catch(console.log);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <div className="w-64 bg-white shadow flex flex-col">
        <div className="p-6 font-bold text-xl border-b">Task Manager</div>
        <nav className="flex-1 p-4 space-y-2">
          {user.role === "admin" && (
            <>
              <Link to="/admin" className="block p-2 rounded hover:bg-gray-200">Dashboard</Link>
              <Link to="/admin/tasks" className="block p-2 rounded hover:bg-gray-200">Tasks</Link>
            </>
          )}
          {user.role === "employee" && (
            <>
              <Link to="/employee" className="block p-2 rounded hover:bg-gray-200">My Tasks</Link>
            </>
          )}
        </nav>
        <div className="p-4 border-t">
          <div className="text-sm mb-2">{user.name}</div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>


      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}