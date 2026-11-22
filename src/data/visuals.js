const PRODUCT_SVGS = {
  'prod-1': (accent) => `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="g-tee" x1="40" y1="30" x2="160" y2="175" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="176" rx="54" ry="8" fill="rgba(15,23,42,0.12)"/>
      <path d="M68 38L32 58L45 92L64 84V166H136V84L155 92L168 58L132 38C124 50 112 55 100 55C88 55 76 50 68 38Z" fill="url(#g-tee)" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M76 40C83 49 91 53 100 53C109 53 117 49 124 40" stroke="rgba(255,255,255,0.45)" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="82" y="76" width="36" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
    </svg>`,
  'prod-2': (accent) => `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="100" cy="178" rx="56" ry="8" fill="rgba(15,23,42,0.12)"/>
      <path d="M72 42C72 28 84 20 100 20C116 20 128 28 128 42L164 62L154 106L136 96V166H64V96L46 106L36 62L72 42Z" fill="${accent}" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M80 42C85 52 92 56 100 56C108 56 115 52 120 42" stroke="rgba(255,255,255,0.5)" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M74 122H126L132 152H68L74 122Z" fill="rgba(0,0,0,0.22)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
      <line x1="93" y1="56" x2="93" y2="82" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="107" y1="56" x2="107" y2="82" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  'prod-3': (accent) => `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="96" cy="168" rx="52" ry="9" fill="rgba(15,23,42,0.12)"/>
      <path d="M132 72H148C160 72 168 81 168 95C168 110 158 122 145 122H132" stroke="${accent}" stroke-width="11" stroke-linecap="round"/>
      <rect x="52" y="54" width="84" height="106" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
      <ellipse cx="94" cy="56" rx="41" ry="9" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2.5"/>
      <ellipse cx="94" cy="56" rx="32" ry="5" fill="${accent}" opacity="0.22"/>
      <rect x="64" y="84" width="60" height="44" rx="8" fill="${accent}" opacity="0.14" stroke="${accent}" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="94" y="110" text-anchor="middle" fill="${accent}" font-family="Inter,sans-serif" font-size="11" font-weight="800">TU LOGO</text>
    </svg>`,
  'prod-4': (accent) => `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="100" cy="156" rx="64" ry="10" fill="rgba(15,23,42,0.12)"/>
      <path d="M44 114C44 74 68 50 100 50C132 50 156 74 156 114H44Z" fill="${accent}" stroke="#0f172a" stroke-width="2.5"/>
      <path d="M68 114C68 78 82 54 100 50C118 54 132 78 132 114H68Z" fill="#ffffff"/>
      <path d="M36 114C64 106 136 106 174 126C150 138 96 142 42 126C36 123 32 116 36 114Z" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
      <circle cx="100" cy="48" r="5" fill="#0f172a"/>
    </svg>`,
  'prod-5': (accent) => `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="100" cy="168" rx="50" ry="8" fill="rgba(15,23,42,0.12)"/>
      <rect x="50" y="66" width="100" height="90" rx="28" fill="#1e293b" stroke="#0f172a" stroke-width="2.5"/>
      <path d="M50 96H150" stroke="rgba(255,255,255,0.22)" stroke-width="2"/>
      <circle cx="100" cy="116" r="4" fill="#4ade80"/>
      <rect x="64" y="34" width="22" height="44" rx="11" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
      <rect x="114" y="34" width="22" height="44" rx="11" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="75" cy="46" r="6" fill="${accent}"/>
      <circle cx="125" cy="46" r="6" fill="${accent}"/>
    </svg>`,
  'prod-6': (accent) => `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="100" cy="168" rx="52" ry="9" fill="rgba(15,23,42,0.12)"/>
      <rect x="54" y="42" width="92" height="116" rx="22" fill="#1e293b" stroke="#0f172a" stroke-width="2.5"/>
      <circle cx="100" cy="108" r="30" fill="#0f172a" stroke="${accent}" stroke-width="5"/>
      <circle cx="100" cy="108" r="14" fill="${accent}" opacity="0.7"/>
      <circle cx="100" cy="64" r="11" fill="#0f172a" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
    </svg>`,
  'prod-7': (accent) => `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="100" cy="174" rx="44" ry="8" fill="rgba(15,23,42,0.12)"/>
      <rect x="74" y="28" width="52" height="22" rx="6" fill="#1e293b"/>
      <rect x="68" y="48" width="64" height="118" rx="12" fill="${accent}" stroke="#0f172a" stroke-width="2.5"/>
      <path d="M132 76H146C152 76 156 80 156 86V128C156 134 152 138 146 138H132" stroke="#1e293b" stroke-width="8" stroke-linecap="round"/>
      <rect x="80" y="70" width="10" height="78" rx="5" fill="rgba(255,255,255,0.22)"/>
    </svg>`,
  'prod-8': (accent) => `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="100" cy="170" rx="58" ry="8" fill="rgba(15,23,42,0.12)"/>
      <rect x="46" y="102" width="50" height="60" rx="8" fill="rgba(255,255,255,0.85)" stroke="#94a3b8" stroke-width="2.5"/>
      <rect x="44" y="94" width="54" height="10" rx="4" fill="${accent}"/>
      <rect x="104" y="72" width="50" height="90" rx="8" fill="rgba(255,255,255,0.9)" stroke="#94a3b8" stroke-width="2.5"/>
      <rect x="102" y="64" width="54" height="10" rx="4" fill="${accent}"/>
    </svg>`,
  'prod-9': (accent) => `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="100" cy="168" rx="52" ry="8" fill="rgba(15,23,42,0.12)"/>
      <rect x="58" y="68" width="44" height="90" rx="10" fill="#fff" stroke="#cbd5e1" stroke-width="2.5"/>
      <rect x="70" y="46" width="20" height="22" rx="4" fill="${accent}"/>
      <rect x="108" y="96" width="38" height="62" rx="10" fill="${accent}" opacity="0.88" stroke="#0f172a" stroke-width="2"/>
      <rect x="116" y="78" width="22" height="18" rx="4" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>
      <path d="M138 42L143 52L153 57L143 62L138 72L133 62L123 57L133 52Z" fill="#f59e0b"/>
    </svg>`,
  'prod-10': (accent) => `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="100" cy="168" rx="58" ry="8" fill="rgba(15,23,42,0.12)"/>
      <rect x="46" y="64" width="108" height="92" rx="14" fill="${accent}" stroke="#0f172a" stroke-width="2.5"/>
      <rect x="58" y="76" width="84" height="68" rx="8" fill="#fef3c7"/>
      <rect x="72" y="90" width="24" height="24" rx="5" fill="#fff" stroke="#0f172a" stroke-width="2"/>
      <circle cx="84" cy="102" r="3" fill="#0f172a"/>
      <rect x="106" y="106" width="24" height="24" rx="5" fill="#fff" stroke="#0f172a" stroke-width="2"/>
      <circle cx="113" cy="113" r="2.5" fill="#0f172a"/>
      <circle cx="123" cy="123" r="2.5" fill="#0f172a"/>
    </svg>`,
  'prod-11': (accent) => `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="100" cy="172" rx="52" ry="8" fill="rgba(15,23,42,0.12)"/>
      <path d="M80 44C80 32 120 32 120 44" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <rect x="54" y="46" width="92" height="118" rx="24" fill="${accent}" stroke="#0f172a" stroke-width="2.5"/>
      <rect x="66" y="102" width="68" height="46" rx="12" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
      <line x1="74" y1="84" x2="126" y2="84" stroke="rgba(255,255,255,0.45)" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  'prod-12': (accent) => `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="100" cy="160" rx="58" ry="8" fill="rgba(15,23,42,0.12)"/>
      <path d="M36 90H164" stroke="#1e293b" stroke-width="10" stroke-linecap="round"/>
      <path d="M54 78H146L136 138H64L54 78Z" fill="${accent}" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
      <line x1="68" y1="96" x2="132" y2="96" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  'prod-13': (accent) => `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="100" cy="176" rx="54" ry="8" fill="rgba(15,23,42,0.12)"/>
      <path d="M68 38L32 58L45 92L64 84V166H136V84L155 92L168 58L132 38C124 50 112 55 100 55C88 55 76 50 68 38Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="76" y="76" width="48" height="48" rx="8" fill="${accent}" opacity="0.16" stroke="${accent}" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="100" y="104" text-anchor="middle" fill="${accent}" font-family="Inter,sans-serif" font-size="10" font-weight="800">TU DISEÑO</text>
    </svg>`
};

export function renderProductVisual(product, className = 'product-svg-art') {
  const accent = product.accent || '#c8102e';
  const renderer = PRODUCT_SVGS[product.id];
  if (renderer) {
    return `<div class="${className}">${renderer(accent)}</div>`;
  }
  return `<span class="product-emoji" role="img" aria-label="${product.title}">${product.emoji || '📦'}</span>`;
}
