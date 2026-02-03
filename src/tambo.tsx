import { TamboProvider, type TamboComponent } from '@tambo-ai/react';
import {
  LayoutShellSchema,
  AdaptiveHeroSchema,
  SkillGridSchema,
  ProjectShowcaseSchema,
  ProofStripSchema,
  ContactActionSchema,
} from '@/lib/schemas';
import {
  LayoutShell,
  AdaptiveHero,
  SkillGrid,
  ProjectShowcase,
  ProofStrip,
} from '@/components/generative';
import { ContactAction } from '@/components/interactable';

// Component registry for Tambo
export const componentRegistry: TamboComponent[] = [
  {
    name: 'LayoutShell',
    component: LayoutShell,
    propsSchema: LayoutShellSchema,
    description: 'Main layout wrapper that controls grid structure based on detected persona mode. ALWAYS render this as the root.',
  },
  {
    name: 'AdaptiveHero',
    component: AdaptiveHero,
    propsSchema: AdaptiveHeroSchema,
    description: 'Dynamic hero section with persona-specific styling. Render this first inside LayoutShell.',
  },
  {
    name: 'SkillGrid',
    component: SkillGrid,
    propsSchema: SkillGridSchema,
    description: 'Skills display that adapts between compact tags and detailed cards.',
  },
  {
    name: 'ProjectShowcase',
    component: ProjectShowcase,
    propsSchema: ProjectShowcaseSchema,
    description: 'Project cards showing outcomes for founders or architecture for CTOs.',
  },
  {
    name: 'ProofStrip',
    component: ProofStrip,
    propsSchema: ProofStripSchema,
    description: 'Credibility metrics strip for immediate social proof. Good for "pitch" mode.',
  },
  {
    name: 'ContactAction',
    component: ContactAction,
    propsSchema: ContactActionSchema,
    description: 'Interactive contact form with hiring/freelance intent toggle. Render this last.',
  },
];

// System prompt for persona detection
// Copy this to the "Custom Instructions" section in your Tambo Dashboard
export const SYSTEM_PROMPT = `You are Chameleon, an intent-adaptive portfolio orchestrator. Your job is to DESIGN THE PAGE, not to chat. NEVER respond with plain text. ALWAYS render a LayoutShell first, then choose components (AdaptiveHero, SkillGrid, ProjectShowcase) based on whether the user is a Recruiter, Founder, or CTO. Use a professional, engineering-focused tone.

## Core Rules
1. ALWAYS render components. NEVER output raw text or chat.
2. ALWAYS start with a LayoutShell component as the root.
3. ALWAYS detect persona from user input and adapt the layout accordingly.

## Persona Detection Rules
Analyze the user's message for these signals:

**Recruiter Signals:** hire, hiring, resume, salary, position, role, candidate, interview, cv, job
→ Use: mode="resume", vibe="corporate", focus="breadth", emphasis="outcomes", style="minimal"

**Founder Signals:** mvp, startup, funding, revenue, business, product, launch, build, scale, customers
→ Use: mode="pitch", vibe="startup", focus="breadth", emphasis="outcomes", style="prominent"

**CTO Signals:** architecture, scalability, codebase, stack, technical, system, infrastructure, api, engineering
→ Use: mode="technical", vibe="corporate", focus="depth", emphasis="architecture", style="minimal"

**Unknown/Default:**
→ Use: mode="resume", vibe="corporate", focus="breadth", emphasis="outcomes"

## Component Hierarchy
Always render in this order within LayoutShell:
1. AdaptiveHero (required - always first)
2. ProofStrip (highly recommended for founders/recruiters)
3. SkillGrid (required)
4. ProjectShowcase (required)
5. ContactAction (required - always last)

## Available Project IDs
- kaggle-ingest
- dub-wizard
- json-parser
- reminder-system`;

// TamboProvider wrapper component
interface ChameleonProviderProps {
  children: React.ReactNode;
  apiKey?: string;
}

export function ChameleonProvider({ children, apiKey }: ChameleonProviderProps) {
  return (
    <TamboProvider
      apiKey={apiKey || import.meta.env.VITE_TAMBO_API_KEY || ''}
      components={componentRegistry}
    >
      {children}
    </TamboProvider>
  );
}
