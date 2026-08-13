export default function GeneralSettings({ settings, setSettings }) {
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
          General Settings
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Configure general application preferences.
        </p>
      </div>
      
      <section className="rounded-xl border border-[#444444] bg-[#1e1e1e] p-6 ">
        <div className="space-y-5">
          {/* Timezone */}
          <div className="flex items-center gap-3">
            <label className="mb-2 block text-md font-medium text-slate-300">
              Timezone
            </label>

            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#444444] bg-[#151515] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
            >
              <option value="Asia/Jakarta">
                Asia/Jakarta (UTC+7)
              </option>

              <option value="Asia/Makassar">
                Asia/Makassar (UTC+8)
              </option>

              <option value="Asia/Jayapura">
                Asia/Jayapura (UTC+9)
              </option>
            </select>
          </div>

          {/* Language */}
          <div className="flex items-center gap-3">
            <label className="mb-2 block text-md font-medium text-slate-300">
              Language
            </label>

            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#444444] bg-[#151515] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
            >
              <option value="English">English</option>
              <option value="Indonesian">Indonesian</option>
            </select>
          </div>
        </div>
      </section>
    </div>
    
  );
}