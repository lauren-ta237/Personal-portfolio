import { motion } from 'motion/react';
import { ArrowDown, BrainCircuit, Github, Linkedin, Mail, MapPin, Database, Award, Sparkles } from 'lucide-react';
import { portfolioOwner } from '../data';

interface HeroProps {
  onOpenResume: () => void;
  onExploreProjects: () => void;
}

export default function Hero({ onOpenResume, onExploreProjects }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-24 lg:py-32 bg-gradient-to-b from-indigo-50/30 via-slate-50 to-slate-50">
      {/* Visual background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      {/* Floating abstract decorative network nodes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute right-10 bottom-10 w-80 h-80 bg-slate-200/30 rounded-full filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy Column (7 of 12) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            
            {/* Location Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 shadow-xs rounded-full text-xs font-mono font-medium text-slate-600"
            >
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>{portfolioOwner.location}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
              <span className="text-emerald-600 text-[10px] font-semibold uppercase">Open to roles</span>
            </motion.div>

            {/* Title / Name */}
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-indigo-600 font-mono text-xs md:text-sm font-bold tracking-widest uppercase"
              >
                Welcome to my engineering portfolio
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-none"
              >
                Hi, I'm <span className="text-indigo-600 font-semibold">{portfolioOwner.name}</span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl font-sans font-medium text-slate-700 tracking-tight mt-2"
              >
                {portfolioOwner.title}
              </motion.h2>
            </div>

            {/* Micro Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans"
            >
              {portfolioOwner.bio}
            </motion.p>

            {/* Action buttons CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-3.5 pt-2"
            >
              <button
                onClick={onExploreProjects}
                className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-2xl text-xs tracking-wide shadow-md transition-all hover:shadow-lg focus:outline-none"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
              
              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-800 font-semibold rounded-2xl text-xs tracking-wide shadow-xs transition-all hover:border-slate-400 focus:outline-none"
              >
                <span>Generate Professional Resume</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </button>
            </motion.div>

            {/* Quick social bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-5 pt-3 text-slate-400 font-mono text-xs"
            >
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Follow my code:</span>
              <a href={portfolioOwner.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-800 transition-colors flex items-center gap-1 hover:underline">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a href={portfolioOwner.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-800 transition-colors flex items-center gap-1 hover:underline">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </motion.div>

          </div>

          {/* Interactive Graph Animation Column (5 of 12) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full max-w-sm aspect-square bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Glass decorative glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl" />
              
              {/* Animated visual node network */}
              <div className="flex-1 flex flex-col justify-center items-center py-6 relative">
                {/* Visual bounding boxes overlay simulating CV */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed border-indigo-400/40 rounded-full animate-spin [animation-duration:40s]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-dotted border-indigo-300/60 rounded-full animate-spin [animation-duration:20s]" />
                
                {/* Central Brain/AI Icon */}
                <div className="relative z-10 w-16 h-16 bg-indigo-50 border border-indigo-200 text-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 animate-pulse">
                  <BrainCircuit className="w-8 h-8" />
                </div>

                {/* Satellite data nodes */}
                <div className="absolute top-4 left-6 px-2.5 py-1 bg-white border border-slate-200/80 rounded-lg shadow-xs flex items-center gap-1.5 animate-bounce [animation-delay:0.5s]">
                  <Database className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-mono text-[9px] text-slate-600 font-bold">FastAPI / DB</span>
                </div>

                <div className="absolute bottom-6 right-4 px-2.5 py-1 bg-white border border-slate-200/80 rounded-lg shadow-xs flex items-center gap-1.5 animate-bounce [animation-delay:1.2s]">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="font-mono text-[9px] text-slate-600 font-bold">Vision AI</span>
                </div>

                <div className="absolute top-12 right-6 px-2.5 py-1 bg-indigo-900 text-white rounded-lg shadow-md flex items-center gap-1.5 animate-bounce [animation-delay:1.8s]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-[9px] font-bold">Gemini API</span>
                </div>

                <div className="absolute bottom-8 left-4 px-2.5 py-1 bg-white border border-slate-200/80 rounded-lg shadow-xs flex items-center gap-1.5 animate-bounce [animation-delay:0s]">
                  <span className="font-mono text-[9.5px] text-slate-500 font-bold font-mono">React / TS</span>
                </div>
              </div>

              {/* Quick Profile Summary Stats inside card */}
              <div className="border-t border-slate-100 pt-5 mt-auto grid grid-cols-3 gap-2 text-center bg-slate-50/50 -mx-6 -mb-6 p-4 rounded-b-3xl">
                <div>
                  <p className="text-xs text-slate-500 font-mono">Internships</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">2 Programs</p>
                </div>
                <div className="border-x border-slate-200/80">
                  <p className="text-xs text-slate-500 font-mono">Stack Projects</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">4 Enriched</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-mono">Degree Year</p>
                  <p className="text-sm font-bold text-indigo-600 mt-0.5">Final Year</p>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
