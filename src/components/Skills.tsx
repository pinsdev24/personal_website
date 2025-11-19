"use client"
import { motion } from 'framer-motion'

export default function Skills() {
  return (
    <motion.section id="skills" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
      <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight tracking-tighter px-4 pb-6 sm:pb-8 pt-4 sm:pt-5">
        My Expertise
      </h2>
      <div className="flex gap-3 sm:gap-4 p-2 sm:p-3 flex-wrap">
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-8 sm:h-10 shrink-0 items-center justify-center gap-x-1 sm:gap-x-2 rounded-full bg-[#264532] px-3 sm:px-5">
          <p className="text-white text-sm sm:text-base font-medium leading-normal">AWS</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-8 sm:h-10 shrink-0 items-center justify-center gap-x-1 sm:gap-x-2 rounded-full bg-[#264532] px-3 sm:px-5">
          <p className="text-white text-sm sm:text-base font-medium leading-normal">Serverless</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">Docker</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">Terraform</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">CI/CD</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">Machine Learning</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-8 sm:h-10 shrink-0 items-center justify-center gap-x-1 sm:gap-x-2 rounded-full bg-[#264532] px-3 sm:px-5">
          <p className="text-white text-sm sm:text-base font-medium leading-normal">AI Agent</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-8 sm:h-10 shrink-0 items-center justify-center gap-x-1 sm:gap-x-2 rounded-full bg-[#264532] px-3 sm:px-5">
          <p className="text-white text-sm sm:text-base font-medium leading-normal">Langchain</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">LangGraph</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">Model Context Protocol</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">System Design</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">Microservices</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">API Design</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">Python</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">Node.js</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">REST APIs</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">Full Stack Engineering</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#264532] px-5">
          <p className="text-white text-base font-medium leading-normal">Mobile Application</p>
        </motion.div>
      </div>
    </motion.section>
  )
}