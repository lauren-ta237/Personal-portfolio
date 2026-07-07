export interface TechSection {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: 'ai' | 'backend' | 'frontend' | 'fullstack';
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  keyFeatures: string[];
  techStack: TechSection[];
  achievements?: string[];
  metrics?: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  bullets: string[];
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}
