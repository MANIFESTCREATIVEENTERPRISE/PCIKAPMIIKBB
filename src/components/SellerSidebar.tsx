import { 
  BarChart3, Box, ShoppingBag, Users, MessageSquare, Wallet, Megaphone, 
  Settings, UserCheck, ShieldAlert, Award, Grid, Menu, X, Landmark, ClipboardList, Info, Link, Lock, LogOut
} from "lucide-react";

interface SellerSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isDarkMode: boolean;
  onLogout?: () => void;
}

export default function SellerSidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isDarkMode,
  onLogout
}: SellerSidebarProps) {
  
  const mainMenuItems = [
    { id: "dashboard", label: "Dashboard Utama", icon: BarChart3 },
    { id: "produk", label: "Manajemen Produk", icon: Box },
    { id: "jasa", label: "Manajemen Jasa", icon: ShoppingBag },
    { id: "orders", label: "Order Management", icon: ClipboardList },
    { id: "customers", label: "Customers", icon: Users },
    { id: "chat", label: "Live Chat", icon: MessageSquare },
    { id: "finance", label: "Keuangan & Penarikan", icon: Wallet },
    { id: "promo", label: "Promosi & Marketing", icon: Megaphone },
    { id: "settings", label: "Manajemen Toko", icon: Settings }
  ];


  // Dynamic style class based on dark mode
  const bgClass = "bg-card border-border-color text-text-base";
  const hoverClass = "hover:bg-surface/60 hover:text-text-base text-text-muted transition-colors";
  const activeClass = "bg-primary text-white shadow-lg shadow-primary/20";

  return (
    <aside id="seller-sidebar" className={`h-[calc(100vh-80px)] flex flex-col border-r transition-all duration-300 ${isCollapsed ? "w-20" : "w-72"} ${bgClass} shrink-0 overflow-y-auto z-40 relative`}>
      {/* Brand Logo Header */}
      <div className="p-5 flex items-center justify-between border-b border-border-color">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md">
            <span className="font-sans font-black text-lg">M</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col text-left">
              <span className="font-sans font-extrabold text-sm tracking-tight leading-none">Admin Mitra</span>
              <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider mt-1">Mitra Portal</span>
            </div>
          )}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg border border-border-color bg-surface hover:bg-card text-text-base transition-all"
        >
          {isCollapsed ? <Menu size={16} /> : <X size={16} />}
        </button>
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-grow p-4 space-y-6">
        <div>
          {!isCollapsed && (
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-3 block mb-3">
              Menu Utama
            </span>
          )}
          <nav className="space-y-1">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`sidebar-item-${item.id}`}
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={item.label}
                  className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive ? activeClass : hoverClass
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-white" : isDarkMode ? "text-slate-400" : "text-slate-500"} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>


      </div>

      {/* Footer Profile State */}
      <div className="p-4 border-t border-border-color bg-surface/30 shrink-0 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-blue-100/80 text-blue-700 flex items-center justify-center font-black text-sm shrink-0 font-sans">
            WS
          </div>
          {!isCollapsed && (
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold leading-none text-text-base">Wahyu Setiawan</span>
              <span className="text-[10px] text-text-muted mt-1 leading-none">Mitra Seller Aktif</span>
            </div>
          )}
        </div>
        {!isCollapsed && onLogout && (
          <button 
            onClick={onLogout}
            title="Keluar / Logout"
            className="p-2 rounded-lg text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
}
