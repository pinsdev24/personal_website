"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MoreProject() {
  return (
    <motion.section id="projects" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
            <div className="md:flex-1 md:order-2">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tighter mb-4 sm:mb-6">
                More Projects
            </h2>
            <p className="text-[#96c5a9] text-base sm:text-lg leading-relaxed mb-6">
                Throughout my career, I&apos;ve had the opportunity to work on diverse and impactful projects. 
                Explore my complete portfolio to discover the full range of projects I&apos;ve worked on.
            </p>
            <motion.a href="https://portfolio.prestilienpindoh.me" target="_blank" rel="noopener noreferrer" 
                className="inline-flex items-center justify-center rounded-full h-12 px-8 bg-[#38e07b] text-[#122118] text-lg font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <span className="truncate">View my portfolio</span>
            </motion.a>
            </div>
            <div className="md:flex-1 md:order-1">
            <motion.div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg aspect-video" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' }}>
                <Image src="/images/working.jpg" alt="Working on projects" width={800} height={450} className="w-full h-full object-cover" />
            </motion.div>
            </div>
        </div>
    </motion.section>
  );
}
