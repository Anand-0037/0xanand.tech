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
import { Send, Sparkles, User, Briefcase, Code } from 'lucide-react';
import './index.css';

// Persona display info
const personaInfo: Record<Persona, { label: string; icon: React.ReactNode; color: string }> = {
  recruiter: { label: 'Recruiter', icon: <Briefcase size={16} />, color: 'text-blue-400' },
  founder: { label: 'Founder', icon: <Sparkles size={16} />, color: 'text-purple-400' },
  cto: { label: 'CTO', icon: <Code size={16} />, color: 'text-emerald-400' },
  unknown: { label: 'Visitor', icon: <User size={16} />, color: 'text-gray-400' },
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

    // Detect persona from input
    const persona = detectPersona(input);
    setCurrentPersona(persona);

    // Simulate processing delay for visual feedback
    setTimeout(() => {
      setIsProcessing(false);
    }, 800);
  }, [input]);

  // Get config based on current persona
  const config = getPersonaConfig(currentPersona);

  // Flatten skills for SkillGrid
  const allSkills = Object.values(skills).flat();

  // Get project IDs
  const projectIds = currentPersona === 'cto'
    ? projects.filter(p => p.type === 'System Tool' || p.type === 'Backend Service').map(p => p.id)
    : projects.slice(0, 3).map(p => p.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0f18] to-[#0a0a0f]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-semibold text-white">Chameleon</span>
          </div>

          {/* Persona indicator */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPersona}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm',
                'bg-white/5 border border-white/10',
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
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto"
        >
          <div className={cn(
            'relative glass rounded-2xl overflow-hidden',
            'border transition-colors',
            isProcessing ? 'border-indigo-500/50' : 'border-white/10'
          )}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Who are you? (e.g., 'I'm hiring a developer', 'Building an MVP', 'Evaluating your architecture')"
              className={cn(
                'w-full px-6 py-4 pr-14 bg-transparent text-white',
                'placeholder-gray-500 focus:outline-none'
              )}
            />
            <button
              type="submit"
              disabled={isProcessing}
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2',
                'p-2.5 rounded-xl transition-all',
                isProcessing
                  ? 'bg-indigo-500/20 text-indigo-400'
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
            </button>
          </div>

          {/* Quick prompts */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {[
              { label: 'Hiring', prompt: "I'm hiring a full-stack developer" },
              { label: 'Startup', prompt: "I'm building an MVP and need help" },
              { label: 'Technical', prompt: "Show me your technical architecture skills" },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setInput(item.prompt);
                  const persona = detectPersona(item.prompt);
                  setCurrentPersona(persona);
                }}
                className={cn(
                  'px-3 py-1 rounded-full text-xs',
                  'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white',
                  'border border-white/10 transition-colors'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Main Content Area */}
      <main className="pt-20 pb-40">
        <LayoutShell mode={config.layoutMode} emphasis={config.emphasis}>
          {/* Hero - Always first */}
          <AdaptiveHero
            headline={profile.name}
            subtext={currentPersona === 'founder'
              ? profile.bio.long
              : profile.tagline}
            vibe={config.vibe}
          />

          {/* ProofStrip - For recruiters and founders */}
          {(currentPersona === 'recruiter' || currentPersona === 'founder' || currentPersona === 'unknown') && (
            <ProofStrip
              metrics={['4+', '2', '<30s', 'GSoC']}
              style={currentPersona === 'founder' ? 'prominent' : 'minimal'}
            />
          )}

          {/* Skills */}
          <SkillGrid
            skills={allSkills}
            focus={config.skillFocus}
          />

          {/* Projects */}
          <ProjectShowcase
            projectIds={projectIds}
            emphasis={config.projectEmphasis}
          />

          {/* Contact - Always last */}
          <ContactAction
            intent={config.contactIntent}
            prefilledMessage={
              currentPersona === 'founder'
                ? "I'm building something exciting and would love to discuss..."
                : undefined
            }
          />
        </LayoutShell>
      </main>
    </div>
  );
}

export default App;
