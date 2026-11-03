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
