export default function ReportHeader({
  selectedTime,
  setSelectedTime,
  selectedDevice,
  setSelectedDevice,
  devices = []
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold text-white">Reports & Historical Analytics</h2>
        <p className="text-gray-400 text-sm">
          Analyze real network throughput, latency, and resource performance over time
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          className="bg-[#2a2a2a] border border-[#444] text-sm px-3 py-2 rounded-md text-white outline-none focus:border-blue-500 cursor-pointer"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="1d">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>

        <select
          className="bg-[#2a2a2a] border border-[#444] text-sm px-3 py-2 rounded-md text-white outline-none focus:border-blue-500 cursor-pointer"
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
        >
          <option value="all">All Devices (Aggregate)</option>
          {devices.map((d) => (
            <option key={d.id} value={d.id}>
              {d.host} ({d.ip})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
