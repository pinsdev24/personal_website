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

  const quickActions = [
    { label: 'Skills', query: 'What are your core technical skills?' },
    { label: 'Projects', query: 'Tell me about your latest projects.' },
    { label: 'Contact', query: 'How can I contact you?' },
  ]

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
            aria-busy={isLoading}
            className="w-80 sm:w-[400px] h-[34rem] max-h-[75vh] rounded-3xl flex flex-col overflow-hidden transition-colors"
            style={{
              background: 'rgba(var(--card-bg-rgb), 0.8)',
              backdropFilter: 'blur(20px) saturate(190%)',
              WebkitBackdropFilter: 'blur(20px) saturate(190%)',
              border: '1px solid var(--card-border)',
              boxShadow: 'var(--shadow-xl)',
            }}
            initial={{ opacity: 0, y: 24, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: '1px solid var(--border)', background: 'rgba(var(--fg-rgb), 0.03)' }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
                </div>
                <div>
                  <p id="chat-title" className="text-sm font-bold tracking-tight" style={{ color: 'var(--fg)' }}>
                    Assistant AI
                  </p>
                  <p className="text-[10px] font-medium uppercase tracking-wider opacity-50" style={{ color: 'var(--fg)' }}>
                    Online & Ready
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMessages([])}
                className="text-[11px] font-semibold px-2 py-1 rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ color: 'var(--fg-muted)' }}
              >
                Clear
              </button>
            </div>

            {/* Messages */}
            <div ref={containerRef} aria-live="polite" className="flex-1 overflow-y-auto p-5 space-y-5 scroll-smooth">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="text-sm leading-relaxed font-medium" style={{ color: 'var(--fg-secondary)' }}>
                    Hi! I'm Prestilien's digital twin. How can I help you today?
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => {
                          setInput(action.query)
                          inputRef.current?.focus()
                        }}
                        className="text-left text-xs px-4 py-2.5 rounded-xl border border-dashed transition-all hover:border-solid hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98]"
                        style={{ borderColor: 'var(--border)', color: 'var(--fg-secondary)' }}
                      >
                        {action.label}: <span className="opacity-60">"{action.query}"</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <AnimatePresence initial={false}>
                {messages.map((m, idx) => (
                  <motion.div
                    key={m.id}
                    className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx === messages.length - 1 ? 0 : 0 }}
                  >
                    <div
                      className={`max-w-[88%] px-4 py-3 shadow-sm ${
                        m.role === 'user' ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-tl-sm'
                      }`}
                      style={{
                        background: m.role === 'user' ? 'var(--accent)' : 'rgba(var(--fg-rgb), 0.05)',
                        color: m.role === 'user' ? 'var(--accent-fg)' : 'var(--fg)',
                        border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                        backdropFilter: m.role === 'assistant' ? 'blur(8px)' : 'none',
                      }}
                    >
                      {m.role === 'assistant' ? (
                        <div className="text-[13px] leading-relaxed chat-markdown">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              ul: ({ node, ...props }: any) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                              ol: ({ node, ...props }: any) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                              li: ({ node, ...props }: any) => <li className="" {...props} />,
                              p: ({ node, ...props }: any) => <p className="mb-2 last:mb-0" {...props} />,
                              a: ({ node, ...props }: any) => <a className="underline underline-offset-2 font-semibold" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }} {...props} />,
                              strong: ({ node, ...props }: any) => <strong className="font-bold" style={{ color: 'inherit' }} {...props} />,
                              h1: ({ node, ...props }: any) => <h1 className="text-base font-bold mb-2" style={{ color: 'inherit' }} {...props} />,
                              h2: ({ node, ...props }: any) => <h2 className="text-sm font-bold mb-2" style={{ color: 'inherit' }} {...props} />,
                              blockquote: ({ node, ...props }: any) => <blockquote className="pl-2 italic my-2 border-l-2 opacity-70" style={{ borderColor: 'currentColor' }} {...props} />,
                              code: ({ node, ...props }: any) => <code className="rounded px-1.5 py-0.5 text-[11px] font-mono bg-black/10 dark:bg-white/20" {...props} />,
                            }}
                          >
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <span className="text-[13px] font-medium">{m.content}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="flex justify-start items-center gap-2"
                >
                  <div 
                    className="px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center" 
                    style={{ background: 'var(--tag-bg)', border: '1px solid var(--border)' }}
                  >
                    <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-1 rounded-full bg-current animate-bounce" />
                  </div>
                </motion.div>
              )}
              {error && (
                <div className="text-[10px] font-semibold text-center uppercase tracking-wider opacity-60" style={{ color: 'var(--fg-muted)' }}>
                  {error}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4" style={{ borderTop: '1px solid var(--border)', background: 'rgba(var(--fg-rgb), 0.02)' }}>
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
                    if (!res.ok) throw new Error('Network error')
                    const data = await res.json()
                    if (data.chatId) sessionStorage.setItem('chat:id', data.chatId)
                    const assistantMessage = { id: crypto.randomUUID(), role: 'assistant' as const, content: String(data.text ?? '') }
                    setMessages(prev => [...prev, assistantMessage])
                  } catch {
                    setError('Connection lost. Please try again.')
                  } finally {
                    setIsLoading(false)
                  }
                }}
                className="relative flex items-center"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full rounded-2xl pl-4 pr-12 py-3 text-[13px] outline-none transition-all focus:ring-2"
                  style={{
                    background: 'var(--bg)',
                    color: 'var(--fg)',
                    border: '1px solid var(--border)',
                    // @ts-ignore
                    '--tw-ring-color': 'rgba(var(--fg-rgb, 0,0,0), 0.1)'
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-2 w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                  style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all cursor-pointer z-50 overflow-hidden"
        style={{
          background: 'var(--accent)',
          color: 'var(--accent-fg)',
        }}
        aria-label={open ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <X size={26} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MessageCircle size={26} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}