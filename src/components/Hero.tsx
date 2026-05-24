'use client'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useConversation } from '@elevenlabs/react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowDown, Mic, PhoneOff, Loader2 } from 'lucide-react'
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
  const [micMuted, setMicMuted] = useState(false)
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
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 md:px-10 pt-20 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* Immersive wave field background */}
      <WaveField voiceState={voiceState} reduce={!!reduce} />

      <div className="relative z-10 max-w-[800px] mx-auto text-center flex flex-col items-center gap-6">
        {/* Profile image */}
        <motion.div variants={fadeUp} className="relative">
          <div
            className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden"
            style={{ border: '2px solid var(--border)' }}
          >
            <Image
              src="/images/bw.jpg"
              alt="Prestilien Pindoh"
              width={112}
              height={112}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div
            className="absolute bottom-0.5 right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: 'var(--bg)', border: '2px solid var(--bg)' }}
          >
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-[-0.03em]"
          style={{ color: 'var(--fg)' }}
        >
          AI Engineer{' '}
          <br className="hidden sm:block" />
          <span style={{ color: 'var(--fg-muted)' }}>Software & Cloud</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg md:text-xl leading-relaxed max-w-[560px]"
          style={{ color: 'var(--fg-secondary)' }}
        >
          Building intelligent AI solutions and scalable systems.
          Turning complex challenges into elegant, production-grade software.
        </motion.p>

        {/* ── Premium Voice Orb ── */}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-5 pt-4">

          {/* Orb stack — fixed 140×140 container */}
          <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>

            {/* Layer 1 — slow-rotating dashed orbit */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '1px dashed var(--border)' }}
              animate={!reduce ? { rotate: 360 } : {}}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />

            {/* Layer 2 — inner ring, pulses opacity when speaking */}
            <motion.div
              className="absolute rounded-full"
              style={{ inset: 10, border: '1px solid var(--border)' }}
              animate={
                speaking && !reduce
                  ? { opacity: [0.3, 0.8, 0.3] }
                  : { opacity: connected ? 0.5 : 0.2 }
              }
              transition={{ duration: 1.2, repeat: speaking ? Infinity : 0, ease: 'easeInOut' }}
            />

            {/* Layer 3 — expanding ripples when connected */}
            <AnimatePresence>
              {connected && !reduce && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={`ripple-${i}`}
                      className="absolute rounded-full pointer-events-none"
                      style={{ inset: 20, border: '1px solid var(--fg)' }}
                      initial={{ scale: 1, opacity: speaking ? 0.22 : 0.12 }}
                      animate={{
                        scale: speaking ? 2.8 + i * 0.4 : 2.1 + i * 0.35,
                        opacity: 0,
                      }}
                      transition={{
                        duration: speaking ? 1.2 : 2.0,
                        repeat: Infinity,
                        delay: i * (speaking ? 0.32 : 0.6),
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Layer 4 — the core orb button (inset 20 from container = 50px radius) */}
            <motion.button
              onClick={connected ? stop : start}
              disabled={busy || agentIdMissing}
              className="absolute rounded-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 flex items-center justify-center overflow-hidden"
              style={{
                inset: 20,
                background: connected ? 'var(--accent)' : 'var(--card-bg)',
                color: connected ? 'var(--accent-fg)' : 'var(--fg)',
                border: '1px solid var(--card-border)',
                boxShadow: connected
                  ? speaking
                    ? '0 0 48px rgba(var(--fg-rgb), 0.20), 0 0 80px rgba(var(--fg-rgb), 0.08)'
                    : '0 0 28px rgba(var(--fg-rgb), 0.12)'
                  : 'var(--shadow-md)',
                transition: 'background 0.45s cubic-bezier(0.4,0,0.2,1), box-shadow 0.45s, color 0.45s',
              }}
              whileHover={reduce ? {} : { scale: 1.08 }}
              whileTap={reduce ? {} : { scale: 0.91 }}
              animate={speaking && !reduce ? { scale: [1, 1.055, 1] } : { scale: 1 }}
              transition={{ duration: 1.1, repeat: speaking ? Infinity : 0, ease: 'easeInOut' }}
              aria-label={connected ? 'End voice conversation' : 'Start voice conversation'}
            >
              <AnimatePresence mode="wait">
                {busy ? (
                  <motion.span key="loader"
                    initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.18 }}
                  >
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </motion.span>

                ) : connected ? (
                  /* Audio bar visualizer — replaces static icon */
                  <motion.span
                    key="bars"
                    initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.2 }}
                    className="flex items-end justify-center gap-[3px]"
                    style={{ height: 26 }}
                  >
                    {[0.4, 0.7, 1, 0.85, 1, 0.7, 0.4].map((peak, i) => (
                      <motion.span
                        key={i}
                        className="block w-[3px] rounded-full"
                        style={{ background: 'var(--accent-fg)', minHeight: 4 }}
                        animate={
                          speaking && !reduce
                            ? { height: [6, peak * 24, 8, peak * 20, 6] }
                            : { height: 6 }
                        }
                        transition={{
                          duration: 0.85 + i * 0.06,
                          repeat: speaking ? Infinity : 0,
                          delay: i * 0.07,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </motion.span>

                ) : (
                  <motion.span key="mic"
                    initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.18 }}
                  >
                    <Mic className="w-6 h-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Label row */}
          <div className="flex flex-col items-center gap-2.5">
            <motion.p
              className="text-[11px] font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'var(--fg-muted)' }}
              animate={speaking && !reduce ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
              transition={{ duration: 1.4, repeat: speaking ? Infinity : 0, ease: 'easeInOut' }}
            >
              {orbLabel}
            </motion.p>

            {/* End call pill — slides in only when connected */}
            <AnimatePresence>
              {connected && (
                <motion.button
                  onClick={stop}
                  disabled={busy}
                  initial={{ opacity: 0, y: 5, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.92 }}
                  transition={{ duration: 0.22 }}
                  className="btn-secondary disabled:opacity-40 cursor-pointer"
                  style={{ padding: '0.45rem 1.25rem', fontSize: '0.75rem', gap: '0.4rem' }}
                  whileHover={reduce ? {} : { scale: 1.04 }}
                  whileTap={reduce ? {} : { scale: 0.96 }}
                  aria-label="End voice conversation"
                >
                  <PhoneOff size={12} />
                  End call
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Error toast */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                className="rounded-full px-4 py-2 text-xs font-medium"
                style={{ background: 'var(--tag-bg)', border: '1px solid var(--border)', color: 'var(--fg)' }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-2">
          <motion.a
            href="#featured-projects"
            className="btn-primary"
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={reduce ? {} : { scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault()
              const el = document.querySelector('#featured-projects')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View my work
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-secondary"
            whileHover={reduce ? {} : { scale: 1.02 }}
            whileTap={reduce ? {} : { scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault()
              const el = document.querySelector('#contact')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Get in touch
          </motion.a>
        </motion.div>

        {/* AWS Badge */}
        <motion.a
          variants={fadeUp}
          href="https://www.credly.com/badges/a20ef315-4458-4d29-9639-112695053779/public_url"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 mt-2 px-4 py-2 rounded-full transition-all duration-300"
          style={{ background: 'var(--tag-bg)', border: '1px solid var(--tag-border)' }}
          whileHover={reduce ? {} : { scale: 1.02 }}
        >
          <Image
            src="/images/aws-certified-developer-associate.png"
            alt="AWS Certified Developer - Associate"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-xs font-medium" style={{ color: 'var(--fg-secondary)' }}>
            AWS Certified Developer — Associate
          </span>
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ color: 'var(--fg-muted)' }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}