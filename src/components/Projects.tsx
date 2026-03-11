import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Brain, Zap, Gamepad2, ArrowUpRight, Users, Car } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import VideoModal from './VideoModal';

const Projects = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({ src: '', title: '' });
  const projects = [
    {
      id: 1,
      title: "EcoSmart - Optimisation Énergétique IA",
      category: "IoT & IA",
      problem: "Gaspillage énergétique domestique invisible pour l'utilisateur.",
      solution: "Analyse prédictive des habitudes de consommation via TensorFlow.",
      result: "Économie moyenne de 15% sur la facture d'électricité.",
      image: "https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["WebSocket", "TensorFlow", "React.js", "TypeScript", "Firebase","Python"],
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      liveUrl: "#",
      githubUrl: "https://github.com/YannDOm07/EnergieApp",
      readTime: "7 min read"
    },
    {
      id: 2,
      title: "Resumind - AI Resume Analyzer",
      category: "IA & Recrutement",
      problem: "Manque de feedback objectif sur les CV et suivi chaotique des candidatures.",
      solution: "Analyse intelligente par IA pour scorer les CV et tracker d'offres intégré.",
      result: "Optimisation de 100% des CV pour les ATS et suivi centralisé.",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React.js", "Gemini API", "Tailwind", "Puter.js"],
      icon: Brain,
      color: "from-purple-500 to-indigo-500",
      liveUrl: "https://ai-resume-analyzer-blue-two.vercel.app/",
      githubUrl: "https://github.com/YannDOm07/ai-resume-analyzer",
      readTime: "Live Demo"
    },
    {
      id: 3,
      title: "Neural RPS - Jeu Cognitif",
      category: "Expérience Web",
      problem: "Les jeux contre l'ordinateur sont souvent prévisibles.",
      solution: "IA qui apprend les patterns du joueur en temps réel (Markov Chain).",
      result: "Taux de victoire de l'IA > 60% après 20 coups.",
      image: "https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Python", "Machine Learning", "HTML5", "CSS3"],
      icon: Gamepad2,
      color: "from-purple-500 to-pink-500",
      liveUrl: "https://freecodecam-boilerplate-x4qwgyevv8l.ws-eu120.gitpod.io/",
      githubUrl: "",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "Demo*tok ci - Démocratie Connectée",
      category: "Civic Tech",
      problem: "Difficulté pour la jeunesse de s'insérer dans la vie démocratique.",
      solution: "Plateforme interactive pour connecter les jeunes aux processus décisionnels.",
      result: "Engagement citoyen accru via des outils numériques accessibles.",
      image: "https://images.pexels.com/photos/4669141/pexels-photo-4669141.jpeg?auto=compress&cs=tinysrgb&w=800", // Generic crowd/youth/tech image
      technologies: ["Next.js", "Node.js", "Socket.io", "MongoDB"],
      icon: Users,
      color: "from-blue-500 to-teal-500",
      liveUrl: "#",
      readTime: "Demo Video",
      videoSrc: "/videos/demotok-demo.mp4"
    },
    {
      id: 5,
      title: "AutoWash CI - Gestion Premium",
      category: "SaaS & Gestion",
      problem: "Suivi client inefficace et processus de paiement lourds dans les stations de lavage.",
      solution: "Application complète de gestion avec espace client, tableau de bord admin et POS intuitif.",
      result: "Digitalisation à 100% des workflows et expérience client améliorée.",
      image: "https://images.pexels.com/photos/372810/pexels-photo-372810.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React.js", "Node.js", "Tailwind CSS", "MySQL", "UI Premium"],
      icon: Car,
      color: "from-cyan-400 to-blue-500",
      liveUrl: "#",
      githubUrl: "https://github.com/YannDOm07/autowash-ci",
      readTime: "Demo Video",
      videoSrc: "/videos/autowash-demo.mp4"
    }
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-electric-blue font-mono text-sm tracking-wider uppercase">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold text-cream mt-2 mb-6 font-display">
            Sélection de <span className="text-neon-orange">Travaux</span>
          </h2>
          <p className="text-xl text-cream/70 max-w-3xl mx-auto font-light">
            Défilez pour explorer mes projets en 3D
          </p>
        </motion.div>

        {/* Horizontal Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-10 gap-8 snap-x snap-mandatory px-4 md:px-0 scrollbar-hide -mx-4 md:mx-0"
          style={{ scrollBehavior: 'smooth' }}
        >
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="snap-center shrink-0 w-[90vw] md:w-auto"
            >
              <CardContainer className="inter-var">
                <CardBody className="bg-dark-bg/60 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-white/10 w-full md:w-[28rem] h-auto rounded-xl p-6 border backdrop-blur-md">
                  
                  {/* Category & Title */}
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-cream dark:text-white mb-4"
                  >
                    <div className="flex justify-between items-start w-full mb-2">
                       <span className={`text-transparent bg-clip-text bg-gradient-to-r ${project.color} text-sm font-mono tracking-wider`}>
                         {project.category}
                       </span>
                       <project.icon className="text-cream/80 w-5 h-5" />
                    </div>
                    {project.title}
                  </CardItem>

                  {/* Problem & Solution (Restored) */}
                  <CardItem
                    as="div"
                    translateZ="60"
                    className="text-cream/70 text-sm max-w-sm mt-2 space-y-2 mb-4"
                  >
                   <p><strong className="text-white">Problème:</strong> {project.problem}</p>
                   <p><strong className="text-white">Solution:</strong> {project.solution}</p>
                  </CardItem>

                  {/* Image */}
                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src={project.image}
                      height="1000"
                      width="1000"
                      className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={project.title}
                    />
                  </CardItem>

                  {/* Result/Impact */}
                  <CardItem
                    translateZ="40"
                    className="mt-6 text-cream/80 text-sm italic border-l-2 border-electric-blue pl-3"
                  >
                    "{project.result}"
                  </CardItem>

                  {/* Technologies */}
                  <CardItem translateZ="30" className="flex flex-wrap gap-2 mt-6">
                    {project.technologies.slice(0, 4).map((tech, techIdx) => (
                      <span key={techIdx} className="px-2 py-1 rounded bg-white/5 text-xs text-cream/70 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </CardItem>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-8">
                    <CardItem
                      translateZ="20"
                      as="a"
                      href={project.githubUrl}
                      target="_blank"
                      className="px-4 py-2 rounded-xl text-xs font-normal text-cream hover:text-white flex items-center gap-2"
                    >
                      <Github size={16} /> Code
                    </CardItem>

                    {project.readTime === "Demo Video" ? (
                      <CardItem
                        translateZ="20"
                        as="button"
                        className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-2 hover:bg-red-700 transition-colors shadow-lg animate-pulse"
                        onClick={() => {
                          setSelectedVideo({ 
                            src: project.videoSrc || '/videos/demotok-demo.mp4', 
                            title: project.title 
                          });
                          setIsVideoModalOpen(true);
                        }}
                      >
                         Voir la démo <Zap size={16} />
                      </CardItem>
                    ) : (
                      <CardItem
                        translateZ="20"
                        as="a"
                        href={project.liveUrl}
                        target="_blank"
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-electric-blue to-neon-orange text-dark-bg text-xs font-bold flex items-center gap-2 hover:shadow-lg transition-shadow"
                      >
                        Voir le projet <ArrowUpRight size={16} />
                      </CardItem>
                    )}
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="text-center mt-10"
         >
           <a
             href="https://github.com/YannDOm07"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all group"
           >
             <span className="text-cream">Explorer tout le labo</span>
             <ArrowUpRight className="text-electric-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </a>
         </motion.div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc={selectedVideo.src}
        title={selectedVideo.title}
      />
    </section>
  );
};

export default Projects;