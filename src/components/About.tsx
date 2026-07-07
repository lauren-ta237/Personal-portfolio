import { motion } from 'motion/react';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle, Trophy } from 'lucide-react';
import { portfolioOwner, educationList, achievementsList } from '../data';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left border-b border-slate-100 pb-8 mb-12">
          <span className="text-indigo-600 font-mono text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
            01 . Academic & Professional Profile
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-3">
            About Me
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-2 max-w-xl">
            Studying Data Science & Artificial Intelligence at the University of Bamenda, Cameroon.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Education & Background Detail */}
          <div className="lg:col-span-6 space-y-8">
            <div className="prose text-slate-600 text-sm leading-relaxed max-w-none">
              <h3 className="text-lg font-display font-bold text-slate-900 mb-3">
                My Mission & Focus
              </h3>
              <p className="mb-4">
                I am an aspiring Data Scientist, AI Engineer, and Full Stack Developer living in Bamenda, Cameroon. My studies at the <strong>University of Bamenda (UBa)</strong> have provided a rigorous baseline in statistical modeling, computational algorithms, and artificial intelligence methods.
              </p>
              <p>
                What drives me is building robust solutions. I don't just write algorithms; I deploy them. My expertise sits at the intersection of powerful Python backends (using <strong>FastAPI</strong> and <strong>SQLAlchemy</strong>), sleek React interfaces, and deep machine learning layers (integrating <strong>Google Vision AI</strong> and <strong>Gemini AI</strong>).
              </p>
            </div>

            {/* University Highlight Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-indigo-100">
                <GraduationCap className="w-20 h-20" />
              </div>
              <div className="relative z-10 flex gap-4 items-start">
                <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wide">Undergraduate Program</span>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {educationList[0].degree}
                  </h4>
                  <p className="text-xs font-semibold text-indigo-700">
                    {educationList[0].institution}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{educationList[0].period}</span>
                  </p>
                  
                  {/* Highlights list inside about */}
                  <div className="pt-3 space-y-1.5 border-t border-slate-200/60 mt-4 text-xs text-slate-600">
                    {educationList[0].highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Core Achievements List */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-gradient-to-tr from-indigo-900 to-indigo-850 text-white rounded-3xl p-6 md:p-8 shadow-xl shadow-indigo-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-800/20 rounded-full filter blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl" />

              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-6 h-6 text-amber-400 shrink-0" />
                <h3 className="text-base font-display font-bold uppercase tracking-wide">
                  Core Achievements & Impact
                </h3>
              </div>

              {/* Achievements Stagger Grid */}
              <div className="space-y-4">
                {achievementsList.map((ach, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    className="flex gap-3.5 items-start p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-indigo-50 leading-relaxed font-sans font-medium">
                      {ach}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
