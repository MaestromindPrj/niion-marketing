// The same markup is used by the static export and the Framer client renderer.
export const reels = [
  { file: 'Copy Of Avs Reel 3 Thriyambika Mam.mp4', label: 'AVS reel 3', width: 270, height: 480, poster: 'avs-3' },
  { file: 'testt.mp4', label: 'Niion creative reel', width: 853, height: 480, poster: 'niion' },
  { file: 'Techpump.mp4', label: 'Techpump reel', width: 270, height: 480, poster: 'techpump' },
  { file: 'Copy Of Tejomaya Solution Reel 1.mp4', label: 'Tejomaya Solution reel 1', width: 253, height: 480, poster: 'tejomaya-1' },
  { file: 'Copy Of Dr Reel 2.mp4', label: 'Dr reel 2', width: 302, height: 480, poster: 'dr-2' },
  { file: 'Copy Of Ps Reel 1.mp4', label: 'PS reel 1', width: 270, height: 480, poster: 'ps-1' },
  { file: 'Copy Of Avs Reel 6 Thriyambika   (2).mp4', label: 'AVS reel 6', width: 270, height: 480, poster: 'avs-6' },
  { file: 'Copy Of Kids Output.mp4', label: 'Kids output reel', width: 270, height: 480, poster: 'kids-output' },
  { file: 'Copy Of Dr Reel 3.mp4', label: 'Dr reel 3', width: 300, height: 480, poster: 'dr-3' },
  { file: 'Copy Of Tejomaya Solution Reel 5.mp4', label: 'Tejomaya Solution reel 5', width: 253, height: 480, poster: 'tejomaya-5' },
  { file: 'Copy Of Ps Reel 8.mp4', label: 'PS reel 8', width: 270, height: 480, poster: 'ps-8' },
  { file: 'Copy Of Avs Reel 16 Mr. Hmachan....mp4', label: 'AVS reel 16', width: 270, height: 480, poster: 'avs-16' },
  { file: 'Copy Of Dr Reel 6 If You Have Diabete.mp4', label: 'Dr reel 6', width: 270, height: 480, poster: 'dr-6' },
  { file: 'Copy Of Tejomaya Solution Reel 7.mp4', label: 'Tejomaya Solution reel 7', width: 253, height: 480, poster: 'tejomaya-7' },
  { file: 'Copy Of Dr Reel 11 Headaches, Blurred Vision And Eye Redness.mp4', label: 'Dr reel 11', width: 294, height: 480, poster: 'dr-11' },
];

const INITIAL_CENTER_INDEX = 2;
const STEP_INTERVAL_MS = 2600;

function getSlotOffset(index, centerIndex, total) {
  return ((index - centerIndex) % total + total) % total;
}

function getSlotPosition(index, centerIndex, total) {
  const offset = getSlotOffset(index, centerIndex, total);
  if (offset === 0) return '0';
  if (offset === 1) return '1';
  if (offset === 2) return '2';
  if (offset === total - 1) return '-1';
  if (offset === total - 2) return '-2';
  if (offset === total - 3) return '-3';
  return 'queue';
}

export const boldReelCardHtml = `<div class="niion-bold-reel-container">
  <h2 class="niion-reel-heading" id="niion-reel-title"><span>Let\u2019s Craft</span> <span>Something <span class="niion-reel-heading-accent">Bold.</span></span></h2>
  <div class="niion-bold-reel-grid" aria-label="Niion motion reels">
    ${reels.map((reel, index) => {
      const pos = getSlotPosition(index, INITIAL_CENTER_INDEX, reels.length);
      const isVisible = ['-2', '-1', '0', '1', '2'].includes(pos);
      return `<div class="niion-reel-slot" data-reel-index="${index}" data-reel-pos="${pos}"${isVisible ? '' : ' aria-hidden="true"'}>
      <div class="niion-bold-reel-card" data-niion-reel style="--reel-delay:-${(index % 5) * 1.4}s">
        <video data-src="/reels/${encodeURIComponent(reel.file)}" poster="/reels/posters/${reel.poster}.jpg" width="${reel.width}" height="${reel.height}" loop muted playsinline preload="none" disablepictureinpicture tabindex="${isVisible ? '0' : '-1'}" role="button" aria-label="Play ${reel.label}" data-label="${reel.label}"></video>
      </div>
    </div>`;
    }).join('')}
  </div>
</div>`;

export const boldReelSectionHtml = `<section class="framer-452uln niion-bold-reel-section" id="reels" aria-labelledby="niion-reel-title">${boldReelCardHtml}</section>`;

export function createBoldReelRef() {
  let dispose;
  return root => {
    dispose?.();
    dispose = undefined;
    if (!root || typeof window === 'undefined') return;

    const grid = root.querySelector('.niion-bold-reel-grid');
    const slots = [...root.querySelectorAll('.niion-reel-slot')];
    const videos = [...root.querySelectorAll('video')];
    const visibleSlots = new Set(['-2', '-1', '0', '1', '2']);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pausedByUser = new Set();

    let centerIndex = INITIAL_CENTER_INDEX;
    let gridVisible = false;
    let stepTimer = null;

    const load = video => {
      if (video && !video.getAttribute('src')) {
        video.muted = true;
        video.defaultMuted = true;
        video.src = video.dataset.src;
        video.load();
      }
    };

    const isSlotInWindow = el => visibleSlots.has(el.closest('.niion-reel-slot')?.dataset.reelPos);

    const preloadUpcoming = () => {
      if (reducedMotion.matches) return;
      for (const slot of slots) {
        const offset = getSlotOffset(Number(slot.dataset.reelIndex), centerIndex, slots.length);
        // Load only the 5 visible cards plus the next 2 entering from the right.
        if (offset <= 4 || offset >= slots.length - 2) {
          load(slot.querySelector('video'));
        }
      }
    };

    const syncVideo = video => {
      const inWindow = isSlotInWindow(video);
      const shouldPlay = inWindow && gridVisible && !document.hidden && !reducedMotion.matches && !pausedByUser.has(video);
      video.closest('[data-niion-reel]')?.classList.toggle('is-playing', shouldPlay);
      if (shouldPlay) {
        load(video);
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const applyPositions = () => {
      for (const slot of slots) {
        const index = Number(slot.dataset.reelIndex);
        const pos = getSlotPosition(index, centerIndex, slots.length);
        const inWindow = visibleSlots.has(pos);
        slot.dataset.reelPos = pos;
        if (inWindow) slot.removeAttribute('aria-hidden');
        else slot.setAttribute('aria-hidden', 'true');
        const video = slot.querySelector('video');
        if (video) video.tabIndex = inWindow ? 0 : -1;
      }
      if (gridVisible) preloadUpcoming();
      videos.forEach(syncVideo);
    };

    const stopTimer = () => {
      if (stepTimer !== null) {
        window.clearInterval(stepTimer);
        stepTimer = null;
      }
    };

    const syncTimer = () => {
      const shouldRun = gridVisible && !document.hidden && !reducedMotion.matches && pausedByUser.size === 0;
      if (shouldRun && stepTimer === null) {
        stepTimer = window.setInterval(() => {
          centerIndex = (centerIndex + 1) % slots.length;
          applyPositions();
        }, STEP_INTERVAL_MS);
      } else if (!shouldRun) {
        stopTimer();
      }
    };

    const syncAll = () => {
      if (gridVisible) preloadUpcoming();
      videos.forEach(syncVideo);
      syncTimer();
    };

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
      } else {
        pausedByUser.add(video);
        video.pause();
      }
      syncTimer();
    };

    const preloadObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        preloadUpcoming();
        preloadObserver.unobserve(entry.target);
      }
    }, { rootMargin: '200px' }) : null;

    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      for (const entry of entries) {
        gridVisible = entry.isIntersecting;
        syncAll();
      }
    }, { threshold: 0.15 }) : null;

    if (grid) {
      if (observer) {
        observer.observe(grid);
        preloadObserver?.observe(grid);
      } else {
        gridVisible = true;
        syncAll();
      }
    }

    for (const video of videos) {
      video.addEventListener('click', toggle);
      video.addEventListener('keydown', toggle);
      video.addEventListener('play', updateLabel);
      video.addEventListener('pause', updateLabel);
    }

    document.addEventListener('visibilitychange', syncAll);
    reducedMotion.addEventListener('change', syncAll);

    dispose = () => {
      stopTimer();
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
export function renderBoldReelSection(jsx) {
  if (!stableRef) stableRef = createBoldReelRef();
  return jsx('section', {
    className: 'framer-452uln niion-bold-reel-section',
    id: 'reels',
    'aria-labelledby': 'niion-reel-title',
    ref: stableRef,
    dangerouslySetInnerHTML: { __html: boldReelCardHtml }
  }, 'bold-reel-card');
}
