import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, BrainCircuit, Database, Laptop, SlidersHorizontal, ArrowUp, ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import ProjectCard from './components/ProjectCard';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import ResumeViewer from './components/ResumeViewer';
import Contact from './components/Contact';

import { projectsList, portfolioOwner } from './data';
import { Project } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'backend' | 'frontend' | 'fullstack'>('all');
  
  // Modal / Overlay States
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Back to top button state
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scrolling to highlight headers and toggle back to top button
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back to top
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Highlight active nav item
      const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200; // offset for triggers

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter projects list
  const filteredProjects = selectedCategory === 'all'
    ? projectsList
    : projectsList.filter(proj => proj.category === selectedCategory);

  const handleOpenProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const handleScrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Dynamic Navigation Header */}
      <Header
        activeSection={activeSection}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1">
        
        {/* Hero Banner Section */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onExploreProjects={handleScrollToProjects}
        />

        {/* Academic & Bio Profile Section */}
        <About />

        {/* Skills Matrix Section */}
        <Skills />

        {/* Professional Timelines Section */}
        <Experience />

        {/* Dynamic Project Showroom Section */}
        <section id="projects" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center md:text-left border-b border-slate-200/50 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-indigo-600 font-mono text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
                  04 . Practical Implementations
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-3">
                  Technical Project Showroom
                </h2>
                <p className="text-slate-500 font-medium text-sm md:text-base mt-2 max-w-xl">
                  Filter and examine complete software models designed to resolve concrete industry needs.
                </p>
              </div>

              {/* Filtering Controls */}
              <div className="flex flex-wrap items-center gap-1.5 self-start md:self-end">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mr-2 flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
                </span>
                
                {[
                  { id: 'all', label: 'All Projects' },
                  { id: 'ai', label: 'AI/Vision' },
                  { id: 'backend', label: 'Backend' },
                  { id: 'frontend', label: 'Frontend' },
                  { id: 'fullstack', label: 'Full Stack' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-xl border transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard
                      project={project}
                      onSelect={handleOpenProjectDetails}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Upcoming Project Banner (Google Smart Product AI teaser) */}
            <div className="mt-12 bg-indigo-50/50 border border-indigo-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-mono font-bold tracking-wider uppercase">
                  Pending GitHub Commit
                </div>
                <h4 className="font-display font-bold text-slate-900 text-lg">
                  Smart Product AI Integration
                </h4>
                <p className="text-slate-500 text-xs md:text-sm max-w-xl">
                  Source code for the product verification pipeline is being audited. It will be public on my GitHub repository soon! You can examine its detailed architecture blueprint right now by selecting it above.
                </p>
              </div>
              <button
                onClick={() => {
                  const target = projectsList.find(p => p.id === 'smart-product-ai');
                  if (target) handleOpenProjectDetails(target);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
              >
                <span>Read Blueprint Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </section>

        {/* Contact Connection Form & Info Section */}
        <Contact />

      </main>

      {/* Primary Landing Page Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-slate-800 pb-10">
            
            {/* Left Block */}
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-lg font-display font-bold">Nsambu Laurenta Angehwri</h4>
              <p className="text-xs text-slate-400 font-mono">
                Data Scientist & AI Engineer
              </p>
            </div>

            {/* Middle Block (Short navigation quicklinks) */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Top</button>
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">About</button>
              <button onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Skills</button>
              <button onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Experience</button>
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Projects</button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Contact</button>
            </div>

            {/* Right Block (Actions / Info) */}
            <div className="flex justify-center md:justify-end items-center gap-4">
              <a href={portfolioOwner.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={portfolioOwner.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href={`mailto:${portfolioOwner.email}`} className="p-2.5 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[10px] text-slate-500 font-mono tracking-wider uppercase">
            <p>© 2026 Nsambu Laurenta Angehwri. All rights reserved.</p>
            <p className="flex items-center gap-1 text-slate-600">
              <span>Engineered in Bamenda, Cameroon</span>
              <span>🇨🇲</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating details sheet bottom overlay modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      {/* Full interactive resume print layout overlay */}
      <ResumeViewer
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Back to top floating button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-lg z-30 transition-all cursor-pointer focus:outline-none"
            title="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
