import { 
  Search, Bell, Moon, Sun, ChevronDown, Plus, Radio, Zap, Box, ShoppingBag, Award, CreditCard
} from "lucide-react";
import React, { useState } from "react";

interface SellerHeaderProps {
  currentRole: "Seller" | "Admin Toko" | "Staff Operasional";
  setCurrentRole: (role: "Seller" | "Admin Toko" | "Staff Operasional") => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  onQuickAdd: (type: "produk" | "jasa" | "promo") => void;
  notifications: string[];
  onTriggerNotification: (msg: string) => void;
}

export default function SellerHeader({
  currentRole,
  setCurrentRole,
  isDarkMode,
  setIsDarkMode,
  setActiveTab,
  isCollapsed,
  onQuickAdd,
  notifications,
  onTriggerNotification
}: SellerHeaderProps) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotificationList, setShowNotificationList] = useState(false);
  const [showQuickAddDropdown, setShowQuickAddDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const roles: ("Seller" | "Admin Toko" | "Staff Operasional")[] = [
    "Seller",
    "Admin Toko",
    "Staff Operasional"
  ];

  const handleRoleChange = (role: "Seller" | "Admin Toko" | "Staff Operasional") => {
    setCurrentRole(role);
    setShowRoleDropdown(false);
    onTriggerNotification(`Ubah role admin ke: ${role}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    // Auto-navigate depending on keyword
    const q = searchQuery.toLowerCase();
    if (q.includes("produk") || q.includes("fisik") || q.includes("digital") || q.includes("stok")) {
      setActiveTab("produk");
      onTriggerNotification(`Mencari produk untuk: "${searchQuery}"`);
    } else if (q.includes("jasa") || q.includes("boking") || q.includes("layanan") || q.includes("konsul")) {
      setActiveTab("jasa");
      onTriggerNotification(`Mencari jasa untuk: "${searchQuery}"`);
    } else if (q.includes("pesan") || q.includes("order") || q.includes("ongkir") || q.includes("resi")) {
      setActiveTab("orders");
      onTriggerNotification(`Mencari pesanan untuk: "${searchQuery}"`);
    } else if (q.includes("pelanggan") || q.includes("member") || q.includes("user")) {
      setActiveTab("customers");
      onTriggerNotification(`Mencari pelanggan untuk: "${searchQuery}"`);
    } else if (q.includes("uang") || q.includes("tarik") || q.includes("rekening") || q.includes("saldo")) {
      setActiveTab("finance");
      onTriggerNotification(`Mencari keuangan untuk: "${searchQuery}"`);
    } else {
      onTriggerNotification(`Mencari secara luas: "${searchQuery}"`);
    }
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-30 px-6 py-4 flex flex-col md:flex-row items-center justify-between border-b gap-4 transition-colors duration-300 bg-card/95 border-border-color text-text-base backdrop-blur-md">
      {/* Search Input Widget */}
      <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md shrink-0">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <Search size={18} />
        </span>
        <input 
          type="text"
          placeholder="Cari produk, layanan, resi, pelanggan... (Enter)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-2 rounded-full text-xs font-semibold border border-border-color bg-surface hover:bg-card focus:bg-surface text-text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </form>

      {/* Right Controls Area */}
      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
        {/* Quick Add Floating Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowQuickAddDropdown(!showQuickAddDropdown)}
            className="px-4 py-2 rounded-full text-xs bg-blue-600 hover:bg-blue-700 text-white font-extrabold flex items-center gap-1.5 shadow-md shadow-blue-500/10 cursor-pointer"
          >
            <Plus size={16} /> Quick Action <ChevronDown size={14} />
          </button>
          {showQuickAddDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl border p-2 flex flex-col gap-1 z-50 bg-card border-border-color">
              <button 
                onClick={() => { onQuickAdd("produk"); setShowQuickAddDropdown(false); }}
                className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[11px] font-bold text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800`}
              >
                <Box size={16} className="text-blue-500" />
                Tambah Produk Baru
              </button>
              <button 
                onClick={() => { onQuickAdd("jasa"); setShowQuickAddDropdown(false); }}
                className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[11px] font-bold text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800`}
              >
                <ShoppingBag size={16} className="text-emerald-500" />
                Tambah Jasa Baru
              </button>
              <button 
                onClick={() => { onQuickAdd("promo"); setShowQuickAddDropdown(false); }}
                className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[11px] font-bold text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800`}
              >
                <Zap size={16} className="text-amber-500" />
                Buat Promo Diskon
              </button>
              <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
              <button 
                onClick={() => { setActiveTab("orders"); setShowQuickAddDropdown(false); onTriggerNotification("Cetak resi massal diaktifkan"); }}
                className={`flex items-center gap-3.5 px-3 py-2 rounded-xl text-[11px] font-bold text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800`}
              >
                <CreditCard size={16} className="text-purple-500" />
                Cetak Cetak Resi/Invoice
              </button>
            </div>
          )}
        </div>

        {/* Dark Mode Switcher */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          title="Ubah Tema"
          className="p-2 rounded-xl border border-border-color bg-surface hover:bg-card text-accent cursor-pointer transition-all"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotificationList(!showNotificationList)}
            className="p-2 rounded-xl border border-border-color bg-surface hover:bg-card text-text-base relative cursor-pointer transition-all"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>
          {showNotificationList && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl border p-4 flex flex-col gap-3 z-50 bg-card border-border-color text-text-base">
              <div className="flex items-center justify-between pb-2 border-b border-border-color">
                <span className="text-xs font-black">Notifikasi Penting</span>
                <span className="text-[10px] text-blue-500 font-bold bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                  {notifications.length} Info
                </span>
              </div>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-center text-[11px] text-slate-400 py-4 font-sans font-medium">Tidak ada notifikasi baru hari ini.</p>
                ) : (
                  notifications.map((notif, index) => (
                    <div key={index} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                      <div className="flex items-center gap-1.5 text-blue-600 font-extrabold mb-0.5">
                        <Radio size={12} className="shrink-0 animate-ping" />
                        <span>Sistem Info</span>
                      </div>
                      {notif}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

        {/* Active Multi-Role Switcher */}
        <div className="relative">
          <button 
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="px-3.5 py-2 rounded-xl border border-border-color bg-surface hover:bg-card text-text-base flex items-center gap-2.5 text-xs font-extrabold cursor-pointer transition-all"
          >
            <div className="flex flex-col text-right">
              <span className="text-[9px] font-black uppercase tracking-wider leading-none text-primary">Hak Akses</span>
              <span className="mt-1 leading-none">{currentRole}</span>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
          
          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl border p-2 flex flex-col gap-1 z-50 bg-card border-border-color">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={`w-full px-3 py-2.5 rounded-xl text-left text-[11px] font-bold transition-all cursor-pointer ${
                    currentRole === r 
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" 
                      : "hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {r}
                  {r === "Seller" && <span className="text-[9px] bg-amber-500 text-white px-1.5 py-0.5 rounded-md font-black float-right uppercase">Owner</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
