// Same vector path as the Event Production "Get Started Today" arrow.
const path = 'M5 19 19 5M5 5h14v14';
export const arrowIcon = `<svg class="niion-arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><path d="${path}"/></svg>`;
export function renderArrowIcon(jsx) {
  return jsx('svg', {
    className: 'niion-arrow-icon', width: 18, height: 18, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: 1.5,
    'aria-hidden': true, focusable: 'false',
    children: jsx('path', { d: path }),
  });
}
