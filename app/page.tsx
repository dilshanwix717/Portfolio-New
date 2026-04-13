import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Interests } from "@/components/sections/interests";
import { Contact } from "@/components/sections/contact";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <>
      <div className="fixed top-5 right-6 z-40 md:right-12 lg:right-24">
        <ThemeToggle />
      </div>
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:flex lg:gap-16 lg:px-24 lg:py-0">
        <Sidebar />
        <main id="content" className="lg:w-full lg:py-24">
          <About />
          <Experience />
          <FeaturedProjects />
          <Interests />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  );
}
