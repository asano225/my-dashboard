export default function DeviceFilter() {
  return (
    <div className="w-64 bg-[#1e1e1e] p-4 rounded-lg border border-[#444] space-y-4">

      <h2 className="text-gray-200 font-semibold">Filter</h2>

      <div className="flex justify-between items-center">
        <label className="text-gray-400">Status :</label>
        <select className="text-black w-38 mt-1 bg-[#ffffff] p-2 rounded-md">
          <option>Available</option>
          <option>Unavailable</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
        <label className="text-gray-400">Severity :</label>
        <select className="text-black w-38 mt-1 bg-[#ffffff] p-2 rounded-md">
          <option>Warning</option>
          <option>Critical</option>
          <option>Health</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
        <label className="text-gray-400">Group :</label>
        <select className="text-black w-38 mt-1 bg-[#ffffff] p-2 rounded-md">
          <option>WJS</option>
        </select>
      </div>

      <div>
        <label className="text-gray-400 block text-left">Tag :</label>
        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
          {["Server", "PC", "Router", "Switch", "Camera", "Print"].map(tag => (
            <label key={tag} className="flex items-center gap-2">
              <input type="checkbox" />
              {tag}
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button className="flex-1 bg-blue-600 py-2 rounded-md">
          Apply
        </button>
        <button className="flex-1 bg-gray-700 py-2 rounded-md">
          Reset
        </button>
      </div>
    </div>
  );
}