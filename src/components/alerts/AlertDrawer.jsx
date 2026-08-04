export default function AlertDrawer({ alert, open, onClose }) {
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
        className={`fixed top-0 right-0 h-full w-96 bg-[#1a1a1a] p-6 text-white z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {alert && (
          <div>
            <div className="items-center">
              <h2 className="text-xl font-semibold mb-4">Alert Details</h2>
            </div>
            
            <div className="flex flex-col space-y-2 text-left">
              <p><b>Device:</b> {alert.device}</p>
              <p><b>IP:</b> {alert.ip}</p>
              <p><b>Severity:</b> {alert.severity}</p>
              <p><b>Status:</b> {alert.status}</p>

              <p className="mt-3"><b>Message:</b></p>
              <p className="text-gray-400">{alert.message}</p>
            </div>
            

            <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-2">
              <button className="bg-yellow-500 px-4 py-2 rounded">
                Acknowledge
              </button>
              <button className="bg-green-600 px-4 py-2 rounded">
                Resolve
              </button>
            </div>

            <button
              onClick={onClose}
              className="mt-6 px-4 py-2 rounded w-full bg-gray-600 hover:bg-gray-500 text-white"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
}