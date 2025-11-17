import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-[400px] sm:min-h-[450px] md:min-h-[520px] rounded-xl sm:rounded-2xl overflow-hidden flex items-end p-6 sm:p-8 md:p-12">
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-fELegAQoHR60p1KIsa62X6KJCRX9XrXITy4ny4lsjneeOEmQJukbYcazPIz_mDAn_fZv89N45zdKKnQI2YYyjmvwBPSgK4HRs0K7ZR9GljjEEeWdW_uCYEd5nIuT464dlhR9UVQTLMSTvCtCXrtl0LoFKzNjn5Z-DeabbObHmSwiCq5D7W62eT3yURDtM6cF44wU5mxSvY7eTI0OV6UeOJx1E6bUamXlHGmcYuGNocruvoI43D-9ofie8Jzv31_0vIEvY3VDkQqI')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 -z-10"></div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-10">
        <div className="flex flex-col gap-4 sm:gap-6 text-left max-w-3xl flex-1">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter">
            Prestilien Pindoh - Building the Future of Cloud & AI
          </h1>
          <h2 className="text-gray-200 text-base sm:text-lg font-normal leading-relaxed">
            Software Engineer specializing in scalable system design and intelligent AI integration. Creating robust and
            innovative solutions to complex technological challenges.
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
            <a
              href="#featured-projects"
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 sm:h-12 px-6 sm:px-8 bg-[#38e07b] text-[#122118] text-base sm:text-lg font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
            >
              <span className="truncate">My Work</span>
            </a>
            <a
              href="#contact"
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 sm:h-12 px-6 sm:px-8 bg-white/10 backdrop-blur-sm text-white text-base sm:text-lg font-bold leading-normal tracking-[0.015em] hover:bg-white/20 transition-colors"
            >
              <span className="truncate">Contact Me</span>
            </a>
          </div>
        </div>
        <a
          href="https://www.credly.com/badges/a20ef315-4458-4d29-9639-112695053779/public_url"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-28 sm:w-32 md:w-36 lg:w-40 md:self-start md:mt-2 hover:scale-105 transition-all duration-300 order-first md:order-last"
        >
          <Image
            src="/images/aws-certified-developer-associate.png"
            alt="AWS Certified Developer - Associate"
            width={160}
            height={160}
            className="w-full h-auto rounded-full border-2 border-transparent hover:border-[#38e07b] transition-colors duration-300"
          />
        </a>
      </div>
    </section>
  )
}