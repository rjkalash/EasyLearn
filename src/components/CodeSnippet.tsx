"use client";
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CodeSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="relative group bg-[#0d1117] dark:bg-gray-950 rounded-xl border border-gray-800/80 shadow-2xl overflow-hidden mt-2">
      {/* Mac-style Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] dark:bg-gray-900 border-b border-gray-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm"></div>
        </div>
        
        <button
          onClick={handleCopy}
          className="px-2 py-1 -mr-2 rounded text-gray-400 hover:text-emerald-400 hover:bg-white/5 transition-all flex items-center justify-center min-w-[75px]"
          aria-label="Copy code"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div 
                key="check" 
                initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.5 }} 
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1.5"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">Copied!</span>
              </motion.div>
            ) : (
              <motion.div 
                key="copy" 
                initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.5 }} 
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1.5 group-hover:text-gray-300"
              >
                <Copy className="w-4 h-4" />
                <span className="text-xs font-medium">Copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      
      {/* Code Payload Window */}
      <div className="p-4 md:p-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <pre className="text-emerald-400 font-mono text-sm leading-relaxed m-0 whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  );
}
