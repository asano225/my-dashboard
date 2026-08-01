import DeviceSearch from "../components/device/DeviceSearch";
import DeviceTable from "../components/device/DeviceTable";
import DeviceFilter from "../components/device/DeviceFilter";

export default function DevicePage() {
  return (
    <div className="flex gap-4 p-4 bg-[#121212] min-h-screen text-sm text-gray-300">
      
      <div className="flex-1 space-y-4">
        <DeviceSearch />
        <DeviceTable />
      </div>

      <DeviceFilter />
    </div>
  );
}