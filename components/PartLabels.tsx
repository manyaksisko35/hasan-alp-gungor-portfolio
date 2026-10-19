'use client';

import { PARTS } from '@/lib/data';
import { useT } from '@/lib/i18n';

/** Plain DOM labels for the exploded logo; Logo moves them every frame. */
export default function PartLabels() {
  const t = useT();
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTS.map((p, i) => (
        <div key={p.id} id={`part-label-${p.id}`} className="part-label absolute left-0 top-0">
          <span className="part-label__num">{String(i + 1).padStart(2, '0')}</span>
          <span>
            <b>{t(p.title)}</b>
            <small>{t(p.text)}</small>
          </span>
        </div>
      ))}
    </div>
  );
}
