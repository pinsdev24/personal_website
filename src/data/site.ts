/**
 * ──────────────────────────────────────────────────────────────────────────
 *  EVERYTHING EDITABLE LIVES IN THIS FILE.
 *
 *  Copy, links, dates, images and certificates for every section. Photos live
 *  in `public/images/`; point an `image.src` at a file there to show it.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type ImageSlot = {
  /** Public path of the image, e.g. "/images/journey/valide.jpg". */
  src: string;
  /** Describes the picture for screen readers. */
  alt: string;
  /** Short caption printed under the picture. */
  caption: string;
  /** CSS object-position used when the photo is cropped to fit, e.g. "50% 20%". */
  position?: string;
  /** "contain" shows the whole picture (diagrams) instead of cropping it. */
  fit?: "contain";
};

export const profile = {
  name: "Prestilien Pindoh",
  shortName: "Prestilien",
  role: "AI/ML & software engineer",
  location: "Brussels, Belgium",
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
      "AI/ML and software engineer in Brussels. Agents, ML systems, products, and published research on speech for low-resource African languages.",
  },
} as const;

export const githubArchive = "https://github.com/pinsdev24?tab=repositories";

export const nav = [
  { label: "Journey", href: "/#journey" },
  { label: "Research", href: "/#research" },
  { label: "Work", href: "/work" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Contact", href: "/#contact" },
] as const;

export const hero = {
  /** Headline is split so the middle part can be set in italic + highlighter. */
  headline: {
    before: "I love building",
    emphasis: "useful AI",
    after: " and products.",
  },
  intro: "Agents, ML systems and the apps around them, built end to end.",
  note: "scroll — follow the thread",
  cta: [
    { label: "Follow the thread", href: "/#journey", kind: "solid" },
    { label: "All work", href: "/work", kind: "ghost" },
  ],
} as const;

/**
 * The thread: a saddle-stitch of thread sewn through the pages of this issue.
 * Each stop is a page the needle passes through while the visitor scrolls.
 */
export const journey = {
  kicker: "The thread",
  title: "Sewn together, one page at a time.",
  lede: "A zine is held together by a single stitch. Scroll and watch the needle pass through each chapter.",
  stops: [
    {
      page: "p. 01",
      year: "2021",
      title: "Co-founded VALIDE",
      body: "Set the technical direction of an education product, from the first architecture sketches to AI-assisted learning.",
      tag: "Co-founder & CTO",
      image: {
        src: "/images/journey/valide.jpg",
        alt: "Four members of the VALIDE team around a table, two of them wearing VALIDE t-shirts, smiling at the camera",
        caption: "The VALIDE team",
      },
    },
    {
      page: "p. 02",
      year: "2023",
      title: "Shipped for other people",
      body: "Full-stack work at Surfyn: web, mobile and backend features, polished on the outside and dependable underneath.",
      tag: "Full-stack developer",
      image: {
        src: "/images/journey/building-for-others.jpg",
        alt: "Black-and-white photo of a developer wearing a beanie and headphones, seen from behind, working on two laptops under a sloping ceiling",
        caption: "Heads down, building for other people",
      },
    },
    {
      page: "p. 03",
      year: "2023",
      title: "Started Afrik Delices",
      body: "A food-tech platform for authentic African recipes. I own the product direction and the engineering.",
      tag: "Founder, product engineer",
      image: {
        src: "/images/journey/afrik-delices-phones.png",
        alt: "Three phones showing the Afrik Delices app: the meal planner, the home feed with Ndolè Royal, and the Chef Delice assistant",
        caption: "Afrik Delices: meal planner, home and Chef Delice",
      },
    },
    {
      page: "p. 04",
      year: "2025",
      title: "Went deep on production AI",
      body: "Agents with explicit control flow, retrieval that cites its sources, ML systems tracked from experiment to container.",
      tag: "LangGraph · RAG · MLOps",
      image: {
        src: "/images/journey/production-ai-agent-loop.png",
        alt: "Hand-drawn agent loop: a user query goes to the agent, which decides whether it needs a tool such as search, web search, a database or an API, observes the result, and loops until it gives a final answer",
        caption: "The agent loop: decide, call a tool, observe, answer",
        fit: "contain",
      },
    },
    {
      page: "p. 05",
      year: "2026",
      title: "Research at Multitel",
      body: "Reinforcement learning and explainability for intelligent systems, with reproducible experiments.",
      tag: "AI engineer intern",
      image: {
        src: "/images/journey/multitel.jpg",
        alt: "Standing in front of the Multitel building, hands in pockets",
        caption: "Outside Multitel",
        position: "50% 18%",
      },
    },
  ],
} as const satisfies {
  kicker: string;
  title: string;
  lede: string;
  stops: ReadonlyArray<{
    page: string;
    year: string;
    title: string;
    body: string;
    tag: string;
    image: ImageSlot | null;
  }>;
};

/** Three illustrated "field notes" about the topics you love. */
export const fieldNotes = {
  kicker: "Field notes",
  title: "Three things I cannot stop thinking about.",
  figures: [
    {
      id: "control",
      fig: "Fig. 1",
      title: "System control",
      body: "Close the loop, measure the error, stay stable. The oldest good idea in engineering.",
    },
    {
      id: "rover",
      fig: "Fig. 2",
      title: "Robotics",
      body: "Where software finally has to meet gravity, noise and a floor that is not flat.",
    },
    {
      id: "rl",
      fig: "Fig. 3",
      title: "Reinforcement learning",
      body: "Try, get rewarded, try again. Learning from consequences instead of labels.",
    },
  ],
} as const;

/**
 * Research: the paper that came out of the master's thesis. Every fact here
 * is checked against the two DOIs in `links`.
 */
export const research = {
  kicker: "Research",
  label: "Published paper",
  title:
    "Self-supervised and Multilingual Learning Applied to the Wolof, Swahili and Fongbe",
  authors: "Prestilien Djionang Pindoh, Paulin Melatagia Yonta",
  venue:
    "CRI 2023, 6th Conference on Research in Computer Science · Yaoundé, December 2023",
  lede:
    "How do you teach a model what speech sounds like when there are almost no transcripts? Let it learn from raw audio first, and pool several African languages so each one helps the others.",
  /** Original French title of the master's thesis, kept verbatim. */
  thesisTitle:
    "Apprentissage multilingue et autosupervisé de la représentation de la parole pour les langues peu dotées",
  keywords: [
    "Self-supervised learning",
    "Speech representations",
    "Multilingual",
    "Low-resource languages",
  ],
  links: [
    {
      label: "Springer · CRI 2023",
      href: "https://doi.org/10.1007/978-3-031-63110-8_7",
    },
    {
      label: "ARIMA journal",
      href: "https://doi.org/10.46298/arima.13416",
    },
  ],
  /** The steps match the numbers drawn on the illustration. */
  method: {
    fig: "Fig. 4",
    title: "The method, in one picture",
    note: "Schematic. Each shape stands for one language.",
    steps: [
      {
        title: "Listen without labels",
        body: "Raw audio only: CPC, wav2vec and a bidirectional CPC learn representations without any transcripts.",
      },
      {
        title: "Pool the languages",
        body: "One encoder is trained on Wolof, Swahili and Fongbe together, using the ALFFA speech corpora.",
      },
      {
        title: "Check what it learned",
        body: "The encoder is frozen and a DeepSpeech-like recogniser is trained on top, one language at a time.",
      },
    ],
  },
  photo: {
    src: "/images/research/cri2023-presentation.jpg",
    alt: "Black-and-white photo of the author presenting at CRI'2023, with a slide about Contrastive Predictive Coding behind him",
    caption: "Presenting the paper at CRI'2023, Yaoundé",
    width: 1400,
    height: 1419,
  },
  details: [
    { label: "Year", value: "2022–2023" },
    { label: "Institution", value: "Université de Yaoundé I (UY1)" },
    { label: "Supervisor", value: "Paulin Melatagia Yonta" },
  ],
} as const;

export const certifications = {
  kicker: "Certifications",
  title: "The paperwork, framed.",
  lede: "Credentials I have earned, each one verifiable.",
  items: [
    {
      title: "AWS Certified Developer — Associate",
      issuer: "Amazon Web Services",
      href: "https://www.credly.com/badges/a20ef315-4458-4d29-9639-112695053779/public_url",
      image: "/images/aws-certified-developer-associate.png",
    },
    {
      title: "Deep Research with LangGraph",
      issuer: "LangChain Academy",
      href: "https://academy.langchain.com/certificates/pzfratlaov",
      image: "/images/langchain_academy_certificate.png",
    },
    {
      title: "Deep Agents with LangGraph",
      issuer: "LangChain Academy",
      href: "https://academy.langchain.com/certificates/fwsryt2jhm",
      image: "/images/certificate-714493365.jpg",
    },
  ],
} as const;

export type CategoryId = "ai" | "ml" | "research" | "product" | "client";

export const categories: ReadonlyArray<{ id: CategoryId; label: string }> = [
  { id: "ai", label: "AI agents" },
  { id: "ml", label: "ML & MLOps" },
  { id: "research", label: "Research" },
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
  /**
   * null = an empty, marked image slot (or the drawing named in `illustration`).
   * `position` is a CSS object-position for cropped photos; screenshots default to the top.
   */
  image: { src: string; alt: string; position?: string } | null;
  /** Original drawing shown when there is no image yet. */
  illustration?: "rl";
  links: ReadonlyArray<{ label: string; href: string }>;
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
      src: "/images/projects/ariadne.webp",
      alt: "Screenshot of the Ariadne AI career platform",
    },
    links: [
      {
        label: "See it live",
        href: "https://career-agent-production-be19.up.railway.app",
      },
    ],
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
      src: "/images/projects/studenthub.webp",
      alt: "Screenshot of the StudentHub academic assistant",
    },
    links: [
      { label: "See it live", href: "https://studenthub-frontend.vercel.app/" },
    ],
  },
  {
    slug: "multilingual-speech-representations",
    title: "Speech representations for low-resource languages",
    category: "research",
    kind: "Master's research",
    blurb:
      "Self-supervised, multilingual speech representation learning for languages with little labelled data.",
    year: "2022 – 2023",
    tags: ["Self-supervised", "Speech", "Multilingual"],
    image: {
      src: "/images/research/cri2023-presentation.jpg",
      alt: "Presenting the speech representation paper at CRI'2023",
      position: "50% 35%",
    },
    links: [
      {
        label: "Springer · CRI 2023",
        href: "https://doi.org/10.1007/978-3-031-63110-8_7",
      },
      { label: "ARIMA journal", href: "https://doi.org/10.46298/arima.13416" },
    ],
  },
  {
    slug: "multitel-rl-xai",
    title: "Reinforcement learning & explainability",
    category: "research",
    kind: "Research internship",
    blurb:
      "Reproducible RL experiments with explainability, built with production constraints in mind.",
    year: "2026",
    tags: ["TorchRL", "XAI", "Python"],
    image: null,
    illustration: "rl",
    links: [],
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
    slug: "valide",
    title: "VALIDE",
    category: "product",
    kind: "EdTech platform",
    blurb:
      "An education platform pairing academic resources with AI-assisted learning.",
    year: "2021 – 2025",
    tags: ["Full-stack", "AI", "Education"],
    image: {
      src: "/images/valide_landing.png",
      alt: "Landing page of the VALIDE education platform",
    },
    links: [{ label: "See it live", href: "https://valide-startup.vercel.app" }],
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
  titleStart: "A few things,",
  titleEmphasis: "chosen on purpose.",
  lede: "Agents, ML and products, built end to end.",
  filterLabel: "Show me",
  /** The curated tier on the home page, in display order (project slugs). */
  slugs: ["afrik-delices", "ariadne-ai", "studenthub"],
  seeMore: "Interested? There is more — open the archive",
} as const;

/**
 * The work page is its own darker "world": the back room of the archive.
 * Same tiers as the home page, one level deeper.
 */
export const work = {
  kicker: "The back room",
  title: "Welcome to the stacks.",
  lede: "Everything I am happy to show, filed by kind. Pick a drawer.",
  stats: {
    projects: "Projects",
    drawers: "Drawers",
    years: "Years",
    live: "Live demos",
  },
  drawersTitle: "Drawers",
  contentsTitle: "In this drawer",
  githubTitle: "The rest is on GitHub.",
  githubBody: "Every public repository, including the ones not filed here.",
  exitTop: "Back to the cover",
  exitBottom: "Back up to the cover",
  githubCta: "Still more on GitHub",
} as const;

export const contact = {
  kicker: "Colophon",
  title: "Who made this? Oh, hi.",
  body: "I'm an AI/ML and software engineer in Brussels. I love building useful AI and the products around it, from agents and ML pipelines to web and mobile apps. If you're working on something like that, write to me.",
} as const;
