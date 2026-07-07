import { ArrowRight, Github, Code2, BrainCircuit, Database, Laptop, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50/20 transition-all duration-300 group">
      
      {/* Top Meta Details */}
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold tracking-wider uppercase rounded-full bg-slate-50 border border-slate-200 text-slate-500">
            {project.category === 'ai' && <BrainCircuit className="w-3.5 h-3.5 text-indigo-500" />}
            {project.category === 'backend' && <Database className="w-3.5 h-3.5 text-blue-500" />}
            {project.category === 'frontend' && <Laptop className="w-3.5 h-3.5 text-emerald-500" />}
            {project.category === 'fullstack' && <Layers className="w-3.5 h-3.5 text-violet-500" />}
            <span>
              {project.category === 'ai' && 'AI / Computer Vision'}
              {project.category === 'backend' && 'Backend Relational'}
              {project.category === 'frontend' && 'Frontend State'}
              {project.category === 'fullstack' && 'Full Stack AI'}
            </span>
          </span>
          
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all"
              onClick={(e) => e.stopPropagation()}
              title="View Repository"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-display font-bold text-slate-900 text-xl leading-tight group-hover:text-indigo-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs font-semibold text-indigo-500 font-sans tracking-wide mt-1.5 mb-3">
          {project.subtitle}
        </p>

        {/* Description summary */}
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 font-sans">
          {project.description}
        </p>
      </div>

      {/* Tags and CTA Block */}
      <div className="space-y-4 pt-4 border-t border-slate-100 mt-auto">
        {/* Top 4 Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200/40 text-slate-600"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-600 font-semibold">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Explore CTA Trigger */}
        <button
          onClick={() => onSelect(project)}
          className="flex items-center justify-between w-full px-4 py-3 bg-slate-50 border border-slate-200/50 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white rounded-2xl text-xs font-semibold text-slate-700 transition-all focus:outline-none group-hover:bg-slate-50 group-hover:hover:bg-indigo-600"
        >
          <span>Examine Project Architecture</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
