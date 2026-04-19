import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Interests } from "@/components/sections/interests";
import { Contact } from "@/components/sections/contact";
import { CanvasBackground } from "@/components/motion/canvas-background";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <>
      <CanvasBackground />
      <div id="scanlines" aria-hidden="true" />
      <div id="grain" aria-hidden="true" />

      <div id="page-wrap">
        <ScrollProgress />
        <Navbar />

        <Hero />

        <hr className="div" />
        <About />

        <hr className="div" />
        <Skills />

        <hr className="div" />
        <Experience />

        <hr className="div" />
        <Projects />

        <hr className="div" />
        <Education />

        <hr className="div" />
        <Interests />

        <hr className="div" />
        <Contact />

        <Footer />
      </div>

      <ThemeToggle />
      <RevealObserver />
    </>
  );
}
