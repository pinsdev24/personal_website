import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

const SITE_CONTEXT = `You are a helpful assistant for Prestilien Pindoh's personal site.
Name: Prestilien Pindoh
Role: Software Engineer specializing in scalable system design and intelligent AI integration
Location: Brussels, Belgique
Focus: Cloud, AI, Data Science, System Design, AI Agents (LangChain, LangGraph, LangSmith), Serverless, AWS, Docker, Terraform, CI/CD
Certifications: AWS Certified Developer – Associate; LangChain Academy: Deep Research with LangGraph
Portfolio: https://portfolio.prestilienpindoh.me
Featured projects include Flight Booking Chatbot, Todo MCP Server, Valide (education platform), Afrik Delices (e-commerce). Answer questions about the person, skills, experience, projects, and contact details. If you don't know, say so.`

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response('Missing GOOGLE_GENERATIVE_AI_API_KEY', { status: 500 })
  }

  const body = await req.json()
  const inputMessages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = body?.messages ?? []
  const prompt = (inputMessages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n')) || 'User: Hello'

  const result = await generateText({
    model: google('gemini-2.5-flash-lite'),
    system: SITE_CONTEXT,
    prompt,
    tools: {
      google_search: google.tools.googleSearch({}),
    }
  })

  return Response.json({ text: result.text })
}