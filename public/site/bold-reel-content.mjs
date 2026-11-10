// Shared markup keeps the static export and the preserved React renderer identical.
export const reels = [
  { file: 'testt.mp4', label: 'Niion creative reel', shape: 'landscape', width: 854, height: 480, poster: 'niion' },
  { file: 'Spall Ball.mp4', label: 'Spall Ball reel', shape: 'landscape', width: 854, height: 480, poster: 'spall-ball' },
  { file: 'Techpump.mp4', label: 'Techpump reel', shape: 'portrait', width: 270, height: 480, poster: 'techpump' },
];

export const boldReelCardHtml = `<div class="niion-bold-reel-grid">${reels.map((reel, index) => `
  <div class="niion-bold-reel-card niion-bold-reel-card--${reel.shape}" data-niion-reel style="--reel-delay:${index * 120}ms">
    <video data-src="/reels/${encodeURIComponent(reel.file)}" poster="/reels/posters/${reel.poster}.jpg" width="${reel.width}" height="${reel.height}" loop muted playsinline preload="none" disablepictureinpicture tabindex="0" role="button" aria-label="Play ${reel.label}" data-label="${reel.label}"></video>
  </div>`).join('')}</div>`;

export function createBoldReelRef() {
  let dispose;
  return root => {
    dispose?.();
    dispose = undefined;
    if (!root || typeof window === 'undefined') return;
    const videos = [...root.querySelectorAll('video')];
    const visible = new Set();
    const pausedByUser = new Set();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const load = video => {
      if (!video.getAttribute('src')) {
        video.muted = true;
        video.defaultMuted = true;
        video.src = video.dataset.src;
        video.load();
      }
    };
    const sync = video => {
      const shouldPlay = visible.has(video) && !document.hidden && !reducedMotion.matches && !pausedByUser.has(video);
      video.closest('[data-niion-reel]').classList.toggle('is-playing', shouldPlay);
      if (shouldPlay) { load(video); video.play().catch(() => {}); }
      else video.pause();
    };
    const syncAll = () => videos.forEach(sync);
    const updateLabel = event => {
      const video = event.currentTarget;
      video.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} ${video.dataset.label}`);
    };
    const toggle = event => {
      if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      const video = event.currentTarget;
      if (video.paused) {
        pausedByUser.delete(video);
        load(video);
        video.play().catch(() => {});
      } else { pausedByUser.add(video); video.pause(); }
    };
    const preloadObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        if (!reducedMotion.matches) load(entry.target);
        preloadObserver.unobserve(entry.target);
      }
    }, { rootMargin: '200px' }) : null;
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      for (const entry of entries) {
        const video = entry.target;
        if (entry.isIntersecting) visible.add(video); else visible.delete(video);
        sync(video);
      }
    }, { threshold: 0.15 }) : null;
    for (const video of videos) {
      video.addEventListener('click', toggle);
      video.addEventListener('keydown', toggle);
      video.addEventListener('play', updateLabel);
      video.addEventListener('pause', updateLabel);
      if (observer) { observer.observe(video); preloadObserver.observe(video); }
      else { visible.add(video); sync(video); }
    }
    document.addEventListener('visibilitychange', syncAll);
    reducedMotion.addEventListener('change', syncAll);
    dispose = () => {
      observer?.disconnect();
      preloadObserver?.disconnect();
      document.removeEventListener('visibilitychange', syncAll);
      reducedMotion.removeEventListener('change', syncAll);
      for (const video of videos) {
        video.pause();
        video.removeEventListener('click', toggle);
        video.removeEventListener('keydown', toggle);
        video.removeEventListener('play', updateLabel);
        video.removeEventListener('pause', updateLabel);
      }
    };
  };
}

let stableRef;
export function renderBoldReelCard(jsx) {
  if (!stableRef) stableRef = createBoldReelRef();
  return jsx('div', {
    className: 'niion-bold-reel-container',
    ref: stableRef,
    dangerouslySetInnerHTML: { __html: boldReelCardHtml }
  }, 'bold-reel-card');
}
