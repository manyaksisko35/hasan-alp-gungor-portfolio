'use client';

import { useSyncExternalStore } from 'react';

/**
 * Rendering tier for the 3D glass.
 * high: full refraction. medium: refraction with fewer samples (phones, tablets).
 * lite: no refraction pass at all (weak devices, or when the frame rate keeps dropping).
 */
export type Quality = 'high' | 'medium' | 'lite';

const ORDER: Quality[] = ['high', 'medium', 'lite'];
const listeners = new Set<() => void>();
let current: Quality | null = null;
/** `?quality=high|medium|lite` pins a tier (handy for testing). */
let pinned = false;

function detect(): Quality {
  const forced = new URLSearchParams(window.location.search).get('quality');
  if (forced === 'high' || forced === 'medium' || forced === 'lite') {
    pinned = true;
    return forced;
  }
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const touch = window.matchMedia('(pointer: coarse)').matches;
  if (nav.connection?.saveData || memory <= 2 || cores <= 2) return 'lite';
  if (touch || memory <= 4 || cores <= 4) return 'medium';
  return 'high';
}

function read(): Quality {
  current ??= detect();
  return current;
}

/** Step down one tier (never back up, so the scene does not flip-flop). */
export function lowerQuality() {
  const q = read();
  if (pinned) return;
  const next = ORDER[Math.min(ORDER.length - 1, ORDER.indexOf(q) + 1)];
  if (next === q) return;
  current = next;
  listeners.forEach((fn) => fn());
}

const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export function useQuality(): Quality {
  return useSyncExternalStore(subscribe, read, () => 'high');
}
