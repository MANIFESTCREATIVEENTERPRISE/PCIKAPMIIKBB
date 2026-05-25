import React, { useState } from "react";
import { 
  Bot, Sparkles, MessageSquare, Play, HelpCircle, FileText, 
  Send, Plus, Award, AlertCircle, CheckCircle, SlidersHorizontal, ArrowRight
} from "lucide-react";
import { MOCK_TUTORIALS } from "../data/sellerMockData";

interface SellerHelpCenterProps {
  isDarkMode: boolean;
  onTriggerNotification: (msg: string) => void;
}

export default function SellerHelpCenter({
  isDarkMode,
  onTriggerNotification
}: SellerHelpCenterProps) {
  // Conversational bot state
  const [aiHistory, setAiHistory] = useState([
    { sender: "ai", text: "Halo Mitra Seller! Saya adalah Maretoko AI Business Assistant. Tanyakan apa saja mengenai tata cara tambah produk digital, sinkronisasi API WhatsApp, tracking RajaOngkir atau tips menaikkan konversi jasa." }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [aiAnswering, setAiAnswering] = useState(false);

  // Ticketing board database state
  const [tickets, setTickets] = useState([
    { id: "TCK-8812", title: "Gagal Mengambil DNS Rekening Bank Mandiri", category: "Keuangan", priority: "high", status: "open", date: "2026-05-25" },
    { id: "TCK-8799", title: "API Integrasi RajaOngkir Tidak Mengembalikan Ongkos Kirim", category: "Integrasi", priority: "medium", status: "resolved", date: "2026-05-23" }
  ]);
  
  const [newTicket, setNewTicket] = useState({ title: "", category: "Keuangan", priority: "medium" });
  const [showAddTicket, setShowAddTicket] = useState(false);

  // FAQ list accordions
  const faqs = [
    { q: "Bagaimana cara mencetak resi pengiriman berbayar COD?", a: "Pilih menu 'Order Management' rujukan, klik tab 'Diproses'. Pilih item COD Anda dan tekan tombol 'Label Alamat/Resi'. Barcode rujukan alamat cetak siap ditempel ke bungkus parcel." },
    { q: "Apa kegunaan Custom Domain pada rujukan Toko?", a: "Custom domain memungkinkan website landing page toko marketplace Anda diakses secara profesional (misal: indofigma.id). Ini meningkatkan kredibilitas brand Anda di Google SEO." },
    { q: "Mengapa ulasan sentimen pembeli ditandai negatif?", a: "Sistem mesin AI Maretoko melakukan scanning semantik terpercaya terhadap komentar bintang ulasan rujukan kader. Jika ada kata rujukan 'penyok', 'lambat', 'kadang mati', sentimen rujukan ditandai merah." }
  ];
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);

  const handleSendAiPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMsg = { sender: "user", text: aiInput };
    setAiHistory(prev => [...prev, userMsg]);
    setInputAiLoadingState();
  };

  const setInputAiLoadingState = () => {
    setAiAnswering(true);
    const question = aiInput;
    setAiInput("");

    setTimeout(() => {
      let answer = "Terimakasih atas pertanyaannya! Untuk panduan tersebut, mohon periksa Video Tutorial nomor 2 di bawah atau buatlah tiket keluhan finansial di sebelah kanan.";
      
      const q = question.toLowerCase();
      if (q.includes("produk") || q.includes("tambah")) {
        answer = "💡 Panduan Tambah Produk: Klik 'Tambah Produk', isikan detail deskripsi barang, SKU, harga, dan silakan menekan tombol 'AI Product Description Generator' untuk merangkai copywrite pemasaran otomatis. Selesai!";
      } else if (q.includes("dompet") || q.includes("tarik") || q.includes("saldo")) {
        answer = "💰 Panduan Tarik Saldo: Masuk ke tab Keuangan, tentukan nilai nominal penarikan, pilih rekening bank default terdaftar (BCA/Mandiri), lalu konfirmasi. Dana akan meluncur ke rekening dalam waktu 1x24 jam.";
      } else if (q.includes("jasa") || q.includes("boking") || q.includes("kalender")) {
        answer = "📅 Panduan Sistem Jasa: Di tab 'Manajemen Jasa', Anda bisa memblokir jadwal kalender tidak operasional dan membuat custom intake form berisi daftar pertanyaan wajib untuk checkout pembeli jasa.";
      }

      setAiHistory(prev => [...prev, { sender: "ai", text: answer }]);
      setAiAnswering(false);
      onTriggerNotification("AI Assistant membalas pertanyaan pendukung!");
    }, 1200);
  };

  const handleAddNewTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.title) return;

    const created = {
      id: `TCK-${Math.floor(8000 + Math.random() * 920)}`,
      title: newTicket.title,
      category: newTicket.category,
      priority: newTicket.priority,
      status: "open" as const,
      date: "2026-05-25"
    };

    setTickets(prev => [created, ...prev]);
    setShowAddTicket(false);
    onTriggerNotification("Tiket keluhan pelanggan berhasil diluncurkan ke bantuan live!");
    setNewTicket({ title: "", category: "Keuangan", priority: "medium" });
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-sans">Pusat Bantuan Swadaya &amp; AI Coach</h2>
        <p className="text-xs text-slate-400 font-medium">Temukan panduan video pengoperasian sistem, bicaralah dengan chatbot kecerdasan buatan, atau luncurkan tiket aduan teknis.</p>
      </div>

      {/* Main chat center and tutorials grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left conversational chatbot chatbot - cols 7 */}
        <div className={`p-6 rounded-[2rem] border lg:col-span-7 flex flex-col h-[520px] ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"
        }`}>
          <div className="flex border-b pb-3 mb-4 justify-between items-center dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Bot size={18} className="animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black">AI Seller Assistant</span>
                <span className="text-[9px] text-slate-400 font-bold">Chatbot Pemandu Swadaya Mandiri</span>
              </div>
            </div>
            <Sparkles size={16} className="text-blue-500 animate-pulse" />
          </div>

          <div className="flex-grow overflow-y-auto space-y-4 mb-4">
            {aiHistory.map((item, index) => (
              <div key={index} className={`flex ${item.sender === "ai" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-xs p-3 rounded-2xl text-[11px] leading-relaxed font-semibold shadow-inner ${
                  item.sender === "ai" 
                    ? "bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none" 
                    : "bg-blue-600 text-white rounded-tr-none"
                }`}>
                  {item.text}
                </div>
              </div>
            ))}
            {aiAnswering && (
              <div className="flex justify-start">
                <div className="p-3 bg-slate-100 rounded-xl text-[10px] text-slate-400 font-bold flex items-center gap-1.5 animate-pulse">
                  Bot Asisten sedang merangkai jawaban...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendAiPrompt} className="flex gap-2.5 items-center shrink-0 border-t pt-3 dark:border-slate-850">
            <input 
              type="text" 
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Tanyakan bantuan rujukan cara mencairkan saldo, dsb..."
              className="flex-grow px-3.5 py-1.5 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 border text-xs font-semibold rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button 
              type="submit"
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md cursor-pointer shrink-0"
            >
              <Send size={14} />
            </button>
          </form>
        </div>

        {/* Right Ticketing technical board - cols 5 */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-6 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"} text-left`}>
            <div className="flex border-b pb-3 mb-4 justify-between items-center dark:border-slate-800">
              <h3 className="text-sm font-black tracking-tight text-slate-805">Tiket Hubungan Bantuan</h3>
              <button 
                onClick={() => setShowAddTicket(!showAddTicket)}
                className="text-[10px] text-blue-500 font-bold hover:underline"
              >
                + Buat Tiket
              </button>
            </div>

            {showAddTicket && (
              <form onSubmit={handleAddNewTicketSubmit} className="space-y-3 mb-4 p-3 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-805">
                <input 
                  type="text" 
                  required
                  placeholder="Keluhan teknis/finansial..." 
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  className="w-full px-2 py-1.5 border rounded-lg text-xs"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <select 
                    value={newTicket.category} 
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                    className="w-full p-1 border rounded-lg text-[10px] font-bold"
                  >
                    <option value="Keuangan">Keuangan</option>
                    <option value="Integrasi">Integrasi</option>
                    <option value="Sistem">Sistem</option>
                  </select>
                  <button type="submit" className="w-full py-1 bg-blue-600 text-white font-extrabold text-[10px] rounded-lg">Kirim Tikvet</button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {tickets.map(t => (
                <div 
                  key={t.id} 
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border dark:border-slate-850 text-xs font-semibold leading-relaxed"
                >
                  <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 font-mono">
                    <span>{t.id} &bull; {t.category}</span>
                    <span className={`px-1.5 py-0.5 rounded-md ${t.status === "open" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                      {t.status.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="mt-1.5 text-slate-700 dark:text-slate-300 leading-tight">{t.title}</h4>
                  <span className="text-[8px] mt-1.5 block text-slate-405 text-slate-400">Didaarkan: {t.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video tutorials grid bottom */}
      <div className={`p-6 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-101"} text-left`}>
        <div className="flex justify-between items-center pb-3 border-b dark:border-slate-800 mb-4">
          <h3 className="text-sm font-black tracking-tight">Klip Video Panduan Swadaya Seller</h3>
          <span className="text-[10px] text-slate-450 text-slate-400">Tutorial Memulai</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TUTORIALS.map((tut) => (
            <div key={tut.id} className="group cursor-pointer space-y-2">
              <div className="relative rounded-2xl overflow-hidden border">
                <img src={tut.videoThumbnail} className="w-full h-36 object-cover transition-transform group-hover:scale-105" alt="" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-2 text-white">
                  <div className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play size={16} fill="white" className="ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white font-mono text-[9px] font-bold rounded">
                  {tut.duration}
                </span>
              </div>
              <div>
                <span className="text-[9px] font-extrabold uppercase text-blue-500 tracking-wider font-mono">{tut.category}</span>
                <h4 className="font-sans font-bold text-slate-800 dark:text-slate-205 text-xs tracking-tight line-clamp-1 mt-0.5">{tut.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Collapsible section */}
      <div className={`p-6 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-101"} text-left`}>
        <h3 className="text-sm font-black tracking-tight mb-4 pb-2 border-b dark:border-slate-800">Pertanyaan Umum (FAQs)</h3>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = faqOpenIdx === i;
            return (
              <div key={i} className="p-3.5 bg-slate-50/50 dark:bg-slate-950/40 rounded-xl border dark:border-slate-850">
                <button
                  onClick={() => setFaqOpenIdx(isOpen ? null : i)}
                  className="w-full flex justify-between items-center text-xs font-black text-slate-800 dark:text-slate-200 text-left outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-slate-400">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <p className="mt-2.5 text-[11px] text-slate-450 text-slate-400 leading-relaxed pl-1">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
