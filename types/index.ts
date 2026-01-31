export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  live?: string;
  features: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NavItem {
  name: string;
  href: string;
}