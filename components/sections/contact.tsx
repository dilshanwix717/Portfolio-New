"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactContent } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = React.useState<FormStatus>("idle");

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const name = String(data.get("name") ?? "").trim();
      const email = String(data.get("email") ?? "").trim();
      const message = String(data.get("message") ?? "").trim();

      if (!name || !email || !message) {
        setStatus("error");
        return;
      }

      setStatus("submitting");
      // No backend wired yet — simulate the transition so the UI is testable.
      await new Promise((resolve) => setTimeout(resolve, 400));
      setStatus("sent");
      form.reset();
    },
    [],
  );

  const statusLabel = (() => {
    switch (status) {
      case "submitting":
        return contactContent.form.statusSubmitting;
      case "sent":
        return contactContent.form.statusSent;
      case "error":
        return contactContent.form.statusError;
      case "idle":
      default:
        return contactContent.form.statusIdle;
    }
  })();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="dark bg-background text-foreground"
    >
      <div className="container grid gap-16 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5">
          <div className="space-y-8 md:sticky md:top-24">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {contactContent.label}
            </p>
            <h2
              id="contact-heading"
              className="font-serif text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.1]"
            >
              {contactContent.heading.map((line, index) => (
                <span
                  key={line}
                  className={
                    index === contactContent.heading.length - 1
                      ? "block text-accent"
                      : "block text-foreground"
                  }
                >
                  {line}
                </span>
              ))}
            </h2>
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
              {contactContent.intro}
            </p>

            <div className="space-y-3 pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {contactContent.directLabel}
              </p>
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="group relative inline-flex font-serif text-2xl text-accent"
              >
                {siteConfig.author.email}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-1 left-0 h-px w-full bg-accent"
                />
              </a>
            </div>

            <div className="space-y-3 pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {contactContent.elsewhereLabel}
              </p>
              <ul
                role="list"
                className="flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-xs uppercase tracking-[0.2em]"
              >
                {siteConfig.socials.map((social, index) => (
                  <li
                    key={social.label}
                    className="flex items-center gap-4"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative inline-flex py-1 text-muted-foreground transition-colors duration-hover ease-out-soft hover:text-foreground"
                    >
                      {social.label}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-[width] duration-hover ease-out-soft group-hover:w-full"
                      />
                    </a>
                    {index < siteConfig.socials.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="text-muted-foreground"
                      >
                        ·
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-10 border-t border-border pt-12"
          >
            {contactContent.form.fields.map((field) => {
              const id = `contact-${field.name}`;
              return (
                <Field
                  key={field.name}
                  label={field.label}
                  htmlFor={id}
                  index={field.index}
                >
                  {field.type === "textarea" ? (
                    <Textarea
                      id={id}
                      name={field.name}
                      rows={6}
                      required
                      autoComplete={field.autoComplete}
                      className="min-h-[160px] resize-none rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base transition-colors duration-hover ease-out-soft focus-visible:border-accent focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  ) : (
                    <Input
                      id={id}
                      name={field.name}
                      type={field.type}
                      required
                      autoComplete={field.autoComplete}
                      className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-base transition-colors duration-hover ease-out-soft focus-visible:border-accent focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  )}
                </Field>
              );
            })}

            <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p
                role="status"
                aria-live="polite"
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.25em]",
                  status === "error"
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {statusLabel}
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="w-full sm:w-auto"
              >
                {status === "submitting"
                  ? contactContent.form.statusSubmitting
                  : contactContent.form.submitLabel}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  htmlFor: string;
  index: string;
  children: React.ReactNode;
};

function Field({ label, htmlFor, index, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={htmlFor}
        className="flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground"
      >
        <span aria-hidden="true">{index}</span>
        <span>{label}</span>
      </label>
      {children}
    </div>
  );
}
