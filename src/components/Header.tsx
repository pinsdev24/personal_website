'use client'
import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { Sun, Moon, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#featured-projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useTheme()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20)
  })

  const navigate = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.querySelector(id) as HTMLElement | null
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
    }
    setOpen(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4"
        style={{
          background: scrolled ? 'var(--bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px) saturate(1.2)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="text-lg font-semibold tracking-tight"
            style={{ color: 'var(--fg)' }}
          >
            prestilienpindoh<span style={{ color: 'var(--fg-muted)' }}>.me</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => navigate(e, link.href)}
                className="text-sm font-medium transition-colors duration-200 hover:opacity-100"
                style={{ color: 'var(--fg-secondary)', opacity: 0.8 }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--fg)'; (e.target as HTMLElement).style.opacity = '1' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--fg-secondary)'; (e.target as HTMLElement).style.opacity = '0.8' }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggle}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer"
              style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggle}
              className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer"
              style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            </button>
            <button
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => setOpen(prev => !prev)}
              className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer"
              style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8"
            style={{ background: 'var(--bg)' }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => navigate(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="text-2xl font-medium"
                style={{ color: 'var(--fg)' }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}