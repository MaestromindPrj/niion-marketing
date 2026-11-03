"use client";

import { useEffect, useState } from "react";

export default function SiteLoader() {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const site = document.getElementById("niion-site");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    site?.setAttribute("inert", "");
    let frame = 0;
    let settledFrames = 0;
    let lastFrame = performance.now();
    let stopped = false;
    const started = lastFrame;
    const finish = () => {
      if (stopped) return;
      stopped = true;
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      site?.removeAttribute("inert");
      document.body.style.overflow = previousOverflow;
      setFinished(true);
    };
    // A broken asset or unavailable GPU must never block the page.
    const timeout = window.setTimeout(finish, 8000);
    const check = (now: number) => {
      const canvases = Array.from(site?.querySelectorAll("canvas") ?? []).filter(canvas => {
        const bounds = canvas.getBoundingClientRect();
        return bounds.width > 0 && bounds.height > 0 && bounds.bottom > 0 && bounds.top < innerHeight;
      });
      const ready = document.documentElement.dataset.niionApplicationLoaded === "true"
        && document.fonts.status === "loaded"
        && canvases.length > 0
        && canvases.every(canvas => canvas.dataset.shaderReady === "true");
      settledFrames = ready && now - lastFrame < 50 ? settledFrames + 1 : 0;
      lastFrame = now;
      if (settledFrames >= 12 && now - started >= 600) finish();
      else frame = requestAnimationFrame(check);
    };
    frame = requestAnimationFrame(check);
    return () => {
      stopped = true;
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      site?.removeAttribute("inert");
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className={`site-loader${finished ? " site-loader--finished" : ""}`} role="status" aria-live="polite" aria-hidden={finished}>
      <div className="site-loader__content">
        <span className="site-loader__brand">niion<span>.</span></span>
        <span className="site-loader__track" aria-hidden="true"><span /></span>
        <span className="site-loader__label">Loading your experience</span>
      </div>
    </div>
  );
}
