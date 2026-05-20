export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
}

export const experiences: Experience[] = [
  {
    company: "Scale AI",
    role: "Machine Learning Engineer",
    period: "Mar 2025 — Present",
    description:
      "Engineered Python-based LLM evaluation and RAG benchmarking pipelines, improving evaluation throughput by 230%. Developed LLM-as-judge evaluation framework, reducing manual effort by 60%.",
    tech: ["Python", "PyTorch", "Airflow", "Docker", "AWS", "FAISS"],
  },
  {
    company: "NVIDIA",
    role: "Machine Learning Engineer",
    period: "Jan 2024 — Feb 2025",
    description:
      "Built Python-based LLM inference services using FastAPI and vLLM, serving 3,000+ users. Improved inference latency by 36% through dynamic batching and KV-cache utilization.",
    tech: ["Python", "vLLM", "FastAPI", "Docker", "Kubernetes", "AWS"],
  },
  {
    company: "Accenture India",
    role: "Software Engineer",
    period: "May 2019 — Dec 2022",
    description:
      "Built scalable demand forecasting pipelines using Python, XGBoost, and LSTM on large supply chain datasets, improving forecast accuracy by 30%. Designed ML-driven inventory optimization systems.",
    tech: ["Python", "XGBoost", "PyTorch", "Spark", "Docker", "AWS"],
  },
];
