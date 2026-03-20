import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, User, Briefcase, Mail, Zap } from 'lucide-react';
import { FloatingDock } from './ui/floating-dock';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Accueil', href: '#home', icon: <Code className="w-full h-full" /> },
    { title: 'À propos', href: '#about', icon: <User className="w-full h-full" /> },
    { title: 'Projets', href: '#projects', icon: <Briefcase className="w-full h-full" /> },
    { title: 'Lab', href: '#lab', icon: <Zap className="w-full h-full" /> },
    { title: 'Contact', href: '#contact', icon: <Mail className="w-full h-full" /> },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-bg/90 backdrop-blur-md border-b border-dark-border' : 'bg-transparent'
      }`}
    >
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-electric-blue to-neon-orange origin-left"
        style={{ scaleX: scrollProgress, width: '100%' }}
      />
      <nav className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 xl:px-20 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-display font-bold text-electric-blue"
          >
            yannick<span className="text-neon-orange">dev</span>.tech
          </motion.div>

          {/* Desktop & Tablet Navigation */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-dark-card/50 border border-dark-border rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] md:text-xs text-cream/70 font-mono uppercase tracking-wider">Available</span>
            </div>
            <FloatingDock items={navItems} />
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;