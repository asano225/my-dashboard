import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../ui/Card";
import { useMonitoring } from "../../context/MonitoringContext";

export default function TrafficChart() {
  const { trafficChartData } = useMonitoring();

  return (
    <Card className="h-80 bg-[#1e1e1e] border border-[#444444] p-4 flex flex-col">
      {/* Header */}
      <h3 className="text-white mb-2 font-semibold">
        Network Traffic (Mbps)
      </h3>

      {/* Chart container */}
      <div className="flex-1 font-mono">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={trafficChartData}
            margin={{ top: 5, right: 10, left: -25, bottom: -5 }}
          >
            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                borderColor: "#3f3f46",
                borderRadius: "6px",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="traffic"
              name="Traffic (Mbps)"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
