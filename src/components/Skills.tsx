import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Database, Award, ExternalLink, X, ChevronLeft, ChevronRight,
  Layers, Terminal
} from 'lucide-react';
import { TechIcon } from './TechIcons';

const Skills = () => {
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const [currentCertificateIndex, setCurrentCertificateIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filters = ['Tous', 'Langages', 'Frameworks', 'Cloud & DB', 'IA & Outils'];

  // New Categories based on user request & image
  const skillCategories = [
    {
      title: "Langages",
      id: "Langages",
      icon: Code,
      color: "from-pink-500 to-rose-400",
      skills: [
        { name: "JavaScript", color: "text-yellow-400", hasProjects: true },
        { name: "TypeScript", color: "text-blue-500", hasProjects: true },
        { name: "Python", color: "text-green-500", hasProjects: true },
        { name: "HTML/CSS", color: "text-orange-500" }
      ]
    },
    {
      title: "Frameworks & Libs",
      id: "Frameworks",
      icon: Layers,
      color: "from-blue-500 to-cyan-400",
      skills: [
        { name: "React", color: "text-cyan-400", hasProjects: true },
        { name: "React Native", color: "text-blue-400", hasProjects: true },
        { name: "Node.js", color: "text-green-600", hasProjects: true },
        { name: "Next.js", color: "text-white", hasProjects: true },
        { name: "Tailwind", color: "text-cyan-300", hasProjects: true }
      ]
    },
    {
      title: "Bas de Données & Cloud",
      id: "Cloud & DB",
      icon: Database,
      color: "from-green-500 to-emerald-400",
      skills: [
        { name: "Firebase", color: "text-yellow-500", hasProjects: true },
        { name: "PostgreSQL", color: "text-blue-300", hasProjects: true },
        { name: "MySQL", color: "text-blue-500", hasProjects: true },
        { name: "AWS", color: "text-orange-400", hasProjects: true }
      ]
    },
    {
      title: "DevOps, IA & Outils",
      id: "IA & Outils",
      icon: Terminal,
      color: "from-purple-500 to-indigo-400",
      skills: [
        { name: "Git", color: "text-red-500", hasProjects: true },
        { name: "Docker", color: "text-blue-500" },
        { name: "Machine Learning", color: "text-neon-orange", hasProjects: true },
        { name: "Deep Learning", color: "text-purple-500",hasProjects: true },
        { name: "Figma", color: "text-purple-400" },
        { name: "VS Code", color: "text-blue-400", hasProjects: true }
      ]
    }
  ];

  const filteredCategories = activeFilter === 'Tous' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeFilter);

  const certificates = [
    {
      id: 11,
      title: "Participation au Hackathon - DevFest 2025",
      issuer: "GDG Cloud Abidjan & Cocody",
      date: "29 Novembre 2025",
      image: "/certificates/devfest-hackathon-2025.png",
      officialLink: "#",
      description: "Participation active au Hackathon organisé à Abidjan par le GDG Cloud Abidjan & Cocody dans le cadre du DevFest 2025. Ce certificat atteste de l'implication dans le développement de solutions innovantes en un temps record, avec un focus sur les technologies Cloud et l'Intelligence Artificielle."
    },
    {
      id: 7,
      title: "Developing AI Applications with Python and Flask",
      issuer: "IBM (Coursera)",
      date: "26 Octobre 2025",
      image: "/certificates/ai-python-flask.png",
      officialLink: "https://coursera.org/verify/ALVZATWHGUUQ",
      description: "Développement d'applications web intégrant des fonctionnalités d'IA. Utilisation de Python, Flask et des API Watson pour créer des interfaces intelligentes capable de traiter le langage naturel et l'analyse d'images."
    },
    {
      id: 8,
      title: "Introduction to Software Engineering",
      issuer: "IBM (Coursera)",
      date: "13 Octobre 2025",
      image: "/certificates/ibm-software-engineering.png",
      officialLink: "https://coursera.org/verify/1UNDJB3AY1R3",
      description: "Fondamentaux du génie logiciel : cycle de vie du développement (SDLC), méthodologies Agiles/Scrum, et architecture logicielle. Une approche structurée pour concevoir des systèmes robustes et maintenables."
    },
    {
      id: 9,
      title: "Basics of Machine Learning Algorithms",
      issuer: "UniAthena",
      date: "02 Octobre 2025",
      image: "/certificates/basics-machine-learning.png",
      officialLink: "#",
      description: "Compréhension des algorithmes essentiels de Machine Learning supervisé et non supervisé. Étude des mathématiques sous-jacentes et implémentation pratique pour la résolution de problèmes prédictifs."
    },
    {
      id: 4,
      title: "Python for Data Science",
      issuer: "Coursera",
      date: "Septembre 2025",
      image: "/certificates/coursera-artificial-intelligence.jpeg",
      officialLink: "https://coursera.org/share/9c9974286e86aff712f8562696dfd0c6",
      description: "Certificat de reussite du cours Introduction a Intelligence Artificielle IA de IBM, dispense sur Coursera. Cette formation non creditée, validee par IBM, confirme lacquisition des bases fondamentales de lIA et atteste des competences initiales dans ce domaine technologique en pleine expansion."
    },
    {
      id: 6,
      title: "Next.js 15 & React - The Complete Guide",
      issuer: "Udemy",
      date: "24 Août 2025",
      image: "/certificates/nextjs-react-guide.png",
      officialLink: "https://www.udemy.com/share/104cpi3@9Omj6vfXHFCsOY7SyYE5W6qEkVBYSOpM71YAEYrUlGVnI93XFJMBdotOF4ArWQSsOw==/",
      description: "Maîtrise approfondie du framework Next.js 15 (App Router, Server Actions) et de React. Plus de 40 heures de formation couvrant le rendu côté serveur (SSR), l'optimisation des performances et le déploiement fullstack."
    },
    {
      id: 5,
      title: "AWS Certified AI Practitioner (AIF-C01)",
      issuer: "Udemy",
      date: "11 Août 2025",
      image: "/certificates/aws-ai-practitioner.png",
      officialLink: "https://www.udemy.com/share/10bvGH3@OXs7zGk5bPPAR4HmezS1ovPTavIXl2r_zR_iiG6Eho5qU-80SPQ5eh_KgyMvK1Sq2g==/",
      description: "Formation complète sur les concepts fondamentaux de l'IA générative et traditionnelle sur AWS. Couvre l'ingénierie de prompt, les modèles de fondation (Bedrock), la sécurité et l'éthique de l'IA dans le cloud."
    },
    {
      id: 2,
      title: "Front End Development Libraries",
      issuer: "freeCodeCamp",
      date: "5 Août 2025",
      image: "/certificates/freecodecamp-front-end-libraries.png",
      officialLink: "https://freecodecamp.org/certification/AssohounYannick/front-end-development-libraries",
      description: "Certification en bibliothèques de développement front-end de freeCodeCamp, représentant environ 300 heures de travail. Cette certification valide les compétences en React, Redux, Bootstrap et autres bibliothèques modernes pour créer des interfaces utilisateur dynamiques et interactives."
    },
    {
      id: 10,
      title: "Machine Learning Terminology and Process",
      issuer: "AWS Training & Certification",
      date: "30 Juillet 2025",
      image: "/certificates/aws-ml-terminology.png",
      officialLink: "#",
      description: "Fondamentaux du Machine Learning sur AWS : maîtrise de la terminologie clé, des étapes du cycle de vie ML (préparation, entraînement, évaluation) et des services cloud associés."
    },
    {
      id: 3,
      title: "Machine Learning with Python",
      issuer: "freeCodeCamp",
      date: "17 Juillet 2025",
      image: "/certificates/freecodecamp-machine-learning.png",
      officialLink: "https://freecodecamp.org/certification/AssohounYannick/machine-learning-with-python-v7",
      description: "Certification en Machine Learning avec Python de freeCodeCamp, représentant environ 300 heures de travail. Cette certification valide les compétences en intelligence artificielle, algorithmes de machine learning, traitement de données et développement de modèles prédictifs avec Python."
    },
    {
      id: 1,
      title: "Responsive Web Design Developer Certification",
      issuer: "freeCodeCamp",
      date: "16 Juillet 2025",
      image: "/certificates/freecodecamp-responsive-web-design.png",
      officialLink: "https://freecodecamp.org/certification/AssohounYannick/responsive-web-design",
      description: "Certification en design web responsive de freeCodeCamp, représentant environ 300 heures de travail. Cette certification valide les compétences en HTML5, CSS3 et les principes de design adaptatif pour créer des sites web modernes et accessibles sur tous les appareils."
    }
  ];

  // Helper function for navigating certificates
  const nextCertificate = () => setCurrentCertificateIndex((prev) => (prev === certificates.length - 1 ? 0 : prev + 1));
  const prevCertificate = () => setCurrentCertificateIndex((prev) => (prev === 0 ? certificates.length - 1 : prev - 1));
  const openCertificateModal = () => { setIsCertificatesOpen(true); setCurrentCertificateIndex(0); };
  const closeCertificateModal = () => setIsCertificatesOpen(false);

  return (
    <>
      <section id="skills" className="py-20 bg-dark-bg relative overflow-hidden">
        {/* Decorative Background */}
         <div className="absolute top-1/2 left-0 w-64 h-64 bg-neon-orange/10 rounded-full blur-3xl -z-10" />
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-cream mb-6 font-display">
              &lt;<span className="text-electric-blue">Compétences</span>/&gt;
            </h2>
            <p className="text-xl text-cream/70 max-w-3xl mx-auto font-light">
              Ma boîte à outils technologique pour construire le futur.
            </p>
          </motion.div>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-electric-blue text-dark-bg shadow-neon' 
                    : 'bg-dark-card text-cream/60 border border-white/5 hover:border-electric-blue/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <motion.div 
            layout
            className="grid md:grid-cols-2 gap-8 mb-20"
          >
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-dark-card border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 shadow-lg group"
              >
                <div className="flex items-center gap-4 mb-8">
                    <span className={`text-2xl bg-gradient-to-r ${category.color} bg-clip-text text-transparent font-bold font-display`}>
                        {category.title}
                    </span>
                    <div className={`h-px flex-1 bg-gradient-to-r ${category.color} opacity-30`} />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {category.skills.map((skill, sIdx) => (
                        <motion.div
                            key={sIdx}
                            whileHover={{ y: -5 }}
                            className="relative group/skill bg-dark-bg/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center cursor-default hover:bg-white/5 hover:border-white/20 transition-all overflow-hidden"
                        >
                            <span className={`mb-3 transition-transform group-hover/skill:scale-110 duration-300 ${skill.color}`}>
                                <TechIcon name={skill.name} className="w-10 h-10 text-current fill-current" />
                            </span>
                            <span className="text-xs text-cream/80 font-semibold">{skill.name}</span>

                            {/* Project Link Overlay */}
                            {skill.hasProjects && (
                              <motion.a
                                href="#projects"
                                initial={{ opacity: 0, y: 10 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                className="absolute inset-0 bg-electric-blue/90 flex flex-col items-center justify-center p-2 text-dark-bg transition-all opacity-0 group-hover/skill:opacity-100 z-10"
                              >
                                <ExternalLink size={20} className="mb-1" />
                                <span className="text-[10px] font-bold uppercase tracking-tighter text-center">Voir projets</span>
                              </motion.a>
                            )}
                        </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certificates CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openCertificateModal}
                className="bg-dark-card border border-electric-blue/30 text-electric-blue px-8 py-3 rounded-full font-semibold flex items-center space-x-2 mx-auto hover:bg-electric-blue/10 hover:shadow-neon transition-all duration-300"
              >
                <Award size={20} />
                <span>Voir mes  Certifications Officielles</span>
              </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Certificates Modal (Reuse existing modal logic) */}
      <AnimatePresence>
        {isCertificatesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeCertificateModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-card border border-white/10 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
               {/* Image Section */}
               <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-8 relative min-h-[300px]">
                  <img
                    src={certificates[currentCertificateIndex].image}
                    alt={certificates[currentCertificateIndex].title}
                    className="max-w-full max-h-full object-contain shadow-2xl"
                  />
                  
                  {/* Nav Buttons (Overlay on Image for Mobile, Side for Desktop) */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                     <button onClick={prevCertificate} className="p-2 rounded-full bg-black/50 text-white hover:bg-electric-blue hover:text-black transition-colors">
                        <ChevronLeft />
                     </button>
                     <button onClick={nextCertificate} className="p-2 rounded-full bg-black/50 text-white hover:bg-electric-blue hover:text-black transition-colors">
                        <ChevronRight />
                     </button>
                  </div>
               </div>

               {/* Details Section */}
               <div className="w-full md:w-1/2 p-8 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                      <div>
                          <h3 className="text-2xl font-bold text-cream font-display mb-2">{certificates[currentCertificateIndex].title}</h3>
                          <div className="flex gap-2 text-sm">
                             <span className="text-electric-blue font-bold">{certificates[currentCertificateIndex].issuer}</span>
                             <span className="text-cream/40">•</span>
                             <span className="text-cream/60">{certificates[currentCertificateIndex].date}</span>
                          </div>
                      </div>
                      <button onClick={closeCertificateModal} className="text-cream/50 hover:text-white"><X /></button>
                  </div>

                  <p className="text-cream/80 leading-relaxed mb-8 flex-grow">
                      {certificates[currentCertificateIndex].description}
                  </p>

                  <div className="space-y-3 mt-auto">
                      <a 
                        href={certificates[currentCertificateIndex].officialLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-electric-blue text-dark-bg font-bold hover:brightness-110 transition-all"
                      >
                         <ExternalLink size={18} />
                         <span>Vérifier l'authenticité</span>
                      </a>
                      <div className="flex justify-center gap-2 mt-4">
                          {certificates.map((_, i) => (
                              <div 
                                key={i} 
                                onClick={() => setCurrentCertificateIndex(i)}
                                className={`h-2 w-2 rounded-full cursor-pointer transition-all ${i === currentCertificateIndex ? 'bg-electric-blue w-6' : 'bg-white/20 hover:bg-white/40'}`}
                              />
                          ))}
                      </div>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Skills;