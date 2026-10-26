// Additional services from NIION MARKETING BROCHURE.pdf, pages 6–13.
// Existing Framer service cards and category designs remain untouched.
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const words = value => value.split(' ').map((word, index) => `<span style="--word-order:${index}">${escape(word)}</span>`).join(' ');
const title = (number, value, id) => `<header class="service-section-heading"><span class="service-section-index" aria-hidden="true">${number}</span><h3 id="${id}" class="service-word-heading">${words(value)}</h3></header>`;
const list = items => `<ul class="service-detail-list">${items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>`;
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const icons = {
  lead: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m2-9 3 3 4-5"/>',
  message: '<path d="M4 4h16v12H9l-5 4zM8 8h8m-8 4h5"/>',
  write: '<path d="m5 15 11-11 4 4L9 19l-5 1zm9-9 4 4M4 23h16"/>',
  design: '<path d="M4 4h16v16H4zM8 4v16M4 8h16"/><circle cx="14" cy="14" r="3"/>',
  edit: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16m10-16v16m-4-11 3 3-3 3z"/>',
  film: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 10h18M7 5l3 5m4-5 3 5m-7 4 5 2-5 2z"/>',
  star: '<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>',
  event: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 11h18m-14 5h4"/>'
};
const icon = name => `<span class="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg></span>`;

const productionSteps = [
  ['Script Development', 'Crafting compelling narratives that resonate with your target audience and communicate your brand message effectively.'],
  ['Professional Shoot', 'High-quality production with experienced crews, state-of-the-art equipment, and attention to every creative detail.'],
  ['Expert Editing', 'Post-production excellence that brings your vision to life with seamless cuts, effects, and audio mixing.'],
  ['Strategic Placement', 'Optimized media buying and placement across TV channels, BTL campaigns, and YouTube to maximize reach and impact.']
];

// Decorative vector scenes use the site's palette without implying endorsements
// by a real celebrity or showing invented campaign metrics.
const partnershipVisuals = {
  celebrity: `<svg viewBox="0 0 560 280" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="service-spotlight-beam" x1="280" y1="20" x2="280" y2="236" gradientUnits="userSpaceOnUse"><stop stop-color="#398fff" stop-opacity=".3"/><stop offset="1" stop-color="#398fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="service-star-metal" x1="244" y1="87" x2="320" y2="184" gradientUnits="userSpaceOnUse"><stop stop-color="#ecf4ff"/><stop offset=".42" stop-color="#89baff"/><stop offset="1" stop-color="#28446d"/></linearGradient>
      <radialGradient id="service-stage-glow"><stop stop-color="#398fff" stop-opacity=".24"/><stop offset="1" stop-color="#398fff" stop-opacity="0"/></radialGradient>
    </defs>
    <path d="M40 226h480M80 246h400" stroke="#ffffff" stroke-opacity=".05"/>
    <ellipse cx="280" cy="207" rx="200" ry="66" fill="url(#service-stage-glow)"/>
    <path d="m196 12-74 220h316L364 12" fill="url(#service-spotlight-beam)"/>
    <path d="m196 12-74 220m242-220 74 220" stroke="#398fff" stroke-opacity=".16"/>
    <ellipse cx="280" cy="216" rx="112" ry="21" fill="#101820" stroke="#34465b"/>
    <path d="M168 204v12c0 12 50 21 112 21s112-9 112-21v-12" fill="#080c12" stroke="#25303e"/>
    <ellipse cx="280" cy="204" rx="112" ry="21" fill="#131b26" stroke="#398fff" stroke-opacity=".5"/>
    <ellipse cx="280" cy="204" rx="76" ry="12" stroke="#398fff" stroke-opacity=".18"/>
    <g class="service-talent-emblem">
      <circle cx="280" cy="127" r="70" fill="#0a101a" stroke="#365475"/>
      <circle cx="280" cy="127" r="61" stroke="#398fff" stroke-opacity=".18"/>
      <path d="m280 84 13 27 30 4-22 22 5 30-26-14-26 14 5-30-22-22 30-4z" fill="url(#service-star-metal)" stroke="#b1d1ff" stroke-width=".8"/>
    </g>
    <path d="m156 98 3 7 7 3-7 3-3 7-3-7-7-3 7-3zm244 34 2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#92bcf4" opacity=".65"/>
    <path d="M44 34h18M44 34v18m472-18h-18m18 0v18" stroke="#ffffff" stroke-opacity=".18"/>
  </svg>`,
  influencer: `<svg viewBox="0 0 560 280" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="service-creator-screen" x1="240" y1="67" x2="321" y2="228" gradientUnits="userSpaceOnUse"><stop stop-color="#1a2d49"/><stop offset="1" stop-color="#080e17"/></linearGradient>
      <radialGradient id="service-creator-glow"><stop stop-color="#398fff" stop-opacity=".18"/><stop offset="1" stop-color="#398fff" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse cx="280" cy="148" rx="220" ry="126" fill="url(#service-creator-glow)"/>
    <ellipse cx="280" cy="140" rx="189" ry="91" stroke="#ffffff" stroke-opacity=".06" stroke-dasharray="3 7"/>
    <path d="M156 88h36l38 35m174-35h-36l-38 35M158 204h36l36-30m172 30h-36l-36-30" stroke="#398fff" stroke-opacity=".38"/>
    <rect x="226" y="33" width="108" height="213" rx="19" fill="#080c12" stroke="#567494"/>
    <rect x="234" y="41" width="92" height="197" rx="13" fill="url(#service-creator-screen)" stroke="#283a50"/>
    <rect x="263" y="47" width="34" height="5" rx="2.5" fill="#080c12"/>
    <circle cx="280" cy="113" r="34" fill="#398fff" fill-opacity=".08" stroke="#398fff" stroke-opacity=".35"/>
    <path d="m273 99 21 14-21 14z" fill="#adceff"/>
    <path d="M251 171h58m-58 9h39" stroke="#9eb6d5" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/>
    <rect x="250" y="197" width="60" height="14" rx="7" fill="#398fff" fill-opacity=".24"/>
    <path d="M269 228h22" stroke="#68819e" stroke-width="3" stroke-linecap="round"/>
    <g class="service-talent-satellites" fill="#0d1520" stroke="#38526f">
      <rect x="102" y="60" width="62" height="60" rx="14"/><rect x="396" y="60" width="62" height="60" rx="14"/>
      <rect x="104" y="175" width="62" height="60" rx="14"/><rect x="394" y="175" width="62" height="60" rx="14"/>
    </g>
    <g stroke="#9fc4f5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="133" cy="83" r="7"/><path d="M120 105v-3a13 10 0 0 1 26 0v3"/>
      <path d="M413 78h28v18h-16l-7 6v-6h-5z"/>
      <path d="m123 203 8 8 16-17"/><circle cx="135" cy="205" r="18" stroke-opacity=".25"/>
      <path d="m425 215-12-12a8 8 0 0 1 12-10 8 8 0 0 1 12 10z"/>
    </g>
    <path d="M44 34h18M44 34v18m472-18h-18m18 0v18" stroke="#ffffff" stroke-opacity=".18"/>
  </svg>`
};

export const servicesExtension = `
<div class="niion-services-extension">
  <section class="service-acquisition" aria-labelledby="service-lead-title">
    ${title('01', 'Lead Generation That Converts', 'service-lead-title')}
    <div class="service-acquisition-grid">
      <article class="service-lead-panel service-reveal">
        <div class="service-panel-top">${icon('lead')}<p class="service-eyebrow">B2B | B2C | Offline Campaign Leads</p></div>
        <p class="service-intro">We generate verified, high-quality leads through strategically designed funnels that combine paid advertising, optimized landing pages, and offline smart ping activations.</p>
        <div class="service-route" aria-hidden="true"><span></span><i></i><span></span><i></i><span></span></div>
        <h4>Our Process:</h4>
        ${list(['Multi-channel paid funnel architecture', 'High-conversion landing page design', 'Lead verification and qualification systems', 'Offline smart ping activations for local reach', 'Real-time lead delivery and tracking'])}
        <p class="service-panel-note">Every lead is qualified, verified, and ready for your sales team to convert.</p>
      </article>
      <article class="service-messaging-panel service-reveal">
        ${icon('message')}
        <h4>Direct Messaging</h4>
        <p class="service-body">WhatsApp API, SMS, Email Marketing</p>
        <div class="service-message-visual" aria-hidden="true"><div><i></i><i></i></div><div><i></i></div><div><i></i><i></i></div></div>
        ${list(['Automation', 'Drip campaigns', 'Smart segmentation'])}
      </article>
    </div>
  </section>

  <section class="service-studio" aria-labelledby="service-studio-title">
    ${title('02', 'Content, Creative & Video Production', 'service-studio-title')}
    <div class="service-creative-grid">
      ${[
        ['write', 'Content Writing', 'Brand voice-aligned copy for social media, websites, and pitch decks. Clear messaging that converts.'],
        ['design', 'Graphic Design', 'Logos, social creatives, brochures, visiting cards, website UI/UX, pamphlets. Clean, modern visual identity.'],
        ['edit', 'Video Editing', 'Event videos, social reels, corporate testimonials. Fast delivery, high retention visuals.']
      ].map(([symbol, heading, copy]) => `<article class="service-creative-card service-reveal">${icon(symbol)}<h4>${heading}</h4><p>${copy}</p></article>`).join('')}
    </div>
    <div class="service-production-note service-reveal"><div>${icon('film')}<h4>Video Production Excellence</h4></div><p>Our in-house production team delivers studio-grade output at optimized budgets. We've produced ad films, short films, web series, product shoots, and social media content that collectively achieved over 1M+ views. From concept to final cut, we handle everything—scripting, shooting, editing, and distribution strategy.</p></div>
  </section>

  <section class="service-commercial" aria-labelledby="service-commercial-title">
    <div class="service-commercial-top">
      <div>${title('03', 'TV Ads & Commercial Production', 'service-commercial-title')}<p class="service-intro">Transform your brand story into compelling visual narratives that captivate mass audiences and drive measurable results through strategic television advertising and commercial production.</p></div>
      <figure class="service-photo service-reveal"><img src="/images/services/commercial-production.webp" alt="Professional broadcast camera at a production venue" width="1200" height="802" loading="lazy" decoding="async"><div class="service-viewfinder" aria-hidden="true"></div></figure>
    </div>
    <h4 class="service-process-label">Our TV &amp; Commercial Strategy</h4>
    <ol class="service-production-steps">${productionSteps.map(([heading, copy], index) => `<li class="service-reveal"><span aria-hidden="true">0${index + 1}</span><h5>${heading}</h5><p>${copy}</p></li>`).join('')}</ol>
    <p class="service-production-usp">Our USP: High-impact storytelling combined with mass reach capabilities that deliver results across traditional and digital platforms.</p>
  </section>

  <section class="service-partnerships" aria-labelledby="service-partnership-title">
    ${title('04', 'Celebrity & Influencer Marketing', 'service-partnership-title')}
    <div class="service-partnership-layout">
      <article class="service-talent-card service-reveal">
        <div class="service-talent-visual" aria-hidden="true">${partnershipVisuals.celebrity}</div>
        <div class="service-talent-copy"><h4>Celebrity Management</h4>${list(['Celebrity promotions and brand endorsements', 'Brand ambassador programs and long-term partnerships', 'Launch events with star power', 'Strategic celebrity-brand alignment'])}</div>
      </article>
      <article class="service-talent-card service-reveal">
        <div class="service-talent-visual" aria-hidden="true">${partnershipVisuals.influencer}</div>
        <div class="service-talent-copy"><h4>Influencer Campaigns</h4>${list(['Micro and macro influencer identification', 'Campaign strategy and execution', 'Content creation and amplification', 'Performance tracking and ROI measurement'])}</div>
      </article>
    </div>
  </section>

  <section class="service-cinema" aria-labelledby="service-cinema-title">
    ${title('05', 'Movie In-Film Branding', 'service-cinema-title')}
    <div class="service-filmstrip">
      ${[
        ['Product Placement', 'Strategic integration of your products into film scenes for organic brand visibility and audience connection.'],
        ['Scene Integration', 'Seamless incorporation of your brand into storylines and key moments that enhance narrative while building brand recall.'],
        ['Title Sponsor Tie-ins', 'High-visibility sponsorship opportunities that position your brand alongside major film releases and entertainment properties.']
      ].map(([heading, copy], index) => `<article class="service-film-frame service-reveal"><span class="service-frame-mark" aria-hidden="true">0${index + 1}</span><h4>${heading}</h4><p>${copy}</p></article>`).join('')}
    </div>
    <p class="service-cinema-copy">Leverage the power of cinema to create lasting brand impressions with millions of moviegoers. Our in-film branding solutions offer unparalleled reach and emotional connection through the magic of storytelling on the big screen.</p>
  </section>

  <section class="service-events" aria-labelledby="service-events-title">
    <div>${title('06', 'Event Production', 'service-events-title')}<p class="service-body">We've successfully executed over 100 events, from intimate private functions to large-scale corporate productions. Our end-to-end event management covers:</p><a class="service-text-link" href="/#events">Explore events ${arrow}</a></div>
    <div class="service-event-range service-reveal">${list(['Corporate events and conferences', 'Concerts and award shows', 'Private functions and celebrations', 'Wedding and birthday events', 'Product launches and brand activations'])}<p class="service-panel-note">Every event is meticulously planned, flawlessly executed, and memorable for all the right reasons.</p></div>
  </section>
  <div class="service-extension-contact service-reveal"><p>Let's craft your brand story together and turn marketing investment into business growth.</p><a href="/#contact">Get Started Today ${arrow}</a></div>
</div>`;

export function createServicesRef() {
  let dispose;
  return root => {
    dispose?.();
    dispose = undefined;
    if (!root || !('IntersectionObserver' in window)) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets = [...root.querySelectorAll('.service-reveal, .service-word-heading')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('service-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    if (!motion.matches) {
      targets.forEach((target, index) => {
        target.classList.add('service-motion-ready');
        target.style.setProperty('--service-delay', `${index % 3 * 70}ms`);
        observer.observe(target);
      });
    }
    const revealAll = () => {
      if (motion.matches) {
        targets.forEach(target => target.classList.add('service-visible'));
        observer.disconnect();
      }
    };
    motion.addEventListener('change', revealAll);
    dispose = () => {
      observer.disconnect();
      motion.removeEventListener('change', revealAll);
      targets.forEach(target => {
        target.classList.remove('service-motion-ready', 'service-visible');
        target.style.removeProperty('--service-delay');
      });
    };
  };
}

export const renderServicesExtension = jsx => jsx('div', {
  className: 'niion-services-additions',
  ref: createServicesRef(),
  dangerouslySetInnerHTML: { __html: servicesExtension }
}, 'services-specialties');
