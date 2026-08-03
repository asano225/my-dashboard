import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "@/components/layout/Topbar";
import Dashboard from "./pages/Dashboard";
import DevicePage from "./pages/Device";
import Sidebar from "./components/layout/Sidebar";
import DeviceDetail from "./pages/DetailDevice";
import Alerts from "./pages/Alerts";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col bg-[#121212] min-h-screen text-white">

        <Topbar />

        <div className="flex flex-1">
          <Sidebar />

          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/device" element={<DevicePage />} />
              <Route path="/device/:id" element={<DeviceDetail />} />
              <Route path="/alerts" element={<Alerts />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}