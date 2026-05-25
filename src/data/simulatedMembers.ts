import { getAlumniProfileByName, detectIsFemale } from "./alumniProfiles";

export interface SimulatedMember {
  id: number;
  name: string;
  gender: "L" | "P";
  prof: string;
  loc: string;
  gov?: string;
  ormas?: string;
  activePos: string;
  contrib: string[];
  img: string;
  whatsapp: string;
  whatsappPrivacy: "public" | "private";
  nik: string;
  nikPrivacy: "public" | "private";
  generation: string;
  address: string;
  email: string;
  kaderisasi: string;
  username: string;
  password: string;
  bio?: string;
}

// Full requested membership hierarchy with raw inputs from the user's prompt
const RAW_HIERARCHY_DATA = [
  // === II-D.1 MAJELIS PERTIMBANGAN ===
  { name: "Drs. H. Agus Gunawan", loc: "Cipeundeuy", pos: "Ketua Majelis Pertimbangan", tier: "utama" },
  { name: "Dani Rosyadi Imran, S.Ag", loc: "Lembang", pos: "Wakil Ketua Majelis Pertimbangan", tier: "utama" },
  { name: "H. Edi Rusyandi, S.Pd.I", loc: "Cipongkor", pos: "Sekretaris Majelis Pertimbangan", tier: "utama" },
  { name: "H. Asep Haedar, M.MPd", loc: "Padalarang", pos: "Wakil Sekretaris Majelis Pertimbangan", tier: "utama" },

  // === II-D.2 DEWAN PAKAR ===
  { name: "Drs H. A. Saepul Millah", loc: "Gununghalu", pos: "Ketua Dewan Pakar", tier: "utama" },
  { name: "Rifqi A. Sulaeman, S.Sos", loc: "Cisarua", pos: "Sekretaris Dewan Pakar", tier: "utama" },
  { name: "Asep Dedi", loc: "Cihampelas", pos: "Anggota Dewan Pakar", tier: "utama" },
  { name: "H. Boy Harinovian, SE", loc: "Ngamprah", pos: "Anggota Dewan Pakar", tier: "utama" },
  { name: "H. Deden Syarif Hidayatulloh, MM", loc: "Padalarang", pos: "Anggota Dewan Pakar", tier: "utama" },
  { name: "H. Mukti Hartono, MM", loc: "Batujajar", pos: "Anggota Dewan Pakar", tier: "utama" },
  { name: "Drs. H. A. Saeful Mu’min", loc: "Cipatat", pos: "Anggota Dewan Pakar", tier: "utama" },
  { name: "Drs. H. Rahmat Syafei", loc: "Cisarua", pos: "Anggota Dewan Pakar", tier: "utama" },
  { name: "Asep Nurfalah, S.Pd.I", loc: "Gununghalu", pos: "Anggota Dewan Pakar", tier: "utama" },
  { name: "Cecep A Nugraha, S.Sy", loc: "Sindangkerta", pos: "Anggota Dewan Pakar", tier: "utama" },
  { name: "Dr. Fikri Rizki Muhammad", loc: "Ngamprah", pos: "Anggota Dewan Pakar", tier: "utama" },
  { name: "Dr. Komarudin, M.Pd", loc: "Lembang", pos: "Anggota Dewan Pakar", tier: "utama" },
  { name: "Ir. H. Sarwendi", loc: "Padalarang", pos: "Anggota Dewan Pakar", tier: "utama" },
  { name: "Abdul Somad, S.Sos.I", loc: "Cipongkor", pos: "Anggota Dewan Pakar", tier: "utama" },
  { name: "Ahmad Zaenudin", loc: "Cipeundeuy", pos: "Anggota Dewan Pakar", tier: "utama" },

  // === II-D.3 PENGURUS HARIAN ===
  { name: "H. Saiful Rachman, M.Ag", loc: "Ngamprah", pos: "Ketua Cabang (PC IKA PMII Bandung Barat)", tier: "utama" },
  { name: "Sandi Supyandi, S.Kom., M.H", loc: "Padalarang", pos: "Sekretaris Umum PC IKA PMII Bandung Barat", tier: "utama" },
  { name: "Masturi Fajrin, S.Pd.I", loc: "Cipatat", pos: "Bendahara Umum PC IKA PMII Bandung Barat", tier: "utama" },
  { name: "Zaki Mubarok, S.Sos", loc: "Padalarang", pos: "Wakil Ketua PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "Soleh Budiman, S.Sos.I", loc: "Cipatat", pos: "Wakil Ketua PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "Asep Bunyamin, S.Pd.I", loc: "Batujajar", pos: "Wakil Ketua PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "Awan Gunawan, M.Ag", loc: "Cililin", pos: "Wakil Ketua PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "H. Ruba Nurzaman, M.MPd", loc: "Cihampelas", pos: "Wakil Ketua PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "Wisnu Bayu Aji, S.H", loc: "Ngamprah", pos: "Wakil Ketua PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "H. Rifkiyal Robani, S.Pd.I", loc: "Ngamprah", pos: "Wakil Sekretaris PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "Syamsu Ramdani, S.Pd.I", loc: "Cipongkor", pos: "Wakil Sekretaris PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "Thorif Abdul Latif", loc: "Gununghalu", pos: "Wakil Sekretaris PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "Muhamad Faiz Al-Afify, M.Pd", loc: "Lembang", pos: "Wakil Sekretaris PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "Dede Muhammad, S.Pd.I", loc: "Cipeundeuy", pos: "Wakil Sekretaris PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "Rahmat Sulaeman, S.Sy", loc: "Saguling", pos: "Wakil Sekretaris PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "Ahmad Kodir Nuramdani, M.Pd", loc: "Sindangkerta", pos: "Wakil Sekretaris PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "Dini Nurmala Sari, S.Ag., M.Sos", loc: "Lembang", pos: "Wakil Bendahara PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "Fenny Indriyanti", loc: "Cisarua", pos: "Wakil Bendahara PC IKA PMII Bandung Barat", tier: "madya" },
  { name: "Dini Nadila, S.E", loc: "Parongpong", pos: "Wakil Bendahara PC IKA PMII Bandung Barat", tier: "madya" },

  // === II-D.4 DEPARTEMEN-DEPARTEMEN ===
  // a. Penataan Organisasi, Penguatan Jaringan Internal, Distribusi dan Pendayagunaan Potensi Kader
  { name: "Muhamad Fadila Rasyid, S.Ap", loc: "Ngamprah", pos: "Koordinator Departemen Penataan Organisasi", tier: "madya" },
  { name: "Agung Permana", loc: "Ngamprah", pos: "Anggota Departemen Penataan Organisasi", tier: "pratama" },
  { name: "Irwansyah", loc: "Lubang", pos: "Anggota Departemen Penataan Organisasi", tier: "pratama" },
  { name: "Ceceng Busyrol Karim", loc: "Lembang", pos: "Anggota Departemen Penataan Organisasi", tier: "pratama" },
  { name: "Iqbal Muhamad Rabani Ilahi", loc: "Caringin", pos: "Anggota Departemen Penataan Organisasi", tier: "pratama" },
  { name: "Siti Nurhabibah", loc: "Cililin", pos: "Anggota Departemen Penataan Organisasi", tier: "pratama" },

  // b. Pengembangan Pemikiran dan Penguatan Ideologi
  { name: "Sofi Fahmi Romadhona, S.Pd", loc: "Ngamprah", pos: "Koordinator Departemen Pengembangan Ideologi", tier: "madya" },
  { name: "M. Haekal Syafi’i", loc: "Lembang", pos: "Anggota Departemen Pengembangan Ideologi", tier: "pratama" },
  { name: "Budi Burhanudin", loc: "Batujajar", pos: "Anggota Departemen Pengembangan Ideologi", tier: "pratama" },
  { name: "Irfan Muhamad Ramli", loc: "Padalarang", pos: "Anggota Departemen Pengembangan Ideologi", tier: "pratama" },
  { name: "M. Argi Al-Hanif", loc: "Cisarua", pos: "Anggota Departemen Pengembangan Ideologi", tier: "pratama" },
  { name: "Ali Mukbar", loc: "Cihampelas", pos: "Anggota Departemen Pengembangan Ideologi", tier: "pratama" },

  // c. Pemerintahan dan Kebijakan Publik
  { name: "Hendri Subagja, MH", loc: "Padalarang", pos: "Koordinator Departemen Pemerintahan & Kebijakan", tier: "madya" },
  { name: "Ahmad Hadi Hidayat, S.Sos", loc: "Ngamprah", pos: "Anggota Departemen Pemerintahan & Kebijakan", tier: "pratama" },
  { name: "Nandang Suhendra, S.Pd.I", loc: "Cipongkor", pos: "Anggota Departemen Pemerintahan & Kebijakan", tier: "pratama" },
  { name: "Dea Ferdinan W, S.Pd", loc: "Cihampelas", pos: "Anggota Departemen Pemerintahan & Kebijakan", tier: "pratama" },
  { name: "Slamet Jabarulloh", loc: "Batujajar", pos: "Anggota Departemen Pemerintahan & Kebijakan", tier: "pratama" },

  // d. Ekonomi dan Pengembangan Usaha
  { name: "Mamay Yusfan Hadian, S.Pd.I", loc: "Cipatat", pos: "Koordinator Departemen Ekonomi & Usaha", tier: "madya" },
  { name: "Muhammad Iqbal Nurul Huda, S.Pd.I", loc: "Cililin", pos: "Anggota Departemen Ekonomi & Usaha", tier: "pratama" },
  { name: "Jajang Sugiarto, S.Pd", loc: "Cihampelas", pos: "Anggota Departemen Ekonomi & Usaha", tier: "pratama" },
  { name: "Hifni Mannan Nuzula", loc: "Ngamprah", pos: "Anggota Departemen Ekonomi & Usaha", tier: "pratama" },
  { name: "Fauziah Fadilah", loc: "Cililin", pos: "Anggota Departemen Ekonomi & Usaha", tier: "pratama" },

  // e. Data, Informasi, Komunikasi dan Hubungan Masyarakat
  { name: "Muhammad Akhsan Kamal, S.Pd.I", loc: "Ngamprah", pos: "Koordinator Departemen Humas & Data", tier: "madya" },
  { name: "Ridwan Agustin, S.Pd", loc: "Ngamprah", pos: "Anggota Departemen Humas & Data", tier: "pratama" },
  { name: "Akbar Rizkika, S.Pd.I", loc: "Padalarang", pos: "Anggota Departemen Humas & Data", tier: "pratama" },
  { name: "Yusuf Hamdani, S.Pd.I", loc: "Lembang", pos: "Anggota Departemen Humas & Data", tier: "pratama" },
  { name: "Dede Sopian, S.Pd", loc: "Cisarua", pos: "Anggota Departemen Humas & Data", tier: "pratama" },
  { name: "Asep Abdurrahman", loc: "Parongpong", pos: "Anggota Departemen Humas & Data", tier: "pratama" },

  // f. Pengarusutamaan Gender dan Penguatan Partisipasi Perempuan
  { name: "Hesti Noor Hasanah, S.Pd.I", loc: "Cihampelas", pos: "Koordinator Departemen Gender & Perempuan", tier: "madya" },
  { name: "Siti Sumiraah, S.Pd.I", loc: "Cihampelas", pos: "Anggota Departemen Gender & Perempuan", tier: "pratama" },
  { name: "Inge Pragustini, S.Pd.I", loc: "Lembang", pos: "Anggota Departemen Gender & Perempuan", tier: "pratama" },
  { name: "Lisna Nurbidayanti, S.Pd", loc: "Ngamprah", pos: "Anggota Departemen Gender & Perempuan", tier: "pratama" },
  { name: "Yuli Yulianti, S.Pd", loc: "Padalarang", pos: "Anggota Departemen Gender & Perempuan", tier: "pratama" },
  { name: "Rita Safina, S.Pd", loc: "Cipongkor", pos: "Anggota Departemen Gender & Perempuan", tier: "pratama" },

  // g. Hukum dan Advokasi
  { name: "Muhammad Iqbal Aula, SH", loc: "Padalarang", pos: "Koordinator Departemen Hukum & Advokasi", tier: "madya" },
  { name: "M.E Burhanudin, S.H., MH", loc: "Ngamprah", pos: "Anggota Departemen Hukum & Advokasi", tier: "utama" },
  { name: "Subki Azfartsani, S.H., MH", loc: "Gununghalu", pos: "Anggota Departemen Hukum & Advokasi", tier: "utama" },
  { name: "Angga Gustian, S.H., MH", loc: "Lembang", pos: "Anggota Departemen Hukum & Advokasi", tier: "utama" },
  { name: "Suhendra", loc: "Cipatat", pos: "Anggota Departemen Hukum & Advokasi", tier: "pratama" },

  // === II-D.5 PENGURUS PAC ===
  { name: "Muhamad Toyib", loc: "Batujajar", contact: "085172071219", pos: "Ketua PAC Batujajar", tier: "madya" },
  { name: "Siti Habibah", loc: "Batujajar", contact: "0", pos: "Anggota PAC Batujajar", tier: "pratama" },
  { name: "Dea Ferdian Widende", loc: "Cihampelas", contact: "083817415820", pos: "Ketua PAC Cihampelas", tier: "madya" },
  { name: "Jajang Sugiarto", loc: "Cihampelas", contact: "083823505983", pos: "Anggota PAC Cihampelas", tier: "pratama" },
  { name: "Abdul Haris Citra Atmaja", loc: "Cikalongwetan", contact: "087832106377", pos: "Anggota PAC Cikalongwetan", tier: "pratama" },
  { name: "Agus Solihin", loc: "Cikalongwetan", contact: "0882001575420", pos: "Ketua PAC Cikalongwetan", tier: "madya" },
  { name: "Mohamad Ekky", loc: "Cikalongwetan", contact: "087828712210", pos: "Anggota PAC Cikalongwetan", tier: "pratama" },
  { name: "Fauziah Fadilah", loc: "Cililin", contact: "Belum Ada", pos: "Ketua PAC Cililin", tier: "madya" },
  { name: "Nur Rohmat Irfan Hilmi", loc: "Cipatat", contact: "085797911829", pos: "Ketua PAC Cipatat", tier: "madya" },
  { name: "Lutbi Permana", loc: "Cipeundeuy", contact: "083106880323", pos: "Anggota PAC Cipeundeuy", tier: "pratama" },
  { name: "Parid Soleh", loc: "Cipeundeuy", contact: "085156161838", pos: "Ketua PAC Cipeundeuy", tier: "madya" },
  { name: "Opik", loc: "Cipeundeuy", contact: "085700556284", pos: "Anggota PAC Cipeundeuy", tier: "pratama" },
  { name: "Suryadi", loc: "Cipeundeuy", contact: "083116605505", pos: "Anggota PAC Cipeundeuy", tier: "pratama" },
  { name: "Andri", loc: "Cipongkor", contact: "082258115099", pos: "Anggota PAC Cipongkor", tier: "pratama" },
  { name: "Diki Wahyudi", loc: "Cipongkor", contact: "085775027355", pos: "Ketua PAC Cipongkor", tier: "madya" },
  { name: "Rita Safina", loc: "Cipongkor", contact: "083850156316", pos: "Anggota PAC Cipongkor", tier: "pratama" },
  { name: "Muhamad Adnan", loc: "Cipongkor", contact: "088222074783", pos: "Anggota PAC Cipongkor", tier: "pratama" },
  { name: "M Romli Al Amin", loc: "Cipongkor", contact: "085692234291", pos: "Anggota PAC Cipongkor", tier: "pratama" },
  { name: "Dede Sopian", loc: "Cisarua", contact: "085754047008", pos: "Anggota PAC Cisarua", tier: "pratama" },
  { name: "Iis Krismayanti", loc: "Cisarua", contact: "083104108645", pos: "Anggota PAC Cisarua", tier: "pratama" },
  { name: "Mustofa", loc: "Cisarua", contact: "08997879239", pos: "Ketua PAC Cisarua", tier: "madya" },
  { name: "Dendi Taufik Rahman", loc: "Gununghalu", contact: "081779242339", pos: "Ketua PAC Gununghalu", tier: "madya" },
  { name: "Ujang Rosadi", loc: "Gununghalu", contact: "089605540645", pos: "Sekretaris PAC Gununghalu", tier: "pratama" },
  { name: "Abdul Mujib Maulana", loc: "Gununghalu", contact: "085182785787", pos: "Bendahara PAC Gununghalu", tier: "pratama" },
  { name: "Hendi Darusman", loc: "Gununghalu", contact: "081770423720", pos: "Anggota PAC Gununghalu", tier: "pratama" },
  { name: "Tedi Suryadi", loc: "Lembang", contact: "08382882875", pos: "Ketua PAC Lembang", tier: "madya" },
  { name: "Dani Mulyadi", loc: "Lembang", contact: "083879047667", pos: "Sekretaris PAC Lembang", tier: "pratama" },
  { name: "Arief Octavian Fauzi", loc: "Ngamprah", contact: "089656069895", pos: "Ketua PAC Ngamprah", tier: "madya" },
  { name: "Abdullah Isnaini", loc: "Ngamprah", contact: "081959593547", pos: "Sekretaris PAC Ngamprah", tier: "pratama" },
  { name: "Ikhsan Arifyanto Wijaya", loc: "Ngamprah", contact: "083110797400", pos: "Bendahara PAC Ngamprah", tier: "pratama" },
  { name: "Hendra Adipratama", loc: "Padalarang", contact: "0881023120123", pos: "Ketua PAC Padalarang", tier: "madya" },
  { name: "Wisnu Ramdan", loc: "Padalarang", contact: "082130711934", pos: "Sekretaris PAC Padalarang", tier: "pratama" },
  { name: "Azi Alfiandi", loc: "Padalarang", contact: "082125301378", pos: "Bendahara PAC Padalarang", tier: "pratama" },
  { name: "Ahmad Sirojudin", loc: "Parongpong", contact: "089634781081", pos: "Ketua PAC Parongpong", tier: "madya" },
  { name: "Asep Abdurohman S.Pd.I", loc: "Parongpong", contact: "089662206542", pos: "Sekretaris PAC Parongpong", tier: "pratama" },
  { name: "Sandi Alansah", loc: "Parongpong", contact: "087778441532", pos: "Bendahara PAC Parongpong", tier: "pratama" },
  { name: "Misbah Sholehuddin", loc: "Parongpong", contact: "08997716635", pos: "Anggota PAC Parongpong", tier: "pratama" },
  { name: "Muhammad Faruq Gozali", loc: "Parongpong", contact: "089530718987", pos: "Anggota PAC Parongpong", tier: "pratama" },
  { name: "Asep Surya", loc: "Rongga", contact: "083895576057", pos: "Ketua PAC Rongga", tier: "madya" },
  { name: "Risma Jundulloh", loc: "Rongga", contact: "083829253073", pos: "Sekretaris PAC Rongga", tier: "pratama" },
  { name: "Yusuf Hidayatulloh, S.H., M.H.", loc: "Saguling", contact: "0881023272679", pos: "Ketua PAC Saguling", tier: "madya" },
  { name: "Muhamad Nurdin Bm", loc: "Saguling", contact: "081222236722", pos: "Sekretaris PAC Saguling", tier: "pratama" },
  { name: "Euis Susilawati", loc: "Saguling", contact: "Belum Ada", pos: "Bendahara PAC Saguling", tier: "pratama" },
  { name: "Mahmud Ali", loc: "Sindangkerta", contact: "Belum Ada", pos: "Ketua PAC Sindangkerta", tier: "madya" }
];

// Clean formatting of mobile numbers
function formatSimulatedWhatsapp(rawContact?: string, defaultNo?: string): string {
  if (!rawContact || rawContact === "0" || rawContact === "Belum Ada") {
    return defaultNo || "+62 813-9000-0101";
  }
  let cleaned = rawContact.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.substring(1);
  }
  if (!cleaned.startsWith("62") && !cleaned.startsWith("+62")) {
    cleaned = "62" + cleaned;
  }
  return "+" + cleaned.replace(/(\d{2})(\d{3,4})(\d{4,5})/g, "$1 $2-$3");
}

// Map the raw data to full integrated SimulatedMember objects suitable for verifiedAlumni state
export const GENERATED_SIMULATED_MEMBERS: SimulatedMember[] = RAW_HIERARCHY_DATA.map((raw, idx) => {
  const profile = getAlumniProfileByName(raw.name, raw.loc);
  const derivedId = 101 + idx;

  // Tier value in Kaderisasi
  let derivedKaderisasi = "Kader Pratama";
  if (raw.tier === "utama") derivedKaderisasi = "Kader Utama";
  else if (raw.tier === "madya") derivedKaderisasi = "Kader Madya";

  // Use raw contact if provided
  const formattedPhone = formatSimulatedWhatsapp(raw.contact, profile.whatsapp);

  return {
    id: derivedId,
    name: raw.name,
    gender: profile.gender,
    prof: profile.prof,
    loc: raw.loc,
    gov: profile.gov || "PC IKA PMII Bandung Barat",
    ormas: profile.ormas || "Ikatan Alumni PMII",
    activePos: raw.pos,
    contrib: profile.contrib,
    img: profile.img,
    whatsapp: formattedPhone,
    whatsappPrivacy: profile.whatsappPrivacy,
    nik: profile.nik,
    nikPrivacy: profile.nikPrivacy,
    generation: profile.generation || "Lulusan 2011",
    address: (profile as any).address || `Dusun Puspa Kencana RT 02/05, Kec. ${raw.loc}, KBB`,
    email: profile.email || `${raw.name.toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 10)}@ikapmiikbb.org`,
    kaderisasi: derivedKaderisasi,
    username: raw.name.toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 8),
    password: "pmii" + derivedId + "@kbb",
    bio: profile.bio || `Mengabdi sabilulungan di tatar pergerakan Bandung Barat.`
  };
});
