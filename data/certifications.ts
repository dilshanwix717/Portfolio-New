import data from "./certifications.json";

export type CertificationItem = {
  title: string;
  issuer: string;
};

export type CertificationContent = {
  heading: readonly string[];
  items: readonly CertificationItem[];
};

export const certificationContent: CertificationContent = data;
