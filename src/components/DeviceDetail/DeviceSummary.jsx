import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { useParams } from "react-router-dom";
import { dummyData } from "../../data/dummyDevice";

export default function DeviceSummary() {
  const { id } = useParams();
    const device = dummyData.find(d => d.id === Number(id));
  
    if (!device) return <p>Not found</p>;
  
    const detail = device.detail;
  
    if (!detail) {
      return <p className="text-red-400">Detail data not available</p>;
    }
  return (
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
  );
};