import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

export function MiniChart({ data }) {
  let chartData = [];

  // 🟢 CASE 1: data lama (1 garis)
  if (Array.isArray(data)) {
    chartData = data.map((value, index) => ({
      name: index,
      value,
    }));
  }

  // 🔵 CASE 2: data baru (2 garis)
  else if (data?.download && data?.upload) {
    chartData = data.download.map((_, index) => ({
      name: index,
      download: data.download[index],
      upload: data.upload[index],
    }));
  }

  return (
    <div className="mt-3 h-16">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          
          {/* ✅ 1 garis (lama) */}
          {Array.isArray(data) && (
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
          )}

          {/* ✅ 2 garis (baru) */}
          {!Array.isArray(data) && (
            <>
              <Line
                type="monotone"
                dataKey="download"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="upload"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </>
          )}

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PieChartCard({
  data,
  colors,
  centerLabel,
}) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ResponsiveContainer>
        <PieChart>
           <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="40%"
            cy="40%"
            outerRadius={50}
            label={false}   // ⬅️ ini penting (hapus label)
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label */}
      {centerLabel && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
          }}
        >
          {centerLabel}
        </div>
      )}
    </div>
  );
}