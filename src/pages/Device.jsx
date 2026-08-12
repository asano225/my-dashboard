import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DeviceSearch from "../components/device/DeviceSearch";
import DeviceTable from "../components/device/DeviceTable";
import DeviceFilter from "../components/device/DeviceFilter";

export default function DevicePage( {data, setDevices} ) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    status: "All",
    severity: "All",
    group: "All",
    tags: [],
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const handleApply = (newFilters) => {
    console.log("FILTERS SAAT APPLY:", filters);
    setAppliedFilters(newFilters || filters);
    setOpen(false);
  };


  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Yakin mau hapus device ini?");
    if (!confirmDelete) return;

    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  const uniqueTags = useMemo(
    () => [...new Set(data.map(item => item.dev.toLowerCase()))],
    [data]
  );

  const groupOptions = useMemo(
    () => [...new Set((data || []).map(item => item.group))],
    [data]
  );

  const filteredData = data.filter((item) => {
    const statusMatch =
      appliedFilters.status === "All" ||
      item.status === appliedFilters.status;

    const severityMatch =
      appliedFilters.severity === "All" ||
      item.severity === appliedFilters.severity;

    const groupMatch =
      appliedFilters.group === "All" ||
      item.group === appliedFilters.group;

    const tagMatch =
      appliedFilters.tags.length === 0 ||
      appliedFilters.tags.includes(item.dev.toLowerCase());

      console.log("APPLIED FILTERS:", appliedFilters);

    return statusMatch && severityMatch && groupMatch && tagMatch;
  });

  return (
    <div className="flex gap-4 p-4 bg-[#121212] min-h-screen text-sm text-gray-300">
      <div className="flex-1 space-y-4">
        <DeviceSearch onOpenFilter={() => setOpen(true)} />
        <div className="flex">
          <button
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 text-white cursor-pointer"
          onClick={() => navigate("/devices/new")}
        >
          + Add Device
        </button>
        </div>
        
         
        <DeviceTable
          data={filteredData}
          onDelete={handleDelete}
        />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <DeviceFilter
          onClose={() => setOpen(false)}
          filters={filters}
          setFilters={setFilters}
          onApply={handleApply}
          tagOptions={uniqueTags}
          groupOptions={groupOptions}
        />
      </div>
    </div>
  );

  
}

