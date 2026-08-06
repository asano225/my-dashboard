import Card from "../ui/Card";

const data = [
  { title: "Uptime", value: "99.8%", color: "#22c55e" },
  { title: "Total Alerts", value: "32", color: "#ef4444" },
  { title: "Avg CPU", value: "65%", color: "#f59e0b" },
  { title: "Avg RAM", value: "70%", color: "#4a7ff7" },
];

export default function ReportSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <Card
          key={index}
          className="bg-[#1e1e1e] p-4"
        >
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