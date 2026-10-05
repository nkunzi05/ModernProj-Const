import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";

/**
 * Tiny history-API router with clean URLs (/services, /projects/slug).
 * Every route is prerendered to its own HTML file at build time
 * (scripts/prerender.mjs), so search engines get real pages and content.
 */
export interface Route {
  path: string;
  query: URLSearchParams;
}

let serverUrl = "/";
/** Used by the prerenderer to render a given URL without a window. */
export function setServerUrl(url: string) {
  serverUrl = url;
}

function parse(pathname: string, search: string): Route {
  const path = ("/" + pathname.replace(/^\/+/, "")).replace(/\/+$/, "") || "/";
  return { path, query: new URLSearchParams(search) };
}

function current(): Route {
  if (typeof window === "undefined") {
    const u = new URL(serverUrl, "http://local");
    return parse(u.pathname, u.search);
  }
  return parse(window.location.pathname, window.location.search);
}

const EVT = "locationchange";

export function navigate(to: string, { replace = false } = {}) {
  if (replace) window.history.replaceState(null, "", to);
  else window.history.pushState(null, "", to);
  window.dispatchEvent(new Event(EVT));
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(current);
  useEffect(() => {
    const onChange = () => setRoute(current());
    window.addEventListener("popstate", onChange);
    window.addEventListener(EVT, onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener(EVT, onChange);
    };
  }, []);
  return route;
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  children?: ReactNode;
}

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === "_blank" ||
      !to.startsWith("/")
    )
      return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
