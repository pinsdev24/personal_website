"use client"
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'

type Project = {
  src: string
  alt: string
  title: string
  description: string
  href: string
  tags: string[]
}

const projects: Project[] = [
  {
    src: '/images/clustering_client.png',
    alt: 'E-commerce Client Segmentation',
    title: 'E-commerce Client Segmentation',
    description: 'Behavioral segmentation model using PCA and K-Means clustering to identify customer segments — VIPs, Confirmed Buyers, Window Shoppers, and Churners.',
    href: 'https://github.com/pinsdev24/client_segmentation',
    tags: ['Machine Learning', 'Python', 'Data Science'],
  },
  {
    src: '/images/fraud_detection.png',
    alt: 'MLOps Fraud Detection',
    title: 'MLOps Fraud Detection',
    description: 'End-to-end industrialization of a bank anomaly detection model using XGBoost and MLflow. Features a production-ready FastAPI inference API, automated CI/CD pipelines, and isolated Docker architecture.',
    href: 'https://github.com/pinsdev24/mlops-fraud-detection',
    tags: ['MLOps', 'XGBoost', 'Python', 'Docker'],
  },
  {
    src: '/images/chest.jpeg',
    alt: 'Chest X-Ray Pneumonia Detection',
    title: 'Chest X-Ray Pneumonia Detection',
    description: 'AI-powered web application for detecting pneumonia from chest X-ray images using a fine-tuned ResNet18 model served via FastAPI.',
    href: 'https://github.com/pinsdev24/chest-xray-app',
    tags: ['Deep Learning', 'FastAPI', 'PyTorch'],
  },
  {
    src: '/images/todomcp_langgraph.png',
    alt: 'Todo MCP Agent',
    title: 'MCP Server',
    description: 'An MCP server built with Python, Pydantic and SQLite to manage personal todo lists, connected to a local MCP client.',
    href: 'https://github.com/pinsdev24/IntelligentSystemsLab/tree/main/ai-agent/todo-agent-mcp',
    tags: ['MCP', 'Python', 'AI Agent'],
  },
  {
    src: '/images/afrikdelices.png',
    alt: 'Afrik Delices',
    title: 'Afrik Delices',
    description: 'A culinary platform showcasing authentic African recipes, connecting food enthusiasts with traditional cooking from across the continent.',
    href: 'https://afrikdelices.com/',
    tags: ['Food', 'Mobile App', 'AI'],
  },
  {
    src: '/images/valide_landing.png',
    alt: 'Valide — Educational Platform',
    title: 'Valide',
    description: 'Educational platform revolutionizing learning in Cameroon through AI-powered assistance and comprehensive academic resources.',
    href: 'https://valide237.web.app/',
    tags: ['Full Stack', 'AI', 'Education'],
  },
]

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
        <motion.div variants={fadeUp}>
          <span className="line-accent" />
          <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-12" style={{ color: 'var(--fg)' }}>
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl overflow-hidden card-lift"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
              }}
              variants={fadeUp}
              whileHover={reduce ? {} : { y: -4 }}
            >
              {/* Image */}
              <div className="w-full aspect-[16/10] overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={600}
                  height={375}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>
                    {p.title}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    className="flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: 'var(--fg-muted)' }}
                  />
                </div>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--fg-secondary)' }}>
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium"
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
          ))}
        </div>
      </div>
    </motion.section>
  )
}