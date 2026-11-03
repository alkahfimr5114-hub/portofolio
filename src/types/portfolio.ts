export type ProjectCategory = 'all' | 'webapp' | 'mobile' | 'ai' | 'design';

export interface Project {
  id: string;
  title: string;
  category: 'webapp' | 'mobile' | 'ai' | 'design';
  categoryLabel: string;
  year: string;
  client: string;
  summary: string;
  fullDescription: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
  architectureNotes: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    experience: string;
    description: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}
