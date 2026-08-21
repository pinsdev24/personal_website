"use client"
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/pinsdev24',
    icon: Github,
    copy: 'Code, experiments, and implementation details',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/prestilien-djionang-pindoh-a21179255',
    icon: Linkedin,
    copy: 'Experience, credentials, and professional context',
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
        <motion.div
          variants={fadeUp}
          className="rounded-3xl p-7 sm:p-10 md:p-14 overflow-hidden"
          style={{ background: 'var(--fg)', color: 'var(--bg)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.62fr] gap-10 lg:gap-16 items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase opacity-60">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Available for the right team
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.045em] leading-[1.05] mt-6 max-w-[760px]">
                Need an engineer who can own the path from model to monitor?
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mt-6 max-w-[680px] opacity-65">
                I&apos;m looking for AI/ML or software engineering work where strong systems thinking, product judgment, and production ownership matter.
              </p>
            </div>
            <div className="lg:text-right">
              <p className="inline-flex items-center gap-2 text-xs mb-5 opacity-60">
                <MapPin size={13} /> Brussels, Belgium · open to remote
              </p>
              <br />
              <motion.a
                href="mailto:prestilienpindoh@outlook.com"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                style={{ background: 'var(--bg)', color: 'var(--fg)' }}
                whileHover={reduce ? {} : { scale: 1.02 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
              >
                <Mail size={15} /> Let&apos;s talk <ArrowUpRight size={15} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl p-5"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--tag-bg)', border: '1px solid var(--tag-border)', color: 'var(--fg)' }}>
                  <Icon size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{social.label}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>{social.copy}</p>
                </div>
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'var(--fg-muted)' }} />
              </a>
            )
          })}
        </motion.div>

        <motion.footer
          variants={fadeUp}
          className="mt-16 pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-xs"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--fg-muted)' }}
        >
          <div>
            <p className="font-semibold" style={{ color: 'var(--fg)' }}>Prestilien Pindoh</p>
            <p className="mt-1">AI/ML · Software · Cloud</p>
          </div>
          <div className="flex items-center gap-6">
            <p>© {new Date().getFullYear()} All rights reserved.</p>
            <motion.a
              href="#home"
              className="inline-flex items-center gap-2 font-medium"
              style={{ color: 'var(--fg)' }}
              whileHover={reduce ? {} : { y: -2 }}
            >
              Back to top <ArrowUp size={13} />
            </motion.a>
          </div>
        </motion.footer>
      </div>
    </motion.section>
  )
}