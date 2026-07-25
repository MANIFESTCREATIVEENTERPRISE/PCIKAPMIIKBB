import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, Calendar, Users, Briefcase, GraduationCap, Building2, 
  HeartHandshake, Presentation, TrendingUp, MapPin, Award, Activity, ShieldCheck, Compass, Sparkles, Newspaper, CheckCircle2, Globe, Star
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import bannerImg from "../assets/images/popup.png";
import { GENERATED_SIMULATED_MEMBERS } from "../data/simulatedMembers";

const COLORS_LIST = ["#072587", "#f59e0b", "#059669", "#6366f1", "#ec4899", "#d97706", "#10b981"];

const DEFAULT_NEWS_FALLBACK = [
  { id: 1, title: "Sinergi IKA PMII KBB dengan Pemkab Bandung Barat dalam Program Penataan Desa", content: "PC IKA PMII Kabupaten Bandung Barat menjalin kesepakatan strategis dengan Pemerintah Kabupaten Bandung Barat untuk mendorong digitalisasi administrasi dan pemberdayaan ekonomi di tingkat desa se-KBB.", image: "/src/assets/images/pmii_meeting_cooperation_1779609727304.png", date: new Date().toISOString(), category: "Berita", author: "Humas IKA PMII" },
  { id: 2, title: "Silaturahim Akbar & Consolidasi Alumni Menyongsong Rapat Kerja Cabang", content: "PC IKA PMII Kabupaten Bandung Barat menyelenggarakan kegiatan silaturahim akbar guna mempererat hubungan kekeluargaan antar-alumni sekaligus merapatkan barisan menyongsong Rapat Kerja Cabang.", image: "/src/assets/images/pmii_meeting_cooperation_1779609727304.png", date: new Date().toISOString(), category: "Berita", author: "Redaksi" },
  { id: 3, title: "Rapat Koordinasi Cabang: Persiapan Pelantikan Pengurus Baru & Agenda SIAP Pedia", content: "Agenda besar transisi kepemimpinan IKA PMII KBB akan segera dilaksanakan. Seluruh alumni diundang untuk memberikan sumbangsih pemikiran strategis.", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80", date: new Date().toISOString(), category: "Organisasi", author: "Sekretariat" },
  { id: 4, title: "Penguatan LBH PC IKA PMII: Layanan Advokasi & Bantuan Hukum Masyarakat", content: "Memperkuat fungsi perlindungan hak-hak sipil, LBH PC IKA PMII Bandung Barat membuka posko bantuan hukum pro-bono bagi masyarakat membutuhkan.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80", date: new Date().toISOString(), category: "Advokasi", author: "LBH IKA PMII" },
  { id: 5, title: "Koperasi KAMARA Swatransaksi: Inkubasi UMKM & Produk Ekonomi Kreatif Alumni", content: "Mendorong kemandirian ekonomi daerah, Koperasi KAMARA merilis program pendampingan sertifikasi halal dan digitalisasi pemasaran UMKM alumni.", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80", date: new Date().toISOString(), category: "Ekonomi", author: "KAMARA" }
];

const DEFAULT_ANNOUNCEMENTS_FALLBACK = [
  { id: 1, title: "Pendaftaran Verifikasi Hak Pilih Musyawarah Cabang Pembentukan Komda Kepengurusan KBB", content: "Instruksi pendaftaran ulang bagi seluruh delegasi alumni di 16 kecamatan guna menyusun daftar pemilih sah Musyawarah Cabang.", date: "2026-06-03T12:00:00Z", category: "Pengumuman" },
  { id: 2, title: "Wakaf Produktif pembangunan Graha IKA PMII Bandung Barat", content: "Mengundang keikhlasan segenap alumni untuk wakaf pembangunan sekretariat bersama/Graha IKA PMII KBB guna menunjang sentra kegiatan kader.", date: "2026-06-01T12:00:00Z", category: "Pembangunan" },
  { id: 3, title: "Beasiswa S2/S3 Luar Negeri: Program Kemitraan Khusus bagi Alumni PMII KBB", content: "PC IKA PMII Bandung Barat membuka program pendampingan beasiswa pascasarjana (S2/S3) bekerjasama dengan LPDP untuk alumni berprestasi.", date: "2026-05-28T12:00:00Z", category: "Beasiswa" },
  { id: 4, title: "Rapat Kerja Daerah ke-I PC IKA PMII Bandung Barat Tahun 2026", content: "Pemberitahuan kepada seluruh pengurus harian dan dewan penasihat untuk menghadiri konsolidasi program kerja terpadu.", date: "2026-05-25T12:00:00Z", category: "Organisasi" }
];

export default function Home() {
  const [stats, setStats] = useState<any>(null);
  const [news, setNews] = useState<any[]>(DEFAULT_NEWS_FALLBACK);
  const [announcements, setAnnouncements] = useState<any[]>(DEFAULT_ANNOUNCEMENTS_FALLBACK);
  const [membersList, setMembersList] = useState<any[]>([]);
  const [activeStatTab, setActiveStatTab] = useState<"kecamatan" | "potensi" | "kompetensi">("kecamatan");

  useEffect(() => {
    // Synchronize with verified members stored in standard localStorage
    const savedDbStr = localStorage.getItem("siap_verified_members_db");
    let localStorageList: any[] = [];
    if (savedDbStr) {
      try {
        localStorageList = JSON.parse(savedDbStr);
      } catch (e) {
        console.error("Error reading siap_verified_members_db", e);
      }
    }
    
    // Merge list to prevent duplicates or empty state if localStorage is empty
    const mergedMap = new Map();
    // 1. Seed simulated members
    GENERATED_SIMULATED_MEMBERS.forEach(m => mergedMap.set(m.id, m));
    // 2. Add or overwrite with localStorage entries
    localStorageList.forEach(m => {
      mergedMap.set(m.id, {
        ...m,
        loc: typeof m.loc === "object" ? m.loc?.name || "Ngamprah" : m.loc,
      });
    });
    
    const resolvedList = Array.from(mergedMap.values());
    setMembersList(resolvedList);

    fetch("/api/stats")
      .then(res => res.json())
      .then(setStats)
      .catch(err => console.error("Error loading homepage stats:", err));

    fetch("/api/content/news")
      .then(res => {
        if (!res.ok) throw new Error("news api failed");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setNews(data.slice(0, 5));
        }
      })
      .catch(err => console.error("Error loading homepage news silently:", err));

    fetch("/api/content/announcements")
      .then(res => {
        if (!res.ok) throw new Error("announcements api failed");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAnnouncements(data.slice(0, 4));
        }
      })
      .catch(err => console.error("Error loading homepage announcements silently:", err));
  }, []);

  // Overall dynamic total
  const totalAlumni = membersList.length;

  // 1. Wilayah Kecamatan
  const distMap: Record<string, number> = {};
  membersList.forEach(m => {
    const loc = m.loc || "Ngamprah";
    distMap[loc] = (distMap[loc] || 0) + 1;
  });
  const distData = Object.entries(distMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // 2. Sektor Potensi
  const getPotential = (m: any) => {
    const p = (m.prof || "").toLowerCase();
    const c = (m.contrib || []).map((x: string) => x.toLowerCase());
    if (p.includes("birokrat") || p.includes("asn") || p.includes("pemerintah") || p.includes("kemenag") || p.includes("kebijakan") || p.includes("kua") || p.includes("lembaga")) {
      return "Birokrasi & Advokasi";
    }
    if (p.includes("dosen") || p.includes("guru") || p.includes("pendidik") || p.includes("akademisi") || p.includes("sekolah") || c.includes("pendidikan")) {
      return "Intelektual & Pendidikan";
    }
    if (p.includes("wirausaha") || p.includes("bisnis") || p.includes("umkm") || p.includes("dagang") || p.includes("retail") || p.includes("agro") || p.includes("tani") || c.includes("ekonomi")) {
      return "Ekonomi & Pemberdayaan";
    }
    if (p.includes("hukum") || p.includes("advokat") || p.includes("lbh") || c.includes("hukum") || c.includes("advokasi")) {
      return "Hukum & Pembelaan Rakyat";
    }
    return "Sosial Kemasyarakatan & Keagamaan";
  };
  const potentialMap: Record<string, number> = {};
  membersList.forEach(m => {
    const pot = getPotential(m);
    potentialMap[pot] = (potentialMap[pot] || 0) + 1;
  });
  const potentialData = Object.entries(potentialMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // 3. Profesi
  const getProfessionGroup = (m: any) => {
    const p = (m.prof || "").toLowerCase();
    if (p.includes("dosen") || p.includes("guru") || p.includes("pendidik") || p.includes("akademisi") || p.includes("pengajar")) {
      return "Akademisi/Pendidik";
    }
    if (p.includes("hukum") || p.includes("advokat")) {
      return "Pakar Hukum/Advokat";
    }
    if (p.includes("wirausaha") || p.includes("bisnis") || p.includes("retail") || p.includes("pebisnis") || p.includes("agro") || p.includes("tani") || p.includes("kreatif")) {
      return "Wirausaha & UMKM";
    }
    if (p.includes("birokrat") || p.includes("asn") || p.includes("kemenag") || p.includes("kantor") || p.includes("kabid")) {
      return "Birokrasi & ASN";
    }
    if (p.includes("konsultan") || p.includes("praktisi") || p.includes("design") || p.includes("it") || p.includes("program")) {
      return "Praktisi & Profesional";
    }
    return "Khidmah & Aktivis";
  };
  const profMap: Record<string, number> = {};
  membersList.forEach(m => {
    const profG = getProfessionGroup(m);
    profMap[profG] = (profMap[profG] || 0) + 1;
  });
  const profData = Object.entries(profMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // 4. Kompetensi / Keahlian
  const labelMap: Record<string, string> = {
    "pendidikan": "Kependidikan & Pengajaran",
    "teknologi": "Teknologi Informasi & IT",
    "hukum": "Advokasi & Kepasifikan",
    "ekonomi": "Ekonomi, Bisnis & Koperasi",
    "agama": "Kajian Keagamaan & Aswaja",
    "sosial": "Sosial Kemasyarakatan",
    "advokasi": "Advokasi Publik",
    "pertanian": "Pertanian & Agribisnis",
    "seni": "Seni & Industri Kreatif",
    "keuangan": "Manajemen Keuangan"
  };
  const skillMap: Record<string, number> = {};
  membersList.forEach(m => {
    const skillList = m.contrib || [];
    skillList.forEach((s: string) => {
      const clean = s.trim().toLowerCase();
      if (clean) {
        const displayLabel = labelMap[clean] || (clean.charAt(0).toUpperCase() + clean.slice(1));
        skillMap[displayLabel] = (skillMap[displayLabel] || 0) + 1;
      }
    });
  });
  const skillData = Object.entries(skillMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  // Gender Breakdowns
  const maleCount = membersList.filter(m => m.gender === "L").length;
  const femaleCount = membersList.filter(m => m.gender === "P").length;
  const malePct = totalAlumni ? Math.round((maleCount / totalAlumni) * 100) : 0;
  const femalePct = totalAlumni ? Math.round((femaleCount / totalAlumni) * 100) : 0;

  // Levels list
  const levelUtama = membersList.filter(m => m.kaderisasi === "Kader Utama").length;
  const levelMadya = membersList.filter(m => m.kaderisasi === "Kader Madya").length;

  const tabsList = [
    { id: "kecamatan", title: "Kecamatan", desc: "Sebaran Daerah", icon: MapPin },
    { id: "potensi", title: "Potensi", desc: "Pilar Sumbangsih", icon: Sparkles },
    { id: "kompetensi", title: "Keahlian", desc: "Spesialisasi Kader", icon: Award },
  ];

  const [activeKarsa, setActiveKarsa] = useState(0);

  const pancakarsa = [
    {
      title: "Penguatan Lembaga",
      desc: "Meningkatkan soliditas, tata kelola transparan, dan modernisasi organisasi yang profesional.",
      icon: Building2,
      programs: [
        { nr: "01", title: "Sinergi Sipencak/SIAP Alumni", desc: "Digitalisasi pendataan terpusat dan penertiban e-KTA terintegrasi untuk seluruh alumni PMII se-Bandung Barat." },
        { nr: "02", title: "Konsolidasi 16 PAC KBB", desc: "Pembentukan dan pembinaan kepengurusan tingkat kecamatan (PAC) di seluruh wilayah Kabupaten Bandung Barat." },
        { nr: "03", title: "Rapat Kerja Berkala", desc: "Penyelenggaraan evaluasi, rapat koordinasi cabang, dan perumusan rekomendasi kebijakan strategis." },
        { nr: "04", title: "Sekretariat Representatif", desc: "Penyediaan sarana pusat koordinasi, arsip digital, dan ruang kolaborasi beradab untuk seluruh kader." },
        { nr: "05", title: "Kredibilitas & Tata Kelola", desc: "Standardisasi manajemen administrasi keuangan, pelaporan transparan, dan penataan hukum organisasi." }
      ]
    },
    {
      title: "Pendidikan & Pelatihan",
      desc: "Pengembangan kapasitas intelektual, keahlian digital, dan kepemimpinan kader alumni PMII.",
      icon: GraduationCap,
      programs: [
        { nr: "01", title: "Sekolah Kepemimpinan IKA", desc: "Pusat inkubasi kepemimpinan strategis, analisis kebijakan publik, dan wawasan keagamaan moderat." },
        { nr: "02", title: "Sertifikasi Kompetensi Kerja", desc: "Pelatihan hard skill & soft skill berorientasi industri kreatif, digital marketing, dan teknologi informasi." },
        { nr: "03", title: "Layanan Beasiswa Kader", desc: "Advokasi dan fasilitas bantuan beasiswa studi lanjut tingkat sarjana, magister, hingga doktoral." },
        { nr: "04", title: "Kajian Intelektual Rutin", desc: "Forum diskusi bedah kitab/buku kontemporer, kajian ilmiah sosiologis, dan diskursus keaswajaan kaffah." },
        { nr: "05", title: "Bimbingan Pendidik Daerah", desc: "Pendampingan guru honorer, pemberdayaan keterampilan mengajar, dan peningkatan mutu edukasi pedesaan." }
      ]
    },
    {
      title: "Penguatan Jaringan",
      desc: "Membangun konektivitas strategis antar alumni di sektor birokrasi, swasta, dan kemasyarakatan.",
      icon: Users,
      programs: [
        { nr: "01", title: "Sinergitas Lintas Sektor", desc: "Pemetaan kompetensi dan kolaborasi kontinu antar profesi birokrat, swasta, akademisi, dan seniman." },
        { nr: "02", title: "LBH PC IKA PMII Bandung Barat", desc: "Penyediaan payung hukum advokasi, konsultasi paralegal, serta perlindungan hak sipil kemasyarakatan." },
        { nr: "03", title: "Sumbangsih Kebijakan Daerah", desc: "Pemberian rekomendasi akademis strategis untuk mendorong kebijakan RPJMD Pemkab Bandung Barat." },
        { nr: "04", title: "Temu Alumni & Simposium", desc: "Penyelenggaraan reuni akbar tahunan dan sumbang saran ideologis demi penguatan eksistensi organisasi." },
        { nr: "05", title: "Publikasi Karya Kreatif", desc: "Fasilitas peluncuran tulisan opini, gagasan ilmiah, dan karya sastra budaya alumni di portal media jurnalisme." }
      ]
    },
    {
      title: "Pemberdayaan Ekonomi",
      desc: "Mendorong kemandirian ekonomi alumni melalui UMKM, Koperasi KAMARA, dan bisnis berdikari.",
      icon: Briefcase,
      programs: [
        { nr: "01", title: "KAMARA Swatransaksi", desc: "Pembentukan Koperasi Mandiri Rakyat Sejahtera (KAMARA) dan integrasi unit usaha ritel KAMARA Mart." },
        { nr: "02", title: "UMKM Alumni Accelerator", desc: "Inkubasi bisnis mikro, fasilitasi legalitas PIRT/Sertifikat Halal, serta pendampingan branding digital." },
        { nr: "03", title: "Pengembangan Agrobisnis", desc: "Sinergi kebun kopi sabilulungan, pembibitan perkebunan teh, dan budidaya peternakan domba silih asuh." },
        { nr: "04", title: "Kemitraan Modal Syariah", desc: "Penyediaan akses modal tanpa riba melalui pembiayaan simpan-pinjam syariah internal pengurus." },
        { nr: "05", title: "Pasar Digital & Kurasi Ekspor", desc: "Platform digital kurasi produk UMKM tatar pamilu untuk didorong menembus pasar nasional dan regional." }
      ]
    },
    {
      title: "Pengabdian Masyarakat",
      desc: "Kontribusi nyata IKA PMII dalam pengabdian sosial, kesehatan, dan kesejahteraan umat.",
      icon: HeartHandshake,
      programs: [
        { nr: "01", title: "Klinik Kesehatan Keliling", desc: "Penyuluhan stunting santriwati, pemeriksaan gizi gratis pemukiman dhuafa, dan bakti sosial kesehatan." },
        { nr: "02", title: "Relawan Siaga Sesar Lembang", desc: "Edukasi mitigasi kebencanaan wilayah rawan serta pembentukan satgas tanggap darurat kepemudaan." },
        { nr: "03", title: "Layanan Hukum Pro-Bono", desc: "Bantuan pembelaan hukum gratis bagi kelompok tertindas, buruh industrial, dan sengketa lahan warga." },
        { nr: "04", title: "Konservasi Mata Air KBB", desc: "Gerakan penanaman pohon, pelestarian resapan air hulu, dan perlindungan ekologi dataran tinggi." },
        { nr: "05", title: "PKBM Gerakan Aksara Mulia", desc: "Penguatan Pusat Kegiatan Belajar Masyarakat untuk mereduksi angka putus sekolah dan buta aksara desa." }
      ]
    }
  ];

  return (
    <div className="space-y-0 overflow-x-hidden">
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION: Premium Royal Blue Gradient & Islamic Motif */}
      {/* ---------------------------------------------------- */}
      <section className="relative bg-hero-royal bg-islamic-pattern pt-2 pb-24 md:pb-36 overflow-hidden">
        
        {/* Subtle Ambient Glow Overlays */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Hero Background Photo Accent */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img 
            src="/src/assets/images/pmii_meeting_cooperation_1779609727304.png" 
            alt="Silaturahim dan Kerjasama Alumni PC IKA PMII Bandung Barat" 
            loading="lazy"
            className="w-full h-full object-cover opacity-10 object-center scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031242] via-[#072587]/90 to-[#004db8]/80" />
        </div>

        {/* Running Text Ticker - Elegant Gold Accent */}
        <div className="w-full bg-slate-950/40 backdrop-blur-md border-b border-white/10 py-3 mb-6 overflow-hidden relative z-10">
          <marquee scrollamount="3.5" className="block font-sans font-bold text-xs md:text-sm text-amber-300 uppercase tracking-[0.2em] select-none">
            Selamat Datang di Rumah Digital PC IKA PMII Kabupaten Bandung Barat &nbsp;&bull;&nbsp; #AlumniSinergiPMIIBerdikari &nbsp;&bull;&nbsp; #KolaborasiAksiNyata &nbsp;&bull;&nbsp; Pengabdian Umat, Bangsa &amp; Daerah
          </marquee>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 relative z-10 text-left">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
            
            {/* Left Column: Heading, Badges, Tagline & CTAs */}
            <div className="max-w-3xl space-y-6 lg:w-3/5">
              <div className="flex flex-wrap gap-2.5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-400/15 text-amber-300 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-300/30 backdrop-blur-md shadow-sm"
                >
                  <Star size={12} className="fill-amber-300 text-amber-300" />
                  #KolaborasiAksiNyata
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-500/20 text-blue-200 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-300/20 backdrop-blur-md shadow-sm"
                >
                  <CheckCircle2 size={12} className="text-blue-300" />
                  #AlumniSinergiPMIIBerdikari
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold leading-[1.08] text-white tracking-tight"
              >
                SINERGI <span className="text-amber-300 italic font-normal">&amp;</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500">KOLABORASI</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-slate-200/90 max-w-2xl leading-relaxed font-sans font-normal"
              >
                Rumah Digital Pengurus Cabang Ikatan Keluarga Alumni PMII Kabupaten Bandung Barat. Menghimpun potensi alumni untuk pengabdian berdikari di sektor intelektual, birokrasi, hukum, dan ekonomi daerah.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-3"
              >
                <Link
                  to="/registrasi"
                  className="btn-gold"
                >
                  Daftar Anggota SIAP <ArrowRight size={18} />
                </Link>
                <Link
                  to="/profil/selayang-pandang"
                  className="btn-outline-white"
                >
                  Pelajari Selengkapnya
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4 flex flex-wrap items-center gap-6 border-t border-white/10 text-xs text-slate-300 font-medium"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span><strong>{totalAlumni}</strong> Alumni Terverifikasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span>16 PAC Kecamatan Se-KBB</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  <span>5 Pilar Panca Karsa</span>
                </div>
              </motion.div>

            </div>

            {/* Right Column: Floating Quick News Summary Portal Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="w-full lg:w-2/5 xl:w-[36%] glass-panel rounded-3xl p-6 shadow-2xl flex flex-col gap-4 self-stretch justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-white/15 pb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
                  <span className="font-display font-bold text-xs text-amber-300 uppercase tracking-widest">Ringkasan Berita Terkini</span>
                </div>
                <Link to="/publikasi/berita" className="text-[10px] text-white/70 hover:text-amber-300 font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1">
                  Selengkapnya <ArrowRight size={10} />
                </Link>
              </div>

              <div className="flex flex-col gap-3.5 divide-y divide-white/10 flex-grow justify-center relative z-10">
                {news.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    to="/publikasi/berita"
                    className="flex gap-4 pt-3 first:pt-0 group text-left transition-all duration-300 hover:translate-x-1"
                  >
                    {item.image && (
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white/10 border border-white/20 relative shadow-sm">
                        <img 
                          src={item.image} 
                          alt={item.title || "Warta Alumni IKA PMII KBB"} 
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 duration-300 transition-transform" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div className="flex-grow space-y-1.5 my-auto">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-amber-400/20 border border-amber-300/30 px-2 py-0.5 rounded-full text-amber-300 font-bold uppercase tracking-wider">
                          {item.category || "Berita"}
                        </span>
                        <span className="text-[9.5px] text-white/60 font-semibold font-mono">
                          {new Date(item.date).toLocaleDateString("id-ID", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-xs leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 text-center relative z-10">
                <Link 
                  to="/publikasi/berita" 
                  className="text-xs font-bold text-amber-300 hover:text-amber-200 inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  Portal Berita &amp; Informasi Publik <ArrowRight size={12} />
                </Link>
              </div>

            </motion.div>

          </div>
        </div>

        {/* Curved Organic Wave SVG Divider */}
        <div className="wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="text-surface fill-current">
            <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4-COLUMN FEATURE CARDS GRID: Clean & Minimalist */}
      {/* ---------------------------------------------------- */}
      <section className="bg-surface py-12 md:py-20 border-b border-slate-200/60 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1: Database Alumni SIAP */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 card-floating shadow-soft text-left group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#072587] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#072587] group-hover:text-white transition-all duration-300 shadow-sm">
                <Users size={28} />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-xl mb-2 group-hover:text-[#072587] transition-colors">Database SIAP Pedia</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">Pendaftaran &amp; direktori terpusat SIAP Pedia seluruh kader alumni PMII KBB.</p>
              <Link to="/registrasi" className="text-xs font-bold text-[#072587] hover:text-amber-600 inline-flex items-center gap-1.5 transition-colors">
                Daftar E-KTA <ArrowRight size={12} />
              </Link>
            </div>

            {/* Feature 2: Koperasi KAMARA */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 card-floating shadow-soft text-left group">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <Building2 size={28} />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-xl mb-2 group-hover:text-amber-600 transition-colors">Koperasi KAMARA</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">Pemberdayaan UMKM alumni &amp; katalog produk ekonomi kreatif berdikari.</p>
              <Link to="/produk-umkm/katalog" className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1.5 transition-colors">
                Katalog Produk <ArrowRight size={12} />
              </Link>
            </div>

            {/* Feature 3: Berita & Publikasi */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 card-floating shadow-soft text-left group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#072587] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#072587] group-hover:text-white transition-all duration-300 shadow-sm">
                <Newspaper size={28} />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-xl mb-2 group-hover:text-[#072587] transition-colors">Berita &amp; Publikasi</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">Kanal opini, jurnal ilmiah, serta pengumuman kegiatan resmi organisasi.</p>
              <Link to="/publikasi/berita" className="text-xs font-bold text-[#072587] hover:text-amber-600 inline-flex items-center gap-1.5 transition-colors">
                Baca Warta <ArrowRight size={12} />
              </Link>
            </div>

            {/* Feature 4: LBH & Advokasi */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200/80 card-floating shadow-soft text-left group">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <ShieldCheck size={28} />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-xl mb-2 group-hover:text-amber-600 transition-colors">LBH &amp; Advokasi</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">Bantuan hukum pro-bono advokasi masyarakat serta pengabdian sosial.</p>
              <Link to="/profil/lbh" className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1.5 transition-colors">
                Konsultasi LBH <ArrowRight size={12} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION: Movement & Suara Pergerakan (Clean Whitespace) */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          <div className="lg:w-5/12 space-y-6 text-left">
            <div className="space-y-2">
              <span className="inline-block text-amber-600 font-bold tracking-widest text-xs uppercase px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
                #SuaraPergerakan
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-[#072587]">
                Peradaban &amp; Intelektualitas Alumni
              </h2>
            </div>

            <p className="text-slate-600 text-base leading-relaxed">
              PC IKA PMII Kabupaten Bandung Barat berkomitmen membangun ruang dialektika yang sehat, menerbitkan gagasan kritis, dan memberikan sumbangsih nyata untuk pembangunan daerah.
            </p>

            <div className="space-y-4 pt-2">
              {[
                { title: 'Kisah Inspiratif Kader', desc: 'Jejak kiprah alumni di berbagai lini profesi strategis.' },
                { title: 'Jurnal Ilmiah & Opini', desc: 'Pemikiran kritis kebangsaan dan wacana Islam moderat.' },
                { title: 'Pemberdayaan Umat & Daerah', desc: 'Kerja sama erat dengan mitra strategis se-Bandung Barat.' }
              ].map((tag, i) => (
                <div key={i} className="border-l-4 border-amber-400 pl-4 py-1.5 hover:border-[#072587] transition-all group cursor-pointer">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-[#072587] transition-colors">{tag.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{tag.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link to="/publikasi/opini" className="btn-gold">
                Jelajahi Portal Opini <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="lg:w-7/12 w-full">
            <div className="relative group overflow-hidden rounded-3xl bg-[#072587] aspect-[16/10] sm:aspect-[16/9] shadow-soft-lg">
              <img 
                src={bannerImg} 
                alt="Dokumentasi Gerakan Suara Pergerakan IKA PMII Bandung Barat"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031242]/95 via-[#072587]/40 to-transparent flex items-end p-6 sm:p-10 text-left">
                <div className="max-w-xl space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-300/30">
                    Gagasan Utama
                  </span>
                  <h3 className="text-xl sm:text-3xl text-white font-display font-bold leading-tight">
                    Membangun Masa Depan Berbasis Intelektualitas &amp; Integritas
                  </h3>
                  <p className="text-slate-200/90 text-xs sm:text-sm line-clamp-2">
                    Gerakan IKA PMII KBB tidak hanya sekedar silaturahmi, tapi manifestasi pengabdian kader terhadap umat, bangsa, dan daerah.
                  </p>
                  <Link to="/publikasi/opini" className="text-amber-300 font-bold text-xs sm:text-sm inline-flex items-center gap-2 hover:gap-3 transition-all pt-1">
                    Baca Selengkapnya <ArrowRight size={14}/>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION: PANCAKARSA (5 Pillars - Dark Royal Blue & Gold) */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 md:py-28 bg-hero-royal bg-islamic-gold-pattern text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-amber-400 font-bold uppercase tracking-[0.25em] text-xs px-4 py-1.5 bg-amber-400/10 rounded-full border border-amber-400/20">
              5 Pilar Program Kerja
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              PancaKarsa IKA PMII KBB
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Panduan program strategis pengabdian organisasi alumni dalam memperkuat kelembagaan, pendidikan, jaringan, ekonomi, dan pengabdian sosial.
            </p>
          </div>

          {/* Category Tabs Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pancakarsa.map((pilar, i) => {
              const IconComponent = pilar.icon;
              const isActive = activeKarsa === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveKarsa(i)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between h-full cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 border-amber-300 shadow-gold scale-[1.02]"
                      : "glass-panel text-white hover:bg-white/10 hover:border-amber-400/40"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? "bg-slate-950 text-amber-400" : "bg-amber-400/20 text-amber-300"
                    }`}>
                      <IconComponent size={24} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      isActive ? "text-slate-900" : "text-amber-300"
                    }`}>Pilar 0{i+1}</span>
                  </div>
                  <div>
                    <h4 className={`font-display font-bold text-base leading-tight ${
                      isActive ? "text-slate-950" : "text-white"
                    }`}>{pilar.title}</h4>
                    <p className={`text-xs mt-2 line-clamp-2 ${isActive ? "text-slate-900/80" : "text-slate-300/70"}`}>{pilar.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Category Programs Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKarsa}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start glass-panel p-6 sm:p-10 rounded-3xl text-left"
            >
              {/* Category Info Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="inline-flex p-4 bg-amber-400/20 border border-amber-300/30 rounded-2xl text-amber-300">
                  {(() => {
                    const ActiveIcon = pancakarsa[activeKarsa].icon;
                    return <ActiveIcon size={36} />;
                  })()}
                </div>
                <div className="space-y-2">
                  <span className="text-amber-300 font-bold tracking-widest text-xs uppercase">Rona Program Kerja</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-snug">
                    {pancakarsa[activeKarsa].title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {pancakarsa[activeKarsa].desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <span className="block text-[10px] uppercase tracking-widest font-bold text-amber-300/80 mb-2">Fokus Utama</span>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-200">
                    <span className="px-3 py-1 bg-white/10 border border-white/15 rounded-full">Kemandirian Kader</span>
                    <span className="px-3 py-1 bg-white/10 border border-white/15 rounded-full">Silih Asah Asih Asuh</span>
                  </div>
                </div>
              </div>

              {/* Programs List */}
              <div className="lg:col-span-8 space-y-4">
                <div className="mb-2">
                  <h5 className="text-xs uppercase tracking-widest font-bold text-amber-300">Daftar 5 Program Kerja Unggulan:</h5>
                </div>
                <div className="grid grid-cols-1 gap-3.5">
                  {pancakarsa[activeKarsa].programs.map((prog, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-300/40 rounded-2xl transition-all duration-300 text-left"
                    >
                      <div className="flex items-center justify-center font-mono font-bold text-sm text-amber-300 bg-amber-400/15 border border-amber-300/30 w-10 h-10 rounded-xl shrink-0">
                        {prog.nr}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-sans font-bold text-base text-white">{prog.title}</h4>
                        <p className="text-xs text-slate-300/80 leading-relaxed">{prog.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION: IKA KBB Movement Showcase (Interactive Slide) */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 md:py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
          <div className="space-y-2 text-left">
            <span className="text-amber-400 text-xs uppercase font-bold tracking-widest">Galeri &amp; Dokumentasi</span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold">IKA Bandung Barat Movement</h2>
          </div>
          <Link to="/publikasi/galeri" className="btn-gold text-xs py-2.5 px-5">
            Lihat Semua Galeri <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 scrollbar-none snap-x">
          {news.map((item, i) => (
            <div key={i} className="min-w-[290px] md:min-w-[320px] snap-center shrink-0">
              <Link
                to={item.category === "Artikel" ? "/publikasi/artikel" : item.category === "Pengumuman" ? "/publikasi/pengumuman" : item.category === "Opini" ? "/publikasi/opini" : "/publikasi/berita"}
                className="block aspect-[4/3] bg-slate-800 rounded-2xl overflow-hidden relative group shadow-lg"
              >
                <img 
                  src={item.image} 
                  alt={item.title || "Dokumentasi Kegiatan PC IKA PMII KBB"}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] text-amber-300 font-bold uppercase mb-1">{new Date(item.date).toLocaleDateString("id-ID")}</span>
                  <h3 className="font-bold text-sm leading-snug line-clamp-2 text-white group-hover:text-amber-300 transition-colors">{item.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION: Dynamic Modern Statistics Tab Dashboard */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 md:py-28 bg-surface border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-10 lg:mb-14 gap-6">
            <div className="space-y-2 text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 text-[#072587] border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Sistem Informasi Alumni SIAP Pedia
              </span>
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-[#072587] tracking-tight">
                Statistik &amp; Demografi Alumni
              </h2>
              <p className="text-slate-600 text-sm max-w-xl">
                Visualisasi terpadu sebaran alumni di 16 kecamatan, potensi pengabdian, serta keahlian khusus kader IKA PMII Bandung Barat.
              </p>
            </div>
            
            {/* Quick Live Counter Stats */}
            <div className="flex flex-wrap gap-4 select-none lg:self-end">
              <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-4 shadow-soft">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#072587] flex items-center justify-center font-bold">
                  <Users size={22} />
                </div>
                <div className="text-left">
                  <span className="block text-2xl font-extrabold text-[#072587] leading-none">{totalAlumni}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Alumni Terverifikasi</span>
                </div>
              </div>
              
              <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl flex items-center gap-4 shadow-soft">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <MapPin size={22} />
                </div>
                <div className="text-left">
                  <span className="block text-2xl font-extrabold text-amber-600 leading-none">{distData.length}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Kecamatan Aktif</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Analytics Grid Container */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-soft-lg overflow-hidden">
            
            {/* Minimalist Tab Bar Switcher */}
            <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
                {tabsList.map((t) => {
                  const TabIcon = t.icon;
                  const isActive = activeStatTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveStatTab(t.id as any)}
                      className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#072587] text-white shadow-md"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <TabIcon size={16} />
                      <span>{t.title}</span>
                    </button>
                  );
                })}
              </div>
              
              <div className="text-xs text-slate-500 font-semibold flex items-center gap-2">
                <Compass size={16} className="text-amber-500 animate-spin" style={{ animationDuration: "6s" }} />
                <span>Beralih tab untuk visualisasi data interaktif</span>
              </div>
            </div>

            {/* Main Interactive Visualizer Frame */}
            <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Sidebar Info List */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#072587] bg-blue-50 px-3 py-1 rounded-full inline-block">
                      {activeStatTab === "kecamatan" && "Sebaran Teritorial"}
                      {activeStatTab === "potensi" && "Sektor Potensi"}
                      {activeStatTab === "kompetensi" && "Spesialisasi Kader"}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-[#072587]">
                      {activeStatTab === "kecamatan" && "Kerapatan Wilayah KBB"}
                      {activeStatTab === "potensi" && "Dominasi Klaster Bakti"}
                      {activeStatTab === "kompetensi" && "Keahlian Unggulan"}
                    </h3>
                  </div>

                  {/* Top Items Detail Container */}
                  <div className="space-y-3.5 pt-3 border-t border-slate-100 max-h-[320px] overflow-y-auto pr-2">
                    {(() => {
                      let activeData: any[] = [];
                      if (activeStatTab === "kecamatan") activeData = distData;
                      else if (activeStatTab === "potensi") activeData = potentialData;
                      else if (activeStatTab === "kompetensi") activeData = skillData;

                      const maxVal = Math.max(...activeData.map(d => d.value), 1);

                      return activeData.slice(0, 6).map((item, idx) => {
                        const scorePct = Math.round((item.value / totalAlumni) * 100);
                        const progressPct = Math.round((item.value / maxVal) * 100);
                        return (
                          <div key={idx} className="space-y-1 group">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-bold text-slate-800 group-hover:text-[#072587] transition-colors">{item.name}</span>
                              <div className="space-x-1.5 font-semibold">
                                <span className="font-bold text-[#072587]">{item.value} Orang</span>
                                <span className="text-slate-400">({scorePct}%)</span>
                              </div>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                              <div 
                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ 
                                  width: `${progressPct}%`,
                                  backgroundColor: idx === 0 ? "#072587" : idx === 1 ? "#f59e0b" : idx === 2 ? "#059669" : "#6366f1"
                                }}
                              />
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Additional Insight Banner */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-500">Demografi Gender &amp; Kaderisasi</span>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="border-r border-slate-200 pr-2">
                      <span className="text-[10px] text-slate-500 block font-semibold uppercase">Rasio L / P</span>
                      <div className="flex gap-2 items-end mt-0.5">
                        <span className="text-sm font-bold text-[#072587]">L: {malePct}%</span>
                        <span className="text-xs text-slate-400">/</span>
                        <span className="text-sm font-bold text-emerald-600">P: {femalePct}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-semibold uppercase">Kaderisasi</span>
                      <div className="mt-0.5 flex flex-wrap gap-1">
                        <span className="text-[9px] font-bold bg-blue-100 text-[#072587] px-2 py-0.5 rounded-md">Utama: {levelUtama}</span>
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">Madya: {levelMadya}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Main Chart Panel */}
              <div className="lg:col-span-7 bg-slate-50/60 rounded-2xl border border-slate-200 p-6 flex flex-col justify-center items-center relative min-h-[300px]">
                
                <div className="w-full h-[260px] sm:h-[340px] relative z-10">
                  {activeStatTab === "kecamatan" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={distData.slice(0, 8)}>
                        <XAxis dataKey="name" fontSize={11} axisLine={false} tickLine={false} tick={{ fill: "#475569", fontWeight: 600 }} />
                        <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8" }} />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: "1rem", 
                            border: "1px solid #e2e8f0", 
                            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                            backgroundColor: "#ffffff",
                            fontWeight: 600
                          }}
                        />
                        <Bar dataKey="value" fill="#072587" name="Jumlah Alumni" radius={[8, 8, 0, 0]}>
                          {distData.slice(0, 8).map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={index === 0 ? "#072587" : index === 1 ? "#004db8" : index === 2 ? "#f59e0b" : "#059669"} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}

                  {activeStatTab === "potensi" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={potentialData}
                          innerRadius={75}
                          outerRadius={110}
                          paddingAngle={5}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                        >
                          {potentialData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS_LIST[index % COLORS_LIST.length]} 
                              stroke="#ffffff" 
                              strokeWidth={2} 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: "1rem", 
                            border: "1px solid #e2e8f0", 
                            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" 
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}

                  {activeStatTab === "kompetensi" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillData.slice(0, 6)}>
                        <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{ fill: "#475569", fontWeight: 600 }} />
                        <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8" }} />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: "1rem", 
                            border: "1px solid #e2e8f0" 
                          }} 
                        />
                        <Bar dataKey="value" fill="#f59e0b" name="Alumni" radius={[8, 8, 0, 0]}>
                          {skillData.slice(0, 6).map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={index % 2 === 0 ? "#f59e0b" : "#072587"} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Legend for Pie Chart */}
                {activeStatTab === "potensi" && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center mt-3 text-[11px] font-semibold text-slate-600">
                    {potentialData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS_LIST[index % COLORS_LIST.length] }} />
                        <span>{entry.name} ({entry.value})</span>
                      </div>
                    ))}
                  </div>
                )}
                
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
