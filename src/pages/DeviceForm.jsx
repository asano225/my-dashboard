import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMonitoring } from "../context/MonitoringContext";

export default function DeviceForm({ devices: propDevices, setDevices }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const monitoring = useMonitoring();

  const allDevices = propDevices || monitoring.devices;
  const isEdit = Boolean(id);

  const existingDevice = isEdit
    ? allDevices.find((d) => String(d.id) === String(id))
    : null;

  const [form, setForm] = useState(() => ({
    host: existingDevice?.host || "",
    dev: existingDevice?.dev || "PC",
    ip: existingDevice?.ip || "",
    group: existingDevice?.group || "WJS",
    severity: existingDevice?.severity || "Health",
    status: existingDevice?.status || "Available",
    mode: existingDevice?.mode || "real",
  }));

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    if (confirm("Perubahan belum disimpan, yakin mau keluar?")) {
      navigate("/devices");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      if (monitoring.updateDevice) {
        await monitoring.updateDevice(id, form);
      }
      if (setDevices) {
        setDevices((prev) =>
          prev.map((d) => (String(d.id) === String(id) ? { ...d, ...form } : d))
        );
      }
    } else {
      if (monitoring.addDevice) {
        await monitoring.addDevice(form);
      }
      if (setDevices) {
        const newDevice = {
          id: Date.now(),
          ...form,
          problem: 0,
          detail: {
            user: form.host,
            cpu: { usage: 0, history: [] },
            memory: { usage: 0, history: [] },
            network: {
              download: 0,
              upload: 0,
              traffic: { download: [], upload: [] },
            },
            storage: { used: 0, free: 100 },
            lastUpdate: "-",
          },
        };
        setDevices((prev) => [...prev, newDevice]);
      }
    }

    navigate("/devices");
  };

  return (
    <div className="flex justify-center mt-10 p-4">
      <div className="max-w-xl w-full bg-[#1e1e1e] p-6 rounded-lg border border-[#444]">
        <h2 className="text-xl font-semibold mb-6 text-white border-b border-[#333] pb-3">
          {isEdit ? "Edit Monitored Device" : "Add New Device"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 text-left items-center">
          <label className="text-sm text-gray-300 font-medium">Host Name *</label>
          <input
            type="text"
            required
            name="host"
            placeholder="Device Name (e.g. Core-Router)"
            value={form.host}
            onChange={handleChange}
            className="w-full p-2.5 rounded bg-[#2a2a2a] text-white border border-[#444] focus:outline-none focus:border-blue-500"
          />

          <label className="text-sm text-gray-300 font-medium">Device Type</label>
          <select
            name="dev"
            value={form.dev}
            onChange={handleChange}
            className="w-full p-2.5 rounded bg-[#2a2a2a] text-white border border-[#444] focus:outline-none"
          >
            <option value="PC">PC</option>
            <option value="Server">Server</option>
            <option value="Router">Router</option>
            <option value="Switch">Switch</option>
            <option value="Camera">Camera</option>
            <option value="Print">Printer</option>
          </select>

          <label className="text-sm text-gray-300 font-medium">IP Address *</label>
          <input
            type="text"
            required
            name="ip"
            placeholder="IP Address (e.g. 192.168.1.1)"
            value={form.ip}
            onChange={handleChange}
            className="w-full p-2.5 rounded bg-[#2a2a2a] text-white border border-[#444] focus:outline-none focus:border-blue-500 font-mono text-sm"
          />

          <label className="text-sm text-gray-300 font-medium">Group</label>
          <input
            type="text"
            name="group"
            placeholder="Group Name (e.g. WJS, HQ)"
            value={form.group}
            onChange={handleChange}
            className="w-full p-2.5 rounded bg-[#2a2a2a] text-white border border-[#444] focus:outline-none"
          />

          <label className="text-sm text-gray-300 font-medium">Polling Mode</label>
          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
            className="w-full p-2.5 rounded bg-[#2a2a2a] text-white border border-[#444] focus:outline-none"
          >
            <option value="real">Real ICMP Ping + TCP</option>
            <option value="agent">Client Agent (Real CPU/RAM)</option>
            <option value="snmp">Real SNMP v2c</option>
            <option value="simulated">Simulated Demo</option>
          </select>

          <label className="text-sm text-gray-300 font-medium">Severity level</label>
          <select
            name="severity"
            value={form.severity}
            onChange={handleChange}
            className="w-full p-2.5 rounded bg-[#2a2a2a] text-white border border-[#444] focus:outline-none"
          >
            <option value="Health">Health</option>
            <option value="Warning">Warning</option>
            <option value="Critical">Critical</option>
          </select>

          <label className="text-sm text-gray-300 font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2.5 rounded bg-[#2a2a2a] text-white border border-[#444] focus:outline-none"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>

          <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-[#333]">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded text-white text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded text-white text-sm font-medium transition shadow"
            >
              {isEdit ? "Save Changes" : "Add Device"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
