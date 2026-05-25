import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Wallet, CreditCard, ChevronRight, CheckCircle2, ShieldCheck, Copy, Info, Building2, GraduationCap, Users, Briefcase } from "lucide-react";

export default function Donation() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    anon: false,
    message: "",
    targetKarsa: "lembaga"
  });

  const pancakarsaTargets = [
    { id: "lembaga", name: "Penguatan Lembaga", desc: "Digitalisasi administrasi, e-KTA, raker, dan tata pamong organisasi", icon: Building2 },
    { id: "pendidikan", name: "Pendidikan & Pelatihan", desc: "Beasiswa kader, sekolah kepemimpinan, dan peningkatan hard/soft skill", icon: GraduationCap },
    { id: "jaringan", name: "Penguatan Jaringan", desc: "Sinergi lintas sektor, LBH IKA PMII Advokasi hukum, dan forum kealumnian strategis", icon: Users },
    { id: "ekonomi", name: "Pemberdayaan Ekonomi", desc: "KAMARA Swatransaksi, pendampingan UMKM alumni, dan modal usaha syariah", icon: Briefcase },
    { id: "sosial", name: "Pengabdian Masyarakat", desc: "Klinik kesling stunting, relawan kebencanaan, dan kepedulian sosial warga", icon: Heart },
  ];

  const predefinedAmounts = [50000, 100000, 250000, 500000, 1000000, -1]; // -1 for custom

  const paymentMethods = [
    { id: "bca", name: "Transfer BCA", holder: "PMII KBB", account: "0832194812", icon: Wallet },
    { id: "mandiri", name: "Transfer Mandiri", holder: "PMII KBB", account: "13100344211", icon: Wallet },
    { id: "qris", name: "GOPAY / OVO / DANA (QRIS)", holder: "PMII KBB", account: "Scan QR saat pembayaran", icon: CreditCard },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    if (val !== -1) {
      setCustomAmount("");
    }
  };

  const selectedPaymentInfo = paymentMethods.find((p) => p.id === paymentMethod);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4); // Success step
  };

  return (
    <div className="min-h-screen bg-surface py-12 md:py-20 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-4 bg-primary/10 text-primary rounded-full mb-4"
          >
            <Heart size={32} className="animate-pulse" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
          >
            Donasi & Dukungan
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Dukungan Anda membantu kami dalam menjalankan berbagai program pemberdayaan, pendidikan, dan pengabdian masyarakat.
          </motion.p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          
          {/* Progress Sidebar */}
          <div className="bg-primary p-8 md:w-1/3 text-white">
            <h3 className="font-bold text-xl mb-8 flex items-center gap-2">
              <ShieldCheck className="text-accent" />
              Proses Aman
            </h3>
            
            <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-3.5 before:w-0.5 before:bg-white/20">
              {[
                { num: 1, title: "Nominal" },
                { num: 2, title: "Donatur" },
                { num: 3, title: "Pembayaran" },
                { num: 4, title: "Selesai" }
              ].map((s) => (
                <div key={s.num} className={`flex items-center gap-4 relative z-10 transition-opacity ${step >= s.num ? "opacity-100" : "opacity-40"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    step >= s.num ? "bg-accent text-primary" : "bg-white/20 text-white"
                  }`}>
                    {step > s.num ? <CheckCircle2 size={16} /> : s.num}
                  </div>
                  <span className={`font-semibold ${step === s.num ? "text-accent" : ""}`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-4 bg-white/10 rounded-xl text-sm">
              <p className="flex items-start gap-2">
                <Info size={16} className="shrink-0 mt-0.5 text-accent" />
                Seluruh dana donasi akan dikelola secara transparan dan amanah oleh pengurus cabang.
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-12 md:w-2/3 min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Amount */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Pilih Nominal Donasi</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {predefinedAmounts.map((val, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAmountSelect(val)}
                        className={`py-4 px-2 rounded-xl border-2 font-bold text-center transition-all ${
                          amount === val 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-gray-100 hover:border-primary/30 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {val === -1 ? "Lainnya" : formatCurrency(val)}
                      </button>
                    ))}
                  </div>

                  {amount === -1 && (
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Masukkan Nominal (Rp)</label>
                      <input 
                        type="number"
                        placeholder="Contoh: 150000"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-lg font-medium"
                      />
                    </div>
                  )}

                  <div className="mt-10 flex justify-end">
                    <button
                      disabled={!amount || (amount === -1 && !customAmount) || (amount === -1 && parseInt(customAmount) < 10000)}
                      onClick={() => setStep(2)}
                      className="btn-primary flex items-center gap-2 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Selanjutnya <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: User Data & Payment Method */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Data Donatur</h2>
                  
                  <div className="space-y-4 mb-8">
                    {!formData.anon && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                          <input 
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Nama Donatur"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-gray-400 font-normal">(Opsional)</span></label>
                            <input 
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                              placeholder="email@anda.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp <span className="text-gray-400 font-normal">(Opsional)</span></label>
                            <input 
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                              placeholder="0812..."
                            />
                          </div>
                        </div>
                      </>
                    )}
                    
                    <label className="flex items-center gap-2 cursor-pointer pt-2">
                      <input 
                        type="checkbox" 
                        checked={formData.anon}
                        onChange={(e) => {
                          setFormData({...formData, anon: e.target.checked, name: e.target.checked ? 'Hamba Allah' : '' });
                        }}
                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                      />
                      <span className="text-sm font-medium text-gray-700">Sembunyikan nama saya (Hamba Allah)</span>
                    </label>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Doa / Pesan <span className="text-gray-400 font-normal">(Opsional)</span></label>
                      <textarea 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary h-24 resize-none"
                        placeholder="Tuliskan doa atau pesan dukungan Anda..."
                      />
                    </div>
                  </div>

                  {/* Tujuan Peruntukan Dana (Pancakarsa) */}
                  <h3 className="text-xl font-bold mb-2 text-gray-900 border-t border-gray-100 pt-6">Tujuan Peruntukan Dana (Pancakarsa)</h3>
                  <p className="text-xs text-gray-500 mb-4 font-medium">Pilih salah satu dari 5 Pilar Program Kerja Utama IKA PMII / Koperasi agar dana yang didapat dapat direalisasikan sebagaimana mestinya:</p>
                  
                  <div className="space-y-3 mb-8">
                    {pancakarsaTargets.map((p) => {
                      const IconComp = p.icon;
                      const isSelected = formData.targetKarsa === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, targetKarsa: p.id })}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 cursor-pointer text-left ${
                            isSelected ? "border-primary bg-primary/5 shadow-xs" : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl ${isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-600"} shrink-0`}>
                            <IconComp size={20} />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="font-bold text-gray-950 text-sm">{p.name}</p>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed mt-0.5">{p.desc}</p>
                          </div>
                          <div className="flex items-center self-center shrink-0">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected ? "border-primary bg-primary" : "border-gray-300 bg-white"
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-gray-900 border-t border-gray-100 pt-6">Metode Pembayaran</h3>
                  <div className="space-y-3 mb-8">
                    {paymentMethods.map((pm) => (
                      <label 
                        key={pm.id}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === pm.id ? "border-primary bg-primary/5" : "border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${paymentMethod === pm.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}>
                            <pm.icon size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{pm.name}</p>
                          </div>
                        </div>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value={pm.id}
                          checked={paymentMethod === pm.id}
                          onChange={() => setPaymentMethod(pm.id)}
                          className="w-5 h-5 text-primary border-gray-300 focus:ring-primary accent-primary"
                        />
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-10">
                    <button
                      onClick={() => setStep(1)}
                      className="text-gray-500 font-medium hover:text-gray-800 px-4 py-2"
                    >
                      Kembali
                    </button>
                    <button
                      disabled={!paymentMethod || (!formData.anon && !formData.name)}
                      onClick={() => setStep(3)}
                      className="btn-primary flex items-center gap-2 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Lanjut <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Instruction & Confirmation */}
              {step === 3 && selectedPaymentInfo && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col"
                >
                  <h2 className="text-2xl font-bold mb-2 text-gray-900">Instruksi Pembayaran</h2>
                  <p className="text-gray-500 mb-6">Silakan transfer sesuai dengan detail di bawah ini.</p>
                  
                  <div className="bg-surface border border-gray-200 rounded-2xl p-6 mb-6">
                    <div className="text-center mb-6">
                      <p className="text-sm font-medium text-gray-500 mb-1">Total Donasi</p>
                      <p className="text-4xl font-black text-primary">
                        {formatCurrency(amount === -1 ? parseInt(customAmount) : (amount || 0))}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">Peruntukan Dana</span>
                        <span className="font-bold text-emerald-600">{pancakarsaTargets.find(t => t.id === formData.targetKarsa)?.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">Bank Tujuan</span>
                        <span className="font-bold text-gray-900">{selectedPaymentInfo.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 font-medium">Atas Nama</span>
                        <span className="font-bold text-gray-900">{selectedPaymentInfo.holder}</span>
                      </div>
                      <div className="flex flex-col gap-2 pt-2">
                        <span className="text-gray-500 font-medium">Nomor Rekening / Tujuan</span>
                        <div className="flex justify-between items-center bg-white border border-gray-200 p-3 rounded-xl border-dashed">
                          <span className="font-mono font-bold text-lg text-gray-900 tracking-wider w-full truncate pr-4">
                            {selectedPaymentInfo.account}
                          </span>
                          <button 
                            onClick={() => copyToClipboard(selectedPaymentInfo.account)}
                            className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary/20 transition-colors shrink-0"
                            title="Salin"
                          >
                            {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                          </button>
                        </div>
                        {copied && <span className="text-xs text-green-600 font-medium text-right">Tersalin ke papan klip!</span>}
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-auto">
                    <button
                      type="submit"
                      className="w-full btn-primary text-lg"
                    >
                      Saya Sudah Transfer
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full text-center mt-4 text-gray-500 font-medium hover:text-gray-800"
                    >
                      Ubah Detail
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Step 4: Success Message */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full min-h-[400px]"
                >
                  <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Terima Kasih!</h2>
                  <p className="text-gray-600 mb-8 max-w-sm">
                    Donasi Anda sebesar <strong>{formatCurrency(amount === -1 ? parseInt(customAmount) : (amount || 0))}</strong> untuk program <strong>{pancakarsaTargets.find(t => t.id === formData.targetKarsa)?.name}</strong> telah kami catat. Semoga menjadi amal jariyah yang terus mengalir.
                  </p>
                  
                  <button 
                    onClick={() => {
                      setStep(1);
                      setAmount(null);
                      setCustomAmount("");
                      setPaymentMethod("");
                      setFormData({name: "", email: "", phone: "", anon: false, message: "", targetKarsa: "lembaga"});
                    }}
                    className="btn-primary"
                  >
                    Donasi Lagi
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
