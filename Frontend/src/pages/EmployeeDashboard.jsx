import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

export default function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks/my-tasks"); // backend route
      if (data.success) {
        setTasks(data.tasks || []);
      } else {
        toast.error("No tasks found");
      }
    } catch (err) {
      toast.error("Error fetching tasks");
    }
  };

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/users/me"); // current user info
      if (data.success) setUser(data.user);
    } catch (err) {
      toast.error("Error fetching profile");
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-semibold">Employee Dashboard</h1>

      {/* User Profile */}
      {user && (
        <div className="bg-white p-6 rounded-xl shadow space-y-2">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}

      {/* Tasks List */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-medium mb-4">My Tasks</h2>
        {tasks.length === 0 && <p>No tasks assigned yet.</p>}
        {tasks.map((task) => (
          <div
            key={task._id}
            className="border p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p>
              <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
              <p>Assigned By: {task.assignedTo?.name || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}