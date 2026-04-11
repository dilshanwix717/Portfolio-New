import data from "./experience.json";

export type ExperienceType = "Full-time" | "Contract" | "Internship";

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  type: ExperienceType;
  summary: string;
  tags: readonly string[];
};

export type ExperienceContent = {
  heading: readonly string[];
  items: readonly ExperienceItem[];
};

export const experienceContent: ExperienceContent = data as ExperienceContent;
