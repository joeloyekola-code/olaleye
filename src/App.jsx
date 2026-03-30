import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import VolunteerPage from "./pages/Volunteer";
import PartnerPage from "./pages/Partner";

// ─── Scroll helper ─────────────────────────────────────────────────────────────
const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// ─── Fade-in wrapper ───────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 32 : direction === "down" ? -32 : 0,
      x: direction === "left" ? 32 : direction === "right" ? -32 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Image Placeholder (dark, for hero) ───────────────────────────────────────
function ImgPlaceholder({ label, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-2xl text-white/40 select-none bg-white/5 ${className}`}>
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40" className="mb-3 opacity-50">
        <rect width="40" height="40" rx="8" fill="white" fillOpacity=".1" />
        <path d="M8 28l8-8 5 5 6-7 9 10H8z" fill="white" fillOpacity=".3" />
        <circle cx="14" cy="15" r="3" fill="white" fillOpacity=".3" />
      </svg>
      <span className="text-xs font-semibold tracking-widest uppercase">{label}</span>
    </div>
  );
}

// ─── Image Placeholder (light, for other sections) ────────────────────────────
function ImgPlaceholderLight({ label, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-[#e8f0e9] border-2 border-dashed border-[#2d6a4f]/30 rounded-2xl text-[#2d6a4f]/60 select-none ${className}`}>
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40" className="mb-3 opacity-50">
        <rect width="40" height="40" rx="8" fill="#2d6a4f" fillOpacity=".12" />
        <path d="M8 28l8-8 5 5 6-7 9 10H8z" fill="#2d6a4f" fillOpacity=".35" />
        <circle cx="14" cy="15" r="3" fill="#2d6a4f" fillOpacity=".35" />
      </svg>
      <span className="text-xs font-semibold tracking-widest uppercase">{label}</span>
    </div>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
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

  // Works on any page: if section exists scroll to it, else navigate home then scroll
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
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-8 h-8 rounded-full bg-[#1a4731] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">RP</span>
          </div>
          <span className="font-bold text-[#1a4731] text-sm leading-tight hidden sm:block">
            Rev. Peter Olaleye
            <span className="block font-normal text-xs text-stone-500">Charity Foundation</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {links.slice(0, 5).map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className="text-sm text-stone-600 hover:text-[#1a4731] transition-colors font-medium"
            >
              {l.label}
            </button>
          ))}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNav("donate")}
            className="px-5 py-2 bg-[#1a4731] text-white text-sm rounded-full font-bold hover:bg-[#2d6a4f] transition-colors"
          >
            Donate Now
          </motion.button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 flex flex-col justify-center gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-[#1a4731] transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#1a4731] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-[#1a4731] transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t border-stone-100 px-5 pb-5"
          >
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                className="flex w-full text-left py-3.5 text-stone-700 font-medium border-b border-stone-100 last:border-0 hover:text-[#1a4731] transition-colors text-sm items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a4731]/30 flex-shrink-0" />
                {l.label}
              </button>
            ))}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNav("donate")}
              className="mt-4 w-full py-3.5 bg-[#1a4731] text-white font-bold rounded-xl text-sm"
            >
              Donate Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "linear-gradient(135deg, #0f2d1f 0%, #1a4731 55%, #2d6a4f 100%)" }}
    >
      {/* Radial glow overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 80% 50%, rgba(45,106,79,0.45) 0%, transparent 65%),
                       radial-gradient(ellipse at 10% 80%, rgba(200,169,110,0.08) 0%, transparent 50%)`,
        }}
      />
      {/* Decorative rings */}
      <div className="absolute top-[-120px] right-[-80px] w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-60px] w-[300px] h-[300px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute bottom-[60px] right-[300px] w-[180px] h-[180px] rounded-full border border-[#86c99e]/10 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 py-20 w-full grid lg:grid-cols-2 gap-14 items-center">

        {/* ── Left: Text ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm text-white/85 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#86c99e] inline-block" />
            Ogbomoso, Oyo State · Nigeria
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-white leading-[1.08] mb-6"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", textShadow: "0 2px 20px rgba(0,0,0,0.2)" }}
          >
            Serving Our<br />Community,{" "}
            <span className="text-[#86c99e]">One Life at a Time</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 text-base leading-relaxed mb-10 max-w-lg"
          >
            The Reverend Peter Olaleye Charity Foundation exists to uplift the vulnerable,
            empower the overlooked, and advocate for a just society — right here in Ogbomoso.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 8px 28px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("donate")}
              className="px-7 py-3.5 bg-white text-[#1a4731] font-bold rounded-full text-sm shadow-lg"
            >
              Donate Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.22)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("involved")}
              className="px-7 py-3.5 border-2 border-white/35 bg-white/12 backdrop-blur-sm text-white font-bold rounded-full text-sm transition-all"
            >
              Get Involved
            </motion.button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-4 flex-wrap"
          >
            {["Faith-Centered", "Community-Driven", "Locally Rooted"].map((item, i) => (
              <div key={item} className="flex items-center gap-4">
                <span className="text-white/55 text-xs font-semibold flex items-center gap-1.5">
                  <span className="text-[#86c99e] text-xs">✦</span>
                  {item}
                </span>
                {i < 2 && <span className="w-px h-4 bg-white/15" />}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Image placeholder (swap with <img> when ready) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative"
        >
          <ImgPlaceholder label="Community Image" className="w-full h-72 lg:h-[440px]" />

          {/* Floating stat — top right */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="absolute top-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-3.5 flex items-center gap-3 border border-white/60"
          >
            <div className="w-9 h-9 rounded-xl bg-[#e8f5e9] flex items-center justify-center text-base flex-shrink-0">🎓</div>
            <div>
              <p className="text-xs text-stone-400 font-medium">Scholarships awarded</p>
              <p className="text-[#1a4731] font-bold text-sm">10+ Students</p>
            </div>
          </motion.div>

          {/* Floating stat — bottom left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-3.5 flex items-center gap-3 border border-white/60"
          >
            <div className="w-9 h-9 rounded-xl bg-[#fff3cd] flex items-center justify-center text-base flex-shrink-0">❤️</div>
            <div>
              <p className="text-xs text-stone-400 font-medium">Lives touched</p>
              <p className="text-[#1a4731] font-bold text-sm">50+ in Ogbomoso</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-2 gap-16 items-center">
        <FadeIn direction="right">
          <div className="relative">
            <ImgPlaceholderLight label="Founder Image" className="w-full h-96" />
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-[#1a4731]/8 border border-[#1a4731]/15" />
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={0.15}>
          <div>
            <p className="text-[#2d6a4f] text-xs font-bold tracking-widest uppercase mb-3">Our Story</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2d1f] leading-tight mb-6" style={{ fontFamily: "'Georgia', serif" }}>
              Rooted in Faith,<br />Driven by Compassion
            </h2>
            <p className="text-stone-600 leading-relaxed mb-5 text-sm">
              The Reverend Peter Olaleye Charity Foundation was born from a simple conviction:
              that every person in our community deserves dignity, opportunity, and care —
              regardless of their circumstances.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8 text-sm">
              Founded by <strong className="text-[#1a4731]">Reverend Peter Olaleye</strong> — Head Pastor of
              New Estate Baptist Church, Ogbomoso, and President of the Ogbomoso Community Youth Forum (OCYF) —
              this foundation is a natural extension of his decades of service to the people of Oyo State.
              Rev. Olaleye believes that genuine change begins at the grassroots level, one family, one student,
              one community at a time.
            </p>
            <div className="flex flex-wrap gap-6">
              {["Faith-Centered", "Community-Driven", "Locally Rooted"].map((label) => (
                <div key={label} className="flex items-center gap-2 text-sm font-semibold text-[#1a4731]">
                  <span className="text-[#2d6a4f] text-xs">✦</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Focus Areas ───────────────────────────────────────────────────────────────
const focusAreas = [
  {
    title: "Scholarships",
    desc: "Supporting bright, hardworking students who lack the financial means to pursue their education.",
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
        <path d="M12 3L2 8l10 5 10-5-10-5zM2 13l10 5 10-5M2 18l10 5 10-5" stroke="#1a4731" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Free Healthcare",
    desc: "Providing medical outreaches and health support to families who cannot afford basic care.",
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
        <path d="M12 21s-8-5.5-8-11a8 8 0 0116 0c0 5.5-8 11-8 11z" stroke="#1a4731" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 10v4M10 12h4" stroke="#1a4731" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Empowerment",
    desc: "Equipping youth and market women with skills, resources, and opportunities to build sustainable livelihoods.",
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" stroke="#1a4731" strokeWidth="1.6" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#1a4731" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M17 11l2 2 4-4" stroke="#1a4731" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Rights & Governance",
    desc: "Advocating for the rights of ordinary citizens and promoting accountability in local governance.",
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
        <path d="M12 3l9 4.5v5c0 5-3.5 9.5-9 11C6.5 21.5 3 17 3 12V7.5L12 3z" stroke="#1a4731" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#1a4731" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function FocusAreas() {
  return (
    <section id="focus" className="py-24 bg-[#f4f8f5]">
      <div className="max-w-6xl mx-auto px-5">
        <FadeIn className="text-center mb-14">
          <p className="text-[#2d6a4f] text-xs font-bold tracking-widest uppercase mb-3">What We Do</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2d1f]" style={{ fontFamily: "'Georgia', serif" }}>
            Four Areas of Focus
          </h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map(({ title, desc, icon }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 16px 40px #1a473114" }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-7 border border-stone-100 h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e8f5e9] flex items-center justify-center mb-5">{icon}</div>
                <h3 className="font-bold text-[#0f2d1f] text-base mb-3">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Impact ────────────────────────────────────────────────────────────────────
const stats = [
  { value: "10+", label: "Scholarships Awarded" },
  { value: "5+", label: "Healthcare Outreaches" },
  { value: "50+", label: "Lives Touched" },
  { value: "2+", label: "Community Partnerships" },
];

function Impact() {
  return (
    <section id="impact" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f2d1f 0%, #1a4731 60%, #2d6a4f 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />
      <div className="relative max-w-6xl mx-auto px-5">
        <FadeIn className="text-center mb-14">
          <p className="text-[#86c99e] text-xs font-bold tracking-widest uppercase mb-3">Our Impact</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white" style={{ fontFamily: "'Georgia', serif" }}>
            Small Steps, Real Change
          </h2>
          <p className="text-white/55 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            We believe in honesty. These numbers are modest — but behind each one is a real person whose life was touched.
          </p>
        </FadeIn>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map(({ value, label }, i) => (
            <FadeIn key={label} delay={i * 0.1}>
              <div className="text-center bg-white/8 border border-white/12 rounded-2xl p-8">
                <p className="text-5xl font-extrabold text-white mb-2" style={{ fontFamily: "'Georgia', serif" }}>{value}</p>
                <p className="text-white/55 text-sm font-medium leading-tight">{label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stories ───────────────────────────────────────────────────────────────────
const stories = [
  {
    tag: "Healthcare",
    title: "A Mother of Four — Against All Odds",
    body: `When a financially struggling mother discovered she was expecting quadruplets, fear and uncertainty consumed her family. Without resources to monitor such a high-risk pregnancy, the odds were daunting. The foundation stepped in, partnering with Genesis Medical Diagnostic Center to provide free monitoring and care throughout her pregnancy. When the day came, she delivered all four babies safely. Today, that family of six is a testament to what community care looks like.`,
    img: "Healthcare Image",
    imgPath: null,
    bg: "#e8f5e9",
    accent: "#1a4731",
  },
  {
    tag: "Scholarship",
    title: "A Champion Who Needed a Champion",
    body: `Master Oladunni Success Eniayo earned something extraordinary — first place in a national mathematics competition. His brilliance was undeniable. But academic prizes rarely pay school fees. Partnering with the Ogbomoso Community Youth Forum (OCYF), the foundation awarded him a scholarship, ensuring that his talent would not be wasted by circumstance. Success is now living up to his name.`,
    img: "Scholarship Image",
    imgPath: null,
    bg: "#f0f4ff",
    accent: "#1a3a6b",
  },
];

function Stories() {
  return (
    <section id="stories" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <FadeIn className="text-center mb-14">
          <p className="text-[#2d6a4f] text-xs font-bold tracking-widest uppercase mb-3">Stories of Impact</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2d1f]" style={{ fontFamily: "'Georgia', serif" }}>
            Real People. Real Change.
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-8">
          {stories.map(({ tag, title, body, img, imgPath, bg, accent }, i) => (
            <FadeIn key={title} delay={i * 0.15}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl overflow-hidden border border-stone-100 shadow-sm h-full flex flex-col"
              >
                {imgPath ? (
                  <img src={imgPath} alt={title} className="w-full h-56 rounded-none rounded-t-3xl object-cover" />
                ) : (
                  <ImgPlaceholderLight label={img} className="w-full h-56 rounded-none rounded-t-3xl border-0" />
                )}
                <div className="p-8 flex-1" style={{ backgroundColor: bg }}>
                  <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                    style={{ backgroundColor: `${accent}18`, color: accent }}>
                    {tag}
                  </span>
                  <h3 className="text-xl font-extrabold mb-4 leading-snug" style={{ color: accent, fontFamily: "'Georgia', serif" }}>
                    {title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{body}</p>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Donation ──────────────────────────────────────────────────────────────────
const PRESET_AMOUNTS = [
  { label: "₦5,000", value: "5000" },
  { label: "₦10,000", value: "10000" },
  { label: "₦20,000", value: "20000" },
  { label: "₦50,000", value: "50000" },
];

function Donation() {
  const [selected, setSelected] = useState("10000");
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDonate = () => {
    if (!name.trim() || !email.trim()) {
      alert("Please enter your name and email to continue.");
      return;
    }
    const amount = custom
      ? `₦${Number(custom).toLocaleString()}`
      : PRESET_AMOUNTS.find((a) => a.value === selected)?.label || "₦10,000";
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Thank you, ${name}! You will now be redirected to complete your donation of ${amount} securely.`);
    }, 700);
  };

  return (
    <section id="donate" className="py-24 bg-[#f4f8f5]">
      <div className="max-w-2xl mx-auto px-5">
        <FadeIn className="text-center mb-10">
          <p className="text-[#2d6a4f] text-xs font-bold tracking-widest uppercase mb-3">Support the Mission</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2d1f] mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            Make a Donation
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Every naira given goes directly to supporting scholarships, healthcare, and community empowerment.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Choose an amount</p>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {PRESET_AMOUNTS.map((amt) => (
                <motion.button
                  key={amt.value}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { setSelected(amt.value); setCustom(""); }}
                  className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                    selected === amt.value && !custom
                      ? "bg-[#1a4731] border-[#1a4731] text-white"
                      : "border-stone-200 text-stone-600 hover:border-[#1a4731]/40"
                  }`}
                >
                  {amt.label}
                </motion.button>
              ))}
            </div>

            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-sm">₦</span>
              <input
                type="number"
                placeholder="Enter custom amount"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setSelected(""); }}
                className="w-full border-2 border-stone-200 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-[#1a4731] transition-colors"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a4731] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5 block">Email Address</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1a4731] transition-colors"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 8px 24px #1a473135" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDonate}
              disabled={loading}
              className="w-full py-4 bg-[#1a4731] text-white font-bold rounded-xl text-sm hover:bg-[#2d6a4f] transition-colors shadow-lg shadow-[#1a4731]/15 disabled:opacity-70"
            >
              {loading ? "Processing..." : "Donate Now →"}
            </motion.button>

            <p className="text-center text-xs text-stone-400 mt-4">
              🔒 You will be redirected to complete your donation securely.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Get Involved ──────────────────────────────────────────────────────────────
const involvementOptions = [
  {
    title: "Volunteer",
    desc: "Join our team on the ground. From outreaches to events, your time and skills make a real difference.",
    icon: "🤝",
    cta: "Volunteer With Us",
    type: "route",
    to: "/volunteer",
  },
  {
    title: "Partner With Us",
    desc: "Are you an organisation, business, or institution that shares our values? Let's work together.",
    icon: "🏛️",
    cta: "Become a Partner",
    type: "route",
    to: "/partner",
  },
  {
    title: "Spread the Word",
    desc: "Follow us, share our work, and help us reach more people who need our support or want to give.",
    icon: "📢",
    cta: "Share Our Mission",
    type: "whatsapp",
  },
];

function Involved() {
  const handleShare = () => {
    const text = encodeURIComponent(
      "Check out the Rev. Peter Olaleye Charity Foundation — serving Ogbomoso through scholarships, healthcare, and empowerment. " +
      window.location.origin
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <section id="involved" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <FadeIn className="text-center mb-14">
          <p className="text-[#2d6a4f] text-xs font-bold tracking-widest uppercase mb-3">Get Involved</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2d1f]" style={{ fontFamily: "'Georgia', serif" }}>
            There's a Place for You Here
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {involvementOptions.map((option, i) => (
            <FadeIn key={option.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="border-2 border-stone-100 rounded-2xl p-8 text-center hover:border-[#1a4731]/25 transition-colors h-full flex flex-col"
              >
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="font-extrabold text-[#0f2d1f] text-xl mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                  {option.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-1">{option.desc}</p>

                {option.type === "route" ? (
                  <Link to={option.to}>
                    <motion.span
                      whileHover={{ backgroundColor: "#1a4731", color: "#fff", scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-block w-full px-6 py-3 border-2 border-[#1a4731] text-[#1a4731] font-bold rounded-full text-sm transition-all"
                    >
                      {option.cta}
                    </motion.span>
                  </Link>
                ) : (
                  <motion.button
                    whileHover={{ backgroundColor: "#1a4731", color: "#fff", scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleShare}
                    className="px-6 py-3 border-2 border-[#1a4731] text-[#1a4731] font-bold rounded-full text-sm transition-all"
                  >
                    {option.cta}
                  </motion.button>
                )}
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
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

        {/* Brand */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-3 mb-4"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[#86c99e] text-xs"
              style={{ background: "rgba(134,201,158,0.15)", border: "1.5px solid rgba(134,201,158,0.3)" }}>
              RP
            </div>
            <div>
              <p className="font-bold text-sm text-white leading-tight">Rev. Peter Olaleye<br />Charity Foundation</p>
              <p className="text-xs text-white/40 mt-0.5">Ogbomoso, Oyo State · Nigeria</p>
            </div>
          </Link>
          <p className="text-sm text-white/45 leading-relaxed">
            Serving the community of Ogbomoso with faith, compassion, and action.
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Contact</p>
          <ul className="space-y-2.5 text-sm text-white/55">
            <li>📍 New Estate Baptist Church, Ogbomoso</li>
            <li>📍 Oyo State, Nigeria</li>
            <li>
              <a href="mailto:contact@rpocharityfoundation.org"
                className="hover:text-[#86c99e] transition-colors">
                ✉️ contact@rpocharityfoundation.org
              </a>
            </li>
            <li>📞 +234 — (to be added)</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Follow Us</p>
          <div className="grid grid-cols-2 gap-2">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ backgroundColor: "rgba(134,201,158,0.15)" }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-white/60 transition-colors"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <span className="w-4 text-center text-sm">{s.icon}</span>
                {s.label}
              </motion.a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Reverend Peter Olaleye Charity Foundation. All rights reserved.
          </p>
          <p className="text-xs text-white/25">Made with care for Ogbomoso, Nigeria 🇳🇬</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────────
function Home() {
  return (
    <div className="antialiased text-stone-800">
      <Nav />
      <Hero />
      <About />
      <FocusAreas />
      <Impact />
      <Stories />
      <Donation />
      <Involved />
      <Footer />
    </div>
  );
}

// ─── App with Routing ──────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/partner" element={<PartnerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
