import Card from "../ui/Card";

export default function KPISection() {
  const data = [
  { title: "Devices", value: 24, color: "#4a7ff7" },
  { title: "Online", value: 18, color: "#22c55e" },
  { title: "Warning", value: 4, color: "#f59e0b" },
  { title: "Offline", value: 2, color: "#ef4444" },
];

  return (
    <div className="bg-[#1e1e1e] border border-[#444444] rounded-lg p-2 backdrop-blur grid lg:grid-cols-4 md:grid-cols-2 gap-2">
      {data.map((item, i) => (
      <Card 
        key={i}
        style={{ borderColor: item.color }}
      >
        <p className="text-white text-sm">{item.title}</p>

        <h2
          className="text-3xl font-bold"
          style={{ color: item.color }}
        >
          {item.value}
        </h2>
      </Card>
    ))}
    </div>
  );
}