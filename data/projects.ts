import data from "./projects.json";

export type ProjectCategory = "web" | "game";

export type ProjectFilter = "all" | ProjectCategory;

export type ProjectThumbnail = {
  colorClass: string;
  alt: string;
};

export type ProjectLink = {
  label: string;
  href: string | null;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  year: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  tags: readonly string[];
  thumbnail: ProjectThumbnail;
  links: readonly ProjectLink[];
  repos?: readonly ProjectLink[];
};

export type ProjectCategoryOption = {
  value: ProjectFilter;
  label: string;
};

export type ProjectsContent = {
  heading: readonly string[];
  categories: readonly ProjectCategoryOption[];
  items: readonly Project[];
};

// JSON is `any`-ish at the boundary; cast once here so the rest of the app is fully typed.
export const projectsContent: ProjectsContent = data as ProjectsContent;

export const projects: readonly Project[] = projectsContent.items;
export const projectCategories: readonly ProjectCategoryOption[] =
  projectsContent.categories;
