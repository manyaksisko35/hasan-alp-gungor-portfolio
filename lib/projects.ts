import { LINKS, LOCAGEN_ITCH } from '@/lib/data';
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

const site: Localized = { tr: 'Siteyi aç', en: 'Open site', no: 'Åpne siden' };
const code: Localized = { tr: 'Kaynak kod', en: 'Source code', no: 'Kildekode' };

const CONCEPT_NOTE: Localized = {
  tr: 'Hayran yapımı bir konsepttir, Samsung ile bağlantılı değildir. Teknik özellikler Samsung\'un resmi ürün sayfalarından alındı.',
  en: "A fan-made concept, not affiliated with Samsung. Specs come from Samsung's official product pages.",
  no: 'Et fanlaget konsept, ikke tilknyttet Samsung. Spesifikasjonene er hentet fra Samsungs offisielle produktsider.',
};

export const DETAILS: ProjectDetail[] = [
  {
    slug: 's26-ultra',
    name: 'Galaxy S26 Ultra',
    kind: { tr: 'Konsept ürün sitesi', en: 'Concept product site', no: 'Produktside (konsept)' },
    summary: {
      tr: 'Galaxy S26 Ultra için scroll ile ilerleyen, gerçek zamanlı 3D bir ürün sayfası. Telefon dönüyor, S Pen yuvasından çıkıyor ve tüm renklerine ayrılıyor.',
      en: 'A scroll-driven product page for the Galaxy S26 Ultra with real-time 3D. The phone turns, the S Pen slides out and the phone fans out into every color.',
      no: 'En scrollstyrt produktside for Galaxy S26 Ultra med 3D i sanntid. Telefonen roterer, S Pen glir ut, og telefonen sprer seg ut i alle fargene.',
    },
    about: [
      {
        tr: 'Samsung\'un ürün sayfalarını sevdiğim için kendi versiyonumu yaptım. Sayfa boyunca tek bir 3D telefon modeli ilerliyor: kaydırdıkça hareket ediyor, dönüyor ve parçalarına ayrılıyor. Her bölümün kendi 3D veya animasyonlu demosu var.',
        en: "I like Samsung's product pages, so I built my own version. A single 3D phone model carries the whole page: it moves, turns and comes apart as you scroll. Every section has its own 3D or animated demo.",
        no: 'Jeg liker produktsidene til Samsung, så jeg lagde min egen versjon. Én 3D-modell av telefonen bærer hele siden: den beveger seg, roterer og går fra hverandre mens du scroller. Hver seksjon har sin egen 3D- eller animerte demo.',
      },
      {
        tr: 'Performansa çok dikkat ettim. Modeller Draco ile sıkıştırıldı, sahne sadece bir şey hareket ederken çiziliyor ve hero\'dan sonraki tüm 3D bölümler tek bir WebGL canvas\'ı paylaşıyor. Lighthouse\'ta erişilebilirlik ve SEO 100 aldı.',
        en: 'I paid close attention to performance. Models are Draco-compressed, the scene only draws while something moves, and every 3D section after the hero shares a single WebGL canvas. It scores 100 for accessibility and SEO on Lighthouse.',
        no: 'Jeg la mye arbeid i ytelsen. Modellene er komprimert med Draco, scenen tegnes bare når noe beveger seg, og alle 3D-seksjonene etter hero-delen deler ett WebGL-canvas. Siden får 100 i tilgjengelighet og SEO på Lighthouse.',
      },
      CONCEPT_NOTE,
    ],
    features: [
      {
        title: { tr: 'S25 Ultra ile karşılaştırma', en: 'S25 Ultra comparison', no: 'Sammenligning med S25 Ultra' },
        text: { tr: 'İki telefon gerçek boyut oranlarıyla yan yana 3D olarak duruyor, yanında özellik tablosu var.', en: 'Both phones side by side in 3D at true relative size, next to a spec table.', no: 'Begge telefonene side om side i 3D i riktig størrelsesforhold, med en spesifikasjonstabell ved siden av.' },
      },
      {
        title: { tr: 'Kendi Ultra\'nı oluştur', en: 'Build your Ultra', no: 'Bygg din Ultra' },
        text: { tr: 'Renk ve hafıza seçince fiyat anında güncelleniyor. Seçtiğin rengi AR ile odanda gerçek boyutunda görebiliyorsun.', en: 'Pick a color and storage and the price updates live. You can place the chosen color in your room at real size with AR.', no: 'Velg farge og lagring, så oppdateres prisen med en gang. Med AR kan du plassere fargen du valgte i rommet ditt i full størrelse.' },
      },
      {
        title: { tr: 'Galaxy AI demoları', en: 'Galaxy AI demos', no: 'Galaxy AI-demoer' },
        text: { tr: 'Live Translate, Circle to Search ve Photo Assist kısa animasyonlu hikâyeler olarak oynuyor.', en: 'Live Translate, Circle to Search and Photo Assist play as short animated stories.', no: 'Live Translate, Circle to Search og Photo Assist spilles av som korte animerte historier.' },
      },
      {
        title: { tr: 'Kamera', en: 'Camera', no: 'Kamera' },
        text: { tr: 'Kaydırarak 0.6x\'ten 100x Space Zoom\'a yaklaşma ve sürüklenebilir önce/sonra kaydırıcısıyla gece çekimi karşılaştırması.', en: 'A 0.6x to 100x Space Zoom you scroll through, and a night shot comparison with a draggable before/after slider.', no: 'Space Zoom fra 0.6x til 100x som du scroller deg gjennom, og en sammenligning av nattbilder med en før/etter-slider du kan dra i.' },
      },
      {
        title: { tr: 'Sürükle ve döndür', en: 'Drag to spin', no: 'Dra for å snurre' },
        text: { tr: 'Telefonu tutup döndürebiliyorsun; ataletle dönüp yumuşakça yerine oturuyor.', en: 'Grab the phone and spin it, with inertia and a soft snap back.', no: 'Ta tak i telefonen og snurr den. Den spinner litt videre og glir mykt tilbake på plass.' },
      },
      {
        title: { tr: 'Filmi izle', en: 'Watch the film', no: 'Se filmen' },
        text: { tr: 'Tek tuşla tüm sayfa otomatik kayan bir tura dönüşüyor; durdurup devam ettirebiliyorsun.', en: 'One button runs the whole page as an auto-scrolling tour you can pause and resume.', no: 'Én knapp gjør hele siden om til en tur som scroller av seg selv, og du kan pause og fortsette.' },
      },
    ],
    stack: ['Next.js', 'React Three Fiber', 'Three.js', 'GSAP', 'TypeScript', 'WebXR'],
    cover: { src: '/projects/s26-ultra/hero.jpg', fit: 'cover', glow: 'radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.14), transparent 72%)' },
    gallery: shots('s26-ultra', [
      ['spen', { tr: 'S Pen kaydırdıkça yuvasından çıkıyor', en: 'The S Pen slides out as you scroll', no: 'S Pen glir ut mens du scroller' }],
      ['colors', { tr: 'Altı renk yelpaze gibi açılıyor', en: 'Six finishes fan out', no: 'Seks farger sprer seg ut som en vifte' }],
      ['compare', { tr: 'S26 Ultra ve S25 Ultra yan yana', en: 'S26 Ultra and S25 Ultra side by side', no: 'S26 Ultra og S25 Ultra side om side' }],
      ['zoom', { tr: '100x Space Zoom', en: '100x Space Zoom', no: '100x Space Zoom' }],
      ['build', { tr: 'Yapılandırıcı ve AR', en: 'Configurator and AR', no: 'Konfigurator og AR' }],
    ]),
    links: [
      { kind: 'live', label: site, href: 'https://s26-ultra-concept.vercel.app' },
      { kind: 'github', label: code, href: `${GH}/s26-ultra-concept` },
    ],
  },
  {
    slug: 'buds4-pro',
    name: 'Galaxy Buds4 Pro',
    kind: { tr: 'Konsept ürün sitesi', en: 'Concept product site', no: 'Produktside (konsept)' },
    summary: {
      tr: 'Galaxy Buds4 Pro için 3D bir ürün sayfası. Kutu gerçek bir menteşeyle açılıyor, gürültü engelleme ve 360 Audio demolarını tarayıcıda dinleyebiliyorsun.',
      en: 'A 3D product page for the Galaxy Buds4 Pro. The case opens on a real hinge, and you can listen to the noise cancelling and 360 Audio demos right in the browser.',
      no: 'En 3D-produktside for Galaxy Buds4 Pro. Etuiet åpnes på et ekte hengsel, og du kan høre demoene av støydemping og 360 Audio rett i nettleseren.',
    },
    about: [
      {
        tr: 'Bu projede en çok uğraştığım kısım ses oldu. Gürültü engelleme demosundaki şehir sesi ve müzik, 360 Audio\'daki melodi; hepsini ses dosyası kullanmadan Web Audio API ile canlı olarak ürettim.',
        en: 'Sound was the part I worked on most. The city soundscape and music in the noise cancelling demo and the melody in 360 Audio are all synthesized live with the Web Audio API, without a single audio file.',
        no: 'Lyden var det jeg jobbet mest med. Bylyden og musikken i støydempingsdemoen og melodien i 360 Audio lages live med Web Audio API, uten en eneste lydfil.',
      },
      {
        tr: 'Scroll hikâyesinde kutunun kapağı açılıyor, kulaklıklar yuvalarından yükseliyor, kutu aşağı düşüyor ve kulaklıklar sana dönüyor. 3D modelin üzerindeki etiketler model hareket ettikçe onu takip ediyor.',
        en: 'In the scroll story the lid swings open, the earbuds rise out of the cradle, the case drops away and the buds turn to face you. Labels pinned to the 3D model follow it as it moves.',
        no: 'Når du scroller, svinger lokket opp, ørepluggene løfter seg ut av holderen, etuiet faller bort og pluggene snur seg mot deg. Etiketter festet til 3D-modellen følger den mens den beveger seg.',
      },
      CONCEPT_NOTE,
    ],
    features: [
      {
        title: { tr: 'Gürültü engellemeyi dinle', en: 'Hear the ANC', no: 'Hør støydempingen' },
        text: { tr: 'Kapalı, Ambient ve Adaptive ANC arasında geçiş yaparken şehir sesi ve müzik canlı olarak değişiyor.', en: 'Switch between Off, Ambient and Adaptive ANC while a city soundscape and music change live.', no: 'Bytt mellom Av, Ambient og Adaptive ANC mens bylyd og musikk endrer seg live.' },
      },
      {
        title: { tr: '360 Audio', en: '360 Audio', no: '360 Audio' },
        text: { tr: 'HRTF ile kafanın etrafına yerleştirilmiş bir melodi. Telefonda jiroskopla kafa hareketin takip ediliyor.', en: 'A melody positioned around your head with HRTF. On a phone, the gyroscope tracks your head.', no: 'En melodi plassert rundt hodet ditt med HRTF. På mobil følger gyroskopet hodebevegelsene dine.' },
      },
      {
        title: { tr: 'Pinch kontrolleri', en: 'Pinch controls', no: 'Pinch-kontroller' },
        text: { tr: 'Tek, çift, üçlü pinch, basılı tutma ve kaydırma hareketlerine bir "şimdi çalıyor" kartı tepki veriyor.', en: 'Pinch, double pinch, triple pinch, hold or swipe, and a "now playing" card reacts.', no: 'Pinch, dobbel pinch, trippel pinch, hold eller sveip, så reagerer et "spilles nå"-kort.' },
      },
      {
        title: { tr: 'Kablosuz şarj', en: 'Wireless charging', no: 'Trådløs lading' },
        text: { tr: 'Kaydırdıkça kapalı kutu şarj pedine iniyor, ped yanıyor ve şarj doluyor.', en: 'As you scroll, the closed case lands on a charging pad, the pad lights up and the charge fills.', no: 'Mens du scroller, lander det lukkede etuiet på en ladeplate, platen lyser opp og batteriet fylles.' },
      },
      {
        title: { tr: 'Renkler ve AR', en: 'Colors and AR', no: 'Farger og AR' },
        text: { tr: 'Beyaz, siyah ve pembe altın arasında geçiş yapıp kutuyu masana gerçek boyutunda yerleştirebiliyorsun.', en: 'Switch between White, Black and Pink Gold, then place the case on your desk at real size.', no: 'Bytt mellom hvit, svart og rosegull, og plasser etuiet på pulten din i full størrelse.' },
      },
      {
        title: { tr: 'Buds3 Pro ile karşılaştırma', en: 'Buds3 Pro comparison', no: 'Sammenligning med Buds3 Pro' },
        text: { tr: 'Öne çıkan farklar ve satır satır açılan bir özellik tablosu.', en: 'Headline gains and a spec table that reveals row by row.', no: 'De viktigste forbedringene og en spesifikasjonstabell som dukker opp rad for rad.' },
      },
    ],
    stack: ['Next.js', 'Three.js', 'React Three Fiber', 'Web Audio API', 'GSAP', 'TypeScript'],
    cover: { src: '/projects/buds4-pro/hero.jpg', fit: 'cover', glow: 'radial-gradient(55% 60% at 50% 55%, rgba(210,222,240,0.2), transparent 72%)' },
    gallery: shots('buds4-pro', [
      ['open', { tr: 'Kapak açılıyor, kulaklıklar yükseliyor', en: 'The lid opens and the buds rise', no: 'Lokket åpnes og pluggene løfter seg' }],
      ['anc', { tr: 'Gürültü engellemeyi dinle', en: 'Hear the noise cancelling', no: 'Hør støydempingen' }],
      ['spatial', { tr: '360 Audio', en: '360 Audio', no: '360 Audio' }],
      ['colors', { tr: 'Renkler', en: 'Colors', no: 'Farger' }],
      ['compare', { tr: 'Buds3 Pro ile karşılaştırma', en: 'Compared with Buds3 Pro', no: 'Sammenlignet med Buds3 Pro' }],
    ]),
    links: [
      { kind: 'live', label: site, href: 'https://buds4-pro-concept.vercel.app' },
      { kind: 'github', label: code, href: `${GH}/buds4-pro-concept` },
    ],
  },
  {
    slug: 'watch-ultra2',
    name: 'Galaxy Watch Ultra2',
    kind: { tr: 'Konsept ürün sitesi', en: 'Concept product site', no: 'Produktside (konsept)' },
    summary: {
      tr: 'Galaxy Watch Ultra2 için bir ürün sayfası. Saati hazır bir 3D model kullanmadan, tamamen kodla Three.js\'te modelledim.',
      en: 'A product page for the Galaxy Watch Ultra2. I modeled the watch entirely in code with Three.js, without a premade 3D model.',
      no: 'En produktside for Galaxy Watch Ultra2. Jeg modellerte klokka helt i kode med Three.js, uten en ferdig 3D-modell.',
    },
    about: [
      {
        tr: 'Titanyum kasa, numaralı bezel, safir ekran, butonlar, sensör, delikli kayış ve tokası; hepsi kodla üretiliyor. Bunun için extrusion, kendi yazdığım şerit geometrisi ve canvas ile çizilmiş dokular kullandım.',
        en: 'The titanium case, numbered bezel, sapphire display, buttons, sensor, perforated band and buckle are all generated in code, using extrusions, a custom ribbon geometry and canvas-drawn textures.',
        no: 'Titankassen, den nummererte bezelen, safirskjermen, knappene, sensoren, den perforerte reima og spennen lages alle i kode. Til det brukte jeg ekstrudering, en egen båndgeometri jeg skrev selv og teksturer tegnet med canvas.',
      },
      {
        tr: 'Seçtiğin kayış rengi tüm sayfanın vurgu rengini değiştiriyor ve bir sonraki ziyaretinde hatırlanıyor.',
        en: 'The band color you pick sets the accent color of the whole page and is remembered for your next visit.',
        no: 'Reimfargen du velger, blir aksentfargen for hele siden og huskes til neste gang du er innom.',
      },
      CONCEPT_NOTE,
    ],
    features: [
      {
        title: { tr: 'Quick Button', en: 'Quick Button', no: 'Quick Button' },
        text: { tr: 'Turuncu butona basınca canlı süre, nabız ve mesafeyle bir antrenman başlıyor. Basılı tutunca Web Audio ile üretilen acil durum sireni çalıyor.', en: 'Press the orange button to start a workout with a live timer, heart rate and distance. Hold it to sound an emergency siren synthesized with Web Audio.', no: 'Trykk på den oransje knappen for å starte en treningsøkt med live tidtaker, puls og distanse. Hold den inne, så spilles en nødsirene laget med Web Audio.' },
      },
      {
        title: { tr: 'Çift frekanslı GPS', en: 'Dual-frequency GPS', no: 'GPS med to frekvenser' },
        text: { tr: 'Şehirde simüle edilmiş bir koşu: sadece L1 ile kaydedilen rotanın binalar arasında nasıl kaydığını, L1 + L5 ile nasıl düzeldiğini görüyorsun.', en: 'A simulated city run recorded with L1 only or L1 + L5, so you can see the track drift between tall buildings.', no: 'En simulert løpetur i byen, tatt opp med bare L1 eller med L1 + L5, så du ser hvordan sporet driver av mellom høye bygg.' },
      },
      {
        title: { tr: 'Energy Score', en: 'Energy Score', no: 'Energy Score' },
        text: { tr: 'Uyku, aktivite ve uyku nabzı kaydırıcılarıyla skor ve canlı nabız grafiği değişiyor.', en: 'Sliders for sleep, activity and sleeping heart rate change the score and a live heart-rate trace.', no: 'Slidere for søvn, aktivitet og puls under søvn endrer scoren og en live pulskurve.' },
      },
      {
        title: { tr: 'Gece modu', en: 'Night Mode', no: 'Nattmodus' },
        text: { tr: '3D saat yüzü gündüz ve kırmızı gece ekranı arasında değişiyor.', en: 'The 3D watch face switches between day and the red night display.', no: '3D-urskiven bytter mellom dagvisning og den røde nattvisningen.' },
      },
      {
        title: { tr: 'Dayanıklılık', en: 'Built tough', no: 'Tåler mye' },
        text: { tr: '10ATM, 40 metreye dalış, IP69K ve malzemeler tek bir seçicide.', en: '10ATM, diving to 40 m, IP69K and materials in one switcher.', no: '10ATM, dykking ned til 40 m, IP69K og materialer samlet i én velger.' },
      },
      {
        title: { tr: 'Renkler', en: 'Colors', no: 'Farger' },
        text: { tr: 'İki kasa rengi, beş spor kayış ve dikişli kenarlı beş hibrit deri kayış.', en: 'Two case colors, five Sport Band colors and five Hybrid Leather Bands with stitched edges.', no: 'To kassefarger, fem farger på Sport Band og fem Hybrid Leather Band med sydde kanter.' },
      },
    ],
    stack: ['Next.js', 'Three.js', 'GSAP', 'Web Audio API', 'TypeScript'],
    cover: { src: '/projects/watch-ultra2/overview.jpg', fit: 'cover', glow: 'radial-gradient(55% 60% at 50% 55%, rgba(164,185,140,0.26), transparent 72%)' },
    gallery: shots('watch-ultra2', [
      ['titanium', { tr: 'Titanyum kasa', en: 'Titanium case', no: 'Titankasse' }],
      ['display', { tr: 'Ekran ve gece modu', en: 'Display and Night Mode', no: 'Skjerm og nattmodus' }],
      ['gps', { tr: 'Çift frekanslı GPS simülasyonu', en: 'Dual-frequency GPS simulation', no: 'Simulering av GPS med to frekvenser' }],
      ['colors', { tr: 'Kasa ve kayış renkleri', en: 'Case and band colors', no: 'Farger på kasse og reim' }],
      ['compare', { tr: 'İlk Watch Ultra ile karşılaştırma', en: 'Compared with the first Watch Ultra', no: 'Sammenlignet med den første Watch Ultra' }],
    ]),
    links: [
      { kind: 'live', label: site, href: 'https://watch-ultra2-concept.vercel.app' },
      { kind: 'github', label: code, href: `${GH}/watch-ultra2-concept` },
    ],
  },
  {
    slug: 'galaxy-ring',
    name: 'Galaxy Ring',
    kind: { tr: 'Konsept ürün sitesi', en: 'Concept product site', no: 'Produktside (konsept)' },
    summary: {
      tr: 'Galaxy Ring için bir ürün sayfası. Yüzüğü ve şarj kutusunu kodla oluşturdum; uyku ve Energy Score ekranlarını etkileşimli olarak tasarladım.',
      en: 'A product page for the Galaxy Ring. I built the ring and its charging case in code and designed interactive sleep and Energy Score screens.',
      no: 'En produktside for Galaxy Ring. Jeg bygde ringen og ladeetuiet i kode og designet interaktive skjermer for søvn og Energy Score.',
    },
    about: [
      {
        tr: 'İçbükey titanyum gövde, iç yüzeydeki çipler, LED\'ler ve yazılar, sensör çıkıntıları ve şeffaf kapaklı şarj kutusu; hepsi kodla üretiliyor.',
        en: 'The concave titanium shell, the chips, LEDs and markings on the inner lining, the sensor bumps and the charging case with its clear lid are all generated in code.',
        no: 'Det konkave titanskallet, brikkene, LED-ene og merkingen på innsiden, sensorhumpene og ladeetuiet med gjennomsiktig lokk lages alle i kode.',
      },
      {
        tr: 'Kaydırdıkça yüzük dönüp profilini gösteriyor, içindeki sensörler parlıyor, sonra şarj kutusuna düşüyor ve kapak kapanıyor.',
        en: 'As you scroll, the ring turns to show its profile, the sensors inside glow, then it drops onto the charger and the lid closes.',
        no: 'Mens du scroller, snur ringen seg og viser profilen, sensorene inni lyser opp, og så faller den ned i laderen og lokket lukkes.',
      },
      CONCEPT_NOTE,
    ],
    features: [
      {
        title: { tr: 'Bedenini bul', en: 'Find your size', no: 'Finn størrelsen din' },
        text: { tr: '5 ile 13 arası beden seçince iç çap, ağırlık ve pil ömrü değişiyor.', en: 'Pick sizes 5 to 13 and see the inner diameter, weight and battery life change.', no: 'Velg en størrelse fra 5 til 13 og se hvordan indre diameter, vekt og batteritid endrer seg.' },
      },
      {
        title: { tr: 'Uyku', en: 'Sleep', no: 'Søvn' },
        text: { tr: 'Örnek geceler arasında geçiş yapıp hipnogramı, Sleep Score\'u, nabzı ve cilt sıcaklığını görüyorsun.', en: 'Switch between example nights to see the hypnogram, Sleep Score, heart rate and skin temperature.', no: 'Bytt mellom eksempelnetter og se hypnogrammet, Sleep Score, puls og hudtemperatur.' },
      },
      {
        title: { tr: 'Çift pinch', en: 'Double pinch', no: 'Dobbel pinch' },
        text: { tr: 'Telefon maketinde fotoğraf çekme ve alarm kapatma hareketleri.', en: 'Take a photo or stop an alarm on a phone mockup.', no: 'Ta et bilde eller skru av en alarm på en telefon-mockup.' },
      },
      {
        title: { tr: 'Yüzük mü saat mi?', en: 'Ring or Watch?', no: 'Ring eller klokke?' },
        text: { tr: 'Galaxy Watch Ultra2 ile yan yana karşılaştırma.', en: 'A side-by-side with the Galaxy Watch Ultra2.', no: 'En sammenligning side om side med Galaxy Watch Ultra2.' },
      },
      {
        title: { tr: 'Renkler', en: 'Colors', no: 'Farger' },
        text: { tr: 'Titanyum siyah, gümüş ve altın. Seçtiğin renk tüm sayfanın vurgu rengini belirliyor.', en: 'Titanium Black, Silver and Gold. The finish you pick sets the accent color of the whole page.', no: 'Svart, sølv og gull i titan. Fargen du velger, blir aksentfargen for hele siden.' },
      },
      {
        title: { tr: 'Pil', en: 'Battery', no: 'Batteri' },
        text: { tr: 'Kaydırdıkça dolan 7 ve 6 günlük pil halkaları.', en: 'Rings for up to 7 and 6 days that fill as you scroll.', no: 'Batteriringer for opptil 7 og 6 dager som fylles mens du scroller.' },
      },
    ],
    stack: ['Next.js', 'Three.js', 'GSAP', 'TypeScript'],
    cover: { src: '/projects/galaxy-ring/overview.jpg', fit: 'cover', glow: 'radial-gradient(55% 60% at 50% 55%, rgba(217,178,106,0.24), transparent 72%)' },
    gallery: shots('galaxy-ring', [
      ['design', { tr: 'İçbükey tasarım', en: 'Concave design', no: 'Konkavt design' }],
      ['inside', { tr: 'Sensörler', en: 'Sensors', no: 'Sensorer' }],
      ['sizes', { tr: 'Beden seçici', en: 'Size picker', no: 'Størrelsesvelger' }],
      ['sleep', { tr: 'Uyku ekranı', en: 'Sleep screen', no: 'Søvnskjerm' }],
      ['case', { tr: 'Şarj kutusu', en: 'Charging case', no: 'Ladeetui' }],
    ]),
    links: [
      { kind: 'live', label: site, href: 'https://galaxy-ring-concept.vercel.app' },
      { kind: 'github', label: code, href: `${GH}/galaxy-ring-concept` },
    ],
  },
  {
    slug: 'locagen',
    name: 'LocaGen',
    kind: { tr: 'Oyun yerelleştirme aracı', en: 'Game localization tool', no: 'Lokaliseringsverktøy for spill' },
    summary: {
      tr: 'Oyunların dil dosyalarını başka dillere çeviren yerelleştirme aracım. Ücretsiz bir masaüstü sürümü ve yapay zekâ kullanan bir PRO web sürümü var.',
      en: 'My localization tool that translates game language files into other languages. It has a free desktop version and a PRO web version that uses AI.',
      no: 'Lokaliseringsverktøyet mitt, som oversetter språkfiler i spill til andre språk. Det finnes en gratis desktopversjon og en PRO-nettversjon som bruker AI.',
    },
    about: [
      {
        tr: 'Oyunlarda metinler genelde JSON dil dosyalarında durur. LocaGen bu dosyayı alıyor, anahtarlara dokunmadan sadece değerleri çeviriyor ve oyunun doğrudan kullanabileceği yeni bir dosya üretiyor.',
        en: 'Game text usually lives in JSON language files. LocaGen takes that file, translates only the values without touching the keys, and produces a new file the game can use directly.',
        no: 'Tekst i spill ligger som regel i JSON-språkfiler. LocaGen tar den filen, oversetter bare verdiene uten å røre nøklene, og lager en ny fil som spillet kan bruke direkte.',
      },
      {
        tr: 'Ücretsiz sürüm Python ile yazılmış bir masaüstü uygulaması ve Google Translate kullanıyor. PRO sürüm PHP ile yazılmış bir web uygulaması; çeviriyi Gemini yapıyor ve oyun terimlerini robotik değil, bir oyuncunun kullanacağı dille çeviriyor.',
        en: 'The free version is a desktop app written in Python that uses Google Translate. The PRO version is a PHP web app where Gemini does the translation, translating game terms the way a player would say them instead of word for word.',
        no: 'Gratisversjonen er en desktop-app skrevet i Python som bruker Google Translate. PRO-versjonen er en nettapp i PHP der Gemini står for oversettelsen, og den oversetter spillord slik en spiller faktisk ville sagt dem, ikke ord for ord.',
      },
    ],
    features: [
      {
        title: { tr: 'Değişkenler bozulmuyor', en: 'Placeholders stay intact', no: 'Plassholdere blir ikke ødelagt' },
        text: { tr: '{player}, <b>, %s ve %d gibi yer tutucular çeviriden önce korunup sonra yerine konuyor, böylece oyunda metinler bozulmuyor.', en: 'Placeholders such as {player}, <b>, %s and %d are protected before translation and put back afterwards, so nothing breaks in game.', no: 'Plassholdere som {player}, <b>, %s og %d beskyttes før oversettelsen og settes tilbake etterpå, så ingenting går i stykker i spillet.' },
      },
      {
        title: { tr: 'Anahtarlara dokunmuyor', en: 'Keys stay untouched', no: 'Nøklene får være i fred' },
        text: { tr: 'Sadece değerler çevriliyor; hem düz hem liste şeklindeki JSON yapıları destekleniyor.', en: 'Only the values are translated, for both flat and list-shaped JSON files.', no: 'Bare verdiene oversettes, både i flate JSON-filer og i JSON-filer bygd opp som lister.' },
      },
      {
        title: { tr: 'Oyuncu diliyle çeviri (PRO)', en: 'Translates like a gamer (PRO)', no: 'Oversetter som en gamer (PRO)' },
        text: { tr: 'Gemini 2.5 Flash, "kılıç", "zırh", "can iksiri" gibi terimleri oyunun atmosferine uygun şekilde çeviriyor.', en: 'Gemini 2.5 Flash translates terms like "sword", "armor" and "health potion" to match the mood of the game.', no: 'Gemini 2.5 Flash oversetter ord som "sverd", "rustning" og "helsedrikk" så de passer stemningen i spillet.' },
      },
      {
        title: { tr: 'Hesaplar ve geçmiş (PRO)', en: 'Accounts and history (PRO)', no: 'Kontoer og historikk (PRO)' },
        text: { tr: 'Kullanıcı girişi, çeviri geçmişi ve bir yönetici paneli; hepsi PHP ve MySQL ile.', en: 'User login, translation history and an admin panel, all built with PHP and MySQL.', no: 'Innlogging, oversettelseshistorikk og et adminpanel, alt bygd med PHP og MySQL.' },
      },
      {
        title: { tr: 'Otomatik güncelleme', en: 'Auto-update', no: 'Automatisk oppdatering' },
        text: { tr: 'Masaüstü sürümü açılışta GitHub\'daki son sürümü kontrol edip yenisini kendisi indiriyor.', en: 'The desktop version checks GitHub for the latest release on launch and downloads it itself.', no: 'Desktopversjonen sjekker GitHub etter nyeste versjon når den starter, og laster den ned selv.' },
      },
      {
        title: { tr: 'Terminal tasarımı', en: 'Terminal design', no: 'Terminaldesign' },
        text: { tr: 'Neon renkli, terminal görünümlü bir arayüz ve yazı animasyonları.', en: 'A neon, terminal-style interface with typing animations.', no: 'Et neonfarget grensesnitt i terminalstil med skriveanimasjoner.' },
      },
    ],
    stack: ['Python', 'CustomTkinter', 'PHP', 'MySQL', 'Gemini API', 'JSON'],
    cover: { src: '/projects/locagen/logo.webp', fit: 'contain', glow: 'radial-gradient(55% 60% at 50% 50%, rgba(0,180,255,0.22), transparent 72%)' },
    share: '/projects/locagen/banner.jpg',
    gallery: [
      { src: '/projects/locagen/pro.jpg', caption: { tr: 'LocaGen PRO web arayüzü', en: 'The LocaGen PRO web interface', no: 'Nettgrensesnittet til LocaGen PRO' } },
      { src: '/projects/locagen/banner.jpg', caption: { tr: 'LocaGen: Universal Game Translator', en: 'LocaGen: Universal Game Translator', no: 'LocaGen: Universal Game Translator' } },
    ],
    links: [
      { kind: 'itch', label: { tr: "itch.io'da indir", en: 'Get it on itch.io', no: 'Last ned på itch.io' }, href: LOCAGEN_ITCH },
      { kind: 'github', label: { tr: 'Ücretsiz sürüm', en: 'Free version', no: 'Gratisversjon' }, href: `${GH}/LocaGenFree` },
      { kind: 'github', label: { tr: 'PRO web sürümü', en: 'PRO web version', no: 'PRO-nettversjon' }, href: `${GH}/LocaGenPHP` },
    ],
  },
  {
    slug: 'cs2-major-hud',
    name: 'CS2 Major HUD',
    kind: { tr: 'Oyun yayın arayüzü', en: 'Game broadcast overlay', no: 'Overlay for spillsendinger' },
    summary: {
      tr: 'Counter-Strike 2 maçları için Major turnuvalarındaki gibi bir yayın arayüzü. Oyundan gelen veriyle can, para, silah, killfeed ve bomba sayacını canlı gösteriyor.',
      en: 'A Major-style broadcast overlay for Counter-Strike 2 matches. It uses live game data to show health, money, weapons, the killfeed and the bomb timer.',
      no: 'En sendingsoverlay i Major-stil for Counter-Strike 2-kamper. Den bruker live data fra spillet til å vise liv, penger, våpen, killfeed og bombetimeren.',
    },
    about: [
      {
        tr: 'CS2, Game State Integration özelliğiyle maç verisini bir adrese gönderebiliyor. Python ile yazdığım Flask sunucusu bu veriyi alıp sadeleştiriyor; HTML ve JavaScript ile yazdığım arayüz de saniyede 10 kez bu sunucudan veri çekip ekranı güncelliyor.',
        en: 'CS2 can send match data to an address through Game State Integration. A Flask server I wrote in Python receives and simplifies it, and the HTML and JavaScript overlay pulls from that server 10 times a second to update the screen.',
        no: 'CS2 kan sende kampdata til en adresse gjennom Game State Integration. En Flask-server jeg skrev i Python tar imot dataene og forenkler dem, og overlayen i HTML og JavaScript henter fra serveren 10 ganger i sekundet for å oppdatere skjermen.',
      },
      {
        tr: 'Oyun ölümleri ayrıca bildirmediği için killfeed\'i kendim çıkarıyorum: her güncellemede oyuncuların kill ve ölüm sayılarını bir önceki durumla karşılaştırıp kimin kimi vurduğunu buluyorum.',
        en: "The game doesn't report kills on their own, so I work out the killfeed myself: on every update I compare each player's kills and deaths with the previous state to find who got whom.",
        no: 'Spillet sier ikke fra om kills hver for seg, så jeg regner ut killfeeden selv: ved hver oppdatering sammenligner jeg kills og deaths for hver spiller med forrige tilstand for å finne ut hvem som tok hvem.',
      },
    ],
    features: [
      {
        title: { tr: 'Takım panelleri', en: 'Team panels', no: 'Lagpaneler' },
        text: { tr: 'Her oyuncu için can, para, ana silah, el bombaları ve K/D canlı olarak.', en: 'Health, money, main weapon, grenades and K/D for every player, live.', no: 'Liv, penger, hovedvåpen, granater og K/D for hver spiller, live.' },
      },
      {
        title: { tr: 'İzlenen oyuncu', en: 'Spectated player', no: 'Spilleren du ser på' },
        text: { tr: 'Alttaki panel izlenen oyuncunun can, zırh, mermi ve K/A/D bilgisini gösteriyor.', en: 'The bottom panel shows the spectated player\'s health, armor, ammo and K/A/D.', no: 'Panelet nederst viser liv, rustning, ammo og K/A/D for spilleren du ser på.' },
      },
      {
        title: { tr: 'Killfeed', en: 'Killfeed', no: 'Killfeed' },
        text: { tr: 'Ölümler oyuncu durumlarındaki değişimden bulunup silah ikonuyla gösteriliyor.', en: 'Kills are worked out from changes in player state and shown with the weapon icon.', no: 'Kills regnes ut fra endringer i spillertilstanden og vises med våpenikonet.' },
      },
      {
        title: { tr: 'Bomba sayacı', en: 'Bomb timer', no: 'Bombetimer' },
        text: { tr: 'Bomba kurulunca normal süre yerine özel bir geri sayım devreye giriyor.', en: 'When the bomb is planted, a dedicated countdown replaces the round timer.', no: 'Når bomben er plantet, tar en egen nedtelling over for rundetimeren.' },
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
    kind: { tr: 'Donanım projesi', en: 'Hardware project', no: 'Maskinvareprosjekt' },
    summary: {
      tr: 'Yeğenim için yaptığım, top kaleye girince bunu algılayıp ekranda "GOL" yazan ve gol sesi çalan bir sistem.',
      en: 'A system I built for my nephew that detects when the ball goes into the goal, shows "GOAL" on screen and plays a goal sound.',
      no: 'Et system jeg lagde til nevøen min, som merker når ballen går i mål, viser "GOAL" på skjermen og spiller av en mållyd.',
    },
    about: [
      {
        tr: 'Kaleye bir HC-SR04 ultrasonik mesafe sensörü yerleştirdim. Arduino Uno sürekli mesafeyi ölçüyor; top sensörün önünden geçip mesafe 40 santimetrenin altına düşünce seri port üzerinden bilgisayara "GOAL" mesajı gönderiyor.',
        en: 'An HC-SR04 ultrasonic distance sensor sits in the goal. The Arduino Uno measures the distance constantly, and when the ball passes and the distance drops below 40 cm, it sends a "GOAL" message to the computer over serial.',
        no: 'En HC-SR04 ultralydsensor for avstand sitter i målet. Arduino Uno måler avstanden hele tiden, og når ballen passerer og avstanden går under 40 cm, sender den en "GOAL"-melding til PC-en over serieporten.',
      },
      {
        tr: 'Bilgisayar tarafında Python ile yazdığım bir uygulama seri portu dinliyor. Mesaj gelince ekranda "GOAL!!!" yazısı yanıp sönüyor ve gol sesi çalıyor. Devreyi önce Tinkercad\'de tasarladım.',
        en: 'On the computer, an app I wrote in Python listens to the serial port. When the message arrives, "GOAL!!!" flashes on screen and a goal sound plays. I designed the circuit in Tinkercad first.',
        no: 'På PC-en lytter en app jeg skrev i Python på serieporten. Når meldingen kommer, blinker "GOAL!!!" på skjermen og en mållyd spilles av. Kretsen tegnet jeg først i Tinkercad.',
      },
    ],
    features: [
      {
        title: { tr: 'Ultrasonik algılama', en: 'Ultrasonic detection', no: 'Deteksjon med ultralyd' },
        text: { tr: 'Sensör ses dalgasının yankı süresinden mesafeyi hesaplıyor, eşik kalenin boyutuna göre ayarlanabiliyor.', en: 'The sensor works out distance from the echo time; the threshold can be tuned to the size of the goal.', no: 'Sensoren regner ut avstanden fra ekkotiden, og terskelen kan justeres etter hvor stort målet er.' },
      },
      {
        title: { tr: 'Seri haberleşme', en: 'Serial link', no: 'Seriekommunikasjon' },
        text: { tr: 'Arduino ile bilgisayar 9600 baud seri bağlantı üzerinden konuşuyor.', en: 'The Arduino and the computer talk over a 9600 baud serial connection.', no: 'Arduinoen og PC-en snakker sammen over en seriell tilkobling på 9600 baud.' },
      },
      {
        title: { tr: 'Gol ekranı', en: 'Goal screen', no: 'Målskjerm' },
        text: { tr: 'Kivy ile yapılmış tam ekran bir arayüz ve pygame ile çalan gol sesi.', en: 'A full-screen interface built with Kivy and a goal sound played with pygame.', no: 'Et fullskjermsgrensesnitt laget med Kivy og en mållyd som spilles av med pygame.' },
      },
    ],
    stack: ['Arduino', 'C++', 'Python', 'Kivy', 'pygame', 'HC-SR04'],
    cover: { src: '/projects/goal-detector/circuit.jpg', fit: 'contain', glow: 'radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.5), rgba(255,255,255,0.35) 70%)' },
    gallery: [],
    links: [{ kind: 'github', label: code, href: `${GH}/GoalDetectorSystem` }],
  },
];

export const getDetail = (slug: string) => DETAILS.find((d) => d.slug === slug);
