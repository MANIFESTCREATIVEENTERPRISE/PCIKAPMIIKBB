import React, { useState } from "react";
import { 
  Wallet, DollarSign, ArrowUpRight, ArrowDownLeft, Landmark, Landmark as Bank, 
  CheckCircle2, AlertTriangle, ShieldCheck, FileText, Download, TrendingUp, RefreshCw
} from "lucide-react";

interface SellerFinanceProps {
  isDarkMode: boolean;
  onTriggerNotification: (msg: string) => void;
}

export default function SellerFinance({
  isDarkMode,
  onTriggerNotification
}: SellerFinanceProps) {
  const [walletBalance, setWalletBalance] = useState(18420000);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("Mandiri - *7712");
  const [withdrawProgress, setWithdrawProgress] = useState<"idle" | "loading" | "success">("idle");

  const financialTransactions = [
    { id: "FIN-9102", type: "Penarikan Dana", bank: "Bank Mandiri (*7712)", date: "2026-05-25", amount: -2500000, status: "Berhasil" },
    { id: "FIN-9099", type: "Penjualan Barang TRX-10928", bank: "Escrow Penjualan", date: "2026-05-25", amount: 477000, status: "Dipending Escrow" },
    { id: "FIN-9088", type: "Penjualan Jasa SERV-001", bank: "Escrow Penjualan", date: "2026-05-24", amount: 1500000, status: "Berhasil" },
    { id: "FIN-9022", type: "Penarikan Dana", bank: "Bank Mandiri (*7712)", date: "2026-05-20", amount: -4000000, status: "Berhasil" },
  ];

  const banks = [
    { id: "b1", name: "Bank Mandiri", account: "132-00-1928-7712", owner: "Wahyu Setiawan", isDefault: true },
    { id: "b2", name: "Bank Central Asia (BCA)", account: "014-990-2122", owner: "Wahyu Setiawan", isDefault: false }
  ];

  const handleWithdrawDana = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(withdrawAmount);
    if (!amountVal || amountVal <= 0) {
      onTriggerNotification("Masukkan nominal penarikan dana yang valid!");
      return;
    }
    if (amountVal > walletBalance) {
      onTriggerNotification("Gagal! Saldo dompet toko Anda tidak mencukupi.");
      return;
    }

    setWithdrawProgress("loading");
    setTimeout(() => {
      setWalletBalance(prev => prev - amountVal);
      setWithdrawProgress("success");
      onTriggerNotification(`Sukses menarik dana sebesar Rp ${amountVal.toLocaleString()} ke rekening ${selectedBank}!`);
    }, 1500);
  };

  const handleCloseWithdraw = () => {
    setShowWithdrawModal(false);
    setWithdrawProgress("idle");
    setWithdrawAmount("");
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Financial general KPIs header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-sans">Sistem Finansial &amp; Mutasi Saldo</h2>
          <p className="text-xs text-slate-400 font-medium font-sans">Kelola penarikan dana ke rekening bank Anda, lapor perpajakan bulanan, dan audit rekening escrow aman.</p>
        </div>
        
        <div className="flex items-center gap-2 text-xs bg-emerald-500/10 text-emerald-600 px-3 py-1.5 rounded-xl border dark:border-slate-800 font-bold uppercase tracking-wide">
          <ShieldCheck size={14} /> Escrow Proteksi Aktif (Garansi 100%)
        </div>
      </div>

      {/* Main stats layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Wallet Card Balance - cols 5 */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl flex flex-col justify-between h-60 relative overflow-hidden">
            <div className="space-y-1 z-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Saldo Dompet Toko</span>
              <h3 className="text-3xl font-black tracking-tight font-mono whitespace-nowrap">
                Rp {walletBalance.toLocaleString()}
              </h3>
              <p className="text-[10px] text-blue-100 font-semibold leading-relaxed pt-1 scale-95 origin-left">
                Pembayaran escrow ditampung aman. Mutasi diperbarui real-time.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap z-10 pt-4">
              <button 
                onClick={() => setShowWithdrawModal(true)}
                className="px-5 py-2.5 bg-white text-blue-700 rounded-full text-xs font-black shadow-lg hover:scale-105 transition-transform cursor-pointer uppercase tracking-wider"
              >
                Tarik Saldo Dana &rarr;
              </button>
              
              <div className="text-right text-[10px] text-blue-100 font-mono">
                <span>Total Escrow: </span>
                <span className="font-bold underline">Rp 477.000</span>
              </div>
            </div>

            {/* Visual background circles */}
            <div className="absolute right-0 bottom-0 w-36 h-36 bg-white/5 rounded-full -mr-16 -mb-16 pointer-events-none"></div>
          </div>

          {/* Connected Bank accounts list */}
          <div className={`p-6 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"}`}>
            <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800 mb-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Rekening Bank Terdaftar</h4>
              <button className="text-[10px] text-blue-500 font-bold hover:underline" onClick={() => onTriggerNotification("Buka config bank")}>Tambah Rekening</button>
            </div>

            <div className="space-y-3">
              {banks.map((bk) => (
                <div 
                  key={bk.id} 
                  className={`p-3 rounded-2xl border flex items-center justify-between ${
                    bk.isDefault ? "border-blue-500 bg-blue-50/10 dark:bg-blue-900/10" : "dark:border-slate-805"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-100 dark:bg-slate-950 rounded-xl text-slate-600 dark:text-slate-350">
                      <Landmark size={18} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-black">{bk.name}</span>
                      <span className="text-[10px] text-slate-400 tracking-wider font-mono mt-0.5 leading-none">{bk.account}</span>
                      <span className="text-[9px] text-slate-400 font-bold mt-1 leading-none">An: {bk.owner}</span>
                    </div>
                  </div>
                  {bk.isDefault && (
                    <span className="text-[8px] uppercase tracking-widest bg-blue-600 text-white font-black px-1.5 py-0.5 rounded-md scale-90">DEFAULT</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right ledger book mutasi & summary profit/loss - cols 7 */}
        <div className="lg:col-span-7 space-y-6">
          <div className={`p-6 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"}`}>
            <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800 mb-4">
              <div>
                <h3 className="text-sm font-black tracking-tight">Riwayat Mutasi Finansial</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Laporan audit keluar masuk saldo keuangan toko</p>
              </div>
              <button 
                onClick={() => onTriggerNotification("Mengekspor PDF Laporan...")}
                className="px-2.5 py-1 text-[10px] font-bold border rounded-lg hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Download size={12} /> Unduh PDF
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-slate-400 font-extrabold text-[9px] uppercase tracking-widest border-b dark:border-slate-800 pb-2 block">
                    <th className="py-2 inline-block w-28">ID Transaksi</th>
                    <th className="py-2 inline-block w-44">Tujuan / Sumber</th>
                    <th className="py-2 inline-block w-24">Nominal</th>
                    <th className="py-2 inline-block w-20 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 block max-h-56 overflow-y-auto">
                  {financialTransactions.map(t => (
                    <tr key={t.id} className="py-1 flex items-center justify-between text-[11px] hover:bg-slate-50 dark:hover:bg-slate-950/20 font-medium">
                      <td className="py-3 w-28 font-mono font-bold leading-none">{t.id}</td>
                      <td className="py-3 w-44 leading-none text-slate-505 text-slate-400">
                        <span className="block font-bold text-slate-700 dark:text-slate-300">{t.type}</span>
                        <span className="text-[9px] font-semibold mt-1 block leading-none">{t.date}</span>
                      </td>
                      <td className={`py-3 w-24 font-mono font-black ${t.amount < 0 ? "text-red-500" : "text-emerald-500"}`}>
                        {t.amount < 0 ? "-" : "+"} Rp {Math.abs(t.amount).toLocaleString()}
                      </td>
                      <td className="py-3 w-20 text-right font-black tracking-wider text-[9px] uppercase">
                        <span className={t.status === "Berhasil" ? "text-green-600" : "text-amber-500"}>{t.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Laporan Laba Rugi Summary card list */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-5 rounded-2xl border text-left ${isDarkMode ? "bg-slate-900 border-slate-805" : "bg-slate-50/50 border-slate-100"}`}>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest pl-0.5 block">Pendapatan Kotor Bulanan</span>
              <span className="text-lg font-black font-mono block mt-1 leading-none text-blue-600">Rp 17.142.000</span>
              <span className="text-[9px] text-emerald-500 font-semibold mt-1.5 pl-0.5 block">+18.2% minggu ini</span>
            </div>
            <div className={`p-5 rounded-2xl border text-left ${isDarkMode ? "bg-slate-900 border-slate-805" : "bg-slate-50/50 border-slate-100"}`}>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest pl-0.5 block">Laporan Dividen Bersih</span>
              <span className="text-lg font-black font-mono block mt-1 leading-none text-emerald-600">Rp 15.650.000</span>
              <span className="text-[9px] text-slate-400 font-semibold mt-1.5 pl-0.5 block">Setelah potongan fee admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw simulation animated modal prompt */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className={`p-8 rounded-[2rem] border max-w-md w-full relative shrink-0 text-left ${
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
          }`}>
            <button 
              onClick={handleCloseWithdraw}
              className="absolute top-4 right-4 w-9 h-9 rounded-full border flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer text-slate-400"
            >
              &times;
            </button>

            {withdrawProgress === "idle" && (
              <form onSubmit={handleWithdrawDana} className="space-y-5">
                <div>
                  <span className="text-[10px] text-white bg-blue-600 font-extrabold uppercase px-3 py-1 rounded-full">DOMPET PENARIKAN SALDO</span>
                  <h3 className="text-base font-black tracking-tight mt-3">Tarik Dana Ke Rekening Default</h3>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Tujuan Rekening Bank</label>
                  <select 
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-xs font-semibold outline-none"
                  >
                    {banks.map(b => <option key={b.id} value={`${b.name} - *${b.account.slice(-4)}`}>{b.name} ({b.account})</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Nominal Penarikan (Maksimal Rp {walletBalance.toLocaleString()})</label>
                  <input 
                    type="number"
                    required
                    placeholder="e.g. 5000000"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full px-3.5 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 font-mono text-xs font-black tracking-wide focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                <div className="bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/15 flex gap-2 w-full">
                  <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    Dana akan langsung diproses kliring instan dalam waktu 1x24 jam berkat escrow otomatis. Tidak ada biaya tambahan penalti.
                  </p>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Konfirmasi Cairkan Dana &rarr;
                </button>
              </form>
            )}

            {withdrawProgress === "loading" && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <RefreshCw size={36} className="text-blue-500 animate-spin" />
                <span className="text-xs font-black tracking-wider uppercase text-blue-500 animate-pulse">Memproses Transfer Dana...</span>
                <p className="text-[10px] text-slate-400 font-medium">Sistem Maretoko sedang memverifikasi rincian rekonsiliasi database bank.</p>
              </div>
            )}

            {withdrawProgress === "success" && (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-base font-black">Penarikan Berhasil Di-request!</h3>
                <p className="text-xs text-slate-400 font-medium max-w-xs leading-relaxed">
                  Permohonan transfer dana Anda sebesar <span className="text-blue-600 font-extrabold font-mono">Rp {parseFloat(withdrawAmount).toLocaleString()}</span> telah diterbitkan ke kliring bank Mandiri Anda.
                </p>
                <button 
                  onClick={handleCloseWithdraw}
                  className="px-6 py-2 bg-slate-800 hover:bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl cursor-pointer"
                >
                  Tutup Notif Penarikan
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
