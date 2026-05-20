export interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  icon: string;
  github?: string;
}

export const projects: Project[] = [
  {
    title: "FaceNEmotion",
    description:
      "Real-time facial emotion recognition system using deep learning and computer vision. Classifies 7 emotions from live video streams with high accuracy using CNNs and AWS Rekognition for batch processing.",
    tech: ["Python", "PyTorch", "OpenCV", "AWS Rekognition", "FastAPI"],
    gradient: "from-violet-500/20 to-purple-600/20",
    icon: "Smile",
    github: "https://github.com/sumukhramagiri/facenemotion",
  },
  {
    title: "AI Mental Health",
    description:
      "LLM-powered mental health companion that performs sentiment analysis, detects emotional distress signals, and provides personalized coping resources using RAG and fine-tuned language models.",
    tech: ["Python", "LangChain", "FAISS", "FastAPI", "Streamlit"],
    gradient: "from-blue-500/20 to-cyan-600/20",
    icon: "Brain",
    github: "https://github.com/sumukhramagiri/ai_mentalhealth",
  },
  {
    title: "Motion Sensor ML",
    description:
      "IoT motion detection pipeline that uses ML models to classify movement patterns from sensor data in real-time. Includes anomaly detection and edge deployment via containerized inference.",
    tech: ["Python", "TensorFlow", "Raspberry Pi", "MQTT", "Docker"],
    gradient: "from-emerald-500/20 to-teal-600/20",
    icon: "Activity",
    github: "https://github.com/sumukhramagiri/motion_sensor",
  },
  {
    title: "Life Expectancy Analytics",
    description:
      "Data science project analyzing the correlation between socioeconomic factors and health investments on global life expectancy using regression models, statistical analysis, and interactive visualizations.",
    tech: ["Python", "Pandas", "Scikit-learn", "Plotly", "Jupyter"],
    gradient: "from-amber-500/20 to-orange-600/20",
    icon: "BarChart",
    github: "https://github.com/sumukhramagiri/Life-Expectancy-and-Socioeconomic-Health-Investments-",
  },
  {
    title: "ML Dashboard",
    description:
      "Real-time machine learning observability dashboard for monitoring model performance, data drift, and inference metrics. Tracks accuracy, latency, and feature distributions across deployed models.",
    tech: ["React", "Python", "FastAPI", "Prometheus", "Grafana"],
    gradient: "from-pink-500/20 to-rose-600/20",
    icon: "LayoutDashboard",
    github: "https://github.com/sumukhramagiri/dashboard",
  },
  {
    title: "MoviesHub",
    description:
      "AI-powered movie recommendation engine using collaborative filtering and NLP-based content similarity. Features a clean UI for discovery, ratings, and personalized watchlists.",
    tech: ["Python", "Scikit-learn", "React", "Node.js", "MongoDB"],
    gradient: "from-indigo-500/20 to-blue-600/20",
    icon: "Film",
    github: "https://github.com/sumukhramagiri/movieshub",
  },
];
