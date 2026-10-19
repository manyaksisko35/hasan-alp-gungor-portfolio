import type { Localized } from '@/lib/i18n';

const GH = 'https://github.com/manyaksisko35';

export const LINKS = {
  github: GH,
  youtube: 'https://www.youtube.com/@hasanalpgungor',
  itch: 'https://hasan-alp-gungor.itch.io/',
  linkedin: 'https://www.linkedin.com/in/hasan-alp-g%C3%BCng%C3%B6r-b1085131a/',
};

export interface Concept {
  name: string;
  href: string;
  repo: string;
  img: string;
  shot?: boolean;
  glow: string;
  text: Localized;
  stack: string[];
}

export const CONCEPTS: Concept[] = [
  {
    name: 'Galaxy S26 Ultra',
    href: 'https://s26-ultra-concept.vercel.app',
    repo: `${GH}/s26-ultra-concept`,
    img: '/projects/s26-ultra.jpg',
    shot: true,
    glow: 'radial-gradient(60% 60% at 50% 50%, rgba(103, 232, 249, 0.22), transparent 72%)',
    text: {
      tr: 'Scroll\'ladıkça dönen ve parçalarına ayrılan gerçek zamanlı 3D telefon. S Pen yuvasından çıkıyor, S25 Ultra ile yan yana karşılaştırma, AR ile odana koy.',
      en: 'A real-time 3D phone that turns and comes apart as you scroll. The S Pen slides out, a side-by-side with the S25 Ultra, and AR puts it in your room.',
    },
    stack: ['Next.js', 'React Three Fiber', 'GSAP', 'AR'],
  },
  {
    name: 'Galaxy Buds4 Pro',
    href: 'https://buds4-pro-concept.vercel.app',
    repo: `${GH}/buds4-pro-concept`,
    img: '/projects/buds4-pro-product.webp',
    glow: 'radial-gradient(55% 60% at 50% 55%, rgba(210, 222, 240, 0.2), transparent 72%)',
    text: {
      tr: 'Gürültü engellemeyi gerçekten duyuyorsun: şehir sesi ve müzik Web Audio ile canlı sentezleniyor. HRTF ile 360 ses.',
      en: 'Noise cancelling you can actually hear: the city and the music are synthesized live with Web Audio. HRTF 360 Audio.',
    },
    stack: ['Next.js', 'Three.js', 'Web Audio'],
  },
  {
    name: 'Galaxy Watch Ultra2',
    href: 'https://watch-ultra2-concept.vercel.app',
    repo: `${GH}/watch-ultra2-concept`,
    img: '/projects/watch-ultra2-product.webp',
    glow: 'radial-gradient(55% 60% at 50% 55%, rgba(164, 185, 140, 0.26), transparent 72%)',
    text: {
      tr: 'Saatin tamamı kodla modellendi, tek bir 3D dosya yok. Quick Button ile antrenman, L1 ve L5 GPS farkı şehir simülasyonunda.',
      en: 'The whole watch is modeled in code, not a single 3D file. Quick Button workouts and L1 vs L5 GPS in a city simulation.',
    },
    stack: ['Next.js', 'Three.js', 'GSAP'],
  },
  {
    name: 'Galaxy Ring',
    href: 'https://galaxy-ring-concept.vercel.app',
    repo: `${GH}/galaxy-ring-concept`,
    img: '/projects/galaxy-ring-product.webp',
    glow: 'radial-gradient(55% 60% at 50% 55%, rgba(217, 178, 106, 0.24), transparent 72%)',
    text: {
      tr: 'Prosedürel üretilen titanyum yüzük ve şeffaf şarj kutusu. Uyku grafiği, Energy Score ve çift çimdikleme demoları.',
      en: 'A procedurally generated titanium ring and its clear charging case. Sleep charts, Energy Score and double pinch demos.',
    },
    stack: ['Next.js', 'Three.js', 'GSAP'],
  },
];

export interface Project {
  name: string;
  href: string;
  tag: Localized;
  text: Localized;
  stack: string[];
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    name: 'CS2 Major HUD',
    href: `${GH}/CounterStrike2MajorHUD`,
    tag: { tr: 'Oyun · Yayın', en: 'Games · Broadcast' },
    text: {
      tr: 'Valve\'ın Game State Integration\'ı ile saniyede ~10 kez veri alan Major tarzı yayın arayüzü. Canlı HP, para, killfeed, bomba sayacı.',
      en: 'A Major-style broadcast overlay fed by Valve\'s Game State Integration about 10 times a second. Live HP, money, killfeed, bomb timer.',
    },
    stack: ['Python', 'JavaScript', 'HTML', 'CSS'],
    accent: '#fb923c',
  },
  {
    name: 'Goal Detector System',
    href: `${GH}/GoalDetectorSystem`,
    tag: { tr: 'Donanım', en: 'Hardware' },
    text: {
      tr: 'Arduino Uno ve Python ile gol algılama sistemi. Yeğenim için yaptım, kendisi bayıldı.',
      en: 'A goal detection system built with an Arduino Uno and Python. Made it for my nephew, and he loved it.',
    },
    stack: ['Arduino', 'Python'],
    accent: '#34d399',
  },
  {
    name: 'Öğrenci Not Sistemi',
    href: `${GH}/database_ile_ogrenci_durumu`,
    tag: { tr: 'Backend', en: 'Backend' },
    text: {
      tr: 'Vize ve final ağırlığına göre geçti/kaldı hesaplayan PHP sistemi. Biri veritabanıyla, biri kurulumsuz JSON ile iki sürüm.',
      en: 'A PHP system that works out pass or fail from midterm and final weights. Two versions: one with a database, one with zero-setup JSON.',
    },
    stack: ['PHP', 'SQL', 'JSON'],
    accent: '#a78bfa',
  },
  {
    name: 'PcProgramKurucu',
    href: `${GH}/PcProgramKurucu`,
    tag: { tr: 'Araç', en: 'Tool' },
    text: {
      tr: 'Bilgisayara program kurmak için yazdığım Batch aracı. Temiz kurulumdan sonra hayat kurtarır. MIT lisanslı.',
      en: 'A Batch tool I wrote to install programs on a PC. A lifesaver after a clean install. MIT licensed.',
    },
    stack: ['Batch', 'Windows'],
    accent: '#67e8f9',
  },
];

/** Repos without a public description: listed by name only. */
export const MORE_REPOS = [
  { name: 'SkinVault', lang: 'C#', href: `${GH}/SkinVault` },
  { name: 'LocaGenFree', lang: 'Python', href: `${GH}/LocaGenFree` },
  { name: 'LocaGenPHP', lang: 'PHP', href: `${GH}/LocaGenPHP` },
  { name: 'json_ile_ogrenci_durumu', lang: 'PHP', href: `${GH}/json_ile_ogrenci_durumu` },
];

/** One skill per controller part; the Skills section and the 3D labels share this list. */
export const PARTS = [
  { id: 'screen', title: 'UI & Motion', text: { tr: 'GSAP, Lenis, Tailwind', en: 'GSAP, Lenis, Tailwind' } },
  { id: 'stickL', title: 'TypeScript', text: { tr: 'React, Next.js', en: 'React, Next.js' } },
  { id: 'stickR', title: 'Three.js', text: { tr: 'React Three Fiber, 3D', en: 'React Three Fiber, 3D' } },
  { id: 'dpad', title: 'Python & C#', text: { tr: 'Araçlar, oyun mantığı', en: 'Tools, game logic' } },
  { id: 'buttons', title: { tr: 'Oyun tasarımı', en: 'Game design' }, text: { tr: 'itch.io\'daki oyunlar', en: 'Games on itch.io' } },
  { id: 'pcb', title: { tr: 'Donanım', en: 'Hardware' }, text: { tr: 'Arduino, sensörler', en: 'Arduino, sensors' } },
  { id: 'back', title: 'PHP & SQL', text: { tr: 'Backend, veritabanı', en: 'Backend, databases' } },
] as const satisfies readonly { id: string; title: string | Localized; text: Localized }[];

export type PartId = (typeof PARTS)[number]['id'];
