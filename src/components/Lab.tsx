import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Quote, Calculator, Sparkles, Palette, ThumbsUp, Play, Check } from 'lucide-react';

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
  
  // Track which feature the user has voted for (only ONE allowed)
  const [votedFeature, setVotedFeature] = useState<string | null>(() => {
    return localStorage.getItem('userVotedFeature') || null;
  });

  const experiments = [
    {
      id: 'quote-generator',
      title: 'Générateur de Citations IA',
      description: 'Génère des citations inspirantes personnalisées selon votre humeur',
      icon: Quote,
      color: 'from-pink-500 to-rose-500',
      buttonText: 'Générer une citation',
      demo: true
    },
    {
      id: 'smart-calculator',
      title: 'Calculatrice Intelligente',
      description: 'Calculatrice qui comprend le langage naturel et résout des équations complexes',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500',
      demo: true
    },
    {
      id: 'color-palette',
      title: 'Palette de Couleurs',
      description: 'Générateur de palettes de couleurs pour vos projets web',
      icon: Palette,
      color: 'from-purple-500 to-indigo-500',
      buttonText: 'Nouvelle Palette',
      demo: true
    },
    {
      id: 'ai-generator',
      title: 'Analyseur de Code',
      description: 'Outil qui analyse votre code et suggère des améliorations',
      icon: Sparkles,
      color: 'from-orange-500 to-red-500',
      demo: false
    }
  ];

  const upcomingFeatures = [
    { id: '3d-portfolio', title: 'Portfolio 3D Immersif', icon: '🧊' },
    { id: 'web3-dashboard', title: 'Dashboard Web3 / Crypto', icon: '🔗' },
    { id: 'ai-chat', title: 'Chatbot Support IA', icon: '🤖' },
  ];

  // Save to localStorage whenever votes change
  useEffect(() => {
    localStorage.setItem('portfolioVotes', JSON.stringify(votes));
  }, [votes]);

  // Save voted feature to localStorage
  useEffect(() => {
    if (votedFeature) {
      localStorage.setItem('userVotedFeature', votedFeature);
    }
  }, [votedFeature]);

  const handleVote = (id: string) => {
    // Check if user has already voted (for any feature)
    if (votedFeature) return;
    
    // Add vote
    setVotes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    
    // Mark this feature as voted
    setVotedFeature(id);
  };

  const generateQuote = () => {
    const quotes = [
      "L'innovation distingue un leader d'un suiveur. - Steve Jobs",
      "Le code est de la poésie que seuls les ordinateurs peuvent lire.",
      "La simplicité est la sophistication suprême. - Léonard de Vinci",
      "La meilleure façon de prédire l'avenir est de l'inventer. - Alan Kay",
      "Il n'y a pas de bug, seulement des fonctionnalités non documentées.",
      "Tout le monde devrait apprendre à programmer, car cela apprend à penser. - Steve Jobs",
      "Le meilleur moment pour planter un arbre était il y a 20 ans. Le deuxième meilleur moment est maintenant. - Proverbe chinois",
      "La perfection est atteinte non pas lorsqu'il n'y a plus rien à ajouter, mais lorsqu'il n'y a plus rien à retirer. - Antoine de Saint-Exupéry",
      "L'échec est le fondement de la réussite. - Lao Tseu"
    ];
    setQuoteResult(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const calculateSmart = (input: string) => {
    if (!input.trim()) {
      setCalcResult('');
      return;
    }

    const lowerInput = input.toLowerCase();
    let expression = lowerInput;

    try {
      // Natural Language Parsing
      if (lowerInput.includes('racine de')) {
        const num = parseFloat(lowerInput.split('racine de')[1]);
        if (!isNaN(num)) {
          setCalcResult(`√${num} = ${Math.sqrt(num).toFixed(2)}`);
          return;
        }
      }
      
      if (lowerInput.includes('carré de')) {
        const num = parseFloat(lowerInput.split('carré de')[1]);
        if (!isNaN(num)) {
          setCalcResult(`${num}² = ${Math.pow(num, 2)}`);
          return;
        }
      }

      if (lowerInput.includes('cube de')) {
        const num = parseFloat(lowerInput.split('cube de')[1]);
        if (!isNaN(num)) {
          setCalcResult(`${num}³ = ${Math.pow(num, 3)}`);
          return;
        }
      }

      // Percentage: "10% de 50"
      if (lowerInput.includes('% de')) {
        const parts = lowerInput.split('% de');
        const percent = parseFloat(parts[0]);
        const total = parseFloat(parts[1]);
        if (!isNaN(percent) && !isNaN(total)) {
             setCalcResult(`${percent}% de ${total} = ${(percent / 100) * total}`);
             return;
        }
      }

      // Basic replacements for natural language math
      expression = expression
        .replace(/plus/g, '+')
        .replace(/moins/g, '-')
        .replace(/fois/g, '*')
        .replace(/multiplié par/g, '*')
        .replace(/divisé par/g, '/')
        .replace(/x/g, '*')
        .replace(/,/g, '.'); // Handling french decimal comma

      // Safe eval (simple math only)
      // Check if expression contains only valid math chars
      if (/^[0-9+\-*/().\s]+$/.test(expression)) {
        // eslint-disable-next-line no-eval
        const result = eval(expression); 
        if (!isNaN(result)) {
           setCalcResult(`${input} = ${Number.isInteger(result) ? result : result.toFixed(2)}`);
        } else {
            throw new Error("Invalid calculation");
        }
      } else {
         throw new Error("Unknown command");
      }

    } catch (e) {
      setCalcResult("Je ne comprends pas encore cette opération 🤔");
    }
  };

  // Helper function to convert HSL to HEX
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
    const palette = [
      hslToHex(hue, 70, 50),
      hslToHex((hue + 30) % 360, 70, 50),
      hslToHex((hue + 60) % 360, 70, 50),
      hslToHex((hue + 180) % 360, 70, 50), // Complementary
      hslToHex((hue + 210) % 360, 70, 50), // Split Complementary
    ];
    setCurrentPalette(palette);
  };

  return (
    <section id="lab" className="py-20 bg-dark-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent" />
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="text-center mb-16"
         >
           <div className="flex items-center justify-center gap-4 mt-2 mb-6">
             <Zap className="text-electric-blue" size={32} />
             <h2 className="text-4xl md:text-5xl font-bold text-cream font-display">
               Zone <span className="text-electric-blue">Expérimentale</span>
             </h2>
           </div>
           <p className="text-xl text-cream/70 max-w-2xl mx-auto font-light">
             Ici, je m'amuse avec l'IA, le Web, la Data... Testez mes dernières créations !
           </p>
         </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-20 max-w-6xl mx-auto">
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-dark-card border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors group flex flex-col"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${experiment.color} shadow-lg shrink-0`}>
                    <experiment.icon size={32} className="text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-cream mb-2 font-display">{experiment.title}</h3>
                    <p className="text-cream/60 text-sm leading-relaxed">{experiment.description}</p>
                </div>
              </div>

              <div className="mt-auto pt-6">
                {/* Specific Experiment UIs */}
                {experiment.id === 'quote-generator' && (
                   <div className="space-y-4">
                     <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={generateQuote}
                        className={`w-full py-3 rounded-lg bg-gradient-to-r ${experiment.color} text-white font-semibold flex items-center justify-center gap-2 shadow-lg`}
                     >
                        <Play size={18} fill="currentColor" />
                        {experiment.buttonText}
                     </motion.button>
                     <div className="min-h-[4rem] flex items-center justify-center bg-dark-bg/50 rounded-lg p-4 border border-white/5">
                        <p className="text-cream/90 italic text-center text-sm">"{quoteResult || "Apprendre à programmer vous apprend à penser. - Steve Jobs"}"</p>
                     </div>
                   </div>
                )}

                {experiment.id === 'smart-calculator' && (
                  <div className="space-y-4">
                     <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Ex: racine de 16, 5 + 3 * 2, carré de 7" 
                          className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-4 text-cream placeholder-cream/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                          onKeyDown={(e) => e.key === 'Enter' && calculateSmart(e.currentTarget.value)}
                        />
                     </div>
                     {calcResult && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center"
                        >
                            <span className="text-blue-400 font-mono font-bold">{calcResult}</span>
                        </motion.div>
                     )}
                  </div>
                )}

                {experiment.id === 'color-palette' && (
                  <div className="space-y-4">
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={generateColorPalette}
                        className={`w-full py-3 rounded-lg bg-gradient-to-r ${experiment.color} text-white font-semibold flex items-center justify-center gap-2 shadow-lg`}
                     >
                        <Play size={18} fill="currentColor" />
                        {experiment.buttonText}
                     </motion.button>
                    <div className="space-y-2">
                      <div className="h-16 flex rounded-lg overflow-hidden border border-white/10">
                        {currentPalette.length > 0 ? currentPalette.map((c, i) => (
                          <motion.div 
                              key={i} 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex-1 cursor-pointer hover:flex-[1.5] transition-all duration-300 relative group/color"
                              style={{ backgroundColor: c }}
                              onClick={() => {
                                navigator.clipboard.writeText(c);
                              }}
                              title={`Copier ${c}`}
                          >
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 transition-opacity">
                                  <span className="text-[10px] font-mono bg-black/70 text-white px-2 py-1 rounded backdrop-blur">Copier</span>
                              </div>
                          </motion.div>
                        )) : (
                            <div className="w-full h-full bg-dark-bg/50 flex items-center justify-center text-cream/30 text-xs">
                                Appuyez sur "Nouvelle Palette"
                            </div>
                        )}
                      </div>
                      {currentPalette.length > 0 && (
                        <div className="flex gap-2 text-center">
                          {currentPalette.map((c, i) => (
                            <div key={i} className="flex-1">
                              <span className="text-[10px] font-mono text-cream/60 uppercase">{c}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {experiment.id === 'ai-generator' && (
                    <div className="mt-2">
                        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4 text-center">
                            <p className="text-orange-400 text-sm font-semibold flex items-center justify-center gap-2">
                                🚧 En développement - Bientôt disponible !
                            </p>
                        </div>
                    </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Voting System */}
        <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-cream mb-8 font-display flex items-center justify-center gap-2">
                <ThumbsUp size={24} className="text-electric-blue" />
                Votez pour le prochain feature
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
                {upcomingFeatures.map((feature, idx) => (
                    <motion.button
                        key={feature.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={!votedFeature ? { y: -5 } : {}}
                        whileTap={!votedFeature ? { scale: 0.98 } : {}}
                        onClick={() => handleVote(feature.id)}
                        disabled={votedFeature !== null}
                        className={`bg-dark-card border rounded-xl p-6 transition-all group text-left w-full ${
                          votedFeature === feature.id 
                            ? 'border-electric-blue/50 cursor-not-allowed opacity-80' 
                            : votedFeature
                            ? 'border-white/5 cursor-not-allowed opacity-50'
                            : 'border-white/5 hover:border-electric-blue/30 cursor-pointer'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-3xl">{feature.icon}</span>
                            <div className="flex items-center gap-2">
                                {votedFeature === feature.id && (
                                  <span className="bg-electric-blue/20 text-electric-blue px-2 py-1 rounded-full text-xs font-mono flex items-center gap-1">
                                    <Check size={12} /> Voté
                                  </span>
                                )}
                                <span className={`px-3 py-1 rounded-full text-xs font-mono ${
                                  votedFeature === feature.id
                                    ? 'bg-electric-blue text-dark-bg'
                                    : 'bg-white/5 text-electric-blue group-hover:bg-electric-blue group-hover:text-dark-bg'
                                } transition-colors`}>
                                    {votes[feature.id]} votes
                                </span>
                            </div>
                        </div>
                        <h4 className={`font-bold transition-colors ${
                          votedFeature === feature.id 
                            ? 'text-electric-blue' 
                            : 'text-cream group-hover:text-electric-blue'
                        }`}>{feature.title}</h4>
                    </motion.button>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Lab;