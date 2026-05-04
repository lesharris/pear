import type { RouteLocationNormalizedLoaded } from "vue-router";
import { getRouteMetadata } from "./metadata";

export function syncDocumentHead(route: RouteLocationNormalizedLoaded) {
  const { title, description, canonicalUrl, jsonLd } = getRouteMetadata(route);

  document.title = title;
  setLinkHref('link[rel="canonical"]', canonicalUrl);
  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:url"]', canonicalUrl);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
  setJsonLd(jsonLd);
}

function setMetaContent(selector: string, content: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  el?.setAttribute("content", content);
}

function setLinkHref(selector: string, href: string) {
  const el = document.querySelector<HTMLLinkElement>(selector);
  el?.setAttribute("href", href);
}

function setJsonLd(content: string) {
  const el = document.querySelector<HTMLScriptElement>(
    'script[type="application/ld+json"]',
  );

  if (el) {
    el.textContent = content;
  }
}
