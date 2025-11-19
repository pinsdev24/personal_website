'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

export default function Header() {
  const [open, setOpen] = useState(false)

  const handleToggle = () => setOpen(prev => !prev)

  const navigate = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.querySelector(id) as HTMLElement | null
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
    }
    setOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
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
      <header
        className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#264532] px-4 sm:px-6 md:px-10 py-4 sticky top-0 bg-[#0d1a12] z-50"
      >
        <div className="flex items-center gap-2 sm:gap-3 text-white">
          <h2
            className="text-white text-lg sm:text-xl font-bold leading-tight tracking-[-0.015em] truncate"
          >
            Prestilien Pindoh
          </h2>
        </div>
        <button
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={handleToggle}
          className="md:hidden flex items-center justify-center p-2 rounded-md text-white hover:text-[#38e07b] transition-colors"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div className="hidden md:flex flex-1 justify-end gap-6">
          <div className="flex items-center gap-6">
            <a
              className="text-white text-base font-medium leading-normal hover:text-[#38e07b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38e07b] rounded-md"
              href="#about"
              onClick={(e) => navigate(e, '#about')}
            >About</a>
            <a
              className="text-white text-base font-medium leading-normal hover:text-[#38e07b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38e07b] rounded-md"
              href="#featured-projects"
              onClick={(e) => navigate(e, '#featured-projects')}
            >Projects</a>
            <a
              className="text-white text-base font-medium leading-normal hover:text-[#38e07b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38e07b] rounded-md"
              href="#skills"
              onClick={(e) => navigate(e, '#skills')}
            >Skills</a>
            <a
              className="text-white text-base font-medium leading-normal hover:text-[#38e07b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38e07b] rounded-md"
              href="#contact"
              onClick={(e) => navigate(e, '#contact')}
            >Contact</a>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/images/profile.png"
              alt="Prestilien Pindoh - Software Engineer Profile Picture"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#38e07b]"
            />
          </div>
        </div>
      </header>
      <AnimatePresence>
      {open && (
      <motion.div id="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2, ease: 'easeOut' }} className={'bg-[#0d1a12] border-b border-[#264532] md:hidden'}>
        <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
          <a onClick={(e) => navigate(e, '#about')} href="#about" className="text-white hover:text-[#38e07b] block px-3 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38e07b] rounded-md">About</a>
          <a onClick={(e) => navigate(e, '#featured-projects')} href="#featured-projects" className="text-white hover:text-[#38e07b] block px-3 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38e07b] rounded-md">Projects</a>
          <a onClick={(e) => navigate(e, '#skills')} href="#skills" className="text-white hover:text-[#38e07b] block px-3 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38e07b] rounded-md">Skills</a>
          <a onClick={(e) => navigate(e, '#contact')} href="#contact" className="text-white hover:text-[#38e07b] block px-3 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38e07b] rounded-md">Contact</a>
          <div className="pt-2 flex justify-center">
            <Image
              src="/images/profile.png"
              alt="Prestilien Pindoh - Software Engineer Profile Picture"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#38e07b]"
            />
          </div>
        </div>
      </motion.div>
      )}
      </AnimatePresence>
    </>
  )
}