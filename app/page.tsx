import { readFile } from "node:fs/promises";
import path from "node:path";
import PreservedSite from "./preserved-site";

export default async function Home() {
  const html = await readFile(path.join(process.cwd(), "public/site/body.html"), "utf8");
  return <PreservedSite html={html} />;
}
