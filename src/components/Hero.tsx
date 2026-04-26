"use client"
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <motion.section
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 md:px-10 pt-20"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-[800px] mx-auto text-center flex flex-col items-center gap-8">
        {/* Profile image */}
        <motion.div
          variants={fadeUp}
          className="relative"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden"
            style={{ border: '2px solid var(--border)' }}
          >
            <Image
              src="/images/bw.jpg"
              alt="Prestilien Pindoh"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          {/* Status indicator */}
          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: 'var(--bg)', border: '2px solid var(--bg)' }}
          >
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
        </motion.div>

        {/* Tag */}
        {/* <motion.div variants={fadeUp}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase"
            style={{
              background: 'var(--tag-bg)',
              color: 'var(--fg-secondary)',
              border: '1px solid var(--tag-border)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for work
          </span>
        </motion.div> */}

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-[-0.03em]"
          style={{ color: 'var(--fg)' }}
        >
          AI Engineer{' '}
          <br className="hidden sm:block" />
          <span style={{ color: 'var(--fg-muted)' }}>Software & Cloud</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg md:text-xl leading-relaxed max-w-[560px]"
          style={{ color: 'var(--fg-secondary)' }}
        >
          Building intelligent AI solutions and scalable systems.
          Turning complex challenges into elegant, production-grade software.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-2">
          <motion.a
            href="#featured-projects"
            className="btn-primary"
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={reduce ? {} : { scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault()
              const el = document.querySelector('#featured-projects')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View my work
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-secondary"
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={reduce ? {} : { scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault()
              const el = document.querySelector('#contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get in touch
          </motion.a>
        </motion.div>

        {/* AWS Badge */}
        <motion.a
          variants={fadeUp}
          href="https://www.credly.com/badges/a20ef315-4458-4d29-9639-112695053779/public_url"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 mt-4 px-4 py-2 rounded-full transition-all duration-300"
          style={{ background: 'var(--tag-bg)', border: '1px solid var(--tag-border)' }}
          whileHover={reduce ? {} : { scale: 1.02 }}
        >
          <Image
            src="/images/aws-certified-developer-associate.png"
            alt="AWS Certified Developer - Associate"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-xs font-medium" style={{ color: 'var(--fg-secondary)' }}>
            AWS Certified Developer — Associate
          </span>
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ color: 'var(--fg-muted)' }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}