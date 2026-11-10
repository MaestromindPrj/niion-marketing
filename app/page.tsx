import { readFile } from "node:fs/promises";
import path from "node:path";
import PreservedSite from "./preserved-site";
import { imageLoading } from "../public/site/image-loading.mjs";

export default async function Home() {
  const source = await readFile(path.join(process.cwd(), "public/site/body.html"), "utf8");
  // Set loading before the browser's preload scanner sees below-the-fold images.
  // The Framer image renderer uses the same policy when hydrating these nodes.
  const html = source.replace(/<img\b[^>]*>/g, tag => {
    if (/\bloading=/.test(tag)) return tag;
    const src = tag.match(/\bsrc="([^"]*)"/)?.[1] || "";
    return tag.replace("<img", `<img loading="${imageLoading(src)}"`);
  });
  return <PreservedSite html={html} />;
}
