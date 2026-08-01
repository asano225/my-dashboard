import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../ui/Card";

const data = [
  { time: "07:00", traffic: 300 },
  { time: "07:10", traffic: 400 },
  { time: "07:20", traffic: 300 },
  { time: "07:30", traffic: 600 },
  { time: "07:40", traffic: 500 },
  { time: "07.50", traffic: 200 },
  { time: "08:00", traffic: 600 },
  { time: "08:10", traffic: 400 },
  { time: "08:20", traffic: 300 },
  { time: "08:30", traffic: 600 },
  { time: "08:40", traffic: 500 },
  { time: "08.50", traffic: 400 },
  { time: "09:00", traffic: 500 },
  { time: "09:10", traffic: 400 },
  { time: "09:20", traffic: 300 },
  { time: "09:30", traffic: 350 },
  { time: "09:40", traffic: 500 },
  { time: "09.50", traffic: 200 },
  { time: "10.00", traffic: 200 },
  { time: "10:10", traffic: 400 },
  { time: "10:20", traffic: 300 },
  { time: "10:30", traffic: 600 },
  { time: "10:40", traffic: 500 },
  { time: "10.50", traffic: 200 },
  { time: "11:00", traffic: 400 },
  { time: "11:10", traffic: 400 },
  { time: "11:20", traffic: 300 },
  { time: "11:30", traffic: 400 },
  { time: "11:40", traffic: 500 },
  { time: "11.50", traffic: 200 },
  { time: "12:00", traffic: 300 },
];

export default function TrafficChart() {
  return (
    <Card className="h-80 bg-[#1e1e1e] border border-[#444444] p-4 flex flex-col">
      
      {/* Header */}
      <h3 className="text-white mb-2 font-semibold">
        Network Traffic
      </h3>

      {/* Chart container */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 5, right: 10, left: -32, bottom: -5 }}
          >
            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="traffic"
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </Card>
  );
}