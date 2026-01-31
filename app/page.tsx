import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Experience from "@/components/Experience/Experience";
import Projects from "@/components/Projects/Projects";
import Skills from "@/components/Skills/Skills";
import About from "@/components/About/About";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <About />
      <Footer />
    </main>
  );
}