import Motion from "@/components/site/Motion";
import Preloader from "@/components/site/Preloader";
import SmoothScroll from "@/components/site/SmoothScroll";
import Cursor from "@/components/site/Cursor";
import Grain from "@/components/site/Grain";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Ticker from "@/components/site/Ticker";
import Work from "@/components/site/Work";
import Pricing from "@/components/site/Pricing";
import Process from "@/components/site/Process";
import Who from "@/components/site/Who";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import FloatingWhatsApp from "@/components/site/FloatingWhatsApp";

/**
 * Section order is deliberate and not the usual one: the proof comes before the
 * story. Almost everyone landing here arrived from a cold WhatsApp message and
 * has exactly one question — "can this guy actually build?" — so the five live
 * demos answer it before anything asks them to read about anyone.
 *
 * Preloader must stay first in the tree: it sets the ignition flag the hero
 * waits on before playing its entrance.
 */
export default function Page() {
  return (
    <Motion>
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <Grain />
      <Nav />

      <main>
        <Hero />
        <Ticker />
        <Work />
        <Pricing />
        <Process />
        <Who />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </Motion>
  );
}
