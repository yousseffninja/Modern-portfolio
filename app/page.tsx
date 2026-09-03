import { About } from "@/components/About";
import { AmbientLights } from "@/components/AmbientLights";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <AmbientLights />
      <div className="noise" />
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
