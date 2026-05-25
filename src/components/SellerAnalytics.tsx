import { useState } from "react";
import { 
  Award, TrendingUp, BarChart3, PieChart as PieIcon, LineChart as LineIcon, 
  ArrowRight, Download, Bot, Sparkles, RefreshCw, Layers, CheckCircle
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

interface SellerAnalyticsProps {
  isDarkMode: boolean;
  onTriggerNotification: (msg: string) => void;
}

export default function SellerAnalytics({
  isDarkMode,
  onTriggerNotification
}: SellerAnalyticsProps) {
  const [aiInsightActive, setAiInsightActive] = useState(false);
  const [aiReportText, setAiReportText] = useState("");

  const trafficSources = [
    { name: "Google SEO", value: 45, color: "#2563eb" },
    { name: "WhatsApp Direct", value: 25, color: "#10b981" },
    { name: "TikTok Shop Platform", value: 18, color: "#ec4899" },
    { name: "Instagram Bio Bio Link", value: 12, color: "#f59e0b" }
  ];

  const conversionFunnel = [
    { stage: "Melihat Katalog", count: 8840, pct: "100%" },
    { stage: "Klik Detail Item", count: 4120, pct: "46.6%" },
    { stage: "Tambah ke Keranjang", count: 1840, pct: "20.8%" },
    { stage: "Checkout Pembayaran", count: 325, pct: "3.67%" }
  ];

  const generateAiBusinessInsight = () => {
    setAiInsightActive(true);
    setTimeout(() => {
      const insights = [
        "💡 Rencana Rekomendasi Maretoko AI:\n\n1. Kategori Jasa Desain Landing Page Anda memiliki margin keuntungan kotor 92%. Sebaiknya alokasikan 10% keuntungan kotor ini ke promosi iklan berbayar Google guna mendatangkan kuesioner prospek baru.\n2. Tingkat konversi keranjang ke checkout Anda adalah 3.67%, di bawah rata-rata industri (4.5%). Rekomendasi: Pasang program Gratis Ongkir dengan RajaOngkir untuk memicu transaksi lebih cepat.\n3. Segmentasi pelanggan regular Anda adalah yang terbesar (45%), tawarkan diskon kupon ulang tahun otomatis via WhatsApp sync untuk memicu repeat order.",
        "📊 Performa Katalog Optimasional Anda:\n\n1. Produk 'SaaS Business Template Pro' menyumbang 48% dari total omzet. Naikkan harga normal rujukan sebesar Rp 15K dan berikan kupon core-diskon agar memicu bias urgensi belanja.\n2. Trafik tertinggi didatangkan lewat Google SEO (45%). Disarankan untuk merilis Landing Page Custom Domain Toko di menu pengaturan untuk meningkatkan indeks mesin penelusuran lebih solid."
      ];
      setAiReportText(insights[Math.floor(Math.random() * insights.length)]);
      setAiInsightActive(false);
      onTriggerNotification("AI Business insight berhasil dianalisis!");
    }, 1500);
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-sans">Visual Analytics &amp; Laporan Bisnis</h2>
          <p className="text-xs text-slate-400 font-medium font-sans">Kaji saluran omzet penjualan produk, statistik konversi, rasio klik tayang promosi, dan dengarkan rekomendasi AI.</p>
        </div>

        <button 
          onClick={() => onTriggerNotification("Mengekspor Laporan Excel...")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer"
        >
          <Download size={14} /> Unduh Laporan Laba Rugi (.XLS)
        </button>
      </div>

      {/* Analytics bento grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column conversions path - cols 8 */}
        <div className={`p-6 rounded-[2rem] border lg:col-span-8 ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"
        }`}>
          <div className="flex justify-between items-center border-b dark:border-slate-800 pb-3 mb-6">
            <h3 className="text-sm font-black tracking-tight">Grafik Corong Konversi Belanja (Sales Funnel)</h3>
            <Layers size={16} className="text-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visual Funnel bars */}
            <div className="space-y-4">
              {conversionFunnel.map((fun, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-700 dark:text-slate-350">{fun.stage}</span>
                    <span className="font-mono text-slate-400">{fun.count} org ({fun.pct})</span>
                  </div>
                  {/* Dynamic percentage bar visual */}
                  <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" 
                      style={{ width: `${parseFloat(fun.pct)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual insights summary text beside funnel */}
            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border dark:border-slate-800 space-y-3 leading-relaxed">
              <span className="text-[10px] bg-blue-600 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Performa Rujukan</span>
              <p className="text-[10px] text-slate-400 font-semibold">
                Rasio konversi dari melihat katalog produk draf online hingga checkout pembayaran berselisih <span className="text-emerald-500 font-extrabold font-sans">3.67%</span>. Anda disarankan melakukan optimasi foto detail catalog dan menambahkan kupon Voucher Diskon gratis ongkir RajaOngkir.
              </p>
            </div>
          </div>
        </div>

        {/* Right column chart source - cols 4 */}
        <div className={`p-6 rounded-[2rem] border lg:col-span-4 ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"
        }`}>
          <div className="flex justify-between items-center pb-3 border-b dark:border-slate-800 mb-4">
            <h3 className="text-sm font-black tracking-tight">Sumber Trafik Pembeli</h3>
            <span className="text-[9px] bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded-full font-bold">Top 4</span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 mt-3 text-[11px] font-bold">
            {trafficSources.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-505 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full block" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-mono text-slate-705 dark:text-slate-300">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant Insight advisor panel */}
      <div className={`p-8 rounded-[2rem] border relative overflow-hidden text-left ${
        isDarkMode 
          ? "bg-gradient-to-br from-indigo-950/20 to-slate-900 border-slate-800" 
          : "bg-gradient-to-br from-blue-50/20 to-white border-slate-150"
      }`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4 dark:border-slate-800 mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white scale-90">
              <Bot size={22} className="animate-pulse" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase text-blue-550 tracking-widest block text-blue-500">Maretoko AI Engine</span>
              <h4 className="font-display font-black text-slate-705 dark:text-white text-base mt-0.5">Penilai Bisnis Cerdas (AI Business Coach)</h4>
            </div>
          </div>

          <button 
            onClick={generateAiBusinessInsight}
            disabled={aiInsightActive}
            type="button"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer flex items-center gap-2"
          >
            {aiInsightActive ? (
              <>
                <RefreshCw size={14} className="animate-spin" /> Merancang...
              </>
            ) : (
              <>
                <Sparkles size={14} /> Analisis Data Toko &rarr;
              </>
            )}
          </button>
        </div>

        {/* Generated report print out */}
        <div className="relative z-10">
          {aiReportText ? (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border dark:border-slate-800 text-xs font-medium leading-relaxed font-sans whitespace-pre-wrap text-slate-700 dark:text-slate-300 shadow-inner">
              {aiReportText}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 font-medium">
              Belum ada insight. Klik tombol <span className="font-extrabold text-blue-500">"Analisis Data Toko"</span> di atas untuk mengevaluasi database penjualan swalayan digital Anda dengan kecerdasan buatan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
