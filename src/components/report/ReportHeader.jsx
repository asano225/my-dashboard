export default function ReportHeader({
  selectedTime,
  setSelectedTime,
  selectedDevice,
  setSelectedDevice
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
      <div>
        <p className="text-gray-400 text-sm">
          Analyze system performance over time
        </p>
      </div>

      <div className="flex gap-2">
        <select
          className="bg-[#eeeeee] text-sm px-3 py-2 rounded-md text-black"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="1d">Last 1 days</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>

        <select
          className="bg-[#eeeeee] text-sm px-3 py-2 rounded-md text-black"
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
        >
          <option value="all">All Devices</option>
          <option value="server-a">Server A</option>
          <option value="router-b">Router B</option>
        </select>
      </div>

    </div>
  );
}