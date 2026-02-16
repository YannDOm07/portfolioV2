import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ChevronDown, Download, Monitor, CheckCircle } from 'lucide-react';
import { TextGenerateEffect } from './ui/text-generate-effect';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
         {/* Base Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        {/* Glows */}
        <div className="absolute left-0 right-0 top-0 m-auto h-[310px] w-[310px] rounded-full bg-electric-blue opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 m-auto h-[310px] w-[310px] rounded-full bg-neon-orange opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            whileHover={{ 
              scale: 1.1, 
              rotate: [0, -5, 5, -5, 0],
              transition: { 
                scale: { duration: 0.3 },
                rotate: { duration: 0.6, ease: "easeInOut" }
              }
            }}
            className="mb-8 cursor-pointer"
          >
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-electric-blue to-neon-orange p-[2px] animate-glow hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-shadow duration-300">
              <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center overflow-hidden group">
                <img
                  src="/image.jpeg"
                  alt="Yannick"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </motion.div>

          {/* Name & Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <p className="text-cream/60 text-sm md:text-base font-mono tracking-wider uppercase mb-1">
              Hello, I'm
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 group cursor-default">
              {"Assohoun Yannick".split("").map((char, index) => (
                <motion.span
                  key={index}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    y: [20, 0, 0, 20]
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 2,
                    times: [0, 0.2, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut"
                  }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-cream to-neon-orange group-hover:from-neon-orange group-hover:via-electric-blue group-hover:to-cream transition-all duration-500"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h2>
            <p className="text-cream/70 text-sm md:text-base flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span>
              Étudiant en Licence 3 • Système réseaux informatiques et télécommunications
            </p>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold mb-6 font-display"
          >
            Architecte de Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-orange">
              Web & IA
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-cream/80 mb-8 font-sans font-light"
          >
            J'automatise l'impossible avec <span className="text-electric-blue font-semibold">React</span> & <span className="text-neon-orange font-semibold">Machine Learning</span>
          </motion.p>

          {/* Description */}
          <TextGenerateEffect 
            words="Developpeur spécialisé en création d'applications webs robustes et d'intégrations IA avancées. Je transforme des problèmes complexes en interfaces fluides."
            className="text-lg text-cream/60 mb-8 max-w-2xl mx-auto leading-relaxed md:text-lg text-center"
          />

          {/* Metrics & CV */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12 border-y border-white/10 py-10 lg:py-8 items-center"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-electric-blue mb-1">
                 <CheckCircle size={20} />
                 <span className="text-3xl font-bold text-white font-display">5+</span>
              </div>
              <span className="text-sm text-cream/60 uppercase tracking-wider font-mono">Projets livrés</span>
            </div>
            
            <div className="flex flex-col items-center border-white/10 sm:border-l sm:pl-6">
              <div className="flex items-center gap-2 text-neon-orange mb-1">
                 <Monitor size={20} />
                 <span className="text-3xl font-bold text-white font-display">15+</span>
              </div>
              <span className="text-sm text-cream/60 uppercase tracking-wider font-mono">Technologies</span>
            </div>

            <div className="flex flex-col items-center justify-center sm:col-span-2 lg:col-span-1 border-white/10 lg:border-l lg:pl-6 pt-6 lg:pt-0">
               <motion.a 
                 href="/cv-yannick.pdf" // TODO: Add real CV path
                 download
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="flex items-center gap-2 px-6 py-2 rounded-full border border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-dark-bg transition-colors font-semibold shadow-neon hover:shadow-lg"
               >
                 <Download size={18} />
                 <span>Télécharger CV</span>
               </motion.a>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 212, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-electric-blue to-neon-orange text-dark-bg px-8 py-4 rounded-full font-bold flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
            >
              <Calendar size={20} />
              <span>Discutons de votre projet</span>
            </motion.a>

            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-8 py-4 rounded-full font-semibold flex items-center space-x-2 text-cream hover:bg-white/10 transition-all duration-300"
            >
              <span>Voir mon parcours</span>
              <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
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
      </div>
    </section>
  );
};

export default Hero;
