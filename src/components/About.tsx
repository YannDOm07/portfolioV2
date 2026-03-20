import { motion } from 'framer-motion';
import { Quote, Briefcase, Award, Users } from 'lucide-react';
import { TextGenerateEffect } from './ui/text-generate-effect';

const About = () => {
  // Simulating clients/projects with details
  const cards = [
    { 
      id: "TC", 
      title: "TechCorp", 
      desc: "Refonte architecture Micro-frontend pour leur SaaS B2B.",
      color: "from-blue-500 to-indigo-600"
    },
    { 
      id: "IA", 
      title: "InnovAI", 
      desc: "Intégration d'agents autonomes pour le support client.",
      color: "from-emerald-500 to-teal-600"
    },
    { 
      id: "WS", 
      title: "WebScale", 
      desc: "Optimisation de performance : +300% de rapidité.",
      color: "from-orange-500 to-red-600"
    },
    { 
      id: "DF", 
      title: "DataFlow", 
      desc: "Dashboard analytique temps réel avec D3.js.",
      color: "from-purple-500 to-pink-600"
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-electric-blue/5 skew-x-12 blur-3xl -z-10" />
      
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-electric-blue font-mono text-sm tracking-wider uppercase">Mon Approche</span>
          <h2 className="text-4xl md:text-5xl font-bold text-cream mt-2 mb-6 font-display">
            Au-delà du <span className="text-neon-orange">Code</span>
          </h2>
          <p className="text-xl text-cream/70 max-w-3xl mx-auto leading-relaxed font-light">
            Je ne me contente pas de livrer des fonctionnalités. Je bâtis des écosystèmes numériques scalables, sécurisés et centrés sur l'expérience utilisateur.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Philosophy & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative">
              <Quote className="absolute -top-6 -left-6 text-electric-blue/20 w-16 h-16" />
              <TextGenerateEffect 
                words="La complexité technique ne doit jamais compromettre la simplicité d'utilisation. Mon objectif est de rendre la technologie invisible pour laisser place à la valeur ajoutée."
                className="font-light italic"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-lg bg-electric-blue/10 text-electric-blue group-hover:bg-electric-blue group-hover:text-dark-bg transition-all duration-300">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cream mb-2">Excellence Technique</h3>
                  <p className="text-cream/60 group-hover:text-cream/80 transition-colors">
                    Architecture propre, tests rigoureux et performance optimale sont mes standards non-négociables.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-lg bg-neon-orange/10 text-neon-orange group-hover:bg-neon-orange group-hover:text-dark-bg transition-all duration-300">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cream mb-2">Approche Partenariale</h3>
                  <p className="text-cream/60 group-hover:text-cream/80 transition-colors">
                    Je travaille AVEC vous, pas seulement POUR vous. Votre succès est mon indicateur de performance.
                  </p>
                </div>
              </div>
            </div>

            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 10 }}
              className="inline-flex items-center gap-2 text-electric-blue font-semibold hover:text-neon-orange transition-colors"
            >
              <span>Découvrir mon parcours complet sur LinkedIn</span>
              <Briefcase size={18} />
            </motion.a>
          </motion.div>

          {/* Social Proof & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-dark-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 lg:p-12 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-neon-orange/5 rounded-2xl -z-10" />
            
            <h3 className="text-2xl font-bold text-cream mb-8 font-display">Ils m'ont fait confiance</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="h-32 relative rounded-xl overflow-hidden cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Default State */}
                  <div className="absolute inset-0 bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:opacity-0">
                    <span className="text-3xl font-bold text-white/30 font-display group-hover:text-white/50 transition-colors">{card.id}</span>
                  </div>

                  {/* Hover State - Detail Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center transform translate-y-4 group-hover:translate-y-0`}>
                    <h4 className="font-bold text-white text-lg mb-1">{card.title}</h4>
                    <p className="text-white/90 text-xs leading-tight">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="p-6 bg-gradient-to-r from-electric-blue to-neon-orange rounded-xl text-dark-bg shadow-neon hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">Disponible pour de nouveaux défis</span>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
              </div>
              <p className="opacity-90 text-sm font-medium">Expertise Freelance / Consultation / Lead Dev</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;