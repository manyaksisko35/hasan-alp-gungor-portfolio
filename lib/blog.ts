import type { Localized } from '@/lib/i18n';

export type Block =
  | { type: 'p'; text: Localized }
  | { type: 'h2'; text: Localized }
  | { type: 'list'; items: Localized[] }
  | { type: 'code'; lang: string; code: string }
  | { type: 'img'; src: string; caption: Localized };

export interface Post {
  slug: string;
  date: string;
  title: Localized;
  description: Localized;
  tags: string[];
  cover: string;
  /** Project page this post is about. */
  project?: string;
  body: Block[];
}

const p = (tr: string, en: string, no: string): Block => ({ type: 'p', text: { tr, en, no } });
const h2 = (tr: string, en: string, no: string): Block => ({ type: 'h2', text: { tr, en, no } });

export const POSTS: Post[] = [
  {
    slug: 'glass-logo',
    date: '2026-10-23',
    title: {
      tr: 'Logomu kaydırınca parçalanan 3D bir cama nasıl çevirdim',
      en: 'How I turned my logo into 3D glass that breaks apart as you scroll',
      no: 'Hvordan jeg gjorde logoen min om til 3D-glass som går i biter når du scroller',
    },
    description: {
      tr: 'Portfolyo sitemdeki cam logonun arkasındaki işler: logoyu çizgilere çevirmek, yedi parçaya bölmek, cam efektini çalıştırmak ve zayıf telefonlarda kasmamasını sağlamak.',
      en: 'What went into the glass logo on my portfolio: tracing the logo, splitting it into seven pieces, getting the glass to work and keeping it smooth on weak phones.',
      no: 'Hva som ligger bak glasslogoen på porteføljen min: å tegne opp logoen, dele den i sju biter, få glasset til å fungere og få det til å gå jevnt på svake mobiler.',
    },
    tags: ['Three.js', 'React Three Fiber', 'GSAP', 'GLSL'],
    cover: '/blog/glass-logo.jpg',
    body: [
      p(
        'Portfolyomda ilk başta 3D bir oyun kolu vardı. Sonra kendi logomu kullanmaya karar verdim ve şunu istedim: sayfa açıldığında logo sağlam dursun, aşağı kaydırdıkça önce çatlasın, sonra parçalarına ayrılsın ve her parça bir yeteneğimi göstersin. Bu yazıda bunu nasıl yaptığımı anlatıyorum.',
        'My portfolio started with a 3D game controller. Then I decided to use my own logo instead, and I wanted this: when the page opens the logo is intact, as you scroll it first cracks, then breaks apart, and every piece shows one of my skills. This post is about how I built that.',
        'Porteføljen min startet med en 3D-spillkontroller. Så bestemte jeg meg for å bruke min egen logo i stedet, og jeg ville ha det sånn: når siden åpnes, er logoen hel, når du scroller, sprekker den først og går så i biter, og hver bit viser én av ferdighetene mine. I dette innlegget forteller jeg hvordan jeg lagde det.',
      ),
      h2('1. Resimden şekle', '1. From an image to a shape', '1. Fra bilde til form'),
      p(
        'Elimde logonun sadece bir resmi vardı. 3D için ise köşe noktaları gerekiyor. Resmi OpenCV ile siyah beyaza çevirip konturlarını çıkardım, gereksiz noktaları sadeleştirdim ve her şeyi 2,6 birim yüksekliğe ölçekledim. Sonuçta bir dış çizgi ve logonun içindeki sekiz delik kaldı.',
        'All I had was an image of the logo, and 3D needs corner points. I turned the image black and white with OpenCV, traced its contours, simplified away the extra points and scaled everything to 2.6 units tall. What was left was one outer outline and the eight holes inside the logo.',
        'Alt jeg hadde, var et bilde av logoen, og 3D trenger hjørnepunkter. Jeg gjorde bildet svart-hvitt med OpenCV, hentet ut konturene, forenklet bort unødvendige punkter og skalerte alt til 2,6 enheter høyt. Igjen satt jeg med én ytre kontur og de åtte hullene inni logoen.',
      ),
      p(
        'Parçalar için logoyu düz çizgilerle kesmek yapay duruyordu. Bunun yerine zikzaklı "çatlak" çizgileri tanımlayıp logoyu shapely ile bu çizgilerden böldüm. Böylece gerçekten kırılmış gibi görünen yedi parça çıktı: web, C# ve Java, 3D, Python, oyun geliştirme, donanım ve backend.',
        'Cutting the logo with straight lines looked fake, so I drew jagged "crack" lines and split the logo along them with shapely. That gave seven pieces that look actually broken: web, C# and Java, 3D, Python, game development, hardware and backend.',
        'Å kutte logoen med rette linjer så kunstig ut, så jeg tegnet takkete "sprekk"-linjer og delte logoen langs dem med shapely. Det ga sju biter som faktisk ser knust ut: web, C# og Java, 3D, Python, spillutvikling, maskinvare og backend.',
      ),
      p(
        'Her parçayı three.js\'in ExtrudeGeometry\'si ile kalınlaştırdım. Kenarlara bir pah (bevel) ekledim; cam efektinde ışığı yakalayan şey bu yuvarlatılmış kenarlar.',
        "I gave each piece depth with three.js's ExtrudeGeometry and added a bevel to the edges. Those rounded edges are what catch the light in the glass effect.",
        'Jeg ga hver bit dybde med ExtrudeGeometry fra three.js og la til en bevel på kantene. Det er de avrundede kantene som fanger lyset i glasseffekten.',
      ),
      h2('2. Arkasında hiçbir şey olmayan cam', '2. Glass with nothing behind it', '2. Glass uten noe bak seg'),
      p(
        'Cam için drei\'nin MeshTransmissionMaterial\'ını kullandım. Bu materyal, arkasındaki sahneyi bükerek camı taklit ediyor. Ama bir sorun vardı: sitenin gümüş arka planı 3D sahnede değil, CSS ile çiziliyor. 3D sahnenin arkası boş olduğu için cam bükecek bir şey bulamıyor ve gri, mat bir plastik gibi görünüyordu.',
        "For the glass I used drei's MeshTransmissionMaterial, which fakes glass by bending the scene behind it. But there was a problem: the site's silver background isn't in the 3D scene, it's drawn with CSS. The 3D scene behind the logo was empty, so the glass had nothing to bend and looked like flat gray plastic.",
        'Til glasset brukte jeg MeshTransmissionMaterial fra drei, som etterligner glass ved å bøye scenen bak seg. Men det var et problem: den sølvfargede bakgrunnen på siden ligger ikke i 3D-scenen, den er tegnet med CSS. 3D-scenen bak logoen var tom, så glasset hadde ingenting å bøye, og det så ut som flat, grå plast.',
      ),
      p(
        'Çözüm olarak arka planın bir benzerini bir shader ile yeniden çizdim. Her karede logoyu gizleyip bu arka planı ekranda görünmeyen bir tampona (FBO) çiziyorum, sonra bu tamponu materyale "arkanda bu var" diye veriyorum. Cam artık sayfanın arkasındaki gümüş ışığı büküyor. Üstüne kenarları beyaz parlatan ayrı bir fresnel shader\'ı ekledim.',
        "My fix was to redraw a lookalike of the background with a shader. Every frame I hide the logo, draw that background into an off-screen buffer (an FBO), and hand the buffer to the material as what's behind it. Now the glass bends the silver light behind the page. On top of that I added a separate fresnel shader that makes the edges glow white.",
        'Løsningen ble å tegne en kopi av bakgrunnen på nytt med en shader. Hver frame skjuler jeg logoen, tegner bakgrunnen inn i en buffer utenfor skjermen (en FBO) og gir bufferen til materialet som det som ligger bak. Nå bøyer glasset det sølvfargede lyset bak siden. Oppå det la jeg til en egen fresnel-shader som får kantene til å lyse hvitt.',
      ),
      h2('3. Kaydırma hikâyesi', '3. The scroll story', '3. Historien i scrollingen'),
      p(
        'Logonun duruşunu GSAP ScrollTrigger ile sayfanın kaydırma konumuna bağladım. Birkaç anahtar poz var (sağlam, çatlamış, dağılmış, dönmüş) ve kaydırdıkça bu pozlar arasında geçiş yapılıyor. Parçaların üzerindeki etiketler normal HTML; her karede parçanın 3D konumunu ekrana yansıtıp etiketi o noktaya taşıyorum.',
        "I tied the logo's pose to the scroll position with GSAP ScrollTrigger. There are a few key poses (intact, cracked, exploded, turned) and scrolling moves between them. The labels on the pieces are plain HTML: every frame I project the piece's 3D position onto the screen and move the label there.",
        'Jeg koblet stillingen til logoen til scrollposisjonen med GSAP ScrollTrigger. Det er noen faste stillinger (hel, sprukket, sprengt, snudd), og når du scroller, glir den mellom dem. Etikettene på bitene er vanlig HTML: hver frame projiserer jeg 3D-posisjonen til biten ned på skjermen og flytter etiketten dit.',
      ),
      p(
        'En sinir bozucu hata da burada çıktı: sayfanın en üstüne geri dönünce logo kayboluyordu. Sebebi, ScrollTrigger\'ın başlangıç noktasını "top top" yapmamdı. Kaydırma 0\'dayken tetikleyici aktif sayılmıyordu, ben de aktif değilken çizimi durduruyordum. Başlangıcı "top bottom" yapınca düzeldi.',
        'The most annoying bug showed up here: scrolling back to the very top made the logo disappear. The cause was setting the ScrollTrigger start to "top top". At scroll 0 the trigger wasn\'t considered active, and I stopped rendering while it was inactive. Changing the start to "top bottom" fixed it.',
        'Den mest irriterende buggen dukket opp her: når jeg scrollet helt tilbake til toppen, forsvant logoen. Grunnen var at jeg hadde satt start på ScrollTrigger til "top top". Ved scroll 0 ble ikke triggeren regnet som aktiv, og jeg stoppet renderingen når den ikke var aktiv. Det løste seg da jeg endret start til "top bottom".',
      ),
      h2('4. Zayıf telefonlar', '4. Weak phones', '4. Svake mobiler'),
      p(
        'Bu cam efekti ağır. Bu yüzden site açılırken cihaza bakıp üç kaliteden birini seçiyor:',
        'This glass effect is heavy, so when the site opens it looks at the device and picks one of three quality levels:',
        'Glasseffekten er tung, så når siden åpnes, sjekker den enheten og velger ett av tre kvalitetsnivåer:',
      ),
      {
        type: 'list',
        items: [
          { tr: 'Yüksek: tam cam efekti, daha keskin görüntü', en: 'High: the full glass effect at a sharper resolution', no: 'Høy: full glasseffekt med skarpere oppløsning' },
          { tr: 'Orta: telefonlar ve 4 GB veya daha az belleği olan cihazlar için, cam daha az örnekle çiziliyor', en: 'Medium: for phones and devices with 4 GB of memory or less; the glass uses fewer samples', no: 'Middels: for mobiler og enheter med 4 GB minne eller mindre; glasset bruker færre samples' },
          { tr: 'Hafif: veri tasarrufu açıksa ya da cihaz çok zayıfsa; cam efekti yerine sade, yarı saydam bir malzeme', en: 'Lite: when data saver is on or the device is very weak; a simple translucent material instead of the glass effect', no: 'Lett: når datasparing er på eller enheten er veldig svak; et enkelt, gjennomskinnelig materiale i stedet for glasseffekten' },
        ],
      },
      p(
        'Seçim yanlış çıkarsa diye site birkaç saniye sonra kare hızını izlemeye başlıyor. Saniyede 30 karenin altında kalırsa kendiliğinden bir alt kaliteye iniyor.',
        'In case that guess is wrong, after a few seconds the site starts watching the frame rate, and if it stays under 30 frames per second it steps down a level on its own.',
        'I tilfelle gjetningen er feil, begynner siden å følge med på bildefrekvensen etter noen sekunder, og hvis den ligger under 30 bilder per sekund, går den ned et nivå av seg selv.',
      ),
      {
        type: 'code',
        lang: 'ts',
        code: `function detect(): Quality {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const memory = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 8;
  if (nav.connection?.saveData || memory <= 2 || cores <= 2) return 'lite';
  if (matchMedia('(pointer: coarse)').matches || memory <= 4 || cores <= 4) return 'medium';
  return 'high';
}`,
      },
      h2('5. Fareyle dalgalanan cam', '5. Glass that ripples under the cursor', '5. Glass som bølger under musepekeren'),
      p(
        'Son olarak, fare logonun üzerine gelince camın dalgalanmasını istedim. Fareden bir ışın gönderip logoya çarpıp çarpmadığına bakıyorum. Çarpıyorsa arka plan shader\'ında imlecin etrafındaki koordinatları bir sinüs dalgasıyla kaydırıyorum. Cam bu bükülmüş arka planı kırdığı için dalga camın içinde görünüyor.',
        "Finally, I wanted the glass to ripple when the cursor is over the logo. I cast a ray from the pointer and check whether it hits the logo. If it does, I push the coordinates around the cursor with a sine wave in the background shader. Since the glass refracts that warped background, the ripple shows up inside the glass.",
        'Til slutt ville jeg at glasset skulle bølge seg når musepekeren er over logoen. Jeg sender en stråle fra pekeren og sjekker om den treffer logoen. Gjør den det, forskyver jeg koordinatene rundt pekeren med en sinusbølge i bakgrunns-shaderen. Siden glasset bryter lyset fra den forvrengte bakgrunnen, dukker bølgen opp inni glasset.',
      ),
      {
        type: 'code',
        lang: 'glsl',
        code: `vec2 toMouse = (uv - uMouse) * vec2(uAspect, 1.0);
float dist = length(toMouse);
float wave = sin(dist * 70.0 - uTime * 7.0) * exp(-dist * 7.0) * uHover;
uv += normalize(toMouse + 1e-5) * wave * 0.03;`,
      },
      p(
        'Sonucu görmek için sitenin ana sayfasını açıp aşağı kaydırman yeterli. Kodun hepsi GitHub\'da açık.',
        "To see the result, just open the home page and scroll down. All the code is open on GitHub.",
        'Vil du se resultatet, er det bare å åpne forsiden og scrolle ned. All koden ligger åpent på GitHub.',
      ),
    ],
  },
  {
    slug: 'locagen-placeholders',
    date: '2026-10-23',
    title: {
      tr: 'Oyun metinlerini {değişkenleri} bozmadan çevirmek: LocaGen nasıl çalışıyor',
      en: 'Translating game text without breaking {placeholders}: how LocaGen works',
      no: 'Oversette spilltekst uten å ødelegge {plassholdere}: slik fungerer LocaGen',
    },
    description: {
      tr: 'Makine çevirisi oyun dosyalarındaki {player} ve %d gibi değişkenleri bozuyor. LocaGen\'de bunu nasıl çözdüğümü ve PRO sürümde Gemini\'yi nasıl kullandığımı anlatıyorum.',
      en: 'Machine translation breaks placeholders like {player} and %d in game files. Here is how I solved that in LocaGen and how the PRO version uses Gemini.',
      no: 'Maskinoversettelse ødelegger plassholdere som {player} og %d i spillfiler. Her er hvordan jeg løste det i LocaGen, og hvordan PRO-versjonen bruker Gemini.',
    },
    tags: ['Python', 'PHP', 'Gemini API', 'Localization'],
    cover: '/projects/locagen/pro.jpg',
    project: 'locagen',
    body: [
      p(
        'Oyunlardaki metinler genelde bir JSON dosyasında anahtar ve değer olarak durur. Oyunu başka bir dile çevirmek için bu dosyadaki değerleri çevirmek yeterli gibi görünür. Ben de ilk başta öyle düşündüm, sonra değişkenlerle karşılaştım.',
        "Game text usually lives in a JSON file as keys and values, and translating a game looks as simple as translating those values. That's what I thought at first, until I ran into placeholders.",
        'Spilltekst ligger som regel i en JSON-fil som nøkler og verdier, og å oversette et spill ser like enkelt ut som å oversette de verdiene. Det trodde jeg også først, helt til jeg støtte på plassholdere.',
      ),
      {
        type: 'code',
        lang: 'json',
        code: `{
  "welcome": "Welcome back, {player}!",
  "coins": "You have %d coins",
  "warning": "<b>Danger:</b> low health"
}`,
      },
      p(
        'Bu metni doğrudan bir çeviri servisine verirsen {player} bazen {oyuncu} olarak çevriliyor, %d bazen "% d" oluyor, <b> etiketi bazen kayboluyor. Oyun da bu değişkenleri bulamayınca ya yanlış metin gösteriyor ya da hata veriyor.',
        "If you send that straight to a translation service, {player} sometimes comes back translated, %d turns into \"% d\" and the <b> tag goes missing. The game then can't find its placeholders and either shows the wrong text or throws an error.",
        'Sender du det rett til en oversettelsestjeneste, kommer {player} av og til tilbake oversatt, %d blir til "% d" og <b>-taggen forsvinner. Da finner ikke spillet plassholderne sine, og enten viser det feil tekst eller så kaster det en feil.',
      ),
      h2('Değişkenleri saklamak', 'Hiding the placeholders', 'Gjemme plassholderne'),
      p(
        'Çözümüm basit: çeviriden önce bütün değişkenleri bulup yerlerine çevirinin dokunmayacağı [VAR_0], [VAR_1] gibi işaretler koyuyorum. Çeviri bitince bu işaretleri asıl değişkenlerle değiştiriyorum. Çeviri servisleri bazen işareti küçük harfe çevirdiği için [var_0] halini de kontrol ediyorum.',
        "My fix is simple: before translating, I find every placeholder and swap it for a marker like [VAR_0] or [VAR_1] that the translator leaves alone. When the translation comes back, I swap the markers back. Translators sometimes lowercase the marker, so I also check for [var_0].",
        'Løsningen min er enkel: før jeg oversetter, finner jeg alle plassholderne og bytter dem ut med en markør som [VAR_0] eller [VAR_1], som oversetteren lar være i fred. Når oversettelsen kommer tilbake, bytter jeg markørene tilbake. Oversettere gjør av og til markøren om til små bokstaver, så jeg sjekker også etter [var_0].',
      ),
      {
        type: 'code',
        lang: 'python',
        code: `PATTERN = re.compile(r'(\\{.*?\\}|<.*?>|%[sd])')

def translate(text, target):
    placeholders = {}
    for i, match in enumerate(PATTERN.findall(text)):
        marker = f"[VAR_{i}]"
        placeholders[marker] = match
        text = text.replace(match, marker)

    result = GoogleTranslator(source="auto", target=target).translate(text)

    for marker, original in placeholders.items():
        result = result.replace(marker, original).replace(marker.lower(), original)
    return result`,
      },
      p(
        'Anahtarlara hiç dokunmuyorum; sadece değerler çevriliyor. Dosya düz bir anahtar-değer listesi de olabilir, nesnelerden oluşan bir liste de; ikisini de destekliyorum.',
        "Keys are never touched; only values get translated. The file can be a flat key-value map or a list of objects, and both work.",
        'Nøklene rører jeg aldri; det er bare verdiene som blir oversatt. Filen kan være en flat liste med nøkler og verdier eller en liste med objekter, og begge deler fungerer.',
      ),
      h2('Ücretsiz sürüm', 'The free version', 'Gratisversjonen'),
      p(
        'Ücretsiz sürüm Python ile yazılmış bir masaüstü uygulaması. Arayüzü CustomTkinter ile terminal görünümünde tasarladım, çeviri için deep-translator üzerinden Google Translate kullanıyorum. Çeviri ayrı bir iş parçacığında çalıştığı için arayüz donmuyor ve ilerleme çubuğu canlı doluyor. Uygulama açılışta GitHub\'daki son sürümü kontrol ediyor ve yeni bir sürüm varsa kendisi indiriyor.',
        "The free version is a desktop app written in Python. I designed its terminal-style interface with CustomTkinter and use Google Translate through deep-translator. Translation runs on a separate thread, so the interface doesn't freeze and the progress bar fills live. On launch the app checks GitHub for the latest release and downloads it if there's a new one.",
        'Gratisversjonen er en desktop-app skrevet i Python. Jeg lagde grensesnittet i terminalstil med CustomTkinter og bruker Google Translate gjennom deep-translator. Oversettelsen kjører i en egen tråd, så grensesnittet fryser ikke, og fremdriftslinjen fylles opp mens det skjer. Når appen starter, sjekker den GitHub etter siste versjon og laster den ned hvis det finnes en ny.',
      ),
      h2('PRO sürüm: Gemini ile oyuncu dili', 'The PRO version: Gemini that talks like a gamer', 'PRO-versjonen: Gemini som snakker som en gamer'),
      p(
        'Google Translate kelimeleri doğru çeviriyor ama oyun dilini bilmiyor. "Health potion" gibi terimler robotik çıkıyor. PRO sürümde çeviriyi Gemini 2.5 Flash\'a yaptırıyorum. Gemini\'ye kendini bir oyun yerelleştirme uzmanı olarak düşünmesini, terimleri bir oyuncunun kullanacağı şekilde çevirmesini, anahtarlara asla dokunmamasını ve sadece geçerli JSON döndürmesini söylüyorum.',
        "Google Translate gets the words right, but it doesn't know how games talk; terms like \"health potion\" come out robotic. In the PRO version Gemini 2.5 Flash does the translation. I tell it to act as a game localization expert, to translate terms the way a player would say them, to never touch the keys and to return nothing but valid JSON.",
        'Google Translate får ordene riktig, men skjønner ikke hvordan spill snakker; uttrykk som "health potion" blir helt robotaktige. I PRO-versjonen er det Gemini 2.5 Flash som oversetter. Jeg ber den opptre som ekspert på spillokalisering, oversette uttrykk slik en spiller faktisk ville sagt dem, aldri røre nøklene og ikke sende tilbake noe annet enn gyldig JSON.',
      ),
      p(
        'Yapay zekâyla çalışırken öğrendiğim en önemli şey, cevaba körü körüne güvenmemek oldu. Gemini\'den gelen metni her zaman JSON olarak çözümlemeyi deniyorum; geçersizse kullanıcıya bozuk bir dosya vermek yerine hata gösteriyorum. PRO sürüm PHP ve MySQL ile çalışıyor: kullanıcı girişi, çeviri geçmişi ve bir yönetici paneli var.',
        "The biggest lesson from working with an AI model was not to trust its answer blindly. I always try to parse what Gemini sends back as JSON, and if it's invalid I show an error instead of handing the user a broken file. The PRO version runs on PHP and MySQL, with user accounts, translation history and an admin panel.",
        'Det viktigste jeg lærte av å jobbe med en AI-modell, var å ikke stole blindt på svaret. Jeg prøver alltid å parse det Gemini sender tilbake som JSON, og er det ugyldig, viser jeg en feilmelding i stedet for å gi brukeren en ødelagt fil. PRO-versjonen kjører på PHP og MySQL, med brukerkontoer, oversettelseshistorikk og et adminpanel.',
      ),
    ],
  },
  {
    slug: 'cs2-major-hud',
    date: '2026-10-23',
    title: {
      tr: 'CS2 için Major tarzı canlı yayın arayüzü: Game State Integration ile',
      en: 'A Major-style live broadcast overlay for CS2 with Game State Integration',
      no: 'Et overlay i Major-stil for direktesendinger i CS2 med Game State Integration',
    },
    description: {
      tr: 'Counter-Strike 2\'nin Game State Integration özelliğiyle maç verisini nasıl aldığımı, Python sunucusunu ve oyunun vermediği killfeed\'i nasıl çıkardığımı anlatıyorum.',
      en: "How I get live match data out of Counter-Strike 2 with Game State Integration, the Python server in between, and how I work out the killfeed the game doesn't send.",
      no: 'Hvordan jeg henter live kampdata ut av Counter-Strike 2 med Game State Integration, Python-serveren i midten, og hvordan jeg regner ut killfeeden som spillet ikke sender.',
    },
    tags: ['Python', 'Flask', 'JavaScript', 'CS2'],
    cover: '/projects/cs2-hud/hud.jpg',
    project: 'cs2-major-hud',
    body: [
      p(
        'Major turnuvalarını izlerken ekrandaki yayın arayüzü hep ilgimi çekti: oyuncuların canı, parası, silahları, killfeed, bomba sayacı. Bunun benzerini kendi maçlarım için yapmak istedim.',
        'Watching Major tournaments, the broadcast overlay always caught my eye: every player\'s health, money and weapons, the killfeed, the bomb timer. I wanted to build something like it for my own matches.',
        'Når jeg så på Major-turneringer, la jeg alltid merke til overlayet i sendingen: HP, penger og våpen for hver spiller, killfeeden, bombetimeren. Jeg ville lage noe lignende til mine egne kamper.',
      ),
      h2('Oyundan veri almak', 'Getting data out of the game', 'Hente data ut av spillet'),
      p(
        'CS2\'nin Game State Integration (GSI) diye bir özelliği var. Oyunun cfg klasörüne bir dosya koyuyorsun, oyun da maç sırasında istediğin verileri JSON olarak verdiğin adrese gönderiyor. Benim dosyamda verinin her 0,1 saniyede bir yerel sunucuma gönderilmesini istiyorum:',
        "CS2 has a feature called Game State Integration (GSI). You put a file in the game's cfg folder, and during a match the game sends the data you asked for as JSON to the address you gave it. Mine asks for updates every 0.1 seconds, sent to a local server:",
        'CS2 har en funksjon som heter Game State Integration (GSI). Du legger en fil i cfg-mappen til spillet, og under en kamp sender spillet dataene du ba om som JSON til adressen du har oppgitt. Min fil ber om oppdateringer hvert 0,1 sekund, sendt til en lokal server:',
      ),
      {
        type: 'code',
        lang: 'cfg',
        code: `"Manyaksisko35 GSI v1"
{
 "uri" "http://127.0.0.1:3000"
 "throttle" "0.1"
 "data"
 {
   "map"                    "1"
   "round"                  "1"
   "player_state"           "1"
   "allplayers_state"       "1"
   "allplayers_weapons"     "1"
   "allplayers_match_stats" "1"
   "phase_countdowns"       "1"
 }
}`,
      },
      h2('Arada bir Python sunucusu', 'A Python server in between', 'En Python-server i midten'),
      p(
        'Oyunun gönderdiği JSON çok büyük ve dağınık. Python ile yazdığım küçük bir Flask sunucusu bu veriyi alıp sadeleştiriyor: skorlar, raunt, bomba durumu, kalan süre ve her oyuncu için isim, can, para, ana silah, el bombaları ve K/D. Ana silahı bulurken bıçağı, C4\'ü ve tabancayı atlıyorum; oyuncunun ana silahı yoksa tabancasını gösteriyorum. Arayüz bu sade veriyi ayrı bir adresten çekiyor.',
        "The JSON the game sends is big and messy. A small Flask server I wrote in Python takes it and boils it down: scores, the round, the bomb state, the time left, and for every player their name, health, money, main weapon, grenades and K/D. To find the main weapon I skip the knife, the C4 and the pistol, and fall back to the pistol if there's nothing else. The overlay pulls this clean data from a separate address.",
        'JSON-en spillet sender, er stor og rotete. En liten Flask-server jeg skrev i Python, tar imot den og koker den ned: stillingen, runden, bombestatus, tid igjen, og for hver spiller navn, HP, penger, hovedvåpen, granater og K/D. For å finne hovedvåpenet hopper jeg over kniven, C4-en og pistolen, og viser pistolen hvis det ikke er noe annet. Overlayet henter disse ryddige dataene fra en egen adresse.',
      ),
      h2('Titremeyen bir arayüz', 'An overlay that doesn\'t flicker', 'Et overlay som ikke flimrer'),
      p(
        'Arayüz HTML, CSS ve JavaScript. Sunucudan saniyede 10 kez veri çekiyor. İlk denemede her seferinde bütün paneli yeniden çiziyordum ve yayında titriyordu. Şimdi her alanı sadece değeri gerçekten değiştiyse güncelliyorum; can barları da CSS geçişiyle yumuşakça kayıyor.',
        "The overlay is HTML, CSS and JavaScript, and it pulls from the server 10 times a second. My first version redrew every panel each time and it flickered on stream. Now each field only updates when its value actually changes, and the health bars slide smoothly with a CSS transition.",
        'Overlayet er HTML, CSS og JavaScript, og det henter fra serveren 10 ganger i sekundet. Den første versjonen min tegnet alle panelene på nytt hver gang, og det flimret på streamen. Nå oppdateres hvert felt bare når verdien faktisk endrer seg, og HP-barene glir jevnt med en CSS-transition.',
      ),
      h2('Oyunun vermediği killfeed', "The killfeed the game doesn't send", 'Killfeeden spillet ikke sender'),
      p(
        'GSI kimin kimi vurduğunu doğrudan söylemiyor. Ben de her güncellemede oyuncuların kill ve ölüm sayılarını bir önceki durumla karşılaştırıyorum. Kill sayısı artanlar katil, ölüm sayısı artanlar kurban oluyor; ikisini eşleştirip killfeed\'e silah ikonuyla ekliyorum. Satırlar beş saniye sonra kayboluyor.',
        "GSI doesn't say who killed whom. So on every update I compare each player's kills and deaths with the previous state. Players whose kills went up are the killers, players whose deaths went up are the victims; I pair them up and add them to the killfeed with the weapon icon. Each line fades out after five seconds.",
        'GSI sier ikke hvem som drepte hvem. Så ved hver oppdatering sammenligner jeg kills og deaths for hver spiller med forrige tilstand. De som har fått flere kills, er drapsmennene, og de som har fått flere deaths, er ofrene; jeg parer dem og legger dem inn i killfeeden med våpenikonet. Hver linje forsvinner etter fem sekunder.',
      ),
      {
        type: 'code',
        lang: 'js',
        code: `players.forEach((p) => {
  const before = previous[p.name];
  if (before && p.kills > before.kills) killers.push(p);
  if (before && p.deaths > before.deaths) victims.push(p);
});
for (let i = 0; i < Math.max(killers.length, victims.length); i++) {
  addKillItem(killers[i], victims[i]);
}`,
      },
      h2('Bomba sayacı', 'The bomb timer', 'Bombetimeren'),
      p(
        'Bomba kurulunca normal raunt süresi kayboluyor ve yerine 40 saniyelik kırmızı bir bomba çubuğu geliyor. Imha başlayınca çubuk beyaza dönüyor. Oyun imha süresini doğrudan vermediği için kalan süreye bakıyorum: 5,5 saniyeden azsa oyuncunun kiti var demektir ve çubuğu 5 saniyeye göre, yoksa 10 saniyeye göre dolduruyorum.',
        "When the bomb is planted, the round timer gives way to a 40-second red bomb bar. When a defuse starts, the bar turns white. The game doesn't say how long the defuse takes, so I look at the time left: under 5.5 seconds means the player has a kit and the bar runs over 5 seconds, otherwise over 10.",
        'Når bomben blir plantet, byttes rundetimeren ut med en rød bombelinje på 40 sekunder. Når noen begynner å defuse, blir linjen hvit. Spillet sier ikke hvor lang tid defusen tar, så jeg ser på tiden som er igjen: under 5,5 sekunder betyr at spilleren har kit, og da går linjen over 5 sekunder, ellers over 10.',
      ),
      p(
        'Projenin kodu GitHub\'da açık ve yapılışını YouTube kanalımda da anlattım.',
        'The code is open on GitHub, and I also walked through building it on my YouTube channel.',
        'Koden ligger åpent på GitHub, og jeg har også gått gjennom hvordan jeg bygde det på YouTube-kanalen min.',
      ),
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
