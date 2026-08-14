export default function NotificationSettings({
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
          Notification Settings
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Configure how and when monitoring alerts are delivered.
        </p>
      </div>
      <section className="rounded-xl border border-[#444444] bg-[#1e1e1e] p-6">
        <div className="space-y-5">
          {/* Enable Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 block text-md font-medium text-slate-300 w-full">
                Enable Notifications
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Receive notifications when monitoring alerts are triggered.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggle("notificationsEnabled")}
                className={`relative h-6 w-11 rounded-full transition ${
                  settings.notificationsEnabled
                    ? "bg-blue-600"
                    : "bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    settings.notificationsEnabled
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

              <span
                className={`text-xs font-medium ${
                  settings.notificationsEnabled
                    ? "text-blue-400"
                    : "text-slate-500"
                }`}
              >
                {settings.notificationsEnabled ? "ON" : "OFF"}
              </span>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 block text-md font-medium text-slate-300 w-full">
                Email Notifications
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Receive monitoring alerts through email.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggle("emailNotifications")}
                className={`relative h-6 w-11 rounded-full transition ${
                  settings.emailNotifications
                    ? "bg-blue-600"
                    : "bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    settings.emailNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

              <span
                className={`text-xs font-medium ${
                  settings.emailNotifications
                    ? "text-blue-400"
                    : "text-slate-500"
                }`}
              >
                {settings.emailNotifications ? "ON" : "OFF"}
              </span>
            </div>
          </div>

          {/* Telegram Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 block text-md font-medium text-slate-300 w-full">
                Telegram Notifications
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Receive monitoring alerts through Telegram.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggle("telegramNotifications")}
                className={`relative h-6 w-11 rounded-full transition ${
                  settings.telegramNotifications
                    ? "bg-blue-600"
                    : "bg-slate-600"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    settings.telegramNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

              <span
                className={`text-xs font-medium ${
                  settings.telegramNotifications
                    ? "text-blue-400"
                    : "text-slate-500"
                }`}
              >
                {settings.telegramNotifications ? "ON" : "OFF"}
              </span>
            </div>
          </div>

          {/* Minimum Alert Severity */}
          <div>
            <div className="flex items-center gap-3 ">
              <label className="mb-2 block text-md font-medium text-slate-300 w-[15%]">
                Minimum Alert Severity
              </label>

              <select
                name="minimumAlertSeverity"
                value={settings.minimumAlertSeverity}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#444444] bg-[#151515] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Warning">Warning</option>
                <option value="Info">Info</option>
              </select>
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              Only alerts at or above this severity will trigger notifications.
            </p>
          </div>
        </div>
      </section>
    </div>

    
  );
}