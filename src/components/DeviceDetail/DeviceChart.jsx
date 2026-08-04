import { useParams } from "react-router-dom";
import { dummyData } from "../../data/dummyDevice";
import { MiniChart, PieChartCard } from "../Device/MiniCHart";

export default function DeviceChart() {
  const { id } = useParams();
  const device = dummyData.find(d => d.id === Number(id));

  if (!device) return <p>Not found</p>;

  const detail = device.detail;

  if (!detail) {
    return <p className="text-red-400">Detail data not available</p>;
  }

  return(
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 text-left">
      <StorageSection 
        title="Storage"
        detail={detail.storage}
      />
      
      <DeviceCard
        title="CPU"
        data={detail.cpu.history}
      />

      <DeviceCard
        title="Memory"
        data={detail.memory.history}
      />

      <DeviceCard
        title="Network"
        data={detail.network.traffic}
      />
    </div>
  );
};

function DeviceCard({ title, value, data }) {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg border border-[#444]">
      <h2 className="text-sm text-gray-400">{title}</h2>

      <p className="text-xl font-semibold text-white mt-2">
        {value}
      </p>

      <MiniChart data={data} />
    </div>
  );
}

function StorageSection({ title, detail }) {
  const used = detail?.used ?? 0;
  const free = detail?.free ?? 0;

  const data = [
    { name: "Used", value: used },
    { name: "Free", value: free },
  ];

  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg border border-[#444]">
      <h2 className="text-sm text-gray-400">{title}</h2>

      <div className="flex items-center">
        
        <div className="flex-1">
          <div className="text-sm space-y-1">
            <div className="font-semibold">Used: {used}%</div>
            <div className="font-semibold">Free: {free}%</div>
          </div>
        </div>

        <div className="w-30 h-30">
          <PieChartCard
            data={data}
            colors={["#ff3131", "#00bf63"]}
          />
        </div>
      </div>
    </div>
  );
}

      