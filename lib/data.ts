import type { Localized } from '@/lib/i18n';

const GH = 'https://github.com/manyaksisko35';

export const EMAIL = 'hasan@hasanalpgungor.com';

export const LINKS = {
  github: GH,
  youtube: 'https://www.youtube.com/@hasanalpgungor',
  itch: 'https://hasan-alp-gungor.itch.io/',
  linkedin: 'https://www.linkedin.com/in/hasan-alp-g%C3%BCng%C3%B6r-b1085131a/',
  devto: 'https://dev.to/hasanalpgungor',
  hashnode: 'https://hasanalpgungor.hashnode.dev',
};

export const LOCAGEN_ITCH = 'https://hasan-alp-gungor.itch.io/locagen-pro-universal-game-localization-tool';

export interface Concept {
  slug: string;
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
    slug: 's26-ultra',
    name: 'Galaxy S26 Ultra',
    href: 'https://s26-ultra-concept.vercel.app',
    repo: `${GH}/s26-ultra-concept`,
    img: '/projects/s26-ultra.jpg',
    shot: true,
    glow: 'radial-gradient(60% 60% at 50% 50%, rgba(255, 255, 255, 0.14), transparent 72%)',
    text: {
      tr: 'Telefonu scroll\'ladıkça dönen ve parçalarına ayrılan bir 3D modele dönüştürdüm. S25 Ultra ile karşılaştırma, renk seçici ve AR görüntüleme de ekledim.',
      en: 'I turned the phone into a 3D model that turns and comes apart as you scroll, and added an S25 Ultra comparison, a color picker and AR viewing.',
      no: 'Jeg gjorde telefonen om til en 3D-modell som snur seg og deler seg opp når du scroller, og la til en sammenligning med S25 Ultra, fargevelger og AR-visning.',
    },
    stack: ['Next.js', 'React Three Fiber', 'GSAP', 'AR'],
  },
  {
    slug: 'buds4-pro',
    name: 'Galaxy Buds4 Pro',
    href: 'https://buds4-pro-concept.vercel.app',
    repo: `${GH}/buds4-pro-concept`,
    img: '/projects/buds4-pro-product.webp',
    glow: 'radial-gradient(55% 60% at 50% 55%, rgba(210, 222, 240, 0.2), transparent 72%)',
    text: {
      tr: 'Kutunun açılışını 3D olarak canlandırdım. Gürültü engelleme ve 360 ses demolarındaki sesleri Web Audio ile kendim ürettim.',
      en: 'I animated the case opening in 3D and generated the sounds for the noise cancelling and 360 Audio demos myself with Web Audio.',
      no: 'Jeg animerte åpningen av etuiet i 3D og lagde lydene til demoene av støydemping og 360 Audio selv med Web Audio.',
    },
    stack: ['Next.js', 'Three.js', 'Web Audio'],
  },
  {
    slug: 'watch-ultra2',
    name: 'Galaxy Watch Ultra2',
    href: 'https://watch-ultra2-concept.vercel.app',
    repo: `${GH}/watch-ultra2-concept`,
    img: '/projects/watch-ultra2-product.webp',
    glow: 'radial-gradient(55% 60% at 50% 55%, rgba(164, 185, 140, 0.26), transparent 72%)',
    text: {
      tr: 'Saati hazır model kullanmadan Three.js ile kodla modelledim. Antrenman ekranı ve GPS simülasyonu ekledim.',
      en: 'I modeled the watch in code with Three.js, without a premade model, and added a workout screen and a GPS simulation.',
      no: 'Jeg modellerte klokka i kode med Three.js, uten en ferdig modell, og la til en treningsskjerm og en GPS-simulering.',
    },
    stack: ['Next.js', 'Three.js', 'GSAP'],
  },
  {
    slug: 'galaxy-ring',
    name: 'Galaxy Ring',
    href: 'https://galaxy-ring-concept.vercel.app',
    repo: `${GH}/galaxy-ring-concept`,
    img: '/projects/galaxy-ring-product.webp',
    glow: 'radial-gradient(55% 60% at 50% 55%, rgba(217, 178, 106, 0.24), transparent 72%)',
    text: {
      tr: 'Yüzüğü ve şarj kutusunu kodla oluşturdum, uyku ve Energy Score ekranlarını tasarladım.',
      en: 'I built the ring and its charging case in code and designed the sleep and Energy Score screens.',
      no: 'Jeg bygde ringen og ladeetuiet i kode og designet skjermene for søvn og Energy Score.',
    },
    stack: ['Next.js', 'Three.js', 'GSAP'],
  },
];

export interface Project {
  /** Set when the project has its own page. */
  slug?: string;
  name: string;
  href: string;
  tag: Localized;
  text: Localized;
  stack: string[];
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'locagen',
    name: 'LocaGen',
    href: LOCAGEN_ITCH,
    tag: { tr: 'Oyun · Yerelleştirme', en: 'Games · Localization', no: 'Spill · Lokalisering' },
    text: {
      tr: 'Oyunların JSON dil dosyalarını değişkenleri bozmadan başka dillere çeviren aracım. Python ile yazılmış ücretsiz bir masaüstü sürümü ve Gemini kullanan bir PHP web sürümü var.',
      en: 'My tool that translates game JSON language files into other languages without breaking placeholders. There is a free desktop version in Python and a PHP web version that uses Gemini.',
      no: 'Verktøyet mitt som oversetter JSON-språkfiler fra spill til andre språk uten å ødelegge plassholderne. Det finnes en gratis skrivebordsversjon i Python og en webversjon i PHP som bruker Gemini.',
    },
    stack: ['Python', 'PHP', 'MySQL', 'Gemini API'],
    accent: '#e4e4e7',
  },
  {
    slug: 'cs2-major-hud',
    name: 'CS2 Major HUD',
    href: `${GH}/CounterStrike2MajorHUD`,
    tag: { tr: 'Oyun · Yayın', en: 'Games · Broadcast', no: 'Spill · Strømming' },
    text: {
      tr: 'Counter-Strike 2 maçları için Major turnuvalarındaki gibi bir yayın arayüzü yaptım. Oyundan saniyede yaklaşık 10 kez veri alıp can, para, killfeed ve bomba sayacını canlı gösteriyor.',
      en: 'I made a Major-style broadcast overlay for Counter-Strike 2 matches. It reads game data about 10 times a second and shows health, money, the killfeed and the bomb timer live.',
      no: 'Jeg lagde et broadcast-overlay i Major-stil for Counter-Strike 2-kamper. Det henter spilldata rundt 10 ganger i sekundet og viser liv, penger, killfeed og bombetimeren live.',
    },
    stack: ['Python', 'JavaScript', 'HTML', 'CSS'],
    accent: '#e4e4e7',
  },
  {
    slug: 'goal-detector',
    name: 'Goal Detector System',
    href: `${GH}/GoalDetectorSystem`,
    tag: { tr: 'Donanım', en: 'Hardware', no: 'Maskinvare' },
    text: {
      tr: 'Arduino Uno ve Python ile geliştirdiğim gol algılama sistemi. Devre tasarımını ve yazılımını kendim yaptım.',
      en: 'A goal detection system I developed with an Arduino Uno and Python, including the circuit design and the software.',
      no: 'Et system for måldeteksjon som jeg utviklet med Arduino Uno og Python, inkludert kretsdesignet og programvaren.',
    },
    stack: ['Arduino', 'Python'],
    accent: '#a1a1aa',
  },
  {
    name: 'Norway National Team Web Concept',
    href: `${LINKS.linkedin}recent-activity/all/`,
    tag: { tr: 'Web tasarım', en: 'Web design', no: 'Webdesign' },
    text: {
      tr: 'Norveç Milli Futbol Takımı\'nın dijital kimliğini yeniden düşündüğüm bir web sitesi konsepti.',
      en: 'A website concept where I reimagined the digital identity of the Norwegian national football team.',
      no: 'Et nettsidekonsept der jeg tenkte nytt rundt den digitale identiteten til det norske fotballandslaget.',
    },
    stack: ['Web Design', 'UI'],
    accent: '#e4e4e7',
  },
  {
    name: 'Öğrenci Not Sistemi',
    href: `${GH}/database_ile_ogrenci_durumu`,
    tag: { tr: 'Backend', en: 'Backend', no: 'Backend' },
    text: {
      tr: 'Vize ve final notlarından öğrencinin geçip geçmediğini hesaplayan bir PHP uygulaması. Biri veritabanıyla, biri JSON ile çalışan iki sürümünü yazdım.',
      en: 'A PHP app that works out whether a student passes from their midterm and final grades. I wrote two versions: one with a database, one with JSON.',
      no: 'En PHP-app som regner ut om en student består, ut fra karakterene på midtveiseksamen og avsluttende eksamen. Jeg skrev to versjoner: én med database og én med JSON.',
    },
    stack: ['PHP', 'SQL', 'JSON'],
    accent: '#d4d4d8',
  },
  {
    name: 'PcProgramKurucu',
    href: `${GH}/PcProgramKurucu`,
    tag: { tr: 'Masaüstü · Araç', en: 'Desktop · Tool', no: 'Skrivebordsapp · Verktøy' },
    text: {
      tr: 'Yeni bir Windows bilgisayarı kurmak için yazdığım C# uygulaması. Sık kullanılan 73 programı winget ile tek tıkla kuruyor; yanında CPU, GPU ve disk kullanımını grafikle, işlemci ve ekran kartı sıcaklıklarını da anlık gösteriyor.',
      en: 'A C# app I wrote for setting up a new Windows PC. It installs 73 common programs with one click through winget and charts CPU, GPU and disk usage with live CPU and GPU temperatures.',
      no: 'En C#-app jeg skrev for å sette opp en ny Windows-PC. Den installerer 73 vanlige programmer med ett klikk via winget og viser CPU-, GPU- og diskbruk i grafer, med CPU- og GPU-temperatur i sanntid.',
    },
    stack: ['C#', 'WinForms', 'winget', 'LibreHardwareMonitor'],
    accent: '#f4f4f5',
  },
  {
    name: 'SkinVault',
    href: `${GH}/SkinVault`,
    tag: { tr: 'Masaüstü · Veritabanı', en: 'Desktop · Database', no: 'Skrivebordsapp · Database' },
    text: {
      tr: 'Counter-Strike skinlerini SQL Server\'da tutan bir C# Windows Forms uygulaması. Yöneticiler skinleri float, kondisyon ve fiyatıyla ekleyip düzenliyor; kullanıcılar onları kartlar halinde görüp Steam üzerinden oyunda inceleyebiliyor.',
      en: 'A C# Windows Forms app that keeps Counter-Strike skins in SQL Server. Admins add and edit skins with their float, condition and price; users browse them as cards and inspect them in game through Steam.',
      no: 'En C# Windows Forms-app som lagrer Counter-Strike-skins i SQL Server. Administratorer legger til og redigerer skins med float, tilstand og pris; brukere blar gjennom dem som kort og inspiserer dem i spillet via Steam.',
    },
    stack: ['C#', 'WinForms', 'SQL Server'],
    accent: '#d4d4d8',
  },
  {
    name: 'Mağaza Satış Analiz Programı',
    href: `${LINKS.youtube}/search?query=${encodeURIComponent('Mağaza Satış Analiz')}`,
    tag: { tr: 'Masaüstü', en: 'Desktop', no: 'Skrivebordsapp' },
    text: {
      tr: 'C# programlama temelleri dersi için yazdığım, mağaza satışlarını analiz eden bir program. Anlatım videosu YouTube\'da.',
      en: 'A program that analyses store sales, written for my C# fundamentals course. The walkthrough is on YouTube.',
      no: 'Et program som analyserer salget i en butikk, skrevet for et grunnkurs i C#. Gjennomgangsvideoen ligger på YouTube.',
    },
    stack: ['C#'],
    accent: '#71717a',
  },
];

/** Repos without a public description: listed by name only. */
export const MORE_REPOS = [
  { name: 'json_ile_ogrenci_durumu', lang: 'PHP', href: `${GH}/json_ile_ogrenci_durumu` },
];

/** One skill per logo piece; the Skills section and the 3D labels share this list. */
export const PARTS = [
  { id: 'web', title: { tr: 'Web', en: 'Web', no: 'Web' }, text: { tr: 'HTML5, CSS, JavaScript, TypeScript', en: 'HTML5, CSS, JavaScript, TypeScript', no: 'HTML5, CSS, JavaScript, TypeScript' } },
  { id: 'csharp', title: { tr: 'C# ve Java', en: 'C# and Java', no: 'C# og Java' }, text: { tr: 'Masaüstü uygulamalar', en: 'Desktop apps', no: 'Skrivebordsapper' } },
  { id: 'three', title: { tr: '3D ve arayüz', en: '3D and UI', no: '3D og UI' }, text: { tr: 'React, Next.js, Three.js', en: 'React, Next.js, Three.js', no: 'React, Next.js, Three.js' } },
  { id: 'python', title: { tr: 'Python ve C++', en: 'Python and C++', no: 'Python og C++' }, text: { tr: 'Araçlar ve mikrodenetleyiciler', en: 'Tools and microcontrollers', no: 'Verktøy og mikrokontrollere' } },
  { id: 'game', title: { tr: 'Oyun geliştirme', en: 'Game development', no: 'Spillutvikling' }, text: { tr: 'Lua, oyun programlama ve tasarım', en: 'Lua, game programming and design', no: 'Lua, spillprogrammering og design' } },
  { id: 'hardware', title: { tr: 'Donanım', en: 'Hardware', no: 'Maskinvare' }, text: { tr: 'ESP32, Arduino, MPU-6050', en: 'ESP32, Arduino, MPU-6050', no: 'ESP32, Arduino, MPU-6050' } },
  { id: 'backend', title: { tr: 'Backend', en: 'Backend', no: 'Backend' }, text: { tr: 'PHP, SQL', en: 'PHP, SQL', no: 'PHP, SQL' } },
] as const satisfies readonly { id: string; title: Localized; text: Localized }[];

export type PartId = (typeof PARTS)[number]['id'];

const YT_SEARCH = (q: string) => `${LINKS.youtube}/search?query=${encodeURIComponent(q)}`;

export interface Video {
  key: string;
  /** YouTube video id. Without one the card links to a channel search for the title. */
  id?: string;
  title: Localized;
  tag: Localized;
  href: string;
}

const video = (v: Omit<Video, 'href'> & { search: string }): Video => {
  const { search, ...rest } = v;
  return { ...rest, href: v.id ? `https://www.youtube.com/watch?v=${v.id}` : YT_SEARCH(search) };
};

/** A selection from the YouTube channel. */
export const VIDEOS: Video[] = [
  video({ key: 'stattrak', id: 'PpB316eWN50', title: { tr: 'Gerçek hayatta StatTrak Deagle yaptım', en: 'I made a real-life StatTrak Deagle', no: 'Jeg lagde en ekte StatTrak Deagle' }, tag: { tr: 'CS2 × Donanım', en: 'CS2 × Hardware', no: 'CS2 × Maskinvare' }, search: 'stattrak deagle' }),
  video({ key: 'bomb-defuse', id: 'O-jkg_6Dc4g', title: { tr: 'CS2 ama bombayı gerçekten imha ediyorum (ESP32 ile)', en: 'CS2, but I really defuse the bomb (with ESP32)', no: 'CS2, men jeg desarmerer bomben på ekte (med ESP32)' }, tag: { tr: 'CS2 × ESP32', en: 'CS2 × ESP32', no: 'CS2 × ESP32' }, search: 'bombayı gerçekten imha' }),
  video({ key: 'flash', id: 'OMoCkNgwNuU', title: { tr: 'CS2 ama gerçekten flash yiyorum', en: 'CS2, but I really get flashed', no: 'CS2, men jeg blir flashet på ekte' }, tag: { tr: 'CS2 × Donanım', en: 'CS2 × Hardware', no: 'CS2 × Maskinvare' }, search: 'gerçekten flash' }),
  video({ key: 'airsoft', id: 'p2PEDqa-tOc', title: { tr: 'Akıllı airsoft hedefi yaptım (ESP32 ile)', en: 'I built a smart airsoft target (with ESP32)', no: 'Jeg bygde en smart airsoft-blink (med ESP32)' }, tag: { tr: 'ESP32', en: 'ESP32', no: 'ESP32' }, search: 'airsoft hedefi' }),
  video({ key: 'ambilight', id: '2vbKNMWsXUE', title: { tr: 'Kendi ambilight\'ımı yaptım (ESP32 ile)', en: 'I built my own Ambilight (with ESP32)', no: 'Jeg bygde min egen Ambilight (med ESP32)' }, tag: { tr: 'ESP32', en: 'ESP32', no: 'ESP32' }, search: 'ambilight' }),
  video({ key: 'assetto-radio', id: '2VQ2itUknSA', title: { tr: 'Assetto Corsa\'ya gerçek radyo bağladım', en: 'I connected a real radio to Assetto Corsa', no: 'Jeg koblet en ekte radio til Assetto Corsa' }, tag: { tr: 'Simülasyon × Donanım', en: 'Sim racing × Hardware', no: 'Simracing × Maskinvare' }, search: 'assetto corsa radyo' }),
  video({ key: 'major-hud', id: 'OVez-eQmrAc', title: { tr: 'Major arayüzünü kodladım', en: 'I coded a Major broadcast HUD', no: 'Jeg kodet et broadcast-HUD i Major-stil' }, tag: { tr: 'CS2 × Yazılım', en: 'CS2 × Software', no: 'CS2 × Programvare' }, search: 'major arayüzü' }),
  video({ key: 'ak47', id: 'DKzpmteFwCs', title: { tr: 'AK-47 ile CS2 oynadım', en: 'I played CS2 with an AK-47', no: 'Jeg spilte CS2 med en AK-47' }, tag: { tr: 'CS2', en: 'CS2', no: 'CS2' }, search: 'AK-47 ile CS2' }),
  video({ key: 'dlss', id: 'VaehYsHO0-I', title: { tr: 'Tüm oyunlar için tek tuşla DLSS 5 kurulumu', en: 'One-click DLSS 5 setup for every game', no: 'DLSS 5 i alle spill med ett klikk' }, tag: { tr: 'Rehber', en: 'Guide', no: 'Guide' }, search: 'DLSS 5' }),
];
