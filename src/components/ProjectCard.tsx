import { ArrowRight, Github, Code2, BrainCircuit, Database, Laptop, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <div 
      onClick={() => onSelect(project)}
      className="bg-white border border-slate-200/80 rounded-3xl p-5 md:p-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50/20 transition-all duration-300 group cursor-pointer"
    >
      
      <div>
        {/* Project Thumbnail Image */}
        {project.imageUrl && (
          <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl mb-4 bg-slate-50 border border-slate-100 relative">
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
          </div>
        )}

        {/* Top Meta Details */}
        <div className="flex justify-between items-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold tracking-wider uppercase rounded-full bg-slate-50 border border-slate-200 text-slate-500">
            {project.category === 'ai' && <BrainCircuit className="w-3.5 h-3.5 text-indigo-500" />}
            {project.category === 'backend' && <Database className="w-3.5 h-3.5 text-blue-500" />}
            {project.category === 'frontend' && <Laptop className="w-3.5 h-3.5 text-emerald-500" />}
            {project.category === 'fullstack' && <Layers className="w-3.5 h-3.5 text-violet-500" />}
            <span>
              {project.category === 'ai' && 'AI / CV'}
              {project.category === 'backend' && 'Backend Relational'}
              {project.category === 'frontend' && 'Frontend State'}
              {project.category === 'fullstack' && 'Full Stack AI'}
            </span>
          </span>
          
          <span className="text-slate-400 group-hover:text-indigo-600 transition-colors text-xs font-mono font-semibold flex items-center gap-1">
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-display font-bold text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs font-semibold text-indigo-500 font-sans tracking-wide mt-1 mb-2.5">
          {project.subtitle}
        </p>

        {/* Description summary */}
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-5 font-sans line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Tags and CTA Block */}
      <div className="space-y-4 pt-4 border-t border-slate-100 mt-auto">
        {/* Top 3 Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[9.5px] font-mono px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200/40 text-slate-600"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 font-semibold">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Prominent External Actions (GitHub & Demo) */}
        <div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 rounded-xl text-[11px] font-bold tracking-wide transition-all shadow-xs"
              title="View Repository on GitHub"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Code</span>
            </a>
          )}
          
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[11px] font-bold tracking-wide transition-all shadow-xs"
              title="Launch Live Project Demo"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>

    </div>
  );
}
