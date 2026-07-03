export type Post = {
  date: string;   // "2026-06-04"
  title: string;  // may include <em>X</em>
  excerpt: string;
  tag: string;
};

export const posts: Post[] = [
  {
    date: "2026-06-04",
    title: "On <em>compression</em> in producer configs",
    excerpt: "Everyone reaches for gzip. lz4 was the right answer more often than I expected, and here is the benchmark that made me stop debating it.",
    tag: "Streaming",
  },
  {
    date: "2026-04-19",
    title: "Hiring SEs who ship, not just <em>slide</em>",
    excerpt: "A rubric I built for interviewing SEs that filters out slide-deck people from architects who can actually build.",
    tag: "Leadership",
  },
  {
    date: "2026-02-11",
    title: "Onboarding that <em>halved</em> our time-to-live",
    excerpt: "The framework we adopted across the SE org, exactly the shape it needed to be, and the two things I would change next time.",
    tag: "Leadership",
  },
  {
    date: "2025-11-28",
    title: "The <em>demo</em> as design artifact",
    excerpt: "A working POC teaches you three things the deck cannot. This is why I still write the code for the demos I lead.",
    tag: "Pre-sales, Craft",
  },
  {
    date: "2025-09-02",
    title: "Building an <em>artifact</em> library that people actually use",
    excerpt: "The 15-artifact enablement library I sponsored, why the reuse rate mattered more than the total count, and what killed the ones that failed.",
    tag: "Enablement, SME",
  },
];
