export default function Topbar() {
  return (
    <div className="w-full h-16 px-6 flex items-center justify-between border-b border-[#444444] backdrop-blur bg-[#1e1e1e]">

      {/* Kiri - Title */}
      <div className="flex items-center gap-3">
        <img 
          src="/Logo-JSP.png" 
          alt="logo" 
          className="w-8 h-8"
        />

        <h2 className="text-2xl font-semibold text-white">
          JS NetworKing
        </h2>

        <div className="w-px h-10 bg-gray-400"></div>

        <h2 className="text-2xl font-semibold text-white">
          Dashboard
        </h2>
      </div>
      {/* Kanan - User */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm text-white">Admin</p>
          <p className="text-xs text-gray-400">Last Update: 15.00</p>
        </div>
      </div>
    </div>
  );
}