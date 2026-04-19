"use client";

import * as React from "react";
import { useTheme } from "@/components/theme-provider";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン日月火水木金土0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}|=+;:#@!";
const FS = 14;
const TRAIL = 20;

type Mode = "particles" | "matrix";

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

type Col = { y: number; chars: string[]; speed: number; tick: number };

const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)]!;

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
    let cols: Col[] = [];
    let rafId = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      if (mode === "matrix") initCols();
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

    const initCols = () => {
      const n = Math.max(1, Math.floor(W / FS));
      cols = Array.from({ length: n }, () => ({
        y: Math.floor(Math.random() * -40),
        chars: [],
        speed: 2 + Math.floor(Math.random() * 3),
        tick: Math.floor(Math.random() * 4),
      }));
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
      ctx.fillStyle = "rgba(8,12,20,0.08)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${FS}px 'JetBrains Mono', ui-monospace, monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < cols.length; i++) {
        const col = cols[i]!;
        col.tick++;
        if (col.tick < col.speed) continue;
        col.tick = 0;

        col.chars.unshift(randChar());
        if (col.chars.length > TRAIL) col.chars.pop();

        if (col.chars.length > 3 && Math.random() > 0.9) {
          const idx =
            2 + Math.floor(Math.random() * (col.chars.length - 2));
          col.chars[idx] = randChar();
        }

        col.y++;
        if (col.y * FS > H + TRAIL * FS && Math.random() > 0.975) {
          col.y = Math.floor(Math.random() * -40);
          col.chars = [];
          continue;
        }

        const x = i * FS;
        for (let k = 0; k < col.chars.length; k++) {
          const row = col.y - k;
          if (row < 0) continue;
          const yPx = row * FS;
          if (yPx > H) continue;
          const ch = col.chars[k]!;
          if (k === 0) {
            ctx.fillStyle = "#FFFFFF";
          } else if (k === 1) {
            ctx.fillStyle = "#B9FFCE";
          } else {
            const a = Math.max(0, 1 - k / TRAIL);
            ctx.fillStyle = `rgba(60,220,120,${a * 0.9})`;
          }
          ctx.fillText(ch, x, yPx);
        }
      }
    };

    const loop = () => {
      if (mode === "particles") drawParticles();
      else drawMatrix();
      rafId = requestAnimationFrame(loop);
    };

    resize();
    if (mode === "particles") initParticles();
    else initCols();

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
