export default function AlertDrawer({ alert, open, onClose, onResolve }) {
  const handleResolve = () => {
    if (onResolve && alert) {
      onResolve(alert.rawAlert?.id || alert.id);
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-[#1a1a1a] p-6 text-white z-50 transform transition-transform duration-300 ease-in-out border-l border-[#333] shadow-2xl ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {alert && (
          <div>
            <div className="flex items-center justify-between border-b border-[#333] pb-3 mb-4">
              <h2 className="text-xl font-semibold">Alert Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-xl leading-none font-bold"
              >
                &times;
              </button>
            </div>
            
            <div className="flex flex-col space-y-2 text-left text-sm">
              <p><b className="text-gray-300">Device:</b> <span className="font-medium text-white">{alert.device}</span></p>
              <p><b className="text-gray-300">IP:</b> <span className="font-mono text-gray-200">{alert.ip}</span></p>
              <p><b className="text-gray-300">Severity:</b> <span className="font-medium text-yellow-400">{alert.severity}</span></p>
              <p><b className="text-gray-300">Status:</b> <span className={alert.status === "Resolved" ? "text-green-400" : "text-red-400"}>{alert.status}</span></p>
              <p><b className="text-gray-300">Duration:</b> <span className="text-gray-200">{alert.duration || "Active"}</span></p>

              <div className="mt-3 p-3 bg-[#252525] rounded border border-[#333]">
                <p className="text-xs font-semibold uppercase text-gray-400 mb-1">Problem Description:</p>
                <p className="text-gray-200 text-sm">{alert.message}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-black font-semibold text-sm transition"
              >
                Acknowledge
              </button>
              <button
                type="button"
                onClick={handleResolve}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold text-sm transition"
              >
                Resolve
              </button>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 rounded w-full bg-gray-700 hover:bg-gray-600 text-white text-sm transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
}
