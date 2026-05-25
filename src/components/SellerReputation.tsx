import { useState } from "react";
import { 
  Award, ShieldAlert, Star, MessageSquare, Bot, Sparkles, CheckCircle2, 
  ChevronRight, Reply, Heart, ThumbsUp, Trash2, AlertCircle
} from "lucide-react";
import { MOCK_REVIEWS } from "../data/sellerMockData";

interface SellerReputationProps {
  isDarkMode: boolean;
  onTriggerNotification: (msg: string) => void;
}

export default function SellerReputation({
  isDarkMode,
  onTriggerNotification
}: SellerReputationProps) {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [sentimentFilter, setSentimentFilter] = useState<"semua" | "positive" | "negative">("semua");
  
  // Replying interaction drafs
  const [replyIndex, setReplyIndex] = useState<number | null>(null);
  const [replyInput, setReplyInput] = useState("");

  const handlePublishReplyRating = (e: React.FormEvent, idx: number) => {
    e.preventDefault();
    if (!replyInput.trim()) return;

    setReviews(prev => prev.map((rev, i) => {
      if (i === idx) {
        onTriggerNotification(`Sukses mengirim balasan ulasan ke ${rev.customerName}!`);
        return { ...rev, reply: replyInput };
      }
      return rev;
    }));
    setReplyIndex(null);
    setReplyInput("");
  };

  const filteredReviews = reviews.filter(rev => {
    if (sentimentFilter === "semua") return true;
    return rev.sentiment === sentimentFilter;
  });

  const ratingAggregates = {
    average: 4.8,
    totalCount: 384,
    responseRate: "99.4%",
    latency: "8 menit"
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 font-sans font-sans">Ulasan &amp; Reputasi Toko (AI Sentiment)</h2>
        <p className="text-xs text-slate-400 font-medium font-sans">Monitor statistik kepuasan pelanggan, analisis ulasan dengan sentimen AI, dan balas review secara instan.</p>
      </div>

      {/* Aggregate review widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-[2rem] border text-center flex flex-col justify-center items-center ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
        }`}>
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Peringkat Reputasi</span>
          <h3 className="text-5xl font-black font-mono leading-none text-amber-500 flex items-center gap-1">
            {ratingAggregates.average} <Star size={28} fill="#f59e0b" className="text-amber-500" />
          </h3>
          <span className="text-[10px] text-slate-400 mt-2 font-bold block">{ratingAggregates.totalCount} Penilaian Rujukan</span>
          
          <div className="mt-4 flex gap-1 bg-amber-500/10 px-3 py-1.5 rounded-full text-amber-600 font-black text-[9px] uppercase tracking-wider scale-95">
            <Award size={12} /> Badge Level: Gold Seller Pro
          </div>
        </div>

        <div className={`p-6 rounded-[2rem] border text-left flex flex-col justify-between ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
        }`}>
          <div>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-3">Rasio Balasan Ulasan</span>
            <div className="flex justify-between text-xs font-bold font-mono">
              <span>Kecepatan Balas:</span>
              <span className="text-blue-600">{ratingAggregates.latency}</span>
            </div>
            <div className="flex justify-between text-xs font-bold font-mono mt-2">
              <span>Tingkat Resolusi:</span>
              <span className="text-blue-600">{ratingAggregates.responseRate}</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border dark:border-slate-850 mt-4">
            <p className="text-[9px] leading-relaxed text-slate-400 font-bold">&bull; 47 ulasan baru minggu ini dipindai AI berkonotasi sangat ramah.</p>
          </div>
        </div>

        {/* Sentiment Analysis indicators widget */}
        <div className={`p-6 rounded-[2rem] border text-left ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-101"
        }`}>
          <div className="flex justify-between items-center pb-2 border-b dark:border-slate-800 mb-3">
            <span className="text-[10px] uppercase font-black tracking-widest text-blue-500 flex items-center gap-1 animate-pulse">
              <Sparkles size={12} /> AI Sentiment Meter
            </span>
          </div>
          
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-[11px] font-bold">
              <span className="text-emerald-500">Sentimen Positif (Puas)</span>
              <span className="font-mono">94.8%</span>
            </div>
            <div className="h-2 w-full bg-slate-50 dark:bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "94.8%" }} />
            </div>

            <div className="flex justify-between items-center text-[11px] font-bold mt-2">
              <span className="text-red-500">Sentimen Negatif (Dispute)</span>
              <span className="font-mono">5.2%</span>
            </div>
            <div className="h-2 w-full bg-slate-50 dark:bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full" style={{ width: "5.2%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Lookup controls filters */}
      <div className="flex border-b border-slate-100 dark:border-slate-850 pb-2 flex-wrap gap-2 pt-4">
        {[
          { id: "semua", name: "Semua Sentimen" },
          { id: "positive", name: "Puas Saja (Positif 🟢)" },
          { id: "negative", name: "Dispute Saja (Negatif 🔴)" }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSentimentFilter(cat.id as any)}
            className={`px-3 py-1 bg-slate-100 dark:bg-slate-950 hover:bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${
              sentimentFilter === cat.id ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm" : "text-slate-400"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Review list cards layout */}
      <div className="grid grid-cols-1 gap-4">
        {filteredReviews.map((rev, idx) => (
          <div 
            key={rev.id} 
            className={`p-6 rounded-3xl border text-left transition-all ${
              isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b dark:border-slate-850 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold text-slate-800 dark:text-slate-200">{rev.customerName}</span>
                <span className="text-slate-300">|</span>
                <span className="text-[10px] text-slate-400 font-bold font-mono">{rev.date} &bull; Item: {rev.item}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} size={12} fill="#f59e0b" className="text-amber-500" />)}
                </div>
                
                {/* Sentiment tag badge */}
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                  rev.sentiment === "positive" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-650 text-red-650 bg-red-50 text-red-600"
                }`}>
                  {rev.sentiment === "positive" ? "Sentiment: Positif 🟢" : "Sentiment: Negatif 🔴"}
                </span>
              </div>
            </div>

            <p className="py-3 text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
              "{rev.comment}"
            </p>

            {/* Replies summary */}
            {rev.reply ? (
              <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-dashed rounded-2xl dark:border-slate-800 flex flex-col gap-1.5 mt-2 ml-4">
                <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                  <Reply size={12} className="rotate-180" /> Balasan Anda:
                </span>
                <p className="text-[10px] font-medium leading-relaxed dark:text-slate-300">
                  {rev.reply}
                </p>
              </div>
            ) : (
              <div className="mt-2 text-right">
                {replyIndex === idx ? (
                  <form onSubmit={(e) => handlePublishReplyRating(e, idx)} className="flex gap-2 items-center pl-4 mt-2">
                    <input 
                      type="text" 
                      placeholder="Tulis balasan sopan ke pembeli..." 
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      className="flex-grow px-3 py-1.5 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 outline-none text-xs font-semibold focus:ring-2 focus:ring-blue-600"
                    />
                    <button 
                      type="submit"
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer"
                    >
                      Kirim Balasan
                    </button>
                    <button type="button" onClick={() => setReplyIndex(null)} className="text-[10px] text-slate-400 font-bold pl-2">Batal</button>
                  </form>
                ) : (
                  <button 
                    onClick={() => { setReplyIndex(idx); setReplyInput(""); }}
                    className="px-3 py-1 border rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-500 cursor-pointer text-slate-600 dark:text-slate-350"
                  >
                    Balas Ulasan &rarr;
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
