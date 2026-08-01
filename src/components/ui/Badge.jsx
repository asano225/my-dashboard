export default function Badge({ children, color }) {
  const colors = {
    red: "bg-red-500/10 text-red-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    green: "bg-green-500/10 text-green-400",
  };

  return (
    <span className={`px-2 py-1 rounded-md text-xs ${colors[color]}`}>
      {children}
    </span>
  );
}