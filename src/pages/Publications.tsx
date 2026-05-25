import { Routes, Route, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, User, FileText, ImageIcon, Eye, Quote, ChevronDown, ChevronUp, X, BookOpen, Clock } from "lucide-react";

export default function Publications() {
  return (
    <div className="py-20 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="berita" element={<ContentView type="news" title="Berita Terkini" />} />
          <Route path="artikel" element={<ContentView type="articles" title="Artikel & Jurnal" />} />
          <Route path="pengumuman" element={<ContentView type="announcements" title="Pengumuman Resmi" />} />
          <Route path="opini" element={<ContentView type="opinions" title="Opini Alumni" />} />
          <Route path="galeri" element={<GaleriView />} />
        </Routes>
      </div>
    </div>
  );
}

function ContentView({ type, title }: { type: string, title: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [modalMode, setModalMode] = useState<"summary" | "full" | null>(null);

  const handleOpenItem = (item: any, mode: "summary" | "full") => {
    setSelectedItem(item);
    setModalMode(mode);
  };

  const handleCloseItem = () => {
    setSelectedItem(null);
    setModalMode(null);
  };

  useEffect(() => {
    fetch(`/api/content/${type}`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, [type]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-6">
       <div className="w-16 h-16 border-4 border-primary border-t-accent rounded-full animate-spin"></div>
       <p className="text-primary font-bold text-lg animate-pulse">Menghimpun Berkas Digital...</p>
    </div>
  );

  const displayedItems = type === "opinions" 
    ? (showAll ? items : items.slice(0, 10)) 
    : items;

  return (
    <div className="space-y-20">
      <div className="flex flex-col gap-6 items-center text-center">
        <div className="space-y-4">
          <h2 className="text-6xl font-display font-bold text-primary italic leading-tight">{title}</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full shadow-lg shadow-accent/20"></div>
        </div>
        <p className="text-gray-500 text-xl max-w-2xl font-medium leading-relaxed italic">
          {type === "opinions" 
            ? "Arsip pemikiran kritis, kontribusi gagasan, dan opini solutif dari para alumni IKA PMII Bandung Barat."
            : "Arsip gagasan dan warta pergerakan IKA PMII Kabupaten Bandung Barat."}
        </p>
      </div>

      {type === "opinions" ? (
        <div className="space-y-12">
          {/* 10 Items in exactly 5 columns on desktop, making 2 rows of 5! */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {displayedItems.map((item, i) => {
              // Minimal initials for avatar
              const initials = item.author ? item.author.split(" ").slice(0, 2).map((n: string) => n[0]).join("") : "A";
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 5) * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-[2rem] border border-gray-150/85 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden p-6 relative justify-between text-left"
                >
                  <div className="space-y-4 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Quiet header accent */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-[10px] font-black text-primary uppercase">
                          {initials}
                        </div>
                        <Quote size={18} className="text-accent/40 group-hover:text-accent group-hover:rotate-12 transition-all duration-300 transform" />
                      </div>
                      
                      <h3 
                        onClick={() => handleOpenItem(item, "summary")}
                        className="text-base font-bold font-sans tracking-tight text-primary leading-snug hover:text-accent transition-colors line-clamp-3 cursor-pointer"
                        title="Klik untuk Ringkasan Tulisan"
                      >
                        {item.title}
                      </h3>
                    </div>
                    
                    <p className="text-xs text-gray-550 leading-relaxed font-sans line-clamp-4 italic border-l-2 border-accent/30 pl-3">
                      &ldquo;{item.content}&rdquo;
                    </p>
                  </div>

                  {/* Divider and clean micro meta */}
                  <div className="pt-4 mt-5 border-t border-gray-50 flex flex-col gap-1 shrink-0">
                    <span className="text-[10px] font-bold text-primary truncate" title={item.author}>
                      {item.author}
                    </span>
                    <span className="text-[8px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar size={10} className="text-accent" /> {new Date(item.date).toLocaleDateString("id-ID", { month: "short", year: "numeric" })}
                    </span>
                    <button 
                      onClick={() => handleOpenItem(item, "full")}
                      className="text-left text-[9px] font-black text-accent hover:text-primary uppercase tracking-widest flex items-center gap-1.5 cursor-pointer mt-1 hover:underline transition-colors"
                    >
                      Baca Selengkapnya &rarr;
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {items.length > 10 && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-3 bg-primary text-accent hover:bg-primary/95 text-xs font-bold px-8 py-3.5 rounded-full transition-all duration-350 shadow-lg shadow-primary/20 cursor-pointer active:scale-95"
              >
                {showAll ? (
                  <>
                    Sembunyikan Opini Lainnya <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Tampilkan Seluruh Opini ({items.length} Konten) <ChevronDown size={16} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayedItems.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12 }}
              className="group bg-white rounded-[3.5rem] overflow-hidden border border-gray-100 shadow-2xl flex flex-col h-full hover:shadow-primary/10 transition-all duration-500"
            >
              {item.image && (
                 <div className="aspect-[4/3] overflow-hidden relative">
                   <img 
                     src={item.image} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                     alt={item.title} 
                     referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <div className="absolute top-6 left-6 bg-accent text-primary text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-xl">
                     {item.category || type}
                   </div>
                 </div>
              )}
              <div className="p-10 space-y-6 flex-grow flex flex-col">
                <div className="space-y-2">
                  <div className="flex items-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-accent"/> {new Date(item.date).toLocaleDateString()}</span>
                    {item.author && <span className="flex items-center gap-2"><User size={14} className="text-accent"/> {item.author}</span>}
                  </div>
                  <button 
                    onClick={() => handleOpenItem(item, "full")}
                    className="text-left text-[9px] font-black text-accent hover:text-primary uppercase tracking-widest hover:underline cursor-pointer transition-colors"
                  >
                    Baca Selengkapnya &rarr;
                  </button>
                </div>
                <h3 
                  onClick={() => handleOpenItem(item, "summary")}
                  className="text-2xl font-bold font-display leading-tight text-primary hover:text-accent transition-colors cursor-pointer"
                  title="Klik untuk Ringkasan Tulisan"
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed font-medium">
                  {item.content}
                </p>
                <div className="pt-8 mt-auto flex items-center justify-between border-t border-gray-50">
                  {type === "announcements" ? (
                     <div className="flex gap-2 w-full">
                       <a href={item.documentUrl} className="bg-primary text-accent px-6 py-3 rounded-xl font-bold text-[10px] flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all uppercase tracking-widest">Unduh <FileText size={14}/></a>
                       <button onClick={() => handleOpenItem(item, "full")} className="border border-gray-200 text-primary px-6 py-3 rounded-xl font-bold text-[10px] flex items-center gap-2 hover:bg-gray-100/10 hover:border-primary transition-all uppercase tracking-widest cursor-pointer">Baca <Eye size={14}/></button>
                     </div>
                  ) : (
                    <button 
                      onClick={() => handleOpenItem(item, "full")}
                      className="text-primary font-bold text-[10px] uppercase tracking-widest flex items-center gap-3 group/btn cursor-pointer"
                    >
                      Selengkapnya 
                      <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:border-accent transition-all">
                        <Eye size={14} className="group-hover/btn:scale-110 transition-transform"/>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Immersive Detail Modal Dialog */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none overflow-y-auto">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseItem}
              className="fixed inset-0 bg-primary/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="bg-white rounded-[2.5rem] shadow-2xl relative w-full max-w-3xl overflow-hidden z-10 flex flex-col max-h-[85vh] text-left border border-white/10 select-text"
            >
              {/* Image banner inside modal if FULL MODE and image exists */}
              {modalMode === "full" && selectedItem.image ? (
                <div className="h-64 sm:h-80 w-full relative overflow-hidden shrink-0">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    <span className="bg-accent text-primary text-[9px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg">
                      {selectedItem.category || type}
                    </span>
                  </div>
                  <button 
                    onClick={handleCloseItem}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 hover:bg-accent text-white hover:text-primary flex items-center justify-center transition-all duration-300 pointer-events-auto border border-white/10 z-20 cursor-pointer"
                    title="Tutup"
                  >
                    <X size={18} />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-white/70 uppercase tracking-wider font-mono">
                      <span className="flex items-center gap-1.5"><Calendar size={12} className="text-accent" /> {new Date(selectedItem.date).toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      {selectedItem.author && <span className="flex items-center gap-1.5"><User size={12} className="text-accent" /> {selectedItem.author}</span>}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight leading-tight">
                      {selectedItem.title}
                    </h3>
                  </div>
                </div>
              ) : (
                /* Header layout if no image or in summary mode */
                <div className="p-6 sm:p-8 border-b border-gray-100 flex items-start justify-between gap-4 shrink-0 bg-slate-50/50">
                  <div className="space-y-2">
                    {/* Mode pill indicator */}
                    <div className="flex items-center gap-2">
                      <span className="bg-accent/10 border border-accent/20 text-accent text-[8px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                        {modalMode === "summary" ? "IKHTISAR KONTEN (RINGKAS)" : "KONTEKSTUAL LENGKAP"}
                      </span>
                      <span className="bg-primary/5 text-primary/60 text-[8px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                        {selectedItem.category || type}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-primary font-sans tracking-tight leading-snug">
                      {selectedItem.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-550 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Calendar size={12} className="text-accent" /> {new Date(selectedItem.date).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      {selectedItem.author && <span className="flex items-center gap-1.5"><User size={12} className="text-accent" /> {selectedItem.author}</span>}
                    </div>
                  </div>
                  <button 
                    onClick={handleCloseItem}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-accent text-gray-500 hover:text-primary flex items-center justify-center transition-all duration-300 pointer-events-auto shrink-0 border border-gray-150 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              {/* Scrollable Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-gray-750 leading-relaxed font-sans text-sm sm:text-base">
                {modalMode === "summary" ? (
                  // Summary Mode Template Content
                  <div className="space-y-6">
                    {/* Highlight Quotation Visual Card */}
                    <div className="bg-accent/5 rounded-2xl border-l-4 border-accent p-6 space-y-2">
                      <Quote size={28} className="text-accent/30 mb-1" />
                      <p className="font-serif italic text-gray-700 text-base leading-relaxed">
                        &ldquo;{selectedItem.content}&rdquo;
                      </p>
                      {selectedItem.author && (
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest text-right mt-2">
                          — {selectedItem.author}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4 text-justify">
                      <h4 className="text-xs font-black uppercase text-primary/45 tracking-[0.25em] flex items-center gap-2">
                        <BookOpen size={14} className="text-accent" /> IKHTISAR DISKUSI & GAGASAN
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-550 leading-relaxed font-sans">
                        Publikasi ini diproyeksikan untuk menyampaikan gagasannya secara padat. Topik utama tulisan menguraikan seputar penguatan moral-intelektual, sinergisitas struktur IKA PMII Kabupaten Bandung Barat di segala lini instansi, serta merawat jejaring alumni untuk mewujudkan kemandirian ekonomi pasca-akademik di Tatar Sunda.
                      </p>
                      <p className="text-xs sm:text-sm text-gray-550 leading-relaxed font-sans mb-1">
                        Pesan mendalam yang digarisbawahi oleh penulis adalah urgensi agar tidak melupakan nilai-nilai dasar perjuangan Aswaja (Ahlussunnah wal Jama'ah) dan semangat khidmat tanpa batas di tatar Bandung Barat.
                      </p>
                    </div>

                    {/* Metadata stats */}
                    <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between border border-gray-100">
                      <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-accent" /> 1 Menit Membaca</span>
                      </div>
                      <button 
                        onClick={() => setModalMode("full")}
                        className="bg-primary hover:bg-primary/95 text-accent text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        Baca Tulisan Utuh &rarr;
                      </button>
                    </div>
                  </div>
                ) : (
                  // Full Mode Template Content
                  <div className="space-y-6">
                    {/* Introduction Paragraph formatting */}
                    <p className="font-sans text-base sm:text-lg font-medium text-primary/95 leading-relaxed border-l-4 border-accent pl-4 py-1">
                      {selectedItem.content}
                    </p>

                    {/* Highly polished, structured complete paragraphs */}
                    <div className="space-y-4 text-gray-600 font-sans text-xs sm:text-sm leading-relaxed text-justify">
                      <p>
                        Pondasi gerakan moral dan spiritual yang diwariskan oleh para pendiri pergerakan senantiasa membimbing dinamika berpikir para alumni Ikatan Keluarga Alumni Pergerakan Mahasiswa Islam Indonesia (IKA PMII) Kabupaten Bandung Barat. Di tengah transisi sosial-ekonomi yang bergulir pesat menyongsong Indonesia Emas dan tantangan bonus demografi lokal, kolaborasi aktif yang bersinergi dalam bingkai kemandirian berdikari menjadi harga mati yang tidak bisa ditawar lagi.
                      </p>
                      <p>
                        Secara sosiologis, pemetaan talenta alumni dalam portal "Rumah Digital" ini dirancang untuk memutus mata rantai asimetri informasi yang kerap menjadi kendala koordinasi lintas generasi. Dengan adanya platform terintegrasi, potensi di ranah akademisi, birokrasi, sosiopreneur, legislatif, hingga praktisi pertanian modern di tatar Bandung Barat dapat dipayungi secara sinergis demi akselerasi kemaslahatan warga.
                      </p>
                      <p>
                        Gagasan ini tidak sekadar menjadi lembaran wacana di atas kertas jurnalisme. Lebih jauh, tulisan ini adalah seruan moral bagi seluruh pengurus cabang, dewan pakar, serta dewan pembina PC IKA PMII Bandung Barat untuk mengkonsolidasikan gerakan nyata secara terukur. Kita harus bersungguh-sungguh mengantarkan tatar Sunda khususnya Kabupaten Bandung Barat yang berkeadilan sosial, adil, makmur, dan senantiasa diridhoi oleh Allah SWT.
                      </p>
                    </div>

                    {/* Custom quote layout */}
                    <div className="font-serif italic text-primary/80 bg-accent/5 p-6 rounded-3xl border border-accent/25 relative text-justify">
                      <Quote size={20} className="text-accent/30 absolute top-4 left-4" />
                      <p className="pl-6 block">
                        &ldquo;Keberdayaan alumni tidak terwujud secara instan dari satu malam diskursus. Ia dipahat melalui jalinan karsa, sinergi dalam aksi riil, serta komitmen mencerdaskan kehidupan tatanan bermasyarakat secara berdikari.&rdquo;
                      </p>
                    </div>

                    {/* Announcement Document URL Attachment action if present in item */}
                    {selectedItem.documentUrl && (
                      <div className="bg-primary text-white p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 text-left">
                          <p className="text-accent text-[9px] font-black uppercase tracking-widest">Akses Dokumen Resmi</p>
                          <h4 className="text-xs font-bold font-sans">Unduh Berkas Surat Keputusan / Edaran Terkait</h4>
                        </div>
                        <a 
                          href={selectedItem.documentUrl} 
                          className="bg-accent text-primary text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all self-start sm:self-auto shadow-lg"
                        >
                          Unduh Dokumen <FileText size={14} />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="p-6 border-t border-gray-100 flex items-center justify-between shrink-0 bg-gray-50/50">
                {modalMode === "full" ? (
                  <button 
                    onClick={() => setModalMode("summary")}
                    className="text-primary hover:text-accent font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:underline"
                  >
                    &larr; Lihat Ringkasan
                  </button>
                ) : (
                  <div /> // empty space
                )}
                <button
                  onClick={handleCloseItem}
                  className="bg-primary text-white hover:bg-primary/95 text-xs font-black px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-primary/20 active:scale-95"
                >
                  Tutup Pembaca
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GaleriView() {
  const galeriItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      title: "Musyawarah Cabang Ke-II IKA PMII KBB",
      date: "14 Maret 2026",
      location: "Padalarang, KBB",
      desc: "Konsolidasi akbar alumni PMII se-Bandung Barat untuk merumuskan arah juang kepengurusan baru masa khidmat 2026-2031."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800",
      title: "Pelantikan Pengurus Baru & Stadium General",
      date: "05 April 2026",
      location: "Ngamprah, KBB",
      desc: "Upacara khidmat pelantikan dewan pengurus harian serta dewan pakar PC IKA PMII Bandung Barat yang berjalan lancar."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      title: "Launching Sistem Kemandirian Alumni (SIAP)",
      date: "12 Mei 2026",
      location: "Lembang, KBB",
      desc: "Peresmian sistem informasi SIAP untuk digitalisasi e-KTA anggota serta memperkuat basis data alumni."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      title: "Rapat Kerja Cabang & Sinkronisasi Agenda",
      date: "19 Mei 2026",
      location: "Cipatat, KBB",
      desc: "Perumusan program kerja tahunan strategis dari masing-masing bidang departemen guna kemaslahatan kader."
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      title: "Inkubasi Bisnis Koperasi KAMARA",
      date: "25 Mei 2026",
      location: "Batujajar, KBB",
      desc: "Pelatihan kewirausahaan terpadu dalam memajukan rantai niaga dan retail perdagangan mandiri alumni PMII."
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1469571486040-af250c537dbf?auto=format&fit=crop&q=80&w=800",
      title: "Pemberian Sembako & Bakti Sosial LBH",
      date: "01 Juni 2026",
      location: "Cikalongwetan, KBB",
      desc: "Giat kepedulian sosial kemasyarakatan melalui pembagian paket pangan dan advokasi hukum gratis bagi warga pra-sejahtera."
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1544535830-9df3f5686859?auto=format&fit=crop&q=80&w=800",
      title: "Kajian Rutin & Dialog Islam Kebangsaan",
      date: "10 Juni 2026",
      location: "Cisarua, KBB",
      desc: "Kajian bulanan dalam mengokohkan ideologi ahlussunnah wal jamaah an-nahdliyah serta wawasan kebangsaan."
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800",
      title: "Studi Banding & Kolaborasi Antar Cabang",
      date: "18 Juni 2026",
      location: "Cihampelas, KBB",
      desc: "Benchmarking program pemberdayaan UMKM alumni ke PC IKA PMII percontohan wilayah Jawa Barat."
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
      title: "Sosialisasi Kesetaraan Gender & Kepemimpinan",
      date: "26 Juni 2026",
      location: "Parongpong, KBB",
      desc: "Seminar penguatan kapasitas kepemimpinan perempuan dalam ranah publik dan perumusan kebijakan daerah."
    }
  ];

  return (
    <div className="space-y-16">
      <div className="flex flex-col gap-4 items-center text-center">
        <h2 className="text-6xl font-display font-bold text-primary italic leading-tight">Galeri Kegiatan</h2>
        <div className="w-24 h-1.5 bg-accent rounded-full shadow-lg shadow-accent/20"></div>
        <p className="text-gray-500 text-lg max-w-2xl font-medium leading-relaxed italic mt-2">
          Melalui lensa pergerakan, abadikan dedikasi, silaturahmi, dan kontribusi nyata alumni PMII Kabupaten Bandung Barat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {galeriItems.map((item) => (
          <div key={item.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={item.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                alt={item.title} 
                title={item.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-6 left-6 bg-accent text-primary text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                {item.location}
              </div>
            </div>
            
            <div className="p-8 space-y-4 flex-grow flex flex-col">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                {item.date}
              </div>
              
              <h3 className="text-lg font-bold font-display text-primary leading-snug group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              
              {/* Keterangan singkat aktifitas kegiatan */}
              <p className="text-xs text-gray-550 leading-relaxed font-sans line-clamp-3 bg-surface/40 p-4 rounded-2xl border border-gray-50 flex-grow text-gray-500">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
