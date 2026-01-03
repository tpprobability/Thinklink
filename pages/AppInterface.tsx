
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Trash2, Loader2, Sparkles, BookOpen, Brain, Image as ImageIcon, FileCode, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { StudyMode, FileMetadata } from '../types';
import { generateStudyGuide, FilePart } from '../services/geminiService';

const AppInterface: React.FC = () => {
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<(FileMetadata & { part?: FilePart })[]>([]);
  const [activeMode, setActiveMode] = useState<StudyMode>(StudyMode.SUMMARY);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const readFileAsBase64 = (file: File): Promise<FilePart> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve({
          inlineData: {
            data: base64,
            mimeType: file.type || 'application/octet-stream'
          }
        });
      };
      reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
      reader.readAsDataURL(file);
    });
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
      reader.readAsText(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFiles = e.target.files;
    if (!rawFiles || rawFiles.length === 0) return;
    
    setIsProcessingFiles(true);
    setError(null);

    const fileList = Array.from(rawFiles) as File[];
    const newProcessedFiles: (FileMetadata & { part?: FilePart })[] = [];

    for (const file of fileList) {
      try {
        const id = Math.random().toString(36).substr(2, 9);
        
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
          const part = await readFileAsBase64(file);
          newProcessedFiles.push({
            id,
            name: file.name,
            type: file.type,
            size: file.size,
            part
          });
        } 
        else {
          const content = await readFileAsText(file);
          newProcessedFiles.push({
            id,
            name: file.name,
            type: file.type,
            size: file.size,
            content
          });
        }
      } catch (err: any) {
        console.error(err);
        setError(`Error processing ${file.name}: ${err.message}`);
      }
    }

    setFiles(prev => [...prev, ...newProcessedFiles]);
    setIsProcessingFiles(false);
    e.target.value = '';
  };

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const startGeneration = async () => {
    if (!notes.trim() && files.length === 0) {
      setError("Please input some notes or upload a document to begin synthesis.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const fileParts = files.filter(f => f.part).map(f => f.part!);
      const textFromFiles = files
        .filter(f => f.content)
        .map(f => `[Source: ${f.name}]\n${f.content}`)
        .join('\n\n');

      const combinedText = notes + (textFromFiles ? `\n\n${textFromFiles}` : '');

      const output = await generateStudyGuide(activeMode, combinedText, fileParts);
      setResult(output);
      
      // Auto-scroll to results on mobile
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          document.getElementById('guide-output')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err: any) {
      setError(err.message || "Synthesizer failed. Try again with a shorter request.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getFileIcon = (type: string, name: string) => {
    if (type === 'application/pdf') return <FileText className="w-4 h-4 text-red-500" />;
    if (type.startsWith('image/')) return <ImageIcon className="w-4 h-4 text-emerald-500" />;
    return <FileCode className="w-4 h-4 text-blue-500" />;
  };

  const modeButtons = useMemo(() => Object.values(StudyMode).map((mode) => (
    <button
      key={mode}
      onClick={() => setActiveMode(mode)}
      className={`flex-none md:flex-1 px-4 py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap ${
        activeMode === mode 
          ? 'bg-zinc-700 shadow-md text-blue-400' 
          : 'text-zinc-500 hover:text-zinc-300'
      }`}
    >
      {mode}
    </button>
  )), [activeMode]);

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-12 px-4 sm:px-6 max-w-[1600px] mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:h-[calc(100vh-100px)]">
      {/* Input Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6 h-[450px] lg:h-full"
      >
        <div className="flex-1 flex flex-col p-5 md:p-6 rounded-[28px] md:rounded-[32px] bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 shadow-sm overflow-hidden will-change-transform">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-serif text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Workspace
            </h2>
            <label className={`cursor-pointer px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] md:text-xs font-bold transition-all flex items-center gap-2 ${isProcessingFiles ? 'bg-zinc-800 animate-pulse' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'}`}>
              {isProcessingFiles ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
              {isProcessingFiles ? 'Reading...' : 'Add Data'}
              <input type="file" multiple className="hidden" onChange={handleFileUpload} accept="image/*,application/pdf,.txt,.md" />
            </label>
          </div>

          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Type notes or drop files..."
            className="flex-1 bg-transparent border-none resize-none focus:ring-0 text-base md:text-lg leading-relaxed text-zinc-200 placeholder:text-zinc-700 custom-scrollbar"
          />

          <AnimatePresence>
            {files.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex flex-wrap gap-2 p-2 bg-zinc-800/20 rounded-2xl max-h-[80px] md:max-h-[120px] overflow-y-auto custom-scrollbar border border-zinc-700/50"
              >
                {files.map(file => (
                  <motion.div 
                    layout
                    key={file.id}
                    className="flex items-center gap-2 px-2 md:px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-lg md:rounded-xl shadow-sm group"
                  >
                    {getFileIcon(file.type, file.name)}
                    <span className="text-[10px] font-bold text-zinc-400 truncate max-w-[80px]">{file.name}</span>
                    <button onClick={() => removeFile(file.id)} className="p-1 opacity-60 group-hover:opacity-100 hover:text-red-500 transition-all">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-4 md:hidden">
            <button 
              onClick={startGeneration}
              disabled={isGenerating || isProcessingFiles}
              className="w-full py-4 rounded-2xl bg-white text-zinc-950 font-bold flex items-center justify-center gap-2 text-sm"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Generate Mastery Guide
            </button>
          </div>
        </div>
      </motion.div>

      {/* Output Panel */}
      <motion.div 
        id="guide-output"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6 h-[500px] lg:h-full overflow-hidden"
      >
        <div className="flex-1 flex flex-col p-5 md:p-6 rounded-[28px] md:rounded-[32px] bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 shadow-sm overflow-hidden h-full will-change-transform">
          {/* Mode selector with scroll indicators for mobile */}
          <div className="relative mb-6">
            <div className="flex flex-nowrap lg:flex-wrap gap-1 p-1 bg-zinc-800/50 rounded-2xl overflow-x-auto no-scrollbar scroll-smooth">
              {modeButtons}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-900/40 to-transparent pointer-events-none md:hidden" />
          </div>

          <div className="flex-1 relative overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="mb-4 md:mb-6 p-4 md:p-5 bg-blue-900/10 rounded-full"
                  >
                    <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-blue-500" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-2 italic">Thinklink is architecting...</h3>
                  <p className="text-zinc-400 text-xs md:text-sm max-w-[300px] leading-relaxed">
                    Synthesizing your data into a cinematic learning experience.
                  </p>
                </motion.div>
              ) : result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full overflow-y-auto pr-2 md:pr-4 custom-scrollbar"
                >
                  <div className="prose prose-invert prose-zinc max-w-none pb-20 leading-relaxed text-zinc-300 text-sm md:text-base">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-30 grayscale"
                >
                  <Brain className="w-16 h-16 md:w-20 md:h-20 text-zinc-600 mb-6" />
                  <h3 className="text-xl md:text-2xl font-serif italic mb-2 text-white">Canvas Awaiting</h3>
                  <p className="text-xs md:text-sm font-medium text-zinc-400">Transform your notes into mastery.</p>
                  <div className="mt-8 md:hidden text-[10px] text-zinc-500 animate-bounce">
                    <ChevronDown className="w-4 h-4 mx-auto" />
                    Fill your notebook above
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Footer Action */}
          <div className="hidden md:block mt-6 pt-4 border-t border-zinc-800">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4 p-4 bg-red-900/10 border border-red-900/30 rounded-2xl text-red-400 text-xs text-center font-bold"
              >
                {error}
              </motion.div>
            )}
            <button 
              onClick={startGeneration}
              disabled={isGenerating || isProcessingFiles}
              className={`w-full py-5 rounded-[24px] flex items-center justify-center gap-3 text-xl font-bold transition-all shadow-xl group overflow-hidden relative ${
                isGenerating || isProcessingFiles
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-white text-zinc-950 hover:shadow-2xl hover:translate-y-[-2px] active:translate-y-0'
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                {isGenerating ? "Processing Mastery..." : isProcessingFiles ? "Reading Files..." : "Generate Mastery Guide"}
                {!isGenerating && !isProcessingFiles && <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
              </span>
              {!isGenerating && !isProcessingFiles && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AppInterface;
