import type { StaticImageData } from "next/image";

import virelle from "../../public/work/virelle.webp";
import rjs from "../../public/work/rjs.webp";
import topnotch from "../../public/work/topnotch.webp";
import junes from "../../public/work/junes.webp";
import zinnia from "../../public/work/zinnia.webp";

/**
 * Demo screenshots, imported rather than referenced by path.
 *
 * This matters more than it looks. Referencing `/work/rjs.webp` as a string
 * gives every version of that file the same URL, so Next's image optimiser
 * keeps serving the first one it cached — which meant replacing a screenshot
 * changed the file on disk and nothing on the page, on the dev server and in
 * production alike. A static import puts a content hash in the URL, so a new
 * screenshot is a new URL and the stale copy can never win.
 *
 * It also carries width, height and a generated blur placeholder, which is why
 * there is no longer a hand-maintained blur.json to keep in sync.
 */
export const shots: Record<string, StaticImageData> = {
  virelle,
  rjs,
  topnotch,
  junes,
  zinnia,
};
