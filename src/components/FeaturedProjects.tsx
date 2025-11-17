import Image from 'next/image'

type Project = {
  src: string
  alt: string
  title: string
  description: string
  href: string
}

const projects: Project[] = [
  {
    src: '/images/flight-booking-chatbot.png',
    alt: 'Flight Booking Chatbot - AI-powered travel assistant developed by Prestilien Pindoh',
    title: 'Flight Booking Chatbot',
    description:
      'Architected a scalable Node.js backend for Air Paradise with PostgreSQL database optimization, reducing query times by 40%. Developed a stateful chatbot with advanced NLP integration using LLM and integrated with a Next.js/TypeScript frontend.',
    href: 'https://flight-booking-chatbot.onrender.com/',
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
    <section id="featured-projects">
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tighter px-4 pb-6 sm:pb-8 pt-3 sm:pt-5">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {projects.map((p) => (
          <div key={p.title} className="group flex flex-col gap-4 rounded-xl bg-[#1a2c20] p-6 border border-transparent hover:border-[#38e07b] transition-all duration-300">
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
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full h-10 px-6 bg-[#38e07b] text-[#122118] text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors"
                >
                  <span className="truncate">View Project</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}