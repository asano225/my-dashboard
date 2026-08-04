import { Search, SlidersHorizontal } from "lucide-react";

export default function DeviceSearch({ onOpenFilter }) {
  return (
    <div className="bg-[#1e1e1e] p-3 rounded-lg border border-[#444] flex gap-2 items-center">
      
      <div className="flex items-center gap-2 bg-[#2a2a2a] px-3 py-2 rounded-md flex-1">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Device name or IP Address..."
          className="bg-transparent outline-none w-full text-gray-200"
        />
      </div>

      {/* Tombol filter */}
      <button
        onClick={onOpenFilter}
        className="flex items-center gap-2 px-3 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
      >
        <SlidersHorizontal size={18} />
      </button>
    </div>
  );
}