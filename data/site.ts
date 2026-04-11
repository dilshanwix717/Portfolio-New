import data from "./site.json";

export type SocialLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  title: string;
  shortName: string;
  description: string;
  url: string;
  keywords: readonly string[];
  author: {
    name: string;
    role: string;
    tagline: string;
    email: string;
    location: string;
  };
  availability: {
    open: boolean;
    label: string;
  };
  socials: readonly SocialLink[];
};

export const siteConfig: SiteConfig = data;
