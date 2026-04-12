import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Ticker } from "@/components/sections/ticker";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Interests } from "@/components/sections/interests";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Experience />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
