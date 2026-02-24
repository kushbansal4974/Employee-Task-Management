export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <span className="font-bold">Task Manager</span>
      <div className="space-x-4 flex items-center">
        <span>{user.name} ({user.role})</span>
        <button onClick={onLogout} className="bg-white text-black px-4 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
}