import Image from "next/image";

export default function BuildAIAgent() {
  return (
    <section id="ai-agents" className="px-4 py-8 sm:py-12">
        <h2
        className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tighter pb-6 sm:pb-8 pt-3 sm:pt-5"
        >
        Building AI Agents
        </h2>
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
        <div className="w-full md:w-2/5">
            <h3 className="text-white text-xl sm:text-2xl font-bold leading-normal">DeepResearch Agent</h3>
            <div className="text-gray-200 space-y-4 mt-3">
            <p className="text-base sm:text-lg leading-relaxed">
                I build production-grade AI agents that plan, act, and learn across complex workflows.
                I use <span className="text-[#38e07b] font-semibold">LangChain</span> for tool orchestration and prompting,
                <span className="text-[#38e07b] font-semibold">LangGraph</span> for reliable graph-based control over multi-step and multi-agent flows,
                and <span className="text-[#38e07b] font-semibold">LangSmith</span> for tracing, evaluation, and regression testing.
            </p>
            </div>
        </div>
        <div className="w-full md:w-3/5 flex justify-center">
            <div className="rounded-xl overflow-hidden border-2 border-transparent hover:border-[#38e07b] transition-colors duration-300 max-w-[720px] w-full aspect-video">
            <Image
                src="/images/deepresearch-agent.png"
                alt="DeepResearch Agent - LangChain, LangGraph and LangSmith implementation by Prestilien Pindoh"
                width={720}
                height={405}
                className="w-full h-full object-contain"
            />
            </div>
        </div>
        </div>
    </section>
  )
}