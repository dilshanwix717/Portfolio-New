"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactContent } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "sent" | "error" | "failed";

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

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        if (!res.ok) {
          setStatus("failed");
          return;
        }

        setStatus("sent");
        form.reset();
      } catch {
        setStatus("failed");
      }
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
      case "failed":
        return contactContent.form.statusFailed;
      case "idle":
      default:
        return contactContent.form.statusIdle;
    }
  })();

  const whatsappHref = `https://wa.me/${siteConfig.author.whatsapp}?text=${encodeURIComponent("Hi Dilshan, I came across your portfolio and wanted to reach out.")}`;

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

            <div className="space-y-4 pt-4">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {contactContent.directLabel}
              </p>
              {/* Email */}
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
              {/* WhatsApp */}
              <div>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-hover ease-out-soft hover:border-accent hover:text-accent"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {contactContent.elsewhereLabel}
              </p>
              <ul
                role="list"
                className="flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-xs uppercase tracking-[0.2em]"
              >
                {siteConfig.socials.map((social, index) => (
                  <li key={social.label} className="flex items-center gap-4">
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
                      <span aria-hidden="true" className="text-muted-foreground">
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
                  "font-mono text-xs uppercase tracking-[0.25em]",
                  status === "error" || status === "failed"
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {statusLabel}
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting" || status === "sent"}
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
        className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
      >
        <span aria-hidden="true">{index}</span>
        <span>{label}</span>
      </label>
      {children}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}
