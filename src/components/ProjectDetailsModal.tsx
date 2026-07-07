import { motion, AnimatePresence } from 'motion/react';
import { X, Github, ExternalLink, ShieldCheck, Cpu, Code2, Sparkles, TrendingUp, Layers, Award } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md cursor-zoom-out"
          />

          {/* Full-screen Sliding Bottom Sheet Container */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="fixed inset-x-0 bottom-0 top-6 md:top-12 z-50 flex flex-col bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 overflow-hidden"
          >
            {/* Grab handle for bottom sheet design */}
            <div className="flex justify-center items-center py-3 bg-slate-50 border-b border-slate-100 relative shrink-0">
              <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
              <button
                onClick={onClose}
                className="absolute right-4 p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-full transition-colors focus:outline-none"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Project Sheet Content */}
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10">
              <div className="max-w-5xl mx-auto">
                
                {/* Header Info */}
                <div className="border-b border-slate-100 pb-6 mb-8">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-mono font-semibold tracking-wider uppercase rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {project.category === 'ai' && 'Artificial Intelligence'}
                      {project.category === 'backend' && 'Backend Architecture'}
                      {project.category === 'frontend' && 'Frontend Engineering'}
                      {project.category === 'fullstack' && 'Full Stack Solution'}
                    </span>
                    {project.githubUrl && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                        <Github className="w-3.5 h-3.5" /> Public Source
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-none mb-4">
                    {project.title}
                  </h2>
                  <p className="text-lg md:text-xl text-indigo-600/90 font-medium">
                    {project.subtitle}
                  </p>
                </div>

                {/* Metrics Banner (if any) */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-between">
                        <div>
                          <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">{metric.label}</p>
                          <p className="text-2xl font-display font-bold text-slate-900 mt-1">{metric.value}</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-indigo-50/50 text-indigo-600">
                          {idx === 0 && <TrendingUp className="w-5 h-5" />}
                          {idx === 1 && <ShieldCheck className="w-5 h-5" />}
                          {idx === 2 && <Cpu className="w-5 h-5" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Grid Layout for details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  
                  {/* Left Section: Context & Features (Large) */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    <div>
                      <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <Code2 className="w-4 h-4 text-indigo-500" /> Project Description
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-4 whitespace-pre-line">
                        {project.longDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-indigo-500" /> Key Architectures & Features
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.keyFeatures.map((feat, idx) => (
                          <li key={idx} className="flex gap-3 p-3 bg-indigo-50/20 hover:bg-indigo-50/40 rounded-xl border border-indigo-100/50 transition-colors">
                            <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-mono text-xs font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="text-slate-700 text-sm leading-relaxed">
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project.achievements && project.achievements.length > 0 && (
                      <div>
                        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-indigo-500" /> Key Achievements
                        </h3>
                        <div className="space-y-3 bg-slate-50/50 border border-slate-200/50 rounded-2xl p-5">
                          {project.achievements.map((ach, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              <p className="text-slate-700 text-sm leading-relaxed">
                                {ach}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Right Section: Technical Stack & Meta */}
                  <div className="space-y-6">
                    
                    {/* Action Links */}
                    <div className="flex flex-col gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-5 py-3.5 font-medium rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                        >
                          <Github className="w-4.5 h-4.5" />
                          <span>View on GitHub</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-60 ml-0.5" />
                        </a>
                      )}
                      
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 w-full px-5 py-3.5 font-medium rounded-xl text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                        >
                          <ExternalLink className="w-4.5 h-4.5" />
                          <span>Launch Live Demo</span>
                        </a>
                      ) : (
                        <div className="px-4 py-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs flex gap-2">
                          <span className="font-bold shrink-0 bg-amber-200 text-amber-900 w-5 h-5 rounded-full flex items-center justify-center">i</span>
                          <div>
                            <span className="font-semibold">Development Status:</span> 
                            {project.id === 'smart-product-ai' ? ' Codebase pending public commit. Ready to integrate locally.' : ' Private repository / Under active engineering.'}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Detailed Technical Stack Block */}
                    <div className="p-5 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-5">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-indigo-500" /> Technologies Employed
                      </h4>
                      
                      {project.techStack.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                          <p className="text-xs font-semibold text-slate-800 tracking-tight font-sans">
                            {section.category}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {section.items.map((item, itemIdx) => (
                              <span
                                key={itemIdx}
                                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white border border-slate-200 text-slate-600 shadow-xs"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Meta Specifications */}
                    <div className="p-5 bg-slate-50 border border-slate-200/60 rounded-2xl">
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                        Metadata Summary
                      </h4>
                      <dl className="space-y-2 text-xs">
                        <div className="flex justify-between border-b border-slate-200/50 pb-2">
                          <dt className="text-slate-500 font-mono">Principal Developer</dt>
                          <dd className="font-semibold text-slate-800">Nsambu Laurenta</dd>
                        </div>
                        <div className="flex justify-between border-b border-slate-200/50 pb-2">
                          <dt className="text-slate-500 font-mono">Availability</dt>
                          <dd className="font-semibold text-emerald-600">Production Ready</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-slate-500 font-mono">Location Domain</dt>
                          <dd className="font-semibold text-slate-800">Bamenda, Cameroon</dd>
                        </div>
                      </dl>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
