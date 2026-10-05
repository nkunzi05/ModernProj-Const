import { useSeo } from "../lib/seo";
import { Hero } from "../sections/Hero";
import { ProjectTypes } from "../sections/ProjectTypes";
import { Featured } from "../sections/Featured";
import { Positioning } from "../sections/Positioning";
import { Process } from "../sections/Process";
import { Services } from "../sections/Services";
import { PortfolioPreview } from "../sections/Portfolio";
import { Why } from "../sections/Why";
import { Stats } from "../sections/Stats";
import { Testimonials } from "../sections/Testimonials";
import { Contact } from "../sections/Contact";

export default function Home() {
  useSeo({
    title: "Modern Construction and Projects | Builders in Zimbabwe",
    description:
      "Construction and civil engineering company in Zimbabwe. Homes, commercial buildings, concrete and civil works, renovations and project management. Request a quote.",
    path: "/",
  });
  return (
    <>
      <Hero />
      <ProjectTypes />
      <Featured />
      <Positioning />
      <Process />
      <Services />
      <PortfolioPreview />
      <Why />
      <Stats />
      <Testimonials />
      <Contact />
    </>
  );
}
