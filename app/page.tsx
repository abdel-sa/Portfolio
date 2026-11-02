import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getCurrentSemester } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <section id="home">
        <HeroGeometric title1="Abdelrahman" title2="Salama" />
      </section>
      <About semester={getCurrentSemester()} />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </main>
  );
}
