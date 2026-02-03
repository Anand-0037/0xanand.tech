// src/lib/portfolio-data.ts

export const PORTFOLIO_DATA = {
  profile: {
    name: "Anand Vashishtha",
    tagline: "Full-Stack Engineer & Data Scientist",
    bio: {
      short: "Dual-degree student (ABES & IIT Madras) bridging Systems Engineering with AI Orchestration.",
      long: "I am a builder focused on the intersection of Full-Stack Engineering and Data Science. Currently pursuing a dual-degree path (B.Tech CSE + BS Data Science @ IIT Madras). I specialize in breaking the 'Context Bottleneck' in AI applications and building resilient, asynchronous systems.",
    },
    location: "Ghaziabad, India",
    email: "anandcollege07@gmail.com",
    availability: "Open for Internships & GSoC '26",
  },

  socials: {
    github: "https://github.com/Anand-0037",
    linkedin: "https://linkedin.com/in/anand-vashishtha-aba64b255",
    twitter: "https://x.com/AnandVashisht15",
    kaggle: "https://kaggle.com/anandvashishtha5362",
    medium: "https://medium.com/@anandcollege07",
    website: "https://kaggleingest.com",
  },

  // Categorized for the "SkillGrid" component
  skills: {
    languages: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "C"],
    frontend: ["React.js", "Next.js", "Tailwind CSS", "Shadcn/UI", "Framer Motion"],
    backend: ["FastAPI (Async)", "Node.js", "Supabase", "PostgreSQL", "SQLite"],
    ai_ml: ["LangChain", "OpenAI Whisper", "TensorFlow", "Scikit-learn", "Groq API"],
    devops: ["Docker", "AWS S3", "Git", "Linux (Ubuntu)", "Twilio API"],
    core: ["System Design", "Compiler Theory", "DSA", "Prompt Orchestration"],
  },

  // "Education" is critical for the Recruiter Persona
  education: [
    {
      institution: "IIT Madras",
      degree: "BS in Data Science & Applications",
      years: "2024 - 2028",
      status: "Concurrent Pursuit",
      highlight: "Focus on Math, Statistics, and Machine Learning foundations.",
    },
    {
      institution: "ABES Engineering College",
      degree: "B.Tech in Computer Science & Engineering",
      years: "2024 - 2028",
      status: "Current",
      highlight: "Focus on Hardware-Software interfaces and Classical Engineering.",
    },
  ],

  // The Heart of Chameleon: Projects with Persona-Specific Data (DOMAIN-TAGGED)
  projects: [
    {
      id: "kaggle-ingest",
      name: "KaggleIngest",
      type: "Product",
      tags: ["ai_ml", "backend", "mlops", "fullstack"], // DOMAIN TAGS
      links: {
        demo: "https://kaggleingest.com",
        github: "https://github.com/Anand-0037/KaggleIngest",
      },
      // Recruiter View (Standard)
      description: "AI-powered platform that transforms Kaggle competition data into token-optimized context for LLMs.",
      stack: ["Next.js", "FastAPI", "MongoDB", "TOON Format", "Kaggle API"],

      // Founder View (Metrics & ROI)
      metrics: [
        "40% Token Reduction",
        "Live SaaS Product",
        "Solves Context Window Limits",
      ],
      businessValue: "Eliminates manual data prep for data scientists, enabling faster iterations and higher Kaggle rankings.",

      // CTO View (Architecture & Complexity)
      technicalDepth: "Implemented a custom ingestion pipeline using the TOON format. Built an async FastAPI backend to handle large dataset schemas without blocking. Features private Kaggle API integration and intelligent rate-limiting.",
    },
    {
      id: "agi-with-ai",
      name: "AGIwithAI",
      type: "Venture",
      tags: ["ai_ml", "research", "future"], // DOMAIN TAGS
      links: {
        demo: "https://agiwithai.com",
      },
      description: "An upcoming research lab and content platform exploring the frontiers of Artificial General Intelligence.",
      stack: ["Research", "Community", "AI Theory", "Memory Systems"],

      metrics: [
        "Concept Phase",
        "Building Brains",
        "Human-AI Synergy",
      ],
      businessValue: "Positioning to be a thought leader in the post-LLM era, focusing on AI memory and agency.",

      technicalDepth: "Currently in R&D phase exploring architectures for long-term AI memory (Mem0, Supermemory) and autonomous agentic workflows. Focus on breaking the stateless bottleneck of current LLMs.",
    },
    {
      id: "dub-wizard",
      name: "DubWizard",
      type: "AI Pipeline",
      tags: ["ai_ml", "backend", "media"], // DOMAIN TAGS
      links: {
        github: "https://github.com/Anand-0037/DubWizard",
      },
      description: "Automated video dubbing pipeline utilizing multi-modal AI models (Whisper, GPT-4, ElevenLabs).",
      stack: ["React", "FastAPI", "OpenAI Whisper", "ElevenLabs"],

      metrics: [
        "Multi-modal Orchestration",
        "Preserves Tone",
        "Scalable Architecture",
      ],
      businessValue: "Breaks language barriers for content creators by automating professional-grade dubbing at scale.",

      technicalDepth: "Orchestrated a complex DAG of AI models: Speech-to-Text (Whisper) -> Translation (GPT-4) -> Text-to-Speech (ElevenLabs). Managed via a monorepo structure with isolated frontend/backend concerns.",
    },
    {
      id: "json-parser",
      name: "JSON Parser CLI",
      type: "System Tool",
      tags: ["backend", "core", "devops"], // DOMAIN TAGS
      links: {
        github: "https://github.com/Anand-0037/json-parser",
        pypi: "https://pypi.org/project/json-parser-cli/",
      },
      description: "A CLI tool for lexical and syntactic analysis of JSON files, built from scratch.",
      stack: ["Python", "CLI", "Compiler Theory"],

      metrics: [
        "Zero Dependencies",
        "Recursive Descent",
        "PyPI Published",
      ],
      businessValue: "Demonstrates fundamental computer science understanding beyond high-level framework usage.",

      technicalDepth: "Implemented a custom Lexer and Parser. Handles tokenization and validation of nested structures using recursive descent algorithms. Supports non-standard JSON features like comments.",
    },
    {
      id: "reminder-system",
      name: "Async Reminder System",
      type: "Backend Service",
      tags: ["backend", "devops"], // DOMAIN TAGS
      links: {
        github: "https://github.com/Anand-0037/remainder-system",
      },
      description: "WhatsApp/SMS scheduler handling global timezones.",
      stack: ["Python", "Twilio API", "SQLite", "AsyncIO"],

      metrics: [
        "Timezone Aware Scheduling",
        "Mock Client for Testing",
        "Robust Error Handling",
      ],
      businessValue: "Ensures notifications reach users at their local time, improving engagement rates.",

      technicalDepth: "Built an asynchronous scheduler loop. Implemented a 'Mock Client' mode (APP_ENV=test) to save API credits during development. Uses SQLite for lightweight persistence.",
    },
  ],

  // Writing & Community (Good for Recruiters/Founders)
  content: [
    {
      title: "Google Antigravity: From Coding to Architecting",
      platform: "Medium",
      link: "https://medium.com/@anandcollege07",
      topic: "The shift in engineering value from syntax to system design.",
    },
    {
      title: "The Digital Death Problem",
      platform: "Medium",
      link: "https://medium.com/@anandcollege07",
      topic: "Philosophy of digital existence and session persistence.",
    },
    {
      title: "System Design Post-Mortem: AI Jailbreaking",
      platform: "Dev.to",
      link: "#",
      topic: "Scaling Supabase and handling connection exhaustion under load.",
    }
  ]
};

// Type exports for components
export type Project = typeof PORTFOLIO_DATA.projects[number];
export type Education = typeof PORTFOLIO_DATA.education[number];
export type Skills = typeof PORTFOLIO_DATA.skills;
export type Profile = typeof PORTFOLIO_DATA.profile;
