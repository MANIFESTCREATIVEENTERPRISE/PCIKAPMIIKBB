import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../assets/images/logo.png";
import AdminSiapPanels from "../components/AdminSiapPanels";
import { GENERATED_SIMULATED_MEMBERS } from "../data/simulatedMembers";
import { 
  Shield, 
  LayoutDashboard, 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  BarChart3, 
  Settings, 
  MessageSquare, 
  Bell, 
  LogOut, 
  Search, 
  ShoppingBag, 
  Handshake, 
  Plus, 
  Trash2, 
  TrendingUp, 
  Package, 
  Clock, 
  Truck, 
  Coins, 
  ArrowRight,
  Sparkles,
  Award,
  Upload,
  Eye,
  EyeOff,
  BookOpen,
  ShieldCheck,
  Check,
  Edit3,
  Tag,
  Lock,
  Globe,
  MessageCircle,
  Zap
} from "lucide-react";

export default function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Set current selected admin fungsional based on query param '?role='
  // Default is 'siap'
  const currentRole = searchParams.get("role") || "siap";
  
  // Active side-menu tab for whichever admin role is selected
  const [activeTab, setActiveTab] = useState("overview");

  // ----------------------------------------------------
  // STATE DEFINITIONS FOR DYNAMIC INTERACTIONS
  // ----------------------------------------------------

  // 1. STATE FOR ADMIN SIAP (Keanggotaan)
  const [pendingApplicants, setPendingApplicants] = useState<any[]>(() => {
    let customList: any[] = [];
    try {
      const savedPending = localStorage.getItem("siap_pending_registrations");
      if (savedPending) {
        customList = JSON.parse(savedPending);
      }
    } catch (e) {
      console.error("Error reading siap_pending_registrations", e);
    }

    const defaults = [
      { 
        id: 1, 
        name: "Nurul Hidayati, S.Pd", 
        gender: "Perempuan",
        pob: "Bandung Barat",
        dob: "12 Mei 1996",
        komisariat: "STAI Ez Muttaqien", 
        year: "MAPABA 2018", 
        loc: "Ngamprah",
        address: "Jl. Raya Ngamprah No. 45, KBB",
        prof: "Guru Honorer",
        phone: "08123445566",
        email: "nurul.h@gmail.com",
        lastEdu: "S1 Pendidikan Agama Islam",
        kaderisasi: { mapaba: 2018, pkd: 2020, pkl: null },
        orgs: ["PC IPPNU KBB", "Fatayat NU"],
        skills: ["Pedagogi", "Public Speaking", "Tahfidz"],
        img: "https://loremflickr.com/150/150/asian,woman,muslim?lock=10"
      },
      { 
        id: 2, 
        name: "Ahmad Fauzan", 
        gender: "Laki-laki",
        pob: "Cimahi",
        dob: "05 April 2000",
        komisariat: "Unjani Padalarang", 
        year: "PKD 2020", 
        loc: "Padalarang",
        address: "Komplek Perumahan Padalarang Indah B2",
        prof: "Mahasiswa Akhir",
        phone: "08123445577",
        email: "fauzan.a@gmail.com",
        lastEdu: "S1 Teknik Informatika (In Progress)",
        kaderisasi: { mapaba: 2019, pkd: 2020, pkl: null },
        orgs: ["Himpunan Mahasiswa TI", "Ansor Padalarang"],
        skills: ["Web Development", "UI/UX Design"],
        img: "https://loremflickr.com/150/150/asian,man,face?lock=20"
      },
      { 
        id: 3, 
        name: "Fatimah Azzahra", 
        gender: "Perempuan",
        pob: "Cipatat",
        dob: "20 Agustus 1999",
        komisariat: "IAI Cipatat", 
        year: "MAPABA 2021", 
        loc: "Cipatat",
        address: "Dusun Cipta Karya, RT 02 RW 05, Cipatat",
        prof: "Fresh Graduate",
        phone: "08123445588",
        email: "fatimah.z@gmail.com",
        lastEdu: "S1 Ekonomi Syariah",
        kaderisasi: { mapaba: 2021, pkd: null, pkl: null },
        orgs: ["KOPRI IAI Cipatat"],
        skills: ["Akuntansi", "Manajemen Keuangan"],
        img: "https://loremflickr.com/150/150/asian,woman,muslim?lock=30"
      },
      { 
        id: 4, 
        name: "M. Ridwan Kurniawan", 
        gender: "Laki-laki",
        pob: "Lembang",
        dob: "15 Januari 1997",
        komisariat: "STAI Lembang", 
        year: "PKD 2019", 
        loc: "Lembang",
        address: "Jl. Maribaya No. 12, Lembang",
        prof: "Wirausaha Muda",
        phone: "08123445599",
        email: "ridwan.k@gmail.com",
        lastEdu: "S1 Manajemen",
        kaderisasi: { mapaba: 2017, pkd: 2019, pkl: 2022 },
        orgs: ["BPC HIPMI KBB", "PC PMII Bandung"],
        skills: ["Business Development", "Networking"],
        img: "https://loremflickr.com/150/150/asian,man,face?lock=40"
      },
      { 
        id: 5, 
        name: "Siti Humairah", 
        gender: "Perempuan",
        pob: "Caringin",
        dob: "30 September 2001",
        komisariat: "Unpas Cipatat", 
        year: "MAPABA 2022", 
        loc: "Cisarua",
        address: "Perumahan Cisarua Asri Blok C-10",
        prof: "Admin Sosmed",
        phone: "08123445500",
        email: "siti.h@gmail.com",
        lastEdu: "SMA (Undergraduate Student)",
        kaderisasi: { mapaba: 2022, pkd: null, pkl: null },
        orgs: ["Ikatan Remaja Masjid"],
        skills: ["Copywriting", "Social Media Management"],
        img: "https://loremflickr.com/150/150/asian,woman,muslim?lock=50"
      }
    ];
    return [...customList, ...defaults];
  });

  // -- SIAP CORE INTEGRATED STATES (7 KEY ADMIN FEATURES) --
  // 1 & 2 & 5. Master Verified Alumni Database (with sensitive fields of all alumni exposed to admin)
  const [verifiedAlumni, setVerifiedAlumni] = useState(() => {
    try {
      const saved = localStorage.getItem("siap_verified_members_db");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 10) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return GENERATED_SIMULATED_MEMBERS;
  });

  // Automatically sync verified members to localStorage
  React.useEffect(() => {
    localStorage.setItem("siap_verified_members_db", JSON.stringify(verifiedAlumni));
  }, [verifiedAlumni]);

  // Selective search / filtering states
  const [directSearch, setDirectSearch] = useState("");
  const [directSector, setDirectSector] = useState("");
  const [directLoc, setDirectLoc] = useState("");
  const [selectedDirectoryAlumni, setSelectedDirectoryAlumni] = useState<any | null>(null);
  const [revealPrivateData, setRevealPrivateData] = useState(true); // default true for admin dashboard as requested

  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");

  useEffect(() => {
    if (selectedDirectoryAlumni) {
      setEditUsername(selectedDirectoryAlumni.username || "");
      setEditPassword(selectedDirectoryAlumni.password || "");
    } else {
      setEditUsername("");
      setEditPassword("");
    }
  }, [selectedDirectoryAlumni]);

  useEffect(() => {
    fetch("/api/submitted-contents")
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setSubmittedContents(data);
        }
      })
      .catch(err => console.error("Error loading submitted contents:", err));

    Promise.all([
      fetch("/api/content/news").then(res => res.json()).catch(() => []),
      fetch("/api/content/articles").then(res => res.json()).catch(() => []),
      fetch("/api/content/announcements").then(res => res.json()).catch(() => [])
    ]).then(([news, articles, announcements]) => {
      const combined = [
        ...news.map((item: any) => ({ ...item, category: "Berita", date: item.date ? new Date(item.date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) : "24 Mei 2026" })),
        ...articles.map((item: any) => ({ ...item, date: item.date ? new Date(item.date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) : "24 Mei 2026" })),
        ...announcements.map((item: any) => ({ ...item, category: "Pengumuman", date: item.date ? new Date(item.date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }) : "24 Mei 2026" }))
      ];
      if (combined.length > 0) {
        setBulletins(combined);
      }
    }).catch(err => console.error("Error loading bulletins:", err));
  }, []);

  // 3. SIAP KONTEN: Curation of user publications
  const [submittedContents, setSubmittedContents] = useState([
    {
      id: 1,
      title: "Urgensi Kebijakan Digitalisasi Pesantren di tatar Bandung Barat",
      author: "H. Saiful Rachman, M.Ag",
      category: "Pikiran Kritis",
      content: "Pesantren di Kabupaten Bandung Barat memiliki kontribusi historis yang amat kuat. Namun, memasuki era revolusi digital, pondok pesantren harus didukung infrastruktur digital yang mumpuni serta program literasi siber madani. IKA PMII mengusulkan perda pesantren yang progresif...",
      date: "23 Mei 2026",
      status: "Menunggu Kurasi",
      views: 0
    },
    {
      id: 2,
      title: "Membangun Jaringan Ritel Berbasis Koperasi Swalayan KAMARA",
      author: "Lina Marlina, S.Ak",
      category: "Ekonomi",
      content: "Swalayan KAMARA bukan sekadar gerai toko fisik, melainkan sistem integrasi kluster UMKM alumni. Melalui pendanaan terstruktur dan rantai pasok lokal, koperasi swalayan kami optimistis mampu bersaing dengan ritel waralaba nasional...",
      date: "21 Mei 2026",
      status: "Diterbitkan",
      views: 142
    },
    {
      id: 3,
      title: "Refleksi Demokrasi Elektoral Bandung Barat: Perspektif Nilai Pergerakan",
      author: "Sandi Supyandi, S.Kom., M.H",
      category: "Opini",
      content: "Kondisi sosiopolitik Bandung Barat membutuhkan kepemimpinan yang berintegritas tinggi serta berlandaskan nilai silih asuh dan keadilan sosial...",
      date: "18 Mei 2026",
      status: "Menunggu Kurasi",
      views: 0
    }
  ]);
  const [editingContent, setEditingContent] = useState<any | null>(null);

  // 4. SIAP DISKUSI: Moderator room
  const [discussionRooms, setDiscussionRooms] = useState([
    {
      id: 1,
      topic: "Tantangan Ketenagakerjaan Lokal KBB & Kesiapan Tenaga Vokasi",
      creator: "Sandi Supyandi, S.Kom., M.H",
      category: "Ketenagakerjaan & Sosial",
      date: "24 Mei 2026",
      membersCount: 24,
      status: "Aktif",
      reports: 0,
      notulensi: "Disepakati pembentukan satgas inkubasi magang kerja profesional bersama jejaring industri di Padalarang dan Batujajar."
    },
    {
      id: 2,
      topic: "Hukum Adat & Perlindungan Hak Ulayat Kawasan Hutan Lembang",
      creator: "Kader Advokasi PMII",
      category: "Hukum & Advokasi",
      date: "22 Mei 2026",
      membersCount: 15,
      status: "Aktif",
      reports: 3, // Flagged for report
      notulensi: ""
    },
    {
      id: 3,
      topic: "Refleksi Suksesi Kepemimpinan Daerah Menuju Pemilukada KBB 2026",
      creator: "Masturi Fajrin, S.Pd.I",
      category: "Politik",
      date: "19 Mei 2026",
      membersCount: 41,
      status: "Ditangguhkan",
      reports: 1,
      notulensi: "Diskusi diarsipkan sementara demi menjaga kondusivitas kelembagan IKA PMII."
    }
  ]);
  const [notulensiEditingId, setNotulensiEditingId] = useState<number | null>(null);
  const [notulensiText, setNotulensiText] = useState("");

  // SIAP Expanded Dashboard Functional States
  const [evaluationRatings, setEvaluationRatings] = useState<Record<number, Record<string, string>>>({});
  const [editingApplicantId, setEditingApplicantId] = useState<number | null>(null);
  const [editApplicantFields, setEditApplicantFields] = useState<any>({});
  const [showRejectModalId, setShowRejectModalId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // SIAP Checkbox Filters
  const [selectedWilayah, setSelectedWilayah] = useState<string[]>([]);
  const [selectedProfesi, setSelectedProfesi] = useState<string[]>([]);
  const [selectedKompetensi, setSelectedKompetensi] = useState<string[]>([]);
  const [selectedMinat, setSelectedMinat] = useState<string[]>([]);
  const [selectedOrgs, setSelectedOrgs] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedUmur, setSelectedUmur] = useState<string[]>([]);

  // SIAP KTA Design Customizer State
  const [ktaLayoutType, setKtaLayoutType] = useState<"portrait" | "landscape">("landscape");
  const [ktaCardColor, setKtaCardColor] = useState("gradient-gold"); // 'gradient-gold', 'gradient-emerald', 'gradient-navy', 'classic-charcoal'
  const [ktaCustomTitle, setKtaCustomTitle] = useState("KARTU TANDA ANGGOTA");
  const [ktaSubtitle, setKtaSubtitle] = useState("IKATAN KELUARGA ALUMNI (IKA PMII) BANDUNG BARAT");
  const [ktaBorderType, setKtaBorderType] = useState("border-accent"); // 'border-accent' | 'border-double' | 'border-none'

  // Admin Konten Creator
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Berita");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostAuthor, setNewPostAuthor] = useState("Administrator");

  // Admin Website Editorial states
  const [webHeroText, setWebHeroText] = useState("KORPS ALUMNI PMII BANDUNG BARAT Sinergi Digital, Berdaya Bersama");
  const [webPrimaryThemeColor, setWebPrimaryThemeColor] = useState("bg-primary"); // emerald green or dark navy bg
  const [webAccentThemeColor, setWebAccentThemeColor] = useState("accent");
  const [webWelcomeTitle, setWebWelcomeTitle] = useState("Portal Utama Satu Data Anggota SIAP");
  const [webWelcomeDesc, setWebWelcomeDesc] = useState("Konsolidasi Alumni & Kader PMII se-Kabupaten Bandung Barat dalam satu genggaman digital.");

  // 6. Interactive Digital Card Maker details
  const [ktaSelectedAlumniId, setKtaSelectedAlumniId] = useState<number>(101);
  const [ktaLevel, setKtaLevel] = useState("KADER UTAMA");
  const [ktaTemplateStyle, setKtaTemplateStyle] = useState("gold"); // 'gold', 'silver', 'emerald'

  const [verifiedTotal, setVerifiedTotal] = useState(1284);
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);
  const [verifyingId, setVerifyingId] = useState<number | null>(null);

  const [selectedPartner, setSelectedPartner] = useState<any | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const [kamaraApplicants, setKamaraApplicants] = useState([
    {
      id: 1,
      ownerName: "H. Maman Abdurrahman",
      businessName: "Koperasi Syariah Barokah Band Barat",
      category: "Koperasi / Jasa Keuangan",
      whatsapp: "081234567890",
      email: "barokah@kamara.id",
      address: "Cihampelas, KBB",
      products: "Layanan Pembiayaan Usaha & Tabungan Sembako",
      desc: "Koperasi simpan pinjam berbasis syariah untuk penguatan permodalan pedagang tradisional.",
      date: "22 Mei 2026",
      status: "Tertunda"
    },
    {
      id: 2,
      ownerName: "Lina Marlina (Alumni 2018)",
      businessName: "Zuppa Soup Kamila",
      category: "UMKM / Kuliner",
      whatsapp: "085721345678",
      email: "kamila_soup@gmail.com",
      address: "Ngamprah, KBB",
      products: "Zuppa Soup Frozen",
      desc: "Olahan sup krim gurih dengan pastry renyah khas eropa yang diproduksi secara higienis bagi masyarakat lokal KBB.",
      date: "21 Mei 2026",
      status: "Tertunda"
    },
    {
      id: 3,
      ownerName: "Rudi Hermawan (Alumni 2012)",
      businessName: "CV Katara Konstruksi",
      category: "UMKM / Jasa",
      whatsapp: "081912345674",
      email: "katara_con@outlook.com",
      address: "Padalarang, KBB",
      products: "Rancang Bangun Rumah & Pasir Putih",
      desc: "Perusahaan sipil pengerjaan proyek renovasi, desain arsitektur 3D hingga penyuplai material konstruksi.",
      date: "15 Mei 2026",
      status: "Disetujui"
    }
  ]);

  const [kamaraPartners, setKamaraPartners] = useState([
    {
      id: 201,
      ownerName: "Kang Faris Al-Fatih (Alumni 2010)",
      businessName: "Al-Fatih Tech Ngamprah",
      category: "Teknologi & Jasa",
      whatsapp: "081223344556",
      address: "Ngamprah, KBB",
      desc: "Penyedia jasa teknologi, pembuatan website, aplikasi koperasi, dan instalasi jaringan internet desa di wilayah Bandung Barat.",
      rating: "4.9",
      joinedDate: "10 April 2025",
      status: "Aktif",
      image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      id: 202,
      ownerName: "Koperasi Unit III Lembang",
      businessName: "KAMARA Coffee Co-op",
      category: "Kuliner & Pertanian",
      whatsapp: "087788990011",
      address: "Lembang, KBB",
      desc: "Unit usaha Koperasi Alumni yang membudidayakan kopi arabika di lereng gunung Tangkuban Perahu serta mendistribusikan biji kopi premium.",
      rating: "4.8",
      joinedDate: "15 Januari 2025",
      status: "Aktif",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      id: 203,
      ownerName: "Ahsan Kamal (Alumni 2015)",
      businessName: "Madu Murni Cihampelas",
      category: "Kuliner & Kesehatan",
      whatsapp: "081394123456",
      address: "Cihampelas, KBB",
      desc: "Peternak lebah madu hutan liar liar di perkebunan Cihampelas. Menyediakan madu murni berkualitas tinggi tanpa olahan kimia.",
      rating: "4.7",
      joinedDate: "02 Maret 2025",
      status: "Aktif",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ]);

  // Announcement and Web CMS state (to let Admin SIAP manage all categories)
  const [bulletins, setBulletins] = useState([
    { 
      id: 1, 
      title: "Launching Aplikasi Database SIAP Keanggotaan", 
      date: "15 Mei 2026", 
      author: "Bidang Organisasi", 
      category: "Pengumuman", 
      content: "Aplikasi SIAP resmi meluncur sebagai pusat integrasi data alumni IKA PMII Bandung Barat berbasis digital dengan fitur visualisasi mandiri, pencetakan KSA, dan pemutakhiran riwayat karir." 
    },
    { 
      id: 2, 
      title: "Musyawarah Cabang PC IKA PMII KBB Periode Baru", 
      date: "10 Mei 2026", 
      author: "Sekretariat Utama", 
      category: "Berita", 
      content: "Kader dari berbagai kecamatan berkumpul dalam kegiatan akbar di Ngamprah untuk merumuskan jajaran kepengurusan cabang baru dan program kerja inklusif." 
    },
    { 
      id: 3, 
      title: "Menatap Masa Depan KBB Melalui Penguatan Sektor Digital", 
      date: "24 Mei 2026", 
      author: "H. Saiful Rachman, M.Ag", 
      category: "Opini", 
      content: "Transformasi teknologi bukan lagi pilihan, melainkan pilar penting bagi kemajuan ekonomi mikro khususnya UMKM alumni di tatar Bandung Barat." 
    },
    { 
      id: 4, 
      title: "Pemberdayaan Santripreneur Berbasis Agribisnis Terintegrasi", 
      date: "20 Mei 2026", 
      author: "Lina Marlina, S.Ak", 
      category: "Artikel", 
      content: "Dengan lahan subur Bandung Barat, koperasi KAMARA berkolaborasi membangun ekosistem pertanian modern yang dikelola langsung para santri purna-pondok." 
    },
    { 
      id: 5, 
      title: "Jajaran Pengurus Harian PC IKA PMII KBB Periode 2025-2029", 
      date: "01 Jan 2026", 
      author: "Tim Kelompok Kerja Pengurus", 
      category: "Daftar Pengurus", 
      content: "Ketua Umum: H. Saiful Rachman, M.Ag | Sekretaris Umum: Sandi Supyandi, S.Kom., M.H | Bendahara Umum: Lina Marlina, S.Ak | Dilengkapi jajaran wakil ketua dan departemen strategis." 
    },
    { 
      id: 6, 
      title: "Modul Pustaka Literasi Rujukan Pergerakan Mahasiswa", 
      date: "18 Mei 2026", 
      author: "Bidang Kaderisasi", 
      category: "Komponen Lainnya", 
      content: "Penyediaan modul bacaan ideologis, metodologi penelitian kualitatif sosiologis, dan buku kepemimpinan Islam Nusantara untuk rujukan instruktur." 
    }
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("Sistem Admin");
  const [newCategory, setNewCategory] = useState("Berita");
  const [newContent, setNewContent] = useState("");
  const [extraRefUrl, setExtraRefUrl] = useState("");
  const [extraSubText, setExtraSubText] = useState("");
  const [editingBulletin, setEditingBulletin] = useState<any | null>(null);
  const [filteredWebCategory, setFilteredWebCategory] = useState("Semua");

  const addBulletin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const now = new Date();
    const dateFormatted = now.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    
    if (editingBulletin) {
      setBulletins(bulletins.map(b => b.id === editingBulletin.id ? {
        ...b,
        title: newTitle,
        author: newAuthor,
        category: newCategory,
        content: newContent,
        extraRefUrl: extraRefUrl,
        extraSubText: extraSubText
      } : b));
      setEditingBulletin(null);
    } else {
      setBulletins([
        { 
          id: Date.now(), 
          title: newTitle, 
          date: dateFormatted, 
          author: newAuthor, 
          category: newCategory, 
          content: newContent || "Konten artikel warta default...",
          extraRefUrl: extraRefUrl,
          extraSubText: extraSubText
        },
        ...bulletins
      ]);
    }
    setNewTitle("");
    setNewContent("");
    setNewAuthor("Sistem Admin");
    setNewCategory("Berita");
    setExtraRefUrl("");
    setExtraSubText("");
  };

  const handleVerify = (id: number) => {
    setVerifyingId(id);
    setTimeout(() => {
      const applicant = pendingApplicants.find(app => app.id === id);
      if (applicant) {
        // Add map and append to verifiedAlumni state, carrying over original detailed fields
        const newAlum = {
          id: Date.now(),
          name: applicant.name,
          gender: applicant.gender === "Perempuan" ? "P" : "L",
          prof: applicant.prof,
          loc: applicant.loc,
          gov: applicant.komisariat,
          ormas: applicant.orgs.join(", "),
          activePos: "Anggota Biasa (Baru)",
          contrib: applicant.skills,
          img: applicant.img,
          whatsapp: applicant.phone,
          whatsappPrivacy: "private", // set to private to show override
          nik: "3217" + Math.floor(100000000000 + Math.random() * 900000000000),
          nikPrivacy: "private",
          generation: applicant.year,
          address: applicant.address,
          email: applicant.email,
          kaderisasi: applicant.year.includes("MAPABA") ? "Kader Pratama" : "Kader Madya",
          
          // Carry over other form inputs
          nickname: applicant.nickname,
          birthPlace: applicant.birthPlace || applicant.pob,
          birthDate: applicant.birthDate || applicant.dob,
          subDistrict: applicant.subDistrict,
          postalCode: applicant.postalCode,
          pmiiHistory: applicant.pmiiHistory,
          educationHistory: applicant.educationHistory,
          professionHistory: applicant.professionHistory,
          businessHistory: applicant.businessHistory,
          maritalStatus: applicant.maritalStatus,
          spouseIsPmii: applicant.spouseIsPmii,
          spouseName: applicant.spouseName,
          spouseProfession: applicant.spouseProfession,
          networks: applicant.networks,
          interests: applicant.interests,
          contributions: applicant.contributions || applicant.skills,
        };
        setVerifiedAlumni(prev => [newAlum, ...prev]);

        // Clean up from siap_pending_registrations queue if present
        try {
          const savedPending = localStorage.getItem("siap_pending_registrations");
          if (savedPending) {
            const parsed = JSON.parse(savedPending);
            const filtered = parsed.filter((app: any) => app.id !== id);
            localStorage.setItem("siap_pending_registrations", JSON.stringify(filtered));
          }
        } catch (e) {
          console.error("Error cleaning verified member from pending list", e);
        }
      }
      setPendingApplicants(pendingApplicants.filter(app => app.id !== id));
      setVerifiedTotal(prev => prev + 1);
      setVerifyingId(null);
    }, 1200);
  };

  // ----------------------------------------------------
  // 2. STATE FOR ADMIN KAMARA (Koperasi & UMKM)
  const [productsQueue, setProductsQueue] = useState([
    { id: 101, name: "Madu Hutan Cihampelas", seller: "Ahsan Kamal (Alumni 2015)", category: "Kuliner", price: "Rp 85.000", status: "Tertunda", stock: 12, desc: "Madu murni kualitas super dari peternak madu hutan Cihampelas, diproses secara konvensional higienis tanpa campuran bahan kimia.", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 102, name: "T-Shirt Pergerakan Premium", seller: "Rijal Syarif (Kader Cipatat)", category: "Fashion", price: "Rp 110.000", status: "Tertunda", stock: 50, desc: "Kaos sablon Cotton Combed 30s premium reaktif dingin, nyaman dipakai rapat harian, dengan desain eksklusif emas PC IKA PMII.", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 103, name: "Kopi Arabika Lembang KAMARA", seller: "Koperasi Unit III Lembang", category: "Kuliner", price: "Rp 45.000", status: "Disetujui", stock: 5, desc: "Biji kopi arabika single origin pilihan dari perkebunan lereng Lembang, disangrai medium dengan cita rasa asam buah eksotis.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 104, name: "Jasa Pembuatan Website Koperasi", seller: "Al-Fatih Tech Ngamprah", category: "Jasa", price: "Mulai Rp 1.500.000", status: "Disetujui", stock: 99, desc: "Pembuatan landing page profil usaha modern repsonsif, terintegrasi manajemen data dan sistem pembayaran QRIS/Transfer.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=150&h=150&q=80" }
  ]);

  const [ordersQueue, setOrdersQueue] = useState([
    { 
      id: "KM-88219", 
      customer: "Dr. Ahmad Wahyudin", 
      customerPhone: "08123456789",
      customerAddress: "Perumahan Padalarang Asri Blok G No. 12, KBB",
      date: "20 Mei 2026", 
      partnerName: "KAMARA Coffee Co-op",
      items: "Kopi KAMARA (2x) + Madu Cihampelas (1x)", 
      itemDetails: [
        { name: "Kopi Arabika Lembang KAMARA", qty: 2, price: 45000 },
        { name: "Madu Hutan Cihampelas", qty: 1, price: 85000 }
      ],
      total: "Rp 175.000", 
      method: "Transfer Bank", 
      status: "Diproses" 
    },
    { 
      id: "KM-88220", 
      customer: "Siti Sa'adah S.E", 
      customerPhone: "08782345678",
      customerAddress: "Jl. Lapangan Olahraga Cipatat No. 42, KBB",
      date: "19 Mei 2026", 
      partnerName: "Rijal Syarif (Kader Cipatat)",
      items: "T-Shirt Pergerakan Premium (1x)", 
      itemDetails: [
        { name: "T-Shirt Pergerakan Premium", qty: 1, price: 110000 }
      ],
      total: "Rp 110.000", 
      method: "QRIS KAMARA", 
      status: "Dalam Pengiriman" 
    },
    { 
      id: "KM-88221", 
      customer: "Kang Sandi Supyandi", 
      customerPhone: "08561234567",
      customerAddress: "Kp. Cigugur RT 03 RW 05, Lembang, KBB",
      date: "18 Mei 2026", 
      partnerName: "Koperasi Unit III Lembang",
      items: "Beras Premium KAMARA 5kg", 
      itemDetails: [
        { name: "Beras Premium KAMARA 5kg", qty: 1, price: 72000 }
      ],
      total: "Rp 72.000", 
      method: "Bayar di Tempat", 
      status: "Selesai" 
    }
  ]);

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductSeller, setNewProductSeller] = useState("");
  const [newProductStock, setNewProductStock] = useState("");
  const [newProductDesc, setNewProductDesc] = useState("");
  const [newProductImage, setNewProductImage] = useState<string | null>(null);

  const approveProduct = (id: number) => {
    setProductsQueue(productsQueue.map(p => p.id === id ? { ...p, status: "Disetujui" } : p));
  };

  const deleteProduct = (id: number) => {
    setProductsQueue(productsQueue.filter(p => p.id !== id));
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;
    setProductsQueue([
      {
        id: Date.now(),
        name: newProductName,
        seller: newProductSeller || "Alumni Mitra",
        category: "Koperasi",
        price: "Rp " + Number(newProductPrice).toLocaleString("id-ID"),
        status: "Disetujui",
        stock: Number(newProductStock) || 25,
        desc: newProductDesc || "Tidak ada deskripsi produk.",
        image: newProductImage || "https://images.unsplash.com/photo-1541256996761-85df2eff3139?auto=format&fit=crop&w=600&h=450&q=80"
      },
      ...productsQueue
    ]);
    setNewProductName("");
    setNewProductPrice("");
    setNewProductSeller("");
    setNewProductStock("");
    setNewProductDesc("");
    setNewProductImage(null);
  };

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrdersQueue(ordersQueue.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  // ----------------------------------------------------
  // 3. STATE FOR ADMIN MITRA KATARA (Kemitraan & CSR)
  const [mitralist, setMitralist] = useState([
    { id: 201, name: "PT Semesta Makmur Raya", field: "Logistik & Pangan", sponsorTier: "Platinum", status: "Aktif", fundContribution: 50000000 },
    { id: 202, name: "Bank Jabar Banten (bjb) Padalarang", field: "Layanan Finansial", sponsorTier: "Gold", status: "Aktif", fundContribution: 30000000 },
    { id: 203, name: "Dinas Tenaga Kerja & Transmigrasi KBB", field: "Pemerintahan & Pelatihan", sponsorTier: "Strategic Partner", status: "Aktif", fundContribution: 0 },
    { id: 204, name: "CV Katara Mandiri Kreatif", field: "Percetakan & Ekspedisi", sponsorTier: "Silver", status: "Masa Penjajakan", fundContribution: 10000000 }
  ]);

  const [csrAllocations, setCsrAllocations] = useState([
    { id: 301, program: "Pelatihan Digital Marketing UMKM Alumni", date: "14 Mei 2026", cost: 12000000, recipient: "Lembaga Pengembangan Ekonomi Cabang" },
    { id: 302, program: "Bantuan Modal Usaha 5 Toko Kelontong Kader", date: "09 Mei 2026", cost: 25000000, recipient: "Koperasi KAMARA" },
    { id: 303, program: "Beasiswa Anak Kader Berprestasi", date: "05 Mei 2026", cost: 8000000, recipient: "Bidang Kemahasiswaan" }
  ]);

  // Calculations for Admin Mitra Katara Social Finance Ledger
  const totalCsrFundsReceived = mitralist.reduce((acc, m) => acc + m.fundContribution, 0);
  const totalCsrAllocated = csrAllocations.reduce((acc, c) => acc + c.cost, 0);
  const remainingCsrBalance = totalCsrFundsReceived - totalCsrAllocated;

  const [newMitraName, setNewMitraName] = useState("");
  const [newMitraField, setNewMitraField] = useState("");
  const [newMitraContribution, setNewMitraContribution] = useState("");
  const [newMitraTier, setNewMitraTier] = useState("Silver");

  const [newAllocProgram, setNewAllocProgram] = useState("");
  const [newAllocRecipient, setNewAllocRecipient] = useState("");
  const [newAllocCost, setNewAllocCost] = useState("");

  const handleAddMitra = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMitraName || !newMitraField) return;
    setMitralist([
      {
        id: Date.now(),
        name: newMitraName,
        field: newMitraField,
        sponsorTier: newMitraTier,
        status: "Aktif",
        fundContribution: Number(newMitraContribution) || 0
      },
      ...mitralist
    ]);
    setNewMitraName("");
    setNewMitraField("");
    setNewMitraContribution("");
  };

  const handleAddAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAllocProgram || !newAllocCost) return;
    setCsrAllocations([
      {
        id: Date.now(),
        program: newAllocProgram,
        recipient: newAllocRecipient || "Satgas Program Strategis",
        cost: Number(newAllocCost) || 0,
        date: "Hari Ini"
      },
      ...csrAllocations
    ]);
    setNewAllocProgram("");
    setNewAllocRecipient("");
    setNewAllocCost("");
  };

  const deleteMitra = (id: number) => {
    setMitralist(mitralist.filter(m => m.id !== id));
  };

  // Helper inside sidebar to reset index selection properly when switching roles
  const handleSwitchRole = (role: string) => {
    setSearchParams({ role });
    setActiveTab("overview");
  };

  // ----------------------------------------------------
  // BRAND COLOR STYLING AND GRAPHICAL SETUP FOR ROLES
  // ----------------------------------------------------
  const getBrandPalette = () => {
    switch (currentRole) {
      case "kamara":
        return {
          primaryBg: "bg-emerald-950",
          textColor: "text-emerald-400",
          accentColor: "border-emerald-600",
          accentHover: "hover:bg-emerald-500/10",
          cardAccent: "text-amber-500",
          sidebarText: "text-emerald-100",
          sidebarHover: "hover:bg-emerald-900/40",
          title: "Admin Mitra Kamara",
          label: "Ekonomi & Koperasi",
          pillBg: "bg-emerald-500"
        };
      case "katara":
        return {
          primaryBg: "bg-indigo-950",
          textColor: "text-indigo-400",
          accentColor: "border-indigo-600",
          accentHover: "hover:bg-indigo-500/10",
          cardAccent: "text-emerald-500",
          sidebarText: "text-indigo-100",
          sidebarHover: "hover:bg-indigo-900/40",
          title: "Admin Mitra Katara",
          label: "Komunikasi & Kemitraan",
          pillBg: "bg-indigo-500"
        };
      case "siap":
      default:
        return {
          primaryBg: "bg-primary", // deep navy from global theme
          textColor: "text-accent", // signature golden yellow
          accentColor: "border-white/5",
          accentHover: "hover:bg-white/5",
          cardAccent: "text-accent",
          sidebarText: "text-surface/50",
          sidebarHover: "hover:bg-white/5",
          title: "Admin SIAP Console",
          label: "Basis Data & Keanggotaan",
          pillBg: "bg-accent"
        };
    }
  };

  const brand = getBrandPalette();

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-surface text-primary">
      
      {/* ---------------------------------------------------------------- */}
      {/* SIDEBAR NAVIGATION PANEL (ADAPTER DESIGN)                       */}
      {/* ---------------------------------------------------------------- */}
      <aside className={`w-80 ${brand.primaryBg} text-white flex flex-col relative overflow-hidden transition-all duration-500 shrink-0`}>
        
        {/* Ambient background decoration */}
        <div className="absolute inset-x-0 top-0 h-64 bg-white/5 blur-3xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="p-8 relative z-10 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-accent rounded-[1.25rem] flex items-center justify-center text-primary shadow-xl shadow-accent/20`}>
              {currentRole === "siap" && <Shield size={26} />}
              {currentRole === "kamara" && <ShoppingBag size={26} />}
              {currentRole === "katara" && <Handshake size={26} />}
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl text-accent tracking-tighter leading-none">{brand.title}</span>
              <span className="text-[9px] font-bold text-white/55 uppercase tracking-wider mt-1.5">{brand.label}</span>
            </div>
          </div>
        </div>



        {/* Role-adaptive sidebar menu items */}
        <nav className="flex-grow px-4 space-y-1.5 mt-6 relative z-10 overflow-y-auto max-h-[60vh] custom-scrollbar">
          
          {/* General Overview Tab */}
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-4 px-5 py-3 rounded-[1.125rem] text-xs font-black transition-all relative ${
              activeTab === "overview" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
            }`}
          >
            <LayoutDashboard size={18} className="shrink-0" />
            <span>1. RINGKASAN PORTAL</span>
            {activeTab === "overview" && (
              <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
            )}
          </button>

          {/* ----------------- SIAP CONSOLE TABS ----------------- */}
          {currentRole === "siap" && (
            <>
              {/* 2. Verifikasi Anggota */}
              <button
                onClick={() => setActiveTab("siap_verifikasi")}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-[1.125rem] text-xs font-black transition-all relative ${
                  activeTab === "siap_verifikasi" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <Users size={17} className="shrink-0" />
                <span className="truncate">2. VERIFIKASI ANGGOTA</span>
                {pendingApplicants.length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{pendingApplicants.length}</span>
                )}
                {activeTab === "siap_verifikasi" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>

              {/* 3. Admin SIAP Pedia */}
              <button
                onClick={() => setActiveTab("siap_pedia")}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-[1.125rem] text-xs font-black transition-all relative ${
                  activeTab === "siap_pedia" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <BookOpen size={17} className="shrink-0" />
                <span className="truncate">3. ADMIN SIAP PEDIA</span>
                {activeTab === "siap_pedia" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>

              {/* 4. Admin SIAP Konten */}
              <button
                onClick={() => setActiveTab("siap_konten")}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-[1.125rem] text-xs font-black transition-all relative ${
                  activeTab === "siap_konten" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <FileText size={17} className="shrink-0" />
                <span className="truncate">4. ADMIN SIAP KONTEN</span>
                {submittedContents.filter(c => c.status === "Menunggu Kurasi").length > 0 && (
                  <span className="ml-auto bg-amber-500 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {submittedContents.filter(c => c.status === "Menunggu Kurasi").length}
                  </span>
                )}
                {activeTab === "siap_konten" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>

              {/* 5. Admin SIAP Diskusi */}
              <button
                onClick={() => setActiveTab("siap_diskusi")}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-[1.125rem] text-xs font-black transition-all relative ${
                  activeTab === "siap_diskusi" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <MessageSquare size={17} className="shrink-0" />
                <span className="truncate">5. ADMIN SIAP DISKUSI</span>
                {discussionRooms.filter(r => r.reports > 0).length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md animate-pulse">!</span>
                )}
                {activeTab === "siap_diskusi" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>

              {/* 6. Admin SIAP Chat */}
              <button
                onClick={() => setActiveTab("siap_chat")}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-[1.125rem] text-xs font-black transition-all relative ${
                  activeTab === "siap_chat" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <MessageCircle size={17} className="shrink-0" />
                <span className="truncate">6. ADMIN SIAP CHAT</span>
                {activeTab === "siap_chat" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>

              {/* 7. Admin SIAP KTA */}
              <button
                onClick={() => setActiveTab("siap_kta")}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-[1.125rem] text-xs font-black transition-all relative ${
                  activeTab === "siap_kta" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <Award size={17} className="shrink-0" />
                <span className="truncate">7. ADMIN SIAP KTA</span>
                {activeTab === "siap_kta" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>

              {/* 8. Admin SIAP AKUN */}
              <button
                onClick={() => setActiveTab("siap_akun")}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-[1.125rem] text-xs font-black transition-all relative ${
                  activeTab === "siap_akun" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <Lock size={17} className="shrink-0" />
                <span className="truncate">8. ADMIN SIAP AKUN</span>
                {activeTab === "siap_akun" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>

              {/* 9. Admin WEBSITE */}
              <button
                onClick={() => setActiveTab("siap_web")}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-[1.125rem] text-xs font-black transition-all relative ${
                  activeTab === "siap_web" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <Globe size={17} className="shrink-0" />
                <span className="truncate">9. ADMIN WEBSITE</span>
                {activeTab === "siap_web" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>

              {/* 10. Pengaturan */}
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-[1.125rem] text-xs font-black transition-all relative ${
                  activeTab === "settings" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <Settings size={17} className="shrink-0" />
                <span className="truncate">10. PENGATURAN</span>
                {activeTab === "settings" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>
            </>
          )}

          {/* ----------------- KAMARA CONSOLE TABS ----------------- */}
          {currentRole === "kamara" && (
            <>
              <button
                onClick={() => setActiveTab("kamara_applicants")}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-xs font-black transition-all relative ${
                  activeTab === "kamara_applicants" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <FileText size={20} className="shrink-0" />
                <span>PERMOHONAN KERJA SAMA</span>
                {kamaraApplicants.filter(a => a.status === "Tertunda").length > 0 && (
                  <span className="ml-auto bg-amber-500 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {kamaraApplicants.filter(a => a.status === "Tertunda").length}
                  </span>
                )}
                {activeTab === "kamara_applicants" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("kamara_partners")}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-xs font-black transition-all relative ${
                  activeTab === "kamara_partners" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <Users size={20} className="shrink-0" />
                <span>PROFIL MITRA KAMARA</span>
                {activeTab === "kamara_partners" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("kamara_products")}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-xs font-black transition-all relative ${
                  activeTab === "kamara_products" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <Package size={20} className="shrink-0" />
                <span>PRODUK & UMKM ALUMNI</span>
                {activeTab === "kamara_products" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("kamara_orders")}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-xs font-black transition-all relative ${
                  activeTab === "kamara_orders" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <TrendingUp size={20} className="shrink-0" />
                <span>PESANAN & DETAIL TRANSAKSI</span>
                {ordersQueue.filter(o => o.status === "Diproses").length > 0 && (
                  <span className="ml-auto bg-amber-500 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {ordersQueue.filter(o => o.status === "Diproses").length}
                  </span>
                )}
                {activeTab === "kamara_orders" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>
            </>
          )}

          {/* ----------------- MITRA KATARA CONSOLE TABS ----------------- */}
          {currentRole === "katara" && (
            <>
              <button
                onClick={() => setActiveTab("katara_alliances")}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-xs font-black transition-all relative ${
                  activeTab === "katara_alliances" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <Handshake size={20} className="shrink-0" />
                <span>DAFTAR MITRA & SPONSOR</span>
                {activeTab === "katara_alliances" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("katara_finance")}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-xs font-black transition-all relative ${
                  activeTab === "katara_finance" ? "bg-accent text-primary shadow-lg" : "text-white/60 hover:bg-white/5"
                }`}
              >
                <Coins size={20} className="shrink-0" />
                <span>KAS SOSIAL & CSR</span>
                {activeTab === "katara_finance" && (
                  <motion.div layoutId="sidebarPill" className="absolute right-3 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>
            </>
          )}
        </nav>

        {/* Back and exit */}
        <div className="p-6 border-t border-white/10 relative z-10 space-y-3">
          <Link 
            to="/login"
            className="w-full flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-xs font-extrabold text-red-100 hover:bg-red-500/15 transition-all bg-white/5"
          >
            <LogOut size={20} className="shrink-0" />
            <span>GANTI USER PORTAL</span>
          </Link>
        </div>
      </aside>

      {/* ---------------------------------------------------------------- */}
      {/* MAIN CONTENT AREA                                                */}
      {/* ---------------------------------------------------------------- */}
      <main className="flex-grow p-12 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Header section with brand contextual display removed */}

          <AnimatePresence mode="wait">
            
            {/* SIAP CONSOLE RENDER BLOCKS VIA ENHANCED MODULAR COMPONENT */}
            {currentRole === "siap" && (
              <AdminSiapPanels
                key="admin-siap-panels"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                pendingApplicants={pendingApplicants}
                setPendingApplicants={setPendingApplicants}
                verifiedAlumni={verifiedAlumni}
                setVerifiedAlumni={setVerifiedAlumni}
                submittedContents={submittedContents}
                setSubmittedContents={setSubmittedContents}
                discussionRooms={discussionRooms}
                setDiscussionRooms={setDiscussionRooms}
                bulletins={bulletins}
                setBulletins={setBulletins}
              />
            )}

            {/* ------------------------------------------------------------- */}
            {/* 1. GENERAL OVERVIEWS PER FUNGSIONAL ROLE                      */}
            {/* ------------------------------------------------------------- */}
            {activeTab === "overview" && currentRole !== "siap" && (
              <motion.div 
                key={`${currentRole}-overview`}
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: -20 }}
                className="space-y-12"
              >
                {/* Visual Banner */}
                <div className={`${brand.primaryBg} rounded-[3rem] p-10 md:p-12 text-white relative overflow-hidden shadow-2xl`}>
                  <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden md:block">
                    {currentRole === "siap" && <Shield size={250} />}
                    {currentRole === "kamara" && <ShoppingBag size={250} />}
                    {currentRole === "katara" && <Handshake size={250} />}
                  </div>
                  
                  <div className="relative z-10 max-w-xl space-y-4">
                    <span className="inline-flex py-1.5 px-4 bg-white/10 rounded-full text-[10px] tracking-widest uppercase font-black text-accent backdrop-blur-sm">
                      KONSOL FUNGSIONAL AKTIF
                    </span>
                    <h3 className="text-3xl font-display font-black leading-tight italic">
                      {currentRole === "siap" && "Selamat Datang di Hub Kendali Keanggotaan SIAP"}
                      {currentRole === "kamara" && "Selamat Datang di Pengendalian Niaga Koperasi KAMARA"}
                      {currentRole === "katara" && "Selamat Datang di Sentra Aliansi Mitra Katara"}
                    </h3>
                    <p className="text-xs text-white/85 leading-relaxed font-sans font-medium">
                      Sistem integrasi ini mempermudah Anda melakukan tata kelola yang transparan, instan, dan terdokumentasi rapi untuk kemajuan kader-alumni se-Bandung Barat.
                    </p>
                  </div>
                </div>

                {/* Ringkasan Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {currentRole === "siap" && (
                    <>
                      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-4">
                        <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                          <Users size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Terverifikasi</p>
                          <h4 className="text-3xl font-display font-black text-primary mt-1">{verifiedTotal} <span className="text-xs font-semibold text-gray-400">Anggota</span></h4>
                        </div>
                      </div>

                      <button 
                        onClick={() => setActiveTab("siap_verifikasi")}
                        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl text-left hover:scale-[1.02] transition-all space-y-4 group cursor-pointer"
                      >
                        <div className="w-12 h-12 bg-accent/20 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-accent transition-colors">
                          <Shield size={22} />
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Menunggu Validasi</p>
                            <h4 className="text-3xl font-display font-black text-primary mt-1">{pendingApplicants.length} <span className="text-xs font-semibold text-gray-400">Calon</span></h4>
                          </div>
                          <span className="text-accent group-hover:translate-x-2 transition-transform">&rarr;</span>
                        </div>
                      </button>

                      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-4">
                        <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                          <FileText size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Warta Aktif</p>
                          <h4 className="text-3xl font-display font-black text-primary mt-1">{bulletins.length} <span className="text-xs font-semibold text-gray-400">Rilis</span></h4>
                        </div>
                      </div>
                    </>
                  )}

                  {currentRole === "kamara" && (
                    <>
                      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-4">
                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center">
                          <Package size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Etalase Produk</p>
                          <h4 className="text-3xl font-display font-black text-primary mt-1">
                            {productsQueue.length} <span className="text-xs font-semibold text-gray-400">Item Terdaftar</span>
                          </h4>
                        </div>
                      </div>

                      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-4">
                        <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center">
                          <TrendingUp size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Antrean Pesanan</p>
                          <h4 className="text-3xl font-display font-black text-primary mt-1 text-amber-600">
                            {ordersQueue.filter(o => o.status === "Diproses").length} <span className="text-xs font-semibold text-gray-400">Pesanan</span>
                          </h4>
                        </div>
                      </div>

                      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-4">
                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center">
                          <Clock size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gudang Koperasi</p>
                          <h4 className="text-3xl font-display font-black text-primary mt-1">
                            {productsQueue.filter(p => p.stock <= 5).length} <span className="text-xs font-semibold text-red-500">Stok Kritis (&le;5)</span>
                          </h4>
                        </div>
                      </div>
                    </>
                  )}

                  {currentRole === "katara" && (
                    <>
                      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-4">
                        <div className="w-12 h-12 bg-indigo-500/10 text-indigo-600 rounded-xl flex items-center justify-center">
                          <Handshake size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mitra Korporasi</p>
                          <h4 className="text-3xl font-display font-black text-primary mt-1">
                            {mitralist.length} <span className="text-xs font-semibold text-gray-400 text-primary">Alliansi</span>
                          </h4>
                        </div>
                      </div>

                      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-4">
                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center">
                          <Coins size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kas CSR Masuk</p>
                          <h4 className="text-[20px] font-display font-black text-emerald-600 mt-2">
                            Rp {totalCsrFundsReceived.toLocaleString("id-ID")}
                          </h4>
                        </div>
                      </div>

                      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-4">
                        <div className="w-12 h-12 bg-indigo-500/10 text-indigo-600 rounded-xl flex items-center justify-center">
                          <Plus size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dana Sisa Alokasi</p>
                          <h4 className="text-[20px] font-display font-black text-indigo-600 mt-2">
                            Rp {remainingCsrBalance.toLocaleString("id-ID")}
                          </h4>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* ----------------------------------------------------------- */}
                {/* CONTEXTUAL QUICK TABLES CAROUSEL                            */}
                {/* ----------------------------------------------------------- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
                  
                  {/* Left Column depending on role */}
                  <div className="lg:col-span-2 bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
                    <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-primary/5">
                      <h3 className="text-xl font-display font-black text-primary italic">
                        {currentRole === "siap" && "Antrean Validasi Akun"}
                        {currentRole === "kamara" && "Status Pemesanan Ritel Terbaru"}
                        {currentRole === "katara" && "List Alliansi Kemitraan Aktif"}
                      </h3>
                      <button 
                        onClick={() => {
                          if (currentRole === "siap") setActiveTab("siap_verifikasi");
                          if (currentRole === "kamara") setActiveTab("kamara_orders");
                          if (currentRole === "katara") setActiveTab("katara_alliances");
                        }} 
                        className="text-[10px] font-black uppercase text-accent bg-primary px-4 py-2 rounded-full"
                      >
                        Kelola Semua &rarr;
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      {currentRole === "siap" && (
                        <table className="w-full text-left">
                          <thead>
                            <tr className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] bg-surface/50">
                              <th className="px-8 py-5">Pemohon</th>
                              <th className="px-8 py-5">Komisariat</th>
                              <th className="px-8 py-5 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-55">
                            {pendingApplicants.slice(0, 3).map((applicant) => (
                              <tr key={applicant.id} className="hover:bg-surface/50 transition-colors group cursor-pointer" onClick={() => setSelectedApplicant(applicant)}>
                                <td className="px-8 py-5">
                                  <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100 scale-95 group-hover:scale-100 transition-all">
                                      <img src={applicant.img} className="w-full h-full object-cover" alt={applicant.name} referrerPolicy="no-referrer" />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-extrabold text-primary text-xs">{applicant.name}</span>
                                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{applicant.year}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-8 py-5">
                                  <span className="text-xs font-bold text-gray-600">{applicant.komisariat}</span>
                                </td>
                                <td className="px-8 py-5 text-right space-x-2">
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); setSelectedApplicant(applicant); }}
                                    className="bg-primary/5 text-primary text-[9px] font-black py-1.5 px-4 rounded-lg hover:bg-accent hover:text-primary transition-all"
                                  >
                                    Cek
                                  </button>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); handleVerify(applicant.id); }}
                                    className="bg-primary text-accent text-[9px] font-black py-1.5 px-4 rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md"
                                  >
                                    Valid
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {pendingApplicants.length === 0 && (
                              <tr>
                                <td colSpan={3} className="text-center py-10 text-gray-400 text-xs font-bold font-sans">
                                  Woohoo! Tidak ada antrean validasi baru.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}

                      {currentRole === "kamara" && (
                        <table className="w-full text-left">
                          <thead>
                            <tr className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] bg-surface/50">
                              <th className="px-8 py-5">Order ID</th>
                              <th className="px-8 py-5">Pemesan</th>
                              <th className="px-8 py-5">Nilai Transaksi</th>
                              <th className="px-8 py-5 text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-55">
                            {ordersQueue.map((o) => (
                              <tr key={o.id} className="hover:bg-surface/50 transition-colors">
                                <td className="px-8 py-5 font-mono text-xs font-bold text-gray-700">{o.id}</td>
                                <td className="px-8 py-5">
                                  <div className="flex flex-col">
                                    <span className="font-extrabold text-primary text-xs">{o.customer}</span>
                                    <span className="text-[9px] text-gray-400 font-bold leading-none mt-1">{o.items}</span>
                                  </div>
                                </td>
                                <td className="px-8 py-5 font-sans font-black text-xs text-primary">{o.total}</td>
                                <td className="px-8 py-5 text-right">
                                  <span className={`inline-block py-1 px-3 text-[9px] font-black uppercase rounded-full ${
                                    o.status === "Selesai" ? "bg-emerald-100 text-emerald-800" :
                                    o.status === "Dalam Pengiriman" ? "bg-indigo-100 text-indigo-800" :
                                    "bg-amber-100 text-amber-800"
                                  }`}>
                                    {o.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}

                      {currentRole === "katara" && (
                        <table className="w-full text-left">
                          <thead>
                            <tr className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] bg-surface/50">
                              <th className="px-8 py-5">Nama Perusahaan</th>
                              <th className="px-8 py-5">Sektor Industri</th>
                              <th className="px-8 py-5">Format Tier</th>
                              <th className="px-8 py-5 text-right">Fund Value</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-55">
                            {mitralist.map((m) => (
                              <tr key={m.id} className="hover:bg-surface/50 transition-colors">
                                <td className="px-8 py-5 font-extrabold text-primary text-xs">{m.name}</td>
                                <td className="px-8 py-5 text-xs text-gray-500 font-medium">{m.field}</td>
                                <td className="px-8 py-5">
                                  <span className="font-semibold text-[10px] text-primary">{m.sponsorTier}</span>
                                </td>
                                <td className="px-8 py-5 text-right text-xs font-black font-sans text-emerald-600">
                                  Rp {m.fundContribution.toLocaleString("id-ID")}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>

                  {/* Right Column depending on role */}
                  <div className="space-y-8">
                    {/* SIAP Side Info */}
                    {currentRole === "siap" && (
                      <div className="bg-primary p-8 rounded-[2.5rem] text-accent space-y-6 relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-accent/5 blur-3xl rounded-full"></div>
                        <h4 className="text-lg font-display font-black italic text-white">Statistik Wilayah KBB</h4>
                        <div className="space-y-3 relative z-10 text-white/95">
                          <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                            <span className="opacity-80">Padalarang</span>
                            <span className="font-black text-accent font-sans">345 Anggota</span>
                          </div>
                          <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                            <span className="opacity-80">Ngamprah (Sentra)</span>
                            <span className="font-black text-accent font-sans">412 Anggota</span>
                          </div>
                          <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                            <span className="opacity-80">Lembang</span>
                            <span className="font-black text-accent font-sans">289 Anggota</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="opacity-80">Cipatat & Lainnya</span>
                            <span className="font-black text-accent font-sans">238 Anggota</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* KAMARA Side Info */}
                    {currentRole === "kamara" && (
                      <div className="bg-emerald-950 p-8 rounded-[2.5rem] text-emerald-100 space-y-6 relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-white/5 blur-3xl"></div>
                        <h4 className="text-lg font-display font-black italic text-accent">Suplier Koperasi Teraktif</h4>
                        <div className="space-y-3 relative z-10 text-white/95">
                          <div className="flex justify-between items-center text-xs pb-2 border-b border-emerald-900">
                            <span className="opacity-80">Ritel KAMARA Padalarang</span>
                            <span className="font-sans font-extrabold text-accent">140 Pasokan/Bulan</span>
                          </div>
                          <div className="flex justify-between items-center text-xs pb-2 border-b border-emerald-900">
                            <span className="opacity-80">Mitra Pertanian Lembang</span>
                            <span className="font-sans font-extrabold text-accent">90 Pasokan/Bulan</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="opacity-80">UMK Kreatif Cihampelas</span>
                            <span className="font-sans font-extrabold text-accent">55 Pasokan/Bulan</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* KATARA Side Info */}
                    {currentRole === "katara" && (
                      <div className="bg-indigo-950 p-8 rounded-[2.5rem] text-indigo-100 space-y-6 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                        <h4 className="text-lg font-display font-black italic text-accent">Agenda Katara CSR Kerja</h4>
                        <div className="space-y-4 text-xs font-medium">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-accent font-black text-[9px] uppercase tracking-wider mb-1">Status Terkini</p>
                            <p className="text-white">Alokasi Beasiswa 100% Rampung disalurkan.</p>
                          </div>
                          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-accent font-black text-[9px] uppercase tracking-wider mb-1">Agenda Terdekat</p>
                            <p className="text-white">Pelatihan Digital Marketing UMKM Lanjutan diselenggarakan Juli 2026.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-amber-400 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-all cursor-pointer">
                      <h4 className="text-2xl font-display font-bold text-primary italic leading-tight">Database <br/>Encrypted</h4>
                      <p className="text-[10px] text-primary/75 mt-2 font-bold uppercase tracking-wider">Keamanan & AD/ART Terpantau</p>
                      <div className="mt-6 flex items-end justify-between">
                        <div className="w-12 h-12 bg-primary text-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <CheckCircle size={24} />
                        </div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest font-mono">SERVER 3000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 2. ADMIN SIAP SUB PAGES                                       */}
            {/* ------------------------------------------------------------- */}
            {/* ------------------------------------------------------------- */}
            {/* 2. ADMIN SIAP SUB PAGES (7 CORE WORKFLOW FEATURES)            */}
            {/* ------------------------------------------------------------- */}
            
            {/* FEATURE 1: VERIFIKASI ANGGOTA BARU */}
            {activeTab === "siap_verifikasi" && currentRole === "siap_by_modular" && (
              <motion.div 
                key="siap_verifikasi_page"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: -15 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                      <h3 className="text-2xl font-display font-black text-primary leading-none">Verifikasi Keanggotaan Masuk</h3>
                    </div>
                    <p className="text-xs text-gray-400 font-medium font-sans">Kurasi berkas form isian kader baru hasil rujukan dari halaman pendaftaran mandiri.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-red-50 text-red-500 font-bold px-4 py-2.5 rounded-xl border border-red-100 font-mono">
                      {pendingApplicants.length} Calon Menunggu Verifikasi
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pendingApplicants.map((applicant) => (
                    <motion.div 
                      key={applicant.id}
                      whileHover={{ y: -6 }}
                      className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col group"
                    >
                      <div className="p-8 space-y-6 flex-grow">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-inner border border-gray-100 shrink-0">
                            <img src={applicant.img} className="w-full h-full object-cover" alt={applicant.name} referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-primary text-sm group-hover:text-accent transition-colors">{applicant.name}</h4>
                            <span className="inline-block text-[9px] bg-slate-100 text-gray-500 font-bold px-2 py-0.5 rounded-md mt-1 font-mono uppercase tracking-wider">{applicant.year}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs font-bold text-gray-600">
                          <div className="flex justify-between p-2.5 bg-surface rounded-xl">
                            <span className="text-[9px] text-gray-400 uppercase tracking-widest">Kecamatan/Kawasan</span>
                            <span>{applicant.loc}</span>
                          </div>
                          <div className="flex justify-between p-2.5 bg-surface rounded-xl">
                            <span className="text-[9px] text-gray-400 uppercase tracking-widest">Rekom Komisariat</span>
                            <span className="truncate max-w-[150px]">{applicant.komisariat}</span>
                          </div>
                          <div className="flex justify-between p-2.5 bg-surface rounded-xl">
                            <span className="text-[9px] text-gray-400 uppercase tracking-widest">Profesi Utama</span>
                            <span className="truncate max-w-[150px]">{applicant.prof}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-surface/40 border-t border-gray-50 flex gap-2">
                        <button 
                          onClick={() => setSelectedApplicant(applicant)}
                          className="flex-grow py-3 bg-white border border-gray-100 text-primary text-[10px] font-black uppercase rounded-xl hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                        >
                          Cek Berkas
                        </button>
                        <button 
                          onClick={() => handleVerify(applicant.id)}
                          disabled={verifyingId === applicant.id}
                          className="flex-grow py-3 bg-primary text-accent text-[10px] font-black uppercase rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
                        >
                          {verifyingId === applicant.id ? (
                            <span className="flex items-center justify-center gap-1">
                              <span className="w-2 h-2 border-2 border-accent border-t-transparent rounded-full animate-spin"></span>
                              Memproses...
                            </span>
                          ) : "Lulus Valid"}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  {pendingApplicants.length === 0 && (
                    <div className="col-span-full bg-white rounded-[3rem] p-16 text-center shadow-lg border border-gray-100">
                      <p className="text-gray-450 text-sm font-bold font-sans">Hebat! Semua berkas calon pendaftar sudah berhasil disaring dan divalidasi!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* FEATURE 2 & 5: AKSES DIREKTORI ALUMNI & DATA PRIVAT ADMIN EYE */}
            {activeTab === "siap_directory" && currentRole === "siap_by_modular" && (
              <motion.div 
                key="siap_directory_page"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: -15 }}
                className="space-y-8"
              >
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="text-accent" size={24} />
                        <h3 className="text-xl font-display font-black text-primary">Akses Direktori Utama Alumni (SIAP)</h3>
                      </div>
                      <p className="text-xs text-gray-400 font-medium font-sans">
                        Otoritas Admin Tertinggi: Seluruh data privat yang disembunyikan anggota dibypass penuh untuk keperluan verifikasi identitas nasional.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-accent/20 px-4 py-2 rounded-xl">
                        🔒 ADMIN PRIVILEGE ACTIVE
                      </span>
                    </div>
                  </div>

                  {/* Filters bar */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Cari Nama / NIK..." 
                        value={directSearch}
                        onChange={(e) => setDirectSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-surface border border-gray-150 rounded-2xl text-xs font-bold text-primary focus:outline-none focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                    <div>
                      <select 
                        value={directSector}
                        onChange={(e) => setDirectSector(e.target.value)}
                        className="w-full px-5 py-3.5 bg-surface border border-gray-150 rounded-2xl text-xs font-bold text-primary focus:outline-none focus:ring-2 focus:ring-accent/20"
                      >
                        <option value="">Semua Bidang Kompetensi</option>
                        <option value="Pendidikan">Pendidikan</option>
                        <option value="Agama">Agama</option>
                        <option value="Sosial">Sosial</option>
                        <option value="Hukum">Hukum</option>
                        <option value="Teknologi">Teknologi</option>
                        <option value="Advokasi">Advokasi</option>
                        <option value="Ekonomi">Ekonomi</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        value={directLoc}
                        onChange={(e) => setDirectLoc(e.target.value)}
                        className="w-full px-5 py-3.5 bg-surface border border-gray-150 rounded-2xl text-xs font-bold text-primary focus:outline-none focus:ring-2 focus:ring-accent/20"
                      >
                        <option value="">Semua Kecamatan (KBB)</option>
                        <option value="Ngamprah">Ngamprah</option>
                        <option value="Padalarang">Padalarang</option>
                        <option value="Lembang">Lembang</option>
                        <option value="Cipatat">Cipatat</option>
                        <option value="Cihampelas">Cihampelas</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Results List */}
                  <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-slate-50 border-b border-gray-100">
                            <th className="px-6 py-4.5">Nama & Wilayah</th>
                            <th className="px-6 py-4.5 text-center">Bypass NIK (Privat)</th>
                            <th className="px-6 py-4.5 text-center">Bypass WhatsApp</th>
                            <th className="px-6 py-4.5 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {verifiedAlumni
                            .filter(a => {
                              const matchesSearch = a.name.toLowerCase().includes(directSearch.toLowerCase()) || a.nik.includes(directSearch);
                              const matchesSector = !directSector || a.contrib.includes(directSector);
                              const matchesLoc = !directLoc || a.loc === directLoc;
                              return matchesSearch && matchesSector && matchesLoc;
                            })
                            .map((alum) => (
                              <tr 
                                key={alum.id} 
                                className={`hover:bg-slate-50/55 transition-colors cursor-pointer ${selectedDirectoryAlumni?.id === alum.id ? "bg-accent/5" : ""}`}
                                onClick={() => setSelectedDirectoryAlumni(alum)}
                              >
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                                      <img src={alum.img} className="w-full h-full object-cover" alt={alum.name} referrerPolicy="no-referrer" />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="font-extrabold text-primary text-xs leading-snug">{alum.name}</span>
                                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{alum.loc} &bull; {alum.generation}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <div className="inline-flex flex-col items-center">
                                    <span className="font-mono text-xs font-black text-amber-600 flex items-center gap-1.5 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded">
                                      <Eye size={12} />
                                      {alum.nik}
                                    </span>
                                    <span className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Status: Private</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <div className="inline-flex flex-col items-center">
                                    <span className="font-mono text-xs font-black text-emerald-600 flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded">
                                      <Eye size={12} />
                                      {alum.whatsapp}
                                    </span>
                                    <span className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Status: Private</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedDirectoryAlumni(alum);
                                    }}
                                    className="p-2 bg-primary/5 hover:bg-primary hover:text-white rounded-lg transition-colors text-primary cursor-pointer"
                                  >
                                    <Eye size={14} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          {verifiedAlumni.length === 0 && (
                            <tr>
                              <td colSpan={4} className="text-center py-12 text-gray-400 text-xs font-bold font-sans">
                                Tidak ada alumni yang sesuai dengan filter pencarian.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Sidebar Alumnus Bento Details (Show detailed private data including address) */}
                  <div className="space-y-6">
                    {selectedDirectoryAlumni ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6 text-left"
                      >
                        <div className="text-center space-y-3 pb-6 border-b border-gray-100">
                          <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-md mx-auto border border-gray-150 relative">
                            <img src={selectedDirectoryAlumni.img} className="w-full h-full object-cover" alt={selectedDirectoryAlumni.name} referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <span className="text-[9px] bg-accent text-primary font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              {typeof selectedDirectoryAlumni.kaderisasi === "string"
                                ? selectedDirectoryAlumni.kaderisasi
                                : selectedDirectoryAlumni.kaderisasi?.pkl
                                ? "Kader Utama"
                                : selectedDirectoryAlumni.kaderisasi?.pkd
                                ? "Kader Madya"
                                : "Kader Pratama"}
                            </span>
                            <h4 className="font-extrabold text-primary text-base mt-1">{selectedDirectoryAlumni.name}</h4>
                            <p className="text-[10px] text-gray-400 font-bold font-mono mt-0.5">{selectedDirectoryAlumni.generation}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1">
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Alamat Lengkap (Privat Bypass)</span>
                            <p className="text-xs font-bold text-gray-700 bg-slate-50 border border-gray-100 p-2.5 rounded-xl font-mono leading-relaxed">
                              🔓 {selectedDirectoryAlumni.address}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Pekerjaan</span>
                              <p className="text-xs font-bold text-primary truncate">{selectedDirectoryAlumni.prof}</p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Email</span>
                              <p className="text-xs font-bold text-primary truncate">{selectedDirectoryAlumni.email}</p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Komisariat Asal</span>
                            <p className="text-xs font-bold text-primary">{selectedDirectoryAlumni.gov}</p>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Jejaring Ormas NU</span>
                            <p className="text-xs font-bold text-primary truncate">{selectedDirectoryAlumni.ormas}</p>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest block">Kompetensi Alumni</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedDirectoryAlumni.contrib.map((tag: string, idx: number) => (
                                <span key={idx} className="text-[9px] font-bold text-primary px-2 py-0.5 bg-slate-50 border border-gray-100 rounded-md">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Credentials Admin Management Block */}
                          <div className="space-y-4 p-5 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-2xl text-left">
                            <div className="flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase">
                              <Lock size={12} className="text-accent hover:rotate-12 transition-transform" />
                              <span>Otoritas Akun & Kredensial</span>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">Username (Akun Anggota)</label>
                                <input
                                  type="text"
                                  value={editUsername}
                                  onChange={(e) => setEditUsername(e.target.value)}
                                  placeholder="Contoh: saiful_rachman"
                                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">Password Masuk</label>
                                <input
                                  type="text"
                                  value={editPassword}
                                  onChange={(e) => setEditPassword(e.target.value)}
                                  placeholder="Masukkan password atau klik buat otomatis"
                                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                                />
                              </div>
                              <div className="flex items-center gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const randPass = Math.random().toString(36).substring(3, 9).toUpperCase();
                                    setEditPassword(randPass);
                                    if (!editUsername) {
                                      const suggestedUser = selectedDirectoryAlumni.name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 10);
                                      setEditUsername(suggestedUser);
                                    }
                                  }}
                                  className="px-3 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-[10px] font-bold text-gray-600 rounded-xl transition cursor-pointer"
                                >
                                  Buat Otomatis
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!editUsername.trim() || !editPassword.trim()) {
                                      alert("Username dan Password tidak boleh kosong.");
                                      return;
                                    }
                                    setVerifiedAlumni(prev => prev.map(a => a.id === selectedDirectoryAlumni.id ? { ...a, username: editUsername.trim(), password: editPassword.trim() } : a));
                                    setSelectedDirectoryAlumni((prev: any) => ({ ...prev, username: editUsername.trim(), password: editPassword.trim() }));
                                    alert(`Kredensial Akun untuk "${selectedDirectoryAlumni.name}" berhasil diset!\nUsername: ${editUsername.trim()}\nPassword: ${editPassword.trim()}`);
                                  }}
                                  className="flex-1 py-2 px-3 bg-primary text-accent text-[10px] font-black uppercase rounded-xl hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer shadow-sm"
                                >
                                  Simpan & Berikan Akses
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex gap-2">
                          <button 
                            onClick={() => {
                              setKtaSelectedAlumniId(selectedDirectoryAlumni.id);
                              setKtaLevel(selectedDirectoryAlumni.kaderisasi === "Kader Utama" ? "KADER UTAMA" : selectedDirectoryAlumni.kaderisasi === "Kader Madya" ? "KADER MADYA" : "KADER PRATAMA");
                              setActiveTab("siap_kta_issue");
                            }}
                            className="w-full py-3.5 bg-primary text-accent text-[10px] font-black uppercase rounded-xl hover:brightness-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                          >
                            <Award size={14} />
                            Kirim ke Cetak KTA
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-dashed border-gray-200 text-center text-gray-405 leading-relaxed">
                        <Users className="mx-auto text-gray-350 mb-3" size={32} />
                        <p className="text-xs font-bold font-sans">Silakan pilih salah satu baris alumni di tabel untuk membuka detail de-enkripsi privat secara utuh.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* FEATURE 3: EDITOR SIAP KONTEN */}
            {activeTab === "siap_konten_editor" && currentRole === "siap_by_modular" && (
              <motion.div 
                key="siap_konten_page"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: -15 }}
                className="space-y-8"
              >
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <BookOpen size={24} className="text-accent" />
                        <h3 className="text-xl font-display font-black text-primary">Editor & Kurator Konten Naskah Anggota</h3>
                      </div>
                      <p className="text-xs text-gray-400 font-medium font-sans">Lakukan penyuntingan tata bahasa, penyesuaian regulasi, serta persetujuan publikasi tulisan dari alumni.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Content List */}
                  <div className="lg:col-span-2 space-y-4">
                    {submittedContents.map((post) => (
                      <div key={post.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg space-y-4 relative overflow-hidden group">
                        {post.status === "Menunggu Kurasi" && (
                          <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-400"></div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                            post.status === "Diterbitkan" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                          }`}>
                            {post.status}
                          </span>
                          <span className="text-[10px] text-gray-450 font-bold font-mono">{post.date}</span>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[9px] font-bold text-gray-405 uppercase tracking-widest font-mono">Judul & Penulis Opini</span>
                          <h4 className="font-extrabold text-primary text-base leading-tight">{post.title}</h4>
                          <p className="text-xs text-gray-400 font-bold font-sans">Ditulis oleh: {post.author} &bull; Sektor: {post.category}</p>
                          <p className="text-xs text-gray-650 leading-relaxed pt-2 line-clamp-3">{post.content}</p>
                        </div>

                        <div className="pt-4 border-t border-gray-50 flex justify-between items-center bg-slate-50 -mx-8 -mb-8 p-4 px-8 mt-4 rounded-b-[2rem]">
                          <span className="text-[10px] text-gray-400 font-bold">Total klik baca: {post.views}x</span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setEditingContent(post)}
                              className="px-3 py-2 bg-white border border-gray-200 text-primary hover:bg-slate-50 transition-colors text-[10px] font-black uppercase rounded-lg"
                            >
                              Edit Naskah
                            </button>
                            {post.status === "Menunggu Kurasi" && (
                              <button 
                                onClick={() => {
                                  setSubmittedContents(submittedContents.map(c => c.id === post.id ? { ...c, status: "Diterbitkan" } : c));
                                }}
                                className="px-3.5 py-2 bg-primary text-accent hover:brightness-110 shadow-sm text-[10px] font-black uppercase rounded-lg cursor-pointer"
                              >
                                Terbitkan Publikasi
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                setSubmittedContents(submittedContents.filter(c => c.id !== post.id));
                              }}
                              className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                              title="Hapus Tulisan"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Content Editing Pane */}
                  <div className="space-y-6">
                    {editingContent ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6 text-left"
                      >
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-primary text-lg">Platform Kurasi & Revisi Naskah</h4>
                          <p className="text-xs text-gray-400">Silakan koreksi naskah tulisan anggota sebelum diterbitkan ke khalayak umum.</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1.5 text-left">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Judul Karya / Opini</label>
                            <input 
                              type="text"
                              value={editingContent.title}
                              onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-150 rounded-xl text-xs font-bold text-primary focus:ring-2 focus:ring-accent/20"
                            />
                          </div>

                          <div className="space-y-1.5 text-left">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Kategori Publikasi</label>
                            <input 
                              type="text"
                              value={editingContent.category}
                              onChange={(e) => setEditingContent({ ...editingContent, category: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-150 rounded-xl text-xs font-bold text-primary focus:ring-2 focus:ring-accent/20"
                            />
                          </div>

                          <div className="space-y-1.5 text-left">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Isi Redasional Artikel (Full Editor)</label>
                            <textarea 
                              rows={8}
                              value={editingContent.content}
                              onChange={(e) => setEditingContent({ ...editingContent, content: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-150 rounded-xl text-xs font-medium text-gray-700 leading-relaxed focus:ring-2 focus:ring-accent/20"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setSubmittedContents(submittedContents.map(c => c.id === editingContent.id ? { ...editingContent, status: "Diterbitkan" } : c));
                              setEditingContent(null);
                            }}
                            className="flex-grow py-3 bg-primary text-accent text-[10px] font-black uppercase rounded-xl hover:brightness-105 active:scale-95 transition-all text-center cursor-pointer shadow-md"
                          >
                            Simpan & Terbitkan
                          </button>
                          <button 
                            onClick={() => setEditingContent(null)}
                            className="px-4 py-3 bg-white border border-gray-200 text-gray-500 text-[10px] font-black uppercase rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                          >
                            Batal
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-dashed border-gray-200 text-center text-gray-405 leading-relaxed">
                        <BookOpen className="mx-auto text-gray-350 mb-3" size={32} />
                        <p className="text-xs font-bold font-sans">Silakan klik tombol <strong>Edit Naskah</strong> pada salah satu warta anggota untuk membuka panel editing redaktur.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* FEATURE 4: PENGELOLA SIAP DISKUSI */}
            {activeTab === "siap_diskusi_manager" && currentRole === "siap_by_modular" && (
              <motion.div 
                key="siap_diskusi_page"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: -15 }}
                className="space-y-8"
              >
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="text-primary" size={24} />
                      <h3 className="text-xl font-display font-black text-primary">Moderator & Manajemen Ruang Diskusi</h3>
                    </div>
                    <p className="text-xs text-gray-400 font-medium font-sans font-sans">
                      Pantau laporan, batasi pembicaraan provokatif partisan, kumpulkan notulensi kesepakatan mufakat dari seluruh room diskusi kader.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Discussions list */}
                  <div className="lg:col-span-2 space-y-6">
                    {discussionRooms.map((room) => (
                      <div key={room.id} className="bg-white p-8 rounded-[2rem] border border-gray-150 shadow-lg space-y-4 relative overflow-hidden">
                        
                        {room.reports > 0 && (
                          <div className="absolute top-0 left-0 right-0 bg-red-500 py-1.5 text-center text-white text-[9px] font-black uppercase tracking-widest px-4 flex items-center justify-center gap-1.5 animate-pulse">
                            ⚠️ Dilaporkan Anggota Sejumlah {room.reports} Kali (Butuh Moderasi Konten)
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${
                            room.status === "Aktif" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                          }`}>
                            Room Status: {room.status}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono font-bold">Dibuat: {room.date}</span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[8px] font-bold text-gray-450 uppercase tracking-widest font-mono">Topik Bahasan</span>
                          <h4 className="font-extrabold text-primary text-base leading-tight">{room.topic}</h4>
                          <p className="text-xs text-gray-400 font-bold font-sans">Inisiator: {room.creator} &bull; Sektor: {room.category}</p>
                        </div>

                        {room.notulensi && (
                          <div className="p-4 bg-slate-50 border border-gray-150 rounded-xl space-y-1.5">
                            <span className="text-[8px] font-black text-gray-405 uppercase tracking-wider block">📝 Notulensi Resmi Sidang / Kesepakatan:</span>
                            <p className="text-xs text-slate-700 leading-relaxed font-medium">{room.notulensi}</p>
                          </div>
                        )}

                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-primary/20 rounded-full"></span>
                            <span className="text-xs text-primary font-bold">{room.membersCount} Alumni Tergabung</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setNotulensiEditingId(room.id);
                                setNotulensiText(room.notulensi);
                              }}
                              className="px-3 py-2 bg-white border border-gray-200 text-primary text-[10px] font-black uppercase rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                              Catat Notulensi
                            </button>
                            <button 
                              onClick={() => {
                                setDiscussionRooms(discussionRooms.map(r => r.id === room.id ? { ...r, status: r.status === "Aktif" ? "Ditangguhkan" : "Aktif" } : r));
                              }}
                              className={`px-3 py-2 text-[10px] font-black uppercase rounded-lg transition-colors cursor-pointer ${
                                room.status === "Aktif" ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                              }`}
                            >
                              {room.status === "Aktif" ? "Tangguhkan Room" : "Pulihkan Aktif"}
                            </button>
                            {room.reports > 0 && (
                              <button 
                                onClick={() => {
                                  setDiscussionRooms(discussionRooms.map(r => r.id === room.id ? { ...r, reports: 0 } : r));
                                }}
                                className="px-3.5 py-2 bg-emerald-500 text-white text-[10px] font-black uppercase rounded-lg hover:bg-emerald-600 shadow-sm transition-colors cursor-pointer"
                              >
                                Aman
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                setDiscussionRooms(discussionRooms.filter(r => r.id !== room.id));
                              }}
                              className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sidebar Notulensi Writer */}
                  <div className="space-y-6">
                    {notulensiEditingId ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6 text-left"
                      >
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-primary text-lg">Administrasi Notulensi Forum</h4>
                          <p className="text-xs text-gray-400">Ketik hasil keputusan mufakat, rekomendasi kebijakan organisasi, atau rangkuman acara.</p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1.5 text-left">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Catatan Notulensi Resmi</label>
                            <textarea 
                              rows={8}
                              value={notulensiText}
                              onChange={(e) => setNotulensiText(e.target.value)}
                              placeholder="Masukkan hasil ringkasan mufakat forum..."
                              className="w-full px-4 py-3 border border-gray-150 rounded-xl text-xs font-semibold text-gray-700 leading-relaxed focus:ring-2 focus:ring-accent/20"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setDiscussionRooms(discussionRooms.map(r => r.id === notulensiEditingId ? { ...r, notulensi: notulensiText } : r));
                              setNotulensiEditingId(null);
                            }}
                            className="flex-grow py-3 bg-primary text-accent text-[10px] font-black uppercase rounded-xl hover:brightness-105 active:scale-95 transition-all text-center cursor-pointer shadow-md"
                          >
                            Simpan Notulensi &rarr;
                          </button>
                          <button 
                            onClick={() => setNotulensiEditingId(null)}
                            className="px-4 py-3 bg-white border border-gray-200 text-gray-500 text-[10px] font-black uppercase rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                          >
                            Batal
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-dashed border-gray-200 text-center text-gray-405 leading-relaxed">
                        <MessageSquare className="mx-auto text-gray-350 mb-3" size={32} />
                        <p className="text-xs font-bold font-sans">Silakan klik tombol <strong>Catat Notulensi</strong> untuk menyusun rekaman hasil keputusan musyawarah alumni.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* FEATURE 6: PENERBITAN KARTU ANGGOTA DIGITAL (KTA) */}
            {activeTab === "siap_kta_issue" && currentRole === "siap_by_modular" && (
              <motion.div 
                key="siap_kta_issue_page"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: -15 }}
                className="space-y-8"
              >
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    
                    {/* Control Panel Card issuing */}
                    <div className="space-y-6 text-left">
                      <div className="space-y-2">
                        <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                          <Award size={26} className="text-accent" />
                        </div>
                        <h3 className="text-2xl font-display font-black text-primary leading-tight">Penerbitan KTA Digital</h3>
                        <p className="text-xs text-gray-400 font-sans font-medium">Berdasarkan AD/ART IKA PMII, kartu digital pendaftaran sah sebagai tanda keabsahan keanggotaan aktif regional.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5 text-left">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Pilih Anggota Terdaftar</label>
                          <select 
                            value={ktaSelectedAlumniId}
                            onChange={(e) => setKtaSelectedAlumniId(Number(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-150 rounded-xl text-xs font-bold text-primary focus:ring-2 focus:ring-accent/20 cursor-pointer"
                          >
                            {verifiedAlumni.map(a => (
                              <option key={a.id} value={a.id}>{a.name} ({a.loc})</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5 text-left">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Tingkat Kaderisasi (Format KTA)</label>
                          <select 
                            value={ktaLevel}
                            onChange={(e) => setKtaLevel(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-150 rounded-xl text-xs font-bold text-primary focus:ring-2 focus:ring-accent/20 cursor-pointer"
                          >
                            <option value="KADER PRATAMA">KADER PRATAMA (MAPABA)</option>
                            <option value="KADER MADYA">KADER MADYA (PKD)</option>
                            <option value="KADER UTAMA">KADER UTAMA (PKL/PKN)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5 text-left">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Desain Palette KTA</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['gold', 'silver', 'emerald'].map((style) => (
                              <button
                                key={style}
                                onClick={() => setKtaTemplateStyle(style)}
                                className={`py-2 text-[10px] font-black uppercase rounded-lg border transition-all cursor-pointer ${
                                  ktaTemplateStyle === style 
                                    ? "bg-primary text-accent border-primary shadow-sm" 
                                    : "bg-slate-50 text-gray-550 border-gray-200"
                                }`}
                              >
                                {style} Theme
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          alert(`KTA Digital atas nama ${verifiedAlumni.find(a => a.id === ktaSelectedAlumniId)?.name} berhasil dirender & diterbitkan!\nSurat identitas elektronik dikirim secara instan menuju email pendaftar.`);
                        }}
                        className="w-full py-4.5 bg-primary text-accent text-xs font-black uppercase rounded-xl hover:bg-opacity-95 shadow-lg active:scale-95 transition-all text-center cursor-pointer"
                      >
                        Cetak & Terbitkan KTA Elektronik &rarr;
                      </button>
                    </div>

                    {/* Live previewing card */}
                    <div className="space-y-4">
                      <span className="text-[9px] font-black tracking-widest text-gray-400 uppercase text-center block">REAL-TIME KTA RENDER PREVIEW:</span>
                      
                      {/* Interactive KTA Mock */}
                      <div className={`aspect-[1.58/1] w-full max-w-sm mx-auto text-white p-6 rounded-[2rem] shadow-2xl relative overflow-hidden text-left flex flex-col justify-between border border-white/10 transition-all duration-500 ${
                        ktaTemplateStyle === "gold" ? "bg-primary text-white" :
                        ktaTemplateStyle === "silver" ? "bg-slate-800 text-white" :
                        "bg-emerald-900 text-white"
                      }`}>
                        
                        {/* Interactive glow decorations */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/25 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-xl"></div>
                        
                        <div className="flex justify-between items-center z-10">
                          <div className="flex items-center gap-2">
                            <img 
                              src={logoImg} 
                              alt="Logo" 
                              className="w-9 h-9 object-contain" 
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                const fallback = e.currentTarget.parentElement?.querySelector(".card-logo-star");
                                if (fallback) fallback.classList.remove("hidden");
                              }}
                            />
                            <div className="card-logo-star hidden w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-black text-sm border border-accent/40 mr-1">
                              ★
                            </div>
                            <div className="flex flex-col">
                              <span className="font-sans font-black text-xs text-accent" style={{ WebkitTextStroke: '0.5px currentColor' }}>PC IKA PMII</span>
                              <span className="text-[6.5px] text-white/70 font-semibold uppercase leading-none tracking-wider">Bandung Barat</span>
                            </div>
                          </div>
                          <span className={`text-[7px] font-black font-mono px-2 py-0.5 rounded ${
                            ktaTemplateStyle === "gold" ? "bg-accent text-primary" :
                            ktaTemplateStyle === "silver" ? "bg-slate-300 text-slate-900" :
                            "bg-yellow-400 text-emerald-950"
                          }`}>
                            {ktaLevel}
                          </span>
                        </div>

                        <div className="flex gap-4 items-center z-10 py-2">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20 shrink-0">
                            <img 
                              src={verifiedAlumni.find(a => a.id === ktaSelectedAlumniId)?.img || "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=300"} 
                              className="w-full h-full object-cover" 
                              alt="Alumni" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="space-y-1">
                            <p className="text-[7px] font-bold text-gray-350 uppercase tracking-widest leading-none">NAMA ALUMNI</p>
                            <p className="text-xs font-display font-black leading-tight text-accent truncate max-w-[170px]">
                              {verifiedAlumni.find(a => a.id === ktaSelectedAlumniId)?.name.toUpperCase() || "NURUL HIDAYATI"}
                            </p>
                            <div className="flex gap-4">
                              <div>
                                <p className="text-[6px] font-bold text-gray-350 uppercase">KOMISARIAT</p>
                                <p className="text-[8px] font-black text-white/90 truncate max-w-[80px]">
                                  {verifiedAlumni.find(a => a.id === ktaSelectedAlumniId)?.gov || "STAI Ez Muttaqien"}
                                </p>
                              </div>
                              <div>
                                <p className="text-[6px] font-bold text-gray-350 uppercase">DOMISILI</p>
                                <p className="text-[8px] font-black text-white/90">
                                  {verifiedAlumni.find(a => a.id === ktaSelectedAlumniId)?.loc || "Ngamprah"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-end z-10 border-t border-white/10 pt-2">
                          <p className="text-[7.5px] font-mono text-white/50">E-ID: PMII-KBB-2026-{ktaSelectedAlumniId}</p>
                          <span className="text-[7.5px] font-black text-accent bg-white/10 px-2 py-0.5 rounded-full italic font-serif">KTA Aktif</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {/* FEATURE 7: ADMINISTRASI SELURUH KONTEN WEBSITE SECARA MENYELURUH */}
            {activeTab === "siap_web_admin" && currentRole === "siap_by_modular" && (
              <motion.div 
                key="siap_web_admin_page"
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: -15 }}
                className="space-y-8"
              >
                {/* Header overview */}
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-150 shadow-sm space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-0.5 text-left">
                      <div className="flex items-center gap-2">
                        <Settings className="text-accent animate-spin-slow" size={20} />
                        <h3 className="text-lg font-display font-black text-primary">Sistem Manajemen Konten Terpadu (SIAP CMS)</h3>
                      </div>
                      <p className="text-[11px] text-gray-400 font-medium font-sans">
                        Pusat kendali publikasi naskah (Opini, Berita, Pengumuman, Artikel, Kepengurusan, & Komponen Portal) secara instan.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  
                  {/* Left Column: CMS Editor Form (Compact/Pro) */}
                  <div className="lg:col-span-5 bg-white p-5 md:p-6 rounded-2xl border border-gray-150 shadow-md h-fit space-y-4">
                    <div className="space-y-1 text-left">
                      <span className="text-[8px] bg-primary/10 text-primary font-black px-2 py-0.5 rounded uppercase tracking-wider block w-fit">
                        {editingBulletin ? "✏️ Mode Edit" : "➕ Buat Konten"}
                      </span>
                      <h4 className="text-sm font-display font-black text-primary leading-tight">
                        {editingBulletin ? `Sunting "${editingBulletin.title}"` : "Terbitkan Elemen Konten"}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-sans">
                        Publikasikan tulisan ke portal luar maupun internal secara presisi.
                      </p>
                    </div>

                    <form onSubmit={addBulletin} className="space-y-3 font-sans text-left">
                      {/* Judul field */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Judul / Nama Komponen</label>
                        <input 
                          type="text"
                          required
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="Masukkan judul rilis utama..."
                          className="w-full px-3 py-2 border border-gray-150 rounded-xl text-xs font-semibold text-primary focus:bg-white focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all bg-slate-50/50"
                        />
                      </div>

                      {/* Side-by-side grid inside the form to save space */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Penulis field */}
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Penanggung Jawab / Penulis</label>
                          <input 
                            type="text"
                            required
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                            placeholder="Contoh: Bidang Hukum"
                            className="w-full px-3 py-2 border border-gray-150 rounded-xl text-xs font-semibold text-primary focus:bg-white focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all bg-slate-50/50"
                          />
                        </div>

                        {/* Kategori field */}
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Kategori Konten</label>
                          <select
                            value={newCategory}
                            onChange={(e) => {
                              setNewCategory(e.target.value);
                              setExtraRefUrl("");
                              setExtraSubText("");
                            }}
                            className="w-full px-3 py-2 border border-gray-150 rounded-xl text-xs font-semibold text-primary focus:bg-white focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all bg-slate-50/50 cursor-pointer"
                          >
                            <option value="Opini">Opini</option>
                            <option value="Berita">Berita</option>
                            <option value="Pengumuman">Pengumuman</option>
                            <option value="Artikel">Artikel</option>
                            <option value="Daftar Pengurus">Daftar Pengurus</option>
                            <option value="Komponen Lainnya">Lainnya</option>
                          </select>
                        </div>
                      </div>

                      {/* Dynamic Parameters based on category choice */}
                      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] bg-primary/10 text-primary font-black px-1.5 py-0.5 rounded uppercase tracking-wider block w-fit">
                            ⚙️ Parameter Khusus: {newCategory}
                          </span>
                        </div>

                        {newCategory === "Opini" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="space-y-0.5">
                              <label className="text-[8px] font-bold uppercase text-gray-400">Tautan Referensi</label>
                              <input 
                                type="url"
                                value={extraRefUrl}
                                onChange={(e) => setExtraRefUrl(e.target.value)}
                                placeholder="https://..."
                                className="w-full px-2 py-1.5 border border-gray-150 rounded-lg text-[10px] font-semibold text-primary bg-white focus:ring-2 focus:ring-accent/20"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <label className="text-[8px] font-bold uppercase text-gray-400">Instansi / Almamater</label>
                              <input 
                                type="text"
                                value={extraSubText}
                                onChange={(e) => setExtraSubText(e.target.value)}
                                placeholder="misal: Pascasarjana UIN"
                                className="w-full px-2 py-1.5 border border-gray-150 rounded-lg text-[10px] font-semibold text-primary bg-white focus:ring-2 focus:ring-accent/20"
                              />
                            </div>
                          </div>
                        )}

                        {newCategory === "Berita" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="space-y-0.5">
                              <label className="text-[8px] font-bold uppercase text-gray-400">Lokasi Liputan</label>
                              <input 
                                type="text"
                                value={extraSubText}
                                onChange={(e) => setExtraSubText(e.target.value)}
                                placeholder="misal: Cihampelas, KBB"
                                className="w-full px-2 py-1.5 border border-gray-150 rounded-lg text-[10px] font-semibold text-primary bg-white focus:ring-2 focus:ring-accent/20"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <label className="text-[8px] font-bold uppercase text-gray-400">Tautan Gambar Banner</label>
                              <input 
                                type="text"
                                value={extraRefUrl}
                                onChange={(e) => setExtraRefUrl(e.target.value)}
                                placeholder="https://unsplash.com/..."
                                className="w-full px-2 py-1.5 border border-gray-150 rounded-lg text-[10px] font-semibold text-primary bg-white focus:ring-2 focus:ring-accent/20"
                              />
                            </div>
                          </div>
                        )}

                        {newCategory === "Pengumuman" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="space-y-0.5">
                              <label className="text-[8px] font-bold uppercase text-gray-400">No. SK / Dokumen</label>
                              <input 
                                type="text"
                                value={extraSubText}
                                onChange={(e) => setExtraSubText(e.target.value)}
                                placeholder="No: 104.B/PC-IKAPMII/KBB"
                                className="w-full px-2 py-1.5 border border-gray-150 rounded-lg text-[10px] font-semibold text-primary bg-white focus:ring-2 focus:ring-accent/20"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <label className="text-[8px] font-bold uppercase text-gray-400">Tingkat Urgensi</label>
                              <select 
                                value={extraRefUrl}
                                onChange={(e) => setExtraRefUrl(e.target.value)}
                                className="w-full px-2 py-1.5 border border-gray-150 rounded-lg text-[10px] font-semibold text-primary bg-white focus:ring-2 focus:ring-accent/20"
                              >
                                <option value="">Pilih prioritas...</option>
                                <option value="Sangat Penting">⚠️ Sangat Penting / Segera</option>
                                <option value="Biasa">📢 Biasa / Publik</option>
                                <option value="Internal">🔒 Konsumsi Internal</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {newCategory === "Artikel" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="space-y-0.5">
                              <label className="text-[8px] font-bold uppercase text-gray-400">Penerbit Jurnal</label>
                              <input 
                                type="text"
                                value={extraSubText}
                                onChange={(e) => setExtraSubText(e.target.value)}
                                placeholder="misal: Redaksi Jurnal Al-Ahkam"
                                className="w-full px-2 py-1.5 border border-gray-150 rounded-lg text-[10px] font-semibold text-primary bg-white focus:ring-2 focus:ring-accent/20"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <label className="text-[8px] font-bold uppercase text-gray-400">Tautan File PDF Kajian</label>
                              <input 
                                type="url"
                                value={extraRefUrl}
                                onChange={(e) => setExtraRefUrl(e.target.value)}
                                placeholder="https://..."
                                className="w-full px-2 py-1.5 border border-gray-150 rounded-lg text-[10px] font-semibold text-primary bg-white focus:ring-2 focus:ring-accent/20"
                              />
                            </div>
                          </div>
                        )}

                        {newCategory === "Daftar Pengurus" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="space-y-0.5">
                              <label className="text-[8px] font-bold uppercase text-gray-400">Jabatan Kepengurusan</label>
                              <input 
                                type="text"
                                value={extraSubText}
                                onChange={(e) => setExtraSubText(e.target.value)}
                                placeholder="misal: Sekretaris Bidang Eksternal"
                                className="w-full px-2 py-1.5 border border-gray-150 rounded-lg text-[10px] font-semibold text-primary bg-white focus:ring-2 focus:ring-accent/20"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <label className="text-[8px] font-bold uppercase text-gray-400">Masa Khidmat / Periode</label>
                              <input 
                                type="text"
                                value={extraRefUrl}
                                onChange={(e) => setExtraRefUrl(e.target.value)}
                                placeholder="misal: Periode 2025-2029"
                                className="w-full px-2 py-1.5 border border-gray-150 rounded-lg text-[10px] font-semibold text-primary bg-white focus:ring-2 focus:ring-accent/20"
                              />
                            </div>
                          </div>
                        )}

                        {newCategory === "Komponen Lainnya" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="space-y-0.5">
                              <label className="text-[8px] font-bold uppercase text-gray-400">Kode Icon Lucide</label>
                              <input 
                                type="text"
                                value={extraSubText}
                                onChange={(e) => setExtraSubText(e.target.value)}
                                placeholder="misal: Settings / BookOpen"
                                className="w-full px-2 py-1.5 border border-gray-150 rounded-lg text-[10px] font-semibold text-primary bg-white focus:ring-2 focus:ring-accent/20"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <label className="text-[8px] font-bold uppercase text-gray-400">Tautan Navigasi Internal</label>
                              <input 
                                type="text"
                                value={extraRefUrl}
                                onChange={(e) => setExtraRefUrl(e.target.value)}
                                placeholder="/layanan/koperasi"
                                className="w-full px-2 py-1.5 border border-gray-150 rounded-lg text-[10px] font-semibold text-primary bg-white focus:ring-2 focus:ring-accent/20"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Isi Redasional field */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Isi Naskah / Dokumen</label>
                        <textarea
                          rows={4}
                          required
                          value={newContent}
                          onChange={(e) => setNewContent(e.target.value)}
                          placeholder="Tuliskan naskah lengkap atau bagikan detail struktural pengurus harian di sini..."
                          className="w-full px-3 py-2 border border-gray-150 rounded-xl text-xs font-medium text-gray-700 leading-relaxed focus:bg-white focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all bg-slate-50/50"
                        />
                      </div>

                      {/* Submit buttons */}
                      <div className="pt-1.5 flex gap-2">
                        <button 
                          type="submit" 
                          className="flex-grow py-2.5 bg-primary text-accent text-xs font-black uppercase rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          {editingBulletin ? "Simpan Perubahan" : "Simpan & Rilis"}
                        </button>
                        
                        {editingBulletin && (
                          <button 
                            type="button"
                            onClick={() => {
                              setEditingBulletin(null);
                              setNewTitle("");
                              setNewContent("");
                              setNewAuthor("Sistem Admin");
                              setNewCategory("Berita");
                              setExtraRefUrl("");
                              setExtraSubText("");
                            }}
                            className="px-3.5 py-2.5 bg-slate-50 border border-gray-200 text-gray-500 text-xs font-bold uppercase rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            Batal
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Right Column: Category Switcher & Adjustments */}
                  <div className="lg:col-span-7 space-y-4">
                    
                    {/* Live Parameter Tuner */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-3 text-left">
                      <div className="space-y-0.5">
                        <h4 className="font-extrabold text-primary text-xs uppercase tracking-wide">Sync Indikator Web Depan</h4>
                        <p className="text-[10px] text-gray-400 font-sans">Sesuaikan metrik kuantitatif di beranda depan secara realtime.</p>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase tracking-widest text-gray-400">Total Alumni</label>
                          <input 
                            type="number"
                            value={verifiedTotal}
                            onChange={(e) => setVerifiedTotal(Number(e.target.value))}
                            className="w-full px-2.5 py-1.5 border border-gray-150 rounded-lg text-xs font-bold font-mono text-primary bg-slate-50/30"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase tracking-widest text-gray-400">Koperasi</label>
                          <p className="text-xs font-bold bg-slate-50/50 border border-gray-100 px-2.5 py-1.5 rounded-lg font-mono text-gray-600 truncate">{productsQueue.length} Produk</p>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase tracking-widest text-gray-400">Kas PC IKA</label>
                          <p className="text-xs font-bold bg-emerald-50/50 border border-emerald-100 px-2.5 py-1.5 rounded-lg font-mono text-emerald-700 truncate">Rp {totalCsrFundsReceived.toLocaleString("id-ID")}</p>
                        </div>
                      </div>
                    </div>

                    {/* Integrated list with Category-Tabs */}
                    <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-150 shadow-md space-y-4 text-left">
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-display font-black text-primary uppercase tracking-wide">Daftar Komponen Konten Portal</h3>
                        <p className="text-[11px] text-gray-400 font-sans">
                          Saring tulisan berdasarkan tema untuk menyunting atau melikuidasi konten.
                        </p>
                      </div>

                      {/* Dynamic tabs filter with counts */}
                      <div className="flex flex-wrap gap-1 pb-1 border-b border-gray-100">
                        {["Semua", "Opini", "Berita", "Pengumuman", "Artikel", "Daftar Pengurus", "Komponen Lainnya"].map((cat) => {
                          const count = cat === "Semua" 
                            ? bulletins.length 
                            : bulletins.filter(b => b.category === cat).length;
                          return (
                            <button
                              key={cat}
                              onClick={() => {
                                setFilteredWebCategory(cat);
                                if (cat !== "Semua") {
                                  setNewCategory(cat);
                                  setExtraRefUrl("");
                                  setExtraSubText("");
                                }
                              }}
                              className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-extrabold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                                filteredWebCategory === cat 
                                  ? "bg-primary text-accent font-black shadow-sm" 
                                  : "bg-slate-50 text-gray-500 hover:bg-slate-100"
                              }`}
                            >
                              <span>{cat === "Komponen Lainnya" ? "Lainnya" : cat}</span>
                              <span className={`text-[8px] font-mono px-1 py-0.1 rounded ${
                                filteredWebCategory === cat ? "bg-accent/30 text-accent" : "bg-gray-200 text-gray-600"
                              }`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Display Bulletins */}
                      <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                        {bulletins
                          .filter(b => filteredWebCategory === "Semua" || b.category === filteredWebCategory)
                          .map((b) => {
                            // Define color labels for easy tracking
                            const catColors: Record<string, string> = {
                              "Opini": "bg-purple-50 text-purple-700 border-purple-100",
                              "Berita": "bg-emerald-50 text-emerald-700 border-emerald-100",
                              "Pengumuman": "bg-amber-50 text-amber-700 border-amber-100",
                              "Artikel": "bg-blue-50 text-blue-700 border-blue-100",
                              "Daftar Pengurus": "bg-rose-50 text-rose-700 border-rose-100",
                              "Komponen Lainnya": "bg-slate-50 text-slate-705 border-slate-200"
                            };
                            return (
                              <div key={b.id} className="p-4 bg-slate-50/40 hover:bg-slate-50 border border-gray-100 rounded-xl transition-all shadow-sm space-y-2.5 relative group">
                                <div className="flex items-center justify-between gap-2">
                                  <span className={`text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border ${
                                    catColors[b.category || "Berita"] || "bg-slate-50 text-slate-700 border-slate-200"
                                  }`}>
                                    {b.category || "Berita"}
                                  </span>
                                  <span className="text-[9px] text-gray-450 font-mono font-medium">Terbit: {b.date}</span>
                                </div>

                                <div className="space-y-1">
                                  <h4 className="font-bold text-primary text-xs leading-snug">{b.title}</h4>
                                  <p className="text-[9px] text-gray-400 font-sans">
                                    Oleh: <span className="text-gray-650 font-bold">{b.author}</span>{(b as any).extraSubText && <span className="ml-1.5 px-1 py-0.5 bg-purple-100 text-purple-700 text-[8px] font-bold rounded">{(b as any).extraSubText}</span>}
                                  </p>
                                  <p className="text-[11px] text-gray-600 font-sans leading-relaxed pt-1 line-clamp-2">
                                    {b.content || "Konten belum terisi..."}
                                  </p>
                                  {(b as any).extraRefUrl && (
                                    <div className="text-[9px] text-accent font-semibold flex items-center gap-1 mt-1 truncate">
                                      <span>🔗</span>
                                      {b.category === "Pengumuman" ? (
                                        <span>Prioritas: <span className="text-primary font-bold">{(b as any).extraRefUrl}</span></span>
                                      ) : (
                                        <a href={(b as any).extraRefUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-accent/80 transition-colors">{(b as any).extraRefUrl}</a>
                                      )}
                                    </div>
                                  )}
                                </div>

                                <div className="pt-1.5 border-t border-gray-100/60 flex justify-end gap-1.5">
                                  {/* Edit button */}
                                  <button
                                    onClick={() => {
                                      setEditingBulletin(b);
                                      setNewTitle(b.title);
                                      setNewAuthor(b.author);
                                      setNewCategory(b.category || "Berita");
                                      setNewContent(b.content || "");
                                      setExtraRefUrl((b as any).extraRefUrl || "");
                                      setExtraSubText((b as any).extraSubText || "");
                                    }}
                                    className="px-2 py-1 bg-white hover:bg-slate-100 border border-gray-150 text-primary text-[8px] font-black uppercase rounded flex items-center gap-1 transition-colors cursor-pointer"
                                  >
                                    <Edit3 size={10} />
                                    Edit
                                  </button>

                                  {/* Delete button */}
                                  <button 
                                    onClick={() => setBulletins(bulletins.filter(item => item.id !== b.id))}
                                    className="px-2 py-1 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 text-[8px] font-black uppercase rounded flex items-center gap-1 transition-all cursor-pointer"
                                    title="Hapus Konten"
                                  >
                                    <Trash2 size={10} />
                                    Hapus
                                  </button>
                                </div>
                              </div>
                            );
                          })}

                        {bulletins.filter(b => filteredWebCategory === "Semua" || b.category === filteredWebCategory).length === 0 && (
                          <div className="bg-slate-50 p-8 rounded-xl border border-dashed border-gray-200 text-center text-gray-400 text-xs font-bold leading-relaxed">
                            <Tag className="mx-auto text-gray-300 mb-1" size={20} />
                            Belum ada konten di kategori ini.
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 3. ADMIN KAMARA SUB PAGES                                     */}
            {/* ------------------------------------------------------------- */}
            {activeTab === "kamara_applicants" && currentRole === "kamara" && (
              <motion.div 
                key="kamara_applicants_page"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -20 }}
                className="space-y-8 text-left text-primary"
              >
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                    <div>
                      <h3 className="text-2xl font-display font-black italic text-primary">Permohonan Kemitraan Niaga</h3>
                      <p className="text-xs text-gray-400 font-medium mt-1">Daftar proposal kemitraan UMKM/Koperasi baru dari alumni yang masuk lewat portal pendaftaran.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                      <span>Total Masuk:</span>
                      <strong className="text-primary font-black">{kamaraApplicants.length} Berkas</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 font-sans">
                    {kamaraApplicants.map((app) => (
                      <div 
                        key={app.id} 
                        className="p-6 md:p-8 bg-surface/50 rounded-3xl border border-gray-55 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 transition-all hover:bg-white hover:border-emerald-500/10 hover:shadow-xl group"
                      >
                        <div className="space-y-4 max-w-2xl text-left">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-extrabold text-primary text-base leading-none">{app.businessName}</span>
                            <span className="py-0.5 px-3 rounded-full text-[8px] font-black uppercase bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {app.category}
                            </span>
                            <span className={`py-0.5 px-3 rounded-full text-[8px] font-black uppercase ${
                              app.status === "Disetujui" 
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                                : app.status === "Ditolak"
                                  ? "bg-rose-50 text-rose-700 border border-rose-100"
                                  : "bg-amber-50 text-amber-700 border border-amber-100"
                            }`}>
                              {app.status}
                            </span>
                          </div>

                          <p className="text-xs text-gray-500 font-medium leading-relaxed">{app.desc}</p>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-[11px] font-bold text-gray-400">
                            <div>
                              <span className="block text-[9px] uppercase tracking-wider text-gray-300 font-extrabold">Pemilik / Owner</span>
                              <span className="text-primary font-black">{app.ownerName}</span>
                            </div>
                            <div>
                              <span className="block text-[9px] uppercase tracking-wider text-gray-300 font-extrabold">Hubungi Kontak</span>
                              <span className="text-emerald-600 font-black">{app.whatsapp}</span>
                            </div>
                            <div>
                              <span className="block text-[9px] uppercase tracking-wider text-gray-300 font-extrabold">Lokasi Usaha</span>
                              <span className="text-primary font-black">{app.address}</span>
                            </div>
                            <div>
                              <span className="block text-[9px] uppercase tracking-wider text-gray-300 font-extrabold">Tanggal Pengajuan</span>
                              <span className="text-primary font-black">{app.date}</span>
                            </div>
                          </div>

                          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Komoditas / Produk Utama:</p>
                            <p className="text-xs font-bold text-primary mt-1">{app.products}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 shrink-0 w-full lg:w-auto mt-2 lg:mt-0">
                          {app.status === "Tertunda" ? (
                            <>
                              <button 
                                onClick={() => {
                                  // Approve and add to partners List
                                  setKamaraApplicants(kamaraApplicants.map(a => a.id === app.id ? { ...a, status: "Disetujui" } : a));
                                  if (!kamaraPartners.some(p => p.businessName === app.businessName)) {
                                    setKamaraPartners([
                                      {
                                        id: Date.now(),
                                        ownerName: app.ownerName,
                                        businessName: app.businessName,
                                        category: app.category,
                                        whatsapp: app.whatsapp,
                                        address: app.address,
                                        desc: app.desc,
                                        rating: "5.0",
                                        joinedDate: "23 Mei 2026",
                                        status: "Aktif",
                                        image: "https://images.unsplash.com/photo-1521791136368-1a46827013d6?auto=format&fit=crop&w=150&h=150&q=80"
                                      },
                                      ...kamaraPartners
                                    ]);
                                  }
                                }}
                                className="flex-1 lg:flex-none uppercase text-[10px] tracking-wider font-extrabold text-white bg-primary hover:bg-primary/95 px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer text-center"
                              >
                                Terima Kemitraan
                              </button>
                              <button 
                                onClick={() => {
                                  setKamaraApplicants(kamaraApplicants.map(a => a.id === app.id ? { ...a, status: "Ditolak" } : a));
                                }}
                                className="flex-1 lg:flex-none uppercase text-[10px] tracking-wider font-extrabold text-gray-500 bg-gray-100 hover:bg-rose-50 hover:text-rose-600 px-5 py-3 rounded-xl transition-all cursor-pointer text-center"
                              >
                                Tolak
                              </button>
                            </>
                          ) : (
                            <div className="text-xs font-bold text-gray-400 italic px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                              Berkas telah diproses
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "kamara_partners" && currentRole === "kamara" && (
              <motion.div 
                key="kamara_partners_page"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -20 }}
                className="space-y-8 text-left text-primary"
              >
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl space-y-8 font-sans">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                    <div>
                      <h3 className="text-2xl font-display font-black italic text-primary">Profil Mitra Ritel KAMARA</h3>
                      <p className="text-xs text-gray-400 font-medium mt-1">Daftar pelaku usaha alumni PMII & mitra retail Koperasi KAMARA pasca-verifikasi lapangan.</p>
                    </div>
                    <button 
                      onClick={() => {
                        // Direct simulated action to add a mock partner easily
                        const newId = Date.now();
                        setKamaraPartners([
                          {
                            id: newId,
                            ownerName: "Muhammad Hasan (Alumni 2011)",
                            businessName: "Karya Logistik Padalarang",
                            category: "Jasa Distribusi",
                            whatsapp: "08323232323",
                            address: "Padalarang, KBB",
                            desc: "Mitra ekspedisi pengiriman logistik produk UMKM alumni PMII se-wilayah Bandung Barat secara kilat.",
                            rating: "4.8",
                            joinedDate: "23 Mei 2026",
                            status: "Aktif",
                            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=150&h=150&q=80"
                          },
                          ...kamaraPartners
                        ]);
                      }}
                      className="px-5 py-3.5 bg-primary text-accent hover:brightness-110 text-xs font-extrabold uppercase tracking-wide rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
                    >
                      <Plus size={15} />
                      Tambah Mitra Afiliasi
                    </button>
                  </div>

                  {/* Bento Grid layout for cooperative partners */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {kamaraPartners.map((partner) => (
                      <div 
                        key={partner.id} 
                        className="p-6 bg-slate-50 rounded-3xl border border-slate-100/80 hover:bg-white hover:border-emerald-500/10 hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between"
                        onClick={() => setSelectedPartner(partner)}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <img 
                              src={partner.image || "https://images.unsplash.com/photo-1541256996761-85df2eff3139?auto=format&fit=crop&w=150&h=150&q=80"} 
                              alt={partner.businessName}
                              className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-slate-200"
                            />
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-primary text-sm leading-tight truncate">{partner.businessName}</h4>
                              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">{partner.category}</p>
                            </div>
                          </div>

                          <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{partner.desc}</p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-dashed border-gray-200 flex items-center justify-between">
                          <div className="text-[10px] font-bold text-gray-400">
                            Reputasi: <span className="text-amber-500 font-extrabold font-sans">★ {partner.rating}</span>
                          </div>
                          <span className="text-xs font-bold text-primary bg-accent/25 px-2.5 py-1 rounded-lg hover:underline transition-all">
                            Lihat Profil &rarr;
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "kamara_products" && currentRole === "kamara" && (
              <motion.div 
                key="kamara_products_page"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -20 }}
                className="space-y-12"
              >
                {/* Product Add & Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  
                  {/* Form to submit direct product lists */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl h-fit space-y-6">
                    <div className="space-y-1 text-left">
                      <h3 className="text-xl font-display font-black italic text-primary">Tambahkan Produk Mitra</h3>
                      <p className="text-xs text-gray-400 font-semibold font-sans">Tambah katalog fisik retail KAMARA Mart secepat kilat.</p>
                    </div>

                    <form onSubmit={handleCreateProduct} className="space-y-4">
                      {/* Upload Picture */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Foto Produk Utama</label>
                        <div 
                          onClick={() => document.getElementById("admin-product-file-input")?.click()}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                              const file = e.dataTransfer.files[0];
                              const r = new FileReader();
                              r.onload = () => setNewProductImage(r.result as string);
                              r.readAsDataURL(file);
                            }
                          }}
                          className="border-2 border-dashed border-gray-150 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 hover:border-accent/40 transition-all cursor-pointer group relative overflow-hidden min-h-[140px]"
                        >
                          {newProductImage ? (
                            <>
                              <img src={newProductImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black uppercase">Ganti Foto</div>
                            </>
                          ) : (
                            <>
                              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-gray-400 group-hover:text-accent transition-colors">
                                <Upload size={18} />
                              </div>
                              <span className="text-[10px] font-black text-gray-400 uppercase">Upload / Tarik Foto</span>
                            </>
                          )}
                        </div>
                        <input 
                          type="file" 
                          id="admin-product-file-input" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              const r = new FileReader();
                              r.onload = () => setNewProductImage(r.result as string);
                              r.readAsDataURL(file);
                            }
                          }}
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Nama Produk</label>
                        <input 
                          type="text"
                          required
                          value={newProductName}
                          onChange={(e) => setNewProductName(e.target.value)}
                          placeholder="Masukkan nama produk..."
                          className="w-full px-4 py-3 border border-gray-150 rounded-xl text-xs focus:ring-2 focus:ring-accent/20"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Nama Penyedia / Alumni</label>
                        <input 
                          type="text"
                          value={newProductSeller}
                          onChange={(e) => setNewProductSeller(e.target.value)}
                          placeholder="Contoh: Faris Al-Fatih"
                          className="w-full px-4 py-3 border border-gray-150 rounded-xl text-xs focus:ring-2 focus:ring-accent/20"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1 text-left">
                          <label className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Harga (Rupiah)</label>
                          <input 
                            type="number"
                            required
                            value={newProductPrice}
                            onChange={(e) => setNewProductPrice(e.target.value)}
                            placeholder="e.g. 50000"
                            className="w-full px-4 py-3 border border-gray-150 rounded-xl text-xs focus:ring-2 focus:ring-accent/20"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Jumlah Stok</label>
                          <input 
                            type="number"
                            required
                            value={newProductStock}
                            onChange={(e) => setNewProductStock(e.target.value)}
                            placeholder="Contoh: 25"
                            className="w-full px-4 py-3 border border-gray-150 rounded-xl text-xs focus:ring-2 focus:ring-accent/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">Deskripsi Produk</label>
                        <textarea 
                          rows={3}
                          value={newProductDesc}
                          onChange={(e) => setNewProductDesc(e.target.value)}
                          placeholder="Masukkan rincian, deskripsi, rasa, atau spesifikasi detail produk yang dilariskan..."
                          className="w-full px-4 py-3 border border-gray-150 rounded-xl text-xs focus:ring-2 focus:ring-accent/20 resize-none font-sans"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-4 bg-primary text-accent text-xs font-black uppercase rounded-2xl hover:brightness-110 shadow-lg cursor-pointer transition-all active:scale-95"
                      >
                        Publish ke Ritel &rarr;
                      </button>
                    </form>
                  </div>

                  {/* Curated list of waiting product items */}
                  <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl space-y-8">
                    <div className="text-left">
                      <h3 className="text-xl font-display font-black italic text-primary">Katalog & Persetujuan UMKM Alumni</h3>
                      <p className="text-xs text-gray-400 font-medium leading-relaxed mt-1">Produk baru yang diajukan oleh alumni melalui form pendaftaran produk di halaman UMKM.</p>
                    </div>

                    <div className="space-y-6">
                      {productsQueue.map((p) => (
                        <div key={p.id} className="p-5 bg-surface/50 rounded-2xl border border-gray-55 flex flex-col sm:flex-row sm:items-start justify-between gap-5 group transition-colors hover:border-primary/10 hover:bg-white">
                          <div className="flex gap-4 items-start text-left">
                            <img 
                              src={p.image || "https://images.unsplash.com/photo-1541256996761-85df2eff3139?auto=format&fit=crop&w=150&h=150&q=80"} 
                              alt={p.name}
                              className="w-20 h-20 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0"
                            />
                            <div className="space-y-1.5 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-extrabold text-primary text-sm leading-tight truncate">{p.name}</span>
                                <span className={`py-0.5 px-2 rounded-full text-[8px] font-black uppercase tracking-wider ${p.status === "Disetujui" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"}`}>
                                  {p.status}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-2 md:line-clamp-none font-medium leading-relaxed">{p.desc || "Tidak ada deskripsi produk."}</p>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-400 font-bold font-sans">
                                <span>Penyedia: <span className="text-primary">{p.seller}</span></span>
                                <span>&bull;</span>
                                <span>Harga: <span className="text-primary">{p.price}</span></span>
                              </div>
                              
                              {/* Stock Management buttons inside line item */}
                              <div className="flex items-center gap-2 pt-1 border-t border-dashed border-gray-100 mt-2">
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">Stok Persediaan:</span>
                                <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg p-0.5 border border-slate-100">
                                  <button 
                                    onClick={() => setProductsQueue(productsQueue.map(item => item.id === p.id ? { ...item, stock: Math.max(0, item.stock - 1) } : item))}
                                    className="w-6 h-6 rounded-md bg-white border border-slate-150 text-xs font-black text-gray-600 flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <input 
                                    type="number" 
                                    value={p.stock}
                                    onChange={(e) => {
                                      const val = Math.max(0, parseInt(e.target.value) || 0);
                                      setProductsQueue(productsQueue.map(item => item.id === p.id ? { ...item, stock: val } : item));
                                    }}
                                    className="w-10 text-center text-xs font-bold bg-transparent border-0 focus:outline-none focus:ring-0 text-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                                  <button 
                                    onClick={() => setProductsQueue(productsQueue.map(item => item.id === p.id ? { ...item, stock: item.stock + 1 } : item))}
                                    className="w-6 h-6 rounded-md bg-white border border-slate-150 text-xs font-black text-gray-600 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"
                                  >
                                    +
                                  </button>
                                </div>
                                <span className="text-[9px] font-bold text-gray-400">Unit</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex sm:flex-col gap-2 shrink-0 sm:items-end sm:ml-auto">
                            {p.status === "Tertunda" && (
                              <button 
                                onClick={() => approveProduct(p.id)}
                                className="bg-primary hover:bg-primary/90 text-accent text-[9px] font-black tracking-wider uppercase px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
                              >
                                Setujui Tampil
                              </button>
                            )}
                            <button 
                              onClick={() => deleteProduct(p.id)}
                              className="bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white p-2.5 rounded-xl border border-rose-100/50 hover:border-transparent transition-all cursor-pointer shadow-xs"
                              title="Hapus Produk"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}            {activeTab === "kamara_orders" && currentRole === "kamara" && (
              <motion.div 
                key="kamara_orders_page"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -20 }}
                className="space-y-8 text-left text-primary"
              >
                <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-2xl space-y-8 font-sans">
                  <div>
                    <h3 className="text-2xl font-display font-black italic text-primary">Sistem Deteksi Pemesanan Ritel (Koperasi Checkout)</h3>
                    <p className="text-xs text-gray-400 font-medium mt-1">Gunakan panel ini untuk melacak, memverifikasi data pembeli, serta merubah status logistik pesanan pelanggan KAMARA Care WhatsApp.</p>
                  </div>

                  <div className="space-y-4">
                    {ordersQueue.map((order) => (
                      <div key={order.id} className="p-6 bg-surface/50 rounded-2xl border border-gray-55 flex flex-col md:flex-row md:items-center gap-6 justify-between hover:border-emerald-500/15 hover:bg-white transition-all shadow-xs">
                        <div className="space-y-2 text-left">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-black text-gray-750 bg-gray-100 px-3 py-1 rounded-md">{order.id}</span>
                            <span className="text-[10px] text-gray-400 font-bold">Tanggal: {order.date}</span>
                            <span className={`px-2 py-0.5 text-[8px] font-black rounded uppercase ${
                              order.status === "Selesai" 
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                                : order.status === "Dalam Pengiriman"
                                  ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                                  : "bg-amber-50 text-amber-500 border border-amber-100"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          
                          <div className="space-y-0.5">
                            <h4 className="font-extrabold text-primary text-sm">Pembeli: {order.customer}</h4>
                            <p className="text-xs text-gray-600 font-medium">Mitra Pengirim: <span className="font-bold text-gray-700">{order.partnerName}</span></p>
                            <p className="text-xs text-gray-400 font-medium">Banyak barang: <span className="font-semibold text-gray-600">{order.items}</span></p>
                          </div>

                          <div className="flex flex-wrap gap-4 text-[10px] font-bold text-gray-400 pt-1">
                            <span>Metode: <strong className="text-primary">{order.method}</strong></span>
                            <span>&bull;</span>
                            <span>Nilai Belanja: <strong className="text-emerald-600 font-black">{order.total}</strong></span>
                            <span>&bull;</span>
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="text-primary hover:text-accent font-black underline cursor-pointer"
                            >
                              Lihat Rincian & Data Pembeli &rarr;
                            </button>
                          </div>
                        </div>

                        {/* Interactive status updates with timeline buttons */}
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-[9px] font-black uppercase text-gray-400 mr-2">Status Logistik:</span>
                          <button 
                            onClick={() => updateOrderStatus(order.id, "Diproses")}
                            className={`px-3 py-2 text-[9px] font-black uppercase rounded-lg border cursor-pointer transition-all ${order.status === "Diproses" ? "bg-amber-500 border-amber-500 text-primary" : "bg-white text-gray-400 hover:text-primary"}`}
                          >
                            DIPROSES
                          </button>
                          <button 
                            onClick={() => updateOrderStatus(order.id, "Dalam Pengiriman")}
                            className={`px-3 py-2 text-[9px] font-black uppercase rounded-lg border cursor-pointer transition-all ${order.status === "Dalam Pengiriman" ? "bg-indigo-500 border-indigo-500 text-white" : "bg-white text-gray-400 hover:text-primary"}`}
                          >
                            LOGISTIK / KIRIM
                          </button>
                          <button 
                            onClick={() => updateOrderStatus(order.id, "Selesai")}
                            className={`px-3 py-2 text-[9px] font-black uppercase rounded-lg border cursor-pointer transition-all ${order.status === "Selesai" ? "bg-emerald-600 border-emerald-600 text-white" : "bg-white text-gray-400 hover:text-primary"}`}
                          >
                            SELESAI
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 4. ADMIN MITRA KATARA SUB PAGES                               */}
            {/* ------------------------------------------------------------- */}
            {activeTab === "katara_alliances" && currentRole === "katara" && (
              <motion.div 
                key="katara_alliances_page"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  
                  {/* Add Mitra Corporate Partnerships */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl h-fit space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-display font-black italic text-primary">Tambahkan Aliansi Rekan Baru</h3>
                      <p className="text-xs text-gray-400 font-medium">Buka luas peluang sponsor & CSR strategis alumni.</p>
                    </div>

                    <form onSubmit={handleAddMitra} className="space-y-4">
                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Nama Instansi / Korporasi</label>
                        <input 
                          type="text"
                          required
                          value={newMitraName}
                          onChange={(e) => setNewMitraName(e.target.value)}
                          placeholder="Masukkan nama resmi mitra (e.g. PT/CV/Dinas)..."
                          className="w-full px-4 py-3 border border-gray-100 rounded-xl text-xs focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Bidang Kolaborasi</label>
                        <input 
                          type="text"
                          required
                          value={newMitraField}
                          onChange={(e) => setNewMitraField(e.target.value)}
                          placeholder="e.g. Pangan, Konstruksi, Agribisnis..."
                          className="w-full px-4 py-3 border border-gray-100 rounded-xl text-xs focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Format Kemitraan (Tier)</label>
                        <select 
                          className="w-full px-4 py-3 border border-gray-100 rounded-xl text-xs bg-white text-gray-700"
                          value={newMitraTier}
                          onChange={(e) => setNewMitraTier(e.target.value)}
                        >
                          <option value="Platinum">Platinum Partner</option>
                          <option value="Gold">Gold Partner</option>
                          <option value="Silver">Silver Partner</option>
                          <option value="Strategic Partner">Strategic Partner (Non-Finansial)</option>
                        </select>
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Besaran Kontribusi CSR (Rupiah)</label>
                        <input 
                          type="number"
                          value={newMitraContribution}
                          onChange={(e) => setNewMitraContribution(e.target.value)}
                          placeholder="e.g 15000000 (Isian Angka)"
                          className="w-full px-4 py-3 border border-gray-100 rounded-xl text-xs focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-4 bg-primary text-accent text-xs font-black uppercase rounded-2xl hover:brightness-110 shadow-lg cursor-pointer transition-all active:scale-95"
                      >
                        Daftarkan Aliansi &rarr;
                      </button>
                    </form>
                  </div>

                  {/* List of Partner databases */}
                  <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl space-y-8">
                    <div>
                      <h3 className="text-xl font-display font-black italic text-primary">Grup Data Aliansi Mitra Katara PC IKA PMII KBB</h3>
                      <p className="text-xs text-gray-400 font-medium mt-1">Daftar jaringan eksternal penunjang CSR finansial & non-finansial program kerja.</p>
                    </div>

                    <div className="space-y-4">
                      {mitralist.map((m) => (
                        <div key={m.id} className="p-5 bg-surface/50 rounded-2xl border border-gray-55 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="font-extrabold text-primary text-sm">{m.name}</span>
                              <span className={`py-0.5 px-3 rounded-full text-[8px] font-black uppercase ${
                                m.sponsorTier === "Platinum" ? "bg-indigo-100 text-indigo-800" :
                                m.sponsorTier === "Gold" ? "bg-amber-100 text-amber-800" :
                                "bg-gray-100 text-gray-800"
                              }`}>
                                {m.sponsorTier}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">Sektor Kegiatan: <strong className="text-primary">{m.field}</strong></p>
                            <p className="text-[10px] text-gray-400 font-bold">Kehadiran Dana CSR: Rp {m.fundContribution.toLocaleString("id-ID")}</p>
                          </div>

                          <button 
                            onClick={() => deleteMitra(m.id)}
                            className="bg-red-50 text-red-650 hover:bg-red-500 hover:text-white p-2.5 rounded-lg transition-colors cursor-pointer shrink-0 md:ml-auto"
                            title="Hapus Kemitraan"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {activeTab === "katara_finance" && currentRole === "katara" && (
              <motion.div 
                key="katara_finance_page"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -20 }}
                className="space-y-8"
              >
                {/* Ledger calculations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl text-left space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Sponsoship Masuk</p>
                    <h4 className="text-2xl font-sans font-black text-emerald-600">
                      Rp {totalCsrFundsReceived.toLocaleString("id-ID")}
                    </h4>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl text-left space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">Dana Terpakai Alokasi</p>
                    <h4 className="text-2xl font-sans font-black text-indigo-600">
                      Rp {totalCsrAllocated.toLocaleString("id-ID")}
                    </h4>
                  </div>
                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl text-left space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">Sisa Kas Siap Disalurkan</p>
                    <h4 className="text-2xl font-sans font-black text-primary">
                      Rp {remainingCsrBalance.toLocaleString("id-ID")}
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
                  
                  {/* Create deployment form */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl h-fit space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-display font-black italic text-primary">Alokasikan Dana CSR</h3>
                      <p className="text-xs text-gray-400 font-medium">Buku pembelanjaan transparansi pendanaan sosial.</p>
                    </div>

                    <form onSubmit={handleAddAllocation} className="space-y-4">
                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Nama Program Penyaluran</label>
                        <input 
                          type="text"
                          required
                          value={newAllocProgram}
                          onChange={(e) => setNewAllocProgram(e.target.value)}
                          placeholder="e.g. Pelatihan Jurnalistik Alumni..."
                          className="w-full px-4 py-3 border border-gray-100 rounded-xl text-xs focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Penerima Manfaat / Pelaksana</label>
                        <input 
                          type="text"
                          required
                          value={newAllocRecipient}
                          onChange={(e) => setNewAllocRecipient(e.target.value)}
                          placeholder="e.g. Koperasi KAMARA, KOPRI PMII..."
                          className="w-full px-4 py-3 border border-gray-100 rounded-xl text-xs focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Estimasi Kebutuhan Biaya (IDR)</label>
                        <input 
                          type="number"
                          required
                          value={newAllocCost}
                          onChange={(e) => setNewAllocCost(e.target.value)}
                          placeholder="e.g. 5000000"
                          className="w-full px-4 py-3 border border-gray-100 rounded-xl text-xs focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-4 bg-primary text-accent text-xs font-black uppercase rounded-2xl hover:brightness-110 shadow-lg cursor-pointer transition-all active:scale-95"
                      >
                        Terbitkan Alokasi Dana &rarr;
                      </button>
                    </form>
                  </div>

                  {/* List of allocations */}
                  <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl space-y-8">
                    <div>
                      <h3 className="text-xl font-display font-black italic text-primary">Buku Bantu Arus Allocation CSR</h3>
                      <p className="text-xs text-gray-400 font-medium mt-1">Status audit penyaluran dana beasiswa & bantuan kemandirian mitra.</p>
                    </div>

                    <div className="space-y-4">
                      {csrAllocations.map((c) => (
                        <div key={c.id} className="p-5 bg-surface/50 rounded-2xl border border-gray-55 flex items-center justify-between group">
                          <div className="space-y-1">
                            <h4 className="font-extrabold text-primary text-xs leading-snug">{c.program}</h4>
                            <p className="text-[10px] text-gray-500 font-medium">Pelaksana: <span className="text-primary font-bold">{c.recipient}</span> &bull; Tanggal Rilis: {c.date}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-sans font-black text-xs text-indigo-600 block">- Rp {c.cost.toLocaleString("id-ID")}</span>
                            <button 
                              onClick={() => setCsrAllocations(csrAllocations.filter(item => item.id !== c.id))}
                              className="text-[9px] font-bold text-red-500 hover:underline hover:opacity-100 opacity-60 transition-all mt-1"
                            >
                              Batalkan
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* GLOBAL BIODATA DETAIL MODAL FOR ADMIN SIAP                     */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {selectedPartner && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-12 text-primary"
            onClick={() => setSelectedPartner(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white w-full max-w-3xl max-h-[90vh] rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-8 right-8 z-20">
                <button 
                  onClick={() => setSelectedPartner(null)}
                  className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-primary hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="flex flex-col md:flex-row flex-grow overflow-hidden text-left">
                <div className="md:w-2/5 bg-primary relative shrink-0">
                  <img 
                    src={selectedPartner.image || "https://images.unsplash.com/photo-1541256996761-85df2eff3139?auto=format&fit=crop&w=300&h=300&q=80"} 
                    className="w-full h-full object-cover opacity-75 grayscale hover:grayscale-0 transition-all duration-700" 
                    alt={selectedPartner.businessName} 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-primary via-primary/80 to-transparent">
                    <h3 className="text-2xl font-display font-black text-accent italic leading-tight">{selectedPartner.businessName}</h3>
                    <p className="text-[10px] text-emerald-350 font-bold uppercase tracking-widest mt-1">Sertifikasi: Terverifikasi KBB</p>
                  </div>
                </div>

                <div className="md:w-3/5 overflow-y-auto p-10 space-y-8 text-primary">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-accent uppercase tracking-[0.2em] bg-primary/5 inline-block px-3 py-1.5 rounded-lg text-primary">Informasi Pokok Mitra</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InfoItem label="Pemilik Rekanan" value={selectedPartner.ownerName} />
                      <InfoItem label="Kategori Bisnis" value={selectedPartner.category} />
                      <InfoItem label="Kontak WhatsApp" value={selectedPartner.whatsapp} />
                      <InfoItem label="Wilayah Operasi" value={selectedPartner.address} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-accent uppercase tracking-[0.2em] bg-primary/5 inline-block px-3 py-1.5 rounded-lg text-primary font-bold">Tentang Bidang Usaha</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{selectedPartner.desc}</p>
                  </div>

                  {/* Dynamic products contributed from catalog */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Produk yang Didistribusikan:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {productsQueue.filter(p => p.seller.toLowerCase().includes(selectedPartner.ownerName.toLowerCase()) || p.seller.toLowerCase().includes(selectedPartner.businessName.toLowerCase())).length > 0 ? (
                        productsQueue.filter(p => p.seller.toLowerCase().includes(selectedPartner.ownerName.toLowerCase()) || p.seller.toLowerCase().includes(selectedPartner.businessName.toLowerCase())).map((prod) => (
                          <div key={prod.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                            <span className="font-extrabold">{prod.name}</span>
                            <span className="text-emerald-600 font-black">{prod.price}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-450 italic">Belum mengunggah katalog produk.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {selectedOrder && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 text-primary"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col font-sans p-8 md:p-10 text-primary"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-8 right-8 z-20">
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <XCircle size={20} />
                </button>
              </div>

              <div className="space-y-8 text-left">
                {/* Visual Invoice style header */}
                <div className="flex justify-between items-start border-b border-gray-100 pb-5">
                  <div>
                    <span className="text-[10px] font-black text-amber-500 bg-emerald-900 px-2.5 py-1 rounded">FAKTUR KOPERASI KAMARA</span>
                    <h3 className="text-xl font-mono font-black text-primary mt-2">{selectedOrder.id}</h3>
                    <p className="text-[10px] text-gray-400 mt-1">Sistem Deteksi Pelanggan Otomatis / Logistik WhatsApp</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium">Tanggal Transaksi</p>
                    <p className="text-xs font-bold text-primary">{selectedOrder.date}</p>
                    <p className="text-[10.5px] font-black text-emerald-600 mt-1">{selectedOrder.status}</p>
                  </div>
                </div>

                {/* 1. DATA PEMBELI */}
                <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Identitas Data Pembeli (Customer)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div>
                      <span className="block text-[8px] text-gray-450 font-extrabold uppercase">Nama Pelanggan / Buyer</span>
                      <strong className="text-primary text-sm">{selectedOrder.customer}</strong>
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-455 font-extrabold uppercase">Nomor WhatsApp</span>
                      <strong className="text-emerald-600 block">{selectedOrder.customerPhone}</strong>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <span className="block text-[8px] text-gray-455 font-extrabold uppercase">Alamat Kirim / Logistik Domisili</span>
                      <strong className="text-primary font-semibold leading-relaxed">{selectedOrder.customerAddress}</strong>
                    </div>
                  </div>
                </div>

                {/* 2. DETIL PRODUK & JUMLAH BARANG */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Detil Rincian Produk & Jumlah Barang</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-gray-400 text-[10px] font-black uppercase">
                          <th className="py-2">Nama Produk / Jasa</th>
                          <th className="py-2 text-center">Jumlah Barang</th>
                          <th className="py-2 text-right">Harga Satuan</th>
                          <th className="py-2 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedOrder.itemDetails?.map((item: any, idx: number) => (
                          <tr key={idx} className="font-sans">
                            <td className="py-3 font-semibold text-primary">{item.name}</td>
                            <td className="py-3 text-center font-bold text-gray-700">{item.qty}x</td>
                            <td className="py-3 text-right text-gray-500">Rp {item.price.toLocaleString("id-ID")}</td>
                            <td className="py-3 text-right font-bold text-primary">Rp {(item.qty * item.price).toLocaleString("id-ID")}</td>
                          </tr>
                        )) || (
                          <tr className="font-sans">
                            <td className="py-3 font-semibold text-primary">{selectedOrder.items}</td>
                            <td className="py-3 text-center font-bold text-gray-700">1x</td>
                            <td className="py-3 text-right text-gray-500">{selectedOrder.total}</td>
                            <td className="py-3 text-right font-bold text-primary">{selectedOrder.total}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/40 text-sm">
                    <span className="font-extrabold text-primary">Total Nilai Belanja Pembeli:</span>
                    <strong className="text-emerald-700 font-sans font-black text-lg">{selectedOrder.total}</strong>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="pt-4 border-t border-gray-100 flex gap-4">
                  <a 
                    href={`https://wa.me/${selectedOrder.customerPhone.replace(/^0/, '62')}?text=Halo%20${encodeURIComponent(selectedOrder.customer)}%2C%20Koperasi%20KAMARA%20sedang%20memproses%20pesanan%20Anda%20dengan%20ID%20${selectedOrder.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-grow py-4 bg-emerald-600 text-white rounded-2xl font-bold text-xs shadow-md hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-center"
                  >
                    Kirim Pesan WhatsApp &rarr;
                  </a>
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-650 rounded-2xl font-bold text-xs transition-all cursor-pointer uppercase"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedApplicant && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedApplicant(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-8 right-8 z-20">
                <button 
                  onClick={() => setSelectedApplicant(null)}
                  className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-primary hover:bg-accent transition-colors cursor-pointer"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="flex flex-col md:flex-row flex-grow overflow-hidden text-left">
                <div className="md:w-1/3 bg-primary relative shrink-0">
                  <img 
                    src={selectedApplicant.img} 
                    className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" 
                    alt={selectedApplicant.name} 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-primary via-primary/80 to-transparent">
                    <h3 className="text-3xl font-display font-bold text-accent italic leading-tight">{selectedApplicant.name}</h3>
                    <p className="text-[10px] text-surface/50 font-bold uppercase tracking-widest mt-2">ID: IKAPMII-{selectedApplicant.id.toString().padStart(4, '0')}</p>
                  </div>
                </div>

                <div className="md:w-2/3 overflow-y-auto p-12 space-y-12">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] bg-primary/5 inline-block px-4 py-2 rounded-lg text-primary">Data Personal</h4>
                    <div className="grid grid-cols-2 gap-8">
                      <InfoItem label="Tempat, Tanggal Lahir" value={`${selectedApplicant.pob}, ${selectedApplicant.dob}`} />
                      <InfoItem label="Jenis Kelamin" value={selectedApplicant.gender} />
                      <InfoItem label="Email Aktif" value={selectedApplicant.email} />
                      <InfoItem label="No. WhatsApp" value={selectedApplicant.phone} />
                      <div className="col-span-2">
                        <InfoItem label="Alamat Sesuai KTP" value={selectedApplicant.address} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] bg-accent inline-block px-4 py-2 rounded-lg">Kaderisasi & Organisasi</h4>
                    <div className="grid grid-cols-2 gap-8">
                      <InfoItem label="Asal Komisariat" value={selectedApplicant.komisariat} />
                      <InfoItem label="Pendidikan Terakhir" value={selectedApplicant.lastEdu} />
                      <div className="col-span-2 space-y-4">
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">Riwayat Kaderisasi Formal</p>
                        <div className="flex gap-4">
                          <Badge label="MAPABA" year={selectedApplicant.kaderisasi.mapaba} checked />
                          <Badge label="PKD" year={selectedApplicant.kaderisasi.pkd} checked={!!selectedApplicant.kaderisasi.pkd} />
                          <Badge label="PKL" year={selectedApplicant.kaderisasi.pkl} checked={!!selectedApplicant.kaderisasi.pkl} />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <InfoItem label="Pengalaman Organisasi" value={selectedApplicant.orgs.join(", ")} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] bg-primary/5 inline-block px-4 py-2 rounded-lg text-primary">Profil Profesional</h4>
                    <div className="grid grid-cols-2 gap-8">
                      <InfoItem label="Pekerjaan Saat Ini" value={selectedApplicant.prof} />
                      <InfoItem label="Kecamatan Domisili" value={selectedApplicant.loc} />
                      <div className="col-span-2">
                        <InfoItem label="Keahlian & Minat" value={selectedApplicant.skills.join(", ")} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-100 flex gap-4">
                    <button 
                      onClick={() => { handleVerify(selectedApplicant.id); setSelectedApplicant(null); }}
                      className="flex-grow py-5 bg-primary text-accent rounded-3xl font-bold text-sm shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <CheckCircle size={20} />
                      Verifikasi & Terbitkan KTA
                    </button>
                    <button 
                      onClick={() => setSelectedApplicant(null)}
                      className="px-10 py-5 bg-gray-50 text-gray-400 rounded-3xl font-bold text-sm hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer"
                    >
                      Tunda
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1.5">
       <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{label}</p>
       <p className="font-bold text-primary text-sm leading-relaxed">{value}</p>
    </div>
  );
}

function Badge({ label, year, checked }: { label: string, year?: number | null, checked: boolean }) {
  return (
    <div className={`px-4 py-3 rounded-2xl border flex flex-col items-center gap-1 transition-all ${checked ? 'bg-primary border-primary text-white' : 'bg-surface border-gray-100 text-gray-300'}`}>
       <span className="text-[8px] font-black uppercase tracking-widest opacity-60">{label}</span>
       <span className="text-xs font-bold">{year || 'N/A'}</span>
    </div>
  );
}
