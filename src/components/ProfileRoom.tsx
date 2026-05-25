import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, MapPin, Calendar, Hash, Phone, Mail, Globe, Lock, Eye, EyeOff, 
  Save, Edit2, BookOpen, Award, Briefcase, ShieldCheck, Check, Store, 
  Users, AlertCircle, CreditCard, Camera, Heart, Network, Share2, Sparkles, X
} from "lucide-react";

// Default profile fields based on registration db structure
const DEFAULT_PROFILE = {
  // Identitas Alumni
  fullName: "Sahabat Sandi Supyandi, S.Kom., M.H",
  nickname: "Sandi Supyandi",
  gender: "Laki-laki",
  birthPlace: "Bandung Barat",
  birthDate: "1994-08-12",
  nik: "3217081208940003",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400", // Standard classy avatar choice
  address: "Jl. Raya Cipatat No. 45, RT 02/RW 10",
  district: "Cipatat",
  subDistrict: "Cipatat",
  postalCode: "40554",
  whatsapp: "+62 821-1599-1771",
  email: "sandisupyandi@gmail.com",
  socialMedia: "@sandi.supyandi",
  instagramUsername: "@sandi.supyandi",
  instagramLink: "https://instagram.com/sandi.supyandi",
  facebookUsername: "Sandi Supyandi FB",
  facebookLink: "https://facebook.com/sandi.supyandi",
  tiktokUsername: "@sandi.supyanditiktok",
  tiktokLink: "https://tiktok.com/@sandi.supyanditiktok",
  youtubeUsername: "Sandi Supyandi Channel",
  youtubeLink: "https://youtube.com/c/sandisupyandi",
  xUsername: "@sandisupyandi_",
  xLink: "https://x.com/sandisupyandi_",

  // Riwayat PMII
  komisariat: "Komisariat STAI",
  rayon: "Rayon Syariah",
  campus: "STAI Al-Azhary Cianjur",
  enrollYear: "2013",
  advancedTraining: "PKD PC PMII Cianjur (2014), PKL PKC PMII Jawa Barat (2016)",
  lastPosition: "Sekretaris Jenderal PC IKA PMII Bandung Barat",

  // Riwayat Pendidikan
  degreeTitle: "S1 Teknik Informatika - STT Bandung",
  gradYear: "2018",
  highestDegree: "S2 Magister Hukum - Universitas Pasundan",
  primarySkill: "Hukum Administrasi, Konsultan IT, Legal Drafting, Web Engineering",
  certifications: "Sertifikasi Mediator Hubungan Industrial, Certified Legal Drafter",

  // Profesi & Pekerjaan
  jobStatus: "Aktif",
  profession: "Advokat & Konsultan IT",
  company: "LBH IKA PMII Bandung Barat & Supyandi Corp",
  position: "Managing Partner & Lead Developer",
  sector: "#Hukum #Teknologi",

  // Usaha & Bisnis
  hasBusiness: "Ya",
  businessName: "Supyandi Digital & Legal Solution",
  businessType: "Penyedia Jasa Jasa Hukum & Pengembangan Sistem Informasi",
  businessLocation: "Padalarang, Bandung Barat",

  // Keluarga & Pasangan
  maritalStatus: "Menikah",
  spouseIsPmii: "Ya",
  spouseName: "Siti Nadila, S.Pd",
  spouseProfession: "Guru Sekolah Dasar",

  // Jejaring & Kolaborasi
  networks: ["NU", "Ormas Lain", "Forum Profesi"],
  interests: ["Ekonomi", "Pendidikan", "Hukum", "Digitalisasi"],
  contributions: ["Pendampingan Karir/Magang", "Konsultasi Hukum"],
  educationHistory: ["S1 Teknik Informatika - STT Bandung (Lulus 2018)", "S2 Magister Hukum - Universitas Pasundan"],
  pmiiHistory: ["MAPABA STAI Al-Azhary Cianjur (2013)", "PKD PC PMII Cianjur (2014)", "PKL PKC PMII Jawa Barat (2016)"],
  professionHistory: ["Advokat di LBH IKA PMII Bandung Barat", "CEO & Managing Partner Supyandi Corp"],
  businessHistory: ["Supyandi Digital & Legal Solution (Lembaga Bantuan Hukum & Sistem Informasi)"]
};

// Privacy levels: 'public' (visible to other members) or 'private' (only me and admin)
const DEFAULT_PRIVACY = {
  fullName: "public",
  nickname: "public",
  gender: "public",
  birthPlace: "public",
  birthDate: "private",
  nik: "private", // Always restricted/private by default
  address: "private",
  district: "public",
  subDistrict: "public",
  postalCode: "private",
  whatsapp: "private", // Always restricted/private by default
  email: "public",
  socialMedia: "public",
  instagramUsername: "public",
  instagramLink: "public",
  facebookUsername: "public",
  facebookLink: "public",
  tiktokUsername: "public",
  tiktokLink: "public",
  youtubeUsername: "public",
  youtubeLink: "public",
  xUsername: "public",
  xLink: "public",

  komisariat: "public",
  rayon: "public",
  campus: "public",
  enrollYear: "public",
  advancedTraining: "public",
  lastPosition: "public",

  degreeTitle: "public",
  gradYear: "public",
  highestDegree: "public",
  primarySkill: "public",
  certifications: "public",

  jobStatus: "public",
  profession: "public",
  company: "public",
  position: "public",
  sector: "public",

  hasBusiness: "public",
  businessName: "public",
  businessType: "public",
  businessLocation: "public",

  maritalStatus: "private",
  spouseIsPmii: "private",
  spouseName: "private",
  spouseProfession: "private",

  networks: "public",
  interests: "public",
  contributions: "public",
  educationHistory: "public",
  pmiiHistory: "public",
  professionHistory: "public",
  businessHistory: "public"
};

export default function ProfileRoom() {
  const [profile, setProfile] = useState<any>(() => {
    const saved = localStorage.getItem("siap_user_profile");
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [privacy, setPrivacy] = useState<Record<string, "public" | "private">>(() => {
    const saved = localStorage.getItem("siap_user_privacy");
    return saved ? JSON.parse(saved) : DEFAULT_PRIVACY;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFieldToEdit, setSelectedFieldToEdit] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [activeSubTab, setActiveSubTab] = useState("identitas");

  // Save changes to localStorage trigger function
  const handleSaveProfile = (updatedProfile = profile, updatedPrivacy = privacy) => {
    localStorage.setItem("siap_user_profile", JSON.stringify(updatedProfile));
    localStorage.setItem("siap_user_privacy", JSON.stringify(updatedPrivacy));
    setProfile(updatedProfile);
    setPrivacy(updatedPrivacy);
    
    // Fire toast
    setToastMsg("Profil Anda berhasil diperbarui dan disinkronkan ke basis data!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
    setIsEditing(false);
    setSelectedFieldToEdit(null);
  };

  const handleFieldChange = (field: string, value: any) => {
    setProfile((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleFieldPrivacy = (field: string) => {
    // Specifically warn for WA and NIK if they try to make it public
    if ((field === "nik" || field === "whatsapp") && privacy[field] === "private") {
      const confirmPublic = window.confirm(
        "Peringatan: KTP (NIK) dan Nomor WhatsApp adalah informasi sensitif. Apakah Anda yakin ingin membagikan informasi ini secara Publik kepada seluruh anggota?"
      );
      if (!confirmPublic) return;
    }

    const nextPrivacyObj = {
      ...privacy,
      [field]: privacy[field] === "public" ? "private" : "public"
    };
    setPrivacy(nextPrivacyObj);
    handleSaveProfile(profile, nextPrivacyObj);
  };

  const [eduInput, setEduInput] = useState("");
  const [pmiiInput, setPmiiInput] = useState("");
  const [profInput, setProfInput] = useState("");
  const [bizInput, setBizInput] = useState("");

  const addHistoryItem = (category: 'educationHistory' | 'pmiiHistory' | 'professionHistory' | 'businessHistory', value: string) => {
    if (!value.trim()) return;
    setProfile((prev: any) => {
      const list = prev[category] || [];
      return {
        ...prev,
        [category]: [...list, value.trim()]
      };
    });
  };

  const removeHistoryItem = (category: 'educationHistory' | 'pmiiHistory' | 'professionHistory' | 'businessHistory', index: number) => {
    setProfile((prev: any) => {
      const list = prev[category] || [];
      return {
        ...prev,
        [category]: list.filter((_: any, i: number) => i !== index)
      };
    });
  };

  const handleArrayToggle = (field: "networks" | "interests" | "contributions", item: string) => {
    const current = profile[field] || [];
    const updated = current.includes(item)
      ? current.filter((x: string) => x !== item)
      : [...current, item];
    handleFieldChange(field, updated);
  };

  // Helper component to render privacy state badge
  const PrivacyBadge = ({ field }: { field: string }) => {
    const isPrivate = privacy[field] === "private";
    const isSensitive = field === "nik" || field === "whatsapp";

    return (
      <button
        type="button"
        onClick={() => toggleFieldPrivacy(field)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-all shrink-0 active:scale-95 ${
          isPrivate
            ? "bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100"
            : isSensitive
            ? "bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-100"
            : "bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100"
        }`}
        title={isPrivate ? "Informasi Privat (Hanya Anda & Admin)" : "Informasi Publik (Bisa dilihat semua alumni)"}
      >
        {isPrivate ? (
          <>
            <Lock size={10} className="stroke-[3]" />
            <span>Privat</span>
          </>
        ) : (
          <>
            <Globe size={10} className="stroke-[3]" />
            <span>Publik</span>
          </>
        )}
      </button>
    );
  };

  // Profile Field Container layout with select edit support
  const ProfileFieldCard = ({ 
    icon: Icon, 
    label, 
    field, 
    type = "text", 
    options, 
    isTextArea = false,
    placeholder = ""
  }: { 
    icon: any, 
    label: string, 
    field: string, 
    type?: string, 
    options?: string[],
    isTextArea?: boolean,
    placeholder?: string
  }) => {
    const isFieldEditing = isEditing || selectedFieldToEdit === field;
    const value = profile[field] || "";
    const isPrivate = privacy[field] === "private";
    const isSensitive = field === "nik" || field === "whatsapp";

    return (
      <div 
        className={`p-4 bg-white rounded-2xl border transition-all ${
          isFieldEditing 
            ? "border-accent ring-2 ring-accent/10 shadow-md bg-amber-50/5" 
            : isSensitive && isPrivate
            ? "border-rose-100 bg-rose-50/10 hover:border-rose-200"
            : "border-gray-100 hover:border-primary/10 shadow-xs"
        } flex flex-col justify-between gap-3 h-full`}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${isSensitive ? "bg-rose-50 text-rose-600" : "bg-primary/5 text-primary"}`}>
              <Icon size={14} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
              {label}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <PrivacyBadge field={field} />
            {!isEditing && (
              <button
                type="button"
                onClick={() => setSelectedFieldToEdit(selectedFieldToEdit === field ? null : field)}
                className={`p-1 rounded-md text-gray-400 hover:text-primary transition-colors hover:bg-gray-100 ${selectedFieldToEdit === field ? "text-accent bg-accent/10" : ""}`}
                title="Edit Field Ini"
              >
                <Edit2 size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Input/Value Area */}
        <div className="flex-grow pt-1 text-left">
          {isFieldEditing ? (
            options ? (
              <select
                value={value}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : isTextArea ? (
              <textarea
                value={value}
                rows={2}
                placeholder={placeholder}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs font-bold text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary leading-relaxed"
              />
            ) : (
              <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            )
          ) : (
            <div className="space-y-1">
              <p className="text-xs font-extrabold text-primary break-words font-sans">
                {isSensitive && isPrivate ? (
                  <span className="font-mono bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded text-[11px] border border-rose-100/50 flex items-center gap-1.5 inline-flex w-full select-all">
                    <EyeOff size={11} /> {value}
                  </span>
                ) : (
                  value || <span className="text-gray-300 italic font-medium">Belum diisi</span>
                )}
              </p>
              {isSensitive && isPrivate && (
                <p className="text-[9px] text-rose-500 font-semibold flex items-center gap-1 italic">
                  <AlertCircle size={9} /> Dibatasi (Hanya Terlihat Oleh Anda & Admin SIAP)
                </p>
              )}
            </div>
          )}
        </div>

        {/* Inline Save Indicator */}
        {selectedFieldToEdit === field && !isEditing && (
          <div className="flex justify-end gap-1.5 border-t border-gray-50 pt-2 shrink-0">
            <button
              onClick={() => setSelectedFieldToEdit(null)}
              className="text-[9px] font-black uppercase text-gray-400 hover:text-gray-600 px-2 py-1 rounded"
            >
              Batal
            </button>
            <button
              onClick={() => handleSaveProfile()}
              className="bg-primary text-accent text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg flex items-center gap-1"
            >
              <Check size={10} /> Simpan
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="root-profile-room" className="space-y-10 text-left">
      {/* Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <div className="fixed bottom-8 right-8 z-50 max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3.5"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check size={18} className="stroke-[3]" />
              </div>
              <p className="text-xs font-semibold leading-relaxed text-left text-slate-100">{toastMsg}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Column: Member Card Live Preview & Actions */}
        <div className="w-full lg:w-96 shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Preview Kartu</span>
                <h4 className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                  <Sparkles size={14} className="text-accent" /> Anggota Digital
                </h4>
              </div>
              <span className="bg-primary/5 text-primary px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider uppercase border border-primary/5">
                SIAP KBB
              </span>
            </div>

            {/* Live Interactive Digital ID Card */}
            <div className="relative aspect-[1.6/1] bg-gradient-to-br from-primary via-[#00382e] to-[#002821] rounded-3xl p-5 shadow-2xl text-white overflow-hidden flex flex-col justify-between border border-emerald-500/10 group">
              {/* Overlay graphics */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-accent/5 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/10 transition-colors duration-500"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none shrink-0 scale-75">
                <ShieldCheck size={200} className="text-accent" />
              </div>

              {/* Card Header */}
              <div className="flex justify-between items-start z-10 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center text-primary font-black text-xs shadow-md">
                    PK
                  </div>
                  <div className="text-left leading-none">
                    <span className="text-[9px] font-black text-accent tracking-tighter uppercase">KARTU ANGGOTA</span>
                    <h5 className="text-[10px] font-extrabold text-white leading-none mt-0.5">SIAP IKA PMII KBB</h5>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-extrabold text-accent bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded-md uppercase tracking-widest">
                    ACTIVE MEMBER
                  </span>
                </div>
              </div>

              {/* Card Body - Photo and Info */}
              <div className="flex gap-4 items-center my-1.5 z-10">
                <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-accent shrink-0 relative bg-primary flex items-center justify-center">
                  {profile.avatarUrl ? (
                    <img 
                      src={profile.avatarUrl} 
                      className="w-full h-full object-cover" 
                      alt="Avatar" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <User size={24} className="text-accent" />
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer">
                      <Camera size={12} className="text-accent" />
                    </div>
                  )}
                </div>
                <div className="text-left min-w-0">
                  <h4 className="font-display font-bold text-xs truncate uppercase tracking-wide text-accent leading-snug">
                    {profile.fullName}
                  </h4>
                  <p className="text-[9px] font-semibold text-gray-300 leading-none truncate mt-0.5">
                    {profile.profession || "Alumni"} ({profile.nickname})
                  </p>
                  <p className="text-[8px] font-sans font-bold text-gray-400 mt-1 flex items-center gap-0.5">
                    <MapPin size={8} className="text-accent shrink-0" /> PAC {profile.district || "KBB"}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-end border-t border-white/5 pt-1.5 z-10 shrink-0">
                <div className="text-left">
                  <p className="text-[8px] font-bold text-gray-400 leading-none">ID REGISTERED</p>
                  <p className="text-[9px] font-mono font-semibold text-white mt-0.5">KBB-{profile.enrollYear || "2024"}-{(profile.birthDate || "19").replaceAll("-", "").substring(2, 8)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-bold text-gray-400 leading-none">VERIFIED SECURE</p>
                  <p className="text-[9px] font-semibold text-[#00cccc] flex items-center gap-0.5 justify-end mt-0.5 font-mono">
                    <ShieldCheck size={9} /> SIAP-SECURE
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Avatar Trigger Section */}
            {isEditing && (
              <div className="space-y-2 text-left pt-2">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-wider block ml-1">Ganti Link Foto Profil</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={profile.avatarUrl || ""}
                    onChange={(e) => handleFieldChange("avatarUrl", e.target.value)}
                    placeholder="Masukkan URL foto..."
                    className="flex-grow bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-primary focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={() => handleFieldChange("avatarUrl", DEFAULT_PROFILE.avatarUrl)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-500 text-[10px] px-2 py-1 rounded-lg font-bold"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {/* General Master Edit and Save Buttons */}
            <div className="space-y-2 pt-2 border-t border-gray-50">
              {isEditing ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      // Rollback profile changes
                      const saved = localStorage.getItem("siap_user_profile");
                      if (saved) setProfile(JSON.parse(saved));
                    }}
                    className="flex-grow py-3 px-4 bg-gray-105 hover:bg-gray-150 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest transition-transform active:scale-95 text-center cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleSaveProfile()}
                    className="flex-grow py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-transform active:scale-95 flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/10 cursor-pointer"
                  >
                    <Save size={13} /> Simpan Semua
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full py-4.5 bg-primary hover:bg-accent hover:text-primary text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/15 hover:shadow-accent/20 cursor-pointer active:scale-[0.98]"
                >
                  <Edit2 size={13} /> Edit Profil Lengkap
                </button>
              )}
            </div>

            {/* Quick Warning banner about KTP and WhatsApp default restriction */}
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl flex items-start gap-2 text-left">
              <Lock size={14} className="text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] font-black text-rose-700 uppercase tracking-wide block">Restriksi Data Sensitif</span>
                <p className="text-[9px] text-gray-500 leading-relaxed font-semibold">
                  Sesuai kebijakan perlindungan data IKA PMII, KTP (NIK) dan Nomor WhatsApp Anda disetel ke <strong>Privat</strong> secara otomatis untuk perlindungan privasi. Anda dapat mengubah preferensi visibilitas kapan saja menggunakan selektor.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed Sections containing detailed registration database fields */}
        <div className="flex-grow space-y-6">
          {/* Sub Navigation Bar for Profile Sections */}
          <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-lg flex flex-wrap gap-1">
            {[
              { id: "identitas", label: "Identitas", icon: User },
              { id: "kaderisasi", label: "Kaderisasi & Edu", icon: Award },
              { id: "pekerjaan", label: "Karir & Bisnis", icon: Briefcase },
              { id: "keluarga", label: "Keluarga & Aff", icon: HeartsWrap }
            ].map((subTab) => (
              <button
                key={subTab.id}
                onClick={() => {
                  setActiveSubTab(subTab.id);
                  setSelectedFieldToEdit(null);
                }}
                className={`flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-5 py-3 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                  activeSubTab === subTab.id 
                    ? "bg-primary text-accent shadow-md shadow-primary/10" 
                    : "text-gray-400 hover:bg-gray-50 hover:text-primary"
                }`}
              >
                <subTab.icon size={13} />
                <span>{subTab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Display Area */}
          <div className="space-y-6">
            
            {/* TAB 1: IDENTITAS ALUMNI */}
            {activeSubTab === "identitas" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-left border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-display font-bold text-primary">Informasi Identitas & Kependudukan</h3>
                  <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Berisi data diri lengkap kependudukan dan kontak komunikasi utama</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ProfileFieldCard icon={User} label="Nama Lengkap" field="fullName" placeholder="Contoh: Sahabat Muhammad Iqbal" />
                  <ProfileFieldCard icon={Sparkles} label="Nama Kader / Panggilan" field="nickname" placeholder="Contoh: Iqbal" />
                  <ProfileFieldCard icon={User} label="Jenis Kelamin" field="gender" options={["Laki-laki", "Perempuan"]} />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <ProfileFieldCard icon={MapPin} label="Tempat Lahir" field="birthPlace" placeholder="Tempat Lahir" />
                    <ProfileFieldCard icon={Calendar} label="Tanggal Lahir" field="birthDate" type="date" />
                  </div>

                  <ProfileFieldCard icon={CreditCard} label="NIK (Nomor Induk Kependudukan)" field="nik" placeholder="16 Digit NIK KTP Anda" />
                  <ProfileFieldCard icon={Phone} label="Nomor WhatsApp" field="whatsapp" placeholder="Contoh: 081234567890" />
                  <ProfileFieldCard icon={Mail} label="Alamat Email Utama" field="email" type="email" placeholder="Contoh: email@anda.com" />
                  <div className="md:col-span-2 border-t border-dashed border-gray-100 pt-4 mt-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Integrasi Informasi Sosial Media</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ProfileFieldCard icon={Globe} label="Instagram Username" field="instagramUsername" placeholder="Contoh: @username" />
                      <ProfileFieldCard icon={Globe} label="Instagram Profil Link" field="instagramLink" placeholder="Contoh: https://instagram.com/username" />
                      <ProfileFieldCard icon={Globe} label="Facebook Username" field="facebookUsername" placeholder="Contoh: Sandi" />
                      <ProfileFieldCard icon={Globe} label="Facebook Profil Link" field="facebookLink" placeholder="Contoh: https://facebook.com/username" />
                      <ProfileFieldCard icon={Globe} label="TikTok Username" field="tiktokUsername" placeholder="Contoh: @username" />
                      <ProfileFieldCard icon={Globe} label="TikTok Profil Link" field="tiktokLink" placeholder="Contoh: https://tiktok.com/@username" />
                      <ProfileFieldCard icon={Globe} label="YouTube Username" field="youtubeUsername" placeholder="Contoh: MyChannel" />
                      <ProfileFieldCard icon={Globe} label="YouTube Profil Link" field="youtubeLink" placeholder="Contoh: https://youtube.com/..." />
                      <ProfileFieldCard icon={Globe} label="Twitter / X Username" field="xUsername" placeholder="Contoh: @username" />
                      <ProfileFieldCard icon={Globe} label="Twitter / X Link" field="xLink" placeholder="Contoh: https://x.com/username" />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <ProfileFieldCard icon={MapPin} label="Alamat Lengkap (Sesuai KTP)" field="address" isTextArea placeholder="Sebutkan nama jalan, RT/RW, dan Desa..." />
                  </div>

                  <div className="grid grid-cols-3 gap-3 md:col-span-2">
                    <ProfileFieldCard icon={MapPin} label="Kecamatan" field="district" placeholder="Kecamatan" />
                    <ProfileFieldCard icon={MapPin} label="Desa/Kelurahan" field="subDistrict" placeholder="Desa/Kel Kelurahan" />
                    <ProfileFieldCard icon={Hash} label="Kode Pos" field="postalCode" placeholder="Kode Pos" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: KADERISASI & PENDIDIKAN */}
            {activeSubTab === "kaderisasi" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-left border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-display font-bold text-primary">Data Riwayat PMII & Pendidikan</h3>
                  <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Informasi penjenjangan kaderisasi pergerakan and rekam akademis</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Riwayat PMII */}
                  <div className="md:col-span-2 text-left">
                    <span className="text-[10px] font-black text-primary bg-accent px-3 py-1 rounded-full uppercase tracking-wider">Kaderisasi Pergerakan</span>
                  </div>
                  <ProfileFieldCard icon={Award} label="Komisariat PMII" field="komisariat" placeholder="Nama Komisariat PMII" />
                  <ProfileFieldCard icon={Award} label="Rayon / Fakultas" field="rayon" placeholder="Nama Rayon PMII" />
                  <ProfileFieldCard icon={BookOpen} label="Kampus PMII" field="campus" placeholder="Nama Almamater Kampus" />
                  <ProfileFieldCard icon={Calendar} label="Tahun Kaderisasi (MAPABA)" field="enrollYear" placeholder="Contoh: 2013" />
                  <ProfileFieldCard icon={ShieldCheck} label="Jabatan Terakhir di PMII" field="lastPosition" placeholder="Contoh: Ketua Komisariat" />
                  <ProfileFieldCard icon={Award} label="Riwayat Formal (PKD/PKL/PKN)" field="advancedTraining" placeholder="Contoh: PKD PC KBB, PKL Jawa Barat..." />

                  {/* Dynamic Riwayat PMII */}
                  <div className="md:col-span-2 mt-2 p-5 bg-slate-50 rounded-2xl border border-gray-150 space-y-3.5 text-left">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-[11px] font-black text-primary uppercase tracking-wider">Riwayat PMII Tambahan (Faktual & Fleksibel)</h4>
                        <p className="text-[9px] text-gray-400 font-semibold">Tulis kepanitiaan, kepengurusan, atau instruktur training tanpa batas form</p>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 text-[8px] px-2 py-0.5 rounded font-black uppercase">PMII</span>
                    </div>
                    {(profile.pmiiHistory || []).length > 0 ? (
                      <div className="space-y-1.5">
                        {(profile.pmiiHistory || []).map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-gray-100 shadow-xs">
                            <span className="text-xs font-bold text-primary">{item}</span>
                            <button
                              type="button"
                              onClick={() => removeHistoryItem('pmiiHistory', idx)}
                              className="text-[9px] font-black uppercase text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded transition-colors"
                            >
                              Hapus
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] italic text-gray-400 font-medium">Belum ada riwayat PMII tambahan.</p>
                    )}
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={pmiiInput}
                        onChange={(e) => setPmiiInput(e.target.value)}
                        placeholder="Contoh: Delegasi Kongres PMII Palembang (2017), dsb..."
                        className="flex-grow bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-primary shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (pmiiInput.trim()) {
                            addHistoryItem('pmiiHistory', pmiiInput);
                            setPmiiInput("");
                          }
                        }}
                        className="px-4.5 py-2 bg-primary text-accent hover:bg-emerald-800 text-xs font-black uppercase rounded-xl transition-all active:scale-95 shrink-0"
                      >
                        + Tambah
                      </button>
                    </div>
                  </div>

                  {/* Riwayat Pendidikan */}
                  <div className="md:col-span-2 text-left pt-4">
                    <span className="text-[10px] font-black text-primary bg-accent px-3 py-1 rounded-full uppercase tracking-wider">Riwayat Akademis</span>
                  </div>
                  <ProfileFieldCard icon={BookOpen} label="Jenjang S1 (Prodi & Kampus)" field="degreeTitle" placeholder="Contoh: S1 Hukum, UNIKOM" />
                  <ProfileFieldCard icon={Calendar} label="Tahun Lulus S1" field="gradYear" placeholder="Tahun Lulus S1" />
                  <ProfileFieldCard icon={BookOpen} label="Jenjang Terakhir (S2/S3)" field="highestDegree" placeholder="Contoh: S2 Magister Manajemen, UNIKOM" />
                  <ProfileFieldCard icon={Award} label="Keahlian Utama" field="primarySkill" placeholder="Contoh: Manajemen, Hukum Administrasi, Cybersecurity" />
                  
                  <div className="md:col-span-2">
                    <ProfileFieldCard icon={Award} label="Sertifikasi & Pelatihan Khusus" field="certifications" placeholder="Sertifikat Keahlian / Kompetensi yang dimiliki" />
                  </div>

                  {/* Dynamic Riwayat Pendidikan */}
                  <div className="md:col-span-2 mt-2 p-5 bg-slate-50 rounded-2xl border border-gray-150 space-y-3.5 text-left">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-[11px] font-black text-primary uppercase tracking-wider">Riwayat Pendidikan / Sertifikasi Tambahan (Faktual & Fleksibel)</h4>
                        <p className="text-[9px] text-gray-400 font-semibold">Tulis gelar ganda, program kursus non-formal, atau sertifikasi profesi Anda</p>
                      </div>
                      <span className="bg-amber-50 text-amber-700 text-[8px] px-2 py-0.5 rounded font-black uppercase">Pendidikan</span>
                    </div>
                    {(profile.educationHistory || []).length > 0 ? (
                      <div className="space-y-1.5">
                        {(profile.educationHistory || []).map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-gray-100 shadow-xs">
                            <span className="text-xs font-bold text-primary">{item}</span>
                            <button
                              type="button"
                              onClick={() => removeHistoryItem('educationHistory', idx)}
                              className="text-[9px] font-black uppercase text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded transition-colors"
                            >
                              Hapus
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] italic text-gray-400 font-medium">Belum ada riwayat pendidikan tambahan.</p>
                    )}
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={eduInput}
                        onChange={(e) => setEduInput(e.target.value)}
                        placeholder="Contoh: S3 Manajemen Unpas (2024), Mini MBA Pacmann, dsb..."
                        className="flex-grow bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-primary shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (eduInput.trim()) {
                            addHistoryItem('educationHistory', eduInput);
                            setEduInput("");
                          }
                        }}
                        className="px-4.5 py-2 bg-primary text-accent hover:bg-emerald-800 text-xs font-black uppercase rounded-xl transition-all active:scale-95 shrink-0"
                      >
                        + Tambah
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: KARIR & BISNIS */}
            {activeSubTab === "pekerjaan" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-left border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-display font-bold text-primary">Profesi, Karir, dan Wirausaha</h3>
                  <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Informasi rekam profesi profesional dan ekosistem bisnis alumni</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pekerjaan */}
                  <div className="md:col-span-2 text-left">
                    <span className="text-[10px] font-black text-primary bg-accent px-3 py-1 rounded-full uppercase tracking-wider">Profesi & Karir</span>
                  </div>
                  <ProfileFieldCard icon={Briefcase} label="Status Pekerjaan" field="jobStatus" options={["Aktif", "Purna", "Job Seeker"]} />
                  <ProfileFieldCard icon={Briefcase} label="Profesi Utama" field="profession" placeholder="Contoh: Dosen, Pengusaha, Advokat" />
                  <ProfileFieldCard icon={Briefcase} label="Instansi / Kantor Tempat Bekerja" field="company" placeholder="Nama Perusahaan / Instansi Pabrik" />
                  <ProfileFieldCard icon={Briefcase} label="Jabatan Saat Ini" field="position" placeholder="Contoh: Staff Khusus, Manager" />
                  <ProfileFieldCard icon={Briefcase} label="Sektor Aktivitas" field="sector" placeholder="Contoh: #Pendidikan #Hukum #Politik" />

                  {/* Dynamic Riwayat Profesi */}
                  <div className="md:col-span-2 mt-2 p-5 bg-slate-50 rounded-2xl border border-gray-150 space-y-3.5 text-left">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-[11px] font-black text-primary uppercase tracking-wider">Riwayat Profesi & Pekerjaan Tambahan (Faktual)</h4>
                        <p className="text-[9px] text-gray-400 font-semibold">Tulis sejarah karir/tempat kerja terdahulu atau proyek portofolio besar Anda</p>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 text-[8px] px-2 py-0.5 rounded font-black uppercase">Profesi</span>
                    </div>
                    {(profile.professionHistory || []).length > 0 ? (
                      <div className="space-y-1.5">
                        {(profile.professionHistory || []).map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-gray-100 shadow-xs">
                            <span className="text-xs font-bold text-primary">{item}</span>
                            <button
                              type="button"
                              onClick={() => removeHistoryItem('professionHistory', idx)}
                              className="text-[9px] font-black uppercase text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded transition-colors"
                            >
                              Hapus
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] italic text-gray-400 font-medium">Belum ada riwayat profesi tambahan.</p>
                    )}
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={profInput}
                        onChange={(e) => setProfInput(e.target.value)}
                        placeholder="Contoh: Legal Advisor BPJS (2018-2021), dsb..."
                        className="flex-grow bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-primary shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (profInput.trim()) {
                            addHistoryItem('professionHistory', profInput);
                            setProfInput("");
                          }
                        }}
                        className="px-4.5 py-2 bg-primary text-accent hover:bg-emerald-800 text-xs font-black uppercase rounded-xl transition-all active:scale-95 shrink-0"
                      >
                        + Tambah
                      </button>
                    </div>
                  </div>

                  {/* Usaha */}
                  <div className="md:col-span-2 text-left pt-4">
                    <span className="text-[10px] font-black text-primary bg-accent px-3 py-1 rounded-full uppercase tracking-wider">Wirausaha / Bisnis Alumni</span>
                  </div>
                  <ProfileFieldCard icon={Store} label="Memiliki Usaha Sendiri?" field="hasBusiness" options={["Ya", "Tidak"]} />
                  <ProfileFieldCard icon={Store} label="Nama Usaha / Brand" field="businessName" placeholder="Contoh: Kopi Pergerakan, PT Abdi Nusa" />
                  <ProfileFieldCard icon={Store} label="Bidang / Jenis Usaha" field="businessType" placeholder="Contoh: Kuliner, Retail, Developer Software" />
                  <ProfileFieldCard icon={MapPin} label="Lokasi Usaha" field="businessLocation" placeholder="Contoh: Lembang, Bandung Barat" />

                  {/* Dynamic Riwayat Usaha */}
                  <div className="md:col-span-2 mt-2 p-5 bg-slate-50 rounded-2xl border border-gray-150 space-y-3.5 text-left">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-[11px] font-black text-primary uppercase tracking-wider">Riwayat Usaha & Bisnis Tambahan (Faktual)</h4>
                        <p className="text-[9px] text-gray-400 font-semibold">Tulis kepemilikan saham, waralaba, atau riwayat pendirian bisnis lainnya</p>
                      </div>
                      <span className="bg-amber-50 text-amber-700 text-[8px] px-2 py-0.5 rounded font-black uppercase">Bisnis</span>
                    </div>
                    {(profile.businessHistory || []).length > 0 ? (
                      <div className="space-y-1.5">
                        {(profile.businessHistory || []).map((item: string, idx: number) => (
                          <div key={idx} className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-gray-100 shadow-xs">
                            <span className="text-xs font-bold text-primary">{item}</span>
                            <button
                              type="button"
                              onClick={() => removeHistoryItem('businessHistory', idx)}
                              className="text-[9px] font-black uppercase text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded transition-colors"
                            >
                              Hapus
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] italic text-gray-400 font-medium">Belum ada riwayat bisnis tambahan.</p>
                    )}
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={bizInput}
                        onChange={(e) => setBizInput(e.target.value)}
                        placeholder="Contoh: Franchise Indomaret Padalarang, Peternakan Ayam, dsb..."
                        className="flex-grow bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-primary shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (bizInput.trim()) {
                            addHistoryItem('businessHistory', bizInput);
                            setBizInput("");
                          }
                        }}
                        className="px-4.5 py-2 bg-primary text-accent hover:bg-emerald-800 text-xs font-black uppercase rounded-xl transition-all active:scale-95 shrink-0"
                      >
                        + Tambah
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: KELUARGA & JEJARING */}
            {activeSubTab === "keluarga" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-left border-b border-gray-100 pb-3">
                  <h3 className="text-lg font-display font-bold text-primary">Sinergi Keluarga, Jejaring, & Kolaborasi</h3>
                  <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Struktur keluarga, afiliasi organisasi luar, serta ruang minat kolaborasi</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Keluarga */}
                  <div className="md:col-span-2 text-left">
                    <span className="text-[10px] font-black text-primary bg-accent px-3 py-1 rounded-full uppercase tracking-wider">Informasi Keluarga</span>
                  </div>
                  <ProfileFieldCard icon={Heart} label="Status Pernikahan" field="maritalStatus" options={["Belum Menikah", "Menikah", "Duda", "Janda"]} />
                  <ProfileFieldCard icon={Heart} label="Pasangan Sesama Alumni PMII?" field="spouseIsPmii" options={["Ya", "Tidak"]} />
                  <ProfileFieldCard icon={Heart} label="Nama Lengkap Pasangan" field="spouseName" placeholder="Nama Lengkap Pasangan Anda" />
                  <ProfileFieldCard icon={Briefcase} label="Profesi Pasangan" field="spouseProfession" placeholder="Profesi Pasangan Anda" />

                  {/* Jejaring & Minat */}
                  <div className="md:col-span-2 text-left pt-2 border-t border-gray-50 mt-2">
                    <h5 className="text-xs font-black text-primary uppercase tracking-wide">Jejaring Afiliasi Eksternal (Multiselect)</h5>
                    <p className="text-[10px] text-gray-400 font-medium">Centang atau pilih wadah eksternal yang Anda miliki saat ini</p>
                  </div>
                  
                  <div className="md:col-span-2 flex flex-wrap gap-2.5 pt-1.5">
                    {["NU", "Partai Politik", "NGO", "Ormas Lain", "Komunitas Bisnis", "Forum Profesi"].map((org) => {
                      const isSelected = (profile.networks || []).includes(org);
                      return (
                        <button
                          key={org}
                          type="button"
                          onClick={() => handleArrayToggle("networks", org)}
                          disabled={!isEditing}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                            isSelected
                              ? "bg-primary/5 border-primary text-primary shadow-xs"
                              : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100"
                          } ${!isEditing ? "opacity-90 cursor-default" : "cursor-pointer active:scale-95"}`}
                        >
                          <Network size={12} />
                          <span>{org}</span>
                          {isSelected && <Check size={11} className="stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="md:col-span-2 text-left pt-4">
                    <h5 className="text-xs font-black text-primary uppercase tracking-wide">Minat Ruang Kolaborasi Kolektif (Multiselect)</h5>
                    <p className="text-[10px] text-gray-400 font-medium">Bantu kami menautkan Anda ke program Koperasi KAMARA atau program kerja strategis sesuai preferensi Anda</p>
                  </div>

                  <div className="md:col-span-2 flex flex-wrap gap-2.5 pt-1.5">
                    {["Ekonomi", "Pendidikan", "Hukum", "Digitalisasi", "Politik", "Pertanian", "Investasi"].map((field) => {
                      const isSelected = (profile.interests || []).includes(field);
                      return (
                        <button
                          key={field}
                          type="button"
                          onClick={() => handleArrayToggle("interests", field)}
                          disabled={!isEditing}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                            isSelected
                              ? "bg-accent/15 border-accent text-primary shadow-xs"
                              : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100"
                          } ${!isEditing ? "opacity-90 cursor-default" : "cursor-pointer active:scale-95"}`}
                        >
                          <Share2 size={12} />
                          <span>{field}</span>
                          {isSelected && <Check size={11} className="stroke-[3] text-primary" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="md:col-span-2 text-left pt-4 border-t border-gray-50 mt-2">
                    <h5 className="text-xs font-black text-primary uppercase tracking-wide">Minat Kontribusi Alumni (Multiselect)</h5>
                    <p className="text-[10px] text-gray-400 font-medium">Tandai apa yang bisa Anda tawarkan atau berikan kepada anggota, kader, and jaringan Koperasi KAMARA</p>
                  </div>

                  <div className="md:col-span-2 flex flex-wrap gap-2.5 pt-1.5">
                    {["Pendampingan Karir/Magang", "Modul Pelatihan", "Konsultasi Hukum", "Beasiswa/Dana Abadi", "Bantuan Politik", "Wirausaha & UMKM", "Suplai Mitra Koperasi"].map((field) => {
                      const isSelected = (profile.contributions || []).includes(field);
                      return (
                        <button
                          key={field}
                          type="button"
                          onClick={() => handleArrayToggle("contributions", field)}
                          disabled={!isEditing}
                          className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                            isSelected
                              ? "bg-accent/15 border-accent text-primary shadow-xs"
                              : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100"
                          } ${!isEditing ? "opacity-90 cursor-default" : "cursor-pointer active:scale-95"}`}
                        >
                          <Share2 size={12} />
                          <span>{field}</span>
                          {isSelected && <Check size={11} className="stroke-[3] text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// Custom quick visual wrapper icon
function HeartsWrap() {
  return (
    <div className="flex items-center gap-0.5 text-rose-500 shrink-0">
      <Heart size={13} className="fill-current text-rose-500" />
    </div>
  );
}
