'use client';

import { Fragment, useMemo, useState } from 'react';
import { useT, type Localized } from '@/lib/i18n';

// The same rule LocaGen uses: {placeholders}, <tags>, %s and %d are kept out of the translation.
const PLACEHOLDER = /(\{.*?\}|<.*?>|%[sd])/g;

type Target = 'tr' | 'de' | 'no' | 'es';

const TARGETS: { id: Target; label: string }[] = [
  { id: 'tr', label: 'Türkçe' },
  { id: 'de', label: 'Deutsch' },
  { id: 'no', label: 'Norsk' },
  { id: 'es', label: 'Español' },
];

/** Prewritten translations of the samples, with markers in place, and what a plain translator tends to return. */
const SAMPLES: { source: string; translated: Record<Target, string>; broken: Record<Target, string> }[] = [
  {
    source: 'Welcome back, {player}!',
    translated: { tr: 'Tekrar hoş geldin, [VAR_0]!', de: 'Willkommen zurück, [VAR_0]!', no: 'Velkommen tilbake, [VAR_0]!', es: '¡Bienvenido de nuevo, [VAR_0]!' },
    broken: { tr: 'Tekrar hoş geldin, {oyuncu}!', de: 'Willkommen zurück, {Spieler}!', no: 'Velkommen tilbake, {spiller}!', es: '¡Bienvenido de nuevo, {jugador}!' },
  },
  {
    source: 'You have %d coins left.',
    translated: { tr: '[VAR_0] altının kaldı.', de: 'Du hast noch [VAR_0] Münzen.', no: 'Du har [VAR_0] mynter igjen.', es: 'Te quedan [VAR_0] monedas.' },
    broken: { tr: '% d altının kaldı.', de: 'Du hast noch % d Münzen.', no: 'Du har % d mynter igjen.', es: 'Te quedan % d monedas.' },
  },
  {
    source: '<b>Warning:</b> your health is low.',
    translated: {
      tr: '[VAR_0]Uyarı:[VAR_1] canın azaldı.',
      de: '[VAR_0]Warnung:[VAR_1] deine Gesundheit ist niedrig.',
      no: '[VAR_0]Advarsel:[VAR_1] helsen din er lav.',
      es: '[VAR_0]Advertencia:[VAR_1] tu salud está baja.',
    },
    broken: {
      tr: 'Uyarı: canın azaldı.',
      de: 'Warnung: deine Gesundheit ist niedrig.',
      no: 'Advarsel: helsen din er lav.',
      es: 'Advertencia: tu salud está baja.',
    },
  },
  {
    source: '{player} found a {item}!',
    translated: { tr: '[VAR_0] bir [VAR_1] buldu!', de: '[VAR_0] hat [VAR_1] gefunden!', no: '[VAR_0] fant [VAR_1]!', es: '¡[VAR_0] encontró [VAR_1]!' },
    broken: { tr: '{oyuncu} bir {eşya} buldu!', de: '{Spieler} hat {Gegenstand} gefunden!', no: '{spiller} fant {gjenstand}!', es: '¡{jugador} encontró {objeto}!' },
  },
];

function mask(text: string) {
  const found = text.match(PLACEHOLDER) ?? [];
  let masked = text;
  found.forEach((p, i) => {
    masked = masked.replace(p, `[VAR_${i}]`);
  });
  return { found, masked };
}

const restore = (text: string, found: string[]) => found.reduce((t, p, i) => t.replace(`[VAR_${i}]`, p), text);

/** Text with its placeholders (or markers) picked out. */
function Marked({ text, pattern, tone }: { text: string; pattern: RegExp; tone: 'found' | 'marker' | 'kept' | 'broken' }) {
  const parts = text.split(pattern);
  const style = {
    found: 'bg-sky-400/15 text-sky-200 ring-sky-300/30',
    marker: 'bg-white/10 text-zinc-100 ring-white/20',
    kept: 'bg-emerald-400/15 text-emerald-200 ring-emerald-300/30',
    broken: 'bg-rose-400/15 text-rose-200 ring-rose-300/30 line-through decoration-rose-300/60',
  }[tone];
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className={`rounded-md px-1 py-0.5 ring-1 font-semibold ${style}`}>
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

const MARKER = /(\[VAR_\d+\])/g;
const BROKEN = /(\{[^}]*\}|% d)/g;

function Step({ n, title, children, delay }: { n: number; title: Localized; children: React.ReactNode; delay: number }) {
  const t = useT();
  return (
    <li className="ui-card p-5 lg:p-6 animate-[demo-in_0.5s_ease_both]" style={{ animationDelay: `${delay}ms` }}>
      <p className="font-mono text-[0.7rem] text-white/55">
        {String(n).padStart(2, '0')} · {t(title)}
      </p>
      <p className="mt-3 font-mono text-sm lg:text-base leading-relaxed text-white/85 break-words">{children}</p>
    </li>
  );
}

export default function LocaGenDemo() {
  const t = useT();
  const [sample, setSample] = useState(0);
  const [target, setTarget] = useState<Target>('tr');
  const [custom, setCustom] = useState('Hi {player}, you earned %d XP and a <i>rare</i> item!');

  const s = SAMPLES[sample];
  const { found, masked } = useMemo(() => mask(s.source), [s]);
  const translated = s.translated[target];
  const final = restore(translated, found);
  const live = useMemo(() => mask(custom), [custom]);
  const key = `${sample}-${target}`;

  return (
    <section className="mt-16 lg:mt-24">
      <p className="ui-label ui-label--plain mb-4">{t({ tr: 'Canlı demo', en: 'Live demo', no: 'Live demo' })}</p>
      <h2 className="text-3xl lg:text-4xl font-semibold tracking-[-0.035em] leading-tight">
        {t({ tr: 'Değişkenler ', en: 'Watch the placeholders ', no: 'Se plassholderne ' })}
        <span className="ui-accent">{t({ tr: 'nasıl korunuyor?', en: 'survive translation.', no: 'overleve oversettelsen.' })}</span>
      </h2>
      <p className="ui-lead mt-4 max-w-2xl">
        {t({
          tr: 'Bir oyun metni ve hedef dil seç. LocaGen\'in her adımını ve aynı metnin LocaGen olmadan nasıl bozulduğunu gör.',
          en: 'Pick a game string and a target language to see each step LocaGen takes, and how the same string breaks without it.',
          no: 'Velg en spilltekst og et målspråk for å se hvert steg LocaGen tar, og hvordan den samme teksten går i stykker uten den.',
        })}
      </p>

      <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t({ tr: 'Örnek metin', en: 'Sample string', no: 'Eksempeltekst' })}>
          {SAMPLES.map((x, i) => (
            <button
              key={x.source}
              type="button"
              onClick={() => setSample(i)}
              aria-pressed={sample === i}
              className={`rounded-full px-3.5 py-2 font-mono text-xs transition-colors ${sample === i ? 'bg-white text-black' : 'bg-white/[0.06] text-white/70 hover:text-white'}`}
            >
              {x.source}
            </button>
          ))}
        </div>
        <div className="flex rounded-full bg-white/[0.06] p-1 text-xs self-start" role="group" aria-label={t({ tr: 'Hedef dil', en: 'Target language', no: 'Målspråk' })}>
          {TARGETS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setTarget(l.id)}
              aria-pressed={target === l.id}
              className={`rounded-full px-3 py-1.5 transition-colors ${target === l.id ? 'bg-white/20 text-white' : 'text-white/55 hover:text-white'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <ol key={key} className="mt-6 grid md:grid-cols-2 gap-3 lg:gap-4">
        <Step n={1} title={{ tr: 'Değişkenler bulunur', en: 'Find the placeholders', no: 'Finn plassholderne' }} delay={0}>
          <Marked text={s.source} pattern={PLACEHOLDER} tone="found" />
        </Step>
        <Step n={2} title={{ tr: 'İşaretlerle değiştirilir', en: 'Swap them for markers', no: 'Bytt dem ut med markører' }} delay={150}>
          <Marked text={masked} pattern={MARKER} tone="marker" />
        </Step>
        <Step n={3} title={{ tr: 'Metin çevrilir, işaretlere dokunulmaz', en: 'Translate; markers stay put', no: 'Oversett; markørene blir stående' }} delay={300}>
          <Marked text={translated} pattern={MARKER} tone="marker" />
        </Step>
        <Step n={4} title={{ tr: 'Değişkenler geri konur', en: 'Put the placeholders back', no: 'Sett plassholderne tilbake' }} delay={450}>
          <Marked text={final} pattern={PLACEHOLDER} tone="kept" />
        </Step>
      </ol>

      <div key={`b-${key}`} className="mt-3 lg:mt-4 rounded-[20px] border border-rose-300/20 bg-rose-500/[0.06] p-5 lg:p-6 animate-[demo-in_0.5s_ease_both]" style={{ animationDelay: '600ms' }}>
        <p className="font-mono text-[0.7rem] text-rose-200/80">
          {t({ tr: 'LocaGen olmadan, doğrudan çeviri', en: 'Without LocaGen, translated directly', no: 'Uten LocaGen, oversatt direkte' })}
        </p>
        <p className="mt-3 font-mono text-sm lg:text-base leading-relaxed text-white/80 break-words">
          <Marked text={s.broken[target]} pattern={BROKEN} tone="broken" />
          {sample === 2 && (
            <span className="ml-2 text-xs text-rose-200/80">{t({ tr: '(<b> etiketi kayboldu)', en: '(the <b> tag is gone)', no: '(<b>-taggen er borte)' })}</span>
          )}
        </p>
      </div>

      <div className="mt-10 ui-card p-5 lg:p-7">
        <label htmlFor="locagen-try" className="font-mono text-[0.7rem] text-white/55">
          {t({ tr: 'Kendi metnini dene', en: 'Try your own string', no: 'Prøv din egen tekst' })}
        </label>
        <input
          id="locagen-try"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          spellCheck={false}
          className="mt-3 w-full rounded-xl bg-black/30 px-4 py-3 font-mono text-sm text-white outline-none ring-1 ring-white/10 focus:ring-white/30"
        />
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          <p className="font-mono text-sm leading-relaxed text-white/85 break-words">
            <Marked text={custom} pattern={PLACEHOLDER} tone="found" />
          </p>
          <p className="font-mono text-sm leading-relaxed text-white/85 break-words">
            <Marked text={live.masked} pattern={MARKER} tone="marker" />
          </p>
        </div>
        <p className="mt-4 text-xs text-white/55">
          {live.found.length
            ? t({
                tr: `${live.found.length} değişken bulundu. Çeviri servisine işaretli hali gider; çeviri gelince işaretler asıl değişkenlerle değiştirilir.`,
                en: `${live.found.length} placeholder(s) found. The version with markers is what goes to the translator; when the translation comes back, the markers are swapped back.`,
                no: `${live.found.length} plassholder(e) funnet. Versjonen med markører er det som sendes til oversetteren; når oversettelsen kommer tilbake, byttes markørene tilbake.`,
              })
            : t({
                tr: 'Değişken bulunamadı. {isim}, <b>, %s veya %d gibi bir şey eklemeyi dene.',
                en: 'No placeholders found. Try adding something like {name}, <b>, %s or %d.',
                no: 'Ingen plassholdere funnet. Prøv å legge til noe som {name}, <b>, %s eller %d.',
              })}
        </p>
      </div>
    </section>
  );
}
