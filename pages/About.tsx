
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-blue-500 font-bold tracking-widest uppercase text-xs">Our Mission</span>
        <h1 className="text-5xl font-serif mt-4 mb-8 text-white italic">Democratizing Intelligence.</h1>
        <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
          We believe high-quality education tools should be available to everyone. Thinklink is built on the principle that knowledge is a human right.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 rounded-[32px] bg-zinc-900/40 backdrop-blur-xl border border-zinc-800"
        >
          <h2 className="text-2xl font-serif mb-6 text-white">Why Free?</h2>
          <p className="text-zinc-400 leading-relaxed">
            Premium learning tools are often locked behind expensive subscriptions. We're choosing the Wikipedia model—no ads, no data selling, just pure utility.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-[32px] bg-zinc-900/40 backdrop-blur-xl border border-zinc-800"
        >
          <h2 className="text-2xl font-serif mb-6 text-white">How it works?</h2>
          <p className="text-zinc-400 leading-relaxed">
            Thinklink operates on voluntary donations. If you find value in the service and can afford to help, your contribution keeps us alive for everyone else.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden p-12 rounded-[40px] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl"
      >
        <div className="relative z-10 max-w-2xl">
          <Heart className="w-12 h-12 mb-6 text-blue-200" />
          <h2 className="text-4xl font-serif mb-6">Support Open Education</h2>
          <p className="text-blue-100 text-lg mb-10 leading-relaxed">
            Every donation helps us cover AI processing costs. Join the movement to keep advanced study tools free for students everywhere.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['$3', '$10', '$25', 'Custom'].map((amt) => (
              <button key={amt} className="py-3 px-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-blue-900 font-bold transition-all">
                {amt}
              </button>
            ))}
          </div>
          <button className="mt-8 w-full py-4 rounded-2xl bg-white text-zinc-950 font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all">
            Support Thinklink
          </button>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="mt-24 pt-12 border-t border-zinc-800 flex flex-col items-center">
        <h3 className="text-2xl font-serif mb-8 text-white">Stay Connected</h3>
        <div className="flex gap-8">
          {[
            { icon: <Twitter />, label: "X / Twitter" },
            { icon: <Github />, label: "GitHub" },
            { icon: <Mail />, label: "Contact" }
          ].map((social, i) => (
            <a key={i} href="#" className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                {social.icon}
              </div>
              <span className="text-xs font-medium text-zinc-500">{social.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
