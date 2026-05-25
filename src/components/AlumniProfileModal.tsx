import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Hash, Mail, Phone, UserCheck, MapPin, Briefcase, MessageCircle,
  Award, BookOpen, Store, Users, Heart, Share2, Sparkles, ShieldCheck,
  Calendar, Info, Compass, Link2, CheckSquare, GraduationCap, Building2,
  Lock, CheckCircle2, ChevronRight, User
} from "lucide-react";
import { getAlumniProfileByName, AlumniProfile } from "../data/alumniProfiles";

interface CustomAlumniProfile extends AlumniProfile {
  nickname?: string;
  birthPlace?: string;
  birthDate?: string;
  address?: string;
  subDistrict?: string;
  postalCode?: string;
  
  // Kaderisasi & Pendidikan
  rayon?: string;
  komisariat?: string;
  campus?: string;
  enrollYear?: string;
  advancedTraining?: string;
  lastPosition?: string;
  degreeTitle?: string;
  gradYear?: string;
  highestDegree?: string;
  primarySkill?: string;
  certifications?: string;
  
  // Profesi & Karir
  jobStatus?: string;
  company?: string;
  position?: string;
  sector?: string;
  
  // Usaha & Bisnis
  hasBusiness?: string;
  businessName?: string;
  businessType?: string;
  businessLocation?: string;
  
  // Keluarga
  maritalStatus?: string;
  spouseIsPmii?: string;
  spouseName?: string;
  spouseProfession?: string;

  // Arrays
  pmiiHistory?: any[];
  educationHistory?: any[];
  professionHistory?: any[];
  businessHistory?: any[];
  networks?: any[];
  interests?: string[];
  contributions?: string[];
}

export default function AlumniProfileModal() {
  const [focusedAlumni, setFocusedAlumni] = useState<{ name: string; defaultLoc?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<string>("ringkasan");

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ name: string; defaultLoc?: string }>;
      if (customEvent.detail && customEvent.detail.name) {
        setFocusedAlumni({
          name: customEvent.detail.name,
          defaultLoc: customEvent.detail.defaultLoc,
        });
        setActiveTab("ringkasan"); // Always reset tab on profile change
      }
    };
    window.addEventListener("show-alumni-profile", handler);
    return () => window.removeEventListener("show-alumni-profile", handler);
  }, []);

  // Compute merged detailed profile
  const activeProfile: CustomAlumniProfile | null = (() => {
    if (!focusedAlumni) return null;

    // Get baseline profile
    const base = getAlumniProfileByName(focusedAlumni.name, focusedAlumni.defaultLoc);
    if (!base) return null;

    let merged: CustomAlumniProfile = { ...base };

    // Common normalize function to compare names robustly
    const normalizeName = (n: string) => {
      return n
        .replace(/^(Sahabat|Adv\.|Dr\.|Drs\.|H\.|Hj\.)\s+/, "")
        .trim()
        .toLowerCase();
    };

    // 1. Merge with current logged-in user profile if names match
    try {
      const savedUserStr = localStorage.getItem("siap_user_profile");
      if (savedUserStr) {
        const savedUser = JSON.parse(savedUserStr);
        if (normalizeName(savedUser.fullName) === normalizeName(base.name)) {
          merged = {
            ...merged,
            nickname: savedUser.nickname || merged.nickname,
            gender: savedUser.gender === "Perempuan" ? "P" : "L",
            birthPlace: savedUser.birthPlace || merged.birthPlace,
            birthDate: savedUser.birthDate || merged.birthDate,
            nik: savedUser.nik || merged.nik,
            whatsapp: savedUser.whatsapp || merged.whatsapp,
            address: savedUser.address || merged.address || merged.loc,
            subDistrict: savedUser.subDistrict || savedUser.subdistrict || merged.subDistrict,
            postalCode: savedUser.postalCode || merged.postalCode,
            email: savedUser.email || merged.email,
            
            // Kader & Edu
            rayon: savedUser.rayon || merged.rayon,
            komisariat: savedUser.komisariat || merged.komisariat,
            campus: savedUser.campus || merged.campus,
            enrollYear: savedUser.enrollYear || merged.enrollYear,
            advancedTraining: savedUser.advancedTraining || merged.advancedTraining,
            lastPosition: savedUser.lastPosition || merged.lastPosition,
            degreeTitle: savedUser.degreeTitle || merged.degreeTitle,
            gradYear: savedUser.gradYear || merged.gradYear,
            highestDegree: savedUser.highestDegree || merged.highestDegree,
            primarySkill: savedUser.primarySkill || merged.primarySkill,
            certifications: savedUser.certifications || merged.certifications,

            // Karir
            jobStatus: savedUser.jobStatus || merged.jobStatus,
            company: savedUser.company || merged.company,
            position: savedUser.position || merged.position,
            sector: savedUser.sector || merged.sector,

            // Usaha
            hasBusiness: savedUser.hasBusiness || merged.hasBusiness,
            businessName: savedUser.businessName || merged.businessName,
            businessType: savedUser.businessType || merged.businessType,
            businessLocation: savedUser.businessLocation || merged.businessLocation,

            // Keluarga
            maritalStatus: savedUser.maritalStatus || merged.maritalStatus,
            spouseIsPmii: savedUser.spouseIsPmii || merged.spouseIsPmii,
            spouseName: savedUser.spouseName || merged.spouseName,
            spouseProfession: savedUser.spouseProfession || merged.spouseProfession,

            // Arrays
            pmiiHistory: savedUser.pmiiHistory || merged.pmiiHistory,
            educationHistory: savedUser.educationHistory || merged.educationHistory,
            professionHistory: savedUser.professionHistory || merged.professionHistory,
            businessHistory: savedUser.businessHistory || merged.businessHistory,
            networks: savedUser.networks || merged.networks,
            interests: savedUser.interests || merged.interests,
            contributions: savedUser.contributions || merged.contributions || merged.contrib
          };
        }
      }
    } catch (e) {
      console.error("Error merging active account profile", e);
    }

    // 2. Merge with admin verified members DB if present
    try {
      const verifiedDbStr = localStorage.getItem("siap_verified_members_db");
      if (verifiedDbStr) {
        const db = JSON.parse(verifiedDbStr);
        const match = db.find((item: any) => normalizeName(item.name) === normalizeName(base.name));
        if (match) {
          merged = {
            ...merged,
            ...match,
            gender: match.gender === "Perempuan" || match.gender === "P" ? "P" : "L",
            pmiiHistory: match.pmiiHistory || merged.pmiiHistory,
            educationHistory: match.educationHistory || merged.educationHistory,
            professionHistory: match.professionHistory || merged.professionHistory,
            businessHistory: match.businessHistory || merged.businessHistory,
            networks: match.networks || merged.networks,
            interests: match.interests || merged.interests,
            contributions: match.contributions || match.contrib || merged.contributions,
          };
        }
      }
    } catch (e) {
      console.error("Error merging verified database profile", e);
    }

    // 3. Fallback deterministic generator for historical details if empty
    // This populates the tabs with meaningful realistic timelines for predefined leaders
    const genYear = parseInt(merged.generation?.replace(/[^0-9]/g, "") || "2012");
    
    if (!merged.pmiiHistory || merged.pmiiHistory.length === 0) {
      merged.pmiiHistory = [
        {
          level: "MAPABA (Masa Penerimaan Anggota Baru)",
          campus: merged.campus || "Komisariat Bandung Barat",
          organizer: "Pengurus Cabang PMII",
          lastPosition: "Anggota",
          year: String(genYear - 4)
        },
        {
          level: "PKD (Pelatihan Kader Dasar)",
          campus: merged.campus || "IKA PMII Bandung Barat",
          organizer: "PC PMII Bandung Barat",
          lastPosition: "Pengurus Bidang",
          year: String(genYear - 3)
        }
      ];
      if (genYear < 2015) {
        merged.pmiiHistory.push({
          level: "PKL (Pelatihan Kader Lanjut)",
          campus: "PKC PMII Jawa Barat",
          organizer: "Pengurus Koordinator Cabang",
          lastPosition: merged.activePos || "Pengurus Cabang",
          year: String(genYear - 1)
        });
      }
    }

    if (!merged.educationHistory || merged.educationHistory.length === 0) {
      merged.educationHistory = [
        {
          level: "S1",
          institution: merged.gov || "UIN Sunan Gunung Djati Bandung",
          major: merged.prof?.includes("Hukum") ? "Hukum Keluarga" : merged.prof?.includes("Pendidik") ? "Pendidikan Agama Islam" : "Kajian Kemasyarakatan",
          degree: merged.name.includes("S.Pd") ? "S.Pd" : merged.name.includes("S.E") ? "S.E" : merged.name.includes("S.H") ? "S.H" : "S.Sos",
          gradYear: String(genYear),
          certType: "Ijazah Resmi"
        }
      ];
    }

    if (!merged.professionHistory || merged.professionHistory.length === 0) {
      merged.professionHistory = [
        {
          jobStatus: "Aktif",
          company: merged.gov || "Badan Litbang Daerah Pasundan",
          profession: merged.prof || "Profesional Alumni",
          position: merged.activePos || "Koordinator Umum",
          sector: "Pelayanan Publik"
        }
      ];
    }

    if (!merged.businessHistory && merged.gov) {
      merged.businessHistory = [
        {
          type: "Usaha Jasa",
          name: "Sinergi Karsa Nusantara",
          description: "Pendampingan sistem tata kelola pemberdayaan pemuda dan riset kepakaran daerah Bandung Barat.",
          location: "Kec. Ngamprah, KBB"
        }
      ];
    }

    if (!merged.networks) {
      merged.networks = [
        {
          name: "Ikatan Keluarga Alumni PMII Bandung Barat",
          position: merged.activePos || "Anggota Pokok",
          year: "2020 - Sekarang"
        },
        {
          name: merged.ormas || "Lembaga Nahdlatul Ulama KBB",
          position: "Pegiat Wilayah",
          year: "2021 - Sekarang"
        }
      ];
    }

    if (!merged.interests) {
      merged.interests = ["Pendidikan Karakter", "Digitalisasi Desa", "Koperasi Bersama", "Pemberdayaan Ekonomi"];
    }

    if (!merged.contributions) {
      merged.contributions = merged.contrib && merged.contrib.length > 0 ? merged.contrib : ["Sosial", "Agama", "Pendidikan"];
    }

    return merged;
  })();

  const TABS = [
    { id: "ringkasan", label: "Ringkasan", icon: Info },
    { id: "pmii_edu", label: "PMII & Edu", icon: GraduationCap },
    { id: "karir_bisnis", label: "Karir & Bisnis", icon: Briefcase },
    { id: "jejaring_minat", label: "Jejaring", icon: Users }
  ];

  return (
    <AnimatePresence>
      {activeProfile && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFocusedAlumni(null)}
            className="absolute inset-0 bg-primary/45 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl h-[90vh] md:h-[680px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row z-10 font-sans"
          >
            {/* Close Button */}
            <button
              onClick={() => setFocusedAlumni(null)}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-gray-200 text-gray-500 hover:text-primary transition-all flex items-center justify-center border border-gray-150 shadow-sm"
            >
              <X size={18} />
            </button>

            {/* Left Column: Fixed Portrait & Critical Contacts */}
            <div className="w-full md:w-[350px] bg-slate-50 p-6 md:p-8 flex flex-col items-center justify-between text-center border-b md:border-b-0 md:border-r border-gray-100 md:h-full md:overflow-y-auto shrink-0">
              <div className="space-y-6 w-full flex flex-col items-center">
                {/* Avatar Portrait */}
                <div className="relative">
                  <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-white shadow-xl relative inline-block">
                    <img
                      src={activeProfile.img}
                      alt={activeProfile.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-1 p-1.5 bg-accent text-primary rounded-xl shadow-md border border-white">
                    <ShieldCheck size={14} className="animate-pulse" />
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] bg-accent/25 text-primary font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                    {activeProfile.generation || "Alumni Terpilih"}
                  </h4>
                  <span className="block text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">
                    E-ID: PMII-KBB-2026-{activeProfile.nik ? activeProfile.nik.substring(12) : "0000"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-full border border-green-100 mt-2">
                    <CheckCircle2 size={10} />
                    DIREKTORI SAH
                  </span>
                </div>
              </div>

              {/* Critical Core Identifiers */}
              <div className="space-y-3.5 w-full mt-8">
                {/* NIK */}
                <div className="bg-white p-3 rounded-2xl border border-gray-100 text-left flex items-center gap-3 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 text-gray-400 flex items-center justify-center border border-gray-100 font-bold shrink-0">
                    ID
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[8px] uppercase tracking-wider font-extrabold text-gray-450">Nomor Registrasi / NIK</span>
                    <span className="font-mono text-xs text-primary font-bold tracking-tight">
                      {activeProfile.nik ? `${activeProfile.nik.substring(0, 6)}********` : "321701**********"}
                    </span>
                  </div>
                </div>

                {/* Email Address */}
                {activeProfile.email && (
                  <div className="bg-white p-3 rounded-2xl border border-gray-100 text-left flex items-center gap-3 shadow-2xs overflow-hidden">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-gray-400 flex items-center justify-center border border-gray-100 shrink-0">
                      @
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[8px] uppercase tracking-wider font-extrabold text-gray-450">Surat Elektronik</span>
                      <span className="text-[11px] text-primary font-extrabold truncate block">
                        {activeProfile.email}
                      </span>
                    </div>
                  </div>
                )}

                {/* WhatsApp Chat Connector */}
                {activeProfile.whatsapp && (
                  <a
                    href={`https://wa.me/${activeProfile.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-[#25d366]/15 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle size={15} />
                    Sambungkan WhatsApp (Secure)
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Advanced Tab Manager & Scroll Area */}
            <div className="flex-1 flex flex-col md:h-full overflow-hidden bg-white">
              {/* Header block with Name */}
              <div className="p-6 md:p-8 pb-4 border-b border-gray-100 space-y-4">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-black text-accent bg-accent/15 px-2.5 py-0.5 rounded-md tracking-wider">
                    {activeProfile.activePos || "Alumni Terdaftar (Verified)"}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-black text-primary italic leading-tight mt-2">
                    {activeProfile.name}
                  </h3>
                  {activeProfile.nickname && (
                    <p className="text-xs text-gray-450 font-bold uppercase mt-1 tracking-wider">Alias: Sabahat {activeProfile.nickname}</p>
                  )}
                </div>

                {/* Tab Navigation Menu */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-gray-50">
                  {TABS.map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-4 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                          isActive
                            ? "bg-primary text-accent shadow-md shadow-primary/20 scale-102"
                            : "text-gray-500 hover:bg-slate-50 hover:text-primary border border-transparent"
                        }`}
                      >
                        <TabIcon size={14} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scrollable Tab Content Wrapper */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                
                {/* TAB 1: RINGKASAN */}
                {activeTab === "ringkasan" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Bio Phrase */}
                    <div className="relative p-5 bg-gradient-to-br from-slate-50 to-white hover:from-slate-100 rounded-3xl border border-gray-100 text-left">
                      <span className="absolute -top-3 left-6 text-4xl text-accent font-serif select-none pointer-events-none">“</span>
                      <p className="text-xs font-sans font-semibold text-gray-650 italic pl-3 leading-relaxed">
                        {activeProfile.bio || "Melayani tatar pergerakan alumni se-Bandung Barat dengan penuh silih asih silih asah silih asuh."}
                      </p>
                    </div>

                    {/* Identitas Diri Detail Grid */}
                    <div className="space-y-3.5 text-left">
                      <h5 className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2 mb-4">
                        <User size={12} className="text-accent" />
                        Informasi Identitas Personal
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem label="Nama Panggilan" value={activeProfile.nickname || "Sahabat"} />
                        <DetailItem label="Jenis Kelamin" value={activeProfile.gender === "P" ? "Perempuan" : "Laki-laki"} />
                        <DetailItem label="Domisili Asal" value={`${activeProfile.subDistrict ? "Desa "+activeProfile.subDistrict+", " : ""}Kec. ${activeProfile.loc}`} />
                        <DetailItem label="Tempat, Tanggal Lahir" value={activeProfile.birthPlace && activeProfile.birthDate ? `${activeProfile.birthPlace}, ${activeProfile.birthDate}` : "Bandung Barat (Sederhana)"} />
                        <DetailItem label="Status Pernikahan" value={activeProfile.maritalStatus || "Belum Menikah"} />
                        
                        {activeProfile.maritalStatus === "Menikah" && activeProfile.spouseName && (
                          <div className="sm:col-span-2 p-3 bg-slate-50 rounded-2xl border border-gray-100 grid grid-cols-2 gap-3">
                            <DetailItem label="Pasangan Kader PMII?" value={activeProfile.spouseIsPmii || "Tidak"} />
                            <DetailItem label="Nama Pasangan" value={activeProfile.spouseName || "-"} />
                            <div className="col-span-2">
                              <DetailItem label="Profesi Pasangan" value={activeProfile.spouseProfession || "-"} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Alamat Lengkap */}
                    <div className="space-y-2 text-left">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Alamat / Domisili Surat</span>
                      <p className="text-xs font-bold font-mono text-gray-650 bg-slate-50 p-3.5 rounded-2xl border border-gray-100 leading-relaxed">
                        📍 {activeProfile.address || "Kabupaten Bandung Barat, Jawa Barat"} {activeProfile.postalCode ? `, Kode Pos ${activeProfile.postalCode}` : ""}
                      </p>
                    </div>

                    {/* Komplementer Afiliasi Pokok */}
                    <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-left">
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Organisasi Induk</span>
                        <p className="text-xs font-black text-primary mt-1">{activeProfile.ormas || "Ikatan Alumni PMII"}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Sektor Tempat Bekerja</span>
                        <p className="text-xs font-black text-primary mt-1">{activeProfile.gov || "Instansi Swasta/Pemerintah"}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: PMII & EDU */}
                {activeTab === "pmii_edu" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 text-left"
                  >
                    {/* Komisariat / Cadre Attributes */}
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-3xl border border-gray-100">
                      <DetailItem label="Asal Rayon PMII" value={activeProfile.rayon || "Rayon Cabang"} />
                      <DetailItem label="Asal Komisariat" value={activeProfile.komisariat || activeProfile.gov || "Komisariat Bandung Barat"} />
                      <div className="col-span-2">
                        <DetailItem label="Pelatihan Lanjut / PKD / PKL" value={activeProfile.advancedTraining || "PKD Bandung Barat (Terverifikasi)"} />
                      </div>
                    </div>

                    {/* PMII History List */}
                    <div className="space-y-4">
                      <h5 className="text-[10px] font-black uppercase text-gray-450 tracking-widest flex items-center gap-2 border-b border-gray-50 pb-2">
                        <Award size={13} className="text-accent" />
                        Riwayat Pelatihan Kaderisasi PMII
                      </h5>
                      <div className="space-y-3">
                        {activeProfile.pmiiHistory && activeProfile.pmiiHistory.length > 0 ? (
                          activeProfile.pmiiHistory.map((item: any, idx: number) => {
                            if (typeof item === 'string') {
                              return (
                                <div key={idx} className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-gray-100 flex items-start gap-3">
                                  <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-primary mt-0.5">
                                    {idx + 1}
                                  </div>
                                  <p className="text-xs font-bold text-gray-700">{item}</p>
                                </div>
                              );
                            }
                            return (
                              <div key={idx} className="p-4 bg-accent/5 hover:bg-accent/10 border border-accent/10 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-colors">
                                <div className="space-y-1">
                                  <span className="px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider bg-accent/20 text-primary rounded-md inline-block">
                                    {item.level || "Tingkat Kaderisasi"}
                                  </span>
                                  <h6 className="font-extrabold text-primary text-xs mt-1">{item.campus || "Komisariat Asal"}</h6>
                                  {item.organizer && (
                                    <p className="text-[10px] text-gray-400 font-semibold uppercase">Penyelenggara: {item.organizer}</p>
                                  )}
                                  {item.lastPosition && (
                                    <p className="text-xs text-gray-500">Jabatan Terakhir: <strong className="text-gray-700">{item.lastPosition}</strong></p>
                                  )}
                                </div>
                                <span className="font-mono text-xs font-black text-primary bg-white/70 border border-gray-100 px-3 py-1.5 rounded-xl self-start sm:self-center">
                                  Tahun {item.year || "-"}
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-xs italic text-gray-400">Belum ada riwayat pmii terperinci yang ditambahkan.</p>
                        )}
                      </div>
                    </div>

                    {/* Educational Qualifications Header */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <h5 className="text-[10px] font-black uppercase text-gray-450 tracking-widest flex items-center gap-2 border-b border-gray-50 pb-2">
                        <BookOpen size={13} className="text-accent" />
                        Riwayat Pendidikan Formal S1/S2/S3
                      </h5>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem label="Sertifikasi Profesi" value={activeProfile.certifications || "Certified Professional"} />
                        <DetailItem label="Kompetensi Utama" value={activeProfile.primarySkill || activeProfile.prof || "-"} />
                      </div>

                      <div className="space-y-3 mt-4">
                        {activeProfile.educationHistory && activeProfile.educationHistory.length > 0 ? (
                          activeProfile.educationHistory.map((item: any, idx: number) => {
                            if (typeof item === 'string') {
                              return (
                                <div key={idx} className="p-3 bg-white hover:bg-slate-50 border border-gray-100 rounded-2xl flex items-start gap-3">
                                  <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-gray-505 mt-0.5">
                                    {idx + 1}
                                  </div>
                                  <p className="text-xs font-bold text-gray-700">{item}</p>
                                </div>
                              );
                            }
                            return (
                              <div key={idx} className="p-4 bg-slate-50 hover:bg-slate-100 border border-gray-100 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-colors">
                                <div className="space-y-1">
                                  <span className="px-2.5 py-0.5 text-[8px] font-black text-white bg-primary rounded-md inline-block">
                                    {item.level || "Degree"}
                                  </span>
                                  <h6 className="font-extrabold text-primary text-xs mt-1">{item.institution || "Lembaga Pendidikan"}</h6>
                                  {item.major && (
                                    <p className="text-xs text-gray-500">Jurusan: <strong className="text-gray-700">{item.major}</strong></p>
                                  )}
                                  {item.degree && (
                                    <p className="text-xs text-gray-500">Gelar: <strong className="text-gray-700">{item.degree}</strong></p>
                                  )}
                                </div>
                                <div className="text-right self-start sm:self-center">
                                  <span className="block text-[10px] font-bold text-gray-450 uppercase tracking-widest">Kelulusan {item.gradYear || "-"}</span>
                                  <span className="text-[9px] font-black bg-slate-200 text-slate-700 border border-slate-150 px-2 py-0.5 rounded-md inline-block uppercase mt-1 tracking-wide">{item.certType || "Ijazah"}</span>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-xs italic text-gray-400">Belum ada riwayat pendidikan terperinci yang ditambahkan.</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: KARIR & BISNIS */}
                {activeTab === "karir_bisnis" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 text-left"
                  >
                    {/* Career Summary Header */}
                    <div className="space-y-4">
                      <h5 className="text-[10px] font-black uppercase text-gray-450 tracking-widest flex items-center gap-2 border-b border-gray-50 pb-2">
                        <Briefcase size={13} className="text-accent" />
                        Riwayat Karir & Profesi Pekerjaan
                      </h5>
                      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-3xl border border-gray-100">
                        <DetailItem label="Status Bekerja" value={activeProfile.jobStatus || "Aktif"} />
                        <DetailItem label="Sektor Industri" value={activeProfile.sector || "-"} />
                      </div>

                      <div className="space-y-3">
                        {activeProfile.professionHistory && activeProfile.professionHistory.length > 0 ? (
                          activeProfile.professionHistory.map((item: any, idx: number) => {
                            if (typeof item === 'string') {
                              return (
                                <div key={idx} className="p-3 bg-white hover:bg-slate-50 border border-gray-100 rounded-2xl flex items-start gap-3">
                                  <div className="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-gray-505 mt-0.5">
                                    {idx + 1}
                                  </div>
                                  <p className="text-xs font-bold text-gray-700">{item}</p>
                                </div>
                              );
                            }
                            return (
                              <div key={idx} className="p-4 bg-slate-50 hover:bg-slate-100 border border-gray-100 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-colors">
                                <div className="space-y-1">
                                  <span className="px-2.5 py-0.5 text-[8px] font-black bg-green-50 text-green-700 border border-green-100 rounded-md inline-block uppercase">
                                    {item.jobStatus || "Pegiat Karir"}
                                  </span>
                                  <h6 className="font-extrabold text-primary text-xs mt-1">{item.company || "Nama Instansi/Tempat Kerja"}</h6>
                                  {item.profession && (
                                    <p className="text-xs text-gray-500">Kategori Profesi: <strong className="text-gray-700">{item.profession}</strong></p>
                                  )}
                                  {item.position && (
                                    <p className="text-xs text-gray-500">Jabatan/Spesialisasi: <strong className="text-gray-700">{item.position}</strong></p>
                                  )}
                                </div>
                                <span className="font-sans text-[10px] font-extrabold text-gray-400 uppercase tracking-wider self-start sm:self-center">
                                  Sektor: {item.sector || "-"}
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-xs italic text-gray-400">Belum ada riwayat karir/profesi yang dicantumkan.</p>
                        )}
                      </div>
                    </div>

                    {/* Business Section */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <h5 className="text-[10px] font-black uppercase text-gray-450 tracking-widest flex items-center gap-2 border-b border-gray-50 pb-2">
                        <Store size={13} className="text-accent" />
                        Usaha, Dagang, & Bisnis Mandiri
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-3xl border border-gray-100">
                        <DetailItem label="Memiliki Usaha / UMKM" value={activeProfile.hasBusiness || (activeProfile.businessHistory && activeProfile.businessHistory.length > 0 ? "Ya" : "Tidak")} />
                        {activeProfile.businessLocation && <DetailItem label="Lokasi Utama Usaha" value={activeProfile.businessLocation} />}
                        
                        {(activeProfile.hasBusiness === "Ya" || (activeProfile.businessHistory && activeProfile.businessHistory.length > 0)) && (
                          <div className="col-span-2 pt-2 border-t border-gray-200 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <DetailItem label="Nama Usaha Resmi" value={activeProfile.businessName || "-"} />
                            <DetailItem label="Jenis & Kategori" value={activeProfile.businessType || "Komersial"} />
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 mt-4">
                        {activeProfile.businessHistory && activeProfile.businessHistory.length > 0 ? (
                          activeProfile.businessHistory.map((item: any, idx: number) => {
                            if (typeof item === 'string') {
                              return (
                                <div key={idx} className="p-3 bg-white hover:bg-slate-50 border border-gray-100 rounded-2xl flex items-start gap-3">
                                  <div className="w-5 h-5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                                    💼
                                  </div>
                                  <p className="text-xs font-bold text-gray-700">{item}</p>
                                </div>
                              );
                            }
                            return (
                              <div key={idx} className="p-4 bg-slate-50 hover:bg-slate-100 border border-gray-100 rounded-2xl flex flex-col gap-2 transition-colors">
                                <div className="flex items-center justify-between">
                                  <span className="px-2.5 py-0.5 text-[8px] font-black bg-amber-50 text-amber-700 border border-amber-100 rounded-md inline-block uppercase">
                                    Usaha: {item.type || "Komersial"}
                                  </span>
                                  <span className="text-[10px] font-bold font-mono text-gray-400">📍 {item.location || "-"}</span>
                                </div>
                                <h6 className="font-extrabold text-primary text-xs mt-1">{item.name || "Nama Brand/Toko"}</h6>
                                {item.description && (
                                  <p className="text-xs text-gray-500 leading-relaxed font-semibold italic">"{item.description}"</p>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-xs italic text-gray-400">Belum ada kepemilikan usaha terperinci yang ditambahkan.</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: JEJARING & KOMPETENSI */}
                {activeTab === "jejaring_minat" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 text-left"
                  >
                    {/* Networks details */}
                    <div className="space-y-4">
                      <h5 className="text-[10px] font-black uppercase text-gray-450 tracking-widest flex items-center gap-2 border-b border-gray-50 pb-2">
                        <Users size={13} className="text-accent" />
                        Jejaring Afiliasi & Organisasi Eksternal
                      </h5>

                      <div className="space-y-3">
                        {activeProfile.networks && activeProfile.networks.length > 0 ? (
                          activeProfile.networks.map((item: any, idx: number) => {
                            if (typeof item === 'string') {
                              return (
                                <div key={idx} className="p-3 bg-white hover:bg-slate-50 border border-gray-100 rounded-2xl flex items-center justify-between gap-3">
                                  <span className="text-xs font-bold text-gray-700">{item}</span>
                                  <span className="text-[9px] font-black bg-slate-100 text-slate-550 border border-slate-150 px-2 py-0.5 rounded-md font-mono">Aktif</span>
                                </div>
                              );
                            }
                            return (
                              <div key={idx} className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-gray-100 rounded-2xl flex items-center justify-between gap-4 transition-colors">
                                <div className="space-y-0.5 min-w-0">
                                  <h6 className="font-extrabold text-primary text-xs truncate">{item.name || "Nama Lembaga/Ormas"}</h6>
                                  {item.position && (
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wide font-black">Jabatan: {item.position}</p>
                                  )}
                                </div>
                                <span className="font-mono text-[10px] font-black text-primary bg-white border border-gray-100 px-2.5 py-1 rounded-md shrink-0 block">
                                  {item.year || "Sekarang"}
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-xs italic text-gray-400">Belum ada jejaring eksternal yang terdaftar.</p>
                        )}
                      </div>
                    </div>

                    {/* Interests Tag Panels */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <span className="block text-[10px] font-black uppercase tracking-widest text-gray-450 mb-3 flex items-center gap-1.5">
                        <Heart size={12} className="text-pink-500 fill-pink-550" />
                        Minat & Fokus Sektor Kolaborasi
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeProfile.interests && activeProfile.interests.length > 0 ? (
                          activeProfile.interests.map((item: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3.5 py-1.5 rounded-2xl text-[10px] font-black bg-indigo-50 border border-indigo-100 text-indigo-700 shadow-2xs hover:scale-102 transition-all cursor-default"
                            >
                              ⭐ {item}
                            </span>
                          ))
                        ) : (
                          <p className="text-xs italic text-gray-400">Belum ada minat kolaborasi yang dipilih.</p>
                        )}
                      </div>
                    </div>

                    {/* Contributions Tag Panels (Primary Competences) */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <span className="block text-[10px] font-black uppercase tracking-widest text-gray-450 mb-3 flex items-center gap-1.5">
                        <Sparkles size={12} className="text-accent" />
                        Sumber Daya Pengabdian Cabang / Kompetensi Utama
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeProfile.contributions && activeProfile.contributions.length > 0 ? (
                          activeProfile.contributions.map((item: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3.5 py-1.5 rounded-2xl text-[10px] font-black bg-emerald-50 border border-emerald-100 text-emerald-800 shadow-2xs hover:scale-102 transition-all cursor-default"
                            >
                              🚀 {item}
                            </span>
                          ))
                        ) : (
                          <p className="text-xs italic text-gray-400">Belum ada kompetensi utama dipilih.</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="space-y-0.5">
      <span className="block text-[8px] uppercase tracking-widest font-black text-gray-400">{label}</span>
      <span className="block text-xs font-bold text-primary truncate leading-normal">{value}</span>
    </div>
  );
}
