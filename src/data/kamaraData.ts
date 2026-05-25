export interface ProductItem {
  id: string;
  name: string;
  category: "Consumer Goods" | "Produk Kreatif" | "Produk UMKM Lokal";
  subCategory: string;
  price: string;
  priceNum: number;
  image: string;
  description: string;
  stockStatus: "Tersedia" | "Pre-Order" | "Stok Terbatas";
  rating: number;
  provider: string;
  contact: string;
  // Brand marketing brief
  marketingBrief: {
    targetMarket: string;
    uniqueSellingPoint: string;
    marketingMessage: string;
  };
}

export interface ServiceItem {
  id: string;
  name: string;
  category: "Media Kreatif" | "Digital" | "Pelayanan" | "Jasa Perantara & Pengadaan";
  subCategory: string;
  priceStart: string;
  priceStartNum: number;
  description: string;
  benefits: string[];
  estimation: string;
  provider: string;
  contact: string;
  marketingBrief: {
    targetMarket: string;
    uniqueSellingPoint: string;
    marketingMessage: string;
  };
}

export interface PackageItem {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  description: string;
  benefits: string[];
  bannerText: string;
}

export interface PromoItem {
  id: string;
  name: string;
  type: "Promo Mingguan" | "Diskon Anggota" | "Flash Sale" | "Paket Bundling";
  description: string;
  discountBadge: string;
  originalPrice: string;
  promoPrice: string;
  endsInHours?: number;
}

export const PHYSICAL_PRODUCTS: ProductItem[] = [
  // Consumer Goods - Sembako
  {
    id: "prod-1",
    name: "Beras Premium Cianjur 5kg",
    category: "Consumer Goods",
    subCategory: "Sembako",
    price: "Rp 75.000",
    priceNum: 75000,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Beras premium slyp super dari sawit Cianjur pilihan, bebas pemutih, pulen dan harum.",
    stockStatus: "Tersedia",
    rating: 4.8,
    provider: "Koperasi KAMARA Mitra Ngamprah",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Keluarga muslim, pelaku warung makan baksos Al-Fatihah, dan masyarakat umum.",
      uniqueSellingPoint: "Diproduksi langsung oleh petani binaan alumni PMII KBB dengan marjin kembali ke Koperasi anggota.",
      marketingMessage: "Piring makan berkah dengan beras berkualitas tinggi untuk stamina pergerakan harian!"
    }
  },
  {
    id: "prod-2",
    name: "Minyak Goreng Sawit 2L",
    category: "Consumer Goods",
    subCategory: "Sembako",
    price: "Rp 36.000",
    priceNum: 36000,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Minyak goreng kelapa sawit olahan murni dua kali penyaringan, jernih, dan tidak cepat keruh.",
    stockStatus: "Tersedia",
    rating: 4.7,
    provider: "Koperasi KAMARA Pusat",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Ibu rumah tangga, katering koperasi, dan pelaku usaha gorengan wilayah Padalarang.",
      uniqueSellingPoint: "Harga bersaing langsung dari jaringan distributor utama.",
      marketingMessage: "Menggoreng lebih garing, sehat bagi jantung, dan hemat di kantong!"
    }
  },
  {
    id: "prod-3",
    name: "Gula Pasir Kristal Tebu 1kg",
    category: "Consumer Goods",
    subCategory: "Sembako",
    price: "Rp 16.500",
    priceNum: 16500,
    image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Gula pasir putih kualitas premium, butiran kristal bersih tanpa bahan pengawet kimiawi.",
    stockStatus: "Tersedia",
    rating: 4.6,
    provider: "Koperasi KAMARA Distrik Cihampelas",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Kedai kopi alumni, produsen kue lokal, konsumen rumah tangga.",
      uniqueSellingPoint: "Asli tebu pilihan, manis alami tanpa campuran pemanis buatan.",
      marketingMessage: "Manis murni, menyehatkan cangkir teh dan olahan dapur Anda."
    }
  },
  {
    id: "prod-4",
    name: "Tepung Terigu Serbaguna 1kg",
    category: "Consumer Goods",
    subCategory: "Sembako",
    price: "Rp 12.000",
    priceNum: 12000,
    image: "https://images.unsplash.com/photo-1541256996761-85df2eff3139?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Tepung terigu protein sedang sangat cocok untuk berbagai variasi gorengan, roti basah, dan kue tradisional.",
    stockStatus: "Tersedia",
    rating: 4.5,
    provider: "Koperasi KAMARA Pusat",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "UMKM kue alumni, ibu rumah tangga kreatif penyuka baking.",
      uniqueSellingPoint: "Kadar abu rendah menghasilkan warna kue yang lebih putih alami.",
      marketingMessage: "Kreasikan jajan sehat bernutrisi tinggi bersama tepung terigu KAMARA."
    }
  },
  {
    id: "prod-5",
    name: "Mie Instan Paket Hemat isi 5",
    category: "Consumer Goods",
    subCategory: "Sembako",
    price: "Rp 15.000",
    priceNum: 15000,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Satu kardus isi mini 5 pcs mie instan kuah soto dan goreng, favorit kader saat rapat koordinasi.",
    stockStatus: "Stok Terbatas",
    rating: 4.9,
    provider: "Koperasi KAMARA Mart Padalarang",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Mahasiswa aktivis, santri pondok pesantren binaan, dan posko kemanusiaan.",
      uniqueSellingPoint: "Sajian cepat saji andalan dengan isi porsi pas harga mahasiswa gila hemat.",
      marketingMessage: "Kawan setia begadang menyelesaikan tulisan opini dan diskusi substantif!"
    }
  },

  // Consumer Goods - Minuman
  {
    id: "prod-6",
    name: "Kopi Arabika Gunung Halu 250g",
    category: "Consumer Goods",
    subCategory: "Minuman",
    price: "Rp 35.000",
    priceNum: 35000,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Kopi Arabika murni dipanen dari dataran tinggi Gunung Halu Bandung Barat. Memiliki cita rasa fruity maskulin.",
    stockStatus: "Tersedia",
    rating: 4.9,
    provider: "Wirausaha Muda Kader Gununghalu",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Penikmat kopi sejati, barista warkop pergerakan, buah tangan khas Bandung Barat.",
      uniqueSellingPoint: "Singel origin organik diproses semi-washed oleh petani andalan IKA PMII.",
      marketingMessage: "Secangkir keberanian menyulut ide kritis dan diskusi pergerakan!"
    }
  },
  {
    id: "prod-7",
    name: "Teh Celup Daun Kelor Herbal",
    category: "Consumer Goods",
    subCategory: "Minuman",
    price: "Rp 22.000",
    priceNum: 22000,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Teh herba daun kelor kaya akan gizi mikro, kalsium, antioksidan penurun kolesterol tinggi.",
    stockStatus: "Tersedia",
    rating: 4.7,
    provider: "Kriya Sehat Alumni Cililin",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Masyarakat lanjut usia, pegiat pola hidup organik/sehat.",
      uniqueSellingPoint: "Dikeringkan dengan metode hampa suhu rendah menjaga klorofil asli daun kelor.",
      marketingMessage: "Detoks tubuh rasakan kesegaran herba murni setiap pagi."
    }
  },
  {
    id: "prod-8",
    name: "Minuman Sari Jahe Merah Instan",
    category: "Consumer Goods",
    subCategory: "Minuman",
    price: "Rp 25.000",
    priceNum: 25000,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Ekstrak jahe merah segar dipadu gula aren alami. Cukup seduh air hangat siap menghangatkan sirkulasi darah.",
    stockStatus: "Tersedia",
    rating: 4.8,
    provider: "Tani Mandiri Cipatat",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Kader aktif yang sering dinas luar, bapak-bapak ronda, praktisi kesehatan alami.",
      uniqueSellingPoint: "Formula jahe konsentrat murni tanpa esens pedas lada sintetis.",
      marketingMessage: "Hangat menusuk tulang, mengusir flu, dan menyegarkan pita suara pasca oras!"
    }
  },

  // Consumer Goods - Snack & Makanan Ringan
  {
    id: "prod-9",
    name: "Basreng Pedas Daun Jeruk 250g",
    category: "Consumer Goods",
    subCategory: "Snack & Makanan Ringan",
    price: "Rp 15.000",
    priceNum: 15000,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Camilan bakso goreng renyah bumbu cabai geprek asli berbalut wangi daun jeruk purut segar.",
    stockStatus: "Tersedia",
    rating: 4.9,
    provider: "Kuliner Kreatif Ngamprah",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Remaja masa kini, penikmat makanan pedas ekstrem, teman santai nonton bola.",
      uniqueSellingPoint: "Tekstur kriuk renyah empuk tidak keras di gigi dengan bumbu melimpah.",
      marketingMessage: "Pedasnya nampol, wangi daun jeruknya bikin ga mau berhenti ngunyah!"
    }
  },
  {
    id: "prod-10",
    name: "Keripik Singkong Renyah Rasa Ori",
    category: "Consumer Goods",
    subCategory: "Snack & Makanan Ringan",
    price: "Rp 12.500",
    priceNum: 12500,
    image: "https://images.unsplash.com/photo-1566617918597-152813466be5?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Keripik singkong kering tipis bebas gluten digoreng dengan minyak kelapa premium, rasa asin manis pas.",
    stockStatus: "Tersedia",
    rating: 4.8,
    provider: "Koperasi Unit Cipongkor",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Keluarga berkumpul, hidangan toples tamu kantor sekretariat.",
      uniqueSellingPoint: "Bahan singkong mentega lokal segar dipotong super presisi presisi.",
      marketingMessage: "Asli rasa warisan sunda, renyah gurihnya tulus dinikmati."
    }
  },

  // Consumer Goods - Household
  {
    id: "prod-11",
    name: "Sabun Cuci Piring KAMARA Lemon",
    category: "Consumer Goods",
    subCategory: "Produk Rumah Tangga",
    price: "Rp 14.000",
    priceNum: 14000,
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Sabun cair konsentrat pembersih perkakas dapur wangi jeruk nipis lemon, meluluhkan tumpukan minyak instan.",
    stockStatus: "Tersedia",
    rating: 4.7,
    provider: "Kimia Kreatif Alumni Batujajar",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Usaha rumah makan alumni, warung bakso, katering, dan ibu rumah tangga.",
      uniqueSellingPoint: "Busa melimpah, tidak pedih atau kering di kulit tangan, ramah lingkungan.",
      marketingMessage: "Piring bersih kesat berkilau kuman lari, dukung produk lokal kader!"
    }
  },

  // Produk Kreatif - Kaos & Apparel
  {
    id: "prod-12",
    name: "Kaos Sablon Komunitas Premium",
    category: "Produk Kreatif",
    subCategory: "Kaos & Apparel Custom",
    price: "Rp 85.000",
    priceNum: 85000,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Layanan cetak kaos custom bahan Cotton Combed 30s reaktif dingin nyaman dengan sablon plastisol halus tahan pecah.",
    stockStatus: "Pre-Order",
    rating: 4.9,
    provider: "Distro Pergerakan Padalarang",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Komunitas panitia seminar, kelas sekolah, panitia reuni instansi, alumni kader PMII.",
      uniqueSellingPoint: "Jahitan rantai pundak standar distro berkualitas ekspor, gratis konsultasi mockup desain kaos.",
      marketingMessage: "Ekspresikan identitas solidaritas kelompokmu dengan sandangan berkualitas tinggi!"
    }
  },
  {
    id: "prod-13",
    name: "Jaket Bomber Organisasi Eksklusif",
    category: "Produk Kreatif",
    subCategory: "Kaos & Apparel Custom",
    price: "Rp 250.000",
    priceNum: 250000,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Jaket bomber dacron tebal bahan taslan rnw waterproof (anti percikan air), ritsleting kedap angin bordir logo presisi.",
    stockStatus: "Pre-Order",
    rating: 4.8,
    provider: "Garmen Alumni Lembang",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Jajaran pengurus cabang/daerah organisasi, alumni kelompok hobby, jurnalis kampus.",
      uniqueSellingPoint: "Bahan waterproof dipadu puring dalam kaos adem, sangat fungsional di wilayah dingin Lembang.",
      marketingMessage: "Tampil gagah, berwibawa, siap tempur hadapi malam panjang dan perubahan cuaca!"
    }
  },

  // Produk Kreatif - Merchandise
  {
    id: "prod-14",
    name: "Tumbler Stainless Logo Laser",
    category: "Produk Kreatif",
    subCategory: "Merchandise Custom",
    price: "Rp 65.000",
    priceNum: 65000,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Tumbler termos hampa udara stainless SUS304 menyimpan suhu panas/dingin hingga 12 jam, grafir laser nama/logo.",
    stockStatus: "Pre-Order",
    rating: 4.9,
    provider: "Merch Alumni Parongpong",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Karyawan dinas KBB, eksekutif bisnis, hadiah narasumber seminar, souvenir wisuda.",
      uniqueSellingPoint: "Hasil ukiran logo anti luntur awet selamanya, tampilan minimalis premium doff.",
      marketingMessage: "Kurangi botol plastik sekali pakai, bawa pesan ramah lingkungan bergaya eksklusif!"
    }
  },

  // Produk UMKM Lokal - Makanan
  {
    id: "prod-15",
    name: "Dodol Ketan Tradisional Cililin",
    category: "Produk UMKM Lokal",
    subCategory: "Makanan Lokal",
    price: "Rp 25.000",
    priceNum: 25000,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Kue legit tradisional khas Cililin Bandung Barat terbuat dari gula merah nira, santan murni dan beras ketan pulen.",
    stockStatus: "Tersedia",
    rating: 4.8,
    provider: "Sentra Kriya Pangan Cililin",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Wisatawan, pemudik, suguhan hajatan keluarga besar sunda.",
      uniqueSellingPoint: "Resep turun-temurun diproses kayu bakar menghasilkan aroma asap eksotis alami.",
      marketingMessage: "Legit penuh kehangatan tradisi Bandung Barat yang ngangenin lidah."
    }
  },
  {
    id: "prod-16",
    name: "Sambal Botol Cumi Ciamik 150g",
    category: "Produk UMKM Lokal",
    subCategory: "Makanan Lokal",
    price: "Rp 22.500",
    priceNum: 22500,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Sambal bawang gurih pedas dihiasi suwiran daging cumi asin empuk melimpah, ditumis harum minyak kelapa murni.",
    stockStatus: "Tersedia",
    rating: 4.9,
    provider: "Kuliner Alumni Cisarua",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Pecinta makanan praktis, pekerja kantoran sibuk, bekal piknik luar negeri.",
      uniqueSellingPoint: "Segar tanpa bahan pengawet sintetik, minyak kelapa alami sebagai pengawet botol alami.",
      marketingMessage: "Cukup nasi hangat sepiring, Sambal Ciamik KAMARA langsung bikin lahap nafsu makan!"
    }
  },

  // Produk UMKM Lokal - Kerajinan & Handmade
  {
    id: "prod-17",
    name: "Anyaman Bambu Mini Estetik",
    category: "Produk UMKM Lokal",
    subCategory: "Kerajinan & Handmade",
    price: "Rp 45.000",
    priceNum: 45000,
    image: "https://images.unsplash.com/photo-1595111028308-b99b53757ac5?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Kriya anyaman bambu rapi buatan tangan berupa wadah serbaguna/runcang buah yang menambah estetika interior rumah.",
    stockStatus: "Tersedia",
    rating: 4.8,
    provider: "Suku Kriya Bambu Cikalongwetan",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Pecinta dekorasi rumah bernuansa bohemian, arsitek interior, penyelenggara seserahan sunda.",
      uniqueSellingPoint: "Menggunakan serat bambu andong tua awet anti rayap alami dengan finishing food-grade jernih.",
      marketingMessage: "Bawa kehangatan karya anyaman kriya pengrajin tulus pedesaan ke apartemen modern Anda."
    }
  },
  {
    id: "prod-18",
    name: "Lilin Aromaterapi Essential Oil",
    category: "Produk UMKM Lokal",
    subCategory: "Kerajinan & Handmade",
    price: "Rp 35.000",
    priceNum: 35000,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&h=450&q=80",
    description: "Lilin beraroma wangi esensial tumbuhan penenang jiwa berbahan dasar minyak kedelai murni bebas jelaga hitam berasap.",
    stockStatus: "Tersedia",
    rating: 4.8,
    provider: "Kriya Alumni Saguling",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Pekerja kreatif work-from-home, klinik spa, kado ulang tahun estetik sahabat.",
      uniqueSellingPoint: "Menggunakan sumbu kapas alami bebas timbal dengan campuran minyak lavender dan teh hijau.",
      marketingMessage: "Redakan stres harian, ciptakan suasana damai hening penuh inspirasi baru."
    }
  }
];

export const SERVICES_CATALOG: ServiceItem[] = [
  // Media Kreatif
  {
    id: "serv-1",
    name: "Desain Logo & Identitas Brand",
    category: "Media Kreatif",
    subCategory: "Desain Grafis",
    priceStart: "Rp 150.000",
    priceStartNum: 150000,
    description: "Jasa perancangan logo eksklusif, filosofis, representatif untuk start-up UMKM, yayasan atau instansi.",
    benefits: ["Format Vector AI/EPS resolusi tinggi", "Transparan PNG, JPG resolusi cetak", "Panduan warna merek & tipografi", "Revisi maksimal 3 kali"],
    estimation: "2 - 3 Hari Pengerjaan",
    provider: "Kader Creative Agency KBB",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Pengusaha pemula UMKM alumni, pengurus pmii cabang, instansi sekolah swasta.",
      uniqueSellingPoint: "Didesain berdasarkan riset kompetitor bisnis mendalam agar logo mudah diingat dan dipatenkan.",
      marketingMessage: "Logo hebat adalah fondasi bisnis raksasa yang menanam kepercayaan jutaan pembeli!"
    }
  },
  {
    id: "serv-2",
    name: "Video Promosi Soshmed Sinematik",
    category: "Media Kreatif",
    subCategory: "Editing Video",
    priceStart: "Rp 250.000",
    priceStartNum: 250000,
    description: "Layanan editing video sinematik profiling produk, reels instagram, konten TikTok yang memikat konversi pembeli.",
    benefits: ["Kualitas video Full HD / 4K", "Pemilihan lagu pendukung bebas hak cipta", "Animasi teks & subtitle dinamis", "Revisi maksimal 2 kali"],
    estimation: "3 - 5 Hari Pengerjaan",
    provider: "Alumni Media Creative Lembang",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Katering, kafe kopi, wisata outdoor d'Ranch Lembang, produk fesyen jualan online.",
      uniqueSellingPoint: "Gaya editing tempo cepat (snappy) yang menahan bola mata penonton fyp dalam 3 detik pertama.",
      marketingMessage: "Ubah penonton kasual di Reels atau TikTok menjadi pembeli setia tokomu sekarang juga!"
    }
  },
  {
    id: "serv-3",
    name: "Live Streaming Multi-Kamera Acara",
    category: "Media Kreatif",
    subCategory: "Dokumentasi Foto & Video",
    priceStart: "Rp 1.500.000",
    priceStartNum: 1500000,
    description: "Layanan live penyiaran multi-kamera profesional untuk webinar, rapat raksasa nasional, pelantikan kepengurusan.",
    benefits: ["Operator OBS profesional", "Setup 2-3 kamera Full HD", "Integrasi slide pembicara, nama & logo instansi", "Backup rekaman mentah penuh"],
    estimation: "Hari Kegiatan",
    provider: "Tim IT & Multimedia PC IKA PMII",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Panitia pelantikan organisasi, partai politik, instansi pemerintahan dinas kbb, kampus universitas.",
      uniqueSellingPoint: "Koneksi multi-provider handal meminimalisir buffering, didukung jajaran alumni profesional media televisi.",
      marketingMessage: "Hadirkan gaung pelantikan nasionalmu secara megah, jernih di YouTube atau Zoom laksana siaran TV!"
    }
  },

  // Digital
  {
    id: "serv-4",
    name: "Website Profil UMKM & Sekolah",
    category: "Digital",
    subCategory: "Pembuatan Website",
    priceStart: "Rp 1.200.000",
    priceStartNum: 1200000,
    description: "Pembuatan website profil profesional super responsif (anti lelet), optimasi SEO Google Maps agar bisnis muncul di pencarian teratas warga.",
    benefits: ["Sistem kelola isi website mandiri (CMS)", "Domain gratis .com / .org selama 1 tahun", "Layanan hosting cepat aman SSD", "Integrasi formulir pendaftaran & WhatsApp"],
    estimation: "5 - 7 Hari Pengerjaan",
    provider: "Kader IT Cyber Solusindo",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Pondok pesantren, yayasan alumni, pabrik kecil kriya di Padalarang, sekolah swasta.",
      uniqueSellingPoint: "Sistem desain ultra responsive mobile, website dijamin terdaftar di indeks Google dalam 24 jam.",
      marketingMessage: "Dunia beralih ke digital, jangkau calon wali santri dan pembeli besar korporat lewat situs web resmi!"
    }
  },

  // Pelayanan
  {
    id: "serv-5",
    name: "Top-Up Saldo, Tiket & Bayar Tagihan (PPOB)",
    category: "Pelayanan",
    subCategory: "PPOB",
    priceStart: "Mulai Rp 2.000",
    priceStartNum: 2000,
    description: "Layanan bayar tagihan bulanan keluarga, listrik PLN, PDAM KBB, BPJS, paket kuota internet serta tiket perjalanan Kereta api.",
    benefits: ["Struk bukti pembayaran resmi PDF", "Prosedur kilat kurang dari 5 menit", "Harga promo lebih murah dari konter minimarket"],
    estimation: "Instan 5 Menit",
    provider: "KAMARA Multi-Payment Sentral",
    contact: "082115991771",
    marketingBrief: {
      targetMarket: "Kader sibuk rapat, rumah tangga pedesaan Bandung Barat, warga umum.",
      uniqueSellingPoint: "Keuntungan 100% diputar untuk pendanaan operasional dan posko bencana sosial ikb PMII.",
      marketingMessage: "Bayar tagihan listrik rumahtangga sembari berinfak demi kemajuan kader masa depan!"
    }
  }
];

export const KAMARA_PACKAGES: PackageItem[] = [
  {
    id: "pkg-1",
    name: "Paket Starter UMKM",
    price: "Rp 250.000",
    priceNum: 250000,
    description: "Cocok untuk usaha baru merintis, memberikan tampilan profesional dasar instan dengan hemat biaya.",
    benefits: [
      "Logo sederhana (Filosofis & 2 Varian warna)",
      "Banner lapak/toko baliho (Ukuran cetak 2x1 meter)",
      "9 Templat feed Instagram estetik (Siap isi canva)",
      "Kartu nama digital interaktif (Berformat PDF/Website link)"
    ],
    bannerText: "Paling Hemat"
  },
  {
    id: "pkg-2",
    name: "Paket Branding UMKM",
    price: "Rp 1.500.000",
    priceNum: 1500000,
    description: "Rekomendasi terbaik untuk melambungkan kredibilitas brand agar dipercaya ritel modern korporat.",
    benefits: [
      "Website profil usaha (Landing page 1 halaman, Domain & Hosting 1 thn)",
      "Sesi foto produk katalog (10 mockup foto studio resolusi tinggi)",
      "Pengelolaan konten sosmed primer (12 Desain feed, riset tulisan caption)",
      "Pendaftaran & verifikasi lokasi di Google Maps Bisnis"
    ],
    bannerText: "Rekomendasi Utama"
  },
  {
    id: "pkg-3",
    name: "Paket Event & Promosi Acara",
    price: "Rp 2.250.000",
    priceNum: 2250000,
    description: "Solusi total panitia mandiri untuk kelancaran kegiatan khidmat ormas, seminar, atau dies natalis.",
    benefits: [
      "24 Kaos polo panitia dengan bordir logo presisi",
      "Serat Name tag / ID Card panitia sebanyak 30 pcs",
      "Dokumentasi foto & Cinematic Video highlight (Durasi 1 menit)",
      "Spanduk panggung panggung utama acara (Ukuran besar 4x2 m)",
      "Paket hampers bingkisan souvenir narasumber kehormatan"
    ],
    bannerText: "Terlengkap"
  }
];

export const PROMO_ITEMS: PromoItem[] = [
  {
    id: "prm-1",
    name: "Diskon Sembako Akhir Pekan",
    type: "Promo Mingguan",
    description: "Beli Beras premium KAMARA 5kg + Minyak sawit 2L hemat langsung Rp 10.000, stok dikirim instan se-Padalarang.",
    discountBadge: "Potongan Rp 10rb",
    originalPrice: "Rp 111.000",
    promoPrice: "Rp 101.000"
  },
  {
    id: "prm-2",
    name: "Harga Spesial Anggota Koperasi",
    type: "Diskon Anggota",
    description: "Potongan harga langsung 15% untuk pembelian Kaos/Apparel eksklusif IKA PMII KBB dengan melampirkan no registrasi SIAP.",
    discountBadge: "Diskon 15%",
    originalPrice: "Rp 85.000",
    promoPrice: "Rp 72.250"
  },
  {
    id: "prm-3",
    name: "Flash Sale Kopi Arabika Gunung Halu",
    type: "Flash Sale",
    description: "Khusus pemesanan hari kramat jumat barokah, kopi Arabika wangi Gunung Halu potong sepertiga harga, kuota terbatas!",
    discountBadge: "Hemat 25%",
    originalPrice: "Rp 35.000",
    promoPrice: "Rp 26.250",
    endsInHours: 3
  },
  {
    id: "prm-4",
    name: "Paket Lengkap Seminar Kit",
    type: "Paket Bundling",
    description: "Tas spunbond ramah lingkungan, pulpen, notebook catatan ringkas berstiker IKA PMII murah meriah borongan minimum 50 paket.",
    discountBadge: "Bundling Hemat",
    originalPrice: "Rp 32.000",
    promoPrice: "Rp 23.500 / Paket"
  }
];
