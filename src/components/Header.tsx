import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, ShieldCheck, Globe, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../assets/images/logo.png";

const navigation = [
  { name: "Beranda", href: "/" },
  {
    name: "Profil",
    children: [
      { name: "Selayang Pandang PMII KBB", href: "/profil/selayang-pandang" },
      { name: "Visi Misi Organisasi", href: "/profil/visi-misi" },
      { name: "Kilas Bandung Barat", href: "/profil/kilas-kbb" },
    ],
  },
  {
    name: "Pengurus",
    children: [
      { name: "Pengurus Cabang", href: "/profil/pc" },
      { name: "Pengurus Anak Cabang", href: "/profil/pac" },
      { name: "Pengurus Ranting", href: "/profil/ranting" },
      { name: "LBH PC IKA PMII", href: "/profil/lbh" },
      { name: "PUSLITDIKLAT", href: "/profil/puslitdiklat" },
      { name: "Koperasi KAMARA", href: "/profil/koperasi" },
    ],
  },
  {
    name: "Panca Karsa",
    children: [
      { name: "Penguatan Lembaga", href: "/profil/pancakarsa?tab=0" },
      { name: "Pendidikan dan Pelatihan", href: "/profil/pancakarsa?tab=1" },
      { name: "Penguatan Jaringan Alumni", href: "/profil/pancakarsa?tab=2" },
      { name: "Pemberdayaan Ekonomi", href: "/profil/pancakarsa?tab=3" },
      { name: "Pengambdian Masyarakat", href: "/profil/pancakarsa?tab=4" },
    ],
  },
  {
    name: "Publikasi",
    children: [
      { name: "Berita Terkini", href: "/publikasi/berita" },
      { name: "Pengumuman", href: "/publikasi/pengumuman" },
      { name: "Artikel dan Jurnal", href: "/publikasi/artikel" },
      { name: "Opini Alumni", href: "/publikasi/opini" },
      { name: "Galeri Kegiatan", href: "/publikasi/galeri" },
    ],
  },
  {
    name: "Koperasi KAMARA",
    children: [
      { name: "Katalog Produk", href: "/produk-umkm/katalog" },
      { name: "Login Penjual", href: "/seller" },
    ],
  },
  {
    name: "Login",
    href: "/login",
    icon: User,
  },
  {
    name: "Donasi",
    href: "/donasi",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [language, setLanguage] = useState<"ID" | "EN">("ID");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const isActive = (href: string) => {
    const [path] = href.split("?");
    return location.pathname === path;
  };
  const isChildActive = (children: any[]) => children.some(child => {
    const [path] = child.href.split("?");
    return location.pathname === path;
  });

  return (
    <header className="bg-primary border-b border-white/5 sticky top-0 z-50">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff05,transparent)] pointer-events-none"></div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" aria-label="Top">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logoImg} 
                alt="PC IKA PMII Kabupaten Bandung Barat" 
                className="h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.parentElement?.querySelector(".logo-fallback");
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div className="logo-fallback hidden flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-black text-sm border-2 border-accent">
                  ★
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-black text-sm text-accent tracking-wide uppercase leading-none">PC IKA PMII</span>
                  <span className="text-[7px] text-white/60 tracking-wider uppercase font-bold mt-0.5">BANDUNG BARAT</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div 
                key={item.name} 
                className="relative h-20 flex items-center"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <button
                    className={`flex items-center gap-2 text-sm font-bold transition-all cursor-pointer relative ${
                      openDropdown === item.name || isChildActive(item.children) ? "text-accent" : "text-white/70 hover:text-accent"
                    }`}
                  >
                    {item.icon && <item.icon size={16} />}
                    {item.name}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    {isChildActive(item.children) && (
                      <motion.div layoutId="navPill" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent rounded-full" />
                    )}
                  </button>
                ) : (
                  <Link 
                    to={item.href} 
                    className={item.name === "Login" 
                      ? "flex items-center gap-2 text-[11px] font-black uppercase tracking-widest bg-accent hover:bg-white text-primary py-2.5 px-5 rounded-full transition-all duration-300 shadow-lg shadow-accent/10 active:scale-95" 
                      : `flex items-center gap-2 text-sm font-bold transition-all relative ${
                        isActive(item.href) ? "text-accent" : "text-white/70 hover:text-accent"
                      }`
                    }
                  >
                    {item.icon && <item.icon size={15} />}
                    {item.name}
                    {isActive(item.href) && item.name !== "Login" && (
                      <motion.div layoutId="navPill" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent rounded-full" />
                    )}
                  </Link>
                )}

                <AnimatePresence>
                  {item.children && openDropdown === item.name && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute top-[75%] left-1/2 -translate-x-1/2 w-72 bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] py-4 z-50 border border-gray-100"
                    >
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
                      <div className="relative z-10 flex flex-col px-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`block px-5 py-3.5 text-xs rounded-xl font-bold transition-all ${
                              isActive(child.href) 
                                ? "bg-primary text-accent shadow-lg shadow-primary/20" 
                                : "text-gray-600 hover:bg-surface hover:text-primary"
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4 border-l border-white/20 pl-4 ml-4">
              <button 
                onClick={() => setLanguage(language === "ID" ? "EN" : "ID")}
                className="flex items-center gap-1.5 text-white/70 hover:text-accent transition-colors font-bold text-sm bg-white/5 px-3 py-1.5 rounded-full"
              >
                <Globe size={16} />
                <span>{language}</span>
              </button>
              
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-white/70 hover:text-accent transition-colors bg-white/5 p-2 rounded-full"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-3">
              <button 
                onClick={() => setLanguage(language === "ID" ? "EN" : "ID")}
                className="flex items-center gap-1 text-white/70 hover:text-accent transition-colors font-bold text-xs bg-white/5 px-2 py-1 rounded-full"
              >
                <Globe size={14} />
                <span>{language}</span>
              </button>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-white/70 hover:text-accent transition-colors bg-white/5 p-1.5 rounded-full"
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/90 backdrop-blur-sm z-[60]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-[320px] bg-white z-[70] shadow-2xl overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-2xl text-primary italic">Menu Utama</span>
                    <div className="w-12 h-1 bg-accent rounded-full mt-1"></div>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-primary hover:bg-accent transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <div key={item.name} className="border-b border-gray-50 pb-2 mb-2 last:border-0">
                      {item.children ? (
                        <>
                          <button 
                            onClick={() => setMobileDropdown(mobileDropdown === item.name ? null : item.name)}
                            className={`w-full flex items-center justify-between py-3 px-2 rounded-xl text-lg font-bold transition-all ${
                              mobileDropdown === item.name || isChildActive(item.children) ? "text-primary bg-primary/5" : "text-gray-500"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              {item.icon && <item.icon size={20} />}
                              {item.name}
                            </span>
                            <ChevronDown size={18} className={`transition-transform duration-300 ${mobileDropdown === item.name ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {(mobileDropdown === item.name || isChildActive(item.children)) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-6 pt-2 pb-4 space-y-1">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.name}
                                      to={child.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className={`block py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                                        isActive(child.href) ? "bg-accent text-primary" : "text-gray-400 hover:text-primary"
                                      }`}
                                    >
                                      {child.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 py-3 px-4 rounded-xl text-lg font-bold transition-all ${
                            isActive(item.href) ? "bg-primary text-accent shadow-lg shadow-primary/20" : "text-gray-900"
                          }`}
                        >
                          {item.icon && <item.icon size={22} />}
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
