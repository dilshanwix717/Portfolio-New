import data from "./education.json";

export type EducationItem = {
  title: string;
  institution: string;
  details: string | null;
};

export type EducationContent = {
  heading: readonly string[];
  items: readonly EducationItem[];
};

export const educationContent: EducationContent = data;
