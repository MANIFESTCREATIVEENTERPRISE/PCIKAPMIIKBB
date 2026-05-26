import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowRight, Calendar, Users, Briefcase, GraduationCap, Building2, 
  HeartHandshake, Presentation, TrendingUp, MapPin, Award, Activity, ShieldCheck, Compass, Sparkles 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import bannerImg from "../assets/images/popup.png";
import { GENERATED_SIMULATED_MEMBERS } from "../data/simulatedMembers";

const COLORS_LIST = ["#112D75", "#FFD700", "#059669", "#6366f1", "#ec4899", "#f59e0b", "#10b981"];

export default function Home() {
  const [stats, setStats] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
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

    fetch("/api/stats").then(res => res.json()).then(setStats);
    fetch("/api/content/news").then(res => res.json()).then(data => setNews(data.slice(0, 5)));
  }, []);

  // ----------------------------------------------------
  // DYNAMIC LIVE STAT BALANCER AND GROUPER (SIAP Pedia)
  // ----------------------------------------------------
  
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
      desc: "Meningkatkan soliditas dan tata kelola organisasi yang profesional.",
      icon: Building2,
      programs: [
        { nr: "01", title: "Sinergi Sipencak/SIAP Alumni", desc: "Digitalisasi pendataan dan aktivasi e-KTA terintegrasi untuk seluruh alumni PMII se-Bandung Barat." },
        { nr: "02", title: "Konsolidasi 16 PAC KBB", desc: "Pembentukan dan pembinaan kepengurusan tingkat kecamatan (PAC) di seluruh wilayah Bandung Barat." },
        { nr: "03", title: "Rapat Kerja Berkala", desc: "Penyelenggaraan evaluasi, rapat koordinasi cabang, dan perumusan rekomendasi kebijakan organisasi." },
        { nr: "04", title: "Sekretariat Representatif", desc: "Penyediaan sarana pusat koordinasi, arsip digital, dan ruang kolaborasi beradab untuk seluruh kader." },
        { nr: "05", title: "Kredibilitas & Tata Kelola", desc: "Standardisasi manajemen administrasi keuangan, pelaporan transparan, dan penataan hukum organisasi." }
      ]
    },
    {
      title: "Pendidikan & Pelatihan",
      desc: "Pengembangan kapasitas intelektual dan skill kader alumni PMII.",
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
      desc: "Membangun konektivitas strategis antar alumni di berbagai sektor.",
      icon: Users,
      programs: [
        { nr: "01", title: "Sinergitas Lintas Sektor", desc: "Pemetaan kompetensi dan kolaborasi kontinu antar profesi birokrat, swasta, akademisi, dan seniman." },
        { nr: "02", title: "LBH IKA PMII Bandung Barat", desc: "Penyediaan payung hukum advokasi, konsultasi paralegal, serta perlindungan hak sipil kemasyarakatan." },
        { nr: "03", title: "Sumbangsih Kebijakan Daerah", desc: "Pemberian rekomendasi akademis strategis untuk mendorong kebijakan RPJMD Pemkab Bandung Barat." },
        { nr: "04", title: "Temu Alumni & Simposium", desc: "Penyelenggaraan reuni akbar tahunan dan sumbang saran ideologis demi penguatan eksistensi organisasi." },
        { nr: "05", title: "Publikasi Karya Kreatif", desc: "Fasilitas peluncuran tulisan opini, gagasan ilmiah, dan karya sastra budaya alumni di portal media jurnalisme." }
      ]
    },
    {
      title: "Pemberdayaan Ekonomi",
      desc: "Mendorong kemandirian ekonomi alumni melalui UMKM dan bisnis.",
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
      desc: "Kontribusi nyata IKA PMII dalam pembangunan sosial daerah.",
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

  const COLORS = ['#FFD700', '#112D75', '#059669', '#FDFBF7', '#7C3AED'];

  return (
    <div className="space-y-0">
      {/* Hero Section (60/40 Split) */}
      <section className="relative bg-primary pt-0 pb-32 overflow-hidden border-b border-primary/20">
        {/* Background Image with Elegant Dark Fading */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <img 
            src="/src/assets/images/pmii_meeting_cooperation_1779609727304.png" 
            alt="Pertemuan IKA PMII" 
            className="w-full h-full object-cover opacity-20 object-center scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle custom radial and linear gradient overlay for high contrast text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/80" />
        </div>

        {/* Elite Running Text Ticker */}
        <div className="w-full bg-black/40 border-b border-white/5 py-4 mb-2 overflow-hidden relative z-10">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none"></div>
          <marquee scrollamount="3.5" className="block font-sans font-black text-sm md:text-base text-accent uppercase tracking-[0.2em] select-none">
            Selamat Datang di Rumah Digital PC IKA PMII Kabupaten Bandung Barat &nbsp;&bull;&nbsp; #AlumniSinergiPMIIBerdikari &nbsp;&bull;&nbsp; #KolaborasiAksiNyata &nbsp;&bull;&nbsp; Selamat Datang di Rumah Digital PC IKA PMII Kabupaten Bandung Barat &nbsp;&bull;&nbsp; #AlumniSinergiPMIIBerdikari &nbsp;&bull;&nbsp; #KolaborasiAksiNyata
          </marquee>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12 items-center relative z-10">
          <div className="lg:w-3/5 space-y-8">
            <div className="flex flex-wrap gap-2.5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-widest border border-accent/20"
              >
                #KolaborasiAksiNyata
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-widest border border-accent/20"
              >
                #AlumniSinergiPMIIBerdikari
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-widest border border-accent/20"
              >
                #PMIIBandungBarat
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-widest border border-accent/20"
              >
                #SinergiDalamAksi
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-widest border border-accent/20"
              >
                #BerdayaDalamKarsa
              </motion.div>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl lg:text-8xl font-display font-bold leading-[0.9] text-accent"
            >
              SINERGI <span className="text-surface italic">&</span> <br />
              <span className="text-surface">KOLABORASI</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-surface/80 max-w-xl leading-relaxed"
            >
              Mengajak seluruh alumni PMII Kabupaten Bandung Barat untuk bersinergi membangun peradaban, intelektualitas, dan kemandirian ekonomi daerah.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/daftar-anggota" className="bg-accent text-primary px-8 py-4 rounded-full font-bold shadow-xl shadow-accent/20 hover:scale-105 transition-all flex items-center gap-2">
                Bergabung dalam Jaringan <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          <div className="lg:w-2/5 w-full space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-[3rem] p-10 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display font-bold text-xl uppercase tracking-tighter text-accent">Berita Terkini</h3>
                <Link to="/publikasi/berita" className="text-[10px] bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-primary transition-all px-4 py-1.5 rounded-full font-bold uppercase tracking-widest">
                  Lihat Semua
                </Link>
              </div>
              <div className="space-y-8">
                {news.slice(0, 3).map((item, i) => (
                  <div key={i} className="group cursor-pointer border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <p className="text-[10px] text-accent/50 font-bold uppercase mb-2">{new Date(item.date).toLocaleDateString()}</p>
                    <h4 className="text-base font-bold leading-tight text-surface group-hover:text-accent transition-colors line-clamp-2">{item.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section H1 (30/70) */}
      <section className="py-24 bg-surface border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 space-y-8">
            <div className="space-y-2">
              <span className="text-accent font-bold tracking-widest text-xs uppercase">#Movement</span>
              <h2 className="text-4xl font-bold leading-tight text-primary">Suara <br/>Pergerakan</h2>
            </div>
            <div className="space-y-6">
              {['Kisah Inspiratif Kader', 'Jurnal Ilmiah Alumni', 'Opini Publik'].map((tag, i) => (
                <div key={i} className="border-l-2 border-primary/20 pl-4 py-2 hover:border-primary transition-all cursor-pointer group">
                  <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">#{tag}</p>
                  <p className="text-xs text-gray-500 mt-1">Membaca arah peradaban melalui kacamata alumni.</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-2/3">
            <div className="relative group overflow-hidden rounded-[2.5rem] bg-primary aspect-[16/9]">
              <img src={bannerImg} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex items-end p-12">
                <div className="max-w-lg space-y-4">
                  <h3 className="text-3xl text-white font-bold">Membangun Masa Depan Berbasis Intelektualitas</h3>
                  <p className="text-white/80 text-sm">Gerakan IKA PMII KBB tidak hanya sekedar silaturahmi, tapi manifestasi pengabdian kader terhadap umat dan bangsa.</p>
                  <Link id="home-opinions-link" to="/publikasi/opini" className="text-accent font-bold text-sm inline-flex items-center gap-2 hover:gap-4 transition-all">Baca Selengkapnya <ArrowRight size={16}/></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section H2: PancaKarsa */}
      <section className="py-32 bg-primary relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ffffff10,transparent)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-accent">PancaKarsa</h2>
            <p className="text-surface/50 uppercase tracking-[0.3em] text-[10px] font-bold">5 Pilar Program Kerja Strategis & Kategori Pengabdian</p>
          </div>

          {/* Category Tabs Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pancakarsa.map((pilar, i) => {
              const IconComponent = pilar.icon;
              const isActive = activeKarsa === i;
              return (
                <button
                  key={i}
                  id={`pancakarsa-tab-${i}`}
                  onClick={() => setActiveKarsa(i)}
                  className={`text-left p-6 rounded-3xl border transition-all duration-300 relative group flex flex-col justify-between h-full cursor-pointer ${
                    isActive
                      ? "bg-accent text-primary border-accent shadow-lg shadow-accent/25 scale-[1.02]"
                      : "bg-white/5 backdrop-blur-md text-surface border-white/10 hover:border-accent/40 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      isActive ? "bg-primary text-accent" : "bg-accent text-primary"
                    }`}>
                      <IconComponent size={24} />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${
                      isActive ? "text-primary/70" : "text-accent"
                    }`}>Pilar 0{i+1}</span>
                  </div>
                  <div>
                    <h4 className={`font-display font-bold text-lg leading-tight uppercase tracking-tight ${
                      isActive ? "text-primary" : "text-surface"
                    }`}>{pilar.title}</h4>
                    <p className={`text-xs mt-2 line-clamp-2 ${isActive ? "text-primary/85" : "text-surface/60"}`}>{pilar.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Category Programs Showcase */}
          <motion.div
            key={activeKarsa}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white/5 backdrop-blur-lg border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-3xl text-left"
          >
            {/* Category Info Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-flex p-5 bg-accent/20 border border-accent/30 rounded-3xl text-accent">
                {(() => {
                  const ActiveIcon = pancakarsa[activeKarsa].icon;
                  return <ActiveIcon size={48} className="animate-pulse" />;
                })()}
              </div>
              <div className="space-y-3">
                <span className="text-accent font-black tracking-widest text-[10px] uppercase">Rona Program Kerja</span>
                <h3 className="text-3.5xl font-display font-bold text-surface uppercase tracking-tight leading-none">
                  {pancakarsa[activeKarsa].title}
                </h3>
                <p className="text-sm text-surface/75 leading-relaxed">
                  {pancakarsa[activeKarsa].desc}
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <span className="block text-[9px] uppercase tracking-widest font-black text-accent/60 mb-2">Fokus Utama</span>
                <div className="flex flex-wrap gap-2 text-xs font-bold text-surface/90">
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">Kemandirian Kader</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">Silih Asah Asih Asuh</span>
                </div>
              </div>
            </div>

            {/* Programs List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="mb-4">
                <h5 className="text-xs uppercase tracking-widest font-black text-accent/80">Daftar 5 Program Kerja Unggulan:</h5>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {pancakarsa[activeKarsa].programs.map((prog, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-5 p-5 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-accent/30 rounded-2xl transition-all duration-300 shadow-sm"
                  >
                    <div className="flex items-center justify-center font-mono font-black text-sm text-accent bg-accent/10 border border-accent/20 w-10 h-10 rounded-xl shrink-0">
                      {prog.nr}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-sans font-bold text-base text-surface group-hover:text-accent tracking-tight">{prog.title}</h4>
                      <p className="text-xs text-surface/70 leading-relaxed">{prog.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section H3: IKA KBB Movement Slide */}
      <section className="py-24 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex items-end justify-between">
          <div className="space-y-2">
             <h2 className="text-4xl font-bold">IKA Bandung Barat Movement</h2>
             <p className="text-white/60 uppercase tracking-widest text-xs">Jejak Langkah Pergerakan Kami</p>
          </div>
          <Link to="/publikasi/galeri" className="text-accent font-bold text-sm">Galeri Kegiatan Kami</Link>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-12 px-4 sm:px-6 lg:px-24 snap-x">
          {news.map((item, i) => (
            <div key={i} className="min-w-[280px] md:min-w-[300px] snap-center shrink-0">
              <div className="aspect-[3/2] bg-white/10 rounded-[2rem] overflow-hidden relative group">
                <img src={item.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" title={item.title} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-5 md:p-6">
                  <span className="text-[9px] text-accent font-bold uppercase mb-1.5">{new Date(item.date).toLocaleDateString("id-ID")}</span>
                  <h3 className="font-bold text-sm md:text-base leading-snug mb-3 line-clamp-2 text-white">{item.title}</h3>
                  <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section H4: Dynamic Modern Statistics Tab Dashboard */}
      <section className="py-28 bg-surface border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-primary border border-accent/20 rounded-full text-[10px] font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Sistem Informasi Alumni &amp; Database SIAP Pedia
              </span>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-primary tracking-tight">
                Statistik Dewan &amp; Alumni
              </h2>
              <p className="text-gray-400 text-sm max-w-xl">
                Olah data digital terpusat menyajikan visualisasi sebaran kuantitatif, kapabilitas, serta potensi riil seluruh kader IKA PMII se-Kabupaten Bandung Barat.
              </p>
            </div>
            
            {/* Quick Live Counter Stats */}
            <div className="flex flex-wrap gap-4 select-none lg:self-end">
              <div className="bg-white/40 backdrop-blur border border-gray-200/65 px-6 py-3.5 rounded-2xl flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Users size={18} />
                </div>
                <div>
                  <span className="block text-2xl font-black text-primary leading-none count-up">{totalAlumni}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Alumni Terverifikasi</span>
                </div>
              </div>
              
              <div className="bg-white/40 backdrop-blur border border-gray-200/65 px-6 py-3.5 rounded-2xl flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-accent/20 text-primary flex items-center justify-center">
                  <Activity size={18} className="text-primary" />
                </div>
                <div>
                  <span className="block text-2xl font-black text-primary leading-none">{distData.length}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Kecamatan Aktif</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Analytics Grid Container */}
          <div className="bg-white rounded-[3.5rem] border border-gray-150/80 shadow-2xl shadow-gray-200/50 overflow-hidden">
            {/* Minimalist Tab Bar Switcher */}
            <div className="bg-gray-50/60 border-b border-gray-150/80 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
                {tabsList.map((t) => {
                  const TabIcon = t.icon;
                  const isActive = activeStatTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveStatTab(t.id as any)}
                      className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold font-sans text-xs uppercase tracking-wider transition-all duration-200 relative shrink-0 ${
                        isActive
                          ? "bg-primary text-accent shadow-md shadow-primary/20 hover:opacity-95"
                          : "bg-white/70 hover:bg-white text-gray-550 border border-gray-150 hover:border-gray-200"
                      }`}
                    >
                      <TabIcon size={15} />
                      <div className="text-left">
                        <span className="block leading-none">{t.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="text-xs text-gray-400 font-bold flex items-center gap-2">
                <Compass size={14} className="text-accent animate-spin" style={{ animationDuration: "4s" }} />
                <span>Interaktif: Klik tab untuk beralih perspektif</span>
              </div>
            </div>

            {/* Main Interactive Visualizer Frame */}
            <div className="p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Sidebar Info List */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-accent font-sans bg-primary/95 px-3 py-1 rounded-full inline-block">
                      {activeStatTab === "kecamatan" && "Sebaran Teritorial"}
                      {activeStatTab === "potensi" && "Sektor Potensi"}
                      {activeStatTab === "profesi" && "Komposisi Karir"}
                      {activeStatTab === "kompetensi" && "Spesialisasi Kader"}
                    </span>
                    <h3 className="text-2.5xl font-display font-bold text-primary">
                      {activeStatTab === "kecamatan" && "Kerapatan Wilayah KBB"}
                      {activeStatTab === "potensi" && "Dominasi Klaster Bakti"}
                      {activeStatTab === "profesi" && "Pemetaan Profesi Alumni"}
                      {activeStatTab === "kompetensi" && "Keahlian Unggulan"}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {activeStatTab === "kecamatan" && "Distribusi jumlah alumni berdasar 16 wilayah kecamatan di Bandung Barat untuk penataan kohesi daerah."}
                      {activeStatTab === "potensi" && "Pemetaan potensi strategis kader yang berkontribusi aktif pada pembentukan pilar peradaban daerah."}
                      {activeStatTab === "profesi" && "Kategori karir dan lapangan pengabdian alumni dalam menghidupkan roda kesejahteraan umat."}
                      {activeStatTab === "kompetensi" && "Rangkuman ragam keahlian teknis khusus yang melekat pada personil alumni terdaftar."}
                    </p>
                  </div>

                  {/* Top Items Detail Container */}
                  <div className="space-y-4 pt-4 border-t border-gray-100 max-h-[350px] overflow-y-auto pr-2">
                    {(() => {
                      let activeData: any[] = [];
                      if (activeStatTab === "kecamatan") activeData = distData;
                      else if (activeStatTab === "potensi") activeData = potentialData;
                      else if (activeStatTab === "profesi") activeData = profData;
                      else if (activeStatTab === "kompetensi") activeData = skillData;

                      const maxVal = Math.max(...activeData.map(d => d.value), 1);

                      return activeData.slice(0, 6).map((item, idx) => {
                        const scorePct = Math.round((item.value / totalAlumni) * 100);
                        const progressPct = Math.round((item.value / maxVal) * 100);
                        return (
                          <div key={idx} className="space-y-1.5 group">
                            <div className="flex justify-between items-center text-xs font-sans">
                              <span className="font-bold text-primary group-hover:text-accent font-sans duration-100">{item.name}</span>
                              <div className="space-x-2 text-right font-sans">
                                <span className="font-black text-primary">{item.value} Orang</span>
                                <span className="text-gray-400">({scorePct}%)</span>
                              </div>
                            </div>
                            <div className="w-full h-2 bg-gray-100/70 rounded-full overflow-hidden flex">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                style={{ 
                                  width: `${progressPct}%`,
                                  backgroundColor: idx === 0 ? "#112D75" : idx === 1 ? "#FFD700" : idx === 2 ? "#059669" : "#6366f1"
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
                <div className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 text-left space-y-3.5 backdrop-blur">
                  <span className="block text-[9px] uppercase tracking-widest font-black text-gray-400">Demografi Gender &amp; Kaderisasi</span>
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="border-r border-gray-100 pr-2">
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Rasio L/P</span>
                      <div className="flex gap-2 items-end mt-1 font-sans">
                        <span className="text-sm font-black text-primary">L: {malePct}%</span>
                        <span className="text-xs text-black/50">/</span>
                        <span className="text-sm font-black text-emerald-600">P: {femalePct}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-bold uppercase">Kaderisasi</span>
                      <div className="mt-1 flex flex-wrap gap-1 font-sans">
                        <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-md">Utama: {levelUtama}</span>
                        <span className="text-[9px] font-bold bg-amber-500/10 text-amber-700 px-1.5 py-0.5 rounded-md">Madya: {levelMadya}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Main Chart Panel */}
              <div className="lg:col-span-7 bg-gray-50/40 rounded-3xl border border-gray-100 p-6 flex flex-col justify-center items-center relative overflow-hidden min-h-[400px]">
                
                {/* Embedded Aesthetic Grid Gridmarks */}
                <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none opacity-[0.03] select-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                <div className="w-full h-[360px] relative z-10 font-sans">
                  {activeStatTab === "kecamatan" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={distData.slice(0, 8)}>
                        <XAxis dataKey="name" fontSize={11} axisLine={false} tickLine={false} tick={{ fill: "#4b5563", fontWeight: 600 }} />
                        <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{ fill: "#9ca3af" }} />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: "1.25rem", 
                            border: "1px solid #e2e8f0", 
                            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                            backgroundColor: "#ffffff",
                            fontWeight: 650,
                            fontFamily: "Inter, sans-serif"
                          }}
                          cursor={{ fill: "rgba(17, 45, 117, 0.04)", radius: 8 }} 
                        />
                        <Bar dataKey="value" fill="#112D75" name="Jumlah Alumni" radius={[12, 12, 0, 0]}>
                          {distData.slice(0, 8).map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={index === 0 ? "#112D75" : index === 1 ? "#2046ac" : index === 2 ? "#FFD700" : index % 2 === 0 ? "#059669" : "#6366f1"} 
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
                          innerRadius={80}
                          outerRadius={115}
                          paddingAngle={6}
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
                              strokeWidth={3} 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: "1.25rem", 
                            border: "1px solid #e2e8f0", 
                            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                            backgroundColor: "#ffffff"
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}

                  {activeStatTab === "profesi" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={profData} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" fontSize={11} axisLine={false} tickLine={false} width={130} tick={{ fill: "#112D75", fontWeight: 700 }} />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: "1.25rem", 
                            border: "none", 
                            boxShadow: "0 15px 20px -5px rgb(0 0 0 / 0.08)" 
                          }} 
                        />
                        <Bar dataKey="value" fill="#059669" name="Jumlah" radius={[0, 12, 12, 0]}>
                          {profData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={index === 0 ? "#059669" : index === 1 ? "#10b981" : index === 2 ? "#112D75" : "#FFD700"} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}

                  {activeStatTab === "kompetensi" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillData.slice(0, 6)}>
                        <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{ fill: "#4b5563", fontWeight: 600 }} />
                        <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{ fill: "#9ca3af" }} />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: "1.25rem", 
                            border: "1px solid #e2e8f0", 
                            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" 
                          }} 
                        />
                        <Bar dataKey="value" fill="#FFD700" name="Alumni" radius={[12, 12, 0, 0]}>
                          {skillData.slice(0, 6).map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={index % 2 === 0 ? "#FFD700" : "#112D75"} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Aesthetic Chart Legend Indicator list */}
                {activeStatTab === "potensi" && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center mt-4 text-[10px] font-bold text-gray-500 relative z-10 w-full font-sans">
                    {potentialData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS_LIST[index % COLORS_LIST.length] }} />
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
