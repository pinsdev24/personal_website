import Image from 'next/image'
import { Mail, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="bg-[#1a2c20] rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12">
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tighter mb-4 sm:mb-6 md:mb-8 text-center">
        Let&apos;s Connect
      </h2>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12">
        <div className="md:flex-1 md:max-w-[40%]">
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg">
            <Image
              src="/images/contact_image.png"
              alt="Prestilien Pindoh"
              width={600}
              height={800}
              className="w-full h-auto rounded-lg sm:rounded-xl hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        <div className="md:flex-1 flex flex-col gap-6 sm:gap-8 md:gap-10 justify-center">
          <div className="flex flex-col gap-4 sm:gap-6">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Contact Information</h3>
            <div className="flex items-center gap-3 sm:gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#264532] text-[#38e07b]">
                <span className="material-symbols-outlined text-sm sm:text-base">
                  <Mail />
                </span>
              </div>
              <div>
                <p className="text-[#96c5a9] text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Email</p>
                <a href="mailto:prestilienpindoh@gmail.com" className="text-white text-base sm:text-lg font-semibold hover:text-[#38e07b] transition-colors">
                  prestilienpindoh@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#264532] text-[#38e07b]">
                <span className="material-symbols-outlined text-sm sm:text-base">
                  <MapPin />
                </span>
              </div>
              <div>
                <p className="text-[#96c5a9] text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">Location</p>
                <span className="text-white text-base sm:text-lg font-semibold">Brussels, Belgique</span>
              </div>
            </div>
          </div>
          <div className="bg-[#264532]/30 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-[#366348]">
            <p className="text-[#96c5a9] text-sm sm:text-base leading-relaxed">
              I&apos;m always interested in hearing about new opportunities, collaborations, or just having a great conversation about AI, research, and technology.
            </p>
          </div>
          <div>
            <p className="text-white text-xs sm:text-sm font-medium mb-2 sm:mb-3">Connect with me</p>
            <div className="flex gap-3 sm:gap-4">
              <a href="https://github.com/pinsdev24" target="_blank" className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#264532] text-white hover:text-[#38e07b] hover:bg-[#1a2c20] transition-all duration-300" aria-label="GitHub Profile">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://cm.linkedin.com/in/prestilien-djionang-pindoh-a21179255" target="_blank" className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#264532] text-white hover:text-[#38e07b] hover:bg-[#1a2c20] transition-all duration-300" aria-label="LinkedIn Profile">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://x.com/prestilien87?t=3cbZZdP_f3-qOBN_O3-5LA&s=35" target="_blank" className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#264532] text-white hover:text-[#38e07b] hover:bg-[#1a2c20] transition-all duration-300" aria-label="Twitter/X Profile">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}