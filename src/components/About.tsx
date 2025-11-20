"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.section id="about" className="px-4 py-8 sm:py-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tighter pb-6 sm:pb-8 pt-3 sm:pt-5">
        About Prestilien Pindoh
      </h2>
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="w-full md:w-2/5 flex justify-center">
          <motion.div className="rounded-xl overflow-hidden border-2 border-transparent hover:border-[#38e07b] transition-colors duration-300 max-w-[350px] w-full aspect-[3/4]" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <Image
              src="/images/profile_image.jpg"
              alt="Prestilien Pindoh - Software Engineer specializing in System Design and AI Integration"
              width={350}
              height={466}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <div className="w-full md:w-3/5">
          <motion.div className="text-gray-200 space-y-4" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <p className="text-base sm:text-lg leading-relaxed">
              I am a software engineer with expertise in building scalable system designs that can handle growing demands and complex requirements. My approach combines technical excellence with a deep understanding of business needs.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              My passion lies in intelligent AI integration, where I develop and implement AI solutions that solve real-world problems. Using my data science skills, I build custom AI models tailored to specific use cases rather than relying solely on off-the-shelf solutions.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              I specialize in deploying scalable applications on cloud platforms, ensuring they are reliable, secure, and cost-effective. My experience spans across various cloud providers and technologies, allowing me to choose the best tools for each project.
            </p>
          </motion.div>
          <div className="mt-6 flex flex-wrap gap-3">
            <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-[#1a2c20] text-[#38e07b] rounded-full text-sm font-medium">System Design</motion.span>
            <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-[#1a2c20] text-[#38e07b] rounded-full text-sm font-medium">AI Integration</motion.span>
            <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-[#1a2c20] text-[#38e07b] rounded-full text-sm font-medium">Data Science</motion.span>
            <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-[#1a2c20] text-[#38e07b] rounded-full text-sm font-medium">Cloud Deployment</motion.span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}