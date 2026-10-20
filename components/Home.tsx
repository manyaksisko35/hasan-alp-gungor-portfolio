'use client';

import dynamic from 'next/dynamic';
import About from '@/components/About';
import Contact from '@/components/Contact';
import HeadlineReveal from '@/components/HeadlineReveal';
import Hero from '@/components/Hero';
import Loader from '@/components/Loader';
import MoreWork from '@/components/MoreWork';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import Reveal from '@/components/Reveal';
import Skills from '@/components/Skills';
import SmoothScroll from '@/components/SmoothScroll';
import Videos from '@/components/Videos';
import Work from '@/components/Work';
import { useT } from '@/lib/i18n';

// WebGL only exists in the browser.
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Home() {
  const t = useT();
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-black focus:font-semibold"
      >
        {t({ tr: 'İçeriğe geç', en: 'Skip to content' })}
      </a>
      <SmoothScroll />
      <Loader />
      <Navbar />
      <ScrollProgress />
      <HeadlineReveal />
      <Reveal />

      <div aria-hidden className="liquid-bg">
        <span />
        <span />
        <span />
        <span />
      </div>

      <main className="relative w-full">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Scene />
        </div>

        <div id="scene-track" className="relative z-10">
          <Hero />
          <About />
          <Skills />
        </div>

        <Work />
        <MoreWork />
        <Videos />
        <Contact />
      </main>
    </>
  );
}
