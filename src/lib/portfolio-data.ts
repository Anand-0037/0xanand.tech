
export interface Project {
  id: string;
  type: string;
  name: string;
  description: string;
  metrics: string[];
  businessValue: string;
  technicalDepth: string;
  stack: string[];
  // This 'tags' field is what makes the Polymath Engine work
  tags: ('frontend' | 'backend' | 'ai_ml' | 'mlops' | 'devops' | 'fullstack' | 'general')[];
  links: {
    github?: string;
    demo?: string;
  };
}

export const PORTFOLIO_DATA: {
  profile: {
    name: string;
    tagline: string;
    bio: { short: string; long: string };
    location: string;
    availability: string;
    email: string;
  };
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
  skills: {
    languages: string[];
    frontend: string[];
    backend: string[];
    ai_ml: string[];
    devops: string[];
    core: string[];
  };
  projects: Project[];
} = {
  profile: {
    name: "Anand Vashishtha",
    tagline: "Full Stack Engineer & Data Scientist",
    bio: {
      short: "Dual-degree student at ABES & IIT Madras building AI-native systems.",
      long: "I bridge the gap between Systems Engineering and Data Science. Currently orchestrating AI pipelines and building developer tools that optimize context efficiency."
    },
    location: "Ghaziabad, India",
    availability: "Open for Internships",
    email: "anandcollege07@gmail.com",
  },
  socials: {
    github: "https://github.com/Anand-0037",
    linkedin: "https://in.linkedin.com/in/anand-vashishtha-aba64b255",
    twitter: "https://x.com/AnandVashisht15",
    website: "https://0xanand.tech"
  },
  skills: {
    languages: ["Python", "C++", "JavaScript", "SQL"],
    frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    backend: ["FastAPI", "Node.js", "Supabase", "Docker"],
    ai_ml: ["LangChain", "OpenAI API", "TensorFlow", "Scikit-learn"],
    devops: ["Docker", "GitHub Actions", "AWS"],
    core: ["System Design", "DSA", "Linux"]
  },
  projects: [
    {
      id: "kaggle-ingest",
      type: "System Tool",
      name: "KaggleIngest",
      description: "Automated context extraction tool for LLM-assisted data science.",
      metrics: ["40% Token Reduction", "Active Users", "Toon Format"],
      businessValue: "Solves the 'Context Bottleneck' for data scientists, reducing hallucination rates and API costs.",
      technicalDepth: "Built with FastAPI and React. Implements custom parsing logic to convert heavy Jupyter notebooks into token-optimized text formats.",
      stack: ["FastAPI", "React", "Python", "Vercel"],
      tags: ["ai_ml", "backend", "fullstack"],
      links: {
        github: "https://github.com/Anand-0037/kaggle-ingest",
        demo: "https://kaggleingest.com"
      }
    },
    {
      id: "dub-wizard",
      type: "AI Pipeline",
      name: "DubWizard",
      description: "Multi-modal video dubbing pipeline using Whisper, GPT-4, and ElevenLabs.",
      metrics: ["End-to-End Auto", "95% Accuracy", "Multi-lingual"],
      businessValue: "Automates content localization, allowing creators to reach global audiences without manual translation costs.",
      technicalDepth: "Orchestrates three distinct AI models (Whisper, GPT-4, ElevenLabs) via a Python backend to handle transcription, translation, and synthesis.",
      stack: ["Python", "OpenAI Whisper", "ElevenLabs", "AWS S3"],
      tags: ["ai_ml", "backend", "fullstack"],
      links: {
        github: "https://github.com/Anand-0037/dub-wizard"
      }
    },
    {
      id: "json-parser",
      type: "Compiler Tool",
      name: "JSON Parser CLI",
      description: "A lexical and syntactical analyzer for JSON files built from scratch.",
      metrics: ["Zero Dependencies", "PyPI Published", "Recursive Descent"],
      businessValue: "Demonstrates deep understanding of compiler theory and low-level data processing.",
      technicalDepth: "Implements a custom Lexer and Parser using recursive descent algorithms. Handles tokenization and AST generation without external libraries.",
      stack: ["Python", "Compiler Theory", "CLI"],
      tags: ["backend", "devops", "general"],
      links: {
        github: "https://github.com/Anand-0037/json-parser"
      }
    },
    {
      id: "reminder-system",
      type: "Backend Service",
      name: "Async Reminder System",
      description: "Timezone-aware scheduling service using WhatsApp and SMS.",
      metrics: ["Async IO", "Twilio Integration", "Timezone Aware"],
      businessValue: "Reliable notification infrastructure for user engagement.",
      technicalDepth: "Uses AsyncIO for non-blocking scheduling. Handles complex timezone logic to ensure notifications arrive at local user time.",
      stack: ["Python", "Twilio API", "SQLite", "AsyncIO"],
      tags: ["backend", "devops"],
      links: {
        github: "https://github.com/Anand-0037/remainder-system"
      }
    }
  ]
};
