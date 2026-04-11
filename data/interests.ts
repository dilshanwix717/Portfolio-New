import data from "./interests.json";

export type InterestItem = {
  label: string;
  detail: string;
};

export type InterestsContent = {
  label: string;
  heading: string;
  items: readonly InterestItem[];
};

export const interestsContent: InterestsContent = data;
