'use client';

import dynamic from 'next/dynamic';
import About from '@/components/About';
import Channels from '@/components/Channels';
import Contact from '@/components/Contact';
import HeadlineReveal from '@/components/HeadlineReveal';
import Hero from '@/components/Hero';
import HeroGlow from '@/components/HeroGlow';
import Loader from '@/components/Loader';
import MoreWork from '@/components/MoreWork';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import SectionDots from '@/components/SectionDots';
import Skills from '@/components/Skills';
import SmoothScroll from '@/components/SmoothScroll';
import Work from '@/components/Work';

// WebGL only exists in the browser.
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:text-black focus:font-semibold"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <Loader />
      <Navbar />
      <ScrollProgress />
      <SectionDots />
      <HeadlineReveal />

      <main className="relative w-full bg-[#030303]">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <HeroGlow />
          <Scene />
        </div>

        <div id="scene-track" className="relative z-10">
          <Hero />
          <About />
          <Skills />
        </div>

        <Work />
        <MoreWork />
        <Channels />
        <Contact />
      </main>
    </>
  );
}
