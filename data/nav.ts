import data from "./nav.json";

export type NavItem = {
  href: string;
  label: string;
};

export const navItems: readonly NavItem[] = data.items;
