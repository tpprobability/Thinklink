
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'App', path: '/app' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-xl bg-black/40 border-b border-white/5"
      >
        <Link to="/" className="flex items-center gap-2 group z-50">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight text-white font-serif italic">Thinklink</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`relative text-sm font-medium transition-colors hover:text-blue-400 ${
                location.pathname === link.path ? 'text-blue-400' : 'text-zinc-400'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="navUnderline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/app"
            className="hidden sm:block px-5 py-2 bg-white text-zinc-950 text-sm font-bold rounded-full hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            Get Started
          </Link>
          
          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-50 p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-2xl flex flex-col pt-32 px-10 gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  to={link.path} 
                  onClick={closeMenu}
                  className={`text-4xl font-serif italic ${
                    location.pathname === link.path ? 'text-blue-500' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Link 
                to="/app"
                onClick={closeMenu}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl"
              >
                Open Workspace
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
