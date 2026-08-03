export default function AlertDrawer({ alert, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end">
      <div className="w-96 bg-[#1a1a1a] p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Alert Details</h2>

        <p><b>Device:</b> {alert.device}</p>
        <p><b>IP:</b> {alert.ip}</p>
        <p><b>Severity:</b> {alert.severity}</p>
        <p><b>Status:</b> {alert.status}</p>
        <p className="mt-3"><b>Message:</b></p>
        <p className="text-gray-400">{alert.message}</p>

        <div className="mt-6 flex gap-2">
          <button className="bg-yellow-500 px-4 py-2 rounded">
            Acknowledge
          </button>
          <button className="bg-green-600 px-4 py-2 rounded">
            Resolve
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-gray-400 hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}