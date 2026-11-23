"use client";

import { useEffect } from "react";
import SiteLoader from "./site-loader";

/**
 * The original compiled React renderer owns #main. Next.js owns this outer shell.
 * Keeping that boundary preserves the exact responsive design and motion timelines.
 */
export default function PreservedSite({ html, showLoader = true }: { html: string; showLoader?: boolean }) {
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
      // Resolve this navigation item ourselves: the legacy router only knows
      // the home page and can rewrite links to the new Services route.
      if (target.closest(".framer-yctd3k-container")) {
        target.href = "/services/";
        if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && target.target !== "_blank") {
          event.preventDefault();
          event.stopImmediatePropagation();
          if (window.location.pathname.replace(/\/$/, "") === "/services") {
            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.assign(target.href);
          }
        }
        return;
      }
      const href = target.getAttribute("href");
      if (href?.startsWith("index.html")) target.href = "/" + href.slice(10);
      // The preserved renderer knows only the home route. Cross-page links must
      // load the matching Next.js shell instead of using its internal router.
      const url = new URL(target.href, window.location.href);
      if (url.origin === window.location.origin &&
          (window.location.pathname.startsWith("/services") || url.pathname.startsWith("/services")) &&
          url.pathname !== window.location.pathname && !event.ctrlKey && !event.metaKey &&
          !event.shiftKey && !event.altKey && target.target !== "_blank") {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.assign(url.href);
      }

    }, true);

    const bootstrap = document.createElement("script");
    bootstrap.src = "/site/bootstrap.js";
    bootstrap.onload = () => {
      const application = document.createElement("script");
      application.type = "module";
      application.src = "/vendor/framerusercontent.com/sites/6yCywluy3f19AABuNXU8BE/script_main.Cg3Mi68Z.mjs";
      application.onload = () => {
        document.documentElement.dataset.niionApplicationLoaded = "true";
      };
      document.body.appendChild(application);
    };
    document.body.appendChild(bootstrap);
  }, []);

  return <>
    {showLoader && <SiteLoader />}
    <noscript><style>{`.site-loader { display: none !important; }`}</style></noscript>
    <div id="niion-site" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />
  </>;
}
