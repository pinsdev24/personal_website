'use client'
import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const prevFocusRef = useRef<HTMLElement | null>(null)
  const [messages, setMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; content: string }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, open])

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('chat:messages')
      if (saved) {
        const parsed = JSON.parse(saved) as Array<{ id: string; role: 'user' | 'assistant'; content: string }>
        if (Array.isArray(parsed)) setMessages(parsed)
      }
    } catch { }
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem('chat:messages', JSON.stringify(messages))
    } catch { }
  }, [messages])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement as HTMLElement | null
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    } else {
      prevFocusRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!dialogRef.current || !open) return
      if (e.key !== 'Tab') return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const elements = Array.from(focusable).filter(el => !el.hasAttribute('disabled'))
      if (elements.length === 0) return
      const first = elements[0]
      const last = elements[elements.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#38e07b] text-[#122118] shadow-lg hover:bg-opacity-90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#122118]/40 cursor-pointer"
          aria-label="Open chat"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}
      <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-title"
          aria-busy={isLoading}
          className="w-80 sm:w-96 h-96 rounded-xl bg-[#1a2c20] border border-[#264532] shadow-2xl flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#264532]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#38e07b]"></div>
              <p id="chat-title" className="text-white text-sm font-semibold">Ask about Prestilien</p>
            </div>
            <button aria-label="Close chat" onClick={() => setOpen(false)} className="text-white hover:text-[#38e07b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38e07b] rounded-md">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div ref={containerRef} aria-live="polite" className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-[#96c5a9] text-sm">
                Ask anything about Prestilien, skills, projects, experience, or contact.
              </div>
            )}
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div key={m.id} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.15 }}>
                  <div
                    className={
                      m.role === 'user'
                        ? 'max-w-[80%] rounded-lg bg-[#264532] text-white px-3 py-2'
                        : 'max-w-[80%] rounded-lg bg-[#0f1b13] text-white px-3 py-2 border border-[#264532]'
                    }
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question"
              className="flex-1 rounded-lg bg-[#0f1b13] text-white px-3 py-2 border border-[#264532] placeholder-[#96c5a9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38e07b]"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#38e07b] text-[#122118] px-3 py-2 font-semibold hover:bg-opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#122118]/40"
              disabled={isLoading || !input.trim()}
            >
              Send
            </button>
          </form>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}