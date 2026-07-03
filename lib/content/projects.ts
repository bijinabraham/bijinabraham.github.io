export type Project = {
  slug: "atlas" | "sculptura" | "psych-shorts" | "bbb";
  num: string; // "01"
  title: string; // may include HTML-ish <em>X</em> for italic accent
  description: string;
  status: string;
  url?: string;
  stack: string;
  choices: string[];
};

export const projects: Project[] = [
  {
    slug: "atlas",
    num: "01",
    title: "<em>Atlas</em>",
    description: "Mobile strength and workout tracker. Offline-first. Own your data.",
    status: "Shipped, production",
    stack: "React Native · Expo · TypeScript · SQLite · Reanimated 3",
    choices: [
      "Offline-first, on-device SQLite. No accounts, no backend, no data leaves the phone.",
      "React Native + Expo for one-codebase iOS and Android without the Expo lock-in.",
      "Body-part to exercise to set model. Optimised for how you actually train.",
      "Charts (weight, volume, PRs) deferred to v2. Deliberately shipped the smaller thing first.",
    ],
  },
  {
    slug: "sculptura",
    num: "02",
    title: "<em>Sculptura</em>",
    description: "Custom foam tool insert manufacturer. Real client. Real revenue.",
    status: "Live, dsculptura.in",
    url: "https://dsculptura.in",
    stack: "Next.js 15 · TypeScript · Sanity · Framer Motion · Vercel · Resend",
    choices: [
      "Doubled quote requests within 6 weeks of launch.",
      "Client updates gallery and process copy through Sanity themselves. Zero-touch handoff.",
      "Framer Motion for tactile hover and scroll motion that matches the physicality of the product.",
      "Deployed on Vercel with ISR for gallery revalidation. Zero server maintenance.",
    ],
  },
  {
    slug: "psych-shorts",
    num: "03",
    title: "Psychology Traits <em>Shorts</em>",
    description: "Autonomous YouTube Shorts pipeline for cognitive-bias videos.",
    status: "Autonomous, 28 of 28 tests",
    stack: "TypeScript · Node · FFmpeg · YouTube Data API · GH Actions · OpenAI",
    choices: [
      "Wanted to prove a full content pipeline could be autonomous after 2 hours of setup.",
      "Every step is tested. 28 of 28 green means adding a bias seeds a video without touching code.",
      "Deliberate rate-limiting so the channel does not look like a spam bot.",
      "Stack chosen for portability. Whole thing runs on free GitHub Actions.",
    ],
  },
  {
    slug: "bbb",
    num: "04",
    title: "Bijin Beyond <em>Borders</em>",
    description: "Personal site fusing travels, adrenaline pursuits, and side work. The playground.",
    status: "Live, maintained",
    stack: "Next.js 15 · TypeScript · Framer Motion · Lenis · D3 · Tailwind · CSS Modules",
    choices: [
      "Static Next.js export, zero backend, zero database. Content lives in TypeScript data files.",
      "D3 orthographic globe with hoverable polaroid photo cards on visited cities. Globe freezes on hover.",
      "Per-sport adrenaline pages with intensity-wave canvas, text scramble, idle-glitch effects.",
      "Custom cursor with three context states, PhotoTrail on About page.",
      "OKLCH-only colour system. No hex, no gradient text, no border-radius above 4px on structure.",
    ],
  },
];
