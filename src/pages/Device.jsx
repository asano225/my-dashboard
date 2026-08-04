import { useState } from "react";
import DeviceSearch from "../components/device/DeviceSearch";
import DeviceTable from "../components/device/DeviceTable";
import DeviceFilter from "../components/device/DeviceFilter";

export default function DevicePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4 p-4 bg-[#121212] min-h-screen text-sm text-gray-300">
      
      <div className="flex-1 space-y-4">
        <DeviceSearch onOpenFilter={() => setOpen(true)} />
        <DeviceTable />
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <DeviceFilter onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}