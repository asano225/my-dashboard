export default function MonitoringSettings({ settings, setSettings }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="rounded-xl border border-[#444444] bg-[#1e1e1e] p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Monitoring Settings
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Configure monitoring intervals and resource thresholds.
        </p>
      </div>

      <div className="space-y-5">
        {/* Polling Interval */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Polling Interval
          </label>

          <select
            name="pollingInterval"
            value={settings.pollingInterval}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#444444] bg-[#151515] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
          >
            <option value={15}>15 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
            <option value={300}>5 minutes</option>
          </select>

          <p className="mt-1.5 text-xs text-slate-500">
            How often the monitoring system collects data from devices.
          </p>
        </div>

        {/* CPU Threshold */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            CPU Threshold
          </label>

          <div className="flex items-center gap-3">
            <input
              type="number"
              name="cpuThreshold"
              min="1"
              max="100"
              value={settings.cpuThreshold}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#444444] bg-[#151515] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
            />

            <span className="text-sm text-slate-400">
              %
            </span>
          </div>

          <p className="mt-1.5 text-xs text-slate-500">
            CPU usage above this value will be considered high.
          </p>
        </div>

        {/* RAM Threshold */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            RAM Threshold
          </label>

          <div className="flex items-center gap-3">
            <input
              type="number"
              name="ramThreshold"
              min="1"
              max="100"
              value={settings.ramThreshold}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#444444] bg-[#151515] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
            />

            <span className="text-sm text-slate-400">
              %
            </span>
          </div>

          <p className="mt-1.5 text-xs text-slate-500">
            RAM usage above this value will be considered high.
          </p>
        </div>

        {/* Disk Threshold */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Disk Threshold
          </label>

          <div className="flex items-center gap-3">
            <input
              type="number"
              name="diskThreshold"
              min="1"
              max="100"
              value={settings.diskThreshold}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#444444] bg-[#151515] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
            />

            <span className="text-sm text-slate-400">
              %
            </span>
          </div>

          <p className="mt-1.5 text-xs text-slate-500">
            Disk usage above this value will be considered high.
          </p>
        </div>

        {/* Device Down Timeout */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Device Down Timeout
          </label>

          <select
            name="deviceDownTimeout"
            value={settings.deviceDownTimeout}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#444444] bg-[#151515] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
          >
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
            <option value={120}>2 minutes</option>
            <option value={300}>5 minutes</option>
          </select>

          <p className="mt-1.5 text-xs text-slate-500">
            How long a device can remain unreachable before being considered down.
          </p>
        </div>
      </div>
    </section>
  );
}