"use client";

import * as React from "react";
import { useTheme } from "@/components/theme-provider";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン日月火水木金土0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}|=+;:#@!";
const FS = 14;

type Mode = "particles" | "matrix";

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

export function CanvasBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const mode: Mode = theme === "matrix" ? "matrix" : "particles";

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    let drops: number[] = [];
    let rafId = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      if (mode === "matrix") initDrops();
    };

    const initParticles = () => {
      const N = 65;
      particles = [];
      for (let i = 0; i < N; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.8 + 0.5,
        });
      }
    };

    const initDrops = () => {
      const cols = Math.max(1, Math.floor(W / FS));
      drops = Array(cols)
        .fill(0)
        .map(() => Math.floor(Math.random() * (-H / FS)));
    };

    const readAccentRGB = () =>
      getComputedStyle(document.body).getPropertyValue("--pt").trim() ||
      "212,160,23";

    const drawParticles = () => {
      ctx.clearRect(0, 0, W, H);
      const rgb = readAccentRGB();
      const DIST = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]!;
          const b = particles[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${rgb},${(1 - d / DIST) * 0.1})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},.2)`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
    };

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(8,12,20,0.055)";
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < drops.length; i++) {
        const cur = drops[i]!;
        if (cur < 0) {
          drops[i] = cur + 1;
          continue;
        }
        const y = cur * FS;
        const x = i * FS;
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)]!;
        ctx.fillStyle = "#C8FFDC";
        ctx.font = `${FS}px 'JetBrains Mono', ui-monospace, monospace`;
        ctx.fillText(ch, x, y);
        if (Math.random() > 0.96) {
          const ch2 = CHARS[Math.floor(Math.random() * CHARS.length)]!;
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(ch2, x, y);
        }
        if (y > H && Math.random() > 0.975)
          drops[i] = Math.floor(Math.random() * -40);
        else drops[i] = cur + 1;
      }
    };

    const loop = () => {
      if (mode === "particles") drawParticles();
      else drawMatrix();
      rafId = requestAnimationFrame(loop);
    };

    resize();
    if (mode === "particles") initParticles();
    else initDrops();

    if (prefersReduced) {
      ctx.clearRect(0, 0, W, H);
      if (mode === "particles") drawParticles();
      else drawMatrix();
    } else {
      loop();
    }

    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [mode]);

  return <canvas id="bg-canvas" ref={canvasRef} aria-hidden="true" />;
}
