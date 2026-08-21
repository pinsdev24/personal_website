'use client'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useConversation } from '@elevenlabs/react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mic, PhoneOff, Loader2, MapPin } from 'lucide-react'
import { fadeUp, stagger } from '@/lib/animations'

/* ────────────────────────────────────────────────
 *  Immersive organic wave-field canvas
 *  Covers the full hero viewport.
 *  Reacts to: idle / connected-listening / speaking
 * ──────────────────────────────────────────────── */
type VoiceState = 'idle' | 'listening' | 'speaking'

function WaveField({ voiceState, reduce }: { voiceState: VoiceState; reduce: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (reduce) return

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Pointer tracking for subtle interactivity
    const pointer = { x: 0.5, y: 0.5 }
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = (e.clientX - rect.left) / rect.width
      pointer.y = (e.clientY - rect.top) / rect.height
    }
    window.addEventListener('pointermove', onMove)

    let t = 0

    const render = () => {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      const cx = w / 2
      const cy = h / 2

      // State-driven parameters
      const isActive = voiceState !== 'idle'
      const isSpeaking = voiceState === 'speaking'

      const ringCount = isSpeaking ? 28 : isActive ? 22 : 16
      const baseRadius = Math.min(w, h) * (isSpeaking ? 0.08 : isActive ? 0.1 : 0.12)
      const maxRadius = Math.min(w, h) * 0.55
      const speed = isSpeaking ? 0.025 : isActive ? 0.015 : 0.008

      for (let i = 0; i < ringCount; i++) {
        const progress = i / ringCount
        const radius = baseRadius + (maxRadius - baseRadius) * progress

        // Dynamic wave distortion per ring
        const segments = 180
        const ampBase = isSpeaking
          ? 12 + progress * 20
          : isActive
            ? 6 + progress * 10
            : 2 + progress * 6

        // Pointer influence — ripples emanate from pointer position
        const pointerDist = Math.hypot(pointer.x - 0.5, pointer.y - 0.5)
        const pointerInfluence = Math.max(0, 1 - pointerDist * 2) * 4

        ctx.beginPath()

        for (let s = 0; s <= segments; s++) {
          const angle = (s / segments) * Math.PI * 2
          const phaseOffset = i * 0.7 + t * speed

          // Layered sine waves for organic feel
          const wave1 = Math.sin(angle * 3 + phaseOffset) * ampBase * 0.6
          const wave2 = Math.sin(angle * 5 - phaseOffset * 1.3) * ampBase * 0.3
          const wave3 = Math.sin(angle * 7 + phaseOffset * 0.7) * ampBase * 0.15
          const pointerWave = Math.sin(angle * 2 + t * speed * 2) * pointerInfluence * (1 - progress)

          // Speaking: add rhythmic pulse
          const pulse = isSpeaking
            ? Math.sin(t * 0.04 + i * 0.3) * (8 + progress * 12)
            : 0

          const r = radius + wave1 + wave2 + wave3 + pointerWave + pulse

          const x = cx + Math.cos(angle) * r
          const y = cy + Math.sin(angle) * r

          if (s === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        ctx.closePath()

        // Opacity fades outward, brighter near center
        const alpha = isSpeaking
          ? 0.25 - progress * 0.18
          : isActive
            ? 0.18 - progress * 0.13
            : 0.08 - progress * 0.055

        const clampedAlpha = Math.max(0.008, alpha)

        if (isDark) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${clampedAlpha})`
        } else {
          ctx.strokeStyle = `rgba(0, 0, 0, ${clampedAlpha})`
        }
        ctx.lineWidth = isSpeaking ? 1.5 - progress * 0.7 : 1.2 - progress * 0.5
        ctx.stroke()
      }

      // Glow at center when active
      if (isActive) {
        const glowRadius = baseRadius * (isSpeaking ? 2.5 : 1.8)
        const glowPulse = isSpeaking
          ? 1 + Math.sin(t * 0.04) * 0.3
          : 1 + Math.sin(t * 0.02) * 0.15
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius * glowPulse)

        if (isDark) {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${isSpeaking ? 0.06 : 0.03})`)
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        } else {
          gradient.addColorStop(0, `rgba(0, 0, 0, ${isSpeaking ? 0.04 : 0.02})`)
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        }

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(cx, cy, glowRadius * glowPulse, 0, Math.PI * 2)
        ctx.fill()
      }

      t += 1
      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [voiceState, reduce])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

/* ────────────────────────────────────────────────
 *  Hero section with integrated voice experience
 * ──────────────────────────────────────────────── */
export default function Hero() {
  const reduce = useReducedMotion()

  // ── Voice state ──
  const [agentIdMissing, setAgentIdMissing] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [micMuted] = useState(false)
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const language = useMemo(() => {
    if (typeof navigator === 'undefined') return 'en'
    const lang = navigator.language.slice(0, 2)
    return ['fr', 'nl'].includes(lang) ? lang : 'en'
  }, [])

  const conversation = useConversation({
    onConnect: () => {},
    onDisconnect: () => {},
    onError: (err) => {
      setError('Connection failed. Please try again.')
      console.error(err)
    },
    onStatusChange: () => {},
    onModeChange: () => {},
    micMuted,
    overrides: { agent: { language } },
  })

  const userId = useMemo(() => `visitor-${crypto.randomUUID()}`, [])
  const agentId = process.env.NEXT_PUBLIC_AGENT_ID

  useEffect(() => { setAgentIdMissing(!agentId) }, [agentId])

  // Auto-dismiss errors
  useEffect(() => {
    if (error) {
      errorTimeoutRef.current = setTimeout(() => setError(null), 5000)
      return () => { if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current) }
    }
  }, [error])

  const ensureMic = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      return true
    } catch {
      setError('Microphone access is required.')
      return false
    }
  }, [])

  const start = useCallback(async () => {
    setError(null)
    const ok = await ensureMic()
    if (!ok) return
    setBusy(true)
    try {
      await conversation.startSession({
        agentId: agentId ?? '',
        userId,
        connectionType: 'webrtc',
      })
    } catch {
      setError('Unable to start. Check your connection.')
    } finally { setBusy(false) }
  }, [agentId, conversation, ensureMic, userId])

  const stop = useCallback(async () => {
    setBusy(true)
    try { await conversation.endSession() } finally { setBusy(false) }
  }, [conversation])

  const connected = conversation.status === 'connected'
  const speaking = connected && conversation.isSpeaking

  const voiceState: VoiceState = speaking ? 'speaking' : connected ? 'listening' : 'idle'

  // Orb label text
  const orbLabel = busy
    ? 'Connecting…'
    : connected
      ? speaking ? 'Speaking…' : 'Listening…'
      : 'Talk to me'

  return (
    <motion.section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden px-6 md:px-10 pt-24 pb-12"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <WaveField voiceState={voiceState} reduce={!!reduce} />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-12 lg:gap-16 items-center">
          <div>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-7">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-50 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--fg-muted)' }}>
                Open to AI/ML & software roles
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                <Image
                  src="/images/bw.jpg"
                  alt="Prestilien Pindoh"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>Prestilien Pindoh</p>
                <p className="flex items-center gap-1.5 text-xs mt-0.5" style={{ color: 'var(--fg-muted)' }}>
                  <MapPin size={12} /> Brussels, Belgium · Remote
                </p>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.02] tracking-[-0.045em] max-w-[760px]"
              style={{ color: 'var(--fg)' }}
            >
              I build AI systems
              <span className="block" style={{ color: 'var(--fg-muted)' }}>that survive production.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg leading-[1.75] max-w-[650px] mt-6"
              style={{ color: 'var(--fg-secondary)' }}
            >
              AI/ML and software engineer owning the path from model and agent architecture
              to cloud delivery, evaluation, and observability.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-6">
              {['Agentic AI', 'Machine Learning', 'MLOps', 'Cloud', 'Observability'].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: 'var(--tag-bg)', border: '1px solid var(--tag-border)', color: 'var(--tag-fg)' }}
                >
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-8">
              <motion.a
                href="#ai-agents"
                className="btn-primary"
                whileHover={reduce ? {} : { scale: 1.02 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
              >
                Explore my AI work <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="mailto:prestilienpindoh@outlook.com"
                className="btn-secondary"
                whileHover={reduce ? {} : { scale: 1.02 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
              >
                Start a conversation
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-5 mt-6 text-xs font-medium">
              <a
                href="https://github.com/pinsdev24"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
                style={{ color: 'var(--fg-muted)' }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/prestilien-djionang-pindoh-a21179255"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
                style={{ color: 'var(--fg-muted)' }}
              >
                LinkedIn
              </a>
            </motion.div>
          </div>

          <motion.aside
            variants={fadeUp}
            className="relative rounded-3xl p-6 sm:p-8 min-h-[420px] flex flex-col"
            style={{
              background: 'rgba(var(--card-bg-rgb), 0.72)',
              border: '1px solid var(--card-border)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.16em] uppercase" style={{ color: 'var(--fg-muted)' }}>
                  Live portfolio interface
                </p>
                <h2 className="text-xl font-semibold mt-2" style={{ color: 'var(--fg)' }}>Ask me, don&apos;t just read.</h2>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold" style={{ background: 'var(--tag-bg)', border: '1px solid var(--tag-border)', color: 'var(--fg-muted)' }}>
                Voice AI
              </span>
            </div>
            <p className="text-sm leading-relaxed mt-3 max-w-[360px]" style={{ color: 'var(--fg-secondary)' }}>
              Ask about my projects, architecture choices, experience, or the kind of problems I want to solve next.
            </p>

            <div className="flex-1 flex flex-col items-center justify-center gap-5 py-8">
              <div className="relative flex items-center justify-center w-40 h-40">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: '1px dashed var(--border)' }}
                  animate={!reduce ? { rotate: 360 } : {}}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute rounded-full"
                  style={{ inset: 12, border: '1px solid var(--border)' }}
                  animate={speaking && !reduce ? { opacity: [0.3, 0.8, 0.3] } : { opacity: connected ? 0.5 : 0.2 }}
                  transition={{ duration: 1.2, repeat: speaking ? Infinity : 0, ease: 'easeInOut' }}
                />
                <AnimatePresence>
                  {connected && !reduce && [0, 1, 2].map((i) => (
                    <motion.div
                      key={`ripple-${i}`}
                      className="absolute rounded-full pointer-events-none"
                      style={{ inset: 24, border: '1px solid var(--fg)' }}
                      initial={{ scale: 1, opacity: speaking ? 0.22 : 0.12 }}
                      animate={{ scale: speaking ? 2.5 + i * 0.35 : 2 + i * 0.3, opacity: 0 }}
                      transition={{
                        duration: speaking ? 1.2 : 2,
                        repeat: Infinity,
                        delay: i * (speaking ? 0.32 : 0.6),
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </AnimatePresence>
                <motion.button
                  onClick={connected ? stop : start}
                  disabled={busy || agentIdMissing}
                  className="absolute rounded-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 flex items-center justify-center overflow-hidden"
                  style={{
                    inset: 24,
                    background: connected ? 'var(--accent)' : 'var(--card-bg)',
                    color: connected ? 'var(--accent-fg)' : 'var(--fg)',
                    border: '1px solid var(--card-border)',
                    boxShadow: connected ? '0 0 36px rgba(var(--fg-rgb), 0.14)' : 'var(--shadow-md)',
                  }}
                  whileHover={reduce ? {} : { scale: 1.06 }}
                  whileTap={reduce ? {} : { scale: 0.94 }}
                  animate={speaking && !reduce ? { scale: [1, 1.055, 1] } : { scale: 1 }}
                  transition={{ duration: 1.1, repeat: speaking ? Infinity : 0, ease: 'easeInOut' }}
                  aria-label={connected ? 'End voice conversation' : 'Start voice conversation'}
                >
                  <AnimatePresence mode="wait">
                    {busy ? (
                      <motion.span key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Loader2 className="w-6 h-6 animate-spin" />
                      </motion.span>
                    ) : connected ? (
                      <motion.span key="bars" className="flex items-end justify-center gap-[3px]" style={{ height: 26 }}>
                        {[0.4, 0.7, 1, 0.85, 1, 0.7, 0.4].map((peak, i) => (
                          <motion.span
                            key={i}
                            className="block w-[3px] rounded-full"
                            style={{ background: 'var(--accent-fg)', minHeight: 4 }}
                            animate={speaking && !reduce ? { height: [6, peak * 24, 8, peak * 20, 6] } : { height: 6 }}
                            transition={{ duration: 0.85 + i * 0.06, repeat: speaking ? Infinity : 0, delay: i * 0.07 }}
                          />
                        ))}
                      </motion.span>
                    ) : (
                      <motion.span key="mic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Mic className="w-6 h-6" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              <motion.p
                className="text-[11px] font-semibold tracking-[0.14em] uppercase"
                style={{ color: 'var(--fg-muted)' }}
                animate={speaking && !reduce ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
                transition={{ duration: 1.4, repeat: speaking ? Infinity : 0 }}
              >
                {orbLabel}
              </motion.p>

              <AnimatePresence>
                {connected && (
                  <motion.button
                    onClick={stop}
                    disabled={busy}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="btn-secondary disabled:opacity-40 cursor-pointer"
                    style={{ padding: '0.45rem 1.1rem', fontSize: '0.72rem' }}
                  >
                    <PhoneOff size={12} /> End call
                  </motion.button>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="rounded-full px-3 py-1.5 text-xs"
                    style={{ background: 'var(--tag-bg)', border: '1px solid var(--border)', color: 'var(--fg)' }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4 text-[10px] font-medium uppercase tracking-[0.12em]" style={{ borderTop: '1px solid var(--border)', color: 'var(--fg-muted)' }}>
              <span>Real-time voice</span>
              <span>ElevenLabs</span>
            </div>
          </motion.aside>
        </div>

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-px mt-12 lg:mt-14 rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--border)', background: 'var(--border)' }}
        >
          {[
            ['AWS certified', 'Cloud-native delivery'],
            ['Founder & CTO', 'Product ownership'],
            ['Build → deploy → observe', 'Production mindset'],
          ].map(([title, caption]) => (
            <div
              key={title}
              className="px-5 py-4"
              style={{ background: 'var(--card-bg)' }}
            >
              <p className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{title}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>{caption}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}