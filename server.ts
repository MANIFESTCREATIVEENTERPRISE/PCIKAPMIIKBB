import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import { 
  initFirestore, 
  fetchCollectionFromFirestore, 
  saveDocumentToFirestore, 
  deleteDocumentFromFirestore, 
  seedCollectionIfEmpty 
} from "./src/lib/firebaseServer.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Security Headers Middleware
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    if (req.secure || req.headers["x-forwarded-proto"] === "https") {
      res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }
    next();
  });

  // 2. In-Memory Rate Limiter for Form Submissions (Prevents bot spam attacks)
  const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

  function formRateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
    const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1").toString();
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes window
    const maxRequests = 10; // 10 submissions limit

    const entry = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > entry.resetTime) {
      entry.count = 1;
      entry.resetTime = now + windowMs;
    } else {
      entry.count++;
    }

    rateLimitMap.set(ip, entry);

    if (entry.count > maxRequests) {
      return res.status(429).json({
        error: "Terlalu banyak permintaan dari perangkat/IP ini. Mohon tunggu 15 menit sebelum mencoba kembali."
      });
    }

    next();
  }

  // 3. Server-side XSS & HTML Sanitization Helper
  function sanitizeString(str: any): string {
    if (typeof str !== "string") return "";
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<[^>]+>/g, "") // Strip HTML tags
      .replace(/javascript:/gi, "")
      .replace(/onerror=/gi, "")
      .replace(/onload=/gi, "")
      .trim();
  }

  // In-memory data store backed by Firebase Firestore
  const db: any = {
    members: [],
    submittedContents: [
      {
        id: 1,
        title: "Urgensi Kebijakan Digitalisasi Pesantren di tatar Bandung Barat",
        author: "H. Saiful Rachman, M.Ag",
        category: "Pikiran Kritis",
        content: "Pesantren di Kabupaten Bandung Barat memiliki kontribusi historis yang amat kuat. Namun, memasuki era revolusi digital, pondok pesantren harus didukung infrastruktur digital yang mumpuni serta program literasi siber madani. IKA PMII mengusulkan perda pesantren yang progresif. Transformasi digital tidak bisa mengesampingkan jati diri salafiyah, justru digitalisasi membantu pesantren menyebarluaskan nilai-nilai Islam ahlussunnah wal jamaah yang moderat dan menjangkau santri secara global.",
        date: "23 Mei 2026",
        status: "Menunggu Kurasi",
        views: 0
      },
      {
        id: 2,
        title: "Membangun Jaringan Ritel Berbasis Koperasi Swalayan KAMARA",
        author: "Lina Marlina, S.Ak",
        category: "Ekonomi",
        content: "Swalayan KAMARA bukan sekadar gerai toko fisik, melainkan sistem integrasi kluster UMKM alumni. Melalui pendanaan terstruktur dan rantai pasok lokal, koperasi swalayan kami optimistis mampu bersaing dengan ritel waralaba nasional. Dengan membangun kemandirian ekonomi, kita bisa memberdayakan alumni IKA PMII Bandung Barat dari hulu ke hilir.",
        date: "21 Mei 2026",
        status: "Diterbitkan",
        views: 142
      },
      {
        id: 3,
        title: "Refleksi Demokrasi Elektoral Bandung Barat: Perspektif Nilai Pergerakan",
        author: "Sandi Supyandi, S.Kom., M.H",
        category: "Opini",
        content: "Kondisi sosiopolitik Bandung Barat membutuhkan kepemimpinan yang berintegritas tinggi serta berlandaskan nilai silih asuh dan keadilan sosial. Demokrasi elektoral tidak boleh terjebak dalam pragmatisme transaksional. Peran alumni PMII sangat vital sebagai navigator gerakan moral dan kontrol sosial kebijakan daerah agar selalu mementingkan kemaslahatan publik, kedaulatan pangan, dan stabilitas masyarakat.",
        date: "18 Mei 2026",
        status: "Menunggu Kurasi",
        views: 0
      }
    ],
    news: [
      { id: 1, title: "Sinergi IKA PMII KBB dengan Pemkab Bandung Barat dalam Program Penataan Desa", content: "PC IKA PMII Kabupaten Bandung Barat menjalin kesepakatan strategis dengan Pemerintah Kabupaten Bandung Barat untuk mendorong digitalisasi administrasi di tingkat desa se-KBB.", image: "/assets/images/pmii_meeting_cooperation_1779609727304.png", date: new Date().toISOString(), category: "Berita", author: "Humas IKA PMII" },
      { id: 2, title: "IKA PMII KBB : silaturahim Rapatkan Barisan untuk pelantikan dan Rapat Kerja", content: "PC IKA PMII Kabupaten Bandung Barat menyelenggarakan kegiatan silaturahim akbar guna mempererat hubungan kekeluargaan antar-alumni sekaligus merapatkan barisan menyongsong agenda pelantikan kepengurusan baru serta pelaksanaan Rapat Kerja.", image: "/assets/images/pmii_meeting_cooperation_1779609727304.png", date: new Date().toISOString(), category: "Berita", author: "Redaksi" },
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

  // Sync with Firestore on startup
  const collectionsToSync = ["news", "articles", "submittedContents", "announcements", "members", "products", "criticSuggestions"];
  
  initFirestore();

  for (const collName of collectionsToSync) {
    try {
      await seedCollectionIfEmpty(collName, db[collName] || []);
      const fsData = await fetchCollectionFromFirestore(collName);
      if (fsData && fsData.length > 0) {
        // Sort items by ID or date descending
        fsData.sort((a, b) => (b.id || 0) - (a.id || 0));
        db[collName] = fsData;
        console.log(`[Firestore] Synced ${fsData.length} items for ${collName}`);
      }
    } catch (e) {
      console.error(`[Firestore] Startup sync error for ${collName}:`, e);
    }
  }

  // API Routes
  app.get("/api/content/:type", async (req, res) => {
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

  app.get("/api/submitted-contents", (req, res) => {
    res.json(db.submittedContents);
  });

  app.post("/api/submitted-contents", formRateLimiter, async (req, res) => {
    const { title, content, author, category } = req.body;
    const cleanTitle = sanitizeString(title);
    const cleanContent = sanitizeString(content);
    const cleanAuthor = sanitizeString(author);
    const cleanCategory = sanitizeString(category);

    if (!cleanTitle || !cleanContent) {
      return res.status(400).json({ error: "Judul dan isi konten wajib diisi." });
    }

    const newSubmit = {
      id: Date.now(),
      title: cleanTitle,
      author: cleanAuthor || "Alumni",
      category: cleanCategory || "Opini",
      content: cleanContent,
      date: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }),
      status: "Menunggu Kurasi",
      views: 0
    };
    db.submittedContents.unshift(newSubmit);
    await saveDocumentToFirestore("submittedContents", newSubmit.id, newSubmit);
    res.json({ success: true, item: newSubmit });
  });

  app.post("/api/submitted-contents/update", async (req, res) => {
    const { id, title, content, author, category, status } = req.body;
    let updatedItem: any = null;
    db.submittedContents = db.submittedContents.map((c: any) => {
      if (c.id === Number(id)) {
        updatedItem = {
          ...c,
          title: title !== undefined ? sanitizeString(title) : c.title,
          content: content !== undefined ? sanitizeString(content) : c.content,
          author: author !== undefined ? sanitizeString(author) : c.author,
          category: category !== undefined ? sanitizeString(category) : c.category,
          status: status !== undefined ? sanitizeString(status) : c.status
        };
        return updatedItem;
      }
      return c;
    });
    if (updatedItem) {
      await saveDocumentToFirestore("submittedContents", updatedItem.id, updatedItem);
    }
    res.json({ success: true });
  });

  app.post("/api/submitted-contents/delete", async (req, res) => {
    const { id } = req.body;
    db.submittedContents = db.submittedContents.filter((c: any) => c.id !== Number(id));
    await deleteDocumentFromFirestore("submittedContents", id);
    res.json({ success: true });
  });

  app.post("/api/content/publish", formRateLimiter, async (req, res) => {
    const { title, content, author, category, image, date } = req.body;
    const cleanTitle = sanitizeString(title);
    const cleanContent = sanitizeString(content);
    const cleanAuthor = sanitizeString(author);
    const cleanCategory = sanitizeString(category);

    if (!cleanTitle || !cleanContent) {
      return res.status(400).json({ error: "Judul dan konten berita/artikel wajib diisi." });
    }

    const newItem = {
      id: Date.now(),
      title: cleanTitle,
      content: cleanContent,
      author: cleanAuthor || "Admin SIAP",
      category: cleanCategory === "Pikiran Kritis" ? "Opini" : cleanCategory,
      image: image || "https://picsum.photos/seed/pmii/800/400",
      date: date || new Date().toISOString()
    };

    let targetColl = "articles";
    if (cleanCategory === "Berita") {
      targetColl = "news";
      db.news.unshift(newItem);
    } else if (cleanCategory === "Pengumuman") {
      targetColl = "announcements";
      const ann = {
        id: newItem.id,
        title: newItem.title,
        content: newItem.content,
        documentUrl: "#",
        date: newItem.date,
        category: "Pengumuman",
      };
      db.announcements.unshift(ann);
      await saveDocumentToFirestore("announcements", newItem.id, ann);
      return res.json({ success: true, item: ann });
    } else {
      // Opini or Artikel
      db.articles.unshift(newItem);
    }
    await saveDocumentToFirestore(targetColl, newItem.id, newItem);
    res.json({ success: true, item: newItem });
  });

  app.post("/api/content/delete", async (req, res) => {
    const { id, category } = req.body;
    let targetColl = "articles";
    if (category === "Berita") targetColl = "news";
    else if (category === "Pengumuman") targetColl = "announcements";

    if (db[targetColl]) {
      db[targetColl] = db[targetColl].filter((item: any) => item.id !== Number(id));
    }
    await deleteDocumentFromFirestore(targetColl, id);
    res.json({ success: true });
  });

  app.post("/api/content/update", async (req, res) => {
    const { id, title, content, author, category, image } = req.body;
    let targetColl = "articles";
    if (category === "Berita") targetColl = "news";
    else if (category === "Pengumuman") targetColl = "announcements";

    let updatedItem: any = null;
    if (db[targetColl]) {
      db[targetColl] = db[targetColl].map((item: any) => {
        if (item.id === Number(id)) {
          updatedItem = {
            ...item,
            title: title ? sanitizeString(title) : item.title,
            content: content ? sanitizeString(content) : item.content,
            author: author ? sanitizeString(author) : item.author,
            category: category ? sanitizeString(category) : item.category,
            image: image || item.image
          };
          return updatedItem;
        }
        return item;
      });
    }
    if (updatedItem) {
      await saveDocumentToFirestore(targetColl, updatedItem.id, updatedItem);
    }
    res.json({ success: true, item: updatedItem });
  });

  app.get("/api/products", (req, res) => {
    res.json(db.products || []);
  });

  app.post("/api/products", async (req, res) => {
    const product = req.body;
    const id = product.id || Date.now();
    const newProduct = { 
      ...product, 
      id,
      name: sanitizeString(product.name),
      price: sanitizeString(product.price),
      provider: sanitizeString(product.provider),
      contact: sanitizeString(product.contact)
    };
    const existingIdx = db.products.findIndex((p: any) => p.id === Number(id));
    if (existingIdx >= 0) {
      db.products[existingIdx] = newProduct;
    } else {
      db.products.unshift(newProduct);
    }
    await saveDocumentToFirestore("products", id, newProduct);
    res.json({ success: true, product: newProduct });
  });

  app.post("/api/products/delete", async (req, res) => {
    const { id } = req.body;
    db.products = db.products.filter((p: any) => p.id !== Number(id));
    await deleteDocumentFromFirestore("products", id);
    res.json({ success: true });
  });

  app.get("/api/members", (req, res) => {
    res.json(db.members || []);
  });

  app.post("/api/register", formRateLimiter, async (req, res) => {
    const memberData = req.body;
    
    // 1. Anti-spam honeypot check
    if (memberData.website_url_hp || memberData.fax_hp) {
      return res.status(400).json({ error: "Permintaan ditolak (Sistem mendeteksi spam/bot)." });
    }

    // 2. Server-side validation & sanitization
    const fullName = sanitizeString(memberData.fullName || "");
    const whatsapp = sanitizeString(memberData.whatsapp || "");
    const email = sanitizeString(memberData.email || "");

    if (!fullName || fullName.length < 3) {
      return res.status(400).json({ error: "Nama lengkap wajib diisi minimal 3 karakter." });
    }

    if (!whatsapp || whatsapp.length < 9) {
      return res.status(400).json({ error: "Nomor WhatsApp/Telepon aktif wajib diisi minimal 9 digit." });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Format email tidak valid." });
    }

    const sanitizedMemberData: Record<string, any> = {};
    for (const key in memberData) {
      if (typeof memberData[key] === "string") {
        sanitizedMemberData[key] = sanitizeString(memberData[key]);
      } else {
        sanitizedMemberData[key] = memberData[key];
      }
    }

    const newMember = { ...sanitizedMemberData, id: Date.now(), status: "pending" };
    db.members.push(newMember);
    await saveDocumentToFirestore("members", newMember.id, newMember);
    res.json({ message: "Pendaftaran berhasil, data anda akan ditinjau oleh pengurus." });
  });

  app.post("/api/critics", formRateLimiter, async (req, res) => {
    const name = sanitizeString(req.body.name || "Anonim");
    const email = sanitizeString(req.body.email || "");
    const suggestion = sanitizeString(req.body.suggestion || req.body.content || "");

    if (!suggestion || suggestion.length < 5) {
      return res.status(400).json({ error: "Isi kritik/saran wajib diisi minimal 5 karakter." });
    }

    const newCritic = {
      id: Date.now(),
      name,
      email,
      suggestion,
      date: new Date().toISOString()
    };
    db.criticSuggestions.push(newCritic);
    await saveDocumentToFirestore("criticSuggestions", newCritic.id, newCritic);
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

  // SEO Endpoints for Google Search Crawlers & Indexing
  app.get("/sitemap.xml", (req, res) => {
    res.header("Content-Type", "application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pcikapmiikbb.or.id/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/profil/pc</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/profil/pac</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/profil/ranting</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/profil/lbh</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/profil/koperasi</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/profil/puslitdiklat</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/profil/selayang-pandang</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/publikasi/berita</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/publikasi/opini</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/publikasi/artikel</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/publikasi/pengumuman</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/publikasi/galeri</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/produk-umkm/katalog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/daftar-anggota</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://pcikapmiikbb.or.id/donasi</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
  });

  app.get("/robots.txt", (req, res) => {
    res.header("Content-Type", "text/plain");
    res.send(`User-agent: *
Allow: /

Sitemap: https://pcikapmiikbb.or.id/sitemap.xml`);
  });

  // SEO Metadata Generator for Server-Side HTML Pre-Rendering
  function getSeoMetadata(reqPath: string) {
    const canonicalUrl = `https://pcikapmiikbb.or.id${reqPath}`;
    
    let title = "PC IKA PMII Kabupaten Bandung Barat | Rumah Digital Alumni PMII KBB";
    let description = "Portal Resmi PC IKA PMII Kabupaten Bandung Barat. Sistem Informasi Alumni (SIAP Pedia), Koperasi KAMARA, LBH IKA PMII, Berita & Opini.";
    let jsonLd: any = {
      "@context": "https://schema.org",
      "@type": "NGO",
      "name": "PC IKA PMII Kabupaten Bandung Barat",
      "alternateName": "IKA PMII KBB",
      "url": "https://pcikapmiikbb.or.id/",
      "logo": "https://pcikapmiikbb.or.id/assets/images/logo.png",
      "description": "Pengurus Cabang Ikatan Keluarga Alumni PMII Kabupaten Bandung Barat.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kp. Babakan Rt 003 Rw 007 Desa Tanimulya",
        "addressLocality": "Kecamatan Ngamprah",
        "addressRegion": "Kabupaten Bandung Barat",
        "postalCode": "40552",
        "addressCountry": "ID"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+6282115991771",
        "contactType": "customer service",
        "email": "pcikapmiibandungbarat@gmail.com"
      }
    };

    if (reqPath.startsWith("/profil/pc")) {
      title = "Pengurus Cabang PC IKA PMII Bandung Barat | Profil Organisasi";
      description = "Struktur Organisasi Pengurus Cabang IKA PMII Kabupaten Bandung Barat. Susunan dewan penasihat, dewan pembina, dan pengurus harian.";
    } else if (reqPath.startsWith("/profil/pac")) {
      title = "Pengurus Anak Cabang (PAC) IKA PMII Se-Bandung Barat";
      description = "Direktori Pengurus Anak Cabang (PAC) IKA PMII di 16 Kecamatan Kabupaten Bandung Barat.";
    } else if (reqPath.startsWith("/profil/lbh")) {
      title = "LBH PC IKA PMII Bandung Barat | Bantuan Hukum Pro-Bono";
      description = "Lembaga Bantuan Hukum PC IKA PMII KBB menyediakan konsultasi, advokasi, dan bantuan hukum gratis untuk masyarakat.";
    } else if (reqPath.startsWith("/profil/koperasi")) {
      title = "Koperasi Swatransaksi KAMARA | Pemberdayaan Ekonomi Alumni";
      description = "Koperasi Mandiri Rakyat Sejahtera (KAMARA) IKA PMII Bandung Barat. Pusat inkubasi UMKM alumni dan ritel swalayan.";
    } else if (reqPath.startsWith("/publikasi/berita")) {
      title = "Berita & Warta Terkini PC IKA PMII Bandung Barat";
      description = "Kumpulan berita resmi, kegiatan cabang, dan warta terkini alumni PMII Kabupaten Bandung Barat.";
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Berita & Warta Terkini PC IKA PMII Bandung Barat",
        "itemListElement": (db.news || []).slice(0, 5).map((item: any, index: number) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "NewsArticle",
            "headline": item.title,
            "description": item.content ? item.content.substring(0, 150) : "",
            "datePublished": item.date,
            "author": {
              "@type": "Organization",
              "name": item.author || "Redaksi IKA PMII KBB"
            }
          }
        }))
      };
    } else if (reqPath.startsWith("/publikasi/opini")) {
      title = "Opini & Suara Pergerakan Alumni PMII Bandung Barat";
      description = "Kanal pemikiran kritis, tulisan opini, dan sumbangsih ide kebangsaan kader alumni PMII KBB.";
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Opini & Pemikiran Intelektual Alumni PMII KBB",
        "itemListElement": (db.articles || []).filter((a: any) => a.category === "Opini").slice(0, 5).map((item: any, index: number) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "BlogPosting",
            "headline": item.title,
            "description": item.content ? item.content.substring(0, 150) : "",
            "datePublished": item.date,
            "author": {
              "@type": "Person",
              "name": item.author || "Alumni PMII KBB"
            }
          }
        }))
      };
    } else if (reqPath.startsWith("/produk-umkm/katalog")) {
      title = "Katalog Produk UMKM Alumni IKA PMII Bandung Barat";
      description = "Showcase produk kreatif, kriya, kuliner, dan usaha mandiri buatan kader alumni PMII KBB.";
    } else if (reqPath.startsWith("/daftar-anggota")) {
      title = "Pendaftaran SIAP Pedia | Verifikasi E-KTA Alumni PMII KBB";
      description = "Formulir pendataan terpusat dan verifikasi e-KTA Sistem Informasi Alumni PMII (SIAP) Kabupaten Bandung Barat.";
    }

    return { title, description, canonicalUrl, jsonLd };
  }

  function injectSeoIntoHtml(html: string, seo: any) {
    let updated = html;
    
    // Replace <title>
    updated = updated.replace(/<title>.*?<\/title>/gi, `<title>${seo.title}</title>`);
    
    // Replace description
    if (updated.includes('name="description"')) {
      updated = updated.replace(/<meta name="description" content=".*?" \/>/gi, `<meta name="description" content="${seo.description}" />`);
    }

    // Replace og:title
    if (updated.includes('property="og:title"')) {
      updated = updated.replace(/<meta property="og:title" content=".*?" \/>/gi, `<meta property="og:title" content="${seo.title}" />`);
    }

    // Replace og:description
    if (updated.includes('property="og:description"')) {
      updated = updated.replace(/<meta property="og:description" content=".*?" \/>/gi, `<meta property="og:description" content="${seo.description}" />`);
    }

    // Inject dynamic JSON-LD
    const jsonLdScript = `\n    <script type="application/ld+json">\n${JSON.stringify(seo.jsonLd, null, 2)}\n    </script>\n`;
    updated = updated.replace("</head>", `${jsonLdScript}</head>`);

    return updated;
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { 
      index: false,
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        if (/\.(js|css|webp|png|jpg|jpeg|svg|woff2?|ttf|eot)$/i.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      }
    }));
    app.get("*", (req, res) => {
      if (!req.path.startsWith("/api")) {
        const indexPath = path.join(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
          let template = fs.readFileSync(indexPath, "utf-8");
          const seoData = getSeoMetadata(req.path);
          template = injectSeoIntoHtml(template, seoData);
          return res.status(200).set({ "Content-Type": "text/html" }).end(template);
        }
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
