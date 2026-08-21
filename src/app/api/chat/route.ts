import { generateText } from 'ai'
import { google } from '@ai-sdk/google'
import { db } from '@/db'
import { chats, messages } from '@/db/schema'

type IncomingMessage = {
  role: string
  content: string
}

const SITE_CONTEXT = `You are a helpful assistant for Prestilien Pindoh's personal site.
Name: Prestilien Pindoh
Role: AI/ML and Software Engineer focused on production-grade intelligent systems
Location: Brussels, Belgium; open to remote work and the right engineering team
Positioning: Prestilien owns the path from model and agent architecture to APIs, cloud delivery, evaluation, observability, and user-facing software. He combines applied AI depth with founder/CTO product ownership and full-stack delivery.
Focus: Agentic AI, RAG, Machine Learning, MLOps, System Design, Cloud, and Observability
Core stack: Python, PyTorch, TorchRL, XGBoost, LangChain, LangGraph, FastAPI, MLflow, AWS, Docker, Terraform, CI/CD, TypeScript, Next.js, PostgreSQL
Observability toolkit: Prometheus, Sentry, Langfuse, LangSmith, structured logging, metrics, tracing, and LLM evaluation
AI-native workflow: Cursor, Claude, and OpenAI for research, implementation, debugging, code review, and documentation, with tests, observability, human review, and engineering judgment as quality gates
Certifications: AWS Certified Developer – Associate; LangChain Academy credentials in Deep Research and Deep Agents with LangGraph
Portfolio: https://prestilienpindoh.me
Featured AI work: Ariadne AI (multi-agent career workflow with semantic matching, human review, role scouting, and explicit LangGraph control flow) and StudentHub (RAG over academic documents with grounded answers, citations, and quiz generation).
Other work: MLOps Fraud Detection (XGBoost, MLflow, FastAPI, Docker, CI/CD), client segmentation (PCA and K-Means), Vente Pro, Afrik Delices, Valide, and Favero BTP.
Experience: AI Engineer Intern at Multitel; Founder and Product Engineer at Afrik Delices; Full Stack Developer at Surfyn; Co-founder and CTO at VALIDE.
When asked why a team should hire Prestilien, emphasize production ownership, system thinking, AI and software breadth, product judgment, and his ability to build beyond demos. Do not invent metrics, employers, or technologies beyond this context. If you don't know, say so.`

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response('Missing GOOGLE_GENERATIVE_AI_API_KEY', { status: 500 })
  }

  const body = await req.json() as { messages: IncomingMessage[]; chatId?: string }
  const { messages: inputMessages, chatId: providedChatId } = body

  let chatId = providedChatId

  // Create chat if not exists
  if (!chatId) {
    const [newChat] = await db.insert(chats).values({}).returning()
    chatId = newChat.id
  }

  const lastMessage = inputMessages[inputMessages.length - 1]

  // Save user message
  if (lastMessage.role === 'user') {
    await db.insert(messages).values({
      chatId,
      role: 'user',
      content: lastMessage.content
    })
  }

  // Sanitize messages for CoreMessage format
  const coreMessages = inputMessages
    .filter((m): m is IncomingMessage & { role: 'user' | 'assistant' } => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({ role: m.role, content: m.content }))

  try {
    const result = await generateText({
      model: google('gemini-2.5-flash-lite'),
      system: SITE_CONTEXT,
      messages: coreMessages,
      tools: {
        google_search: google.tools.googleSearch({}),
      }
    })

    const responseText = result.text

    // Save assistant message
    await db.insert(messages).values({
      chatId,
      role: 'assistant',
      content: responseText
    })

    return Response.json({ text: responseText, chatId })
  } catch (error) {
    console.error('Generation error:', error)
    return new Response('Failed to generate response', { status: 500 })
  }
}
