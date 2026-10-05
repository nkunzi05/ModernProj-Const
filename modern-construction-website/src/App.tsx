import { useEffect } from "react";
import { useRoute } from "./lib/router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { ProjectsPage, ProjectDetail } from "./pages/Projects";
import { ServicesPage, AboutPage, ProcessPage, TestimonialsPage, ContactPage } from "./pages/Pages";

function renderRoute(path: string) {
  if (path === "/") return <Home />;
  if (path === "/projects") return <ProjectsPage />;
  if (path.startsWith("/projects/")) return <ProjectDetail slug={path.slice("/projects/".length)} />;
  if (path === "/services") return <ServicesPage />;
  if (path === "/about") return <AboutPage />;
  if (path === "/process") return <ProcessPage />;
  if (path === "/testimonials") return <TestimonialsPage />;
  if (path === "/contact") return <ContactPage />;
  return <NotFound />;
}

export default function App() {
  const { path } = useRoute();

  // Jump to top on page change (instant, so the page transition handles the motion)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [path]);

  return (
    <>
      <button
        type="button"
        onClick={() => document.getElementById("main")?.focus()}
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-ink px-4 py-3 text-sm font-semibold text-paper focus:translate-y-0"
      >
        Skip to content
      </button>
      <Navbar />
      <main id="main" tabIndex={-1} key={path} className="page-in outline-none">
        {renderRoute(path)}
      </main>
      <Footer />
    </>
  );
}
