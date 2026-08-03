import { useLocation } from "react-router-dom";
import { menuItems } from "./menuConfig";

console.log(location.pathname);

export default function Topbar() {
  const location = useLocation();

  // cari menu yang cocok
  const currentMenu = menuItems.find(item => {
    if (item.path === "/") return location.pathname === "/";

    if (item.path === "/device/:id") {
      return location.pathname.startsWith("/device/");
    }

    return location.pathname.startsWith(item.path);
  });

  const title = currentMenu?.label || "Page";

  return (
    <div className="w-full h-16 px-6 flex items-center justify-between border-b border-[#444444] backdrop-blur bg-[#1e1e1e]">

      <div className="flex items-center gap-3">
        <img src="/Logo-JSP.png" alt="logo" className="w-8 h-8" />

        <h2 className="text-2xl font-semibold text-white">
          JS NetworKing
        </h2>

        <div className="w-px h-10 bg-gray-400"></div>

        {/* 🔥 Dynamic */}
        <h2 className="text-2xl font-semibold text-white">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm text-white">Admin</p>
          <p className="text-xs text-gray-400">Last Update: 15.00</p>
        </div>
      </div>
    </div>
  );
}