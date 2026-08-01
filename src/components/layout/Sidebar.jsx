import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Network, Server, AlertTriangle } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#1e1e1e] border-r border-[#444] min-h-screen p-4">
      <nav className="space-y-2">

        <SidebarItem
          to="/"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          active={location.pathname === "/"}
        />

        <SidebarItem
          to="/device"
          icon={<Network size={18} />}
          label="Device"
          active={location.pathname === "/device"}
        />

        <SidebarItem
          to="/resources"
          icon={<Server size={18} />}
          label="Resources"
          active={location.pathname === "/resources"}
        />

        <SidebarItem
          to="/alerts"
          icon={<AlertTriangle size={18} />}
          label="Alerts"
          active={location.pathname === "/alerts"}
        />

      </nav>
    </aside>
  );
}

function SidebarItem({ icon, label, to, active }) {
  return (
    <Link to={to}>
      <div
        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition
        ${active 
          ? "bg-blue-600 text-white" 
          : "hover:bg-gray-800 text-gray-300"
        }`}
      >
        <div className={active ? "text-white" : "text-gray-400"}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
    </Link>
  );
}