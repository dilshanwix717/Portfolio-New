"use client";

import * as React from "react";
import { siteConfig } from "@/data/site";
import { contactContent } from "@/data/contact";

type FormStatus = "idle" | "submitting" | "sent" | "error" | "failed";

const MailIcon = () => (
  <svg
    className="clink-icon"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    className="clink-icon"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    className="clink-icon"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    className="clink-icon"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

type LinkRow = {
  icon: React.ReactElement;
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

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
      default:
        return contactContent.form.statusIdle;
    }
  })();

  const statusClass =
    status === "sent"
      ? "fstatus fstatus-ok"
      : status === "failed" || status === "error"
        ? "fstatus fstatus-err"
        : "fstatus";

  const whatsappHref = `https://wa.me/${siteConfig.author.whatsapp}?text=${encodeURIComponent(
    "Hi Dilshan, I came across your portfolio and wanted to reach out.",
  )}`;

  const linkedinHref =
    siteConfig.socials.find((s) => s.label === "LinkedIn")?.href ?? "#";
  const githubHref =
    siteConfig.socials.find((s) => s.label === "GitHub")?.href ?? "#";
  const linkedinHandle = linkedinHref.split("/in/")[1]?.replace(/\/$/, "") ?? "LinkedIn";
  const githubHandle = githubHref.split("github.com/")[1]?.replace(/\/$/, "") ?? "GitHub";

  const links: LinkRow[] = [
    {
      icon: <MailIcon />,
      label: "Email",
      value: siteConfig.author.email,
      href: `mailto:${siteConfig.author.email}`,
    },
    {
      icon: <WhatsAppIcon />,
      label: "WhatsApp",
      value: siteConfig.author.whatsapp,
      href: whatsappHref,
      external: true,
    },
    {
      icon: <LinkedInIcon />,
      label: "LinkedIn",
      value: linkedinHandle,
      href: linkedinHref,
      external: true,
    },
    {
      icon: <GitHubIcon />,
      label: "GitHub",
      value: githubHandle,
      href: githubHref,
      external: true,
    },
  ];

  const [primary, accent] = contactContent.heading;

  return (
    <section className="section" id="contact">
      <span className="watermark" aria-hidden="true">
        07
      </span>
      <div className="sec-label rv">07 — CONTACT</div>
      <div className="contact-grid">
        <div>
          <div className="contact-h rv d1">
            {primary}
            <br />
            <b>{accent}</b>
          </div>
          <p className="contact-intro rv d2">{contactContent.intro}</p>
          <div className="clinks rv d3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="clink"
              >
                {link.icon}
                <div>
                  <span className="clink-label">{link.label}</span>
                  <span className="clink-val">{link.value}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <form className="cform rv d2" onSubmit={handleSubmit} noValidate>
          {contactContent.form.fields.map((field) => {
            const id = `contact-${field.name}`;
            return (
              <div key={field.name} className="fg-wrap">
                <label className="fl" htmlFor={id}>
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    className="fta"
                    id={id}
                    name={field.name}
                    required
                    rows={4}
                    autoComplete={field.autoComplete}
                    placeholder="What would you like to work on?"
                  />
                ) : (
                  <input
                    className="fi"
                    id={id}
                    name={field.name}
                    type={field.type}
                    required
                    autoComplete={field.autoComplete}
                    placeholder={
                      field.type === "email" ? "your@email.com" : "Your name"
                    }
                  />
                )}
              </div>
            );
          })}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <p className={statusClass} role="status" aria-live="polite">
              {statusLabel}
            </p>
            <button
              type="submit"
              className="btn-g"
              disabled={status === "submitting" || status === "sent"}
            >
              {status === "submitting"
                ? contactContent.form.statusSubmitting
                : contactContent.form.submitLabel}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
