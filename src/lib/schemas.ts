export type Persona = 'recruiter' | 'founder' | 'cto' | 'data_scientist' | 'unknown';

export interface PersonaConfig {
  headline: string;
  subhead: string;
  primaryMetric: string; // e.g. "Years Exp" vs "Products Shipped"
  layoutMode: 'resume' | 'pitch' | 'technical';
  emphasis: 'speed' | 'outcomes' | 'depth'; // controls spacing/density
  vibe: 'clean' | 'bold' | 'matrix'; // controls visual flair
  skillFocus: 'broad' | 'product' | 'architecture';
  projectEmphasis: 'outcomes' | 'architecture';
  domain: 'general' | 'web3' | 'ai' | 'infra';
  contactIntent: 'hire' | 'partner' | 'audit';
}

// Fallback Heuristic (If API fails or for instant optimistic UI)
export function detectPersona(text: string): Persona {
  const t = text.toLowerCase();

  const recruiterKeywords = ['hiring', 'resume', 'hr', 'job', 'candidate', 'interview', 'role', 'salary', 'staff', 'recruiter'];
  const founderKeywords = ['startup', 'mvp', 'idea', 'market', 'launch', 'product', 'business', 'revenue', 'users', 'growth', 'founder', 'ceo'];
  const ctoKeywords = ['stack', 'architecture', 'scale', 'cto', 'tech', 'system', 'backend', 'infrastructure', 'database', 'api', 'code', 'refactor', 'devops'];
  const dsKeywords = ['ai', 'ml', 'data', 'scientist', 'model', 'training', 'pytorch', 'rag', 'llm', 'inference', 'accuracy', 'research'];

  if (dsKeywords.some(k => t.includes(k))) return 'data_scientist';
  if (recruiterKeywords.some(k => t.includes(k))) return 'recruiter';
  if (founderKeywords.some(k => t.includes(k))) return 'founder';
  if (ctoKeywords.some(k => t.includes(k))) return 'cto';

  return 'unknown';
}

export function getPersonaConfig(p: Persona): PersonaConfig {
  switch (p) {
    case 'recruiter':
      return {
        headline: "Senior Full-Stack Engineer",
        subhead: "Ready to deploy. 4 years exp. ex-KaggleIngest.",
        primaryMetric: "Time to Hire",
        layoutMode: 'resume',
        emphasis: 'speed',
        vibe: 'clean',
        skillFocus: 'broad',
        projectEmphasis: 'outcomes',
        domain: 'general',
        contactIntent: 'hire'
      };
    case 'founder':
      return {
        headline: "0 → 1 Product Builder",
        subhead: "I build MVPs that scale. Let's ship your idea.",
        primaryMetric: "Time to Market",
        layoutMode: 'pitch',
        emphasis: 'outcomes',
        vibe: 'bold',
        skillFocus: 'product',
        projectEmphasis: 'outcomes',
        domain: 'general',
        contactIntent: 'partner'
      };
    case 'cto':
      return {
        headline: "Systems Architect",
        subhead: "Clean code. Scalable infra. Type-safe.",
        primaryMetric: "Uptime / Scale",
        layoutMode: 'technical',
        emphasis: 'depth',
        vibe: 'matrix',
        skillFocus: 'architecture',
        projectEmphasis: 'architecture',
        domain: 'infra',
        contactIntent: 'audit'
      };
    case 'data_scientist':
      return {
        headline: "Applied AI Engineer",
        subhead: "Fine-tuning LLMs & Deploying RAG Pipelines.",
        primaryMetric: "Model Accuracy",
        layoutMode: 'technical',
        emphasis: 'depth',
        vibe: 'matrix',
        skillFocus: 'architecture',
        projectEmphasis: 'architecture', // focuses on stack/methods
        domain: 'ai',
        contactIntent: 'partner'
      };
    default:
      return {
        headline: "Software Engineer",
        subhead: "Building intelligent web applications.",
        primaryMetric: "Projects",
        layoutMode: 'resume',
        emphasis: 'speed',
        vibe: 'clean',
        skillFocus: 'broad',
        projectEmphasis: 'outcomes',
        domain: 'general',
        contactIntent: 'hire'
      };
  }
}

// ------------------------------------------------------------------
// COMPONENT PROPS (Shared across Generative UI)
// ------------------------------------------------------------------


export interface AdaptiveHeroProps {
  headline?: string;
  subtext?: string;
  vibe: 'clean' | 'bold' | 'matrix';
  persona?: Persona;
}

export interface ProofStripProps {
  metrics: string[];
  style: 'prominent' | 'minimal';
}

export interface SkillGridProps {
  skills: string[];
  focus: 'broad' | 'product' | 'architecture';
}

export interface ContactActionProps {
  intent: 'hire' | 'partner' | 'audit';
  prefilledMessage?: string;
}

export interface LayoutShellProps {
  mode: 'resume' | 'pitch' | 'technical';
  emphasis: 'speed' | 'outcomes' | 'depth'; // controls spacing/density
  domain: 'general' | 'web3' | 'ai' | 'infra'; // controls subtle background nuances
}

export interface ProjectShowcaseProps {
  projectIds: string[]; // Controlled by the persona
  emphasis: 'outcomes' | 'architecture';
  domain: 'general' | 'web3' | 'ai' | 'infra';
}
