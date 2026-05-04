import type { RouteLocationNormalizedLoaded } from "vue-router";

export const siteOrigin = "https://pear.ontic.cloud";
export const defaultTitle = "Pear";
export const defaultDescription =
  "Pear is a lightweight Vue 3 component library built around PicoCSS semantics.";
export const socialImage = `${siteOrigin}/og-image.png`;
export const logoImage = "https://content.ontic.cloud/media/peary.png";

export function getRouteMetadata(route: RouteLocationNormalizedLoaded) {
  const title =
    typeof route.meta.title === "string" ? route.meta.title : defaultTitle;
  const description =
    typeof route.meta.description === "string"
      ? route.meta.description
      : defaultDescription;
  const canonicalUrl = `${siteOrigin}${route.path}`;

  return {
    title,
    description,
    canonicalUrl,
    jsonLd: createJsonLd({
      title,
      description,
      url: canonicalUrl,
    }),
  };
}

export function createJsonLd({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: title,
    url,
    description,
    image: socialImage,
    publisher: {
      "@type": "Organization",
      name: "Ontic Cloud",
      logo: {
        "@type": "ImageObject",
        url: logoImage,
      },
    },
  });
}
