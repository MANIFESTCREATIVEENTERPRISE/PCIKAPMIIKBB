import React, { useState, Dispatch, SetStateAction } from "react";
import { 
  Plus, Calendar, Mail, FileText, CheckCircle, Clock, Video, 
  MapPin, Image, User, DollarSign, Edit, Grid2X2, Settings, Landmark
} from "lucide-react";
import { ServiceItem } from "../types/seller";

interface SellerJasaProps {
  services: ServiceItem[];
  setServices: Dispatch<SetStateAction<ServiceItem[]>>;
  isDarkMode: boolean;
  onTriggerNotification: (msg: string) => void;
}

export default function SellerJasa({
  services,
  setServices,
  isDarkMode,
  onTriggerNotification
}: SellerJasaProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"katalog" | "booking" | "kalender" | "custom_form">("katalog");
  const [selectedBookingFieldType, setSelectedBookingFieldType] = useState("text");

  // New service state
  const [newService, setNewService] = useState({
    name: "",
    category: "Desain" as any,
    price: "",
    duration: "3 Hari",
    location: "Online / Remote",
    description: "",
    estimate: "3 hari kerja"
  });

  // Booking custom questions fields list
  const [customFields, setCustomFields] = useState([
    { id: "f1", label: "Brief Kebutuhan Jasa", type: "paragraph", required: true },
    { id: "f2", label: "Lampiran Dokumen Tambahan (PDF/JPG)", type: "file", required: false }
  ]);
  const [newFieldLabel, setNewFieldLabel] = useState("");

  const handleAddField = () => {
    if (!newFieldLabel) return;
    setCustomFields(prev => [...prev, {
      id: `field-${Date.now()}`,
      label: newFieldLabel,
      type: selectedBookingFieldType,
      required: false
    }]);
    setNewFieldLabel("");
    onTriggerNotification("Formulir custom berhasil ditambahkan!");
  };

  const handleRemoveField = (id: string) => {
    setCustomFields(prev => prev.filter(f => f.id !== id));
    onTriggerNotification("Formulir kustom dihapus.");
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name || !newService.price) {
      onTriggerNotification("Gagal mendata jasa baru! Input nama & harga terlebih dahulu.");
      return;
    }

    const created: ServiceItem = {
      id: `SERV-${Math.floor(100 + Math.random() * 900)}`,
      name: newService.name,
      category: newService.category,
      price: parseFloat(newService.price),
      duration: newService.duration,
      status: "aktif",
      location: newService.location,
      portfolioCount: 0,
      description: newService.description,
      bookingSlots: [
        { date: "2026-05-27", time: "09:00 - 11:30", booked: false },
        { date: "2026-05-28", time: "13:00 - 15:30", booked: false }
      ]
    };

    setServices(prev => [created, ...prev]);
    setShowAddForm(false);
    onTriggerNotification(`Sukses! Jasa "${created.name}" berhasil ditayangkan ke booking online.`);
    
    // Reset state
    setNewService({
      name: "",
      category: "Desain",
      price: "",
      duration: "3 Hari",
      location: "Online / Remote",
      description: "",
      estimate: "3 hari kerja"
    });
  };

  // Toggle booking slot status
  const toggleSlotBooked = (serviceId: string, slotIdx: number) => {
    setServices(prev => prev.map(s => {
      if (s.id === serviceId) {
        const updatedSlots = [...s.bookingSlots];
        const nextState = !updatedSlots[slotIdx].booked;
        updatedSlots[slotIdx].booked = nextState;
        onTriggerNotification(`Slot reservasi diubah menjadi: ${nextState ? "DIPESAN KADER" : "KOSONG"}`);
        return { ...s, bookingSlots: updatedSlots };
      }
      return s;
    }));
  };

  const categories = ["Desain", "Digital Marketing", "Konstruksi", "Konsultan", "Event", "Pendidikan", "Teknologi", "Servis"];

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Header section with tabs layout options */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">Portal Layanan &amp; Manajemen Jasa</h2>
          <p className="text-xs text-slate-400 font-medium">Atur jam booking, daftar paket konsultasi live, portofolio digital, dan intake form pembeli.</p>
        </div>

        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10"
        >
          <Plus size={14} /> Daftarkan Jasa Baru
        </button>
      </div>

      {/* Sub menu tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-900 border p-1 rounded-2xl max-w-lg w-full">
        {[
          { id: "katalog", name: "Daftar Jasa", icon: Grid2X2 },
          { id: "kalender", name: "Jadwal Reservasi", icon: Calendar },
          { id: "custom_form", name: "Custom Intake Form", icon: FileText }
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                isActive ? "bg-white dark:bg-slate-950 text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              <Icon size={14} /> {item.name}
            </button>
          );
        })}
      </div>

      {/* Service Add Form */}
      {showAddForm && (
        <div id="service-registration-form" className={`p-8 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"} shadow-xl animate-slideDown`}>
          <div className="flex justify-between items-center pb-3 border-b dark:border-slate-800 mb-6">
            <h3 className="text-sm font-black text-emerald-600 uppercase tracking-widest pl-1">Form Registrasi Penyedia Jasa</h3>
            <button className="text-slate-400 font-bold hover:text-slate-600 text-xs cursor-pointer" onClick={() => setShowAddForm(false)}>Batal</button>
          </div>

          <form onSubmit={handleCreateService} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Nama Layanan Jasa *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. UI/UX Design Pro & Figma Audit"
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 outline-none text-xs font-semibold focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Kategori Jasa *</label>
                  <select 
                    value={newService.category}
                    onChange={(e) => setNewService({...newService, category: e.target.value as any})}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 outline-none text-xs font-semibold focus:ring-2 focus:ring-emerald-600"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Estimasi Penyusunan *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 3 Hari"
                    value={newService.duration}
                    onChange={(e) => setNewService({...newService, duration: e.target.value})}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 outline-none text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tarif Konsultasi (Rp) *</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 450000"
                    value={newService.price}
                    onChange={(e) => setNewService({...newService, price: e.target.value})}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 outline-none text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Lokasi Pengerjaan *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Online / Remote"
                    value={newService.location}
                    onChange={(e) => setNewService({...newService, location: e.target.value})}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 outline-none text-xs font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Detail Cakupan Layanan Jasa</label>
                <textarea 
                  rows={4}
                  placeholder="Deskripsikan proses pengerjaan jasa, portofolio, teknologi yang dikuasai, atau detail konsultasi."
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  className="w-full p-3.5 rounded-xl border bg-slate-50 dark:bg-slate-950 dark:border-slate-800 outline-none text-xs font-semibold focus:ring-2 focus:ring-emerald-600"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                Daarkan &amp; Publikasikan Layanan Jasa &rarr;
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab content view */}
      {activeTab === "katalog" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => (
            <div 
              key={item.id} 
              className={`p-6 rounded-3xl border text-left relative overflow-hidden transition-all hover:shadow-xl ${
                isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
              }`}
            >
              <div className="flex justify-between items-start mb-30 mb-2">
                <span className="px-2.5 py-1 text-[9px] bg-emerald-50 text-emerald-600 rounded-full font-black uppercase tracking-widest">
                  {item.category}
                </span>
                <span className="text-[10px] font-bold text-slate-400 font-mono">ID: {item.id}</span>
              </div>

              <h3 className="font-display font-black text-slate-800 dark:text-slate-100 text-sm leading-tight tracking-tight h-10 line-clamp-2">
                {item.name}
              </h3>
              
              <p className="text-[11px] text-slate-400 mt-2 font-medium line-clamp-2 h-8">
                {item.description || "Tidak ada rincian jasa pendukung."}
              </p>

              {/* Service pricing packages box */}
              <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                  <span>Mulai Dari Paket</span>
                  <span className="text-emerald-500 font-extrabold font-mono">Rp {item.price.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-slate-500 font-semibold pl-1">
                  <span className="flex items-center gap-1"><Clock size={12} /> {item.duration} pengerjaan</span>
                  <span className="flex items-center gap-1"><MapPin size={12} className="shrink-0" /> {item.location}</span>
                </div>
              </div>

              {/* Portfolios metadata */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
                <span>{item.portfolioCount} Projek Portofolio</span>
                <span className="text-emerald-600 hover:underline cursor-pointer">Edit Paket Layanan &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "kalender" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Calendar visual left representation */}
          <div className={`p-6 rounded-[2rem] border lg:col-span-8 ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"}`}>
            <div className="flex items-center justify-between pb-4 border-b dark:border-slate-800 mb-6Shared">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-650 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Operational Schedule
                </span>
                <h3 className="text-base font-black tracking-tight mt-1.5">Kalender &amp; Ketersediaan Reservasi</h3>
              </div>
              <span className="text-xs text-slate-500 font-bold">Mei 2026</span>
            </div>

            {/* Simulated interactive calendar weeks */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-slate-400 mb-4 pl-1">
              <span>SEN</span><span>SEL</span><span>RAB</span><span>KAM</span><span>JUM</span><span>SAB</span><span>MIN</span>
            </div>
            <div className="grid grid-cols-7 gap-3 mb-6">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isSelected = day === 26 || day === 27 || day === 28;
                return (
                  <div 
                    key={i} 
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer relative ${
                      isSelected 
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 font-black shadow-inner" 
                        : "bg-slate-50/50 hover:bg-slate-100 dark:bg-slate-950 dark:border-slate-800"
                    }`}
                  >
                    <span>{day}</span>
                    {isSelected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 bg-slate-50/60 font-sans p-4 rounded-xl border dark:bg-slate-950 dark:border-slate-800">
              <span className="text-[10px] bg-amber-500 text-white rounded-md font-black px-2 py-0.5 uppercase tracking-wide">Pemberitahuan</span>
              <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                Tanggal dengan titik hijau/emerald menunjukkan adanya antrian live booking konsultasi interaktif dari admin pembeli. Klik di sebelah kanan untuk menyetujui booking.
              </p>
            </div>
          </div>

          {/* Dynamic booking slots right */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider pl-1 font-mono">Daftar Antrean Reservasi</h3>
            
            <div className="space-y-3.5">
              {services.map((s) => (
                <div key={s.id} className={`p-4 rounded-2xl border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block font-mono">Jasa: {s.name}</span>
                  <div className="mt-3 space-y-2">
                    {s.bookingSlots.map((slot, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => toggleSlotBooked(s.id, idx)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                          slot.booked 
                            ? "bg-red-50 text-red-700 border-red-100" 
                            : "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} className={slot.booked ? "text-red-500" : "text-emerald-600"} />
                          <span>{slot.time} ({slot.date})</span>
                        </div>
                        <span className="text-[9px] uppercase font-black tracking-widest">
                          {slot.booked ? "Direservasi" : "Tersedia"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "custom_form" && (
        <div id="booking-customform-widget" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Dynamic question list creator on the left */}
          <div className={`p-6 rounded-[2rem] border lg:col-span-6 text-left ${
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-150"
          }`}>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Intake Form Configurator</span>
            <h3 className="text-base font-black tracking-tight mt-1.5 mb-4">Tambahkan Formulir Pertanyaan Mandiri</h3>
            <p className="text-xs text-slate-400 font-medium mb-6">Buat kuesioner otomatis khusus yang harus diisi pembeli saat mem-booking draf jasa Anda.</p>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Pertanyaan / Label Input</label>
                <input 
                  type="text"
                  placeholder="e.g. Lampirkan link Figma Anda"
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-xs font-medium outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Tipe Inputan</label>
                  <select 
                    value={selectedBookingFieldType}
                    onChange={(e) => setSelectedBookingFieldType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-950 dark:border-slate-800 text-xs font-medium outline-none"
                  >
                    <option value="text">Teks Pendek</option>
                    <option value="paragraph">Teks Panjang</option>
                    <option value="file">Unggah File Dokumen</option>
                    <option value="number">Jumlah Angka</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button 
                    type="button"
                    onClick={handleAddField}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl cursor-pointer"
                  >
                    Tambah Kolom
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form preview component layout on the right */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider pl-1 font-mono">Live Preview Intake Form</h3>
            
            <div className={`p-6 rounded-[2rem] border ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"} space-y-4 text-left`}>
              <div className="pb-3 border-b dark:border-slate-800">
                <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest block">Format Booking Checkout Jasa</span>
                <h4 className="font-display font-black text-slate-705 dark:text-slate-100 text-sm mt-1">Form Kebutuhan Pelanggan</h4>
              </div>

              <div className="space-y-4">
                {customFields.map((field) => (
                  <div key={field.id} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border dark:border-slate-800 relative z-10 group">
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </span>
                      <button 
                        onClick={() => handleRemoveField(field.id)}
                        className="text-[10px] text-red-500 opacity-0 group-hover:opacity-100 hover:underline transition-opacity cursor-pointer"
                      >
                        Hapus kol
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold block font-mono capitalize">Tipe: {field.type}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button 
                  type="button"
                  onClick={() => onTriggerNotification("Simulasi checkout intake teruji!")}
                  className="w-full py-2 bg-slate-700 text-white rounded-xl text-[10px] font-black tracking-widest uppercase cursor-pointer"
                >
                  Simulasikan Input Formulir Pembeli
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
