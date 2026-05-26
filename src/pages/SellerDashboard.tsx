import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bell, Info, Grid, ShieldAlert, Award, FileText, CheckCircle, 
  HelpCircle, Sparkles, Plus, AlertCircle, ShoppingBag, Box, Landmark, Link as LinkIcon, Lock,
  Mail, Key, ShieldCheck, Loader2, ArrowRight, User, Phone, MapPin, Store
} from "lucide-react";

// Import core seller components
import SellerSidebar from "../components/SellerSidebar";
import SellerHeader from "../components/SellerHeader";
import SellerUtama from "../components/SellerUtama";
import SellerProduct from "../components/SellerProduct";
import SellerJasa from "../components/SellerJasa";
import SellerOrder from "../components/SellerOrder";
import SellerCustomer from "../components/SellerCustomer";
import SellerChat from "../components/SellerChat";
import SellerFinance from "../components/SellerFinance";
import SellerPromo from "../components/SellerPromo";
import SellerAnalytics from "../components/SellerAnalytics";
import SellerReputation from "../components/SellerReputation";
import SellerSettings from "../components/SellerSettings";
import SellerStaff from "../components/SellerStaff";
import SellerHelpCenter from "../components/SellerHelpCenter";

// Models & mock data
import { Product, ServiceItem, Order } from "../types/seller";
import { 
  INITIAL_PRODUCTS, 
  INITIAL_SERVICES, 
  INITIAL_ORDERS 
} from "../data/sellerMockData";

export default function SellerDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("seller_logged_in") === "true";
  });

  // Login & Registration Panel States
  const [authMode, setAuthMode] = useState<"login" | "register">(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("mode") === "register" || localStorage.getItem("seller_register_mode") === "true") {
        localStorage.removeItem("seller_register_mode");
        return "register";
      }
    }
    return "login";
  });
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [otpStage, setOtpStage] = useState<boolean>(false);
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(60);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  // New Registration Form States
  const [regName, setRegName] = useState<string>("");
  const [regEmail, setRegEmail] = useState<string>("");
  const [regPhone, setRegPhone] = useState<string>("");
  const [regStoreName, setRegStoreName] = useState<string>("");
  const [regCategory, setRegCategory] = useState<string>("Makanan & Minuman (Kuliner)");
  const [regDescription, setRegDescription] = useState<string>("");
  const [regAddress, setRegAddress] = useState<string>("");
  const [regAgreed, setRegAgreed] = useState<boolean>(false);
  const [regSuccess, setRegSuccess] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpStage && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [otpStage, countdown]);

  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<"Seller" | "Admin Toko" | "Staff Operasional">("Seller");
  const [notifications, setNotifications] = useState<string[]>([
    "Pesanan baru #ORD-998 belum diproses oleh tim logistik.",
    "Rekomendasi AI: Optimalkan deskripsi Jasa Pembuatan Website Koperasi Anda.",
    "Pengajuan penarikan dana Rp 5.000.000 berhasil masuk rekening BSI Anda.",
  ]);

  // Synchronized theme context
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  // Sync state to DOM
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Persistent States
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem("seller_custom_products");
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem("seller_custom_services");
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem("seller_custom_orders");
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Sync to localstorage
  useEffect(() => {
    localStorage.setItem("seller_custom_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("seller_custom_services", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem("seller_custom_orders", JSON.stringify(orders));
  }, [orders]);

  // Notification engine helper
  const handleTriggerNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev.slice(0, 8)]);
  };

  // Quick actions trigger mapper
  const handleQuickAdd = (type: "produk" | "jasa" | "promo") => {
    if (type === "produk") {
      setActiveTab("produk");
      handleTriggerNotification("Membuka form penambahan produk fisik/digital baru");
    } else if (type === "jasa") {
      setActiveTab("jasa");
      handleTriggerNotification("Membuka form penjadwalan layanan jasa profesional");
    } else if (type === "promo") {
      setActiveTab("promo");
      handleTriggerNotification("Mengaktifkan kupon diskon dan kampanye marketing");
    }
  };

  const handleQuickActionAtUtama = (action: "tambah_produk" | "tambah_jasa" | "buat_promo" | "cetak_resi" | "bulk_upload") => {
    if (action === "tambah_produk") handleQuickAdd("produk");
    else if (action === "tambah_jasa") handleQuickAdd("jasa");
    else if (action === "buat_promo") handleQuickAdd("promo");
    else if (action === "cetak_resi") {
      setActiveTab("orders");
      handleTriggerNotification("Membuka kelola cetak resi dan pengemasan");
    } else if (action === "bulk_upload") {
      setActiveTab("produk");
      handleTriggerNotification("Mengaktifkan opsi impor massal file format CSV");
    }
  };

  // Switch display panel
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <SellerUtama 
            products={products}
            services={services}
            orders={orders}
            onNavigateTab={setActiveTab}
            isDarkMode={isDarkMode}
            onQuickAction={handleQuickActionAtUtama}
          />
        );
      case "produk":
        return (
          <SellerProduct 
            products={products}
            setProducts={setProducts}
            isDarkMode={isDarkMode}
            onTriggerNotification={handleTriggerNotification}
          />
        );
      case "jasa":
        return (
          <SellerJasa 
            services={services}
            setServices={setServices}
            isDarkMode={isDarkMode}
            onTriggerNotification={handleTriggerNotification}
          />
        );
      case "orders":
        return (
          <SellerOrder 
            orders={orders}
            setOrders={setOrders}
            isDarkMode={isDarkMode}
            onTriggerNotification={handleTriggerNotification}
          />
        );
      case "customers":
        return (
          <SellerCustomer 
            isDarkMode={isDarkMode}
            onTriggerNotification={handleTriggerNotification}
          />
        );
      case "chat":
        return (
          <SellerChat 
            isDarkMode={isDarkMode}
            onTriggerNotification={handleTriggerNotification}
          />
        );
      case "finance":
        return (
          <SellerFinance 
            isDarkMode={isDarkMode}
            onTriggerNotification={handleTriggerNotification}
          />
        );
      case "promo":
        return (
          <SellerPromo 
            isDarkMode={isDarkMode}
            onTriggerNotification={handleTriggerNotification}
          />
        );
      case "analytics":
        return (
          <SellerAnalytics 
            isDarkMode={isDarkMode}
            onTriggerNotification={handleTriggerNotification}
          />
        );
      case "reputation":
        return (
          <SellerReputation 
            isDarkMode={isDarkMode}
            onTriggerNotification={handleTriggerNotification}
          />
        );
      case "settings":
        return (
          <SellerSettings 
            isDarkMode={isDarkMode}
            onTriggerNotification={handleTriggerNotification}
          />
        );
      case "staff":
        return (
          <SellerStaff 
            isDarkMode={isDarkMode}
            onTriggerNotification={handleTriggerNotification}
          />
        );
      case "help":
        return (
          <SellerHelpCenter 
            isDarkMode={isDarkMode}
            onTriggerNotification={handleTriggerNotification}
          />
        );
      
      // Dynamic rendering of sub-menus and system tabs
      case "sub_affiliate":
        return <AffiliateSubPage isDarkMode={isDarkMode} onTrigger={handleTriggerNotification} />;
      case "sub_supplier":
        return <SupplierSubPage isDarkMode={isDarkMode} onTrigger={handleTriggerNotification} />;
      case "sub_warehouse":
        return <WarehouseSubPage isDarkMode={isDarkMode} onTrigger={handleTriggerNotification} />;
      case "sub_installer":
        return <InstallerSubPage isDarkMode={isDarkMode} onTrigger={handleTriggerNotification} />;
      case "sub_marketplace_admin":
        return <MarketplaceAdminSubPage isDarkMode={isDarkMode} onTrigger={handleTriggerNotification} />;
      case "integrations":
        return <IntegrationsSubPage isDarkMode={isDarkMode} onTrigger={handleTriggerNotification} />;
      case "blueprint":
        return <BlueprintSubPage isDarkMode={isDarkMode} onTrigger={handleTriggerNotification} />;
      case "login":
        return (
          <div className="flex items-center justify-center p-12">
            <div className={`p-8 rounded-[2rem] shadow-2xl max-w-md w-full text-center border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
              <div className="w-16 h-16 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock size={28} />
              </div>
              <h3 className="text-xl font-extrabold mb-2">Autentikasi Integrasi</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">Anda sedang masuk menggunakan Single Sign-On (SSO) Keanggotaan SIAP PMII Bandung Barat. Kunci enkripsi aktif.</p>
              <div className="space-y-3">
                <div className={`p-3.5 rounded-xl border text-[11px] font-bold text-left flex justify-between ${isDarkMode ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-100"}`}>
                  <span className="text-slate-400">ID Sesi Token:</span>
                  <span>SESSION-SSO-99182</span>
                </div>
                <div className={`p-3.5 rounded-xl border text-[11px] font-bold text-left flex justify-between ${isDarkMode ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-100"}`}>
                  <span className="text-slate-400">Waktu Kedaluwarsa:</span>
                  <span className="text-emerald-505 text-emerald-600">Aktif (Unlimited)</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-12 text-center">
            <h3 className="text-xl font-sans font-black">Portal Sesi Sedang Dibuat</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">Sistem sandboxed sedang menginisialisasi parameter visual. Silakan akses portal fungsional lainnya.</p>
            <button 
              onClick={() => setActiveTab("dashboard")}
              className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl"
            >
              Kembali ke Dashboard Utama
            </button>
          </div>
        );
    }
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setLoginError("Kolom Email / Username wajib diisi.");
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError("Kolom Password wajib diisi.");
      return;
    }
    setLoginError("");
    setAuthLoading(true);

    setTimeout(() => {
      localStorage.setItem("seller_logged_in", "true");
      setIsLoggedIn(true);
      setAuthLoading(false);
      handleTriggerNotification("Selamat Datang! Anda berhasil masuk ke Portal Admin Mitra.");
    }, 1200);
  };

  const handleLoadDemoCredentials = () => {
    setLoginEmail("mitra_kamara");
    setLoginPassword("kamara123");
    setLoginError("");
    handleTriggerNotification("Akun demo berhasil dimuat! Silakan klik tombol Masuk.");
  };

  const handleRegisterSeller = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regStoreName.trim() || !regAddress.trim()) {
      setLoginError("Semua kolom formulir pendaftaran wajib diisi.");
      return;
    }
    if (!regAgreed) {
      setLoginError("Anda harus menyetujui Syarat & Ketentuan Koperasi KAMARA.");
      return;
    }
    setLoginError("");
    setAuthLoading(true);

    setTimeout(() => {
      setAuthLoading(false);
      setRegSuccess(true);
      handleTriggerNotification(`Pengajuan Toko "${regStoreName}" berhasil dikirim untuk verifikasi.`);
    }, 1800);
  };

  const handleLogoutSeller = () => {
    localStorage.removeItem("seller_logged_in");
    setIsLoggedIn(false);
    setLoginEmail("");
    setLoginPassword("");
    handleTriggerNotification("Sesi Anda telah diakhiri secara aman.");
  };

  if (!isLoggedIn) {
    if (regSuccess) {
      return (
        <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-6 md:p-12 bg-surface transition-colors duration-300 relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-card rounded-[2.5rem] border border-border-color shadow-2xl p-8 md:p-10 relative z-10 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
              <CheckCircle size={44} className="text-green-500 animate-pulse" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] text-green-600 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/10 font-black uppercase tracking-widest font-sans">Registrasi Berhasil</span>
              <h3 className="text-2xl font-display font-black text-text-base mt-2">Pendaftaran Toko Dikirim!</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Pengajuan kemitraan toko <strong className="text-text-base font-extrabold">"{regStoreName}"</strong> oleh <strong className="text-text-base font-extrabold">{regName}</strong> telah berhasil dikirim ke Pengurus Koperasi KAMARA.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-border-color text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-border-color pb-1.5">
                <span className="text-text-muted">Kategori Toko:</span>
                <span className="font-bold text-text-base">{regCategory}</span>
              </div>
              <div className="flex justify-between border-b border-border-color pb-1.5">
                <span className="text-text-muted">No. WhatsApp:</span>
                <span className="font-bold text-text-base font-mono">{regPhone}</span>
              </div>
              <div className="flex justify-between pb-0.5">
                <span className="text-text-muted">Status Akun:</span>
                <span className="font-black text-amber-500 uppercase tracking-wider text-[10px]">Menunggu Verifikasi AI/Admin</span>
              </div>
            </div>

            <p className="text-[11px] text-text-muted leading-relaxed">
              Tim admin akan memverifikasi berkas & menghubungi WhatsApp Anda dalam waktu 1x24 jam untuk pengaktifan toko resmi. Silakan coba masuk via mode demo untuk eksplorasi dashboard terlebih dahulu.
            </p>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setAuthLoading(true);
                  setTimeout(() => {
                    localStorage.setItem("seller_logged_in", "true");
                    setIsLoggedIn(true);
                    setAuthLoading(false);
                    handleTriggerNotification("Selamat Datang! Masuk via Demo Simulasi Admin Penjual berhasil.");
                  }, 1000);
                }}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
              >
                <Sparkles size={14} className="animate-pulse" />
                Selesai & Masuk via Demo [Simulasi]
              </button>
              <button
                type="button"
                onClick={() => {
                  setRegSuccess(false);
                  setAuthMode("login");
                  setRegName("");
                  setRegEmail("");
                  setRegPhone("");
                  setRegStoreName("");
                  setRegAddress("");
                  setRegAgreed(false);
                }}
                className="w-full py-3 bg-surface hover:bg-neutral-100 border border-border-color text-text-base text-xs font-black uppercase tracking-wider rounded-2xl transition-all cursor-pointer"
              >
                Kembali ke Login Penjual
              </button>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-6 md:p-12 bg-surface transition-colors duration-300 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`w-full bg-card rounded-[2.5rem] border border-border-color shadow-2xl p-8 md:p-10 relative z-10 transition-all duration-300 ${
            authMode === "register" ? "max-w-xl" : "max-w-md"
          }`}
        >
          {/* Logo / Brand identifier */}
          <div className="text-center space-y-3 mb-6">
            <div className="w-16 h-16 bg-primary/5 text-primary rounded-[1.25rem] flex items-center justify-center mx-auto border border-border-color">
              <ShoppingBag size={28} />
            </div>
            <div>
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em] font-sans">Portal Koperasi KAMARA</span>
              <h2 className="text-2xl font-display font-black leading-tight mt-1 text-text-base">
                {authMode === "register" ? "Daftar Toko / Mitra Baru" : "Login Penjual / Mitra"}
              </h2>
              <p className="text-xs text-text-muted max-w-xs mx-auto mt-1.5 leading-relaxed">
                {authMode === "register" 
                  ? "Buka toko Anda sendiri di Koperasi KAMARA dan pasarkan produk fisik atau jasa Anda ke ribuan anggota."
                  : "Kelola penjualan produk, jasa, promosi, dan pesanan toko Anda secara profesional dalam satu sistem integrasi."
                }
              </p>
            </div>
          </div>

          {/* Core Mode Switcher Tab */}
          <div className="mb-6 flex p-1.5 bg-surface rounded-2xl border border-border-color">
            <button
              onClick={() => { setAuthMode("login"); setLoginError(""); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                authMode === "login" 
                  ? "bg-primary text-white shadow-md shadow-primary/10" 
                  : "text-text-muted hover:text-text-base"
              }`}
            >
              Portal Masuk
            </button>
            <button
              onClick={() => { setAuthMode("register"); setLoginError(""); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                authMode === "register" 
                  ? "bg-primary text-white shadow-md shadow-primary/10" 
                  : "text-text-muted hover:text-text-base"
              }`}
            >
              Daftar Jadi Mitra
            </button>
          </div>

          {loginError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 text-xs font-bold text-red-650 dark:text-red-400 text-center flex items-center justify-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {authMode === "login" ? (
              <motion.div
                key="login-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  {/* Username/Email Input */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-wider block">Username / Email Penjual</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 bg-transparent text-text-muted">
                        <Mail size={16} />
                      </span>
                      <input
                        type="text"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="cth: mitra_kamara atau maretoko@gmail.com"
                        className="w-full pl-11 pr-4 py-3 bg-surface border border-border-color rounded-2xl text-xs font-bold text-text-base placeholder-text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5 text-left">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-text-muted">
                      <label className="block">Password Akun</label>
                      <button 
                        type="button" 
                        onClick={handleLoadDemoCredentials}
                        className="text-primary hover:text-accent font-black normal-case font-mono border-none bg-transparent cursor-pointer"
                      >
                        [Gunakan Akun Demo]
                      </button>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-3 bg-transparent text-text-muted">
                        <Lock size={16} />
                      </span>
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Masukkan password akun Anda"
                        className="w-full pl-11 pr-4 py-3 bg-surface border border-border-color rounded-2xl text-xs font-bold text-text-base placeholder-text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-4 bg-primary text-white text-xs font-black uppercase tracking-wider rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10 mt-2"
                  >
                    {authLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-white block" />
                        Mengautentikasi...
                      </>
                    ) : (
                      <>
                        Masuk Ke Portal Penjual <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>

                {/* Account Info / Demo credentials block */}
                <div className="p-3.5 rounded-2xl bg-amber-550/5 dark:bg-amber-500/5 border border-amber-500/20 text-center text-[11px] font-bold text-text-base leading-relaxed">
                  <span className="text-amber-600 block mb-1">🔑 DETAIL AKUN DEMO INSTAN</span>
                  Username: <code className="bg-amber-500/10 px-1 py-0.5 rounded font-mono font-extrabold text-amber-600">mitra_kamara</code> | Password: <code className="bg-amber-500/10 px-1 py-0.5 rounded font-mono font-extrabold text-amber-600">kamara123</code>
                </div>

                {/* Direct Demo Entrance */}
                <div className="mt-4 pt-4 border-t border-dashed border-border-color space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthLoading(true);
                      setTimeout(() => {
                        localStorage.setItem("seller_logged_in", "true");
                        setIsLoggedIn(true);
                        setAuthLoading(false);
                        handleTriggerNotification("Selamat Datang! Masuk via Demo Simulasi Admin Penjual berhasil.");
                      }, 1000);
                    }}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
                  >
                    <Sparkles size={14} className="animate-pulse animate-spin" />
                    Masuk Instan via Demo [Simulasi] ✨
                  </button>
                </div>

                {/* Link to Registration Form */}
                <div className="mt-4 p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/30 dark:border-blue-900/40 text-center font-sans">
                  <button
                    type="button"
                    onClick={() => setAuthMode("register")}
                    className="text-xs text-primary dark:text-blue-400 hover:text-accent font-extrabold transition-all inline-block hover:underline leading-relaxed cursor-pointer"
                  >
                     Belum Terdaftar? Klik Di Sini untuk Mengisi Formulir Pendaftaran Mitra Penjual KAMARA 📝
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="register-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleRegisterSeller} className="space-y-4 text-left">
                  {/* Nama Pemilik */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-wider block">Nama Lengkap Pemilik</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 bg-transparent text-text-muted">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Masukkan nama lengkap Anda"
                        className="w-full pl-11 pr-4 py-3 bg-surface border border-border-color rounded-2xl text-xs font-semibold text-text-base placeholder-text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Email & WhatsApp Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-wider block">Email Aktif</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 bg-transparent text-text-muted">
                          <Mail size={16} />
                        </span>
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="cth: email@kontak.com"
                          className="w-full pl-11 pr-4 py-3 bg-surface border border-border-color rounded-2xl text-xs font-semibold text-text-base placeholder-text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-wider block">No. WhatsApp / HP</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 bg-transparent text-text-muted">
                          <Phone size={16} />
                        </span>
                        <input
                          type="tel"
                          required
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="cth: 08123456789"
                          className="w-full pl-11 pr-4 py-3 bg-surface border border-border-color rounded-2xl text-xs font-semibold text-text-base placeholder-text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Nama Toko & Kategori dropdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-wider block">Nama Toko / Usaha</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 bg-transparent text-text-muted">
                          <Store size={16} />
                        </span>
                        <input
                          type="text"
                          required
                          value={regStoreName}
                          onChange={(e) => setRegStoreName(e.target.value)}
                          placeholder="cth: Warung Kamara Sejahtera"
                          className="w-full pl-11 pr-4 py-3 bg-surface border border-border-color rounded-2xl text-xs font-semibold text-text-base placeholder-text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-text-muted uppercase tracking-wider block">Kategori Produk</label>
                      <select
                        value={regCategory}
                        onChange={(e) => setRegCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-surface border border-border-color rounded-2xl text-xs font-semibold text-text-base focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="Makanan & Minuman (Kuliner)">Makanan & Minuman (Kuliner)</option>
                        <option value="Kerajinan & Kesenian">Kerajinan & Kesenian</option>
                        <option value="Pakaian & Fashion (UMKM)">Pakaian & Fashion (UMKM)</option>
                        <option value="Hasil Pertanian & Perkebunan">Hasil Pertanian & Perkebunan</option>
                        <option value="Jasa Profesional & Jasa Kreatif">Jasa Profesional & Jasa Kreatif</option>
                        <option value="Lainnya">Kategori Lainnya</option>
                      </select>
                    </div>
                  </div>

                  {/* Deskripsi Usaha */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-wider block">Deskripsi Singkat Toko / Produk</label>
                    <textarea
                      value={regDescription}
                      onChange={(e) => setRegDescription(e.target.value)}
                      placeholder="Tulis singkat produk unggulan dan layanan utama toko Anda"
                      rows={2}
                      className="w-full px-4 py-2.5 bg-surface border border-border-color rounded-2xl text-xs font-semibold text-text-base placeholder-text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Alamat Toko */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-text-muted uppercase tracking-wider block">Alamat Toko / Rumah Produksi</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 bg-transparent text-text-muted">
                        <MapPin size={16} />
                      </span>
                      <input
                        type="text"
                        required
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        placeholder="cth: Depan Lapangan RT 02/09 Padalarang"
                        className="w-full pl-11 pr-4 py-3 bg-surface border border-border-color rounded-2xl text-xs font-semibold text-text-base placeholder-text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Aturan Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="regAgreed"
                      required
                      checked={regAgreed}
                      onChange={(e) => setRegAgreed(e.target.checked)}
                      className="mt-0.5 rounded border-border-color text-primary focus:ring-primary cursor-pointer w-4 h-4"
                    />
                    <label htmlFor="regAgreed" className="text-[11px] text-text-muted leading-tight font-bold cursor-pointer select-none">
                      Saya bersedia mematuhi standard perdagangan bersih, kualitas produk, dan ketetapan Koperasi KAMARA.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-4 bg-primary text-white text-xs font-black uppercase tracking-wider rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10 mt-3"
                  >
                    {authLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-white" />
                        Mengirim Berkas...
                      </>
                    ) : (
                      <>
                        Kirim Pendaftaran Toko <CheckCircle size={14} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setAuthMode("login"); setLoginError(""); }}
                    className="w-full text-center text-xs text-text-muted hover:text-text-base transition-colors font-bold mt-2 cursor-pointer border-none bg-transparent"
                  >
                    Sudah punya toko? ← Kembali ke Halaman Login
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 pt-5 border-t border-border-color text-center">
            <Link 
              to="/" 
              className="text-xs text-primary hover:text-accent font-extrabold transition-all"
            >
              ← Kembali ke Beranda Utama
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] font-sans bg-surface text-text-base overflow-x-hidden transition-colors duration-300">
      {/* 1. COLLAPSIBLE PORTAL SIDEBAR */}
      <SellerSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isDarkMode={isDarkMode}
        onLogout={handleLogoutSeller}
      />

      {/* 2. MAIN WORKING PANEL CARD VIEW */}
      <div className="flex-grow flex flex-col h-[calc(100vh-80px)] overflow-y-auto w-full">
        {/* 2.1 MODERN SAAS COMPRESSED HEADER */}
        <SellerHeader 
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          setActiveTab={setActiveTab}
          isCollapsed={isCollapsed}
          onQuickAdd={handleQuickAdd}
          notifications={notifications}
          onTriggerNotification={handleTriggerNotification}
        />

        {/* BACK TO MAIN WEBSITE FLOATING BANNER */}
        <div className="px-8 py-3.5 flex items-center justify-between border-b text-xs font-bold leading-relaxed shrink-0 transition-colors bg-card border-border-color text-text-base">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="animate-spin" />
            <span>Admin Mitra Portal Marketplace. Mode Integrasi Tunggal Koperasi KAMARA Aktif.</span>
          </div>
          <Link 
            to="/produk-umkm/katalog" 
            className="text-[10px] uppercase font-black bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full shadow-xs transition-colors shrink-0"
          >
            ← Lihat Toko Publik
          </Link>
        </div>

        {/* 2.2 RENDER WORKBENCH INTERACTIVES */}
        <main className="p-6 md:p-8 flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// ============================================================================
// LOCAL INTEGRATIVE SUBPAGE PLATFORMS (To guarantee fully operational views)
// ============================================================================

function AffiliateSubPage({ isDarkMode, onTrigger }: { isDarkMode: boolean; onTrigger: (msg: string) => void }) {
  return (
    <div className={`p-8 rounded-[2.5rem] border shadow-xl ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"} space-y-6`}>
      <div className="flex justify-between items-start border-b pb-6 dark:border-slate-800">
        <div>
          <span className="text-[10px] bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full font-black uppercase">Affiliate Link Tracker</span>
          <h3 className="text-2xl font-black mt-2 font-display italic">Mitra Afiliasi Kader</h3>
          <p className="text-xs text-slate-400 mt-1">Bagikan tautan produk koperasi untuk mendulang komisi bersama.</p>
        </div>
        <button 
          onClick={() => onTrigger("Berhasil membuat link referral custom baru")}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl flex items-center gap-2 shadow-sm"
        >
          <Plus size={16} /> Buat Tautan Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Klik Referral", val: "4,821 Klik", col: "text-blue-500" },
          { label: "Konversi Penjualan", val: "189 Transaksi", col: "text-emerald-524 text-emerald-500" },
          { label: "Komisi Terkumpul", val: "Rp 1.480.000", col: "text-amber-500" },
        ].map((c) => (
          <div key={c.label} className={`p-5 rounded-2xl border ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"}`}>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase">{c.label}</span>
            <p className={`text-xl font-black mt-1 font-display ${c.col}`}>{c.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupplierSubPage({ isDarkMode, onTrigger }: { isDarkMode: boolean; onTrigger: (msg: string) => void }) {
  return (
    <div className={`p-8 rounded-[2.5rem] border shadow-xl ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"} space-y-6`}>
      <div className="border-b pb-6 dark:border-slate-800">
        <span className="text-[10px] bg-purple-500/10 text-purple-600 px-3 py-1 rounded-full font-black uppercase">Supplier Hub Integration</span>
        <h3 className="text-2xl font-black mt-2 font-display italic">Suplier Bahan & Grosir</h3>
        <p className="text-xs text-slate-400 mt-1">Kelola rantai pasok dari mitra produsen utama Bandung Barat secara otomatis.</p>
      </div>

      <div className="space-y-3">
        {[
          { name: "Sahabat Tani Cihampelas (Sayur Organik)", contact: "+62 812-3323-998", status: "Terhubung" },
          { name: "Kriya Kayu Lembang (Kerajinan Miniatur)", contact: "+62 821-4433-221", status: "Terhubung" },
          { name: "Packaging Pro Bandung Barat", contact: "+62 857-1122-334", status: "Menunggu Kontrak" }
        ].map((s) => (
          <div key={s.name} className={`p-4 rounded-2xl border flex items-center justify-between ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"}`}>
            <div>
              <p className="text-xs font-extrabold">{s.name}</p>
              <span className="text-[10px] text-slate-400">Hub: {s.contact}</span>
            </div>
            <span className={`text-[10px] font-black px-3 py-1 rounded-full ${s.status === "Terhubung" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WarehouseSubPage({ isDarkMode, onTrigger }: { isDarkMode: boolean; onTrigger: (msg: string) => void }) {
  return (
    <div className={`p-8 rounded-[2.5rem] border shadow-xl ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"} space-y-6`}>
      <div className="border-b pb-6 dark:border-slate-800">
        <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full font-black uppercase">Stock & Inventory System</span>
        <h3 className="text-2xl font-black mt-2 font-display italic">Gudang & Lokasi Stok</h3>
        <p className="text-xs text-slate-400 mt-1">Kelola rak logistik, batas peringatan stok kritis, dan multi-warehouse.</p>
      </div>

      <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-amber-500/5 border-amber-500/20"} flex items-center gap-3 text-amber-600`}>
        <AlertCircle size={20} className="shrink-0 animate-bounce" />
        <p className="text-xs font-semibold">Peringatan: 2 Produk fisik di Rak B-3 mendekati batas minimum stok (kurang dari 5 unit).</p>
      </div>

      <div className="space-y-2">
        <div className={`grid grid-cols-4 p-3.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${isDarkMode ? "bg-slate-950" : "bg-gray-100"}`}>
          <span>ID Barang</span>
          <span>Rak Gudang</span>
          <span>Stok Aktual</span>
          <span>Aksi</span>
        </div>
        {[
          { id: "SST-PRO-889", rack: "Rak A-1 (Digital)", stock: "99 Unit (Aman)" },
          { id: "EDO-OFC-012", rack: "Rak B-3 (Fisik)", stock: "45 Unit (Re-Stock)" },
          { id: "ULW-MOU-991", rack: "Rak B-3 (Fisik)", stock: "82 Unit (Aman)" },
        ].map((item) => (
          <div key={item.id} className={`grid grid-cols-4 p-3.5 rounded-xl text-xs font-semibold border ${isDarkMode ? "bg-slate-950/40 border-slate-850" : "bg-white border-slate-100"}`}>
            <span className="font-mono text-slate-400">{item.id}</span>
            <span>{item.rack}</span>
            <span className="font-bold">{item.stock}</span>
            <button 
              onClick={() => onTrigger(`Mempersiapkan rute re-order stok untuk ${item.id}`)}
              className="text-[10px] font-black uppercase text-blue-500 hover:text-blue-600 text-left cursor-pointer"
            >
              Update Rak
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InstallerSubPage({ isDarkMode, onTrigger }: { isDarkMode: boolean; onTrigger: (msg: string) => void }) {
  return (
    <div className={`p-8 rounded-[2.5rem] border shadow-xl ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"} space-y-6`}>
      <div className="border-b pb-6 dark:border-slate-800">
        <span className="text-[10px] bg-orange-500/10 text-orange-600 px-3 py-1 rounded-full font-black uppercase">Courier & Delivery Logs</span>
        <h3 className="text-2xl font-black mt-2 font-display italic">Kurir & Pengiriman Terintegrasi</h3>
        <p className="text-xs text-slate-400 mt-1">Cek resi asuransi, estimasi tarif kirim, dan integrasi API RajaOngkir / Wahana.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"} space-y-3`}>
          <h4 className="text-xs font-black uppercase text-blue-500">Kalkulasi Ongkos Kirim</h4>
          <div className="space-y-2">
            <input type="text" placeholder="Berat Paket (gram)" className="w-full p-2.5 rounded-xl bg-transparent border text-xs" />
            <input type="text" placeholder="Kecamatan Tujuan" className="w-full p-2.5 rounded-xl bg-transparent border text-xs" />
            <button 
              onClick={() => onTrigger("Melakukan lookup tarif kurir terdekat")}
              className="w-full py-2 bg-blue-600 font-extrabold text-white rounded-lg text-xs"
            >
              Cek Tarif Tercepat
            </button>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"} space-y-2`}>
          <h4 className="text-xs font-black uppercase text-emerald-500">Status Jemput Barang</h4>
          <div className="space-y-3 border-l-2 border-slate-200 dark:border-slate-800 pl-4 py-2 text-[11px] leading-tight font-medium">
            <div>
              <span className="text-slate-400 block mb-0.5 font-bold">14:02 WIB - J&T Express</span>
              <span>Kurir telah menjemput 18 paket dari Gudang Utama.</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5 font-bold font-sans">09:12 WIB - SiCepat</span>
              <span>Kurir dijadwalkan pickup pukul 16:30 WIB.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketplaceAdminSubPage({ isDarkMode, onTrigger }: { isDarkMode: boolean; onTrigger: (msg: string) => void }) {
  return (
    <div className={`p-8 rounded-[2.5rem] border shadow-xl ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"} space-y-6`}>
      <div className="border-b pb-6 dark:border-slate-800">
        <span className="text-[10px] bg-red-500/10 text-red-656 text-red-650 px-3 py-1 rounded-full font-black uppercase">Consoles Admin Superuser</span>
        <h3 className="text-2xl font-black mt-2 font-display italic">Keamanan & Audit Panel</h3>
        <p className="text-xs text-slate-400 mt-1">Konfigurasi limitasi rate API, deteksi fraud penjualan, dan audit log lengkap.</p>
      </div>

      <div className="space-y-2">
        {[
          { text: "Admin Wahyu Setiawan memperbarui harga SaaS Template Pro", time: "18 Menit Lalu" },
          { text: "Berhasil lolos audit sertifikat SSL portal seller center", time: "2 Jam Lalu" },
          { text: "Terjadi pemblokiran percobaan spam chat dari IP 112.19.14.88", time: "Pagi Ini" },
        ].map((log, idx) => (
          <div key={idx} className={`p-3 rounded-xl text-xs font-medium border flex justify-between items-center ${isDarkMode ? "bg-slate-950/40 border-slate-850" : "bg-white border-slate-100"}`}>
            <span>{log.text}</span>
            <span className="text-[10px] text-slate-400 font-bold">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationsSubPage({ isDarkMode, onTrigger }: { isDarkMode: boolean; onTrigger: (msg: string) => void }) {
  return (
    <div className={`p-8 rounded-[2.5rem] border shadow-xl ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"} space-y-6`}>
      <div className="border-b pb-6 dark:border-slate-800">
        <span className="text-[10px] bg-teal-500/10 text-teal-600 px-3 py-1 rounded-full font-black uppercase">API & Synchronizations</span>
        <h3 className="text-2xl font-black mt-2 font-display italic">Koneksi & Sinkronisasi API</h3>
        <p className="text-xs text-slate-400 mt-1">Integrasikan produk pasar dengan platform Tokopedia, Shopee, dan TikTok Shop.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "Shopee Seller Center", desc: "Sinkronisasi stok & harga otomatis", status: "Aktif" },
          { name: "Tokopedia TokoCabang", desc: "Integrasi mutasi pesanan instan", status: "Aktif" },
          { name: "TikTok Shop Sync", desc: "Pemetaan deskripsi produk digital", status: "Belum Terhubung" },
        ].map((p) => (
          <div key={p.name} className={`p-5 rounded-2xl border flex flex-col justify-between h-40 ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"}`}>
            <div>
              <p className="font-extrabold text-sm">{p.name}</p>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{p.desc}</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t dark:border-slate-800">
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${p.status === "Aktif" ? "bg-emerald-500/10 text-emerald-505 text-emerald-600" : "bg-slate-205 bg-gray-200 text-slate-500"}`}>{p.status}</span>
              <button 
                onClick={() => onTrigger(`Membuka wizard pengaturan API untuk ${p.name}`)}
                className="text-[10px] font-black uppercase text-blue-500 hover:text-blue-600"
              >
                Konfigurasi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlueprintSubPage({ isDarkMode, onTrigger }: { isDarkMode: boolean; onTrigger: (msg: string) => void }) {
  return (
    <div className={`p-8 rounded-[2.5rem] border shadow-xl ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"} space-y-6`}>
      <div className="border-b pb-6 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full font-black uppercase">System Sitemaps</span>
          <h3 className="text-2xl font-black mt-2 font-display italic">Sitemap Portal Fungsional</h3>
          <p className="text-xs text-slate-400 mt-1">Struktur arsitektur komprehensif Hub Koperasi KAMARA & Maretoko.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
        <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"} space-y-4`}>
          <h4 className="text-xs font-black uppercase text-blue-500 flex items-center gap-1.5">
            <Grid size={13} /> 1. Portal Penjual (Seller SaaS Module)
          </h4>
          <ul className="space-y-2 text-[11px] text-slate-400 font-semibold pl-4 list-disc">
            <li>Dashboard Utama & Grafik Analytics Recharts</li>
            <li>Manajemen Produk (Fisik, Jasa, Digital, SKU)</li>
            <li>Order Management (Diproses, Dikirim, Resi Kurir)</li>
            <li>Keuangan & Wallet (Escrow, Penarikan, Transfer BSI)</li>
            <li>Promosi & Flash Sale Scheduling</li>
            <li>AI-Sentiment Reviews & Sentiment Analytics Analyzer</li>
          </ul>
        </div>

        <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"} space-y-4`}>
          <h4 className="text-xs font-black uppercase text-purple-500 flex items-center gap-1.5">
            <Landmark size={13} /> 2. Koperasi & Publik Ekosistem KAMARA
          </h4>
          <ul className="space-y-2 text-[11px] text-slate-400 font-semibold pl-4 list-disc">
            <li>Portal Katalog Publik & Keranjang Belanja</li>
            <li>Invoicing WhatsApp Custom Integration</li>
            <li>Alumni Database & Verifikasi Modular SIAP</li>
            <li>Kampanye Marketing & Pixel Tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
