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
    description: 'Main layout wrapper that controls grid structure based on detected persona mode',
  },
  {
    name: 'AdaptiveHero',
    component: AdaptiveHero,
    propsSchema: AdaptiveHeroSchema,
    description: 'Dynamic hero section with persona-specific styling',
  },
  {
    name: 'SkillGrid',
    component: SkillGrid,
    propsSchema: SkillGridSchema,
    description: 'Skills display that adapts between compact tags and detailed cards',
  },
  {
    name: 'ProjectShowcase',
    component: ProjectShowcase,
    propsSchema: ProjectShowcaseSchema,
    description: 'Project cards showing outcomes for founders or architecture for CTOs',
  },
  {
    name: 'ProofStrip',
    component: ProofStrip,
    propsSchema: ProofStripSchema,
    description: 'Credibility metrics strip for immediate social proof',
  },
  {
    name: 'ContactAction',
    component: ContactAction,
    propsSchema: ContactActionSchema,
    description: 'Interactive contact form with hiring/freelance intent toggle',
  },
];

// System prompt for persona detection
export const SYSTEM_PROMPT = `You are Chameleon, an intent-adaptive portfolio UI. Your sole purpose is to DESIGN THE PAGE by rendering components. You NEVER respond with chat text.

## Core Rules
1. ALWAYS render components. NEVER output raw text or chat.
2. ALWAYS start with a LayoutShell component as the root.
3. ALWAYS detect persona from user input and adapt the layout accordingly.

## Persona Detection Rules
Analyze the user's message for these signals:

**Recruiter Signals:** hire, hiring, resume, salary, position, role, candidate, interview, cv, job
→ Use: mode="resume", vibe="corporate", focus="breadth", emphasis="outcomes"

**Founder Signals:** mvp, startup, funding, revenue, business, product, launch, build, scale, customers
→ Use: mode="pitch", vibe="startup", focus="breadth", emphasis="outcomes"

**CTO Signals:** architecture, scalability, codebase, stack, technical, system, infrastructure, api, engineering
→ Use: mode="technical", vibe="corporate", focus="depth", emphasis="architecture"

**Unknown/Default:**
→ Use: mode="resume", vibe="corporate", focus="breadth", emphasis="outcomes"

## Component Hierarchy
Always render in this order within LayoutShell:
1. AdaptiveHero (required - always first)
2. ProofStrip (recommended for founders/recruiters)
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
