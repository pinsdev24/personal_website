'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
  const [open, setOpen] = useState(false)

  const handleToggle = () => setOpen(prev => !prev)
  const handleLinkClick = () => setOpen(false)

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
              className="text-white text-base font-medium leading-normal hover:text-[#38e07b] transition-colors"
              href="#about"
            >About</a>
            <a
              className="text-white text-base font-medium leading-normal hover:text-[#38e07b] transition-colors"
              href="#featured-projects"
            >Projects</a>
            <a
              className="text-white text-base font-medium leading-normal hover:text-[#38e07b] transition-colors"
              href="#skills"
            >Skills</a>
            <a
              className="text-white text-base font-medium leading-normal hover:text-[#38e07b] transition-colors"
              href="#contact"
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
      <div id="mobile-menu" className={(open ? '' : 'hidden ') + 'bg-[#0d1a12] border-b border-[#264532] md:hidden'}>
        <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
          <a onClick={handleLinkClick} href="#about" className="text-white hover:text-[#38e07b] block px-3 py-2 text-base font-medium transition-colors">About</a>
          <a onClick={handleLinkClick} href="#featured-projects" className="text-white hover:text-[#38e07b] block px-3 py-2 text-base font-medium transition-colors">Projects</a>
          <a onClick={handleLinkClick} href="#skills" className="text-white hover:text-[#38e07b] block px-3 py-2 text-base font-medium transition-colors">Skills</a>
          <a onClick={handleLinkClick} href="#contact" className="text-white hover:text-[#38e07b] block px-3 py-2 text-base font-medium transition-colors">Contact</a>
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
      </div>
    </>
  )
}