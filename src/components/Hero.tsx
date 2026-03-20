import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, Download } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   TYPEWRITER HOOK
   ═══════════════════════════════════════════════════════ */
const SPECIALTIES = ['Développeur React', 'Intégrateur IA', 'Builder Full-Stack'];

function useTypewriter(words: string[], typingSpeed = 90, deletingSpeed = 50, pauseMs = 1800) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return text;
}

/* ═══════════════════════════════════════════════════════
   ORBITING BADGE
   ═══════════════════════════════════════════════════════ */
function OrbitingBadge({ children, className, angle, delay = 0, duration = 30, style }: { children: React.ReactNode; className?: string; angle: number; delay?: number; duration?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 + delay, duration: 1 }}
      className={`absolute top-1/2 left-1/2 px-3 py-1.5 rounded-full text-[12px] font-mono flex items-center gap-1.5 backdrop-blur-sm z-20 orbit-badge ${className}`}
      style={{
        ...style,
        animation: `orbit-${angle} ${duration}s linear infinite`,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════════════════ */
const Hero = () => {
  const typewriterText = useTypewriter(SPECIALTIES);

  /* ── Stagger helpers ── */
  const fadeLeft = (delay: number) => ({
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { delay, duration: 0.6, ease: 'easeOut' as const },
  });

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* CSS keyframes */}
      <style>{`
        @keyframes orbit-0 { 
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg); } 
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg); } 
        }
        @keyframes orbit-120 { 
          0% { transform: translate(-50%, -50%) rotate(120deg) translateX(var(--orbit-radius)) rotate(-120deg); } 
          100% { transform: translate(-50%, -50%) rotate(480deg) translateX(var(--orbit-radius)) rotate(-480deg); } 
        }
        @keyframes orbit-240 { 
          0% { transform: translate(-50%, -50%) rotate(240deg) translateX(var(--orbit-radius)) rotate(-240deg); } 
          100% { transform: translate(-50%, -50%) rotate(600deg) translateX(var(--orbit-radius)) rotate(-600deg); } 
        }
        @keyframes spin-slow { 
          from { transform: translate(-50%, -50%) rotate(0deg); } 
          to { transform: translate(-50%, -50%) rotate(360deg); } 
        }
        .orbit-badge {
          --orbit-radius: 260px;
        }
        @media (max-width: 1024px) {
          .orbit-badge { --orbit-radius: 200px; }
        }
      `}</style>

      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-[20%] top-[30%] h-[310px] w-[310px] rounded-full bg-electric-blue opacity-15 blur-[120px]" />
        <div className="absolute right-[15%] bottom-[20%] h-[310px] w-[310px] rounded-full bg-neon-orange opacity-10 blur-[120px]" />
      </div>

      {/* ═══ TWO-COLUMN GRID ═══ */}
      <div className="w-full max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[55fr_45fr] items-center gap-12 lg:gap-6 min-h-screen px-6 md:px-10 lg:px-16 xl:px-20">

        {/* ──────── LEFT COLUMN ──────── */}
        <div className="flex flex-col items-start pt-28 lg:pt-0">

          {/* Badge Disponibilité */}
          <motion.div {...fadeLeft(0)} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22C55E' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#22C55E' }} />
              </span>
              <span className="text-[12px] font-mono" style={{ color: '#22C55E' }}>Disponible pour un projet</span>
            </div>
          </motion.div>

          {/* Student Status */}
          <motion.p {...fadeLeft(0.08)} className="text-cream/50 text-[13px] font-mono mb-2 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
            Étudiant en Licence 3 • Systèmes réseaux informatiques et télécommunications
          </motion.p>

          {/* Name */}
          <motion.h1
            {...fadeLeft(0.15)}
            className="font-black leading-none mb-3"
            style={{
              fontSize: 'clamp(42px, 5vw, 64px)',
              letterSpacing: '-2px',
              background: 'linear-gradient(135deg, #ffffff 0%, #00D4FF 45%, #FF6B35 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Assohoun Yannick
          </motion.h1>

          {/* Title + Typewriter */}
          <motion.div {...fadeLeft(0.3)} className="mb-5">
            <h2 className="font-bold text-cream/90 font-display mb-2" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              SOFTWARE ENGINEER
            </h2>
            <div className="flex items-center gap-1 h-8">
              <span className="text-electric-blue font-mono text-lg">{typewriterText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' as any }}
                className="text-electric-blue text-lg"
              >
                |
              </motion.span>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            {...fadeLeft(0.45)}
            className="font-light leading-relaxed mb-8"
            style={{ color: '#9CA3AF', fontSize: '16px', maxWidth: '480px' }}
          >
            Je transforme des idées en produits web — du design au déploiement.
          </motion.p>

          {/* Stats */}
          <motion.div {...fadeLeft(0.6)} className="flex items-center gap-8 mb-10">
            <div className="flex flex-col">
              <span className="font-bold text-electric-blue font-display" style={{ fontSize: '36px' }}>15+</span>
              <span className="text-[11px] text-cream/40 uppercase tracking-[0.15em] font-mono">Technologies</span>
            </div>
            <div className="w-px h-12" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="flex flex-col">
              <span className="font-bold text-electric-blue font-display" style={{ fontSize: '36px' }}>100%</span>
              <span className="text-[11px] text-cream/40 uppercase tracking-[0.15em] font-mono">Projets aboutis</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div {...fadeLeft(0.75)} className="flex flex-wrap gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,212,255,0.4)' }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #FF6B35)', fontSize: '15px' }}
            >
              <Calendar size={18} />
              Discutons de votre projet
            </motion.a>

            <motion.a
              href="/cv-yannick.pdf"
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300"
              style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', fontSize: '15px' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <Download size={18} />
              Télécharger CV
            </motion.a>
          </motion.div>
        </div>

        {/* ──────── RIGHT COLUMN ──────── */}
        <div className="flex items-center justify-center relative lg:pl-16 mt-16 lg:mt-0">
          <div className="relative w-[340px] h-[340px] md:w-[380px] md:h-[380px]">
            {/* Radial glow behind photo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(0,212,255,0.06) 0%, transparent 65%)' }} />

            {/* Dashed rotating ring (outer) */}
            <div className="absolute top-1/2 left-1/2 w-[420px] h-[420px] md:w-[480px] md:h-[480px] rounded-full pointer-events-none" style={{ border: '1px dashed rgba(0,212,255,0.15)', transform: 'translate(-50%, -50%)', animation: 'spin-slow 20s linear infinite' }} />

            {/* Photo container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-full h-full"
            >
              {/* Solid ring (inner) — hover scale + glow */}
              <div
                className="w-full h-full rounded-full p-[6px] relative cursor-pointer"
                style={{
                  border: '2px solid rgba(0,212,255,0.4)',
                  boxShadow: '0 0 60px rgba(0,212,255,0.25), 0 0 120px rgba(0,212,255,0.08)',
                  transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.5s ease, box-shadow 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.06)';
                  e.currentTarget.style.borderColor = 'rgba(255,107,53,0.6)';
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(0,212,255,0.3), 0 0 100px rgba(255,107,53,0.2), 0 0 150px rgba(0,212,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
                  e.currentTarget.style.boxShadow = '0 0 60px rgba(0,212,255,0.25), 0 0 120px rgba(0,212,255,0.08)';
                }}
              >
                <div className="w-full h-full rounded-full bg-dark-bg overflow-hidden">
                  <img
                    src="/image.jpeg"
                    alt="Assohoun Yannick"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
            </motion.div>

            {/* Orbiting badges around photo */}
            <OrbitingBadge
              angle={0}
              className="text-white"
              style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)' }}
            >
              ⚡ React Expert
            </OrbitingBadge>

            <OrbitingBadge
              angle={120}
              delay={0.2}
              className="text-white"
              style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)' }}
            >
              🤖 IA / ML
            </OrbitingBadge>

            <OrbitingBadge
              angle={240}
              delay={0.4}
              className="text-white"
              style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)' }}
            >
              {'{ }'} Full-Stack
            </OrbitingBadge>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-electric-blue cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
