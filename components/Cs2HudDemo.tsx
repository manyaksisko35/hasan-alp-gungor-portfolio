'use client';

import { useEffect, useRef, useState } from 'react';
import { useT } from '@/lib/i18n';

// The HUD is laid out for a 1920×1080 stream; the frame scales it down to fit.
const W = 1920;
const H = 1080;

export default function Cs2HudDemo() {
  const t = useT();
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const send = (msg: 'pause' | 'play' | 'restart') => frame.current?.contentWindow?.postMessage(msg, window.location.origin);
  const toggle = () => {
    send(paused ? 'play' : 'pause');
    setPaused(!paused);
  };

  return (
    <section className="mt-16 lg:mt-24">
      <p className="ui-label ui-label--plain mb-4">{t({ tr: 'Canlı demo', en: 'Live demo', no: 'Live demo' })}</p>
      <h2 className="text-3xl lg:text-4xl font-semibold tracking-[-0.035em] leading-tight">
        {t({ tr: 'HUD, örnek bir maçla ', en: 'The HUD, running ', no: 'HUD-en, kjørt ' })}
        <span className="ui-accent">{t({ tr: 'canlı çalışıyor.', en: 'a sample match.', no: 'med en eksempelkamp.' })}</span>
      </h2>
      <p className="ui-lead mt-4 max-w-2xl">
        {t({
          tr: 'Bu, projenin kendi HTML ve JavaScript kodu. Python sunucusunun yerine tarayıcıda örnek bir maç oynatılıyor: can barları düşüyor, killfeed akıyor, bomba kuruluyor; bir rauntta imha ediliyor, diğerinde patlıyor. Oyuncu adları uydurma.',
          en: "This is the project's own HTML and JavaScript. Instead of the Python server, a sample match plays in your browser: health bars drop, the killfeed fills, the bomb gets planted and is defused one round and explodes the next. Player names are made up.",
          no: 'Dette er prosjektets egen HTML og JavaScript. I stedet for Python-serveren spilles en eksempelkamp i nettleseren: HP-barene synker, killfeeden fylles, bomben plantes og blir desarmert i én runde og eksploderer i den neste. Spillernavnene er oppdiktet.',
        })}
      </p>

      <div
        ref={box}
        className="relative mt-8 aspect-video w-full overflow-hidden rounded-[24px] ring-1 ring-white/15"
        style={{ background: 'radial-gradient(90% 80% at 50% 45%, #4a4e57 0%, #23252a 55%, #121315 100%)' }}
      >
        {scale > 0 && (
          <iframe
            ref={frame}
            src="/demos/cs2-hud/index.html"
            title={t({ tr: 'CS2 Major HUD demosu', en: 'CS2 Major HUD demo', no: 'CS2 Major HUD-demo' })}
            loading="lazy"
            className="absolute left-0 top-0 origin-top-left border-0 pointer-events-none"
            style={{ width: W, height: H, transform: `scale(${scale})`, colorScheme: 'normal' }}
          />
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={toggle} className="ui-btn ui-btn--ghost !py-2 !px-4 !text-sm">
          {paused ? t({ tr: 'Devam et', en: 'Play', no: 'Spill av' }) : t({ tr: 'Durdur', en: 'Pause', no: 'Pause' })}
        </button>
        <button type="button" onClick={() => send('restart')} className="ui-btn ui-btn--ghost !py-2 !px-4 !text-sm">
          {t({ tr: 'Baştan başlat', en: 'Restart', no: 'Start på nytt' })}
        </button>
      </div>
    </section>
  );
}
