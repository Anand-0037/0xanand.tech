import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { detectPersona, getPersonaConfig, type Persona } from '@/lib/schemas';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import {
  LayoutShell,
  AdaptiveHero,
  SkillGrid,
  ProjectShowcase,
  ProofStrip,
} from '@/components/generative';
import { ContactAction } from '@/components/interactable';
import { Send, Sparkles, User, Briefcase, Code, Zap } from 'lucide-react';
import './index.css';

// Persona display info with persona-specific colors
const personaInfo: Record<Persona, { label: string; icon: React.ReactNode; color: string; bgColor: string }> = {
  recruiter: {
    label: 'Recruiter',
    icon: <Briefcase size={16} />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20 border-blue-500/30'
  },
  founder: {
    label: 'Founder',
    icon: <Zap size={16} />,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/20 border-rose-500/30'
  },
  cto: {
    label: 'CTO',
    icon: <Code size={16} />,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20 border-emerald-500/30'
  },
  unknown: {
    label: 'Visitor',
    icon: <User size={16} />,
    color: 'text-slate-400',
    bgColor: 'bg-slate-500/20 border-slate-500/30'
  },
};

// Dynamic background styles per persona
const bgStyles: Record<Persona, string> = {
  recruiter: 'from-slate-950 via-[#0f172a] to-slate-950',
  founder: 'from-[#1a0505] via-[#1c0810] to-slate-950',
  cto: 'from-[#020d05] via-[#021008] to-slate-950',
  unknown: 'from-slate-950 via-slate-900 to-slate-950',
};

function App() {
  const [input, setInput] = useState('');
  const [currentPersona, setCurrentPersona] = useState<Persona>('unknown');
  const [isProcessing, setIsProcessing] = useState(false);
  const { profile, skills, projects } = PORTFOLIO_DATA;

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsProcessing(true);

    // Clear persona first for fade-out effect
    setCurrentPersona('unknown');

    // Simulate AI thinking delay
    setTimeout(() => {
      const persona = detectPersona(input);
      setCurrentPersona(persona);
      setIsProcessing(false);
    }, 1200);
  }, [input]);

  // Get config based on current persona
  const config = getPersonaConfig(currentPersona);

  // Flatten skills for SkillGrid
  const allSkills = Object.values(skills).flat();

  // Get project IDs based on persona
  const projectIds = currentPersona === 'cto'
    ? projects.filter(p => p.type === 'System Tool' || p.type === 'Backend Service').map(p => p.id)
    : projects.slice(0, 3).map(p => p.id);

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-1000 ease-in-out bg-gradient-to-b relative",
      bgStyles[currentPersona]
    )}>
      {/* Noise Texture Overlay */}
      <div className="bg-noise" />

      {/* Floating Ambient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={cn(
            "absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] transition-colors duration-1000 animate-pulse-glow",
            currentPersona === 'recruiter' && "bg-blue-600",
            currentPersona === 'founder' && "bg-rose-600",
            currentPersona === 'cto' && "bg-emerald-600",
            currentPersona === 'unknown' && "bg-indigo-900"
          )}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={cn(
            "absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] transition-colors duration-1000",
            currentPersona === 'recruiter' && "bg-purple-600",
            currentPersona === 'founder' && "bg-orange-600",
            currentPersona === 'cto' && "bg-cyan-600",
            currentPersona === 'unknown' && "bg-slate-800"
          )}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500",
                currentPersona === 'recruiter' && "bg-gradient-to-br from-blue-500 to-purple-600",
                currentPersona === 'founder' && "bg-gradient-to-br from-rose-500 to-orange-500",
                currentPersona === 'cto' && "bg-gradient-to-br from-emerald-500 to-cyan-500",
                currentPersona === 'unknown' && "bg-gradient-to-br from-slate-600 to-slate-700"
              )}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles size={20} className="text-white" />
            </motion.div>
            <span className="font-bold text-lg text-white tracking-tight">Chameleon</span>
          </div>

          {/* Persona indicator */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPersona}
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border',
                personaInfo[currentPersona].bgColor,
                personaInfo[currentPersona].color
              )}
            >
              {personaInfo[currentPersona].icon}
              <span>{personaInfo[currentPersona].label} Mode</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </header>

      {/* Intent Input */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <motion.div
            className={cn(
              'relative glass rounded-2xl overflow-hidden transition-all duration-300',
              isProcessing && 'ring-2',
              isProcessing && currentPersona === 'recruiter' && 'ring-blue-500/50',
              isProcessing && currentPersona === 'founder' && 'ring-rose-500/50',
              isProcessing && currentPersona === 'cto' && 'ring-emerald-500/50',
              isProcessing && currentPersona === 'unknown' && 'ring-indigo-500/50',
              currentPersona === 'recruiter' && 'glow-recruiter',
              currentPersona === 'founder' && 'glow-founder',
              currentPersona === 'cto' && 'glow-cto'
            )}
            layout
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Who are you? (e.g., 'I'm hiring a developer', 'Building an MVP', 'Evaluating your architecture')"
              className={cn(
                'w-full px-6 py-4 pr-14 bg-transparent text-white',
                'placeholder-slate-500 focus:outline-none text-base'
              )}
            />
            <motion.button
              type="submit"
              disabled={isProcessing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2',
                'p-3 rounded-xl transition-all font-medium',
                isProcessing
                  ? 'bg-white/10 text-white/50'
                  : currentPersona === 'recruiter' ? 'btn-recruiter text-white'
                  : currentPersona === 'founder' ? 'btn-founder text-white'
                  : currentPersona === 'cto' ? 'btn-cto text-white'
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'
              )}
            >
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles size={20} />
                </motion.div>
              ) : (
                <Send size={20} />
              )}
            </motion.button>
          </motion.div>

          {/* Quick prompts */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {[
              { label: 'Hiring', prompt: "I'm hiring a full-stack developer", persona: 'recruiter' as Persona },
              { label: 'Startup', prompt: "I'm building an MVP and need help", persona: 'founder' as Persona },
              { label: 'Technical', prompt: "Show me your technical architecture skills", persona: 'cto' as Persona },
            ].map((item) => (
              <motion.button
                key={item.label}
                type="button"
                onClick={() => {
                  setInput(item.prompt);
                  setIsProcessing(true);
                  setCurrentPersona('unknown');
                  setTimeout(() => {
                    setCurrentPersona(item.persona);
                    setIsProcessing(false);
                  }, 800);
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium',
                  'border transition-all duration-300',
                  item.persona === 'recruiter' && 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20',
                  item.persona === 'founder' && 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20',
                  item.persona === 'cto' && 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                )}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </form>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 pt-24 pb-44">
        <LayoutShell mode={config.layoutMode} emphasis={config.emphasis}>
          {/* Hero - Always first */}
          <AdaptiveHero
            headline={profile.name}
            subtext={currentPersona === 'founder'
              ? profile.bio.long
              : profile.tagline}
            vibe={config.vibe}
            persona={currentPersona}
          />

          {/* ProofStrip - For recruiters and founders */}
          {(currentPersona === 'recruiter' || currentPersona === 'founder' || currentPersona === 'unknown') && (
            <ProofStrip
              metrics={['4+', '2', '<30s', 'GSoC']}
              style={currentPersona === 'founder' ? 'prominent' : 'minimal'}
              persona={currentPersona}
            />
          )}

          {/* Skills */}
          <SkillGrid
            skills={allSkills}
            focus={config.skillFocus}
            persona={currentPersona}
          />

          {/* Projects */}
          <ProjectShowcase
            projectIds={projectIds}
            emphasis={config.projectEmphasis}
            persona={currentPersona}
          />

          {/* Contact - Always last */}
          <ContactAction
            intent={config.contactIntent}
            prefilledMessage={
              currentPersona === 'founder'
                ? "I'm building something exciting and would love to discuss..."
                : undefined
            }
            persona={currentPersona}
          />
        </LayoutShell>
      </main>
    </div>
  );
}

export default App;
