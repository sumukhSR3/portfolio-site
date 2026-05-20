export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Generative AI & LLMs",
    icon: "Brain",
    skills: [
      { name: "RAG & Vector DBs", level: 95 },
      { name: "LLM-as-a-Judge", level: 90 },
      { name: "LangChain / LlamaIndex", level: 88 },
      { name: "Agentic Workflows", level: 85 },
      { name: "Fine-tuning (LoRA)", level: 82 },
    ],
  },
  {
    category: "LLM Inference & ML",
    icon: "Cpu",
    skills: [
      { name: "vLLM", level: 92 },
      { name: "PyTorch & TensorFlow", level: 90 },
      { name: "TensorRT-LLM", level: 85 },
      { name: "XGBoost & LSTM", level: 88 },
      { name: "KV Cache Optimization", level: 85 },
    ],
  },
  {
    category: "Engineering & Cloud",
    icon: "Server",
    skills: [
      { name: "Python", level: 95 },
      { name: "AWS", level: 90 },
      { name: "Docker & Kubernetes", level: 88 },
      { name: "FastAPI", level: 92 },
      { name: "Spark & Kafka", level: 85 },
    ],
  },
];
