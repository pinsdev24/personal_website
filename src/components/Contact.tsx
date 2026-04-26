"use client"
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/pinsdev24',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://cm.linkedin.com/in/prestilien-djionang-pindoh-a21179255',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/prestilien87?t=3cbZZdP_f3-qOBN_O3-5LA&s=35',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const reduce = useReducedMotion()

  return (
    <motion.section
      id="contact"
      className="section-container"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="max-w-[720px] mx-auto text-center">
          <motion.div variants={fadeUp}>
            <span className="line-accent mx-auto" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-6"
            style={{ color: 'var(--fg)' }}
          >
            Let&apos;s work together
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg leading-relaxed mb-10"
            style={{ color: 'var(--fg-secondary)' }}
          >
            I&apos;m always interested in hearing about new opportunities, collaborations, or just having a great conversation about AI, research, and technology.
          </motion.p>

          {/* Contact info */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10">
            <a
              href="mailto:prestilienpindoh@gmail.com"
              className="group flex items-center gap-3 transition-all duration-200"
              style={{ color: 'var(--fg)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
              >
                <Mail size={16} />
              </div>
              <span className="text-sm font-medium group-hover:underline underline-offset-4">
                prestilienpindoh@gmail.com
              </span>
            </a>
            <div className="flex items-center gap-3" style={{ color: 'var(--fg)' }}>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
              >
                <MapPin size={16} />
              </div>
              <span className="text-sm font-medium">Brussels, Belgium</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mb-10">
            <motion.a
              href="mailto:prestilienpindoh@gmail.com"
              className="btn-primary text-base"
              whileHover={reduce ? {} : { scale: 1.02 }}
              whileTap={reduce ? {} : { scale: 0.98 }}
            >
              Send me an email
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--fg-muted)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--fg)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--fg)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--fg-muted)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                }}
                aria-label={`${s.label} Profile`}
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeUp}
          className="mt-20 pt-8 text-center text-xs"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--fg-muted)' }}
        >
          <p>© {new Date().getFullYear()} Prestilien Pindoh. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.section>
  )
}