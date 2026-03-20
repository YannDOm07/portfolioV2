import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Quote, Calculator, Sparkles, Palette, ThumbsUp, Play, Check, Lock } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   THEME COLORS
   ═══════════════════════════════════════════════════════ */
const COLORS: Record<string, string> = {
  'quote-generator': '#EC4899',
  'smart-calculator': '#00D4FF',
  'color-palette': '#8B5CF6',
  'ai-generator': '#F97316',
};

/* ═══════════════════════════════════════════════════════
   MARQUEE TAGS
   ═══════════════════════════════════════════════════════ */
const TAGS = ['React', 'IA', 'Python', 'WebGL', 'Canvas', 'API', 'Three.js', 'TensorFlow', 'Node.js', 'Data'];

function MarqueeRow() {
  const doubled = [...TAGS, ...TAGS];
  return (
    <div className="overflow-hidden mt-6 w-full max-w-3xl mx-auto opacity-40">
      <motion.div
        className="flex gap-3 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((t, i) => (
          <span key={i} className="px-3 py-1 rounded-full border border-electric-blue/30 text-electric-blue font-mono text-[11px] tracking-wider shrink-0">
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   EXPERIMENT CARD WRAPPER — glassmorphism + animated border
   ═══════════════════════════════════════════════════════ */
function ExperimentCard({ children, color, index, className = '', disabled = false }: { children: React.ReactNode; color: string; index: number; className?: string; disabled?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={disabled ? {} : { y: -6 }}
      className={`relative rounded-2xl p-[1px] group ${className}`}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      {/* Animated gradient border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${color}40, transparent 50%, ${color}20)` }}
      />

      {/* Card inner */}
      <div
        className="relative rounded-2xl p-7 h-full flex flex-col overflow-hidden transition-all duration-400"
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: 'none',
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.border = `1px solid ${color}40`;
            e.currentTarget.style.boxShadow = `0 0 30px ${color}15`;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Spot glow top-right */}
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color}0D, transparent 70%)` }}
        />
        {children}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   PULSING ICON
   ═══════════════════════════════════════════════════════ */
function PulsingIcon({ icon: Icon, color }: { icon: React.ElementType; color: string }) {
  return (
    <div className="relative shrink-0">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: `${color}20`,
          border: `1px solid ${color}40`,
          boxShadow: `0 0 16px ${color}30`,
          animation: 'pulse-glow 2s ease-in-out infinite',
        }}
      >
        <Icon size={24} style={{ color }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SHIMMER BAR (for mystery card)
   ═══════════════════════════════════════════════════════ */
function ShimmerBar({ percent }: { percent: number }) {
  return (
    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden mt-4">
      <motion.div
        className="h-full rounded-full"
        style={{
          width: `${percent}%`,
          background: 'linear-gradient(90deg, #F97316 0%, #F9731680 50%, #F97316 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['100% 0%', '-100% 0%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CTA BUTTON — outlined pill style
   ═══════════════════════════════════════════════════════ */
function CtaButton({ onClick, color, children }: { onClick: () => void; color: string; children: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-300"
      style={{
        border: `1px solid ${color}`,
        color,
        background: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = color;
        e.currentTarget.style.color = '#0a0a0f';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = color;
      }}
    >
      {children}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN — Lab component
   ═══════════════════════════════════════════════════════ */
const Lab = () => {
  const [quoteResult, setQuoteResult] = useState('');
  const [calcResult, setCalcResult] = useState('');
  const [currentPalette, setCurrentPalette] = useState<string[]>([]);

  // Load votes from localStorage or use defaults
  const [votes, setVotes] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('portfolioVotes');
    return saved ? JSON.parse(saved) : {
      'web3-dashboard': 12,
      'ai-chat': 8,
      '3d-portfolio': 24
    };
  });

  // Track which feature the user has voted for
  const [votedFeature, setVotedFeature] = useState<string | null>(() => {
    return localStorage.getItem('userVotedFeature') || null;
  });

  const upcomingFeatures = [
    { id: '3d-portfolio', title: 'Portfolio 3D Immersif', icon: '🧊' },
    { id: 'web3-dashboard', title: 'Dashboard Web3 / Crypto', icon: '🔗' },
    { id: 'ai-chat', title: 'Chatbot Support IA', icon: '🤖' },
  ];

  useEffect(() => {
    localStorage.setItem('portfolioVotes', JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    if (votedFeature) {
      localStorage.setItem('userVotedFeature', votedFeature);
    }
  }, [votedFeature]);

  const handleVote = (id: string) => {
    if (votedFeature) return;
    setVotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    setVotedFeature(id);
  };

  const generateQuote = () => {
    const quotes = [
      "L'innovation distingue un leader d'un suiveur. – Steve Jobs",
      "Le code est de la poésie que seuls les ordinateurs peuvent lire.",
      "La simplicité est la sophistication suprême. – Léonard de Vinci",
      "La meilleure façon de prédire l'avenir est de l'inventer. – Alan Kay",
      "Tout le monde devrait apprendre à programmer, car cela apprend à penser. – Steve Jobs",
      "La perfection est atteinte non pas lorsqu'il n'y a plus rien à ajouter, mais lorsqu'il n'y a plus rien à retirer. – Saint-Exupéry",
      "L'échec est le fondement de la réussite. – Lao Tseu"
    ];
    setQuoteResult(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const calculateSmart = (input: string) => {
    if (!input.trim()) { setCalcResult(''); return; }
    const lowerInput = input.toLowerCase();
    let expression = lowerInput;
    try {
      if (lowerInput.includes('racine de')) {
        const num = parseFloat(lowerInput.split('racine de')[1]);
        if (!isNaN(num)) { setCalcResult(`√${num} = ${Math.sqrt(num).toFixed(2)}`); return; }
      }
      if (lowerInput.includes('carré de')) {
        const num = parseFloat(lowerInput.split('carré de')[1]);
        if (!isNaN(num)) { setCalcResult(`${num}² = ${Math.pow(num, 2)}`); return; }
      }
      if (lowerInput.includes('cube de')) {
        const num = parseFloat(lowerInput.split('cube de')[1]);
        if (!isNaN(num)) { setCalcResult(`${num}³ = ${Math.pow(num, 3)}`); return; }
      }
      if (lowerInput.includes('% de')) {
        const parts = lowerInput.split('% de');
        const percent = parseFloat(parts[0]);
        const total = parseFloat(parts[1]);
        if (!isNaN(percent) && !isNaN(total)) { setCalcResult(`${percent}% de ${total} = ${(percent / 100) * total}`); return; }
      }
      expression = expression.replace(/plus/g, '+').replace(/moins/g, '-').replace(/fois/g, '*').replace(/multiplié par/g, '*').replace(/divisé par/g, '/').replace(/x/g, '*').replace(/,/g, '.');
      if (/^[0-9+\-*/().\s]+$/.test(expression)) {
        // eslint-disable-next-line no-eval
        const result = eval(expression);
        if (!isNaN(result)) { setCalcResult(`${input} = ${Number.isInteger(result) ? result : result.toFixed(2)}`); }
        else { throw new Error("Invalid"); }
      } else { throw new Error("Unknown"); }
    } catch { setCalcResult("Je ne comprends pas encore cette opération 🤔"); }
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const generateColorPalette = () => {
    const hue = Math.floor(Math.random() * 360);
    setCurrentPalette([
      hslToHex(hue, 70, 50),
      hslToHex((hue + 30) % 360, 70, 50),
      hslToHex((hue + 60) % 360, 70, 50),
      hslToHex((hue + 180) % 360, 70, 50),
      hslToHex((hue + 210) % 360, 70, 50),
    ]);
  };

  /* ── RENDER ── */
  return (
    <section id="lab" className="py-24 bg-dark-bg relative overflow-hidden">
      {/* Pulse-glow keyframes */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 16px var(--glow-color, rgba(0,212,255,0.2)); }
          50% { box-shadow: 0 0 28px var(--glow-color, rgba(0,212,255,0.5)); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>

      {/* Background deco */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent" />
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl -z-10" />
      <div className="absolute right-0 bottom-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      {/* Terminal-style floating lines */}
      <div className="absolute top-16 left-8 font-mono text-[11px] text-electric-blue/10 pointer-events-none select-none hidden lg:block">
        &gt; experiment.init()<br />
        &gt; loading modules...
      </div>
      <div className="absolute bottom-24 right-12 font-mono text-[11px] text-purple-400/10 pointer-events-none select-none hidden lg:block">
        [LAB] status: active<br />
        [LAB] uptime: ∞
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 xl:px-20">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6" style={{ backgroundColor: 'rgba(0,212,255,0.08)', borderColor: 'rgba(0,212,255,0.25)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue" />
            </span>
            <span className="text-electric-blue font-mono text-[11px] tracking-[3px] uppercase">LABORATOIRE</span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <Zap className="text-electric-blue" size={28} />
            <h2 className="text-4xl md:text-5xl font-black text-cream font-display tracking-tight">
              Zone <span className="text-transparent" style={{ background: 'linear-gradient(90deg, #00D4FF, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Expérimentale</span>
            </h2>
          </div>
          <p className="text-cream/50 max-w-lg mx-auto text-[15px] font-light">
            Mini-outils interactifs. Testez, jouez, explorez.
          </p>

          <MarqueeRow />
        </motion.div>

        {/* ═══════════════════════════════════════════════════════
           CARD GRID — Asymmetric layout
           Row 1: Featured card (full width)
           Row 2: 3 cards
           ═══════════════════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto space-y-6 mb-20">

          {/* ── ROW 1: Featured Card (Générateur de Citations) ── */}
          <ExperimentCard color={COLORS['quote-generator']} index={0}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left side: info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-4">
                  <PulsingIcon icon={Quote} color={COLORS['quote-generator']} />
                  <div>
                    <h3 className="text-lg font-bold text-cream font-display">Générateur de Citations IA</h3>
                    <p className="text-cream/50 text-[13px]">Citations inspirantes personnalisées</p>
                  </div>
                </div>
                <CtaButton onClick={generateQuote} color={COLORS['quote-generator']}>
                  <Play size={14} fill="currentColor" /> Générer une citation
                </CtaButton>
              </div>

              {/* Right side: result */}
              <div className="flex-1 flex items-center">
                <div className="w-full min-h-[5rem] flex items-center justify-center rounded-xl p-5 border border-white/5" style={{ background: 'rgba(236,72,153,0.04)' }}>
                  <p className="text-cream/80 italic text-center text-sm leading-relaxed">
                    "{quoteResult || "Apprendre à programmer vous apprend à penser. – Steve Jobs"}"
                  </p>
                </div>
              </div>
            </div>
          </ExperimentCard>

          {/* ── ROW 2: Three smaller cards ── */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* Calculatrice Intelligente */}
            <ExperimentCard color={COLORS['smart-calculator']} index={1}>
              <div className="flex items-center gap-3 mb-5">
                <PulsingIcon icon={Calculator} color={COLORS['smart-calculator']} />
                <div>
                  <h3 className="text-[15px] font-bold text-cream font-display">Calculatrice</h3>
                  <p className="text-cream/40 text-[11px]">Langage naturel</p>
                </div>
              </div>
              <div className="mt-auto space-y-3">
                <input
                  type="text"
                  placeholder="Ex: racine de 16"
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#f8f6f0',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)';
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0,212,255,0.15)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && calculateSmart(e.currentTarget.value)}
                />
                {calcResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="rounded-lg p-3 text-center border"
                    style={{ background: '#00D4FF10', borderColor: '#00D4FF20' }}
                  >
                    <span className="text-[#00D4FF] font-mono font-bold text-sm">{calcResult}</span>
                  </motion.div>
                )}
              </div>
            </ExperimentCard>

            {/* Palette de Couleurs */}
            <ExperimentCard color={COLORS['color-palette']} index={2}>
              <div className="flex items-center gap-3 mb-5">
                <PulsingIcon icon={Palette} color={COLORS['color-palette']} />
                <div>
                  <h3 className="text-[15px] font-bold text-cream font-display">Palette de Couleurs</h3>
                  <p className="text-cream/40 text-[11px]">Couleurs harmonieuses</p>
                </div>
              </div>
              <div className="mt-auto space-y-3">
                <CtaButton onClick={generateColorPalette} color={COLORS['color-palette']}>
                  <Palette size={14} /> Générer
                </CtaButton>
                <div className="h-12 flex rounded-lg overflow-hidden border border-white/8">
                  {currentPalette.length > 0 ? currentPalette.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex-1 cursor-pointer hover:flex-[1.5] transition-all duration-300 relative group/color"
                      style={{ backgroundColor: c }}
                      onClick={() => navigator.clipboard.writeText(c)}
                      title={`Copier ${c}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 transition-opacity">
                        <span className="text-[9px] font-mono bg-black/70 text-white px-1.5 py-0.5 rounded">Copier</span>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="w-full h-full flex items-center justify-center text-cream/20 text-xs font-mono">
                      Cliquez "Générer"
                    </div>
                  )}
                </div>
                {currentPalette.length > 0 && (
                  <div className="flex gap-1 text-center">
                    {currentPalette.map((c, i) => (
                      <div key={i} className="flex-1">
                        <span className="text-[9px] font-mono text-cream/40 uppercase">{c}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ExperimentCard>

            {/* ── MYSTERY CARD — Analyseur de Code ── */}
            <ExperimentCard color={COLORS['ai-generator']} index={3} disabled>
              {/* Scanlines overlay */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-10 z-20">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
                <div className="absolute inset-0 w-full h-[200%]" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(249,115,22,0.05) 50%, transparent 100%)', animation: 'scanline 3s linear infinite' }} />
              </div>

              {/* TOP SECRET badge */}
              <div className="absolute top-4 right-4 z-30">
                <span className="px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] font-mono tracking-wider uppercase flex items-center gap-1">
                  <Lock size={10} /> BIENTÔT
                </span>
              </div>

              <div className="relative z-10 opacity-70">
                <div className="flex items-center gap-3 mb-5">
                  <PulsingIcon icon={Sparkles} color={COLORS['ai-generator']} />
                  <div>
                    <h3 className="text-[15px] font-bold text-cream font-display">Analyseur de Code</h3>
                    <p className="text-cream/40 text-[11px]">Suggestions d'amélioration</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-cream/30 font-mono text-[12px]">En cours de déploiement...</p>
                  <ShimmerBar percent={73} />
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-cream/25 font-mono text-[11px]">73% complété</span>
                  </div>
                </div>
              </div>
            </ExperimentCard>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
           VOTING SYSTEM
           ═══════════════════════════════════════════════════════ */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
              <h3 className="text-2xl font-bold text-cream font-display flex items-center gap-2">
                <ThumbsUp size={22} className="text-electric-blue" />
                Votez pour la prochaine fonctionnalité
              </h3>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider" style={{ border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF' }}>
                🗓 Résultats ce mois-ci
              </span>
            </div>
            <p className="text-[14px] font-light" style={{ color: '#888' }}>
              Le projet le plus voté sera développé en priorité — votre voix compte.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {(() => {
              const featuresData = [
                { id: '3d-portfolio', title: 'Portfolio 3D Immersif', icon: '🧊', description: 'Navigation immersive avec Three.js et shaders WebGL', color: '#3B82F6' },
                { id: 'web3-dashboard', title: 'Dashboard Web3 / Crypto', icon: '🔗', description: 'Suivi de wallet, NFTs et DeFi en temps réel', color: '#00D4FF' },
                { id: 'ai-chat', title: 'Chatbot Support IA', icon: '🤖', description: 'Assistant support entraîné sur ma stack technique', color: '#EC4899' },
              ];
              const totalVotes = featuresData.reduce((sum, f) => sum + (votes[f.id] || 0), 0);
              const leaderId = featuresData.reduce((leadId, f) => (votes[f.id] || 0) > (votes[leadId] || 0) ? f.id : leadId, featuresData[0].id);

              return featuresData.map((feature, idx) => {
                const voteCount = votes[feature.id] || 0;
                const percent = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                const isLeader = feature.id === leaderId;
                const isVoted = votedFeature === feature.id;
                const hasVoted = votedFeature !== null;

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.12, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={!hasVoted ? { y: -6 } : {}}
                    className="relative rounded-2xl overflow-hidden transition-all duration-400"
                    style={{
                      background: isVoted ? `rgba(${feature.color === '#3B82F6' ? '59,130,246' : feature.color === '#00D4FF' ? '0,212,255' : '236,72,153'},0.04)` : 'rgba(255,255,255,0.03)',
                      backdropFilter: 'blur(10px)',
                      border: isVoted ? `1px solid ${feature.color}60` : isLeader ? '1px solid rgba(234,179,8,0.3)' : '1px solid rgba(255,255,255,0.06)',
                      boxShadow: isLeader ? '0 0 25px rgba(234,179,8,0.12)' : 'none',
                    }}
                  >
                    {/* Spot glow */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${feature.color}12, transparent 70%)` }} />

                    <div className="relative p-6 flex flex-col h-full min-h-[220px]">
                      {/* Top row: icon + badges */}
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-3xl" style={{ filter: isLeader ? 'drop-shadow(0 0 8px gold)' : 'none' }}>{feature.icon}</span>
                        <div className="flex items-center gap-2 flex-wrap justify-end">
                          {isLeader && (
                            <motion.span
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase"
                              style={{ background: 'rgba(234,179,8,0.15)', border: '1px solid rgba(234,179,8,0.4)', color: '#EAB308' }}
                            >
                              🏆 EN TÊTE
                            </motion.span>
                          )}
                          {isVoted && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1" style={{ background: `${feature.color}20`, color: feature.color }}>
                              <Check size={10} /> Mon vote
                            </span>
                          )}
                          <motion.span
                            key={voteCount}
                            animate={isVoted ? { scale: [1.4, 1] } : {}}
                            transition={{ duration: 0.3, type: 'spring' }}
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold"
                            style={{ background: `${feature.color}15`, color: feature.color }}
                          >
                            {voteCount} votes
                          </motion.span>
                        </div>
                      </div>

                      {/* Title + description */}
                      <h4 className="text-lg font-bold text-cream font-display mb-1">{feature.title}</h4>
                      <p className="text-cream/40 text-[13px] mb-6">{feature.description}</p>

                      {/* Spacer */}
                      <div className="mt-auto" />

                      {/* Vote button */}
                      {!hasVoted ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleVote(feature.id)}
                          className="w-full py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                          style={{
                            border: `1px solid ${feature.color}60`,
                            color: feature.color,
                            background: 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${feature.color}15`;
                            e.currentTarget.style.borderColor = feature.color;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = `${feature.color}60`;
                          }}
                        >
                          ↑ Voter pour ce projet
                        </motion.button>
                      ) : isVoted ? (
                        <div className="w-full py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 font-mono" style={{ background: `${feature.color}10`, color: feature.color, border: `1px solid ${feature.color}30` }}>
                          <Check size={14} /> Voté
                        </div>
                      ) : (
                        <div className="w-full py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 font-mono text-cream/20 border border-white/5">
                          Vote terminé
                        </div>
                      )}

                      {/* Progress bar */}
                      <div className="mt-4 w-full h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percent}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 + idx * 0.15 }}
                          viewport={{ once: true }}
                          className="h-full rounded-full"
                          style={{ background: feature.color }}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-1.5">
                        <span className="text-[10px] font-mono text-cream/25">{percent}%</span>
                        <span className="text-[10px] font-mono text-cream/25">{voteCount}/{totalVotes}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              });
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lab;