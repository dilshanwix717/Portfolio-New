import data from "./skills.json";

export type SkillGroup = {
  number: string;
  title: string;
  description: string;
  items: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = data.groups;
