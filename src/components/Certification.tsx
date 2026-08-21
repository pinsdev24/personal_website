"use client"
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'

type Cert = {
  title: string
  issuer: string
  url: string
  image: string
}

const certifications: Cert[] = [
  {
    title: 'AWS Certified Developer — Associate',
    issuer: 'Amazon Web Services',
    url: 'https://www.credly.com/badges/a20ef315-4458-4d29-9639-112695053779/public_url',
    image: '/images/aws-certified-developer-associate.png',
  },
  {
    title: 'Deep Research with LangGraph',
    issuer: 'LangChain Academy',
    url: 'https://academy.langchain.com/certificates/pzfratlaov',
    image: '/images/langchain_academy_certificate.png',
  },
  {
    title: 'Deep Agents with LangGraph',
    issuer: 'LangChain Academy',
    url: 'https://academy.langchain.com/certificates/fwsryt2jhm',
    image: '/images/certificate-714493365.jpg',
  },
]

export default function Certification() {
  const reduce = useReducedMotion()

  return (
    <motion.section
      id="certifications"
      className="section-container"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
              Credentials
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] leading-tight" style={{ color: 'var(--fg)' }}>
              Signals you can verify.
            </h2>
          </div>
          <p className="text-xs sm:text-sm max-w-[360px] sm:text-right" style={{ color: 'var(--fg-muted)' }}>
            Cloud engineering and agentic AI learning backed by public credentials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {certifications.map((c) => (
            <motion.a
              key={c.title}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl px-4 py-3 card-lift"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
              }}
              variants={fadeUp}
              whileHover={reduce ? {} : { y: -2 }}
            >
              <div
                className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <Image
                  src={c.image}
                  alt=""
                  width={44}
                  height={44}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold leading-snug" style={{ color: 'var(--fg)' }}>
                  {c.title}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--fg-muted)' }}>
                  {c.issuer}
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: 'var(--fg-muted)' }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
