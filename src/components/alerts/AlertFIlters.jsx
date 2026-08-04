export default function AlertFilters() {
  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg mb-4 grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_auto] gap-3 items-center">
      <input
        className="flex-1 min-w-50 bg-[#111] border border-gray-700 px-3 py-2 rounded"
        placeholder="Search device / IP..."
      />

      <select className="bg-[#111] border border-gray-700 px-3 py-2 rounded">
        <option>All Status</option>
        <option>Active</option>
        <option>Resolved</option>
      </select>

      <select className="bg-[#111] border border-gray-700 px-3 py-2 rounded">
        <option>All Severity</option>
        <option>Critical</option>
        <option>Warning</option>
        <option>Info</option>
      </select>

      <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
        Apply
      </button>

      <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
        Reset
      </button>
    </div>
  );
}