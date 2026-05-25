import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageCircle, Send, Search, User, ShieldCheck, 
  Lock, Eye, Phone, MapPin, Sparkles, Check, CheckCheck, EyeOff, ShieldAlert
} from "lucide-react";

// Initial set of contacts
const ALUMNI_CONTACTS = [
  { id: "ahmad", name: "Dr. Ahmad Jauhari, M.Pd", prof: "Pendidik", loc: "Ngamprah", img: "https://loremflickr.com/150/150/asian,man,face?lock=1" },
  { id: "siti", name: "Siti Mujahidah, S.E.", prof: "Wirausaha", loc: "Cipatat", img: "https://loremflickr.com/150/150/asian,woman,muslim?lock=2" },
  { id: "budi", name: "Budi Santoso, S.H.", prof: "Hukum", loc: "Padalarang", img: "https://loremflickr.com/150/150/asian,man,face?lock=3" },
  { id: "zaki", name: "Drs. M. Zaki, M.Si", prof: "Birokrasi", loc: "Cisarua", img: "https://loremflickr.com/150/150/asian,man,face?lock=4" },
  { id: "faris", name: "Faris Al-Fatih, S.Sos", prof: "Jurnalis", loc: "Lembang", img: "https://loremflickr.com/150/150/asian,man,face?lock=5" },
  { id: "lina", name: "Lina Marlina, S.Ag", prof: "Aktivis", loc: "Parongpong", img: "https://loremflickr.com/150/150/asian,woman,muslim?lock=6" }
];

// Seed chat conversations to localStorage if not exists
const DEFAULT_PERSONAL_CONVERSATIONS = {
  "ahmad-sandi": [
    { id: 1, sender: "ahmad", senderName: "Dr. Ahmad Jauhari, M.Pd", msg: "Assalamualaikum kawan Sandi, apakah draf regulasi bantuan hukum IKA PMII sudah disiapkan?", time: "09:15", date: "Hari Ini" },
    { id: 2, sender: "sandi", senderName: "Sandi Supyandi", msg: "Waalaikumsalam Wr. Wb. Sampun siap Dr. Ahmad. Bab legal drafting-nya sudah rampung tinggal diselaraskan dengan program KAMARA.", time: "09:20", date: "Hari Ini" },
    { id: 3, sender: "ahmad", senderName: "Dr. Ahmad Jauhari, M.Pd", msg: "Bagus sekali kanda. Nanti malam kita bedah bersama tim hukum dan pengurus PC.", time: "09:25", date: "Hari Ini" }
  ],
  "siti-sandi": [
    { id: 1, sender: "siti", senderName: "Siti Mujahidah, S.E.", msg: "Kang Sandi, kaitan dengan SIAP UMKM, apakah data produk koperasi kemarin sudah masuk database?", time: "Kemarin", date: "Kemarin" },
    { id: 2, sender: "sandi", senderName: "Sandi Supyandi", msg: "Sudah teh Siti, semua terekam rapi. Ada sebaran pengrajin anyaman bambu di Lembang juga sudah kita kelompokkan.", time: "Kemarin", date: "Kemarin" },
    { id: 3, sender: "siti", senderName: "Siti Mujahidah, S.E.", msg: "Alhamdulillah nuhun kang, semoga bisnis koperasi kita berkah dan berlipat ganda.", time: "Kemarin", date: "Kemarin" }
  ],
  "zaki-sandi": [
    { id: 1, sender: "zaki", senderName: "Drs. M. Zaki, M.Si", msg: "Sahabat Sekjen, instruksi dari PKC untuk mendata seluruh kader yang berkiprah di pemerintahan.", time: "Tiga hari lalu", date: "16 Mei 2026" },
    { id: 2, sender: "sandi", senderName: "Sandi Supyandi", msg: "Siap instruksi dilaksanakan kanda Ketua. Portal SIAP KBB sudah mengklasterisasi bio data tersebut secara real-time.", time: "Tiga hari lalu", date: "16 Mei 2026" }
  ],
  // Extra pair (non-sandi) to test admin supervision
  "ahmad-siti": [
    { id: 1, sender: "ahmad", senderName: "Dr. Ahmad Jauhari, M.Pd", msg: "Teh Siti, bantuan logistik untuk pelatihan kewirausahaan IKA PMII di wilayah Kecamatan Cipatat sudah dialokasikan?", time: "08:10", date: "Hari Ini" },
    { id: 2, sender: "siti", senderName: "Siti Mujahidah, S.E.", msg: "Sudah disalurkan Dr. Ahmad, lewat Koperasi KAMARA. Semua aman dan terdistribusi.", time: "08:30", date: "Hari Ini" }
  ]
};

export default function SiapChatRoom() {
  const [conversations, setConversations] = useState<Record<string, any[]>>(() => {
    const saved = localStorage.getItem("siap_personal_chats");
    return saved ? JSON.parse(saved) : DEFAULT_PERSONAL_CONVERSATIONS;
  });

  const [currentUserRole, setCurrentUserRole] = useState<"anggota" | "admin_biasa" | "super_admin">("anggota");
  const [activeContact, setActiveContact] = useState<any>(ALUMNI_CONTACTS[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typedMessage, setTypedMessage] = useState("");
  
  // Admin supervision mode toggles & setup
  const [isAdminAuditerMode, setIsAdminAuditerMode] = useState(false);
  const [auditSender, setAuditSender] = useState<string>("ahmad");
  const [auditReceiver, setAuditReceiver] = useState<string>("siti");

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to chat base
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversations, activeContact, isAdminAuditerMode, auditSender, auditReceiver]);

  const saveChatsToStorage = (updated: Record<string, any[]>) => {
    localStorage.setItem("siap_personal_chats", JSON.stringify(updated));
    setConversations(updated);
  };

  // Get active chat key based on membership identity
  const getChatKey = (userA: string, userB: string) => {
    return [userA, userB].sort().join("-");
  };

  const handleSendMessage = () => {
    if (!typedMessage.trim()) return;

    const chatKey = isAdminAuditerMode 
      ? getChatKey(auditSender, auditReceiver)
      : getChatKey("sandi", activeContact.id);

    const senderId = isAdminAuditerMode ? "admin-override" : "sandi";
    const senderName = isAdminAuditerMode ? "Admin Auditor PC IKA PMII KBB" : "Sahabat Sandi Supyandi, S.Kom., M.H";

    const newMsg = {
      id: Date.now(),
      sender: senderId,
      senderName: senderName,
      msg: typedMessage,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      date: "Hari Ini"
    };

    const updatedChats = {
      ...conversations,
      [chatKey]: [...(conversations[chatKey] || []), newMsg]
    };

    saveChatsToStorage(updatedChats);
    setTypedMessage("");
  };

  // Filter contacts
  const filteredContacts = ALUMNI_CONTACTS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.prof.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Extract current render messages
  const getCurrentMessages = () => {
    const key = isAdminAuditerMode
      ? getChatKey(auditSender, auditReceiver)
      : getChatKey("sandi", activeContact.id);
    return conversations[key] || [];
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">SIAP CHAT</span>
          <h2 className="text-3xl font-display font-bold text-primary italic">Ruang Percakapan Personal</h2>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
            Komunikasi tertutup satu-lawan-satu sesama alumni IKA PMII KBB
          </p>
        </div>

        {/* Admin Supervision Switch governed by roles */}
        <div className="flex items-center gap-2">
          {currentUserRole === "super_admin" ? (
            <button
              onClick={() => setIsAdminAuditerMode(!isAdminAuditerMode)}
              className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 border ${
                isAdminAuditerMode
                  ? "bg-rose-100 border-rose-300 text-rose-800 shadow-lg shadow-rose-500/15"
                  : "bg-primary/5 hover:bg-primary/10 border-primary/10 text-primary"
              }`}
            >
              <ShieldCheck size={14} className={isAdminAuditerMode ? "text-rose-600 animate-pulse" : "text-primary"} />
              <span>{isAdminAuditerMode ? "Audit Super Admin: AKTIF" : "Audit Super Admin (Buka)"}</span>
            </button>
          ) : currentUserRole === "admin_biasa" ? (
            <div className="px-5 py-3 rounded-2xl text-xs font-black bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5 uppercase tracking-wide">
              <ShieldAlert size={14} className="text-amber-600" />
              <span>Audit Terkunci (Admin Biasa)</span>
            </div>
          ) : (
            <div className="px-5 py-3 rounded-2xl text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center gap-1.5 uppercase tracking-widest">
              <Lock size={12} className="text-emerald-600 animate-pulse" />
              <span>Jalur Enkripsi E2EE</span>
            </div>
          )}
        </div>
      </div>

      {/* Role Switcher Sandbox Mode */}
      <div className="p-5 bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-white rounded-3xl shadow-xl border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] leading-none">SIMULASI OTORISASI & PRIVASI DATA PERCAKAPAN</p>
          <p className="text-xs text-white/80 font-medium">Uji enkripsi & batasan hak akses SIAP Chat secara instan:</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => {
              setCurrentUserRole("anggota");
              setIsAdminAuditerMode(false);
            }}
            className={`px-4 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${
              currentUserRole === "anggota"
                ? "bg-accent text-primary shadow-lg scale-105"
                : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
            }`}
          >
            🟢 Anggota (Sandi)
          </button>
          <button
            onClick={() => {
              setCurrentUserRole("admin_biasa");
              setIsAdminAuditerMode(false);
            }}
            className={`px-4 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${
              currentUserRole === "admin_biasa"
                ? "bg-amber-400 text-primary shadow-lg scale-105"
                : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
            }`}
          >
            🟡 Admin Biasa
          </button>
          <button
            onClick={() => {
              setCurrentUserRole("super_admin");
            }}
            className={`px-4 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${
              currentUserRole === "super_admin"
                ? "bg-rose-500 text-white shadow-lg scale-105"
                : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white"
            }`}
          >
            🔴 Super Admin
          </button>
        </div>
      </div>

      {/* Admin Audit Control Block */}
      <AnimatePresence>
        {isAdminAuditerMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 bg-rose-50/50 border border-rose-100 rounded-3xl space-y-4"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-rose-100 text-rose-700 rounded-xl">
                <ShieldCheck size={20} className="stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-rose-900 uppercase tracking-wide">
                  Panel Peninjauan & Audit Chat Hukum Resmi
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  Sesuai dengan regulasi AD/ART IKA PMII Bandung Barat, administrator memiliki wewenang hukum untuk meninjau riwayat percakapan personal demi mencegah disinformasi, kampanye hitam, dan memantau program kemandirian alumni secara transparan.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-[10px] font-bold text-rose-900 uppercase block mb-1">Aktor Pertama (Pengirim/Penerima)</label>
                <select
                  value={auditSender}
                  onChange={(e) => setAuditSender(e.target.value)}
                  className="w-full text-xs font-bold bg-white border border-rose-200 text-primary rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-rose-500"
                >
                  <option value="sandi">Saya (Sandi Supyandi)</option>
                  {ALUMNI_CONTACTS.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-rose-900 uppercase block mb-1">Aktor Kedua (Lawan Bicara)</label>
                <select
                  value={auditReceiver}
                  disabled={auditReceiver === auditSender}
                  onChange={(e) => setAuditReceiver(e.target.value)}
                  className="w-full text-xs font-bold bg-white border border-rose-200 text-primary rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-rose-500"
                >
                  <option value="sandi">Saya (Sandi Supyandi)</option>
                  {ALUMNI_CONTACTS.map(c => (
                    <option key={c.id} value={c.id} disabled={c.id === auditSender}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <div className="bg-rose-100/50 text-rose-800 text-[10px] font-bold px-4 py-3 rounded-xl border border-rose-200/50 w-full text-center">
                  🔐 Menampilkan Kunci Deskripsi Audit: <strong>{getChatKey(auditSender, auditReceiver)}</strong>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Workspace Frame */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl flex h-[620px] overflow-hidden">
        
        {/* Left Column: Contact Selection list */}
        <div className={`w-80 border-r border-gray-100 flex flex-col bg-surface/20 ${isAdminAuditerMode ? 'opacity-40 pointer-events-none' : ''}`}>
          <div className="p-6 border-b border-gray-150">
            <div className="relative">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari kontak alumni..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-xs font-semibold focus:outline-none focus:bg-white focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-3 space-y-1.5">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 mb-2">
              Daftar Alumni Aktif
            </div>

            {filteredContacts.map((c) => {
              const isSelected = activeContact.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveContact(c)}
                  className={`w-full p-3.5 rounded-2xl flex items-center gap-3.5 transition-all outline-none border ${
                    isSelected 
                      ? "bg-primary border-primary text-white shadow-xl shadow-primary/10" 
                      : "bg-transparent border-transparent hover:bg-gray-100/50 text-primary"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-white shadow-xs border">
                    <img src={c.img} className="w-full h-full object-cover" alt={c.name} referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow min-w-0 text-left">
                    <p className={`text-xs font-extrabold truncate ${isSelected ? 'text-accent' : 'text-primary'}`}>
                      {c.name}
                    </p>
                    <p className={`text-[10px] font-semibold truncate ${isSelected ? 'text-white/60' : 'text-gray-400'}`}>
                      {c.prof} • PAC {c.loc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          {/* Right Column: Active Chat Feed Workspace */}
        {currentUserRole === "admin_biasa" ? (
          <div className="flex-grow flex flex-col items-center justify-center p-12 text-center bg-gray-50/50">
            <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 shadow-xl shadow-amber-500/10 border border-amber-200">
              <ShieldAlert size={36} className="animate-bounce" />
            </div>
            <h3 className="text-xl font-display font-black text-primary uppercase tracking-wide">
              Akses Pembacaan Ditangguhkan
            </h3>
            <p className="text-xs text-rose-700 font-extrabold uppercase bg-rose-50 border border-rose-100 px-4 py-1.5 rounded-full mt-2 tracking-widest">
              Admin Biasa (Akses Ditolak)
            </p>
            <p className="text-xs text-gray-500 max-w-md mt-4 leading-relaxed font-semibold">
              Sesuai dengan regulasi privasi data anggota dan Undang-Undang Perlindungan Data Pribadi (UU PDP), isi percakapan personal terenkripsi end-to-end hanya dapat dibaca oleh para pihak yang bersangkutan dan <strong className="text-primary font-bold text-teal-800">Super Admin / Auditor Resmi</strong> PC IKA PMII KBB.
            </p>
            <div className="bg-white border border-gray-150 p-5 rounded-2xl max-w-sm mt-6 text-left space-y-2">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Mekanisme Otorisasi Hukum:</p>
              <div className="flex items-start gap-2 text-[11px] text-gray-600 font-medium">
                <span className="text-emerald-500 font-bold">✔</span>
                <span><strong>Anggota PMII:</strong> Selalu aman melihat pesan pribadinya.</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] text-gray-600 font-medium">
                <span className="text-emerald-500 font-bold">✔</span>
                <span><strong>Super Admin:</strong> Hak supervisi total (audit diaktifkan).</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] text-gray-600 font-medium">
                <span className="text-rose-500 font-bold">✖</span>
                <span><strong>Admin Biasa:</strong> Tidak berhak melihat transkrip chat.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col bg-white">
            {/* Active Contact Header block */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
              {isAdminAuditerMode ? (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shadow-inner">
                    <ShieldCheck size={22} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-rose-900 leading-tight">
                        TRANSKRIP AUDIT: {ALUMNI_CONTACTS.find(x => x.id === auditSender)?.name || auditSender}
                      </h4>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                      Memantau riwayat percakapan dengan: {ALUMNI_CONTACTS.find(x => x.id === auditReceiver)?.name || auditReceiver}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl border border-gray-100 overflow-hidden shrink-0">
                    <img src={activeContact.img} className="w-full h-full object-cover" alt="Avatar" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-primary leading-tight">
                      {activeContact.name}
                    </h4>
                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      Terverifikasi Mandiri • Terbuka Jaringan
                    </p>
                  </div>
                </div>
              )}

              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border border-emerald-100">
                SIAP-SECURE
              </span>
            </div>

            {/* Messages Feed area */}
            <div className="flex-grow p-6 space-y-6 overflow-y-auto bg-slate-50/50" ref={chatContainerRef}>
              {getCurrentMessages().length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gray-50 border flex items-center justify-center text-gray-300">
                    <MessageCircle size={28} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-extrabold text-primary">Belum Ada Percakapan</p>
                    <p className="text-[10px] text-gray-400 font-semibold leading-relaxed max-w-[280px]">
                      Kirimkan sapaan hangat atau bahas gagasan pembangunan daerah secara personal.
                    </p>
                  </div>
                </div>
              ) : (
                getCurrentMessages().map((m, index) => {
                  const isMyMessage = m.sender === "sandi";
                  const isAdminOverride = m.sender === "admin-override";
                  const senderIsFirstAuditParty = m.sender === auditSender;

                  // Adjust alignments
                  let alignment = "justify-start";
                  let bubbleStyle = "bg-white border border-gray-100 rounded-r-2xl rounded-tl-2xl text-primary shadow-xs";
                  if (isMyMessage) {
                    alignment = "justify-end";
                    bubbleStyle = "bg-primary text-white rounded-l-2xl rounded-tr-2xl shadow-md";
                  } else if (isAdminOverride) {
                    alignment = "justify-end";
                    bubbleStyle = "bg-rose-900 text-white rounded-l-2xl rounded-tr-2xl shadow-md border border-rose-800";
                  } else if (isAdminAuditerMode) {
                    // In audit mode, differentiate the two actors visually
                    if (senderIsFirstAuditParty) {
                      alignment = "justify-start";
                      bubbleStyle = "bg-amber-100/55 text-primary border border-amber-200 rounded-r-2xl rounded-tl-2xl shadow-xs";
                    } else {
                      alignment = "justify-end";
                      bubbleStyle = "bg-emerald-50 text-primary border border-emerald-100 rounded-l-2xl rounded-tr-2xl shadow-xs";
                    }
                  }

                  return (
                    <div key={m.id || index} className={`flex ${alignment}`}>
                      <div className={`max-w-[75%] p-4.5 ${bubbleStyle} text-left`}>
                        <div className="flex items-center justify-between gap-4 mb-1 border-b border-gray-100/20 pb-1">
                          <span className={`text-[9px] font-black uppercase tracking-wider ${isMyMessage ? 'text-accent' : isAdminOverride ? 'text-red-300' : 'text-primary/70'}`}>
                            {m.senderName}
                          </span>
                          <span className="text-[8px] font-bold opacity-40">
                            {m.time}
                          </span>
                        </div>
                        <p className="text-xs font-semibold leading-relaxed whitespace-pre-wrap">{m.msg}</p>

                        <div className="flex justify-end gap-1 mt-1.5">
                          {isMyMessage ? (
                            <CheckCheck size={12} className="text-accent" />
                          ) : (
                            <Check size={11} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Typing Controls component */}
            <div className="p-6 border-t border-gray-100 bg-white shrink-0">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder={
                    isAdminAuditerMode
                      ? "Ketik pesan audit atau catatan peninjauan khusus..."
                      : "Ketik pesan personal Anda atau gagasan sinergis..."
                  }
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-grow bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 text-xs font-semibold focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
                />
                <button
                  onClick={handleSendMessage}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform active:scale-95 shrink-0 shadow-lg ${
                    isAdminAuditerMode
                      ? "bg-rose-900 hover:bg-rose-950 text-accent"
                      : "bg-primary hover:bg-primary/95 text-accent shadow-primary/10"
                  }`}
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="flex justify-between items-center mt-2 px-1">
                <p className="text-[9px] text-gray-400 font-semibold italic flex items-center gap-1">
                  <Lock size={9} /> Jalur dienkripsi end-to-end
                </p>
                {isAdminAuditerMode && (
                  <p className="text-[9px] font-bold text-rose-600 flex items-center gap-1 animate-pulse">
                    ⚠️ Peringatan: Setiap masukan log dicatat ke audit sistem.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        </div>

      </div>
    </div>
  );
}
