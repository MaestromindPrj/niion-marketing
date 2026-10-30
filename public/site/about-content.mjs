// Reference composition: twilightitsolutions.com. Copy and metrics describe Niion.
// These describe our offering; replace only with confirmed company milestones.
export const aboutStats = [
  { value: 5, label: 'Growth stages', icon: 'growth' },
  { value: 4, label: 'Core services', icon: 'services' },
  { value: 1, label: 'Integrated team', icon: 'team' },
];

const paths = {
  growth: '<path d="M4 19V5m0 14h16M8 14l4-4 4 2 5-7m-5 0h5v5"/>',
  services: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  team: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v3"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  arrow: '<path d="M5 19 19 5M5 5h14v14"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;

export const aboutIntro = `
<section class="niion-about" aria-labelledby="niion-about-title">
  <div class="niion-about-copy">
    <p class="niion-about-eyebrow about-reveal"><span aria-hidden="true"></span> A little about Niion</p>
    <h2 id="niion-about-title" class="niion-about-title about-reveal" style="--about-delay:70ms">Who are <span>we?</span></h2>
    <ul class="niion-about-stats" aria-label="Niion at a glance">
      ${aboutStats.map(({ value, label, icon: name }, index) => `<li class="niion-about-stat about-reveal" style="--about-delay:${140 + index * 70}ms">
        <span class="niion-about-stat-icon">${icon(name)}</span>
        <span class="niion-about-stat-value" aria-hidden="true" data-about-count="${value}">${String(value).padStart(2, '0')}</span>
        <span class="niion-about-sr-only">${value} </span><span class="niion-about-stat-label">${label}</span>
      </li>`).join('')}
    </ul>
    <p class="niion-about-lead about-reveal" style="--about-delay:280ms">Creative minds.<br>Connected growth.</p>
    <p class="niion-about-description about-reveal" style="--about-delay:350ms">We&rsquo;re Niion Marketing, a team of strategists, creatives and digital thinkers based in Chennai. We bring brands to life through digital marketing, offline experiences, web development and events.</p>
    <p class="niion-about-description about-reveal" style="--about-delay:420ms">From the first spark of an idea to the systems that help it grow, we connect every part of your brand&rsquo;s journey. One team. A shared vision. Built around your business.</p>
    <a class="niion-about-cta about-reveal" href="/#contact" style="--about-delay:490ms">Let&rsquo;s build your next chapter <span>${icon('arrow')}</span></a>
  </div>
  <div class="niion-about-visual about-reveal" style="--about-delay:180ms" role="img" aria-label="A professional holding a laptop, surrounded by connected strategy, creativity and growth elements.">
    <div class="niion-about-scene" aria-hidden="true">
      <div class="niion-about-grid"></div>
      <div class="niion-about-orbit niion-about-orbit-outer"></div>
      <div class="niion-about-orbit niion-about-orbit-inner"></div>
      <div class="niion-about-halo"></div>
      <span class="niion-about-spark niion-about-spark-one">+</span>
      <span class="niion-about-spark niion-about-spark-two">+</span>
      <img class="niion-about-person" src="/images/about/laptop-professional.png" alt="" width="1536" height="1024" loading="lazy" decoding="async">
      <div class="niion-about-float niion-about-strategy">
        <span class="niion-about-card-icon">${icon('services')}</span>
        <span class="niion-about-card-eyebrow">The starting point</span>
        <strong>Big ideas.<br>Clear strategy.</strong>
        <span class="niion-about-card-line"></span>
        <span class="niion-about-card-line niion-about-card-line-short"></span>
      </div>
      <div class="niion-about-float niion-about-growth">
        <span class="niion-about-card-eyebrow">Made to move forward</span>
        <strong>Built for growth ${icon('arrow')}</strong>
        <div class="niion-about-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <span class="niion-about-chart-label">Strategy meets momentum</span>
      </div>
      <div class="niion-about-float niion-about-connected"><span>${icon('check')}</span><div><strong>Everything, connected.</strong><small>Your brand. Our shared vision.</small></div></div>
      <div class="niion-about-location"><span></span> Chennai roots. Limitless ideas.</div>
    </div>
  </div>
</section>`;

// A ref shared by the preserved renderer; static HTML stays readable without JS.
export function createAboutRef() {
  let dispose;
  return root => {
    dispose?.();
    dispose = undefined;
    const section = root?.querySelector('.niion-about');
    if (!section) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (typeof IntersectionObserver === 'undefined') return;
    const targets = [...section.querySelectorAll('.about-reveal')];
    const counters = [...section.querySelectorAll('[data-about-count]')];
    const stats = section.querySelector('.niion-about-stats');
    let frame = 0;
    let counted = false;
    const finishCounters = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      counters.forEach(counter => {
        counter.textContent = counter.dataset.aboutCount.padStart(2, '0');
      });
    };
    const count = () => {
      if (counted) return;
      counted = true;
      if (motion.matches) return finishCounters();
      const start = performance.now();
      const tick = now => {
        const progress = Math.min(1, (now - start) / 1200);
        const eased = 1 - Math.pow(1 - progress, 3);
        counters.forEach(counter => {
          counter.textContent = String(Math.round(Number(counter.dataset.aboutCount) * eased)).padStart(2, '0');
        });
        if (progress < 1) frame = requestAnimationFrame(tick);
        else finishCounters();
      };
      frame = requestAnimationFrame(tick);
    };
    const reveals = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('about-visible');
        reveals.unobserve(entry.target);
      });
    }, { threshold: .12 });
    const statObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        count();
        statObserver.disconnect();
      }
    }, { threshold: .5 });
    const visibility = new IntersectionObserver(entries => {
      section.classList.toggle('about-in-view', entries.some(entry => entry.isIntersecting));
    });
    const reduce = () => {
      if (!motion.matches) return;
      targets.forEach(target => target.classList.add('about-visible'));
      reveals.disconnect();
      statObserver.disconnect();
      counted = true;
      finishCounters();
    };
    if (!motion.matches) {
      targets.forEach(target => {
        target.classList.add('about-motion-ready');
        reveals.observe(target);
      });
      statObserver.observe(stats);
    }
    visibility.observe(section);
    motion.addEventListener('change', reduce);
    dispose = () => {
      reveals.disconnect();
      statObserver.disconnect();
      visibility.disconnect();
      motion.removeEventListener('change', reduce);
      finishCounters();
      section.classList.remove('about-in-view');
      targets.forEach(target => target.classList.remove('about-motion-ready', 'about-visible'));
    };
  };
}
