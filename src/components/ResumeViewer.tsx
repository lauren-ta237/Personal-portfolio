import { motion } from 'motion/react';
import { X, Printer, Download, Mail, Phone, MapPin, Github, Linkedin, Calendar, Briefcase, GraduationCap, Award, CheckCircle } from 'lucide-react';
import { portfolioOwner, educationList, experienceList, projectsList, achievementsList, certificationList } from '../data';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewer({ isOpen, onClose }: ResumeViewerProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-md flex justify-center items-start p-4 md:p-8">
      {/* Backdrop Close Click */}
      <div className="fixed inset-0 cursor-zoom-out" onClick={onClose} />

      {/* Main Resume Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Sticky Utility Header - Hidden during print */}
        <div className="no-print sticky top-0 bg-slate-50/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex justify-between items-center shrink-0 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-semibold text-slate-700 tracking-tight font-sans">
              Dynamic CV Generator & Live PDF Exporter
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-colors"
              title="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Document Section */}
        <div id="printable-resume" className="bg-white px-8 py-10 md:p-14 text-slate-800 font-sans leading-relaxed selection:bg-slate-100">
          
          {/* Resume Heading */}
          <div className="text-center border-b-2 border-slate-800 pb-6 mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight uppercase">
              {portfolioOwner.name}
            </h1>
            <p className="text-base font-semibold tracking-widest text-indigo-700 mt-2 uppercase font-sans">
              {portfolioOwner.title}
            </p>
            
            {/* Quick Contact Line */}
            <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-6 text-xs text-slate-600 font-mono mt-4">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400 no-print" />
                <span>{portfolioOwner.email}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400 no-print" />
                <span>{portfolioOwner.phone}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 no-print" />
                <span>{portfolioOwner.location}</span>
              </span>
            </div>

            {/* Social Links Line */}
            <div className="flex flex-wrap justify-center items-center gap-y-1 gap-x-6 text-xs text-slate-600 font-mono mt-2">
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-slate-400 no-print" />
                <a href={portfolioOwner.github} target="_blank" rel="noreferrer" className="hover:underline">github.com/lauren-ta237</a>
              </span>
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-slate-400 no-print" />
                <a href={portfolioOwner.linkedin} target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/nsambu-laurenta-06992334b</a>
              </span>
            </div>
          </div>

          {/* Core Grid Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left/Sidebar Column (Skills, Info, Contact) */}
            <div className="md:col-span-1 space-y-6">
              
              {/* Profile Bio */}
              <div>
                <h2 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1.5 mb-3">
                  Professional Profile
                </h2>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {portfolioOwner.bio}
                </p>
              </div>

              {/* Skill Matrix */}
              <div>
                <h2 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1.5 mb-3">
                  Technical Expertise
                </h2>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <h3 className="font-semibold text-slate-800">Backend Engineering</h3>
                    <p className="text-slate-600 leading-normal font-mono text-[10.5px]">
                      Python, FastAPI, SQLAlchemy ORM, Alembic migrations, PostgreSQL, JWT Authentication, RESTful APIs
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Frontend Interfaces</h3>
                    <p className="text-slate-600 leading-normal font-mono text-[10.5px]">
                      React, TypeScript, Tailwind CSS, React Router, Axios, State Management
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">AI & Computer Vision</h3>
                    <p className="text-slate-600 leading-normal font-mono text-[10.5px]">
                      Google Vision AI, Gemini AI, OpenCV Framework, Image Annotation, Object Detection
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">DevOps & Tooling</h3>
                    <p className="text-slate-600 leading-normal font-mono text-[10.5px]">
                      GitHub, Docker, Cursor, VS Code Desktop, CI/CD pipelines
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Block */}
              <div>
                <h2 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1.5 mb-3">
                  Academic Credentials
                </h2>
                {educationList.map((edu, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <p className="text-xs font-bold text-slate-800 leading-tight">
                      {edu.degree}
                    </p>
                    <p className="text-xs font-semibold text-indigo-700">
                      {edu.institution}
                    </p>
                    <p className="text-[11px] font-mono text-slate-500">
                      {edu.period}
                    </p>
                    <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-1">
                      {edu.highlights.slice(0, 2).map((hl, hlIdx) => (
                        <li key={hlIdx} className="leading-snug">
                          {hl}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Certifications Block */}
              <div>
                <h2 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1.5 mb-3">
                  Certifications
                </h2>
                <ul className="space-y-2 text-xs">
                  {certificationList.map((cert, idx) => (
                    <li key={idx} className="leading-tight">
                      <p className="font-semibold text-slate-800">{cert.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {cert.issuer} • {cert.date}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right Column (Experience & Selected Projects) */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Professional Experience Section */}
              <div>
                <h2 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1.5 mb-4 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-indigo-600 no-print" /> Professional Experience
                </h2>
                
                <div className="space-y-5">
                  {experienceList.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <div>
                          <h3 className="text-xs font-bold text-slate-900 leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-xs font-semibold text-indigo-700">
                            {exp.company}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] font-mono font-semibold text-slate-600">
                            {exp.duration}
                          </p>
                          <p className="text-[10px] font-mono text-slate-400">
                            {exp.location}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 italic">
                        {exp.description}
                      </p>
                      <ul className="space-y-1 list-none pl-0">
                        {exp.bullets.map((bullet, bulletIdx) => (
                          <li key={bulletIdx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                            <span className="mt-1.5 w-1.2 h-1.2 rounded-full bg-slate-400 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Projects Section */}
              <div>
                <h2 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1.5 mb-4 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-600 no-print" /> Selected Technical Projects
                </h2>

                <div className="space-y-4">
                  {projectsList.slice(0, 3).map((project) => (
                    <div key={project.id} className="space-y-1">
                      <div className="flex justify-between items-baseline flex-wrap gap-2">
                        <h3 className="text-xs font-bold text-slate-900">
                          {project.title}
                        </h3>
                        {project.githubUrl && (
                          <span className="text-[10px] text-slate-500 font-mono">
                            github.com/lauren-ta237/...
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-semibold text-indigo-600">
                        {project.subtitle}
                      </p>
                      <p className="text-xs text-slate-600 leading-normal">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.tags.map((tag, tagIdx) => (
                          <span key={tagIdx} className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600 border border-slate-200/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements Highlight */}
              <div>
                <h2 className="text-sm font-mono font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1.5 mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-indigo-600 no-print" /> Major Accomplishments
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-600">
                  {achievementsList.slice(0, 6).map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 leading-tight">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5 no-print" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Footer Statement */}
          <div className="text-center mt-10 border-t border-slate-200 pt-5 text-[10px] text-slate-400 font-mono tracking-wider uppercase">
            Nsambu Laurenta Angehwri • Professional Portfolio CV
          </div>

        </div>
      </motion.div>
    </div>
  );
}
