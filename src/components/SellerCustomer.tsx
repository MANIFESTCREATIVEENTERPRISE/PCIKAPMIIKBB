import React, { useState } from "react";
import { 
  Users, Search, Award, Flame, Send, Mail, Phone, ShoppingCart, 
  MessageSquare, SlidersHorizontal, Heart, Gift, Percent, Share2, HelpCircle
} from "lucide-react";
import { Customer } from "../types/seller";
import { INITIAL_CUSTOMERS } from "../data/sellerMockData";

interface SellerCustomerProps {
  isDarkMode: boolean;
  onTriggerNotification: (msg: string) => void;
}

export default function SellerCustomer({
  isDarkMode,
  onTriggerNotification
}: SellerCustomerProps) {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [activeTierFilter, setActiveTierFilter] = useState<"semua" | "Platinum" | "Gold" | "Silver" | "Regular">("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [couponMode, setCouponMode] = useState<"broadcast" | "reward">("broadcast");
  const [broadcastCount, setBroadcastCount] = useState(0);

  // Marketing Campaign generator state
  const [marketingMsg, setMarketingMsg] = useState("");
  const [rewardPointsCost, setRewardPointsCost] = useState("100");

  const filteredCustomers = customers.filter(c => {
    const matchesTier = activeTierFilter === "semua" || c.tier === activeTierFilter;
    const matchesQuery = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.phone.includes(searchQuery) || 
                         c.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesQuery;
  });

  const handleSendBroadcastCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketingMsg) {
      onTriggerNotification("Pesan promosi belum ditulis!");
      return;
    }
    const targetCount = filteredCustomers.length;
    setTimeout(() => {
      onTriggerNotification(`Sukses membroadcast pesan pemasaran ke ${targetCount} pelanggan di WhatsApp & Email!`);
      setMarketingMsg("");
      setBroadcastCount(p => p + 1);
    }, 1200);
  };

  const handleAdjustClientStatus = (clientId: string, nextStatus: "aktif" | "suspended") => {
    setCustomers(prev => prev.map(c => {
      if (c.id === clientId) {
        onTriggerNotification(`Status akun pelanggan ${c.name} diubah menjadi ${nextStatus}`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">Manajemen Hubungan Pelanggan (CRM)</h2>
          <p className="text-xs text-slate-400 font-medium font-sans">Database segmen pembeli, monitor perolehan poin program membership, voucher digital &amp; blast WA marketing.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-xl border dark:border-slate-800 text-blue-600 font-black text-[10px] uppercase">
          <Gift size={14} /> Total Membership: {customers.length} Pengguna
        </div>
      </div>

      {/* Database control filters & lookup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side Client Database Table Container */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900 border p-3.5 rounded-2xl">
            <div className="relative w-full sm:max-w-xs shrink-0">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={16} />
              </span>
              <input 
                type="text"
                placeholder="Cari pelanggan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-950 border dark:border-slate-800 rounded-xl outline-none text-xs font-semibold focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex flex-wrap gap-1">
              {(["semua", "Platinum", "Gold", "Silver", "Regular"] as const).map(tier => (
                <button
                  key={tier}
                  onClick={() => setActiveTierFilter(tier)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${
                    activeTierFilter === tier 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "bg-white dark:bg-slate-950 hover:bg-slate-100 text-slate-500"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          <div className={`overflow-x-auto rounded-[1.5rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"}`}>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-400 font-extrabold text-[10px] uppercase">
                  <th className="px-5 py-3">Nama Pembeli</th>
                  <th className="px-5 py-3">Segment / Tier</th>
                  <th className="px-5 py-3">Belanja Total</th>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Loyalty Poin</th>
                  <th className="px-5 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCustomers.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/10">
                    <td className="px-5 py-3">
                      <div className="flex flex-col">
                        <span className="font-extrabold text-slate-800 dark:text-slate-100">{c.name}</span>
                        <span className="text-[10px] text-slate-400 mt-1">{c.email} &bull; {c.phone}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        c.tier === "Platinum" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30" :
                        c.tier === "Gold" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30" :
                        c.tier === "Silver" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30" :
                        "bg-slate-100 text-slate-500"
                      }`}>
                        {c.tier}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono font-bold">
                      Rp {c.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 font-semibold font-sans">{c.orderCount} pesanan</td>
                    <td className="px-5 py-3 font-mono font-black text-amber-500">{c.points} Pts</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        <button 
                          onClick={() => handleAdjustClientStatus(c.id, c.status === "aktif" ? "suspended" : "aktif")}
                          className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg border cursor-pointer ${
                            c.status === "aktif" ? "border-red-100 text-red-500 hover:bg-red-50" : "border-emerald-100 text-emerald-500 hover:bg-emerald-50"
                          }`}
                        >
                          {c.status === "aktif" ? "Suspend" : "Lolos"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side Direct Marketing Module */}
        <div className="lg:col-span-4 space-y-6">
          <div className={`p-6 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-1 =0"} text-left`}>
            <div className="flex border-b pb-3 mb-4 justify-between items-center dark:border-slate-800">
              <h3 className="text-sm font-black tracking-tight text-slate-800 dark:text-slate-100">WhatsApp &amp; Mail Broadcast</h3>
              <span className="text-[10px] font-bold text-slate-400">Total Terpilih: {filteredCustomers.length}</span>
            </div>

            <form onSubmit={handleSendBroadcastCampaign} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Template Pesan Promosi</label>
                <textarea 
                  rows={5}
                  value={marketingMsg}
                  onChange={(e) => setMarketingMsg(e.target.value)}
                  placeholder="Halo Kak Sahabat Pembeli Setia! Kami punya penawaran voucher belanja diskon 15% khusus pembelian hari ini. Gunakan kode promo FLASHMARE di bawah..."
                  className="w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 outline-none text-xs font-semibold focus:ring-2 focus:ring-blue-600 leading-relaxed text-slate-700 dark:text-slate-300"
                ></textarea>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border dark:border-slate-800 space-y-2">
                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest block">&bull; Jalur API WhatsApp &amp; SMTP Aktif</span>
                <p className="text-[9px] text-slate-400 font-semibold leading-relaxed">
                  Pesan penawaran diskon kuesioner Anda akan dikirimkan otomatis menggunakan engine server WhatsApp gateway penyiaran massal.
                </p>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                Kirim Blast Broadcast Sekarang &rarr;
              </button>
            </form>
          </div>

          <div className={`p-6 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"} text-left`}>
            <div className="flex border-b pb-3 mb-4 justify-between items-center dark:border-slate-800">
              <h3 className="text-sm font-black tracking-tight">Kupon Tukar Reward Poin</h3>
              <Award size={16} className="text-amber-500" />
            </div>

            <div className="space-y-4 text-xs font-semibold leading-relaxed text-slate-500">
              <p className="text-[10px]">Atur penalti &amp; rasio penukaran reward poin digital yang dikumpulkan kader swalayan.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-wider text-slate-400 block mb-1">Rasio Poin per Rp10.000</label>
                  <input type="text" defaultValue="1 Poin" className="w-full px-2 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 dark:border-slate-800 uppercase" />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-wider text-slate-400 block mb-1">Syarat Cetak Klaim</label>
                  <input type="text" value={`${rewardPointsCost} Poin`} onChange={(e) => setRewardPointsCost(e.target.value)} className="w-full px-2 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 dark:border-slate-800" />
                </div>
              </div>

              <button 
                onClick={() => onTriggerNotification("Konfigurasi reward poin diperbarui!")}
                type="button" 
                className="w-full py-2 border rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350"
              >
                Konfigurasi Poin Pemasaran
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
