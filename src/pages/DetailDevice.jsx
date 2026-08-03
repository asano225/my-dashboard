import { useParams } from "react-router-dom";
import { dummyData} from "../data/dummyDevice";
import { MiniChart, PieChartCard } from "../components/Device/MiniCHart";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";



export default function DeviceDetail() {
  const { id } = useParams();
  const device = dummyData.find(d => d.id === Number(id));

  if (!device) return <p>Not found</p>;

  const detail = device.detail;

  if (!detail) {
    return <p className="text-red-400">Detail data not available</p>;
  }

  return (
    <div className="p-4 bg-[#121212] min-h-screen text-gray-300 space-y-4">
      <div>
        <div>
          <h1 className="text-lg md:text-xl lg:text-2xl text-white leading-tight text-left">
            {device.host} ({device.ip})
          </h1>
          
          <div className="flex flex-col md:flex-row gap-3 mt-2 text-sm">
            <div className="flex flex-col gap-2 h-full w-full md:w-62.5">
              <Card className= "flex h-full bg-[#1f2937] text-left">
                <p>
                  Status: {" "}
                </p>
                <p>
                  <Badge color={device.status === "Unavailable" ? "red" : "green"}>
                     {device.status}
                  </Badge>
                </p>
              </Card>
              <Card className= "flex h-full bg-[#1f2937] text-left">
                <p>
                  Severity: {" "}
                  
                </p>
                <p>
                  <Badge
                    color={
                      device.severity === "Critical"
                        ? "red"
                        : device.severity === "Warning"
                        ? "yellow"
                        : "green"
                    }
                  >
                     {device.severity}
                  </Badge>
                </p>
              </Card>
            </div>
            <div className="flex flex-col gap-3 w-full h-full ">
                
                {/* CPU & RAM*/}
                <Card className="bg-[#c1cfff] p-4 h-full w-full space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-black font-semibold">CPU Usage</h3>
                      <p className="text-sm text-black">{detail.cpu.usage}%</p>
                    </div>

                    <div className="w-full bg-[#364153] h-2 rounded">
                      <div
                        className="bg-blue-500 h-2 rounded"
                        style={{ width: `${detail.cpu.usage}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-black font-semibold">RAM Usage</h3>
                      <p className="text-sm text-black">{detail.memory.usage}%</p>
                    </div>

                    <div className="w-full bg-[#364153] h-2 rounded">
                      <div
                        className="bg-purple-500 h-2 rounded"
                        style={{ width: `${detail.memory.usage}%` }}
                      />
                    </div>
                  </div>
                </Card>
              </div>
              <Card className= "flex flex-col text-left text-black justify-center bg-[#38b6ff]">
                <p>
                  Download: 
                </p>
                <p className="text-2xl font-bold">
                  {detail.network.download}Mbps
                </p>
              </Card>
              <Card className= "flex flex-col text-left text-black justify-center bg-[#cb6ce6]">
                <p>
                  Upload: 
                </p>
                <p className="text-2xl font-bold">
                  {detail.network.upload}Mbps
                </p>
              </Card>

            
          </div>

        </div>
      </div>
      {/* HEADER */}
      

      {/* GRID CONTENT */}
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

    </div>
  );
}



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