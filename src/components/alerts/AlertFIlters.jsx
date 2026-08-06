import Card from "../ui/Card";

export default function AlertFilters({ statusFilter, setStatusFilter, sevFilter, setSevFilter }) {
  
  return (
    <div className="p-3">
      <Card className="mb-4 grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_auto] gap-3 items-center">
      <input
        className="flex-1 min-w-50 bg-[#111] border border-[#444444] px-3 py-2 rounded"
        placeholder="Search device / IP..."
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="bg-[#111] border border-[#444444] px-3 py-2 rounded"
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Resolved">Resolved</option>
      </select>

      <select
        value={sevFilter}
        onChange={(e) => setSevFilter(e.target.value)}
        className="bg-[#111] border border-[#444444] px-3 py-2 rounded"
      >
        <option value="All">All Severity</option>
        <option value="Critical">Critical</option>
        <option value="Warning">Warning</option>
        <option value="Info">Info</option>
      </select>
    </Card>
    </div>
  );
}