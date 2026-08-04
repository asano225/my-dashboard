import { useParams } from "react-router-dom";
import { dummyData} from "../data/dummyDevice";
import DeviceSummary from "../components/DeviceDetail/DeviceSummary";
import DeviceChart from "../components/DeviceDetail/DeviceChart";



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
          <p className="text-lg md:text-xl font-semibold lg:text-2xl text-white leading-tight text-left">
            {device.host} ({device.ip})
          </p>
          
          <DeviceSummary />

        </div>
      </div>
      <DeviceChart />
    </div>
    
  );
}



