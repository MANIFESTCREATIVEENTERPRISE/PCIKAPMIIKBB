import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessagesSquare, Plus, Sparkles, Clock, User, ShieldAlert,
  Lock, Unlock, FileText, RefreshCw, Send, AlertCircle, Eye, Check, X
} from "lucide-react";

// Pre-populated discussion rooms
const DEFAULT_DISCUSSION_ROOMS = [
  {
    id: "kamara-kbb",
    title: "Sinergi Koperasi KAMARA KBB",
    subTopic: "Distribusi logistik tani dan rantai pasok wilayah Lembang & Padalarang",
    creator: "Sahabat Sandi Supyandi, S.Kom., M.H",
    creatorId: "sandi",
    moderator: "Siti Mujahidah, S.E.",
    status: "Terbuka", // "Terbuka" or "Tertutup"
    messages: [
      { id: 1, user: "Siti Mujahidah, S.E.", role: "Moderator", msg: "Mari kita mulai diskusinya rekan-rekan. Bagaimana skema bagi hasil hasil tani kubis dan kentang di Lembang?", time: "11:00" },
      { id: 2, user: "Sahabat Sandi Supyandi, S.Kom., M.H", role: "Pembuat Ruang", msg: "Saran saya, koperasi KAMARA membeli langsung dari petani alumni dengan harga 5% di atas rata-rata tengkulak, lalu mendistribusikannya ke gerai retail Bandung Raya.", time: "11:04" },
      { id: 3, user: "Dr. Ahmad Jauhari, M.Pd", role: "Anggota", msg: "Sepakat kanda Sekjen, dengan begitu petani kita punya kepastian harga dan rantai tengkulak terpangkas.", time: "11:06" },
      { id: 4, user: "Faris Al-Fatih, S.Sos", role: "Anggota", msg: "Betul kanda! Saya siap bantu siapkan infografis promosinya lewat portal berita alumni biar sebarannya makin luas.", time: "11:10" }
    ],
    notulensi: {
      topic: "Distribusi logistik Koperasi KAMARA Lembang",
      moderator: "Siti Mujahidah, S.E.",
      summary: "Koperasi KAMARA akan membeli langsung dari petani alumni PMII KBB sebesar 5% di atas rata-rata tengkulak untuk memutus perantara komoditas kentang dan kubis. Faris Al-Fatih akan menyokong publikasi digital.",
      points: [
        "Pembelian langsung komoditas hortikultura seharga +5% dari harga pasar tengkulak.",
        "Model logistik dipusatkan di Padalarang dan didistribusikan ke warung retail se-KBB.",
        "Kampanye diseminasi media dimotori oleh Faris Al-Fatih (Infokom PC)."
      ],
      actionItems: [
        "Survei lokasi gudang logistik tani di Cipatat pekan ini.",
        "Pendataan total petani alumni aktif penanam sayur."
      ],
      generatedAt: "11:15"
    }
  },
  {
    id: "pmii-pkd",
    title: "Kaderisasi PKD Serentak PC PMII KBB",
    subTopic: "Persiapan Pelatihan Kader Dasar (PKD) serentak di 16 Kecamatan se-Bandung Barat",
    creator: "Drs. M. Zaki, M.Si",
    creatorId: "zaki",
    moderator: "Dr. Ahmad Jauhari, M.Pd",
    status: "Terbuka",
    messages: [
      { id: 1, user: "Dr. Ahmad Jauhari, M.Pd", role: "Moderator", msg: "Assalamualaikum Wr. Wb. PKD serentak KBB ditargetkan mencetak minimal 150 kader mujahid baru.", time: "Kemarin" },
      { id: 2, user: "Drs. M. Zaki, M.Si", role: "Pembuat Ruang", msg: "Pusatkan konsentrasi di 3 zona: Zona Utara (Lembang), Zona Tengah (Ngamprah), dan Zona Selatan (Cililin) biar efisien.", time: "Kemarin" }
    ],
    notulensi: null
  },
  {
    id: "agraria-cipatat",
    title: "Penyelesaian Hukum Agraria Cipatat",
    subTopic: "Mediasi sengketa kepemilikan tanah perkampungan pertanian alumni PMII",
    creator: "Budi Santoso, S.H.",
    creatorId: "budi",
    moderator: "Sahabat Sandi Supyandi, S.Kom., M.H",
    status: "Tertutup", // Demonstration of locked/closed room
    messages: [
      { id: 1, user: "Budi Santoso, S.H.", role: "Pembuat Ruang", msg: "Kasus ini harus diselesaikan melalui ajudikasi mediasi hubungan industrial dan pertanahan.", time: "15 Mei 2026" },
      { id: 2, user: "Sahabat Sandi Supyandi, S.Kom., M.H", role: "Moderator", msg: "Alhamdulillah draf kesepakatan damai (Mediasi Akta Van Dading) telah didaftarkan ke PN. Ruang diskusi ini kita sudahi dengan sukses.", time: "15 Mei 2026" }
    ],
    notulensi: {
      topic: "Pendaftaran Akta Van Dading di PN KBB",
      moderator: "Sahabat Sandi Supyandi, S.Kom., M.H",
      summary: "Sengketa tanah pertanian Cipatat resmi dimediasi secara kekeluargaan di bawah supervisi LBH IKA PMII. Akta kesepakatan damai Van Dading telah didaftarkan untuk kepastian hukum.",
      points: [
        "Penyelesaian dilakukan melalui non-litigasi yang didukung penuh pengurus PC.",
        "Tanah seluas 2,4 hektar kini dikuasai kembali secara kolektif oleh alumni."
      ],
      actionItems: [
        "Pemasangan batas patok resmi BPN pekan depan.",
        "Seremonial tumpengan syukuran di lokasi lahan tani."
      ],
      generatedAt: "15 Mei 2026"
    }
  }
];

export default function SiapDiskusiRoom() {
  const [rooms, setRooms] = useState<any[]>(() => {
    const saved = localStorage.getItem("siap_discussion_rooms");
    return saved ? JSON.parse(saved) : DEFAULT_DISCUSSION_ROOMS;
  });

  const [activeRoomId, setActiveRoomId] = useState<string>("kamara-kbb");
  const [typedMsg, setTypedMsg] = useState("");
  const [isNotulensiLoading, setIsNotulensiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "notulensi">("chat");

  // Create Room modal variables
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubTopic, setNewSubTopic] = useState("");
  const [newModerator, setNewModerator] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [rooms, activeRoomId, activeTab]);

  const saveRooms = (updated: any[]) => {
    localStorage.setItem("siap_discussion_rooms", JSON.stringify(updated));
    setRooms(updated);
  };

  const getActiveRoom = () => {
    return rooms.find(r => r.id === activeRoomId) || rooms[0];
  };

  // Create discussion room
  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSubTopic.trim()) return;

    const hasModerator = newModerator.trim().length > 0;
    const finalModerator = hasModerator ? newModerator.trim() : "Tanpa Moderator";

    const newRoom = {
      id: "room-" + Date.now(),
      title: newTitle,
      subTopic: newSubTopic,
      creator: "Sahabat Sandi Supyandi, S.Kom., M.H",
      creatorId: "sandi", // Always current user
      moderator: finalModerator,
      status: "Terbuka",
      messages: [
        { 
          id: 1, 
          user: "Sistem SIAP", 
          role: "Sistem", 
          msg: `Ruang diskusi ini berhasil dibuat oleh Sahabat Sandi Supyandi.${hasModerator ? ` Moderator terpilih: ${finalModerator}.` : " Tanpa moderator."} Mengundang seluruh anggota untuk berembug kedaulatan daerah!`, 
          time: "Baru saja" 
        }
      ],
      notulensi: null
    };

    const updated = [...rooms, newRoom];
    saveRooms(updated);
    setActiveRoomId(newRoom.id);
    setShowCreateModal(false);
    setNewTitle("");
    setNewSubTopic("");
    setNewModerator("");
  };

  // Post dynamic message to active group
  const handleSendGroupMessage = () => {
    if (!typedMsg.trim()) return;

    const activeRoom = getActiveRoom();
    if (activeRoom.status !== "Terbuka") return; // Safeguard

    const newChat = {
      id: Date.now(),
      user: "Sahabat Sandi Supyandi, S.Kom., M.H",
      role: activeRoom.creatorId === "sandi" ? "Pembuat Ruang" : "Anggota",
      msg: typedMsg,
      time: new Date().toLocaleTimeString("id", { hour: "2-digit", minute: "2-digit" })
    };

    const updated = rooms.map(r => {
      if (r.id === activeRoom.id) {
        return {
          ...r,
          messages: [...r.messages, newChat]
        };
      }
      return r;
    });

    saveRooms(updated);
    setTypedMsg("");
  };

  // Toggle open or closed. Only if user is "sandi" (creator of that room or bypass template)
  const toggleRoomState = (roomId: string) => {
    const updated = rooms.map(r => {
      if (r.id === roomId) {
        const nextStatus = r.status === "Terbuka" ? "Tertutup" : "Terbuka";
        const systemLog = {
          id: Date.now(),
          user: "Sistem SIAP",
          role: "Sistem",
          msg: `Ruang diskusi ini secara resmi telah ${nextStatus === "Terbuka" ? "DIBUKA KEMBALI" : "DITUTUP"} oleh Pembuat Ruang.`,
          time: new Date().toLocaleTimeString("id", { hour: "2-digit", minute: "2-digit" })
        };
        return {
          ...r,
          status: nextStatus,
          messages: [...r.messages, systemLog]
        };
      }
      return r;
    });
    saveRooms(updated);
  };

  // Dynamic Auto Notulensi Generator Engine
  const generateAutoNotulensi = () => {
    const activeRoom = getActiveRoom();
    if (activeRoom.messages.length < 2) return;

    setIsNotulensiLoading(true);

    setTimeout(() => {
      // Analyze current messages to compile simulated intelligent summarized notulensi points
      const msgsText = activeRoom.messages.map(m => m.msg).join(" ");
      const hasKamara = msgsText.toLowerCase().includes("koperasi") || msgsText.toLowerCase().includes("kamara");
      const hasKaderisasi = msgsText.toLowerCase().includes("kader") || msgsText.toLowerCase().includes("pkd") || msgsText.toLowerCase().includes("latih");

      let summary = "Diskusi difokuskan pada pengumpulan pandangan taktis terkait " + activeRoom.title + " dengan dipimpin oleh moderator " + activeRoom.moderator + ".";
      let points = [
        "Koordinasi langsung antar instansi alumni diperkuat untuk transparansi data daerah.",
        "Membentuk tim perumus taktis dengan berfokus pada kesejahteraan alumni lapis bawah."
      ];
      let actionItems = [
        "Penyusunan matriks teknis aksi selambat-lambatnya akhir minggu ini.",
        "Rapat pleno berikutnya secara telekonferensi video SIAP."
      ];

      if (hasKamara) {
        summary = "Konsensus menyepakati pembentukan sirkulasi logistik mandiri yang mengutamakan hasil panen hortikultura petani tani binaan IKA PMII Bandung Barat.";
        points = [
          "Penetapan harga beli produk agro-alumni di batas menguntungkan guna menandingi oligarki tengkulak.",
          "Distribusi barang retail dikelola secara end-to-end oleh Koperasi KAMARA."
        ];
        actionItems = [
          "Validasi jumlah pasokan panen tomat dan kentang di desa binaan.",
          "Menjalin kontak ekspor mini ke distributor pasar induk Gedebage."
        ];
      } else if (hasKaderisasi) {
        summary = "Diskusi menyusun skema zonasi pelaksanaan PKD PC PMII Bandung Barat guna mendistribusikan efisiensi akomodasi instruktur.";
        points = [
          "Zonasi dibagi menjadi 3 sentral (Utara, Selatan, Tengah) mengapit 16 kecamatan.",
          "Kurikulum disesuaikan dengan tantangan hukum digital masa kini."
        ];
        actionItems = [
          "Pembuatan form registrasi digital calon peserta PKD.",
          "Konfirmasi kehadiran perwakilan Dewan Pembina."
        ];
      }

      const generatedNotulensi = {
        topic: activeRoom.subTopic,
        moderator: activeRoom.moderator,
        summary: summary,
        points: points,
        actionItems: actionItems,
        generatedAt: new Date().toLocaleTimeString("id", { hour: "2-digit", minute: "2-digit" }) + " WIB"
      };

      const updated = rooms.map(r => {
        if (r.id === activeRoom.id) {
          return {
            ...r,
            notulensi: generatedNotulensi
          };
        }
        return r;
      });

      saveRooms(updated);
      setIsNotulensiLoading(false);
      setActiveTab("notulensi"); // Auto focus to notulensi tab
    }, 2500);
  };

  const activeRoom = getActiveRoom();
  const isCreatorOfActiveRoom = activeRoom.creatorId === "sandi";

  return (
    <div className="space-y-6 text-left relative">
      
      {/* Upper header action area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">SIAP Diskusi</span>
          <h2 className="text-3xl font-display font-bold text-primary italic">Ruang Obrolan & Forum Grup</h2>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
            Forum diskusi terbuka kedaulatan alumni seluruh Bandung Barat
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary hover:bg-accent text-white hover:text-primary px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/10 active:scale-95"
        >
          <Plus size={15} />
          <span>Buat Ruang Diskusi</span>
        </button>
      </div>

      {/* Grid workspace containing Discussion list & active area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Sidebar Rooms of SIAP Discussion: lg:col-span-4 */}
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-xl flex flex-col h-[650px]">
          <div className="pb-4 border-b border-gray-100 mb-4 shrink-0">
            <h3 className="font-extrabold text-sm text-primary uppercase tracking-widest flex items-center gap-2">
              <MessagesSquare size={16} className="text-accent" /> Kamar Diskusi Aktif ({rooms.length})
            </h3>
            <p className="text-[10px] text-gray-400 font-semibold mt-1">
              Seluruh anggota dapat masuk dan membaca percakapan secara bebas.
            </p>
          </div>

          <div className="flex-grow overflow-y-auto space-y-3 pr-1">
            {rooms.map((r) => {
              const isActive = r.id === activeRoomId;
              const isClosed = r.status === "Tertutup";
              return (
                <div
                  key={r.id}
                  onClick={() => {
                    setActiveRoomId(r.id);
                    setActiveTab("chat");
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col text-left gap-2 relative overflow-hidden group ${
                    isActive 
                      ? "bg-primary text-white border-primary shadow-xl shadow-primary/10" 
                      : "bg-gray-50/50 hover:bg-white border-gray-100 hover:border-gray-250 hover:shadow-md"
                  }`}
                >
                  {/* Closed overlay badge background pattern */}
                  {isClosed && (
                    <div className="absolute top-0 right-0 w-12 h-12 bg-rose-500/5 rounded-bl-full pointer-events-none flex items-center justify-center">
                      <Lock size={10} className="text-rose-500 mr-2 mb-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 shrink-0">
                    <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isClosed 
                        ? "bg-rose-500/10 text-rose-600 border border-rose-500/10" 
                        : isActive
                        ? "bg-accent/20 text-accent border border-accent/20"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    }`}>
                      {r.status === "Tertutup" ? "Selesai / Tutup" : "Sembunyi / Aktif"}
                    </span>
                    <span className={`text-[8px] font-bold ${isActive ? 'text-white/60' : 'text-gray-400'}`}>
                      {r.messages.length} msg
                    </span>
                  </div>

                  <div className="space-y-0.5 flex-grow">
                    <h4 className={`text-xs font-extrabold truncate ${isActive ? 'text-accent' : 'text-primary'}`}>
                      {r.title}
                    </h4>
                    <p className={`text-[10px] font-semibold truncate ${isActive ? 'text-white/70' : 'text-gray-500'}`}>
                      {r.subTopic}
                    </p>
                  </div>

                  <div className="border-t border-gray-100/10 pt-2 flex items-center justify-between text-[9px] font-medium opacity-80 leading-none">
                    <span className="truncate max-w-[120px]">MOD: <strong>{r.moderator.split(",")[0]}</strong></span>
                    <span className="truncate max-w-[120px]">OLEH: <strong>{r.creator.split(",")[0]}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Discussion Workspace Area: lg:col-span-8 */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl flex flex-col h-[650px] overflow-hidden">
          
          {/* Active room details header */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between bg-white shrink-0 gap-4 text-left">
            <div className="space-y-1 flex-grow">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-extrabold text-base text-primary uppercase tracking-wide leading-none">{activeRoom.title}</h3>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                  activeRoom.status === "Tertutup"
                    ? "bg-rose-50 text-rose-700 border-rose-100"
                    : "bg-emerald-50 text-emerald-700 border-emerald-100 animate-pulse"
                }`}>
                  {activeRoom.status === "Tertutup" ? "🔴 Ditutup" : "🟢 Terbuka"}
                </span>
              </div>
              <p className="text-[11px] font-medium text-gray-500 leading-snug">
                Sub-Pembahasan: <span className="italic font-bold text-gray-700">{activeRoom.subTopic}</span>
              </p>
              
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-bold text-gray-400 pt-1 leading-none">
                <span>Pembuat: <strong className="text-primary/70">{activeRoom.creator}</strong></span>
                <span>Moderator: <strong className="text-primary/70">{activeRoom.moderator}</strong></span>
              </div>
            </div>

            {/* Change Status block - Only if user is Creator of that room! */}
            <div className="flex items-center gap-2 shrink-0">
              {isCreatorOfActiveRoom ? (
                <button
                  onClick={() => toggleRoomState(activeRoom.id)}
                  className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1 border cursor-pointer active:scale-95 ${
                    activeRoom.status === "Terbuka"
                      ? "bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700"
                      : "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700"
                  }`}
                  title="Karena Anda pembuat ruang, Anda memiliki hak penuh menutup/membuka kembali ruang diskusi"
                >
                  {activeRoom.status === "Terbuka" ? (
                    <>
                      <Lock size={10} />
                      <span>Kunci / Tutup</span>
                    </>
                  ) : (
                    <>
                      <Unlock size={10} />
                      <span>Buka Diskusi</span>
                    </>
                  )}
                </button>
              ) : (
                <div 
                  className="bg-gray-100/85 px-3 py-1.5 rounded-xl border border-gray-200 text-gray-400 text-[8px] font-black uppercase tracking-wider flex items-center gap-1"
                  title="Hanya Pembuat Ruang ini yang dapat mengunci / membukanya kembali."
                >
                  <Lock size={10} />
                  <span>Kunci Creator</span>
                </div>
              )}
            </div>
          </div>

          {/* Sub Tab selection between Chat Feed and Notulensi summary */}
          <div className="bg-gray-50/50 p-2 border-b border-gray-100 flex gap-2 shrink-0">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-grow sm:flex-grow-0 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "chat"
                  ? "bg-white text-primary shadow-sm font-bold border border-gray-200/50"
                  : "text-gray-400 hover:text-primary"
              }`}
            >
              <MessagesSquare size={13} />
              <span>Percakapan Live</span>
            </button>
            <button
              onClick={() => setActiveTab("notulensi")}
              className={`flex-grow sm:flex-grow-0 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "notulensi"
                  ? "bg-white text-primary shadow-sm font-bold border border-gray-200/50"
                  : "text-gray-400 hover:text-primary"
              }`}
            >
              <FileText size={13} className="text-amber-500" />
              <span>Notulensi AI</span>
              {activeRoom.notulensi && (
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></span>
              )}
            </button>

            {/* Generate button on the right side */}
            <div className="ml-auto flex items-center">
              <button
                onClick={generateAutoNotulensi}
                disabled={activeRoom.messages.length < 2 || isNotulensiLoading}
                className="bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-primary px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
                title="Membuat atau memperbarui kesimpulan otomatis menggunakan asisten AI SIAP"
              >
                {isNotulensiLoading ? (
                  <RefreshCw size={10} className="animate-spin text-primary" />
                ) : (
                  <Sparkles size={11} className="text-white fill-current animate-pulse" />
                )}
                <span>Auto Notulensi</span>
              </button>
            </div>
          </div>

          {/* Window Viewport Area */}
          <div className="flex-grow overflow-y-auto p-6 bg-slate-50/40 relative">
            
            {/* View A: Chat Message Frame */}
            {activeTab === "chat" && (
              <div className="space-y-4">
                {activeRoom.messages.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 font-semibold text-xs">
                    Belum ada pesan. Mulailah mengetik gagasan Anda di bawah!
                  </div>
                ) : (
                  activeRoom.messages.map((m: any, index: number) => {
                    const isSystem = m.role === "Sistem";
                    const isSelf = m.user === "Sahabat Sandi Supyandi, S.Kom., M.H";
                    
                    if (isSystem) {
                      return (
                        <div key={m.id || index} className="flex justify-center">
                          <div className="bg-amber-50/80 border border-amber-100 rounded-2xl px-5 py-3 text-center max-w-[85%]">
                            <p className="text-[10px] font-bold text-amber-800 leading-relaxed italic flex items-center gap-1.5 justify-center">
                              <AlertCircle size={12} className="shrink-0 text-amber-600" />
                              {m.msg} ({m.time})
                            </p>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={m.id || index} className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-4 max-w-[75%] rounded-2xl text-left shadow-xs ${
                          isSelf 
                            ? "bg-primary text-white rounded-tr-none" 
                            : "bg-white border border-gray-150 text-primary rounded-tl-none"
                        }`}>
                          <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-1 mb-1.5 leading-none">
                            <span className={`text-[9px] font-black uppercase tracking-wider ${
                              isSelf ? 'text-accent' : 'text-primary/70'
                            }`}>
                              {m.user} ({m.role || "Anggota"})
                            </span>
                            <span className="text-[8px] font-semibold opacity-50">{m.time}</span>
                          </div>
                          <p className="text-xs font-semibold leading-relaxed whitespace-pre-wrap">{m.msg}</p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={chatEndRef} />
              </div>
            )}

            {/* View B: AI Auto Notulensi Document Frame */}
            {activeTab === "notulensi" && (
              <AnimatePresence mode="wait">
                {isNotulensiLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center space-y-4 py-12 text-center"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-amber-500 border-t-transparent animate-spin"></div>
                    <div className="space-y-1">
                      <p className="text-xs font-extrabold text-primary flex items-center gap-1.5 justify-center">
                        <Sparkles size={14} className="text-amber-500 animate-pulse" />
                        Sedang Menganalisis Percakapan Alumni...
                      </p>
                      <p className="text-[10px] text-gray-400 font-semibold max-w-[320px]">
                        Asisten Integritas SIAP menyaring perdebatan mencari titik potong konsensus, usulan aksi, dan agenda tindak lanjut.
                      </p>
                    </div>
                  </motion.div>
                ) : activeRoom.notulensi ? (
                  <motion.div
                    key="document"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-gray-150 rounded-[2rem] p-8 shadow-2xl space-y-6 text-left relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none flex items-start justify-end p-6">
                      <FileText size={40} className="text-amber-500/20" />
                    </div>

                    <div className="border-b border-gray-100 pb-4 space-y-1 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-100 text-amber-800 text-[8px] font-black tracking-widest px-2.5 py-1 rounded-full uppercase border border-amber-200">
                          AKTA DRAF NOTULENSI AI
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                          <Clock size={11} /> rilis {activeRoom.notulensi.generatedAt}
                        </span>
                      </div>
                      <h4 className="text-base font-extrabold text-primary uppercase tracking-wide">
                        {activeRoom.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 leading-tight">
                        Fokus rujukan: {activeRoom.notulensi.topic}
                      </p>
                    </div>

                    <div className="space-y-4 text-xs font-semibold leading-relaxed text-slate-700 relative z-10">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Ringkasan Eksekutif</span>
                        <p className="bg-gray-50 p-4 border-l-4 border-amber-400 rounded-r-xl font-bold leading-relaxed">{activeRoom.notulensi.summary}</p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Butir Konsensus Sepakat</span>
                        <ul className="list-disc pl-5 space-y-1.5 text-xs text-primary/80">
                          {activeRoom.notulensi.points.map((p: string, i: number) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Rencana Tindak Lanjut (RTL)</span>
                        <ul className="list-decimal pl-5 space-y-1.5 text-xs text-primary/80">
                          {activeRoom.notulensi.actionItems.map((ai: string, i: number) => (
                            <li key={i} className="font-bold underline decoration-amber-400/50 decoration-2">{ai}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-[10px] font-extrabold text-gray-400">
                      <span>Moderator Sidang: {activeRoom.notulensi.moderator}</span>
                      <span className="flex items-center gap-1 text-emerald-600"><Check size={11} className="stroke-[3]" /> SAH & VERIFIKASI AI</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4 py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
                      <FileText size={28} />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs font-extrabold text-primary">Belum Ada Notulensi Tercatat</p>
                      <p className="text-[10px] text-gray-400 font-semibold max-w-[280px]">
                        Harap berdiskusi terlebih dahulu sebelum menekan tombol <strong>"Auto Notulensi"</strong> di kanan atas halaman diskusi.
                      </p>
                    </div>
                    <button
                      onClick={generateAutoNotulensi}
                      disabled={activeRoom.messages.length < 2}
                      className="bg-primary text-accent text-[10px] px-5 py-2.5 rounded-xl font-bold uppercase disabled:opacity-40"
                    >
                      Mulai Analisis Percakapan
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

          </div>

          {/* Locked or custom input footer */}
          <div className="p-6 border-t border-gray-100 bg-white shrink-0">
            {activeRoom.status === "Tertutup" ? (
              <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-2xl flex items-center gap-3">
                <ShieldAlert size={16} className="text-rose-600 shrink-0 animate-pulse" />
                <p className="text-[11px] font-bold leading-relaxed text-left">
                  Diskusi Ditutup: Ruang ini telah ditutup oleh {activeRoom.creator}. Tidak dapat mengirimkan tanggapan baru. Butir-butir notulensi tetap disimpan secara abadi untuk keperluan organisasi.
                </p>
              </div>
            ) : activeTab === "notulensi" ? (
              <div className="p-3.5 bg-amber-50/50 border border-amber-100 text-amber-900 rounded-xl flex items-center justify-between gap-4">
                <p className="text-[10px] font-semibold">Tinjau kesimpulan dan klik <strong>"Percakapan Live"</strong> untuk kembali mengetik.</p>
                <button onClick={() => setActiveTab("chat")} className="bg-primary text-accent text-[9px] px-3 py-1.5 rounded-lg font-black uppercase">Obrolan</button>
              </div>
            ) : (
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder={`Ketik pesan Anda ke ruang ${activeRoom.title}...`}
                  value={typedMsg}
                  onChange={(e) => setTypedMsg(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendGroupMessage()}
                  className="flex-grow bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 text-xs font-semibold focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
                />
                <button
                  onClick={handleSendGroupMessage}
                  className="w-12 h-12 bg-primary hover:bg-primary/95 text-accent rounded-xl flex items-center justify-center transition-transform active:scale-95 shrink-0 shadow-lg"
                >
                  <Send size={16} />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Modal - Create Discussion Room */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white border border-gray-150 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-6 right-6 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="border-b border-gray-100 pb-4 mb-6 text-left">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">DRAF DISKUSI</span>
                <h3 className="text-xl font-extrabold text-primary uppercase mt-0.5">Form Diskusi Baru</h3>
                <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
                  Buatlah wadah diskusi baru secara terstruktur dengan kepatuhan penjaminan nirlaba.
                </p>
              </div>

              <form onSubmit={handleCreateRoom} className="space-y-4 text-left">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Judul Diskusi</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Koperasi Pupuk Sejahtera"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Sub Pembahasan / Detail Isu</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Contoh: Distribusi alokasi pupuk bersubsidi dan kendala transportasi"
                    value={newSubTopic}
                    onChange={(e) => setNewSubTopic(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-semibold focus:outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Pembuat Ruang</label>
                    <input
                      type="text"
                      disabled
                      value="Sahabat Sandi Supyandi, S.Kom., M.H (Anda)"
                      className="w-full bg-gray-100 text-gray-500 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Moderator Terpilih (Opsional)</label>
                    <input
                      type="text"
                      placeholder="Nama Moderator (dapat dikosongkan)"
                      value={newModerator}
                      onChange={(e) => setNewModerator(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-xs font-semibold text-primary focus:outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-5 py-3 rounded-xl border border-gray-100 text-gray-400 text-xs font-black uppercase tracking-wider hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-accent text-white hover:text-primary px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg active:scale-95"
                  >
                    Luncurkan Diskusi
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
