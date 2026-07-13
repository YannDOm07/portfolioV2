import { useState, useEffect, useCallback } from 'react';
import { Github, Brain, Zap, Gamepad2, ArrowUpRight, Users, Car, ClipboardList, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import VideoModal from './VideoModal';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   PROJECT DATA
   ═══════════════════════════════════════════════════════ */
const projects = [
  {
    id: 1,
    headline: 'Lumora',
    subtitle: 'Optimisation Énergétique IA',
    category: 'IoT & IA',
    problem: "Gaspillage énergétique domestique invisible pour l'utilisateur.",
    solution: 'Analyse prédictive des habitudes de consommation via TensorFlow.',
    result: "Économie moyenne de 15% sur la facture d'électricité.",
    image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['WebSocket', 'TensorFlow', 'React.js', 'TypeScript', 'Firebase', 'Python'],
    icon: Zap,
    themeColor: '#00D4FF',
    liveUrl: '#',
    githubUrl: 'https://github.com/YannDOm07/EnergieApp',
    readTime: '7 min read',
  },
  {
    id: 2,
    headline: 'Resumind',
    subtitle: 'AI Resume Analyzer',
    category: 'IA & Recrutement',
    problem: 'Manque de feedback objectif sur les CV et suivi chaotique des candidatures.',
    solution: "Analyse intelligente par IA pour scorer les CV et tracker d'offres intégré.",
    result: 'Optimisation de 100% des CV pour les ATS et suivi centralisé.',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React.js', 'Gemini API', 'Tailwind', 'Puter.js'],
    icon: Brain,
    themeColor: '#8B5CF6',
    liveUrl: 'https://ai-resume-analyzer-blue-two.vercel.app/',
    githubUrl: 'https://github.com/YannDOm07/ai-resume-analyzer',
    readTime: 'Live Demo',
  },
  {
    id: 3,
    headline: 'Neural RPS',
    subtitle: 'Jeu Cognitif',
    category: 'Expérience Web',
    problem: "Les jeux contre l'ordinateur sont souvent prévisibles.",
    solution: 'IA qui apprend les patterns du joueur en temps réel (Markov Chain).',
    result: "Taux de victoire de l'IA > 60% après 20 coups.",
    image: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Python', 'Machine Learning', 'HTML5', 'CSS3'],
    icon: Gamepad2,
    themeColor: '#F97316',
    liveUrl: 'https://freecodecam-boilerplate-x4qwgyevv8l.ws-eu120.gitpod.io/',
    githubUrl: '',
    readTime: '4 min read',
  },
  {
    id: 4,
    headline: 'Demo*Tok',
    subtitle: 'Démocratie Connectée',
    category: 'Civic Tech',
    problem: "Difficulté pour la jeunesse de s'insérer dans la vie démocratique.",
    solution: 'Plateforme interactive pour connecter les jeunes aux processus décisionnels.',
    result: 'Engagement citoyen accru via des outils numériques accessibles.',
    image: 'https://images.pexels.com/photos/4669141/pexels-photo-4669141.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'Node.js', 'Socket.io', 'MongoDB'],
    icon: Users,
    themeColor: '#EF4444',
    liveUrl: '#',
    readTime: 'Demo Video',
    videoSrc: '/videos/demotok-demo.mp4',
  },
  {
    id: 5,
    headline: 'AutoWash',
    subtitle: 'Gestion Premium',
    category: 'SaaS & Gestion',
    problem: 'Suivi client inefficace et processus de paiement lourds dans les stations de lavage.',
    solution: 'Application complète de gestion avec espace client, tableau de bord admin et POS intuitif.',
    result: 'Digitalisation à 100% des workflows et expérience client améliorée.',
    image: 'https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Php', 'Laravel', 'CSS', 'MySQL', 'UI Premium'],
    icon: Car,
    themeColor: '#10B981',
    liveUrl: '#',
    githubUrl: 'https://github.com/YannDOm07/autowash-ci',
    readTime: 'Demo Video',
    videoSrc: '/videos/autowash-demo.mp4',
  },
  {
    id: 6,
    headline: 'JDO CCEE',
    subtitle: "Portail d'Inscription Communautaire",
    category: 'Web App & Communauté',
    problem: "Difficulté de gestion et inscriptions manuelles fastidieuses pour les activités.",
    solution: "Application web moderne de gestion d'inscriptions avec dashboard centralisé.",
    result: "Processus d'inscription simplifié à 100% et données centralisées en temps réel.",
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'Prisma', 'Tailwind CSS', 'Supabase', 'Node.js', 'Framer Motion'],
    icon: ClipboardList,
    themeColor: '#6366F1',
    liveUrl: 'https://jdo-ccee.netlify.app/',
    githubUrl: 'https://github.com/YannDOm07/Jdo-ccee.git',
    readTime: 'Live Demo',
  },
];

type Project = typeof projects[0];

/* ═══════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════ */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

/* ═══════════════════════════════════════════════════════
   MOBILE CARD
   ═══════════════════════════════════════════════════════ */
function MobileCard({ project, onVideoClick }: { project: Project; onVideoClick: (s: string, t: string) => void }) {
  const Icon = project.icon;
  const tc = project.themeColor;
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ background: '#0c0c14', borderColor: `${tc}15` }}>
      <div className="relative h-48 overflow-hidden">
        <img src={project.image} alt={project.subtitle} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0c0c14 5%, transparent 60%)' }} />
      </div>
      <div className="p-5 space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${tc}12`, color: tc, border: `1px solid ${tc}25` }}>
          <Icon size={12} /> {project.category}
        </span>
        <h3 className="text-xl font-bold text-white">{project.headline}</h3>
        <p className="text-white/40 text-sm">{project.subtitle}</p>
        <div className="space-y-2">
          <p className="text-white/60 text-sm"><strong className="text-white/90">Problème:</strong> {project.problem}</p>
          <p className="text-white/60 text-sm"><strong className="text-white/90">Solution:</strong> {project.solution}</p>
        </div>
        <div className="border-l-2 pl-3 py-1" style={{ borderColor: tc }}>
          <p className="text-white/50 italic text-xs">"{project.result}"</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech, i) => (
            <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] border border-white/10 text-white/50">{tech}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-2">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-white/60 text-xs hover:bg-white/5 transition-all">
              <Github size={14} /> Code
            </a>
          )}
          {project.readTime === 'Demo Video' ? (
            <button onClick={() => onVideoClick(project.videoSrc || '', project.headline)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-semibold" style={{ backgroundColor: tc }}>
              Voir la démo <Zap size={14} />
            </button>
          ) : (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-semibold" style={{ backgroundColor: tc }}>
              Voir le projet <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
const Projects = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({ src: '', title: '' });
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [angleOffset, setAngleOffset] = useState(0);
  const isMobile = useIsMobile();
  const N = projects.length;

  const handleVideoClick = useCallback((src: string, title: string) => {
    setSelectedVideo({ src, title });
    setIsVideoModalOpen(true);
  }, []);

  // Continuous animation loop using requestAnimationFrame (pauses when hovered or video modal is active)
  useEffect(() => {
    if (hoveredIdx !== null || isVideoModalOpen) return;

    let animId: number;
    const update = () => {
      setAngleOffset((prev) => (prev + 0.1) % 360);
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [hoveredIdx, isVideoModalOpen]);

  const active = projects[selectedIdx];
  const ActiveIcon = active.icon;

  /* ── MOBILE ── */
  if (isMobile) {
    return (
      <section id="projects" className="py-16 relative bg-[#050508]">
        <div className="px-4">
          <div className="text-center mb-10">
            <p className="text-sm tracking-widest uppercase text-white/40 mb-3">Portfolio</p>
            <h2 className="text-3xl font-bold text-white">Mes <span className="bg-gradient-to-r from-[#00D4FF] to-[#8B5CF6] bg-clip-text text-transparent">Projets</span></h2>
          </div>
          <div className="flex flex-col gap-8">
            {projects.map((p) => <MobileCard key={p.id} project={p} onVideoClick={handleVideoClick} />)}
          </div>
        </div>
        <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoSrc={selectedVideo.src} title={selectedVideo.title} />
      </section>
    );
  }

  /* ── DESKTOP ── */
  return (
    <section id="projects" className="relative bg-[#050508] overflow-hidden py-28 pb-32">

      {/* Soft ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04] pointer-events-none" style={{ background: 'radial-gradient(circle, #00D4FF, transparent 70%)' }} />

      {/* ── SECTION HEADER ── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 mb-20">
        
        {/* Small top label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-[13px] tracking-[5px] uppercase text-white/30 font-medium mb-5"
        >
          Portfolio
        </motion.p>

        {/* Clean title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
        >
          Une sélection de{' '}
          <span className="bg-gradient-to-r from-[#00D4FF] via-[#8B5CF6] to-[#F97316] bg-clip-text text-transparent">
            mes projets
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="mt-5 text-white/35 text-base md:text-lg font-light max-w-lg mx-auto leading-relaxed"
        >
          Des projets concrets, de vraies solutions, du code qui performe.
        </motion.p>

        {/* Thin gradient divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 mx-auto h-px w-48 origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
        />
      </div>

      {/* ── CONTINUOUS FANNED CAROUSEL ── */}
      <div className="relative w-full h-[400px] flex items-end justify-center mb-16 select-none overflow-hidden z-10">
        {/* Left & Right gradient masks to blend the edges smoothly */}
        <div className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#050508] via-[#050508]/60 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-44 bg-gradient-to-l from-[#050508] via-[#050508]/60 to-transparent z-20 pointer-events-none" />

        {projects.map((project, i) => {
          const Icon = project.icon;
          const tc = project.themeColor;
          
          // Calculate continuous rotation coordinates along a 3D fanned cylinder
          const cardAngle = (i * (360 / N)) + angleOffset;
          const relAngle = ((cardAngle + 180) % 360 + 360) % 360 - 180; // normalized to [-180, 180]
          
          // Geometry projection parameters (tighter spread for clean overlaps)
          const R_x = 240; // tighter horizontal fanning layout
          const R_y = 45;  // vertical bending depth for the deck arc
          
          let x = Math.sin(relAngle * Math.PI / 180) * R_x;
          let y = (1 - Math.cos(relAngle * Math.PI / 180)) * R_y - 25;
          let scale = 1 - (Math.abs(relAngle) / 180) * 0.35;
          let rotate = relAngle * 0.45; // slightly reduced tilt for cleaner fanning
          let zIndex = Math.round(100 - Math.abs(relAngle));
          let opacity = Math.max(0, 1 - (Math.abs(relAngle) - 75) / 25);
          
          const isSelected = selectedIdx === i;
          
          // Hover states
          if (hoveredIdx === i) {
            y -= 25;
            scale += 0.08;
            rotate = rotate * 0.3; // straighten the card slightly
            zIndex = 150;
          }

          return (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setSelectedIdx(i)}
              className="absolute w-[210px] h-[285px] rounded-2xl cursor-pointer overflow-hidden group transition-all duration-300 ease-out"
              style={{
                transform: `translateX(${x}px) translateY(${y}px) rotate(${rotate}deg) scale(${scale})`,
                transformOrigin: 'center bottom',
                zIndex,
                opacity,
                border: isSelected ? `2px solid ${tc}` : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isSelected 
                  ? `0 20px 45px ${tc}20, 0 0 0 1px ${tc}15` 
                  : '0 8px 24px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.headline}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
              </div>

              {/* Category pill */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium backdrop-blur-md border"
                  style={{
                    backgroundColor: `${tc}15`,
                    color: tc,
                    borderColor: `${tc}30`,
                  }}
                >
                  <Icon size={10} />
                  {project.category}
                </span>
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-10 text-left">
                <h4 className="text-white font-bold text-lg leading-tight tracking-tight">
                  {project.headline}
                </h4>
                <p className="text-white/40 text-xs mt-1 font-light">
                  {project.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── DETAILS PANEL ── */}
      <div className="max-w-6xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIdx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="rounded-3xl overflow-hidden relative"
            style={{
              background: 'linear-gradient(160deg, rgba(15, 17, 30, 0.95), rgba(8, 9, 18, 0.98))',
              border: `1px solid ${active.themeColor}15`,
              boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 80px ${active.themeColor}06`,
            }}
          >
            <div className="flex flex-col lg:flex-row">

              {/* Left — Large image showcase */}
              <div className="relative lg:w-[45%] h-[280px] lg:h-auto overflow-hidden">
                <motion.img
                  key={active.image}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  src={active.image}
                  alt={active.headline}
                  className="w-full h-full object-cover absolute inset-0"
                />
                {/* Gradient fade into the right panel */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0b14] hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b14] via-transparent to-transparent lg:hidden" />

                {/* Floating project number */}
                <div className="absolute top-6 left-6 z-10">
                  <span
                    className="text-[80px] md:text-[100px] font-black leading-none select-none"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: `1.5px ${active.themeColor}30`,
                    }}
                  >
                    {String(selectedIdx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Color accent bar at image bottom on mobile */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 lg:hidden"
                  style={{ background: `linear-gradient(90deg, ${active.themeColor}, transparent)` }}
                />
              </div>

              {/* Right — Content */}
              <div className="flex-1 p-8 md:p-10 lg:p-12 space-y-7">

                {/* Category */}
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border"
                  style={{
                    backgroundColor: `${active.themeColor}0a`,
                    color: active.themeColor,
                    borderColor: `${active.themeColor}25`,
                  }}
                >
                  <ActiveIcon size={13} />
                  {active.category}
                </motion.span>

                {/* Title */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight"
                  >
                    {active.headline}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/40 text-base mt-1.5 font-light"
                  >
                    {active.subtitle}
                  </motion.p>
                </div>

                {/* Problem / Solution cards */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="bg-white/[0.025] border border-white/[0.06] rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: active.themeColor }} />
                      <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Problème</span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{active.problem}</p>
                  </div>
                  <div className="bg-white/[0.025] border border-white/[0.06] rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Solution</span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{active.solution}</p>
                  </div>
                </motion.div>

                {/* Result quote */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="relative pl-5"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full" style={{ background: `linear-gradient(to bottom, ${active.themeColor}, transparent)` }} />
                  <p className="text-white/55 text-sm italic leading-relaxed">
                    "{active.result}"
                  </p>
                </motion.div>

                {/* Tech stack */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2"
                >
                  {active.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-[11px] border border-white/[0.07] text-white/50 bg-white/[0.02] hover:border-white/15 hover:text-white/70 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="flex flex-wrap items-center gap-3 pt-2"
                >
                  {active.githubUrl && (
                    <a
                      href={active.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 text-sm font-medium"
                    >
                      <Github size={15} />
                      Voir le code
                    </a>
                  )}
                  {active.readTime === 'Demo Video' ? (
                    <button
                      onClick={() => handleVideoClick(active.videoSrc || '', active.headline)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:brightness-110 hover:shadow-lg"
                      style={{
                        backgroundColor: active.themeColor,
                        boxShadow: `0 8px 24px ${active.themeColor}25`,
                      }}
                    >
                      Voir la démo
                      <ExternalLink size={14} />
                    </button>
                  ) : (
                    <a
                      href={active.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:brightness-110 hover:shadow-lg"
                      style={{
                        backgroundColor: active.themeColor,
                        boxShadow: `0 8px 24px ${active.themeColor}25`,
                      }}
                    >
                      Voir le projet
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </motion.div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoSrc={selectedVideo.src} title={selectedVideo.title} />
    </section>
  );
};

export default Projects;