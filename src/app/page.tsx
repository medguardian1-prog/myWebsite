import Motion from "@/components/site/Motion";
import SmoothScroll from "@/components/site/SmoothScroll";
import FilamentCursor from "@/components/site/FilamentCursor";
import Grain from "@/components/site/Grain";
import ScrollWire from "@/components/site/ScrollWire";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import SpecBand from "@/components/site/SpecBand";
import SearchProof from "@/components/site/SearchProof";
import Work from "@/components/site/Work";
import Pricing from "@/components/site/Pricing";
import Process from "@/components/site/Process";
import Who from "@/components/site/Who";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import FloatingWhatsApp from "@/components/site/FloatingWhatsApp";

/**
 * Order is an argument, made in sequence:
 *   Hero        — you have a problem
 *   SpecBand    — here is the cost and the timeline, before you have to ask
 *   SearchProof — here is the problem, drawn
 *   Work        — here is proof I can build
 *   Pricing     — here is exactly what it costs
 *   Process     — here is how little you have to do
 *   Who         — here is who you're dealing with
 *   Contact     — here are two ways to start
 *
 * The price band sits second on purpose. Almost everyone arriving from a cold
 * WhatsApp message is trying to find out one thing before they'll read
 * anything: what does this cost. Making them hunt for it loses them.
 */
export default function Page() {
  return (
    <Motion>
      <SmoothScroll />
      <FilamentCursor />
      <Grain />
      <ScrollWire />
      <Nav />

      <main>
        <Hero />
        <SpecBand />
        <SearchProof />
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
