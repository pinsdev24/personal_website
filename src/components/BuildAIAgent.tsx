"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { fadeUp, slideInLeft, slideInRight, stagger, viewportOnce } from '@/lib/animations'

type AIProject = {
  title: string
  description: string
  image: string
  link: string
  isGithub?: boolean
  highlights: string[]
}

const aiProjects: AIProject[] = [
  {
    title: "DeepResearch Agent",
    description: "I build production-grade AI agents that plan, act, and learn across complex workflows. Using LangChain for tool orchestration, LangGraph for reliable graph-based control over multi-step flows, and LangSmith for tracing and evaluation.",
    image: "/images/deepresearch-agent.png",
    link: "https://github.com/pinsdev24/IntelligentSystemsLab/tree/main/ai-agent/deep_research_agent_from_scratch",
    isGithub: true,
    highlights: ["LangChain", "LangGraph", "LangSmith"]
  },
  {
    title: "StudentHub",
    description: "An AI-powered academic ecosystem that transforms course materials into intelligent study assistants. It utilizes advanced RAG to analyze syllabuses and PDFs, providing verified answers with precise source citations and automated quiz generation to eliminate AI hallucinations.",
    image: "/images/studenthub.png",
    link: "https://studenthub-frontend.vercel.app/",
    isGithub: false,
    highlights: ["RAG", "PDF Intelligence", "Academic AI"]
  }
]

export default function BuildAIAgent() {
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
        <motion.div variants={fadeUp}>
          <span className="line-accent" />
          <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
            AI Engineering
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-16" style={{ color: 'var(--fg)' }}>
            Building AI Agents
          </h2>
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-32">
          {aiProjects.map((project, index) => (
            <div 
              key={project.title}
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image */}
              <motion.div 
                variants={index % 2 === 0 ? slideInLeft : slideInRight} 
                className="w-full md:w-3/5"
              >
                <div
                  className="img-reveal w-full aspect-video group"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} — AI implementation by Prestilien Pindoh`}
                    width={720}
                    height={405}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div 
                variants={index % 2 === 0 ? slideInRight : slideInLeft} 
                className="w-full md:w-2/5"
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
                  {project.title}
                </h3>
                <p className="text-base leading-[1.8] mb-6" style={{ color: 'var(--fg-secondary)' }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.highlights.map(highlight => (
                    <span 
                      key={highlight}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: 'var(--tag-bg)', color: 'var(--fg)', border: '1px solid var(--border)' }}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {project.isGithub ? <Github size={16} /> : <ExternalLink size={16} />}
                  {project.isGithub ? "View on GitHub" : "Visit Project"}
                </motion.a>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}