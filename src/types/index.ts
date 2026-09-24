export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail: string;
  video: string;
  duration: string;
  year: string;
  role: string[];
  tools: string[];
  featured: boolean;
  published: boolean;
  client?: string;
  projectType: string;
  caseStudy?: {
    overview: string;
    challenge?: string;
    solution?: string;
    techniques: string[];
  };
  beforeMedia?: string;
  afterMedia?: string;
  gallery?: string[];
  createdAt: string;
  order?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  visualKeywords: string[];
  techniques: string[];
  accentColor?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  description: string;
  videoLength: string;
  deadline: string;
  budgetRange?: string;
  referenceLink?: string;
  footageLink?: string;
  createdAt: string;
  status: 'new' | 'in-review' | 'contacted' | 'archived';
}
