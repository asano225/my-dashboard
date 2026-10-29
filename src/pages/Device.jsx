import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DeviceSearch from "../components/Device/DeviceSearch";
import DeviceTable from "../components/Device/DeviceTable";
import DeviceFilter from "../components/Device/DeviceFilter";
import { useMonitoring } from "../context/MonitoringContext";

export default function DevicePage({ data: propData, setDevices }) {
  const navigate = useNavigate();
  const monitoring = useMonitoring();

  const data = propData || monitoring.devices;
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    status: "All",
    severity: "All",
    group: "All",
    tags: [],
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const handleApply = (newFilters) => {
    setAppliedFilters(newFilters || filters);
    setOpen(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin mau hapus device ini?");
    if (!confirmDelete) return;

    if (monitoring.deleteDevice) {
      await monitoring.deleteDevice(id);
    }
    if (setDevices) {
      setDevices((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const uniqueTags = useMemo(
    () => [...new Set((data || []).map((item) => (item.dev || "PC").toLowerCase()))],
    [data]
  );

  const groupOptions = useMemo(
    () => [...new Set((data || []).map((item) => item.group || "Default"))],
    [data]
  );

  const filteredData = (data || []).filter((item) => {
    const matchesSearch =
      !searchQuery ||
      (item.host || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.ip || "").toLowerCase().includes(searchQuery.toLowerCase());

    const statusMatch =
      appliedFilters.status === "All" || item.status === appliedFilters.status;

    const severityMatch =
      appliedFilters.severity === "All" || item.severity === appliedFilters.severity;

    const groupMatch =
      appliedFilters.group === "All" || item.group === appliedFilters.group;

    const tagMatch =
      appliedFilters.tags.length === 0 ||
      appliedFilters.tags.includes((item.dev || "").toLowerCase());

    return matchesSearch && statusMatch && severityMatch && groupMatch && tagMatch;
  });

  return (
    <div className="flex gap-4 p-4 bg-[#121212] min-h-screen text-sm text-gray-300">
      <div className="flex-1 space-y-4">
        <DeviceSearch
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onOpenFilter={() => setOpen(true)}
        />
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 text-white cursor-pointer transition font-medium"
            onClick={() => navigate("/devices/new")}
          >
            + Add Device
          </button>
          <span className="text-xs text-gray-400">
            Total Devices: {filteredData.length}
          </span>
        </div>

        <DeviceTable data={filteredData} onDelete={handleDelete} />
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
