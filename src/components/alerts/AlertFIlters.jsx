export default function AlertFilters() {
  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg mb-4 flex flex-wrap gap-3 items-center">
      <input
        className="bg-[#111] border border-gray-700 px-3 py-2 rounded w-64"
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