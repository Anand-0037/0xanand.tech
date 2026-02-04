// src/lib/portfolio-data.ts

export interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  tech: string[];
  stack: string[];
  links: { github?: string; demo?: string };
  metrics: string[];
  businessValue?: string;
  technicalDepth?: string;
  tags?: string[];
  comingSoon?: boolean; // <--- The optional property causing the issue
}

// NEW: Define the shape of the main data object
export interface PortfolioData {
  profile: {
    name: string;
    tagline: string;
    bio: { short: string; long: string };
    location: string;
    email: string;
    availability: string;
  };
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
  skills: Record<string, string[]>;
  projects: Project[]; // <--- Explicitly typing this array solves the error
}

// NEW: Apply the type annotation here
export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Anand Vashishtha",
    tagline: "Engineering Intelligence.",
    bio: {
      short: "Full-Stack Engineer & AI Specialist.",
      long: "I bridge the gap between Research (ML/Data Science) and Production (Web3/Full-Stack). B.Tech CSE '28 & BS Data Science (IIT Madras)."
    },
    location: "Ghaziabad, India",
    email: "anandcollege07@gmail.com",
    availability: "Open for Internships"
  },
  socials: {
    github: "https://github.com/Anand-0037",
    linkedin: "https://www.linkedin.com/in/anand-vashishtha-aba64b255",
    twitter: "https://x.com/AnandVashisht15",
    website: "https://0xanand.tech"
  },
  skills: {
    languages: ["Python", "C++", "JavaScript", "Rust", "SQL"],
    frontend: ["React 19", "TypeScript", "Tailwind v4", "Framer Motion", "Next.js"],
    backend: ["FastAPI", "Python", "Docker", "PostgreSQL", "System Design"],
    ai_ml: ["PyTorch", "YOLOv8", "LangChain", "RAG Systems", "HuggingFace"],
    devops: ["Docker", "GitHub Actions", "AWS", "Vercel"],
    core: ["DSA", "OOP", "Compiler Design", "Generative UI"]
  },
  projects: [
    {
      id: "agi-with-ai",
      name: "AGIwithAI",
      type: "AI Exploration Hub",
      description: "A specialized portal and landing page for AGI research, open-source AI labs, and resource libraries.",
      stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
      tech: ["AI/ML"],
      links: { demo: "https://agiwithai.com" },
      metrics: ["AGI Research Hub", "Interactive UI", "Resource Library"],
      businessValue: "Provides a centralized platform for the AGI community to explore labs and research resources.",
      technicalDepth: "Built with Next.js App Router for high performance and Framer Motion for premium, smooth transitions.",
      tags: ["ai_ml", "frontend", "ux", "ai"]
    },
    {
      id: "kaggle-ingest",
      name: "KaggleIngest",
      type: "AI Platform",
      description: "A context-aware ingestion engine that converts Kaggle competitions into token-optimized formats for LLM analysis.",
      stack: ["Next.js", "FastAPI", "MongoDB", "Kaggle API"],
      tech: ["Next.js"],
      links: { github: "https://github.com/Anand-0037/kaggle-ingest", demo: "https://kaggleingest.com" },
      metrics: ["500+ Users", "Context Optimization", "Live Product"],
      businessValue: "Reduces competition research time from hours to minutes for data scientists.",
      technicalDepth: "Implemented a custom scraping pipeline and prompt engineering layer to summarize notebooks.",
      tags: ["ai_ml", "fullstack", "product", "data_science", "ai"]
    },
    {
      id: "sui-nft",
      name: "Sui NFT Minting Engine",
      type: "Web3 dApp",
      description: "A decentralized NFT minting platform on the Sui blockchain featuring wallet integration and dynamic metadata.",
      stack: ["Sui Move", "React", "Sui.js Kit", "Smart Contracts"],
      tech: ["Blockchain"],
      links: { github: "https://github.com/Anand-0037/sui-minting-nft" },
      metrics: ["Testnet Live", "<1s Finality", "On-Chain Assets"],
      businessValue: "Enables creators to launch collections with zero-knowledge of smart contract code.",
      technicalDepth: "Wrote custom Move modules for asset ownership and utilized Sui's object-centric data model.",
      tags: ["web3", "frontend", "backend"]
    },
    {
      id: "json-parser",
      name: "Zero-Dep JSON Parser",
      type: "System Tool",
      description: "A handwritten lexical and syntactical analyzer for JSON, built from scratch without Regex or libraries.",
      stack: ["Python", "Compiler Design", "CLI", "Algorithms"],
      tech: ["Python"],
      links: { github: "https://github.com/Anand-0037/json-parser" },
      metrics: ["O(n) Parsing", "Zero Dependencies", "PyPI Ready"],
      businessValue: "Demonstrates deep understanding of how interpreters and data serialization work under the hood.",
      technicalDepth: "Implemented recursive descent parsing and a custom state-machine lexer.",
      tags: ["core", "backend", "general"]
    },
    {
      id: "yolo-car",
      name: "YOLOv8 Car Detector",
      type: "Computer Vision",
      description: "Fine-tuned object detection model for vehicle identification, trained on custom Kaggle datasets.",
      stack: ["PyTorch", "YOLOv8", "OpenCV", "CUDA"],
      tech: ["AI/ML"],
      links: { github: "https://github.com/Anand-0037/yolo-car-detector" },
      metrics: ["0.979 mAP", "Real-time Inference", "Custom Weights"],
      businessValue: "High-precision model suitable for traffic analysis and autonomous monitoring systems.",
      technicalDepth: "Optimized hyperparameters for nano-model architecture to balance speed vs accuracy.",
      tags: ["ai_ml", "data_science", "cv", "ai"]
    },
    {
      id: "remainder-sys",
      name: "Distributed Reminder Service",
      type: "Backend Service",
      description: "Async notification service capable of scheduling cross-timezone alerts via SMS and WhatsApp.",
      stack: ["Python", "Twilio API", "SQLite", "AsyncIO"],
      tech: ["Backend"],
      links: { github: "https://github.com/Anand-0037/remainder-system" },
      metrics: ["Timezone Aware", "Twilio Integration", "Pytest Coverage"],
      businessValue: "Core infrastructure component for user retention and engagement systems.",
      technicalDepth: "Handled scheduling concurrency and third-party API rate limiting.",
      tags: ["backend", "devops"]
    },
    {
      id: "chameleon",
      name: "Chameleon Portfolio",
      type: "Generative UI",
      description: "An intent-adaptive portfolio that rebuilds its layout based on who is viewing it.",
      stack: ["React 19", "Tambo AI", "TypeScript", "Tailwind v4"],
      tech: ["Generative UI"],
      links: { github: "https://github.com/Anand-0037/ui-strikes-back", demo: "https://0xanand.tech" },
      metrics: ["<100ms Latency", "4 Personas", "AI-Driven"],
      businessValue: "Redefines static web experiences using agentic UI principles.",
      technicalDepth: "Uses Tool-calling to mutate React State and Framer Motion layout animations.",
      tags: ["frontend", "ai_ml", "ai"]
    }
  ]
};
