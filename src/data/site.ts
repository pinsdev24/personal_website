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
 *  - Image slots: a timeline card whose `image.src` is `null` shows a clearly
 *    marked empty frame that tells you which file to add. Drop the file in
 *    `public/` and set `src` to its path, e.g. `"/images/journey/valide.jpg"`.
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
  /** CSS object-position used when the photo is cropped to fit, e.g. "50% 20%". */
  position?: string;
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
        src: "/images/journey/valide.jpg",
        suggestedPath: "/images/journey/valide.jpg",
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
      placeholder: true,
      image: {
        src: "/images/journey/building-for-others.jpg",
        suggestedPath: "/images/journey/building-for-others.jpg",
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
      placeholder: true,
      image: {
        src: null,
        suggestedPath: "/images/journey/afrik-delices.jpg",
        alt: "",
        caption: "Afrik Delices — add a product or kitchen photo",
      },
    },
    {
      page: "p. 04",
      year: "2025",
      title: "Went deep on production AI",
      body: "Agents with explicit control flow, retrieval that cites its sources, ML systems tracked from experiment to container.",
      tag: "LangGraph · RAG · MLOps",
      placeholder: true,
      image: {
        src: null,
        suggestedPath: "/images/journey/production-ai.jpg",
        alt: "",
        caption: "Production AI — add a diagram or demo still",
      },
    },
    {
      page: "p. 05",
      year: "2026",
      title: "Research at Multitel",
      body: "Reinforcement learning and explainability for intelligent systems, with reproducible experiments.",
      tag: "AI engineer intern",
      placeholder: true,
      image: {
        src: "/images/journey/multitel.jpg",
        suggestedPath: "/images/journey/multitel.jpg",
        alt: "Standing in front of the Multitel building, hands in pockets",
        caption: "Outside Multitel",
        position: "50% 18%",
      },
    },
    {
      page: "p. 06",
      year: "Next",
      title: "Your page here?",
      body: "This last page is intentionally blank. Tell me what you are building.",
      tag: "Open to roles",
      placeholder: true,
      image: {
        src: null,
        suggestedPath: "/images/journey/next.jpg",
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

/**
 * The master's research block. Title, institution, supervisor and paper
 * details are verified (see `paper.sources`); the English title of the thesis
 * and the master's period are still yours to confirm.
 */
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
    "How do you teach a model what speech sounds like when there are almost no transcripts? By letting it learn from raw audio first, and by pooling several African languages so each one helps the others.",
  keywords: [
    "Self-supervised learning",
    "Speech representations",
    "Multilingual",
    "Low-resource languages",
  ],
  /** The picture is yours; the caption only states what is visible on it. */
  photo: {
    src: "/images/research/cri2023-presentation.jpg",
    alt: "Black-and-white photo of the author presenting at CRI'2023, with a slide about Contrastive Predictive Coding behind him",
    caption: "Presenting the paper at CRI'2023, Yaoundé",
    width: 1400,
    height: 1419,
  },
  /** The paper that came out of the research. Checked against the sources below. */
  paper: {
    label: "Published paper",
    title:
      "Self-supervised and Multilingual Learning Applied to the Wolof, Swahili and Fongbe",
    authors: "Prestilien Djionang Pindoh, Paulin Melatagia Yonta",
    venue:
      "CRI 2023 (6th Conference on Research in Computer Science), Yaoundé, 12–13 December 2023",
    proceedings:
      "Research in Computer Science, Springer CCIS, pp. 80–91",
    summary:
      "Contrastive Predictive Coding, wav2vec and a bidirectional CPC, trained with multilingual learning on Wolof, Swahili and Fongbe, then tested on speech recognition with a DeepSpeech-like model.",
    results: [
      { language: "Fongbe", wer: "61%" },
      { language: "Wolof", wer: "72%" },
      { language: "Swahili", wer: "88%" },
    ],
    resultsNote: "Word error rate on the ASR task",
    sources: [
      {
        label: "Springer proceedings",
        href: "https://link.springer.com/book/10.1007/978-3-031-63110-8",
      },
      {
        label: "Extended version (ARIMA journal)",
        href: "https://arima.episciences.org/en/articles/13416",
      },
      {
        label: "CRI'2023 accepted papers",
        href: "http://cri-info.cm/?page_id=270",
      },
    ],
  },
  /** Facts first; empty `value` shows a marked slot for what you still need to provide. */
  details: [
    { label: "Year", value: "", hint: "master's period, e.g. 2022–2023" },
    { label: "Supervisor", value: "Paulin Melatagia Yonta", hint: "" },
    {
      label: "Models / data",
      value: "CPC, wav2vec, bidirectional CPC · ALFFA corpora",
      hint: "",
    },
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
    year: "2023",
    tags: ["Self-supervised", "Speech", "Multilingual"],
    image: {
      src: "/images/research/cri2023-presentation.jpg",
      alt: "Presenting the speech representation paper at CRI'2023",
    },
    links: [
      {
        label: "Read the paper",
        href: "https://link.springer.com/book/10.1007/978-3-031-63110-8",
      },
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
  titleStart: "A few things,",
  titleEmphasis: "chosen on purpose.",
  lede: "Agents, ML and products, built end to end.",
  filterLabel: "Show me",
  /** The curated tier on the home page, in display order (project slugs). */
  slugs: ["afrik-delices", "ariadne-ai", "studenthub"],
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
