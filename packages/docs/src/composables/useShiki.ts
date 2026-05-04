import {
  createBundledHighlighter,
  createSingletonShorthands,
} from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const { codeToHtml } = createSingletonShorthands(
  createBundledHighlighter({
    langs: {
      html: () => import("@shikijs/langs/html"),
      shell: () => import("@shikijs/langs/shellscript"),
      ts: () => import("@shikijs/langs/typescript"),
      css: () => import("@shikijs/langs/css"),
    },
    themes: {
      "github-dark": () => import("@shikijs/themes/github-dark"),
      "github-light": () => import("@shikijs/themes/github-light"),
    },
    engine: () => createJavaScriptRegexEngine(),
  }),
);

export function useShiki() {
  return { codeToHtml };
}
