import { 
  BarChart3, Box, ShoppingBag, Users, MessageSquare, Wallet, Megaphone, 
  Settings, UserCheck, ShieldAlert, Award, Grid, Menu, X, Landmark, ClipboardList, Info, Link, Lock
} from "lucide-react";

interface SellerSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isDarkMode: boolean;
}

export default function SellerSidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isDarkMode
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
    { id: "analytics", label: "Analytics & Report", icon: Award },
    { id: "reputation", label: "Ulasan & Sentimen AI", icon: ShieldAlert },
    { id: "settings", label: "Manajemen Toko", icon: Settings },
    { id: "staff", label: "Staff & Akses", icon: UserCheck }
  ];

  const subDashboards = [
    { id: "sub_affiliate", label: "Affiliate Dashboard", icon: Link },
    { id: "sub_supplier", label: "Supplier Dashboard", icon: Landmark },
    { id: "sub_warehouse", label: "Gudang & Stok", icon: Grid },
    { id: "sub_installer", label: "Kurir & Pengiriman", icon: Landmark },
    { id: "sub_marketplace_admin", label: "Admin Marketplace", icon: Lock }
  ];

  const systemItems = [
    { id: "integrations", label: "Integrasi API & Sync", icon: Info },
    { id: "blueprint", label: "Blueprint & Sitemap", icon: Grid },
    { id: "help", label: "Pusat Bantuan & AI Chat", icon: Info },
    { id: "login", label: "Login & Autentikasi", icon: Lock }
  ];

  // Dynamic style class based on dark mode
  const bgClass = "bg-card border-border-color text-text-base";
  const hoverClass = "hover:bg-surface/60 hover:text-text-base text-text-muted transition-colors";
  const activeClass = "bg-primary text-white shadow-lg shadow-primary/20";

  return (
    <aside id="seller-sidebar" className={`h-screen flex flex-col border-r transition-all duration-300 ${isCollapsed ? "w-20" : "w-72"} ${bgClass} shrink-0 overflow-y-auto z-40 relative`}>
      {/* Brand Logo Header */}
      <div className="p-5 flex items-center justify-between border-b border-border-color">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md">
            <span className="font-sans font-black text-lg">M</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col text-left">
              <span className="font-sans font-extrabold text-sm tracking-tight leading-none">Maretoko Seller</span>
              <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider mt-1">SaaS Portal</span>
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

        {/* Sub Dashboards */}
        <div>
          {!isCollapsed && (
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-3 block mb-3">
              Halaman Tambahan
            </span>
          )}
          <nav className="space-y-1">
            {subDashboards.map((item) => {
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

        {/* System & Integrations & Login */}
        <div>
          {!isCollapsed && (
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest pl-3 block mb-3">
              Informasi & Integrasi
            </span>
          )}
          <nav className="space-y-1">
            {systemItems.map((item) => {
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
      <div className="p-4 border-t border-border-color bg-surface/30 shrink-0 flex items-center gap-3 overflow-hidden">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm shrink-0">
          WS
        </div>
        {!isCollapsed && (
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold leading-none">Wahyu Setiawan</span>
            <span className="text-[10px] text-slate-400 mt-1 leading-none">Mitra Seller Aktif</span>
          </div>
        )}
      </div>
    </aside>
  );
}
