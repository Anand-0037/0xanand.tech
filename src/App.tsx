import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { detectPersona, getPersonaConfig, type Persona } from '@/lib/schemas';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { LayoutShell, AdaptiveHero } from '@/components/generative';
import { Send, Sparkles, User, Briefcase, Code, Zap } from 'lucide-react';
import { Suspense, lazy } from 'react';

// Lazy load heavy components
const SkillGrid = lazy(() => import('@/components/generative/SkillGrid').then(module => ({ default: module.SkillGrid })));
const ProjectShowcase = lazy(() => import('@/components/generative/ProjectShowcase').then(module => ({ default: module.ProjectShowcase })));
const ProofStrip = lazy(() => import('@/components/generative/ProofStrip').then(module => ({ default: module.ProofStrip })));
const ContactAction = lazy(() => import('@/components/interactable/ContactAction').then(module => ({ default: module.ContactAction })));

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

// Solid background - no gradients in Neo-Brutalist design
const bgStyles: Record<Persona, string> = {
  recruiter: 'bg-zinc-950',
  founder: 'bg-zinc-950',
  cto: 'bg-zinc-950',
  unknown: 'bg-zinc-950',
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
      "min-h-screen transition-colors duration-300 ease-in-out relative",
      bgStyles[currentPersona]
    )}>
      {/* Engineering Grid Background */}
      <div className="bg-grid" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* The AV Monogram / Signature */}
            <span className="text-4xl text-white font-['Mrs_Saint_Delafield'] leading-none pt-2">
              AV
            </span>
            <span className="font-mono text-sm tracking-widest uppercase text-zinc-400">
              Anand Vashishtha
            </span>
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
              'relative rounded-lg overflow-hidden transition-all duration-300',
              'bg-zinc-900 border',
              !isProcessing && 'border-zinc-700 focus-within:border-white',
              isProcessing && currentPersona === 'recruiter' && 'border-blue-500',
              isProcessing && currentPersona === 'founder' && 'border-rose-500',
              isProcessing && currentPersona === 'cto' && 'border-emerald-500',
              isProcessing && currentPersona === 'unknown' && 'border-zinc-500'
            )}
            layout
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Who are you? (e.g., 'I'm hiring a developer', 'Building an MVP', 'Evaluating your architecture')"
              aria-label="Describe your intent or role"
              className={cn(
                'w-full px-6 py-4 pr-14 bg-transparent text-white',
                'placeholder-slate-500 focus:outline-none text-base'
              )}
            />
            <motion.button
              type="submit"
              disabled={isProcessing}
              aria-label="Send Intent"
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
        <LayoutShell mode={config.layoutMode} emphasis={config.emphasis} domain={config.domain}>
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
            <Suspense fallback={<div className="h-32 animate-pulse bg-zinc-900/50 rounded-2xl" />}>
              <ProofStrip
                metrics={['2+', '8+', '100%', 'Web3']}
                style={currentPersona === 'founder' ? 'prominent' : 'minimal'}
                persona={currentPersona}
              />
            </Suspense>
          )}

          {/* Skills */}
          <Suspense fallback={<div className="h-64 animate-pulse bg-zinc-900/50 rounded-2xl" />}>
            <SkillGrid
              skills={allSkills}
              focus={config.skillFocus}
              persona={currentPersona}
            />
          </Suspense>

          {/* Projects */}
          <Suspense fallback={<div className="h-96 animate-pulse bg-zinc-900/50 rounded-2xl" />}>
            <ProjectShowcase
              projectIds={projectIds}
              emphasis={config.projectEmphasis}
              domain={config.domain}
              persona={currentPersona}
            />
          </Suspense>

          {/* Contact - Always last */}
          <Suspense fallback={<div className="h-48 animate-pulse bg-zinc-900/50 rounded-2xl" />}>
            <ContactAction
              intent={config.contactIntent}
              prefilledMessage={
                currentPersona === 'founder'
                  ? "I'm building something exciting and would love to discuss..."
                  : undefined
              }
              persona={currentPersona}
            />
          </Suspense>
        </LayoutShell>
      </main>
    </div>
  );
}

export default App;
