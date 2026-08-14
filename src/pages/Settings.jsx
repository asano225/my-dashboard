import { useState } from "react";
import GeneralSettings from "../components/settings/GeneralSettings";
import MonitoringSettings from "../components/settings/MonitoringSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings"
import SystemSettings from "../components/settings/SystemSettings";
import { defaultSettings } from "../config/settingsConfig";


export default function SettingsPage() {
  const [savedSettings, setSavedSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("settings");

      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [settings, setSettings] = useState(savedSettings);

  const handleSave = () => {
    setSavedSettings(settings);

    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );
  };

  const handleCancel = () => {
    setSettings(savedSettings);
  };

  const handleReset = () => {
  const confirmed = window.confirm(
    "Are you sure you want to reset all settings to their default values?"
  );

  if (!confirmed) return;

  setSettings(defaultSettings);
  setSavedSettings(defaultSettings);

  localStorage.setItem(
    "settings",
    JSON.stringify(defaultSettings)
  );
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="mt-1 text-sm text-slate-400 p-2 text-left">
          Manage your application and monitoring preferences.
        </p>
      </div>

      <div>
        {/* General */}
        <GeneralSettings
          settings={settings}
          setSettings={setSettings}
        />

        <MonitoringSettings
          settings={settings}
          setSettings={setSettings}
        />

        {/* Notifications */}
        <NotificationSettings
          settings={settings}
          setSettings={setSettings}
        />

        {/* Appearance */}
        <AppearanceSettings
          settings={settings}
          setSettings={setSettings}
        />

        {/* System */}
        <SystemSettings
          onReset={handleReset}
        />
      </div>

      

      <div className="flex justify-end gap-3 p-6">
        
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-lg border border-[#444444] px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-[#2a2a2a]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
