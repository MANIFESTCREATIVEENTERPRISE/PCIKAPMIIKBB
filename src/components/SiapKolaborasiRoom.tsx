import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Share2, Plus, Search, Tag, Users, Calendar, Briefcase, 
  MapPin, CheckCircle, ArrowRight, MessageSquare, Heart, 
  X, HelpCircle, User, Loader2
} from "lucide-react";

interface Collaboration {
  id: string;
  title: string;
  initiator: string;
  initiatorRole: string;
  category: "Ekonomi" | "Pendidikan" | "Sosial" | "Teknologi" | "Hukum";
  description: string;
  requiredSkills: string[];
  status: "Mencari Partner" | "Berjalan" | "Selesai";
  location: string;
  interestedMembers: string[];
  whatsapp: string;
  postedAt: string;
}

const DEFAULT_COLLABORATIONS: Collaboration[] = [
  {
    id: "collab-1",
    title: "Sinergi Ekonomi: Digitalisasi Distribusi Sayur Mayur Lembang",
    initiator: "Sahabat Sandi Supyandi, S.Kom., M.H",
    initiatorRole: "Ketua Koperasi Mitra Kamara",
    category: "Ekonomi",
    description: "Membangun sistem rantai pasok digital dari petani alumni PMII di Cisarua & Lembang menuju hub retail Padalarang. Diperlukan tim untuk menyusun operasional logistik, pemasaran digital, dan monitoring harga sayur harian.",
    requiredSkills: ["Agrobisnis", "Sistem Logistik", "Pemasaran Digital", "Analisis Harga"],
    status: "Mencari Partner",
    location: "Lembang & Padalarang",
    interestedMembers: ["Siti Mujahidah, S.E.", "Dedi Kusnadi", "Siska Amelia"],
    whatsapp: "6282115991771",
    postedAt: "24 Mei 2026"
  },
  {
    id: "collab-2",
    title: "Gerakan Bakti Sosial: Posko Medis & Penyuluhan Kesehatan Desa Cipatat",
    initiator: "Sdr. Anisa Bahar, S.Kep",
    initiatorRole: "Kader Bidang Sosial Kemasyarakatan",
    category: "Sosial",
    description: "Kolaborasi aksi nyata alumni lintas angkatan untuk menyelenggarakan pemeriksaan kesehatan gratis dan edukasi pencegahan stunting di pelosok Cipatat. Terbuka untuk seluruh alumni medis, logistik, maupun relawan lapangan.",
    requiredSkills: ["Tenaga Medis", "Manajemen Event", "Penyuluhan Berbahasa Sunda", "Logistik Lapangan"],
    status: "Mencari Partner",
    location: "Kecamatan Cipatat",
    interestedMembers: ["Dewi Sartika", "Hendra Gunawan"],
    whatsapp: "6282115991771",
    postedAt: "22 Mei 2026"
  },
  {
    id: "collab-3",
    title: "Klinik Advokasi Hukum Keliling Bagi Pelaku UMKM KBB",
    initiator: "Rina Rahmawati, S.H., M.H",
    initiatorRole: "Pendiri LBH Alumni PMII KBB",
    category: "Hukum",
    description: "Program penyuluhan hukum gratis dan pendampingan pengurusan legalitas usaha (PIRT, NIB, Halal) bagi pelaku UMKM ultra mikro milik jaringan alumni di Bandung Barat.",
    requiredSkills: ["Hukum Perdata", "Kurasi Legalitas Usaha", "Negosiasi", "Komunikasi UMKM"],
    status: "Berjalan",
    location: "Seluruh Wilayah KBB",
    interestedMembers: ["Ahmad Fauzi", "Abdul Karim", "Nurul Hidayah"],
    whatsapp: "628123456789",
    postedAt: "19 Mei 2026"
  },
  {
    id: "collab-4",
    title: "Beasiswa 'Bintang Sembilan': Bimbingan Belajar & Mentoring Masuk PTN",
    initiator: "Dr. Ahmad Jauhari, M.Pd",
    initiatorRole: "Dosen & Ketua Dewan Pendidikan Alumni",
    category: "Pendidikan",
    description: "Kolaborasi akademis alumni IKA PMII berbentuk penyelenggaraan program bimbel dan mentoring intensif bagi kader muda PMII lulusan SMA di KBB agar dapat lolos seleksi perguruan tinggi negeri bergengsi.",
    requiredSkills: ["Mengajar", "Mentoring Akademik", "Psikologi Anak", "Pembuatan Modul"],
    status: "Mencari Partner",
    location: "Kecamatan Ngamprah & Online",
    interestedMembers: ["Nurul Hidayah S.Pd", "Yayan Mulyana", "Putri Utami"],
    whatsapp: "628571234567",
    postedAt: "15 Mei 2026"
  }
];

export default function SiapKolaborasiRoom() {
  const [collabs, setCollabs] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering & Search
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("Semua");
  const [statusFilter, setStatusFilter] = useState<string>("Semua");
  
  // Custom Profile Retrieval to get user name
  const [currentUser, setCurrentUser] = useState<string>("Saya (Alumni KBB)");
  
  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"Ekonomi" | "Pendidikan" | "Sosial" | "Teknologi" | "Hukum">("Ekonomi");
  const [newDescription, setNewDescription] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newWhatsapp, setNewWhatsapp] = useState("");

  // Load Collaborations from Local Storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("siap_collaborations");
      if (saved) {
        setCollabs(JSON.parse(saved));
      } else {
        setCollabs(DEFAULT_COLLABORATIONS);
        localStorage.setItem("siap_collaborations", JSON.stringify(DEFAULT_COLLABORATIONS));
      }
    } catch {
      setCollabs(DEFAULT_COLLABORATIONS);
    }

    // Load active user profile name
    try {
      const profileSaved = localStorage.getItem("siap_user_profile");
      if (profileSaved) {
        const parsed = JSON.parse(profileSaved);
        if (parsed.fullName) {
          setCurrentUser(parsed.fullName);
        }
      }
    } catch {
      // Fallback
    }

    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  // Save changes to localStorage
  const saveCollabsToStorage = (nextCollabs: Collaboration[]) => {
    setCollabs(nextCollabs);
    localStorage.setItem("siap_collaborations", JSON.stringify(nextCollabs));
  };

  // Toggle Express Interest
  const handleToggleInterest = (id: string) => {
    const next = collabs.map((collab) => {
      if (collab.id === id) {
        const hasJoined = collab.interestedMembers.includes(currentUser);
        let newInterested = [...collab.interestedMembers];
        if (hasJoined) {
          newInterested = newInterested.filter((name) => name !== currentUser);
        } else {
          newInterested.push(currentUser);
        }
        return {
          ...collab,
          interestedMembers: newInterested
        };
      }
      return collab;
    });
    saveCollabsToStorage(next);
  };

  // Handle Create Collaboration Proposal
  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim() || !newLocation.trim()) return;

    // Split skill list by comma
    const parsedSkills = newSkills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const newCollab: Collaboration = {
      id: "collab-" + Math.floor(100000 + Math.random() * 900000),
      title: newTitle,
      initiator: currentUser,
      initiatorRole: "Alumni Terdaftar (SIAP)",
      category: newCategory,
      description: newDescription,
      requiredSkills: parsedSkills.length > 0 ? parsedSkills : ["Sinergitas", "Kerjasama", "Relawan"],
      status: "Mencari Partner",
      location: newLocation,
      interestedMembers: [],
      whatsapp: newWhatsapp.replace(/[^0-9]/g, "") || "6282115991771",
      postedAt: "Hari ini"
    };

    const next = [newCollab, ...collabs];
    saveCollabsToStorage(next);

    // Reset Form & Close
    setNewTitle("");
    setNewCategory("Ekonomi");
    setNewDescription("");
    setNewSkills("");
    setNewLocation("");
    setNewWhatsapp("");
    setIsFormOpen(false);
  };

  // Filter calculations
  const filtered = collabs.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(search.toLowerCase()) || 
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.initiator.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = categoryFilter === "Semua" || c.category === categoryFilter;
    const matchesStatus = statusFilter === "Semua" || c.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-10"
      id="siap-kolaborasi-view"
    >
      {/* 1. Header & Propose Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <h3 className="text-4xl font-display font-bold text-primary italic">SIAP Kolaborasi</h3>
          <p className="text-gray-400 text-sm font-medium">Jejaring sinergi karya nyata antar-alumni demi mewujudkan kemandirian kader & masyarakat.</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="cursor-pointer bg-primary text-accent hover:brightness-110 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-2.5"
          id="btn-ajukan-kolaborasi"
        >
          <Plus size={16} className="stroke-[3]" />
          Ajukan Kolaborasi Baru
        </button>
      </div>

      {/* 2. Filters Row */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari gagasan, nama, atau inisiator..."
            className="w-full pl-12 pr-4 py-3 bg-surface border border-gray-200 rounded-xl focus:outline-none focus:border-accent text-sm font-medium transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <select
            className="px-4 py-3 bg-surface border border-gray-200 rounded-xl text-xs font-bold text-primary cursor-pointer focus:outline-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Ekonomi">Ekonomi & Bisnis</option>
            <option value="Pendidikan">Pendidikan & Litbang</option>
            <option value="Sosial">Sosial & Keagamaan</option>
            <option value="Teknologi">Sains & Teknologi</option>
            <option value="Hukum">Hukum & Advokasi</option>
          </select>

          <select
            className="px-4 py-3 bg-surface border border-gray-200 rounded-xl text-xs font-bold text-primary cursor-pointer focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Semua">Semua Status</option>
            <option value="Mencari Partner">Mencari Partner</option>
            <option value="Berjalan">Sedang Berjalan</option>
            <option value="Selesai">Telah Selesai</option>
          </select>
        </div>
      </div>

      {/* 3. Grid of Projects */}
      {loading ? (
        <div className="py-24 text-center">
          <Loader2 className="animate-spin text-accent mx-auto mb-4" size={36} />
          <p className="text-sm font-bold text-primary">Memuat papan kolaborasi strategis...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-[2.5rem] bg-gray-50/50">
          <Share2 className="text-gray-300 mx-auto mb-4 stroke-[1.5]" size={48} />
          <p className="text-sm font-bold text-primary">Tidak Ada Kolaborasi Ditemukan</p>
          <p className="text-xs text-gray-400 font-medium max-w-sm mx-auto mt-2">Coba ubah kata kunci pencarian atau ganti filter kategori / status yang Anda pilih.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left" id="collaboration-items-grid">
          {filtered.map((item) => {
            const hasJoined = item.interestedMembers.includes(currentUser);
            const badgeColorMap = {
              Ekonomi: "bg-emerald-50 text-emerald-700 border-emerald-100",
              Pendidikan: "bg-blue-50 text-blue-700 border-blue-100",
              Sosial: "bg-rose-50 text-rose-700 border-rose-100",
              Teknologi: "bg-purple-50 text-purple-700 border-purple-100",
              Hukum: "bg-amber-50 text-amber-700 border-amber-100"
            };

            return (
              <motion.div
                key={item.id}
                layout
                className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
              >
                {/* Status Badge */}
                <span className={`absolute top-6 right-6 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                  item.status === "Mencari Partner" ? "bg-amber-50 border-amber-100 text-amber-700 animate-pulse" :
                  item.status === "Berjalan" ? "bg-cyan-50 border-cyan-100 text-cyan-700" :
                  "bg-gray-100 border-gray-200 text-gray-500"
                }`}>
                  {item.status}
                </span>

                <div className="space-y-4">
                  {/* Category Pill & Post Date */}
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border ${badgeColorMap[item.category]}`}>
                      {item.category}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Diposting {item.postedAt}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-display font-bold text-lg text-primary group-hover:text-amber-500 transition-colors leading-snug">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {item.description}
                  </p>

                  {/* Initiator details */}
                  <div className="bg-slate-50/70 p-3.5 rounded-xl flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {item.initiator.substring(0, 2).replace(/[^a-zA-Z]/g, "A")}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-primary">{item.initiator}</h5>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.initiatorRole}</p>
                    </div>
                  </div>

                  {/* Required Skills badges */}
                  <div className="space-y-1.5Packed font">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Kompetensi yang Dibutuhkan:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.requiredSkills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[9px] font-bold text-primary px-2 py-1 bg-white border border-gray-150 rounded-lg shadow-2xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer and dynamic action buttons */}
                <div className="border-t border-gray-100 pt-5 mt-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                    <Users size={14} className="text-accent" />
                    <span>{item.interestedMembers.length} Partner Tertarik</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Express Interest Toggle */}
                    <button
                      onClick={() => handleToggleInterest(item.id)}
                      className={`px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border cursor-pointer ${
                        hasJoined 
                          ? "bg-rose-50 border-rose-100 text-rose-600 font-black" 
                          : "bg-surface border-gray-200 text-gray-600 hover:bg-rose-50/40 hover:text-rose-600 hover:border-rose-100"
                      }`}
                    >
                      <Heart size={12} className={hasJoined ? "fill-rose-600 stroke-rose-600" : ""} />
                      {hasJoined ? "Tertarik" : "Minat Sinergi"}
                    </button>

                    {/* WhatsApp Hubungi */}
                    <a
                      href={`https://wa.me/${item.whatsapp}?text=${encodeURIComponent(`Halo ${item.initiator}, saya alumni PMII Bandung Barat tertarik berdiskusi lebih lanjut mengenai gagasan kolaborasi Anda: "${item.title}". Mohon infonya, salam hangat!`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <MessageSquare size={12} />
                      Diskusi WA
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 4. Help Section */}
      <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-6 text-left flex items-start gap-4">
        <HelpCircle size={32} className="text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h5 className="font-bold text-primary text-sm">Bagaimana Cara Kerja SIAP Kolaborasi?</h5>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Setiap alumni dapat mengajukan rancangan kolaborasi, baik berupa bisnis bersama, aksi sosial, kurasi literasi, maupun bantuan hukum. Alumni lain yang memiliki kompetensi sesuai dapat menyatakan minat ("Minat Sinergi") atau langsung memulai obrolan via WhatsApp untuk merealisasikan rencana kerja tersebut secara kolaboratif.
          </p>
        </div>
      </div>

      {/* 5. Custom Modal Form for Proposal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/70 backdrop-blur-xs"
              onClick={() => setIsFormOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[2.5rem] p-6 md:p-8 w-[80%] max-w-[80%] text-left shadow-2xl relative z-10 border border-gray-100 flex flex-col max-h-[85vh] md:max-h-[90vh] mx-auto"
              id="form-add-kolaborasi-modal"
            >
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 shrink-0">
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-lg text-primary">Ajukan Gagasan Kolaborasi</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tarik minat alumni terbaik untuk bekerjasama secara real</p>
                </div>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmitProposal} className="flex flex-col overflow-hidden flex-grow pt-4">
                <div className="overflow-y-auto pr-2 flex-grow space-y-5 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Title */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-primary uppercase tracking-wide">Judul Inisiatif / Kolaborasi <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          required
                          placeholder="Contoh: Pendirian Badan Usaha Bersama Tani Organik"
                          className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-primary uppercase tracking-wide">Kategori Fokus <span className="text-red-500">*</span></label>
                        <select 
                          className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-primary focus:outline-none focus:border-accent cursor-pointer"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value as any)}
                        >
                          <option value="Ekonomi">Ekonomi & Bisnis</option>
                          <option value="Pendidikan">Pendidikan & Litbang</option>
                          <option value="Sosial">Sosial & Keagamaan</option>
                          <option value="Teknologi">Sains & Teknologi</option>
                          <option value="Hukum">Hukum & Advokasi</option>
                        </select>
                      </div>

                      {/* Location */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-primary uppercase tracking-wide">Lokasi / Cakupan Wilayah <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          required
                          placeholder="Contoh: Kecamatan Lembang, Bandung Barat, atau Online"
                          className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent"
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Required Skills */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-primary uppercase tracking-wide">Kompetensi yang Dicari (Koma)</label>
                        <input 
                          type="text" 
                          placeholder="Contoh: Pemasaran digital, Akuntansi"
                          className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent"
                          value={newSkills}
                          onChange={(e) => setNewSkills(e.target.value)}
                        />
                      </div>

                      {/* Whatsapp */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-primary uppercase tracking-wide">No. WhatsApp Hubung <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          required
                          placeholder="Contoh: 6282115991771"
                          className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent"
                          value={newWhatsapp}
                          onChange={(e) => setNewWhatsapp(e.target.value)}
                        />
                      </div>

                      {/* Description */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-primary uppercase tracking-wide">Rencana Kerja & Solusi <span className="text-red-500">*</span></label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Jelaskan langkah konkret..."
                          className="w-full bg-surface border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent resize-none"
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-150 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-primary text-accent hover:brightness-110 text-xs font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                  >
                    Kirim & Publikasikan Gagasan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
