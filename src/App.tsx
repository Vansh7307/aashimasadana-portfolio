import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ChevronRight,
  ExternalLink,
  Award,
  Star,
  Target
} from 'lucide-react';
import { resumeData } from './resumeData';
import Splash from './components/Splash';
import AnimatedBackground from './components/AnimatedBackground';

// Types
type SectionId = 'hero' | 'experience' | 'achievements' | 'skills' | 'education';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState<SectionId>('hero');

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Aashima_Sadana_CV.txt';
    link.download = 'Aashima_Sadana_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [showSplash]);

  return (
    <div className="relative min-h-screen font-sans selection:bg-brand/30">
      <AnimatePresence>
        {showSplash && <Splash onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <>
          <AnimatedBackground />
          
          {/* Progress Bar */}
          <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-1 bg-brand z-50 origin-left glow"
          />

          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-40 bg-white/5 backdrop-blur-xl border-b border-white/10 py-6">
            <div className="container mx-auto px-10 flex justify-between items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl border border-white/20 shadow-lg shadow-blue-500/20 text-white">AS</div>
                <span className="text-lg font-medium tracking-tight text-white">AASHIMA <span className="text-blue-400">SADANA</span></span>
              </motion.div>
              
              <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                {(['hero', 'experience', 'achievements', 'skills', 'education'] as SectionId[]).map((id) => (
                  <button
                    key={id}
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                    className={`transition-colors hover:text-white capitalize ${
                      activeSection === id ? 'text-white border-b border-blue-500 pb-1' : ''
                    }`}
                  >
                    {id}
                  </button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 transition-all text-sm font-medium"
              >
                Contact
              </motion.button>
            </div>
          </nav>

          <main className="relative pt-32 px-10 max-w-7xl mx-auto space-y-40 mb-32">
            
            {/* HERO SECTION */}
            <section id="hero" className="min-h-[85vh] flex flex-col justify-center relative border-b border-white/5 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-4xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Available for New Strategic Roles
                </div>
                
                <h1 className="text-7xl md:text-8xl font-display font-extrabold leading-[1.1] tracking-tighter text-white mb-8">
                  Building the <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    Digital Frontier
                  </span>
                </h1>
                
                <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl">
                  {resumeData.basics.summary}
                </p>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2"
                  >
                    <span>View Experience</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download CV</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Bottom Info Bar */}
              <div className="mt-16 pt-8 flex flex-wrap gap-x-12 gap-y-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-brand" />
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{resumeData.basics.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-brand" />
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{resumeData.basics.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-brand" />
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{resumeData.basics.location}</span>
                </div>
              </div>
            </section>

            {/* EXPERIENCE SECTION */}
            <section id="experience" className="scroll-mt-32">
              <div className="flex items-end justify-between mb-20">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-blue-400 mb-2">Technical Journey</h2>
                  <h3 className="text-5xl md:text-6xl font-display font-extrabold text-white tracking-tighter">Experience</h3>
                </div>
              </div>

              <div className="space-y-12">
                {resumeData.experience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="grid md:grid-cols-[240px_1fr] gap-8 group">
                      <div className="pt-2">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                          <span className="text-sm font-bold text-blue-400 uppercase tracking-widest">{exp.dates}</span>
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest font-medium">{exp.location}</div>
                      </div>
                      
                      <div className="glass p-10 rounded-3xl group-hover:bg-white/[0.08] transition-all duration-500 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                        <h4 className="text-3xl font-display font-extrabold text-white mb-2">{exp.role}</h4>
                        <div className="text-purple-400 font-bold text-sm uppercase tracking-widest mb-8">{exp.company}</div>
                        
                        <ul className="space-y-5">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} className="flex space-x-4 items-start text-slate-300 leading-relaxed font-normal">
                              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap gap-3">
                          {["Digital Marketing", "Noida Systems", "Campaign Growth"].map((tag, i) => (
                            <span key={i} className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ACHIEVEMENTS SECTION */}
            <section id="achievements" className="scroll-mt-32">
              <div className="mb-20">
                <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-purple-400 mb-2">Milestones</h2>
                <h3 className="text-5xl md:text-6xl font-display font-extrabold text-white tracking-tighter">Impact Log</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {resumeData.achievements.filter(a => a.type === 'academic').slice(0, 3).map((ach, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -10 }}
                    className="glass p-8 rounded-3xl text-center border-t-2 border-t-purple-500 relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Award className="w-10 h-10 text-purple-400 mx-auto mb-6" />
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{ach.year}</div>
                    <div className="text-lg font-display text-white font-bold leading-tight">{ach.item}</div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resumeData.achievements.map((ach, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all flex items-start space-x-4 group"
                  >
                    <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                      <Trophy className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-purple-500 uppercase tracking-widest mb-1">{ach.year}</div>
                      <div className="text-sm text-slate-300 leading-relaxed font-medium">{ach.item}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="scroll-mt-32">
              <div className="mb-16">
                <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-blue-400/60 mb-2">Core Competencies</h2>
                <h3 className="text-5xl md:text-6xl font-display font-extrabold text-white tracking-tighter">Expertise</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resumeData.skills.map((skillGroup, idx) => (
                  <div key={idx} className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Code2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <h4 className="text-xl font-display font-bold text-white uppercase tracking-wider">{skillGroup.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {skillGroup.items.map((skill, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-5 py-3 glass rounded-xl text-xs font-bold text-slate-300 uppercase tracking-widest border border-white/5 hover:border-blue-500/40 hover:text-blue-400 transition-all flex items-center space-x-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span>{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Additional Info / Extras */}
                <div className="lg:col-span-2 glass p-10 rounded-3xl relative overflow-hidden border-blue-500/10">
                  <div className="absolute top-0 right-0 p-8 transform rotate-12 opacity-5 pointer-events-none">
                    <Star className="w-64 h-64 text-blue-500" />
                  </div>
                  <h4 className="text-2xl font-display font-bold text-white mb-8 uppercase tracking-wider">Passions & Focus</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {resumeData.extra.map((item, i) => (
                      <div key={i} className="flex items-center space-x-4 text-slate-400">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* EDUCATION SECTION */}
            <section id="education" className="scroll-mt-32">
              <div className="mb-16">
                <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-pink-400/60 mb-2">Learning Path</h2>
                <h3 className="text-5xl md:text-6xl font-display font-extrabold text-white tracking-tighter">Academic Record</h3>
              </div>

              <div className="space-y-6">
                {resumeData.education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="glass p-10 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-white/[0.08] transition-colors"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 rounded-2xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 shadow-lg shadow-pink-500/10">
                        <GraduationCap className="w-8 h-8 text-pink-400" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-display font-extrabold text-white">{edu.institution}</h4>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{edu.degree} | {edu.dates}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-display font-extrabold text-pink-400 leading-none">{edu.score}</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 px-3 py-1 bg-white/5 rounded-full inline-block">Final Grade</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

          </main>

          {/* Footer */}
          <footer className="py-24 border-t border-white/10 bg-black/40 backdrop-blur-3xl relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />
            <div className="container mx-auto px-10 max-w-7xl">
              <div className="grid md:grid-cols-2 gap-20 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6 tracking-tighter">Let's create something <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">extraordinary</span>.</h2>
                  <p className="text-slate-400 font-light text-lg mb-10 max-w-md">Currently seeking entry-level opportunities where I can apply my problem-solving skills and passion for technology.</p>
                  <div className="flex space-x-6">
                    <a href={`mailto:${resumeData.basics.email}`} className="p-4 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                      <Mail className="w-6 h-6" />
                    </a>
                  </div>
                </div>
                
                <div className="glass p-10 rounded-[32px] text-center shadow-2xl relative">
                  <div className="text-xs font-bold text-blue-500 mb-6 uppercase tracking-[0.5em]">Official Portfolio Access</div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadCV}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-6 rounded-2xl flex items-center justify-center space-x-3 group transition-all shadow-xl shadow-blue-600/30"
                  >
                    <Download className="w-6 h-6" />
                    <span className="text-xl tracking-tight">Download Full CV</span>
                  </motion.button>
                  <div className="mt-6 text-[10px] text-slate-500 uppercase tracking-widest font-bold">Latest Version // April 2026</div>
                </div>
              </div>
              
              <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-sm font-medium text-slate-600 uppercase tracking-widest">© 2026 Aashima Sadana. Professional Portfolio.</div>
                <div className="flex items-center gap-8">
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    React
                  </div>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Framer Motion
                  </div>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    Tailwind CSS
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

