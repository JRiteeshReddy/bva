import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import Internship from "@/components/sections/Internship";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <ProjectShowcase />
        <Internship />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
