import { useSeo } from "../lib/seo";
import { Button, Container } from "../components/ui";

export default function NotFound() {
  useSeo({
    title: "Page not found | Modern Construction",
    description: "The page you were looking for could not be found.",
    path: "/404",
    noindex: true,
  });
  return (
    <section className="bg-paper pb-28 pt-44 md:pt-56">
      <Container>
        <p className="type-label text-smoke">Page not found</p>
        <h1 className="mt-6 type-display-xl leading-[0.9]">
          This page isn&rsquo;t <em className="text-brand">on the plans.</em>
        </h1>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button to="/">Back to home</Button>
          <Button to="/projects" variant="outline" arrow={false}>
            View our work
          </Button>
        </div>
      </Container>
    </section>
  );
}
