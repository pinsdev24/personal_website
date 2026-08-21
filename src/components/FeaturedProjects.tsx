"use client"
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'

type Project = {
  src: string
  alt: string
  kind: string
  title: string
  description: string
  signal: string
  href: string
  tags: string[]
}

const featured: Project[] = [
  {
    src: '/images/fraud_detection.png',
    alt: 'MLOps Fraud Detection',
    kind: 'Production ML',
    title: 'MLOps Fraud Detection',
    description: 'An anomaly model taken beyond the notebook into tracked experiments, containerized inference, and automated delivery.',
    signal: 'Experiment → API → container → CI/CD',
    href: 'https://github.com/pinsdev24/mlops-fraud-detection',
    tags: ['MLOps', 'XGBoost', 'FastAPI', 'Docker'],
  },
  {
    src: '/images/clustering_client.png',
    alt: 'E-commerce Client Segmentation',
    kind: 'Applied ML',
    title: 'Client Segmentation',
    description: 'An unsupervised learning pipeline that turns purchase behavior into interpretable customer segments.',
    signal: 'Prepare → reduce → cluster → interpret',
    href: 'https://github.com/pinsdev24/client_segmentation',
    tags: ['Python', 'PCA', 'K-Means'],
  },
]

const more: Project[] = [
  {
    src: '/images/afrikdelices.png',
    alt: 'Afrik Delices',
    kind: 'Product engineering',
    title: 'Afrik Delices',
    description: 'A culinary product connecting people with authentic African recipes across web and mobile.',
    signal: 'Founder-built product',
    href: 'https://afrikdelices.com/',
    tags: ['Product', 'Mobile', 'AI'],
  },
  // {
  //   src: '/images/valide_landing.png',
  //   alt: 'Valide — Educational Platform',
  //   kind: 'EdTech',
  //   title: 'Valide',
  //   description: 'An education platform pairing academic resources with AI-assisted learning experiences.',
  //   signal: 'Co-founder & CTO',
  //   href: 'https://valide-startup.vercel.app',
  //   tags: ['Full-stack', 'AI', 'Education'],
  // },
  {
    src: '/images/faverobtp.png',
    alt: 'Favero BTP website hero',
    kind: 'Client delivery',
    title: 'Favero BTP',
    description: 'A bilingual company website with localized content, project storytelling, and a direct quote flow.',
    signal: 'Live production client',
    href: 'https://www.faverobtp.com',
    tags: ['Next.js', 'i18n', 'Tailwind CSS'],
  },
  {
    src: '/images/vente-pro.png',
    alt: 'Vente Pro dashboard',
    kind: 'Business software',
    title: 'Vente Pro',
    description: 'Sales operations software spanning APIs, relational data, object storage, and automated delivery.',
    signal: 'Full-stack ownership',
    href: 'https://vente-pro-green.vercel.app/',
    tags: ['FastAPI', 'PostgreSQL', 'CI/CD'],
  },
]

function ProjectCard({
  project,
  featured: isFeatured,
  reduce,
}: {
  project: Project
  featured?: boolean
  reduce: boolean | null
}) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl overflow-hidden card-lift h-full"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
      }}
      variants={fadeUp}
      whileHover={reduce ? {} : { y: -3 }}
    >
      <div
        className="w-full overflow-hidden aspect-[16/10]"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <Image
          src={project.src}
          alt={project.alt}
          width={isFeatured ? 720 : 600}
          height={isFeatured ? 450 : 375}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className={`flex flex-col flex-1 ${isFeatured ? 'p-6' : 'p-5'}`}>
        <p className="text-[10px] font-semibold tracking-[0.13em] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
          {project.kind}
        </p>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className={isFeatured ? 'text-lg font-semibold' : 'text-base font-semibold'} style={{ color: 'var(--fg)' }}>
            {project.title}
          </h3>
          <ArrowUpRight
            size={16}
            className="flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: 'var(--fg-muted)' }}
          />
        </div>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--fg-secondary)' }}>
          {project.description}
        </p>
        {isFeatured && (
          <p className="text-xs font-mono mb-4" style={{ color: 'var(--fg-muted)' }}>
            {project.signal}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium"
              style={{
                background: 'var(--tag-bg)',
                color: 'var(--fg-muted)',
                border: '1px solid var(--tag-border)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

export default function FeaturedProjects() {
  const reduce = useReducedMotion()

  return (
    <motion.section
      id="featured-projects"
      className="section-container"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr] gap-5 md:gap-12 items-end mb-10">
          <div>
            <span className="line-accent" />
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
              Selected work
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.04em] leading-[1.05]" style={{ color: 'var(--fg)' }}>
              Systems, not
              <span className="block" style={{ color: 'var(--fg-muted)' }}>just screenshots.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed md:pb-1" style={{ color: 'var(--fg-secondary)' }}>
            ML pipelines, SaaS products, and client platforms—evidence that I can move between research, backend systems, and user-facing delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {featured.map((p) => (
            <ProjectCard key={p.title} project={p} featured reduce={reduce} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {more.map((p) => (
            <ProjectCard key={p.title} project={p} reduce={reduce} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
