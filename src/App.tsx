import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTamboThread } from '@tambo-ai/react';
import { cn } from '@/lib/utils';
import { detectPersona, getPersonaConfig, type Persona } from '@/lib/schemas';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import { LayoutShell, AdaptiveHero } from '@/components/generative';
import { Send, Sparkles, User, Briefcase, Code, Zap, Brain } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { ChameleonProvider, createPersonaTool } from '@/tambo';

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
  data_scientist: {
    label: 'Researcher',
    icon: <Brain size={16} />,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/20 border-violet-500/30'
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
  data_scientist: 'bg-zinc-950',
  unknown: 'bg-zinc-950',
};

// Inner component with Tambo hook (must be inside TamboProvider)
interface PortfolioContentWithStateProps {
  currentPersona: Persona;
  setCurrentPersona: (p: Persona) => void;
  aiReasoning: string;
  setAiReasoning: (r: string) => void;
}

function PortfolioContentWithState({
  currentPersona,
  setCurrentPersona,
  aiReasoning,
  setAiReasoning
}: PortfolioContentWithStateProps) {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { profile, skills, projects } = PORTFOLIO_DATA;

  // Hook into Tambo thread - only use sendThreadMessage, not streaming (streaming can get stuck)
  const { sendThreadMessage } = useTamboThread();

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    // DEBUG: Check if keys exist (Check console)
    if (!import.meta.env.VITE_TAMBO_API_KEY) {
      console.error('CRITICAL: Missing VITE_TAMBO_API_KEY in .env file');
      setAiReasoning('Error: API Key missing. Check console.');
      return;
    }
    console.log('Chameleon: API Key present, Project ID:', import.meta.env.VITE_TAMBO_PROJECT_ID ? '***configured***' : 'MISSING');

    const currentInput = input;
    setIsProcessing(true);
    setAiReasoning('');

    // Clear via both state and DOM ref for maximum reliability
    setInput('');
    if (inputRef.current) inputRef.current.value = '';

    // Optimistic: Use heuristic immediately
    const heuristicPersona = detectPersona(currentInput);
    setCurrentPersona(heuristicPersona);

    try {
      // RACE CONDITION: Fail if AI takes longer than 10s
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out after 10s')), 10000)
      );

      // Race the actual API call against the timer
      await Promise.race([
        sendThreadMessage(currentInput),
        timeoutPromise
      ]);
    } catch (error) {
      console.error('Chameleon: Manual input failed:', error);
      setAiReasoning(`Fallback: Detected ${heuristicPersona} mode (${error instanceof Error ? error.message : 'Network Error'})`);
    } finally {
      // This ensures the spinner ALWAYS stops
      setIsProcessing(false);
    }
  }, [input, isProcessing, sendThreadMessage, setCurrentPersona, setAiReasoning]);

  // Quick button handler for preset prompts
  const handleQuickPrompt = useCallback(async (prompt: string, persona: Persona) => {
    setInput(prompt);
    setIsProcessing(true);
    setAiReasoning('');

    // Optimistic update with known persona
    setCurrentPersona(persona);

    try {
      console.log('Chameleon: Quick prompt:', prompt);
      
      // RACE CONDITION: Fail if AI takes longer than 10s
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out after 10s')), 10000)
      );

      await Promise.race([
        sendThreadMessage(prompt),
        timeoutPromise
      ]);
    } catch (error) {
      console.error('Chameleon: Quick prompt failed:', error);
      setAiReasoning(`Fallback: Detected ${persona} mode (${error instanceof Error ? error.message : 'Network Error'})`);
    } finally {
      setIsProcessing(false);
      setInput(''); // CRITICAL: Clear input after quick prompt
    }
  }, [sendThreadMessage, setCurrentPersona, setAiReasoning]);

  // Get config based on current persona
  const config = getPersonaConfig(currentPersona);

  // Flatten skills for SkillGrid
  const allSkills = Object.values(skills).flat();

  // Get project IDs based on persona
  const projectIds = useMemo(() => {
    if (currentPersona === 'cto') {
      return projects.filter(p => p.type === 'System Tool' || p.type === 'Backend Service').map(p => p.id);
    }
    if (currentPersona === 'data_scientist') {
      return projects.filter(p => p.tags?.includes('ai_ml') || p.tags?.includes('data_science')).map(p => p.id);
    }
    return projects.filter(p => !p.comingSoon).slice(0, 4).map(p => p.id);
  }, [currentPersona, projects]);

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300 ease-in-out relative",
      bgStyles[currentPersona]
    )}>
      <div className="bg-grid" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
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

      {/* AI Reasoning Notification */}
      <AnimatePresence>
        {aiReasoning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-36 left-0 right-0 flex justify-center z-[110] px-4"
          >
            <div className="bg-zinc-800/90 backdrop-blur text-zinc-300 text-xs px-4 py-2 rounded-full border border-zinc-700 shadow-xl flex items-center gap-2 max-w-md">
              <Sparkles size={12} className="text-yellow-400 shrink-0" />
              <span className="truncate">{aiReasoning}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intent Analysis Indicator */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[110]"
          >
            <div className="bg-zinc-800/90 backdrop-blur text-zinc-400 text-xs px-3 py-1.5 rounded-full border border-zinc-700 flex items-center gap-2 shadow-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Analyzing Intent...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intent Entry */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent pt-12">
        <form onSubmit={(e) => { void handleSubmit(e); }} className="max-w-2xl mx-auto">
          <motion.div
            className={cn(
              'relative rounded-lg overflow-hidden transition-all duration-300',
              'bg-zinc-900 border shadow-2xl',
              !isProcessing && 'border-zinc-700 focus-within:border-white',
              isProcessing && currentPersona === 'recruiter' && 'border-blue-500',
              isProcessing && currentPersona === 'founder' && 'border-rose-500',
              isProcessing && currentPersona === 'cto' && 'border-emerald-500',
              isProcessing && currentPersona === 'data_scientist' && 'border-violet-500',
              isProcessing && currentPersona === 'unknown' && 'border-zinc-500'
            )}
            layout
          >
            <input
              ref={inputRef}
              type="text"
              name="intent"
              autoFocus
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Who are you? (e.g., 'I'm hiring', 'Building an MVP')"
              aria-label="Describe your intent or role"
              className={cn(
                'w-full px-4 py-3 sm:px-6 sm:py-4 pr-12 sm:pr-14 bg-transparent text-white caret-white',
                'placeholder-zinc-500 focus:outline-none text-sm sm:text-base'
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
                  : currentPersona === 'data_scientist' ? 'bg-violet-500 hover:bg-violet-600 text-white'
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
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:flex sm:flex-wrap justify-center gap-2 mt-4 pb-12 w-full px-4 max-w-lg mx-auto relative z-[101]">
            {[
              { label: 'Startup', prompt: "I'm building an MVP", persona: 'founder' as Persona },
              { label: 'Technical', prompt: "Show me your technical skills", persona: 'cto' as Persona },
              { label: 'ML/AI', prompt: "Show me your ML research", persona: 'data_scientist' as Persona },
            ].map((item) => (
              <motion.button
                key={item.label}
                type="button"
                onClick={() => { void handleQuickPrompt(item.prompt, item.persona); }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] xs:text-xs sm:text-sm font-medium backdrop-blur-md flex-shrink-0',
                  'border transition-all duration-300 min-w-[80px] text-center',
                  item.persona === 'recruiter' && 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20',
                  item.persona === 'founder' && 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20',
                  item.persona === 'cto' && 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20',
                  item.persona === 'data_scientist' && 'bg-violet-500/10 text-violet-400 border-violet-500/30 hover:bg-violet-500/20'
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
          {(currentPersona === 'recruiter' || currentPersona === 'founder' || currentPersona === 'data_scientist' || currentPersona === 'unknown') && (
            <Suspense fallback={<div className="h-32 animate-pulse bg-zinc-900/50 rounded-2xl" />}>
              <ProofStrip
                metrics={['20+ Repos', '2 Degrees', '98% mAP', 'Web3 & AI']}
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

// Outer shell with TamboProvider and dynamic tool registration
function PortfolioWithTools() {
  const [currentPersona, setCurrentPersona] = useState<Persona>('unknown');
  const [aiReasoning, setAiReasoning] = useState<string>('');

  // Create tools with state setters - must be stable references
  const tools = useMemo(() => [
    createPersonaTool(setCurrentPersona, setAiReasoning)
  ], []);

  return (
    <ChameleonProvider tools={tools}>
      <PortfolioContentWithState
        currentPersona={currentPersona}
        setCurrentPersona={setCurrentPersona}
        aiReasoning={aiReasoning}
        setAiReasoning={setAiReasoning}
      />
    </ChameleonProvider>
  );
}

// Export the main App with Tambo integration
export default function App() {
  return <PortfolioWithTools />;
}
