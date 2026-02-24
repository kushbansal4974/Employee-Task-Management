export default function StatCard({ title, value }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      <p className="text-sm text-zinc-500">{title}</p>
      <h2 className="text-3xl font-semibold mt-2">{value}</h2>
    </div>
  );
} 