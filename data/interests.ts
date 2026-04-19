import data from "./interests.json";

export type InterestItem = {
  label: string;
  roles: readonly string[];
  tags: readonly string[];
};

export type InterestsContent = {
  label: string;
  heading: string;
  items: readonly InterestItem[];
};

export const interestsContent: InterestsContent = data as InterestsContent;
