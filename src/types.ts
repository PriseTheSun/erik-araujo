export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  githubUrl: string;
  figmaUrl: string;
  liveUrl: string;
  tags: string[];
}

export interface StackItem {
  name: string;
  icon: string; // Lucide icon name or similar
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
