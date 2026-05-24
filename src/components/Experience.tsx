"use client"
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
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
    period: 'Feb 2026 — Present',
    status: 'Current',
    summary: 'Internship focused on applied AI engineering, intelligent systems, and production-minded experimentation.',
    highlights: ['AI engineering', 'Reinforcement Learning', 'eXplainability (XRL)'],
    logo: '/images/multitel_logo.png',
  },
  {
    company: 'Afrik Delices',
    role: 'Founder, Product Engineer & Manager',
    period: 'Jul 2023 — Present',
    summary: 'Founded and shaped a food-tech product around African cuisine, balancing product direction, engineering, and user experience.',
    highlights: ['Product leadership', 'Full-stack product', 'Mobile app'],
    logo: '/images/afrikdelice.png',
  },
  {
    company: 'Surfyn',
    role: 'Full Stack Developer (Part-time)',
    period: 'Jan 2023 — Dec 2023',
    summary: 'Developed full-stack features across mobile, web, and backend platforms. Built and maintained features connecting user-facing interfaces with reliable backend services.',
    highlights: ['Mobile', 'Web', 'Backend'],
    logo: '/images/surfyn_logo.png',
  },
  {
    company: 'VALIDE',
    role: 'Co-founder & CTO',
    period: '2021 — Present',
    summary: 'Co-founded an education platform and led technical decisions from early product architecture to AI-enabled learning experiences.',
    highlights: ['Technical strategy', 'Education tech', 'AI features'],
    logo: '/images/valide.png',
  },
]

export default function Experience() {
  const reduce = useReducedMotion()

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
        <motion.div variants={fadeUp}>
          <span className="line-accent" />
          <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-12" style={{ color: 'var(--fg)' }}>
            Work history
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {experiences.map((item) => (
            <motion.article
              key={`${item.company}-${item.role}`}
              className="group flex flex-col rounded-2xl overflow-hidden card-lift"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
              }}
              variants={fadeUp}
              whileHover={reduce ? {} : { y: -4 }}
            >
              {/* Header with logo & meta */}
              <div className="p-6 pb-0 flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <Image
                    src={item.logo}
                    alt={`${item.company} logo`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold leading-snug" style={{ color: 'var(--fg)' }}>
                      {item.company}
                    </h3>
                    {item.status && (
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                        style={{
                          background: 'var(--tag-bg)',
                          color: 'var(--fg-muted)',
                          border: '1px solid var(--tag-border)',
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                          style={{ animation: 'pulse 2s ease-in-out infinite' }}
                        />
                        {item.status}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
                    {item.role}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <span
                  className="inline-flex items-center gap-1.5 text-xs mb-4 self-start"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  <CalendarDays size={13} />
                  {item.period}
                </span>

                <p className="text-sm leading-[1.75] mb-5 flex-1" style={{ color: 'var(--fg-secondary)' }}>
                  {item.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.highlights.map(highlight => (
                    <span
                      key={highlight}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: 'var(--tag-bg)',
                        color: 'var(--fg-muted)',
                        border: '1px solid var(--tag-border)',
                      }}
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
    </motion.section>
  )
}
