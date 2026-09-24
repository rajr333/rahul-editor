import fs from 'fs/promises';
import path from 'path';
import { Project, Category, Inquiry } from '@/types';

const dataDir = path.join(process.cwd(), 'src', 'data');
const projectsFile = path.join(dataDir, 'projects.json');
const categoriesFile = path.join(dataDir, 'categories.json');
const inquiriesFile = path.join(dataDir, 'inquiries.json');

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await fs.readFile(projectsFile, 'utf-8');
    const cleanData = data.replace(/^\uFEFF/, '');
    return JSON.parse(cleanData) as Project[];
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

export async function saveProjects(projects: Project[]): Promise<boolean> {
  try {
    await fs.writeFile(projectsFile, JSON.stringify(projects, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing projects:', error);
    return false;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fs.readFile(categoriesFile, 'utf-8');
    const cleanData = data.replace(/^\uFEFF/, '');
    return JSON.parse(cleanData) as Category[];
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
}

export async function saveCategories(categories: Category[]): Promise<boolean> {
  try {
    await fs.writeFile(categoriesFile, JSON.stringify(categories, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing categories:', error);
    return false;
  }
}

export async function getInquiries(): Promise<Inquiry[]> {
  try {
    const data = await fs.readFile(inquiriesFile, 'utf-8');
    const cleanData = data.replace(/^\uFEFF/, '');
    return JSON.parse(cleanData) as Inquiry[];
  } catch (error) {
    console.error('Error reading inquiries:', error);
    return [];
  }
}

export async function saveInquiries(inquiries: Inquiry[]): Promise<boolean> {
  try {
    await fs.writeFile(inquiriesFile, JSON.stringify(inquiries, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing inquiries:', error);
    return false;
  }
}

export async function addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry | null> {
  const inquiries = await getInquiries();
  const newInquiry: Inquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  inquiries.unshift(newInquiry);
  const success = await saveInquiries(inquiries);
  return success ? newInquiry : null;
}
