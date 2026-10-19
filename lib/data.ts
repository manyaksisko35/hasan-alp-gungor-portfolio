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
    glow: 'radial-gradient(60% 60% at 50% 50%, rgba(239, 68, 68, 0.22), transparent 72%)',
    text: {
      tr: 'Telefonu scroll\'ladıkça dönen ve parçalarına ayrılan bir 3D modele dönüştürdüm. S25 Ultra ile karşılaştırma, renk seçici ve AR görüntüleme de ekledim.',
      en: 'I turned the phone into a 3D model that turns and comes apart as you scroll, and added an S25 Ultra comparison, a color picker and AR viewing.',
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
      tr: 'Kutunun açılışını 3D olarak canlandırdım. Gürültü engelleme ve 360 ses demolarındaki sesleri Web Audio ile kendim ürettim.',
      en: 'I animated the case opening in 3D and generated the sounds for the noise cancelling and 360 Audio demos myself with Web Audio.',
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
      tr: 'Saati hazır model kullanmadan Three.js ile kodla modelledim. Antrenman ekranı ve GPS simülasyonu ekledim.',
      en: 'I modeled the watch in code with Three.js, without a premade model, and added a workout screen and a GPS simulation.',
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
      tr: 'Yüzüğü ve şarj kutusunu kodla oluşturdum, uyku ve Energy Score ekranlarını tasarladım.',
      en: 'I built the ring and its charging case in code and designed the sleep and Energy Score screens.',
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
      tr: 'Counter-Strike 2 maçları için Major turnuvalarındaki gibi bir yayın arayüzü yaptım. Oyundan saniyede yaklaşık 10 kez veri alıp can, para, killfeed ve bomba sayacını canlı gösteriyor.',
      en: 'I made a Major-style broadcast overlay for Counter-Strike 2 matches. It reads game data about 10 times a second and shows health, money, the killfeed and the bomb timer live.',
    },
    stack: ['Python', 'JavaScript', 'HTML', 'CSS'],
    accent: '#ef4444',
  },
  {
    name: 'Goal Detector System',
    href: `${GH}/GoalDetectorSystem`,
    tag: { tr: 'Donanım', en: 'Hardware' },
    text: {
      tr: 'Yeğenim için Arduino Uno ve Python ile bir gol algılama sistemi kurdum. Devresini de kodunu da kendim yaptım.',
      en: 'I built a goal detection system for my nephew with an Arduino Uno and Python, both the circuit and the code.',
    },
    stack: ['Arduino', 'Python'],
    accent: '#f87171',
  },
  {
    name: 'Öğrenci Not Sistemi',
    href: `${GH}/database_ile_ogrenci_durumu`,
    tag: { tr: 'Backend', en: 'Backend' },
    text: {
      tr: 'Vize ve final notlarından öğrencinin geçip geçmediğini hesaplayan bir PHP uygulaması. Biri veritabanıyla, biri JSON ile çalışan iki sürümünü yazdım.',
      en: 'A PHP app that works out whether a student passes from their midterm and final grades. I wrote two versions: one with a database, one with JSON.',
    },
    stack: ['PHP', 'SQL', 'JSON'],
    accent: '#dc2626',
  },
  {
    name: 'PcProgramKurucu',
    href: `${GH}/PcProgramKurucu`,
    tag: { tr: 'Araç', en: 'Tool' },
    text: {
      tr: 'Bilgisayara programları otomatik kurmak için yazdığım bir Batch betiği.',
      en: 'A Batch script I wrote to install programs on a PC automatically.',
    },
    stack: ['Batch', 'Windows'],
    accent: '#fca5a5',
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
