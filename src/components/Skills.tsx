import { BrainCircuit, Database, Laptop, Wrench, CircleDot, Terminal } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Backend Engineering',
      icon: <Database className="w-6 h-6 text-blue-600" />,
      colorClass: 'bg-blue-50 border-blue-200/60 text-blue-800',
      description: 'Designing highly robust databases, structuring normalized relational schemas, and deploying secure, fast backend APIs.',
      skills: ['Python 3.11+', 'FastAPI', 'SQLAlchemy ORM', 'Alembic Migrations', 'PostgreSQL', 'JWT Authentication', 'REST APIs', 'Bcrypt Hashing'],
    },
    {
      title: 'AI & Machine Learning',
      icon: <BrainCircuit className="w-6 h-6 text-indigo-600" />,
      colorClass: 'bg-indigo-50 border-indigo-200/60 text-indigo-800',
      description: 'Leveraging computer vision, deep learning frameworks, and state-of-the-art Large Language Models (LLMs) to solve visual and analytical problems.',
      skills: ['Google Vision AI', 'Gemini AI API', 'Computer Vision', 'Image Processing', 'OpenCV', 'Object Detection', 'Structured JSON Output'],
    },
    {
      title: 'Frontend Interfaces',
      icon: <Laptop className="w-6 h-6 text-emerald-600" />,
      colorClass: 'bg-emerald-50 border-emerald-200/60 text-emerald-800',
      description: 'Building interactive, light-speed single-page dashboards, responsive web views, and custom styled data tables.',
      skills: ['React', 'TypeScript', 'Tailwind CSS v4', 'React Router', 'Axios Clients', 'Global Context State', 'Framer Motion'],
    },
    {
      title: 'Dev Tools & Ecosystem',
      icon: <Wrench className="w-6 h-6 text-amber-600" />,
      colorClass: 'bg-amber-50 border-amber-200/60 text-amber-800',
      description: 'Using high-fidelity code editors, managing version control branches, and setting up isolated development containers.',
      skills: ['GitHub', 'Docker Containers', 'Cursor IDE', 'VS Code', 'Git Command Line', 'Vite Bundler', 'npm / package.json'],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left border-b border-slate-200/50 pb-8 mb-12">
          <span className="text-indigo-600 font-mono text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
            02 . Core Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-3">
            Technical Expertise
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-2 max-w-xl">
            A comprehensive overview of my software architectures, artificial intelligence toolkits, and web frameworks.
          </p>
        </div>

        {/* Skill Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300 rounded-3xl p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl border ${category.colorClass.split(' ')[1]} bg-white shadow-xs`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-lg leading-snug">
                      {category.title}
                    </h3>
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider text-slate-400">
                      Domain Level: Professional
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6">
                  {category.description}
                </p>
              </div>

              {/* Skill Tags */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    Utilized Libraries & Tech
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono rounded-xl bg-slate-50 border border-slate-200/50 hover:border-slate-300 hover:bg-white text-slate-700 transition-colors"
                    >
                      <CircleDot className="w-2 h-2 text-indigo-500 shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
