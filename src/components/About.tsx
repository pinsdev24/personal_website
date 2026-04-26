"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeUp, slideInLeft, slideInRight, stagger, viewportOnce } from '@/lib/animations'

export default function About() {
  return (
    <motion.section
      id="about"
      className="section-container"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div variants={fadeUp}>
          <span className="line-accent" />
          <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
            About
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-12" style={{ color: 'var(--fg)' }}>
            Who I am
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Photo */}
          <motion.div
            variants={slideInLeft}
            className="w-full md:w-2/5 flex justify-center"
          >
            <div className="img-reveal max-w-[360px] w-full aspect-[3/4]"
              style={{ border: '1px solid var(--border)' }}
            >
              <Image
                src="/images/profile_image.jpg"
                alt="Prestilien Pindoh — Software Engineer specializing in System Design and AI Integration"
                width={360}
                height={480}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={slideInRight}
            className="w-full md:w-3/5 flex flex-col justify-center"
          >
            <div className="space-y-5" style={{ color: 'var(--fg-secondary)' }}>
              <p className="text-base sm:text-lg leading-[1.8]">
                I am an AI engineer with expertise in building intelligent systems and scalable designs that can handle growing demands and complex requirements. My approach combines technical excellence with a deep understanding of business needs.
              </p>
              <p className="text-base sm:text-lg leading-[1.8]">
                My passion lies in intelligent AI integration, where I develop and implement AI solutions that solve real-world problems. Using my data science skills, I build custom AI models tailored to specific use cases rather than relying solely on off-the-shelf solutions.
              </p>
              <p className="text-base sm:text-lg leading-[1.8]">
                I specialize in deploying scalable applications on cloud platforms, ensuring they are reliable, secure, and cost-effective. My experience spans across various cloud providers and technologies.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {['Machine Learning', 'Reinforcement Learning', 'System Design', 'Data Science'].map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                  style={{
                    background: 'var(--tag-bg)',
                    color: 'var(--tag-fg)',
                    border: '1px solid var(--tag-border)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}