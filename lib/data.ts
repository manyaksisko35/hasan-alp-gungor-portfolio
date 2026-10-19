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
      tr: 'Scroll ile yönetilen gerçek zamanlı 3D telefon modeli, S25 Ultra karşılaştırması, renk ve hafıza yapılandırıcısı ve AR görüntüleme.',
      en: 'A scroll-driven real-time 3D phone model, an S25 Ultra comparison, a color and storage configurator, and AR viewing.',
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
      tr: 'Açılan şarj kutusu animasyonu, Web Audio ile gerçek zamanlı üretilen ANC ve 360 ses demoları.',
      en: 'An opening charging case animation, plus ANC and 360 Audio demos generated in real time with Web Audio.',
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
      tr: 'Hazır model kullanmadan Three.js ile kodla modellenmiş saat; etkileşimli antrenman ve çift frekanslı GPS simülasyonu.',
      en: 'A watch modeled in code with Three.js, without a premade model, plus an interactive workout and a dual-frequency GPS simulation.',
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
      tr: 'Prosedürel olarak oluşturulan yüzük ve şarj kutusu; uyku takibi ve Energy Score demoları.',
      en: 'A procedurally generated ring and charging case, with sleep tracking and Energy Score demos.',
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
      tr: 'Counter-Strike 2 için Major turnuvası tarzında yayın arayüzü. Valve Game State Integration ile saniyede yaklaşık 10 kez veri alır; can, ekonomi, killfeed ve bomba sayacını canlı gösterir.',
      en: 'A Major-style broadcast overlay for Counter-Strike 2. It receives data from Valve\'s Game State Integration about 10 times a second and shows health, economy, killfeed and the bomb timer live.',
    },
    stack: ['Python', 'JavaScript', 'HTML', 'CSS'],
    accent: '#fb923c',
  },
  {
    name: 'Goal Detector System',
    href: `${GH}/GoalDetectorSystem`,
    tag: { tr: 'Donanım', en: 'Hardware' },
    text: {
      tr: 'Arduino Uno ve Python ile geliştirilmiş gol algılama sistemi. Devre tasarımı ve yazılımı dahil.',
      en: 'A goal detection system built with an Arduino Uno and Python, including the circuit and the software.',
    },
    stack: ['Arduino', 'Python'],
    accent: '#34d399',
  },
  {
    name: 'Öğrenci Not Sistemi',
    href: `${GH}/database_ile_ogrenci_durumu`,
    tag: { tr: 'Backend', en: 'Backend' },
    text: {
      tr: 'Vize ve final ağırlıklarına göre öğrencinin geçme durumunu hesaplayan PHP uygulaması. Veritabanlı ve JSON tabanlı iki sürümü var.',
      en: 'A PHP application that calculates whether a student passes from midterm and final weights. Available in a database version and a JSON-based version.',
    },
    stack: ['PHP', 'SQL', 'JSON'],
    accent: '#a78bfa',
  },
  {
    name: 'PcProgramKurucu',
    href: `${GH}/PcProgramKurucu`,
    tag: { tr: 'Araç', en: 'Tool' },
    text: {
      tr: 'Windows\'ta program kurulumunu otomatikleştiren Batch betiği. MIT lisanslı.',
      en: 'A Batch script that automates installing programs on Windows. MIT licensed.',
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
  { id: 'screen', title: { tr: 'Arayüz ve animasyon', en: 'UI and animation' }, text: { tr: 'GSAP, Tailwind CSS', en: 'GSAP, Tailwind CSS' } },
  { id: 'stickL', title: { tr: 'TypeScript ve React', en: 'TypeScript and React' }, text: { tr: 'Next.js', en: 'Next.js' } },
  { id: 'stickR', title: { tr: '3D grafik', en: '3D graphics' }, text: { tr: 'Three.js, React Three Fiber', en: 'Three.js, React Three Fiber' } },
  { id: 'dpad', title: { tr: 'Python ve C#', en: 'Python and C#' }, text: { tr: 'Masaüstü uygulamalar ve araçlar', en: 'Desktop apps and tools' } },
  { id: 'buttons', title: { tr: 'Oyun geliştirme', en: 'Game development' }, text: { tr: 'itch.io\'da yayınlanan oyunlar', en: 'Games published on itch.io' } },
  { id: 'pcb', title: { tr: 'Gömülü sistemler', en: 'Embedded systems' }, text: { tr: 'Arduino, sensörler', en: 'Arduino, sensors' } },
  { id: 'back', title: { tr: 'Backend', en: 'Backend' }, text: { tr: 'PHP, SQL', en: 'PHP, SQL' } },
] as const satisfies readonly { id: string; title: Localized; text: Localized }[];

export type PartId = (typeof PARTS)[number]['id'];
