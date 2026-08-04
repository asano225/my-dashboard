export default function AlertSummary({ alerts }) {
  const count = (type) =>
    alerts.filter((a) => a.severity === type).length;

  return (
    <div className="grid grid-cols-4 p-4 gap-4 mb-4">
      <Card title="Critical" value={count("Critical")} color="red" />
      <Card title="Warning" value={count("Warning")} color="yellow" />
      <Card title="Info" value={count("Info")} color="blue" />
      <Card title="Total" value={alerts.length} color="gray" />
    </div>
  );
}

function Card({ title, value, color }) {
  const colorVariants = {
  red: "bg-red-500/20 border-red-500",
  yellow: "bg-yellow-500/20 border-yellow-500",
  blue: "bg-blue-500/20 border-blue-500",
  gray: "bg-gray-500/20 border-gray-500",
};
  return (
    <div className={`items-center p-2 justify-center rounded-md border-l-4 ${colorVariants[color]}`}>
      <p className="text-lg font-bold">{title}:  {value}</p>
    </div>
  );
}