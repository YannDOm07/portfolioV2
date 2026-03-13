import React, { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import InteractiveBackground from './components/InteractiveBackground';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Lab = lazy(() => import('./components/Lab'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-dark-bg">
    <div className="w-16 h-16 border-4 border-electric-blue border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-cream font-sans selection:bg-electric-blue selection:text-white">
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#0a0a0c',
          color: '#f8f8f2',
          border: '1px solid rgba(0, 212, 255, 0.2)',
        },
      }} />
      <CustomCursor />
      <InteractiveBackground />
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Lab />
          <Contact />
        </main>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
