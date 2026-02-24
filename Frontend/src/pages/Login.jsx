import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/users/login", {
        email,
        password,
      });

      setUser(data.user); 

      toast.success("Login successful");

      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/employee-dashboard");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow w-96 space-y-4"
      >
        <h1 className="text-xl font-semibold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-3 rounded-lg">
          Login
        </button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}