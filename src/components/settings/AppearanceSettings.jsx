export default function AppearanceSettings({
  settings,
  setSettings,
}) {
  const handleToggle = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="text-left m-3">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Appearance Settings
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Customize the appearance and visual behavior of the application.
        </p>
      </div>
      <section className="rounded-xl border border-[#444444] bg-[#1e1e1e] p-6">
        
        <div className="gap-6 space-y-5">
          {/* Theme */}
          <div>
            <div className="flex items-center gap-3 ">
              <label className="mb-2 block text-md font-medium text-slate-300 w-[15%]">
                Theme
              </label>

              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#444444] bg-[#151515] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System Default</option>
              </select>
            </div>
            

            <p className="mt-1.5 text-xs text-slate-500">
              Choose the visual theme used by the application.
            </p>
          </div>

          {/* Compact Mode */}
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 block text-md font-medium text-slate-300 w-full">
                Compact Mode
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Reduce spacing between interface elements.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggle("compactMode")}
                className={`relative h-6 w-11 rounded-full transition ${
                  settings.compactMode
                    ? "bg-blue-600"
                    : "bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    settings.compactMode
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

              <span
                className={`text-xs font-medium ${
                  settings.compactMode
                    ? "text-blue-400"
                    : "text-slate-500"
                }`}
              >
                {settings.compactMode ? "ON" : "OFF"}
              </span>
            </div>
          </div>

          {/* Show Animations */}
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 block text-md font-medium text-slate-300 w-full">
                Show Animations
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Enable UI animations and transitions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggle("showAnimations")}
                className={`relative h-6 w-11 rounded-full transition ${
                  settings.showAnimations
                    ? "bg-blue-600"
                    : "bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    settings.showAnimations
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

              <span
                className={`text-xs font-medium ${
                  settings.showAnimations
                    ? "text-blue-400"
                    : "text-slate-500"
                }`}
              >
                {settings.showAnimations ? "ON" : "OFF"}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
}