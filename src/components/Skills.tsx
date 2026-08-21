"use client"
import { motion } from 'framer-motion'
import { Activity, Boxes, CloudUpload, Network } from 'lucide-react'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'

const deliveryStages = [
  {
    title: 'Design',
    icon: Network,
    copy: 'System boundaries, failure modes, model behavior, and human checkpoints.',
  },
  {
    title: 'Build',
    icon: Boxes,
    copy: 'Testable workflows, typed APIs, retrieval pipelines, and evaluation loops.',
  },
  {
    title: 'Ship',
    icon: CloudUpload,
    copy: 'Containers, CI/CD, infrastructure as code, and cloud-native delivery.',
  },
  {
    title: 'Observe',
    icon: Activity,
    copy: 'Metrics, traces, errors, latency, cost, and LLM output quality.',
  },
]

const skillGroups = [
  {
    category: 'AI systems',
    skills: ['Python', 'PyTorch', 'TorchRL', 'XGBoost', 'LangChain', 'LangGraph', 'RAG'],
  },
  {
    category: 'Delivery',
    skills: ['AWS', 'Docker', 'Terraform', 'CI/CD', 'MLflow', 'FastAPI', 'Serverless'],
  },
  {
    category: 'Observability',
    skills: ['Prometheus', 'Sentry', 'Langfuse', 'LangSmith', 'Structured logs', 'LLM evaluation'],
  },
  {
    category: 'Software foundation',
    skills: ['TypeScript', 'Next.js', 'PostgreSQL', 'Node.js', 'System design', 'REST APIs'],
  },
]

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="section-container"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-[1fr_0.8fr] gap-5 md:gap-12 items-end">
          <div>
            <span className="line-accent" />
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
              Production engineering
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.04em] leading-[1.05]" style={{ color: 'var(--fg)' }}>
              From prototype
              <span className="block" style={{ color: 'var(--fg-muted)' }}>to observable system.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed md:pb-1" style={{ color: 'var(--fg-secondary)' }}>
            A model is only one dependency. I think about the API, deployment, failure recovery, monitoring, and feedback loop around it.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px mt-10 rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--border)', background: 'var(--border)' }}
        >
          {deliveryStages.map((stage, index) => {
            const Icon = stage.icon
            return (
              <div
                key={stage.title}
                className="p-5 sm:p-6"
                style={{ background: 'var(--card-bg)' }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--tag-bg)', border: '1px solid var(--tag-border)', color: 'var(--fg)' }}>
                  <Icon size={16} />
                </div>
                <div className="flex items-baseline gap-2 mt-5">
                  <span className="text-[10px] font-mono" style={{ color: 'var(--fg-muted)' }}>0{index + 1}</span>
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{stage.title}</h3>
                </div>
                <p className="text-xs leading-relaxed mt-2" style={{ color: 'var(--fg-secondary)' }}>{stage.copy}</p>
              </div>
            )
          })}
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center gap-3 mt-12 mb-7">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--fg-muted)' }}>
            Production toolkit
          </p>
          <span className="h-px flex-1" style={{ background: 'var(--border)' }} />
        </motion.div>

        <div className="flex flex-col gap-6">
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-[10.5rem_1fr] gap-3 sm:gap-8 sm:items-baseline"
            >
              <h3 className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--fg-muted)' }}>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      background: 'var(--tag-bg)',
                      color: 'var(--tag-fg)',
                      border: '1px solid var(--tag-border)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
