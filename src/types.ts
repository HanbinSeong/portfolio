export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  ppt?: string;
  image: string;
  period?: string;
  content: string;
}

export interface Experience {
  company?: string;
  role?: string;
  period: string;
  description: string[];
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI & Data Engineering' | 'Database & Search & Message Broker' | 'Infrastructure & DevOps' | 'Collaboration & Tools' | 'Language';
  bgColor: string;
  textColor: string;
}
