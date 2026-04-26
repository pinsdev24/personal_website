'use client'
import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
      if (e.key === 'Escape' && open) setOpen(false)
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
      setTimeout(() => { inputRef.current?.focus() }, 0)
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
      if (e.shiftKey && active === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-200 cursor-pointer"
          style={{
            background: 'var(--accent)',
            color: 'var(--accent-fg)',
          }}
          aria-label="Open chat"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <MessageCircle size={20} />
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
            className="w-80 sm:w-96 h-96 rounded-xl flex flex-col overflow-hidden"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              boxShadow: 'var(--shadow-xl)',
            }}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <p id="chat-title" className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>
                  Ask about Prestilien
                </p>
              </div>
              <button
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="p-1 rounded cursor-pointer transition-colors"
                style={{ color: 'var(--fg-muted)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={containerRef} aria-live="polite" className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.length === 0 && (
                <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>
                  Ask anything about Prestilien, skills, projects, experience, or contact.
                </div>
              )}
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div
                      className="max-w-[80%] rounded-lg px-3 py-2"
                      style={{
                        background: m.role === 'user' ? 'var(--accent)' : 'var(--bg-secondary)',
                        color: m.role === 'user' ? 'var(--accent-fg)' : 'var(--fg)',
                        border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                      }}
                    >
                      {m.role === 'assistant' ? (
                        <div className="text-sm">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              ul: ({ node, ...props }: any) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                              ol: ({ node, ...props }: any) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                              li: ({ node, ...props }: any) => <li className="" {...props} />,
                              p: ({ node, ...props }: any) => <p className="mb-2 last:mb-0" {...props} />,
                              a: ({ node, ...props }: any) => <a className="underline underline-offset-2" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fg)' }} {...props} />,
                              strong: ({ node, ...props }: any) => <strong className="font-bold" style={{ color: 'var(--fg)' }} {...props} />,
                              h1: ({ node, ...props }: any) => <h1 className="text-lg font-bold mb-2" style={{ color: 'var(--fg)' }} {...props} />,
                              h2: ({ node, ...props }: any) => <h2 className="text-base font-bold mb-2" style={{ color: 'var(--fg)' }} {...props} />,
                              h3: ({ node, ...props }: any) => <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--fg)' }} {...props} />,
                              blockquote: ({ node, ...props }: any) => <blockquote className="pl-2 italic my-2" style={{ borderLeft: '2px solid var(--border)' }} {...props} />,
                              code: ({ node, ...props }: any) => <code className="rounded px-1 py-0.5 text-xs font-mono" style={{ background: 'var(--tag-bg)' }} {...props} />,
                            }}
                          >
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <span className="text-sm">{m.content}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-3 py-2 text-sm" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}>
                    Thinking…
                  </div>
                </div>
              )}
              {error && (
                <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{error}</div>
              )}
            </div>

            {/* Input */}
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
                    body: JSON.stringify({
                      messages: nextMessages.map(m => ({ role: m.role, content: m.content })),
                      chatId: sessionStorage.getItem('chat:id')
                    }),
                  })
                  if (!res.ok) throw new Error('Request failed')
                  const data = await res.json()
                  if (data.chatId) sessionStorage.setItem('chat:id', data.chatId)
                  const assistantMessage = { id: crypto.randomUUID(), role: 'assistant' as const, content: String(data.text ?? '') }
                  setMessages(prev => [...prev, assistantMessage])
                } catch {
                  setError('Something went wrong. Check your API key.')
                } finally {
                  setIsLoading(false)
                }
              }}
              className="p-3 flex items-center gap-2"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question"
                className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
                style={{
                  background: 'var(--bg-secondary)',
                  color: 'var(--fg)',
                  border: '1px solid var(--border)',
                }}
              />
              <button
                type="submit"
                className="rounded-lg px-3 py-2 font-semibold text-sm cursor-pointer transition-opacity disabled:opacity-40"
                style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}
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