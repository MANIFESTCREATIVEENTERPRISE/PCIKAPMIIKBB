import React, { useState } from "react";
import { 
  Zap, Megaphone, Plus, Percent, Clock, PlusCircle, Share2, 
  HelpCircle, Settings, Chrome, Facebook, Smartphone, Trash2, Heart, Award
} from "lucide-react";

interface SellerPromoProps {
  isDarkMode: boolean;
  onTriggerNotification: (msg: string) => void;
}

export default function SellerPromo({
  isDarkMode,
  onTriggerNotification
}: SellerPromoProps) {
  // Coupon codes database state
  const [coupons, setCoupons] = useState([
    { code: "MAREGABUNG", type: "Persentase", val: "10%", minSpend: "Rp 150K", desc: "Promo sambutan mitra baru", status: "aktif" },
    { code: "FLASHRAMAH", type: "Potongan Tetap", val: "Rp 25.000", minSpend: "Rp 200K", desc: "Diskon flash sale jumat", status: "aktif" },
    { code: "DIGITALVIBE", type: "Persentase", val: "20%", minSpend: "Rp 50K", desc: "Khusus catalog produk digital", status: "draft" }
  ]);

  const [campaigns, setCampaigns] = useState([
    { id: "CMP-01", name: "Google Social Ad-words 2026", budget: 350000, reach: "14.2K org", status: "aktif" },
    { id: "CMP-02", name: "TikTok Live Video Push Campaign", budget: 750000, reach: "41.0K org", status: "aktif" }
  ]);

  const [newCoupon, setNewCoupon] = useState({ code: "", val: "", minSpend: "", type: "Persentase", desc: "" });
  const [showAddCoupon, setShowAddCoupon] = useState(false);

  // Marketing Pixel tracking state toggles
  const [pixels, setPixels] = useState({
    fbPixel: "FB-99212002-88",
    googleAnalytics: "UA-148102-1",
    tiktokPixel: "TT-2019918"
  });

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.val) {
      onTriggerNotification("Gagal mendata voucher! Masukkan kode & besaran nilai diskon.");
      return;
    }

    const created = {
      code: newCoupon.code.toUpperCase().replace(/\s+/g, ""),
      type: newCoupon.type,
      val: newCoupon.val,
      minSpend: newCoupon.minSpend || "Tanpa Batas",
      desc: newCoupon.desc || "Kupon diskon Maretoko",
      status: "aktif"
    };

    setCoupons(prev => [created, ...prev]);
    setShowAddCoupon(false);
    onTriggerNotification(`Sukses! Voucher diskon "${created.code}" berhasil disebarkan.`);
    setNewCoupon({ code: "", val: "", minSpend: "", type: "Persentase", desc: "" });
  };

  const handleDeleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
    onTriggerNotification(`Kupon "${code}" diarsipkan.`);
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-sans">Promosi &amp; Alat Pemasaran Digital</h2>
          <p className="text-xs text-slate-400 font-medium font-sans">Kelola kupon diskon mandiri, lancarkan flash sale terjadwal, pantau program afiliasi, dan suntikkan kode pixel pelacakan.</p>
        </div>

        <button 
          onClick={() => setShowAddCoupon(!showAddCoupon)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/10"
        >
          <PlusCircle size={14} /> Buat Kupon Voucher Baru
        </button>
      </div>

      {/* Add Coupon Widget Form */}
      {showAddCoupon && (
        <form onSubmit={handleCreateCoupon} className={`p-6 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"} space-y-4 animate-slideDown`}>
          <div className="flex justify-between items-center pb-2 border-b dark:border-slate-800">
            <h3 className="text-xs font-black uppercase text-amber-600 tracking-widest pl-1">Voucher Configurator Tool</h3>
            <button type="button" className="text-xs font-bold text-slate-400" onClick={() => setShowAddCoupon(false)}>Batal</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Kode Voucher (Kapital)</label>
              <input 
                type="text" 
                required
                placeholder="e.g. DISKONHEBAT" 
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-xs font-bold outline-none" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Tipe Diskon</label>
              <select 
                value={newCoupon.type}
                onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})}
                className="w-full px-3 py-1.5 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-xs font-bold outline-none"
              >
                <option value="Persentase">Persentase (%)</option>
                <option value="Potongan Tetap">Potongan Tetap (Rupiah)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Nilai Potongan</label>
              <input 
                type="text" 
                required
                placeholder="e.g. 15% atau 25000" 
                value={newCoupon.val}
                onChange={(e) => setNewCoupon({...newCoupon, val: e.target.value})}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-xs font-bold outline-none" 
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-450 text-slate-400 uppercase tracking-widest block mb-1">Sarat Minimal Belanja</label>
              <input 
                type="text" 
                placeholder="e.g. Rp 100K" 
                value={newCoupon.minSpend}
                onChange={(e) => setNewCoupon({...newCoupon, minSpend: e.target.value})}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-xs font-bold outline-none" 
              />
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <input 
              type="text"
              placeholder="Deskripsi ringkas kegunaan promo..."
              value={newCoupon.desc}
              onChange={(e) => setNewCoupon({...newCoupon, desc: e.target.value})}
              className="flex-grow px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-xs font-medium outline-none"
            />
            <button 
              type="submit"
              className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
            >
              Terbitkan Promo Diskon &rarr;
            </button>
          </div>
        </form>
      )}

      {/* Grid view of marketing cards row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active discount vouchers - cols 7 */}
        <div className={`p-6 rounded-[2rem] border lg:col-span-7 text-left ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"
        }`}>
          <div className="flex justify-between items-center pb-3 border-b dark:border-slate-800 mb-4">
            <h3 className="text-sm font-black tracking-tight text-slate-805">Voucher Diskon Toko Aktif</h3>
            <span className="text-[10px] text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">Total: {coupons.length} Kode</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coupons.map((c) => (
              <div 
                key={c.code} 
                className={`p-4 rounded-2xl border flex flex-col justify-between hover:border-amber-400 relative overflow-hidden ${
                  isDarkMode ? "bg-slate-950 border-slate-805" : "bg-slate-50/50 border-slate-100"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-mono font-black text-amber-500">{c.code}</span>
                    <button onClick={() => handleDeleteCoupon(c.code)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <span className="text-xs font-black block text-slate-700 dark:text-slate-300 mt-2">Diskon {c.val}</span>
                  <p className="text-[10px] text-slate-405 text-slate-400 leading-normal mt-1">{c.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t dark:border-slate-800 flex items-center justify-between text-[9px] font-bold text-slate-400 tracking-wider">
                  <span>Min: {c.minSpend}</span>
                  <span className="text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-md uppercase">AKTIF</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pixel tags marketing inject panels - cols 5 */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`p-6 rounded-[2rem] border text-left ${
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"
          }`}>
            <div className="flex border-b pb-3 mb-4 justify-between items-center dark:border-slate-800">
              <h3 className="text-sm font-black tracking-tight">Koneksi Pixel &amp; Google Tag</h3>
              <Megaphone size={16} className="text-blue-500 animate-pulse" />
            </div>

            <div className="space-y-4 font-semibold text-slate-500">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Facebook Pixel ID</label>
                <input 
                  type="text" 
                  value={pixels.fbPixel} 
                  onChange={(e) => setPixels({...pixels, fbPixel: e.target.value})}
                  className="w-full px-2.5 py-1.5 border rounded-xl text-xs bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-slate-800 font-mono" 
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">TikTok Shop Pixel ID</label>
                <input 
                  type="text" 
                  value={pixels.tiktokPixel} 
                  onChange={(e) => setPixels({...pixels, tiktokPixel: e.target.value})}
                  className="w-full px-2.5 py-1.5 border rounded-xl text-xs bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-slate-800 font-mono" 
                />
              </div>

              <button 
                type="button"
                onClick={() => onTriggerNotification("Pixel pemasaran berhasil disimpan!")}
                className="w-full py-2 bg-slate-800 hover:bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer"
              >
                Simpan &amp; Injeksikan Cookie Pixel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
