import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import Card from "../ui/Card";

const ReportChart = ({
  title,
  data = [],
  lines = [],
  dataKeyX = "time",
}) => {
  return (
    <Card className="p-4 shadow-md">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
      </div>

      {/* Chart */}
      <div className="w-full h-75">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: -32, bottom: -5 }}
          >
            <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />

            <XAxis
              dataKey={dataKeyX}
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            <YAxis
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #1f2937",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Legend />

            {/* 🔥 Dynamic Lines */}
            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.color}
                strokeWidth={2}
                dot={false}
                name={line.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ReportChart;