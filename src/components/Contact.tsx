import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { portfolioOwner } from '../data';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioOwner.email);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate API write delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  const handlePrefillEmail = () => {
    const subject = encodeURIComponent("Inquiry regarding Data Science / AI Engineer opportunities");
    const body = encodeURIComponent(`Hello Nsambu Laurenta,\n\nI reviewed your portfolio and would love to chat regarding some opportunities.\n\nBest regards,\n[Your Name]`);
    window.location.href = `mailto:${portfolioOwner.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 relative overflow-hidden">
      
      {/* Visual backdrop blur decoration */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-100/30 rounded-full filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left border-b border-slate-200/60 pb-8 mb-12">
          <span className="text-indigo-600 font-mono text-xs font-bold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
            04 . Connection Hub
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-3">
            Get In Touch
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-2 max-w-xl">
            Have an open role, an interesting project, or simply want to collaborate? Reach out!
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Cards Details (5 of 12) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <h3 className="font-display font-bold text-slate-900 text-lg border-b border-slate-100 pb-3 mb-4">
                Connect Directly
              </h3>

              <div className="space-y-4">
                {/* Email Address */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Send an email</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <a href={`mailto:${portfolioOwner.email}`} className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
                        {portfolioOwner.email}
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-md transition-all"
                        title="Copy email to clipboard"
                      >
                        {copiedText ? (
                          <span className="text-[10px] text-emerald-600 font-mono font-bold bg-emerald-50 px-1.5 py-0.5 rounded-sm">Copied!</span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Telephone Number */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Call or WhatsApp</p>
                    <a href={`tel:${portfolioOwner.phone.replace(/[\s()]/g, '')}`} className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
                      {portfolioOwner.phone}
                    </a>
                  </div>
                </div>

                {/* Address Location */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Headquarters</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {portfolioOwner.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant pre-fill email helper button */}
              <div className="pt-2">
                <button
                  onClick={handlePrefillEmail}
                  className="flex items-center justify-center gap-1.5 w-full px-4 py-3 border border-indigo-200 hover:border-indigo-300 text-indigo-700 hover:bg-indigo-50/50 rounded-2xl text-xs font-semibold transition-all focus:outline-none"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Launch Quick Email Template</span>
                </button>
              </div>

            </div>

            {/* Social Network Card */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
              <h4 className="font-display font-bold text-slate-900 text-sm">
                Developer Coordinates & Accounts
              </h4>
              <div className="flex flex-col gap-2.5">
                <a
                  href={portfolioOwner.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/50 hover:bg-white hover:border-indigo-200 text-slate-700 hover:text-indigo-700 transition-all font-sans text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4.5 h-4.5 text-blue-600" />
                    <span>Laurenta on LinkedIn</span>
                  </span>
                  <span className="font-mono text-[9px] text-slate-400">CONNECT ↗</span>
                </a>
                
                <a
                  href={portfolioOwner.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/50 hover:bg-white hover:border-indigo-200 text-slate-700 hover:text-slate-800 transition-all font-sans text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4.5 h-4.5 text-slate-800" />
                    <span>lauren-ta237 on GitHub</span>
                  </span>
                  <span className="font-mono text-[9px] text-slate-400">EXPLORE ↗</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Messaging Form (7 of 12) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-display font-bold text-slate-900 text-lg border-b border-slate-100 pb-3 mb-6">
                Send an Instant Message
              </h3>

              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-flex items-center justify-center p-4 bg-emerald-50 text-emerald-600 rounded-full">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-slate-900 text-lg">Message Logged Successfully!</h4>
                    <p className="text-slate-500 text-xs md:text-sm max-w-sm mx-auto">
                      Thank you for reaching out, Laurenta has been notified. She will review your details and respond as soon as possible.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="form-name" className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Your Name *
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label htmlFor="form-email" className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Email Address *
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-subject" className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Subject (Optional)
                    </label>
                    <input
                      id="form-subject"
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      placeholder="Project collaboration, Hiring, etc."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-message" className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Message Content *
                    </label>
                    <textarea
                      id="form-message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                      placeholder="Hi Laurenta, let's collaborate on..."
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formState.name || !formState.email || !formState.message}
                      className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-2xl text-xs tracking-wide shadow-md hover:shadow-lg hover:shadow-indigo-100 transition-all focus:outline-none"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full border-2 border-white/35 border-t-white animate-spin" />
                          <span>Dispatching Message...</span>
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Secure Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
