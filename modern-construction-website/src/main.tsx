import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/hanken-grotesk";
import "./index.css";
import App from "./App";
import { navigate } from "./lib/router";

const root = document.getElementById("root")!;

// Old hash links (/#/services) from the previous build → clean URLs.
const legacy = window.location.hash.startsWith("#/") ? window.location.hash.slice(1) || "/" : null;
if (legacy) {
  window.history.replaceState(null, "", legacy);
  root.innerHTML = ""; // the prerendered HTML is for a different page, so render fresh
}

// Same-page hash links (e.g. an old bookmark opened in an existing tab).
window.addEventListener("hashchange", () => {
  if (window.location.hash.startsWith("#/")) navigate(window.location.hash.slice(1) || "/", { replace: true });
});

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Prerendered pages hydrate; the dev server and legacy redirects render from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
