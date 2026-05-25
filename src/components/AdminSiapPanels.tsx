import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, BookOpen, FileText, MessageSquare, MessageCircle, 
  Award, Lock, Globe, Settings, LayoutDashboard, Search, 
  Trash2, ShieldCheck, Check, Edit3, Tag, Plus, CheckCircle, 
  X, AlertTriangle, Send, RefreshCw, Layers, ShieldCheck as ShieldIcon,
  BookOpen as BookIcon, CheckCircle2, TrendingUp, Sparkles, ZoomIn, Info,
  Mail, Phone
} from "lucide-react";

interface EvaluationRating {
  status: "Lolos" | "Revisi" | "Tolak";
  checkedColumns: Record<string, boolean>;
}

interface AdminSiapPanelsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingApplicants: any[];
  setPendingApplicants: React.Dispatch<React.SetStateAction<any[]>>;
  verifiedAlumni: any[];
  setVerifiedAlumni: React.Dispatch<React.SetStateAction<any[]>>;
  submittedContents: any[];
  setSubmittedContents: React.Dispatch<React.SetStateAction<any[]>>;
  discussionRooms: any[];
  setDiscussionRooms: React.Dispatch<React.SetStateAction<any[]>>;
  bulletins: any[];
  setBulletins: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function AdminSiapPanels({
  activeTab,
  setActiveTab,
  pendingApplicants,
  setPendingApplicants,
  verifiedAlumni,
  setVerifiedAlumni,
  submittedContents,
  setSubmittedContents,
  discussionRooms,
  setDiscussionRooms,
  bulletins,
  setBulletins
}: AdminSiapPanelsProps) {

  // Global Notification
  const [notification, setNotification] = useState<{message: string; type: "success" | "error" | "info"} | null>(null);
  const triggerNotification = (message: string, type: "success" | "error" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- TAB 2: VERIFIKASI ANGGOTA STATE ---
  const [selectedVerifyApplicant, setSelectedVerifyApplicant] = useState<any | null>(null);
  const [evaluations, setEvaluations] = useState<Record<number, Record<string, "Sesuai" | "Revisi" | "Salah">>>({});
  const [fieldStatuses, setFieldStatuses] = useState<Record<number, Record<string, "oke" | "edit" | "perbaiki" | "tolak">>>({});
  const [fieldOverrides, setFieldOverrides] = useState<Record<number, Record<string, string>>>({});
  const [editingApplicantId, setEditingApplicantId] = useState<number | null>(null);
  const [editFields, setEditFields] = useState<any>({});
  const [showRejectModal, setShowRejectModal] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [activeSubTab, setActiveSubTab] = useState<"formulir" | "penilaian">("formulir");
  const [revisionNotes, setRevisionNotes] = useState("");
  const [dispatchLog, setDispatchLog] = useState<{
    isOpen: boolean;
    applicantName: string;
    email: string;
    phone: string;
    status: "Lolos" | "Revisi" | "Ditolak";
    subject: string;
    emailBody: string;
    whatsappMessage: string;
  } | null>(null);

  // --- TAB 3: PEDIA DIRECTORY FILTER CHECKBOXES ---
  const [pediaSearch, setPediaSearch] = useState("");
  const [pediaWilayah, setPediaWilayah] = useState<string[]>([]);
  const [pediaProfesi, setPediaProfesi] = useState<string[]>([]);
  const [pediaKompetensi, setPediaKompetensi] = useState<string[]>([]);
  const [pediaMinat, setPediaMinat] = useState<string[]>([]);
  const [pediaOrgs, setPediaOrgs] = useState<string[]>([]);
  const [pediaGender, setPediaGender] = useState<string[]>([]);
  const [pediaUmur, setPediaUmur] = useState<string[]>([]);
  const [revealPasswords, setRevealPasswords] = useState<Record<number, boolean>>({});

  // --- TAB 4: SIAP KONTEN ---
  const [contentFilter, setContentFilter] = useState("Semua");
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "Berita", author: "Admin SIAP" });

  // --- TAB 5: SIAP DISKUSI ---
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(1);
  const [discussionMinutes, setDiscussionMinutes] = useState<Record<number, string>>({
    1: "Inisiasi program vokasi serta kesiapan BLK Bandung Barat untuk sertifikasi digital.",
    2: "Rekomendasi perda perlindungan adat masyarakat Lembang KBB."
  });
  const [pressReleaseDraft, setPressReleaseDraft] = useState("");

  // --- TAB 7: SIAP KTA ---
  const [selectedKtaId, setSelectedKtaId] = useState<number | null>(null);
  const [ktaCardColor, setKtaCardColor] = useState("bg-gradient-to-r from-amber-650 via-yellow-500 to-amber-700");
  const [ktaCardColorName, setKtaCardColorName] = useState("Gold Premium");
  const [ktaLayoutType, setKtaLayoutType] = useState<"landscape" | "portrait">("landscape");
  const [ktaTitle, setKtaTitle] = useState("KARTU TANDA ANGGOTA DIGITAL");
  const [ktaSub, setKtaSub] = useState("IKA PMII KABUPATEN BANDUNG BARAT");
  const [ktaBorderType, setKtaBorderType] = useState("border-amber-400");

  // --- TAB 8: SIAP AKUN ---
  const [accounts, setAccounts] = useState<any[]>([]);
  const [showSimulateDispatch, setShowSimulateDispatch] = useState<any | null>(null);
  const [dispatchType, setDispatchType] = useState<"whatsapp" | "email">("whatsapp");

  // --- TAB 9: WEBSITE CMS ---
  const [webColors, setWebColors] = useState({ primary: "#1E293B", accent: "#E2E8F0" });
  const [webHero, setWebHero] = useState("Pusat Layanan Transformasi Intelektual Alumni PMII KBB");
  const [webWelcomeHeader, setWebWelcomeHeader] = useState("IKATAN KELUARGA ALUMNI (IKA PMII) BANDUNG BARAT");
  const [webDropdowns, setWebDropdowns] = useState([
    { title: "Profil Organisasi", links: "Sejarah, Visi Misi, AD/ART" },
    { title: "Layanan Publikasi", links: "Opini Anggota, Berita Terkini, Jurnal Ilmiah" },
    { title: "Kemitraan", links: "Koperasi KAMARA, Yayasan KATARA" }
  ]);

  // Sync Accounts with verifiedAlumni
  useEffect(() => {
    const accList = verifiedAlumni.map(member => ({
      id: member.id,
      name: member.name,
      username: member.username || member.name.toLowerCase().replace(/\s+/g, ""),
      password: member.password || "pmii" + member.id + "@kbb",
      status: member.accountStatus || "Aktif",
      whatsapp: member.whatsapp || "082345678" + member.id,
      email: member.email || member.name.toLowerCase().replace(/\s+/g, "") + "@pmii.or.id"
    }));
    setAccounts(accList);
  }, [verifiedAlumni]);

  // Toggle filter lists helper
  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    if (list.includes(val)) {
      setList(list.filter(item => item !== val));
    } else {
      setList([...list, val]);
    }
  };

  // --- DYNAMIC COUNTS FOR OVERVIEW ---
  const totalAnggota = verifiedAlumni.length + pendingApplicants.length;
  const countByWilayah = verifiedAlumni.reduce((acc, current) => {
    acc[current.loc || "Lainnya"] = (acc[current.loc || "Lainnya"] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const countByProfesi = verifiedAlumni.reduce((acc, current) => {
    acc[current.prof || "Lainnya"] = (acc[current.prof || "Lainnya"] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const countByCompetency = verifiedAlumni.reduce((acc, current) => {
    const comp = current.kategoriKompetensi || current.compe || "Umum";
    acc[comp] = (acc[comp] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalBerita = bulletins.filter(b => b.category === "Berita").length;
  const totalPengumuman = bulletins.filter(b => b.category === "Pengumuman").length;
  const totalArtikel = bulletins.filter(b => b.category === "Artikel" || b.category === "Artikel & Jurnal").length;
  const totalOpini = bulletins.filter(b => b.category === "Opini").length;
  const totalDiskusi = discussionRooms.length;
  const totalAktivitasChat = 12482; // Mock total messages exchange
  const totalKtaProses = verifiedAlumni.length;

  // progressive creators metrics
  const progressiveCreators = [
    { name: "H. Saiful Rachman, M.Ag", posts: 14, categories: "Berita, Opini" },
    { name: "Lina Marlina, S.Ak", posts: 9, categories: "Artikel, Ekonomi" },
    { name: "Sandi Supyandi, S.Kom., M.H", posts: 7, categories: "Opini, Advokasi" },
    { name: "Kader Advokasi PMII KBB", posts: 5, categories: "Berita, Informasi" }
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Dynamic Floating Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 border ${
              notification.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
              notification.type === "error" ? "bg-red-50 border-red-200 text-red-800" :
              "bg-amber-50 border-amber-200 text-amber-800"
            }`}
          >
            {notification.type === "success" && <CheckCircle className="text-emerald-600" size={20} />}
            {notification.type === "error" && <AlertTriangle className="text-red-600" size={20} />}
            {notification.type === "info" && <Info className="text-amber-600" size={20} />}
            <span className="text-xs font-bold font-sans">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------------------- */}
      {/* TAB 1: RINGKASAN PORTAL                                           */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-fade-in">
          {/* Welcome Card Banner */}
          <div className="relative overflow-hidden bg-gradient-to-br from-primary to-slate-900 p-8 rounded-[2rem] text-white shadow-xl">
            <div className="absolute right-0 bottom-0 top-0 opacity-10 w-1/3 bg-no-repeat bg-right bg-contain" />
            <div className="relative z-10 space-y-2">
              <span className="text-xs bg-accent/25 text-accent font-extrabold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
                SIAP KBB PLATFORM
              </span>
              <h2 className="text-3xl font-display font-black tracking-tight mt-2">Ringkasan Ekosistem Portal SIAP</h2>
              <p className="text-sm text-slate-300 max-w-xl font-sans">
                Selamat Datang di Command Center Administrasi Ikatan Keluarga Alumni PMII Bandung Barat. Klik diagram atau metrik untuk bertransisi cepat ke fitur detail.
              </p>
            </div>
          </div>

          {/* Landscape Fitur: 1. Distribusi Anggota per Wilayah (Landscape Layout di bawah judul) */}
          <div 
            onClick={() => { setActiveTab("siap_pedia"); triggerNotification("Menavigasi ke SIAP Pedia wilayah"); }}
            className="bg-white p-8 rounded-[2rem] border border-gray-150/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5">
                <div className="p-4 bg-indigo-50 text-indigo-650 rounded-2xl group-hover:scale-110 transition-transform">
                  <Users size={28} />
                </div>
                <div>
                  <span className="text-[10px] text-indigo-600 font-extrabold tracking-widest bg-indigo-50 px-3 py-1 rounded-full uppercase">
                    PEMETAAN WILAYAH ALUMNI
                  </span>
                  <h3 className="text-2.5xl font-display font-black text-slate-800 tracking-tight mt-1.5">
                    {Object.keys(countByWilayah).length} Kecamatan Terkonsolidasi
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-sans font-medium">Klik panel landscape ini untuk memfilter data teritorial rinci di SIAP Pedia</p>
                </div>
              </div>

              {/* Landscape horizontal list of regions with counts */}
              <div className="flex flex-wrap gap-2.5 max-w-3xl bg-slate-50/60 p-4 rounded-2xl border border-gray-100/80 w-full lg:w-auto">
                {Object.entries(countByWilayah).slice(0, 7).map(([kec, num]) => (
                  <div key={kec} className="bg-white px-3 py-1.5 rounded-xl border border-gray-150 text-xs font-bold font-sans flex items-center gap-2 shadow-sm transition-all hover:border-indigo-200">
                    <span className="text-slate-700">{kec}</span>
                    <span className="bg-indigo-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md min-w-[20px] text-center">{num}</span>
                  </div>
                ))}
                {Object.keys(countByWilayah).length > 7 && (
                  <div className="bg-indigo-50 text-indigo-700 font-extrabold px-3 py-1.5 rounded-xl text-xs flex items-center">
                    +{Object.keys(countByWilayah).length - 7} Kecamatan Lainnya &rarr;
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
              <span className="text-[10px] text-slate-400 font-medium">Portal KBB &bull; Sistem Pemetaan Dewan &amp; Alumni</span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-600 hover:underline flex items-center gap-1">
                Akses SIAP Pedia Wilayah &rarr;
              </span>
            </div>
            
            {/* Ambient decorative gradient */}
            <div className="absolute right-0 bottom-0 top-0 w-48 bg-gradient-to-l from-indigo-50/15 to-transparent pointer-events-none" />
          </div>

          {/* Graphical Summary Cards Array (Other Stats Items Card Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {/* 2. Anggota berdasarkan Kategori Kompetensi */}
            <div 
              onClick={() => { setActiveTab("siap_pedia"); triggerNotification("Menavigasi ke SIAP Pedia Kompetensi"); }}
              className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-115 transition-transform font-bold">
                  <Layers size={20} />
                </div>
                <span className="text-[10px] text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md uppercase">Kompetensi</span>
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-black text-slate-800">{Object.keys(countByCompetency).length} Bidang</h4>
                <p className="text-xs text-slate-400 mt-1 font-medium font-sans">Kategori Keahlian Alumni</p>
                <div className="mt-3 text-[10px] uppercase font-bold text-amber-600 hover:underline">Periksa pemetaan &rarr;</div>
              </div>
            </div>

            {/* 3. Anggota berdasarkan Profesi */}
            <div 
              onClick={() => { setActiveTab("siap_pedia"); }}
              className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-sky-50 text-sky-600 rounded-xl group-hover:scale-115 transition-transform">
                  <ShieldIcon size={20} />
                </div>
                <span className="text-[10px] text-sky-500 font-bold bg-sky-50 px-2 py-0.5 rounded-md uppercase">Profesi</span>
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-black text-slate-800">{Object.keys(countByProfesi).length} Kluster</h4>
                <p className="text-xs text-slate-400 mt-1 font-medium font-sans">Pilar Jejaring Kerja Anggota</p>
                <div className="mt-3 text-[10px] uppercase font-bold text-sky-600 hover:underline">Buka filter profesi &rarr;</div>
              </div>
            </div>

            {/* 4. Berita Terbit */}
            <div 
              onClick={() => { setActiveTab("siap_konten"); }}
              className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-115 transition-transform">
                  <FileText size={20} />
                </div>
                <span className="text-[10px] text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded-md uppercase">Berita</span>
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-black text-slate-800">{totalBerita} Terbit</h4>
                <p className="text-xs text-slate-400 mt-1 font-medium font-sans">Kumpulan Berita Portal Harian</p>
                <div className="mt-3 text-[10px] uppercase font-bold text-emerald-600 hover:underline">Kurasi Berita &rarr;</div>
              </div>
            </div>

            {/* 5. Pengumuman Terbit */}
            <div 
              onClick={() => { setActiveTab("siap_konten"); }}
              className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:scale-115 transition-transform">
                  <Tag size={20} />
                </div>
                <span className="text-[10px] text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-md uppercase">Pengumuman</span>
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-black text-slate-800">{totalPengumuman} Terbit</h4>
                <p className="text-xs text-slate-400 mt-1 font-medium font-sans">Informasi & Pengumuman Publik</p>
                <div className="mt-3 text-[10px] uppercase font-bold text-red-600 hover:underline">Buka Pengumuman &rarr;</div>
              </div>
            </div>

            {/* 6. Artikel & Jurnal */}
            <div 
              onClick={() => { setActiveTab("siap_konten"); }}
              className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-violet-50 text-violet-600 rounded-xl group-hover:scale-115 transition-transform">
                  <BookIcon size={20} />
                </div>
                <span className="text-[10px] text-violet-500 font-bold bg-violet-50 px-2 py-0.5 rounded-md uppercase">Artikel & Jurnal</span>
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-black text-slate-800">{totalArtikel} Dokumen</h4>
                <p className="text-xs text-slate-400 mt-1 font-medium font-sans">Karya ilmiah & kajian akademis</p>
                <div className="mt-3 text-[10px] uppercase font-bold text-violet-600 hover:underline">Kelola literasi &rarr;</div>
              </div>
            </div>

            {/* 7. Opini Terbit */}
            <div 
              onClick={() => { setActiveTab("siap_konten"); }}
              className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-fuchsia-50 text-fuchsia-600 rounded-xl group-hover:scale-115 transition-transform">
                  <Edit3 size={20} />
                </div>
                <span className="text-[10px] text-fuchsia-500 font-bold bg-fuchsia-50 px-2 py-0.5 rounded-md uppercase">Opini</span>
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-black text-slate-800">{totalOpini} Terbit</h4>
                <p className="text-xs text-slate-400 mt-1 font-medium font-sans">Sudut pandang kritis kader</p>
                <div className="mt-3 text-[10px] uppercase font-bold text-fuchsia-600 hover:underline">Refleksi opini &rarr;</div>
              </div>
            </div>

            {/* 8. Ruang Diskusi */}
            <div 
              onClick={() => { setActiveTab("siap_diskusi"); }}
              className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-teal-50 text-teal-600 rounded-xl group-hover:scale-115 transition-transform">
                  <MessageSquare size={20} />
                </div>
                <span className="text-[10px] text-teal-500 font-bold bg-teal-50 px-2 py-0.5 rounded-md uppercase">Diskusi</span>
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-black text-slate-800">{totalDiskusi} Ruangan</h4>
                <p className="text-xs text-slate-400 mt-1 font-medium font-sans">Grup Diskusi Sedang Berjalan</p>
                <div className="mt-3 text-[10px] uppercase font-bold text-teal-600 hover:underline">Monitor Ruangan &rarr;</div>
              </div>
            </div>

            {/* 9. Interaksi Percakapan Chat */}
            <div 
              onClick={() => { setActiveTab("siap_chat"); }}
              className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-pink-50 text-pink-600 rounded-xl group-hover:scale-115 transition-transform font-bold">
                  <MessageCircle size={20} />
                </div>
                <span className="text-[10px] text-pink-500 font-bold bg-pink-50 px-2 py-0.5 rounded-md uppercase">Chat</span>
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-black text-slate-800">{totalAktivitasChat} Pesan</h4>
                <p className="text-xs text-slate-400 mt-1 font-medium font-sans">Intensitas Interaksi Obrolan</p>
                <div className="mt-3 text-[10px] uppercase font-bold text-pink-600 hover:underline">Akses Telemetri &rarr;</div>
              </div>
            </div>

            {/* 10. Akun Teraktif */}
            <div 
              onClick={() => { setActiveTab("siap_akun"); }}
              className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl group-hover:scale-115 transition-transform">
                  <Lock size={20} />
                </div>
                <span className="text-[10px] text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded-md uppercase">Kredensial</span>
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-black text-slate-800">{verifiedAlumni.length} Akun</h4>
                <p className="text-xs text-slate-400 mt-1 font-medium font-sans">Akun Terdaftar Aktif</p>
                <div className="mt-3 text-[10px] uppercase font-bold text-orange-600 hover:underline">Kelola Akses Login &rarr;</div>
              </div>
            </div>

            {/* 11. KTA Digital terbit */}
            <div 
              onClick={() => { setActiveTab("siap_kta"); }}
              className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl group-hover:scale-115 transition-transform">
                  <Award size={20} />
                </div>
                <span className="text-[10px] text-yellow-500 font-bold bg-yellow-50 px-2 py-0.5 rounded-md uppercase">KTA</span>
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-black text-slate-800">{totalKtaProses} Terbit</h4>
                <p className="text-xs text-slate-400 mt-1 font-medium font-sans">KTA Tergenerate Dalam Proses</p>
                <div className="mt-3 text-[10px] uppercase font-bold text-yellow-600 hover:underline">Cetak KTA Kartu &rarr;</div>
              </div>
            </div>

          </div>

          {/* Regional Demographic Chart Simulation + Progressive Content Creator Stats Column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Visual Progress Chart Demografis */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                <div>
                  <h3 className="text-lg font-black text-slate-800">Visualisasi Sebaran Anggota Cabang</h3>
                  <p className="text-xs text-gray-400">Total kader terkonfirmasi tiap Pengurus Anak Cabang (PAC) Kecamatan.</p>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-bold font-mono">
                  GRAFIK INTERAKTIF
                </span>
              </div>

              {/* Progress bars representing data graphically */}
              <div className="space-y-4">
                {[
                  { key: "Ngamprah", val: 412, percent: "100%", style: "bg-indigo-600" },
                  { key: "Padalarang", val: 345, percent: "83%", style: "bg-teal-600" },
                  { key: "Lembang", val: 289, percent: "70%", style: "bg-amber-600" },
                  { key: "Cipatat", val: 198, percent: "48%", style: "bg-rose-600" },
                  { key: "Cihampelas & Lainnya", val: 142, percent: "34%", style: "bg-slate-600" }
                ].map((row, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600 font-bold">{row.key}</span>
                      <span className="text-slate-800 font-black">{row.val} Anggota ({row.percent})</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: row.percent }}
                        transition={{ duration: 1 }}
                        className={`${row.style} h-full rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progressive Content Creator Column */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg space-y-6">
              <div className="pb-4 border-b border-gray-50">
                <h3 className="text-lg font-black text-slate-800">Kreator Ter-Progresif</h3>
                <p className="text-xs text-gray-400">Kontributor tulisan dan gagasan ilmiah terbanyak di portal IKA PMII.</p>
              </div>

              <div className="space-y-4">
                {progressiveCreators.map((creator, id) => (
                  <div 
                    key={id}
                    className="p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:bg-slate-50 transition-colors"
                  >
                    <div className="space-y-1 max-w-[70%]">
                      <p className="text-xs font-black text-slate-800 truncate">{creator.name}</p>
                      <span className="inline-block text-[9px] bg-slate-200/60 text-slate-600 font-extrabold px-1.5 py-0.5 rounded font-mono uppercase tracking-widest">{creator.categories}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base font-black text-primary leading-none">{creator.posts}</p>
                      <span className="text-[8px] text-gray-400 uppercase font-extrabold tracking-widest">Karya</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 2: VERIFIKASI ANGGOTA                                         */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "siap_verifikasi" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-display font-black text-primary leading-tight">Kurasi Berkas Calon Anggota</h3>
              <p className="text-xs text-gray-400">Verifikasi berkas isian dari halaman pendaftaran mandiri alumni pmii.</p>
            </div>
            <div className="shrink-0 bg-red-50 border border-red-100 text-red-600 text-xs font-black px-4 py-2 rounded-xl">
              {pendingApplicants.length} Berkas Menunggu Verifikasi
            </div>
          </div>

          {/* 1. Landscape Horizontal Queue Selector (Maksimal 6 Profil Singkat) */}
          <div className="space-y-3 bg-white p-6 rounded-[2rem] border border-gray-100">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Layers size={14} className="text-primary animate-pulse" /> Antrean Berkas Masuk (Landscape - Pilih Satu Per Satu)
              </h4>
              <span className="text-[10px] font-mono font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-full uppercase">
                Menampilkan {Math.min(pendingApplicants.length, 6)} dari {pendingApplicants.length} berkas
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {pendingApplicants.slice(0, 6).map((applicant) => {
                const isActive = selectedVerifyApplicant?.id === applicant.id;
                return (
                  <div
                    key={applicant.id}
                    onClick={() => {
                      setSelectedVerifyApplicant(applicant);
                      setActiveSubTab("formulir");
                      setRevisionNotes("");
                      setRejectReason("");
                    }}
                    className={`p-4 rounded-[1.750rem] border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between relative group ${
                      isActive 
                        ? "bg-slate-900 border-slate-900 text-white shadow-xl scale-[1.02] ring-4 ring-primary/10" 
                        : "bg-white border-slate-150 shadow-md hover:shadow-lg hover:border-slate-350 hover:-translate-y-0.5"
                    }`}
                  >
                    {/* Top Status Indicators */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      {applicant.auditStatus === "revisi" && (
                        <span className="text-[7px] bg-amber-505 bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">Revisi</span>
                      )}
                      {applicant.auditStatus === "ditolak" && (
                        <span className="text-[7px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded-full">Ditolak</span>
                      )}
                    </div>

                    {/* Image and Info */}
                    <div className="space-y-2 text-center flex flex-col items-center pt-2">
                      <img 
                        src={applicant.img} 
                        className={`w-12 h-12 rounded-full object-cover border-2 transition-transform duration-300 group-hover:scale-105 ${
                          isActive ? "border-accent shadow" : "border-slate-200"
                        }`}
                        alt={applicant.name} 
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-0.5">
                        <h5 className={`font-extrabold text-xs line-clamp-1 ${isActive ? "text-accent" : "text-slate-800"}`}>
                          {applicant.name}
                        </h5>
                        <p className={`text-[8px] uppercase tracking-wider font-mono line-clamp-1 ${isActive ? "text-slate-300" : "text-stone-400"}`}>
                          {applicant.prof}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Strip */}
                    <div className="mt-3 pt-2 border-t border-slate-100/10 flex justify-between items-center text-[8px] font-mono font-bold uppercase">
                      <span className={isActive ? "text-slate-300" : "text-slate-400"}>{applicant.loc}</span>
                      <span className={`px-1.5 py-0.5 rounded ${isActive ? "bg-accent/20 text-accent font-black" : "bg-slate-50 text-slate-600"}`}>
                        {applicant.year}
                      </span>
                    </div>
                  </div>
                );
              })}

              {pendingApplicants.length === 0 && (
                <div className="col-span-full py-10 text-center bg-slate-50 rounded-[2rem] border border-dashed border-gray-200">
                  <CheckCircle2 className="mx-auto text-emerald-500 mb-2" size={32} />
                  <p className="text-xs font-bold text-slate-500">Hebat! Seluruh berkas pendaftar telah tersaring tuntas.</p>
                </div>
              )}
            </div>
          </div>

          {/* 2. Tampilan Form Verifikasi (Full Width di Bawah Antrean) */}
          <div className="w-full">
            {selectedVerifyApplicant ? (
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl space-y-8">
                
                {/* Active Applicant Header Summary */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b border-slate-100 pb-6">
                  <div className="flex gap-4 items-center">
                    <img 
                      src={selectedVerifyApplicant.img} 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shadow" 
                      alt="" 
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-[9px] bg-primary text-accent font-black px-2.5 py-0.5 rounded font-mono uppercase">BERKAS AKTIF</span>
                      <h4 className="font-extrabold text-xl text-primary mt-1">{selectedVerifyApplicant.name}</h4>
                      <div className="flex gap-2 items-center flex-wrap mt-0.5">
                        <span className="text-[10px] text-slate-400 font-mono font-bold">Tahun Kaderisasi: {selectedVerifyApplicant.year}</span>
                        {selectedVerifyApplicant.auditStatus === "revisi" && (
                          <span className="text-[9px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">Butuh Perbaikan</span>
                        )}
                        {selectedVerifyApplicant.auditStatus === "ditolak" && (
                          <span className="text-[9px] bg-red-105 text-red-700 font-bold px-2 py-0.5 rounded-full">Ditolak Verifikator</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SUBTAB SELECTOR */}
                  <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-full sm:w-auto self-stretch sm:self-center">
                    <button
                      onClick={() => setActiveSubTab("formulir")}
                      className={`flex-1 sm:flex-initial px-5 py-2.5 text-[10px] font-black rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        activeSubTab === "formulir"
                          ? "bg-white text-primary shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      📋 FORMULIR PENDAFTARAN
                    </button>
                    <button
                      onClick={() => setActiveSubTab("penilaian")}
                      className={`flex-1 sm:flex-initial px-5 py-2.5 text-[10px] font-black rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        activeSubTab === "penilaian"
                          ? "bg-white text-primary shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      ⚖️ KONFIRMASI MANDIRI ({Object.keys(fieldStatuses[selectedVerifyApplicant.id] || {}).length} Dinilai)
                    </button>
                  </div>
                </div>

                {activeSubTab === "formulir" ? (
                  /* 📋 GRANULAR ASSESSMENT FIELDS FORMULIR (POINT 3 & 4) */
                  <div className="space-y-8">
                    
                    {/* Inline field renderer block */}
                    {(() => {
                      const applicantId = selectedVerifyApplicant.id;
                      
                      const renderFieldControl = (fieldKey: string, fieldLabel: string, defaultValue: string, iconEl: React.ReactNode) => {
                        const curStatus = fieldStatuses[applicantId]?.[fieldKey];
                        const val = fieldOverrides[applicantId]?.[fieldKey] ?? defaultValue;

                        const statusConfig: Record<string, { bg: string; text: string; label: string; border: string }> = {
                          oke: { bg: "bg-emerald-50/70", text: "text-emerald-700", label: "✓ VALID / OKE", border: "border-emerald-200" },
                          edit: { bg: "bg-sky-50/70", text: "text-sky-700", label: "✏️ SEDANG DIEDIT", border: "border-sky-200" },
                          perbaiki: { bg: "bg-amber-50/70", text: "text-amber-800", label: "⚠️ BUTUH PERBAIKAN", border: "border-amber-200" },
                          tolak: { bg: "bg-red-50/70", text: "text-red-700", label: "✗ TIDAK VALID", border: "border-red-200" }
                        };

                        const currentConfig = curStatus 
                          ? statusConfig[curStatus] 
                          : { bg: "bg-slate-50/40", text: "text-slate-400", label: "Belum Dinilai", border: "border-slate-100" };

                        return (
                          <div className={`p-4 rounded-2xl border transition-all ${currentConfig.bg} ${currentConfig.border} flex flex-col justify-between gap-3 group/field shadow-sm hover:shadow-md hover:border-slate-300 duration-200`}>
                            {/* Top info and values */}
                            <div className="space-y-2 w-full">
                              <div className="flex justify-between items-center gap-2 flex-wrap pb-2 border-b border-dashed border-slate-200/50">
                                <div className="flex items-center gap-2">
                                  {iconEl}
                                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">{fieldLabel}</span>
                                </div>
                                <span className={`text-[8px] font-black px-2.5 py-0.5 rounded-full ${currentConfig.bg} ${currentConfig.text} border border-current/10 font-mono`}>
                                  {currentConfig.label}
                                </span>
                              </div>

                              {curStatus === "edit" ? (
                                <div className="flex gap-2 mt-2 max-w-xl">
                                  <input
                                    type="text"
                                    className="bg-white border-2 border-sky-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 flex-grow focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={val}
                                    onChange={(e) => {
                                      setFieldOverrides({
                                        ...fieldOverrides,
                                        [applicantId]: {
                                          ...(fieldOverrides[applicantId] || {}),
                                          [fieldKey]: e.target.value
                                        }
                                      });
                                    }}
                                  />
                                  <button
                                    onClick={() => {
                                      setFieldStatuses({
                                        ...fieldStatuses,
                                        [applicantId]: {
                                          ...(fieldStatuses[applicantId] || {}),
                                          [fieldKey]: "oke"
                                        }
                                      });
                                      triggerNotification(`Berhasil update ${fieldLabel}!`);
                                    }}
                                    className="bg-primary text-white text-[9px] font-black px-4 py-1.5 rounded-xl uppercase hover:bg-primary/90 transition-all cursor-pointer shadow-sm"
                                  >
                                    Simpan
                                  </button>
                                </div>
                              ) : (
                                <p className="font-extrabold text-[13px] text-slate-800 leading-relaxed pl-1">
                                  {val || <span className="text-slate-400 font-normal italic">Tidak ada data</span>}
                                </p>
                              )}
                            </div>

                            {/* Bottom Assessment Toolbar (neatly placed below) */}
                            <div className="pt-2 border-t border-slate-200/40 flex flex-wrap gap-1.5 items-center justify-end">
                              <span className="text-[8px] font-mono font-black text-slate-400 mr-auto uppercase tracking-wider">Penilaian Kolom:</span>
                              
                              <button
                                onClick={() => {
                                  setFieldStatuses({
                                    ...fieldStatuses,
                                    [applicantId]: {
                                      ...(fieldStatuses[applicantId] || {}),
                                      [fieldKey]: "oke"
                                    }
                                  });
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase transition-all duration-150 flex items-center gap-1 cursor-pointer hover:scale-[1.03] active:scale-95 ${
                                  curStatus === "oke"
                                    ? "bg-emerald-600 text-white shadow-sm font-black border border-emerald-600"
                                    : "bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-100"
                                }`}
                              >
                                ✓ Oke
                              </button>

                              <button
                                onClick={() => {
                                  setFieldStatuses({
                                    ...fieldStatuses,
                                    [applicantId]: {
                                      ...(fieldStatuses[applicantId] || {}),
                                      [fieldKey]: "edit"
                                    }
                                  });
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase transition-all duration-150 flex items-center gap-1 cursor-pointer hover:scale-[1.03] active:scale-95 ${
                                  curStatus === "edit"
                                    ? "bg-sky-600 text-white shadow-sm font-black border border-sky-600"
                                    : "bg-white hover:bg-sky-50 text-sky-600 border border-sky-100"
                                }`}
                              >
                                ✏️ Edit
                              </button>

                              <button
                                onClick={() => {
                                  setFieldStatuses({
                                    ...fieldStatuses,
                                    [applicantId]: {
                                      ...(fieldStatuses[applicantId] || {}),
                                      [fieldKey]: "perbaiki"
                                    }
                                  });
                                  triggerNotification(`Saran perbaikan untuk ${fieldLabel} ditandai!`, "info");
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase transition-all duration-150 flex items-center gap-1 cursor-pointer hover:scale-[1.03] active:scale-95 ${
                                  curStatus === "perbaiki"
                                    ? "bg-amber-500 text-slate-900 shadow-sm font-black border border-amber-500"
                                    : "bg-white hover:bg-amber-50 text-amber-600 border border-amber-100"
                                }`}
                              >
                                ⚠️ Perbaiki
                              </button>

                              <button
                                onClick={() => {
                                  setFieldStatuses({
                                    ...fieldStatuses,
                                    [applicantId]: {
                                      ...(fieldStatuses[applicantId] || {}),
                                      [fieldKey]: "tolak"
                                    }
                                  });
                                  triggerNotification(`Data ${fieldLabel} dinilai fiktif / tidak valid!`, "error");
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase transition-all duration-150 flex items-center gap-1 cursor-pointer hover:scale-[1.03] active:scale-95 ${
                                  curStatus === "tolak"
                                    ? "bg-red-600 text-white shadow-sm font-black border border-red-650"
                                    : "bg-white hover:bg-red-50 text-red-650 border border-red-100"
                                }`}
                              >
                                ✗ Tolak
                              </button>
                            </div>
                          </div>
                        );
                      };

                      return (
                        <div className="space-y-6">
                          
                          {/* BIODATA */}
                          <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
                            <h5 className="font-black text-primary text-[10px] uppercase tracking-widest flex items-center gap-2 border-b border-slate-200/50 pb-2">
                              <Users size={14} className="text-accent" /> 1. Biodata Sesuai KTP & Domisili
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {renderFieldControl("nik", "Nomor NIK (KTP)", selectedVerifyApplicant.nik || "32170XXXXXXXXXXX", <ShieldCheck size={13} className="text-primary" />)}
                              {renderFieldControl("name", "Nama Lengkap", selectedVerifyApplicant.name, <Users size={13} className="text-primary" />)}
                              {renderFieldControl("gender", "Jenis Kelamin", selectedVerifyApplicant.gender || "Laki-laki", <Users size={13} className="text-purple-500" />)}
                              {renderFieldControl("ttl", "Tempat/Tgl Lahir", `${selectedVerifyApplicant.birthPlace || selectedVerifyApplicant.pob || "Bandung Barat"}, ${selectedVerifyApplicant.birthDate || selectedVerifyApplicant.dob || "2000-01-01"}`, <FileText size={13} className="text-amber-500" />)}
                              {renderFieldControl("address", "Alamat Tinggal", selectedVerifyApplicant.address || "Jl. Raya Ngamprah KBB", <Globe size={13} className="text-emerald-500" />)}
                              {renderFieldControl("loc", "Kecamatan Domisili", selectedVerifyApplicant.loc || "Ngamprah", <Globe size={13} className="text-indigo-500" />)}
                            </div>
                          </div>

                          {/* KONTAK */}
                          <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
                            <h5 className="font-black text-primary text-[10px] uppercase tracking-widest flex items-center gap-2 border-b border-slate-200/50 pb-2">
                              <Mail size={14} className="text-sky-505" /> 2. Rincian Kontak Utama
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {renderFieldControl("email", "Email Aktif", selectedVerifyApplicant.email || "alumni@pmii.org", <Mail size={13} className="text-red-400" />)}
                              {renderFieldControl("whatsapp", "No. WhatsApp", selectedVerifyApplicant.whatsapp || selectedVerifyApplicant.phone || "08123456789", <MessageCircle size={13} className="text-emerald-500" />)}
                            </div>
                          </div>

                          {/* PMII PEDIA */}
                          <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
                            <h5 className="font-black text-primary text-[10px] uppercase tracking-widest flex items-center gap-2 border-b border-slate-200/50 pb-2">
                              <Award size={14} className="text-amber-500" /> 3. Jenjang Kaderisasi & Pendidikan
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {renderFieldControl("lastEdu", "Pendidikan Terakhir", selectedVerifyApplicant.lastEdu || "S1 Sarjana", <BookOpen size={13} className="text-blue-500" />)}
                              {renderFieldControl("komisariat", "Asal Komisariat", selectedVerifyApplicant.komisariat || "PC PMII Bandung Barat", <Award size={13} className="text-yellow-500" />)}
                              {renderFieldControl("kaderisasi", "Kaderisasi PMII", typeof selectedVerifyApplicant.kaderisasi === "string" ? selectedVerifyApplicant.kaderisasi : (selectedVerifyApplicant.kaderisasi?.pkl ? "PKL (Kader Utama)" : "PKD (Kader Madya)"), <Award size={13} className="text-indigo-600" />)}
                            </div>
                          </div>

                          {/* PROFESIONAL */}
                          <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
                            <h5 className="font-black text-primary text-[10px] uppercase tracking-widest flex items-center gap-2 border-b border-slate-200/50 pb-2">
                              <FileText size={14} className="text-indigo-500" /> 4. Profil Kompetensi & Organisasi Lain
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {renderFieldControl("prof", "Profesi Sekarang", selectedVerifyApplicant.prof, <FileText size={13} className="text-teal-500" />)}
                              {renderFieldControl("orgs", "Organisasi Lain", Array.isArray(selectedVerifyApplicant.orgs) ? selectedVerifyApplicant.orgs.join(", ") : (selectedVerifyApplicant.orgs || "KADIN, Karang Taruna"), <CheckCircle2 size={13} className="text-slate-400" />)}
                            </div>
                          </div>

                        </div>
                      );
                    })()}

                    {/* DECISION-MAKING BOTTOM GRID (POINT 4) */}
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] space-y-6 shadow-xl relative border-t-4 border-accent">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center font-black">
                          <CheckCircle2 size={20} />
                        </div>
                        <div>
                          <span className="text-[9px] text-accent font-black tracking-widest uppercase block font-mono">Verifikasi Mandiri Penutup</span>
                          <h4 className="text-lg font-display font-black italic">Tingkat Tindak Lanjut Evaluasi Berkas</h4>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                        Setelah melakukan peninjauan terhadap setiap kolom di atas, buatlah kesimpulan verifikasi. Menolak atau meminta perbaikan data otomatis mengompilasi item bertanda "Perbaiki / Tolak" di atas dan menyiapkan simulator pengirim pesan Whatsapp & Email.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        {/* 1. LOLOS VERIFIKASI (Terbitkan akun) */}
                        <button
                          onClick={() => {
                            const overrides = fieldOverrides[selectedVerifyApplicant.id] || {};
                            const finalRecord = {
                              ...selectedVerifyApplicant,
                              ...overrides,
                              accountStatus: "Aktif",
                              id: 100 + verifiedAlumni.length + 1,
                              username: (overrides.name || selectedVerifyApplicant.name).toLowerCase().replace(/\s+/g, ""),
                              password: "pmii" + (100 + verifiedAlumni.length + 1) + "@kbb",
                              alumniYear: overrides.year || selectedVerifyApplicant.year,
                              kaderisasi: typeof selectedVerifyApplicant.kaderisasi === "string"
                                ? selectedVerifyApplicant.kaderisasi
                                : selectedVerifyApplicant.kaderisasi?.pkl
                                ? "Kader Utama"
                                : selectedVerifyApplicant.kaderisasi?.pkd
                                ? "Kader Madya"
                                : "Kader Pratama"
                            };

                            setVerifiedAlumni([...verifiedAlumni, finalRecord]);
                            setPendingApplicants(pendingApplicants.filter(a => a.id !== selectedVerifyApplicant.id));
                            setSelectedVerifyApplicant(null);

                            const emailSubject = `[SIAP IKA PMII KBB] Selamat! Akun Anggota Anda Telah Aktif`;
                            const emailBody = `Halo Sahabat ${finalRecord.name},\n\nKami menginformasikan bahwa berkas formulir pendaftaran Anda telah dinilai dan dinyatakan LOLOS VERIFIKASI oleh admin Sistem Informasi Anggota Profesional (SIAP) PC IKA PMII Bandung Barat.\n\nAkun Anda kini telah aktif dan terdaftar di database direktori utama alumni.\n\nLuncurkan Dashboard Member Anda menggunakan akun berikut:\nUsername: ${finalRecord.username}\nPassword: ${finalRecord.password}\n\nSalam Pergerakan,\nAdmin SIAP IKA PMII Bandung Barat`;
                            const waMsg = `Halo Sahabat ${finalRecord.name}, Selamat! Berkas pendaftaran Anda dinyatakan LOLOS VERIFIKASI oleh Admin SIAP IKA PMII Bandung Barat. Akun Anda telah aktif di direktori alumni. Username Login: ${finalRecord.username}. Terimakasih!`;

                            setDispatchLog({
                              isOpen: true,
                              applicantName: finalRecord.name,
                              email: finalRecord.email || "alumni@pmii.org",
                              phone: finalRecord.whatsapp || finalRecord.phone || "08123456789",
                              status: "Lolos",
                              subject: emailSubject,
                              emailBody: emailBody,
                              whatsappMessage: waMsg
                            });
                            triggerNotification("Terbit akun sukses! Menampilkan log simulator outbox.", "success");
                          }}
                          className="py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <CheckCircle size={15} /> Setujui & Loloskan Verifikasi
                        </button>

                        {/* 2. MINTA REVISI */}
                        <button
                          onClick={() => {
                            const statuses = fieldStatuses[selectedVerifyApplicant.id] || {};
                            const issues: string[] = [];
                            const fieldNames: Record<string, string> = {
                              nik: "KTP / NIK",
                              name: "Nama Lengkap",
                              gender: "Jenis Kelamin",
                              ttl: "Tempat / Tanggal Lahir",
                              address: "Alamat Lengkap KTP",
                              loc: "Kecamatan Domisili",
                              email: "Email Aktif",
                              whatsapp: "No WhatsApp",
                              lastEdu: "Pendidikan Terakhir",
                              komisariat: "Asal Komisariat",
                              kaderisasi: "Riwayat Kaderisasi",
                              prof: "Profesi",
                              orgs: "Organisasi Lain"
                            };

                            Object.entries(statuses).forEach(([k, stat]) => {
                              if (stat === "perbaiki" || stat === "tolak") {
                                issues.push(fieldNames[k] || k);
                              }
                            });

                            let finalSummary = "Mohon melengkapi berkas pendaftaran dengan benar.";
                            if (issues.length > 0) {
                              finalSummary = `Terdapat data isian yang dinilai belum sesuai: ${issues.join(", ")}. Mohon perbaiki berkas ini.`;
                            }

                            setRevisionNotes(finalSummary);
                            setActiveSubTab("penilaian");
                            triggerNotification("Kompilasi isian perbaikan selesai! Silakan review di tab keputusan.", "info");
                          }}
                          className="py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <AlertTriangle size={15} /> Minta Perbaikan (Revisi)
                        </button>

                        {/* 3. TOLAK KONSEKUENSI */}
                        <button
                          onClick={() => {
                            setRevisionNotes("Mohon maaf, berkas Anda dinyatakan ditolak karena tidak memenuhi kriteria validitas alumni IKA PMII Bandung Barat.");
                            setActiveSubTab("penilaian");
                            triggerNotification("Mempersiapkan konfirmasi penolakan", "error");
                          }}
                          className="py-4 bg-red-650 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <X size={15} /> Tolak Berkas
                        </button>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* ⚖️ DECISION CONFIRMATION PAGE & SIMULATED LIVE DISPATCH (POINT 4) */
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-105 space-y-4">
                      
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="text-amber-500 animate-bounce" size={18} />
                        <h4 className="font-display font-black text-slate-800 text-sm uppercase">Konfirmasi Notifikasi Pengiriman Berkas</h4>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                        Gunakan kolom catatan di bawah untuk memodifikasi pesan koreksi yang akan otomatis dimuat ke dalam platform SMS, WhatsApp REST API, dan notifikasi email SMTP ke pendaftar.
                      </p>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Catatan Kritik / Koreksi Formulir</label>
                        <textarea
                          className="w-full bg-white border border-slate-200 rounded-2xl p-4 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]"
                          placeholder="Masukkan rincian item data yang harus diperbaiki oleh pendaftar..."
                          value={revisionNotes}
                          onChange={(e) => setRevisionNotes(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-3">
                        
                        {/* MINTA REVISI SUBMIT */}
                        <button
                          onClick={() => {
                            const note = revisionNotes.trim() || "Mohon koreksi data KTP atau bukti kaderisasi Anda.";
                            
                            // update status list with notes
                            setPendingApplicants(pendingApplicants.map(a => a.id === selectedVerifyApplicant.id ? { ...a, auditStatus: "revisi", notes: note } : a));
                            setSelectedVerifyApplicant(null);

                            const phoneTarget = selectedVerifyApplicant.whatsapp || selectedVerifyApplicant.phone || "08123456789";

                            const emailSubject = `[SIAP IKA PMII KBB] Permintaan Perbaikan Isian Data Formulir`;
                            const emailBody = `Halo Sahabat ${selectedVerifyApplicant.name},\n\nBerkas pendaftaran Anda telah ditinjau oleh tim verifikator SIAP PC IKA PMII Bandung Barat. Berdasarkan hasil tinjauan, terdapat beberapa data isian yang butuh diperbaiki/dilengkapi:\n\nCatatan Koreksi Admin:\n- ${note}\n\nMohon masuk kembali ke tautan pendaftaran atau hubungi sekretariat dengan membalas pesan ini membawa berkas perbaikan data agar tim verifikator dapat segera menindaklanjuti.\n\nSalam Pergerakan,\nAdmin SIAP IKA PMII Bandung Barat`;
                            const waText = `Halo Sahabat ${selectedVerifyApplicant.name}, berkas pendaftaran Anda di SIAP IKA PMII Bandung Barat memerlukan PERBAIKAN DATA. Koreksi: ${note}. Mohon kunjungi tautan portal untuk merevisi data. Terima kasih!`;

                            setDispatchLog({
                              isOpen: true,
                              applicantName: selectedVerifyApplicant.name,
                              email: selectedVerifyApplicant.email || "alumni@pmii.org",
                              phone: phoneTarget,
                              status: "Revisi",
                              subject: emailSubject,
                              emailBody: emailBody,
                              whatsappMessage: waText
                            });
                            triggerNotification("Memperbarui status pendaftaran menjadi REVISI.", "info");
                          }}
                          className="flex-1 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Send size={14} /> Kirim Pesan & Minta Perbaikan via WhatsApp/Email
                        </button>

                        {/* TOLAK SUBMIT */}
                        <button
                          onClick={() => {
                            const reason = revisionNotes.trim() || "Maaf, berkas dinilai fiktif atau tidak valid.";
                            
                            setPendingApplicants(pendingApplicants.map(a => a.id === selectedVerifyApplicant.id ? { ...a, auditStatus: "ditolak", notes: reason } : a));
                            setSelectedVerifyApplicant(null);

                            const phoneTarget = selectedVerifyApplicant.whatsapp || selectedVerifyApplicant.phone || "08123456789";

                            const emailSubject = `[SIAP IKA PMII KBB] Mohon Maaf, Berkas Pendaftaran Belum Memenuhi Kriteria`;
                            const emailBody = `Halo Sahabat ${selectedVerifyApplicant.name},\n\nMohon maaf, berkas pendaftaran calon anggota profesional yang Anda isi melalui Sistem Informasi Anggota Profesional (SIAP) belum memenuhi kriteria keanggotaan PC IKA PMII Bandung Barat saat ini.\n\nAlasan Penolakan:\n- ${reason}\n\nJika Anda merasa terjadi kesalahpahaman data administratif ini, silakan hubungi kesekretariat alumni.\n\nSalam Pergerakan,\nPC IKA PMII Bandung Barat`;
                            const waText = `Halo Sahabat ${selectedVerifyApplicant.name}, Mohon maaf berkas pendaftaran Anda untuk SIAP IKA PMII Bandung Barat BELUM LOLOS verifikasi dengan alasan: ${reason}. Silakan hubungi kesekretariatan untuk info lanjut.`;

                            setDispatchLog({
                              isOpen: true,
                              applicantName: selectedVerifyApplicant.name,
                              email: selectedVerifyApplicant.email || "alumni@pmii.org",
                              phone: phoneTarget,
                              status: "Ditolak",
                              subject: emailSubject,
                              emailBody: emailBody,
                              whatsappMessage: waText
                            });
                            triggerNotification("Pendaftaran ditolak. Simulator dispatch aktif.", "error");
                          }}
                          className="flex-1 py-3.5 bg-red-650 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <X size={14} /> Tolak Berkas & Kirim Mail Konfirmasi Penolakan
                        </button>

                      </div>

                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-16 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-gray-150 shadow-inner flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-black">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Pilih Calon Anggota</h4>
                  <p className="text-xs text-slate-400 max-w-md mt-1">
                    Silakan klik salah satu kartu calon penderitaterdaftar pada barisan landscape di atas untuk memuat berkas formulir dan memberikan penilaian instan.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 3: ADMIN SIAP PEDIA (Database Verified alumni with directory Checkboxes) */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "siap_pedia" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-display font-black text-primary">Akses Direktori Utama Alumni (SIAP Pedia)</h3>
              <p className="text-xs text-gray-400">Analisis profil, penyaringan dengan multi-checkbox, dan deteksi akun aman.</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setPediaWilayah([]); setPediaProfesi([]); setPediaKompetensi([]); 
                  setPediaMinat([]); setPediaOrgs([]); setPediaGender([]); setPediaUmur([]);
                  triggerNotification("Saringan berhasil direset!");
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs"
              >
                Reset Saringan
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Checkboxes Sidebar Area */}
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-md space-y-6 text-xs max-h-[80vh] overflow-y-auto custom-scrollbar">
              <h4 className="font-extrabold text-sm text-primary uppercase pb-2 border-b border-gray-50 flex items-center gap-2">
                <Search size={16} /> Checkbox Saringan
              </h4>

              {/* 1. Wilayah Kecamatan */}
              <div className="space-y-2">
                <p className="font-black text-slate-400 uppercase tracking-wider text-[10px]">Kecamatan KBB</p>
                {["Ngamprah", "Padalarang", "Cipatat", "Lembang", "Cisarua", "Parongpong", "Batujajar"].map((w) => (
                  <label key={w} className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" 
                      checked={pediaWilayah.includes(w)}
                      onChange={() => toggleFilter(pediaWilayah, setPediaWilayah, w)}
                    />
                    <span>{w}</span>
                  </label>
                ))}
              </div>

              {/* 2. Profesi */}
              <div className="space-y-2 pt-2 border-t border-gray-50">
                <p className="font-black text-slate-400 uppercase tracking-wider text-[10px]">Kluster Profesi</p>
                {["Akademisi", "Praktisi Hukum", "Wirausaha", "Guru", "Mahasiswa", "PNS", "Wiraswasta", "Ekonomi"].map((p) => (
                  <label key={p} className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" 
                      checked={pediaProfesi.includes(p)}
                      onChange={() => toggleFilter(pediaProfesi, setPediaProfesi, p)}
                    />
                    <span>{p}</span>
                  </label>
                ))}
              </div>

              {/* 3. Kompetensi */}
              <div className="space-y-2 pt-2 border-t border-gray-50">
                <p className="font-black text-slate-400 uppercase tracking-wider text-[10px]">Kategori Kompetensi</p>
                {["IT", "Ekonomi", "Hukum", "Pendidikan", "Sosial", "Keagamaan", "Ekonomi Madani", "Ulama"].map((c) => (
                  <label key={c} className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" 
                      checked={pediaKompetensi.includes(c)}
                      onChange={() => toggleFilter(pediaKompetensi, setPediaKompetensi, c)}
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>

              {/* 4. Minat Kolaborasi */}
              <div className="space-y-2 pt-2 border-t border-gray-50">
                <p className="font-black text-slate-400 uppercase tracking-wider text-[10px]">Minat Sinergi</p>
                {["Bisnis", "Advokasi", "Keagamaan", "Riset", "Sosial"].map((m) => (
                  <label key={m} className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" 
                      checked={pediaMinat.includes(m)}
                      onChange={() => toggleFilter(pediaMinat, setPediaMinat, m)}
                    />
                    <span>{m}</span>
                  </label>
                ))}
              </div>

            </div>

            {/* Results Grid List */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between border border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <Search size={16} className="text-gray-400" />
                  <input 
                    className="bg-transparent border-none focus:outline-none focus:ring-0 font-bold placeholder-stone-400" 
                    placeholder="Ketik kata kunci nama..."
                    value={pediaSearch}
                    onChange={(e) => setPediaSearch(e.target.value)}
                  />
                </div>
                <span className="font-mono text-gray-400 text-[10px] uppercase font-black">Interactive Query Engine</span>
              </div>

              {/* Verified member listing cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
                {verifiedAlumni
                  .filter(m => !pediaSearch || m.name.toLowerCase().includes(pediaSearch.toLowerCase()))
                  .filter(m => pediaWilayah.length === 0 || pediaWilayah.some(w => m.loc?.toLowerCase().includes(w.toLowerCase())))
                  .filter(m => pediaProfesi.length === 0 || pediaProfesi.some(pf => m.prof?.toLowerCase().includes(pf.toLowerCase())))
                  .filter(m => pediaKompetensi.length === 0 || pediaKompetensi.some(comp => {
                    const c = m.kategoriKompetensi || m.compe || "Umum";
                    return c.toLowerCase().includes(comp.toLowerCase());
                  }))
                  .map((member) => (
                    <div 
                      key={member.id}
                      className="bg-white p-6 rounded-[1.75rem] border border-gray-100 shadow-md space-y-4 text-xs hover:shadow-lg transition-all"
                    >
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-650 flex items-center justify-center font-extrabold font-mono text-sm uppercase shrink-0">
                          {member.name.substring(0, 2)}
                        </div>
                        <div>
                          <h4 className="font-black text-sm text-slate-800">{member.name}</h4>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">{member.loc || "KBB"} &bull; {member.alumniYear || member.year}</span>
                        </div>
                      </div>

                      <div className="space-y-2 p-3.5 bg-slate-50/50 rounded-xl border border-stone-100">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Kompetensi:</span>
                          <span className="font-bold text-slate-800 font-mono">{member.kategoriKompetensi || member.compe || "Ekonomi/Sains"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Profesi:</span>
                          <span className="font-bold text-slate-800 truncate max-w-[120px]">{member.prof || "Akademisi"}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-1.5 rounded border border-gray-100">
                          <span className="font-bold text-slate-700 text-[10px]">Username:</span>
                          <span className="font-mono font-black text-rose-700 text-[10px]">{member.name.toLowerCase().replace(/\s+/g, "")}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-1.5 rounded border border-gray-100 mt-1">
                          <span className="font-bold text-slate-600 text-[10px]">Password:</span>
                          <div className="flex items-center gap-1">
                            <span className="font-mono font-black text-stone-700 text-[10px]">
                              {revealPasswords[member.id] ? (member.password || "pmii"+member.id+"@kbb") : "•••••••••"}
                            </span>
                            <button 
                              onClick={() => setRevealPasswords({ ...revealPasswords, [member.id]: !revealPasswords[member.id] })}
                              className="text-gray-400 hover:text-slate-700 focus:outline-none"
                            >
                              🔍
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 4: ADMIN SIAP KONTEN                                         */ }
      {/* ----------------------------------------------------------------- */}
      {activeTab === "siap_konten" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-display font-black text-primary">Manajemen Berita & Publikasi Anggota</h3>
              <p className="text-xs text-gray-400">Kurasi, sunting, setujui tulisan karya alumni, atau buat rilis informasi publik.</p>
            </div>
            {/* Filter buttons */}
            <div className="flex gap-1.5 flex-wrap">
              {["Semua", "Berita", "Opini", "Artikel", "Pengumuman"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setContentFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    contentFilter === cat ? "bg-primary text-accent text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Member Created Submission List */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Karya Menunggu Kurasi</h4>
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {submittedContents
                  .filter(c => contentFilter === "Semua" || c.category === contentFilter)
                  .map((post) => (
                    <div key={post.id} className="bg-white p-6 rounded-[1.75rem] border border-gray-100 shadow-md space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono font-black uppercase tracking-wider">{post.category}</span>
                          <h4 className="font-black text-slate-800 text-sm mt-1.5">{post.title}</h4>
                        </div>
                        <span className="text-[10px] text-zinc-400 tracking-tight shrink-0">{post.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-sans">{post.content}</p>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-slate-50 text-[11px] font-bold">
                        <span className="text-slate-600">Oleh: <span className="text-slate-800 font-extrabold">{post.author}</span></span>
                        
                        <div className="flex gap-2 text-xs">
                          {post.status === "Menunggu Kurasi" ? (
                            <>
                              <button
                                onClick={() => {
                                  setSubmittedContents(submittedContents.map(c => c.id === post.id ? { ...c, status: "Diterbitkan" } : c));
                                  setBulletins([...bulletins, { id: bulletins.length+1, title: post.title, date: post.date, author: post.author, category: post.category === "Pikiran Kritis" ? "Opini" : post.category, content: post.content }]);
                                  triggerNotification("Karya alumni disetujui terbitkan!");
                                }}
                                className="bg-emerald-600 text-white font-extrabold px-3 py-1.5 rounded-lg"
                              >
                                Terbitkan
                              </button>
                              <button
                                onClick={() => {
                                  setSubmittedContents(submittedContents.filter(c => c.id !== post.id));
                                  triggerNotification("Berkas tulisan didelete curations");
                                }}
                                className="bg-rose-50 text-rose-700 px-2.5 py-1.5 rounded-lg border border-rose-100 font-bold"
                              >
                                Tolak
                              </button>
                            </>
                          ) : (
                            <span className="text-emerald-600 flex items-center gap-1 font-black">
                              &bull; Berhasil Terbit
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Direct Admin Publication Writer Form */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg space-y-6">
              <h3 className="text-lg font-black text-primary border-b border-gray-50 pb-3 flex items-center gap-2">
                <Plus size={20} className="text-accent" /> Editor Formulir Rilis Resmi Admin SIAP
              </h3>

              <div className="space-y-4 text-xs font-sans">
                <div className="space-y-1">
                  <label className="font-bold text-gray-500">Judul Informasi / Kabar Utama</label>
                  <input 
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold focus:ring-1 focus:ring-primary" 
                    placeholder="Contoh: Konsolidasi Strategis Pendidikan Menuju Transformasi..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500">Kategori Publikasi</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold"
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    >
                      <option value="Berita">Rilis Berita</option>
                      <option value="Pengumuman">Pengumuman Resmi</option>
                      <option value="Artikel">Artikel & Karya Ilmiah</option>
                      <option value="Opini">Opini Anggota</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500">Author</label>
                    <input 
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold"
                      value={newPost.author}
                      onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-500">Isi Naskah / Informasi Detail</label>
                  <textarea 
                    rows={6}
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 leading-relaxed focus:ring-1 focus:ring-primary focus:outline-none" 
                    placeholder="Tuliskan naskah lengkap rilis kabar pmii di sini..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  />
                </div>

                <button
                  onClick={() => {
                    if (!newPost.title || !newPost.content) {
                      triggerNotification("Judul dan Konten wajib diisi!", "error");
                      return;
                    }
                    const compiled = {
                      id: bulletins.length + 1,
                      title: newPost.title,
                      date: "24 Mei 2026",
                      author: newPost.author,
                      category: newPost.category,
                      content: newPost.content
                    };
                    setBulletins([compiled, ...bulletins]);
                    setNewPost({ title: "", content: "", category: "Berita", author: "Admin SIAP" });
                    triggerNotification("Konten Rilis berhasil dipasang langsung ke halaman website utama!");
                  }}
                  className="w-full py-4 bg-primary text-accent text-xs font-black uppercase tracking-wider rounded-xl shadow-md hover:shadow-xl transition-all active:scale-95"
                >
                  Publikasikan Berita Langsung
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 5: ADMIN SIAP DISKUSI                                         */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "siap_diskusi" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-display font-black text-primary">Moderator & Pengendali Ruang Diskusi</h3>
              <p className="text-xs text-gray-400">Saring forum, sunting kesepakatan notulensi, dan rilis Berita Pers Otomatis.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs">
            {/* Thread lists */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Daftar Forum Diskusi Kader</h4>
              <div className="space-y-3">
                {discussionRooms.map((room) => (
                  <div 
                    key={room.id}
                    onClick={() => { setSelectedRoomId(room.id); }}
                    className={`p-6 rounded-[1.75rem] border transition-all cursor-pointer ${
                      selectedRoomId === room.id ? "bg-slate-50 border-primary ring-2 ring-primary/5" : "bg-white border-zinc-100"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[9px] uppercase font-black bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                        {room.category}
                      </span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                        room.status === "Aktif" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                      }`}>
                        {room.status}
                      </span>
                    </div>

                    <h4 className="font-black text-slate-800 text-sm mt-2">{room.topic}</h4>
                    <p className="text-[10px] text-zinc-400 font-medium mt-1">Oleh: {room.creator} &bull; {room.membersCount} Berpartisipasi</p>
                    
                    <div className="mt-4 flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setDiscussionRooms(discussionRooms.map(r => r.id === room.id ? { ...r, status: r.status === "Aktif" ? "Selesai" : "Aktif" } : r));
                          triggerNotification(`Status ruangan ${r => r.id === room.id ? room.topic : ""} diubah!`);
                        }}
                        className="bg-white border border-stone-200 text-stone-700 px-3 py-1.5 font-bold rounded-lg"
                      >
                        Tutup/Buka Room
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Minutes (Notulensi) Editor and Release Draft Generator */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl space-y-6">
              <h3 className="text-lg font-black text-primary border-b border-gray-50 pb-3 flex items-center gap-2">
                <Edit3 className="text-accent" size={18} /> Lembar Notulensi & Draft Rilis Media
              </h3>

              {selectedRoomId ? (
                (() => {
                  const currentRoom = discussionRooms.find(r => r.id === selectedRoomId);
                  return (
                    <div className="space-y-4">
                      <p className="font-mono font-black text-indigo-700">TOPIK terpilih: {currentRoom?.topic}</p>

                      <div className="space-y-1">
                        <label className="font-bold text-gray-500">Hasil Notulensi Konsolidasi / Formulasi Keputusan</label>
                        <textarea
                          rows={4}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                          value={discussionMinutes[selectedRoomId] || ""}
                          onChange={(e) => {
                            setDiscussionMinutes({
                              ...discussionMinutes,
                              [selectedRoomId]: e.target.value
                            });
                          }}
                        />
                      </div>

                      {/* Compilation tool action */}
                      <button
                        onClick={() => {
                          const minutesVal = discussionMinutes[selectedRoomId] || "";
                          const draft = `RILIS BERITA PERS RESMI - IKA PMII KBB\n\nBandung Barat, (24 Mei 2026) - Ikatan Keluarga Alumni (IKA PMII) Bandung Barat sukses menyelenggarakan diskusi kolaboratif intensif mengangkat topik "${currentRoom?.topic}".\n\nDalam forum yang diikuti sebanyak ${currentRoom?.membersCount} panelis eksekutif alumni, diperoleh rumusan rekomendasi strategis:\n"${minutesVal}"\n\nRilis resmi ini disiarkan secara terbaca dalam sistem portal rujukan publik.`;
                          setPressReleaseDraft(draft);
                          triggerNotification("Naskah Berita Pers tercompile otomatis!");
                        }}
                        className="w-full py-3 bg-indigo-600 text-white font-extrabold rounded-lg shadow-md"
                      >
                        Compile Berita Pers Pers Rujukan
                      </button>

                      {pressReleaseDraft && (
                        <div className="space-y-2 pt-2 animate-fade-in">
                          <p className="font-mono font-black text-emerald-800">Draft Rilis Media Ter-generate:</p>
                          <textarea
                            rows={6}
                            readOnly
                            className="w-full bg-emerald-50/50 border border-emerald-100 font-mono text-[10px] text-emerald-950 p-4 rounded-xl leading-relaxed"
                            value={pressReleaseDraft}
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(pressReleaseDraft);
                              triggerNotification("Teks rilis berita berhasil disalin ke clipboard!");
                            }}
                            className="text-[10px] bg-slate-100 font-black px-3 py-1.5 rounded text-slate-700"
                          >
                            Copy Teks Rilis
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()
              ) : (
                <p className="text-zinc-400">Pilih salah satu forum di samping kiri untuk mengedit notulensi dan membuka press rilis editor.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 6: ADMIN SIAP CHAT                                            */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "siap_chat" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-display font-black text-primary">Deteksi Intensitas Obrolan (Global Aggregate)</h3>
              <p className="text-xs text-gray-400">Grafik interaktivitas percakapan anggota demi memantau respon solidaritas internal tanpa membaca naskah privat.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs font-sans">
            {/* Metric counters */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-md space-y-4">
              <h4 className="font-extrabold text-sm text-slate-700">Komunikasi Indexing Telemetry</h4>
              
              <div className="space-y-4">
                {[
                  { label: "Total Chat Dipertukarkan", val: "18,245 Pcs", desc: "Pertukaran ide & bisnis" },
                  { label: "Durasi Obrolan Rata-Rata", val: "12,4 Menit", desc: "Tingkat pemecahan tantangan" },
                  { label: "Daily Active Dialog", val: "148 Sesi", desc: "Komunikasi hidup terkini" },
                  { label: "Spam / Flagged Alert", val: "0 Kasus", desc: "Sistem ramah, inklusif, aman" }
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{stat.label}</p>
                    <p className="text-xl font-black text-primary">{stat.val}</p>
                    <p className="text-[9px] text-slate-400">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Peak time & hot room indicator bars */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg space-y-6">
              <h3 className="text-lg font-black text-primary border-b border-gray-50 pb-3">Titik Jam Padat Obrolan Terkini</h3>
              
              <div className="space-y-4">
                {[
                  { key: "Siang Hari (12.00 - 15.00)", val: "Intensitas Sangat Tinggi", width: "100%", style: "bg-indigo-600" },
                  { key: "Malam Hari (19.00 - 21.00)", val: "Intensitas Tinggi", width: "85%", style: "bg-indigo-500" },
                  { key: "Pagi Hari (08.00 - 10.00)", val: "Intensitas Sedang", width: "50%", style: "bg-sky-500" },
                  { key: "Tengah Malam (23.00 - 02.00)", val: "Intensitas Rendah", width: "20%", style: "bg-slate-400" }
                ].map((row, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-705">
                      <span>{row.key}</span>
                      <span>{row.val}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div className={`${row.style} h-full rounded-full`} style={{ width: row.width }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-[11px] leading-relaxed font-medium">
                🛡️ **Kebijakan Enkripsi**: Seluruh isi percakapan di enkripsi secara desentral. Panel admin hanya mampu mendeteksi volume data kuantitatif guna menjaga privasi individual sepenuhnya sesuai regulasi siber.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 7: ADMIN SIAP KTA (Interactive digital KTA issue queue)        */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "siap_kta" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-display font-black text-primary">Penerbitan KTA Digital Alumni</h3>
              <p className="text-xs text-gray-400">Pilih alumni yang lulus verifikasi, atur rancangan visual kartu digital secara langsung.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs font-sans">
            {/* Customiser controller */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl space-y-6">
              <h3 className="text-base font-black text-primary pb-3 border-b border-gray-50">Generator Visual KTA</h3>
              
              <div className="space-y-4">
                {/* 1. Select alumni */}
                <div className="space-y-1">
                  <label className="font-bold text-zinc-400 uppercase text-[10px]">Pilih Anggota Berhasil Diverifikasi</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold text-slate-700"
                    onChange={(e) => {
                      const id = parseInt(e.target.value);
                      setSelectedKtaId(id);
                      triggerNotification("Anggota KTA terpilih!");
                    }}
                    value={selectedKtaId || ""}
                  >
                    <option value="">-- PILIH ANGGOTA VERIFIED --</option>
                    {verifiedAlumni.map(member => (
                      <option key={member.id} value={member.id}>{member.name} ({member.loc || "KBB"})</option>
                    ))}
                  </select>
                </div>

                {/* 2. Theme / Gradient colors */}
                <div className="space-y-1">
                  <label className="font-bold text-zinc-400 uppercase text-[10px]">Skema Warna Latar Kartu</label>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    {[
                      { name: "Gold Luxury", style: "bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 text-slate-900" },
                      { name: "Emerald Green", style: "bg-gradient-to-r from-emerald-850 via-teal-700 to-emerald-950 text-white" },
                      { name: "Classic Corporate Navy", style: "bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white" },
                      { name: "Steel Graphite Black", style: "bg-gradient-to-r from-stone-800 to-stone-950 text-white" }
                    ].map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => {
                          setKtaCardColor(theme.style);
                          setKtaCardColorName(theme.name);
                        }}
                        className={`p-2.5 rounded-lg border font-bold text-left truncate ${
                          ktaCardColorName === theme.name ? "border-primary ring-2 ring-primary/20 bg-slate-100" : "border-slate-100 bg-white"
                        }`}
                      >
                        {theme.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Card Custom Header */}
                <div className="space-y-1">
                  <label className="font-bold text-zinc-400 uppercase text-[10px]">Judul Utama Header Kartu</label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold"
                    value={ktaTitle}
                    onChange={(e) => setKtaTitle(e.target.value.toUpperCase())}
                  />
                </div>

                {/* 4. Subtitle */}
                <div className="space-y-1">
                  <label className="font-bold text-zinc-400 uppercase text-[10px]">Orgnisasi Dewan Penerbit</label>
                  <input
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold"
                    value={ktaSub}
                    onChange={(e) => setKtaSub(e.target.value.toUpperCase())}
                  />
                </div>
              </div>
            </div>

            {/* LIVE KTA VIEW */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Tinjauan Kartu Langsung (Real-time Preview)</h4>
              
              {(() => {
                const curMember = verifiedAlumni.find(m => m.id === selectedKtaId) || verifiedAlumni[0] || { name: "NAMA LENGKAP", loc: "NGAMPRAH", id: 9991 };
                return (
                  <div className="space-y-6">
                    <div className={`p-8 rounded-[2rem] shadow-2xl relative overflow-hidden transition-all ${ktaCardColor} text-left aspect-[1.58/1]`}>
                      <div className="absolute right-0 bottom-0 top-0 opacity-15 w-1/2 bg-no-repeat bg-right" />
                      
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        {/* Header logo & title */}
                        <div className="pb-3 border-b border-white/20">
                          <h4 className="text-xs font-black tracking-widest italic">{ktaTitle}</h4>
                          <p className="text-[8px] opacity-80 font-semibold uppercase">{ktaSub}</p>
                        </div>

                        {/* Mid detailed row */}
                        <div className="my-auto flex gap-4 items-center">
                          <div className="w-16 h-16 rounded-xl bg-white/20 border border-white/30 shrink-0 flex items-center justify-center font-black text-xl uppercase italic select-none">
                            {curMember.name.substring(0, 2)}
                          </div>
                          <div className="space-y-0.5">
                            <h3 className="text-sm font-black tracking-tight uppercase">{curMember.name}</h3>
                            <p className="text-[9px] font-mono opacity-90 font-bold uppercase">NIK: PMII-KBB-{curMember.id || 104}</p>
                            <p className="text-[9px] opacity-80 uppercase font-black">Utusan: PACKec. {curMember.loc || "PADALARANG"}</p>
                          </div>
                        </div>

                        {/* Footer details dates */}
                        <div className="pt-2 border-t border-white/20 flex justify-between items-end">
                          <div>
                            <p className="text-[7px] uppercase font-bold opacity-75">Tahun Kaderisasi</p>
                            <span className="text-[10px] font-black font-mono">{curMember.alumniYear || (curMember as any).year || 2026}</span>
                          </div>
                          <div>
                            <p className="text-[7px] uppercase font-bold opacity-75 text-right">Masa Berlaku</p>
                            <span className="text-[10px] font-black tracking-wider text-right block">SEUMUR HIDUP</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        triggerNotification(`Sukses Mengunduh & Terbit KTA Digital ${curMember.name}`);
                      }}
                      className="w-full py-4 bg-primary text-accent text-xs font-black uppercase tracking-wider rounded-xl shadow-md active:scale-95 transition-all text-center"
                    >
                      Cetak & Generate KTA Kartu
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 8: ADMIN SIAP AKUN                                            */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "siap_akun" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-display font-black text-primary">Manajemen Akun Terdaftar</h3>
              <p className="text-xs text-gray-400">Sunting username/password, bekukan akses, atau kirim kredensial login via WhatsApp/Email.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 text-xs font-sans">
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-md">
              <h4 className="font-extrabold text-sm text-slate-800 pb-4 border-b border-gray-50 mb-4">Pengendali Akun Anggota Lolos Verifikasi</h4>
              
              <div className="space-y-3">
                {accounts.map((acc) => (
                  <div key={acc.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h5 className="font-black text-slate-800 text-sm">{acc.name}</h5>
                      <p className="text-[10px] text-zinc-400 font-medium">Username: <span className="font-bold text-slate-700">{acc.username}</span> | Password: <span className="font-mono font-bold text-rose-700">{acc.password}</span></p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                      <button
                        onClick={() => {
                          setAccounts(accounts.map(a => a.id === acc.id ? { ...a, password: "gen" + Math.floor(Math.random()*9000+1000) } : a));
                          triggerNotification(`Kredensial sandi ${acc.name} diset baru sukses!`);
                        }}
                        className="bg-zinc-200 hover:bg-zinc-300 text-slate-700 px-3 py-1.5 rounded-lg text-center"
                      >
                        Reset Sandi Acak
                      </button>

                      <button
                        onClick={() => {
                          setDispatchType("whatsapp");
                          setShowSimulateDispatch(acc);
                        }}
                        className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-100"
                      >
                        Kirim WA
                      </button>

                      <button
                        onClick={() => {
                          setDispatchType("email");
                          setShowSimulateDispatch(acc);
                        }}
                        className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-100"
                      >
                        Kirim Email
                      </button>

                      <button
                        onClick={() => {
                          setAccounts(accounts.map(a => a.id === acc.id ? { ...a, status: a.status === "Aktif" ? "Dibekukan" : "Aktif" } : a));
                          triggerNotification(`Status ${acc.name} dialihkan!`);
                        }}
                        className={`px-3 py-1.5 rounded-lg ${
                          acc.status === "Aktif" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-red-50 text-red-700 border border-red-100"
                        }`}
                      >
                        {acc.status === "Aktif" ? "Bekukan" : "Aktifkan"}
                      </button>

                      <button
                        onClick={() => {
                          setVerifiedAlumni(verifiedAlumni.filter(m => m.id !== acc.id));
                          triggerNotification(`Data keanggotaan ${acc.name} sukses didelete!`);
                        }}
                        className="bg-red-600 text-white px-3 py-1.5 rounded-lg"
                      >
                        Keluarkan/Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIMULATE DISPATCH CREDENTIAL MODAL */}
          <AnimatePresence>
            {showSimulateDispatch && (
              <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 p-4">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white p-8 rounded-[2rem] max-w-md w-full shadow-2xl relative text-xs"
                >
                  <button 
                    onClick={() => setShowSimulateDispatch(null)}
                    className="absolute right-4 top-4 p-2 text-gray-400 hover:text-slate-800"
                  >
                    <X size={18} />
                  </button>

                  <h3 className="text-lg font-black text-primary border-b border-gray-50 pb-3 uppercase">
                    Kirim Kredensial Akses {dispatchType.toUpperCase()}
                  </h3>

                  <div className="space-y-4 mt-4 font-sans leading-relaxed">
                    <p className="text-stone-500 font-semibold">Tampilan simulasi pesan yang dikirimkan ke {showSimulateDispatch.name}:</p>
                    
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 font-mono">
                      {dispatchType === "whatsapp" ? (
                        <p className="text-emerald-800">
                          🟢 **WHATSAPP SENDING BOT**<br />
                          Tujuan: {showSimulateDispatch.whatsapp}<br />
                          Pesan:<br />
                          "Halo Kak *{showSimulateDispatch.name}*, Akun SIAP Anda di IKA PMII Bandung Barat telah aktif. Silakan gunakan kredensial berikut untuk login:<br />
                          - Username: *{showSimulateDispatch.username}*<br />
                          - Sandi: *{showSimulateDispatch.password}*<br /><br />
                          Selamat berkolaborasi!"
                        </p>
                      ) : (
                        <p className="text-zinc-800">
                          🔵 **SMTP EMAIL CLIENT**<br />
                          Kirim ke: {showSimulateDispatch.email}<br />
                          Subjek: Kredensial Akun SIAP IKA PMII Bandung Barat<br /><br />
                          "Yth. Alumni {showSimulateDispatch.name}, akun pendaftaran SIAP Anda dinyatakan Lolos Validasi. Anda kini dapat login ke dasbor mandiri:<br />
                          - User: {showSimulateDispatch.username}<br />
                          - Sandi: {showSimulateDispatch.password}"
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        triggerNotification(`Notifikasi Kredensial dikirimkan ke ${showSimulateDispatch.name}!`);
                        setShowSimulateDispatch(null);
                      }}
                      className="w-full py-3.5 bg-primary text-accent text-xs font-black uppercase tracking-wider rounded-xl shadow-md"
                    >
                      Kirim Pesan Sekarang
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 9: ADMIN WEBSITE (Website colors, custom editorial tabs)       */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "siap_web" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-display font-black text-primary">Konfigurasi & Editorial Website Utama</h3>
              <p className="text-xs text-gray-400">Atur tajuk, menu drop-down dinamis publikasi, dan tema rujukan visual.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs font-sans">
            {/* Visual configuration controller */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl space-y-6">
              <h3 className="text-base font-black text-primary pb-3 border-b border-gray-50">Kontrol Layout Website</h3>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-400 uppercase text-[10px]">Tajuk Hero Utama Halaman Beranda</label>
                  <input 
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold font-sans text-slate-800"
                    value={webHero}
                    onChange={(e) => setWebHero(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-400 uppercase text-[10px]">Header Sambutan Selamat Datang</label>
                  <input 
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-bold text-slate-800"
                    value={webWelcomeHeader}
                    onChange={(e) => setWebWelcomeHeader(e.target.value)}
                  />
                </div>

                {/* Edit colors */}
                <div className="space-y-1">
                  <label className="font-bold text-gray-400 uppercase text-[10px]">Warna Utama Navigasi</label>
                  <div className="flex gap-2">
                    {[
                      { name: "Slate Deep", key: "#1E293B", style: "bg-slate-800 border-indigo-200" },
                      { name: "PMII Emerald Green", key: "#14532D", style: "bg-emerald-900 border-emerald-100" },
                      { name: "IKA Premium Navy", key: "#1E3A8A", style: "bg-blue-900 border-blue-200" }
                    ].map((col) => (
                      <button
                        key={col.name}
                        onClick={() => {
                          setWebColors({...webColors, primary: col.key});
                          triggerNotification(`Tema NAV diupdate - ${col.name}`);
                        }}
                        className={`flex-grow h-10 rounded-lg text-white font-bold text-[10px] uppercase border tracking-widest ${col.style}`}
                      >
                        {col.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* LIVE PREVIEW OF PORTAL HOMEPAGE EDIT */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Tinjauan Halaman Beranda Ter-Update</h4>
              
              <div className="bg-white border border-gray-100 rounded-[2rem] shadow-xl overflow-hidden text-slate-800">
                {/* Simulated Header nav bar representing updated colors */}
                <div style={{ backgroundColor: webColors.primary }} className="p-4 flex justify-between items-center text-white">
                  <span className="font-black italic text-[11px] font-display">PORTAL IKA PMII KBB</span>
                  <div className="flex gap-2 text-[9px] font-black uppercase">
                    <span>Beranda</span>
                    <span>Pengurus</span>
                    <span>Publikasi &darr;</span>
                  </div>
                </div>

                {/* Simulated Hero image text change */}
                <div className="bg-slate-900 p-8 text-center text-white space-y-2 relative">
                  <h4 className="text-xs font-display font-bold italic text-yellow-400">Selamat Datang di Portal</h4>
                  <h3 className="text-sm font-black font-sans leading-relaxed tracking-tight">{webHero}</h3>
                </div>

                {/* Body welcome header */}
                <div className="p-6 text-center space-y-2 bg-slate-50">
                  <h4 className="text-xs font-black text-slate-800 tracking-tight">{webWelcomeHeader}</h4>
                  <p className="text-[10px] text-gray-500 font-medium">Satu Data Terpadu untuk kemaslahatan jejaring karir dan sinergi alumni PMII tatar Bandung Barat.</p>
                </div>
              </div>

              <button
                onClick={() => {
                  triggerNotification("Selamat! Seluruh format tata kelola website telah sukses diselaraskan!");
                }}
                className="w-full py-4 bg-primary text-accent text-xs font-black uppercase tracking-wider rounded-xl shadow-md active:scale-95 transition-all text-center"
              >
                Simpan Konfigurasi Tampilan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 10: PENGATURAN                                                */}
      {/* ----------------------------------------------------------------- */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-2xl font-display font-black text-primary">Sistem Pengaturan & Keamanan</h3>
              <p className="text-xs text-gray-400">Konfigurasi tingkat tinggi, pengelolaan file data, backup basis data siber.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-sans">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-md space-y-4">
              <h4 className="font-extrabold text-sm text-slate-800 border-b border-gray-50 pb-2">Database Backup Generator</h4>
              <p className="text-stone-400 font-medium font-sans">Amankan database siber terpadu PC IKA PMII Bandung Barat secara berskala dalam model cadangan mentah JSON.</p>
              
              <div className="pt-2">
                <button
                  onClick={() => {
                    const dataStr = JSON.stringify({ verified: verifiedAlumni, pending: pendingApplicants });
                    triggerNotification("Mengunduh Backup JSON Sukses!");
                  }}
                  className="w-full py-3.5 bg-primary text-accent text-xs font-black uppercase tracking-wider rounded-xl shadow-md"
                >
                  Backup Basis Data Mentah
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-md space-y-4">
              <h4 className="font-extrabold text-sm text-slate-800 border-b border-gray-50 pb-2">Keamanan & Login Admin</h4>
              <p className="text-stone-400 font-medium">Ubah rahasia gerbang masuk portal admin guna menjamin database tidak tertembus kebocoran.</p>
              
              <div className="flex gap-2 text-xs">
                <button
                  onClick={() => {
                    triggerNotification("Otorisasi Sinyal Terverifikasi!");
                  }}
                  className="w-full py-3.5 bg-zinc-200 text-stone-700 font-bold rounded-xl"
                >
                  Otentikasi Kunci Siber
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* OUTBOX DISPATCH SIMULATOR MODAL                                    */}
      {/* ----------------------------------------------------------------- */}
      <AnimatePresence>
        {dispatchLog && dispatchLog.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[200] flex items-center justify-center p-4 text-xs font-sans"
            onClick={() => setDispatchLog(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white max-w-2xl w-full rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-primary text-white p-8 relative">
                <button
                  onClick={() => setDispatchLog(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center shadow-lg">
                    <Send size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] bg-emerald-500 text-white font-mono uppercase px-2 py-0.5 rounded font-black">Simulasi API Sukses</span>
                    <h3 className="text-xl font-display font-black leading-tight italic text-accent mt-0.5">Notifikasi Outbox Terkirim</h3>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 space-y-6 overflow-y-auto max-h-[60vh] text-xs">
                <p className="text-slate-500 font-medium"> 
                  Pendaftaran <strong>{dispatchLog.applicantName}</strong> selesai dinilai sebagai <strong>{dispatchLog.status === "Lolos" ? "LOLOS VERIFIKASI" : dispatchLog.status === "Revisi" ? "PERBAIKAN DATA" : "DITOLAK"}</strong>. Sistem otomatis mensimulasikan pengiriman notifikasi berikut:
                </p>

                {/* EMAIL BOX */}
                <div className="border border-slate-100 rounded-[1.5rem] p-5 space-y-3 bg-slate-50 relative">
                  <span className="absolute top-4 right-4 bg-blue-500 text-white font-mono font-black text-[8px] px-2 py-0.5 rounded uppercase">SMTP Outbox</span>
                  <div className="flex items-center gap-2 border-b border-slate-200/50 pb-2">
                    <Mail size={14} className="text-blue-500" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tujuan Email</p>
                      <p className="font-extrabold text-slate-700">{dispatchLog.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <p className="font-bold text-slate-600"><span className="text-slate-400 font-black text-[9px] uppercase">Subject:</span> {dispatchLog.subject}</p>
                    <div className="bg-white border border-slate-100 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono text-[10px] text-slate-600 tracking-tight leading-relaxed">
                      {dispatchLog.emailBody}
                    </div>
                  </div>
                </div>

                {/* WHATSAPP BOX */}
                <div className="border border-slate-100 rounded-[1.5rem] p-5 space-y-3 bg-slate-50 relative">
                  <span className="absolute top-4 right-4 bg-emerald-500 text-white font-mono font-black text-[8px] px-2 py-0.5 rounded uppercase">WhatsApp REST API</span>
                  <div className="flex items-center gap-2 border-b border-slate-200/50 pb-2">
                    <MessageCircle size={14} className="text-emerald-500" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Nomor Penerima</p>
                      <p className="font-extrabold text-slate-705">{dispatchLog.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[9px] text-slate-400 uppercase font-black">Pesan Outbox:</p>
                    <div className="bg-white border border-slate-100 p-3 rounded-lg font-bold text-slate-650 leading-relaxed">
                      {dispatchLog.whatsappMessage}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-8 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${dispatchLog.phone.replace(/^0/, '62').replace(/[^\d]/g, '')}?text=${encodeURIComponent(dispatchLog.whatsappMessage)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-grow py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase text-center rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} /> Hubungi & Kirim via WhatsApp &rarr;
                </a>
                <button
                  onClick={() => setDispatchLog(null)}
                  className="px-6 py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-black uppercase rounded-xl transition-all cursor-pointer"
                >
                  Tutup Notifikasi
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
