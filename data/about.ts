import data from "./about.json";

export type AboutContent = {
  label: string;
  pullQuote: readonly string[];
  paragraphs: readonly string[];
  tags: readonly string[];
};

export const aboutContent: AboutContent = data;
