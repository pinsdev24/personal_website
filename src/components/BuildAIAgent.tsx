"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

export default function BuildAIAgent() {
  return (
    <motion.section id="ai-agents" className="px-4 py-8 sm:py-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
        <h2
        className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tighter pb-6 sm:pb-8 pt-3 sm:pt-5"
        >
        Building AI Agents
        </h2>
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
        <div className="w-full md:w-2/5">
            <h3 className="text-white text-xl sm:text-2xl font-bold leading-normal">DeepResearch Agent</h3>
            <motion.div className="text-gray-200 space-y-4 mt-3" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <p className="text-base sm:text-lg leading-relaxed">
                I build production-grade AI agents that plan, act, and learn across complex workflows.
                I use <span className="text-[#38e07b] font-semibold">LangChain</span> for tool orchestration and prompting,
                <span className="text-[#38e07b] font-semibold">LangGraph</span> for reliable graph-based control over multi-step and multi-agent flows,
                and <span className="text-[#38e07b] font-semibold">LangSmith</span> for tracing, evaluation, and regression testing.
            </p>
            </motion.div>
            <div className="mt-4">
              <motion.a
                href="https://github.com/pinsdev24/IntelligentSystemsLab/tree/main/ai-agent/deep_research_agent_from_scratch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full h-10 px-6 bg-[#38e07b] text-[#122118] text-base font-bold leading-normal tracking-[0.015em] ring-1 ring-[#38e07b] hover:ring-2 transition-colors transition-shadow hover:bg-opacity-90 hover:shadow-[0_0_24px_rgba(56,224,123,0.35)]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                aria-label="View DeepResearch Agent on GitHub"
              >
                <Github className="w-4 h-4" /> View on GitHub
              </motion.a>
            </div>
        </div>
        <div className="w-full md:w-3/5 flex justify-center">
            <motion.div className="rounded-xl overflow-hidden border-2 border-transparent hover:border-[#38e07b] transition-colors duration-300 max-w-[720px] w-full aspect-video" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <Image
                src="/images/deepresearch-agent.png"
                alt="DeepResearch Agent - LangChain, LangGraph and LangSmith implementation by Prestilien Pindoh"
                width={720}
                height={405}
                className="w-full h-full object-contain"
            />
            </motion.div>
        </div>
        </div>
    </motion.section>
  )
}