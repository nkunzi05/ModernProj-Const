import { Button, Container, Reveal } from "../components/ui";

export function CtaBand({
  title = "Have a project in mind?",
  text = "Tell us what you're planning and our team will get back to you to discuss the next step.",
  cta = "Start a project",
}: {
  title?: string;
  text?: string;
  cta?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-ink py-24 text-paper md:py-36">
      <Container>
        <div className="grid items-end gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <h2 id="cta-title" className="type-display-lg uppercase leading-[0.9]">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={150} className="md:col-span-4">
            <p className="text-lg text-paper/75">{text}</p>
            <Button to="/contact" variant="brand" className="mt-8 w-full sm:w-auto">
              {cta}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
