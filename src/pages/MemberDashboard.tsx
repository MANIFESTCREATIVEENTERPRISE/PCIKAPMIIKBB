import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, LayoutDashboard, MessageCircle, MessagesSquare, FileText, Settings, LogOut, 
  Send, Search, Users, MapPin, Briefcase, Share2, ShieldCheck, Phone, CreditCard, Lock,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline, ListOrdered, 
  Upload, CheckCircle, Eye, Image, Store, Plus, Trash2, Edit3, ShoppingBag, AlertTriangle, ArrowRight
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, 
  RadarChart, PolarGrid, PolarAngleAxis, Radar 
} from "recharts";
import ProfileRoom from "../components/ProfileRoom";
import SiapChatRoom from "../components/SiapChatRoom";
import SiapDiskusiRoom from "../components/SiapDiskusiRoom";
import SiapKolaborasiRoom from "../components/SiapKolaborasiRoom";
import { getAlumniProfileByName, HANDCRAFTED_ALUMNI_PROFILES } from "../data/alumniProfiles";


const districtData = [
  { name: "Ngamprah", value: 320 },
  { name: "Padalarang", value: 280 },
  { name: "Cipatat", value: 210 },
  { name: "Lembang", value: 150 },
  { name: "Cisarua", value: 124 },
];

const profData = [
  { name: "Pendidik", value: 400 },
  { name: "Wirausaha", value: 300 },
  { name: "Birokrasi", value: 200 },
  { name: "Hukum", value: 184 },
  { name: "Lainnya", value: 200 },
];

const interestData = [
  { subject: "Ekonomi", A: 120, fullMark: 150 },
  { subject: "Pendidikan", A: 98, fullMark: 150 },
  { subject: "Hukum", A: 86, fullMark: 150 },
  { subject: "Sosial", A: 99, fullMark: 150 },
  { subject: "Politik", A: 85, fullMark: 150 },
];

const COLORS = ["#004d40", "#ffcc00", "#00695c", "#ffd600", "#00332c"];

const DISTRICTS = ["Ngamprah", "Padalarang", "Cipatat", "Lembang", "Cisarua", "Parongpong", "Batujaya", "Cihampelas", "Cililin", "Cipongkor", "Gununghalu", "Rongga", "Sindangkerta", "Saguling", "Cikalongwetan", "Cipeundeuy"];

const PROFESSIONS = ["Pendidik", "Wirausaha", "Birokrasi", "Hukum", "Tenaga Medis", "Jurnalis", "Aktivis", "Politisi", "Pertanian", "Seni", "Digital"];

const SECTORS = ["Pendidikan", "Ekonomi", "Kesehatan", "Sosial", "Politik", "Teknologi", "Lingkungan", "Advokasi", "Agama"];

const BASE_ALUMNI = Object.keys(HANDCRAFTED_ALUMNI_PROFILES).map(name => getAlumniProfileByName(name));

const GENERATED_ALUMNI = Array.from({ length: 60 }).map((_, i) => {
  const dIdx = i % DISTRICTS.length;
  const pIdx = i % PROFESSIONS.length;
  const sIdx = i % SECTORS.length;
  const isFemale = i % 2 === 0;
  const district = DISTRICTS[dIdx];
  const profession = PROFESSIONS[pIdx];
  const sector = SECTORS[sIdx];
  
  const names = isFemale 
    ? ["Nurul Hidayah", "Fatimah Zahra", "Siti Aisyah", "Rina Rahmawati", "Dewi Sartika", "Anisa Bahar", "Indah Permata", "Siska Amelia", "Putri Utami", "Hani Maryani"]
    : ["Ahmad Fauzi", "Mhd. Ridwan", "Abdul Karim", "Yayan Mulyana", "Dedi Kusnadi", "Hendra Gunawan", "Agus Setiawan", "Rahmat Hidayat", "Tatang Suryana", "Ecep Sukmana"];
  
  const name = names[i % names.length] + " " + (i % 3 === 0 ? "S.Pd" : i % 3 === 1 ? "S.T." : "M.Si");
  
  return {
    name,
    prof: profession,
    loc: district,
    gov: i % 4 === 0 ? "Dinas " + district : undefined,
    ormas: i % 3 === 0 ? "PC IKA PMII KBB" : i % 5 === 0 ? "MWC NU " + district : undefined,
    comm: i % 2 === 0 ? "Komunitas " + sector : undefined,
    activePos: "Kader Aktif",
    contrib: [sector, i % 2 === 0 ? "Sosial" : "Ekonomi"],
    img: `https://loremflickr.com/150/150/asian,face,human?lock=${i+100}`,
    whatsapp: `+62 857-1234-56${(i + 10).toString().substring(0, 2)}`,
    whatsappPrivacy: i % 4 === 0 ? "public" : "private",
    nik: `321708${(100000 + i * 1421).toString().substring(0, 10)}`,
    nikPrivacy: "private"
  };
});

export default function MemberDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  React.useEffect(() => {
    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setActiveTab(customEvent.detail);
      }
    };
    window.addEventListener("change-siap-tab", handleTabChange);

    // Initial check of local storage to set active tab
    const initial = localStorage.getItem("siap_active_tab");
    if (initial) {
      setActiveTab(initial);
      localStorage.removeItem("siap_active_tab");
    }

    return () => {
      window.removeEventListener("change-siap-tab", handleTabChange);
    };
  }, []);

  // Loaded custom products managed dynamically by Mitra KAMARA
  const [customProducts, setCustomProducts] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("kamara_custom_products");
      if (saved) {
        return JSON.parse(saved);
      } else {
        const seeded = [
          {
            id: "custom-prod-1",
            name: "Kopi Arabika Gununghalu Premium 250g",
            category: "Consumer Goods",
            subCategory: "Kopi Premium",
            price: "Rp 45.000",
            priceNum: 45000,
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&h=450&q=80",
            description: "Kopi Arabika asli dari pegunungan Gununghalu, diolah secara higienis dengan cita rasa fruity khas.",
            stockStatus: "Tersedia",
            rating: 4.9,
            provider: "Mitra KAMARA - Tani Coffee",
            stock: 85,
            contact: "082115991771",
            marketingBrief: {
              targetMarket: "Pecinta kopi seduhan manual, alumni, kedai kopi lokal.",
              uniqueSellingPoint: "Biji kopi petik merah disortir tangan, di-roast medium dengan cita rasa asam stabil.",
              marketingMessage: "Cita rasa asri pegunungan Bandung Barat dalam setiap seruputan hangat."
            }
          },
          {
            id: "custom-prod-2",
            name: "Zuppa Soup Frozen Kamara (Pack of 4)",
            category: "Consumer Goods",
            subCategory: "Makanan Beku",
            price: "Rp 60.000",
            priceNum: 60000,
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&h=450&q=80",
            description: "Zuppa soup hangat & renyah siap panggang, praktis, dengan krim sup ayam jamur gurih.",
            stockStatus: "Tersedia",
            rating: 4.8,
            provider: "Mitra KAMARA - Dapur Ny. Yayan",
            stock: 30,
            contact: "082115991771",
            marketingBrief: {
              targetMarket: "Ibu rumah tangga praktis, camilan keluarga bergizi.",
              uniqueSellingPoint: "Tanpa bahan pengawet sintetik, pastry renyah mengembang sempurna.",
              marketingMessage: "Sajian kehangatan restoran bintang lima, siap dalam 15 menit dari lemari es Anda."
            }
          }
        ];
        localStorage.setItem("kamara_custom_products", JSON.stringify(seeded));
        return seeded;
      }
    } catch {
      return [];
    }
  });

  // State for adding or editing product
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<"Consumer Goods" | "Produk Kreatif" | "Produk UMKM Lokal">("Consumer Goods");
  const [formSubCategory, setFormSubCategory] = useState("");
  const [formPriceNum, setFormPriceNum] = useState("");
  const [formStock, setFormStock] = useState("");
  const [formImage, setFormImage] = useState("https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&h=450&q=80");
  const [formDescription, setFormDescription] = useState("");
  const [formTargetMarket, setFormTargetMarket] = useState("");
  const [formUSP, setFormUSP] = useState("");
  const [formMarketingMessage, setFormMarketingMessage] = useState("");
  const [formProvider, setFormProvider] = useState("");

  const PRESET_IMAGES = [
    { title: "☕ Kopi / Minuman", url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&h=450&q=80" },
    { title: "🌾 Beras / Bahan Organik", url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&h=450&q=80" },
    { title: "🍪 Camilan / Snack", url: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&h=450&q=80" },
    { title: "🍲 Makanan Beku / Frozen Soup", url: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&h=450&q=80" },
    { title: "🪵 Kriya Kayu / Kerajinan", url: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&h=450&q=80" },
    { title: "👕 Fashion / Batik Seragam", url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&h=450&q=80" },
  ];

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName("");
    setFormCategory("Consumer Goods");
    setFormSubCategory("");
    setFormPriceNum("");
    setFormStock("");
    setFormImage(PRESET_IMAGES[0].url);
    setFormDescription("");
    setFormTargetMarket("");
    setFormUSP("");
    setFormMarketingMessage("");
    setFormProvider(userProfile?.fullName ? "Mitra KAMARA - " + userProfile.fullName : "Mitra KAMARA");
    setIsFormOpen(true);
  };

  const handleOpenEdit = (prod: any) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormCategory(prod.category);
    setFormSubCategory(prod.subCategory);
    setFormPriceNum(String(prod.priceNum));
    setFormStock(String(prod.stock || 0));
    setFormImage(prod.image);
    setFormDescription(prod.description);
    setFormTargetMarket(prod.marketingBrief?.targetMarket || "");
    setFormUSP(prod.marketingBrief?.uniqueSellingPoint || "");
    setFormMarketingMessage(prod.marketingBrief?.marketingMessage || "");
    setFormProvider(prod.provider);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    const next = customProducts.filter(p => p.id !== productId);
    setCustomProducts(next);
    localStorage.setItem("kamara_custom_products", JSON.stringify(next));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPriceNum) return;

    const priceVal = Number(formPriceNum) || 0;
    const stockVal = Number(formStock) || 0;
    const formattedPrice = "Rp " + priceVal.toLocaleString("id-ID");

    const brief = {
      targetMarket: formTargetMarket || "Masyarakat umum, instansi, & kader",
      uniqueSellingPoint: formUSP || "Kualitas terjamin, harga kompetitif langsung dari mitra terverifikasi",
      marketingMessage: formMarketingMessage || "Produk andalan Mitra KAMARA."
    };

    if (editingProduct) {
      // update
      const updated = customProducts.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: formName,
            category: formCategory,
            subCategory: formSubCategory || "Umum",
            price: formattedPrice,
            priceNum: priceVal,
            stock: stockVal,
            stockStatus: stockVal === 0 ? "Stok Terbatas" : "Tersedia",
            image: formImage,
            description: formDescription,
            provider: formProvider,
            marketingBrief: brief
          };
        }
        return p;
      });
      setCustomProducts(updated);
      localStorage.setItem("kamara_custom_products", JSON.stringify(updated));
    } else {
      // create
      const brandNew = {
        id: "custom-prod-" + Math.floor(100000 + Math.random() * 900000),
        name: formName,
        category: formCategory,
        subCategory: formSubCategory || "Umum",
        price: formattedPrice,
        priceNum: priceVal,
        stock: stockVal,
        stockStatus: stockVal === 0 ? "Stok Terbatas" : "Tersedia",
        rating: 5.0,
        image: formImage,
        description: formDescription,
        provider: formProvider,
        contact: userProfile?.whatsapp || "082115991771",
        marketingBrief: brief
      };
      const next = [brandNew, ...customProducts];
      setCustomProducts(next);
      localStorage.setItem("kamara_custom_products", JSON.stringify(next));
    }

    setIsFormOpen(false);
  };

  // Retrieve current user profile and privacy settings dynamically
  const userProfile = (() => {
    try {
      const saved = localStorage.getItem("siap_user_profile");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  })();
  const userPrivacy = (() => {
    try {
      const saved = localStorage.getItem("siap_user_privacy");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  })();

  const userCardItem = userProfile ? {
    name: userProfile.fullName + " (Saya)",
    prof: userProfile.profession || "Alumni Utama",
    loc: userProfile.district || "Ngamprah",
    gov: userProfile.company || undefined,
    ormas: userProfile.lastPosition || undefined,
    comm: undefined,
    activePos: "Data Saya",
    contrib: userProfile.interests || [],
    img: userProfile.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    whatsapp: userProfile.whatsapp,
    whatsappPrivacy: userPrivacy?.whatsapp || "private",
    nik: userProfile.nik,
    nikPrivacy: userPrivacy?.nik || "private",
    isSelf: true
  } : null;

  const allAlumni = userCardItem ? [userCardItem, ...BASE_ALUMNI, ...GENERATED_ALUMNI] : [...BASE_ALUMNI, ...GENERATED_ALUMNI];

  const sidebarItems = [
    { id: "dashboard", label: "Ringkasan Fitur", icon: LayoutDashboard },
    { id: "directory", label: "SIAP Pedia", icon: Users },
    { id: "chat", label: "SIAP Chat", icon: MessageCircle },
    { id: "discussion", label: "SIAP Diskusi", icon: MessagesSquare },
    { id: "content", label: "SIAP Konten", icon: FileText },
    { id: "collaboration", label: "SIAP Kolaborasi", icon: Share2 },
    { id: "profile", label: "Edit Profil", icon: User },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-surface">
      {/* Sidebar */}
      <aside className={`bg-primary border-r border-white/5 transition-all duration-500 ${isSidebarOpen ? 'w-72' : 'w-24'} overflow-hidden flex flex-col relative`}>
        <div className="absolute inset-x-0 top-0 h-64 bg-accent/5 blur-3xl pointer-events-none"></div>
        <div className="p-8">
           <div className={`flex items-center gap-4 ${isSidebarOpen ? '' : 'justify-center'}`}>
              <div className="w-12 h-12 bg-accent rounded-[1rem] flex items-center justify-center text-primary font-bold text-2xl shadow-lg shadow-accent/20 shrink-0">S</div>
              {isSidebarOpen && <span className="font-display font-bold text-2xl text-accent tracking-tighter">SIAP</span>}
           </div>
        </div>

        <nav className="flex-grow px-4 space-y-2 mt-4 relative z-10">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-sm font-bold transition-all relative group ${
                activeTab === item.id ? "bg-accent text-primary shadow-xl shadow-accent/20" : "text-surface/50 hover:bg-white/5"
              } ${isSidebarOpen ? '' : 'justify-center'}`}
            >
              <item.icon size={22} className={`shrink-0 ${activeTab === item.id ? 'text-primary' : 'text-accent/50'}`} />
              {isSidebarOpen && <span>{item.label}</span>}
              {activeTab === item.id && (
                <motion.div layoutId="activePill" className="absolute left-0 w-1.5 h-6 bg-primary rounded-r-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 relative z-10">
           <button className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all ${isSidebarOpen ? '' : 'justify-center'}`}>
              <LogOut size={22} className="shrink-0" />
              {isSidebarOpen && <span>Keluar</span>}
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto relative">
        <div className="max-w-6xl mx-auto space-y-12">
          <header className="flex justify-between items-end pb-8 border-b border-gray-100">
             <div className="space-y-2 text-left">
                <h2 className="text-4xl font-display font-bold text-primary capitalize leading-none">
                  {activeTab === "dashboard" ? (
                    <>Ringkasan <span className="italic text-slate-800">Fitur SIAP</span></>
                  ) : activeTab === "collaboration" ? (
                    <>SIAP <span className="italic text-slate-800">Kolaborasi</span></>
                  ) : (
                    <>Portal <span className="italic">Alumni</span></>
                  )}
                </h2>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                  {activeTab === "dashboard" 
                    ? "Hub integrasi layanan mandiri dan pusat agenda alumni PC IKA PMII Bandung Barat" 
                    : activeTab === "collaboration"
                    ? "Daftar inisiatif gotong royong dan kemandirian profesi lintas alumni"
                    : "Pusat Informasi dan Kolaborasi Strategis IKA PMII"}
                </p>
             </div>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10 text-left"
              >
                {/* 1. Verified Member Welcome Banner */}
                <div id="welcome-banner" className="bg-gradient-to-br from-[#112D75] to-[#1E3B87] text-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl border border-white/10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
                  <div className="absolute top-0 right-0 p-4 bg-accent/20 rounded-bl-3xl shrink-0 font-bold text-[10px] text-accent tracking-widest uppercase">
                    Lencana Emas Alumni
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-accent/5 rounded-full blur-2xl"></div>
                  <div className="space-y-4 relative z-10 max-w-4xl">
                    <span className="inline-block px-3.5 py-1.5 bg-accent/15 border border-accent/25 text-accent rounded-xl text-[10px] font-black uppercase tracking-widest">
                      Kader Terverifikasi
                    </span>
                    <h3 className="font-display font-medium text-3xl text-white">
                      Assalamualaikum, <span className="font-bold underline decoration-accent/50 decoration-2 underline-offset-4 italic">{userProfile?.fullName || "Sahabat Alumni"}</span>!
                    </h3>
                    <p className="text-white/85 text-sm font-medium leading-relaxed max-w-3xl">
                      Selamat datang kembali di <strong className="text-accent">Sistem Informasi Alumni PMII (SIAP) Kabupaten Bandung Barat</strong>. Profil Anda telah aktif secara otomatis, terintegrasi aman, dan dapat dicari oleh rekan-rekan se-Bandung Barat. Mari bangun kemandirian beraktivitas demi kemaslahatan bersama!
                    </p>
                  </div>
                </div>

                {/* 2. Quick Community Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                      <Users size={22} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Alumni Terkoneksi</p>
                      <h4 className="text-3xl font-black text-primary mt-0.5 tabular-nums">{allAlumni.length} <span className="text-xs text-slate-400 font-semibold uppercase">Orang</span></h4>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                      <Share2 size={22} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Kemitraan Kolaborasi</p>
                      <h4 className="text-3xl font-black text-primary mt-0.5 tabular-nums">4 <span className="text-xs text-slate-400 font-semibold uppercase">Aktif</span></h4>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                      <CheckCircle size={22} />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Status Integrasi SIAP</p>
                      <h4 className="text-sm font-black text-emerald-650 mt-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Profil Publik Aktif
                      </h4>
                    </div>
                  </div>
                </div>

                {/* 3. Core Feature Unified Hub (Dashboard Summary) */}
                <div className="space-y-6">
                  <div className="text-left border-b border-gray-100 pb-4">
                    <h4 className="text-lg font-bold text-primary">Ringkasan Fitur Utama Portal SIAP</h4>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-0.5">Akses cepat ke seluruh instrumen jejaring & karya alumni PMII Bandung Barat dalam satu layar</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* CARD 1: EDIT PROFIL */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-accent/40 transition-all duration-300 transform hover:-translate-y-1 text-left">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Fitur 01</span>
                          <span className="text-[9px] font-black text-accent bg-accent/15 px-2 py-0.5 rounded-lg">PROFIL</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <img 
                            src={userProfile?.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"} 
                            className="w-12 h-12 rounded-2xl object-cover border border-gray-150 shadow-xs shrink-0" 
                            alt="Avatar" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-primary text-sm truncate">{userProfile?.fullName || "Nama Alumni"}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide truncate">{userProfile?.profession || "Profesi Belum Diatur"}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          Ubah data profesi, lencana emas, detail keluarga, riwayat kaderisasi, serta atur preferensi privasi NIK dan WhatsApp Anda demi keamanan data personal.
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("profile")}
                        className="mt-6 w-full py-3.5 bg-slate-50 hover:bg-accent hover:text-primary transition-all text-xs font-black text-primary uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Atur Profil Saya</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                    {/* CARD 2: DIREKTORI ALUMNI */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-accent/40 transition-all duration-300 transform hover:-translate-y-1 text-left">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Fitur 02</span>
                          <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">DIREKTORI</span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-primary text-base">Direktori Alumni</h4>
                          <p className="text-[10px] font-black text-emerald-600 font-mono tracking-wider">{allAlumni.length} KADER KBB KONEK</p>
                        </div>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          Lacak rekan perjuangan se-angkatan atau temukan alumni dengan spesifikasi profesi tertentu (Birokrat, Hakim, Pengacara, Pengusaha) di 16 kecamatan secara instan.
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("directory")}
                        className="mt-6 w-full py-3.5 bg-slate-50 hover:bg-accent hover:text-primary transition-all text-xs font-black text-primary uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Jelajahi Direktori</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                    {/* CARD 3: SIAP CHAT */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-accent/40 transition-all duration-300 transform hover:-translate-y-1 text-left">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Fitur 03</span>
                          <span className="text-[9px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">CHAT</span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-primary text-base">SIAP Chat</h4>
                          <p className="text-[10px] font-black text-rose-500 font-mono">KONTAK & GRUP ANGGOTA</p>
                        </div>
                        <div className="p-3 bg-slate-50 border border-gray-100 rounded-xl text-[10px] font-bold text-slate-500 leading-relaxed italic truncate">
                          Sahabat Siti: "Besok rapat koordinasi pelantikan IKA PMII..."
                        </div>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          Portal pesan kilat aman khusus keluarga alumni PMII. Nikmati obral ide, saling tanya kabar, atau bangun percakapan terpadu antar pengurus cabang.
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("chat")}
                        className="mt-6 w-full py-3.5 bg-slate-50 hover:bg-accent hover:text-primary transition-all text-xs font-black text-primary uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Mulai Obrolan</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                    {/* CARD 4: SIAP DISKUSI */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-accent/40 transition-all duration-300 transform hover:-translate-y-1 text-left">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Fitur 04</span>
                          <span className="text-[9px] font-black text-violet-600 bg-violet-50 px-2 py-0.5 rounded-lg border border-violet-100">FORUM</span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-primary text-base">SIAP Diskusi</h4>
                          <p className="text-[10px] font-black text-violet-500 font-mono">KAJIAN ILMIAH & NOTULENSI</p>
                        </div>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          Sampaikan notulensi rapat, ideologi gerakan kemitraan, atau kajian ilmiah kritis. Dilengkapi dengan asisten pintar pendokumentasi pointers rapat secara ringkas.
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("discussion")}
                        className="mt-6 w-full py-3.5 bg-slate-50 hover:bg-accent hover:text-primary transition-all text-xs font-black text-primary uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Buka Forum Diskusi</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                    {/* CARD 5: SIAP KONTEN */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-accent/40 transition-all duration-300 transform hover:-translate-y-1 text-left">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Fitur 05</span>
                          <span className="text-[9px] font-black text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-lg border border-cyan-100">KONTEN</span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-primary text-base">SIAP Konten</h4>
                          <p className="text-[10px] font-black text-cyan-600 font-mono">PUBLIKASI OPINI & JURNAL</p>
                        </div>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          Tuliskan secara mandiri opini bebas, resensi buku perjuangan, berita lapangan, atau press release kegiatan PAC kecamatan untuk dibagikan secara luas.
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("content")}
                        className="mt-6 w-full py-3.5 bg-slate-50 hover:bg-accent hover:text-primary transition-all text-xs font-black text-primary uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Tulis Artikel Baru</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                    {/* CARD 6: SIAP KOLABORASI */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-accent/40 transition-all duration-300 transform hover:-translate-y-1 text-left">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Fitur 06</span>
                          <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">KOLABORASI</span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-primary text-base">SIAP Kolaborasi</h4>
                          <p className="text-[10px] font-black text-amber-600 font-mono">SINERGI & GOTONG ROYONG</p>
                        </div>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          Papan kerja kemitraan antar alumni. Gabung dengan proyek sosial yang sedang membutuhkan tenaga ahli medis / hukum, atau ajukan ide bisnis mandiri Anda.
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("collaboration")}
                        className="mt-6 w-full py-3.5 bg-slate-50 hover:bg-accent hover:text-primary transition-all text-xs font-black text-primary uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 cursor-pointer relative"
                        id="shortcut-siap-kolaborasi"
                      >
                        <span>Mulai Kolaborasi</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "collaboration" && <SiapKolaborasiRoom />}

            {activeTab === "directory" && (
              <DirectoryRoom 
                onChat={() => setActiveTab("chat")} 
                presetDistrict={selectedDistrict}
                setPresetDistrict={setSelectedDistrict}
                presetProfession={selectedProfession}
                setPresetProfession={setSelectedProfession}
                presetSector={selectedSector}
                setPresetSector={setSelectedSector}
              />
            )}
            
            {activeTab === "chat" && <SiapChatRoom />}

            {activeTab === "discussion" && <SiapDiskusiRoom />}
            
            {activeTab === "content" && <CreateContentRoom />}

            {activeTab === "profile" && <ProfileRoom />}

            {activeTab === "settings" && (
              <SettingsPanel setActiveTab={setActiveTab} />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function SettingsPanel({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  // Retrieve current user profile dynamically
  const userProfile = (() => {
    try {
      const saved = localStorage.getItem("siap_user_profile");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  })();

  const [username, setUsername] = useState(userProfile?.username || "");
  const [password, setPassword] = useState(userProfile?.password || "");
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!username.trim() || !password.trim()) {
      setErrorMsg("Username dan Password tidak boleh kosong.");
      return;
    }

    try {
      // 1. Update the local user profile
      const updatedProfile = {
        ...userProfile,
        username: username.trim(),
        password: password.trim()
      };
      localStorage.setItem("siap_user_profile", JSON.stringify(updatedProfile));

      // 2. Update the master verified alumni list database in localStorage
      const dbSaved = localStorage.getItem("siap_verified_members_db");
      if (dbSaved) {
        const dbList = JSON.parse(dbSaved);
        const nextDbList = dbList.map((m: any) => {
          const matches = m.id === userProfile?.commissionId || 
                          m.email === userProfile?.email || 
                          m.name === userProfile?.fullName;
          if (matches) {
            return {
              ...m,
              username: username.trim(),
              password: password.trim()
            };
          }
          return m;
        });
        localStorage.setItem("siap_verified_members_db", JSON.stringify(nextDbList));
      }

      setSuccessMsg("Kredensial login Anda berhasil diperbarui! Silakan gunakan kredensial baru ini saat login berikutnya.");
    } catch (err) {
      console.error(err);
      setErrorMsg("Terjadi kesalahan saat menyimpan perubahan.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-8 md:p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl text-left space-y-8 max-w-2xl"
    >
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Settings className="text-accent" size={24} />
          Pengaturan Sistem
        </h3>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Konfigurasi Hak Akses dan Kredensial Akun</p>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
        <p className="text-xs font-bold text-amber-800 leading-relaxed">
          Kredensial ini dibuat khusus oleh Administrator untuk memberikan Anda akses masuk terverifikasi. Apabila Anda mengubah username atau password di bawah ini, harap mencatatnya dengan baik. Admin dapat mengatur ulang kembali jika di kemudian hari Anda lupa.
        </p>
      </div>

      {/* FORM UNTUK EDIT KREDENSIAL */}
      <form onSubmit={handleUpdateCredentials} className="space-y-5 border-t border-b border-gray-50 py-6">
        <h4 className="font-extrabold text-xs uppercase tracking-wider text-primary">Kredensial Akun Masuk Anda</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Nama Akun (Username)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username..."
              className="w-full px-4 py-3 bg-surface border border-gray-150 rounded-xl text-xs font-mono font-bold text-primary focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Kata Sandi (Password)</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password..."
                className="w-full pl-4 pr-10 py-3 bg-surface border border-gray-150 rounded-xl text-xs font-mono font-bold text-primary focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 hover:text-primary p-1 rounded transition cursor-pointer"
              >
                {showPassword ? "Sembunyikan" : "Tampilkan"}
              </button>
            </div>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
            <p className="text-xs font-bold text-emerald-800 leading-relaxed">✓ {successMsg}</p>
          </div>
        )}

        {errorMsg && (
          <p className="text-xs font-bold text-red-500 font-sans">{errorMsg}</p>
        )}

        <button
          type="submit"
          className="bg-primary text-accent px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md"
        >
          Simpan & Perbarui Kredensial
        </button>
      </form>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="text-left animate-fade-in">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Butuh verifikasi ulang lencana?</p>
          <p className="text-[11px] font-medium text-gray-400">Harap hubungi Admin PC IKA PMII Bandung Barat jika ada kendala data.</p>
        </div>
        <button 
          onClick={() => setActiveTab("profile")} 
          className="w-full sm:w-auto bg-slate-50 border border-gray-150 text-primary px-6 py-3 rounded-xl text-xs font-bold hover:bg-gray-100 active:scale-95 transition-transform cursor-pointer"
        >
          Kelola Profil & Keamanan Data
        </button>
      </div>
    </motion.div>
  );
}

function DirectoryRoom({ 
  onChat,
  presetDistrict = "",
  setPresetDistrict = () => {},
  presetProfession = "",
  setPresetProfession = () => {},
  presetSector = "",
  setPresetSector = () => {}
}: { 
  onChat: () => void;
  presetDistrict?: string;
  setPresetDistrict?: (v: string) => void;
  presetProfession?: string;
  setPresetProfession?: (v: string) => void;
  presetSector?: string;
  setPresetSector?: (v: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filterLoc = presetDistrict;
  const filterProf = presetProfession;
  const filterSector = presetSector;

  const setFilterLoc = setPresetDistrict;
  const setFilterProf = setPresetProfession;
  const setFilterSector = setPresetSector;

  // Retrieve current user profile and privacy settings dynamically
  const userProfile = (() => {
    try {
      const saved = localStorage.getItem("siap_user_profile");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  })();
  const userPrivacy = (() => {
    try {
      const saved = localStorage.getItem("siap_user_privacy");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  })();

  const userCardItem = userProfile ? {
    name: userProfile.fullName + " (Saya)",
    prof: userProfile.profession || "Alumni Utama",
    loc: userProfile.district || "Ngamprah",
    gov: userProfile.company || undefined,
    ormas: userProfile.lastPosition || undefined,
    comm: undefined,
    activePos: "Data Saya",
    contrib: userProfile.interests || [],
    img: userProfile.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    whatsapp: userProfile.whatsapp,
    whatsappPrivacy: userPrivacy?.whatsapp || "private",
    nik: userProfile.nik,
    nikPrivacy: userPrivacy?.nik || "private",
    isSelf: true
  } : null;

  const allAlumni = userCardItem ? [userCardItem, ...BASE_ALUMNI, ...GENERATED_ALUMNI] : [...BASE_ALUMNI, ...GENERATED_ALUMNI];

  const filteredAlumni = allAlumni.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.prof.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLoc = filterLoc === "" || a.loc === filterLoc;
    const matchesProf = filterProf === "" || a.prof === filterProf;
    const matchesSector = filterSector === "" || a.contrib.includes(filterSector);
    
    return matchesSearch && matchesLoc && matchesProf && matchesSector;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
       <div className="flex flex-col gap-8">
          <div className="space-y-2">
             <h3 className="text-4xl font-display font-bold text-primary italic">Direktori Alumni Terverifikasi</h3>
             <p className="text-gray-400 text-sm font-medium">Jelajahi dan bangun kolaborasi dengan {allAlumni.length} alumni terverifikasi se-Bandung Barat.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Cari nama atau keyword..." 
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent font-medium text-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             
             <select 
               value={filterLoc}
               onChange={(e) => setFilterLoc(e.target.value)}
               className="py-4 px-6 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 text-sm font-bold text-primary cursor-pointer appearance-none"
             >
                <option value="">Semua Kecamatan</option>
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
             </select>
 
             <select 
               value={filterProf}
               onChange={(e) => setFilterProf(e.target.value)}
               className="py-4 px-6 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 text-sm font-bold text-primary cursor-pointer appearance-none"
             >
                <option value="">Semua Profesi</option>
                {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
             </select>
 
             <select 
               value={filterSector}
               onChange={(e) => setFilterSector(e.target.value)}
               className="py-4 px-6 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/20 text-sm font-bold text-primary cursor-pointer appearance-none"
             >
                <option value="">Bidang Kompetensi</option>
                {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
             </select>
           </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAlumni.map((alumni, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % 15) * 0.03 }}
              className="relative group block"
            >
               {/* Compact Base Card */}
               <div 
                 onClick={() => window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name: alumni.name, defaultLoc: alumni.loc } }))}
                 className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center h-[185px] justify-between transition-all duration-300 group-hover:shadow-xl group-hover:border-accent/40 group-hover:rounded-b-none relative z-20 cursor-pointer"
               >
                  <div className="flex flex-col items-center w-full">
                     {/* Avatar container */}
                     <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md border border-gray-100 relative shrink-0">
                        <img src={alumni.img} className="w-full h-full object-cover" alt={alumni.name} referrerPolicy="no-referrer" />
                        <div className="absolute bottom-0 right-0 p-0.5 bg-accent rounded-tl-lg text-primary shadow-2xs">
                           <ShieldCheck size={10} />
                        </div>
                     </div>

                     {/* Name with line-clamp */}
                     <h4 className="font-bold text-xs text-primary leading-tight mt-3 line-clamp-2 px-1">
                        {alumni.name}
                     </h4>

                     {/* Location */}
                     <div className="flex items-center gap-1 mt-1 justify-center">
                        <MapPin size={9} className="text-accent shrink-0" />
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider truncate max-w-[80px]">
                           {alumni.loc}
                        </span>
                     </div>
                  </div>

                  {/* Main Profession Badge */}
                  <div className="w-full mt-2">
                     <span className="inline-block text-[9px] font-bold text-slate-600 bg-slate-100 rounded-lg px-2.5 py-1 w-full truncate text-center">
                        {alumni.prof}
                     </span>
                  </div>
               </div>

               {/* Floating Absolute Dropdown on Hover */}
               <div className="absolute top-[184px] left-0 right-0 bg-white border border-gray-150 border-t-0 shadow-xl rounded-b-2xl p-4 flex flex-col gap-3 opacity-0 invisible scale-95 origin-top group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50 text-left">
                  {/* Job roles/spaces inside active rooms if exist */}
                  {(alumni.gov || alumni.ormas || alumni.comm) && (
                     <div className="space-y-1">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Klaster & Ruang Aktif</span>
                        <div className="space-y-1">
                           {alumni.gov && (
                             <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50/70 border border-green-100 rounded-md">
                                <span className="w-1 h-1 bg-green-500 rounded-full" />
                                <span className="text-[9px] font-bold text-green-700 truncate">Gov: {alumni.gov}</span>
                             </div>
                           )}
                           {alumni.ormas && (
                             <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50/70 border border-blue-100 rounded-md">
                                <span className="w-1 h-1 bg-blue-500 rounded-full" />
                                <span className="text-[9px] font-bold text-blue-700 truncate">Ormas: {alumni.ormas}</span>
                             </div>
                           )}
                           {alumni.comm && (
                             <div className="flex items-center gap-1.5 px-2 py-1 bg-accent/10 border border-accent/20 rounded-md">
                                <span className="w-1 h-1 bg-accent rounded-full" />
                                <span className="text-[9px] font-bold text-primary truncate">Komm: {alumni.comm}</span>
                             </div>
                           )}
                        </div>
                     </div>
                  )}

                  {/* Bidang Kompetensi tags */}
                  <div className="space-y-1">
                     <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Bidang Kompetensi</span>
                     <div className="flex flex-wrap gap-1">
                        {alumni.contrib.map((tag, idx) => (
                          <span key={idx} className="text-[8px] font-bold text-primary px-1.5 py-0.5 bg-slate-50 border border-gray-100 rounded-md hover:bg-accent hover:text-primary transition-colors">
                             #{tag}
                          </span>
                        ))}
                     </div>
                  </div>

                  {/* Sensitive Data Visibility Status of Whatsapp/KTP */}
                  <div className="space-y-1 border-t border-gray-100 pt-2 text-[9px]">
                     <div className="flex items-center justify-between text-gray-500 font-medium">
                        <span className="flex items-center gap-1"><Phone size={9} /> WhatsApp</span>
                        {alumni.whatsappPrivacy === "private" ? (
                           <span className="text-[8px] text-rose-500 bg-rose-50/50 px-1 border border-rose-100 rounded font-bold">Privat</span>
                        ) : (
                           <span className="text-[8px] text-emerald-600 font-mono font-bold truncate max-w-[90px]">{alumni.whatsapp}</span>
                        )}
                     </div>
                     <div className="flex items-center justify-between text-gray-500 font-medium mt-1">
                        <span className="flex items-center gap-1"><CreditCard size={9} /> NIK KTP</span>
                        {alumni.nikPrivacy === "private" ? (
                           <span className="text-[8px] text-rose-500 bg-rose-50/50 px-1 border border-rose-100 rounded font-bold">Privat</span>
                        ) : (
                           <span className="text-[8px] text-emerald-600 font-mono font-bold truncate max-w-[90px]">{alumni.nik}</span>
                        )}
                     </div>
                  </div>

                  {/* Message trigger button inside the hover popover */}
                  <button 
                    onClick={onChat}
                    className="w-full flex items-center justify-center gap-1.5 py-2 bg-primary hover:bg-primary/95 text-accent rounded-xl text-[9px] font-black uppercase tracking-widest shadow-md transition-all mt-1"
                  >
                     <MessageCircle size={10} />
                     Kirim Pesan
                  </button>
               </div>
            </motion.div>
          ))}
       </div>
    </motion.div>
  );
}

function StatCard({ label, value, trend }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6 relative overflow-hidden group">
       <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <LayoutDashboard size={80} />
       </div>
       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] relative z-10">{label}</p>
       <div className="flex items-end justify-between relative z-10">
          <h4 className="text-5xl font-display font-bold text-primary leading-none tabular-nums">{value}</h4>
          <span className="text-[10px] font-bold text-primary bg-accent px-3 py-1.5 rounded-full shadow-lg shadow-accent/20">{trend}</span>
       </div>
    </div>
  );
}

function ChatSystem() {
  const [activeChat, setActiveChat] = useState("group");
  const [messages, setMessages] = useState([
    { id: 1, user: "Sdr. Zaki", msg: "Assalamualaikum kawan-kawan, mari kita sinergi!", time: "10:30", self: false },
    { id: 2, user: "Me", msg: "Waalaikumsalam, siap berkolaborasi untuk KBB!", time: "10:32", self: true },
    { id: 3, user: "Sdr. Siti", msg: "Siap hadir di rapat koordinasi besok.", time: "10:45", self: false },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, { id: Date.now(), user: "Me", msg: input, time: "Baru saja", self: true }]);
    setInput("");
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl flex h-[700px] overflow-hidden">
       {/* Chat Sidebar */}
       <div className="w-80 border-r border-gray-100 flex flex-col bg-surface/30">
          <div className="p-8 border-b border-gray-100">
             <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1 shadow-inner">
                <button onClick={() => setActiveChat("group")} className={`flex-grow py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeChat === "group" ? 'bg-white shadow-lg text-primary' : 'text-gray-400'}`}>Grup IKA</button>
                <button onClick={() => setActiveChat("personal")} className={`flex-grow py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeChat === "personal" ? 'bg-white shadow-lg text-primary' : 'text-gray-400'}`}>Personal</button>
             </div>
          </div>
          <div className="flex-grow overflow-y-auto px-4 py-4 space-y-2">
             {[1,2,3,4,5].map(i => (
                <div key={i} className="p-4 rounded-2xl hover:bg-white hover:shadow-lg cursor-pointer flex items-center gap-4 transition-all group border border-transparent hover:border-gray-100">
                   <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-bold group-hover:bg-accent transition-colors">D{i}</div>
                   <div className="flex-grow">
                      <p className="text-sm font-bold text-primary">Ruang Diskusi {i}</p>
                      <p className="text-[10px] text-gray-400 truncate w-32 font-medium">Terakhir: Assalamualaikum...</p>
                   </div>
                   <div className="w-2 h-2 bg-accent rounded-full"></div>
                </div>
             ))}
          </div>
       </div>
       {/* Chat Room */}
       <div className="flex-grow flex flex-col bg-white">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-accent shadow-lg"><Users size={24}/></div>
                <div>
                   <h4 className="font-bold text-lg text-primary">Grup Diskusi Strategis</h4>
                   <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> 128 Anggota Online
                   </p>
                </div>
             </div>
          </div>
          <div className="flex-grow p-8 space-y-8 overflow-y-auto bg-surface/50">
             {messages.map((m) => (
               <div key={m.id} className={`flex ${m.self ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] ${m.self ? 'bg-primary text-surface rounded-l-3xl rounded-tr-3xl shadow-xl' : 'bg-white border border-gray-100 rounded-r-3xl rounded-tl-3xl shadow-lg'} p-6 relative`}>
                    {!m.self && <p className="text-[10px] font-bold text-accent mb-2 uppercase tracking-widest underline decoration-accent/30">{m.user}</p>}
                    <p className="text-sm leading-relaxed font-medium">{m.msg}</p>
                    <div className={`mt-3 flex items-center gap-2 ${m.self ? 'justify-end' : 'justify-start'}`}>
                       <p className={`text-[9px] font-bold ${m.self ? 'text-surface/40' : 'text-gray-300'}`}>{m.time}</p>
                    </div>
                  </div>
               </div>
             ))}
          </div>
          <div className="p-8 border-t border-gray-100 bg-white">
             <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Ketik gagasan Anda..."
                  className="flex-grow bg-surface border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className="w-14 h-14 bg-primary text-accent rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"><Send size={24}/></button>
             </div>
          </div>
       </div>
    </motion.div>
  );
}

function CreateContentRoom() {
  const CATEGORY_SUBOPTIONS = {
    BERITA: [
      "Berita Organisasi",
      "Berita Kegiatan",
      "Berita Alumni",
      "Berita Nasional & Daerah",
      "Pengumuman Resmi",
      "Berita Kemitraan",
      "Berita Koperasi & UMKM",
      "Berita Pendidikan",
      "Berita Sosial Kemasyarakatan",
      "Berita Digital & Teknologi"
    ],
    ARTIKEL: [
      "Pendidikan & Kepemudaan",
      "Keislaman & Kebangsaan",
      "Teknologi & Digitalisasi",
      "Ekonomi & Kewirausahaan",
      "Pengembangan SDM",
      "Sosial & Masyarakat",
      "Lingkungan & Sustainability",
      "Organisasi & Kepemimpinan",
      "Media & Komunikasi",
      "Sejarah & Pemikiran"
    ],
    OPINI: [
      "Opini Kebangsaan",
      "Opini Keislaman",
      "Opini Pendidikan",
      "Opini Politik & Sosial",
      "Opini Teknologi",
      "Opini Ekonomi Kerakyatan",
      "Tokoh & Inspirasi Alumni",
      "Opini Kepemudaan",
      "Opini Organisasi",
      "Opini Hukum & Demokrasi"
    ]
  };

  const [category, setCategory] = useState<"BERITA" | "ARTIKEL" | "OPINI">("BERITA");
  const [subCategory, setSubCategory] = useState("Berita Organisasi");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [customTags, setCustomTags] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Formatting state (MS Word controls)
  const [fontFamily, setFontFamily] = useState<"sans" | "serif" | "mono" | "grotesk">("sans");
  const [fontSize, setFontSize] = useState<"12px" | "14px" | "16px" | "18px" | "22px">("16px");
  const [alignment, setAlignment] = useState<"left" | "center" | "right" | "justify">("left");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isListOrdered, setIsListOrdered] = useState(false);
  const [lineSpacing, setLineSpacing] = useState<"1.15" | "1.5" | "2.0">("1.5");
  const [letterSpacing, setLetterSpacing] = useState<"normal" | "wide" | "wider">("normal");

  // Interaction controls
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"draft" | "submitted">("draft");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);

  // Submitted items list
  const [submittedPosts, setSubmittedPosts] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("siap_user_publications_v2");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Whenever category shifts, update sub-category to default first item
  const handleCategoryChange = (cat: "BERITA" | "ARTIKEL" | "OPINI") => {
    setCategory(cat);
    setSubCategory(CATEGORY_SUBOPTIONS[cat][0]);
  };

  // Convert sub-category into beautiful hashtag representation
  const generateAutoHashtag = (sub: string) => {
    return "#" + sub.replace(/[^a-zA-Z0-9]/g, "");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
    }
  };

  const handleImageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
    }
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      alert("Harap lengkapi Judul dan Isi Tulisan Anda terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        category,
        subCategory,
        title,
        content,
        imageUrl,
        autoHashtag: generateAutoHashtag(subCategory),
        customTags: customTags
          .split(",")
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0)
          .map(tag => (tag.startsWith("#") ? tag : `#${tag}`))
          .join(" "),
        date: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        status: "DIPROSES", // Waiting for admin verification
        formatterSettings: {
          fontFamily,
          fontSize,
          alignment,
          isBold,
          isItalic,
          isUnderline,
          isListOrdered,
          lineSpacing,
          letterSpacing
        }
      };

      const updated = [newPost, ...submittedPosts];
      setSubmittedPosts(updated);
      localStorage.setItem("siap_user_publications_v2", JSON.stringify(updated));

      setIsSubmitting(false);
      setShowVerificationAlert(true);
      
      // Clear draft form inputs
      setTitle("");
      setContent("");
      setCustomTags("");
      setImageUrl(null);
    }, 1500);
  };

  // Fonts class compiler
  const getFontFamilyClass = () => {
    switch (fontFamily) {
      case "serif": return "font-serif";
      case "mono": return "font-mono";
      case "grotesk": return "font-sans font-bold tracking-tight";
      default: return "font-sans";
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "12px": return "text-xs";
      case "14px": return "text-sm";
      case "18px": return "text-lg";
      case "22px": return "text-xl md:text-2xl";
      default: return "text-base";
    }
  };

  const getAlignmentClass = () => {
    switch (alignment) {
      case "center": return "text-center";
      case "right": return "text-right";
      case "justify": return "text-justify";
      default: return "text-left";
    }
  };

  const getLineSpacingClass = () => {
    switch (lineSpacing) {
      case "1.15": return "leading-normal";
      case "2.0": return "leading-loose";
      default: return "leading-relaxed";
    }
  };

  const getLetterSpacingClass = () => {
    switch (letterSpacing) {
      case "wide": return "tracking-wide";
      case "wider": return "tracking-wider";
      default: return "tracking-normal";
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                <FileText size={20}/>
             </div>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Ruang Kepenulisan Profesional</p>
          </div>
          <h2 className="text-3xl font-display font-black text-primary italic">SIAP Redaksi & Opini</h2>
          <p className="text-xs text-gray-500 font-medium">Salurkan gagasan kepemudaan, keislaman, berita kemaslahatan, dan kontribusi literasi berstandar nasional.</p>
        </div>
        
        {/* Workspace mode selectors */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 self-start md:self-center shadow-inner">
           <button 
             onClick={() => setActiveWorkspaceTab("draft")}
             className={`px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeWorkspaceTab === "draft" ? "bg-white text-primary shadow-md" : "text-gray-400 hover:text-primary"}`}
           >
              📝 Tulis Draft
           </button>
           <button 
             onClick={() => setActiveWorkspaceTab("submitted")}
             className={`px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 relative ${activeWorkspaceTab === "submitted" ? "bg-white text-primary shadow-md" : "text-gray-400 hover:text-primary"}`}
           >
              📂 Status Kiriman ({submittedPosts.length})
              {submittedPosts.some(p => p.status === "DIPROSES") && (
                 <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-yellow-500 rounded-full animate-ping"></span>
              )}
           </button>
        </div>
      </div>

      {activeWorkspaceTab === "submitted" ? (
         <div className="space-y-6">
            {submittedPosts.length === 0 ? (
               <div className="bg-white p-20 rounded-[3rem] text-center border border-gray-100 shadow-xl flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-[2rem] flex items-center justify-center"><FileText size={40} /></div>
                  <h4 className="font-bold text-lg text-primary">Belum Ada Tulisan yang Dikirim</h4>
                  <p className="text-xs text-gray-400 max-w-sm">Draf ide dan ulasan kritis Anda belum diajukan untuk proses moderasi redaksi dewan pengurus.</p>
                  <button onClick={() => setActiveWorkspaceTab("draft")} className="mt-4 px-6 py-3 bg-primary text-accent hover:bg-primary/95 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg">Mulai Menulis ➔</button>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {submittedPosts.map((post) => (
                     <div key={post.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all">
                        {post.imageUrl && (
                           <div className="h-48 relative overflow-hidden shrink-0">
                              <img src={post.imageUrl} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                              <div className="absolute bottom-4 left-6 right-6">
                                 <p className="text-[10px] font-bold text-accent uppercase tracking-widest bg-primary/80 backdrop-blur-xs px-3 py-1.5 rounded-lg inline-block">{post.category}</p>
                              </div>
                           </div>
                        )}
                        <div className="p-8 space-y-4 flex-grow flex flex-col">
                           <div className="flex items-center justify-between gap-4">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{post.date}</span>
                              <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${post.status === 'DIPROSES' ? 'bg-yellow-50 text-yellow-650 text-yellow-600 border border-yellow-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                                 ⏳ {post.status}
                              </span>
                           </div>
                           <div className="space-y-2 flex-grow">
                              <p className="text-[10px] text-primary/60 font-black uppercase tracking-widest">{post.subCategory}</p>
                              <h3 className="text-xl font-bold text-primary leading-tight font-sans line-clamp-2">{post.title}</h3>
                              <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mt-2" style={{
                                 fontFamily: post.formatterSettings?.fontFamily === 'serif' ? 'serif' : post.formatterSettings?.fontFamily === 'mono' ? 'monospace' : 'sans-serif',
                                 textAlign: post.formatterSettings?.alignment || 'left' as any
                              }}>{post.content}</p>
                           </div>
                           <div className="pt-4 border-t border-gray-50 flex flex-wrap gap-2">
                              <span className="text-[10px] font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-lg">{post.autoHashtag}</span>
                              {post.customTags && post.customTags.split(" ").map((t: string, idx: number) => (
                                 <span key={idx} className="text-[10px] font-bold text-accent bg-accent/5 px-2.5 py-1 rounded-lg">{t}</span>
                              ))}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      ) : (
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Editor Workspace Column */}
            <div className="lg:col-span-12 xl:col-span-7 bg-white p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6">
               <h3 className="text-xl font-bold font-sans text-primary">Format Uraian & Kategori</h3>
               
               {/* 1. Category selector pill box */}
               <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block ml-1">Pilih Jenis Tulisan Utama</label>
                  <div className="grid grid-cols-3 gap-3">
                     {(["BERITA", "ARTIKEL", "OPINI"] as const).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleCategoryChange(cat)}
                          className={`py-4 rounded-xl text-xs font-black tracking-widest transition-all border ${category === cat ? "bg-primary text-accent border-primary shadow-md" : "bg-slate-50 text-primary border-slate-100 hover:bg-slate-100"}`}
                        >
                           {cat}
                        </button>
                     ))}
                  </div>
               </div>

               {/* 2. Sub Category Selector */}
               <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block ml-1">Sub Kategori Khusus (Sektor Redaksi)</label>
                  <div className="relative">
                     <select
                       value={subCategory}
                       onChange={(e) => setSubCategory(e.target.value)}
                       className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold text-primary focus:outline-none focus:border-primary transition-all cursor-pointer appearance-none shadow-xs"
                     >
                        {CATEGORY_SUBOPTIONS[category].map((subOption) => (
                           <option key={subOption} value={subOption}>
                              📍 {subOption}
                           </option>
                        ))}
                     </select>
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 ml-1">
                     <span className="text-[9px] font-bold text-primary/60 uppercase">Hashtag tersemat otomatis:</span>
                     <span className="text-[9px] font-black text-accent">{generateAutoHashtag(subCategory)}</span>
                  </div>
               </div>

               {/* Column Hashtag Tersendiri */}
               <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block ml-1">Kolom Kustom Hashtag (Pisahkan dengan koma)</label>
                  <div className="relative">
                     <div className="absolute left-4 top-4 text-gray-400 text-xs font-bold font-mono">#</div>
                     <input 
                       type="text" 
                       value={customTags}
                       onChange={(e) => setCustomTags(e.target.value)}
                       placeholder="pmii, bandungbarat, koperasi, sdm" 
                       className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-8 pr-4 py-4 text-xs font-bold text-primary focus:outline-none focus:border-primary transition-all"
                     />
                  </div>
                  <p className="text-[8px] text-gray-400 ml-1">Hashtag ini akan disatukan ke draf tulisan secara otomatis untuk mempermudah kategorisasi Redaktur Admin.</p>
               </div>

               {/* Title Of Post */}
               <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block ml-1">Judul Tulisan Utama</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Penguatan Kaderisasi Berbasis Digital di Kabupaten Bandung Barat"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-sm font-bold text-primary focus:outline-none focus:border-primary transition-all shadow-inner"
                  />
               </div>

               {/* Editor Toolbar (MS Word Style Ribbon) */}
               <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block ml-1">Formatting Ribbon (MS Word Tool)</label>
                  
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-3 shadow-xs">
                     {/* Row 1: Font and Font Size */}
                     <div className="flex flex-wrap items-center gap-2.5">
                        <div className="flex items-center gap-1 bg-white px-2 py-1.5 rounded-lg border border-slate-100 shadow-2xs">
                           <span className="text-[8px] text-slate-400 font-bold uppercase select-none">Font:</span>
                           <select 
                             value={fontFamily} 
                             onChange={(e) => setFontFamily(e.target.value as any)}
                             className="text-[9px] font-bold bg-transparent border-none text-primary focus:outline-none cursor-pointer"
                           >
                              <option value="sans">Inter (Sans)</option>
                              <option value="serif">Georgia (Serif)</option>
                              <option value="mono">JetBrains (Mono)</option>
                              <option value="grotesk">Grotesk (Bold)</option>
                           </select>
                        </div>

                        <div className="flex items-center gap-1 bg-white px-2 py-1.5 rounded-lg border border-slate-100 shadow-2xs">
                           <span className="text-[8px] text-slate-400 font-bold uppercase select-none">Ukuran:</span>
                           <select 
                             value={fontSize} 
                             onChange={(e) => setFontSize(e.target.value as any)}
                             className="text-[9px] font-bold bg-transparent border-none text-primary focus:outline-none cursor-pointer"
                           >
                              <option value="12px">12px (Kecil)</option>
                              <option value="14px">14px (Normal)</option>
                              <option value="16px">16px (Sedang)</option>
                              <option value="18px">18px (Besar)</option>
                              <option value="22px">22px (Judul Kecil)</option>
                           </select>
                        </div>

                        {/* Line Spacing rule */}
                        <div className="flex items-center gap-1 bg-white px-2 py-1.5 rounded-lg border border-slate-100 shadow-2xs">
                           <span className="text-[8px] text-slate-400 font-bold uppercase select-none">Spasi:</span>
                           <select 
                             value={lineSpacing} 
                             onChange={(e) => setLineSpacing(e.target.value as any)}
                             className="text-[9px] font-bold bg-transparent border-none text-primary focus:outline-none cursor-pointer"
                           >
                              <option value="1.15">1.15 (Normal)</option>
                              <option value="1.5">1.5 (Renggang)</option>
                              <option value="2.0">2.0 (Double)</option>
                           </select>
                        </div>
                     </div>

                     {/* Row 2: Basic Style Toggles and Alignments */}
                     <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-150">
                        <div className="flex items-center gap-1">
                           <button 
                             type="button" 
                             onClick={() => setIsBold(!isBold)} 
                             title="Tebal (Bold)"
                             className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${isBold ? 'bg-primary text-accent shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-500 border border-slate-100'}`}
                           >
                              <Bold size={11} />
                           </button>
                           <button 
                             type="button" 
                             onClick={() => setIsItalic(!isItalic)} 
                             title="Miring (Italic)"
                             className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${isItalic ? 'bg-primary text-accent shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-500 border border-slate-100'}`}
                           >
                              <Italic size={11} />
                           </button>
                           <button 
                             type="button" 
                             onClick={() => setIsUnderline(!isUnderline)} 
                             title="Garis Bawah (Underline)"
                             className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${isUnderline ? 'bg-primary text-accent shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-500 border border-slate-100'}`}
                           >
                              <Underline size={11} />
                           </button>
                           <button 
                             type="button" 
                             onClick={() => setIsListOrdered(!isListOrdered)} 
                             title="Nomor Urutan (Numeric)"
                             className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${isListOrdered ? 'bg-primary text-accent shadow-xs' : 'bg-white hover:bg-slate-100 text-slate-500 border border-slate-100'}`}
                           >
                              <ListOrdered size={11} />
                           </button>
                        </div>

                        {/* Spacing letter metric */}
                        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-slate-100 text-[8px] font-bold">
                           <span className="text-slate-400 uppercase select-none">Spasi Huruf:</span>
                           <button 
                             type="button" 
                             onClick={() => setLetterSpacing(letterSpacing === 'normal' ? 'wide' : letterSpacing === 'wide' ? 'wider' : 'normal')}
                             className="font-black uppercase text-accent bg-accent/5 px-1.5 py-0.5 rounded"
                           >
                              {letterSpacing === 'normal' ? 'Normal' : letterSpacing === 'wide' ? 'Lebar' : 'Sangat Lebar'}
                           </button>
                        </div>

                        {/* Alignments */}
                        <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-100">
                           {(["left", "center", "right", "justify"] as const).map((align) => {
                              const AlignIcon = 
                                align === "center" ? AlignCenter : 
                                align === "right" ? AlignRight : 
                                align === "justify" ? AlignJustify : AlignLeft;
                              return (
                                 <button
                                   key={align}
                                   type="button"
                                   onClick={() => setAlignment(align)}
                                   title={`Rata ${align === 'left' ? 'Kiri' : align === 'center' ? 'Tengah' : align === 'right' ? 'Kanan' : 'Kiri Kanan'}`}
                                   className={`w-6.5 h-6.5 rounded flex items-center justify-center transition-all ${alignment === align ? 'bg-accent text-primary shadow-xs' : 'bg-transparent text-slate-400 hover:bg-slate-50'}`}
                                 >
                                    <AlignIcon size={10} />
                                 </button>
                              );
                           })}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Editor Canvas writing textarea */}
               <div className="space-y-3">
                  <div className="flex items-center justify-between">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Isi Canvas Lembar Tulisan</label>
                     <span className="text-[9px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-md">{content.length} Karakter</span>
                  </div>
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tulis opini kritis, ulasan berita pergerakan, atau jurnal pemikiran strategis alumni di sini. Format teks akan terproyeksi secara live di bagian kanan canvas lembar cetak..."
                    style={{
                      fontFamily: fontFamily === 'serif' ? 'serif' : fontFamily === 'mono' ? 'monospace' : 'sans-serif'
                    }}
                    className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-6 h-80 focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner text-sm leading-relaxed"
                  />
               </div>

               {/* Buttons action toolbar */}
               <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsPreviewModalOpen(true)}
                    className="flex-1 py-4 bg-slate-100 text-primary hover:bg-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                  >
                     <Eye size={14} /> Preview Cetak Tulisan
                  </button>
                  <button 
                    type="button"
                    onClick={handlePublish}
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-primary text-accent hover:brightness-110 disabled:opacity-50 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/20"
                  >
                     {isSubmitting ? (
                        <>
                           <span className="w-3.5 h-3.5 border-2 border-accent border-t-transparent rounded-full animate-spin"></span>
                           Mengirim...
                        </>
                     ) : (
                        <>
                           <CheckCircle size={14} /> Kirim & Verifikasi Admin
                        </>
                     )}
                  </button>
               </div>
            </div>

            {/* Live Canvas Paper Preview Column */}
            <div className="lg:col-span-12 xl:col-span-5 bg-slate-50 p-6 rounded-[2.5rem] border border-gray-200/50 space-y-4">
               <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold text-primary bg-accent/25 px-2.5 py-1 rounded-full shadow-inner uppercase">📄 Live Preview Canvas</span>
                  <span className="text-[8px] text-gray-400 font-bold uppercase">Tampilan Cetak</span>
               </div>

               {/* Simulated Canvas Paper */}
               <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-xl space-y-4 min-h-[450px] flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute top-4 right-4 text-[8px] font-mono font-bold text-slate-200 select-none">IKA PMII KBB</div>

                  <div className="space-y-4">
                     {/* cover image upload in canvas */}
                     <div 
                       onDragOver={handleImageDragOver}
                       onDrop={handleImageDrop}
                       className="group relative border border-dashed border-slate-200 hover:border-accent rounded-2xl aspect-[16/10] overflow-hidden flex flex-col items-center justify-center cursor-pointer bg-slate-50 transition-all text-center"
                     >
                        {imageUrl ? (
                           <>
                              <img src={imageUrl} className="w-full h-full object-cover" alt="Cover Draft" referrerPolicy="no-referrer" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                 <label className="bg-white/90 cursor-pointer text-primary rounded-xl px-3 py-1.5 text-[8px] font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-transform flex items-center gap-1">
                                    <Upload size={10} /> Ganti Cover Foto
                                    <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                                 </label>
                              </div>
                           </>
                        ) : (
                           <label className="cursor-pointer p-4 flex flex-col items-center gap-2">
                              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-md group-hover:bg-accent group-hover:text-primary transition-all">
                                 <Image size={16} />
                              </div>
                              <p className="text-[10px] font-bold text-primary">Upload Cover Foto</p>
                              <p className="text-[8px] text-gray-400">Drag & drop foto ke sini, atau klik untuk memilih file cetak</p>
                              <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                           </label>
                        )}
                     </div>

                     {/* Previews Metadata */}
                     <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                           <span className="bg-primary text-accent text-[8px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">{category}</span>
                           <span className="bg-slate-100 text-slate-650 text-[8px] font-bold px-2.5 py-0.5 rounded-full">{subCategory}</span>
                        </div>

                        {title.trim() ? (
                           <h4 className="text-xl font-black text-primary leading-tight font-sans tracking-tight border-b border-slate-100 pb-2">{title}</h4>
                        ) : (
                           <h4 className="text-xl font-bold text-slate-300 italic leading-tight font-sans tracking-tight border-b-2 border-dashed border-slate-100 pb-2">Belum Ada Judul</h4>
                        )}

                        {/* Interactive Dynamic styled text body split into formatted paragraph lines */}
                        <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                           {content.trim() ? (
                              content.split("\n").map((line, idx) => {
                                 if (!line.trim() && idx > 0) return <div key={idx} className="h-2" />;
                                 const linePrefix = isListOrdered ? `${idx + 1}. ` : "";
                                 return (
                                    <p 
                                      key={idx}
                                      style={{
                                         fontSize: fontSize === '12px' ? '12px' : fontSize === '14px' ? '14px' : fontSize === '18px' ? '18px' : fontSize === '22px' ? '22px' : '16px',
                                         textAlign: alignment,
                                         fontWeight: isBold ? 'bold' : 'normal',
                                         fontStyle: isItalic ? 'italic' : 'normal',
                                         textDecoration: isUnderline ? 'underline' : 'none'
                                      }}
                                      className={`
                                         ${getFontFamilyClass()}
                                         ${getLineSpacingClass()}
                                         ${getLetterSpacingClass()}
                                         text-primary/95 text-xs transition-all leading-relaxed whitespace-pre-wrap
                                      `}
                                    >
                                       {linePrefix}{line}
                                    </p>
                                 );
                              })
                           ) : (
                              <p className="text-[10px] text-slate-300 font-medium italic">Isi lembar tulisan akan ditampilkan secara live di sini sesuai format yang Anda aktifkan.</p>
                           )}
                        </div>
                     </div>
                  </div>

                  {/* Hash Tags dynamic dashboard outputs */}
                  <div className="border-t border-slate-100 pt-3 space-y-1.5 mt-3">
                     <div className="flex flex-wrap gap-1 items-center">
                        <span className="text-[8px] font-black text-primary bg-primary/5 border border-primary/10 px-2.5 py-0.5 rounded-md">
                           {generateAutoHashtag(subCategory)}
                        </span>
                        {customTags.trim() && customTags.split(",").map((t, idx) => {
                           const formattedTag = t.trim();
                           if (!formattedTag) return null;
                           const prefixed = formattedTag.startsWith("#") ? formattedTag : `#${formattedTag}`;
                           return (
                              <span key={idx} className="text-[8px] font-black text-accent bg-accent/5 border border-accent/10 px-2.5 py-0.5 rounded-md transition-all">
                                 {prefixed}
                              </span>
                           );
                        })}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Fullscreen Preview Modal Dialog */}
      <AnimatePresence>
         {isPreviewModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95, y: 30 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: 30 }}
                 className="bg-white rounded-[3rem] w-full max-w-4xl p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 relative border border-slate-100"
               >
                  <button 
                    onClick={() => setIsPreviewModalOpen(false)}
                    className="absolute top-6 right-6 text-primary font-black hover:text-accent font-mono text-lg bg-slate-100 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  >
                     ✕
                  </button>

                  <div className="space-y-2">
                     <span className="text-[9px] font-bold text-accent uppercase tracking-widest bg-primary px-3 py-1 rounded-md inline-block">📋 Preview Format Cetak</span>
                     <h3 className="text-xl font-display font-black text-primary italic">Draft Pra-Tinjau Redaktur</h3>
                  </div>

                  <div className="border-t border-b border-gray-100 py-6 space-y-4">
                     {imageUrl && (
                        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-md">
                           <img src={imageUrl} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                        </div>
                     )}

                     <div className="space-y-3">
                        <div className="flex flex-wrap gap-2 text-[9px]">
                           <span className="bg-primary text-accent px-2 py-0.5 rounded-md font-bold uppercase">{category}</span>
                           <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold uppercase">{subCategory}</span>
                        </div>

                        <h1 className="text-2xl font-black text-primary leading-tight font-sans tracking-tight">{title || "Belum Ada Judul"}</h1>
                        
                        <div className="space-y-3">
                           {content.trim() ? (
                              content.split("\n").map((line, idx) => {
                                 if (!line.trim() && idx > 0) return <div key={idx} className="h-3" />;
                                 const linePrefix = isListOrdered ? `${idx + 1}. ` : "";
                                 return (
                                    <p 
                                      key={idx}
                                      style={{
                                         fontSize: fontSize === '12px' ? '12px' : fontSize === '14px' ? '14px' : fontSize === '18px' ? '18px' : fontSize === '22px' ? '22px' : '16px',
                                         textAlign: alignment,
                                         fontWeight: isBold ? 'bold' : 'normal',
                                         fontStyle: isItalic ? 'italic' : 'normal',
                                         textDecoration: isUnderline ? 'underline' : 'none'
                                      }}
                                      className={`
                                         ${getFontFamilyClass()}
                                         ${getLineSpacingClass()}
                                         ${getLetterSpacingClass()}
                                         text-primary leading-relaxed whitespace-pre-wrap text-sm
                                      `}
                                    >
                                       {linePrefix}{line}
                                    </p>
                                 );
                              })
                           ) : (
                              <p className="text-xs text-gray-400 italic">Belum ada konten tulisan yang diisi.</p>
                           )}
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                     <span className="text-xs text-primary bg-primary/5 px-3 py-1.5 rounded-xl font-bold">{generateAutoHashtag(subCategory)}</span>
                     {customTags.trim() && customTags.split(",").map((t, i) => {
                        const tagClean = t.trim();
                        if (!tagClean) return null;
                        const formatted = tagClean.startsWith("#") ? tagClean : `#${tagClean}`;
                        return (
                           <span key={i} className="text-xs text-accent bg-accent/5 px-3 py-1.5 rounded-xl font-bold">{formatted}</span>
                        );
                     })}
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                     <button
                       onClick={() => setIsPreviewModalOpen(false)}
                       className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-primary font-bold rounded-xl text-xs uppercase tracking-widest transition-all"
                     >
                        Tutup Pra-Tinjau
                     </button>
                     <button
                       onClick={() => {
                          setIsPreviewModalOpen(false);
                          handlePublish();
                       }}
                       className="px-5 py-3 bg-primary text-accent hover:brightness-110 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                     >
                        Kirim Sekarang ➔
                     </button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* Admin Verification Success Notification Banner */}
      <AnimatePresence>
         {showVerificationAlert && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="bg-white rounded-[3rem] w-full max-w-lg p-8 md:p-10 text-center border border-gray-100 shadow-2xl space-y-6 relative"
               >
                  <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                     <CheckCircle size={36} />
                  </div>

                  <div className="space-y-1">
                     <h3 className="text-xl font-black text-primary italic leading-tight">Pengajuan Terdaftar Ke Admin!</h3>
                     <p className="text-[10px] text-accent font-black uppercase tracking-widest">SIAP Redaktur PC IKA PMII KBB</p>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     Tulisan Anda berhasil diajukan untuk proses <strong>Verifikasi Dewan Redaksi</strong>. Tim Redaktur DPC IKA PMII Bandung Barat akan meninjau kelayakan literasi sebelum dipublikasikan ke kanal resmi & media eksternal bimbingan alumni.
                  </p>

                  <div className="pt-2">
                     <button 
                       onClick={() => {
                          setShowVerificationAlert(false);
                          setActiveWorkspaceTab("submitted");
                       }}
                       className="w-full py-4 bg-primary text-accent hover:brightness-110 rounded-xl text-xs font-bold uppercase tracking-widest transition-all font-mono"
                     >
                        Lihat Status Kiriman Saya ➔
                     </button>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </motion.div>
  );
}
