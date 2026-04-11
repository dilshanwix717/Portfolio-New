import data from "./contact.json";

export type ContactFieldType = "text" | "email" | "textarea";

export type ContactField = {
  name: "name" | "email" | "message";
  label: string;
  type: ContactFieldType;
  index: string;
  autoComplete: string;
};

export type ContactForm = {
  fields: readonly ContactField[];
  submitLabel: string;
  statusIdle: string;
  statusSubmitting: string;
  statusSent: string;
  statusError: string;
};

export type ContactContent = {
  label: string;
  heading: readonly string[];
  intro: string;
  directLabel: string;
  elsewhereLabel: string;
  form: ContactForm;
};

export const contactContent: ContactContent = data as ContactContent;
