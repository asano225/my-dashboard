export default function ReportHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
      <div>
        <p className="text-gray-400 text-sm">
          Analyze system performance over time
        </p>
      </div>

      <div className="flex gap-2">
        <select className="bg-[#111827] text-sm px-3 py-2 rounded-lg">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>

        <select className="bg-[#111827] text-sm px-3 py-2 rounded-lg">
          <option>All Devices</option>
        </select>
      </div>

    </div>
  );
}