// The exported Framer background is decorative: failed GPU initialization
// should show its colors without crashing the surrounding component.
export function mountShader(canvas, createRenderer, uniforms = {}) {
  const color = (value, fallback) => Array.isArray(value) && value.length >= 3
    ? `rgba(${value.slice(0, 3).map(channel => Math.round(Math.max(0, Math.min(1, channel)) * 255)).join(',')},${value[3] ?? 1})`
    : fallback;
  const fallback = () => {
    canvas.dataset.shaderReady = 'true';
    canvas.dataset.shaderFallback = 'true';
    canvas.style.background = `linear-gradient(135deg, ${color(uniforms.u_color1, '#151326')}, ${color(uniforms.u_color2, '#029aff')}, ${color(uniforms.u_color3, '#000')})`;
  };
  try {
    const renderer = createRenderer();
    // Keep the existing shader, resolution, uniforms and speed. Only stop GPU
    // frames while the canvas cannot be seen; resume before it enters view.
    const setSpeed = renderer.setSpeed.bind(renderer);
    const dispose = renderer.dispose.bind(renderer);
    let speed = renderer.speed ?? 1;
    const bounds = canvas.getBoundingClientRect();
    let visible = bounds.width > 0 && bounds.height > 0 && bounds.bottom > -200 && bounds.top < innerHeight + 200;
    const sync = () => setSpeed(visible && !document.hidden ? speed : 0);
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting && entries[0].boundingClientRect.width > 0 && entries[0].boundingClientRect.height > 0;
      sync();
    }, { rootMargin: '200px' });
    if (observer) observer.observe(canvas); else visible = true;
    document.addEventListener('visibilitychange', sync);
    renderer.setSpeed = value => { speed = value; sync(); };
    renderer.dispose = () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      dispose();
    };
    sync();
    delete canvas.dataset.shaderFallback;
    canvas.style.background = '';
    // Allow the renderer's initial GPU work to reach a painted frame.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      canvas.dataset.shaderReady = 'true';
    }));
    return renderer;
  } catch {
    fallback();
    return {
      setUniforms(value) { uniforms = value; fallback(); },
      setSpeed() {},
      setSeed() {},
      dispose() {},
    };
  }
}
