/**
 * ──────────────────────────────────────────────────────────────────────────
 *  EVERYTHING EDITABLE LIVES IN THIS FILE.
 *
 *  - Facts (names, links, dates, screenshots, certificates) were carried over
 *    from the previous version of this portfolio found in the repo, or given
 *    by the owner (master's thesis title).
 *  - Wording flagged `placeholder: true` is DRAFT copy written for this
 *    redesign. Replace it with your own words, then set it to `false` (or
 *    delete the key). While `placeholder` is true, a small "draft" tag is
 *    shown next to the text on the page.
 *  - Image slots: every timeline card has an `image` with `src: null`. The
 *    page then shows a clearly marked empty frame that tells you which file
 *    to add. Drop the file in `public/` and set `src` to its path, e.g.
 *    `src: "/images/journey/valide.jpg"`.
 *  - To hide every draft tag and empty-slot label at once, set
 *    `showPlaceholderMarkers` to false.
 * ──────────────────────────────────────────────────────────────────────────
 */

export const showPlaceholderMarkers = true;

export type ImageSlot = {
  /** Public path of the image (e.g. "/images/journey/valide.jpg"). null = show an empty slot. */
  src: string | null;
  /** Where to put the file. Only used to label the empty slot. */
  suggestedPath: string;
  /** Describe the picture for screen readers once you add one. */
  alt: string;
  /** Short caption printed under the picture. */
  caption: string;
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
      "Agents, reinforcement learning, speech and control: an editorial portfolio of systems built to survive production.",
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
    before: "I build AI that",
    emphasis: "survives production",
    after: ".",
  },
  intro: "Agents, reinforcement learning and the systems that keep them honest.",
  note: "scroll — follow the thread",
  cta: [
    { label: "Follow the thread", href: "/#journey", kind: "solid" },
    { label: "All work", href: "/work", kind: "ghost" },
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
  lede: "A zine is held together by a single stitch. Scroll and watch the needle pass through each chapter.",
  placeholder: true,
  stops: [
    {
      page: "p. 01",
      year: "2021",
      title: "Co-founded VALIDE",
      body: "Set the technical direction of an education product, from the first architecture sketches to AI-assisted learning.",
      tag: "Co-founder & CTO",
      placeholder: true,
      image: {
        src: null,
        suggestedPath: "/images/journey/01-valide.jpg",
        alt: "",
        caption: "VALIDE — add a screenshot or team photo",
      },
    },
    {
      page: "p. 02",
      year: "2023",
      title: "Shipped for other people",
      body: "Full-stack work at Surfyn: web, mobile and backend features, polished on the outside and dependable underneath.",
      tag: "Full-stack developer",
      placeholder: true,
      image: {
        src: null,
        suggestedPath: "/images/journey/02-surfyn.jpg",
        alt: "",
        caption: "Surfyn — add a screenshot or workspace photo",
      },
    },
    {
      page: "p. 03",
      year: "2023",
      title: "Started Afrik Delices",
      body: "A food-tech platform for authentic African recipes. I own the product direction and the engineering.",
      tag: "Founder, product engineer",
      placeholder: true,
      image: {
        src: null,
        suggestedPath: "/images/journey/03-afrik-delices.jpg",
        alt: "",
        caption: "Afrik Delices — add a product or kitchen photo",
      },
    },
    {
      page: "p. 04",
      year: "Master's",
      title: "Teaching machines to listen",
      body: "Master's research at the University of Yaoundé I on self-supervised, multilingual speech representations for low-resource languages.",
      tag: "Université de Yaoundé I (UY1)",
      placeholder: true,
      image: {
        src: null,
        suggestedPath: "/images/journey/04-uy1.jpg",
        alt: "",
        caption: "UY1 — add a campus, lab or defence photo",
      },
    },
    {
      page: "p. 05",
      year: "2025",
      title: "Went deep on production AI",
      body: "Agents with explicit control flow, retrieval that cites its sources, ML systems tracked from experiment to container.",
      tag: "LangGraph · RAG · MLOps",
      placeholder: true,
      image: {
        src: null,
        suggestedPath: "/images/journey/05-production-ai.jpg",
        alt: "",
        caption: "Production AI — add a diagram or demo still",
      },
    },
    {
      page: "p. 06",
      year: "2026",
      title: "Research at Multitel",
      body: "Reinforcement learning and explainability for intelligent systems, with reproducible experiments.",
      tag: "AI engineer intern",
      placeholder: true,
      image: {
        src: null,
        suggestedPath: "/images/journey/06-multitel.jpg",
        alt: "",
        caption: "Multitel — add a lab or experiment photo",
      },
    },
    {
      page: "p. 07",
      year: "Next",
      title: "Your page here?",
      body: "This last page is intentionally blank. Tell me what you are building.",
      tag: "Open to roles",
      placeholder: true,
      image: {
        src: null,
        suggestedPath: "/images/journey/07-next.jpg",
        alt: "",
        caption: "Optional — add a closing image",
      },
    },
  ],
} as const satisfies {
  kicker: string;
  title: string;
  lede: string;
  placeholder: boolean;
  stops: ReadonlyArray<{
    page: string;
    year: string;
    title: string;
    body: string;
    tag: string;
    placeholder: boolean;
    image: ImageSlot;
  }>;
};

/** Three illustrated "field notes" about the topics you love. */
export const fieldNotes = {
  kicker: "Field notes",
  title: "Three things I cannot stop thinking about.",
  placeholder: true,
  figures: [
    {
      id: "control",
      fig: "Fig. 1",
      title: "System control",
      body: "Close the loop, measure the error, stay stable. The oldest good idea in engineering.",
      placeholder: true,
    },
    {
      id: "rover",
      fig: "Fig. 2",
      title: "Robotics",
      body: "Where software finally has to meet gravity, noise and a floor that is not flat.",
      placeholder: true,
    },
    {
      id: "rl",
      fig: "Fig. 3",
      title: "Reinforcement learning",
      body: "Try, get rewarded, try again. Learning from consequences instead of labels.",
      placeholder: true,
    },
  ],
} as const;

/** The master's research block. Title and institution are factual. */
export const research = {
  kicker: "Research",
  heading: "The thesis",
  /** Original French title, kept verbatim. */
  title:
    "Apprentissage multilingue et autosupervisé de la représentation de la parole pour les langues peu dotées",
  titleEn:
    "Multilingual, self-supervised learning of speech representations for low-resource languages",
  institution: "Université de Yaoundé I (UY1)",
  degree: "Master's research",
  abstract:
    "Learning what speech sounds like without labelled transcripts, across several languages, for languages that have very little annotated data.",
  keywords: [
    "Self-supervised learning",
    "Speech representations",
    "Multilingual",
    "Low-resource languages",
  ],
  /** Fields you still need to provide. Leave `value` empty to show a marked slot. */
  details: [
    { label: "Year", value: "", hint: "e.g. 2024–2025" },
    { label: "Supervisor", value: "", hint: "name of your supervisor" },
    { label: "Models / data", value: "", hint: "e.g. wav2vec 2.0, corpora used" },
    { label: "Thesis link", value: "", hint: "URL of the PDF or repository" },
  ],
  placeholder: true,
} as const;

export const certifications = {
  kicker: "Certifications",
  title: "The paperwork, framed.",
  lede: "Credentials I have earned, each one verifiable.",
  placeholder: true,
  items: [
    {
      title: "AWS Certified Developer — Associate",
      issuer: "Amazon Web Services",
      href: "https://www.credly.com/badges/a20ef315-4458-4d29-9639-112695053779/public_url",
      image: "/images/aws-certified-developer-associate.png",
      placeholder: false,
    },
    {
      title: "Deep Research with LangGraph",
      issuer: "LangChain Academy",
      href: "https://academy.langchain.com/certificates/pzfratlaov",
      image: "/images/langchain_academy_certificate.png",
      placeholder: false,
    },
    {
      title: "Deep Agents with LangGraph",
      issuer: "LangChain Academy",
      href: "https://academy.langchain.com/certificates/fwsryt2jhm",
      image: "/images/certificate-714493365.jpg",
      placeholder: false,
    },
    {
      title: "Your next certification",
      issuer: "Issuer — add name",
      href: null,
      image: null,
      placeholder: true,
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
  /** null = an empty, marked image slot. */
  image: { src: string; alt: string } | null;
  links: ReadonlyArray<{ label: string; href: string }>;
  /** Appears in the curated "Selected work" tier on the home page. */
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
  },
  {
    slug: "multilingual-speech-representations",
    title: "Speech representations for low-resource languages",
    category: "research",
    kind: "Master's research",
    blurb:
      "Self-supervised, multilingual speech representation learning for languages with little labelled data.",
    year: "Master's",
    tags: ["Self-supervised", "Speech", "Multilingual"],
    image: null,
    links: [],
    placeholder: true,
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
    links: [],
    placeholder: true,
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
  title: "A few things, chosen on purpose.",
  lede: "Three to start with. The back room has the rest.",
  seeMore: "Interested? There is more — open the archive",
  placeholder: true,
} as const;

/**
 * The work page is its own darker "world": the back room of the archive.
 * Same tiers as the home page, one level deeper.
 */
export const work = {
  kicker: "The back room",
  title: "Welcome to the stacks.",
  lede: "Everything I am happy to show, filed by kind. Pick a drawer.",
  exitTop: "Back to the cover",
  exitBottom: "Back up to the cover",
  githubCta: "Still more on GitHub",
  placeholder: true,
} as const;

export const contact = {
  kicker: "Colophon",
  title: "Who made this? Oh, hi.",
  body: "I am a developer in Brussels who likes systems that keep working after the demo. If you are building something that needs to survive production, write to me.",
  placeholder: true,
} as const;
