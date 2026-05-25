import { Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { User, Shield, Briefcase, Target, Flag, Scale, Gavel, MapPin, Users, Search, Award, BookOpen, X, Mail, Phone, Calendar, Hash, UserCheck, Globe, Building2, GraduationCap, HeartHandshake } from "lucide-react";
import { ReactNode, useState, useEffect } from "react";
import { RANTING_DATA } from "../data/rantingData";
import { getAlumniProfileByName, AlumniProfile } from "../data/alumniProfiles";

export default function Profile() {
  const location = useLocation();

  const mockPengurus = [
    { name: "Sdr. Nama Pengurus 1", role: "Ketua Umum", image: "https://i.pravatar.cc/300?u=1" },
    { name: "Sdr. Nama Pengurus 2", role: "Sekretaris Umum", image: "https://i.pravatar.cc/300?u=2" },
    { name: "Sdr. Nama Pengurus 3", role: "Bendahara Umum", image: "https://i.pravatar.cc/300?u=3" },
    { name: "Sdr. Nama Pengurus 4", role: "Wakil Ketua I", image: "https://i.pravatar.cc/300?u=4" },
    { name: "Sdr. Nama Pengurus 5", role: "Wakil Ketua II", image: "https://i.pravatar.cc/300?u=5" },
    { name: "Sdr. Nama Pengurus 6", role: "Wakil Ketua III", image: "https://i.pravatar.cc/300?u=6" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="py-24 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          {/* Top Headline Banner (Gelap Biru) */}
          <div className="w-fit bg-gradient-to-br from-[#0c2340] via-[#021124] to-[#041a35] p-6 md:p-8 rounded-[2rem] border border-white/5 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,204,0.15),transparent_50%)]"></div>
             <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
               <Shield size={100} />
             </div>
             
             <div className="relative z-10 space-y-2 text-left">
               <h1 className="text-2xl md:text-4xl font-display font-black leading-none italic text-white text-left">
                 Struktur Organisasi
               </h1>
             </div>
          </div>
 
          {/* Content Area */}
          <main className="w-full bg-white p-6 md:p-12 rounded-[2.5rem] border border-gray-100/80 shadow-xl">
            <Routes>
              {/* Profil & Organisasi */}
              <Route path="selayang-pandang" element={<SelayangPandangSection />} />
              <Route path="visi-misi" element={<VisiMisiSection />} />
              <Route path="kilas-kbb" element={<KilasKBBSection />} />

              {/* Pengurus */}
              <Route path="pc" element={<PCSection />} />
              <Route path="pac" element={<PACSection />} />
              <Route path="ranting" element={<RantingSection />} />
              <Route path="lbh" element={<LBHSection />} />
              <Route path="puslitdiklat" element={<PuslitdiklatSection />} />
              <Route path="koperasi" element={<KoperasiSection />} />

              {/* Panca Karsa */}
              <Route path="pancakarsa" element={<InfoSection title="Program Kerja Unggulan (Panca Karsa)" desc="Aksi nyata PC IKA PMII Kabupaten Bandung Barat untuk periode khidmat 2026-2031." content={<ProgramKerjaSection />} />} />

              {/* Fallback routes for legacy paths */}
              <Route path="/visi-misi-program/visi-misi" element={<VisiMisiSection />} />
              <Route path="/visi-misi-program/program-kerja" element={<InfoSection title="Program Kerja Unggulan (Panca Karsa)" desc="Aksi nyata PC IKA PMII Kabupaten Bandung Barat untuk periode khidmat 2026-2031." content={<ProgramKerjaSection />} />} />

              {/* Home within Profile */}
              <Route path="/" element={<PCSection />} />
            </Routes>
          </main>
        </div>
      </div>

      {/* Floating profile handled globally via AlumniProfileModal inside App.tsx */}
    </div>
  );
}

function PCSection() {
  const majelisPertimbangan = {
    ketua: "Drs. H. Agus Gunawan",
    wakilKetua: "Dani Rosyadi Imran, S.Ag",
    sekretaris: "H. Edi Rusyandi, S.Pd.I",
    wakilSekretaris: "H. Asep Haedar, M.MPd"
  };

  const dewanPakar = {
    ketua: "Drs H. A. Saepul Millah",
    sekretaris: "Rifqi A. Sulaeman, S.Sos",
    anggota: [
      "Asep Dedi", "H. Boy Harinovian, SE", "H. Deden Syarif Hidayatulloh, MM", "H. Mukti Hartono, MM",
      "Drs. H. A. Saeful Mu’min", "Drs. H. Rahmat Syafei", "Asep Nurfalah, S.Pd.I", "Cecep A Nugraha, S.Sy",
      "Dr. Fikri Rizki Muhammad", "Dr. Komarudin, M.Pd", "Ir. H. Sarwendi", "Abdul Somad, S.Sos.I", "Ahmad Zaenudin"
    ]
  };

  const pengurusHarian = {
    ketua: "H. Saiful Rachman, M.Ag",
    sekretaris: "Sandi Supyandi, S.Kom., M.H",
    bendahara: "Masturi Fajrin, S.Pd.I",
    wakilKetua: ["Zaki Mubarok, S.Sos", "Soleh Budiman, S.Sos.I", "Asep Bunyamin, S.Pd.I", "Awan Gunawan, M.Ag", "H. Ruba Nurzaman, M.MPd", "Wisnu Bayu Aji, S.H"],
    wakilSekretaris: ["H. Rifkiyal Robani, S.Pd.I", "Syamsu Ramdani, S.Pd.I", "Thorif Abdul Latif", "Muhamad Faiz Al-Afify, M.Pd", "Dede Muhammad, S.Pd.I", "Rahmat Sulaeman, S.Sy", "Ahmad Kodir Nuramdani, M.Pd"],
    wakilBendahara: ["Dini Nurmala Sari, S.Ag., M.Sos", "Fenny Indriyanti", "Dini Nadila, S.E"]
  };

  const departemen = [
    {
      title: "Penataan Organisasi, Penguatan Jaringan Internal, Distribusi dan Pendayagunaan Potensi Kader",
      koordinator: "Muhamad Fadila Rasyid, S.Ap",
      anggota: ["Agung Permana", "Irwansyah", "Ceceng Busyrol Karim", "Iqbal Muhamad Rabani Ilahi", "Siti Nurhabibah"]
    },
    {
      title: "Pengembangan Pemikiran dan Penguatan Ideologi",
      koordinator: "Sofi Fahmi Romadhona, S.Pd",
      anggota: ["M. Haekal Syafi’i", "Budi Burhanudin", "Irfan Muhamad Ramli", "M. Argi Al-Hanif", "Ali Mukbar"]
    },
    {
      title: "Pemerintahan dan Kebijakan Publik",
      koordinator: "Hendri Subagja, MH",
      anggota: ["Ahmad Hadi Hidayat, S.Sos", "Nandang Suhendra, S.Pd.I", "Dea Ferdinan W, S.Pd", "Slamet Jabarulloh"]
    },
    {
      title: "Ekonomi dan Pengembangan Usaha",
      koordinator: "Mamay Yusfan Hadian, S.Pd.I",
      anggota: ["Muhammad Iqbal Nurul Huda, S.Pd.I", "Jajang Sugiarto, S.Pd", "Hifni Mannan Nuzula", "Fauziah Fadilah"]
    },
    {
      title: "Data, Informasi, Komunikasi dan Hubungan Masyarakat",
      koordinator: "Muhammad Akhsan Kamal, S.Pd.I",
      anggota: ["Ridwan Agustin, S.Pd", "Akbar Rizkika, S.Pd.I", "Yusuf Hamdani, S.Pd.I", "Dede Sopian, S.Pd", "Asep Abdurrahman"]
    },
    {
      title: "Pengarusutamaan Gender dan Penguatan Partisipasi Perempuan",
      koordinator: "Hesti Noor Hasanah, S.Pd.I",
      anggota: ["Siti Sumiraah, S.Pd.I", "Inge Pragustini, S.Pd.I", "Lisna Nurbidayanti, S.Pd", "Yuli Yulianti, S.Pd", "Rita Safina, S.Pd"]
    },
    {
      title: "Hukum dan Advokasi",
      koordinator: "Muhammad Iqbal Aula, SH",
      anggota: ["M.E Burhanudin, S.H., MH", "Subki Azfartsani, S.H., MH", "Angga Gustian, S.H., MH", "Suhendra"]
    }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 animate-in fade-in duration-300">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-display font-black text-primary italic leading-tight">Pengurus Cabang<br/><span className="text-sm text-accent font-sans not-italic font-extrabold tracking-widest uppercase block mt-1">Masa Khidmat 2026 - 2031</span></h2>
        <div className="w-16 h-1 bg-accent rounded-full"></div>
      </div>

      {/* Majelis Pertimbangan */}
      <section className="space-y-5">
        <div className="inline-flex items-center gap-2.5 bg-primary text-accent px-5 py-2 rounded-xl shadow-md border border-primary">
           <Shield size={16} />
           <h3 className="font-bold text-xs uppercase tracking-widest italic">Majelis Pertimbangan</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           <PersonCard label="Ketua" name={majelisPertimbangan.ketua} primary />
           <PersonCard label="Wakil Ketua" name={majelisPertimbangan.wakilKetua} />
           <PersonCard label="Sekretaris" name={majelisPertimbangan.sekretaris} />
           <PersonCard label="Wakil Sekretaris" name={majelisPertimbangan.wakilSekretaris} />
        </div>
      </section>

      {/* Dewan Pakar */}
      <section className="space-y-5">
        <div className="inline-flex items-center gap-2.5 bg-surface border border-gray-100 text-primary px-5 py-2 rounded-xl shadow-xs">
           <Target size={16} className="text-accent" />
           <h3 className="font-bold text-xs uppercase tracking-widest italic">Dewan Pakar</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-1 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                 <PersonCard label="Ketua" name={dewanPakar.ketua} primary />
                 <PersonCard label="Sekretaris" name={dewanPakar.sekretaris} />
              </div>
           </div>
           <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Anggota Dewan Pakar</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4">
                 {dewanPakar.anggota.map((name, i) => (
                    <div 
                       key={i} 
                       onClick={() => window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name, defaultLoc: "Ngamprah" } }))}
                       className="flex items-center gap-2 group cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-colors"
                    >
                       <span className="w-1.5 h-1.5 bg-accent/85 rounded-full shrink-0" />
                       <span className="text-xs font-bold text-primary/80 group-hover:text-accent transition-all truncate">{name}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Pengurus Harian */}
      <section className="space-y-5">
        <div className="inline-flex items-center gap-2.5 bg-primary text-accent px-5 py-2 rounded-xl shadow-md border border-primary">
           <User size={16} />
           <h3 className="font-bold text-xs uppercase tracking-widest italic">Pengurus Harian</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
           <PersonCard label="Ketua" name={pengurusHarian.ketua} highlighted />
           <PersonCard label="Sekretaris" name={pengurusHarian.sekretaris} highlighted />
           <PersonCard label="Bendahara" name={pengurusHarian.bendahara} highlighted />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
           <RoleList title="Wakil Ketua" items={pengurusHarian.wakilKetua} accent="border-l-accent" />
           <RoleList title="Wakil Sekretaris" items={pengurusHarian.wakilSekretaris} accent="border-l-primary" />
           <RoleList title="Wakil Bendahara" items={pengurusHarian.wakilBendahara} accent="border-l-gray-300" />
        </div>
      </section>

      {/* Departemen */}
      <section className="space-y-5">
        <div className="inline-flex items-center gap-2.5 bg-surface border border-gray-100 text-primary px-5 py-2 rounded-xl shadow-xs">
           <Briefcase size={16} className="text-accent" />
           <h3 className="font-bold text-xs uppercase tracking-widest italic">Departemen-Departemen</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {departemen.map((dept, i) => (
              <div key={i} className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-4 hover:shadow-md transition-all">
                 <div className="space-y-1">
                    <span className="text-[8px] font-black text-accent uppercase tracking-wider block mb-0.5">Departemen</span>
                    <h4 className="font-extrabold text-sm text-primary leading-tight group-hover:italic transition-all">{dept.title}</h4>
                 </div>
                  <div className="space-y-3 pt-2 border-t border-gray-50">
                    <div 
                       onClick={() => window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name: dept.koordinator } }))}
                       className="px-3.5 py-2 bg-slate-50 border border-gray-100 border-l-[4px] border-l-accent rounded-lg flex items-center justify-between cursor-pointer hover:bg-slate-100 group transition-all"
                    >
                       <div>
                          <p className="text-[8px] font-bold text-accent uppercase tracking-wider">Koordinator</p>
                          <p className="font-extrabold text-primary text-xs group-hover:text-accent transition-colors">{dept.koordinator}</p>
                       </div>
                       <Search size={10} className="text-gray-300 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all shrink-0" />
                    </div>
                    <div className="space-y-1.5 font-sans">
                       <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Anggota</p>
                       <div className="flex flex-wrap gap-1.5">
                          {dept.anggota.map((name, idx) => (
                             <span 
                                key={idx} 
                                onClick={() => window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name } }))}
                                className="text-[9px] font-extrabold text-primary px-2.5 py-1 bg-surface border border-gray-100 rounded-lg hover:bg-accent transition-all cursor-pointer shadow-3xs hover:scale-105"
                             >
                                {name}
                             </span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </section>
    </motion.div>
  );
}

function PersonCard({ label, name, primary, highlighted, defaultLoc }: { label: string, name: string, primary?: boolean, highlighted?: boolean, defaultLoc?: string }) {
  const handleClick = () => {
    if (name && name !== "Dalam Proses") {
      window.dispatchEvent(new CustomEvent("show-alumni-profile", {
        detail: { name, defaultLoc }
      }));
    }
  };
  return (
    <div 
      onClick={handleClick}
      className={`p-4 md:p-5 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer group relative overflow-hidden ${
        primary ? 'bg-primary border-primary text-white shadow-md shadow-primary/10' : 
        highlighted ? 'bg-white border-accent/20 shadow-sm' :
        'bg-white border-gray-100 shadow-xs'
      }`}
    >
       <div className="absolute top-0 right-0 w-8 h-8 bg-accent/0 group-hover:bg-accent/10 rounded-bl-full transition-colors flex items-center justify-center">
         <Search size={10} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 -translate-y-1" />
       </div>
       <p className={`text-[8px] md:text-[9px] font-black uppercase tracking-wider mb-2 ${primary ? 'text-accent' : highlighted ? 'text-accent' : 'text-gray-400'}`}>
          {label}
       </p>
       <p className={`font-extrabold text-sm md:text-base italic leading-tight group-hover:text-accent transition-colors ${primary ? 'text-white' : 'text-primary'}`}>{name}</p>
    </div>
  );
}

function RoleList({ title, items, accent, defaultLoc }: { title: string, items: string[], accent: string, defaultLoc?: string }) {
  const handleClick = (name: string) => {
    window.dispatchEvent(new CustomEvent("show-alumni-profile", {
      detail: { name, defaultLoc }
    }));
  };
  return (
    <div className="space-y-4">
       <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</h4>
       <div className="grid grid-cols-1 gap-2">
          {items.map((name, i) => (
             <div 
               key={i} 
               onClick={() => handleClick(name)}
               className={`px-4 py-2.5 bg-white rounded-xl border border-gray-100 shadow-2xs border-l-[4px] hover:shadow-xs hover:border-l-accent cursor-pointer group flex items-center justify-between transition-all ${accent}`}
             >
                <p className="font-bold text-primary text-xs font-sans group-hover:text-accent transition-colors">{name}</p>
                <Search size={10} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-all shrink-0" />
             </div>
          ))}
       </div>
    </div>
  );
}

function PengurusSection({ title, data }: { title: string, data: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-display font-bold text-primary italic leading-tight">{title}</h2>
        <div className="w-24 h-1.5 bg-accent rounded-full shadow-lg shadow-accent/20"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((p, i) => (
          <div key={i} className="group relative bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col items-center text-center transition-all hover:shadow-2xl hover:scale-105">
            <div className="w-36 h-36 rounded-full overflow-hidden mb-8 border-[6px] border-surface shadow-inner group-hover:border-accent transition-all duration-500">
               <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} title={p.name} referrerPolicy="no-referrer" />
            </div>
            <h4 className="font-bold text-xl text-primary">{p.name}</h4>
            <div className="mt-4 px-4 py-1.5 bg-primary/5 rounded-full group-hover:bg-accent transition-colors">
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">{p.role}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RantingSection() {
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>("Semua");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Group the flat members into villages (Ranting)
  const groupedRanting = RANTING_DATA.reduce<Array<{
    kecamatan: string;
    desa: string;
    ketua: string;
    sekretaris: string;
    bendahara: string;
  }>>((acc, curr) => {
    let existing = acc.find(item => item.desa === curr.desa && item.kecamatan === curr.kecamatan);
    if (!existing) {
      existing = {
        kecamatan: curr.kecamatan,
        desa: curr.desa,
        ketua: "",
        sekretaris: "",
        bendahara: ""
      };
      acc.push(existing);
    }
    const roleLower = curr.role.toLowerCase();
    if (roleLower === "ketua") existing.ketua = curr.name;
    else if (roleLower === "sekretaris") existing.sekretaris = curr.name;
    else if (roleLower === "bendahara") existing.bendahara = curr.name;
    return acc;
  }, []);

  // Unique list of Kecamatan for filtering
  const kecamatans = ["Semua", ...Array.from(new Set(RANTING_DATA.map(item => item.kecamatan)))];

  // Filtering logic
  const filteredRantings = groupedRanting.filter(item => {
    const matchesKecamatan = selectedKecamatan === "Semua" || item.kecamatan === selectedKecamatan;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      item.desa.toLowerCase().includes(searchLower) ||
      item.kecamatan.toLowerCase().includes(searchLower) ||
      item.ketua.toLowerCase().includes(searchLower) ||
      item.sekretaris.toLowerCase().includes(searchLower) ||
      item.bendahara.toLowerCase().includes(searchLower);
    return matchesKecamatan && matchesSearch;
  });

  const getInitials = (name: string) => {
    if (!name) return "";
    return name.trim().split(/\s+/).slice(0, 2).map(n => n[0]).join("").toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-display font-bold text-primary italic leading-tight">Susunan Pengurus Ranting</h2>
        <div className="w-24 h-1.5 bg-accent rounded-full shadow-lg shadow-accent/20"></div>
        <p className="text-gray-600 max-w-2xl text-sm leading-relaxed justify-start">
          Struktur kepengurusan ranting (tingkat Desa/Kelurahan) Ikatan Keluarga Alumni (IKA) PMII se-Kabupaten Bandung Barat. Gunakan filter kecamatan atau pencarian di bawah untuk menemukan pengurus dengan mudah.
        </p>
      </div>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-primary/5 p-6 rounded-[2.5rem] border border-primary/10">
        <div className="text-center p-4">
          <p className="text-3xl font-display font-extrabold text-primary italic">16</p>
          <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mt-1">Kecamatan Aktif</p>
        </div>
        <div className="text-center p-4 border-l border-r border-primary/10">
          <p className="text-3xl font-display font-extrabold text-primary italic">{groupedRanting.length}</p>
          <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mt-1">Kader Ranting (Desa)</p>
        </div>
        <div className="col-span-2 md:col-span-1 text-center p-4">
          <p className="text-3xl font-display font-extrabold text-accent italic">{groupedRanting.length * 3}</p>
          <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mt-1">Total Pengurus Teras</p>
        </div>
      </div>

      {/* Filter and Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filter for Kecamatan */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl sticky top-24">
            <h3 className="font-bold text-gray-800 text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              Pilih Kecamatan
            </h3>
            <div className="space-y-1 max-h-[350px] lg:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {kecamatans.map((kec) => {
                const isActive = selectedKecamatan === kec;
                const count = kec === "Semua" 
                  ? groupedRanting.length 
                  : groupedRanting.filter(item => item.kecamatan === kec).length;

                return (
                  <button
                    key={kec}
                    onClick={() => setSelectedKecamatan(kec)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex justify-between items-center ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                    }`}
                  >
                    <span className="truncate">{kec}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search input field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari desa, kecamatan, atau nama pengurus..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 text-sm bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-gray-400 hover:text-gray-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Grid list of Village Rantings */}
          {filteredRantings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRantings.map((ranting, idx) => (
                <motion.div
                  key={`${ranting.kecamatan}-${ranting.desa}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.min(idx * 0.02, 0.3) }}
                  className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Desa Title */}
                    <div className="flex justify-between items-start gap-2 mb-4 border-b border-gray-50 pb-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#0066cc]">
                          Ranting Desa / Kel.
                        </span>
                        <h4 className="font-bold text-lg text-primary leading-tight mt-0.5">
                          {ranting.desa}
                        </h4>
                      </div>
                      <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-extrabold rounded-full whitespace-nowrap">
                        Kec. {ranting.kecamatan}
                      </span>
                    </div>

                    {/* Members List */}
                    <div className="space-y-3">
                      {/* Ketua */}
                      {ranting.ketua && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-[10px] font-black text-[#cca300] shrink-0">
                            {getInitials(ranting.ketua)}
                          </div>
                          <div className="min-w-0">
                            <span className="block text-[9px] uppercase font-bold text-gray-400 tracking-wider">
                              Ketua Ranting
                            </span>
                            <p className="text-xs font-bold text-gray-800 truncate" title={ranting.ketua}>
                              {ranting.ketua}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Sekretaris */}
                      {ranting.sekretaris && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-black text-primary shrink-0">
                            {getInitials(ranting.sekretaris)}
                          </div>
                          <div className="min-w-0">
                            <span className="block text-[9px] uppercase font-bold text-gray-400 tracking-wider">
                              Sekretaris
                            </span>
                            <p className="text-xs text-gray-700 truncate" title={ranting.sekretaris}>
                              {ranting.sekretaris}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Bendahara */}
                      {ranting.bendahara && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-[10px] font-black text-green-700 shrink-0">
                            {getInitials(ranting.bendahara)}
                          </div>
                          <div className="min-w-0">
                            <span className="block text-[9px] uppercase font-bold text-gray-400 tracking-wider">
                              Bendahara
                            </span>
                            <p className="text-xs text-gray-700 truncate" title={ranting.bendahara}>
                              {ranting.bendahara}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-200 p-12 rounded-[2rem] text-center">
              <Users className="mx-auto text-gray-300 mb-4" size={40} />
              <h5 className="font-bold text-gray-700 text-sm">Tidak Ada Hasil</h5>
              <p className="text-xs text-gray-500 mt-1">Coba sesuaikan kata kunci pemfilteran atau pilih kecamatan yang berbeda.</p>
              <button
                onClick={() => {
                  setSelectedKecamatan("Semua");
                  setSearchTerm("");
                }}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function InfoSection({ title, desc, content }: { title: string, desc: string, content?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl"
    >
      <div className="flex flex-col gap-4 mb-10">
        <h2 className="text-4xl font-display font-bold text-primary italic leading-tight">{title}</h2>
        <div className="w-24 h-1.5 bg-accent rounded-full shadow-lg shadow-accent/20"></div>
      </div>
      <p className="text-xl text-gray-500 leading-relaxed font-medium">
        {desc}
      </p>
      {content}
    </motion.div>
  );
}

function SelayangPandangSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 mt-10"
    >
      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl space-y-6">
        <h3 className="font-display font-bold text-2xl text-primary">Sejarah & Khidmat Gerakan</h3>
        <p className="text-gray-650 text-sm leading-relaxed text-gray-500">
          Ikatan Keluarga Alumni Pergerakan Mahasiswa Islam Indonesia (IKA PMII) Kabupaten Bandung Barat merupakan wadah perjuangan bagi seluruh alumni PMII yang berdomisili atau berkiprah di tatar Kabupaten Bandung Barat. Sebagai kelanjutan dari pengkaderan PMII di perguruan tinggi, IKA PMII hadir sebagai simpul kekuatan intelektual, sosial, keagamaan, dan ekonomi.
        </p>
        <p className="text-gray-650 text-sm leading-relaxed text-gray-500">
          Didirikan atas semangat silih asah, silih asih, dan silih asuh, PC IKA PMII Bandung Barat terus konsisten mengawal kemandirian kader alumni demi terwujudnya masyarakat tatar pamilu yang makmur, berkeadilan, dan menjunjung tinggi nilai-nilai Aswaja (Ahlussunnah wal Jama'ah).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-primary p-10 rounded-[3rem] shadow-2xl text-white space-y-4">
          <h4 className="font-display font-bold text-xl text-accent">Azas Organisasi</h4>
          <p className="text-xs text-surface/80 leading-relaxed text-gray-300">
            IKA PMII berasaskan Pancasila dan berhaluan Islam Ahlussunnah Wal Jama’ah An-Nahdliyah, senantiasa menjaga keutuhan NKRI, menjaga tradisi keilmuan pesantren, serta merespon kemajuan zaman secara kritis dan konstruktif.
          </p>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl space-y-4">
          <h4 className="font-display font-bold text-xl text-primary">Tujuan Utama</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            Menghimpun potensi alumni untuk berkontribusi aktif dalam pembangunan daerah Bandung Barat, menjaga jejaring kekeluargaan antar-alumni lintas masa, serta memantapkan transformasi digital menuju tata kelola organisasi yang beradab dan terpercaya.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function VisiMisiSection() {
  const missions = [
    "Menguatkan database alumni sebagai modal sosial dan ekonomi.",
    "Mengembangkan potensi kewirausahaan dan profesionalisme kader alumni.",
    "Menjalin kemitraan strategis dengan pemerintah dan stakeholder lokal.",
    "Memberikan advokasi dan pendampingan bagi masyarakat."
  ];

  return (
    <InfoSection 
      title="Visi & Misi" 
      desc="Membangun simpul kolaborasi alumni PMII yang progresif, inklusif, dan mandiri." 
      content={
        <div className="mt-12 space-y-10 font-sans">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5"><Target size={80}/></div>
            <h4 className="font-display font-bold text-2xl text-primary mb-4 italic">Visi</h4>
            <p className="text-gray-600 text-lg leading-relaxed font-sans font-medium">
              "Terwujudnya simpul kolaborasi alumni yang inklusif, progresif, dan berdaya saing."
            </p>
          </div>
          <div className="bg-primary p-10 rounded-[3rem] shadow-2xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 p-8 opacity-10"><Flag size={80} className="text-accent"/></div>
            <h4 className="font-display font-bold text-2xl text-accent mb-6 italic">Misi</h4>
            <ul className="space-y-4">
              {missions.map((m, i) => (
                <li key={i} className="flex gap-4 text-surface/90 text-sm font-medium leading-relaxed text-gray-255">
                  <span className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-primary font-bold shrink-0 text-xs">{i+1}</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    />
  );
}

function KilasKBBSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 mt-10"
    >
      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl space-y-6">
        <h3 className="font-display font-bold text-2xl text-primary">Kabupaten Bandung Barat Sekilas</h3>
        <p className="text-gray-650 text-sm leading-relaxed text-gray-500">
          Kabupaten Bandung Barat (KBB) dibentuk pada tahun 2007 sebagai pemekaran dari Kabupaten Bandung. Dengan ibu kota di Ngamprah, KBB memiliki posisi geo-strategis yang luar biasa menghubungkan koridor Bandung Raya dan Jabodetabek, serta memiliki ragam potensi mulai dari industri kreatif, pariwisata Lembang, hingga lumbung pertanian dataran tinggi.
        </p>
        <p className="text-gray-650 text-sm leading-relaxed text-gray-500">
          Dengan jumlah penduduk yang terus bertambah dan sebaran 16 kecamatan (PAC), Bandung Barat menghadapi berbagai tantangan pembangunan mulai dari kesenjangan digital, stunting, hingga ancaman bencana ekologis seperti sesar Lembang. Di sinilah IKA PMII KBB mengambil peran strategis sebagai mitra kritis konstruktif pemerintah daerah.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white border border-gray-100 rounded-3xl text-left space-y-3 shadow-2xs">
          <span className="text-accent text-[10px] uppercase font-black tracking-widest block">Geografis</span>
          <h4 className="font-bold text-primary text-base">Dataran Tinggi & Hulu</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Terbentang dari dataran tinggi wisata utara Lembang, pusat industri Padalarang-Batujajar, hingga perbukitan selatan Gununghalu.</p>
        </div>
        
        <div className="p-8 bg-white border border-gray-100 rounded-3xl text-left space-y-3 shadow-2xs">
          <span className="text-accent text-[10px] uppercase font-black tracking-widest block">Sosiologis</span>
          <h4 className="font-bold text-primary text-base">Budaya & Agamis</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Didominasi masyarakat religius berbudaya pasundan yang erat dengan nilai-nilai pesantren tradisional NU di seantero tatar pamilu.</p>
        </div>

        <div className="p-8 bg-white border border-gray-100 rounded-3xl text-left space-y-3 shadow-2xs">
          <span className="text-accent text-[10px] uppercase font-black tracking-widest block">Rekomendasi IKA</span>
          <h4 className="font-bold text-primary text-base">Kebijakan Publik</h4>
          <p className="text-xs text-gray-500 leading-relaxed">IKA PMII menyumbangkan naskah akademis, riset tata ruang, mitigasi tanggap bencana, dan pendampingan UMKM desa-desa.</p>
        </div>
      </div>
    </motion.div>
  );
}

function PuslitdiklatSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 mt-10 font-sans"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Search className="text-accent" size={32} />
          <h2 className="text-4xl font-display font-bold text-primary italic leading-tight">Pusat Penelitian, Pendidikan & Pelatihan<br/><span className="text-2xl text-accent font-sans not-italic font-bold">(PUSLITDIKLAT IKA PMII)</span></h2>
        </div>
        <div className="w-24 h-1.5 bg-accent rounded-full shadow-lg shadow-accent/20"></div>
        <p className="text-lg text-gray-500 mt-4 leading-relaxed font-medium">
          Pusat Penelitian, Pendidikan, dan Pelatihan (PUSLITDIKLAT) PC IKA PMII Kabupaten Bandung Barat memformulasikan data empirik, program edukasi, pelatihan kepemimpinan, dan survei publik sebagai landasan strategis aksi sosial-ekonomi organisasi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-5">
          <h4 className="font-display font-bold text-xl text-primary flex items-center gap-2 border-b border-gray-50 pb-3">
            <BookOpen size={20} className="text-accent" />
            Fokus & Program Riset Daerah
          </h4>
          <div className="space-y-4">
            <div className="flex gap-3 text-left">
              <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-black flex items-center justify-center shrink-0">1</span>
              <div>
                <h5 className="font-bold text-primary text-sm">Riset Rekomendasi Kebijakan</h5>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Formulasi naskah kebijakan strategis (policy brief), kajian evaluatif atas RPJMD, serta usulan solusi taktis tata kelola pemerintahan daerah yang berpihak pada masyarakat.</p>
              </div>
            </div>
            <div className="flex gap-3 text-left">
              <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-black flex items-center justify-center shrink-0">2</span>
              <div>
                <h5 className="font-bold text-primary text-sm">Riset Rancangan Peraturan Daerah</h5>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Penyusunan kajian urgensi sosiologis, sinkronisasi regulasi vertikal-horizontal, serta asistensi teknis penulisan naskah akademis peraturan daerah.</p>
              </div>
            </div>
            <div className="flex gap-3 text-left">
              <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-black flex items-center justify-center shrink-0">3</span>
              <div>
                <h5 className="font-bold text-primary text-sm">Riset Manajemen Aset Daerah</h5>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Studi optimalisasi pemanfaatan aset idle pemerintah daerah, pemetaan potensi pendapatan asli daerah, dan revitalisasi fasilitas daerah berdaya guna.</p>
              </div>
            </div>
            <div className="flex gap-3 text-left">
              <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-black flex items-center justify-center shrink-0">4</span>
              <div>
                <h5 className="font-bold text-primary text-sm">Riset Pengembangan Ekonomi Kemasyarakatan</h5>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Pemetaan klaster UMKM unggulan, ketahanan ekosistem koperasi berbasis komunitas, serta pengembangan strategi rantai pasok agrobisnis lokal.</p>
              </div>
            </div>
            <div className="flex gap-3 text-left">
              <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-black flex items-center justify-center shrink-0">5</span>
              <div>
                <h5 className="font-bold text-primary text-sm">Riset Inovasi Pendidikan Daerah</h5>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Kajian mutu pendidikan berbasis kearifan lokal, strategi akselerasi literasi digital sekolah pedesaan, serta kemitraan kurikulum terapan dunia usaha.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-5">
          <h4 className="font-display font-bold text-xl text-primary flex items-center gap-2 border-b border-gray-50 pb-3">
            <Users size={20} className="text-accent" />
            Program Unggulan Puslitdiklat
          </h4>
          <div className="space-y-4">
            <div className="flex gap-3 text-left">
              <span className="w-6 h-6 rounded-lg bg-accent/10 text-accent text-xs font-black flex items-center justify-center shrink-0">1</span>
              <div>
                <h5 className="font-bold text-primary text-sm">Sekolah Anggaran</h5>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Pemberdayaan analisis APBD, perencanaan anggaran pembangunan daerah partisipatif, serta akuntabilitas keuangan publik.</p>
              </div>
            </div>
            <div className="flex gap-3 text-left">
              <span className="w-6 h-6 rounded-lg bg-accent/10 text-accent text-xs font-black flex items-center justify-center shrink-0">2</span>
              <div>
                <h5 className="font-bold text-primary text-sm">Kursus Politik</h5>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Studi elektoral taktis, analisis perumusan kebijakan publik, advokasi regulasi daerah, serta etika kepemimpinan nasional.</p>
              </div>
            </div>
            <div className="flex gap-3 text-left">
              <span className="w-6 h-6 rounded-lg bg-accent/10 text-accent text-xs font-black flex items-center justify-center shrink-0">3</span>
              <div>
                <h5 className="font-bold text-primary text-sm">Pelatihan Manajemen Aset Daerah</h5>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Strategi inventarisasi kekayaan Pemda, tata kelola aset fisik dan digital, sertifikasi tanah, serta penyusunan profil potensi investasi desa.</p>
              </div>
            </div>
            <div className="flex gap-3 text-left">
              <span className="w-6 h-6 rounded-lg bg-accent/10 text-accent text-xs font-black flex items-center justify-center shrink-0">4</span>
              <div>
                <h5 className="font-bold text-primary text-sm">Pelatihan Vokasi / Keprofesian</h5>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Inkubasi keahlian bersertifikat industri kreatif, keahlian digital marketing, keinsinyuran terapan, dan kemahiran profesi alumni.</p>
              </div>
            </div>
            <div className="flex gap-3 text-left">
              <span className="w-6 h-6 rounded-lg bg-accent/10 text-accent text-xs font-black flex items-center justify-center shrink-0">5</span>
              <div>
                <h5 className="font-bold text-primary text-sm">Workshop Softskill dan Lifeskill</h5>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Peningkatan kecakapan public speaking, negosiasi strategis tingkat tinggi, problem solving tim, dan personal branding kader.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProgramKerjaSection() {
  const [activeKarsa, setActiveKarsa] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam !== null) {
      const idx = parseInt(tabParam, 10);
      if (!isNaN(idx) && idx >= 0 && idx < 5) {
        setActiveKarsa(idx);
      }
    }
  }, [window.location.search]);

  const pancakarsa = [
    {
      title: "Penguatan Lembaga",
      desc: "Meningkatkan soliditas dan tata kelola organisasi yang profesional.",
      icon: Building2,
      programs: [
        { nr: "01", title: "Sinergi Sipencak/SIAP Alumni", desc: "Digitalisasi pendataan dan aktivasi e-KTA terintegrasi untuk seluruh alumni PMII se-Bandung Barat." },
        { nr: "02", title: "Konsolidasi 16 PAC KBB", desc: "Pembentukan dan pembinaan kepengurusan tingkat kecamatan (PAC) di seluruh wilayah Bandung Barat." },
        { nr: "03", title: "Rapat Kerja Berkala", desc: "Penyelenggaraan evaluasi, rapat koordinasi cabang, dan perumusan rekomendasi kebijakan organisasi." },
        { nr: "04", title: "Sekretariat Representatif", desc: "Penyediaan sarana pusat koordinasi, arsip digital, dan ruang kolaborasi beradab untuk seluruh kader." },
        { nr: "05", title: "Kredibilitas & Tata Kelola", desc: "Standardisasi manajemen administrasi keuangan, pelaporan transparan, dan penataan hukum organisasi." }
      ]
    },
    {
      title: "Pendidikan & Pelatihan",
      desc: "Pengembangan kapasitas intelektual dan skill kader alumni PMII.",
      icon: GraduationCap,
      programs: [
        { nr: "01", title: "Sekolah Kepemimpinan IKA", desc: "Pusat inkubasi kepemimpinan strategis, analisis kebijakan publik, dan wawasan keagamaan moderat." },
        { nr: "02", title: "Sertifikasi Kompetensi Kerja", desc: "Pelatihan hard skill & soft skill berorientasi industri kreatif, digital marketing, dan teknologi informasi." },
        { nr: "03", title: "Layanan Beasiswa Kader", desc: "Advokasi dan fasilitas bantuan beasiswa studi lanjut tingkat sarjana, magister, hingga doktoral." },
        { nr: "04", title: "Kajian Intelektual Rutin", desc: "Forum diskusi bedah kitab/buku kontemporer, kajian ilmiah sosiologis, dan diskursus keaswajaan kaffah." },
        { nr: "05", title: "Bimbingan Pendidik Daerah", desc: "Pendampingan guru honorer, pemberdayaan keterampilan mengajar, dan peningkatan mutu edukasi pedesaan." }
      ]
    },
    {
      title: "Penguatan Jaringan",
      desc: "Membangun konektivitas strategis antar alumni di berbagai sektor.",
      icon: Users,
      programs: [
        { nr: "01", title: "Sinergitas Lintas Sektor", desc: "Pemetaan kompetensi dan kolaborasi kontinu antar profesi birokrat, swasta, akademisi, dan seniman." },
        { nr: "02", title: "LBH IKA PMII Bandung Barat", desc: "Penyediaan payung hukum advokasi, konsultasi paralegal, serta perlindungan hak sipil kemasyarakatan." },
        { nr: "03", title: "Sumbangsih Kebijakan Daerah", desc: "Pemberian rekomendasi akademis strategis untuk mendorong kebijakan RPJMD Pemkab Bandung Barat." },
        { nr: "04", title: "Temu Alumni & Simposium", desc: "Penyelenggaraan reuni akbar tahunan dan sumbang saran ideologis demi penguatan eksistensi organisasi." },
        { nr: "05", title: "Publikasi Karya Kreatif", desc: "Fasilitas peluncuran tulisan opini, gagasan ilmiah, dan karya sastra budaya alumni di portal media jurnalisme." }
      ]
    },
    {
      title: "Pemberdayaan Ekonomi",
      desc: "Mendorong kemandirian ekonomi alumni melalui UMKM dan bisnis.",
      icon: Briefcase,
      programs: [
        { nr: "01", title: "KAMARA Swatransaksi", desc: "Pembentukan Koperasi Mandiri Rakyat Sejahtera (KAMARA) dan integrasi unit usaha ritel KAMARA Mart." },
        { nr: "02", title: "UMKM Alumni Accelerator", desc: "Inkubasi bisnis mikro, fasilitasi legalitas PIRT/Sertifikat Halal, serta pendampingan branding digital." },
        { nr: "03", title: "Pengembangan Agrobisnis", desc: "Sinergi kebun kopi sabilulungan, pembibitan perkebunan teh, dan budidaya peternakan domba silih asuh." },
        { nr: "04", title: "Kemitraan Modal Syariah", desc: "Penyediaan akses modal tanpa riba melalui pembiayaan simpan-pinjam syariah internal pengurus." },
        { nr: "05", title: "Pasar Digital & Kurasi Ekspor", desc: "Platform digital kurasi produk UMKM tatar pamilu untuk didorong menembus pasar nasional dan regional." }
      ]
    },
    {
      title: "Pengabdian Masyarakat",
      desc: "Kontribusi nyata IKA PMII dalam pembangunan sosial daerah.",
      icon: HeartHandshake,
      programs: [
        { nr: "01", title: "Klinik Kesehatan Keliling", desc: "Penyuluhan stunting santriwati, pemeriksaan gizi gratis pemukiman dhuafa, dan bakti sosial kesehatan." },
        { nr: "02", title: "Relawan Siaga Sesar Lembang", desc: "Edukasi mitigasi kebencanaan wilayah rawan serta pembentukan satgas tanggap darurat kepemudaan." },
        { nr: "03", title: "Layanan Hukum Pro-Bono", desc: "Bantuan pembelaan hukum gratis bagi kelompok tertindas, buruh industrial, dan sengketa lahan warga." },
        { nr: "04", title: "Konservasi Mata Air KBB", desc: "Gerakan penanaman pohon, pelestarian resapan air hulu, dan perlindungan ekologi dataran tinggi." },
        { nr: "05", title: "PKBM Gerakan Aksara Mulia", desc: "Penguatan Pusat Kegiatan Belajar Masyarakat untuk mereduksi angka putus sekolah dan buta aksara desa." }
      ]
    }
  ];

  return (
    <div className="space-y-10 mt-10 text-left">
      {/* Category Tabs Layout */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {pancakarsa.map((pilar, i) => {
          const IconComponent = pilar.icon;
          const isActive = activeKarsa === i;
          return (
            <button
              key={i}
              onClick={() => setActiveKarsa(i)}
              className={`text-left p-5 rounded-2.5xl border transition-all duration-300 relative group flex flex-col justify-between h-[130px] cursor-pointer ${
                isActive
                  ? "bg-accent text-primary border-accent shadow-md scale-[1.02] font-semibold"
                  : "bg-white text-gray-600 border-gray-100 hover:border-accent hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                  isActive ? "bg-primary text-accent" : "bg-primary/5 text-primary"
                }`}>
                  <IconComponent size={18} />
                </div>
                <span className={`text-[8px] font-black uppercase tracking-widest ${
                  isActive ? "text-primary/70" : "text-primary/40"
                }`}>Pilar 0{i+1}</span>
              </div>
              <div>
                <h4 className={`font-display font-bold text-sm leading-tight uppercase tracking-tight line-clamp-2 ${
                  isActive ? "text-primary" : "text-gray-950"
                }`}>{pilar.title}</h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Category Programs Showcase */}
      <motion.div
        key={activeKarsa}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white border border-gray-100 p-6 md:p-8 rounded-[2.5rem] shadow-xl text-left"
      >
        {/* Category Info Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="inline-flex p-4 bg-primary text-accent rounded-2xl">
            {(() => {
              const ActiveIcon = pancakarsa[activeKarsa].icon;
              return <ActiveIcon size={28} />;
            })()}
          </div>
          <div className="space-y-2">
            <span className="text-accent font-black tracking-widest text-[9px] uppercase">Rona Program Kerja</span>
            <h3 className="text-xl font-display font-bold text-primary uppercase tracking-tight leading-tight">
              {pancakarsa[activeKarsa].title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-sans font-medium">
              {pancakarsa[activeKarsa].desc}
            </p>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <span className="block text-[8px] uppercase tracking-widest font-black text-gray-400 mb-1">Fokus Utama</span>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-gray-600">
              <span className="px-2 py-1 bg-surface border border-gray-100 rounded-lg">Kemandirian Kader</span>
              <span className="px-2 py-1 bg-surface border border-gray-100 rounded-lg">Silih Asah Asih Asuh</span>
            </div>
          </div>
        </div>

        {/* Programs List */}
        <div className="lg:col-span-8 space-y-3">
          <div>
            <h5 className="text-[10px] uppercase tracking-widest font-black text-primary/40">Daftar 5 Program Kerja Unggulan:</h5>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {pancakarsa[activeKarsa].programs.map((prog, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 p-4 bg-surface hover:bg-gray-50 border border-transparent hover:border-gray-100 rounded-xl transition-all duration-300 shadow-2xs"
              >
                <div className="flex items-center justify-center font-mono font-black text-xs text-accent bg-accent/10 border border-accent/20 w-8 h-8 rounded-lg shrink-0">
                  {prog.nr}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-sans font-bold text-sm text-primary tracking-tight">{prog.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{prog.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function KoperasiSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-16"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-display font-bold text-primary italic leading-tight">Koperasi KAMARA<br/><span className="text-2xl text-accent font-sans not-italic font-bold">(Kader Mandiri Nusantara)</span></h2>
        <div className="w-24 h-1.5 bg-accent rounded-full shadow-lg shadow-accent/20"></div>
        <p className="text-lg text-gray-400 mt-4 leading-relaxed font-medium max-w-2xl">
          Unit usaha ekonomi strategis IKA PMII Bandung Barat yang berfokus pada kemandirian kader melalui ekosistem bisnis yang inklusif dan profesional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Dewan Pengawas */}
        <div className="space-y-8">
           <div className="flex items-center gap-4">
              <Shield className="text-accent" size={24} />
              <h3 className="text-2xl font-bold text-primary italic">Dewan Pengawas</h3>
           </div>
           <div className="space-y-4">
              <div 
                 onClick={() => window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name: "Drs. Agus Mulyana, M.Si" } }))}
                 className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm border-l-[6px] border-l-accent cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group flex justify-between items-center"
              >
                 <div>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Ketua Dewan Pengawas</p>
                    <p className="font-bold text-primary group-hover:text-accent transition-colors">Drs. Agus Mulyana, M.Si</p>
                 </div>
                 <Search size={14} className="text-gray-300 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all shrink-0" />
              </div>
              <div 
                 onClick={() => window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name: "H. Ahmad Fauzi, S.Ag" } }))}
                 className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm border-l-[6px] border-l-gray-300 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group flex justify-between items-center"
              >
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Anggota Pengawas</p>
                    <p className="font-bold text-primary group-hover:text-accent transition-colors">H. Ahmad Fauzi, S.Ag</p>
                 </div>
                 <Search size={14} className="text-gray-300 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all shrink-0" />
              </div>
              <div 
                 onClick={() => window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name: "Dr. Siti Aminah" } }))}
                 className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm border-l-[6px] border-l-gray-300 cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group flex justify-between items-center"
              >
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Anggota Pengawas</p>
                    <p className="font-bold text-primary group-hover:text-accent transition-colors">Dr. Siti Aminah</p>
                 </div>
                 <Search size={14} className="text-gray-300 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all shrink-0" />
              </div>
           </div>
        </div>

        {/* Dewan Pengurus */}
        <div className="space-y-8">
           <div className="flex items-center gap-4">
              <User className="text-accent" size={24} />
              <h3 className="text-2xl font-bold text-primary italic">Dewan Pengurus</h3>
           </div>
           <div className="space-y-4">
              <div 
                 onClick={() => window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name: "M. Zaka Ali, S.E." } }))}
                 className="p-6 bg-primary text-surface rounded-3xl shadow-xl shadow-primary/20 cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/30 transition-all group flex justify-between items-center"
              >
                 <div>
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Ketua Koperasi</p>
                    <p className="font-bold text-xl group-hover:text-accent transition-colors">M. Zaka Ali, S.E.</p>
                  </div>
                 <Search size={16} className="text-accent opacity-0 group-hover:opacity-100 transition-all shrink-0" />
              </div>
              <div 
                 onClick={() => window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name: "Rizky Ramadhan, S.T." } }))}
                 className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group flex justify-between items-center"
              >
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sekretaris</p>
                    <p className="font-bold text-primary text-sm group-hover:text-accent transition-colors font-sans">Rizky Ramadhan, S.T.</p>
                 </div>
                 <Search size={14} className="text-gray-300 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all shrink-0" />
              </div>
              <div 
                 onClick={() => window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name: "Hj. Lilis Karlina, M.Ak" } }))}
                 className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group flex justify-between items-center"
              >
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Bendahara</p>
                    <p className="font-bold text-primary text-sm group-hover:text-accent transition-colors font-sans">Hj. Lilis Karlina, M.Ak</p>
                 </div>
                 <Search size={14} className="text-gray-300 group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all shrink-0" />
              </div>
           </div>
        </div>
      </div>

      {/* Bidang Usaha */}
      <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-xl space-y-10">
         <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-primary italic">Bidang Usaha Strategis</h3>
            <p className="text-gray-400 text-sm font-medium">Diversifikasi layanan untuk mendukung ekosistem ekonomi alumni.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-surface rounded-[2.5rem] space-y-4 hover:bg-accent/10 transition-colors group">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-accent transition-colors">
                  <Briefcase size={24} />
               </div>
               <h4 className="font-bold text-primary text-xl">Konsumen & Retail</h4>
               <p className="text-gray-500 text-sm leading-relaxed">Penyediaan kebutuhan pokok, perdagangan umum, serta distribusi produk unggulan UMKM alumni PMII.</p>
            </div>
            <div className="p-8 bg-surface rounded-[2.5rem] space-y-4 hover:bg-accent/10 transition-colors group">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-accent transition-colors">
                  <Target size={24} />
               </div>
               <h4 className="font-bold text-primary text-xl text-balance">Pelayanan Jasa Umum</h4>
               <p className="text-gray-550 text-sm leading-relaxed text-gray-500">Pelayanan jasa perantara, perencanaan, konsultasi bisnis, serta jasa umum lainnya bagi instansi dan publik.</p>
            </div>
         </div>
      </div>
    </motion.div>
  );
}

function LBHSection() {
  const staff = [
    {
      name: "Adv. Wisnu Bayu Aji, S.H",
      role: "Ketua LBH",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
      bio: "Advokat & Konsultan Hukum dengan spesialisasi litigasi pidana/perdata, Hukum Tata Negara, serta advokasi kebijakan publik."
    },
    {
      name: "Adv. Muhammad Iqbal Aula, S.H",
      role: "Anggota / Advokat",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
      bio: "Spesialisasi hukum perdata, penyelesaian sengketa alternatif (ADR), mediasi sengketa pertanahan, dan hubungan industrial."
    },
    {
      name: "Adv. M.E Burhanudin, S.H., M.H",
      role: "Anggota / Advokat",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      bio: "Fokus pada Hukum Tata Usaha Negara (TUN) mendampingi hak keperdataan klien publik serta perlindungan ketenagakerjaan."
    },
    {
      name: "Adv. Subki Azfartsani, S.H., M.H",
      role: "Anggota / Advokat",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      bio: "Berpengalaman dalam pendampingan hukum pidana khusus, perlindungan konsumen, serta legal audit regulasi daerah."
    },
    {
      name: "Adv. Angga Gustian, S.H., M.H",
      role: "Anggota / Advokat",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      bio: "Keahlian di bidang Hukum Bisnis, pendampingan kepatuhan korporasi, hukum transaksi digital, dan ekonomi syariah."
    },
    {
      name: "Suhendra",
      role: "Anggota / Paralegal",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
      bio: "Bertanggung jawab atas administrasi keperkaraan, koordinasi penanganan hukum non-litigasi, serta penyuluhan hukum tingkat desa."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-16"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Gavel className="text-accent" size={32} />
          <h2 className="text-4xl font-display font-bold text-primary italic leading-tight">Lembaga Bantuan Hukum<br/><span className="text-2xl text-accent font-sans not-italic font-bold">(LBH IKA PMII Bandung Barat)</span></h2>
        </div>
        <div className="w-24 h-1.5 bg-accent rounded-full shadow-lg shadow-accent/20"></div>
        <p className="text-lg text-gray-450 mt-4 leading-relaxed font-medium max-w-2xl text-gray-400">
          Lembaga Bantuan Hukum PC IKA PMII Bandung Barat berdedikasi tinggi dalam memberikan advokasi, konsultasi, serta pendampingan hukum kepada alumni serta masyarakat luas guna menegakkan keadilan dan kemaslahatan umum.
        </p>
      </div>

      {/* Keunggulan Layanan / Layanan Utama LBH */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm space-y-4">
          <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
            <Scale size={24} className="text-accent" />
          </div>
          <h4 className="font-bold text-primary text-lg">Konsultasi Hukum</h4>
          <p className="text-gray-500 text-xs leading-relaxed">Konsultasi interaktif terkait permasalahan pidana, perdata, pertanahan, ketenagakerjaan, maupun keperdataan secara pro bono.</p>
        </div>
        <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm space-y-4">
          <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
            <Shield size={24} className="text-accent" />
          </div>
          <h4 className="font-bold text-primary text-lg">Litigasi & Non-Litigasi</h4>
          <p className="text-gray-500 text-xs leading-relaxed">Pendampingan di pengadilan (litigasi) maupun penyelesaian perkara di luar pengadilan melalui mediasi damai secara kekeluargaan.</p>
        </div>
        <div className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm space-y-4">
          <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
            <Gavel size={24} className="text-accent" />
          </div>
          <h4 className="font-bold text-primary text-lg">Advokasi & Edukasi</h4>
          <p className="text-gray-500 text-xs leading-relaxed">Penyuluhan sadar hukum ketenagakerjaan, hak asasi manusia, kesetaraan gender, agraria, hingga pembinaan UMKM binaan.</p>
        </div>
      </div>

      {/* Susunan Pengurus */}
      <div className="space-y-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-primary italic">Susunan Pengurus & Dewan Advokat</h3>
          <p className="text-gray-400 text-sm font-medium">Melayani secara kredibel, mengabdi demi kemaslahatan umat dengan penegakan supremasi hukum yang berkeadilan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {staff.map((p, i) => (
            <div 
              key={i} 
              onClick={() => window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name: p.name, defaultLoc: "Ngamprah" } }))}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl hover:border-accent/20 transition-all duration-500 flex flex-col h-full hover:-translate-y-2 cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden relative bg-primary">
                <img 
                  src={p.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 grayscale group-hover:grayscale-0 transition-all duration-1000" 
                  alt={p.name} 
                  title={p.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />
                <div className="absolute top-6 left-6 bg-accent text-primary text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                  {p.role.includes("Ketua") ? "Pimpinan Cabang" : "Dewan Advokat"}
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-white font-bold font-display text-lg italic leading-tight group-hover:text-accent transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-[10px] text-accent font-black uppercase tracking-widest mt-1">
                    {p.role}
                  </p>
                </div>
              </div>
              <div className="p-8 space-y-4 flex-grow flex flex-col justify-between bg-surface/10">
                <p className="text-xs text-gray-500 leading-relaxed font-sans italic">
                  "{p.bio}"
                </p>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-primary/40 group-hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest">
                  <span>LBH IKA PMII KBB</span>
                  <Scale size={16} className="text-accent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface PACData {
  name: string;
  ketua: string;
  sekretaris: string | null;
  bendahara: string | null;
  anggota: string[];
}

function PACSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const pacList: PACData[] = [
    {
      name: "Batujajar",
      ketua: "Muhamad Toyib",
      sekretaris: "Siti Habibah",
      bendahara: null,
      anggota: []
    },
    {
      name: "Cihampelas",
      ketua: "Dea Ferdian Widende",
      sekretaris: "Jajang Sugiarto",
      bendahara: null,
      anggota: []
    },
    {
      name: "Cikalongwetan",
      ketua: "Abdul Haris Citra Atmaja",
      sekretaris: "Agus Solihin",
      bendahara: "Mohamad Ekky",
      anggota: []
    },
    {
      name: "Cililin",
      ketua: "Fauziah Fadilah",
      sekretaris: null,
      bendahara: null,
      anggota: []
    },
    {
      name: "Cipatat",
      ketua: "Nur Rohmat Irfan Hilmi",
      sekretaris: null,
      bendahara: null,
      anggota: []
    },
    {
      name: "Cipeundeuy",
      ketua: "Lutbi Permana",
      sekretaris: "Parid Soleh",
      bendahara: "Opik",
      anggota: ["Suryadi"]
    },
    {
      name: "Cipongkor",
      ketua: "Andri",
      sekretaris: "Diki Wahyudi",
      bendahara: "Rita Safina",
      anggota: ["Muhamad Adnan", "M Romli Al Amin"]
    },
    {
      name: "Cisarua",
      ketua: "Dede Sopian",
      sekretaris: "Iis Krismayanti",
      bendahara: "Mustofa",
      anggota: []
    },
    {
      name: "Gununghalu",
      ketua: "Dendi Taufik Rahman",
      sekretaris: "Ujang Rosadi",
      bendahara: "Abdul Mujib Maulana",
      anggota: ["Hendi Darusman"]
    },
    {
      name: "Lembang",
      ketua: "Tedi Suryadi",
      sekretaris: "Dani Mulyadi",
      bendahara: null,
      anggota: []
    },
    {
      name: "Ngamprah",
      ketua: "Arief Octavian Fauzi",
      sekretaris: "Abdullah Isnaini",
      bendahara: "Ikhsan Arifyanto Wijaya",
      anggota: []
    },
    {
      name: "Padalarang",
      ketua: "Hendra Adipratama",
      sekretaris: "Wisnu Ramdan",
      bendahara: "Azi Alfiandi",
      anggota: []
    },
    {
      name: "Parongpong",
      ketua: "Ahmad Sirojudin",
      sekretaris: "Asep Abdurohman S.Pd.I",
      bendahara: "Sandi Alansah",
      anggota: ["Misbah Sholehuddin", "Muhammad Faruq Gozali"]
    },
    {
      name: "Rongga",
      ketua: "Asep Surya",
      sekretaris: "Risma Jundulloh",
      bendahara: null,
      anggota: []
    },
    {
      name: "Saguling",
      ketua: "Yusuf Hidayatulloh, S.H., M.H.",
      sekretaris: "Muhamad Nurdin Bm",
      bendahara: "Euis Susilawati",
      anggota: []
    },
    {
      name: "Sindangkerta",
      ketua: "Mahmud Ali",
      sekretaris: null,
      bendahara: null,
      anggota: []
    }
  ];

  const filteredPAC = pacList.filter((pac) =>
    pac.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedPAC = filteredPAC[selectedIdx] || filteredPAC[0] || pacList[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <MapPin className="text-accent" size={32} />
          <h2 className="text-4xl font-display font-bold text-primary italic leading-tight">
            Pengurus Anak Cabang (PAC)
          </h2>
        </div>
        <div className="w-24 h-1.5 bg-accent rounded-full shadow-lg shadow-accent/20"></div>
        <p className="text-lg text-gray-500 font-medium max-w-2xl leading-relaxed italic text-gray-450">
          Struktur kepemimpinan tingkat kecamatan se-Kabupaten Bandung Barat dalam menopang soliditas kader alumni PMII di tingkat akar rumput.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Left Side: Directory / Selector */}
        <div className="w-full xl:w-2/5 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl space-y-6">
            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Cari Kecamatan..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedIdx(0); // reset selected to first element in matching list
                }}
                className="w-full pl-12 pr-4 py-3.5 bg-surface text-primary border border-gray-50 rounded-2xl text-sm font-semibold placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Simple grid containing all 16 sub-districts without scrollbars */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {filteredPAC.length > 0 ? (
                filteredPAC.map((pac, idx) => {
                  const isCur = selectedPAC.name === pac.name;
                  return (
                    <button
                      key={pac.name}
                      onClick={() => {
                        const originalIdx = pacList.findIndex((p) => p.name === pac.name);
                        // Find position in filtered list
                        const filtIdx = filteredPAC.findIndex((p) => p.name === pac.name);
                        setSelectedIdx(filtIdx);
                      }}
                      className={`text-left p-3.5 rounded-2xl flex flex-col justify-between gap-1 transition-all group ${
                        isCur
                          ? "bg-primary text-accent shadow-lg shadow-primary/15 scale-[1.01]"
                          : "bg-surface hover:bg-gray-100 text-gray-600 hover:text-primary border border-gray-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className={isCur ? "text-accent" : "text-gray-300 group-hover:text-primary transition-colors"} />
                        <span className="font-bold text-xs tracking-wide line-clamp-1">{pac.name}</span>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-wider ${
                        isCur ? "text-accent/80" : "text-gray-400"
                      }`}>
                        {1 + (pac.sekretaris ? 1 : 0) + (pac.bendahara ? 1 : 0) + pac.anggota.length} Kader
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="col-span-2 text-center py-10">
                  <p className="text-xs text-gray-400 font-bold">Kecamatan tidak ditemukan</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Structure */}
        <div className="w-full xl:w-3/5">
          {selectedPAC ? (
            <motion.div
              key={selectedPAC.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-xl space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-150 pb-5">
                <div className="space-y-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent font-black text-[9px] uppercase tracking-widest">
                    <span>Masa Khidmat 2026 - 2031</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-primary italic leading-none pt-1">
                    PAC {selectedPAC.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    PC IKA PMII KABUPATEN BANDUNG BARAT
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary text-accent rounded-2xl flex items-center justify-center shadow-md transform rotate-3 border border-white/15 shrink-0">
                  <Award size={24} />
                </div>
              </div>

              {/* Core Structure */}
              <div className="space-y-4">
                <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Badan Pengurus Harian (BPH)
                </h4>

                <div className="grid grid-cols-1 gap-4">
                  {/* KETUA */}
                  <div 
                    onClick={() => window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name: selectedPAC.ketua, defaultLoc: selectedPAC.name } }))}
                    className="p-5 bg-primary text-white rounded-xl shadow-md relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 cursor-pointer"
                  >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
                    <div className="flex items-start justify-between relative z-10">
                      <div className="space-y-2">
                        <div className="inline-flex py-1 px-3 bg-accent text-primary text-[8px] font-black rounded-full uppercase tracking-widest shadow-sm">
                          Ketua PAC
                        </div>
                        <h5 className="font-display font-bold text-xl italic leading-none tracking-tight">
                          {selectedPAC.ketua}
                        </h5>
                        <p className="text-[9px] text-accent font-black uppercase tracking-widest mt-0.5">
                          Pimpinan Tertinggi Kecamatan {selectedPAC.name}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-accent backdrop-blur-md border border-white/10 shrink-0">
                        <User size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* SEKRETARIS */}
                    <div 
                      onClick={() => selectedPAC.sekretaris && window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name: selectedPAC.sekretaris, defaultLoc: selectedPAC.name } }))}
                      className={`p-4 bg-white border border-gray-100 rounded-xl shadow-xs flex items-start justify-between hover:shadow-sm transition-shadow group transition-all ${
                        selectedPAC.sekretaris ? "cursor-pointer hover:border-accent/40" : ""
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="inline-flex py-1 px-2.5 bg-primary/5 text-primary text-[8px] font-black rounded-full uppercase tracking-widest">
                          Sekretaris
                        </div>
                        <h5 className={`font-semibold text-base font-sans leading-none ${
                          selectedPAC.sekretaris ? "text-primary italic font-bold" : "text-gray-305 italic"
                        }`}>
                          {selectedPAC.sekretaris || "Dalam Proses"}
                        </h5>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                          {selectedPAC.sekretaris ? "Administrasi & Organisasi" : "Menunggu Pengisian Formatur"}
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center text-primary group-hover:text-accent transition-colors shrink-0">
                        <BookOpen size={14} />
                      </div>
                    </div>

                    {/* BENDAHARA */}
                    <div 
                      onClick={() => selectedPAC.bendahara && window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name: selectedPAC.bendahara, defaultLoc: selectedPAC.name } }))}
                      className={`p-4 bg-white border border-gray-100 rounded-xl shadow-xs flex items-start justify-between hover:shadow-sm transition-shadow group transition-all ${
                        selectedPAC.bendahara ? "cursor-pointer hover:border-accent/40" : ""
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="inline-flex py-1 px-2.5 bg-primary/5 text-primary text-[8px] font-black rounded-full uppercase tracking-widest">
                          Bendahara
                        </div>
                        <h5 className={`font-semibold text-base font-sans leading-none ${
                          selectedPAC.bendahara ? "text-primary italic font-bold" : "text-gray-305 italic"
                        }`}>
                          {selectedPAC.bendahara || "Dalam Proses"}
                        </h5>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                          {selectedPAC.bendahara ? "Kebendaharaan & Keuangan" : "Menunggu Pengisian Formatur"}
                        </p>
                      </div>
                      <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center text-primary group-hover:text-accent transition-colors shrink-0">
                        <Scale size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ANGGOTA */}
              <div className="space-y-3 border-t border-gray-100 pt-5">
                <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Staf / Anggota Bidang
                </h4>
                {selectedPAC.anggota && selectedPAC.anggota.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedPAC.anggota.map((name, i) => (
                      <div
                        key={i}
                        onClick={() => window.dispatchEvent(new CustomEvent("show-alumni-profile", { detail: { name, defaultLoc: selectedPAC.name } }))}
                        className="px-4 py-2.5 bg-surface rounded-xl border border-gray-50 flex items-center gap-2.5 hover:bg-gray-100 hover:border-accent/30 transition-all group cursor-pointer"
                      >
                        <div className="w-2 h-2 bg-accent rounded-full shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="font-bold text-xs text-primary leading-none font-sans">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 bg-surface rounded-xl border border-dashed border-gray-200 text-center">
                    <Users size={20} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-primary/70 font-semibold leading-relaxed">
                      Anggota Tambahan Dalam Proses Pendaftaran & Sinkronisasi SIAP E-KTA.
                    </p>
                    <p className="text-[9px] text-gray-400 mt-0.5 font-medium font-mono">
                      Status: Active / Arah Juang Progresif
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-400 italic">Pilih Kecamatan di menu sebelah kiri untuk melihat struktur.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
