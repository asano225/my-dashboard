import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DeviceForm({ devices, setDevices }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const existingDevice = isEdit
    ? devices.find(d => d.id === Number(id))
    : null;

  const [form, setForm] = useState(() => ({
    host: existingDevice?.host || "",
    dev: existingDevice?.dev || "",
    ip: existingDevice?.ip || "",
    group: existingDevice?.group || "",
    severity: existingDevice?.severity || "",
    status: existingDevice?.status || "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      const updatedDevice = {
        ...existingDevice,
        ...form,
      };

      setDevices(prev =>
        prev.map(d => d.id === Number(id) ? updatedDevice : d)
      );

    } else {
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

      setDevices(prev => [...prev, newDevice]);
    }

    navigate("/devices");
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="max-w-xl w-full">
        <h2 className="text-xl font-semibold mb-4">Device Form</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-[auto_1fr] space-y-4 gap-3 text-left">

          <label className="text-sm text-gray-300">User Name</label>
          <input
            type="text"
            name="host"
            placeholder="User Name"
            value={form.host}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#2a2a2a] text-white"
          />
          
          <label className="text-sm text-gray-300">Device Type</label>
          <select
            name="dev"
            value={form.dev}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#2a2a2a] text-white"
          >
            <option value="pc">PC</option>
            <option value="server">Server</option>
            <option value="router">Router</option>
          </select>

          <label className="text-sm text-gray-300">Ip Address</label>
          <input
            type="text"
            name="ip"
            placeholder="IP Address"
            value={form.ip}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#2a2a2a] text-white"
          />

          <label className="text-sm text-gray-300">Group</label>
          <input
            type="text"
            name="group"
            placeholder="Group Name"
            value={form.group}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#2a2a2a] text-white"
          />

          <label className="text-sm text-gray-300">Severity level</label>
          <select
            name="severity"
            value={form.severity}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#2a2a2a] text-white"
          >
            <option value="Health">Health</option>
            <option value="Warning">Warning</option>
            <option value="Critical">Critical</option>
          </select>


          <label className="text-sm text-gray-300">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#2a2a2a] text-white"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-800 h-fit"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded w-fit h-fit"
          >
            Cancel
          </button>

        </form>
      </div>
      
    </div>
  );
}