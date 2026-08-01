import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

export default function MiniChart({ data }) {
  const chartData = data.map((value, index) => ({
    name: index,
    value,
  }));

  return (
    <div className="mt-3 h-16">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}