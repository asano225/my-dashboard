export default function AlertSummary({ alerts }) {
  const count = (type) =>
    alerts.filter((a) => a.severity === type).length;

  return (
    <div className="grid grid-cols-4 gap-4 mb-4">
      <Card title="Critical" value={count("Critical")} color="red" />
      <Card title="Warning" value={count("Warning")} color="yellow" />
      <Card title="Info" value={count("Info")} color="blue" />
      <Card title="Total" value={alerts.length} color="gray" />
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`p-4 rounded-lg bg-[#1a1a1a] border-l-4 border-${color}-500`}>
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}