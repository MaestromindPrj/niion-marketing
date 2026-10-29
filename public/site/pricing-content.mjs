// Shared by the static export and the preserved renderer.
export const pricingContent = [
  '<div class="niion-pricing-content">',
  '<p class="niion-pricing-label">Pricing</p>',
  '<article class="niion-pricing-card">',
  '<p class="niion-pricing-eyebrow">Built around your business</p>',
  '<h2 id="custom-plan-title">Contact us for a <span>customized plan</span> for your business</h2>',
  '<p class="niion-pricing-description">Tell us about your goals. We\'ll tailor the right mix of services to your business, budget, and next stage of growth.</p>',
  '<a class="niion-pricing-cta" href="/#contact">Contact us <span aria-hidden="true">&nearr;</span></a>',
  '</article>',
  '</div>',
].join('');

// Keep the callback stable across the preserved renderer's responsive updates.
const pricingRefs = new WeakMap();

function createPricingRef(anchorRef) {
  let dispose;
  return root => {
    dispose?.();
    dispose = undefined;
    anchorRef.current = root;
    if (!root || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const updateMotion = () => {
      const active = visible && !motion.matches && !document.hidden;
      root.classList.toggle('pricing-in-view', active);
      if (motion.matches) root.classList.remove('pricing-revealed');
      else if (active) root.classList.add('pricing-revealed');
    };
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      updateMotion();
    }, { threshold: 0.12 });

    observer.observe(root);
    motion.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateMotion);
    dispose = () => {
      observer.disconnect();
      motion.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateMotion);
      root.classList.remove('pricing-in-view', 'pricing-revealed');
    };
  };
}

export function renderPricingSection(jsx, id, anchorRef) {
  if (!pricingRefs.has(anchorRef)) pricingRefs.set(anchorRef, createPricingRef(anchorRef));
  return jsx('section', {
    className: 'framer-qvzv51',
    'data-framer-name': 'price plans',
    id,
    ref: pricingRefs.get(anchorRef),
    'aria-labelledby': 'custom-plan-title',
    dangerouslySetInnerHTML: { __html: pricingContent },
  });
}
