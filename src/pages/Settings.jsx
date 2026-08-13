import { useState } from "react";
import GeneralSettings from "../components/settings/GeneralSettings";
import MonitoringSettings from "../components/settings/MonitoringSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings"
import SystemSettings from "../components/settings/SystemSettings";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    timezone: "Asia/Jakarta",
    language: "English",
    refreshInterval: 30,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="mt-1 text-sm text-slate-400 p-2 text-left">
          Manage your application and monitoring preferences.
        </p>
      </div>

      {/* General */}
      <GeneralSettings
        settings={settings}
        setSettings={setSettings}
      />

      {/* Monitoring */}
      <MonitoringSettings />

      {/* Notifications */}
      <NotificationSettings />

      {/* Appearance */}
      <AppearanceSettings />

      {/* System */}
      <SystemSettings />
    </div>
  );
}
