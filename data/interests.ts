import data from "./interests.json";

export type InterestItem = {
  label: string;
  icon: string;
  roles: readonly string[];
  tags: readonly string[];
};

export type InterestsContent = {
  label: string;
  heading: string;
  items: readonly InterestItem[];
};

export const interestsContent: InterestsContent = data as unknown as InterestsContent;
