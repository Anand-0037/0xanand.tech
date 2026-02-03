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

  // The Heart of Chameleon: Projects with Persona-Specific Data
  projects: [
    {
      id: "kaggle-ingest",
      name: "KaggleIngest",
      type: "Product",
      links: {
        demo: "https://kaggleingest.com",
        github: "https://github.com/Anand-0037/KaggleIngest",
      },
      // Recruiter View (Standard)
      description: "A Full-Stack developer tool that transforms Kaggle datasets into LLM-ready context.",
      stack: ["Next.js", "FastAPI", "MongoDB", "Kaggle API"],

      // Founder View (Metrics & ROI)
      metrics: [
        "40% Token Cost Reduction",
        "Processes Context in <30s",
        "Solves LLM Context Bottleneck",
      ],
      businessValue: "Eliminates the friction of manual copy-pasting for Data Scientists, increasing AI coding efficiency.",

      // CTO View (Architecture & Complexity)
      technicalDepth: "Implemented a TOON format extraction pipeline. Uses an asynchronous FastAPI backend to handle massive schema ingestion without blocking. Solved rate-limiting issues via intelligent queuing.",
    },
    {
      id: "dub-wizard",
      name: "DubWizard",
      type: "AI Pipeline",
      links: {
        github: "https://github.com/Anand-0037/DubWizard",
      },
      description: "Automated video dubbing pipeline utilizing multi-modal AI models.",
      stack: ["React", "FastAPI", "OpenAI Whisper", "ElevenLabs"],

      metrics: [
        "Multi-modal Orchestration",
        "Preserves Emotional Tone",
        "Scalable S3 Storage",
      ],
      businessValue: "Breaks language barriers for content creators by automating professional-grade dubbing.",

      technicalDepth: "Orchestrated a pipeline of 'Ear' (Whisper), 'Translator' (GPT-4), and 'Voice' (ElevenLabs). Managed complexity using a Kiro monorepo structure to separate frontend/backend concerns.",
    },
    {
      id: "json-parser",
      name: "JSON Parser CLI",
      type: "System Tool",
      links: {
        github: "https://github.com/Anand-0037/json-parser",
        pypi: "https://pypi.org/project/json-parser-cli/",
      },
      description: "A CLI tool for lexical and syntactic analysis of JSON files.",
      stack: ["Python", "CLI", "Compiler Theory"],

      metrics: [
        "Published on PyPI",
        "Zero Runtime Dependencies",
        "Recursive Descent Parsing",
      ],
      businessValue: "Demonstrates deep understanding of low-level parsing logic beyond using standard libraries.",

      technicalDepth: "Implemented a custom Lexer and Parser from scratch. Handles tokenization of primitive types and validates nesting using recursive descent logic. Supports non-standard JSON comments.",
    },
    {
      id: "reminder-system",
      name: "Async Reminder System",
      type: "Backend Service",
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
