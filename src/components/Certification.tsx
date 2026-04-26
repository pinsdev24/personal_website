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
    title: "AWS Certified Developer — Associate",
    issuer: "Amazon Web Services",
    url: "https://www.credly.com/badges/a20ef315-4458-4d29-9639-112695053779/public_url",
    image: "/images/aws-certified-developer-associate.png",
  },
  {
    title: "Deep Research with LangGraph",
    issuer: "LangChain Academy",
    url: "https://academy.langchain.com/certificates/pzfratlaov",
    image: "/images/langchain_academy_certificate.png",
  },
  {
    title: "Deep Agents with LangGraph",
    issuer: "LangChain Academy",
    url: "https://academy.langchain.com/certificates/fwsryt2jhm",
    image: "/images/certificate-714493365.jpg",
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
        <motion.div variants={fadeUp}>
          <span className="line-accent" />
          <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
            Credentials
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-12" style={{ color: 'var(--fg)' }}>
            Certifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((c) => (
            <motion.a
              key={c.title}
              href={c.url}
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
              <div className="w-full aspect-video overflow-hidden flex items-center justify-center p-4" style={{ background: 'var(--bg-secondary)' }}>
                <Image
                  src={c.image}
                  alt={c.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-base font-semibold leading-snug" style={{ color: 'var(--fg)' }}>
                    {c.title}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: 'var(--fg-muted)' }}
                  />
                </div>
                <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                  {c.issuer}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  )
}