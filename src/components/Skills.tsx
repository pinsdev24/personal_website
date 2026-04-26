"use client"
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'

const skillGroups = [
  {
    category: 'AI & Machine Learning',
    skills: ['Machine Learning', 'Reinforcement Learning (RL)', 'Torch', 'TorchRL', 'XAI (XRL)', 'LangChain', 'LangGraph'],
  },
  {
    category: 'Cloud & MLOps',
    skills: ['AWS', 'MLOps', 'Serverless', 'Docker', 'Terraform', 'CI/CD'],
  },
  {
    category: 'Architecture',
    skills: ['System Design', 'Microservices', 'API Design', 'REST APIs'],
  },
  {
    category: 'Development',
    skills: ['Python', 'Node.js', 'Full Stack Engineering', 'Mobile Application'],
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
        <motion.div variants={fadeUp}>
          <span className="line-accent" />
          <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
            Expertise
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-12" style={{ color: 'var(--fg)' }}>
            What I work with
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {skillGroups.map((group) => (
            <motion.div key={group.category} variants={fadeUp}>
              <h3 className="text-sm font-semibold tracking-[0.1em] uppercase mb-5" style={{ color: 'var(--fg-muted)' }}>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2.5 rounded-full text-sm font-medium cursor-default transition-all duration-200"
                    style={{
                      background: 'var(--tag-bg)',
                      color: 'var(--tag-fg)',
                      border: '1px solid var(--tag-border)',
                    }}
                    whileHover={{
                      scale: 1.04,
                      borderColor: 'var(--card-hover-border)',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}