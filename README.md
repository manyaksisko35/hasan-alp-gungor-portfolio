# Hasan Alp Güngör — Portfolio

My personal site and portfolio: who I am, my education, skills, projects and videos, with my logo rendered as real-time 3D liquid glass. Scroll and it turns, then comes apart piece by piece, and every piece is one of my skills.

![Hero](docs/screenshots/desktop-hero.jpg)

## Highlights

- **Glass logo in 3D:** the logo is traced into polygons, split into seven pieces and extruded with three.js, then rendered with a refractive glass material (chromatic aberration and a slow liquid distortion).
- **Scroll story:** the logo starts intact, cracks along jagged lines as you scroll, then comes apart with a label pinned to each piece, turns around, and flies away.
- **Drag to spin** the logo in the hero, with inertia and a soft snap back.
- **Interactive glass:** move the cursor over the logo and the glass bends and ripples right where the pointer is.
- **Runs on weak phones too:** the 3D quality picks itself (high, medium or lite) from the device, and steps down on its own if the frame rate drops.
- **Search friendly:** sitemap, robots.txt, structured data that tells search engines who I am, and share images for LinkedIn, WhatsApp and X.
- **My videos:** a selection from my YouTube channel, where I bring CS2 into real life with ESP32 builds. Videos play right on the page.
- **Project pages:** every main project has its own page at `/projeler/<name>` with what I built, how it works, screenshots and links, so each one can also be found on Google.
- **My projects:** a pinned, horizontally scrolling gallery of my S26 Ultra, Buds4 Pro, Watch Ultra2 and Ring concept sites.
- **Turkish, English and Norwegian:** Turkish lives at `/`, English at `/en`, Norwegian at `/no` (project pages at `/projeler/<name>`, `/en/projects/<name>` and `/no/prosjekter/<name>`), so search engines index each language. The navbar switch remembers the choice, and visitors whose browser is in English or Norwegian are sent to that version.
- **404 page:** the logo, broken into pieces.
- **Blog:** posts about how I built my projects at `/blog` (also `/en/blog` and `/no/blog`), also listed on the home page.
- **Analytics:** Vercel Web Analytics and Speed Insights (turn both on in the Vercel dashboard).
- Liquid glass design: translucent, blurred surfaces with rim highlights over a slowly moving silver light, a floating capsule navbar and brushed silver accents.

## Screenshots

| | |
|---|---|
| ![Skills](docs/screenshots/desktop-skills.jpg) | ![Skills, turned](docs/screenshots/desktop-skills-turn.jpg) |
| **Skills:** every part is a technology | **...and it turns as you scroll** |
| ![About](docs/screenshots/desktop-about.jpg) | ![Work](docs/screenshots/desktop-work.jpg) |
| **About** | **My projects** |
| ![More work](docs/screenshots/desktop-more.jpg) | ![Content](docs/screenshots/desktop-videos.jpg) |
| **More work** | **Content** |

<p>
  <img src="docs/screenshots/mobile-hero.jpg" width="24%" alt="Mobile hero" />
  <img src="docs/screenshots/mobile-about.jpg" width="24%" alt="Mobile about" />
  <img src="docs/screenshots/mobile-skills.jpg" width="24%" alt="Mobile skills" />
  <img src="docs/screenshots/mobile-work.jpg" width="24%" alt="Mobile work" />
</p>

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [three.js](https://threejs.org), [@react-three/fiber](https://github.com/pmndrs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- [GSAP](https://gsap.com) ScrollTrigger and [Lenis](https://lenis.darkroom.engineering) smooth scrolling

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To force a 3D quality level while testing, add `?quality=high`, `?quality=medium` or `?quality=lite` to the URL.

## Deploy

Import the repo on Vercel. Everything is detected automatically, including the site URL used in the sitemap and share tags.

On a custom domain, set `NEXT_PUBLIC_SITE_URL` (for example `https://hasanalpgungor.com`). After the first deploy, add the site to Google Search Console and submit `/sitemap.xml`.

## Where things live

- `components/Logo.tsx` and `lib/logoShape.ts`: the 3D glass logo and its traced pieces
- `components/Scene.tsx`: the canvas, lighting and the scroll story (GSAP keyframes)
- `lib/data.ts`: projects, videos, links and the skill for each logo piece
- `lib/projects.ts` and `app/projeler/[slug]`: the project pages
- `lib/blog.ts` and `app/blog`: the blog posts
- `lib/i18n.ts` and `lib/lang.ts`: languages and their addresses
- `lib/quality.ts`: device-based 3D quality levels
- `lib/site.ts`, `app/sitemap.ts`, `app/robots.ts`: site URL, structured data and search engine files

## Links

[GitHub](https://github.com/manyaksisko35) · [YouTube](https://www.youtube.com/@hasanalpgungor) · [itch.io](https://hasan-alp-gungor.itch.io/) · [LinkedIn](https://www.linkedin.com/in/hasan-alp-g%C3%BCng%C3%B6r-b1085131a/)
