import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import PreservedSite from "../preserved-site";
import { servicesPageHtml } from "../../public/site/services-content.mjs";

export const metadata: Metadata = {
  title: "Services | Niion Marketing",
  description: "Explore Niion Marketing's creative, production, brand partnership and event services.",
  alternates: { canonical: "https://www.niionmarketing.com/services/" },
};

export default async function Services() {
  const source = await readFile(path.join(process.cwd(), "public/site/body.html"), "utf8");
  // Keep the original responsive layout shell, including its live navbar and footer.
  const start = source.indexOf("<div data-framer-root");
  if (start < 0) throw new Error("Preserved page root not found");
  const contentStart = source.indexOf(">", start) + 1;
  const tags = /<\/?div\b[^>]*>/g;
  tags.lastIndex = contentStart;
  let depth = 1;
  let contentEnd = -1;
  for (let tag; (tag = tags.exec(source));) {
    depth += tag[0].startsWith("</") ? -1 : 1;
    if (depth === 0) { contentEnd = tag.index; break; }
  }
  if (contentEnd < 0) throw new Error("Preserved page root closing tag not found");
  const html = source.slice(0, contentStart) + servicesPageHtml + source.slice(contentEnd);
  return <PreservedSite html={html} showLoader={false} />;
}
