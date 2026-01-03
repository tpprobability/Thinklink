
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart, BookOpen } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-20 overflow-x-hidden">
      <section className="relative px-6 py-16 md:py-24 flex flex-col items-center text-center max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/20 border border-blue-800 text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-widest"
        >
          <Sparkles className="w-3.5 h-3.5" />
          The future of studying is here
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-8xl font-serif mb-6 md:mb-8 leading-[1.2] md:leading-[1.1] tracking-tight text-white px-2"
        >
          Elevate Your Mind. <br className="hidden md:block" />
          <span className="italic text-blue-400">Effortlessly.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 px-4 md:px-0 leading-relaxed"
        >
          Thinklink transforms scattered notes into structured, cinematic study experiences. No paywalls. No ads. Powered by intelligence. Supported by you.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-10 sm:px-0"
        >
          <Link 
            to="/app"
            className="group px-8 py-4 bg-white text-zinc-950 font-bold rounded-2xl flex items-center justify-center gap-2 hover:shadow-2xl hover:scale-105 transition-all text-sm md:text-base"
          >
            Start Learning
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/about"
            className="px-8 py-4 bg-zinc-800/50 backdrop-blur-xl border border-zinc-700 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all text-sm md:text-base text-center"
          >
            Our Mission
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="mt-16 md:mt-24 w-full max-w-5xl aspect-[16/10] md:aspect-video rounded-[32px] md:rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden relative group mx-4"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-10 md:opacity-20 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 cursor-pointer hover:scale-110 transition-all">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { icon: <ShieldCheck className="w-7 h-7 md:w-8 md:h-8 text-blue-500" />, title: "Privacy First", text: "Your notes are your intellectual property. We process them and forget them instantly." },
            { icon: <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-indigo-500" />, title: "Academic Rigor", text: "Advanced AI models trained to synthesize information without losing crucial nuances." },
            { icon: <Heart className="w-7 h-7 md:w-8 md:h-8 text-rose-500" />, title: "Community Driven", text: "Inspired by the Wikipedia model. Free forever, sustained by voluntary contributions." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[32px] bg-zinc-900/40 backdrop-blur-lg border border-zinc-800 hover:border-blue-500/50 transition-all flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl md:text-2xl font-serif mb-3 text-white">{item.title}</h3>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
