// Content adapted from the client's Growth Marketing deck. Shared by the
// preserved Framer renderer and the HTML generation script.
import { aboutIntro, createAboutRef } from './about-content.mjs';
const revealWords = (title) => title.split(/\s+/).map((word, i) => `<span class="niion-heading-word" style="--word-order:${i}">${word}</span>`).join(' ');
const heading = (eyebrow, title, copy = '', staggered = false) => `<header class="growth-heading"><p class="growth-label">${eyebrow}</p><h2>${staggered ? revealWords(title) : title}</h2>${copy ? `<p>${copy}</p>` : ''}</header>`;
const phases = [
  ['Authority Engine', 'Build market trust through precision content and founder positioning. Make your brand the obvious choice before prospects ever talk to sales.', ['10 videos per month: problem awareness, trust building and solution positioning.', 'LinkedIn: thought leadership that reaches B2B decision-makers.', 'Instagram: reach, engagement and brand recall.', 'Facebook: re-engage warm audiences and amplify your best content.']],
  ['Conversion Infrastructure', 'Engineer the entire journey from click to qualified lead with purpose-built pages and tracking.', ['High-converting pages: copy, design, UX and A/B testing from day one.', 'Meta Pixel, GA4 and heat maps for full data visibility.', 'Retargeting audiences built from day one.', 'Visitor → landing page → lead capture → pixel fired → qualified lead.']],
  ['Performance Marketing', 'Precision campaigns across every buyer stage build a predictable pipeline independent of referrals.', ['Awareness: broad targeting, problem-aware content and brand reach.', 'Consideration: warm audience nurturing and solution content.', 'Conversion: direct offers for high-intent audiences.', 'Retarget website visitors, 75%+ video viewers, and page or profile engagers.']],
  ['CRM System', 'Your command centre for full pipeline visibility, automated follow-ups and lead management.', ['New lead → contacted → qualified → closed won.', 'A live dashboard for pipeline value and deal velocity.', 'Behaviour-triggered follow-ups that nurture every lead.', 'Ads and website enquiries flow directly into the CRM.']],
  ['Automation Engine', 'Give every lead an instant, personalised response, then qualify and route them automatically.', ['Connect leads from ads, organic, referrals and your website.', 'Personalised responses within 90 seconds, around the clock.', 'Behaviour-based scoring and routing to the right team.', 'Designed for complete lead coverage and fewer missed opportunities.']]
];

const cards = (items) => `<div class="growth-grid">${items.map(([title, copy]) => `<article class="growth-card"><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div>`;

const phaseImages = [
  ['authority-engine', 'A blue broadcast beacon surrounded by floating content panels.'],
  ['conversion-infrastructure', 'Glass landing pages guide visitors through a funnel into a qualified lead.'],
  ['performance-marketing', 'A precise arrow hits a blue target beside ascending glass blocks.'],
  ['crm-system', 'Customer contact cards move through a connected sales pipeline.'],
  ['automation-engine', 'A central processing hub connects messaging, qualification and routing nodes.']
];

const ecosystem = [
  ['Attention', 'Build trust and reach the right audience through authority content.'],
  ['Leads', 'Turn interest into qualified enquiries with focused pages and campaigns.'],
  ['Nurturing', 'Keep every conversation moving with timely, personalised follow-ups.'],
  ['Conversion', 'Qualify opportunities and guide prospects from conversation to customer.'],
  ['Retention', 'Strengthen relationships and bring customers back for repeat business.']
];

const differenceIcons = {
  brand: '<path d="m4 10 12-5v14L4 14zM4 10H2v4h2m3 1 1 6h3l-1-5M20 8l2-1m-2 5h2m-2 4 2 1"/>',
  pages: '<path d="m5 3 14 11-7 1-3 7zM12 15l5 6"/>',
  ads: '<rect x="3" y="14" width="4" height="7" rx="1"/><rect x="10" y="9" width="4" height="12" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/>',
  crm: '<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2z"/>',
  automation: '<path d="m9 3-1 3-3 1v3l-2 2 2 2v3l3 1 1 3h6l1-3 3-1v-3l2-2-2-2V7l-3-1-1-3z"/><circle cx="12" cy="12" r="3"/>',
  report: '<path d="M6 2h9l5 5v15H4V2zm8 0v6h6M8 12h8m-8 4h8m-8 4h5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 11h18"/>',
  optimise: '<path d="M3 20h18M4 15l6-6 4 4 7-9m-6 0h6v6"/>',
  strategy: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m12 12 8-9m-5 0h5v5"/>'
};
const differenceIcon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${differenceIcons[name]}</svg>`;
const commitmentContent = `<section class="niion-commitment"><div>${heading('Our commitment', 'Zero surprises.<br><span>Full</span> accountability.')}</div><div class="niion-commitment-items">${[
  ['report', 'Transparent reporting', 'Access to campaign data, spend and performance metrics.'],
  ['calendar', 'Weekly updates', 'Every Friday: what worked, what didn&rsquo;t, and what is changing and why.'],
  ['optimise', 'Continuous optimisation', 'Weekly decisions based on campaign data.'],
  ['strategy', 'Monthly strategy review', 'Recalibrate around real results and changing market conditions.']
].map(([icon, title, copy]) => `<article class="niion-commitment-item"><span class="niion-icon">${differenceIcon(icon)}</span><div><h3>${title}</h3><p>${copy}</p></div></article>`).join('')}</div></section>`;

const ecosystemTitle = [
  ['Turn', false], ['your', false], ['business', false], ['into', false],
  ['a', false], ['predictable', true], ['revenue', true], ['engine.', true]
].map(([word, accent], i) => `${i ? ' ' : ''}${accent ? '<span class="niion-heading-accent">' : ''}<span class="niion-heading-word" style="--word-order:${i}">${word}</span>${accent ? '</span>' : ''}`).join('');
const ecosystemContent = `<section class="niion-difference growth-ecosystem-section"><div class="niion-difference-copy">${heading('Growth Marketing &middot; 5-layer ecosystem', ecosystemTitle, 'Precision branding. Performance marketing. End-to-end sales automation. One connected system built for scalable businesses.')}</div><div class="niion-network" role="img" aria-label="The five-layer growth ecosystem connects attention, leads, nurturing, conversion and retention."><div class="niion-network-core" aria-hidden="true"><span>5-layer</span><strong>Ecosystem</strong></div><div class="niion-network-rotor"><div class="niion-network-orbit" aria-hidden="true"></div>${ecosystem.map(([title], i) => {
  const positions = ['brand', 'ads', 'crm', 'automation', 'pages'];
  const icons = ['brand', 'crm', 'calendar', 'strategy', 'automation'];
  return `<div class="niion-network-node niion-node-${positions[i]}" aria-hidden="true"><span class="niion-icon">${differenceIcon(icons[i])}</span><span>${title}</span></div>`;
}).join('')}</div></div><p class="growth-intro growth-ecosystem-note">Every layer amplifies the next. Authority makes ads cheaper. Ads feed the CRM. CRM feeds automation. Automation closes deals.</p></section>`;

// Keep the approved investment copy available, but omit it from both the
// generated page and the live renderer while public pricing is hidden.
const showGrowthPricing = false;
const allGrowthBlocks = [
  aboutIntro,
  `<section class="growth-problem" aria-labelledby="growth-problem-title"><header class="growth-heading"><p class="growth-label">The problem</p><h2 id="growth-problem-title">${revealWords('Growth breaks when the system does.')}</h2></header><div class="growth-problem-layout"><div class="growth-problem-intro"><p class="growth-problem-eyebrow">The hidden cost</p><h3>Revenue leaks at every stage.</h3><p>Disconnected marketing, missed follow-ups, and manual processes make growth hard to predict.</p></div><ol class="growth-problem-list">${[
    ['Weak brand authority', 'You compete on price instead of value.'],
    ['Unpredictable leads', 'New opportunities arrive inconsistently.'],
    ['Lost follow-ups', 'Potential customers slip away.'],
    ['Manual bottlenecks', 'Your team becomes the limit to growth.']
  ].map(([title, copy], i) => `<li><div class="growth-problem-row"><span class="growth-problem-number" aria-hidden="true">0${i + 1}</span><h3>${title}</h3></div><p>${copy}</p></li>`).join('')}</ol></div><p class="growth-problem-takeaway">One connected system can solve what disconnected efforts cannot.</p></section>`,
  heading('The NIION 5-stage system', 'A complete revenue infrastructure', 'Brand + content + trust. Funnels + tracking. Ads + retargeting. Pipeline + follow-up. Automation + conversion.', true) + `<div class="growth-phases">${phases.map(([title, copy, points], i) => `<article class="growth-phase"><div class="growth-phase-content"><div class="growth-phase-title"><span class="growth-number">0${i+1}</span><h3>${title}</h3></div><div class="growth-phase-copy"><p>${copy}</p><ul>${points.map(p => `<li>${p}</li>`).join('')}</ul></div></div><figure class="growth-phase-visual"><img src="/images/growth-stages/${phaseImages[i][0]}.webp" alt="${phaseImages[i][1]}" width="1448" height="1086" loading="lazy" decoding="async"></figure></article>`).join('')}</div>`,
  heading('Full investment structure', 'Your growth system, clearly priced', '', true) + '<div class="growth-pricing"><article class="growth-card"><p class="growth-label">Monthly recurring</p><p class="growth-total">&#8377;1,00,000<small>/ month</small></p><dl><div><dt>Branding &amp; authority</dt><dd>&#8377;30,000</dd></div><div><dt>Performance ad spend</dt><dd>&#8377;30,000</dd></div><div><dt>Ads management</dt><dd>&#8377;25,000</dd></div><div><dt>Automation management</dt><dd>&#8377;15,000</dd></div></dl></article><article class="growth-card"><p class="growth-label">Setup + first 3 months</p><p class="growth-total">&#8377;3.65 Lakhs</p><p>Complete setup and the first 90 days of full operation.</p><dl><div><dt>Landing page build</dt><dd>&#8377;15,000 <small>one-time</small></dd></div><div><dt>CRM + automation</dt><dd>&#8377;50,000 <small>annual</small></dd></div><div><dt>3 months of operation</dt><dd>&#8377;3,00,000</dd></div></dl><a class="growth-cta" href="/#contact">Discuss your growth plan <span aria-hidden="true">&nearr;</span></a></article></div>',
  ecosystemContent,
  `<section class="growth-performance"><div class="performance-top">${heading('Performance estimates', '<span class="performance-heading-word" style="--word-order:0">What</span> <span class="performance-heading-word" style="--word-order:1">growth</span><br><span class="performance-heading-accent"><span class="performance-heading-word" style="--word-order:2">can</span> <span class="performance-heading-word" style="--word-order:3">look</span> <span class="performance-heading-word" style="--word-order:4">like</span></span>', 'Campaign estimates across B2B and B2C clients. Actual results depend on your business, offer and campaign performance.')}<div class="performance-curve" aria-hidden="true"><svg viewBox="0 0 600 240" fill="none"><defs><linearGradient id="performance-area" x1="0" y1="25" x2="0" y2="230" gradientUnits="userSpaceOnUse"><stop stop-color="currentColor" stop-opacity=".35"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient><linearGradient id="performance-line" x1="15" y1="200" x2="570" y2="35" gradientUnits="userSpaceOnUse"><stop stop-color="currentColor" stop-opacity=".08"/><stop offset="1" stop-color="currentColor"/></linearGradient></defs><g class="performance-guide"><path d="M100 60v170M200 60v170M300 60v170M400 40v190M500 20v210M570 20v210"/></g><path class="performance-area-fill" d="M15 211C115 199 216 181 300 160S485 109 570 35V235H15Z" fill="url(#performance-area)"/><path class="performance-line-draw" pathLength="1" d="M15 211C115 199 216 181 300 160S485 109 570 35" stroke="url(#performance-line)" stroke-width="2"/><g class="performance-curve-points"><circle cx="300" cy="160" r="5"/><circle cx="465" cy="107" r="6"/><circle cx="570" cy="35" r="10"/></g></svg></div></div><ol class="performance-metrics" aria-label="Estimated campaign performance">${[
    ['&#8377;150', 'Minimum cost per lead'], ['200+', 'Leads / month'], ['30&ndash;60', 'Qualified prospects'], ['3&ndash;6', 'New customers / month']
  ].map(([value, label], i) => `<li><span class="performance-metric-index" aria-hidden="true">0${i+1}</span><strong>${value}</strong><p>${label}</p></li>`).join('')}</ol><div class="performance-scenarios">${[
    ['1.5&times;&ndash;2&times;', 'Conservative', 'An illustrative &#8377;1 lakh monthly investment generating &#8377;1.5&ndash;2 lakh in revenue.'],
    ['3&times;&ndash;5&times;', 'Growth', 'A growth scenario as the connected system develops.'],
    ['5&times;+', 'Aggressive', 'An upper revenue-return scenario as performance scales.']
  ].map(([value, label, copy], i) => `<article class="performance-scenario${i === 1 ? ' performance-scenario-featured' : ''}"><div class="performance-scenario-mark" aria-hidden="true"></div><div><p class="performance-return">${value}</p><h3>${label}</h3><p>${copy}</p></div></article>`).join('')}</div><p class="growth-note performance-note">Illustrative revenue models: 3 clients &times; &#8377;50,000 = &#8377;1.5 lakh, or 50 sales &times; &#8377;3,000 = &#8377;1.5 lakh. Revenue multiples are not profit margins or guaranteed returns. Automation targets include under 2-minute responses, 3&times; higher conversion and 100% lead coverage.</p></section>`,
  commitmentContent,
  heading('What happens next', 'Build your revenue machine', 'B2B &amp; B2C specialists &middot; Chennai, India') + cards([['01 / Discovery call', 'Audit your current setup and identify growth opportunities.'], ['02 / Custom roadmap', 'A strategy for your industry, audience and goals.'], ['03 / 7-day onboarding', 'Planned full system activation within one week.'], ['04 / First leads in 30 days', 'The onboarding plan targets pipeline movement in the first month.']]) + '<div class="growth-contact"><a class="growth-cta" href="/#contact">Start your growth journey <span aria-hidden="true">&nearr;</span></a><a href="tel:+917305911111">7305 911 111</a></div>'
];

export const growthBlocks = allGrowthBlocks.filter(block =>
  showGrowthPricing || !block.includes('class="growth-pricing"'));

// Initialise after the preserved renderer owns the DOM; release listeners on unmount.
export function createPerformanceRef() {
  let dispose;
  return (section) => {
    dispose?.();
    dispose = undefined;
    if (!section) return;
    const heading = section.querySelector('.performance-top h2');
    const curve = section.querySelector('.performance-curve');
    if (!heading || !curve) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let revealed = false;
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const progress = reducedMotion.matches ? 1 : Math.max(0, Math.min(1,
        (viewport * .9 - curve.getBoundingClientRect().top) / (viewport * .55)));
      curve.style.setProperty('--curve-progress', String(progress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const reveal = () => {
      revealed = true;
      section.classList.add('performance-heading-visible');
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) { reveal(); observer.disconnect(); }
    }, { threshold: .5 });
    const motionChanged = () => {
      if (reducedMotion.matches) reveal();
      schedule();
    };
    if (reducedMotion.matches) reveal();
    else {
      section.classList.add('performance-motion-ready');
      observer.observe(heading);
    }
    window.addEventListener('scroll', schedule, { passive: true, capture: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', motionChanged);
    update();
    dispose = () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule, true);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', motionChanged);
      cancelAnimationFrame(frame);
      section.classList.remove('performance-motion-ready');
      if (!revealed) section.classList.remove('performance-heading-visible');
      curve.style.removeProperty('--curve-progress');
    };
  };
}

function createStaggeredHeadingRef() {
  let dispose;
  return (root) => {
    dispose?.();
    dispose = undefined;
    const heading = root?.querySelector('.niion-heading-word')?.closest('h2');
    if (!heading) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reveal = () => heading.classList.add('niion-heading-visible');
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        reveal();
        observer.disconnect();
      }
    }, { threshold: .5 });
    const changed = () => { if (motion.matches) { reveal(); observer.disconnect(); } };
    if (motion.matches) reveal();
    else { heading.classList.add('niion-heading-ready'); observer.observe(heading); }
    motion.addEventListener('change', changed);
    dispose = () => {
      observer.disconnect();
      motion.removeEventListener('change', changed);
      heading.classList.remove('niion-heading-ready', 'niion-heading-visible');
    };
  };
}

// Taller panels scroll fully into view before sticking, including after font loading.
function createStagesRef() {
  const headingRef = createStaggeredHeadingRef();
  let dispose;
  return (root) => {
    dispose?.();
    dispose = undefined;
    headingRef(root);
    if (!root) return;
    const panels = [...root.querySelectorAll('.growth-phase')];
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const viewport = window.innerHeight;
      panels.forEach(panel => {
        const progress = motion.matches ? 1 : Math.max(.15, Math.min(1,
          (viewport - panel.getBoundingClientRect().top) / (viewport * .8)));
        panel.style.setProperty('--stage-progress', String(progress));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
    const fit = () => panels.forEach(panel => {
      panel.style.setProperty('--phase-top', `${Math.min(100, window.innerHeight - panel.offsetHeight - 24)}px`);
    });
    const observer = new ResizeObserver(fit);
    panels.forEach(panel => observer.observe(panel));
    window.addEventListener('resize', fit, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true, capture: true });
    window.addEventListener('resize', schedule, { passive: true });
    motion.addEventListener('change', schedule);
    fit();
    updateProgress();
    dispose = () => {
      observer.disconnect();
      window.removeEventListener('resize', fit);
      window.removeEventListener('scroll', schedule, true);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
      cancelAnimationFrame(frame);
      panels.forEach(panel => {
        panel.style.removeProperty('--phase-top');
        panel.style.removeProperty('--stage-progress');
      });
    };
  };
}

function createGrowthDesignRef(html) {
  const sectionRef = html.includes('class="niion-about"') ? createAboutRef()
    : html.includes('class="growth-performance"') ? createPerformanceRef()
    : html.includes('class="growth-phases"') ? createStagesRef()
    : createStaggeredHeadingRef();
  let dispose;
  return (root) => {
    dispose?.();
    dispose = undefined;
    sectionRef(root);
    if (!root) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const items = [...root.querySelectorAll(
      '.growth-problem-list li, .growth-card, .growth-phase-visual, .performance-metrics li, .performance-scenario, .niion-commitment-item, .growth-contact, .growth-heading:not(:has(.niion-heading-word, .performance-heading-word))'
    )];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('growth-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -24px 0px' });
    const revealAll = () => {
      if (!motion.matches) return;
      items.forEach(item => item.classList.add('growth-revealed'));
      observer.disconnect();
    };
    if (!motion.matches) {
      items.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${index % 4 * 65}ms`);
        item.classList.add('growth-reveal-ready');
        observer.observe(item);
      });
    }
    motion.addEventListener('change', revealAll);
    dispose = () => {
      observer.disconnect();
      motion.removeEventListener('change', revealAll);
      items.forEach(item => {
        item.classList.remove('growth-reveal-ready', 'growth-revealed');
        item.style.removeProperty('--reveal-delay');
      });
    };
  };
}

// Each item reveals independently; large sections never depend on one entrance
// transform. That also keeps the five-stage sticky panels in the page flow.
export function renderGrowthBlocks(jsx) {
  return growthBlocks.map((html, index) => jsx('div', {
    className: 'growth-block',
    ref: createGrowthDesignRef(html),
    dangerouslySetInnerHTML: { __html: html }
  }, `growth-${index}`));
}
