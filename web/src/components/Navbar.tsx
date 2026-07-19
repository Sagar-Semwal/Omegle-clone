"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function Navbar({show}:{show:boolean}) {
  if(!show){
    return null
  }
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50
                 bg-zinc-950/70
                 backdrop-blur-xl
                 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>

          <span className="text-white font-semibold text-lg tracking-tight">
            WeTalk
          </span>
        </div>
      </div>
    </motion.nav>
  );
}