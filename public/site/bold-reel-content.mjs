// The same markup is used by the static export and the Framer client renderer.
export const reels = [
  { file: 'Copy of AVS REEL 3 Thriyambika mam.mp4', label: 'AVS reel 3', width: 270, height: 480, poster: 'avs-3' },
  { file: 'Copy Of Tejomaya Solution Reel 1.mp4', label: 'Tejomaya Solution reel 1', width: 253, height: 480, poster: 'tejomaya-1' },
  { file: 'testt.mp4', label: 'Niion creative reel', width: 853, height: 480, poster: 'niion' },
  { file: 'Copy Of Dr Reel 2.mp4', label: 'Dr reel 2', width: 302, height: 480, poster: 'dr-2' },
  { file: 'Copy Of Ps Reel 1.mp4', label: 'PS reel 1', width: 270, height: 480, poster: 'ps-1' },
  { file: 'Copy Of Avs Reel 6 Thriyambika   (2).mp4', label: 'AVS reel 6', width: 270, height: 480, poster: 'avs-6' },
  { file: 'Copy Of Kids Output.mp4', label: 'Kids output reel', width: 270, height: 480, poster: 'kids-output' },
  { file: 'Copy Of Dr Reel 3.mp4', label: 'Dr reel 3', width: 300, height: 480, poster: 'dr-3' },
  { file: 'Copy Of Tejomaya Solution Reel 5.mp4', label: 'Tejomaya Solution reel 5', width: 253, height: 480, poster: 'tejomaya-5' },
  { file: 'Copy Of Ps Reel 8.mp4', label: 'PS reel 8', width: 270, height: 480, poster: 'ps-8' },
  { file: 'Copy Of Avs Reel 16 Mr. Hmachan....mp4', label: 'AVS reel 16', width: 270, height: 480, poster: 'avs-16' },
  { file: 'Copy Of Dr Reel 6 If You Have Diabete(1).mp4', label: 'Dr reel 6', width: 270, height: 480, poster: 'dr-6' },
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
        <video data-src="/reels/${encodeURIComponent(reel.file)}" poster="/reels/posters/${reel.poster}.jpg" width="${reel.width}" height="${reel.height}" loop muted playsinline preload="none" controlslist="nodownload noplaybackrate" disablepictureinpicture disableremoteplayback tabindex="${isVisible ? '0' : '-1'}" role="button" aria-label="Watch ${reel.label} fullscreen with audio" data-label="${reel.label}"></video>
      </div>
    </div>`;
    }).join('')}
  </div>
</div>`;

export const boldReelSectionHtml = `<section class="framer-452uln niion-bold-reel-section" id="reels" aria-labelledby="niion-reel-title">${boldReelCardHtml}</section>`;

function createFullscreenModal() {
  const modal = document.createElement('div');
  modal.className = 'niion-reel-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Fullscreen reel player');
  modal.hidden = true;
  modal.innerHTML = `
    <div class="niion-reel-modal-stage">
      <video class="niion-reel-modal-video" playsinline loop controls controlslist="nodownload noplaybackrate" disablepictureinpicture disableremoteplayback preload="auto"></video>
    </div>
    <button class="niion-reel-modal-close" type="button" aria-label="Close fullscreen reel">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <button class="niion-reel-modal-nav niion-reel-modal-prev" type="button" aria-label="Previous reel">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
    </button>
    <button class="niion-reel-modal-nav niion-reel-modal-next" type="button" aria-label="Next reel">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  `;
  return modal;
}

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

    let centerIndex = INITIAL_CENTER_INDEX;
    let gridVisible = false;
    let stepTimer = null;
    let modalIndex = -1;
    let lastFocused = null;
    let prevDocOverflow = '';

    // Mount the fullscreen lightbox directly on body so ancestor isolation/overflow never clips it.
    const modal = createFullscreenModal();
    const modalVideo = modal.querySelector('.niion-reel-modal-video');
    const closeBtn = modal.querySelector('.niion-reel-modal-close');
    const prevBtn = modal.querySelector('.niion-reel-modal-prev');
    const nextBtn = modal.querySelector('.niion-reel-modal-next');
    document.body.appendChild(modal);

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
      const isModalOpen = modalIndex >= 0;
      const shouldPlay = !isModalOpen && inWindow && gridVisible && !document.hidden && !reducedMotion.matches;
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
      const shouldRun = modalIndex < 0 && gridVisible && !document.hidden && !reducedMotion.matches;
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

    const playModalReel = index => {
      modalIndex = ((index % reels.length) + reels.length) % reels.length;
      const reel = reels[modalIndex];
      modalVideo.pause();
      modalVideo.src = `/reels/${encodeURIComponent(reel.file)}`;
      modalVideo.poster = `/reels/posters/${reel.poster}.jpg`;
      modalVideo.setAttribute('aria-label', `${reel.label} video with audio`);
      modalVideo.muted = false;
      modalVideo.defaultMuted = false;
      modalVideo.volume = 1;
      modalVideo.currentTime = 0;
      modalVideo.load();
      // Start playback with audio synchronously within the user gesture; fall back to muted only if blocked.
      const playPromise = modalVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          modalVideo.muted = true;
          modalVideo.play().catch(() => {});
        });
      }
    };

    const openModal = (index, trigger) => {
      const wasOpen = modalIndex >= 0;
      if (!wasOpen) {
        lastFocused = trigger || document.activeElement;
        prevDocOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
      }
      modal.hidden = false;
      playModalReel(index);
      syncAll();
      requestAnimationFrame(() => modal.classList.add('is-open'));
      closeBtn.focus({ preventScroll: true });
    };

    const closeModal = () => {
      if (modalIndex < 0) return;
      modalIndex = -1;
      modal.classList.remove('is-open');
      modal.hidden = true;
      modalVideo.pause();
      modalVideo.removeAttribute('src');
      modalVideo.load();
      document.documentElement.style.overflow = prevDocOverflow;
      syncAll();
      if (lastFocused && typeof lastFocused.focus === 'function' && lastFocused.tabIndex >= 0) {
        lastFocused.focus({ preventScroll: true });
      }
      lastFocused = null;
    };

    const onCardActivate = event => {
      if (event.type === 'keydown' && !['Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      const video = event.currentTarget;
      const slot = video.closest('.niion-reel-slot');
      const index = Number(slot?.dataset.reelIndex ?? 0);
      openModal(index, video);
    };

    const onModalClick = event => {
      if (event.target === modal || event.target.classList.contains('niion-reel-modal-stage')) {
        closeModal();
      }
    };

    const onPrev = () => { if (modalIndex >= 0) playModalReel(modalIndex - 1); };
    const onNext = () => { if (modalIndex >= 0) playModalReel(modalIndex + 1); };
    const preventContextMenu = event => event.preventDefault();

    const onKeyDown = event => {
      if (modalIndex < 0) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      }
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
      video.addEventListener('click', onCardActivate);
      video.addEventListener('keydown', onCardActivate);
      video.addEventListener('contextmenu', preventContextMenu);
    }

    modal.addEventListener('click', onModalClick);
    modalVideo.addEventListener('contextmenu', preventContextMenu);
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', onPrev);
    nextBtn.addEventListener('click', onNext);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('visibilitychange', syncAll);
    reducedMotion.addEventListener('change', syncAll);

    dispose = () => {
      closeModal();
      stopTimer();
      observer?.disconnect();
      preloadObserver?.disconnect();
      modal.removeEventListener('click', onModalClick);
      modalVideo.removeEventListener('contextmenu', preventContextMenu);
      closeBtn.removeEventListener('click', closeModal);
      prevBtn.removeEventListener('click', onPrev);
      nextBtn.removeEventListener('click', onNext);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('visibilitychange', syncAll);
      reducedMotion.removeEventListener('change', syncAll);
      for (const video of videos) {
        video.pause();
        video.removeEventListener('click', onCardActivate);
        video.removeEventListener('keydown', onCardActivate);
        video.removeEventListener('contextmenu', preventContextMenu);
      }
      modal.remove();
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
