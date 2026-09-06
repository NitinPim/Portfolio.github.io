export interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  category: string;
  techStack: string;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  architectureNotes: string;
  displayOrder: number;
  isFeatured: boolean;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string;
  techStack: string;
  order: number;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  period: string;
  grade: string;
  skills: string;
  order: number;
}

export interface Testimonial {
  id: number;
  author: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarInitials: string;
}

export interface DeveloperProfile {
  name: string;
  title: string;
  specialties: string[];
  status: string;
  location: string;
  email?: string;
  gitHub?: string;
  linkedIn?: string;
  degree?: string;
  completedProjects: number;
  codeCommits: string;
}

export interface PortfolioData {
  developer: DeveloperProfile;
  projects: Project[];
  experiences: Experience[];
  educations?: Education[];
  testimonials: Testimonial[];
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: number;
}
