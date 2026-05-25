import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory data store (simulating a database)
  const db = {
    members: [],
    news: [
      { id: 1, title: "Sinergi IKA PMII KBB dengan Pemkab Bandung Barat dalam Program Penataan Desa", content: "PC IKA PMII Kabupaten Bandung Barat menjalin kesepakatan strategis dengan Pemerintah Kabupaten Bandung Barat untuk mendorong digitalisasi administrasi di tingkat desa se-KBB.", image: "/src/assets/images/pmii_meeting_cooperation_1779609727304.png", date: new Date().toISOString(), category: "Berita", author: "Humas IKA PMII" },
      { id: 2, title: "IKA PMII KBB : silaturahim Rapatkan Barisan untuk pelantikan dan Rapat Kerja", content: "PC IKA PMII Kabupaten Bandung Barat menyelenggarakan kegiatan silaturahim akbar guna mempererat hubungan kekeluargaan antar-alumni sekaligus merapatkan barisan menyongsong agenda pelantikan kepengurusan baru serta pelaksanaan Rapat Kerja.", image: "/src/assets/images/pmii_meeting_cooperation_1779609727304.png", date: new Date().toISOString(), category: "Berita", author: "Redaksi" },
      { id: 3, title: "Rapat Koordinasi Cabang: Persiapan Pelantikan Pengurus Baru", content: "Agenda besar transisi kepemimpinan IKA PMII KBB akan segera dilaksanakan. Seluruh alumni diundang untuk memberikan sumbangsih pemikiran.", image: "https://picsum.photos/seed/news3/800/400", date: new Date().toISOString(), category: "Organisasi", author: "Sekretariat" },
      { id: 4, title: "Kunjungan Studi Banding IKA PMII KBB ke Balai Kota Bandung", content: "Mempelajari tata kelola organisasi alumni yang mandiri secara ekonomi, IKA PMII KBB melakukan kunjungan kerja ke ikatan alumni lainnya.", image: "https://picsum.photos/seed/news4/800/400", date: new Date().toISOString(), category: "Berita", author: "Humas" },
      { id: 5, title: "Update Kejadian: Musyawarah Daerah IKA PMII di Ngamprah Berlangsung Khidmat", content: "Musyawarah daerah menghasilkan beberapa poin penting mengenai peran alumni di sektor pertanian Bandung Barat.", image: "https://picsum.photos/seed/news5/800/400", date: new Date().toISOString(), category: "Berita", author: "Redaksi" },
      { id: 6, title: "Inkubasi Bisnis IKA PMII: Mendorong Kemandirian UMKM Alumni", content: "Sebanyak 20 unit usaha milik alumni mendapatkan pelatihan kemasan dan pemasaran digital terpadu melalui Koperasi KAMARA.", image: "https://picsum.photos/seed/news6/800/400", date: new Date().toISOString(), category: "Ekonomi", author: "Bidang UMKM" },
      { id: 7, title: "Beasiswa S2 Luar Negeri: Panduan Khusus bagi Alumni PMII KBB", content: "Lembaga pendampingan studi resmi IKA PMII KBB merilis panduan teknis bagi alumni yang mengincar beasiswa LPDP.", image: "https://picsum.photos/seed/news7/800/400", date: new Date().toISOString(), category: "Beasiswa", author: "Bidang Pendidikan" },
      { id: 8, title: "Penanganan Stunting: IKA PMII KBB Terjun Langsung ke Desa-Desa", content: "Bekerjasama dengan Dinas Kesehatan, alumni memberikan edukasi nutrisi bagi ibu hamil di pemukiman padat penduduk.", image: "https://picsum.photos/seed/news8/800/400", date: new Date().toISOString(), category: "Sosial", author: "LBH IKA PMII" },
      { id: 9, title: "IKA PMII KBB Mengawal Kebijakan Anggaran Daerah pro-Rakyat", content: "Tim analisis kebijakan publik IKA PMII memberikan catatan penting bagi evaluasi anggaran tahunan daerah.", image: "https://picsum.photos/seed/news9/800/400", date: new Date().toISOString(), category: "Berita", author: "Tim Kajian" },
    ],
    articles: [
      { id: 1, title: "Epistemologi Pergerakan: Antara Idealisme dan Realitas Alumni", content: "Sebuah tinjauan filosofis mengenai bagaimana idealisme kader PMII bertransformasi saat menjadi alumni.", image: "https://picsum.photos/seed/art1/800/400", date: new Date().toISOString(), author: "Dr. Jauhari, M.Pd", category: "Opini" },
      { id: 2, title: "Peta Jalan Ekonomi Alumni: Analisa Potensi Pasar di Bandung Barat", content: "Mengupas tuntas sektor unggulan di KBB yang bisa menjadi peluang emas bagi wirausahawan alumni.", image: "https://picsum.photos/seed/art2/800/400", date: new Date().toISOString(), author: "Ahmad Zaki", category: "Artikel" },
      { id: 3, title: "Jurnal: Transformasi Kepemimpinan di Era Digital Berbasis Nilai Pergerakan", content: "Penelitian akademik mengenai efektivitas kepemimpinan berbasis kolektivitas di organisasi alumni.", image: "https://picsum.photos/seed/art3/800/400", date: new Date().toISOString(), author: "Siti Halimah", category: "Jurnal" },
      { id: 4, title: "Analisa: Peran Alumni PMII dalam Menjaga Kerukunan Beragama di KBB", content: "Refleksi sosiologis mengenai moderasi beragama di wilayah heterogen seperti Bandung Barat.", image: "https://picsum.photos/seed/art4/800/400", date: new Date().toISOString(), author: "Faris Al-Fatih", category: "Opini" },
      { id: 5, title: "Membangun Personal Branding Alumni di Dunia Profesional", content: "Tips praktis bagi alumni baru untuk menata profil profesional dengan tetap menjaga integritas.", image: "https://picsum.photos/seed/art5/800/400", date: new Date().toISOString(), author: "Rizal Saputra", category: "Artikel" },
      { id: 6, title: "Dibalik Koperasi KAMARA: Mimpi Kemandirian Ekonomi Bangsa", content: "Memoar perjalanan merintis koperasi alumni pertama di tingkat cabang Bandung Barat.", image: "https://picsum.photos/seed/art6/800/400", date: new Date().toISOString(), author: "Bendahara PC", category: "Artikel" },
      { id: 7, title: "IKA PMII dan Tantangan Bonus Demografi 2030 bagi Bandung Barat", content: "Persiapan strategis alumni dalam menghadapi lonjakan angkatan kerja di wilayah industri.", image: "https://picsum.photos/seed/art7/800/400", date: new Date().toISOString(), author: "Budi Santoso", category: "Opini" },
      { id: 8, title: "Review Buku: Paradigma Fiqih Pergerakan Kontemporer", content: "Bedah buku karya alumni untuk memperluas cakrawala keislaman dan keindonesiaan.", image: "https://picsum.photos/seed/art8/800/400", date: new Date().toISOString(), author: "Gus Mif", category: "Opini" },
      { id: 9, title: "Menelisik Jejak Perjuangan Alumni PMII di Parlemen KBB", content: "Kompilasi narasi keberhasilan alumni dalam mendorong kebijakan legislasi yang inklusif.", image: "https://picsum.photos/seed/art9/800/400", date: new Date().toISOString(), author: "Tim Penulis", category: "Jurnal" },
      { id: 10, title: "Digitalisasi Desa: Urgensi Kedaulatan Data di Bandung Barat", content: "Bagaimana integrasi data kependudukan pedesaan berbasis digital mampu mengentaskan kemiskinan ekstrem.", image: "https://picsum.photos/seed/art10/800/400", date: new Date().toISOString(), author: "Samsul Hadi, S.Kom", category: "Opini" },
      { id: 11, title: "Rekonstruksi Karakter Intelektual Organisasi Alumni", content: "Gagasan penyegaran dialektika kritis-akademis agar alumni tidak terjebak dalam pragmatisme politik.", image: "https://picsum.photos/seed/art11/800/400", date: new Date().toISOString(), author: "Dr. Hj. Siti Aminah", category: "Opini" },
      { id: 12, title: "Kemandirian Ekonomi: Mengakar Melalui Koperasi KAMARA", content: "Momen kebangkitan finansial alumni melintasi sinergi unit usaha bersama dari hulu ke hilir.", image: "https://picsum.photos/seed/art12/800/400", date: new Date().toISOString(), author: "Drs. Heri Gunawan", category: "Opini" },
      { id: 13, title: "Pendidikan Inklusif: Menjangkau Pelosok Tatar Bandung Barat", content: "Catatan kritis mengenai pemetaan sekolah marginal di kawasan selatan KBB dan solusi akselerasinya.", image: "https://picsum.photos/seed/art13/800/400", date: new Date().toISOString(), author: "Prof. Anwar Sadad", category: "Opini" },
      { id: 14, title: "Advokasi Sasar Lembang: Mitigasi Kebencanaaan Komunitas", content: "Langkah taktis sosiologis mengedukasi warga sekitar jalur patahan sesar Lembang demi ketangguhan bencana.", image: "https://picsum.photos/seed/art14/800/400", date: new Date().toISOString(), author: "Rahmat Hidayat, M.Si", category: "Opini" },
      { id: 15, title: "Masa Depan Pertanian KBB di Tangan Petani Millenial PMII", content: "Memodernisasi rantai pasok hasil bumi Lembang dengan teknologi presisi hasil inovasi pemuda.", image: "https://picsum.photos/seed/art15/800/400", date: new Date().toISOString(), author: "Irfan Maulana", category: "Opini" },
      { id: 16, title: "Politik Kebangsaan & Integritas Moral Alumni di Era Baru", content: "Refleksi kader dalam menempatkan etika di atas kepentingan partai politik praktis demi kemaslahatan warga.", image: "https://picsum.photos/seed/art16/800/400", date: new Date().toISOString(), author: "Zainal Arifin", category: "Opini" },
      { id: 17, title: "Sinergitas Ulama dan Umaro Membangun Bandung Barat Madani", content: "Simpul peradaban mulia tatar sunda yang harmonis merekatkan ormas keagamaan dan unsur pemerintah.", image: "https://picsum.photos/seed/art17/800/400", date: new Date().toISOString(), author: "K.H. Ahmad Fauzi", category: "Opini" },
      { id: 18, title: "Kemandirian Rantai Pasok Produk Halal UMKM Alumni", content: "Mendorong sertifikasi halal gratis serta peningkatan standar higienitas produksi kuliner alumni.", image: "https://picsum.photos/seed/art18/800/400", date: new Date().toISOString(), author: "Neng Lilis, M.E.", category: "Opini" },
      { id: 19, title: "Revitalisasi Gerakan Literasi di Sekolah Menengah KBB", content: "Membangun pojok baca kreatif dan taman diskusi interaktif guna menekan angka adiksi gawai.", image: "https://picsum.photos/seed/art19/800/400", date: new Date().toISOString(), author: "Diana Fitriani, M.Pd", category: "Opini" },
      { id: 20, title: "Pemberdayaan Perempuan: Kepemimpinan Publik Berbasis Aswaja", content: "Strategi mumpuni mengawal kepemimpinan perempuan dalam pembuatan regulasi sosial di tingkat perda.", image: "https://picsum.photos/seed/art20/800/400", date: new Date().toISOString(), author: "Siti Sarah, S.Sos", category: "Opini" },
      { id: 21, title: "Optimalisasi CSR Perusahaan untuk Pembangunan SDM Pelosok", content: "Peluang kerja sama industri-akademisi dalam meratakan akses internet sehat ke desa-desa tertinggal KBB.", image: "https://picsum.photos/seed/art21/800/400", date: new Date().toISOString(), author: "Taufik Ismail", category: "Opini" },
      { id: 22, title: "Etika Jurnalisme Era Digital: Peran Media Kampus & Alumni", content: "Melawan disinformasi dan hoaks pemilu daerah dengan menyebarkan berita lurus bermutu tinggi.", image: "https://picsum.photos/seed/art22/800/400", date: new Date().toISOString(), author: "Yosep Hamdani", category: "Opini" },
      { id: 23, title: "Menata Ruang Bandung Barat: Perspektif Ekologis Berkelanjutan", content: "Analisis dampak alih fungsi hutan pegunungan utara menjadi objek wisata komersial masif.", image: "https://picsum.photos/seed/art23/800/400", date: new Date().toISOString(), author: "Agus Wijaya, S.T.", category: "Opini" },
      { id: 24, title: "Seni Budaya Sunda Sebagai Filter Dekonstruksi Global", content: "Menjaga eksistensi seni degung dan pencak silat sebagai basis filosofi karakter luhur pemuda.", image: "https://picsum.photos/seed/art24/800/400", date: new Date().toISOString(), author: "Abah Dadang", category: "Opini" },
      { id: 25, title: "Menengok Peran Pemuda Menghadapi Inflasi Sektor Pangan", content: "Pemanfaatan pekarangan rumah komunal sebagai benteng pertahanan gizi mandiri masyarakat.", image: "https://picsum.photos/seed/art25/800/400", date: new Date().toISOString(), author: "Hendra Wijaya, S.E.", category: "Opini" }
    ],
    announcements: Array.from({ length: 9 }).map((_, i) => ({
      id: i + 1,
      title: `Pengumuman Resmi: Program Beasiswa Alumni ${i + 1}`,
      content: `Dibutuhkan partisipasi aktif dalam program beasiswa alumni PMII untuk mendukung kader-kader berprestasi di wilayah Bandung Barat.`,
      documentUrl: "#",
      date: new Date().toISOString(),
      category: "Pengumuman",
    })),
    criticSuggestions: [],
    products: [
      { id: 1, name: "Kopi KAMARA", price: "Rp 35.000", image: "https://picsum.photos/seed/kopi/400/400", contact: "082115991771", provider: "UMKM Kader Ngamprah" },
      { id: 2, name: "Kaos IKA PMII Exclusive", price: "Rp 100.000", image: "https://picsum.photos/seed/kaos/400/400", contact: "082115991771", provider: "Distro Pergerakan Padalarang" },
      { id: 3, name: "Buku Paradigma Pergerakan", price: "Rp 75.000", image: "https://picsum.photos/seed/buku/400/400", contact: "082115991771", provider: "Penerbit Alumni" },
      { id: 4, name: "Madu Murni Bandung Barat", price: "Rp 85.000", image: "https://picsum.photos/seed/madu/400/400", contact: "082115991771", provider: "Lebah Pergerakan Cipatat" },
      { id: 5, name: "Jaket Bomber IKA PMII", price: "Rp 250.000", image: "https://picsum.photos/seed/jaket/400/400", contact: "082115991771", provider: "Konveksi Alumni Lembang" },
      { id: 6, name: "Sambal Mertua KBB", price: "Rp 25.000", image: "https://picsum.photos/seed/sambal/400/400", contact: "082115991771", provider: "Kuliner Alumni Cisarua" },
      { id: 7, name: "Pupuk Organik Pergerakan", price: "Rp 45.000", image: "https://picsum.photos/seed/pupuk/400/400", contact: "082115991771", provider: "Tani Alumni Gununghalu" },
      { id: 8, name: "Hijab Syar'i Bintang", price: "Rp 60.000", image: "https://picsum.photos/seed/hijab/400/400", contact: "082115991771", provider: "Modiste Alumni Cikalongwetan" },
      { id: 9, name: "Jasa Desain Grafis Alumni", price: "Hubungi", image: "https://picsum.photos/seed/design/400/400", contact: "082115991771", provider: "Creative Agency KBB" },
    ]
  };

  // API Routes
  app.get("/api/content/:type", (req, res) => {
    const { type } = req.params;
    if (type === "opinions") {
      const opinions = db.articles.filter((art: any) => art.category === "Opini");
      res.json(opinions);
    } else if (db[type]) {
      res.json(db[type]);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  app.post("/api/register", (req, res) => {
    const memberData = req.body;
    db.members.push({ ...memberData, id: Date.now(), status: "pending" });
    res.json({ message: "Pendaftaran berhasil, data anda akan ditinjau oleh pengurus." });
  });

  app.post("/api/critics", (req, res) => {
    db.criticSuggestions.push({ ...req.body, id: Date.now() });
    res.json({ message: "Terima kasih atas kritik dan saran anda." });
  });

  app.get("/api/stats", (req, res) => {
    res.json({
      distributionByDistrict: [
        { name: "Ngamprah", value: 400 },
        { name: "Cipatat", value: 300 },
        { name: "Lembang", value: 500 },
        { name: "Padalarang", value: 450 },
        { name: "Cihampelas", value: 250 },
      ],
      distributionByProfession: [
        { name: "Pendidikan", value: 35 },
        { name: "Politik/Hukum", value: 20 },
        { name: "Ekonomi/UMKM", value: 25 },
        { name: "Teknologi", value: 10 },
        { name: "Lainnya", value: 10 },
      ],
      programAchievement: [
        { name: "Penguatan Lembaga", value: 80 },
        { name: "Pendidikan", value: 70 },
        { name: "Jaringan", value: 90 },
        { name: "Pemberdayaan", value: 65 },
        { name: "Pengabdian", value: 85 },
      ]
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
