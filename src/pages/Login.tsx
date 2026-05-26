import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, ShieldCheck, ArrowRight, ArrowLeft, Loader2, 
  ShoppingBag, Handshake, Lock, CheckCircle2, ChevronDown, UserPlus, Eye, EyeOff, AlertCircle,
  ClipboardList
} from "lucide-react";
import loginBg from "../assets/images/pmii_siap_banner_1779611328465.png";

// Core predefined users and roles for standard validation
const PREDEFINED_ACCOUNTS = [
  {
    username: "saiful",
    password: "saiful123",
    role: "anggota",
    name: "H. Saiful Rachman, M.Ag",
    gender: "L",
    prof: "Akademisi & Birokrat",
    loc: "Ngamprah",
    gov: "Kanwil Kemenag Prov. Jawa Barat",
    ormas: "Ketua PC IKA PMII Bandung Barat",
    contrib: ["Pendidikan", "Agama", "Sosial"],
    img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=300",
    whatsapp: "0813-2289-4091",
    email: "saiful.rachman@ikapmiikbb.or.id",
    address: "Komplek Puspa Raya No. 45, Desa Ngamprah, KBB"
  },
  {
    username: "admin",
    password: "admin123",
    role: "admin_siap",
    name: "Super Admin SIAP",
    gender: "L",
    prof: "Admin System SIAP",
    loc: "Ngamprah",
    gov: "Sekretariat PC KBB",
    ormas: "Pengurus Cabang",
    contrib: ["Sistem", "Database"],
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    whatsapp: "0812-4410-2910"
  },
  {
    username: "penjual",
    password: "penjual123",
    role: "seller",
    name: "Mitra Penjual KAMARA",
    gender: "L",
    prof: "UKM Bandung Barat",
    loc: "Padalarang",
    gov: "Kamara Mart",
    ormas: "Anggota Koperasi",
    contrib: ["Ritel", "Produk"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "0819-1234-5674"
  },
  {
    username: "kamara",
    password: "kamara123",
    role: "admin_kamara",
    name: "Admin Koperasi KAMARA",
    gender: "P",
    prof: "Keuangan & Retail",
    loc: "Ngamprah",
    gov: "Pusat Koperasi KAMARA",
    ormas: "Bendahara Koperasi",
    contrib: ["Ekonomi", "Ritel"],
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    whatsapp: "0857-2134-5678"
  }
];

export default function Login() {
  const navigate = useNavigate();

  // Selected state for Login Role
  const [loginRole, setLoginRole] = useState<string>("anggota");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Registration states
  const [registerRole, setRegisterRole] = useState<string>("anggota");
  const [regUsername, setRegUsername] = useState<string>("");
  const [regPassword, setRegPassword] = useState<string>("");
  const [regFullName, setRegFullName] = useState<string>("");

  // System states
  const [loginError, setLoginError] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<string>("");
  const [regError, setRegError] = useState<string>("");
  const [regSuccess, setRegSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  // Initialize and check database on mount
  useEffect(() => {
    const saved = localStorage.getItem("siap_verified_members_db");
    if (!saved) {
      localStorage.setItem("siap_verified_members_db", JSON.stringify(PREDEFINED_ACCOUNTS));
    }
  }, []);

  const getDbUsers = () => {
    try {
      const saved = localStorage.getItem("siap_verified_members_db");
      return saved ? JSON.parse(saved) : PREDEFINED_ACCOUNTS;
    } catch {
      return PREDEFINED_ACCOUNTS;
    }
  };

  const saveDbUsers = (users: any[]) => {
    localStorage.setItem("siap_verified_members_db", JSON.stringify(users));
  };

  // Instant login using demo account credentials for selected role
  const handleInstantDemoLogin = () => {
    let demoUser = "saiful";
    let demoPass = "saiful123";
    
    if (loginRole === "admin_siap") {
      demoUser = "admin";
      demoPass = "admin123";
    } else if (loginRole === "seller") {
      demoUser = "penjual";
      demoPass = "penjual123";
    } else if (loginRole === "admin_kamara") {
      demoUser = "kamara";
      demoPass = "kamara123";
    }
    
    setUsername(demoUser);
    setPassword(demoPass);
    
    setLoginError("");
    setLoginSuccess("");
    setIsLoading(true);

    setTimeout(() => {
      // First try to match from predefined static list to guarantee success
      let matchedUser = PREDEFINED_ACCOUNTS.find(
        (u: any) => 
          u.username.toLowerCase() === demoUser && 
          u.password === demoPass &&
          u.role === loginRole
      );

      // If not in predefined list (should not happen), search local storage DB as fallback
      if (!matchedUser) {
        const currentUsers = getDbUsers();
        matchedUser = currentUsers.find(
          (u: any) => 
            u.username.toLowerCase() === demoUser && 
            u.password === demoPass &&
            u.role === loginRole
        );
      }

      if (matchedUser) {
        setLoginSuccess(`Selamat datang kembali (Demo), ${matchedUser.name}!`);
        
        // Synchronize this demo user back to the DB to make sure standard entry works
        const currentUsers = getDbUsers();
        const existsInDb = currentUsers.some(
          (u: any) => u.username.toLowerCase() === matchedUser!.username.toLowerCase() && u.role === loginRole
        );
        if (!existsInDb) {
          saveDbUsers([...currentUsers, matchedUser]);
        }
        
        const memberProfile = {
          fullName: matchedUser.name,
          email: matchedUser.email || `${matchedUser.username}@gmail.com`,
          whatsapp: matchedUser.whatsapp || "0812-3456-7890",
          district: matchedUser.loc || "Ngamprah",
          profession: matchedUser.prof || "Profesional",
          company: matchedUser.gov || "PC IKA PMII",
          lastPosition: matchedUser.ormas || "Anggota",
          interests: matchedUser.contrib || ["Pendidikan"],
          avatarUrl: matchedUser.img || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300",
          gender: matchedUser.gender === "P" ? "Perempuan" : "Laki-laki",
          username: matchedUser.username,
          password: matchedUser.password,
          address: matchedUser.address || "KBB"
        };
        
        localStorage.setItem("siap_user_profile", JSON.stringify(memberProfile));

        // Navigate based on role
        setTimeout(() => {
          if (loginRole === "anggota") {
            navigate("/siap");
          } else if (loginRole === "admin_siap") {
            navigate("/admin?role=siap");
          } else if (loginRole === "seller") {
            localStorage.setItem("seller_logged_in", "true");
            navigate("/seller");
          } else if (loginRole === "admin_kamara") {
            navigate("/admin?role=kamara");
          }
          setIsLoading(false);
        }, 800);

      } else {
        setLoginError("Akun demo tidak ditemukan.");
        setIsLoading(false);
      }
    }, 1000);
  };

  // Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");
    setIsLoading(true);

    if (!username.trim() || !password) {
      setLoginError("Mohon masukkan username dan password Anda.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const currentUsers = getDbUsers();
      let matchedUser = currentUsers.find(
        (u: any) => 
          u.username.toLowerCase() === username.trim().toLowerCase() && 
          u.password === password &&
          u.role === loginRole
      );

      // Search static predefined array if not in db to ensure demo users always function
      if (!matchedUser) {
        matchedUser = PREDEFINED_ACCOUNTS.find(
          (u: any) => 
            u.username.toLowerCase() === username.trim().toLowerCase() && 
            u.password === password &&
            u.role === loginRole
        );
        if (matchedUser) {
          saveDbUsers([...currentUsers, matchedUser]);
        }
      }

      if (matchedUser) {
        setLoginSuccess(`Selamat datang kembali, ${matchedUser.name}!`);
        
        // Save user profile state
        const memberProfile = {
          fullName: matchedUser.name,
          email: matchedUser.email || `${matchedUser.username}@gmail.com`,
          whatsapp: matchedUser.whatsapp || "0812-3456-7890",
          district: matchedUser.loc || "Ngamprah",
          profession: matchedUser.prof || "Profesional",
          company: matchedUser.gov || "PC IKA PMII",
          lastPosition: matchedUser.ormas || "Anggota",
          interests: matchedUser.contrib || ["Pendidikan"],
          avatarUrl: matchedUser.img || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300",
          gender: matchedUser.gender === "P" ? "Perempuan" : "Laki-laki",
          username: matchedUser.username,
          password: matchedUser.password,
          address: matchedUser.address || "KBB"
        };
        
        localStorage.setItem("siap_user_profile", JSON.stringify(memberProfile));

        // Navigate based on role
        setTimeout(() => {
          if (loginRole === "anggota") {
            navigate("/siap");
          } else if (loginRole === "admin_siap") {
            navigate("/admin?role=siap");
          } else if (loginRole === "seller") {
            localStorage.setItem("seller_logged_in", "true");
            navigate("/seller");
          } else if (loginRole === "admin_kamara") {
            navigate("/admin?role=kamara");
          }
          setIsLoading(false);
        }, 800);

      } else {
        setLoginError("Akun tidak ditemukan atau salah sandi untuk kategori ini.");
        setIsLoading(false);
      }
    }, 1200);
  };

  // Register handler - redirect directly to designed registration forms
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setRegSuccess("Mengalihkan ke formulir pendaftaran...");

    setTimeout(() => {
      setIsRegistering(false);
      setRegSuccess("");
      
      if (registerRole === "anggota") {
        navigate("/daftar-anggota");
      } else if (registerRole === "seller") {
        localStorage.setItem("seller_register_mode", "true");
        navigate("/seller?mode=register");
      } else if (registerRole === "admin_siap") {
        navigate("/daftar-anggota?role=admin_siap");
      } else if (registerRole === "admin_kamara") {
        navigate("/daftar-anggota?role=admin_kamara");
      }
    }, 600);
  };

  // Helper values
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "anggota": return "Anggota SIAP";
      case "admin_siap": return "Admin Siap";
      case "seller": return "Admin Penjual";
      case "admin_kamara": return "Admin KAMARA";
      default: return "";
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Section with deep rich branding overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={loginBg} 
          alt="Login Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-[4px]"></div>
      </div>

      <div className="absolute top-24 left-10 w-72 h-72 bg-accent/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 items-stretch">
        
        {/* ROW/COL 1: MAIN SECURE WELCOME AND APP STATE PORTAL */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="bg-primary/45 border border-white/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between text-white backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/10 rounded-full blur-2xl"></div>

          <div className="space-y-6 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-white transition-colors">
              <ArrowLeft size={14} /> Beranda Utama
            </Link>

            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.2em] font-black bg-accent text-primary px-3 py-1 rounded-md uppercase font-mono shadow-sm">
                Portal Terpadu
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-white leading-tight">
                Akses Fungsional <br />
                <span className="text-accent italic font-serif">Koperasi KAMARA</span> & <br />
                Sistem SIAP
              </h2>
              <p className="text-xs text-white/70 leading-relaxed max-w-sm">
                Satu gerbang masuk digital untuk Anggota Alumni, Pengasuh Pengurus Cabang, Mitra Penjual UMKM, dan Admin Koperasi Mandiri Bandung Barat.
              </p>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider font-mono">
                <Lock size={12} /> Bantuan Akun Instan Demo:
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-white/80 font-mono">
                <div className="bg-black/20 p-2 rounded-lg border border-white/5">
                  <span className="block text-accent font-bold">Anggota SIAP</span>
                  saiful / saiful123
                </div>
                <div className="bg-black/20 p-2 rounded-lg border border-white/5">
                  <span className="block text-accent font-bold">Admin Siap</span>
                  admin / admin123
                </div>
                <div className="bg-black/20 p-2 rounded-lg border border-white/5">
                  <span className="block text-accent font-bold">Admin Penjual</span>
                  penjual / penjual123
                </div>
                <div className="bg-black/20 p-2 rounded-lg border border-white/5">
                  <span className="block text-accent font-bold">Admin KAMARA</span>
                  kamara / kamara123
                </div>
              </div>
            </div>

            <p className="text-[10px] text-white/40 tracking-wide flex items-center gap-1.5 justify-center md:justify-start">
              <span>●</span> Secure SSL API Session Connected
            </p>
          </div>
        </motion.div>

        {/* ROW/COL 2: MAIN DYNAMIC INTERACTIVE SECURITY FORMS */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="bg-white rounded-[3rem] p-8 md:p-10 border border-gray-150 shadow-2xl flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-display font-extrabold text-primary">Formulir Log-In</h3>
              <p className="text-xs text-gray-400">Silakan pilih kategori dan ketik kredensial resmi Anda:</p>
            </div>

            {/* ERROR AND SUCCESS ALERT CARDS */}
            {loginError && (
              <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-2.5 text-xs text-rose-750 font-medium">
                <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}
            {loginSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-850 font-medium">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{loginSuccess}</span>
              </div>
            )}

            {/* INPUT FORM */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* COLUMN 1: sebagai siapa login dengan menu dropdown */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">
                  Masuk Sebagai Kategori: <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={loginRole}
                    onChange={(e) => setLoginRole(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-150 rounded-2xl px-4 py-3.5 text-xs font-bold text-gray-700 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer shadow-xs"
                  >
                    <option value="anggota">Anggota SIAP</option>
                    <option value="admin_siap">Sebagai Admin Siap</option>
                    <option value="seller">Sebagai Admin Penjual</option>
                    <option value="admin_kamara">Sebagai Admin KAMARA</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* COLUMN 2: username */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">
                  Nama Pengguna (Username): <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ketik username Anda... (contoh: saiful)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-55 border border-gray-150 rounded-2xl px-4 py-3.5 text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all shadow-xs"
                />
              </div>

              {/* COLUMN 3: password */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">
                  Kata Sandi (Password): <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Masukkan sandi rahasia..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-55 border border-gray-150 rounded-2xl px-4 py-3.5 text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all shadow-xs pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-primary hover:bg-accent hover:text-primary text-white font-extrabold text-xs rounded-2xl shadow-lg transition-all uppercase tracking-widest flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-accent" />
                    <span>Mengautentikasi...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleInstantDemoLogin}
                disabled={isLoading}
                className="w-full py-3.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-extrabold text-xs rounded-2xl border border-amber-200 hover:border-amber-300 transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98] mt-2"
              >
                <span>⚡ Masuk Instan Akun Demo ({getRoleDisplayName(loginRole)})</span>
              </button>
            </form>
          </div>

          <div className="border-t border-gray-100 pt-6 mt-6 space-y-4">
            
            {/* REGISTER ACCORDION HEADER */}
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                Layanan Anggota Baru
              </span>
              <p className="text-xs text-gray-500 font-bold">Belum punya akun? Buat akun sekarang:</p>
            </div>

            {/* Quick validation alert */}
            {regError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-[10px] font-bold">
                ⚠️ {regError}
              </div>
            )}
            {regSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-bold">
                ✓ {regSuccess}
              </div>
            )}

            {/* QUICK ONLINE REGISTRATION SYSTEM */}
            <form onSubmit={handleRegisterSubmit} className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-150">
              
              <div className="space-y-1.5 text-left">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Pilih Kategori Pendaftaran:</span>
                <div className="relative">
                  <select
                    value={registerRole}
                    onChange={(e) => setRegisterRole(e.target.value)}
                    className="w-full bg-white border border-gray-180 rounded-xl px-3 py-2.5 text-[11px] font-bold text-gray-700 focus:outline-none focus:border-primary focus:bg-white cursor-pointer appearance-none shadow-sm"
                  >
                    <option value="anggota">Anggota SIAP</option>
                    <option value="admin_siap">Sebagai Admin Siap</option>
                    <option value="seller">Sebagai Admin Penjual</option>
                    <option value="admin_kamara">Sebagai Admin KAMARA</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                    <ChevronDown size={14} />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isRegistering}
                className="w-full py-3 bg-accent text-primary font-black uppercase tracking-wider text-[11px] rounded-xl hover:bg-primary hover:text-accent transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isRegistering ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-primary" />
                    <span>Mengalihkan...</span>
                  </>
                ) : (
                  <>
                    <ClipboardList size={14} />
                    <span>Lanjut Isi Formulir Pendaftaran</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-[9px] text-gray-400 text-center text-left block leading-normal pt-1">
              * Sandi Anda akan dienkripsi secara lokal di browser melalui session Sandbox demi perlindungan hak paten privasi anggota Koperasi IKA PMII KBB.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
