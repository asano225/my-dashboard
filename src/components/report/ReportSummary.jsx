import Card from "../ui/Card";

export default function ReportSummary({ data }) {
  // ⛑️ handle kalau data kosong
  if (!data) return null;

  const avgCpu =
    data.resource.reduce((sum, d) => sum + d.cpu, 0) /
      data.resource.length || 0;

  const avgRam =
    data.resource.reduce((sum, d) => sum + d.ram, 0) /
      data.resource.length || 0;

  const totalAlerts = data.alerts.reduce(
    (sum, d) => sum + d.critical + d.warning,
    0
  );

  const uptime = 100 - totalAlerts * 0.2;

  // ✅ rename biar tidak bentrok
  const summaryData = [
    {
      title: "Uptime",
      value: `${uptime.toFixed(1)}%`,
      color: "#22c55e",
    },
    {
      title: "Total Alerts",
      value: totalAlerts,
      color: "#ef4444",
    },
    {
      title: "Avg CPU",
      value: `${avgCpu.toFixed(0)}%`,
      color: "#f59e0b",
    },
    {
      title: "Avg RAM",
      value: `${avgRam.toFixed(0)}%`,
      color: "#4a7ff7",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {summaryData.map((item) => (
        <Card key={item.title}>
          <p className="text-gray-400 text-sm">{item.title}</p>
          <h2
            className="text-2xl font-semibold"
            style={{ color: item.color }}
          >
            {item.value}
          </h2>
        </Card>
      ))}
    </div>
  );
}