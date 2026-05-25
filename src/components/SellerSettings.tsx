import React, { useState } from "react";
import { 
  Building2, Sliders, ShieldCheck, Landmark, Globe, FileText, 
  MapPin, Clock, Upload, ToggleLeft, ToggleRight, Sparkles, AlertCircle
} from "lucide-react";

interface SellerSettingsProps {
  isDarkMode: boolean;
  onTriggerNotification: (msg: string) => void;
}

export default function SellerSettings({
  isDarkMode,
  onTriggerNotification
}: SellerSettingsProps) {
  const [storeName, setStoreName] = useState("Maretoko Official");
  const [storeDesc, setStoreDesc] = useState("Pusat penyedia template SaaS digital, aksesoris premium, dan layanan software terpercaya.");
  
  // Custom Domain state
  const [customDomain, setCustomDomain] = useState("maretoko.id");
  const [domainVerified, setDomainVerified] = useState(true);

  // Verification status tracker
  const [verificationState, setVerificationState] = useState({
    nib: "9102830182",
    ktp: "32730102030294",
    status: "Terverifikasi"
  });

  const handleSaveStoreConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onTriggerNotification("Profil toko & rujukan metadata SEO berhasil disimpan!");
  };

  const handleDomainVerificationCheck = () => {
    onTriggerNotification("Domain dikirim untuk verifikasi ssl cerdas!");
    setDomainVerified(true);
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-sans">Konfigurasi Pengaturan &amp; Admin Toko</h2>
        <p className="text-xs text-slate-400 font-medium">Atur jam buka operasional cabang, suntik metadata SEO, mapping domain mandiri, dan kelola verifikasi identitas resmi.</p>
      </div>

      {/* Settings Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left main config - cols 8 */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSaveStoreConfig} className={`p-8 rounded-[2rem] border ${
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"
          } space-y-6`}>
            <div className="pb-3 border-b dark:border-slate-800 mb-4">
              <span className="text-[10px] font-black uppercase text-blue-550 bg-blue-50 px-2.5 py-1 rounded-full text-blue-600 tracking-wider">Storefront Identity</span>
              <h3 className="text-base font-black tracking-tight mt-2 text-slate-900 dark:text-white">Identitas Toko &amp; Branding</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Nama Toko Utama</label>
                <input 
                  type="text" 
                  value={storeName} 
                  onChange={(e) => setStoreName(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-600" 
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Alamat Lokasi Pusat</label>
                <input 
                  type="text" 
                  defaultValue="Kawasan Ngamprah, Kabupaten Bandung Barat, Jawa Barat" 
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-xs font-semibold" 
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 font-sans">Slogan / Deskripsi Rujukan Toko</label>
              <textarea 
                rows={3} 
                value={storeDesc} 
                onChange={(e) => setStoreDesc(e.target.value)}
                className="w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-804 outline-none text-xs font-semibold focus:ring-2 focus:ring-blue-600 leading-relaxed text-slate-705 dark:text-slate-300 dark:border-slate-800"
              ></textarea>
            </div>

            {/* Logo/Banner Preview Designer Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Unggah Logo</span>
                <div className="border border-dashed dark:border-slate-800 rounded-2xl p-4 text-center text-xs space-y-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black mx-auto">M</div>
                  <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wide block">Logo .PNG 500px</span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Unggah Banner Toko</span>
                <div className="border border-dashed dark:border-slate-800 rounded-2xl p-4 text-center text-xs flex flex-col justify-center items-center h-24">
                  <Upload size={18} className="text-slate-300 mb-1" />
                  <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-wide">Banner Rekomendasi 1200 x 400px</span>
                </div>
              </div>
            </div>

            {/* SEO controls panel */}
            <div className="space-y-4 bg-slate-50 dark:bg-slate-950 p-6 rounded-3xl border dark:border-slate-800">
              <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 flex items-center gap-1">
                <Sparkles size={12} /> Search Engine Optimization (SEO) Config
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase font-extrabold text-slate-400">SEO Meta Title</label>
                  <input type="text" defaultValue="Maretoko Official | Template SaaS Dan Aksesoris" className="w-full px-2.5 py-1.5 mt-1 border rounded-lg text-xs" />
                </div>
                <div>
                  <label className="text-[9px] uppercase font-extrabold text-slate-400">SEO Keywords (koma)</label>
                  <input type="text" defaultValue="maretoko, seller, jasa bandung, produk digital" className="w-full px-2.5 py-1.5 mt-1 border rounded-lg text-xs" />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider cursor-pointer"
            >
              Simpan Profil &amp; Rujukan SEO &rarr;
            </button>
          </form>
        </div>

        {/* Right sub-domain and verification panel - cols 4 */}
        <div className="lg:col-span-4 space-y-6">
          {/* Subdomain mapping */}
          <div className={`p-6 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"} text-left`}>
            <div className="flex border-b pb-3 mb-4 justify-between items-center dark:border-slate-800">
              <h3 className="text-sm font-black tracking-tight text-slate-800 dark:text-slate-200">Custom Domain Cerdas</h3>
              <Globe size={18} className="text-blue-500 animate-pulse" />
            </div>

            <div className="space-y-4">
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">Hubungkan nama domain rujukan Anda agar landing page toko tampil mandiri dan kredibel.</p>
              
              <div className="flex rounded-xl overflow-hidden border">
                <span className="px-3 bg-slate-100 dark:bg-slate-950 border-r flex items-center text-[10px] font-black tracking-widest">HTTPS://</span>
                <input 
                  type="text" 
                  value={customDomain} 
                  onChange={(e) => setCustomDomain(e.target.value)} 
                  className="w-full py-2 px-3 text-xs outline-none bg-slate-50 dark:bg-slate-900 font-semibold"
                />
              </div>

              {domainVerified ? (
                <div className="p-3 bg-green-500/10 border border-green-500/15 text-green-600 rounded-xl text-[10px] font-bold flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Domain Berhasil Dimap &amp; SSL Aktif!
                </div>
              ) : (
                <button 
                  onClick={handleDomainVerificationCheck}
                  type="button" 
                  className="w-full py-2 bg-slate-800 hover:bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  Verifikasi Integrasi Domain
                </button>
              )}
            </div>
          </div>

          {/* Legal Business Verification */}
          <div className={`p-6 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"} text-left`}>
            <div className="flex border-b pb-3 mb-4 justify-between items-center dark:border-slate-800">
              <h3 className="text-sm font-black tracking-tight">KTP &amp; NIB Badan Usaha</h3>
              <ShieldCheck size={18} className="text-emerald-500" />
            </div>

            <div className="space-y-4 text-xs font-semibold leading-relaxed text-slate-505">
              <div className="flex justify-between">
                <span>Status Akun:</span>
                <span className="text-emerald-500 font-extrabold uppercase">Terverifikasi Pro</span>
              </div>
              <div className="flex justify-between">
                <span>NIB No:</span>
                <span className="font-mono">{verificationState.nib}</span>
              </div>
              <div className="flex justify-between">
                <span>KTP No Pemilik:</span>
                <span className="font-mono">{verificationState.ktp.slice(0, 6)}******</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
