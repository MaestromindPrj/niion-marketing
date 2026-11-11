import { arrowIcon, renderArrowIcon } from "./arrow-icon.mjs";
import { ue as useEffect, ye as useState } from '../vendor/framerusercontent.com/sites/6yCywluy3f19AABuNXU8BE/react._JDI0EU2.mjs';

export const projects = [
  {
    "title": "Dr. Nila Nethralaya",
    "href": "https://drnilanetralaya.com/",
    "width": 1353,
    "height": 681,
    "src": "/images/projects/project-01.webp"
  },
  {
    "title": "Spall Ball",
    "href": "https://spallball.com/",
    "width": 1365,
    "height": 681,
    "src": "/images/projects/project-02.webp"
  },
  {
    "title": "Falcon Mobility",
    "href": "https://www.falconmobility.co.in/",
    "width": 1350,
    "height": 680,
    "src": "/images/projects/project-03.webp"
  },
  {
    "title": "Six Sigma Mechan",
    "href": "https://sixsigmamechan.com/",
    "width": 1364,
    "height": 681,
    "src": "/images/projects/project-04.webp"
  },
  {
    "title": "Adhilakshmi Ramachandran Arakkattalai",
    "href": "https://www.aadhiraam.org/",
    "width": 1352,
    "height": 680,
    "src": "/images/projects/project-05.webp"
  },
  {
    "title": "Creative Ads",
    "href": "https://creativeads.info/",
    "width": 1351,
    "height": 678,
    "src": "/images/projects/project-06.webp"
  },
  {
    "title": "Tejomaya Solutions LLP",
    "href": "https://tejomayasolutions.com/",
    "width": 1365,
    "height": 684,
    "src": "/images/projects/project-07.webp"
  },
  {
    "title": "Ultrajet",
    "href": "https://www.ultrajet.in/",
    "width": 1351,
    "height": 683,
    "src": "/images/projects/project-08.webp"
  },
  {
    "title": "Inn and Inn",
    "href": "https://www.innandinn.com/",
    "width": 1365,
    "height": 682,
    "src": "/images/projects/project-09.webp"
  },
  {
    "title": "Insta Solar Energy",
    "href": "https://www.instasolarenergy.com/",
    "width": 1366,
    "height": 679,
    "src": "/images/projects/project-10.webp"
  },
  {
    "title": "Tech Pumps",
    "href": "https://www.techpumps.com/",
    "width": 1352,
    "height": 681,
    "src": "/images/projects/project-11.webp"
  }
];

const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const rows = [projects.slice(0, 4), projects.slice(4, 8), projects.slice(8)];
export const projectsContent = `
  <div class="niion-projects-heading"><p class="niion-projects-label">Projects</p><h2 id="niion-projects-title">Explore Our Work</h2></div>
  <div class="niion-projects-grid">${rows.map(row => `<div class="niion-projects-row">${row.map(project => `
    <a class="niion-project-card" href="${escape(project.href)}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${escape(project.title)} website (opens in a new tab)">
      <div class="niion-project-preview"><img src="${project.src}" alt="${escape(project.title)} website screenshot" width="${project.width}" height="${project.height}" loading="lazy" decoding="async"></div>
      <div class="niion-project-caption"><h3>${escape(project.title)}</h3><span aria-hidden="true">${arrowIcon}</span></div>
    </a>`).join('')}</div>`).join('')}</div>`;
export const projectsSection = `<section id="projects" class="niion-projects" aria-labelledby="niion-projects-title">${projectsContent}</section>`;
function ProjectsSection({ jsx, Ticker }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Hydrate the exact exported HTML first. Framer's ticker creates wrappers and
  // repeated slides that must only replace this fallback after hydration commits.
  if (!mounted) {
    return jsx('section', {
      id: 'projects', className: 'niion-projects', 'aria-labelledby': 'niion-projects-title',
      dangerouslySetInnerHTML: { __html: projectsContent },
    });
  }
  return jsx('section', {
    id: 'projects', className: 'niion-projects', 'aria-labelledby': 'niion-projects-title',
    children: [
      jsx('div', { className: 'niion-projects-heading', dangerouslySetInnerHTML: { __html: '<p class="niion-projects-label">Projects</p><h2 id="niion-projects-title">Explore Our Work</h2>' } }),
      jsx('div', { className: 'niion-projects-grid', children: rows.map((row, index) => jsx('div', {
        className: 'niion-projects-row',
        children: jsx(Ticker, {
          alignment: 'center', direction: index === 1 ? 'right' : 'left',
          fadeOptions: { fadeAlpha: 0, fadeContent: true, fadeInset: 0, fadeWidth: 25, overflow: false },
          gap: 24, hoverFactor: 1, speed: 25,
          padding: 0, paddingBottom: 0, paddingLeft: 0, paddingPerSide: false, paddingRight: 0, paddingTop: 0,
          sizingOptions: { heightType: true, widthType: true },
          height: '100%', width: '100%', style: { height: '100%', width: '100%' },
          slots: row.map(project => jsx('a', {
            className: 'niion-project-card', href: project.href, target: '_blank', rel: 'noopener noreferrer',
            'aria-label': 'Visit ' + project.title + ' website (opens in a new tab)',
            children: [
              jsx('div', { className: 'niion-project-preview', children: jsx('img', { src: project.src, alt: project.title + ' website screenshot', width: project.width, height: project.height, loading: 'lazy', decoding: 'async' }) }),
              jsx('div', { className: 'niion-project-caption', children: [jsx('h3', { children: project.title }), jsx('span', { 'aria-hidden': true, children: renderArrowIcon(jsx) })] }),
            ],
          }, project.src)),
        }),
      }, index)) }),
    ],
  });
}

export function renderProjectsSection(jsx, Ticker) {
  return jsx(ProjectsSection, { jsx, Ticker });
}
