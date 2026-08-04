export default function DeviceFilter({ 
  onClose, 
  filters, 
  setFilters, 
  onApply, 
  tagOptions,
  groupOptions
}) {

  const handleTagChange = (tag) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleReset = () => {
  const reset = {
    status: "All",
    severity: "All",
    group: "All",
    tags: [],
  };
  setFilters(reset);
  onApply(reset); // langsung apply
};

  return (
    <div className="h-full w-64 bg-[#1e1e1e] p-4 border border-[#444] space-y-4">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-gray-200 font-semibold">Filter</h2>
        <button onClick={onClose} className="text-gray-400">✕</button>
      </div>

      {/* Status */}
      <div className="flex justify-between items-center">
        <label className="text-gray-400">Status :</label>
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              status: e.target.value,
            }))
          }
          className="text-black w-38 mt-1 bg-white p-2 rounded-md"
        >
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>

      {/* Severity */}
      <div className="flex justify-between items-center">
        <label className="text-gray-400">Severity :</label>
        <select
          value={filters.severity}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              severity: e.target.value,
            }))
          }
          className="text-black w-38 mt-1 bg-white p-2 rounded-md"
        >
          <option value="All">All</option>
          <option value="Warning">Warning</option>
          <option value="Critical">Critical</option>
          <option value="Health">Health</option>
        </select>
      </div>

      {/* Group */}
      <div className="flex justify-between items-center">
        <label className="text-gray-400">Group :</label>
        <select
          value={filters.group}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              group: e.target.value,
            }))
          }
          className="text-black w-38 mt-1 bg-white p-2 rounded-md"
        >
          <option value="All">All</option>
          {groupOptions.map(group => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div>
        <label className="text-gray-400 block text-left">Tag :</label>
        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
          {tagOptions?.map(tag => (
            <label key={tag} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={() => handleTagChange(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={() => onApply(filters)}
          className="flex-1 bg-blue-600 py-2 rounded-md hover:bg-blue-500"
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className="flex-1 bg-gray-700 py-2 rounded-md hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}