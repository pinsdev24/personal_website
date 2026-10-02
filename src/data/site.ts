/**
 * ──────────────────────────────────────────────────────────────────────────
 *  EVERYTHING EDITABLE LIVES IN THIS FILE.
 *
 *  - Facts (names, links, dates, screenshots) were carried over from the
 *    previous version of this portfolio found in the repo.
 *  - Wording flagged `placeholder: true` is DRAFT copy written for this
 *    redesign. Replace it with your own words, then set it to `false` (or
 *    delete the key). While `placeholder` is true, a small "draft" tag is
 *    shown next to the text on the page.
 *  - To hide every draft tag at once, set `showPlaceholderMarkers` to false.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const showPlaceholderMarkers = true;

export const profile = {
  name: "Prestilien Pindoh",
  shortName: "Prestilien",
  role: "AI/ML & software engineer",
  location: "Brussels, Belgium · Remote",
  email: "prestilienpindoh@outlook.com",
  siteUrl: "https://prestilienpindoh.me",
  portrait: {
    src: "/images/profile_image.jpg",
    alt: "Portrait of Prestilien Pindoh",
  },
  links: [
    { label: "GitHub", href: "https://github.com/pinsdev24" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/prestilien-djionang-pindoh-a21179255",
    },
  ],
  seo: {
    title: "Prestilien Pindoh — AI/ML & software engineer",
    description:
      "An editorial portfolio: production AI, observable ML systems and products shipped end to end.",
  },
} as const;

export const nav = [
  { label: "Journey", href: "/#journey" },
  { label: "Selected work", href: "/#selected" },
  { label: "All work", href: "/work" },
  { label: "Contact", href: "/#contact" },
] as const;

export const hero = {
  issue: "Issue No. 01 · 2026",
  /** Headline is split so the middle part can be set in italic + highlighter. */
  headline: {
    before: "I build AI that has to",
    emphasis: "survive production",
    after: "—and the products around it.",
  },
  intro:
    "Models, agents and the boring-but-vital parts that keep them honest: evaluation, delivery, observability. This is a short magazine about how I got here and what I have made.",
  note: "Follow the thread ↓",
  availability: "Open to AI/ML & software roles",
  cta: [
    { label: "Read the journey", href: "/#journey", kind: "solid" },
    { label: "See all work", href: "/work", kind: "ghost" },
  ],
  facts: [
    { label: "Based in", value: "Brussels" },
    { label: "Focus", value: "Agentic AI · MLOps" },
    { label: "Shipping since", value: "2021" },
  ],
  placeholder: true,
} as const;

/**
 * The thread: a saddle-stitch of thread sewn through the pages of this issue.
 * Each stop is a page the needle passes through while the visitor scrolls.
 */
export const journey = {
  kicker: "The thread",
  title: "Sewn together, one page at a time.",
  lede: "A zine is held together by a single stitch. Scroll and watch the needle pass through each chapter of mine.",
  placeholder: true,
  stops: [
    {
      page: "p. 01",
      year: "2021",
      title: "Co-founded VALIDE",
      body: "Set the technical direction of an education product, from the first architecture sketches to AI-assisted learning.",
      tag: "Co-founder & CTO",
      placeholder: true,
    },
    {
      page: "p. 02",
      year: "2023",
      title: "Shipped for other people",
      body: "Full-stack work at Surfyn: web, mobile and backend features, polished on the outside and dependable underneath.",
      tag: "Full-stack developer",
      placeholder: true,
    },
    {
      page: "p. 03",
      year: "2023",
      title: "Started Afrik Delices",
      body: "A food-tech platform for authentic African recipes. I own the product direction and the engineering.",
      tag: "Founder, product engineer",
      placeholder: true,
    },
    {
      page: "p. 04",
      year: "2025",
      title: "Went deep on production AI",
      body: "Agents with explicit control flow, retrieval that cites its sources, ML systems tracked from experiment to container.",
      tag: "LangGraph · RAG · MLOps",
      placeholder: true,
    },
    {
      page: "p. 05",
      year: "2026",
      title: "Research at Multitel",
      body: "Reinforcement learning and explainability for intelligent systems, with reproducible experiments.",
      tag: "AI engineer intern",
      placeholder: true,
    },
    {
      page: "p. 06",
      year: "Next",
      title: "Your page here?",
      body: "This last page is intentionally blank. Tell me what you are building.",
      tag: "Open to roles",
      placeholder: true,
    },
  ],
} as const;

export type CategoryId = "ai" | "ml" | "product" | "client";

export const categories: ReadonlyArray<{ id: CategoryId; label: string }> = [
  { id: "ai", label: "AI agents" },
  { id: "ml", label: "ML & MLOps" },
  { id: "product", label: "Products" },
  { id: "client", label: "Client work" },
];

export type Project = {
  slug: string;
  title: string;
  category: CategoryId;
  /** Shown as a small label above the title. */
  kind: string;
  /** One benefit-led sentence. */
  blurb: string;
  year: string;
  tags: readonly string[];
  image: { src: string; alt: string };
  links: ReadonlyArray<{ label: string; href: string }>;
  /** Appears in the "Selected work" section on the home page. */
  featured?: boolean;
  placeholder?: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "ariadne-ai",
    title: "Ariadne AI",
    category: "ai",
    kind: "Agentic system",
    blurb:
      "A multi-agent career platform that turns a job search into a controlled workflow instead of a string of disconnected prompts.",
    year: "2025",
    tags: ["LangGraph", "Multi-agent", "Human-in-the-loop"],
    image: {
      src: "/images/ariadne-agent-website.png",
      alt: "Screenshot of the Ariadne AI career platform",
    },
    links: [
      {
        label: "See it live",
        href: "https://career-agent-production-be19.up.railway.app",
      },
    ],
    featured: true,
  },
  {
    slug: "studenthub",
    title: "StudentHub",
    category: "ai",
    kind: "Grounded AI",
    blurb:
      "An academic assistant that answers from course material, cites its sources and turns documents into quizzes.",
    year: "2025",
    tags: ["RAG", "PDF processing", "Citations"],
    image: {
      src: "/images/studenthub.png",
      alt: "Screenshot of the StudentHub academic assistant",
    },
    links: [
      { label: "See it live", href: "https://studenthub-frontend.vercel.app/" },
    ],
    featured: true,
  },
  {
    slug: "afrik-delices",
    title: "Afrik Delices",
    category: "product",
    kind: "Founder-built product",
    blurb:
      "A culinary product connecting people with authentic African recipes across web and mobile.",
    year: "2023 →",
    tags: ["Product", "Mobile", "AI"],
    image: {
      src: "/images/afrikdelices.png",
      alt: "Screenshot of the Afrik Delices website",
    },
    links: [{ label: "See it live", href: "https://afrikdelices.com/" }],
    featured: true,
  },
  {
    slug: "mlops-fraud-detection",
    title: "MLOps Fraud Detection",
    category: "ml",
    kind: "Production ML",
    blurb:
      "An anomaly model taken beyond the notebook: tracked experiments, containerised inference, automated delivery.",
    year: "2025",
    tags: ["XGBoost", "FastAPI", "Docker", "CI/CD"],
    image: {
      src: "/images/fraud_detection.png",
      alt: "Diagram of the MLOps fraud detection pipeline",
    },
    links: [
      {
        label: "Read the code",
        href: "https://github.com/pinsdev24/mlops-fraud-detection",
      },
    ],
    featured: true,
  },
  {
    slug: "vente-pro",
    title: "Vente Pro",
    category: "product",
    kind: "Business software",
    blurb:
      "Sales operations software spanning APIs, relational data, object storage and automated delivery.",
    year: "2025",
    tags: ["FastAPI", "PostgreSQL", "CI/CD"],
    image: {
      src: "/images/vente-pro.png",
      alt: "Screenshot of the Vente Pro dashboard",
    },
    links: [
      { label: "See it live", href: "https://vente-pro-green.vercel.app/" },
    ],
  },
  {
    slug: "client-segmentation",
    title: "Client Segmentation",
    category: "ml",
    kind: "Applied ML",
    blurb:
      "An unsupervised pipeline that turns purchase behaviour into customer segments a human can actually read.",
    year: "2024",
    tags: ["Python", "PCA", "K-Means"],
    image: {
      src: "/images/clustering_client.png",
      alt: "Cluster visualisation of e-commerce customer segments",
    },
    links: [
      {
        label: "Read the code",
        href: "https://github.com/pinsdev24/client_segmentation",
      },
    ],
  },
  {
    slug: "favero-btp",
    title: "Favero BTP",
    category: "client",
    kind: "Client delivery",
    blurb:
      "A bilingual company website with localised content, project storytelling and a direct quote flow.",
    year: "2025",
    tags: ["Next.js", "i18n", "Tailwind CSS"],
    image: {
      src: "/images/faverobtp.png",
      alt: "Hero section of the Favero BTP website",
    },
    links: [{ label: "See it live", href: "https://www.faverobtp.com" }],
  },
];

export const selected = {
  kicker: "Selected work",
  title: "A few things, chosen on purpose.",
  lede: "Four to start with. The full archive is one click away.",
  placeholder: true,
} as const;

export const work = {
  kicker: "All work",
  title: "The whole back catalogue.",
  lede: "Everything I am happy to show, newest ideas first. Filter by the kind of problem.",
  placeholder: true,
} as const;

export const contact = {
  kicker: "Colophon",
  title: "Who made this? Oh, hi.",
  body: "I am a developer in Brussels who likes systems that keep working after the demo. If you are building something that needs to survive production, write to me.",
  placeholder: true,
} as const;
