export default function MonitoringSettings({ settings, setSettings }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="m-3">
      <div className="mb-6 gap-3 text-left">
        <h2 className="text-lg font-semibold text-white">
          Monitoring Settings
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Configure monitoring intervals and resource thresholds.
        </p>
      </div>
      <section className="rounded-xl border border-[#444444] bg-[#1e1e1e] p-6  text-left">
        <div className="gap-6 space-y-5">
          {/* Polling Interval */}
          <div>
            <div className="flex items-center gap-3 ">
              <label className="mb-2 block text-md font-medium text-slate-300 w-[15%]">
                Polling Interval
              </label>

              <select
                name="pollingInterval"
                value={settings.pollingInterval}
                onChange={handleChange}
                className="w-full rounded-md border border-[#444444] bg-[#151515] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              >
                <option value={15}>15 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes</option>
              </select>
            </div>

            <p className="mt-1.5 text-xs text-slate-500">
              How often the monitoring system collects data from devices.
            </p>
          </div>

          {/* CPU Threshold */}
          <div>
            <div className="flex items-center gap-3 ">
              <label className="mb-2 block text-md font-medium text-slate-300 w-[15%]">
                CPU Threshold
              </label>
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
            <div className="flex items-center gap-3 ">
              <label className="mb-2 block text-md font-medium text-slate-300 w-[15%]">
                RAM Threshold
              </label>
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
            

            <div className="flex items-center gap-3">
            </div>

            <p className="mt-1.5 text-xs text-slate-500">
              RAM usage above this value will be considered high.
            </p>
          </div>

          {/* Disk Threshold */}
          <div>
            <div className="flex items-center gap-3 ">
              <label className="mb-2 block text-md font-medium text-slate-300 w-[15%]">
                Disk Threshold
              </label>

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
            <div className="flex items-center gap-3 ">
              <label className="mb-2 block text-md font-medium text-slate-300 w-[15%]">
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
            </div>
            

            <p className="mt-1.5 text-xs text-slate-500">
              How long a device can remain unreachable before being considered down.
            </p>
          </div>
        </div>
      </section>
    </div>
    
    
  );
}