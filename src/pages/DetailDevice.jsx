import { useParams } from "react-router-dom";
import { dummyData, getSeverityColor } from "../data/dummyDevice";
import MiniChart from "../components/Device/MiniCHart";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

export default function DeviceDetail() {
  const { id } = useParams();
  const device = dummyData.find(d => d.id === Number(id));

  if (!device) return <p>Not found</p>;

  const detail = device.detail;

  return (
    <div className="p-4 bg-[#121212] min-h-screen text-gray-300 space-y-4">
      <Card>
        <div>
          <h1 className="text-lg md:text-xl lg:text-2xl text-white leading-tight text-left">
            {device.host} ({device.ip})
          </h1>
          
          <div className="grid grid-cols-2 md:flex md:gap-6 mt-2 text-sm">
            <div className="flex flex-col gap-3 ">
              <Card className= "flex h-10 items-center justify-center">
                <p>
                  Status: <Badge color={device.status === "Unavailable" ? "red" : "green"}>
                  {device.status}
                </Badge>
                </p>
              </Card>
              <Card className= "flex h-10 items-center justify-center">
                <p>
                  Severity: {" "}
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
            
            <p>Last Update: {detail.lastUpdate}</p>
          </div>

        </div>
      </Card>
      {/* HEADER */}
      

      {/* GRID CONTENT */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <DeviceCard
          title="CPU"
          value={`${detail.cpu.usage}%`}
          data={detail.cpu.history}
        />

        <DeviceCard
          title="Memory"
          value={`${detail.memory.usage}%`}
          data={detail.memory.history}
        />

        <DeviceCard
          title="Network"
          value={`${detail.network.download} ↓ / ${detail.network.upload} ↑`}
          data={detail.network.traffic}
        />

        <DeviceCard
          title="Storage"
          value={`${detail.storage.used}% used`}
          data={[detail.storage.used, detail.storage.free]}
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