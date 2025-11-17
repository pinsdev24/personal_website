'use client'
import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; content: string }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, open])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#38e07b] text-[#122118] shadow-lg hover:bg-opacity-90 transition-colors"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
      {open && (
        <div className="w-80 sm:w-96 h-96 rounded-xl bg-[#1a2c20] border border-[#264532] shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#264532]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#38e07b]"></div>
              <p className="text-white text-sm font-semibold">Ask about Prestilien</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:text-[#38e07b]">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div ref={containerRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-[#96c5a9] text-sm">
                Ask anything about Prestilien, skills, projects, experience, or contact.
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={
                    m.role === 'user'
                      ? 'max-w-[80%] rounded-lg bg-[#264532] text-white px-3 py-2'
                      : 'max-w-[80%] rounded-lg bg-[#0f1b13] text-white px-3 py-2 border border-[#264532]'
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-[#0f1b13] text-white px-3 py-2 border border-[#264532]">Thinking…</div>
              </div>
            )}
            {error && (
              <div className="text-red-400 text-xs">{error}</div>
            )}
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (!input.trim()) return
              setError(null)
              const userMessage = { id: crypto.randomUUID(), role: 'user' as const, content: input.trim() }
              const nextMessages = [...messages, userMessage]
              setMessages(nextMessages)
              setInput('')
              setIsLoading(true)
              try {
                const res = await fetch('/api/chat', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ messages: nextMessages.map(m => ({ role: m.role, content: m.content })) }),
                })
                if (!res.ok) throw new Error('Request failed')
                const data = await res.json()
                const assistantMessage = { id: crypto.randomUUID(), role: 'assistant' as const, content: String(data.text ?? '') }
                setMessages(prev => [...prev, assistantMessage])
              } catch {
                setError('Something went wrong. Check your API key.')
              } finally {
                setIsLoading(false)
              }
            }}
            className="p-3 border-t border-[#264532] flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question"
              className="flex-1 rounded-lg bg-[#0f1b13] text-white px-3 py-2 border border-[#264532] placeholder-[#96c5a9] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#38e07b] text-[#122118] px-3 py-2 font-semibold hover:bg-opacity-90"
              disabled={isLoading || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}