// The preserved Framer router only knows the original home page. Route links
// here so native touch clicks, keyboard activation and cross-page anchors agree.
export function resolveNavigation(anchor, location, document) {
  const href = anchor.getAttribute('href');
  if (!href || anchor.hasAttribute('download')) return null;
  let url = new URL(href.startsWith('index.html') ? '/' + href.slice(10) : href, location.href);
  if (url.origin !== location.origin) return null;
  if (anchor.closest('.framer-evR0X')) {
    const label = anchor.textContent.trim();
    const destinations = [['Growth', '/#about'], ['Our Services', '/services/'], ['Events', '/#events'], ['Projects', '/#projects'], ['Pricing', '/#price-plan'], ['Contact', '/#contact']];
    const match = destinations.find(([name]) => label.startsWith(name));
    if (match) url = new URL(match[1], location.href);
  }
  if (!['/', '/services', '/services/', '/index.html'].includes(url.pathname)) return null;
  if (url.pathname === '/index.html') url.pathname = '/';
  if (url.hash && url.pathname === location.pathname && !document.getElementById(decodeURIComponent(url.hash.slice(1)))) {
    url.pathname = '/';
  }
  return url;
}

export function installNavigation() {
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollTo = (url, behavior = reducedMotion() ? 'instant' : 'smooth') => {
    const id = decodeURIComponent(url.hash.slice(1));
    const section = id ? document.getElementById(id) : null;
    if (section) section.scrollIntoView({ behavior, block: 'start' });
    else if (!id) window.scrollTo({ top: 0, behavior });
  };
  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : event.target?.parentElement;
    const anchor = target?.closest('a');
    if (!anchor) return;
    const url = resolveNavigation(anchor, window.location, document);
    if (!url) return;
    anchor.href = url.href;
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || (anchor.target && anchor.target !== '_self')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const nav = anchor.closest('.framer-evR0X');
    // A click on the drawer itself uses its original close transition. The
    // drawer now closes on click, after link activation, never on pointer-up.
    if (nav && /^(Phone|Tablet) Open$/.test(nav.getAttribute('data-framer-name') || '')) {
      nav.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
    const normalize = pathname => pathname.replace(/\/$/, '') || '/';
    if (normalize(url.pathname) !== normalize(window.location.pathname)) {
      window.location.assign(url.href);
      return;
    }
    if (url.href !== window.location.href) history.pushState(null, '', url.href);
    scrollTo(url);
  }, true);
  window.addEventListener('popstate', () => scrollTo(new URL(window.location.href), 'instant'));
  // Cross-page section links must retain their target after Framer hydration.
  document.addEventListener('framer:pageview', () => {
    if (window.location.hash) requestAnimationFrame(() => requestAnimationFrame(() => scrollTo(new URL(window.location.href), 'instant')));
  });
}
