import NavHeader from "@/components/nav-header";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <NavHeader />
      <section id="home">
        <HeroGeometric title1="Abdelrahman" title2="Salama" />
      </section>
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </main>
  );
}
