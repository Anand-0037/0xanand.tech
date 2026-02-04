import { z } from 'zod';
import { TamboProvider, TamboRegistryProvider, type TamboTool, defineTool } from '@tambo-ai/react';
import type { Persona } from '@/lib/schemas';

// Schema for the Persona Mode Tool
export const SetPersonaInputSchema = z.object({
  mode: z.enum(['recruiter', 'founder', 'cto', 'data_scientist', 'unknown'])
    .describe('The visitor persona detected from the conversation. Recruiter=hiring/HR/resume/job. Founder=startup/mvp/product/scale. CTO=technical/architecture/code/system. Data Scientist=AI/ML/data/models/research.'),
  reasoning: z.string()
    .describe('Brief explanation for the mode selection.'),
});

export const SetPersonaOutputSchema = z.object({
  success: z.boolean(),
  mode: z.string(),
  reasoning: z.string(),
});

// Type for the tool params
export type SetPersonaParams = z.infer<typeof SetPersonaInputSchema>;

// Tool Factory
// Bridges AI intent with React state updates
export const createPersonaTool = (
  setPersona: (p: Persona) => void,
  setReasoning: (r: string) => void
): TamboTool<SetPersonaParams, z.infer<typeof SetPersonaOutputSchema>> => {
  return defineTool({
    name: 'set_portfolio_mode',
    description: 'Call this function IMMEDIATELY when the user describes who they are or what they want. It changes the entire website layout to match their needs. Recruiters see resume-style. Founders see pitch-style with outcomes. CTOs see technical deep-dives.',
    inputSchema: SetPersonaInputSchema,
    outputSchema: SetPersonaOutputSchema,
    tool: (params: SetPersonaParams) => {
      // This runs on the client when the AI decides to call it
      setPersona(params.mode);
      setReasoning(params.reasoning);
      return { success: true, mode: params.mode, reasoning: params.reasoning };
    },
  });
};

// System prompt for persona detection
// This function injects the project ID dynamically for maintainability
export const getSystemPrompt = (projectId: string) => `You are Chameleon, an intent-adaptive portfolio engine (Project: ${projectId}). Your objective is to detect visitor intent and route them to the optimal interface mode.

## Persona Detection Rules
Analyze the user's message for these signals:

**Recruiter Signals:** hire, hiring, resume, salary, position, role, candidate, interview, cv, job, HR, talent
→ Call: set_portfolio_mode({ mode: "recruiter", reasoning: "..." })

**Founder Signals:** mvp, startup, funding, revenue, business, product, launch, build, scale, customers, idea, market
→ Call: set_portfolio_mode({ mode: "founder", reasoning: "..." })

**CTO Signals:** architecture, scalability, codebase, stack, technical, system, infrastructure, api, engineering, code, patterns
→ Call: set_portfolio_mode({ mode: "cto", reasoning: "..." })

**Data Scientist Signals:** ai, ml, machine learning, data, scientist, model, training, pytorch, research, llm, rag, dataset
→ Call: set_portfolio_mode({ mode: "data_scientist", reasoning: "..." })

**Unknown:** If the intent is unclear, use mode="unknown"

## Critical Rules
1. ALWAYS call set_portfolio_mode when you can detect any persona intent.
2. The "reasoning" field should be 1 sentence explaining the detection.
3. DO NOT engage in conversation. Your ONLY output is tool calls.
4. When in doubt, lean toward the most likely persona based on keywords.`;

// TamboProvider wrapper component with Registry
interface ChameleonProviderProps {
  children: React.ReactNode;
  tools?: TamboTool[];
  apiKey?: string;
  projectId?: string;
}

export function ChameleonProvider({ children, tools = [], apiKey, projectId }: ChameleonProviderProps) {
  const envApiKey = (import.meta.env.VITE_TAMBO_API_KEY as string) ?? '';
  const envProjectId = (import.meta.env.VITE_TAMBO_PROJECT_ID as string) ?? '';

  const finalApiKey = apiKey ?? envApiKey;
  const finalProjectId = projectId ?? envProjectId;

  // LOUD warning if API keys are missing - this is the #1 cause of infinite loading
  if (!finalApiKey) {
    console.error('\n🚨 CRITICAL: VITE_TAMBO_API_KEY is MISSING!\n\nCreate a .env file in /chameleon with:\nVITE_TAMBO_API_KEY=your_api_key_here\nVITE_TAMBO_PROJECT_ID=your_project_id\n\nThen restart the dev server.\n');
  }
  if (!finalProjectId) {
    console.error('\n🚨 CRITICAL: VITE_TAMBO_PROJECT_ID is MISSING!\n\nAdd it to your .env file.\n');
  }

  return (
    <TamboProvider
      apiKey={finalApiKey}
      // @ts-expect-error - Some versions of SDK require projectId even if types don't reflect it
      projectId={finalProjectId}
    >
      <TamboRegistryProvider tools={tools}>
        {children}
      </TamboRegistryProvider>
    </TamboProvider>
  );
}
