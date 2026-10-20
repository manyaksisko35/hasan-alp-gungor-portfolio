import { LINKS } from '@/lib/data';
import type { Localized } from '@/lib/i18n';

const GH = LINKS.github;

export type LinkKind = 'live' | 'github' | 'itch' | 'youtube';

export interface ProjectDetail {
  slug: string;
  name: string;
  kind: Localized;
  summary: Localized;
  about: Localized[];
  features: { title: Localized; text: Localized }[];
  stack: string[];
  cover: { src: string; fit: 'cover' | 'contain'; glow: string };
  /** Share image when the cover is not a good fit for link previews. */
  share?: string;
  gallery: { src: string; caption: Localized }[];
  links: { kind: LinkKind; label: Localized; href: string }[];
  /** Key of a related video in VIDEOS. */
  video?: string;
}

const shots = (slug: string, list: [string, Localized][]) =>
  list.map(([file, caption]) => ({ src: `/projects/${slug}/${file}.jpg`, caption }));

const site: Localized = { tr: 'Siteyi aç', en: 'Open site' };
const code: Localized = { tr: 'Kaynak kod', en: 'Source code' };

const CONCEPT_NOTE: Localized = {
  tr: 'Hayran yapımı bir konsepttir, Samsung ile bağlantılı değildir. Teknik özellikler Samsung\'un resmi ürün sayfalarından alındı.',
  en: "A fan-made concept, not affiliated with Samsung. Specs come from Samsung's official product pages.",
};

export const DETAILS: ProjectDetail[] = [
  {
    slug: 's26-ultra',
    name: 'Galaxy S26 Ultra',
    kind: { tr: 'Konsept ürün sitesi', en: 'Concept product site' },
    summary: {
      tr: 'Galaxy S26 Ultra için scroll ile ilerleyen, gerçek zamanlı 3D bir ürün sayfası. Telefon dönüyor, S Pen yuvasından çıkıyor ve tüm renklerine ayrılıyor.',
      en: 'A scroll-driven product page for the Galaxy S26 Ultra with real-time 3D. The phone turns, the S Pen slides out and the phone fans out into every color.',
    },
    about: [
      {
        tr: 'Samsung\'un ürün sayfalarını sevdiğim için kendi versiyonumu yaptım. Sayfa boyunca tek bir 3D telefon modeli ilerliyor: kaydırdıkça hareket ediyor, dönüyor ve parçalarına ayrılıyor. Her bölümün kendi 3D veya animasyonlu demosu var.',
        en: "I like Samsung's product pages, so I built my own version. A single 3D phone model carries the whole page: it moves, turns and comes apart as you scroll. Every section has its own 3D or animated demo.",
      },
      {
        tr: 'Performansa çok dikkat ettim. Modeller Draco ile sıkıştırıldı, sahne sadece bir şey hareket ederken çiziliyor ve hero\'dan sonraki tüm 3D bölümler tek bir WebGL canvas\'ı paylaşıyor. Lighthouse\'ta erişilebilirlik ve SEO 100 aldı.',
        en: 'I paid close attention to performance. Models are Draco-compressed, the scene only draws while something moves, and every 3D section after the hero shares a single WebGL canvas. It scores 100 for accessibility and SEO on Lighthouse.',
      },
      CONCEPT_NOTE,
    ],
    features: [
      {
        title: { tr: 'S25 Ultra ile karşılaştırma', en: 'S25 Ultra comparison' },
        text: { tr: 'İki telefon gerçek boyut oranlarıyla yan yana 3D olarak duruyor, yanında özellik tablosu var.', en: 'Both phones side by side in 3D at true relative size, next to a spec table.' },
      },
      {
        title: { tr: 'Kendi Ultra\'nı oluştur', en: 'Build your Ultra' },
        text: { tr: 'Renk ve hafıza seçince fiyat anında güncelleniyor. Seçtiğin rengi AR ile odanda gerçek boyutunda görebiliyorsun.', en: 'Pick a color and storage and the price updates live. You can place the chosen color in your room at real size with AR.' },
      },
      {
        title: { tr: 'Galaxy AI demoları', en: 'Galaxy AI demos' },
        text: { tr: 'Live Translate, Circle to Search ve Photo Assist kısa animasyonlu hikâyeler olarak oynuyor.', en: 'Live Translate, Circle to Search and Photo Assist play as short animated stories.' },
      },
      {
        title: { tr: 'Kamera', en: 'Camera' },
        text: { tr: 'Kaydırarak 0.6x\'ten 100x Space Zoom\'a yaklaşma ve sürüklenebilir önce/sonra kaydırıcısıyla gece çekimi karşılaştırması.', en: 'A 0.6x to 100x Space Zoom you scroll through, and a night shot comparison with a draggable before/after slider.' },
      },
      {
        title: { tr: 'Sürükle ve döndür', en: 'Drag to spin' },
        text: { tr: 'Telefonu tutup döndürebiliyorsun; ataletle dönüp yumuşakça yerine oturuyor.', en: 'Grab the phone and spin it, with inertia and a soft snap back.' },
      },
      {
        title: { tr: 'Filmi izle', en: 'Watch the film' },
        text: { tr: 'Tek tuşla tüm sayfa otomatik kayan bir tura dönüşüyor; durdurup devam ettirebiliyorsun.', en: 'One button runs the whole page as an auto-scrolling tour you can pause and resume.' },
      },
    ],
    stack: ['Next.js', 'React Three Fiber', 'Three.js', 'GSAP', 'TypeScript', 'WebXR'],
    cover: { src: '/projects/s26-ultra/hero.jpg', fit: 'cover', glow: 'radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.14), transparent 72%)' },
    gallery: shots('s26-ultra', [
      ['spen', { tr: 'S Pen kaydırdıkça yuvasından çıkıyor', en: 'The S Pen slides out as you scroll' }],
      ['colors', { tr: 'Altı renk yelpaze gibi açılıyor', en: 'Six finishes fan out' }],
      ['compare', { tr: 'S26 Ultra ve S25 Ultra yan yana', en: 'S26 Ultra and S25 Ultra side by side' }],
      ['zoom', { tr: '100x Space Zoom', en: '100x Space Zoom' }],
      ['build', { tr: 'Yapılandırıcı ve AR', en: 'Configurator and AR' }],
    ]),
    links: [
      { kind: 'live', label: site, href: 'https://s26-ultra-concept.vercel.app' },
      { kind: 'github', label: code, href: `${GH}/s26-ultra-concept` },
    ],
  },
  {
    slug: 'buds4-pro',
    name: 'Galaxy Buds4 Pro',
    kind: { tr: 'Konsept ürün sitesi', en: 'Concept product site' },
    summary: {
      tr: 'Galaxy Buds4 Pro için 3D bir ürün sayfası. Kutu gerçek bir menteşeyle açılıyor, gürültü engelleme ve 360 Audio demolarını tarayıcıda dinleyebiliyorsun.',
      en: 'A 3D product page for the Galaxy Buds4 Pro. The case opens on a real hinge, and you can listen to the noise cancelling and 360 Audio demos right in the browser.',
    },
    about: [
      {
        tr: 'Bu projede en çok uğraştığım kısım ses oldu. Gürültü engelleme demosundaki şehir sesi ve müzik, 360 Audio\'daki melodi; hepsini ses dosyası kullanmadan Web Audio API ile canlı olarak ürettim.',
        en: 'Sound was the part I worked on most. The city soundscape and music in the noise cancelling demo and the melody in 360 Audio are all synthesized live with the Web Audio API, without a single audio file.',
      },
      {
        tr: 'Scroll hikâyesinde kutunun kapağı açılıyor, kulaklıklar yuvalarından yükseliyor, kutu aşağı düşüyor ve kulaklıklar sana dönüyor. 3D modelin üzerindeki etiketler model hareket ettikçe onu takip ediyor.',
        en: 'In the scroll story the lid swings open, the earbuds rise out of the cradle, the case drops away and the buds turn to face you. Labels pinned to the 3D model follow it as it moves.',
      },
      CONCEPT_NOTE,
    ],
    features: [
      {
        title: { tr: 'Gürültü engellemeyi dinle', en: 'Hear the ANC' },
        text: { tr: 'Kapalı, Ambient ve Adaptive ANC arasında geçiş yaparken şehir sesi ve müzik canlı olarak değişiyor.', en: 'Switch between Off, Ambient and Adaptive ANC while a city soundscape and music change live.' },
      },
      {
        title: { tr: '360 Audio', en: '360 Audio' },
        text: { tr: 'HRTF ile kafanın etrafına yerleştirilmiş bir melodi. Telefonda jiroskopla kafa hareketin takip ediliyor.', en: 'A melody positioned around your head with HRTF. On a phone, the gyroscope tracks your head.' },
      },
      {
        title: { tr: 'Pinch kontrolleri', en: 'Pinch controls' },
        text: { tr: 'Tek, çift, üçlü pinch, basılı tutma ve kaydırma hareketlerine bir "şimdi çalıyor" kartı tepki veriyor.', en: 'Pinch, double pinch, triple pinch, hold or swipe, and a "now playing" card reacts.' },
      },
      {
        title: { tr: 'Kablosuz şarj', en: 'Wireless charging' },
        text: { tr: 'Kaydırdıkça kapalı kutu şarj pedine iniyor, ped yanıyor ve şarj doluyor.', en: 'As you scroll, the closed case lands on a charging pad, the pad lights up and the charge fills.' },
      },
      {
        title: { tr: 'Renkler ve AR', en: 'Colors and AR' },
        text: { tr: 'Beyaz, siyah ve pembe altın arasında geçiş yapıp kutuyu masana gerçek boyutunda yerleştirebiliyorsun.', en: 'Switch between White, Black and Pink Gold, then place the case on your desk at real size.' },
      },
      {
        title: { tr: 'Buds3 Pro ile karşılaştırma', en: 'Buds3 Pro comparison' },
        text: { tr: 'Öne çıkan farklar ve satır satır açılan bir özellik tablosu.', en: 'Headline gains and a spec table that reveals row by row.' },
      },
    ],
    stack: ['Next.js', 'Three.js', 'React Three Fiber', 'Web Audio API', 'GSAP', 'TypeScript'],
    cover: { src: '/projects/buds4-pro/hero.jpg', fit: 'cover', glow: 'radial-gradient(55% 60% at 50% 55%, rgba(210,222,240,0.2), transparent 72%)' },
    gallery: shots('buds4-pro', [
      ['open', { tr: 'Kapak açılıyor, kulaklıklar yükseliyor', en: 'The lid opens and the buds rise' }],
      ['anc', { tr: 'Gürültü engellemeyi dinle', en: 'Hear the noise cancelling' }],
      ['spatial', { tr: '360 Audio', en: '360 Audio' }],
      ['colors', { tr: 'Renkler', en: 'Colors' }],
      ['compare', { tr: 'Buds3 Pro ile karşılaştırma', en: 'Compared with Buds3 Pro' }],
    ]),
    links: [
      { kind: 'live', label: site, href: 'https://buds4-pro-concept.vercel.app' },
      { kind: 'github', label: code, href: `${GH}/buds4-pro-concept` },
    ],
  },
  {
    slug: 'watch-ultra2',
    name: 'Galaxy Watch Ultra2',
    kind: { tr: 'Konsept ürün sitesi', en: 'Concept product site' },
    summary: {
      tr: 'Galaxy Watch Ultra2 için bir ürün sayfası. Saati hazır bir 3D model kullanmadan, tamamen kodla Three.js\'te modelledim.',
      en: 'A product page for the Galaxy Watch Ultra2. I modeled the watch entirely in code with Three.js, without a premade 3D model.',
    },
    about: [
      {
        tr: 'Titanyum kasa, numaralı bezel, safir ekran, butonlar, sensör, delikli kayış ve tokası; hepsi kodla üretiliyor. Bunun için extrusion, kendi yazdığım şerit geometrisi ve canvas ile çizilmiş dokular kullandım.',
        en: 'The titanium case, numbered bezel, sapphire display, buttons, sensor, perforated band and buckle are all generated in code, using extrusions, a custom ribbon geometry and canvas-drawn textures.',
      },
      {
        tr: 'Seçtiğin kayış rengi tüm sayfanın vurgu rengini değiştiriyor ve bir sonraki ziyaretinde hatırlanıyor.',
        en: 'The band color you pick sets the accent color of the whole page and is remembered for your next visit.',
      },
      CONCEPT_NOTE,
    ],
    features: [
      {
        title: { tr: 'Quick Button', en: 'Quick Button' },
        text: { tr: 'Turuncu butona basınca canlı süre, nabız ve mesafeyle bir antrenman başlıyor. Basılı tutunca Web Audio ile üretilen acil durum sireni çalıyor.', en: 'Press the orange button to start a workout with a live timer, heart rate and distance. Hold it to sound an emergency siren synthesized with Web Audio.' },
      },
      {
        title: { tr: 'Çift frekanslı GPS', en: 'Dual-frequency GPS' },
        text: { tr: 'Şehirde simüle edilmiş bir koşu: sadece L1 ile kaydedilen rotanın binalar arasında nasıl kaydığını, L1 + L5 ile nasıl düzeldiğini görüyorsun.', en: 'A simulated city run recorded with L1 only or L1 + L5, so you can see the track drift between tall buildings.' },
      },
      {
        title: { tr: 'Energy Score', en: 'Energy Score' },
        text: { tr: 'Uyku, aktivite ve uyku nabzı kaydırıcılarıyla skor ve canlı nabız grafiği değişiyor.', en: 'Sliders for sleep, activity and sleeping heart rate change the score and a live heart-rate trace.' },
      },
      {
        title: { tr: 'Gece modu', en: 'Night Mode' },
        text: { tr: '3D saat yüzü gündüz ve kırmızı gece ekranı arasında değişiyor.', en: 'The 3D watch face switches between day and the red night display.' },
      },
      {
        title: { tr: 'Dayanıklılık', en: 'Built tough' },
        text: { tr: '10ATM, 40 metreye dalış, IP69K ve malzemeler tek bir seçicide.', en: '10ATM, diving to 40 m, IP69K and materials in one switcher.' },
      },
      {
        title: { tr: 'Renkler', en: 'Colors' },
        text: { tr: 'İki kasa rengi, beş spor kayış ve dikişli kenarlı beş hibrit deri kayış.', en: 'Two case colors, five Sport Band colors and five Hybrid Leather Bands with stitched edges.' },
      },
    ],
    stack: ['Next.js', 'Three.js', 'GSAP', 'Web Audio API', 'TypeScript'],
    cover: { src: '/projects/watch-ultra2/overview.jpg', fit: 'cover', glow: 'radial-gradient(55% 60% at 50% 55%, rgba(164,185,140,0.26), transparent 72%)' },
    gallery: shots('watch-ultra2', [
      ['titanium', { tr: 'Titanyum kasa', en: 'Titanium case' }],
      ['display', { tr: 'Ekran ve gece modu', en: 'Display and Night Mode' }],
      ['gps', { tr: 'Çift frekanslı GPS simülasyonu', en: 'Dual-frequency GPS simulation' }],
      ['colors', { tr: 'Kasa ve kayış renkleri', en: 'Case and band colors' }],
      ['compare', { tr: 'İlk Watch Ultra ile karşılaştırma', en: 'Compared with the first Watch Ultra' }],
    ]),
    links: [
      { kind: 'live', label: site, href: 'https://watch-ultra2-concept.vercel.app' },
      { kind: 'github', label: code, href: `${GH}/watch-ultra2-concept` },
    ],
  },
  {
    slug: 'galaxy-ring',
    name: 'Galaxy Ring',
    kind: { tr: 'Konsept ürün sitesi', en: 'Concept product site' },
    summary: {
      tr: 'Galaxy Ring için bir ürün sayfası. Yüzüğü ve şarj kutusunu kodla oluşturdum; uyku ve Energy Score ekranlarını etkileşimli olarak tasarladım.',
      en: 'A product page for the Galaxy Ring. I built the ring and its charging case in code and designed interactive sleep and Energy Score screens.',
    },
    about: [
      {
        tr: 'İçbükey titanyum gövde, iç yüzeydeki çipler, LED\'ler ve yazılar, sensör çıkıntıları ve şeffaf kapaklı şarj kutusu; hepsi kodla üretiliyor.',
        en: 'The concave titanium shell, the chips, LEDs and markings on the inner lining, the sensor bumps and the charging case with its clear lid are all generated in code.',
      },
      {
        tr: 'Kaydırdıkça yüzük dönüp profilini gösteriyor, içindeki sensörler parlıyor, sonra şarj kutusuna düşüyor ve kapak kapanıyor.',
        en: 'As you scroll, the ring turns to show its profile, the sensors inside glow, then it drops onto the charger and the lid closes.',
      },
      CONCEPT_NOTE,
    ],
    features: [
      {
        title: { tr: 'Bedenini bul', en: 'Find your size' },
        text: { tr: '5 ile 13 arası beden seçince iç çap, ağırlık ve pil ömrü değişiyor.', en: 'Pick sizes 5 to 13 and see the inner diameter, weight and battery life change.' },
      },
      {
        title: { tr: 'Uyku', en: 'Sleep' },
        text: { tr: 'Örnek geceler arasında geçiş yapıp hipnogramı, Sleep Score\'u, nabzı ve cilt sıcaklığını görüyorsun.', en: 'Switch between example nights to see the hypnogram, Sleep Score, heart rate and skin temperature.' },
      },
      {
        title: { tr: 'Çift pinch', en: 'Double pinch' },
        text: { tr: 'Telefon maketinde fotoğraf çekme ve alarm kapatma hareketleri.', en: 'Take a photo or stop an alarm on a phone mockup.' },
      },
      {
        title: { tr: 'Yüzük mü saat mi?', en: 'Ring or Watch?' },
        text: { tr: 'Galaxy Watch Ultra2 ile yan yana karşılaştırma.', en: 'A side-by-side with the Galaxy Watch Ultra2.' },
      },
      {
        title: { tr: 'Renkler', en: 'Colors' },
        text: { tr: 'Titanyum siyah, gümüş ve altın. Seçtiğin renk tüm sayfanın vurgu rengini belirliyor.', en: 'Titanium Black, Silver and Gold. The finish you pick sets the accent color of the whole page.' },
      },
      {
        title: { tr: 'Pil', en: 'Battery' },
        text: { tr: 'Kaydırdıkça dolan 7 ve 6 günlük pil halkaları.', en: 'Rings for up to 7 and 6 days that fill as you scroll.' },
      },
    ],
    stack: ['Next.js', 'Three.js', 'GSAP', 'TypeScript'],
    cover: { src: '/projects/galaxy-ring/overview.jpg', fit: 'cover', glow: 'radial-gradient(55% 60% at 50% 55%, rgba(217,178,106,0.24), transparent 72%)' },
    gallery: shots('galaxy-ring', [
      ['design', { tr: 'İçbükey tasarım', en: 'Concave design' }],
      ['inside', { tr: 'Sensörler', en: 'Sensors' }],
      ['sizes', { tr: 'Beden seçici', en: 'Size picker' }],
      ['sleep', { tr: 'Uyku ekranı', en: 'Sleep screen' }],
      ['case', { tr: 'Şarj kutusu', en: 'Charging case' }],
    ]),
    links: [
      { kind: 'live', label: site, href: 'https://galaxy-ring-concept.vercel.app' },
      { kind: 'github', label: code, href: `${GH}/galaxy-ring-concept` },
    ],
  },
  {
    slug: 'locagen',
    name: 'LocaGen',
    kind: { tr: 'Oyun yerelleştirme aracı', en: 'Game localization tool' },
    summary: {
      tr: 'Oyunların dil dosyalarını başka dillere çeviren yerelleştirme aracım. Ücretsiz bir masaüstü sürümü ve yapay zekâ kullanan bir PRO web sürümü var.',
      en: 'My localization tool that translates game language files into other languages. It has a free desktop version and a PRO web version that uses AI.',
    },
    about: [
      {
        tr: 'Oyunlarda metinler genelde JSON dil dosyalarında durur. LocaGen bu dosyayı alıyor, anahtarlara dokunmadan sadece değerleri çeviriyor ve oyunun doğrudan kullanabileceği yeni bir dosya üretiyor.',
        en: 'Game text usually lives in JSON language files. LocaGen takes that file, translates only the values without touching the keys, and produces a new file the game can use directly.',
      },
      {
        tr: 'Ücretsiz sürüm Python ile yazılmış bir masaüstü uygulaması ve Google Translate kullanıyor. PRO sürüm PHP ile yazılmış bir web uygulaması; çeviriyi Gemini yapıyor ve oyun terimlerini robotik değil, bir oyuncunun kullanacağı dille çeviriyor.',
        en: 'The free version is a desktop app written in Python that uses Google Translate. The PRO version is a PHP web app where Gemini does the translation, translating game terms the way a player would say them instead of word for word.',
      },
    ],
    features: [
      {
        title: { tr: 'Değişkenler bozulmuyor', en: 'Placeholders stay intact' },
        text: { tr: '{player}, <b>, %s ve %d gibi yer tutucular çeviriden önce korunup sonra yerine konuyor, böylece oyunda metinler bozulmuyor.', en: 'Placeholders such as {player}, <b>, %s and %d are protected before translation and put back afterwards, so nothing breaks in game.' },
      },
      {
        title: { tr: 'Anahtarlara dokunmuyor', en: 'Keys stay untouched' },
        text: { tr: 'Sadece değerler çevriliyor; hem düz hem liste şeklindeki JSON yapıları destekleniyor.', en: 'Only the values are translated, for both flat and list-shaped JSON files.' },
      },
      {
        title: { tr: 'Oyuncu diliyle çeviri (PRO)', en: 'Translates like a gamer (PRO)' },
        text: { tr: 'Gemini 2.5 Flash, "kılıç", "zırh", "can iksiri" gibi terimleri oyunun atmosferine uygun şekilde çeviriyor.', en: 'Gemini 2.5 Flash translates terms like "sword", "armor" and "health potion" to match the mood of the game.' },
      },
      {
        title: { tr: 'Hesaplar ve geçmiş (PRO)', en: 'Accounts and history (PRO)' },
        text: { tr: 'Kullanıcı girişi, çeviri geçmişi ve bir yönetici paneli; hepsi PHP ve MySQL ile.', en: 'User login, translation history and an admin panel, all built with PHP and MySQL.' },
      },
      {
        title: { tr: 'Otomatik güncelleme', en: 'Auto-update' },
        text: { tr: 'Masaüstü sürümü açılışta GitHub\'daki son sürümü kontrol edip yenisini kendisi indiriyor.', en: 'The desktop version checks GitHub for the latest release on launch and downloads it itself.' },
      },
      {
        title: { tr: 'Terminal tasarımı', en: 'Terminal design' },
        text: { tr: 'Neon renkli, terminal görünümlü bir arayüz ve yazı animasyonları.', en: 'A neon, terminal-style interface with typing animations.' },
      },
    ],
    stack: ['Python', 'CustomTkinter', 'PHP', 'MySQL', 'Gemini API', 'JSON'],
    cover: { src: '/projects/locagen/logo.webp', fit: 'contain', glow: 'radial-gradient(55% 60% at 50% 50%, rgba(0,180,255,0.22), transparent 72%)' },
    share: '/projects/locagen/banner.jpg',
    gallery: [
      { src: '/projects/locagen/pro.jpg', caption: { tr: 'LocaGen PRO web arayüzü', en: 'The LocaGen PRO web interface' } },
      { src: '/projects/locagen/banner.jpg', caption: { tr: 'LocaGen: Universal Game Translator', en: 'LocaGen: Universal Game Translator' } },
    ],
    links: [
      { kind: 'itch', label: { tr: "itch.io'da indir", en: 'Get it on itch.io' }, href: LINKS.itch },
      { kind: 'github', label: { tr: 'Ücretsiz sürüm', en: 'Free version' }, href: `${GH}/LocaGenFree` },
      { kind: 'github', label: { tr: 'PRO web sürümü', en: 'PRO web version' }, href: `${GH}/LocaGenPHP` },
    ],
  },
  {
    slug: 'cs2-major-hud',
    name: 'CS2 Major HUD',
    kind: { tr: 'Oyun yayın arayüzü', en: 'Game broadcast overlay' },
    summary: {
      tr: 'Counter-Strike 2 maçları için Major turnuvalarındaki gibi bir yayın arayüzü. Oyundan gelen veriyle can, para, silah, killfeed ve bomba sayacını canlı gösteriyor.',
      en: 'A Major-style broadcast overlay for Counter-Strike 2 matches. It uses live game data to show health, money, weapons, the killfeed and the bomb timer.',
    },
    about: [
      {
        tr: 'CS2, Game State Integration özelliğiyle maç verisini bir adrese gönderebiliyor. Python ile yazdığım Flask sunucusu bu veriyi alıp sadeleştiriyor; HTML ve JavaScript ile yazdığım arayüz de saniyede 10 kez bu sunucudan veri çekip ekranı güncelliyor.',
        en: 'CS2 can send match data to an address through Game State Integration. A Flask server I wrote in Python receives and simplifies it, and the HTML and JavaScript overlay pulls from that server 10 times a second to update the screen.',
      },
      {
        tr: 'Oyun ölümleri ayrıca bildirmediği için killfeed\'i kendim çıkarıyorum: her güncellemede oyuncuların kill ve ölüm sayılarını bir önceki durumla karşılaştırıp kimin kimi vurduğunu buluyorum.',
        en: "The game doesn't report kills on their own, so I work out the killfeed myself: on every update I compare each player's kills and deaths with the previous state to find who got whom.",
      },
    ],
    features: [
      {
        title: { tr: 'Takım panelleri', en: 'Team panels' },
        text: { tr: 'Her oyuncu için can, para, ana silah, el bombaları ve K/D canlı olarak.', en: 'Health, money, main weapon, grenades and K/D for every player, live.' },
      },
      {
        title: { tr: 'İzlenen oyuncu', en: 'Spectated player' },
        text: { tr: 'Alttaki panel izlenen oyuncunun can, zırh, mermi ve K/A/D bilgisini gösteriyor.', en: 'The bottom panel shows the spectated player\'s health, armor, ammo and K/A/D.' },
      },
      {
        title: { tr: 'Killfeed', en: 'Killfeed' },
        text: { tr: 'Ölümler oyuncu durumlarındaki değişimden bulunup silah ikonuyla gösteriliyor.', en: 'Kills are worked out from changes in player state and shown with the weapon icon.' },
      },
      {
        title: { tr: 'Bomba sayacı', en: 'Bomb timer' },
        text: { tr: 'Bomba kurulunca normal süre yerine özel bir geri sayım devreye giriyor.', en: 'When the bomb is planted, a dedicated countdown replaces the round timer.' },
      },
    ],
    stack: ['Python', 'Flask', 'JavaScript', 'HTML', 'CSS', 'CS2 GSI'],
    cover: { src: '/projects/cs2-hud/hud.jpg', fit: 'cover', glow: 'radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.1), transparent 72%)' },
    gallery: [],
    links: [{ kind: 'github', label: code, href: `${GH}/CounterStrike2MajorHUD` }],
    video: 'major-hud',
  },
  {
    slug: 'goal-detector',
    name: 'Goal Detector System',
    kind: { tr: 'Donanım projesi', en: 'Hardware project' },
    summary: {
      tr: 'Yeğenim için yaptığım, top kaleye girince bunu algılayıp ekranda "GOL" yazan ve gol sesi çalan bir sistem.',
      en: 'A system I built for my nephew that detects when the ball goes into the goal, shows "GOAL" on screen and plays a goal sound.',
    },
    about: [
      {
        tr: 'Kaleye bir HC-SR04 ultrasonik mesafe sensörü yerleştirdim. Arduino Uno sürekli mesafeyi ölçüyor; top sensörün önünden geçip mesafe 40 santimetrenin altına düşünce seri port üzerinden bilgisayara "GOAL" mesajı gönderiyor.',
        en: 'An HC-SR04 ultrasonic distance sensor sits in the goal. The Arduino Uno measures the distance constantly, and when the ball passes and the distance drops below 40 cm, it sends a "GOAL" message to the computer over serial.',
      },
      {
        tr: 'Bilgisayar tarafında Python ile yazdığım bir uygulama seri portu dinliyor. Mesaj gelince ekranda "GOAL!!!" yazısı yanıp sönüyor ve gol sesi çalıyor. Devreyi önce Tinkercad\'de tasarladım.',
        en: 'On the computer, an app I wrote in Python listens to the serial port. When the message arrives, "GOAL!!!" flashes on screen and a goal sound plays. I designed the circuit in Tinkercad first.',
      },
    ],
    features: [
      {
        title: { tr: 'Ultrasonik algılama', en: 'Ultrasonic detection' },
        text: { tr: 'Sensör ses dalgasının yankı süresinden mesafeyi hesaplıyor, eşik kalenin boyutuna göre ayarlanabiliyor.', en: 'The sensor works out distance from the echo time; the threshold can be tuned to the size of the goal.' },
      },
      {
        title: { tr: 'Seri haberleşme', en: 'Serial link' },
        text: { tr: 'Arduino ile bilgisayar 9600 baud seri bağlantı üzerinden konuşuyor.', en: 'The Arduino and the computer talk over a 9600 baud serial connection.' },
      },
      {
        title: { tr: 'Gol ekranı', en: 'Goal screen' },
        text: { tr: 'Kivy ile yapılmış tam ekran bir arayüz ve pygame ile çalan gol sesi.', en: 'A full-screen interface built with Kivy and a goal sound played with pygame.' },
      },
    ],
    stack: ['Arduino', 'C++', 'Python', 'Kivy', 'pygame', 'HC-SR04'],
    cover: { src: '/projects/goal-detector/circuit.jpg', fit: 'contain', glow: 'radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.5), rgba(255,255,255,0.35) 70%)' },
    gallery: [],
    links: [{ kind: 'github', label: code, href: `${GH}/GoalDetectorSystem` }],
  },
];

export const getDetail = (slug: string) => DETAILS.find((d) => d.slug === slug);

export const detailHref = (slug: string) => `/projeler/${slug}`;
