export const clientLogos = [
  [
    "creative ads.png",
    "Creative Ads"
  ],
  [
    "ecovistaa_logo_main.png",
    "EcoVistaa"
  ],
  [
    "gv cars.png",
    "GV Cars"
  ],
  [
    "kr-infra.png",
    "KR Infra"
  ],
  [
    "IMG_5258.jpeg",
    "Jira"
  ],
  [
    "IMG_5259.jpeg",
    "Imidaxil"
  ],
  [
    "IMG_5260.jpeg",
    "Dental care client"
  ],
  [
    "IMG_5261.jpeg",
    "Enpro Water Systems"
  ],
  [
    "IMG_5262.jpeg",
    "Tejomaya Solutions"
  ],
  [
    "IMG_5263.jpeg",
    "Dr. Nila Nethralaya"
  ],
  [
    "IMG_5264.jpeg",
    "Spall Ball"
  ],
  [
    "IMG_5265.png",
    "Tech Pumps"
  ],
  [
    "IMG_5267.jpeg",
    "Mayuri Prime Homes"
  ],
  [
    "IMG_5268.jpeg",
    "SPR's The Ranch"
  ],
  [
    "IMG_5273.jpeg",
    "Falcon Mobility"
  ],
  [
    "IMG_5274.jpeg",
    "NH Pickleball"
  ],
  [
    "IMG_5275.jpeg",
    "Just for a Day"
  ],
  [
    "insta solar.png",
    "Insta Solar"
  ],
  [
    "Logo@4x-8.png",
    "Client brand"
  ],
  [
    "ultrajet-logo.png",
    "Ultra-Jet"
  ],
  [
    "WhatsApp Image 2026-09-03 at 1.41.14 PM.jpg.jpeg",
    "Compass School for Exam"
  ],
  [
    "WhatsApp Image 2026-09-03 at 1.41.15 PM (1).jpg.jpeg",
    "Dr. Nila Nethralaya eye care"
  ],
  [
    "WhatsApp Image 2026-09-03 at 1.41.15 PM.jpg.jpeg",
    "Innovative and Innovators"
  ]
];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
export const clientItems = clientLogos.map(([file, name]) => `<li style="width:140px;height:90px"><div class="niion-client-logo"><img src="/images/logos/${encodeURIComponent(file)}" alt="${escape(name)}" width="140" height="90" decoding="async"></div></li>`).join('');
export function renderClientSlots(jsx) {
  return clientLogos.map(([file, name]) => jsx('div', {
    className: 'niion-client-logo', style: { width: 140, height: 90, flexShrink: 0 },
    children: jsx('img', { src: '/images/logos/' + encodeURIComponent(file), alt: name, width: 140, height: 90, decoding: 'async' }),
  }, file));
}
