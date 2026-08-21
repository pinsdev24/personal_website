"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'

type ExperienceItem = {
  company: string
  role: string
  period: string
  status?: string
  summary: string
  highlights: string[]
  logo: string
}

const experiences: ExperienceItem[] = [
  {
    company: 'Multitel',
    role: 'AI Engineer Intern',
    period: 'Feb 2026 — Jun 2026',
    summary: 'Explored reinforcement learning and explainability for intelligent systems, with reproducible experiments and production constraints in mind.',
    highlights: ['Python', 'TorchRL', 'XAI'],
    logo: '/images/multitel_logo.png',
  },
  {
    company: 'Afrik Delices',
    role: 'Founder, Product Engineer',
    period: 'Jul 2023 — Present',
    summary: 'Owned product direction and engineering for a food-tech platform, from user experience to full-stack and mobile delivery.',
    highlights: ['Full-stack', 'Mobile', 'Product'],
    logo: '/images/afrikdelice.png',
  },
  {
    company: 'Surfyn',
    role: 'Full Stack Developer',
    period: 'Jan 2023 — Dec 2023',
    summary: 'Delivered web, mobile, and backend features that connected polished interfaces to dependable services.',
    highlights: ['Web', 'Mobile', 'Backend'],
    logo: '/images/surfyn_logo.png',
  },
  {
    company: 'VALIDE',
    role: 'Co-founder & CTO',
    period: '2021 — 2025',
    summary: 'Set technical direction and evolved an education product from early architecture to AI-assisted learning experiences.',
    highlights: ['Architecture', 'EdTech', 'AI'],
    logo: '/images/valide.png',
  },
]

export default function Experience() {
  return (
    <motion.section
      id="experience"
      className="section-container"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-20 items-start">
          <motion.div variants={fadeUp} className="lg:sticky lg:top-28">
            <span className="line-accent" />
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
              Experience
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.035em] leading-tight" style={{ color: 'var(--fg)' }}>
              Research depth.
              <span className="block" style={{ color: 'var(--fg-muted)' }}>Product ownership.</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed mt-5 max-w-[420px]" style={{ color: 'var(--fg-secondary)' }}>
              I have worked across applied AI, founding teams, and full-stack delivery—so I can reason about the model and the product around it.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-7">
              {[
                ['AI', 'Applied systems'],
                ['0→1', 'Product building'],
                ['E2E', 'Delivery ownership'],
              ].map(([value, label]) => (
                <div key={value}>
                  <p className="text-lg font-semibold tracking-tight" style={{ color: 'var(--fg)' }}>{value}</p>
                  <p className="text-[11px] leading-snug mt-1" style={{ color: 'var(--fg-muted)' }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div>
            {experiences.map((item, i) => (
              <motion.article
                key={`${item.company}-${item.role}`}
                className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 sm:gap-x-5"
                variants={fadeUp}
              >
                <div className="relative flex flex-col items-center">
                  <div
                    className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center z-10"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                  >
                    <Image
                      src={item.logo}
                      alt={`${item.company} logo`}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {i < experiences.length - 1 && (
                    <div className="absolute top-12 bottom-0 w-px" style={{ background: 'var(--border)' }} />
                  )}
                </div>

                <div className={i < experiences.length - 1 ? 'pb-9' : 'pb-0'}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold leading-snug" style={{ color: 'var(--fg)' }}>
                        {item.role}
                      </h3>
                      <p className="text-sm mt-0.5" style={{ color: 'var(--fg-secondary)' }}>{item.company}</p>
                    </div>
                    <span className="text-xs tabular-nums whitespace-nowrap" style={{ color: 'var(--fg-muted)' }}>
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed mt-3 max-w-[640px]" style={{ color: 'var(--fg-secondary)' }}>
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.highlights.map(highlight => (
                      <span
                        key={highlight}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium"
                        style={{ background: 'var(--tag-bg)', color: 'var(--fg-muted)', border: '1px solid var(--tag-border)' }}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
