import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Github, Linkedin, Calendar, Send, MapPin, Phone } from 'lucide-react';
import { IconBrandDiscord } from '@tabler/icons-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ⚠️ IMPORTANT : Remplacez ces valeurs par les vôtres depuis votre tableau de bord EmailJS
  const SERVICE_ID = 'service_slwdstl'; // ID de votre service (connecté à Gmail)
  const TEMPLATE_ID = 'template_748cxnb'; // ID de votre modèle d'email
  const PUBLIC_KEY = 'jCs3IAOKPJaVLJCI3'; // Votre clé publique

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formRef.current) return;

    emailjs.sendForm(
      SERVICE_ID,
      TEMPLATE_ID,
      formRef.current,
      PUBLIC_KEY
    )
    .then(() => {
      toast.success('Message envoyé avec succès ! Je vous répondrai sur ' + formData.email);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    })
    .catch((error) => {
      console.error('Erreur EmailJS:', error);
      toast.error('Erreur lors de l\'envoi. Vérifiez les clés EmailJS ou réessayez plus tard.');
      setIsSubmitting(false);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'yannickassohoun@gmail.com',
      action: 'Envoyer un email',
      color: 'from-blue-500 to-cyan-500',
      href: 'mailto:yannickassohoun@gmail.com'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Réponse rapide garantie',
      action: 'Ouvrir WhatsApp',
      color: 'from-green-500 to-emerald-500',
      href: 'https://wa.me/2250779880141'
    },
    {
      icon: Calendar,
      title: 'Calendly',
      description: 'Planifier un appel',
      action: 'Réserver un créneau',
      color: 'from-purple-500 to-pink-500',
      href: 'https://calendly.com/YannickAssohoun' // <-- Remplace par ton vrai lien Calendly
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/YannDOm07',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/',
      color: 'hover:text-blue-400'
    },
    {
      icon: IconBrandDiscord,
      name: 'Discord',
      href: 'https://discord.com/users/yannicklastar', // Placeholder or ask user
      color: 'hover:text-[#5865F2]'
    },
    {
      icon: MessageCircle,
      name: 'WhatsApp',
      href: 'https://wa.me/2250779880141',
      color: 'hover:text-green-400'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-dark-card/30">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-6 font-inter">
            Restons en <span className="text-electric-blue">Contact</span>
          </h2>
          <p className="text-xl text-cream/70 max-w-3xl mx-auto">
            Un projet en tête ? Une collaboration à explorer ? N'hésitez pas à me contacter !
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-cream mb-6 font-inter">
                Moyens de contact
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.href}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="block bg-dark-card border border-dark-border rounded-xl p-6 hover:border-electric-blue/30 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${method.color}`}>
                        <method.icon size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-cream mb-1">
                          {method.title}
                        </h4>
                        <p className="text-cream/70 text-sm mb-2">
                          {method.description}
                        </p>
                        <span className="text-electric-blue text-sm font-semibold">
                          {method.action} →
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-bold text-cream mb-4 font-inter">
                Suivez-moi
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-dark-card border border-dark-border rounded-lg text-cream ${social.color} transition-all duration-300 hover:border-electric-blue/30`}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-r from-electric-blue/10 to-neon-orange/10 border border-electric-blue/20 rounded-xl p-6">
              <h4 className="text-lg font-bold text-cream mb-4 font-inter">
                Informations rapides
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <MapPin size={16} className="text-electric-blue" />
                  <span className="text-cream/70">Disponible pour projets à distance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-electric-blue" />
                  <span className="text-cream/70">Réponse sous 24h garantie</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar size={16} className="text-electric-blue" />
                  <span className="text-cream/70">Ouvert aux missions freelance</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-dark-card border border-dark-border rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-cream mb-6 font-inter">
              Envoyez-moi un message
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-cream/70 text-sm font-medium mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-cream placeholder-cream/50 focus:border-electric-blue focus:outline-none transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-cream/70 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-cream placeholder-cream/50 focus:border-electric-blue focus:outline-none transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-cream/70 text-sm font-medium mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-cream placeholder-cream/50 focus:border-electric-blue focus:outline-none transition-colors"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label className="block text-cream/70 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-cream placeholder-cream/50 focus:border-electric-blue focus:outline-none transition-colors resize-none"
                  placeholder="Décrivez votre projet ou votre demande..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-electric-blue to-neon-orange text-dark-bg py-4 px-8 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark-bg"></div>
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Envoyer le message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;