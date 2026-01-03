
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import Home from './pages/Home';
import AppInterface from './pages/AppInterface';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  useEffect(() => {
    // Ensure the dark class is always present for the premium theme
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Router>
      <div className="min-h-screen relative bg-zinc-950 text-zinc-100">
        <AnimatedBackground />
        <Navbar />
        <ScrollToTop />
        
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/app" element={<PageWrapper><AppInterface /></PageWrapper>} />
              <Route path="/how-it-works" element={<PageWrapper><HowItWorks /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>

        <footer className="relative z-10 py-12 px-6 border-t border-zinc-800 text-center">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-500 text-sm">© 2024 Thinklink. Built for the future of learning.</p>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-500 hover:text-blue-500 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-zinc-500 hover:text-blue-500 transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-zinc-500 hover:text-blue-500 transition-colors text-sm">Contact Support</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
