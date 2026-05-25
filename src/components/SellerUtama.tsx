import { 
  TrendingUp, Box, ShoppingBag, Users, Zap, 
  ArrowUpRight, ShoppingCart, Percent, DollarSign, Calendar, Bell, ChevronRight, FileText, CheckCircle
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Product, ServiceItem, Order } from "../types/seller";

interface SellerUtamaProps {
  products: Product[];
  services: ServiceItem[];
  orders: Order[];
  onNavigateTab: (tab: string) => void;
  isDarkMode: boolean;
  onQuickAction: (action: "tambah_produk" | "tambah_jasa" | "buat_promo" | "cetak_resi" | "bulk_upload") => void;
}

export default function SellerUtama({
  products,
  services,
  orders,
  onNavigateTab,
  isDarkMode,
  onQuickAction
}: SellerUtamaProps) {
  
  // Hardcoded statistics data that updates dynamically depending on standard lists
  const activeProductsCount = products.filter(p => p.status === "aktif" || p.status === "trending").length;
  const activeServicesCount = services.filter(s => s.status === "aktif").length;
  const totalOrdersCount = orders.length;
  
  // Total Sales calculate
  const totalSalesVolume = orders
    .filter(o => o.status === "selesai" || o.status === "dikirim" || o.status === "diproses")
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    {
      title: "Total Omzet",
      value: `Rp ${(totalSalesVolume + 14850000).toLocaleString()}`,
      indicator: "+14.2% bulan lalu",
      icon: DollarSign,
      color: "bg-blue-500",
      textColor: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Total Pesanan",
      value: totalOrdersCount + 112,
      indicator: "+8.5% minggu ini",
      icon: ShoppingCart,
      color: "bg-purple-500",
      textColor: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Conversion Rate",
      value: "3.48%",
      indicator: "+0.6% hari ini",
      icon: Percent,
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      title: "Pengunjung Toko",
      value: "41,840 org",
      indicator: "+18.9% bulan lalu",
      icon: Users,
      color: "bg-amber-500",
      textColor: "text-amber-500",
      bgColor: "bg-amber-500/10"
    }
  ];

  // Static chart data representing monthly sales & visitors
  const chartData = [
    { name: "Sen", penjualan: 2400000, pengunjung: 1200 },
    { name: "Sel", penjualan: 3500000, pengunjung: 1800 },
    { name: "Rab", penjualan: 2900000, pengunjung: 1500 },
    { name: "Kam", penjualan: 4200000, pengunjung: 2100 },
    { name: "Jum", penjualan: 5120000, pengunjung: 2400 },
    { name: "Sab", penjualan: 6800000, pengunjung: 3100 },
    { name: "Min", penjualan: 5900000, pengunjung: 2800 }
  ];

  // Best seller physical product
  const bestSellersProducts = [...products]
    .sort((a,b) => b.sales - a.sales)
    .slice(0, 3);

  // Best seller services
  const bestSellersServices = [...services]
    .sort((a,b) => b.portfolioCount - a.portfolioCount)
    .slice(0, 2);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Visual Welcome Banner */}
      <div className={`p-8 rounded-[2rem] border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 ${
        isDarkMode 
          ? "bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border-slate-800" 
          : "bg-gradient-to-br from-blue-50/75 via-indigo-50/30 to-white border-slate-150"
      }`}>
        <div className="space-y-3 text-left relative z-10 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-[9px] font-black uppercase text-white bg-blue-600 rounded-full tracking-widest">
              Live Storefront
            </span>
            <span className="text-[11px] font-bold text-slate-400">ID Toko: MARE-SELLER9951</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight leading-tight">
            Selamat Datang Kembali, <span className="text-blue-600 block sm:inline">Wahyu Setiawan!</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed">
            Performa toko Anda meningkat <span className="text-emerald-500 font-extrabold font-mono">14.2%</span> dibanding minggu lalu. Ada <span className="text-blue-500 font-extrabold underline cursor-pointer" onClick={() => onNavigateTab("orders")}>{orders.filter(o => o.status === "masuk").length} pesanan baru</span> masuk menunggu diproses kemas.
          </p>
        </div>

        {/* Dynamic Date Badge */}
        <div className={`px-5 py-4 rounded-2xl border flex items-center gap-3.5 shadow-sm max-w-sm shrink-0 z-10 ${
          isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-100"
        }`}>
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl">
            <Calendar size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-bold tracking-wider uppercase text-slate-400">Jam Operasional</span>
            <span className="text-xs font-black mt-1">Sesuai Jadwal Aktif</span>
            <span className="text-[9px] text-green-500 font-bold tracking-wide mt-1">&bull; Sistem Server Cloud Online</span>
          </div>
        </div>

        {/* Background visual accents */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none rounded-r-[2rem]"></div>
      </div>

      {/* Quick Action Button Panel */}
      <div className={`p-6 rounded-[1.5rem] border ${
        isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-150"
      }`}>
        <h3 className="text-xs uppercase tracking-widest font-black text-slate-400 pl-1 mb-4 text-left">
          Panduan Akses &amp; Quick Action Buttons
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <button 
            onClick={() => onQuickAction("tambah_produk")}
            className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-md transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group hover:-translate-y-1"
          >
            <div className="p-2.5 bg-white/20 rounded-xl">
              <Box size={20} />
            </div>
            <span className="text-xs font-extrabold leading-none">Tambah Produk</span>
          </button>

          <button 
            onClick={() => onQuickAction("tambah_jasa")}
            className="p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl shadow-md transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group hover:-translate-y-1"
          >
            <div className="p-2.5 bg-white/20 rounded-xl">
              <ShoppingBag size={20} />
            </div>
            <span className="text-xs font-extrabold leading-none">Tambah Jasa</span>
          </button>

          <button 
            onClick={() => onQuickAction("buat_promo")}
            className="p-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl shadow-md transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group hover:-translate-y-1"
          >
            <div className="p-2.5 bg-white/20 rounded-xl">
              <Zap size={20} />
            </div>
            <span className="text-xs font-extrabold leading-none">Buat Promo</span>
          </button>

          <button 
            onClick={() => onQuickAction("cetak_resi")}
            className="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl shadow-md transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group hover:-translate-y-1"
          >
            <div className="p-2.5 bg-white/20 rounded-xl">
              <FileText size={20} />
            </div>
            <span className="text-xs font-extrabold leading-none">Cetak Resi</span>
          </button>

          <button 
            onClick={() => onQuickAction("bulk_upload")}
            className="p-4 bg-slate-700 hover:bg-slate-850 text-white rounded-2xl shadow-md transition-all flex flex-col items-center justify-center gap-3 cursor-pointer col-span-2 sm:col-span-1 group hover:-translate-y-1"
          >
            <div className="p-2.5 bg-white/20 rounded-xl">
              <ArrowUpRight size={20} />
            </div>
            <span className="text-xs font-extrabold leading-none">Mass Upload (CSV)</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div 
              key={i} 
              className={`p-6 rounded-3xl border transition-all hover:shadow-lg ${
                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 capitalize">{st.title}</span>
                <div className={`p-2.5 rounded-xl ${st.bgColor} ${st.textColor}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="mt-4 flex flex-col text-left">
                <h3 className="text-2xl font-black font-mono tracking-tight">{st.value}</h3>
                <span className="text-[10px] text-emerald-500 font-extrabold mt-1.5 flex items-center gap-1.5">
                  <TrendingUp size={12} /> {st.indicator}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Core Sales Area Performance Chart */}
        <div className={`p-6 rounded-[2rem] border lg:col-span-8 flex flex-col text-left ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-full">
                SaaS Visual Analytics
              </span>
              <h3 className="text-lg font-black tracking-tight mt-1.5">Omzet &amp; Trafik Pembeli</h3>
            </div>
            <div className="flex items-center gap-3 text-xs bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border dark:border-slate-800">
              <button className="px-3 py-1 bg-blue-600 text-white font-extrabold rounded-lg">Mingguan</button>
              <button className="px-3 py-1 text-slate-400 font-extrabold rounded-lg hover:text-blue-500">Bulanan</button>
            </div>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPenjualan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#1e293b" : "#f1f5f9"} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: "bold" }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 10, fontWeight: "bold" }} stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={isDarkMode ? { background: "#0b0f19", borderColor: "#1e293b", borderRadius: "1rem" } : { background: "#ffffff", borderColor: "#f1f5f9", borderRadius: "1rem" }}
                  formatter={(val: number) => `Rp ${val.toLocaleString()}`} 
                />
                <Area type="monotone" dataKey="penjualan" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorPenjualan)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Summary Widgets */}
        <div className={`p-6 rounded-[2rem] border lg:col-span-4 flex flex-col text-left ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
        }`}>
          <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800 mb-4">
            <h3 className="text-sm font-black tracking-tight">Status Pesanan Baru</h3>
            <button className="text-[10px] text-blue-500 font-bold hover:underline" onClick={() => onNavigateTab("orders")}>Semua &rarr;</button>
          </div>
          
          <div className="space-y-3.5 flex-grow">
            {orders.slice(0, 3).map((o, idx) => (
              <div 
                key={idx} 
                className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                  isDarkMode ? "bg-slate-950 border-slate-805" : "bg-slate-50/70 border-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${
                    o.status === "masuk" ? "bg-sky-100 text-sky-700" : o.status === "diproses" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold leading-none">{o.id}</span>
                    <span className="text-[10px] text-slate-400 mt-1">{o.customerName}</span>
                  </div>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] font-bold text-slate-400">{o.courier}</span>
                  <span className="text-xs font-black text-blue-600 mt-1 font-mono">Rp {o.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3.5 border-t dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Jam Layanan Aktif</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold">24-Jam Terintegrasi</span>
          </div>
        </div>
      </div>

      {/* Best Sellers & Action Block Split Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className={`p-6 rounded-[2rem] border text-left ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
        }`}>
          <div className="flex items-center justify-between mb-4 pb-3 border-b dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black tracking-tight">Produk &amp; Jasa Terlaris</h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Analisis performa kurasi item</p>
            </div>
            <button className="text-[10px] text-blue-500 font-black hover:underline" onClick={() => onNavigateTab("produk")}>Edit Stok &rarr;</button>
          </div>

          <div className="space-y-3.5">
            {bestSellersProducts.map((p, i) => (
              <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={p.image} className="w-12 h-12 rounded-xl object-cover shrink-0 border" alt={p.name} referrerPolicy="no-referrer" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold leading-tight">{p.name}</span>
                    <span className="text-[10px] text-slate-400 mt-1 font-mono">{p.sku} &bull; {p.category}</span>
                  </div>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300 font-mono">Rp {p.price.toLocaleString()}</span>
                  <span className="text-[10px] text-emerald-500 font-extrabold mt-1">{p.sales} terjual</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Sync Quick Glance */}
        <div className={`p-6 rounded-[2rem] border text-left ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
        }`}>
          <div className="flex items-center justify-between mb-4 pb-3 border-b dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black tracking-tight">Konektivitas Integrasi Toko</h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Sinkronisasi marketplace eksternal otomatis</p>
            </div>
            <button className="text-[10px] text-blue-500 font-black hover:underline" onClick={() => onNavigateTab("integrations")}>Semua &rarr;</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "Shopee Sync", desc: "Sinkronisasi Stok otomatis", active: true, color: "text-amber-500 bg-amber-500/10" },
              { name: "Tokopedia Sync", desc: "Rincian chat pembeli", active: true, color: "text-green-500 bg-green-500/10" },
              { name: "WhatsApp API", desc: "Notification transaksi", active: true, color: "text-emerald-500 bg-emerald-500/10" },
              { name: "TikTok Shop Sync", desc: "Video & Katalog Live", active: false, color: "text-slate-400 bg-slate-100" }
            ].map((integ, index) => (
              <div 
                key={index} 
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between ${
                  isDarkMode ? "bg-slate-950 border-slate-805" : "bg-slate-50/50 border-slate-100"
                }`}
              >
                <div>
                  <span className="text-xs font-bold block">{integ.name}</span>
                  <span className="text-[10px] text-slate-400 mt-1 block">{integ.desc}</span>
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${integ.active ? "bg-green-500 animate-pulse" : "bg-slate-300"}`}></span>
                  <span className="text-[9px] uppercase font-bold text-slate-400">{integ.active ? "Tersambung" : "Terputus"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
