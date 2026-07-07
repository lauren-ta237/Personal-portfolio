import { Briefcase, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { experienceList } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-white border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left border-b border-slate-100 pb-8 mb-12">
          <span className="text-indigo-600 font-mono text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
            03 . Internship Credentials
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-3">
            Professional Experience
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-2 max-w-xl">
            My career history focusing on high-impact tech programs where I built production-ready systems.
          </p>
        </div>

        {/* Experience Cards Layout */}
        <div className="max-w-4xl mx-auto space-y-12 relative before:absolute before:inset-y-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-slate-200/60">
          
          {experienceList.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row items-stretch md:justify-between gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline center bullet indicator */}
                <div className="absolute left-4 md:left-1/2 -translate-x-[7px] top-6 w-3.5 h-3.5 rounded-full border-4 border-white bg-indigo-600 shadow-sm z-10" />

                {/* Left/Right Card column */}
                <div className="w-full md:w-[46%] pl-10 md:pl-0">
                  <div className="bg-slate-50 border border-slate-200/80 hover:border-indigo-100 p-6 md:p-8 rounded-3xl transition-all hover:shadow-lg hover:shadow-slate-100/50 space-y-4">
                    
                    {/* Role Title and Company */}
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <h3 className="font-display font-bold text-slate-900 text-lg leading-tight">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-bold text-indigo-600 mt-1">
                          {exp.company}
                        </p>
                      </div>
                      
                      {/* Duration Badge */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono font-bold tracking-wider rounded-xl bg-white border border-slate-200 text-slate-600">
                        <Calendar className="w-3 h-3 text-indigo-500" />
                        <span>{exp.duration}</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-300" />
                      <span>{exp.location}</span>
                    </p>

                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-sans font-medium">
                      {exp.description}
                    </p>

                    {/* Highlighted Accomplishments List */}
                    <div className="space-y-2 border-t border-slate-200/50 pt-4">
                      <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-indigo-500" /> Key Tasks & Impacts
                      </p>
                      <ul className="space-y-1.5">
                        {exp.bullets.map((bullet, bulletIdx) => (
                          <li key={bulletIdx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skill Badges utilized */}
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.map((skill, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Empty block on the opposite side to balance timeline grid */}
                <div className="hidden md:block w-[46%]" />

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
