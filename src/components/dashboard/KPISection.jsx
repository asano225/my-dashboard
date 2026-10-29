import Card from "../ui/Card";
import { useMonitoring } from "../../context/MonitoringContext";

export default function KPISection() {
  const { kpiData } = useMonitoring();
  const data = kpiData.kpiCards;

  return (
    <div className="p-2 backdrop-blur grid lg:grid-cols-4 md:grid-cols-2 gap-2">
      {data.map((item, i) => (
        <Card 
          key={i}
          style={{ 
            borderColor: item.color,
            backgroundColor: `${item.color}1A`
          }}
        >
          <p className="text-white text-sm">{item.title}</p>

          <h2
            className="text-4xl font-bold"
            style={{ color: item.color }}
          >
            {item.value}
          </h2>
        </Card>
      ))}
    </div>
  );
}
