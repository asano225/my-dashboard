export default function SystemSettings({ onReset }) {
  return (
    <div className="text-left m-3">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          System Settings
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Manage application information and system data.
        </p>
      </div>

      <section className="rounded-xl border border-[#444444] bg-[#1e1e1e] p-6">
        <div className="space-y-5">
          {/* Application Version */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">
                Application Version
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Current version of the monitoring application.
              </p>
            </div>

            <span className="text-sm text-slate-400">
              v1.0.0
            </span>
          </div>

          {/* Storage */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">
                Local Settings
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Settings are stored locally in your browser.
              </p>
            </div>

            <span className="text-sm text-green-400">
              Active
            </span>
          </div>

          {/* Reset Settings */}
          <div className="flex items-center justify-between border-t border-[#333333] pt-5">
            <div>
              <p className="text-sm font-medium text-slate-300">
                Reset Settings
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Restore all settings to their default values.
              </p>
            </div>

            <button
              type="button"
              onClick={onReset}
              className="rounded-lg border border-yellow-600 px-4 py-2 text-sm font-medium text-yellow-400 transition hover:bg-yellow-600/10"
            >
              Reset
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}