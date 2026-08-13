import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { dummyData } from "./data/dummyDevice";
import { useState } from "react";
import { useEffect } from "react";
import Topbar from "@/components/layout/Topbar";
import Dashboard from "./pages/Dashboard";
import DevicePage from "./pages/Device";
import Sidebar from "./components/layout/Sidebar";
import DeviceDetail from "./pages/DetailDevice";
import Alerts from "./pages/Alerts";
import DeviceForm from "./pages/DeviceForm";
import Reports from "./pages/Reports";
import SettingsPage from "./pages/Settings";

export default function App() {
  const [devices, setDevices] = useState( () => {
    try {
      const saved = localStorage.getItem("devices");
      return saved ? JSON.parse(saved) : dummyData;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("devices", JSON.stringify(devices));
  }, [devices]);

  return (
    <Router>
      <div className="flex flex-col bg-[#121212] min-h-screen text-white">

        <Topbar />

        <div className="flex flex-1">
          <Sidebar />

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/devices/new" element={<DeviceForm setDevices={setDevices} />} />              
              <Route path="/devices/:id" element={<DeviceDetail devices={devices} />}  />
              <Route path="/devices/:id/edit" element={<DeviceForm devices={devices} setDevices={setDevices} />} />
              <Route path="/devices" element={<DevicePage data={devices} setDevices={setDevices} />} />
              
              <Route path="/alerts" element={<Alerts />} />

              <Route path="/reports" element={<Reports />} />

              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}