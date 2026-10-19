"use client";

import { useEffect } from "react";

/**
 * The original compiled React renderer owns #main. Next.js owns this outer shell.
 * Keeping that boundary preserves the exact responsive design and motion timelines.
 */
export default function PreservedSite({ html }: { html: string }) {
  useEffect(() => {
    if (document.documentElement.dataset.niionStarted) return;
    document.documentElement.dataset.niionStarted = "true";

    // Capture submission before the preserved renderer invokes the retired provider.
    document.addEventListener("submit", (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get("Name") || "");
      const email = String(data.get("Email") || "");
      const business = String(data.get("Business Type") || "");
      const message = String(data.get("Message") || "");
      const subject = encodeURIComponent(`Website enquiry${name ? ` from ${name}` : ""}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nBusiness Type: ${business}\n\n${message}`);
      const url = `mailto:thirumaran@niionmarketing.com?subject=${subject}&body=${body}`;
      let status = form.querySelector<HTMLElement>("[data-contact-status]");
      if (!status) {
        status = document.createElement("p");
        status.dataset.contactStatus = "true";
        status.setAttribute("role", "status");
        status.className = "contact-status";
        form.appendChild(status);
      }
      status.replaceChildren(document.createTextNode("Your email app will open with your enquiry. Send it there to contact us. "));
      const link = document.createElement("a");
      link.href = url;
      link.textContent = "Open email draft";
      status.appendChild(link);
      window.location.href = url;
    }, true);

    // Keep legacy index.html anchors on the current origin.
    document.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a") : null;
      if (!target) return;
      const href = target.getAttribute("href");
      if (href?.startsWith("index.html")) target.href = "/" + href.slice(10);
    }, true);

    const bootstrap = document.createElement("script");
    bootstrap.src = "/site/bootstrap.js";
    bootstrap.onload = () => {
      const application = document.createElement("script");
      application.type = "module";
      application.src = "/vendor/framerusercontent.com/sites/6yCywluy3f19AABuNXU8BE/script_main.Cg3Mi68Z.mjs";
      document.body.appendChild(application);
    };
    document.body.appendChild(bootstrap);
  }, []);

  return <div id="niion-site" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
