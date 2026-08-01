import { Search } from "lucide-react";

export default function DeviceSearch() {
  return (
    <div className="bg-[#1e1e1e] p-3 rounded-lg border border-[#444]">
      <div className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-2 rounded-md">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Device name or IP Address..."
          className="bg-transparent outline-none w-full text-gray-200"
        />
      </div>
    </div>
  );
}