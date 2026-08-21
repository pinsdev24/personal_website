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
Role: Software Engineer specializing in scalable system design and intelligent AI integration
Location: Brussels, Belgique
Focus: Cloud, AI, Data Science, System Design, AI Agents (LangChain, LangGraph, LangSmith), Serverless, AWS, Docker, Terraform, CI/CD
Certifications: AWS Certified Developer – Associate; LangChain Academy: Deep Research with LangGraph
Portfolio: https://prestilienpindoh.me
Featured projects include Favero BTP (bilingual Next.js site for a Yaoundé construction firm, live at faverobtp.com), Afrik Delices (culinary platform), E-commerce Client Segmentation, MLOps Fraud Detection, Vente Pro (sales management platform), and Valide (education platform). Answer questions about the person, skills, experience, projects, and contact details. If you don't know, say so.`

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
