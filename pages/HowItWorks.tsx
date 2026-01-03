
import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Brain, GraduationCap, ChevronRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Upload className="w-10 h-10 md:w-12 md:h-12 text-blue-500" />,
      title: "1. Upload Content",
      description: "Paste raw lecture notes or upload PDFs and images. Thinklink analyzes the structure and core themes automatically."
    },
    {
      icon: <Brain className="w-10 h-10 md:w-12 md:h-12 text-indigo-500" />,
      title: "2. Select Mode",
      description: "Choose from modes like Flashcards, Quizzes, or Summaries. Tailor the architecture to your specific goals."
    },
    {
      icon: <GraduationCap className="w-10 h-10 md:w-12 md:h-12 text-purple-500" />,
      title: "3. Reach Mastery",
      description: "Review your generated guide. Our AI ensures that complex topics are simplified without losing depth."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 md:mb-24"
      >
        <h1 className="text-4xl md:text-7xl font-serif mb-6 text-white leading-tight">The Path to <span className="italic text-blue-500">Mastery</span></h1>
        <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto">Three simple phases to transform your data into intelligence.</p>
      </motion.div>

      <div className="space-y-16 md:space-y-32">
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-20`}
          >
            <div className="flex-1 flex justify-center w-full">
              <div className="w-40 h-40 md:w-64 md:h-64 rounded-[40px] md:rounded-full bg-zinc-900 border border-zinc-800 shadow-2xl flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-blue-500/5 rounded-[40px] md:rounded-full blur-2xl group-hover:blur-3xl transition-all" />
                {step.icon}
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-serif mb-4 md:mb-6 text-white">{step.title}</h2>
              <p className="text-sm md:text-lg text-zinc-400 leading-relaxed mb-6">{step.description}</p>
              <div className="inline-flex items-center gap-2 text-blue-500 font-bold group cursor-pointer text-sm">
                Get Started <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
