import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/users/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registered Successfully");
      navigate("/");
    } catch (error) {
      alert("Registration Failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-zinc-300 rounded-lg px-4 py-3"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-zinc-300 rounded-lg px-4 py-3"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-zinc-300 rounded-lg px-4 py-3"
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full border border-zinc-300 rounded-lg px-4 py-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

          <button className="w-full bg-zinc-900 text-white py-3 rounded-lg">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-zinc-900 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}