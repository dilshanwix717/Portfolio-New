"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactContent } from "@/data/contact";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

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
      className="py-12 md:py-16"
    >
      <Reveal>
        <h2
          id="contact-heading"
          className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          Get In Touch
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-5 space-y-4">
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            {contactContent.intro}
          </p>

          {/* Direct contact */}
          <div className="flex flex-wrap gap-2">
            <ContactCard
              icon={<MailIcon />}
              label="Email"
              value={siteConfig.author.email}
              href={`mailto:${siteConfig.author.email}`}
              copyValue={siteConfig.author.email}
            />
            <ContactCard
              icon={<WhatsAppIcon />}
              label="WhatsApp"
              value={siteConfig.author.whatsapp}
              href={whatsappHref}
              copyValue={siteConfig.author.whatsapp}
              external
            />
          </div>
        </div>
      </Reveal>

      {/* Contact form */}
      <Reveal delay={200}>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 flex flex-col gap-5 border-t border-border pt-6"
        >
          {contactContent.form.fields.map((field) => {
            const id = `contact-${field.name}`;
            return (
              <div key={field.name} className="flex flex-col gap-1.5">
                <label
                  htmlFor={id}
                  className="-pt-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
                >
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={id}
                    name={field.name}
                    rows={3}
                    required
                    autoComplete={field.autoComplete}
                    className="min-h-[80px] resize-none rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-sm transition-colors duration-hover ease-out-soft focus-visible:border-accent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                ) : (
                  <Input
                    id={id}
                    name={field.name}
                    type={field.type}
                    required
                    autoComplete={field.autoComplete}
                    className="h-9 rounded-none border-0 border-b border-border bg-transparent px-0 text-sm transition-colors duration-hover ease-out-soft focus-visible:border-accent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                )}
              </div>
            );
          })}

          <div className="flex items-center justify-between gap-4 pt-1">
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
              size="sm"
              disabled={status === "submitting" || status === "sent"}
            >
              {status === "submitting"
                ? contactContent.form.statusSubmitting
                : contactContent.form.submitLabel}
            </Button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  copyValue,
  external = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  copyValue: string;
  external?: boolean;
}) {
  const [hovered, setHovered] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    void navigator.clipboard.writeText(copyValue).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="group relative flex items-stretch border border-border transition-colors duration-200 ease-out-soft hover:border-accent"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Main link */}
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="flex items-center gap-2.5 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-200 ease-out-soft group-hover:text-accent"
      >
        {icon}
        {/* Label — always visible */}
        <span>{label}</span>
        {/* Value — slides in on hover */}
        <span
          className={cn(
            "overflow-hidden whitespace-nowrap text-accent/70 transition-all duration-300 ease-out-soft",
            hovered ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0",
          )}
        >
          <span aria-hidden="true" className="mr-2 text-border">
            ·
          </span>
          {value}
        </span>
      </a>

      {/* Copy button — slides in on hover */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${label}`}
        className={cn(
          "flex items-center border-l border-border px-3 text-muted-foreground transition-all duration-300 ease-out-soft hover:bg-accent/10 hover:text-accent",
          hovered
            ? "w-auto opacity-100"
            : "w-0 overflow-hidden opacity-0 border-l-0",
        )}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
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
