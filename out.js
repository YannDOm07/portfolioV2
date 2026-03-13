// src/components/Projects.tsx
import { useRef, useState, useEffect as useEffect2, useCallback, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Github, Brain, Zap, Gamepad2, ArrowUpRight, Users, Car } from "lucide-react";

// src/components/VideoModal.tsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
var VideoModal = ({ isOpen, onClose, videoSrc, title }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  return /* @__PURE__ */ React.createElement(AnimatePresence, null, isOpen && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: onClose,
      className: "fixed inset-0 bg-black/90 backdrop-blur-sm z-50 cursor-pointer"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none" }, /* @__PURE__ */ React.createElement(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.9, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.9, y: 20 },
      transition: { type: "spring", damping: 25, stiffness: 300 },
      className: "relative w-full max-w-5xl pointer-events-auto",
      onClick: (e) => e.stopPropagation()
    },
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onClose,
        className: "absolute -top-12 right-0 text-white hover:text-electric-blue transition-colors p-2 rounded-full hover:bg-white/10",
        "aria-label": "Fermer"
      },
      /* @__PURE__ */ React.createElement(X, { size: 32 })
    ),
    /* @__PURE__ */ React.createElement("h3", { className: "text-white text-2xl font-bold mb-4 text-center" }, title),
    /* @__PURE__ */ React.createElement("div", { className: "relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10" }, /* @__PURE__ */ React.createElement(
      "video",
      {
        controls: true,
        autoPlay: true,
        className: "w-full h-auto max-h-[80vh]",
        poster: "/videos/demotok-demo.mp4"
      },
      /* @__PURE__ */ React.createElement("source", { src: videoSrc, type: "video/mp4" }),
      "Votre navigateur ne supporte pas la lecture de vid\xE9os."
    )),
    /* @__PURE__ */ React.createElement("p", { className: "text-cream/60 text-sm text-center mt-4" }, "Appuyez sur ", /* @__PURE__ */ React.createElement("kbd", { className: "px-2 py-1 bg-white/10 rounded" }, "\xC9chap"), " ou cliquez en dehors pour fermer")
  ))));
};
var VideoModal_default = VideoModal;

// src/components/Projects.tsx
import React2 from "react";
var projects = [
  {
    id: 1,
    headline: "ECOSMART",
    subtitle: "Optimisation \xC9nerg\xE9tique IA",
    category: "IoT & IA",
    problem: "Gaspillage \xE9nerg\xE9tique domestique invisible pour l'utilisateur.",
    solution: "Analyse pr\xE9dictive des habitudes de consommation via TensorFlow.",
    result: "\xC9conomie moyenne de 15% sur la facture d'\xE9lectricit\xE9.",
    image: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["WebSocket", "TensorFlow", "React.js", "TypeScript", "Firebase", "Python"],
    icon: Zap,
    themeColor: "#00D4FF",
    geometry: "icosahedron",
    liveUrl: "#",
    githubUrl: "https://github.com/YannDOm07/EnergieApp",
    readTime: "7 min read"
  },
  {
    id: 2,
    headline: "RESUMIND",
    subtitle: "AI Resume Analyzer",
    category: "IA & Recrutement",
    problem: "Manque de feedback objectif sur les CV et suivi chaotique des candidatures.",
    solution: "Analyse intelligente par IA pour scorer les CV et tracker d'offres int\xE9gr\xE9.",
    result: "Optimisation de 100% des CV pour les ATS et suivi centralis\xE9.",
    image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React.js", "Gemini API", "Tailwind", "Puter.js"],
    icon: Brain,
    themeColor: "#8B5CF6",
    geometry: "torusKnot",
    liveUrl: "https://ai-resume-analyzer-blue-two.vercel.app/",
    githubUrl: "https://github.com/YannDOm07/ai-resume-analyzer",
    readTime: "Live Demo"
  },
  {
    id: 3,
    headline: "NEURAL RPS",
    subtitle: "Jeu Cognitif",
    category: "Exp\xE9rience Web",
    problem: "Les jeux contre l'ordinateur sont souvent pr\xE9visibles.",
    solution: "IA qui apprend les patterns du joueur en temps r\xE9el (Markov Chain).",
    result: "Taux de victoire de l'IA > 60% apr\xE8s 20 coups.",
    image: "https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Python", "Machine Learning", "HTML5", "CSS3"],
    icon: Gamepad2,
    themeColor: "#F97316",
    geometry: "dodecahedron",
    liveUrl: "https://freecodecam-boilerplate-x4qwgyevv8l.ws-eu120.gitpod.io/",
    githubUrl: "",
    readTime: "4 min read"
  },
  {
    id: 4,
    headline: "DEMO*TOK",
    subtitle: "D\xE9mocratie Connect\xE9e",
    category: "Civic Tech",
    problem: "Difficult\xE9 pour la jeunesse de s'ins\xE9rer dans la vie d\xE9mocratique.",
    solution: "Plateforme interactive pour connecter les jeunes aux processus d\xE9cisionnels.",
    result: "Engagement citoyen accru via des outils num\xE9riques accessibles.",
    image: "https://images.pexels.com/photos/4669141/pexels-photo-4669141.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Next.js", "Node.js", "Socket.io", "MongoDB"],
    icon: Users,
    themeColor: "#EF4444",
    geometry: "octahedron",
    liveUrl: "#",
    readTime: "Demo Video",
    videoSrc: "/videos/demotok-demo.mp4"
  },
  {
    id: 5,
    headline: "AUTOWASH",
    subtitle: "Gestion Premium",
    category: "SaaS & Gestion",
    problem: "Suivi client inefficace et processus de paiement lourds dans les stations de lavage.",
    solution: "Application compl\xE8te de gestion avec espace client, tableau de bord admin et POS intuitif.",
    result: "Digitalisation \xE0 100% des workflows et exp\xE9rience client am\xE9lior\xE9e.",
    image: "https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React.js", "Node.js", "Tailwind CSS", "MySQL", "UI Premium"],
    icon: Car,
    themeColor: "#10B981",
    geometry: "torus",
    liveUrl: "#",
    githubUrl: "https://github.com/YannDOm07/autowash-ci",
    readTime: "Demo Video",
    videoSrc: "/videos/autowash-demo.mp4"
  }
];
function AnimatedGeometry({ color, type }) {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.12;
    }
  });
  return /* @__PURE__ */ React2.createElement("mesh", { ref: meshRef }, type === "icosahedron" && /* @__PURE__ */ React2.createElement("icosahedronGeometry", { args: [2.2, 1] }), type === "torusKnot" && /* @__PURE__ */ React2.createElement("torusKnotGeometry", { args: [1.6, 0.5, 100, 16] }), type === "dodecahedron" && /* @__PURE__ */ React2.createElement("dodecahedronGeometry", { args: [2.2, 0] }), type === "octahedron" && /* @__PURE__ */ React2.createElement("octahedronGeometry", { args: [2.2, 0] }), type === "torus" && /* @__PURE__ */ React2.createElement("torusGeometry", { args: [1.8, 0.6, 16, 50] }), /* @__PURE__ */ React2.createElement(
    "meshStandardMaterial",
    {
      wireframe: true,
      color,
      emissive: color,
      emissiveIntensity: 0.15,
      transparent: true,
      opacity: 0.5
    }
  ));
}
function DecorativeRings({ color }) {
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.05;
    }
  });
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("mesh", { ref: ring1Ref, rotation: [Math.PI / 3.5, 0.2, 0] }, /* @__PURE__ */ React2.createElement("torusGeometry", { args: [3.2, 0.015, 16, 100] }), /* @__PURE__ */ React2.createElement("meshBasicMaterial", { color, transparent: true, opacity: 0.18 })), /* @__PURE__ */ React2.createElement("mesh", { ref: ring2Ref, rotation: [Math.PI / 5, -0.4, Math.PI / 6] }, /* @__PURE__ */ React2.createElement("torusGeometry", { args: [3.8, 0.01, 16, 120] }), /* @__PURE__ */ React2.createElement("meshBasicMaterial", { color, transparent: true, opacity: 0.08 })), /* @__PURE__ */ React2.createElement("mesh", { rotation: [0.8, 0.3, 0] }, /* @__PURE__ */ React2.createElement("torusGeometry", { args: [4.2, 8e-3, 8, 60] }), /* @__PURE__ */ React2.createElement("meshBasicMaterial", { color, transparent: true, opacity: 0.05 })));
}
function Particles({ color, count = 40 }) {
  const pointsRef = useRef(null);
  const geoRef = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, [count]);
  useEffect2(() => {
    if (geoRef.current) {
      geoRef.current.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    }
  }, [positions]);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });
  return /* @__PURE__ */ React2.createElement("points", { ref: pointsRef }, /* @__PURE__ */ React2.createElement("bufferGeometry", { ref: geoRef }), /* @__PURE__ */ React2.createElement("pointsMaterial", { size: 0.04, color, transparent: true, opacity: 0.35, sizeAttenuation: true }));
}
function Scene3D({ color, geometryType }) {
  return /* @__PURE__ */ React2.createElement(
    Canvas,
    {
      gl: { antialias: true, alpha: true },
      camera: { position: [0, 0, 8], fov: 42 },
      style: { background: "transparent" },
      dpr: [1, 2]
    },
    /* @__PURE__ */ React2.createElement("ambientLight", { intensity: 0.15 }),
    /* @__PURE__ */ React2.createElement("pointLight", { position: [6, 6, 6], intensity: 1.2, color }),
    /* @__PURE__ */ React2.createElement("pointLight", { position: [-4, -4, -4], intensity: 0.4, color }),
    /* @__PURE__ */ React2.createElement(Float, { speed: 1.4, rotationIntensity: 0.3, floatIntensity: 0.6 }, /* @__PURE__ */ React2.createElement(AnimatedGeometry, { color, type: geometryType })),
    /* @__PURE__ */ React2.createElement(DecorativeRings, { color }),
    /* @__PURE__ */ React2.createElement(Particles, { color })
  );
}
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect2(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}
function ProjectCard({ project, onVideoClick }) {
  const Icon = project.icon;
  const tc = project.themeColor;
  return /* @__PURE__ */ React2.createElement(
    "div",
    {
      className: "w-full h-full flex",
      style: {
        background: `
          radial-gradient(ellipse at 15% 15%, ${tc}0A, transparent 50%),
          linear-gradient(160deg, #0f1225 0%, #080a18 100%)
        `
      }
    },
    /* @__PURE__ */ React2.createElement("div", { className: "w-[55%] h-full flex flex-col justify-center pl-16 pr-10 relative z-10" }, /* @__PURE__ */ React2.createElement("div", { className: "mb-8" }, /* @__PURE__ */ React2.createElement(
      "span",
      {
        className: "inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-mono tracking-wider",
        style: {
          backgroundColor: `${tc}15`,
          color: tc,
          border: `1px solid ${tc}25`
        }
      },
      /* @__PURE__ */ React2.createElement(Icon, { size: 14 }),
      project.category
    )), /* @__PURE__ */ React2.createElement(
      "h3",
      {
        className: "font-display text-white leading-[0.95] mb-3",
        style: { fontSize: "clamp(52px, 7vw, 100px)", fontWeight: 900, letterSpacing: "-0.02em" }
      },
      project.headline
    ), /* @__PURE__ */ React2.createElement("p", { className: "text-cream/50 text-lg font-light mb-8 tracking-wide" }, project.subtitle), /* @__PURE__ */ React2.createElement("div", { className: "space-y-3 mb-6 max-w-xl" }, /* @__PURE__ */ React2.createElement("p", { className: "text-cream/70 text-[15px] leading-relaxed" }, /* @__PURE__ */ React2.createElement("strong", { className: "text-white" }, "Probl\xE8me:"), " ", project.problem), /* @__PURE__ */ React2.createElement("p", { className: "text-cream/70 text-[15px] leading-relaxed" }, /* @__PURE__ */ React2.createElement("strong", { className: "text-white" }, "Solution:"), " ", project.solution)), /* @__PURE__ */ React2.createElement("div", { className: "border-l-[3px] pl-5 py-1 mb-7 max-w-lg", style: { borderColor: tc } }, /* @__PURE__ */ React2.createElement("p", { className: "text-cream/60 italic text-sm leading-relaxed" }, '"', project.result, '"')), /* @__PURE__ */ React2.createElement("div", { className: "grid grid-cols-2 gap-x-8 gap-y-2 mb-10 max-w-md" }, project.technologies.slice(0, 6).map((tech, i) => /* @__PURE__ */ React2.createElement("div", { key: i, className: "flex items-center gap-2 text-cream/75 text-sm" }, /* @__PURE__ */ React2.createElement("span", { className: "w-1.5 h-1.5 rounded-full", style: { backgroundColor: tc } }), tech))), /* @__PURE__ */ React2.createElement("div", { className: "flex items-center gap-4" }, project.githubUrl && /* @__PURE__ */ React2.createElement(
      "a",
      {
        href: project.githubUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/12 text-cream/70 hover:text-white hover:bg-white/5 transition-all text-sm"
      },
      /* @__PURE__ */ React2.createElement(Github, { size: 16 }),
      " Code"
    ), project.readTime === "Demo Video" ? /* @__PURE__ */ React2.createElement(
      "button",
      {
        onClick: () => onVideoClick(project.videoSrc || "", project.headline),
        className: "inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:brightness-110 hover:scale-[1.03]",
        style: { backgroundColor: tc }
      },
      "Voir la d\xE9mo ",
      /* @__PURE__ */ React2.createElement(Zap, { size: 16 })
    ) : /* @__PURE__ */ React2.createElement(
      "a",
      {
        href: project.liveUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:brightness-110 hover:scale-[1.03]",
        style: { backgroundColor: tc }
      },
      "Voir le projet ",
      /* @__PURE__ */ React2.createElement(ArrowUpRight, { size: 16 })
    ))),
    /* @__PURE__ */ React2.createElement("div", { className: "w-[45%] h-full relative flex items-center justify-center" }, /* @__PURE__ */ React2.createElement("div", { className: "absolute inset-0" }, /* @__PURE__ */ React2.createElement(Suspense, { fallback: null }, /* @__PURE__ */ React2.createElement(Scene3D, { color: tc, geometryType: project.geometry }))), /* @__PURE__ */ React2.createElement(
      "div",
      {
        className: "absolute bottom-12 right-10 w-48 h-32 rounded-xl overflow-hidden border shadow-2xl z-10",
        style: { borderColor: `${tc}30`, boxShadow: `0 10px 40px ${tc}15` }
      },
      /* @__PURE__ */ React2.createElement("img", { src: project.image, alt: project.subtitle, className: "w-full h-full object-cover" }),
      /* @__PURE__ */ React2.createElement(
        "div",
        {
          className: "absolute inset-0",
          style: { background: `linear-gradient(to top, ${tc}20, transparent 60%)` }
        }
      )
    ))
  );
}
function MobileCard({ project, onVideoClick }) {
  const Icon = project.icon;
  const tc = project.themeColor;
  return /* @__PURE__ */ React2.createElement("div", { className: "rounded-2xl overflow-hidden border", style: { background: "#0c0c14", borderColor: `${tc}20` } }, /* @__PURE__ */ React2.createElement("div", { className: "relative h-48 overflow-hidden" }, /* @__PURE__ */ React2.createElement("img", { src: project.image, alt: project.subtitle, className: "w-full h-full object-cover" }), /* @__PURE__ */ React2.createElement("div", { className: "absolute inset-0", style: { background: "linear-gradient(to top, #0c0c14 5%, transparent 60%)" } })), /* @__PURE__ */ React2.createElement("div", { className: "p-5 space-y-4" }, /* @__PURE__ */ React2.createElement("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono", style: { backgroundColor: `${tc}18`, color: tc, border: `1px solid ${tc}30` } }, /* @__PURE__ */ React2.createElement(Icon, { size: 12 }), " ", project.category), /* @__PURE__ */ React2.createElement("h3", { className: "text-xl font-bold text-white font-display" }, project.headline), /* @__PURE__ */ React2.createElement("p", { className: "text-cream/50 text-sm" }, project.subtitle), /* @__PURE__ */ React2.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React2.createElement("p", { className: "text-cream/70 text-sm" }, /* @__PURE__ */ React2.createElement("strong", { className: "text-white" }, "Probl\xE8me:"), " ", project.problem), /* @__PURE__ */ React2.createElement("p", { className: "text-cream/70 text-sm" }, /* @__PURE__ */ React2.createElement("strong", { className: "text-white" }, "Solution:"), " ", project.solution)), /* @__PURE__ */ React2.createElement("div", { className: "border-l-2 pl-3 py-1", style: { borderColor: tc } }, /* @__PURE__ */ React2.createElement("p", { className: "text-cream/60 italic text-xs" }, '"', project.result, '"')), /* @__PURE__ */ React2.createElement("div", { className: "flex flex-wrap gap-1.5" }, project.technologies.map((tech, i) => /* @__PURE__ */ React2.createElement("span", { key: i, className: "px-2 py-0.5 rounded-full text-[10px] font-mono border", style: { borderColor: `${tc}20`, color: `${tc}aa` } }, tech))), /* @__PURE__ */ React2.createElement("div", { className: "flex items-center gap-3 pt-2" }, project.githubUrl && /* @__PURE__ */ React2.createElement("a", { href: project.githubUrl, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-cream/70 text-xs hover:bg-white/5 transition-all" }, /* @__PURE__ */ React2.createElement(Github, { size: 14 }), " Code"), project.readTime === "Demo Video" ? /* @__PURE__ */ React2.createElement("button", { onClick: () => onVideoClick(project.videoSrc || "", project.headline), className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-semibold", style: { backgroundColor: tc } }, "Voir la d\xE9mo ", /* @__PURE__ */ React2.createElement(Zap, { size: 14 })) : /* @__PURE__ */ React2.createElement("a", { href: project.liveUrl, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-semibold", style: { backgroundColor: tc } }, "Voir le projet ", /* @__PURE__ */ React2.createElement(ArrowUpRight, { size: 14 })))));
}
var Projects = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({ src: "", title: "" });
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();
  const N = projects.length;
  const handleVideoClick = useCallback((src, title) => {
    setSelectedVideo({ src, title });
    setIsVideoModalOpen(true);
  }, []);
  const handleScroll = useCallback(() => {
    if (!sectionRef.current || isMobile) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrolled = -rect.top;
    const slideH = window.innerHeight;
    const total = slideH * N;
    if (scrolled < 0 || scrolled > total) return;
    const raw = scrolled / slideH;
    const idx = Math.min(Math.floor(raw), N - 1);
    const p = Math.min(Math.max(raw - idx, 0), 1);
    setActiveIndex(idx);
    setProgress(idx === N - 1 ? 0 : p);
  }, [isMobile, N]);
  useEffect2(() => {
    if (isMobile) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isMobile]);
  const scrollToProject = (idx) => {
    if (!sectionRef.current) return;
    window.scrollTo({ top: sectionRef.current.offsetTop + idx * window.innerHeight, behavior: "smooth" });
  };
  const current = projects[activeIndex];
  const next = activeIndex < N - 1 ? projects[activeIndex + 1] : null;
  const ghostLetters = current.headline.slice(0, 2);
  if (isMobile) {
    return /* @__PURE__ */ React2.createElement("section", { id: "projects", className: "py-16 relative" }, /* @__PURE__ */ React2.createElement("div", { className: "px-4" }, /* @__PURE__ */ React2.createElement("div", { className: "text-center mb-10" }, /* @__PURE__ */ React2.createElement("span", { className: "text-electric-blue font-mono text-sm tracking-wider uppercase" }, "Portfolio"), /* @__PURE__ */ React2.createElement("h2", { className: "text-3xl font-bold text-cream mt-2 mb-4 font-display" }, "S\xE9lection de ", /* @__PURE__ */ React2.createElement("span", { className: "text-neon-orange" }, "Travaux"))), /* @__PURE__ */ React2.createElement("div", { className: "flex flex-col gap-8" }, projects.map((p) => /* @__PURE__ */ React2.createElement(MobileCard, { key: p.id, project: p, onVideoClick: handleVideoClick })))), /* @__PURE__ */ React2.createElement(VideoModal_default, { isOpen: isVideoModalOpen, onClose: () => setIsVideoModalOpen(false), videoSrc: selectedVideo.src, title: selectedVideo.title }));
  }
  return /* @__PURE__ */ React2.createElement("section", { id: "projects", ref: sectionRef, style: { height: `${(N + 1) * 100}vh` }, className: "relative" }, /* @__PURE__ */ React2.createElement(
    "div",
    {
      className: "sticky top-0 h-screen w-full overflow-hidden",
      style: { perspective: "2000px", perspectiveOrigin: "50% 50%" }
    },
    /* @__PURE__ */ React2.createElement(
      "div",
      {
        className: "absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0",
        style: {
          fontSize: "42vw",
          fontWeight: 900,
          fontFamily: "'Syne', sans-serif",
          color: "white",
          opacity: progress > 0.03 ? Math.sin(progress * Math.PI) * 0.06 : 0,
          letterSpacing: "-0.08em",
          lineHeight: 1
        }
      },
      ghostLetters
    ),
    /* @__PURE__ */ React2.createElement(
      "div",
      {
        className: "absolute",
        style: {
          top: "28px",
          left: "28px",
          right: "28px",
          bottom: "80px",
          borderRadius: "24px",
          overflow: "hidden",
          border: `1px solid ${current.themeColor}18`,
          boxShadow: `0 0 80px ${current.themeColor}08, inset 0 1px 0 rgba(255,255,255,0.04)`,
          transform: `
              translateX(${-progress * 50}%)
              rotateY(${progress * 20}deg)
              scale(${1 - progress * 0.55})
            `,
          opacity: 1 - progress * 0.3,
          transformOrigin: "center center",
          willChange: "transform",
          backfaceVisibility: "hidden",
          zIndex: 10
        }
      },
      /* @__PURE__ */ React2.createElement(ProjectCard, { project: current, onVideoClick: handleVideoClick })
    ),
    next && progress > 0.01 && /* @__PURE__ */ React2.createElement(
      "div",
      {
        className: "absolute",
        style: {
          top: "28px",
          left: "28px",
          right: "28px",
          bottom: "80px",
          borderRadius: "24px",
          overflow: "hidden",
          border: `1px solid ${next.themeColor}18`,
          boxShadow: `0 0 80px ${next.themeColor}08, inset 0 1px 0 rgba(255,255,255,0.04)`,
          transform: `
                translateX(${(1 - progress) * 100}%)
                rotateY(${-(1 - progress) * 12}deg)
                scale(${0.5 + progress * 0.5})
              `,
          opacity: 0.3 + progress * 0.7,
          transformOrigin: "center center",
          willChange: "transform",
          backfaceVisibility: "hidden",
          zIndex: 5
        }
      },
      /* @__PURE__ */ React2.createElement(ProjectCard, { project: next, onVideoClick: handleVideoClick })
    ),
    /* @__PURE__ */ React2.createElement("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3" }, projects.map((p, i) => /* @__PURE__ */ React2.createElement(
      "button",
      {
        key: p.id,
        onClick: () => scrollToProject(i),
        "aria-label": `Projet ${i + 1}`,
        className: "transition-all duration-300 ease-out cursor-pointer",
        style: {
          width: i === activeIndex ? 32 : 8,
          height: 8,
          borderRadius: i === activeIndex ? 4 : "50%",
          backgroundColor: i === activeIndex ? current.themeColor : "#333"
        }
      }
    ))),
    /* @__PURE__ */ React2.createElement(
      "span",
      {
        className: "absolute bottom-7 right-8 z-40 font-mono text-xs pointer-events-none select-none",
        style: { color: current.themeColor, opacity: 0.4 }
      },
      current.category.toLowerCase().replace(/ & /g, ".")
    ),
    /* @__PURE__ */ React2.createElement("div", { className: "absolute top-8 right-10 z-40 font-mono text-sm text-cream/30" }, /* @__PURE__ */ React2.createElement("span", { style: { color: current.themeColor, opacity: 0.7 } }, String(activeIndex + 1).padStart(2, "0")), /* @__PURE__ */ React2.createElement("span", { className: "mx-1.5 text-cream/20" }, "/"), /* @__PURE__ */ React2.createElement("span", null, String(N).padStart(2, "0")))
  ), /* @__PURE__ */ React2.createElement(VideoModal_default, { isOpen: isVideoModalOpen, onClose: () => setIsVideoModalOpen(false), videoSrc: selectedVideo.src, title: selectedVideo.title }));
};
var ErrorBoundary = class extends React2.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ React2.createElement("div", { style: { color: "red", zIndex: 9999, position: "fixed", top: 50, left: 50, background: "black", padding: "20px", fontSize: "20px" } }, this.state.error?.toString());
    }
    return this.props.children;
  }
};
var WrappedProjects = () => /* @__PURE__ */ React2.createElement(ErrorBoundary, null, /* @__PURE__ */ React2.createElement(Projects, null));
var Projects_default = WrappedProjects;
export {
  Projects_default as default
};
