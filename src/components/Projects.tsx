import { useRef, useState, useEffect, useCallback, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { Github, Brain, Zap, Gamepad2, ArrowUpRight, Users, Car } from 'lucide-react';
import VideoModal from './VideoModal';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import InteractiveBackground from './InteractiveBackground';

/* ═══════════════════════════════════════════════════════
   PROJECT DATA
   ═══════════════════════════════════════════════════════ */
const projects = [
  {
    id: 1,
    headline: 'LUMORA',
    subtitle: 'Optimisation Énergétique IA',
    category: 'IoT & IA',
    problem: "Gaspillage énergétique domestique invisible pour l'utilisateur.",
    solution: 'Analyse prédictive des habitudes de consommation via TensorFlow.',
    result: "Économie moyenne de 15% sur la facture d'électricité.",
    image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['WebSocket', 'TensorFlow', 'React.js', 'TypeScript', 'Firebase', 'Python'],
    icon: Zap,
    themeColor: '#00D4FF',
    geometry: 'icosahedron' as const,
    liveUrl: '#',
    githubUrl: 'https://github.com/YannDOm07/EnergieApp',
    readTime: '7 min read',
  },
  {
    id: 2,
    headline: 'RESUMIND',
    subtitle: 'AI Resume Analyzer',
    category: 'IA & Recrutement',
    problem: 'Manque de feedback objectif sur les CV et suivi chaotique des candidatures.',
    solution: "Analyse intelligente par IA pour scorer les CV et tracker d'offres intégré.",
    result: 'Optimisation de 100% des CV pour les ATS et suivi centralisé.',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React.js', 'Gemini API', 'Tailwind', 'Puter.js'],
    icon: Brain,
    themeColor: '#8B5CF6',
    geometry: 'torusKnot' as const,
    liveUrl: 'https://ai-resume-analyzer-blue-two.vercel.app/',
    githubUrl: 'https://github.com/YannDOm07/ai-resume-analyzer',
    readTime: 'Live Demo',
  },
  {
    id: 3,
    headline: 'NEURAL RPS',
    subtitle: 'Jeu Cognitif',
    category: 'Expérience Web',
    problem: "Les jeux contre l'ordinateur sont souvent prévisibles.",
    solution: 'IA qui apprend les patterns du joueur en temps réel (Markov Chain).',
    result: "Taux de victoire de l'IA > 60% après 20 coups.",
    image: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Python', 'Machine Learning', 'HTML5', 'CSS3'],
    icon: Gamepad2,
    themeColor: '#F97316',
    geometry: 'dodecahedron' as const,
    liveUrl: 'https://freecodecam-boilerplate-x4qwgyevv8l.ws-eu120.gitpod.io/',
    githubUrl: '',
    readTime: '4 min read',
  },
  {
    id: 4,
    headline: 'DEMO*TOK',
    subtitle: 'Démocratie Connectée',
    category: 'Civic Tech',
    problem: "Difficulté pour la jeunesse de s'insérer dans la vie démocratique.",
    solution: 'Plateforme interactive pour connecter les jeunes aux processus décisionnels.',
    result: 'Engagement citoyen accru via des outils numériques accessibles.',
    image: 'https://images.pexels.com/photos/4669141/pexels-photo-4669141.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'Node.js', 'Socket.io', 'MongoDB'],
    icon: Users,
    themeColor: '#EF4444',
    geometry: 'octahedron' as const,
    liveUrl: '#',
    readTime: 'Demo Video',
    videoSrc: '/videos/demotok-demo.mp4',
  },
  {
    id: 5,
    headline: 'AUTOWASH',
    subtitle: 'Gestion Premium',
    category: 'SaaS & Gestion',
    problem: 'Suivi client inefficace et processus de paiement lourds dans les stations de lavage.',
    solution: 'Application complète de gestion avec espace client, tableau de bord admin et POS intuitif.',
    result: 'Digitalisation à 100% des workflows et expérience client améliorée.',
    image: 'https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Php', 'Laravel', 'CSS', 'MySQL', 'UI Premium'],
    icon: Car,
    themeColor: '#10B981',
    geometry: 'torus' as const,
    liveUrl: '#',
    githubUrl: 'https://github.com/YannDOm07/autowash-ci',
    readTime: 'Demo Video',
    videoSrc: '/videos/autowash-demo.mp4',
  },
];

type Project = typeof projects[0];

/* ═══════════════════════════════════════════════════════
   THREE.JS — ANIMATED 3D OBJECT
   ═══════════════════════════════════════════════════════ */
function AnimatedGeometry({ color, type }: { color: string; type: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.12;
    }
  });

  return (
    <mesh ref={meshRef}>
      {type === 'icosahedron' && <icosahedronGeometry args={[2.2, 1]} />}
      {type === 'torusKnot' && <torusKnotGeometry args={[1.6, 0.5, 100, 16]} />}
      {type === 'dodecahedron' && <dodecahedronGeometry args={[2.2, 0]} />}
      {type === 'octahedron' && <octahedronGeometry args={[2.2, 0]} />}
      {type === 'torus' && <torusGeometry args={[1.8, 0.6, 16, 50]} />}
      <meshStandardMaterial
        wireframe
        color={color}
        emissive={color}
        emissiveIntensity={0.15}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

/* ── Decorative rings ── */
function DecorativeRings({ color }: { color: string }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} rotation={[Math.PI / 3.5, 0.2, 0]}>
        <torusGeometry args={[3.2, 0.015, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 5, -0.4, Math.PI / 6]}>
        <torusGeometry args={[3.8, 0.01, 16, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
      {/* Dashed-style outer arc */}
      <mesh rotation={[0.8, 0.3, 0]}>
        <torusGeometry args={[4.2, 0.008, 8, 60]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </mesh>
    </>
  );
}

/* ── Floating particles ── */
function Particles({ color, count = 40 }: { color: string; count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);

  useEffect(() => {
    if (geoRef.current) {
      geoRef.current.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    }
  }, [positions]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial size={0.04} color={color} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

/* ── Complete 3D Scene ── */
function Scene3D({ color, geometryType }: { color: string; geometryType: string }) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 8], fov: 42 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[6, 6, 6]} intensity={1.2} color={color} />
      <pointLight position={[-4, -4, -4]} intensity={0.4} color={color} />

      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <AnimatedGeometry color={color} type={geometryType} />
      </Float>

      <DecorativeRings color={color} />
      <Particles color={color} />
    </Canvas>
  );
}

/* ═══════════════════════════════════════════════════════
   MOBILE CHECK
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
   PROJECT CARD — Desktop fullscreen
   ═══════════════════════════════════════════════════════ */
function ProjectCard({ project, onVideoClick }: { project: Project; onVideoClick: (s: string, t: string) => void }) {
  const Icon = project.icon;
  const tc = project.themeColor;

  return (
    <div
      className="w-full h-full flex"
      style={{
        background: `
          radial-gradient(ellipse at 15% 15%, ${tc}0A, transparent 50%),
          linear-gradient(160deg, #0f1225 0%, #080a18 100%)
        `,
      }}
    >
      {/* ── Left Column (55%) ── */}
      <div className="w-[55%] h-full flex flex-col justify-center pl-12 pr-6 py-6 relative z-10 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {/* Category badge */}
        <div className="mb-4 mt-auto lg:mt-0">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-mono tracking-wider"
            style={{
              backgroundColor: `${tc}15`,
              color: tc,
              border: `1px solid ${tc}25`,
            }}
          >
            <Icon size={12} />
            {project.category}
          </span>
        </div>

        {/* Headline (stackbyte-style uppercase) */}
        <h3
          className="font-display text-white leading-[0.95] mb-2"
          style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.02em', wordBreak: 'break-word' }}
        >
          {project.headline}
        </h3>

        {/* Subtitle */}
        <p className="text-cream/50 text-base font-light mb-4 tracking-wide">{project.subtitle}</p>

        {/* Problem & Solution */}
        <div className="space-y-2 mb-4 max-w-xl">
          <p className="text-cream/70 text-[13px] leading-relaxed">
            <strong className="text-white">Problème:</strong> {project.problem}
          </p>
          <p className="text-cream/70 text-[13px] leading-relaxed">
            <strong className="text-white">Solution:</strong> {project.solution}
          </p>
        </div>

        {/* Quote */}
        <div className="border-l-[3px] pl-4 py-1 mb-5 max-w-lg" style={{ borderColor: tc }}>
          <p className="text-cream/60 italic text-[13px] leading-relaxed">"{project.result}"</p>
        </div>

        {/* Tech list (bullet style like stackbyte) */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mb-6 max-w-md">
          {project.technologies.slice(0, 6).map((tech, i) => (
            <div key={i} className="flex items-center gap-2 text-cream/75 text-[13px]">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tc }} />
              {tech}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-auto lg:mt-0 pb-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/12 text-cream/70 hover:text-white hover:bg-white/5 transition-all text-sm"
            >
              <Github size={16} /> Code
            </a>
          )}
          {project.readTime === 'Demo Video' ? (
            <button
              onClick={() => onVideoClick(project.videoSrc || '', project.headline)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:brightness-110 hover:scale-[1.03]"
              style={{ backgroundColor: tc }}
            >
              Voir la démo <Zap size={16} />
            </button>
          ) : (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:brightness-110 hover:scale-[1.03]"
              style={{ backgroundColor: tc }}
            >
              Voir le projet <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>

      {/* ── Right Column (45%) — Three.js 3D ── */}
      <div className="w-[45%] h-full relative flex items-center justify-center">
        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <Scene3D color={tc} geometryType={project.geometry} />
          </Suspense>
        </div>

        {/* Project image floating below the 3D object */}
        <div
          className="absolute bottom-12 right-10 w-48 h-32 rounded-xl overflow-hidden border shadow-2xl z-10"
          style={{ borderColor: `${tc}30`, boxShadow: `0 10px 40px ${tc}15` }}
        >
          <img src={project.image} alt={project.subtitle} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${tc}20, transparent 60%)` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MOBILE CARD
   ═══════════════════════════════════════════════════════ */
function MobileCard({ project, onVideoClick }: { project: Project; onVideoClick: (s: string, t: string) => void }) {
  const Icon = project.icon;
  const tc = project.themeColor;

  return (
    <div className="rounded-2xl overflow-hidden border" style={{ background: '#0c0c14', borderColor: `${tc}20` }}>
      <div className="relative h-48 overflow-hidden">
        <img src={project.image} alt={project.subtitle} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0c0c14 5%, transparent 60%)' }} />
      </div>
      <div className="p-5 space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono" style={{ backgroundColor: `${tc}18`, color: tc, border: `1px solid ${tc}30` }}>
          <Icon size={12} /> {project.category}
        </span>
        <h3 className="text-xl font-bold text-white font-display">{project.headline}</h3>
        <p className="text-cream/50 text-sm">{project.subtitle}</p>
        <div className="space-y-2">
          <p className="text-cream/70 text-sm"><strong className="text-white">Problème:</strong> {project.problem}</p>
          <p className="text-cream/70 text-sm"><strong className="text-white">Solution:</strong> {project.solution}</p>
        </div>
        <div className="border-l-2 pl-3 py-1" style={{ borderColor: tc }}>
          <p className="text-cream/60 italic text-xs">"{project.result}"</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech, i) => (
            <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-mono border" style={{ borderColor: `${tc}20`, color: `${tc}aa` }}>{tech}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-2">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-cream/70 text-xs hover:bg-white/5 transition-all">
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
   FRAMER MOTION WRAPPERS
   ═══════════════════════════════════════════════════════ */
function GhostText({ text, index, progress, N }: { text: string; index: number; progress: any; N: number }) {
  const localP = useTransform(progress, (v: number) => v * (N - 1) - index);
  const opacity = useTransform(localP, [-0.5, 0, 0.5], [0, 0.08, 0]);
  const scale = useTransform(localP, [-1, 0, 1], [0.8, 1, 1.2]);
  const y = useTransform(localP, [-1, 0, 1], ["50%", "0%", "-50%"]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '42vw',
        fontWeight: 900,
        fontFamily: "'Syne', sans-serif",
        color: 'white',
        letterSpacing: '-0.08em',
        lineHeight: 1,
        opacity, scale, y,
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {text}
    </motion.div>
  );
}

function ProjectCardWrapper({ project, index, progress, N, onVideoClick }: { project: Project; index: number; progress: any; N: number; onVideoClick: (s: string, t: string) => void }) {
  const localP = useTransform(progress, (v: number) => v * (N - 1) - index);

  // When localP goes from 0 (active) to 1 (leaving): translates up and left, shrinks, rotates
  // When localP goes from -1 (incoming) to 0 (active): translates in from bottom-right, grows, levels out
  const x = useTransform(localP, [-1, 0, 1], ["50%", "0%", "-50%"]);
  const y = useTransform(localP, [-1, 0, 1], ["40%", "0%", "-60%"]);
  const rotateY = useTransform(localP, [-1, 0, 1], [30, 0, -30]); // Reversed rotation for 'par devant' effect
  const rotateX = useTransform(localP, [-1, 0, 1], [15, 0, 15]);
  const rotateZ = useTransform(localP, [-1, 0, 1], [-5, 0, 5]);
  const scale = useTransform(localP, [-1, 0, 1], [0.3, 1, 0.3]);
  const opacity = useTransform(localP, [-0.9, 0, 0.9], [0, 1, 0]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        width: '90vw',
        maxWidth: '1150px', // Increased size to prevent title wrapping
        height: '80vh',
        maxHeight: '700px', // Increased height to maintain ratio
        x, y, rotateY, rotateX, rotateZ, scale, opacity,
        transformOrigin: "center center",
        borderRadius: "24px",
        overflow: 'hidden',
        border: `1px solid ${project.themeColor}18`,
        boxShadow: `0 0 80px ${project.themeColor}08, inset 0 1px 0 rgba(255,255,255,0.04)`,
        zIndex: N - index,
        willChange: "transform, opacity",
        backfaceVisibility: 'hidden',
      }}
    >
      <ProjectCard project={project} onVideoClick={onVideoClick} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN — Projects component
   ═══════════════════════════════════════════════════════ */
const Projects = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({ src: '', title: '' });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const N = projects.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 15, mass: 0.5 });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    let idx = Math.round(latest * (N - 1));
    idx = Math.max(0, Math.min(idx, N - 1));
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  const handleVideoClick = useCallback((src: string, title: string) => {
    setSelectedVideo({ src, title });
    setIsVideoModalOpen(true);
  }, []);

  const scrollToProject = (idx: number) => {
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.offsetTop;
    const totalScrollable = window.innerHeight * (N - 1);
    const targetY = sectionTop + (idx / (N - 1)) * totalScrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const current = projects[activeIndex];

  /* ── MOBILE ── */
  if (isMobile) {
    return (
      <section id="projects" className="py-16 relative">
        <div className="px-4">
          <div className="text-center mb-10">
            <span className="text-electric-blue font-mono text-sm tracking-wider uppercase">Portfolio</span>
            <h2 className="text-3xl font-bold text-cream mt-2 mb-4 font-display">Sélection de <span className="text-neon-orange">Travaux</span></h2>
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
    <section id="projects" className="relative bg-[#050508]">
      {/* Intro section explicit header */}
      {/* Intro section explicit header */}
      <div className="w-full flex flex-col items-center justify-center relative shadow-[inset_0_-100px_100px_rgba(5,5,8,1)] z-20 overflow-hidden py-[80px] pb-[60px] min-h-[75vh]">
          <style>{`
            @keyframes glitch-anim {
              0% { text-shadow: 2px 0 #FF6B35, -2px 0 #8B5CF6; transform: translateX(3px); }
              20% { text-shadow: -2px 0 #FF6B35, 2px 0 #8B5CF6; transform: translateX(-3px); }
              40% { text-shadow: 3px 0 #FF6B35, -3px 0 #8B5CF6; transform: translateX(2px); }
              60% { text-shadow: -1px 0 #FF6B35, 1px 0 #8B5CF6; transform: translateX(-2px); }
              80% { text-shadow: 2px 0 #FF6B35, -2px 0 #8B5CF6; transform: translateX(3px); }
              100% { text-shadow: none; transform: translateX(0); }
            }
            .glitch-once {
              animation: glitch-anim 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
              animation-delay: 1.2s; /* Give time for the letters to enter first */
            }
          `}</style>
         {/* Background gradient & Interactive Particles */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(0,212,255,0.08)_0%,transparent_70%)]" />
         <div className="absolute inset-0 pointer-events-none opacity-50"><InteractiveBackground /></div>
         
         {/* Decorative Floating Code Snippets */}
         <div className="absolute top-[20%] left-[10%] font-mono text-[13px] text-electric-blue/12 pointer-events-none select-none">
            const project = await init();
         </div>
         <div className="absolute bottom-[25%] right-[15%] font-mono text-[13px] text-electric-blue/12 pointer-events-none select-none">
            await deploy(); <br/> return success;
         </div>
         <div className="absolute top-[30%] right-[10%] font-mono text-[13px] text-electric-blue/12 pointer-events-none select-none">
            &#123; status: 'live', perf: 99 &#125;
         </div>

         {/* Decorative Dotted Circle */}
         <div className="absolute bottom-[-10%] right-[-5%] opacity-10 pointer-events-none animate-[spin_30s_linear_infinite]">
            <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="150" cy="150" r="148" stroke="#00D4FF" strokeWidth="1" strokeDasharray="4 8" />
            </svg>
         </div>

         <div className="relative z-10 flex flex-col items-center px-4 w-full">
             {/* Badge */}
             <motion.div 
               initial={{ opacity: 0, y: -10 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4 }}
               viewport={{ once: true }}
               className="flex items-center justify-center gap-2 px-5 py-2 rounded-full mb-8" 
               style={{ backgroundColor: 'rgba(0, 212, 255, 0.06)', border: '1px solid rgba(0, 212, 255, 0.25)' }}
             >
                 <span className="relative flex h-2 w-2">
                   <motion.span 
                     animate={{ opacity: [1, 0.3, 1] }}
                     transition={{ duration: 1.2, repeat: Infinity }}
                     className="absolute inline-flex h-full w-full rounded-full bg-electric-blue"
                   />
                 </span>
                 <span className="text-electric-blue font-mono text-[11px] tracking-[4px] uppercase">
                    EXPLOREZ MES RÉALISATIONS
                 </span>
             </motion.div>

             {/* Title */}
             <div className="flex flex-col items-center" style={{ perspective: '800px' }}>
                <h2 className="font-black text-white font-display text-center leading-none flex overflow-hidden" style={{ fontSize: 'clamp(52px, 8vw, 96px)', letterSpacing: '-3px' }}>
                   {"SÉLECTION".split('').map((char, index) => (
                     <motion.span
                       key={index}
                       initial={{ opacity: 0, y: -40, rotateX: -90 }}
                       whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                       transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                       viewport={{ once: true }}
                       className="inline-block origin-bottom"
                     >
                       {char}
                     </motion.span>
                   ))}
                </h2>
                
                <h2 className="font-black text-electric-blue font-display text-center leading-none flex overflow-hidden glitch-once" style={{ fontSize: 'clamp(52px, 8vw, 96px)', letterSpacing: '-3px' }}>
                   {"DE TRAVAUX".split('').map((char, index) => (
                     <motion.span
                       key={index}
                       initial={{ opacity: 0, y: -40, rotateX: -90 }}
                       whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                       transition={{ delay: ("SÉLECTION".length * 0.12) + (index * 0.12), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                       viewport={{ once: true }}
                       className="inline-block origin-bottom"
                     >
                       {char === " " ? "\u00A0" : char}
                     </motion.span>
                   ))}
                </h2>
             </div>

             {/* Growing Horizontal Line */}
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: '60%' }}
               transition={{ delay: 0.7, duration: 0.8, ease: "easeInOut" }}
               viewport={{ once: true }}
               className="h-px w-[60%] my-6 mx-auto"
               style={{ background: 'linear-gradient(90deg, transparent, #00D4FF, #FF6B35, transparent)' }}
             />

             {/* Subtitle */}
             <motion.p 
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.9, duration: 0.6 }}
               viewport={{ once: true }}
               className="max-w-[500px] w-full text-center text-[15px] font-light leading-relaxed" 
               style={{ color: '#6B7280' }}
             >
                Des projets concrets. De vraies solutions. Du code qui performe.
             </motion.p>
         </div>

         {/* Scroll indicator */}
         <motion.div 
           animate={{ y: [0, 6, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           className="absolute bottom-12 flex flex-col items-center gap-3"
         >
            <span className="text-[10px] font-mono uppercase tracking-[4px] text-[#374151]">SCROLL</span>
            <motion.div 
               animate={{ scaleY: [0.3, 1, 0.3] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
               className="w-[2px] h-[40px] bg-electric-blue origin-top"
            />
         </motion.div>
      </div>

      <div ref={sectionRef} style={{ height: `${(N) * 100}vh` }} className="relative z-10">
        <div 
          className="sticky top-0 h-screen w-full overflow-hidden bg-[#050508]"
          style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
        >
          {projects.map((p, i) => (
             <GhostText key={'g'+p.id} text={p.headline.slice(0, 2)} index={i} progress={smoothProgress} N={N} />
          ))}

          {projects.map((p, i) => (
             <ProjectCardWrapper key={p.id} project={p} index={i} progress={smoothProgress} N={N} onVideoClick={handleVideoClick} />
          ))}

          {/* ── Pagination dots ── */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => scrollToProject(i)}
                aria-label={`Projet ${i + 1}`}
                className="transition-all duration-300 ease-out cursor-pointer"
                style={{
                  width: i === activeIndex ? 32 : 8,
                  height: 8,
                  borderRadius: i === activeIndex ? 4 : '50%',
                  backgroundColor: i === activeIndex && current ? current.themeColor : '#333',
                }}
              />
            ))}
          </div>

          {/* Floating keyword in bottom-right */}
          {current && (
            <span
              className="absolute bottom-7 right-8 z-40 font-mono text-xs pointer-events-none select-none transition-colors duration-500"
              style={{ color: current.themeColor, opacity: 0.4 }}
            >
              {current.category.toLowerCase().replace(/ & /g, '.')}
            </span>
          )}

          {/* Counter */}
          {current && (
            <div className="absolute top-8 right-10 z-40 font-mono text-sm text-cream/30">
              <span className="transition-colors duration-500" style={{ color: current.themeColor, opacity: 0.7 }}>
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="mx-1.5 text-cream/20">/</span>
              <span>{String(N).padStart(2, '0')}</span>
            </div>
          )}
        </div>
      </div>

      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoSrc={selectedVideo.src} title={selectedVideo.title} />
    </section>
  );
};

export default Projects;