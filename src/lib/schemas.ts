import { z } from 'zod';

// LayoutShell Schema - Controls the overall page grid
export const LayoutShellSchema = z.object({
  mode: z.enum(['resume', 'pitch', 'technical']).describe(
    'The overall layout structure. "resume": vertical stack for recruiters. "pitch": masonry grid for founders/investors. "technical": two-column documentation style for CTOs.'
  ),
  emphasis: z.enum(['speed', 'depth']).describe(
    'Content density. "speed": scannable, high-level highlights (Recruiters/Founders). "depth": detailed technical deep-dives (CTOs).'
  ),
});
export type LayoutShellProps = z.infer<typeof LayoutShellSchema>;

// AdaptiveHero Schema - Dynamic hero section
export const AdaptiveHeroSchema = z.object({
  headline: z.string().describe(
    'The main H1 title. Should be "Anand [LastName]" for recruiters, or a role-based title like "Full-Stack Engineer" for technical roles.'
  ),
  subtext: z.string().describe(
    'Supporting subtitle. Professional summary for recruiters, value proposition for founders, or tech stack highlights for CTOs.'
  ),
  vibe: z.enum(['corporate', 'startup']).describe(
    'Visual theme. "corporate": clean, stable, blue/slate tones (Recruiters/CTOs). "startup": bold, aggressive, high-contrast, neon accents (Founders).'
  ),
});
export type AdaptiveHeroProps = z.infer<typeof AdaptiveHeroSchema>;

// SkillGrid Schema - Skills display
export const SkillGridSchema = z.object({
  skills: z.array(z.string()).describe(
    'List of technical skills to display. For recruiters: high-level keywords (React, Node). For CTOs: specific tools/libraries (Redux, tRPC, Docker).'
  ),
  focus: z.enum(['breadth', 'depth']).describe(
    'Visual format. "breadth": Compact tags/badges for quick scanning. "depth": Detailed cards with proficiency bars for technical evaluation.'
  ),
});
export type SkillGridProps = z.infer<typeof SkillGridSchema>;

// ProjectShowcase Schema - Project cards
export const ProjectShowcaseSchema = z.object({
  projectIds: z.array(z.string()).describe(
    'IDs of projects to render (e.g., "kaggle-ingest", "json-parser"). Select projects relevant to the persona (e.g., detailed backend systems for CTOs, product MVPs for Founders).'
  ),
  emphasis: z.enum(['outcomes', 'architecture']).describe(
    'Content focus within cards. "outcomes": Business value, ROI, user metrics (Founders). "architecture": Tech stack, patterns, optimization (CTOs).'
  ),
});
export type ProjectShowcaseProps = z.infer<typeof ProjectShowcaseSchema>;

// ProofStrip Schema - Credibility metrics
export const ProofStripSchema = z.object({
  metrics: z.array(z.string()).describe(
    'Key achievements strings (e.g., "4+ Years Exp", "GSoC Winner"). Select stats that impress the specific persona.'
  ),
  style: z.enum(['minimal', 'prominent']).describe(
    'Visual weight. "minimal": Subtle strip (Recruiters). "prominent": Large, bold numbers with icons (Founders/Startups).'
  ),
});
export type ProofStripProps = z.infer<typeof ProofStripSchema>;

// ContactAction Schema - Interactable contact form
export const ContactActionSchema = z.object({
  intent: z.enum(['hiring', 'freelance']).describe(
    'Primary call-to-action intent. "hiring": Schedule interview/Download Resume. "freelance": Book consultation/Project inquiry.'
  ),
  prefilledMessage: z.string().optional().describe(
    'Auto-generated message draft based on context. e.g., "I saw your backend projects and..."'
  ),
});
export type ContactActionProps = z.infer<typeof ContactActionSchema>;

// Persona type for internal use
export const PersonaSchema = z.enum(['recruiter', 'founder', 'cto', 'unknown']);
export type Persona = z.infer<typeof PersonaSchema>;

// Persona detection signals
export const PERSONA_SIGNALS = {
  recruiter: ['hire', 'hiring', 'resume', 'salary', 'position', 'role', 'candidate', 'interview', 'cv', 'job'],
  founder: ['mvp', 'startup', 'funding', 'revenue', 'business', 'product', 'launch', 'build', 'scale', 'customers'],
  cto: ['architecture', 'scalability', 'codebase', 'stack', 'technical', 'system', 'infrastructure', 'api', 'engineering'],
};

// Utility function to detect persona from text
export function detectPersona(text: string): Persona {
  const lowercaseText = text.toLowerCase();

  let maxScore = 0;
  let detectedPersona: Persona = 'unknown';

  for (const [persona, signals] of Object.entries(PERSONA_SIGNALS)) {
    const score = signals.filter(signal => lowercaseText.includes(signal)).length;
    if (score > maxScore) {
      maxScore = score;
      detectedPersona = persona as Persona;
    }
  }

  // Confidence threshold
  if (maxScore === 0) {
    return 'unknown';
  }

  return detectedPersona;
}

// Map persona to component props
export function getPersonaConfig(persona: Persona) {
  switch (persona) {
    case 'recruiter':
      return {
        layoutMode: 'resume' as const,
        emphasis: 'speed' as const,
        vibe: 'corporate' as const,
        skillFocus: 'breadth' as const,
        projectEmphasis: 'outcomes' as const,
        contactIntent: 'hiring' as const,
      };
    case 'founder':
      return {
        layoutMode: 'pitch' as const,
        emphasis: 'speed' as const,
        vibe: 'startup' as const,
        skillFocus: 'breadth' as const,
        projectEmphasis: 'outcomes' as const,
        contactIntent: 'freelance' as const,
      };
    case 'cto':
      return {
        layoutMode: 'technical' as const,
        emphasis: 'depth' as const,
        vibe: 'corporate' as const,
        skillFocus: 'depth' as const,
        projectEmphasis: 'architecture' as const,
        contactIntent: 'hiring' as const,
      };
    default:
      return {
        layoutMode: 'resume' as const,
        emphasis: 'speed' as const,
        vibe: 'corporate' as const,
        skillFocus: 'breadth' as const,
        projectEmphasis: 'outcomes' as const,
        contactIntent: 'hiring' as const,
      };
  }
}
