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
    let readySince = 0;
    let lastCheck = -Infinity;
    let stopped = false;
    const started = performance.now();
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
      // Avoid scanning the entire exported DOM on every animation frame.
      if (now - lastCheck < 100) {
        frame = requestAnimationFrame(check);
        return;
      }
      lastCheck = now;
      const canvases = Array.from(site?.querySelectorAll("canvas") ?? []).filter(canvas => {
        const bounds = canvas.getBoundingClientRect();
        return bounds.width > 0 && bounds.height > 0 && bounds.bottom > 0 && bounds.top < innerHeight;
      });
      const ready = document.documentElement.dataset.niionApplicationLoaded === "true"
        && document.fonts.status === "loaded"
        && canvases.length > 0
        && canvases.every(canvas => canvas.dataset.shaderReady === "true");
      readySince = ready ? readySince || now : 0;
      // GPU readiness already waits for painted frames. Slow devices should not
      // have to sustain 12 fast frames before an otherwise-ready page is shown.
      if (readySince && now - readySince >= 100 && now - started >= 600) finish();
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
