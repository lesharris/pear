import { renderToString } from "vue/server-renderer";
import { createDocsApp } from "./createApp";

export async function render(url: string) {
  const { app, router } = createDocsApp();

  await router.push(url);
  await router.isReady();

  const appHtml = await renderToString(app);

  return { appHtml, route: router.currentRoute.value };
}
