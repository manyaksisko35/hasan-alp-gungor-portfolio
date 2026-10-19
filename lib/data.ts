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
    name: 'Norway National Team Web Concept',
    href: `${LINKS.linkedin}recent-activity/all/`,
    tag: { tr: 'Web tasarım', en: 'Web design' },
    text: {
      tr: 'Norveç Milli Futbol Takımı\'nın dijital kimliğini yeniden düşündüğüm bir web sitesi konsepti.',
      en: 'A website concept where I reimagined the digital identity of the Norwegian national football team.',
    },
    stack: ['Web Design', 'UI'],
    accent: '#ef4444',
  },
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
  {
    name: 'Mağaza Satış Analiz Programı',
    href: `${LINKS.youtube}/search?query=${encodeURIComponent('Mağaza Satış Analiz')}`,
    tag: { tr: 'Masaüstü', en: 'Desktop' },
    text: {
      tr: 'C# programlama temelleri dersi için yazdığım, mağaza satışlarını analiz eden bir program. Anlatım videosu YouTube\'da.',
      en: 'A program that analyses store sales, written for my C# fundamentals course. The walkthrough is on YouTube.',
    },
    stack: ['C#'],
    accent: '#b91c1c',
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
  { id: 'screen', title: { tr: 'Web', en: 'Web' }, text: { tr: 'HTML5, CSS, JavaScript, TypeScript', en: 'HTML5, CSS, JavaScript, TypeScript' } },
  { id: 'stickL', title: { tr: 'C# ve Java', en: 'C# and Java' }, text: { tr: 'Masaüstü uygulamalar', en: 'Desktop apps' } },
  { id: 'stickR', title: { tr: '3D ve arayüz', en: '3D and UI' }, text: { tr: 'React, Next.js, Three.js', en: 'React, Next.js, Three.js' } },
  { id: 'dpad', title: { tr: 'Python ve C++', en: 'Python and C++' }, text: { tr: 'Araçlar ve mikrodenetleyiciler', en: 'Tools and microcontrollers' } },
  { id: 'buttons', title: { tr: 'Oyun geliştirme', en: 'Game development' }, text: { tr: 'Lua, oyun programlama ve tasarım', en: 'Lua, game programming and design' } },
  { id: 'pcb', title: { tr: 'Donanım', en: 'Hardware' }, text: { tr: 'ESP32, Arduino, MPU-6050', en: 'ESP32, Arduino, MPU-6050' } },
  { id: 'back', title: { tr: 'Backend', en: 'Backend' }, text: { tr: 'PHP, SQL', en: 'PHP, SQL' } },
] as const satisfies readonly { id: string; title: Localized; text: Localized }[];

export type PartId = (typeof PARTS)[number]['id'];

const YT_SEARCH = (q: string) => `${LINKS.youtube}/search?query=${encodeURIComponent(q)}`;

export interface Video {
  title: Localized;
  tag: Localized;
  href: string;
}

/** A selection from the YouTube channel; each links to a channel search for its title. */
export const VIDEOS: Video[] = [
  { title: { tr: 'Gerçek hayatta StatTrak Deagle yaptım', en: 'I made a real-life StatTrak Deagle' }, tag: { tr: 'CS2 × Donanım', en: 'CS2 × Hardware' }, href: YT_SEARCH('stattrak deagle') },
  { title: { tr: 'CS2 ama bombayı gerçekten imha ediyorum (ESP32 ile)', en: 'CS2, but I really defuse the bomb (with ESP32)' }, tag: { tr: 'CS2 × ESP32', en: 'CS2 × ESP32' }, href: YT_SEARCH('bombayı gerçekten imha') },
  { title: { tr: 'CS2 ama gerçekten flash yiyorum', en: 'CS2, but I really get flashed' }, tag: { tr: 'CS2 × Donanım', en: 'CS2 × Hardware' }, href: YT_SEARCH('gerçekten flash') },
  { title: { tr: 'Akıllı airsoft hedefi yaptım (ESP32 ile)', en: 'I built a smart airsoft target (with ESP32)' }, tag: { tr: 'ESP32', en: 'ESP32' }, href: YT_SEARCH('airsoft hedefi') },
  { title: { tr: 'Kendi ambilight\'ımı yaptım (ESP32 ile)', en: 'I built my own Ambilight (with ESP32)' }, tag: { tr: 'ESP32', en: 'ESP32' }, href: YT_SEARCH('ambilight') },
  { title: { tr: 'Assetto Corsa\'ya gerçek radyo bağladım', en: 'I connected a real radio to Assetto Corsa' }, tag: { tr: 'Simülasyon × Donanım', en: 'Sim racing × Hardware' }, href: YT_SEARCH('assetto corsa radyo') },
  { title: { tr: 'Major arayüzünü kodladım', en: 'I coded a Major broadcast HUD' }, tag: { tr: 'CS2 × Yazılım', en: 'CS2 × Software' }, href: YT_SEARCH('major arayüzü') },
  { title: { tr: 'AK-47 ile CS2 oynadım', en: 'I played CS2 with an AK-47' }, tag: { tr: 'CS2', en: 'CS2' }, href: YT_SEARCH('AK-47 ile CS2') },
  { title: { tr: 'Tüm oyunlar için tek tuşla DLSS 5 kurulumu', en: 'One-click DLSS 5 setup for every game' }, tag: { tr: 'Rehber', en: 'Guide' }, href: YT_SEARCH('DLSS 5') },
];
