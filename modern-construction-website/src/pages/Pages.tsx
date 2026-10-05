import { useSeo, SITE, breadcrumbs, absUrl } from "../lib/seo";
import { SERVICES } from "../data/site";
import { PageHeader, Container, Reveal, Eyebrow } from "../components/ui";
import { Services } from "../sections/Services";
import { Positioning } from "../sections/Positioning";
import { Why } from "../sections/Why";
import { Stats } from "../sections/Stats";
import { Process } from "../sections/Process";
import { Testimonials } from "../sections/Testimonials";
import { Contact } from "../sections/Contact";
import { CtaBand } from "../sections/CtaBand";

export function ServicesPage() {
  useSeo({
    title: "Construction Services in Zimbabwe | Modern Construction",
    description:
      "Building construction, civil engineering, residential and commercial builds, concrete work, ceilings, renovations, project management and consulting in Zimbabwe.",
    path: "/services",
    jsonLd: [breadcrumbs([{ name: "Services", path: "/services" }]), {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          areaServed: { "@type": "Country", name: "Zimbabwe" },
          provider: { "@id": `${SITE.url}/#business` },
        },
      })),
    }],
  });
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Construction, <em className="text-brand">engineered.</em>
          </>
        }
        intro="From a single concrete package to a fully managed build, here is what we can take on."
      />
      <Services asPage />
      <CtaBand />
    </>
  );
}

export function AboutPage() {
  useSeo({
    title: "About Us, Building Contractors in Zimbabwe | Modern Construction",
    description:
      "Modern Construction and Projects is a Zimbabwean construction and civil engineering company building homes and commercial spaces with precision and accountability.",
    path: "/about",
    jsonLd: breadcrumbs([{ name: "About", path: "/about" }]),
  });
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            Builders with an <em className="text-brand">engineer&rsquo;s eye.</em>
          </>
        }
        intro="A Zimbabwean construction and civil engineering company, focused on getting the details of every build right."
      />
      <Positioning showLink={false} />
      <section className="bg-paper py-20 md:py-32">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <Eyebrow className="text-smoke">What we do</Eyebrow>
            </Reveal>
            <Reveal delay={100} className="md:col-span-7">
              <p className="font-display text-[1.55rem] font-medium leading-[1.22] md:text-4xl">
                We build homes and commercial spaces across Zimbabwe, from first brief to final handover.
              </p>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-smoke">
                Construction and civil engineering are two sides of the same job. Structure, drainage, concrete,
                finishes and programme all have to work together, so we manage them together and keep you informed
                at every stage.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
      <Why />
      <Stats />
      <CtaBand />
    </>
  );
}

export function ProcessPage() {
  useSeo({
    title: "Our Construction Process | Modern Construction",
    description:
      "How Modern Construction and Projects delivers building projects in Zimbabwe, in five stages: discover, plan, design and engineer, build, and complete.",
    path: "/process",
    jsonLd: breadcrumbs([{ name: "Process", path: "/process" }]),
  });
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title={
          <>
            Five stages. <em className="text-brand">No surprises.</em>
          </>
        }
        intro="A structured route from your first idea to the keys in your hand."
      />
      <Process />
      <CtaBand />
    </>
  );
}

export function TestimonialsPage() {
  useSeo({
    title: "Client Testimonials | Modern Construction",
    description: "Feedback from clients who have built with Modern Construction and Projects in Zimbabwe, published with their permission.",
    path: "/testimonials",
    jsonLd: breadcrumbs([{ name: "Testimonials", path: "/testimonials" }]),
  });
  return (
    <>
      <div className="pt-16 md:pt-24">
        <Testimonials asPage />
      </div>
      <CtaBand />
    </>
  );
}

export function ContactPage() {
  useSeo({
    title: "Request a Construction Quote | Modern Construction",
    description:
      "Tell us about your building project. Call +263 773 277 541 or send an enquiry with plans or photos attached, and our team will get back to you.",
    path: "/contact",
    jsonLd: [
      breadcrumbs([{ name: "Contact", path: "/contact" }]),
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: `Start a project with ${SITE.name}`,
        url: absUrl("/contact"),
        mainEntity: { "@id": `${SITE.url}/#business` },
      },
    ],
  });
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Have a project <em className="text-brand">in mind?</em>
          </>
        }
      />
      <Contact asPage />
    </>
  );
}
