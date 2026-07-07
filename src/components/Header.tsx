import { useState, useEffect } from 'react';
import { Menu, X, FileText, Send, Github, Linkedin, BrainCircuit } from 'lucide-react';
import { portfolioOwner } from '../data';

interface HeaderProps {
  onOpenResume: () => void;
  activeSection: string;
}

export default function Header({ onOpenResume, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
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

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Technical Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-xs' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100 group-hover:bg-indigo-700 transition-colors">
              <BrainCircuit className="w-5.5 h-5.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-slate-900 tracking-tight text-sm leading-tight group-hover:text-indigo-600 transition-colors">
                Nsambu Laurenta
              </span>
              <span className="font-mono text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Data & AI Engineer
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-xs font-semibold tracking-wide rounded-lg transition-all duration-200 hover:text-indigo-600 hover:bg-slate-50 ${
                  activeSection === item.id ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Buttons (Resume & Socials) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 focus:outline-none"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Interactive CV</span>
            </button>
            <div className="h-4 w-px bg-slate-200 mx-1" />
            <a href={portfolioOwner.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-800 transition-colors" title="GitHub Profile">
              <Github className="w-4.5 h-4.5" />
            </a>
            <a href={portfolioOwner.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-800 transition-colors" title="LinkedIn Profile">
              <Linkedin className="w-4.5 h-4.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-6 space-y-3 shadow-lg absolute inset-x-0 top-16 z-30">
          <div className="grid grid-cols-1 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="h-px bg-slate-100 my-4" />
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <a href={portfolioOwner.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-800 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href={portfolioOwner.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-800 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenResume();
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Interactive CV</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
