import { useState, useRef, useEffect } from "react";
import { 
  Send, MessageSquare, Bot, File, Image as ImageIcon, PhoneCall, Mic, 
  Smile, Search, Clock, CheckCheck, Play, Sparkles, Volume2, Plus
} from "lucide-react";
import { ChatMessage } from "../types/seller";

interface SellerChatProps {
  isDarkMode: boolean;
  onTriggerNotification: (msg: string) => void;
}

export default function SellerChat({
  isDarkMode,
  onTriggerNotification
}: SellerChatProps) {
  const [activeContactIndex, setActiveContactIndex] = useState(0);
  const [inputMessage, setInputMessage] = useState("");
  const [useAiAutoReply, setUseAiAutoReply] = useState(true);

  // Standard contacts with predefined conversation threads
  const [contacts, setContacts] = useState([
    {
      id: "C-1",
      name: "Ahmad Mauludin",
      avatar: "AM",
      lastMsg: "Kira-kira kapan dikirim ya gan?",
      time: "10:14",
      unread: 2,
      online: true,
      messages: [
        { id: "m1", sender: "customer", text: "Halo admin, saya baru saja checkout SaaS Business Template Pro.", timestamp: "10:10" },
        { id: "m2", sender: "seller", text: "Halo Sahabat Ahmad! Terimakasih, lisensi sudah kami kirimkan ke email ahmad.maul@gmail.com.", timestamp: "10:12" },
        { id: "m3", sender: "customer", text: "Kira-kira kapan dikirim ya gan?", timestamp: "10:14" }
      ] as ChatMessage[]
    },
    {
      id: "C-2",
      name: "Siti Rahmawati",
      avatar: "SR",
      lastMsg: "Pesanannya sudah sampai, makasih banyak ya!",
      time: "Yesterday",
      unread: 0,
      online: false,
      messages: [
        { id: "m4", sender: "customer", text: "Selamat siang admin, barang Ergonomic Organizer ready?", timestamp: "Yesterday 11:00" },
        { id: "m5", sender: "seller", text: "Siang kak! Ready banyak, silakan langsung di-checkout agar langsung diproses pick up.", timestamp: "Yesterday 11:15" },
        { id: "m6", sender: "customer", text: "Pesanannya sudah sampai, makasih banyak ya!", timestamp: "Yesterday 16:30" }
      ] as ChatMessage[]
    },
    {
      id: "C-3",
      name: "Budi Pratama",
      avatar: "BP",
      lastMsg: "Terimakasih solusinya min.",
      time: "2 days ago",
      unread: 0,
      online: true,
      messages: [
        { id: "m7", sender: "customer", text: "Paketan saya kok dusnya penyok parah ya?", timestamp: "2 days ago" },
        { id: "m8", sender: "seller", text: "Kami mohon maaf atas kelalaian ekspedisi kak. Silakan lampirkan unboxing di menu komplain, dana fully dikembalikan.", timestamp: "2 days ago" },
        { id: "m9", sender: "customer", text: "Terimakasih solusinya min.", timestamp: "2 days ago" }
      ] as ChatMessage[]
    }
  ]);

  // Canned Quick Reply Templates
  const cannedReplies = [
    "Halo kak! Produk ini ready stok siap dikirim hari ini. Silakan langsung di-checkout ya! 😊",
    "Terimakasih telah menghubungi kami, mohon tunggu sebentar ya, admin sedang mengecek daftar stok di gudang.",
    "Pembayaran kakak sudah terverifikasi. Kami sedang melakukan Quality Control sebelum dikirimkan ke ekspedisi.",
    "Baik kak, komplain kakak kami terima. Mohon bantuannya untuk mengupload video unboxing utuh untuk klaim garansi ya."
  ];

  // AI Canned Responses state
  const [aiCustomPrompt, setAiCustomPrompt] = useState("Asisten Pintar Toko");

  const activeContact = contacts[activeContactIndex];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chats
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeContact.messages]);

  const handleSendMessage = (textToSend: string, senderOverride: "seller" | "ai" = "seller") => {
    if (!textToSend.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: senderOverride,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update messages in selected contact
    setContacts(prev => prev.map((c, idx) => {
      if (idx === activeContactIndex) {
        return {
          ...c,
          messages: [...c.messages, newMsg],
          lastMsg: textToSend,
          unread: 0
        };
      }
      return c;
    }));

    setInputMessage("");
    onTriggerNotification(`Mengirim pesan ke: ${activeContact.name}`);

    // AI automated simulation answer trigger
    if (senderOverride === "seller" && useAiAutoReply) {
      setTimeout(() => {
        const simulateAiAnswer: ChatMessage = {
          id: `msg-ai-${Date.now()}`,
          sender: "ai",
          text: `[Auto-Reply AI Assistant] Halo Sahabat! Terimakasih telah menggunakan fitur balasan pintar. Terkait "${textToSend.slice(0, 24)}..." admin kami akan menindaklanjutinya secepat mungkin ya! Stay tuned.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setContacts(prev => prev.map((c, idx) => {
          if (idx === activeContactIndex) {
            return {
              ...c,
              messages: [...c.messages, simulateAiAnswer],
              lastMsg: simulateAiAnswer.text
            };
          }
          return c;
        }));
        onTriggerNotification("AI Assistant membalas otomatis!");
      }, 1500);
    }
  };

  const handleCannedClick = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-sans">Sistem Komunikasi Real-time &amp; Chat</h2>
          <p className="text-xs text-slate-400 font-medium">Layanan chat pembeli, template balasan cepat, trigger auto-reply AI cerdas, &amp; monitoring pesan belum dibaca.</p>
        </div>

        {/* AI toggler */}
        <div className="flex items-center gap-3 bg-blue-50/50 dark:bg-blue-900/10 p-2 rounded-xl border dark:border-slate-800">
          <span className="text-[10px] font-black uppercase tracking-wider text-blue-550 flex items-center gap-1.5 animate-pulse">
            <Sparkles size={14} className="text-blue-500" /> AI Auto-Reply Aktif
          </span>
          <button 
            type="button"
            onClick={() => { setUseAiAutoReply(!useAiAutoReply); onTriggerNotification(`Auto-reply AI: ${!useAiAutoReply ? "AKTIF" : "NONAKTIF"}`); }}
            className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-300 ${useAiAutoReply ? "bg-blue-500 flex justify-end" : "bg-slate-300 flex justify-start"}`}
          >
            <span className="w-5 h-5 rounded-full bg-white shadow-md block"></span>
          </button>
        </div>
      </div>

      {/* Main chat layout */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 rounded-[2rem] border overflow-hidden h-[580px] ${
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"
      }`}>
        {/* Left Contacts list - columns 3 */}
        <div className="lg:col-span-3 border-r dark:border-slate-800 flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/40">
          <div className="p-4 border-b dark:border-slate-800">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={14} />
              </span>
              <input 
                type="text" 
                placeholder="Cari pesan pembeli..." 
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border dark:border-slate-850 bg-white dark:bg-slate-900 text-[11px] font-semibold outline-none"
              />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto divide-y dark:divide-slate-850">
            {contacts.map((c, idx) => {
              const isActive = idx === activeContactIndex;
              return (
                <button
                  key={c.id}
                  onClick={() => { setActiveContactIndex(idx); }}
                  className={`w-full p-4 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                    isActive ? "bg-blue-500/10 text-blue-600 dark:bg-blue-950/40" : "hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 font-extrabold flex items-center justify-center text-xs relative shrink-0 shadow-inner">
                    {c.avatar}
                    {c.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black truncate">{c.name}</span>
                      <span className="text-[9px] text-slate-400 font-bold">{c.time}</span>
                    </div>
                    <p className={`text-[10px] mt-1 truncate ${isActive ? "text-slate-600 dark:text-slate-200 font-semibold" : "text-slate-400"}`}>
                      {c.lastMsg}
                    </p>
                  </div>
                  {c.unread > 0 && (
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[8px] font-black flex items-center justify-center shrink-0">
                      {c.unread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Middle chat thread messages - columns 6 */}
        <div className="lg:col-span-6 flex flex-col h-full bg-slate-50/20 dark:bg-slate-900/10 justify-between">
          {/* Header contact title bar */}
          <div className="p-4 border-b dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                {activeContact.avatar}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black">{activeContact.name}</span>
                <span className="text-[9px] text-slate-400 mt-0.5 font-bold flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeContact.online ? "bg-green-500" : "bg-slate-350"}`}></span>
                  {activeContact.online ? "Online & Berinteraksi" : "Offline"}
                </span>
              </div>
            </div>
          </div>

          {/* Messages canvas thread scrollable */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {activeContact.messages.map((msg) => {
              const isMe = msg.sender === "seller";
              const isAi = msg.sender === "ai";
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : isAi ? "items-center" : "items-start"}`}>
                  <div className={`max-w-xs p-3.5 rounded-2xl text-xs leading-relaxed font-semibold ${
                    isMe 
                      ? "bg-blue-600 text-white rounded-tr-none" 
                      : isAi
                      ? "bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-150 dark:border-indigo-850 text-indigo-700 dark:text-indigo-300 rounded-xl"
                      : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-105 border dark:border-slate-800 rounded-tl-none"
                  }`}>
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold mt-1 tracking-wider uppercase pl-1.5 pr-1.5">
                    {isAi ? "Sistem Auto-Reply AI" : msg.sender === "customer" ? activeContact.name : "Anda"} &bull; {msg.timestamp}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input tools bar bottom */}
          <div className="p-4 border-t dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 shrink-0">
            {/* Quick action buttons row inside input bar */}
            <div className="flex gap-1.5 items-center bg-slate-50 dark:bg-slate-950 p-1.5 border dark:border-slate-800 rounded-xl max-w-max">
              <button 
                onClick={() => { onTriggerNotification("Unggah foto/file dimasukkan mock"); }}
                className="p-1 px-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-blue-500 text-[10px] font-bold flex items-center gap-1"
              >
                <ImageIcon size={14} /> Foto / File
              </button>
              <button 
                onClick={() => handleSendMessage("[Kirim Pesan Suara Simulasi 🎙️]")}
                className="p-1 px-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-emerald-500 text-[10px] font-bold flex items-center gap-1"
              >
                <Mic size={14} /> Voice Note
              </button>
            </div>

            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputMessage); }}
              className="flex gap-2.5 items-center"
            >
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ketik balasan Anda ke pembeli... (Enter)"
                className="flex-grow px-4 py-2 bg-slate-100 dark:bg-slate-950 dark:border-slate-800 border rounded-xl outline-none text-xs font-semibold focus:ring-2 focus:ring-blue-600"
              />
              <button 
                type="submit"
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md cursor-pointer shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Right Canned quick replies tools area - columns 3 */}
        <div className="lg:col-span-3 border-l dark:border-slate-800 flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/40 p-4 overflow-y-auto">
          <div className="flex items-center gap-1.5 pb-2 border-b dark:border-slate-800 mb-4 justify-between">
            <span className="text-[10px] font-black uppercase text-slate-450 text-slate-400 tracking-wider">Canned Templates</span>
            <Bot size={16} className="text-blue-500" />
          </div>

          <div className="space-y-3">
            {cannedReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleCannedClick(reply)}
                className="w-full p-3 bg-white hover:bg-blue-50 dark:bg-slate-900 border dark:border-slate-850 hover:border-blue-200 rounded-2xl text-[10px] leading-relaxed font-semibold text-slate-600 dark:text-slate-300 text-left transition-all hover:scale-[1.01] block cursor-pointer"
              >
                {reply}
              </button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t dark:border-slate-800 space-y-3.5">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Pola Assistant Prompt</span>
            <input 
              type="text" 
              value={aiCustomPrompt}
              onChange={(e) => setAiCustomPrompt(e.target.value)}
              placeholder="Gaya bicara AI Assistant" 
              className="w-full p-2 border dark:border-slate-800 rounded-lg text-[10px] bg-white dark:bg-slate-900 font-semibold"
            />
            <button 
              onClick={() => onTriggerNotification("Sistem prompt AI disesuaikan!")}
              className="w-full py-1.5 border border-dashed rounded-xl text-[9px] font-black uppercase tracking-widest text-blue-600 cursor-pointer"
            >
              Simpan Prompt AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
