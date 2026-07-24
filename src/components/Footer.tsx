import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { useState, FormEvent } from "react";
import logoImg from "../assets/images/logo.png";

export default function Footer() {
  const [suggestion, setSuggestion] = useState({ name: "", contact: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/critics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(suggestion),
      });
      setSent(true);
      setSuggestion({ name: "", contact: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <footer className="bg-hero-royal bg-islamic-pattern text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10 pb-16 relative z-10">
        {/* Column 1: Brand */}
        <div className="space-y-6 text-left">
          <div className="flex items-center gap-3">
            <img 
              src={logoImg} 
              alt="PC IKA PMII Kabupaten Bandung Barat" 
              className="h-14 w-auto object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallbackStar = e.currentTarget.parentElement?.querySelector(".footer-logo-star");
                if (fallbackStar) fallbackStar.classList.remove("hidden");
              }}
            />
            <div className="footer-logo-star hidden w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-black text-lg border border-amber-300/40 shrink-0">
              ★
            </div>
          </div>
          <p className="text-sm italic text-amber-200/90 font-display">"Satu Angkatan satu jiwa, Putera Bangsa Bebas Merdeka"</p>
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <MapPin size={18} className="shrink-0 text-amber-400 mt-0.5" />
              <span>Kp. Babakan Rt 003 Rw 007 Desa Tanimulya Kecamatan Ngamprah Kabupaten Bandung Barat</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Phone size={18} className="text-amber-400 shrink-0" />
              <span>082115991771</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Mail size={18} className="text-amber-400 shrink-0" />
              <span>pcikapmiibandungbarat@gmail.com</span>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            {[Facebook, Instagram, Youtube, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-amber-300 hover:bg-amber-400 hover:text-slate-950 transition-all duration-300 shadow-sm">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-6 text-left">
          <h3 className="font-display font-bold text-xl border-l-4 border-amber-400 pl-4 text-amber-300">Profil Organisasi</h3>
          <ul id="footer-organisasi-links" className="space-y-3 text-sm text-slate-300">
            <li><Link to="/profil/pc" className="hover:text-amber-300 transition-colors">Pengurus Cabang</Link></li>
            <li><Link to="/profil/pac" className="hover:text-amber-300 transition-colors">Pengurus Anak Cabang</Link></li>
            <li><Link to="/profil/ranting" className="hover:text-amber-300 transition-colors">Pengurus Ranting</Link></li>
            <li><Link to="/profil/lbh" className="hover:text-amber-300 transition-colors">LBH PC IKA PMII</Link></li>
            <li><Link to="/profil/koperasi" className="hover:text-amber-300 transition-colors">Koperasi KAMARA</Link></li>
            <li><Link to="/profil/puslitdiklat" className="hover:text-amber-300 transition-colors">PUSLITDIKLAT</Link></li>
          </ul>
        </div>

        {/* Column 3: Critics/Suggestions */}
        <div className="space-y-6 text-left">
          <h3 className="font-display font-bold text-xl border-l-4 border-amber-400 pl-4 text-amber-300">Kritik &amp; Saran</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 transition-all"
              value={suggestion.name}
              onChange={(e) => setSuggestion({ ...suggestion, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Kontak (WA/Email)"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 transition-all"
              value={suggestion.contact}
              onChange={(e) => setSuggestion({ ...suggestion, contact: e.target.value })}
              required
            />
            <textarea
              placeholder="Pesan, Kritik, atau Saran..."
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 transition-all"
              value={suggestion.message}
              onChange={(e) => setSuggestion({ ...suggestion, message: e.target.value })}
              required
            />
            <button type="submit" className="w-full btn-gold text-sm py-3 justify-center">
              {sent ? "Terkirim!" : "Kirim Aspirasi"}
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center text-xs text-slate-400 space-y-2 relative z-10">
        <p>© 2026 PC IKA PMII Kabupaten Bandung Barat. All rights reserved.</p>
        <p>Crafted by manifestation of creative enterprise corp. @manifestcreatifenterprise.corp</p>
      </div>
    </footer>
  );
}
