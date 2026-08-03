export default function Badge({ children, color }) {
  const colors = {
    red: "bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded",
    yellow: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-1 rounded",
    green: "bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded",
  };

  return (
    <span className={`px-2 py-1 rounded-md text-xs ${colors[color]}`}>
      {children}
    </span>
  );
}