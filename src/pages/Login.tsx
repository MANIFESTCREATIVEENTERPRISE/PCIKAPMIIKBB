import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { User, ShieldCheck, ArrowRight, ArrowLeft, Loader2, ShoppingBag, Handshake, Lock } from "lucide-react";
import loginBg from "../assets/images/pmii_siap_banner_1779611328465.png";

const DEFAULT_VERIFIED_ALUMNI = [
  {
    id: 101,
    name: "H. Saiful Rachman, M.Ag",
    gender: "L",
    prof: "Akademisi & Birokrat",
    loc: "Ngamprah",
    gov: "Kanwil Kemenag Prov. Jawa Barat",
    ormas: "Ketua PC IKA PMII Bandung Barat",
    activePos: "Ketua Cabang (PC IKA PMII)",
    contrib: ["Pendidikan", "Agama", "Sosial"],
    img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=300",
    whatsapp: "0813-2289-4091",
    whatsappPrivacy: "private",
    nik: "3217011905810001",
    nikPrivacy: "private",
    generation: "Lulusan 2005",
    address: "Komplek Puspa Raya No. 45, Desa Ngamprah, KBB",
    email: "saiful.rachman@ikapmiikbb.or.id",
    kaderisasi: "Kader Utama",
    username: "saiful",
    password: "saiful123"
  },
  {
    id: 102,
    name: "Sandi Supyandi, S.Kom., M.H",
    gender: "L",
    prof: "Praktisi Hukum & IT",
    loc: "Padalarang",
    gov: "Supyandi & Partners Law Firm",
    ormas: "Sekretaris PC IKA PMII",
    activePos: "Sekretaris Umum (PC)",
    contrib: ["Hukum", "Teknologi", "Advokasi"],
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    whatsapp: "0812-4410-2910",
    whatsappPrivacy: "private",
    nik: "3217022206880003",
    nikPrivacy: "private",
    generation: "Lulusan 2011",
    address: "Jl. Raya Padalarang Indah B29, Desa Kertajaya, Padalarang, KBB",
    email: "sandi.supyandi@gmail.com",
    kaderisasi: "Kader Utama",
    username: "sandi",
    password: "sandi123"
  },
  {
    id: 103,
    name: "Masturi Fajrin, S.Pd.I",
    gender: "L",
    prof: "Pendidik & Aktivis",
    loc: "Cipatat",
    gov: "Lembaga Pendidikan Ma'arif",
    ormas: "Wakil Ketua PC NU KBB",
    activePos: "Wakil Ketua (PAC)",
    contrib: ["Pendidikan", "Sosial", "Agama"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "0819-1234-5674",
    whatsappPrivacy: "private",
    nik: "3217032008900004",
    nikPrivacy: "private",
    generation: "Lulusan 1999",
    address: "Dusun Cipta Karya, RT 01 RW 04, Desa Cipatat, KBB",
    email: "masturi.fajrin@gmail.com",
    kaderisasi: "Kader Madya",
    username: "masturi",
    password: "masturi123"
  },
  {
    id: 104,
    name: "Lina Marlina, S.Ak",
    gender: "P",
    prof: "Wirausaha & Finansial",
    loc: "Ngamprah",
    gov: "Zuppa Soup Kamila",
    ormas: "Fatayat NU KBB",
    activePos: "Bendahara PAC",
    contrib: ["Ekonomika", "Kuliner", "Keuangan"],
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    whatsapp: "0857-2134-5678",
    whatsappPrivacy: "private",
    nik: "3217042001990002",
    nikPrivacy: "private",
    generation: "Lulusan 2018",
    address: "Jl. Lapangan Olahraga Cihampelas No. 42, KBB",
    email: "kamila_soup@gmail.com",
    kaderisasi: "Kader Pratama",
    username: "lina",
    password: "lina123"
  }
];

export default function Login() {
  const navigate = useNavigate();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const [showAdminSubmenu, setShowAdminSubmenu] = useState(false);
  const [showMemberCredentialsForm, setShowMemberCredentialsForm] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Helper to retrieve/seed the database securely
  const getVerifiedAlumniDb = () => {
    try {
      const saved = localStorage.getItem("siap_verified_members_db");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    localStorage.setItem("siap_verified_members_db", JSON.stringify(DEFAULT_VERIFIED_ALUMNI));
    return DEFAULT_VERIFIED_ALUMNI;
  };

  const handleRoleSelect = (roleKey: string, targetPath: string) => {
    setLoadingRole(roleKey);

    // Speed up redirection to feel instantly responsive
    setTimeout(() => {
      if (roleKey === "anggota") {
        const savedProfile = localStorage.getItem("siap_user_profile");
        if (!savedProfile) {
          const firstAlum = getVerifiedAlumniDb()[0]; // H. Saiful Rachman, M.Ag
          const defaultProfile = {
            fullName: firstAlum.name,
            email: firstAlum.email || "",
            whatsapp: firstAlum.whatsapp || "",
            district: firstAlum.loc || "Ngamprah",
            profession: firstAlum.prof || "Akademisi",
            company: firstAlum.gov || "",
            lastPosition: firstAlum.ormas || "",
            interests: firstAlum.contrib || [],
            avatarUrl: firstAlum.img,
            gender: firstAlum.gender === "P" ? "Perempuan" : "Laki-laki",
            commissionId: firstAlum.id,
            username: firstAlum.username,
            password: firstAlum.password,
            address: firstAlum.address || ""
          };
          localStorage.setItem("siap_user_profile", JSON.stringify(defaultProfile));
          localStorage.setItem(
            "siap_user_privacy",
            JSON.stringify({
              nik: "private",
              whatsapp: firstAlum.whatsappPrivacy || "private",
            })
          );
        }
      }
      navigate(targetPath);
      setLoadingRole(null);
    }, 600);
  };

  const handleCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoggingIn(true);

    setTimeout(() => {
      const dbList = getVerifiedAlumniDb();
      const match = dbList.find(
        (m: any) =>
          m.username?.toLowerCase() === inputUsername.trim().toLowerCase() &&
          m.password === inputPassword
      );

      if (match) {
        const memberProfile = {
          fullName: match.name,
          email: match.email || "",
          whatsapp: match.whatsapp || "",
          district: match.loc || "Ngamprah",
          profession: match.prof || "Alumni",
          company: match.gov || "",
          lastPosition: match.ormas || "",
          interests: match.contrib || [],
          avatarUrl: match.img,
          gender: match.gender === "P" ? "Perempuan" : "Laki-laki",
          commissionId: match.id,
          username: match.username,
          password: match.password,
          address: match.address || ""
        };

        localStorage.setItem("siap_user_profile", JSON.stringify(memberProfile));
        localStorage.setItem(
          "siap_user_privacy",
          JSON.stringify({
            nik: "private",
            whatsapp: match.whatsappPrivacy || "private",
          })
        );
        
        navigate("/siap");
      } else {
        setErrorMessage("Gagal masuk. Username atau Kata Sandi salah.");
      }
      setIsLoggingIn(false);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Custom Background Image Overlay with deep rich branding and blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src={loginBg} 
          alt="Login Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-primary/75 backdrop-blur-[3px]"></div>
      </div>

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-24 left-10 w-72 h-72 bg-accent/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-md w-full bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-12 relative z-10 space-y-8 animate-fade-in"
      >
        {/* Navigation & Back Action */}
        <div className="flex items-center justify-between">
          {showAdminSubmenu ? (
            <button
              onClick={() => setShowAdminSubmenu(false)}
              className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-primary transition-all cursor-pointer"
            >
              <ArrowLeft size={14} /> Kembali ke Pilihan Utama
            </button>
          ) : showMemberCredentialsForm ? (
            <button
              onClick={() => {
                setShowMemberCredentialsForm(false);
                setErrorMessage("");
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-primary transition-all cursor-pointer"
            >
              <ArrowLeft size={14} /> Kembali ke Pilihan Utama
            </button>
          ) : (
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-primary transition-colors">
              <ArrowLeft size={14} /> Beranda
            </Link>
          )}

          <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">
            <Lock size={10} className="text-accent" /> Secure API
          </div>
        </div>

        {/* LOGO & TITLE */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-display font-bold text-primary leading-tight">
            Login Portal <span className="text-accent italic font-serif font-black">SIAP</span>
          </h2>
          <p className="text-xs text-gray-400 font-medium tracking-wide">
            Sistem Informasi Alumni & Anggota PC IKA PMII KBB
          </p>
        </div>

        <AnimatePresence mode="wait">
          {showMemberCredentialsForm ? (
            <motion.div
              key="member-credentials"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <label className="text-[10px] font-black text-accent uppercase tracking-[0.2em] block">
                  Akses Masuk Anggota
                </label>
                <p className="text-xs text-gray-400">Silakan masukkan kredensial akun Anda:</p>
              </div>

              <form onSubmit={handleCredentialsLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Nama Akun (Username)</label>
                  <input
                    type="text"
                    required
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    placeholder="Contoh: saiful"
                    className="w-full px-4 py-3 bg-surface border border-gray-150 rounded-2xl text-xs font-mono font-bold text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Kata Sandi (Password)</label>
                  <input
                    type="password"
                    required
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    placeholder="Masukkan password Anda"
                    className="w-full px-4 py-3 bg-surface border border-gray-150 rounded-2xl text-xs font-mono font-bold text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                {errorMessage && (
                  <div className="text-center bg-red-50 text-red-650 px-3 py-2 rounded-xl border border-red-100 text-xs font-bold leading-normal">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-4 bg-primary text-accent text-xs font-black uppercase tracking-wider rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-accent" />
                        Memverifikasi...
                      </>
                    ) : (
                      <>
                        Masuk Keb Dashboard <ArrowRight size={14} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect("anggota", "/siap")}
                    disabled={loadingRole !== null}
                    className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-gray-500 text-[11px] font-bold rounded-2xl border border-gray-150 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {loadingRole === "anggota" ? (
                      <Loader2 size={14} className="animate-spin text-gray-400" />
                    ) : (
                      "⚡ Masuk Instan (Bypass Demo)"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : !showAdminSubmenu ? (
            <motion.div
              key="main-menu"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block">
                  Pilih Kategori Akses Masuk Anda
                </label>
                <p className="text-xs text-gray-400">Pilih Anggota Umum atau Pengelola Administrator:</p>
              </div>

              <div className="flex flex-col gap-4">
                {/* ANGGOTA CARD */}
                <button
                  onClick={() => setShowMemberCredentialsForm(true)}
                  disabled={loadingRole !== null}
                  className={`p-6 rounded-[2rem] border-2 text-left flex items-center justify-between transition-all relative overflow-hidden group w-full cursor-pointer border-gray-50 bg-surface hover:bg-gray-100/70 text-primary hover:border-gray-200`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/5 text-primary`}>
                      <User size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider">Anggota SIAP</h4>
                      <p className={`text-[10px] font-semibold mt-0.5 text-gray-400`}>
                        Dashboard Data Alumni & Kader SIAP
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary/70`} />
                </button>

                {/* ADMIN CARD (Triggers Submenu) */}
                <button
                  onClick={() => setShowAdminSubmenu(true)}
                  disabled={loadingRole !== null}
                  className="p-6 rounded-[2rem] border-2 border-gray-50 bg-surface hover:bg-gray-100/70 text-primary hover:border-gray-200 text-left flex items-center justify-between transition-all relative overflow-hidden group w-full cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-accent transition-all">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wider">Administrator</h4>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                        Akses Kontrol & Dashboard Layanan
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary/70" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="admin-submenu"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="text-center space-y-1">
                <label className="text-[10px] font-black text-accent uppercase tracking-[0.2em] block">
                  Pilih Bidang Administrasi
                </label>
                <p className="text-xs text-gray-400">Gunakan kredensial pengelola fungsional:</p>
              </div>

              <div className="flex flex-col gap-3">
                {/* 1. ADMIN SIAP */}
                <button
                  onClick={() => handleRoleSelect("admin_siap", "/admin?role=siap")}
                  disabled={loadingRole !== null}
                  className={`p-5 rounded-[1.75rem] border-2 text-left flex items-center justify-between transition-all relative overflow-hidden group w-full cursor-pointer ${
                    loadingRole === "admin_siap"
                      ? "border-primary bg-primary text-white shadow-xl shadow-primary/20 scale-[1.01]"
                      : "border-gray-50 bg-surface hover:bg-gray-100/70 text-primary hover:border-gray-180"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      loadingRole === "admin_siap" ? "bg-accent text-primary" : "bg-primary/5 text-primary"
                    }`}>
                      {loadingRole === "admin_siap" ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <ShieldCheck size={18} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs uppercase tracking-wider">Admin SIAP</h4>
                      <p className={`text-[9px] font-medium mt-0.5 ${loadingRole === "admin_siap" ? "text-accent/80" : "text-gray-400"}`}>
                        Validasi Keanggotaan & Database Alumni
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-accent" />
                </button>

                {/* 2. ADMIN MITRA KAMARA */}
                <button
                  onClick={() => handleRoleSelect("admin_kamara", "/admin?role=kamara")}
                  disabled={loadingRole !== null}
                  className={`p-5 rounded-[1.75rem] border-2 text-left flex items-center justify-between transition-all relative overflow-hidden group w-full cursor-pointer ${
                    loadingRole === "admin_kamara"
                      ? "border-primary bg-primary text-white shadow-xl shadow-primary/20 scale-[1.01]"
                      : "border-gray-50 bg-surface hover:bg-gray-100/70 text-primary hover:border-gray-180"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      loadingRole === "admin_kamara" ? "bg-accent text-primary" : "bg-primary/5 text-primary"
                    }`}>
                      {loadingRole === "admin_kamara" ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <ShoppingBag size={18} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs uppercase tracking-wider">Admin Mitra Kamara</h4>
                      <p className={`text-[9px] font-medium mt-0.5 ${loadingRole === "admin_kamara" ? "text-accent/80" : "text-gray-400"}`}>
                        Manajemen Koperasi Mart & Produk UMKM
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-accent" />
                </button>

                {/* 3. ADMIN MITRA KATARA */}
                <button
                  onClick={() => handleRoleSelect("admin_katara", "/admin?role=katara")}
                  disabled={loadingRole !== null}
                  className={`p-5 rounded-[1.75rem] border-2 text-left flex items-center justify-between transition-all relative overflow-hidden group w-full cursor-pointer ${
                    loadingRole === "admin_katara"
                      ? "border-primary bg-primary text-white shadow-xl shadow-primary/20 scale-[1.01]"
                      : "border-gray-50 bg-surface hover:bg-gray-100/70 text-primary hover:border-gray-180"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      loadingRole === "admin_katara" ? "bg-accent text-primary" : "bg-primary/5 text-primary"
                    }`}>
                      {loadingRole === "admin_katara" ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Handshake size={18} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs uppercase tracking-wider">Admin Mitra Katara</h4>
                      <p className={`text-[9px] font-medium mt-0.5 ${loadingRole === "admin_katara" ? "text-accent/80" : "text-gray-400"}`}>
                        Kemitraan Usaha, CSR & Sponsorship
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-accent" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* REGISTRATION REDIRECT */}
        <div id="login-footer-promo" className="border-t border-gray-100 pt-6 text-center space-y-2">
          <p className="text-[10px] text-gray-400 font-bold">
            Belum terdaftar sebagai Alumni / Kader di SIAP IKA PMII?
          </p>
          <Link
            to="/daftar-anggota"
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-accent font-extrabold transition-all hover:underline"
          >
            Daftarkan Diri Anda Sekarang <ArrowRight size={12} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

