import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "@/components/layout/Topbar";
import Dashboard from "./pages/Dashboard";
import DevicePage from "./pages/Device";
import Sidebar from "./components/layout/Sidebar";
import DeviceDetail from "./pages/DetailDevice";
import Alerts from "./pages/Alerts";
import DeviceForm from "./pages/DeviceForm";
import Reports from "./pages/Reports";
import SettingsPage from "./pages/Settings";
import { MonitoringProvider } from "./context/MonitoringContext";

export default function App() {
  return (
    <MonitoringProvider>
      <Router>
        <div className="flex flex-col bg-[#121212] min-h-screen text-white">
          <Topbar />

          <div className="flex flex-1">
            <Sidebar />

            <div className="flex-1 overflow-x-hidden">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/devices/new" element={<DeviceForm />} />
                <Route path="/devices/:id" element={<DeviceDetail />} />
                <Route path="/devices/:id/edit" element={<DeviceForm />} />
                <Route path="/devices" element={<DevicePage />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </MonitoringProvider>
  );
}
