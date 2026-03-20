import { motion } from 'framer-motion';
import { Heart, Code, Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-dark-border py-12">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 xl:px-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="text-3xl font-mono font-bold text-electric-blue mb-4">
              yannick<span className="text-neon-orange">dev</span>.tech
            </div>
            <p className="text-cream/70 max-w-2xl mx-auto">
              Développeur passionné créant des solutions innovantes qui allient technologie et créativité.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-2 text-cream/60 mb-6"
          >
            <span>Fait avec</span>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span>et beaucoup de</span>
            <Coffee size={16} className="text-neon-orange" />
            <span>par Yannick</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-4 text-sm text-cream/50"
          >
            <div className="flex items-center space-x-2">
              <Code size={16} className="text-electric-blue" />
              <span>React + Tailwind CSS</span>
            </div>
            <span>•</span>
            <span>© 2026 YannickDev.tech</span>
            <span>•</span>
            <span>Tous droits réservés</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-8 pt-8 border-t border-dark-border"
          >
            <p className="text-xs text-cream/40">
              "La technologie n'est rien. L'important, c'est d'avoir confiance en les gens." - Steve Jobs
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;