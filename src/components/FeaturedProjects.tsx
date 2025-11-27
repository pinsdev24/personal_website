"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'

type Project = {
  src: string
  alt: string
  title: string
  description: string
  href: string
}

const projects: Project[] = [
  {
    src: '/images/clustering_client.png',
    alt: 'E-commerce Client Segmentation - Data analysis identifying VIPs, active buyers, and window shoppers using K-Means clustering',
    title: 'E-commerce Client Segmentation',
    description:
      "Developed a behavioral segmentation model for the 'Amazing' e-commerce marketplace using PCA and K-Means clustering. Analyzed user interactions to identify four key customer segments—VIPs, Confirmed Buyers, Window Shoppers, and Churners—to drive personalized marketing strategies.",
    href: 'https://github.com/pinsdev24/client_segmentation',
  },
  {
    src: '/images/flightbotai.png',
    alt: 'Flight Booking Chatbot - AI-powered travel assistant developed by Prestilien Pindoh',
    title: 'Flight Booking Chatbot',
    description:
      'Architected a scalable Node.js backend for Air Paradise with PostgreSQL database optimization, reducing query times by 40%. Developed a stateful chatbot with advanced NLP integration using LLM and integrated with a Next.js/TypeScript frontend.',
    href: 'https://flight-booking-chatbot.onrender.com/',
  },
  {
    src: '/images/chest.jpeg',
    alt: 'Chest X-Ray Pneumonia Detection App - AI-powered medical imaging analysis using ResNet18 and FastAPI',
    title: 'Chest X-Ray Pneumonia Detection',
    description:
      'A modern, AI-powered web application for detecting pneumonia from chest X-ray images. Utilizing a fine-tuned ResNet18 model served via FastAPI, it provides real-time analysis and visualization of results.',
    href: 'https://github.com/pinsdev24/chest-xray-app',
  },
  {
    src: '/images/todomcp_langgraph.png',
    alt: 'Todo MCP Agent - AI agent for todo management by Prestilien Pindoh',
    title: 'Todo MCP Server',
    description:
      'An MCP server build with python, pydantic and sqlite to manage personal todo list. The server is connected to a local MCP client to provide a simple interface to manage the todo list.',
    href: 'https://github.com/pinsdev24/IntelligentSystemsLab/tree/main/ai-agent/todo-agent-mcp',
  },
  {
    src: '/images/valide_landing.png',
    alt: 'Valide - Educational platform by Prestilien Pindoh revolutionizing education in Cameroon',
    title: 'Valide',
    description:
      'Educational platform revolutionizing learning in Cameroon through AI-powered assistance, comprehensive academic resources, and a vibrant student community network, helping create better prepared and highly employable graduates.',
    href: 'https://valide237.web.app/',
  },
  {
    src: '/images/afrikdelices.png',
    alt: 'Afrik Delices - African cuisine e-commerce platform developed by Prestilien Pindoh',
    title: 'Afrik Delices',
    description:
      'A culinary platform showcasing authentic African recipes and food culture, connecting food enthusiasts with traditional cooking techniques and ingredients from across the continent.',
    href: 'https://afrikdelices.com/',
  },
]

export default function FeaturedProjects() {
  return (
    <motion.section id="featured-projects" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tighter px-4 pb-6 sm:pb-8 pt-3 sm:pt-5">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {projects.map((p) => (
          <motion.div key={p.title} className="group flex flex-col gap-4 rounded-xl bg-[#1a2c20] p-6 border border-transparent hover:border-[#38e07b] transition-all duration-300" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' }} whileHover={{ y: -4 }}>
            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex flex-col overflow-hidden">
              <Image
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={p.src}
                alt={p.alt}
                width={400}
                height={225}
              />
            </div>
            <div>
              <p className="text-white text-xl font-bold leading-normal">{p.title}</p>
              <p className="text-[#96c5a9] text-base font-normal leading-relaxed mt-2">{p.description}</p>
              <div className="mt-4">
                <motion.a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full h-10 px-6 bg-[#38e07b] text-[#122118] text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="truncate">View Project</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}