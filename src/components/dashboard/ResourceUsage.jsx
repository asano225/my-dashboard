import Card from "../ui/Card";
import { PieChart, Pie, Cell } from "recharts";

const dataCpu = [
  { name: "Used", value: 40 },
  { name: "Free", value: 60 },
];

const cpuColor = ["#3b82f6", "#e5e7eb"];

const dataRam = [
  { name: "Used", value: 25 },
  { name: "Free", value: 75 },
];

const ramColor = ["#3b82f6", "#e5e7eb"];

export default function ResourceUsage() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Card>
        <div  className="grid grid-cols-2 gap-4">
          <div className="items-center justify-center gap-4">
            <p className="text-gray-400 text-sm">Avg. CPU</p>
            <h2 className="text-4xl font-bold text-white">40%</h2>
          </div>

          
          <PieChart width={80} height={80}>
            <Pie
              data={dataRam}
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius={32}
              dataKey="value"
            >
              {dataCpu.map((entry, index) => (
                <Cell key={index} fill={cpuColor[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </Card>

      <Card>
        <div  className="grid grid-cols-2 gap-4">
          <div className="items-center justify-center gap-4">
            <p className="text-gray-400 text-sm">Avg. RAM</p>
            <h2 className="text-4xl font-bold text-white">25%</h2>
          </div>

          
          <PieChart width={80} height={80}>
            <Pie
              data={dataRam}
              cx="50%"
              cy="50%"
              innerRadius={20}
              outerRadius={32}
              dataKey="value"
            >
              {dataCpu.map((entry, index) => (
                <Cell key={index} fill={ramColor[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </Card>
    </div>
  );
}