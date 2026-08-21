import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { LaptopShowcase } from "@/components/laptop-showcase";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Contact />
        <LaptopShowcase />
      </main>
      <Footer />
    </>
  );
}
