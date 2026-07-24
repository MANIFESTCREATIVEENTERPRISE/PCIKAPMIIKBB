import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

const SEO_MAP: Record<string, { title: string; description: string }> = {
  "/": {
    title: "PC IKA PMII Kabupaten Bandung Barat | Rumah Digital Alumni PMII KBB",
    description: "Portal Resmi PC IKA PMII Kabupaten Bandung Barat. Sistem Informasi Alumni (SIAP Pedia), Koperasi KAMARA, LBH IKA PMII, Berita & Opini Intelektual Alumni."
  },
  "/profil/pc": {
    title: "Pengurus Cabang PC IKA PMII Bandung Barat | Profil Organisasi",
    description: "Struktur Organisasi Pengurus Cabang IKA PMII Kabupaten Bandung Barat periode 2026. Susunan dewan penasihat, dewan pembina, dan pengurus harian."
  },
  "/profil/pac": {
    title: "Pengurus Anak Cabang (PAC) IKA PMII Se-Bandung Barat",
    description: "Direktori Pengurus Anak Cabang (PAC) IKA PMII di 16 Kecamatan Kabupaten Bandung Barat."
  },
  "/profil/ranting": {
    title: "Pengurus Ranting & Basis Alumni PMII KBB",
    description: "Basis jaringan alumni PMII tingkat desa dan perguruan tinggi se-Kabupaten Bandung Barat."
  },
  "/profil/lbh": {
    title: "LBH PC IKA PMII Bandung Barat | Layanan Bantuan Hukum Pro-Bono",
    description: "Lembaga Bantuan Hukum PC IKA PMII KBB menyediakan konsultasi, advokasi, dan bantuan hukum gratis untuk masyarakat."
  },
  "/profil/koperasi": {
    title: "Koperasi Swatransaksi KAMARA | Pemberdayaan Ekonomi Alumni",
    description: "Koperasi Mandiri Rakyat Sejahtera (KAMARA) IKA PMII Bandung Barat. Pusat inkubasi UMKM alumni dan ritel swalayan."
  },
  "/profil/puslitdiklat": {
    title: "PUSLITDIKLAT PC IKA PMII Bandung Barat | Pusat Penelitian & Pelatihan",
    description: "Pusat Penelitian, Pengkajian, dan Pelatihan Kepemimpinan PC IKA PMII Kabupaten Bandung Barat."
  },
  "/profil/selayang-pandang": {
    title: "Selayang Pandang IKA PMII Kabupaten Bandung Barat",
    description: "Sejarah, visi-misi, serta pilar pengabdian PancaKarsa PC IKA PMII Kabupaten Bandung Barat."
  },
  "/publikasi/berita": {
    title: "Berita & Warta Terkini PC IKA PMII Bandung Barat",
    description: "Kumpulan berita resmi, kegiatan cabang, dan warta terkini alumni PMII Kabupaten Bandung Barat."
  },
  "/publikasi/opini": {
    title: "Opini & Suara Pergerakan Alumni PMII Bandung Barat",
    description: "Kanal pemikiran kritis, tulisan opini, dan sumbangsih ide kebangsaan kader alumni PMII KBB."
  },
  "/publikasi/artikel": {
    title: "Artikel & Karya Tulis Ilmiah Alumni PMII KBB",
    description: "Koleksi artikel ilmiah, kajian keaswajaan, dan jurnal analisis pembangunan daerah Bandung Barat."
  },
  "/publikasi/pengumuman": {
    title: "Pengumuman Resmi PC IKA PMII Kabupaten Bandung Barat",
    description: "Informasi edaran, registrasi verifikasi, dan pengumuman resmi organisasi IKA PMII KBB."
  },
  "/publikasi/galeri": {
    title: "Galeri Dokumentasi Kegiatan IKA PMII Bandung Barat",
    description: "Dokumentasi foto dan video aksi nyata, reuni akbar, serta bakti sosial alumni PMII KBB."
  },
  "/daftar-anggota": {
    title: "Pendaftaran SIAP Pedia | Verifikasi E-KTA Alumni PMII KBB",
    description: "Formulir pendataan terpusat dan verifikasi e-KTA Sistem Informasi Alumni PMII (SIAP) Kabupaten Bandung Barat."
  },
  "/produk-umkm/katalog": {
    title: "Katalog Produk UMKM Alumni IKA PMII Bandung Barat",
    description: "Showcase produk kreatif, kriya, kuliner, dan usaha mandiri buatan kader alumni PMII KBB."
  },
  "/siap": {
    title: "Portal Anggota SIAP Pedia | PC IKA PMII Bandung Barat",
    description: "Dashboard mandiri anggota terverifikasi SIAP Pedia PC IKA PMII Kabupaten Bandung Barat."
  },
  "/donasi": {
    title: "Wakaf & Infaq Pembangunan Graha IKA PMII Bandung Barat",
    description: "Saluran donasi, wakaf produktif, dan gotong royong pembangunan sekretariat bersama Graha IKA PMII KBB."
  }
};

export default function SEO({ title, description, canonical }: SEOProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const defaultSEO = SEO_MAP[currentPath] || {
    title: "PC IKA PMII Kabupaten Bandung Barat | Rumah Digital Alumni PMII KBB",
    description: "Portal Resmi PC IKA PMII Kabupaten Bandung Barat. Sistem Informasi Alumni (SIAP Pedia), Koperasi KAMARA, LBH IKA PMII, Berita & Opini."
  };

  const finalTitle = title || defaultSEO.title;
  const finalDesc = description || defaultSEO.description;
  const targetCanonical = canonical || `https://pcikapmiikbb.or.id${currentPath}`;

  useEffect(() => {
    // 1. Update Title
    document.title = finalTitle;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", finalDesc);

    // 3. Update OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", finalTitle);

    // 4. Update OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", finalDesc);

    // 5. Update OG URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", targetCanonical);

    // 6. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", targetCanonical);

  }, [finalTitle, finalDesc, targetCanonical, currentPath]);

  return null;
}
