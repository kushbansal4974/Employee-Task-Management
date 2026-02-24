import { useEffect, useState } from "react";
import { createTask, getAllTasks } from "../api/taskApi";
import API from "../api/axios";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    deadline: "",
    status: "Pending",
    assignedTo: "",
  });
  
  const fetchTasks = async () => {
    try {
      const { data } = await getAllTasks();
      setTasks(data.tasks || []);
    } catch (err) {
      toast.error("Error fetching tasks");
    }
  };


  const fetchEmployees = async () => {
    try {
      const { data } = await API.get("/users/employees");
      setEmployees(data.employees || []);
    } catch (err) {
      toast.error("Error fetching employees");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.deadline || !form.assignedTo)
      return toast.error("Fill all required fields");

    try {
      await createTask(form);
      toast.success("Task created successfully");
      setForm({ title: "", description: "", priority: "Low", deadline: "", status: "Pending", assignedTo: "" });
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating task");
    }
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>


      <form onSubmit={handleCreate} className="bg-white p-6 rounded-xl shadow space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          className="w-full border p-3 rounded-lg"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Task Description"
          className="w-full border p-3 rounded-lg"
          value={form.description}
          onChange={handleChange}
        />
        <select
          name="priority"
          className="w-full border p-3 rounded-lg"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          name="deadline"
          className="w-full border p-3 rounded-lg"
          value={form.deadline}
          onChange={handleChange}
        />
        <select
          name="status"
          className="w-full border p-3 rounded-lg"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          name="assignedTo"
          className="w-full border p-3 rounded-lg"
          value={form.assignedTo}
          onChange={handleChange}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name} ({emp.email})
            </option>
          ))}
        </select>

        <button className="bg-black text-white px-6 py-3 rounded-lg">
          Create Task
        </button>
      </form>


      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-medium mb-4">All Tasks</h2>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border p-4 rounded-lg"
            >
              <div>
                <h3 className="font-bold text-lg">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <p>Priority: <span className="font-medium">{task.priority}</span></p>
                <p>Status: <span className="font-medium">{task.status}</span></p>
                <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                <p>Assigned To: {task.assignedTo?.name || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}