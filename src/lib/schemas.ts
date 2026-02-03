import { z } from 'zod';

// LayoutShell Schema - Controls the overall page grid
export const LayoutShellSchema = z.object({
  mode: z.enum(['resume', 'pitch', 'technical']).describe(
    'Layout mode: resume for recruiters (vertical stack), pitch for founders (masonry grid), technical for CTOs (two-column)'
  ),
  emphasis: z.enum(['speed', 'depth']).describe(
    'Content emphasis: speed for quick reads, depth for detailed exploration'
  ),
});
export type LayoutShellProps = z.infer<typeof LayoutShellSchema>;

// AdaptiveHero Schema - Dynamic hero section
export const AdaptiveHeroSchema = z.object({
  headline: z.string().describe('Main headline text for the hero section'),
  subtext: z.string().describe('Supporting text under the headline'),
  vibe: z.enum(['corporate', 'startup']).describe(
    'Visual style: corporate for clean professional look, startup for bold dynamic style'
  ),
});
export type AdaptiveHeroProps = z.infer<typeof AdaptiveHeroSchema>;

// SkillGrid Schema - Skills display
export const SkillGridSchema = z.object({
  skills: z.array(z.string()).describe('Array of skill names to display'),
  focus: z.enum(['breadth', 'depth']).describe(
    'Display mode: breadth for compact tags (recruiter), depth for detailed cards (CTO)'
  ),
});
export type SkillGridProps = z.infer<typeof SkillGridSchema>;

// ProjectShowcase Schema - Project cards
export const ProjectShowcaseSchema = z.object({
  projectIds: z.array(z.string()).describe(
    'Array of project IDs from portfolio-data.ts to display'
  ),
  emphasis: z.enum(['outcomes', 'architecture']).describe(
    'Display emphasis: outcomes for metrics/ROI (founder), architecture for tech details (CTO)'
  ),
});
export type ProjectShowcaseProps = z.infer<typeof ProjectShowcaseSchema>;

// ProofStrip Schema - Credibility metrics
export const ProofStripSchema = z.object({
  metrics: z.array(z.string()).describe('Array of key metrics/achievements to display'),
  style: z.enum(['minimal', 'prominent']).describe(
    'Display style: minimal for subtle, prominent for emphasized'
  ),
});
export type ProofStripProps = z.infer<typeof ProofStripSchema>;

// ContactAction Schema - Interactable contact form
export const ContactActionSchema = z.object({
  intent: z.enum(['hiring', 'freelance']).describe(
    'Contact intent: hiring for job opportunities, freelance for project work'
  ),
  prefilledMessage: z.string().optional().describe(
    'Optional pre-filled message based on detected intent'
  ),
});
export type ContactActionProps = z.infer<typeof ContactActionSchema>;

// Persona type for internal use
export const PersonaSchema = z.enum(['recruiter', 'founder', 'cto', 'unknown']);
export type Persona = z.infer<typeof PersonaSchema>;

// Persona detection signals
export const PERSONA_SIGNALS = {
  recruiter: ['hire', 'hiring', 'resume', 'salary', 'position', 'role', 'candidate', 'interview', 'cv'],
  founder: ['mvp', 'startup', 'funding', 'revenue', 'business', 'product', 'launch', 'build', 'scale'],
  cto: ['architecture', 'scalability', 'codebase', 'stack', 'technical', 'system', 'infrastructure', 'api'],
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
