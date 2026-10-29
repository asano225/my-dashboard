import { useLocation } from "react-router-dom";
import { menuItems } from "./menuConfig";
import { useMonitoring } from "../../context/MonitoringContext";

export default function Topbar() {
  const location = useLocation();
  const { lastUpdate, connected } = useMonitoring();

  // cari menu yang cocok
  const currentMenu = menuItems.find(item => {
    if (item.path === "/") {
      return location.pathname === "/";
    }

    if (item.path === "/devices/:id/edit") {
      return /^\/devices\/[^/]+\/edit$/.test(location.pathname);
    }

    if (item.path === "/devices/:id") {
      return /^\/devices\/[^/]+$/.test(location.pathname);
    }

    return location.pathname.startsWith(item.path);
  });

  const title = currentMenu?.label || "Page";

  return (
    <div className="w-full h-16 px-6 flex items-center justify-between border-b border-[#444444] backdrop-blur bg-[#1e1e1e]">

      <div className="flex items-center gap-3">
        <img src="/Logo-JSP.png" alt="logo" className="w-8 h-8 object-contain" />

        <h2 className="text-2xl font-semibold text-white">
          JS NetworKing
        </h2>

        <div className="w-px h-10 bg-gray-400"></div>

        {/* Dynamic Title */}
        <h2 className="text-2xl font-semibold text-white">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`w-2.5 h-2.5 rounded-full inline-block ${
              connected ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          />
          <span className="text-gray-300 hidden sm:inline">
            {connected ? "Monitoring Active" : "Connecting..."}
          </span>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-white">Admin</p>
          <p className="text-xs text-gray-400 font-mono">Last Update: {lastUpdate}</p>
        </div>
      </div>
    </div>
  );
}
