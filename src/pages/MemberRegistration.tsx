import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { User, ClipboardList, GraduationCap, Briefcase, Store, Heart, Network, Share2, Upload, Plus, Trash2, Lock } from "lucide-react";

const PROFESSION_OPTIONS = [
  "Anggota DPR",
  "PNS",
  "PPPK",
  "ASN",
  "Pegawai Honorer",
  "TNI",
  "POLRI",
  "Karyawan Swasta",
  "Kepala Desa",
  "Pegawasi PEMDA",
  "Pegawai BUMN",
  "Pegawai BUMD",
  "Wiraswasta",
  "Pengusaha",
  "Pedagang",
  "Freelancer",
  "Pekerja Lepas",
  "Dokter",
  "Pengacara",
  "Arsitek",
  "Konsultan",
  "Petani",
  "Nelayan",
  "Peternak",
  "Buruh",
  "Driver Ojek Online",
  "Kurir",
  "Ibu Rumah Tangga",
  "Pelajar",
  "Mahasiswa",
  "Belum/Tidak Bekerja",
  "Profesi Lainya"
];

export default function MemberRegistration() {
  const [formData, setFormData] = useState<any>({
    interests: [],
    networks: [],
    contributions: [],
    educationHistory: [],
    pmiiHistory: [],
    professionHistory: [],
    businessHistory: []
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Temp input states for dynamic history fields
  const [eduInput, setEduInput] = useState("");
  const [pmiiInput, setPmiiInput] = useState("");
  const [profInput, setProfInput] = useState("");

  // States for adding detailed custom education
  const [addEduLevel, setAddEduLevel] = useState("S1");
  const [addEduInstitution, setAddEduInstitution] = useState("");
  const [addEduGradYear, setAddEduGradYear] = useState("");
  const [addEduCertType, setAddEduCertType] = useState("Ijazah");
  const [addEduDegree, setAddEduDegree] = useState("");
  const [addEduMajor, setAddEduMajor] = useState("");
  const [editingEduIdx, setEditingEduIdx] = useState<number | null>(null);

  const handleAddEducation = () => {
    const level = addEduLevel.trim();
    const inst = addEduInstitution.trim();
    const yr = addEduGradYear.trim();
    const cert = addEduCertType.trim();
    const deg = addEduDegree.trim();
    const maj = addEduMajor.trim();

    if (!level && !inst && !yr && !cert && !deg && !maj) return;

    const newItem = {
      level,
      institution: inst || "-",
      gradYear: yr || "-",
      certType: cert || "-",
      degree: deg || "-",
      major: maj || "-"
    };

    if (editingEduIdx !== null) {
      setFormData((prev: any) => {
        const updated = [...(prev.educationHistory || [])];
        updated[editingEduIdx] = newItem;
        return {
          ...prev,
          educationHistory: updated
        };
      });
      setEditingEduIdx(null);
    } else {
      setFormData((prev: any) => ({
        ...prev,
        educationHistory: [...(prev.educationHistory || []), newItem]
      }));
    }

    // Reset inputs
    setAddEduLevel("S1");
    setAddEduInstitution("");
    setAddEduGradYear("");
    setAddEduCertType("Ijazah");
    setAddEduDegree("");
    setAddEduMajor("");
  };

  // States for adding detailed custom jobs/professions
  const [addJobStatus, setAddJobStatus] = useState("Aktif");
  const [addSideProfession, setAddSideProfession] = useState("");
  const [addProfessionDropdown, setAddProfessionDropdown] = useState("");
  const [addCompany, setAddCompany] = useState("");
  const [addPosition, setAddPosition] = useState("");
  const [addSector, setAddSector] = useState("");
  const [editingJobIdx, setEditingJobIdx] = useState<number | null>(null);

  // States for adding detailed custom businesses
  const [addHasBusiness, setAddHasBusiness] = useState("Ya");
  const [addBusinessName, setAddBusinessName] = useState("");
  const [addBusinessType, setAddBusinessType] = useState("");
  const [addBusinessLocation, setAddBusinessLocation] = useState("");
  const [addBusinessDesc, setAddBusinessDesc] = useState("");
  const [editingBizIdx, setEditingBizIdx] = useState<number | null>(null);

  const handleAddBusiness = () => {
    const name = addBusinessName.trim();
    const type = addBusinessType.trim();
    const loc = addBusinessLocation.trim();
    const desc = addBusinessDesc.trim();
    const runs = addHasBusiness.trim();
    
    if (!name && !type && !loc && !desc) return;
    
    const newItem = {
      runs: runs || "Ya",
      name: name || "-",
      type: type || "-",
      location: loc || "-",
      description: desc || "-"
    };
    
    if (editingBizIdx !== null) {
      setFormData((prev: any) => {
        const updated = [...(prev.businessHistory || [])];
        updated[editingBizIdx] = newItem;
        return {
          ...prev,
          businessHistory: updated
        };
      });
      setEditingBizIdx(null);
    } else {
      setFormData((prev: any) => ({
        ...prev,
        businessHistory: [...(prev.businessHistory || []), newItem]
      }));
    }
    
    // Clear inputs
    setAddHasBusiness("Ya");
    setAddBusinessName("");
    setAddBusinessType("");
    setAddBusinessLocation("");
    setAddBusinessDesc("");
  };

  const handleAddProfession = () => {
    const sideProf = addSideProfession.trim();
    const comp = addCompany.trim();
    const pos = addPosition.trim();
    const status = addJobStatus.trim();
    const sec = addSector.trim();
    
    if (!sideProf && !comp && !pos && !sec) return;
    
    const newItem = {
      profession: sideProf || "-",
      company: comp || "-",
      position: pos || "-",
      jobStatus: status || "-",
      sector: sec || "-"
    };
    
    if (editingJobIdx !== null) {
      setFormData((prev: any) => {
        const updated = [...(prev.professionHistory || [])];
        updated[editingJobIdx] = newItem;
        return {
          ...prev,
          professionHistory: updated
        };
      });
      setEditingJobIdx(null);
    } else {
      setFormData((prev: any) => ({
        ...prev,
        professionHistory: [...(prev.professionHistory || []), newItem]
      }));
    }
    
    // Clear inputs
    setAddJobStatus("Aktif");
    setAddSideProfession("");
    setAddProfessionDropdown("");
    setAddCompany("");
    setAddPosition("");
    setAddSector("");
  };

  // States for adding detailed custom PMII history
  const [addPmiiLevel, setAddPmiiLevel] = useState("MAPABA");
  const [addPmiiYear, setAddPmiiYear] = useState("");
  const [addPmiiCampus, setAddPmiiCampus] = useState("");
  const [addPmiiOrganizer, setAddPmiiOrganizer] = useState("");
  const [addPmiiLastPosition, setAddPmiiLastPosition] = useState("");
  const [addPmiiCertificate, setAddPmiiCertificate] = useState("");
  const [addPmiiCertificateUrl, setAddPmiiCertificateUrl] = useState("");
  const [editingPmiiIdx, setEditingPmiiIdx] = useState<number | null>(null);

  const handleAddPmiiCadre = () => {
    const level = addPmiiLevel.trim();
    const yr = addPmiiYear.trim();
    const camp = addPmiiCampus.trim();
    const org = addPmiiOrganizer.trim();
    const pos = addPmiiLastPosition.trim();

    if (!level && !yr && !camp && !org && !pos) return;

    const newItem = {
      level: level || "-",
      year: yr || "-",
      campus: camp || "-",
      organizer: org || "-",
      lastPosition: pos || "-",
      certificate: addPmiiCertificate || "",
      certificateUrl: addPmiiCertificateUrl || ""
    };

    if (editingPmiiIdx !== null) {
      setFormData((prev: any) => {
        const updated = [...(prev.pmiiHistory || [])];
        updated[editingPmiiIdx] = newItem;
        return {
          ...prev,
          pmiiHistory: updated
        };
      });
      setEditingPmiiIdx(null);
    } else {
      setFormData((prev: any) => ({
        ...prev,
        pmiiHistory: [...(prev.pmiiHistory || []), newItem]
      }));
    }

    // Reset inputs
    setAddPmiiLevel("MAPABA");
    setAddPmiiYear("");
    setAddPmiiCampus("");
    setAddPmiiOrganizer("");
    setAddPmiiLastPosition("");
    setAddPmiiCertificate("");
    setAddPmiiCertificateUrl("");
  };

  // States for options list of Networks, Interests, and Contributions
  const [networksList, setNetworksList] = useState<string[]>([
    "NU", "Partai Politik", "NGO", "Ormas Lain", "Komunitas Bisnis", "Forum Profesi"
  ]);
  const [customNetworkName, setCustomNetworkName] = useState("");
  const [customNetworkYear, setCustomNetworkYear] = useState("");
  const [customNetworkPosition, setCustomNetworkPosition] = useState("");
  const [editingNetIdx, setEditingNetIdx] = useState<number | null>(null);

  const [interestsList, setInterestsList] = useState<string[]>([
    "Ekonomi", "Pendidikan", "Hukum", "Digitalisasi", "Politik", "Pertanian", "Investasi"
  ]);
  const [customInterest, setCustomInterest] = useState("");

  const [contributionsList, setContributionsList] = useState<string[]>([
    "Pendampingan Karir/Magang", "Modul Pelatihan", "Konsultasi Hukum", "Beasiswa/Dana Abadi", "Bantuan Politik", "Wirausaha & UMKM", "Suplai Mitra Koperasi"
  ]);
  const [customContribution, setCustomContribution] = useState("");

  const handleAddNetwork = () => {
    const name = customNetworkName.trim();
    const year = customNetworkYear.trim();
    const pos = customNetworkPosition.trim();
    if (!name) return;
    
    const newItem = {
      name,
      year: year || "-",
      position: pos || "-"
    };
    
    if (editingNetIdx !== null) {
      setFormData((prev: any) => {
        const updated = [...(prev.networks || [])];
        updated[editingNetIdx] = newItem;
        return {
          ...prev,
          networks: updated
        };
      });
      setEditingNetIdx(null);
    } else {
      setFormData((prev: any) => ({
        ...prev,
        networks: [...(prev.networks || []), newItem]
      }));
    }
    
    setCustomNetworkName("");
    setCustomNetworkYear("");
    setCustomNetworkPosition("");
  };

  const handleAddInterest = () => {
    const trimmed = customInterest.trim();
    if (!trimmed) return;
    if (!interestsList.includes(trimmed)) {
      setInterestsList(prev => [...prev, trimmed]);
    }
    if (!formData.interests?.includes(trimmed)) {
      setFormData((prev: any) => ({
        ...prev,
        interests: [...(prev.interests || []), trimmed]
      }));
    }
    setCustomInterest("");
  };

  const handleAddContribution = () => {
    const trimmed = customContribution.trim();
    if (!trimmed) return;
    if (!contributionsList.includes(trimmed)) {
      setContributionsList(prev => [...prev, trimmed]);
    }
    if (!formData.contributions?.includes(trimmed)) {
      setFormData((prev: any) => ({
        ...prev,
        contributions: [...(prev.contributions || []), trimmed]
      }));
    }
    setCustomContribution("");
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (category: 'interests' | 'networks' | 'contributions', value: string) => {
    setFormData((prev: any) => {
      const list = prev[category] || [];
      const newList = list.includes(value) 
        ? list.filter((i: string) => i !== value)
        : [...list, value];
      return { ...prev, [category]: newList };
    });
  };

  const addHistoryItem = (category: 'educationHistory' | 'pmiiHistory' | 'professionHistory' | 'businessHistory', value: string) => {
    if (!value.trim()) return;
    setFormData((prev: any) => {
      const list = prev[category] || [];
      return {
        ...prev,
        [category]: [...list, value.trim()]
      };
    });
  };

  const removeHistoryItem = (category: 'educationHistory' | 'pmiiHistory' | 'professionHistory' | 'businessHistory' | 'networks', index: number) => {
    setFormData((prev: any) => {
      const list = prev[category] || [];
      return {
        ...prev,
        [category]: list.filter((_: any, i: number) => i !== index)
      };
    });
  };

  const handleSubmitPrompt = (e: FormEvent) => {
    e.preventDefault();
    setShowPreview(true);
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  const handleConfirmedSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Build simulated pending object for seamless admin dashboard integration
        const existingPending = JSON.parse(localStorage.getItem("siap_pending_registrations") || "[]");
        const newUid = Date.now();
        const newPending = {
          id: newUid,
          name: formData.fullName || "Sahabat Anggota",
          gender: formData.gender || "Laki-laki",
          pob: formData.birthPlace || "Bandung Barat",
          dob: formData.birthDate || "2000-01-01",
          komisariat: formData.pmiiHistory && formData.pmiiHistory.length > 0 ? formData.pmiiHistory[0].campus : "Komisariat Bandung Barat",
          year: formData.pmiiHistory && formData.pmiiHistory.length > 0 ? `${formData.pmiiHistory[0].level} ${formData.pmiiHistory[0].year}` : "MAPABA 2024",
          loc: formData.district || "Ngamprah",
          address: formData.address || "",
          prof: formData.professionHistory && formData.professionHistory.length > 0 ? formData.professionHistory[0].profession : "Pegiat Alumni",
          phone: formData.whatsapp || "",
          email: formData.email || "",
          lastEdu: formData.educationHistory && formData.educationHistory.length > 0 ? `${formData.educationHistory[0].level} ${formData.educationHistory[0].institution}` : "S1 Bandung Barat",
          kaderisasi: {
            mapaba: formData.pmiiHistory?.find((h: any) => h.level.includes("MAPABA"))?.year || 2024,
            pkd: formData.pmiiHistory?.find((h: any) => h.level.includes("PKD"))?.year || null,
            pkl: formData.pmiiHistory?.find((h: any) => h.level.includes("PKL"))?.year || null,
          },
          orgs: formData.networks?.map((n: any) => n.name) || ["PC IKA PMII Bandung Barat"],
          skills: formData.contributions && formData.contributions.length > 0 ? formData.contributions : ["Ekonomi", "Pendidikan"],
          img: formData.profilePictureUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
          
          // Spread complete registration payload so they propagate during validation approval
          ...formData
        };

        localStorage.setItem("siap_pending_registrations", JSON.stringify([...existingPending, newPending]));

        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-32 text-center bg-surface min-h-screen flex items-center justify-center px-4">
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl max-w-lg border border-gray-100"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <ClipboardList size={40} />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4 text-primary">Terima Kasih!</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Data pendaftaran Anda telah kami terima dengan sukses. Admin IKA PMII Kabupaten Bandung Barat akan meninjau kontribusi data Anda. Anda akan menerima username dan password melalui email setelah diverifikasi.
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-xl hover:brightness-110 mb-4"
          >
            Kembali ke Beranda
          </button>
        </motion.div>
      </div>
    );
  }

  const SectionTitle = ({ icon: Icon, title, desc }: any) => (
    <div className="border-b border-gray-100 pb-6 mb-8 flex items-start gap-4">
      <div className="w-12 h-12 bg-accent/20 text-primary rounded-2xl flex items-center justify-center shrink-0 border border-accent/10 shadow-sm">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-surface min-h-screen">
      {/* Header Section */}
      <div className="bg-primary pt-24 pb-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#ffffff05,transparent)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-7xl font-display font-bold text-accent"
           >
            Daftar Anggota
           </motion.h1>
           <motion.div 
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             className="w-24 h-1.5 bg-accent mx-auto rounded-full"
           ></motion.div>
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-surface/70 font-medium text-lg max-w-2xl mx-auto"
           >
            Lengkapi basis data direktori alumni PMII Kabupaten Bandung Barat untuk memperkuat jaringan kolektif kita.
           </motion.p>
        </div>
      </div>

      <div className="w-[90%] max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-32 z-20 relative">
        {showPreview ? (
          <ProfilePreviewData
            formData={formData}
            isSubmitting={isSubmitting}
            onEdit={(sectionId: string) => {
              setShowPreview(false);
              setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }, 150);
            }}
            onConfirm={handleConfirmedSubmit}
            onCancel={() => setShowPreview(false)}
          />
        ) : (
          <form onSubmit={handleSubmitPrompt} className="space-y-16 bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl border border-gray-100 relative z-20">
            {/* 1. DATA IDENTITAS ALUMNI */}
            <section id="section-identitas">
            <SectionTitle icon={User} title="Identitas Alumni" desc="Dasar & Kependudukan" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Nama Lengkap" name="fullName" required onChange={handleChange} value={formData.fullName} />
              <Input label="Nama Kader / Panggilan" name="nickname" onChange={handleChange} value={formData.nickname} />
              <Select label="Jenis Kelamin" name="gender" options={["Laki-laki", "Perempuan"]} onChange={handleChange} value={formData.gender} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Tempat Lahir" name="birthPlace" onChange={handleChange} value={formData.birthPlace} />
                <Input label="Tanggal Lahir" name="birthDate" type="date" onChange={handleChange} value={formData.birthDate} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 ml-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                    NIK (Nomor Induk Kependudukan)
                  </label>
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => handleChange("nikPrivacy", "Publik")}
                      className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
                        formData.nikPrivacy === "Publik" 
                          ? "bg-white text-emerald-700 shadow-sm border border-emerald-100" 
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      🔓 Publik
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange("nikPrivacy", "Admin")}
                      className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
                        (formData.nikPrivacy || "Admin") === "Admin" 
                          ? "bg-white text-amber-700 shadow-sm border border-amber-100" 
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      🔒 Hanya Admin
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  name="nik"
                  placeholder="e.g. 32170xxxxxxxxxxx"
                  value={formData.nik || ""}
                  onChange={(e) => handleChange("nik", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-1 md:col-span-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Upload Foto Profil <span className="text-red-500">*</span></label>
                  <div 
                    onClick={() => document.getElementById('profile-upload-input')?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-all min-h-[120px] relative overflow-hidden group"
                  >
                    <input 
                      id="profile-upload-input"
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleChange("profilePicture", file.name);
                          handleChange("profilePictureUrl", URL.createObjectURL(file));
                        }
                      }}
                    />
                    {formData.profilePictureUrl ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <img src={formData.profilePictureUrl} alt="Preview Foto Profil" className="h-full w-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 py-2 text-center transform translate-y-full group-hover:translate-y-0 transition-transform">
                          <span className="text-white text-[9px] font-black uppercase tracking-wider">Ganti Foto</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload size={20} className="text-gray-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] text-gray-500 font-bold block text-center">Pilih Foto Profil</span>
                        <span className="text-[8px] text-gray-400">PNG, JPG s.d. 2MB</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">Upload Foto KTP</label>
                  <div 
                    onClick={() => document.getElementById('ktp-upload-input')?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-all min-h-[120px] relative overflow-hidden group"
                  >
                    <input 
                      id="ktp-upload-input"
                      type="file" 
                      accept="image/*,application/pdf"
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleChange("ktpPicture", file.name);
                          if (file.type.startsWith('image/')) {
                            handleChange("ktpPictureUrl", URL.createObjectURL(file));
                          } else {
                            handleChange("ktpPictureUrl", "");
                          }
                        }
                      }}
                    />
                    {formData.ktpPicture ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-2 text-center">
                        {formData.ktpPictureUrl ? (
                          <img src={formData.ktpPictureUrl} alt="Preview KTP" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center">
                            <ClipboardList size={24} className="text-green-600 mb-1" />
                            <span className="text-[9px] font-bold text-gray-500 max-w-[150px] truncate">{formData.ktpPicture}</span>
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 py-2 text-center transform translate-y-full group-hover:translate-y-0 transition-transform">
                          <span className="text-white text-[9px] font-black uppercase tracking-wider">Ganti KTP</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload size={20} className="text-gray-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] text-gray-500 font-bold block text-center">Pilih Foto KTP</span>
                        <span className="text-[8px] text-gray-400">PNG, JPG, PDF s.d. 2MB</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 ml-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                    Alamat Lengkap
                  </label>
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleChange("addressPrivacy", "Publik")}
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
                        (formData.addressPrivacy || "Publik") === "Publik" 
                          ? "bg-white text-emerald-700 shadow-sm border border-emerald-100" 
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      🔓 Publik
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange("addressPrivacy", "Admin")}
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
                        formData.addressPrivacy === "Admin" 
                          ? "bg-white text-amber-700 shadow-sm border border-amber-100" 
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      🔒 Hanya Admin
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. Jl. Raya KBB No. 123"
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
                />
              </div>

              <Input label="Kecamatan" name="district" onChange={handleChange} value={formData.district} />
              <Input label="Desa/Kelurahan" name="subDistrict" onChange={handleChange} value={formData.subDistrict} />
              <Input label="Kode Pos" name="postalCode" onChange={handleChange} value={formData.postalCode} />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 ml-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                    Nomor WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => handleChange("whatsappPrivacy", "Publik")}
                      className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
                        (formData.whatsappPrivacy || "Publik") === "Publik" 
                          ? "bg-white text-emerald-700 shadow-sm border border-emerald-100" 
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      🔓 Publik
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange("whatsappPrivacy", "Admin")}
                      className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
                        formData.whatsappPrivacy === "Admin" 
                          ? "bg-white text-amber-700 shadow-sm border border-amber-100" 
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      🔒 Admin
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  name="whatsapp"
                  required
                  placeholder="e.g. 081234567890"
                  value={formData.whatsapp || ""}
                  onChange={(e) => handleChange("whatsapp", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 ml-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => handleChange("emailPrivacy", "Publik")}
                      className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
                        (formData.emailPrivacy || "Publik") === "Publik" 
                          ? "bg-white text-emerald-700 shadow-sm border border-emerald-100" 
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      🔓 Publik
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange("emailPrivacy", "Admin")}
                      className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
                        formData.emailPrivacy === "Admin" 
                          ? "bg-white text-amber-700 shadow-sm border border-amber-100" 
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      🔒 Admin
                    </button>
                  </div>
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. alumni@ikapmii.org"
                  value={formData.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
                />
              </div>
              <div className="md:col-span-2 border-t border-gray-100 pt-6 mt-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">
                  Integrasi Media Sosial Alumni
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-3xl border border-gray-100">
                  {/* Instagram */}
                  <div className="space-y-3 bg-white p-4 rounded-2.5xl border border-gray-150/70 shadow-2xs">
                    <div className="flex items-center gap-2 text-pink-600 font-bold text-xs font-display">
                      <span className="w-2 h-2 rounded-full bg-pink-600 animate-pulse" />
                      📸 Instagram
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Username IG</label>
                        <input
                          type="text"
                          placeholder="@username"
                          value={formData.instagramUsername || ""}
                          onChange={(e) => handleChange("instagramUsername", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-pink-500/30 focus:border-pink-500 focus:bg-white transition-all shadow-xs font-semibold text-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Tautan Profil IG</label>
                        <input
                          type="url"
                          placeholder="https://instagram.com/..."
                          value={formData.instagramLink || ""}
                          onChange={(e) => handleChange("instagramLink", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-pink-500/30 focus:border-pink-500 focus:bg-white transition-all shadow-xs font-semibold text-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Facebook */}
                  <div className="space-y-3 bg-white p-4 rounded-2.5xl border border-gray-150/70 shadow-2xs font-display">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                      👥 Facebook
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Username FB</label>
                        <input
                          type="text"
                          placeholder="Nama Profil"
                          value={formData.facebookUsername || ""}
                          onChange={(e) => handleChange("facebookUsername", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all shadow-xs font-semibold text-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Tautan Profil FB</label>
                        <input
                          type="url"
                          placeholder="https://facebook.com/..."
                          value={formData.facebookLink || ""}
                          onChange={(e) => handleChange("facebookLink", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all shadow-xs font-semibold text-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* TikTok */}
                  <div className="space-y-3 bg-white p-4 rounded-2.5xl border border-gray-150/70 shadow-2xs font-display">
                    <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                      <span className="w-2 h-2 rounded-full bg-slate-800 animate-pulse" />
                      🎵 TikTok
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Username TikTok</label>
                        <input
                          type="text"
                          placeholder="@username"
                          value={formData.tiktokUsername || ""}
                          onChange={(e) => handleChange("tiktokUsername", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-slate-800/30 focus:border-slate-800 focus:bg-white transition-all shadow-xs font-semibold text-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Tautan Profil TikTok</label>
                        <input
                          type="url"
                          placeholder="https://tiktok.com/@..."
                          value={formData.tiktokLink || ""}
                          onChange={(e) => handleChange("tiktokLink", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-slate-800/30 focus:border-slate-800 focus:bg-white transition-all shadow-xs font-semibold text-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* YouTube */}
                  <div className="space-y-3 bg-white p-4 rounded-2.5xl border border-gray-150/70 shadow-2xs font-display">
                    <div className="flex items-center gap-2 text-red-600 font-bold text-xs">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                      ▶️ YouTube
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Nama Channel</label>
                        <input
                          type="text"
                          placeholder="Channel Name/ID"
                          value={formData.youtubeUsername || ""}
                          onChange={(e) => handleChange("youtubeUsername", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-red-500/30 focus:border-red-500 focus:bg-white transition-all shadow-xs font-semibold text-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Tautan Channel YouTube</label>
                        <input
                          type="url"
                          placeholder="https://youtube.com/..."
                          value={formData.youtubeLink || ""}
                          onChange={(e) => handleChange("youtubeLink", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-red-500/30 focus:border-red-500 focus:bg-white transition-all shadow-xs font-semibold text-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* X (Formerly Twitter) */}
                  <div className="space-y-3 bg-white p-4 rounded-2.5xl border border-gray-150/70 shadow-2xs md:col-span-2 font-display">
                    <div className="flex items-center gap-2 text-black font-bold text-xs">
                      <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                      𝕏 / Twitter
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Username X</label>
                        <input
                          type="text"
                          placeholder="@username"
                          value={formData.xUsername || ""}
                          onChange={(e) => handleChange("xUsername", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-black/30 focus:border-black focus:bg-white transition-all shadow-xs font-semibold text-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Tautan Profil X</label>
                        <input
                          type="url"
                          placeholder="https://x.com/..."
                          value={formData.xLink || ""}
                          onChange={(e) => handleChange("xLink", e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-black/30 focus:border-black focus:bg-white transition-all shadow-xs font-semibold text-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. DATA RIWAYAT PMII */}
          <section id="section-pmii">
            <SectionTitle icon={ClipboardList} title="Riwayat PMII" desc="Kaderisasi & Organisasi" />

            {/* Dynamic Riwayat PMII */}
            <div className="mt-4 space-y-4 text-left">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">
                Riwayat Kaderisasi & PMII Anda
              </span>

              {formData.pmiiHistory && formData.pmiiHistory.length > 0 ? (
                <div className="overflow-x-auto rounded-[2rem] border border-gray-150 bg-white shadow-xs">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-black text-primary uppercase tracking-wider border-b border-gray-150">
                        <th className="px-5 py-3.5">Jenjang / Kaderisasi</th>
                        <th className="px-5 py-3.5">Tahun & Kampus</th>
                        <th className="px-5 py-3.5">Pelaksana / Penyelenggara</th>
                        <th className="px-5 py-3.5">Jabatan Terakhir</th>
                        <th className="px-5 py-3.5">Sertifikat</th>
                        <th className="px-5 py-3.5 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {formData.pmiiHistory.map((item: any, idx: number) => {
                        const isObj = typeof item === "object" && item !== null;
                        const level = isObj ? item.level : "MAPABA";
                        const yr = isObj ? item.year : "-";
                        const camp = isObj ? item.campus : item;
                        const org = isObj ? item.organizer : "-";
                        const pos = isObj ? item.lastPosition : "-";
                        const cert = isObj ? item.certificate : "";
                        const certUrl = isObj ? item.certificateUrl : "";

                        return (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors text-xs text-primary font-medium">
                            <td className="px-5 py-4 font-bold text-primary">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-slate-100 text-primary">
                                {level}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-primary font-semibold">
                              {yr} <span className="text-gray-400 font-normal">({camp})</span>
                            </td>
                            <td className="px-5 py-4 text-gray-600">{org}</td>
                            <td className="px-5 py-4 text-gray-600 font-semibold">{pos}</td>
                            <td className="px-5 py-4">
                              {cert ? (
                                <a 
                                  href={certUrl || "#"} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-[10px] font-black text-emerald-600 hover:text-emerald-800 hover:underline flex items-center gap-1 uppercase tracking-wider"
                                >
                                  📄 {cert}
                                </a>
                              ) : (
                                <span className="text-gray-400 font-mono text-[10px]">-</span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingPmiiIdx(idx);
                                    setAddPmiiLevel(level);
                                    setAddPmiiYear(yr === "-" ? "" : yr);
                                    setAddPmiiCampus(camp === "-" ? "" : camp);
                                    setAddPmiiOrganizer(org === "-" ? "" : org);
                                    setAddPmiiLastPosition(pos === "-" ? "" : pos);
                                    setAddPmiiCertificate(cert);
                                    setAddPmiiCertificateUrl(certUrl);
                                  }}
                                  className="text-[11px] font-bold text-amber-600 hover:text-amber-800 hover:bg-amber-50 px-2.5 py-1.5 rounded-xl transition-all"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (editingPmiiIdx === idx) {
                                      setEditingPmiiIdx(null);
                                      setAddPmiiLevel("MAPABA");
                                      setAddPmiiYear("");
                                      setAddPmiiCampus("");
                                      setAddPmiiOrganizer("");
                                      setAddPmiiLastPosition("");
                                      setAddPmiiCertificate("");
                                      setAddPmiiCertificateUrl("");
                                    }
                                    removeHistoryItem('pmiiHistory', idx);
                                  }}
                                  className="text-[11px] font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl transition-all"
                                >
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-150 border-dashed text-center">
                  <span className="text-xs text-gray-400 font-bold block mb-1">BELUM ADA DATA KADERISASI</span>
                  <p className="text-[11px] text-gray-400">Silakan gunakan form di bawah untuk menambahkan riwayat kaderisasi / PMII Anda.</p>
                </div>
              )}
            </div>
 
            {/* Form Tambah Riwayat Kaderisasi / PMII Baru */}
            <div className="space-y-4 text-left">
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-150/50 flex flex-col gap-4 max-w-xl">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest block">
                  {editingPmiiIdx !== null ? "Edit Riwayat PMII / Kaderisasi" : "Tambah Riwayat PMII / Kaderisasi Baru"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">1. Jenjang Kaderisasi</label>
                    <select
                      value={addPmiiLevel}
                      onChange={(e) => setAddPmiiLevel(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none"
                    >
                      <option value="MAPABA">MAPABA (Masa Penerimaan Anggota Baru)</option>
                      <option value="PKD">PKD (Pelatihan Kader Dasar)</option>
                      <option value="PKL">PKL (Pelatihan Kader Lanjut)</option>
                      <option value="PKN">PKN (Pelatihan Kader Nasional)</option>
                      <option value="Lainnya">Lainnya / Pelatihan Khusus</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">2. Tahun & Tempat Kampus</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text"
                        placeholder="Tahun (e.g. 2018)"
                        value={addPmiiYear}
                        onChange={(e) => setAddPmiiYear(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                      />
                      <input 
                        type="text"
                        placeholder="Kampus (e.g. UIN Bandung)"
                        value={addPmiiCampus}
                        onChange={(e) => setAddPmiiCampus(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">3. Pelaksana / Penyelenggara</label>
                    <input 
                      type="text"
                      placeholder="e.g. Komisariat Tarbiyah, PC PMII Bandung"
                      value={addPmiiOrganizer}
                      onChange={(e) => setAddPmiiOrganizer(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">4. Jabatan Terakhir di PMII</label>
                    <input 
                      type="text"
                      placeholder="e.g. Ketua Rayon, Pengurus Cabang"
                      value={addPmiiLastPosition}
                      onChange={(e) => setAddPmiiLastPosition(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  
                  {/* Upload Sertifikat PMII (Opsional) */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">5. Upload Sertifikat (Opsional)</label>
                    <div 
                      onClick={() => document.getElementById('pmii-cert-upload-input')?.click()}
                      className="border-2 border-dashed border-gray-200 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all min-h-[50px] bg-white shadow-xs"
                    >
                      <input 
                        id="pmii-cert-upload-input"
                        type="file" 
                        accept="image/*,application/pdf"
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setAddPmiiCertificate(file.name);
                            setAddPmiiCertificateUrl(URL.createObjectURL(file));
                          }
                        }}
                      />
                      {addPmiiCertificate ? (
                        <div className="flex items-center gap-2 text-emerald-600">
                          <ClipboardList size={16} />
                          <span className="text-[10px] font-black uppercase max-w-[250px] truncate">{addPmiiCertificate}</span>
                          <button 
                            type="button" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setAddPmiiCertificate("");
                              setAddPmiiCertificateUrl("");
                            }}
                            className="text-gray-400 hover:text-red-500 font-bold px-1"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload size={14} className="text-gray-400" />
                          <span className="text-[10px] text-gray-400 font-bold block text-center">Maksimal 2MB (PDF/JPG)</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  {editingPmiiIdx !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPmiiIdx(null);
                        setAddPmiiLevel("MAPABA");
                        setAddPmiiYear("");
                        setAddPmiiCampus("");
                        setAddPmiiOrganizer("");
                        setAddPmiiLastPosition("");
                        setAddPmiiCertificate("");
                        setAddPmiiCertificateUrl("");
                      }}
                      className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all shrink-0"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAddPmiiCadre}
                    className="px-5 py-3 bg-primary text-accent hover:brightness-110 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 shrink-0"
                  >
                    {editingPmiiIdx !== null ? (
                      <>
                        Simpan Perubahan
                      </>
                    ) : (
                      <>
                        <Plus size={14} className="stroke-[3]" />
                        Tambah Riwayat Kaderisasi
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 3. DATA PENDIDIKAN */}
          <section id="section-pendidikan">
            <SectionTitle icon={GraduationCap} title="Riwayat Pendidikan" desc="Formal & Sertifikasi" />
            
            {/* Tampilan Riwayat Pendidikan Anda */}
            <div className="mt-4 mb-8 text-left">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">
                Riwayat Pendidikan Anda
              </span>
              
              {formData.educationHistory && formData.educationHistory.length > 0 ? (
                <div className="overflow-x-auto rounded-[2rem] border border-gray-150 bg-white shadow-xs">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-black text-primary uppercase tracking-wider border-b border-gray-150">
                        <th className="px-5 py-3.5">Jenjang</th>
                        <th className="px-5 py-3.5">Universitas / Lembaga</th>
                        <th className="px-5 py-3.5">Bidang Keahlian</th>
                        <th className="px-5 py-3.5 text-center">Tahun Lulus</th>
                        <th className="px-5 py-3.5">Jenis Sertifikasi</th>
                        <th className="px-5 py-3.5">Gelar</th>
                        <th className="px-5 py-3.5 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {formData.educationHistory.map((item: any, idx: number) => {
                        const isObj = typeof item === "object" && item !== null;
                        const level = isObj ? item.level : item;
                        const inst = isObj ? item.institution : "-";
                        const yr = isObj ? item.gradYear : "-";
                        const certType = isObj ? item.certType : "-";
                        const degree = isObj ? item.degree : "-";
                        const major = (isObj && item.major) ? item.major : "-";

                        return (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors text-xs text-primary font-medium">
                            <td className="px-5 py-4 font-bold text-primary">{level}</td>
                            <td className="px-5 py-4 text-gray-600">{inst}</td>
                            <td className="px-5 py-4 text-gray-600">{major}</td>
                            <td className="px-5 py-4 text-center text-gray-500 font-mono">{yr}</td>
                            <td className="px-5 py-4 text-gray-600">{certType}</td>
                            <td className="px-5 py-4 text-primary font-semibold">{degree}</td>
                            <td className="px-5 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingEduIdx(idx);
                                    setAddEduLevel(level);
                                    setAddEduInstitution(inst === "-" ? "" : inst);
                                    setAddEduMajor(major === "-" ? "" : major);
                                    setAddEduGradYear(yr === "-" ? "" : yr);
                                    setAddEduCertType(certType === "-" ? "Ijazah" : certType);
                                    setAddEduDegree(degree === "-" ? "" : degree);
                                  }}
                                  className="text-[11px] font-bold text-amber-600 hover:text-amber-800 hover:bg-amber-50 px-2.5 py-1.5 rounded-xl transition-all"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (editingEduIdx === idx) {
                                      setEditingEduIdx(null);
                                      setAddEduLevel("S1");
                                      setAddEduInstitution("");
                                      setAddEduMajor("");
                                      setAddEduGradYear("");
                                      setAddEduCertType("Ijazah");
                                      setAddEduDegree("");
                                    }
                                    removeHistoryItem('educationHistory', idx);
                                  }}
                                  className="text-[11px] font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl transition-all"
                                >
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-150 border-dashed text-center">
                  <span className="text-xs text-gray-400 font-bold block mb-1">BELUM ADA DATA</span>
                  <p className="text-[11px] text-gray-400">Silakan gunakan form di bawah untuk menambahkan riwayat pendidikan atau sertifikasi Anda.</p>
                </div>
              )}
            </div>
            
            {/* Form Tambah Riwayat Pendidikan / Sertifikasi */}
            <div className="space-y-4 text-left">
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-150/50 flex flex-col gap-4 max-w-xl">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest block">
                  {editingEduIdx !== null ? "Edit Riwayat Pendidikan / Sertifikasi" : "Tambah Riwayat Pendidikan / Sertifikasi Baru"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">1. Jenjang Pendidikan</label>
                    <select
                      value={addEduLevel}
                      onChange={(e) => setAddEduLevel(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none"
                    >
                      <option value="S1">S1 (Sarjana)</option>
                      <option value="S2">S2 (Magister)</option>
                      <option value="S3">S3 (Doktor)</option>
                      <option value="Diploma">Diploma (D1-D4)</option>
                      <option value="Vokasi">Vokasi / Kejuruan</option>
                      <option value="Nonformal">Pendidikan Nonformal</option>
                      <option value="Sertifikasi Profesi">Sertifikasi Profesi</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">2. Universitas / Instansi Pendidikan</label>
                    <input 
                      type="text"
                      placeholder="e.g. Universitas Indonesia, Digital Academy"
                      value={addEduInstitution}
                      onChange={(e) => setAddEduInstitution(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">3. Bidang Keahlian / Jurusan</label>
                    <input 
                      type="text"
                      placeholder="e.g. Hukum Bisnis, Fullstack Web Development"
                      value={addEduMajor}
                      onChange={(e) => setAddEduMajor(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">4. Tahun Lulus</label>
                    <input 
                      type="text"
                      placeholder="e.g. 2026"
                      value={addEduGradYear}
                      onChange={(e) => setAddEduGradYear(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1 col-span-1 sm:col-span-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">5. Jenis Sertifikasi / Dokumen</label>
                    <select
                      value={addEduCertType}
                      onChange={(e) => setAddEduCertType(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none"
                    >
                      <option value="Ijazah">Ijazah</option>
                      <option value="Sertifikat">Sertifikat Kelulusan</option>
                      <option value="Sertifikasi Profesi">Sertifikasi Kompetensi</option>
                      <option value="Piagam">Piagam</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">6. Gelar yang Diperoleh</label>
                    <input 
                      type="text"
                      placeholder="e.g. S.Kom, M.T, Certified Web Developer"
                      value={addEduDegree}
                      onChange={(e) => setAddEduDegree(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  {editingEduIdx !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEduIdx(null);
                        setAddEduLevel("S1");
                        setAddEduInstitution("");
                        setAddEduMajor("");
                        setAddEduGradYear("");
                        setAddEduCertType("Ijazah");
                        setAddEduDegree("");
                      }}
                      className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all shrink-0"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAddEducation}
                    className="px-5 py-3 bg-primary text-accent hover:brightness-110 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 shrink-0"
                  >
                    {editingEduIdx !== null ? (
                      <>
                        Simpan Perubahan
                      </>
                    ) : (
                      <>
                        <Plus size={14} className="stroke-[3]" />
                        Tambah Pendidikan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 4. DATA PROFESI */}
          <section id="section-profesi">
            <SectionTitle icon={Briefcase} title="Profesi & Pekerjaan" desc="Informasi Karir" />
            
            {/* Tampilan Riwayat Pekerjaan & Profesi Anda */}
            <div className="mt-4 mb-8 text-left">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">
                Riwayat Pekerjaan & Profesi Anda
              </span>
              
              {formData.professionHistory && formData.professionHistory.length > 0 ? (
                <div className="overflow-x-auto rounded-[2rem] border border-gray-150 bg-white shadow-xs">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-black text-primary uppercase tracking-wider border-b border-gray-150">
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5">Profesi / Pekerjaan</th>
                        <th className="px-5 py-3.5">Instansi / Perusahaan</th>
                        <th className="px-5 py-3.5">Jabatan</th>
                        <th className="px-5 py-3.5">Sektor</th>
                        <th className="px-5 py-3.5 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {formData.professionHistory.map((item: any, idx: number) => {
                        const isObj = typeof item === "object" && item !== null;
                        const status = isObj ? item.jobStatus : "Aktif";
                        const prof = isObj ? item.profession : item;
                        const comp = isObj ? item.company : "-";
                        const pos = isObj ? item.position : "-";
                        const sec = isObj ? item.sector : "-";

                        return (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors text-xs text-primary font-medium">
                            <td className="px-5 py-4 font-bold text-primary">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                                status === "Aktif" ? "bg-green-50 text-green-700" :
                                status === "Purna" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                              }`}>
                                {status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-gray-600 font-semibold">{prof}</td>
                            <td className="px-5 py-4 text-gray-600">{comp}</td>
                            <td className="px-5 py-4 text-primary font-semibold">{pos}</td>
                            <td className="px-5 py-4 text-gray-500 font-mono">{sec}</td>
                            <td className="px-5 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingJobIdx(idx);
                                    setAddJobStatus(status);
                                    const profVal = prof === "-" ? "" : prof;
                                    setAddSideProfession(profVal);
                                    if (profVal === "") {
                                      setAddProfessionDropdown("");
                                    } else if (PROFESSION_OPTIONS.includes(profVal)) {
                                      setAddProfessionDropdown(profVal);
                                    } else {
                                      setAddProfessionDropdown("Profesi Lainya");
                                    }
                                    setAddCompany(comp === "-" ? "" : comp);
                                    setAddPosition(pos === "-" ? "" : pos);
                                    setAddSector(sec === "-" ? "" : sec);
                                  }}
                                  className="text-[11px] font-bold text-amber-600 hover:text-amber-800 hover:bg-amber-50 px-2.5 py-1.5 rounded-xl transition-all"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (editingJobIdx === idx) {
                                      setEditingJobIdx(null);
                                      setAddJobStatus("Aktif");
                                      setAddSideProfession("");
                                      setAddProfessionDropdown("");
                                      setAddCompany("");
                                      setAddPosition("");
                                      setAddSector("");
                                    }
                                    removeHistoryItem('professionHistory', idx);
                                  }}
                                  className="text-[11px] font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl transition-all"
                                >
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-150 border-dashed text-center">
                  <span className="text-xs text-gray-400 font-bold block mb-1">BELUM ADA DATA</span>
                  <p className="text-[11px] text-gray-400">Silakan gunakan form di bawah untuk menambahkan riwayat profesi atau pekerjaan Anda.</p>
                </div>
              )}
            </div>
            
            {/* Form Tambah Riwayat Profesi / Pekerjaan Baru */}
            <div className="space-y-4 text-left">
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-150/50 flex flex-col gap-4 max-w-xl">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest block">
                  {editingJobIdx !== null ? "Edit Riwayat Profesi / Pekerjaan" : "Tambah Riwayat Profesi / Pekerjaan Baru"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">1. Status Pekerjaan</label>
                    <select
                      value={addJobStatus}
                      onChange={(e) => setAddJobStatus(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Purna">Purna</option>
                      <option value="Job Seeker">Job Seeker</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">2. Profesi / Pekerjaan</label>
                    <select
                      value={addProfessionDropdown}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAddProfessionDropdown(val);
                        if (val !== "Profesi Lainya" && val !== "") {
                          setAddSideProfession(val);
                        } else {
                          setAddSideProfession("");
                        }
                      }}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none cursor-pointer"
                    >
                      <option value="">-- Pilih Profesi --</option>
                      {PROFESSION_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  {addProfessionDropdown === "Profesi Lainya" && (
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[9px] font-bold text-amber-600 uppercase tracking-widest block font-black">
                        Isi Profesi Secara Manual
                      </label>
                      <input 
                        type="text"
                        placeholder="e.g. Pegawai Khusus, Guru Ngaji, Masinis"
                        value={addSideProfession}
                        onChange={(e) => setAddSideProfession(e.target.value)}
                        className="w-full bg-white border border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 transition-all shadow-sm"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">3. Nama Instansi / Perusahaan</label>
                    <input 
                      type="text"
                      placeholder="e.g. PT Tech Indonesia, Universitas..."
                      value={addCompany}
                      onChange={(e) => setAddCompany(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">4. Jabatan</label>
                    <input 
                      type="text"
                      placeholder="e.g. Senior Developer, Ka. Prodi"
                      value={addPosition}
                      onChange={(e) => setAddPosition(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">5. Sektor Aktivitas</label>
                    <input 
                      type="text"
                      placeholder="e.g. #Pendidikan, #Teknologi, #Hukum"
                      value={addSector}
                      onChange={(e) => setAddSector(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  {editingJobIdx !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingJobIdx(null);
                        setAddJobStatus("Aktif");
                        setAddSideProfession("");
                        setAddProfessionDropdown("");
                        setAddCompany("");
                        setAddPosition("");
                        setAddSector("");
                      }}
                      className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all shrink-0"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAddProfession}
                    className="px-5 py-3 bg-primary text-accent hover:brightness-110 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 shrink-0"
                  >
                    {editingJobIdx !== null ? (
                      <>
                        Simpan Perubahan
                      </>
                    ) : (
                      <>
                        <Plus size={14} className="stroke-[3]" />
                        Tambah Pekerjaan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 5. DATA USAHA */}
          <section id="section-usaha">
            <SectionTitle icon={Store} title="Usaha & Bisnis" desc="Wirausaha Alumni" />
            
            {/* Tampilan Riwayat Usaha & Bisnis Anda */}
            <div className="mt-4 mb-8 text-left">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">
                Riwayat Usaha & Bisnis Anda
              </span>
              
              {formData.businessHistory && formData.businessHistory.length > 0 ? (
                <div className="overflow-x-auto rounded-[2rem] border border-gray-150 bg-white shadow-xs">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-black text-primary uppercase tracking-wider border-b border-gray-150">
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5">Nama Usaha / Brand</th>
                        <th className="px-5 py-3.5">Jenis / Bidang Usaha</th>
                        <th className="px-5 py-3.5">Lokasi Usaha</th>
                        <th className="px-5 py-3.5">Deskripsi</th>
                        <th className="px-5 py-3.5 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {formData.businessHistory.map((item: any, idx: number) => {
                        const isObj = typeof item === "object" && item !== null;
                        const status = isObj ? item.runs : "Ya";
                        const name = isObj ? item.name : item;
                        const type = isObj ? item.type : "-";
                        const loc = isObj ? item.location : "-";
                        const desc = isObj ? item.description : "-";

                        return (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors text-xs text-primary font-medium">
                            <td className="px-5 py-4 font-bold text-primary">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                                status === "Ya" ? "bg-green-50 text-green-700" : "bg-rose-50 text-rose-700"
                              }`}>
                                {status === "Ya" ? "Aktif Berjalan" : "Tidak Aktif"}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-gray-600 font-semibold">{name}</td>
                            <td className="px-5 py-4 text-gray-600">{type}</td>
                            <td className="px-5 py-4 text-primary font-semibold">{loc}</td>
                            <td className="px-5 py-4 text-gray-500 font-mono text-left max-w-xs truncate" title={desc}>{desc}</td>
                            <td className="px-5 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingBizIdx(idx);
                                    setAddHasBusiness(status);
                                    setAddBusinessName(name === "-" ? "" : name);
                                    setAddBusinessType(type === "-" ? "" : type);
                                    setAddBusinessLocation(loc === "-" ? "" : loc);
                                    setAddBusinessDesc(desc === "-" ? "" : desc);
                                  }}
                                  className="text-[11px] font-bold text-amber-600 hover:text-amber-800 hover:bg-amber-50 px-2.5 py-1.5 rounded-xl transition-all"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (editingBizIdx === idx) {
                                      setEditingBizIdx(null);
                                      setAddHasBusiness("Ya");
                                      setAddBusinessName("");
                                      setAddBusinessType("");
                                      setAddBusinessLocation("");
                                      setAddBusinessDesc("");
                                    }
                                    removeHistoryItem('businessHistory', idx);
                                  }}
                                  className="text-[11px] font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl transition-all"
                                >
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-150 border-dashed text-center">
                  <span className="text-xs text-gray-400 font-bold block mb-1">BELUM ADA DATA</span>
                  <p className="text-[11px] text-gray-400">Silakan gunakan form di bawah untuk menambahkan riwayat usaha atau bisnis Anda.</p>
                </div>
              )}
            </div>
            
            {/* Form Tambah Riwayat Usaha Baru */}
            <div className="space-y-4 text-left">
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-150/50 flex flex-col gap-4 max-w-xl">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest block">
                  {editingBizIdx !== null ? "Edit Riwayat Usaha / Bisnis" : "Tambah Riwayat Usaha / Bisnis Baru"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">1. Status Keaktifan Usaha</label>
                    <select
                      value={addHasBusiness}
                      onChange={(e) => setAddHasBusiness(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm appearance-none"
                    >
                      <option value="Ya">Aktif Berjalan</option>
                      <option value="Tidak">Tidak Aktif</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">2. Nama Usaha / Brand</label>
                    <input 
                      type="text"
                      placeholder="misal: Kopi Mandiri, Cafe Digital"
                      value={addBusinessName}
                      onChange={(e) => setAddBusinessName(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">3. Bidang / Jenis Usaha</label>
                    <input 
                      type="text"
                      placeholder="misal: Kuliner, Agrosains, Kreatif"
                      value={addBusinessType}
                      onChange={(e) => setAddBusinessType(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">4. Lokasi Usaha</label>
                    <input 
                      type="text"
                      placeholder="misal: Padalarang, Bandung Barat"
                      value={addBusinessLocation}
                      onChange={(e) => setAddBusinessLocation(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">5. Deskripsi Usaha / Bisnis</label>
                    <input 
                      type="text"
                      placeholder="misal: Penjualan biji kopi lokal hasil panen tani Lembang..."
                      value={addBusinessDesc}
                      onChange={(e) => setAddBusinessDesc(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  {editingBizIdx !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBizIdx(null);
                        setAddHasBusiness("Ya");
                        setAddBusinessName("");
                        setAddBusinessType("");
                        setAddBusinessLocation("");
                        setAddBusinessDesc("");
                      }}
                      className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all shrink-0"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAddBusiness}
                    className="px-5 py-3 bg-primary text-accent hover:brightness-110 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 shrink-0"
                  >
                    {editingBizIdx !== null ? (
                      <>
                        Simpan Perubahan
                      </>
                    ) : (
                      <>
                        <Plus size={14} className="stroke-[3]" />
                        Tambah Usaha
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 6. DATA KELUARGA */}
          <section id="section-keluarga">
            <SectionTitle icon={Heart} title="Keluarga & Pasangan" desc="Networking Keluarga" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Select label="Status Pernikahan" name="maritalStatus" options={["Belum Menikah", "Menikah", "Duda", "Janda"]} onChange={handleChange} value={formData.maritalStatus} />
               <Select label="Pasangan Kader PMII?" name="spouseIsPmii" options={["Ya", "Tidak"]} onChange={handleChange} value={formData.spouseIsPmii} />
               <Input label="Nama Pasangan" name="spouseName" onChange={handleChange} value={formData.spouseName} />
               <Input label="Profesi Pasangan" name="spouseProfession" onChange={handleChange} value={formData.spouseProfession} />
            </div>
          </section>

          {/* 7. DATA JEJARING */}
          <section id="section-jejaring">
            <SectionTitle icon={Network} title="Jejaring Organisasi" desc="Afiliasi Luar" />
            
            {/* Tampilan Riwayat Jejaring Organisasi Anda */}
            <div className="mt-4 mb-8 text-left">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">
                Riwayat Jejaring Organisasi Anda
              </span>
              
              {formData.networks && formData.networks.length > 0 ? (
                <div className="overflow-x-auto rounded-[2rem] border border-gray-150 bg-white shadow-xs">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-black text-primary uppercase tracking-wider border-b border-gray-150">
                        <th className="px-5 py-3.5">Nama Organisasi / Afiliasi</th>
                        <th className="px-5 py-3.5">Jabatan / Posisi</th>
                        <th className="px-5 py-3.5 text-center">Tahun Aktif / Periode</th>
                        <th className="px-5 py-3.5 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {formData.networks.map((item: any, idx: number) => {
                        const isObj = typeof item === "object" && item !== null;
                        const name = isObj ? item.name : item;
                        const year = isObj ? item.year : "-";
                        const position = isObj ? item.position : "-";

                        return (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors text-xs text-primary font-medium">
                            <td className="px-5 py-4 font-bold text-primary">{name}</td>
                            <td className="px-5 py-4 text-gray-600 font-semibold">{position}</td>
                            <td className="px-5 py-4 text-center text-gray-500 font-mono">{year}</td>
                            <td className="px-5 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingNetIdx(idx);
                                    setCustomNetworkName(name === "-" ? "" : name);
                                    setCustomNetworkPosition(position === "-" ? "" : position);
                                    setCustomNetworkYear(year === "-" ? "" : year);
                                  }}
                                  className="text-[11px] font-bold text-amber-600 hover:text-amber-800 hover:bg-amber-50 px-2.5 py-1.5 rounded-xl transition-all"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (editingNetIdx === idx) {
                                      setEditingNetIdx(null);
                                      setCustomNetworkName("");
                                      setCustomNetworkPosition("");
                                      setCustomNetworkYear("");
                                    }
                                    removeHistoryItem('networks', idx);
                                  }}
                                  className="text-[11px] font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl transition-all"
                                >
                                  Hapus
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-gray-50/50 border border-gray-150 border-dashed text-center">
                  <span className="text-xs text-gray-400 font-bold block mb-1">BELUM ADA DATA</span>
                  <p className="text-[11px] text-gray-400">Silakan gunakan form di bawah untuk menambahkan jejaring organisasi Anda.</p>
                </div>
              )}
            </div>
            
            {/* Form Tambah Jejaring Organisasi Baru */}
            <div className="space-y-4 text-left">
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-150/50 flex flex-col gap-4 max-w-xl">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest block">
                  {editingNetIdx !== null ? "Edit Jejaring Organisasi" : "Tambah Jejaring Organisasi Baru"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">1. Nama Organisasi</label>
                    <input 
                      type="text"
                      placeholder="e.g. Fatayat, Ansor, HMI"
                      value={customNetworkName}
                      onChange={(e) => setCustomNetworkName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddNetwork();
                        }
                      }}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">2. Jabatan / Posisi</label>
                    <input 
                      type="text"
                      placeholder="e.g. Ketua, Sekretaris, Anggota"
                      value={customNetworkPosition}
                      onChange={(e) => setCustomNetworkPosition(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddNetwork();
                        }
                      }}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">3. Tahun Aktif / Periode</label>
                    <input 
                      type="text"
                      placeholder="e.g. 2024 - 2026 atau 2025"
                      value={customNetworkYear}
                      onChange={(e) => setCustomNetworkYear(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddNetwork();
                        }
                      }}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  {editingNetIdx !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingNetIdx(null);
                        setCustomNetworkName("");
                        setCustomNetworkPosition("");
                        setCustomNetworkYear("");
                      }}
                      className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl transition-all shrink-0"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAddNetwork}
                    className="px-5 py-3 bg-primary text-accent hover:brightness-110 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 shrink-0"
                  >
                    {editingNetIdx !== null ? (
                      <>
                        Simpan Perubahan
                      </>
                    ) : (
                      <>
                        <Plus size={14} className="stroke-[3]" />
                        Tambah Jejaring
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
 
           {/* 8. DATA KOLABORASI */}
          <section id="section-kolaborasi">
            <SectionTitle icon={Share2} title="Minat Kolaborasi" desc="Potensi Kerjasama" />
            <div className="flex flex-wrap gap-4 pt-2">
               {interestsList.map(field => (
                 <label key={field} className={`flex items-center gap-3 px-6 py-3 rounded-2xl cursor-pointer transition-all border ${formData.interests?.includes(field) ? 'bg-accent/10 border-accent text-primary shadow-sm' : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'}`}>
                    <input 
                      type="checkbox" 
                      className="accent-accent w-4 h-4" 
                      checked={formData.interests?.includes(field)}
                      onChange={() => handleCheckbox('interests', field)}
                    />
                    <span className="text-sm font-bold">{field}</span>
                 </label>
               ))}
            </div>
            {/* Custom Interest Input */}
            <div className="mt-4 flex gap-3 max-w-md">
              <input 
                type="text"
                placeholder="Tambah Bidang Kolaborasi Lain..."
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddInterest();
                  }
                }}
                className="flex-grow bg-gray-50 border border-gray-105 rounded-2xl px-5 py-3 text-xs font-semibold focus:outline-none focus:border-primary focus:bg-white transition-all shadow-xs"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-5 py-3 bg-primary text-accent hover:brightness-110 text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 shrink-0"
              >
                <Plus size={14} />
                Tambah
              </button>
            </div>
          </section>
 
           {/* 9. DATA KONTRIBUSI */}
          <section id="section-potensi">
            <SectionTitle icon={Share2} title="Kompetensi dan Potensi" desc="Keahlian & Sumber Daya Alumni" />
            <div className="flex flex-wrap gap-4 pt-2">
               {contributionsList.map(field => (
                 <label key={field} className={`flex items-center gap-3 px-6 py-3 rounded-2xl cursor-pointer transition-all border ${formData.contributions?.includes(field) ? 'bg-accent/10 border-accent text-primary shadow-sm' : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'}`}>
                    <input 
                      type="checkbox" 
                      className="accent-accent w-4 h-4" 
                      checked={formData.contributions?.includes(field)}
                      onChange={() => handleCheckbox('contributions', field)}
                    />
                    <span className="text-sm font-bold">{field}</span>
                 </label>
               ))}
            </div>
            {/* Custom Contribution Input */}
            <div className="mt-4 flex gap-3 max-w-md">
              <input 
                type="text"
                placeholder="Tambah Kompetensi / Potensi Lain..."
                value={customContribution}
                onChange={(e) => setCustomContribution(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddContribution();
                  }
                }}
                className="flex-grow bg-gray-50 border border-gray-105 rounded-2xl px-5 py-3 text-xs font-semibold focus:outline-none focus:border-primary focus:bg-white transition-all shadow-xs"
              />
              <button
                type="button"
                onClick={handleAddContribution}
                className="px-5 py-3 bg-primary text-accent hover:brightness-110 text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5 shrink-0"
              >
                <Plus size={14} />
                Tambah
              </button>
            </div>
          </section>

          {/* Section: Pembuatan Akun SIAP */}
          <section id="section-akun" className="bg-gray-50/10 p-8 md:p-12 rounded-[3rem] border border-dashed border-gray-250">
            <SectionTitle icon={Lock} title="Pembuatan Akun Portal SIAP" desc="Kredensial Akses Aplikasi" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 md:col-span-2 bg-gradient-to-r from-indigo-50/60 to-blue-50/60 p-6 rounded-3xl border border-indigo-100/50 mb-2">
                <span className="text-[10px] text-primary bg-accent px-2.5 py-1 rounded-full uppercase tracking-wider font-black inline-block">Bakti &amp; Integrasi Digital</span>
                <h4 className="font-display font-black text-slate-800 text-base">Buat Kredensial Akun Mandiri Terintegrasi</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Sistem SIAP Pedia merancang integrasi database terpusat yang aman. Silakan tentukan Username/Email serta Password unik Anda untuk login di kemudian hari untuk berkontribusi, memperbarui profil, atau berdiskusi.
                </p>
              </div>
              <Input 
                label="Username atau Alamat Email" 
                name="accountUsername" 
                required 
                placeholder="e.g. sahabat_alumni@gmail.com"
                onChange={handleChange} 
                value={formData.accountUsername} 
              />
              <Input 
                label="Password Akun Baru" 
                name="accountPassword" 
                type="password"
                required 
                placeholder="Buat sandi minimal 8 karakter"
                onChange={handleChange} 
                value={formData.accountPassword} 
              />
            </div>
          </section>

          <button
            type="submit"
            className="w-full bg-accent text-primary font-bold py-6 rounded-[2rem] shadow-xl shadow-accent/20 hover:scale-[1.02] transition-all text-xl mt-12"
          >
            Buka Pratinjau & Verifikasi Profil ➔
          </button>
        </form>
      )}
      </div>
    </div>
  );
}

interface ProfilePreviewProps {
  formData: any;
  isSubmitting: boolean;
  onEdit: (sectionId: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

function ProfilePreviewData({ formData, isSubmitting, onEdit, onConfirm, onCancel }: ProfilePreviewProps) {
  const previewSections = [
    {
      id: "section-identitas",
      title: "Data Identitas Alumni",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left">
          <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-6 pb-4 border-b border-gray-50">
            {formData.profilePictureUrl ? (
              <img
                src={formData.profilePictureUrl}
                alt="Profile photo"
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-full object-cover border-4 border-accent/20 shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-4xl font-display font-bold shadow-inner border border-primary/5">
                {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : "?"}
              </div>
            )}
            <div className="text-center sm:text-left space-y-1">
              <h4 className="text-2xl font-display font-black text-primary">{formData.fullName || "Belum diisi"}</h4>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Panggilan: {formData.nickname || "-"}</p>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-accent/20 text-primary uppercase tracking-wide">
                Calon Anggota Terverifikasi
              </span>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Jenis Kelamin</span>
            <p className="text-sm font-bold text-primary mt-1">{formData.gender || "-"}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Tempat, Tanggal Lahir</span>
            <p className="text-sm font-bold text-primary mt-1">{formData.birthPlace || "-"}, {formData.birthDate || "-"}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">NIK (Nomor Induk Kependudukan)</span>
            <p className="text-sm font-semibold text-primary mt-1">
              {formData.nik || "-"} <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold uppercase tracking-wide ml-2">🔓 {formData.nikPrivacy || "AdminOnly"}</span>
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">WhatsApp / Kontak</span>
            <p className="text-sm font-semibold text-primary mt-1">
              {formData.whatsapp || "-"} <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold uppercase tracking-wide ml-2">🔓 {formData.whatsappPrivacy || "AdminOnly"}</span>
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Alamat / Domisili</span>
            <p className="text-sm font-semibold text-primary mt-1">
              {formData.address || "-"}, Desa {formData.subDistrict || "-"}, Kec. {formData.district || "-"}, Kode Pos {formData.postalCode || "-"}
              <span className="inline-block text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold uppercase tracking-wide ml-2">🔓 {formData.addressPrivacy || "AdminOnly"}</span>
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Email</span>
            <p className="text-sm font-semibold text-primary mt-1">
              {formData.email || "-"} <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold uppercase tracking-wide ml-2">🔓 {formData.emailPrivacy || "AdminOnly"}</span>
            </p>
          </div>

          <div className="md:col-span-2 pt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {formData.instagramUsername && (
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100/55">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Instagram</span>
                <p className="text-xs font-bold text-primary truncate mt-0.5">@{formData.instagramUsername}</p>
              </div>
            )}
            {formData.facebookUsername && (
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100/55">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Facebook</span>
                <p className="text-xs font-bold text-primary truncate mt-0.5">{formData.facebookUsername}</p>
              </div>
            )}
            {formData.tiktokUsername && (
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100/55">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">TikTok</span>
                <p className="text-xs font-bold text-primary truncate mt-0.5">{formData.tiktokUsername}</p>
              </div>
            )}
            {formData.youtubeUsername && (
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100/55">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">YouTube</span>
                <p className="text-xs font-bold text-primary truncate mt-0.5">{formData.youtubeUsername}</p>
              </div>
            )}
            {formData.xUsername && (
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100/55">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">X (Twitter)</span>
                <p className="text-xs font-bold text-primary truncate mt-0.5">@{formData.xUsername}</p>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      id: "section-pmii",
      title: "Data Riwayat PMII & Kaderisasi",
      content: (
        <div className="space-y-4 text-left">
          {formData.pmiiHistory && formData.pmiiHistory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.pmiiHistory.map((item: any, idx: number) => (
                <div key={idx} className="bg-accent/5 border border-accent/20 p-4 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-accent/20 text-primary rounded-md inline-block">
                      {item.level}
                    </span>
                    <h5 className="font-bold text-primary mt-2">{item.campus || "-"}</h5>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Penyelenggara: <span className="font-semibold text-gray-700">{item.organizer}</span></p>
                    <p className="text-xs text-gray-500 leading-relaxed">Jabatan Terakhir: <span className="font-semibold text-gray-700">{item.lastPosition || "-"}</span></p>
                  </div>
                  <span className="text-[10px] font-black text-accent mt-3 block">Tahun Kaderisasi: {item.year}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-400">Belum ada riwayat kaderisasi PMII yang ditambahkan.</p>
          )}
        </div>
      )
    },
    {
      id: "section-pendidikan",
      title: "Data Riwayat Pendidikan Formal",
      content: (
        <div className="space-y-4 text-left">
          {formData.educationHistory && formData.educationHistory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.educationHistory.map((item: any, idx: number) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 text-[9px] font-black bg-primary text-white rounded-md inline-block">
                      {item.level}
                    </span>
                    <h5 className="font-bold text-primary mt-2">{item.institution || "-"}</h5>
                    <p className="text-xs text-gray-500 mt-1">Jurusan: <span className="font-semibold text-gray-700">{item.major || "-"}</span></p>
                    <p className="text-xs text-gray-500">Gelar: <span className="font-semibold text-gray-700">{item.degree || "-"}</span></p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 mt-3 block">Kelulusan: {item.gradYear} ({item.certType})</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-400">Belum ada riwayat pendidikan yang ditambahkan.</p>
          )}
        </div>
      )
    },
    {
      id: "section-profesi",
      title: "Data Karir & Profesi Pekerjaan",
      content: (
        <div className="space-y-4 text-left">
          {formData.professionHistory && formData.professionHistory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.professionHistory.map((item: any, idx: number) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 text-[9px] font-black bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md inline-block uppercase">
                      {item.jobStatus}
                    </span>
                    <h5 className="font-bold text-primary mt-2">{item.company || "-"}</h5>
                    <p className="text-xs text-gray-500 mt-1 leading-normal">Profesi/Kategori: <span className="font-semibold text-gray-700">{item.profession || "-"}</span></p>
                    <p className="text-xs text-gray-500 leading-normal">Posisi: <span className="font-semibold text-gray-700">{item.position || "-"}</span></p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 mt-3 block">Sektor Industri: {item.sector || "-"}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-400">Belum ada riwayat karir/profesi yang dicantumkan.</p>
          )}
        </div>
      )
    },
    {
      id: "section-usaha",
      title: "Data Kepemilikan Usaha & Bisnis",
      content: (
        <div className="space-y-4 text-left">
          {formData.businessHistory && formData.businessHistory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.businessHistory.map((item: any, idx: number) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 text-[9px] font-black bg-amber-50 text-amber-700 border border-amber-100 rounded-md inline-block uppercase">
                      Jenis: {item.type}
                    </span>
                    <h5 className="font-bold text-primary mt-2">{item.name || "-"}</h5>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">Deskripsi: {item.description || "-"}</p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-450 mt-3 block">📍 Lokasi: {item.location || "-"}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-400">Belum ada riwayat usaha/bisnis yang ditambahkan.</p>
          )}
        </div>
      )
    },
    {
      id: "section-keluarga",
      title: "Keluarga & Pasangan",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Status Pernikahan</span>
            <p className="text-sm font-bold text-primary mt-1">{formData.maritalStatus || "Belum ditentukan"}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Pasangan Anggota PMII?</span>
            <p className="text-sm font-bold text-primary mt-1">{formData.spouseIsPmii || "-"}</p>
          </div>
          {formData.spouseName && (
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Nama Pasangan</span>
              <p className="text-sm font-semibold text-primary mt-1">{formData.spouseName}</p>
            </div>
          )}
          {formData.spouseProfession && (
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Profesi Pasangan</span>
              <p className="text-sm font-semibold text-primary mt-1">{formData.spouseProfession}</p>
            </div>
          )}
        </div>
      )
    },
    {
      id: "section-jejaring",
      title: "Jejaring Afiliasi & Organisasi Eksternal",
      content: (
        <div className="space-y-4 text-left">
          {formData.networks && formData.networks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.networks.map((item: any, idx: number) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-primary text-sm">{item.name}</h5>
                    <p className="text-xs text-gray-400 mt-0.5">Jabatan: <span className="font-semibold text-gray-600">{item.position}</span></p>
                  </div>
                  <span className="text-[10px] font-black bg-slate-200 text-slate-700 px-2 py-1 rounded inline-block font-mono">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-400">Belum ada jejaring afiliasi luar yang dicantumkan.</p>
          )}
        </div>
      )
    },
    {
      id: "section-kolaborasi",
      title: "Fokus Minat Kolaborasi Bersama Alumni",
      content: (
        <div className="flex flex-wrap gap-2 text-left">
          {formData.interests && formData.interests.length > 0 ? (
            formData.interests.map((item: string, idx: number) => (
              <span key={idx} className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 border border-indigo-100 text-indigo-700 hover:scale-105 transition-transform duration-200">
                ⭐ {item}
              </span>
            ))
          ) : (
            <p className="text-sm italic text-gray-400">Tidak ada fokus minat kolaborasi yang dipilih.</p>
          )}
        </div>
      )
    },
    {
      id: "section-potensi",
      title: "Kompetensi Utama & Sumber Daya Alumni",
      content: (
        <div className="flex flex-wrap gap-2 text-left">
          {formData.contributions && formData.contributions.length > 0 ? (
            formData.contributions.map((item: string, idx: number) => (
              <span key={idx} className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-100 text-emerald-800 hover:scale-105 transition-transform duration-200">
                🚀 {item}
              </span>
            ))
          ) : (
            <p className="text-sm italic text-gray-400">Tidak ada kompetensi utama yang dipilih.</p>
          )}
        </div>
      )
    },
    {
      id: "section-akun",
      title: "Kredensial Akun Portal SIAP Baru",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Username atau Alamat Email</span>
            <p className="text-sm font-bold text-slate-800 mt-1">{formData.accountUsername || "Belum diisi"}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Sandi Akun Baru</span>
            <p className="text-sm font-bold text-slate-800 mt-1">•••••••• (Tersimpan aman &amp; terenkripsi)</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div className="bg-indigo-900 border border-indigo-950 text-white p-8 md:p-12 rounded-[3.5rem] shadow-xl relative overflow-hidden text-center md:text-left">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent)]" />
        <h2 className="text-3xl md:text-4xl font-display font-black text-accent tracking-tight flex items-center justify-center md:justify-start gap-4">
          🔍 Pratinjau Profil Anggota (Review)
        </h2>
        <p className="text-gray-200 mt-3 text-sm md:text-base max-w-4xl leading-relaxed">
          Satu langkah lagi! Silakan tinjau kembali seluruh informasi profil Anda di bawah ini secara saksama. 
          Jika ingin mengubah data tertentu, Anda cukup menekan tombol <strong>✏️ Edit Data</strong> di pojok kanan atas masing-masing bagian untuk diarahkan langsung ke form.
        </p>
      </div>

      <div className="space-y-8">
        {previewSections.map((section) => (
          <div
            key={section.id}
            className="bg-white p-8 md:p-10 rounded-[3rem] border border-gray-150 shadow-sm relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-accent/40" />
            <div className="flex justify-between items-start gap-4 pb-4 mb-6 border-b border-gray-100">
              <h3 className="font-display font-black text-primary text-lg flex items-center gap-2">
                {section.title}
              </h3>
              <button
                type="button"
                onClick={() => onEdit(section.id)}
                className="px-4 py-1.5 rounded-xl border border-gray-200 bg-gray-50 text-[10px] font-black uppercase tracking-wider text-primary hover:bg-accent hover:border-accent hover:text-primary transition-all flex items-center gap-1 shrink-0 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
              >
                ✏️ Edit Data
              </button>
            </div>
            <div className="text-slate-700">{section.content}</div>
          </div>
        ))}
      </div>

      {/* Confirmation Actions banner */}
      <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-210 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left space-y-1">
          <p className="text-xs text-accent uppercase font-black tracking-widest">Pernyataan Kejujuran & Validitas</p>
          <h4 className="font-display font-black text-primary text-xl">Sudah yakin seluruh data benar?</h4>
          <p className="text-sm text-gray-450 leading-relaxed font-semibold">Tekan daftar untuk mendapatkan verifikasi, lalu masuk ke direktori IKA PMII Bandung Barat.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-sm rounded-2xl transition-all shadow-xs uppercase tracking-wider text-center cursor-pointer active:scale-95"
            disabled={isSubmitting}
          >
            Kembali ke Form
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto px-8 py-4 bg-accent hover:brightness-110 text-primary font-black text-sm rounded-2xl shadow-lg shadow-accent/20 transition-all uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer active:scale-95 scale-102 font-display"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Memproses...
              </span>
            ) : (
              "Daftar & Verifikasi Sekarang ➔"
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Input({ label, type = "text", required = false, colSpan = 1, placeholder = "", name, onChange, value }: any) {
  return (
    <div className={`${colSpan === 2 ? 'md:col-span-2' : ''} space-y-2`}>
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
      />
    </div>
  );
}

function Select({ label, options, name, onChange, value }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block ml-1">{label}</label>
      <select 
        name={name}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm appearance-none"
      >
        <option value="">Pilih...</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
