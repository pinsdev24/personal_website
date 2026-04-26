"use client"
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'

export default function MoreProject() {
  const reduce = useReducedMotion()

  return (
    <motion.section
      id="projects"
      className="section-container"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Image */}
          <motion.div variants={fadeUp} className="w-full md:w-1/2">
            <div
              className="img-reveal w-full aspect-video"
              style={{ border: '1px solid var(--border)' }}
            >
              <Image
                src="/images/working.jpg"
                alt="Working on projects"
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={fadeUp} className="w-full md:w-1/2">
            <span className="line-accent" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] leading-tight mb-4" style={{ color: 'var(--fg)' }}>
              More Projects
            </h2>
            <p className="text-base leading-[1.8] mb-6" style={{ color: 'var(--fg-secondary)' }}>
              Throughout my career, I&apos;ve had the opportunity to work on diverse and impactful projects.
              Explore my complete portfolio to discover the full range of software engineering and full stack projects.
            </p>
            <motion.a
              href="https://github.com/pinsdev24?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              whileHover={reduce ? {} : { scale: 1.02 }}
              whileTap={reduce ? {} : { scale: 0.98 }}
            >
              View full portfolio
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
