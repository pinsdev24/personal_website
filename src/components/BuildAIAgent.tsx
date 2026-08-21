"use client"
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'

type AIProject = {
  index: string
  eyebrow: string
  title: string
  description: string
  image: string
  link: string
  architecture: string[]
  proof: string[]
  highlights: string[]
}

const aiProjects: AIProject[] = [
  {
    index: '01',
    eyebrow: 'Agentic systems',
    title: 'Ariadne AI',
    description: 'A multi-agent career platform that turns a job search into a controlled workflow instead of a sequence of disconnected prompts.',
    image: '/images/ariadne-agent-website.png',
    link: 'https://career-agent-production-be19.up.railway.app',
    architecture: ['Semantic match', 'Human review', 'Role scouting'],
    proof: ['Explicit LangGraph control flow', 'Human approval before high-impact output', 'Traceable decisions across agent steps'],
    highlights: ['LangGraph', 'Multi-agent', 'Human-in-the-loop'],
  },
  {
    index: '02',
    eyebrow: 'Grounded AI',
    title: 'StudentHub',
    description: 'An academic assistant that grounds answers in course material, shows its sources, and turns documents into active study workflows.',
    image: '/images/studenthub.png',
    link: 'https://studenthub-frontend.vercel.app/',
    architecture: ['Ingest documents', 'Retrieve context', 'Answer + cite'],
    proof: ['Answers grounded in retrieved context', 'Source citations for verification', 'Quiz generation from course material'],
    highlights: ['RAG', 'PDF processing', 'Citations'],
  },
]

export default function BuildAIAgent() {
  const reduce = useReducedMotion()

  return (
    <motion.section
      id="ai-agents"
      className="section-container"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr] gap-5 md:gap-12 items-end mb-12">
          <div>
            <span className="line-accent" />
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
              AI Engineering
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.04em] leading-[1.05]" style={{ color: 'var(--fg)' }}>
              AI that does real work.
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed md:pb-1" style={{ color: 'var(--fg-secondary)' }}>
            I design reliable workflows around models: explicit state, grounded context, human control, and a path to evaluation.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {aiProjects.map((project, projectIndex) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              className="rounded-3xl overflow-hidden"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${projectIndex % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div
                  className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-full overflow-hidden"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} — AI system by Prestilien Pindoh`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                  />
                  <div
                    className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.12em] uppercase"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)' }}
                  >
                    {project.index} · {project.eyebrow}
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10 flex flex-col">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em]" style={{ color: 'var(--fg)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed mt-4" style={{ color: 'var(--fg-secondary)' }}>
                    {project.description}
                  </p>

                  <div className="mt-7">
                    <p className="text-[10px] font-semibold tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--fg-muted)' }}>
                      System flow
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {project.architecture.map((step, index) => (
                        <div key={step} className="flex items-center gap-2">
                          <span
                            className="px-3 py-1.5 rounded-lg text-xs font-medium"
                            style={{ background: 'var(--tag-bg)', border: '1px solid var(--tag-border)', color: 'var(--fg)' }}
                          >
                            {step}
                          </span>
                          {index < project.architecture.length - 1 && (
                            <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 space-y-2.5">
                    {project.proof.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                        <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--fg)' }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-7">
                    {project.highlights.map(highlight => (
                      <span
                        key={highlight}
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                        style={{ background: 'var(--tag-bg)', color: 'var(--fg-muted)', border: '1px solid var(--tag-border)' }}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-8 text-sm font-semibold self-start underline-offset-4 hover:underline"
                    style={{ color: 'var(--fg)' }}
                    whileHover={reduce ? {} : { x: 3 }}
                  >
                    Explore live project <ArrowUpRight size={15} />
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
