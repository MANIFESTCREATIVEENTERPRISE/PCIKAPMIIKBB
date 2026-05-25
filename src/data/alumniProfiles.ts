export interface AlumniProfile {
  name: string;
  gender: "L" | "P";
  prof: string;
  loc: string;
  gov?: string;
  ormas?: string;
  comm?: string;
  activePos?: string;
  contrib: string[];
  img: string;
  whatsapp: string;
  whatsappPrivacy: "public" | "private";
  nik: string;
  nikPrivacy: "public" | "private";
  bio?: string;
  generation?: string;
  email?: string;
  facebookUsername?: string;
  facebookLink?: string;
  youtubeUsername?: string;
  youtubeLink?: string;
  tiktokUsername?: string;
  tiktokLink?: string;
  xUsername?: string;
  xLink?: string;
  instagramUsername?: string;
  instagramLink?: string;
}

// Pre-defined detailed profiles for prominent PC & PAC leaders (West Java cultural characters)
export const HANDCRAFTED_ALUMNI_PROFILES: Record<string, Partial<AlumniProfile>> = {
  "H. Saiful Rachman, M.Ag": {
    name: "H. Saiful Rachman, M.Ag",
    gender: "L",
    prof: "Akademisi & Birokrat",
    loc: "Ngamprah",
    gov: "Kanwil Kemenag Prov. Jawa Barat",
    ormas: "Ketua PC IKA PMII Bandung Barat",
    activePos: "Ketua Cabang (PC IKA PMII)",
    contrib: ["Pendidikan", "Agama", "Sosial"],
    img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-2289-4091",
    whatsappPrivacy: "public",
    nik: "3217011905810001",
    nikPrivacy: "private",
    generation: "Lulusan 2005",
    bio: "Berdedikasi untuk memajukan solidaritas keumatan di tatar Bandung Barat melalui penguatan kelembagaan alumni dan kolaborasi multi-pihak.",
    email: "saiful.rachman@ikapmiikbb.or.id"
  },
  "Sandi Supyandi, S.Kom., M.H": {
    name: "Sandi Supyandi, S.Kom., M.H",
    gender: "L",
    prof: "Praktisi Hukum & IT",
    loc: "Padalarang",
    gov: "Supyandi & Partners Law Firm",
    ormas: "Sekretaris PC IKA PMII",
    activePos: "Sekretaris Umum (PC)",
    contrib: ["Hukum", "Teknologi", "Advokasi"],
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-4410-2910",
    whatsappPrivacy: "public",
    nik: "3217022206880003",
    nikPrivacy: "private",
    generation: "Lulusan 2011",
    bio: "Advokat yang aktif mengintegrasikan teknologi informasi dalam sistem administrasi keorganisasian alumni dan advokasi cyber.",
    email: "sandi.supyandi@gmail.com"
  },
  "Masturi Fajrin, S.Pd.I": {
    name: "Masturi Fajrin, S.Pd.I",
    gender: "L",
    prof: "Wirausaha Kuliner & Pertanian",
    loc: "Cipatat",
    gov: "CV Kamara Agro Mandiri",
    ormas: "Bendahara PC IKA PMII",
    activePos: "Bendahara Umum (PC)",
    contrib: ["Ekonomi", "Pertanian", "Sosial"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-9112-4552",
    whatsappPrivacy: "public",
    nik: "3217031109860002",
    nikPrivacy: "private",
    generation: "Lulusan 2009",
    bio: "Mengembangkan inkubasi bisnis lokal guna mewujudkan ketahanan ekonomi pengurus ranting dan pemuda tani di Bandung Barat.",
    email: "masturi.fajrin@gmail.com"
  },
  "Dini Nurmala Sari, S.Ag., M.Sos": {
    name: "Dini Nurmala Sari, S.Ag., M.Sos",
    gender: "P",
    prof: "Konsultan Gender & Sosial",
    loc: "Lembang",
    gov: "Lembaga Pemberdayaan Perempuan Jabar",
    ormas: "Wakil Bendahara PC IKA PMII",
    activePos: "Wakil Bendahara (BPH PC)",
    contrib: ["Advokasi", "Sosial", "Pendidikan"],
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-8822-7711",
    whatsappPrivacy: "public",
    nik: "3217045103900002",
    nikPrivacy: "private",
    generation: "Lulusan 2013",
    bio: "Fokus pada pendampingan ekonomi kreatif ibu rumah tangga serta penguatan perwakilan sarjana ulama perempuan di ranah publik.",
    email: "dini.nurmala@yahoo.com"
  },
  "Fenny Indriyanti": {
    name: "Fenny Indriyanti",
    gender: "P",
    prof: "Akademisi / Dosen Agama",
    loc: "Cisarua",
    gov: "IAI Bandung Barat",
    ormas: "Fatayat NU KBB",
    activePos: "Wakil Bendahara II (PC)",
    contrib: ["Pendidikan", "Agama", "Sosial"],
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 857-4401-2290",
    whatsappPrivacy: "private",
    nik: "3217056012940003",
    nikPrivacy: "private",
    generation: "Lulusan 2016",
    bio: "Mengabdi sebagai dosen yang giat meneliti metode pembelajaran inklusif berlandaskan Ahlussunnah wal Jama'ah An-Nahdliyah.",
    email: "fenny.indriyanti@gmail.com"
  },
  "Dini Nadila, S.E": {
    name: "Dini Nadila, S.E",
    gender: "P",
    prof: "Pebisnis Retail / UMKM",
    loc: "Parongpong",
    gov: "Nadila Songket & Hijab",
    ormas: "Kopri PMII Jabar",
    activePos: "Wakil Bendahara III (PC)",
    contrib: ["Ekonomi", "Teknologi", "Seni"],
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 811-2230-1090",
    whatsappPrivacy: "public",
    nik: "3217066904950001",
    nikPrivacy: "private",
    generation: "Lulusan 2017",
    bio: "Pelopor akselerasi e-commerce untuk produk-produk kerajinan buatan kader Fatayat dan Kopri se-Bandung Barat.",
    email: "dini.nadila@gmail.com"
  },
  "Hesti Noor Hasanah, S.Pd.I": {
    name: "Hesti Noor Hasanah, S.Pd.I",
    gender: "P",
    prof: "Penggerak Yayasan / Aktivis",
    loc: "Cihampelas",
    gov: "Yayasan Bina Insani KBB",
    ormas: "Kopri PMII KBB",
    activePos: "Koordinator Gender & Partisipasi Perempuan (PC)",
    contrib: ["Pendidikan", "Advokasi", "Sosial"],
    img: "https://images.unsplash.com/photo-1590650154751-121db7c27f3c?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-1122-3838",
    whatsappPrivacy: "public",
    nik: "3217074510910002",
    nikPrivacy: "private",
    generation: "Lulusan 2014",
    bio: "Dedikasi penuh pada advokasi kesejahteraan anak dan perlindungan hak perempuan di pelosok tatar Pasundan.",
    email: "hesti.noor@outlook.com"
  },
  "Fauziah Fadilah": {
    name: "Fauziah Fadilah",
    gender: "P",
    prof: "Wirausaha Mandiri & Konveksi",
    loc: "Cililin",
    gov: "Berkah Mulia Konveksi Cililin",
    ormas: "Ketua PAC Kecamatan Cililin",
    activePos: "Ketua PAC Cililin",
    contrib: ["Ekonomi", "Sosial", "Politik"],
    img: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-5599-2211",
    whatsappPrivacy: "public",
    nik: "3217084408930001",
    nikPrivacy: "private",
    generation: "Lulusan 2015",
    bio: "Penggerak ranting yang berfokus menciptakan lapangan pekerjaan konveksi pakaian bagi pemuda Karang Taruna.",
    email: "fauziah.fadilah@cililin.or.id"
  },
  "Siti Nurhabibah": {
    name: "Siti Nurhabibah",
    gender: "P",
    prof: "Pendidik Madrasah",
    loc: "Cililin",
    gov: "MTs Darul Ma'arif Cililin",
    ormas: "Muslimat NU",
    activePos: "Anggota Penataan Organisasi (PC)",
    contrib: ["Pendidikan", "Agama", "Sosial"],
    img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 856-7788-1120",
    whatsappPrivacy: "private",
    nik: "3217094902890005",
    nikPrivacy: "private",
    generation: "Lulusan 2012",
    bio: "Aktif merawat jejaring dan silaturahmi alumni lewat pemutakhiran data base E-KTA terintegrasi sistem SIAP.",
    email: "siti.nurhabibah@gmail.com"
  },
  "Adv. Wisnu Bayu Aji, S.H": {
    name: "Adv. Wisnu Bayu Aji, S.H",
    gender: "L",
    prof: "Advokat & Pegiat HAM",
    loc: "Ngamprah",
    gov: "LBH IKA PMII Bandung Barat",
    ormas: "PC IKA PMII Bandung Barat",
    activePos: "Ketua Lembaga Bantuan Hukum (LBH)",
    contrib: ["Hukum", "Advokasi", "Sosial"],
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-9900-3344",
    whatsappPrivacy: "public",
    nik: "3217011409840003",
    nikPrivacy: "private",
    generation: "Lulusan 2007",
    bio: "Menegakkan supremasi hukum yang menjunjung tinggi keadilan bagi masyarakat adat, buruh tani, dan kader marginal.",
    email: "wisnubayu.aji@yahoo.co.id"
  },
  "Drs. H. Agus Gunawan": {
    name: "Drs. H. Agus Gunawan",
    gender: "L",
    prof: "Tokoh Masyarakat & Komisioner",
    loc: "Cipeundeuy",
    gov: "Mantan Ketua KPU KBB",
    ormas: "Ketua Majelis Pertimbangan PC IKA PMII",
    activePos: "Ketua Majelis Pertimbangan",
    contrib: ["Politik", "Agama", "Pendidikan"],
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 811-2290-0012",
    whatsappPrivacy: "private",
    nik: "3217101208620001",
    nikPrivacy: "private",
    generation: "Lulusan 1987",
    bio: "Memberikan bimbingan moral spiritual dan kebijakan bagi kepengurusan IKA PMII demi pengabdian substantif tatar politik KBB.",
    email: "agus.gunawan@outlook.com"
  },
  "H. Edi Rusyandi, S.Pd.I": {
    name: "H. Edi Rusyandi, S.Pd.I",
    gender: "L",
    prof: "Anggota DPRD Jawa Barat",
    loc: "Cipongkor",
    gov: "DPRD Provinsi Jawa Barat",
    ormas: "GP Ansor / IKA PMII",
    activePos: "Sekretaris Majelis Pertimbangan",
    contrib: ["Politik", "Kebijakan Publik", "Sosial"],
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-8080-9900",
    whatsappPrivacy: "private",
    nik: "3217112010810011",
    nikPrivacy: "private",
    generation: "Lulusan 2004",
    bio: "Berjuang menyuarakan aspirasi petani Pasundan Barat lewat kebijakan anggaran daerah yang adil dan beradab.",
    email: "edi.rusyandi@dprd.jabarprov.go.id"
  },
  "Drs H. A. Saepul Millah": {
    name: "Drs H. A. Saepul Millah",
    gender: "L",
    prof: "Pengasuh Pondok Pesantren",
    loc: "Gununghalu",
    gov: "Ponpes Al-Hidayah Gununghalu",
    ormas: "Syuriah PCNU Bandung Barat",
    activePos: "Ketua Dewan Pakar (PC)",
    contrib: ["Agama", "Pendidikan", "Sosial"],
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-7060-1122",
    whatsappPrivacy: "private",
    nik: "3217122105650001",
    nikPrivacy: "private",
    generation: "Lulusan 1990",
    bio: "Pendidik sepuh Ahlussunnah wal Jama'ah yang mendedikasikan hidup demi kecerdasan santri dan kader pergerakan tatar Pasundan.",
    email: "kiai.saepulmillah@gmail.com"
  },
  "Dr. Siti Aminah": {
    name: "Dr. Siti Aminah",
    gender: "P",
    prof: "Dosen Sosiologi Pertanian",
    loc: "Ngamprah",
    gov: "Universitas Padjadjaran",
    ormas: "Muslimat NU KBB",
    activePos: "Anggota Pengawas Koperasi KAMARA",
    contrib: ["Pendidikan", "Kesehatan", "Lingkungan"],
    img: "https://images.unsplash.com/photo-1609141011883-8d626bfcd48d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-9090-1122",
    whatsappPrivacy: "private",
    nik: "3217015509780004",
    nikPrivacy: "private",
    generation: "Lulusan 1999",
    bio: "Peneliti sosiologi yang aktif melahirkan jurnal-jurnal ilmiah bertema ketahanan pangan keluarga sabilulungan daerah kering.",
    email: "siti.aminah@unpad.ac.id"
  },
  "Hj. Lilis Karlina, M.Ak": {
    name: "Hj. Lilis Karlina, M.Ak",
    gender: "P",
    prof: "Akuntan Publik & Auditor",
    loc: "Padalarang",
    gov: "KAP Lilis & Rekan",
    ormas: "Ikatan Akuntan Indonesia",
    activePos: "Bendahara Koperasi KAMARA",
    contrib: ["Ekonomi", "Teknologi", "Sosial"],
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 811-9988-1090",
    whatsappPrivacy: "public",
    nik: "3217024810840003",
    nikPrivacy: "private",
    generation: "Lulusan 2006",
    bio: "Ahli tata kelola keuangan syariah yang siap memajukan transparansi aset Koperasi KAMARA kader mandiri Indonesia.",
    email: "lilis.karlina@gmail.com"
  },
  "Euis Susilawati": {
    name: "Euis Susilawati",
    gender: "P",
    prof: "Pelaku UMKM Anyaman Bambu",
    loc: "Saguling",
    gov: "Usaha Anyaman Bambu Lestari Saguling",
    ormas: "Kopri PAC Saguling",
    activePos: "Bendahara PAC Saguling",
    contrib: ["Ekonomi", "Seni", "Sosial"],
    img: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 877-3344-9988",
    whatsappPrivacy: "public",
    nik: "3217136012920005",
    nikPrivacy: "private",
    generation: "Lulusan 2014",
    bio: "Penggagas ekspor produk kerajinan anyaman bambu lokal khas Jawa Barat ke pasar Asia Tenggara guna memberdayakan janda miskin.",
    email: "euis.susilawati@gmail.com"
  },
  "Siti Habibah": {
    name: "Siti Habibah",
    gender: "P",
    prof: "Guru PAUD & Pegiat Parenting",
    loc: "Batujajar",
    gov: "PAUD Al-Anwar Batujajar",
    ormas: "Kopri PMII Komisariat KBB",
    activePos: "Sekretaris PAC Batujajar",
    contrib: ["Pendidikan", "Sosial", "Kesehatan"],
    img: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 858-6011-3040",
    whatsappPrivacy: "public",
    nik: "3217144511940001",
    nikPrivacy: "private",
    generation: "Lulusan 2017",
    bio: "Dedikasi mendidik mental anak usia dini dengan pendekatan tatar silih asih, silih asah, silih asuh khas tanah Sunda.",
    email: "siti.habibah@gmail.com"
  },
  "Iis Krismayanti": {
    name: "Iis Krismayanti",
    gender: "P",
    prof: "Bidan Desa & Tenaga Medis",
    loc: "Cisarua",
    gov: "Puskesmas Cisarua KBB",
    ormas: "Lembaga Kesehatan NU",
    activePos: "Sekretaris PAC Cisarua",
    contrib: ["Kesehatan", "Sosial", "Agama"],
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-2211-4099",
    whatsappPrivacy: "public",
    nik: "3217054902930002",
    nikPrivacy: "private",
    generation: "Lulusan 2015",
    bio: "Bidan desa berdedikasi tinggi mengadvokasi pencegahan stunting dan penyuluhan kesehatan reproduksi pemudi pesantren.",
    email: "iis.krisma@yahoo.com"
  },
  "Dani Rosyadi Imran, S.Ag": {
    name: "Dani Rosyadi Imran, S.Ag",
    gender: "L",
    prof: "Akademisi / Dai",
    loc: "Lembang",
    activePos: "Wakil Ketua Majelis Pertimbangan",
    contrib: ["Agama", "Pendidikan"],
    img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-1122-4411",
    whatsappPrivacy: "public",
    generation: "Lulusan 1996",
    bio: "Mendorong integrasi spiritual dan ketahanan moralitas generasi muda."
  },
  "H. Asep Haedar, M.MPd": {
    name: "H. Asep Haedar, M.MPd",
    gender: "L",
    prof: "Pendidik & Kepala Madrasah",
    loc: "Padalarang",
    activePos: "Wakil Sekretaris Majelis Pertimbangan",
    contrib: ["Pendidikan", "Sosial"],
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-2233-4455",
    whatsappPrivacy: "private",
    generation: "Lulusan 2002",
    bio: "Praktisi manajemen mutu pendidikan yang berdedikasi tinggi."
  },
  "Rifqi A. Sulaeman, S.Sos": {
    name: "Rifqi A. Sulaeman, S.Sos",
    gender: "L",
    prof: "Konsultan Sosial",
    loc: "Cisarua",
    activePos: "Sekretaris Dewan Pakar",
    contrib: ["Sosial", "Kebijakan Publik"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-8877-6655",
    whatsappPrivacy: "public",
    generation: "Lulusan 2005",
    bio: "Merumuskan kajian strategis sosiokultural daerah tatar Parahyangan."
  },
  "Zaki Mubarok, S.Sos": {
    name: "Zaki Mubarok, S.Sos",
    gender: "L",
    prof: "Aktivis Sosial & Wirausaha",
    loc: "Padalarang",
    activePos: "Wakil Ketua I",
    contrib: ["Sosial", "Ekonomi"],
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 857-4455-6677",
    whatsappPrivacy: "public",
    generation: "Lulusan 2011",
    bio: "Penggerak kemandirian wirausaha pemuda pergerakan nasional."
  },
  "Soleh Budiman, S.Sos.I": {
    name: "Soleh Budiman, S.Sos.I",
    gender: "L",
    prof: "Penyuluh Keagamaan",
    loc: "Cipatat",
    activePos: "Wakil Ketua II",
    contrib: ["Agama", "Sosial"],
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 819-0101-0202",
    whatsappPrivacy: "private",
    generation: "Lulusan 2008",
    bio: "Merawat simpul silaturahmi dengan ulama pesantren sepuh Bandung Barat."
  },
  "Asep Bunyamin, S.Pd.I": {
    name: "Asep Bunyamin, S.Pd.I",
    gender: "L",
    prof: "Guru Madrasah",
    loc: "Batujajar",
    activePos: "Wakil Ketua III",
    contrib: ["Pendidikan", "Agama"],
    img: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 878-1212-3434",
    whatsappPrivacy: "public",
    generation: "Lulusan 2010",
    bio: "Pelopor penguatan baca tulis Al-Quran anak pesisir Saguling."
  },
  "Awan Gunawan, M.Ag": {
    name: "Awan Gunawan, M.Ag",
    gender: "L",
    prof: "Dosen Agama & Peneliti",
    loc: "Cililin",
    activePos: "Wakil Ketua IV",
    contrib: ["Pendidikan", "Agama", "Hukum"],
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-7080-9010",
    whatsappPrivacy: "public",
    generation: "Lulusan 2007",
    bio: "Akademisi yang meneliti moderasi beragama sabilulungan adat Sunda."
  },
  "H. Ruba Nurzaman, M.MPd": {
    name: "H. Ruba Nurzaman, M.MPd",
    gender: "L",
    prof: "Pengawas Sekolah / Pendidik",
    loc: "Cihampelas",
    activePos: "Wakil Ketua V",
    contrib: ["Pendidikan", "Sosial"],
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-2288-1199",
    whatsappPrivacy: "private",
    generation: "Lulusan 2001",
    bio: "Pendorong literasi pedesaan di daerah terpencil tatar Bandung Barat."
  },
  "Wisnu Bayu Aji, S.H": {
    name: "Wisnu Bayu Aji, S.H",
    gender: "L",
    prof: "Advokat & Penasihat Hukum",
    loc: "Ngamprah",
    activePos: "Wakil Ketua VI / Ketua LBH IKA PMII",
    contrib: ["Hukum", "Advokasi"],
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-9900-3344",
    whatsappPrivacy: "public",
    generation: "Lulusan 2007",
    bio: "Menegakkan supremasi hukum yang berkeadilan bagi masyarakat kecil."
  },
  "H. Rifkiyal Robani, S.Pd.I": {
    name: "H. Rifkiyal Robani, S.Pd.I",
    gender: "L",
    prof: "Pegawai Negeri Sipil / KUA",
    loc: "Ngamprah",
    activePos: "Wakil Sekretaris",
    contrib: ["Agama", "Pendidikan"],
    img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-3211-4545",
    whatsappPrivacy: "public",
    generation: "Lulusan 2009",
    bio: "Aktif dalam pemberdayaan ketahanan keluarga dhuafa di KBB."
  },
  "Syamsu Ramdani, S.Pd.I": {
    name: "Syamsu Ramdani, S.Pd.I",
    gender: "L",
    prof: "Pegiat Pendidikan Kemasyarakatan",
    loc: "Cipongkor",
    activePos: "Wakil Sekretaris",
    contrib: ["Pendidikan", "Sosial"],
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 856-7788-9900",
    whatsappPrivacy: "private",
    generation: "Lulusan 2012",
    bio: "Pengembang metode belajar literasi untuk desa-desa terpencil."
  },
  "Thorif Abdul Latif": {
    name: "Thorif Abdul Latif",
    gender: "L",
    prof: "Wirausaha & Aktivis Pertanian",
    loc: "Gununghalu",
    activePos: "Wakil Sekretaris",
    contrib: ["Pertanian", "Ekonomi"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-1010-2020",
    whatsappPrivacy: "public",
    generation: "Lulusan 2015",
    bio: "Mengembangkan perkebunan kopi arabika organik silih asuh."
  },
  "Muhamad Faiz Al-Afify, M.Pd": {
    name: "Muhamad Faiz Al-Afify, M.Pd",
    gender: "L",
    prof: "Dosen Muda & Peneliti",
    loc: "Lembang",
    activePos: "Wakil Sekretaris",
    contrib: ["Pendidikan", "Teknologi"],
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 878-3322-1100",
    whatsappPrivacy: "public",
    generation: "Lulusan 2014",
    bio: "Pengembang sistem teknologi informasi belajar bagi milenial."
  },
  "Dede Muhammad, S.Pd.I": {
    name: "Dede Muhammad, S.Pd.I",
    gender: "L",
    prof: "Pegiat Sosial",
    loc: "Cipeundeuy",
    activePos: "Wakil Sekretaris",
    contrib: ["Sosial", "Agama"],
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-6655-7788",
    whatsappPrivacy: "public",
    generation: "Lulusan 2013",
    bio: "Dedikasi pelayanan kesehatan keliling dhuafa se-Bandung Barat."
  },
  "Rahmat Sulaeman, S.Sy": {
    name: "Rahmat Sulaeman, S.Sy",
    gender: "L",
    prof: "Praktisi Hukum Keluarga",
    loc: "Saguling",
    activePos: "Wakil Sekretaris",
    contrib: ["Hukum", "Advokasi"],
    img: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-4040-5050",
    whatsappPrivacy: "private",
    generation: "Lulusan 2016",
    bio: "Mereduksi sengketa adat-waris hukum keluarga di pedesaan Saguling."
  },
  "Ahmad Kodir Nuramdani, M.Pd": {
    name: "Ahmad Kodir Nuramdani, M.Pd",
    gender: "L",
    prof: "Pendidik",
    loc: "Sindangkerta",
    activePos: "Wakil Sekretaris",
    contrib: ["Pendidikan", "Agama"],
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-9898-1212",
    whatsappPrivacy: "public",
    generation: "Lulusan 2014",
    bio: "Mendesain kurikulum terintegrasi akhlak santri milenial."
  },
  "Muhamad Fadila Rasyid, S.Ap": {
    name: "Muhamad Fadila Rasyid, S.Ap",
    gender: "L",
    prof: "Birokrat Swasta",
    loc: "Ngamprah",
    activePos: "Koordinator Departemen Penataan Organisasi",
    contrib: ["Politik", "Sosial"],
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 858-2233-4411",
    whatsappPrivacy: "public",
    generation: "Lulusan 2013",
    bio: "Spesialis manajemen administrasi digital e-KTA alumni."
  },
  "Sofi Fahmi Romadhona, S.Pd": {
    name: "Sofi Fahmi Romadhona, S.Pd",
    gender: "L",
    prof: "Aktivis Pemikir / Pendidik",
    loc: "Ngamprah",
    activePos: "Koordinator Departemen Pengembangan Ideologi",
    contrib: ["Pendidikan", "Agama"],
    img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-9090-8080",
    whatsappPrivacy: "public",
    generation: "Lulusan 2011",
    bio: "Mengawal nilai-nilai tatar Ahlussunnah wal jama'ah progresif."
  },
  "Hendri Subagja, MH": {
    name: "Hendri Subagja, MH",
    gender: "L",
    prof: "Advokat & Analis Kebijakan",
    loc: "Padalarang",
    activePos: "Koordinator Departemen Pemerintahan & Kebijakan",
    contrib: ["Hukum", "Politik"],
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-1010-9090",
    whatsappPrivacy: "public",
    generation: "Lulusan 2008",
    bio: "Mengawal regulasi tata kelola anggaran daerah yang pro-rakyat."
  },
  "Mamay Yusfan Hadian, S.Pd.I": {
    name: "Mamay Yusfan Hadian, S.Pd.I",
    gender: "L",
    prof: "Wirausaha Muda",
    loc: "Cipatat",
    activePos: "Koordinator Departemen Ekonomi & Usaha",
    contrib: ["Ekonomi", "Pertanian"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 811-3434-5656",
    whatsappPrivacy: "public",
    generation: "Lulusan 2010",
    bio: "Mengakselerasi produk kriya lokal KBB menembus e-commerce."
  },
  "Muhammad Akhsan Kamal, S.Pd.I": {
    name: "Muhammad Akhsan Kamal, S.Pd.I",
    gender: "L",
    prof: "Humas & Kreator Konten",
    loc: "Ngamprah",
    activePos: "Koordinator Departemen Humas & Data",
    contrib: ["Teknologi", "Pendidikan"],
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 857-9988-7766",
    whatsappPrivacy: "public",
    generation: "Lulusan 2012",
    bio: "Membangun branding positif IKA PMII Kabupaten Bandung Barat."
  },
  "Adv. Muhammad Iqbal Aula, S.H": {
    name: "Adv. Muhammad Iqbal Aula, S.H",
    gender: "L",
    prof: "Advokat Konsultan Hubungan Industrial",
    loc: "Padalarang",
    activePos: "Sekretaris LBH / Koordinator Departemen Hukum",
    contrib: ["Hukum", "Advokasi"],
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-8822-1133",
    whatsappPrivacy: "public",
    generation: "Lulusan 2011",
    bio: "Gigih memperjuangkan keadilan ketenagakerjaan bagi buruh."
  },
  "Adv. M.E Burhanudin, S.H., M.H": {
    name: "Adv. M.E Burhanudin, S.H., M.H",
    gender: "L",
    prof: "Advokat Senior Tata Negara",
    loc: "Ngamprah",
    activePos: "Dewan LBH IKA PMII",
    contrib: ["Hukum", "Advokasi"],
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 811-1234-9988",
    whatsappPrivacy: "private",
    generation: "Lulusan 1999",
    bio: "Senior hukum pembela keberpihakan masyarakat adat."
  },
  "Adv. Subki Azfartsani, S.H., M.H": {
    name: "Adv. Subki Azfartsani, S.H., M.H",
    gender: "L",
    prof: "Pengamat Hukum Lingkungan",
    loc: "Gununghalu",
    activePos: "Dewan LBH IKA PMII",
    contrib: ["Hukum", "Lingkungan"],
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-9090-2020",
    whatsappPrivacy: "public",
    generation: "Lulusan 2004",
    bio: "Ahli tata ruang pertambangan pembela wilayah resapan air."
  },
  "Adv. Angga Gustian, S.H., M.H": {
    name: "Adv. Angga Gustian, S.H., M.H",
    gender: "L",
    prof: "Arbitrator Cyber & Komersial",
    loc: "Lembang",
    activePos: "Dewan LBH IKA PMII",
    contrib: ["Hukum", "Teknologi"],
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 856-7890-1234",
    whatsappPrivacy: "public",
    generation: "Lulusan 2013",
    bio: "Mengawal perlindungan data privasi siber nasional."
  },
  "Suhendra": {
    name: "Suhendra",
    gender: "L",
    prof: "Analis Paralegal",
    loc: "Cipatat",
    activePos: "Staf Teknis LBH",
    contrib: ["Hukum", "Sosial"],
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 858-6011-3030",
    whatsappPrivacy: "public",
    generation: "Lulusan 2018",
    bio: "Mendedikasikan mediasi hukum perdamaian pro-bono."
  },
  "Drs. Agus Mulyana, M.Si": {
    name: "Drs. Agus Mulyana, M.Si",
    gender: "L",
    prof: "Sastrawan & Birokrat Senior",
    loc: "Ngamprah",
    activePos: "Ketua Dewan Pengawas Koperasi KAMARA",
    contrib: ["Pendidikan", "Seni", "Ekonomi"],
    img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 811-1200-3040",
    whatsappPrivacy: "private",
    generation: "Lulusan 1989",
    bio: "Senior luhur peletak pilar tata kelola finansial akuntabel."
  },
  "H. Ahmad Fauzi, S.Ag": {
    name: "H. Ahmad Fauzi, S.Ag",
    gender: "L",
    prof: "Pengawas Syariah Kelayakan Transaksi",
    loc: "Cihampelas",
    activePos: "Anggota Pengawas Koperasi KAMARA",
    contrib: ["Agama", "Ekonomi"],
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-4400-5500",
    whatsappPrivacy: "private",
    generation: "Lulusan 1994",
    bio: "Sertifikasi dewan riba penjamin akad syariah bebas kecurangan."
  },
  "M. Zaka Ali, S.E.": {
    name: "M. Zaka Ali, S.E.",
    gender: "L",
    prof: "Direktur Bisnis Ritel KAMARA",
    loc: "Padalarang",
    activePos: "Ketua Koperasi KAMARA",
    contrib: ["Ekonomi", "Teknologi"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-8899-7755",
    whatsappPrivacy: "public",
    generation: "Lulusan 2008",
    bio: "Pelopor inkubasi gerai ritel KAMARA Mart bagi keutamaan ekonomi."
  },
  "Rizky Ramadhan, S.T.": {
    name: "Rizky Ramadhan, S.T.",
    gender: "L",
    prof: "Insinyur Logistik & Konstruksi",
    loc: "Parongpong",
    activePos: "Sekretaris Koperasi KAMARA",
    contrib: ["Ekonomi", "Teknologi"],
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 857-1122-3344",
    whatsappPrivacy: "public",
    generation: "Lulusan 2012",
    bio: "Mengelola pembangunan unit usaha fisik berskala besar berkelanjutan."
  },
  "Muhamad Toyib": {
    name: "Muhamad Toyib",
    gender: "L",
    prof: "Wirausaha Logam & Kriya",
    loc: "Batujajar",
    activePos: "Ketua PAC Batujajar",
    contrib: ["Ekonomi", "Sosial"],
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-8080-0099",
    whatsappPrivacy: "public",
    generation: "Lulusan 2011",
    bio: "Menggerakkan industri rumahan anyaman kawat di Batujajar."
  },
  "Dea Ferdian Widende": {
    name: "Dea Ferdian Widende",
    gender: "L",
    prof: "Birokrat & Seniman Sunda",
    loc: "Cihampelas",
    activePos: "Ketua PAC Cihampelas",
    contrib: ["Seni", "Politik"],
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 856-4401-2299",
    whatsappPrivacy: "public",
    generation: "Lulusan 2014",
    bio: "Kreator pagelaran pencak silat dakwah pergerakan."
  },
  "Jajang Sugiarto": {
    name: "Jajang Sugiarto",
    gender: "L",
    prof: "Guru Sosiologi",
    loc: "Cihampelas",
    activePos: "Sekretaris PAC Cihampelas",
    contrib: ["Pendidikan", "Sosial"],
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-7766-8800",
    whatsappPrivacy: "private",
    generation: "Lulusan 2015",
    bio: "Kajiansosiokultural tata masyarakat dhuafa pesisir Citarum."
  },
  "Abdul Haris Citra Atmaja": {
    name: "Abdul Haris Citra Atmaja",
    gender: "L",
    prof: "Agrobisnis Kopi",
    loc: "Cikalongwetan",
    activePos: "Ketua PAC Cikalongwetan",
    contrib: ["Pertanian", "Ekonomi"],
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 811-9922-1010",
    whatsappPrivacy: "public",
    generation: "Lulusan 2006",
    bio: "Pelopor hilirisasi kopi robusta Cikalongwetan menembus pasar kafe Bandung."
  },
  "Agus Solihin": {
    name: "Agus Solihin",
    gender: "L",
    prof: "Apoteker Tradisional",
    loc: "Cikalongwetan",
    activePos: "Sekretaris PAC Cikalongwetan",
    contrib: ["Kesehatan", "Ekonomi"],
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 858-6011-4040",
    whatsappPrivacy: "public",
    generation: "Lulusan 2013",
    bio: "Pengembang formula sirup jahe tradisional bersertifikat Halal."
  },
  "Mohamad Ekky": {
    name: "Mohamad Ekky",
    gender: "L",
    prof: "Wirausaha Peternakan",
    loc: "Cikalongwetan",
    activePos: "Bendahara PAC Cikalongwetan",
    contrib: ["Pertanian", "Ekonomi"],
    img: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-4040-3030",
    whatsappPrivacy: "public",
    generation: "Lulusan 2015",
    bio: "Mengepalai penangkaran domba hias ras Garut di KBB."
  },
  "Nur Rohmat Irfan Hilmi": {
    name: "Nur Rohmat Irfan Hilmi",
    gender: "L",
    prof: "Eco-Preneur",
    loc: "Cipatat",
    activePos: "Ketua PAC Cipatat",
    contrib: ["Lingkungan", "Ekonomi"],
    img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-8080-1122",
    whatsappPrivacy: "public",
    generation: "Lulusan 2010",
    bio: "Penggagas daur ulang plastik bernilai ekonomi sircular."
  },
  "Lutbi Permana": {
    name: "Lutbi Permana",
    gender: "L",
    prof: "Aparatur Desa / Birokrat",
    loc: "Cipeundeuy",
    activePos: "Ketua PAC Cipeundeuy",
    contrib: ["Politik", "Sosial"],
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 857-4401-3030",
    whatsappPrivacy: "private",
    generation: "Lulusan 2009",
    bio: "Merancang e-goverment sistem pelaporan bansos rukun tetangga."
  },
  "Parid Soleh": {
    name: "Parid Soleh",
    gender: "L",
    prof: "Pendidik Sejarah",
    loc: "Cipeundeuy",
    activePos: "Sekretaris PAC Cipeundeuy",
    contrib: ["Pendidikan", "Sosial"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-2299-1010",
    whatsappPrivacy: "public",
    generation: "Lulusan 2014",
    bio: "Pelestari situs-situs peninggalan sosiokultural Bandung Barat."
  },
  "Opik": {
    name: "Opik",
    gender: "L",
    prof: "Wirausaha Kuliner",
    loc: "Cipeundeuy",
    activePos: "Bendahara PAC Cipeundeuy",
    contrib: ["Ekonomi", "Pertanian"],
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-1122-3344",
    whatsappPrivacy: "public",
    generation: "Lulusan 2012",
    bio: "Pemilik katering sabilulungan penyuplai industri lokal."
  },
  "Andri": {
    name: "Andri",
    gender: "L",
    prof: "Pengusaha Peternakan",
    loc: "Cipongkor",
    activePos: "Ketua PAC Cipongkor",
    contrib: ["Pertanian", "Ekonomi"],
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-7080-6070",
    whatsappPrivacy: "public",
    generation: "Lulusan 2011",
    bio: "Menjalin kemitraan pembiayaan syariah bagi peternak dhuafa."
  },
  "Diki Wahyudi": {
    name: "Diki Wahyudi",
    gender: "L",
    prof: "Programmer / Pegiat IT",
    loc: "Cipongkor",
    activePos: "Sekretaris PAC Cipongkor",
    contrib: ["Teknologi", "Pendidikan"],
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 856-1122-8899",
    whatsappPrivacy: "public",
    generation: "Lulusan 2016",
    bio: "Membangun sistem portal kepegawaian desa lokal."
  },
  "Rita Safina": {
    name: "Rita Safina",
    gender: "P",
    prof: "Wirausaha Busana Muslimah",
    loc: "Cipongkor",
    activePos: "Bendahara PAC Cipongkor",
    contrib: ["Ekonomi", "Seni"],
    img: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-2211-1010",
    whatsappPrivacy: "public",
    generation: "Lulusan 2015",
    bio: "Pemberdaya industri jahit santriwati daerah Cipongkor."
  },
  "Dede Sopian": {
    name: "Dede Sopian",
    gender: "L",
    prof: "Konselor Pendidikan",
    loc: "Cisarua",
    activePos: "Ketua PAC Cisarua",
    contrib: ["Pendidikan", "Sosial"],
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-9900-1122",
    whatsappPrivacy: "public",
    generation: "Lulusan 2012",
    bio: "Mengkordinir bantuan beasiswa kuliah anak buruh kebun."
  },
  "Mustofa": {
    name: "Mustofa",
    gender: "L",
    prof: "Petani Hidroponik",
    loc: "Cisarua",
    activePos: "Bendahara PAC Cisarua",
    contrib: ["Pertanian", "Teknologi"],
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-3020-1010",
    whatsappPrivacy: "public",
    generation: "Lulusan 2014",
    bio: "Pelopor perkebunan buah tin bebas pestisida di KBB."
  },
  "Dendi Taufik Rahman": {
    name: "Dendi Taufik Rahman",
    gender: "L",
    prof: "Coffee Consultant",
    loc: "Gununghalu",
    activePos: "Ketua PAC Gununghalu",
    contrib: ["Pertanian", "Ekonomi"],
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-5500-1122",
    whatsappPrivacy: "public",
    generation: "Lulusan 2013",
    bio: "Pengenal barista terkemuka bagi produk kopi khas kearifan lokal."
  },
  "Ujang Rosadi": {
    name: "Ujang Rosadi",
    gender: "L",
    prof: "Pegiat Kehutanan",
    loc: "Gununghalu",
    activePos: "Sekretaris PAC Gununghalu",
    contrib: ["Lingkungan", "Sosial"],
    img: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 858-6011-5050",
    whatsappPrivacy: "private",
    generation: "Lulusan 2012",
    bio: "Aktivis pelindung mata air tatar Pasundan silih asuh."
  },
  "Abdul Mujib Maulana": {
    name: "Abdul Mujib Maulana",
    gender: "L",
    prof: "Pegiat PKBM",
    loc: "Gununghalu",
    activePos: "Bendahara PAC Gununghalu",
    contrib: ["Pendidikan", "Sosial"],
    img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-3232-1212",
    whatsappPrivacy: "public",
    generation: "Lulusan 2015",
    bio: "Pemberantas buta aksara pedesaan dataran tinggi."
  },
  "Tedi Suryadi": {
    name: "Tedi Suryadi",
    gender: "L",
    prof: "Praktisi Ecotourism",
    loc: "Lembang",
    activePos: "Ketua PAC Lembang",
    contrib: ["Ekonomi", "Lingkungan"],
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 811-2299-3344",
    whatsappPrivacy: "public",
    generation: "Lulusan 2008",
    bio: "Pengembang potensi wisata desa tangguh bencana."
  },
  "Dani Mulyadi": {
    name: "Dani Mulyadi",
    gender: "L",
    prof: "Pemandu Geowisata",
    loc: "Lembang",
    activePos: "Sekretaris PAC Lembang",
    contrib: ["Pendidikan", "Lingkungan"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 857-1122-8800",
    whatsappPrivacy: "private",
    generation: "Lulusan 2013",
    bio: "Edukator literasi sesar Lembang bagi mitigasi pemuda gerakan."
  },
  "Arief Octavian Fauzi": {
    name: "Arief Octavian Fauzi",
    gender: "L",
    prof: "Analis Sistem Pegawai",
    loc: "Ngamprah",
    activePos: "Ketua PAC Ngamprah",
    contrib: ["Teknologi", "Politik"],
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-8822-6655",
    whatsappPrivacy: "public",
    generation: "Lulusan 2012",
    bio: "Perancang arsitektur portal digital alumni terpadu SIAP."
  },
  "Abdullah Isnaini": {
    name: "Abdullah Isnaini",
    gender: "L",
    prof: "Pegiat Paralegal",
    loc: "Ngamprah",
    activePos: "Sekretaris PAC Ngamprah",
    contrib: ["Hukum", "Advokasi"],
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 858-6011-8899",
    whatsappPrivacy: "public",
    generation: "Lulusan 2014",
    bio: "Penyuluh sadar hukum anti kekerasan anak rukun warga."
  },
  "Ikhsan Arifyanto Wijaya": {
    name: "Ikhsan Arifyanto Wijaya",
    gender: "L",
    prof: "Wirausaha Kedai Kopi",
    loc: "Ngamprah",
    activePos: "Bendahara PAC Ngamprah",
    contrib: ["Ekonomi", "Teknologi"],
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-4040-5566",
    whatsappPrivacy: "public",
    generation: "Lulusan 2016",
    bio: "Mengepalai inkubasi barista mandiri milenial urban."
  },
  "Hendra Adipratama": {
    name: "Hendra Adipratama",
    gender: "L",
    prof: "Logistics Manager",
    loc: "Padalarang",
    activePos: "Ketua PAC Padalarang",
    contrib: ["Ekonomi", "Teknologi"],
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 811-9922-3838",
    whatsappPrivacy: "public",
    generation: "Lulusan 2011",
    bio: "Pengatur logistik penyuplai produk ritel KAMARA Mart."
  },
  "Wisnu Ramdan": {
    name: "Wisnu Ramdan",
    gender: "L",
    prof: "Selasar Kreatif Jurnalis",
    loc: "Padalarang",
    activePos: "Sekretaris PAC Padalarang",
    contrib: ["Pendidikan", "Sosial"],
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 857-3322-1199",
    whatsappPrivacy: "public",
    generation: "Lulusan 2014",
    bio: "Editor buletin pergerakan sabilulungan Kabupaten Bandung Barat."
  },
  "Azi Alfiandi": {
    name: "Azi Alfiandi",
    gender: "L",
    prof: "Pegiat UMKM",
    loc: "Padalarang",
    activePos: "Bendahara PAC Padalarang",
    contrib: ["Ekonomi", "Pendidikan"],
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-4410-2930",
    whatsappPrivacy: "public",
    generation: "Lulusan 2015",
    bio: "Mengelola simpan pinjam koperasi rintisan alumni."
  },
  "Ahmad Sirojudin": {
    name: "Ahmad Sirojudin",
    gender: "L",
    prof: "Petani Florikultura",
    loc: "Parongpong",
    activePos: "Ketua PAC Parongpong",
    contrib: ["Pertanian", "Ekonomi"],
    img: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-8822-7744",
    whatsappPrivacy: "public",
    generation: "Lulusan 2012",
    bio: "Pengeksport tanaman hias lokal KBB ke mancanegara."
  },
  "Asep Abdurohman S.Pd.I": {
    name: "Asep Abdurohman S.Pd.I",
    gender: "L",
    prof: "Guru Honorer",
    loc: "Parongpong",
    activePos: "Sekretaris PAC Parongpong",
    contrib: ["Pendidikan", "Agama"],
    img: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 858-6011-1020",
    whatsappPrivacy: "public",
    generation: "Lulusan 2013",
    bio: "Sekretaris penataan data base silih asuh ranting florikultur."
  },
  "Sandi Alansah": {
    name: "Sandi Alansah",
    gender: "L",
    prof: "Wirausaha Lanskap",
    loc: "Parongpong",
    activePos: "Bendahara PAC Parongpong",
    contrib: ["Ekonomi", "Lingkungan"],
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-3232-4545",
    whatsappPrivacy: "public",
    generation: "Lulusan 2016",
    bio: "Kontraktor penghijauan rukun perumahan elite Parongpong."
  },
  "Asep Surya": {
    name: "Asep Surya",
    gender: "L",
    prof: "Tani Mandiri Tapioka",
    loc: "Rongga",
    activePos: "Ketua PAC Rongga",
    contrib: ["Pertanian", "Ekonomi"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-7080-1122",
    whatsappPrivacy: "public",
    generation: "Lulusan 2010",
    bio: "Pelopor pengolahan singkong berkualitas super kelolaan warga."
  },
  "Risma Jundulloh": {
    name: "Risma Jundulloh",
    gender: "P",
    prof: "Guru Madrasah Aliyah",
    loc: "Rongga",
    activePos: "Sekretaris PAC Rongga",
    contrib: ["Pendidikan", "Agama"],
    img: "https://images.unsplash.com/photo-1590650154751-121db7c27f3c?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 856-7878-1212",
    whatsappPrivacy: "public",
    generation: "Lulusan 2015",
    bio: "Sekretaris Kopri penata emansipasi wanita pergerakan Rongga barat."
  },
  "Yusuf Hidayatulloh, S.H., M.H.": {
    name: "Yusuf Hidayatulloh, S.H., M.H.",
    gender: "L",
    prof: "Advokat & Pegiat Maritim",
    loc: "Saguling",
    activePos: "Ketua PAC Saguling",
    contrib: ["Hukum", "Advokasi"],
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 812-3344-5511",
    whatsappPrivacy: "public",
    generation: "Lulusan 2011",
    bio: "Pembela hukum hak nelayan kolam jaring apung Saguling."
  },
  "Muhamad Nurdin Bm": {
    name: "Muhamad Nurdin Bm",
    gender: "L",
    prof: "Pelaku Usaha Perikanan",
    loc: "Saguling",
    activePos: "Sekretaris PAC Saguling",
    contrib: ["Pertanian", "Ekonomi"],
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 813-2288-4091",
    whatsappPrivacy: "public",
    generation: "Lulusan 2014",
    bio: "Inovator pakan mandiri hemat energi pembesaran ikan nila."
  },
  "Mahmud Ali": {
    name: "Mahmud Ali",
    gender: "L",
    prof: "Pegiat Sekolah Pesisir",
    loc: "Sindangkerta",
    activePos: "Ketua PAC Sindangkerta",
    contrib: ["Pendidikan", "Sosial"],
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    whatsapp: "+62 858-6011-9010",
    whatsappPrivacy: "public",
    generation: "Lulusan 2013",
    bio: "Pendiri rintisan bimbingan belajar dhuafa bebas pungutan rukun daerah."
  }
};

const HIJAB_IMAGES = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1590650154751-121db7c27f3c?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1609141011883-8d626bfcd48d?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200"
];

const MALE_IMAGES = [
  "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=200"
];

const DISTRICTS = ["Ngamprah", "Padalarang", "Cipatat", "Lembang", "Cisarua", "Parongpong", "Batujajar", "Cihampelas", "Cililin", "Cipongkor", "Gununghalu", "Rongga", "Sindangkerta", "Saguling", "Cikalongwetan", "Cipeundeuy"];
const PROFESSIONS = ["Pendidik", "Wirausaha", "Birokrasi", "Hukum", "Tenaga Medis", "Jurnalis", "Aktivis", "Politisi", "Pertanian", "Seni", "Digital"];
const SECTORS = ["Pendidikan", "Ekonomi", "Kesehatan", "Sosial", "Politik", "Teknologi", "Lingkungan", "Advokasi", "Agama"];

const COMM_ORGS = ["Forum Kerjasama Pemuda", "Masyarakat Adat Tatar Sunda", "Karang Taruna KBB", "Rumah Zakat KBB", "Forum Ekonomi Kreatif"];
const P_INDICATORS = [
  "Siti", "Hj", "Hj.", "Dini", "Fenny", "Lina", "Fauziah", "Hesti", "Sumiraah", "Inge", "Lisna", "Yuli", "Rita", "Risma", "Euis", "Nia", "Lilis", "Wulan", "Neneng", "Ayu", "Dewi", "Tati", "Imas", "Yayah", "Iis", "Aminah", "Karlina", "Habibah", "Nadila", "Karlina", "Indriyanti"
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function detectIsFemale(name: string): boolean {
  return P_INDICATORS.some((ind) => {
    const rx = new RegExp(`\\b${ind}\\b`, "i");
    return rx.test(name);
  });
}

// Generate deterministic high-fidelity profile for any name
export function getAlumniProfileByName(name: string, defaultKecamatan?: string): AlumniProfile {
  const normalizedName = name.replace(/^(Adv\.|Dr\.|Drs\.|H\.|Hj\.)\s+/, "").trim();
  const matched = HANDCRAFTED_ALUMNI_PROFILES[name] || HANDCRAFTED_ALUMNI_PROFILES[normalizedName];
  if (matched) {
    return {
      name,
      gender: matched.gender || "L",
      prof: matched.prof || "Profesional Alumni",
      loc: defaultKecamatan || matched.loc || "Ngamprah",
      gov: matched.gov,
      ormas: matched.ormas,
      comm: matched.comm,
      activePos: matched.activePos,
      contrib: matched.contrib || ["Sosial"],
      img: matched.img || "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c",
      whatsapp: matched.whatsapp || "+62 812-3456-7890",
      whatsappPrivacy: matched.whatsappPrivacy || "public",
      nik: matched.nik || "3217011234560001",
      nikPrivacy: matched.nikPrivacy || "private",
      bio: matched.bio || `Melayani tatar pergerakan alumni se-Bandung Barat.`,
      generation: matched.generation || "Lulusan 2012",
      email: matched.email || `${normalizedName.toLowerCase().replace(/[^a-z0-9]/g, "")}@gmail.com`
    };
  }

  // Generate deterministically
  const score = hashString(normalizedName);
  const isFemale = detectIsFemale(name);
  const birthYear = 1970 + (score % 28); // 1970 - 1998
  const birthDay = 1 + (score % 28);
  const birthMonth = 1 + ((score >> 2) % 12);
  const dayStr = birthDay.toString().padStart(2, "0");
  const monthStr = birthMonth.toString().padStart(2, "0");
  const yrStr = birthYear.toString().substring(2);

  const calculatedDistrict = defaultKecamatan || DISTRICTS[score % DISTRICTS.length];
  const calculatedProf = PROFESSIONS[score % PROFESSIONS.length];
  const calculatedSector1 = SECTORS[score % SECTORS.length];
  const calculatedSector2 = SECTORS[(score + 1) % SECTORS.length];

  const imgList = isFemale ? HIJAB_IMAGES : MALE_IMAGES;
  const portraitUrl = imgList[score % imgList.length];

  const suffix = isFemale ? "P" : "L";
  const numSuffix = (birthYear < 1990 ? "000" : "001") + (score % 9 + 1);
  const nik = `3217${score % 10 + 10}${dayStr}${monthStr}${yrStr}${numSuffix}`;

  const defaultBio = isFemale
    ? `Aktif dalam organisasi keperempuanan tingkat ranting dan kecamatan, fokus untuk menyuburkan perekonomian serta pendidikan moral kader.`
    : `Mengabdi di tatar Bandung Barat dengan berkontribusi nyata pada penguatan sosiokultural kemasyarakatan yang bernilai silih asih.`;

  return {
    name,
    gender: isFemale ? "P" : "L",
    prof: calculatedProf,
    loc: calculatedDistrict,
    gov: score % 2 === 0 ? "Instansi Pemerintah / Swasta Lokal" : undefined,
    ormas: isFemale ? "Kopri / Fatayat NU KBB" : "GP Ansor / LazisNU Bandung Barat",
    comm: COMM_ORGS[score % COMM_ORGS.length],
    activePos: `Kader Pengurus ${calculatedDistrict}`,
    contrib: [calculatedSector1, calculatedSector2],
    img: portraitUrl,
    whatsapp: `+62 813-${2000 + (score % 7999)}-${3000 + (score % 6999)}`,
    whatsappPrivacy: score % 3 === 0 ? "private" : "public",
    nik,
    nikPrivacy: "private",
    generation: `Lulusan ${ birthYear + 22 }`,
    email: `${normalizedName.toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 12)}@ikapmiikbb.org`,
    bio: defaultBio
  };
}
