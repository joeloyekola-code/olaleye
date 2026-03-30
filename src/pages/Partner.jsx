import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Shared Nav ─────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "About", id: "about" },
    { label: "Focus", id: "focus" },
    { label: "Impact", id: "impact" },
    { label: "Stories", id: "stories" },
    { label: "Donate", id: "donate" },
    { label: "Get Involved", id: "involved" },
  ];

  const handleNav = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-8 h-8 rounded-full bg-[#1a4731] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">RP</span>
          </div>
          <span className="font-bold text-[#1a4731] text-sm leading-tight hidden sm:block">
            Rev. Peter Olaleye
            <span className="block font-normal text-xs text-stone-500">Charity Foundation</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-5">
          {links.slice(0, 5).map((l) => (
            <button key={l.id} onClick={() => handleNav(l.id)}
              className="text-sm text-stone-600 hover:text-[#1a4731] transition-colors font-medium">
              {l.label}
            </button>
          ))}
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => handleNav("donate")}
            className="px-5 py-2 bg-[#1a4731] text-white text-sm rounded-full font-bold hover:bg-[#2d6a4f] transition-colors">
            Donate Now
          </motion.button>
        </div>

        <button className="md:hidden p-2 flex flex-col justify-center gap-1.5" onClick={() => setOpen(!open)}>
          <span className={`block w-5 h-0.5 bg-[#1a4731] transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#1a4731] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#1a4731] transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t border-stone-100 px-5 pb-5">
            {links.map((l) => (
              <button key={l.id} onClick={() => handleNav(l.id)}
                className="flex w-full text-left py-3.5 text-stone-700 font-medium border-b border-stone-100 last:border-0 hover:text-[#1a4731] transition-colors text-sm items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a4731]/30 flex-shrink-0" />
                {l.label}
              </button>
            ))}
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => handleNav("donate")}
              className="mt-4 w-full py-3.5 bg-[#1a4731] text-white font-bold rounded-xl text-sm">
              Donate Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ── Slim Footer ────────────────────────────────────────────────────────────────
const socials = [
  { label: "Facebook", icon: "f", url: "https://facebook.com" },
  { label: "Twitter", icon: "𝕏", url: "https://twitter.com" },
  { label: "Instagram", icon: "◎", url: "https://instagram.com" },
  { label: "WhatsApp", icon: "●", url: "https://wa.me/234" },
];

function Footer() {
  return (
    <footer style={{ background: "linear-gradient(160deg, #0a1f15 0%, #0f2d1f 100%)", color: "#fff" }}>
      <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#86c99e] text-xs"
              style={{ background: "rgba(134,201,158,0.15)", border: "1.5px solid rgba(134,201,158,0.3)" }}>RP</div>
            <div>
              <p className="font-bold text-sm text-white leading-tight">Rev. Peter Olaleye<br />Charity Foundation</p>
              <p className="text-xs text-white/40 mt-0.5">Ogbomoso, Oyo State · Nigeria</p>
            </div>
          </Link>
          <p className="text-sm text-white/45 leading-relaxed">
            Serving the community of Ogbomoso with faith, compassion, and action.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Contact</p>
          <ul className="space-y-2.5 text-sm text-white/55">
            <li>📍 New Estate Baptist Church, Ogbomoso</li>
            <li>📍 Oyo State, Nigeria</li>
            <li><a href="mailto:contact@rpocharityfoundation.org" className="hover:text-[#86c99e] transition-colors">✉️ contact@rpocharityfoundation.org</a></li>
            <li>📞 +234 — (to be added)</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Follow Us</p>
          <div className="grid grid-cols-2 gap-2">
            {socials.map((s) => (
              <motion.a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                whileHover={{ backgroundColor: "rgba(134,201,158,0.15)" }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-white/60 transition-colors"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="w-4 text-center text-sm">{s.icon}</span>{s.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/25">© {new Date().getFullYear()} Reverend Peter Olaleye Charity Foundation. All rights reserved.</p>
          <p className="text-xs text-white/25">Made with care for Ogbomoso, Nigeria 🇳🇬</p>
        </div>
      </div>
    </footer>
  );
}

// ── Partner Page ───────────────────────────────────────────────────────────────
export default function PartnerPage() {
  const [form, setForm] = useState({ orgName: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.orgName || !form.email || !form.message) { alert("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 800);
  };

  return (
    <div className="antialiased text-stone-800">
      <Nav />

      {/* Hero */}
      <div className="pt-16" style={{ background: "linear-gradient(135deg, #0f2d1f 0%, #1a4731 55%, #2d6a4f 100%)" }}>
        <div className="max-w-6xl mx-auto px-5 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-white/20 bg-white/10 text-white/85 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#86c99e] inline-block" /> Collaboration
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: "'Georgia', serif" }}>
            Partner With Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
            className="text-white/65 text-base leading-relaxed max-w-xl mx-auto">
            We believe change happens faster together. If your organisation shares our values —
            let's explore a partnership.
          </motion.p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-[#f4f8f5] py-20 px-5">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-5">🤲</div>
              <h2 className="text-2xl font-extrabold text-[#0f2d1f] mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                Partnership Request Received!
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed mb-8">
                Thank you, <strong className="text-[#1a4731]">{form.orgName}</strong>. We'll respond to{" "}
                <strong className="text-[#1a4731]">{form.email}</strong> within 3–5 business days.
              </p>
              <Link to="/">
                <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="inline-block px-8 py-3.5 bg-[#1a4731] text-white font-bold rounded-full text-sm">
                  ← Back to Home
                </motion.span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">
                  Organisation Name <span className="text-red-400">*</span>
                </label>
                <input type="text" name="orgName" value={form.orgName} onChange={handleChange}
                  placeholder="Your organisation or business name"
                  className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a4731] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="contact@yourorg.com"
                  className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a4731] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                  placeholder="Tell us about your organisation and how you'd like to partner with us..."
                  className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a4731] transition-colors resize-none" />
              </div>
              <motion.button type="submit" disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 24px #1a473135" }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-[#1a4731] text-white font-bold rounded-xl text-sm hover:bg-[#2d6a4f] transition-colors disabled:opacity-70">
                {loading ? "Submitting..." : "Send Partnership Request →"}
              </motion.button>
              <p className="text-center text-xs text-stone-400">We'll respond within 3–5 business days.</p>
            </form>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
