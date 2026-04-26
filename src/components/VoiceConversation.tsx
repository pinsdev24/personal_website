'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useConversation } from '@elevenlabs/react'
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX, Loader2 } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'

function WavesCanvas({ speaking, reduce }: { speaking: boolean; reduce: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const size = () => {
      const rect = container.getBoundingClientRect()
      const w = Math.max(320, Math.floor(rect.width))
      const h = Math.max(180, Math.floor(rect.height))
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()

    let t = 0
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0 }
    const friction = 0.08
    const tension = 0.12
    const maxMove = speaking ? 28 : 18

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.tx = e.clientX - rect.left
      pointer.ty = e.clientY - rect.top
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('resize', size)

    const render = () => {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      pointer.vx += (pointer.tx - pointer.x) * tension
      pointer.vy += (pointer.ty - pointer.y) * tension
      pointer.vx *= 1 - friction
      pointer.vy *= 1 - friction
      pointer.x += Math.max(-maxMove, Math.min(maxMove, pointer.vx))
      pointer.y += Math.max(-maxMove, Math.min(maxMove, pointer.vy))

      const lineGap = 18
      const pointGap = 12
      const lines = Math.min(36, Math.floor(h / lineGap))
      const baseAmp = reduce ? 0 : speaking ? 12 : 6
      const baseFreq = speaking ? 0.018 : 0.014
      const speed = reduce ? 0 : speaking ? 0.015 : 0.008

      // Monochrome gradient — no purple
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      const lg = ctx.createLinearGradient(0, 0, w, 0)
      lg.addColorStop(0, isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)')
      lg.addColorStop(0.5, isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)')
      lg.addColorStop(1, isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.06)')
      ctx.lineWidth = 1.2
      ctx.strokeStyle = lg

      for (let li = 0; li < lines; li++) {
        const baseY = li * lineGap + lineGap
        ctx.beginPath()
        for (let x = 0; x <= w; x += pointGap) {
          const phase = t * speed + li * 0.6
          const wave = Math.sin(x * baseFreq + phase) * (baseAmp + Math.sin(phase * 1.2 + x * 0.004) * (speaking ? 4 : 2))
          const attract = Math.sin((x - pointer.x) * 0.01) * (speaking ? 4 : 2)
          const y = baseY + wave + attract
          if (x === 0) ctx.moveTo(0, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      t += 1
      raf = requestAnimationFrame(render)
    }

    if (!reduce) raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', size)
    }
  }, [speaking, reduce])

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

export default function VoiceConversation() {
  const reduce = useReducedMotion()
  const [agentIdMissing, setAgentIdMissing] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [micMuted, setMicMuted] = useState(false)

  const language = useMemo(() => {
    if (typeof navigator === 'undefined') return 'en'
    const lang = navigator.language.slice(0, 2)
    return ['fr', 'nl'].includes(lang) ? lang : 'en'
  }, [])

  const conversation = useConversation({
    onConnect: () => { },
    onDisconnect: () => { },
    onError: (err) => {
      setError('Failed to connect. Check agent settings.')
      console.error(err)
    },
    onStatusChange: () => { },
    onModeChange: () => { },
    micMuted,
    overrides: {
      agent: { language },
    },
  })

  const userId = useMemo(() => `visitor-${crypto.randomUUID()}`, [])
  const agentId = process.env.NEXT_PUBLIC_AGENT_ID

  useEffect(() => { setAgentIdMissing(!agentId) }, [agentId])

  const ensureMic = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      return true
    } catch {
      setError('Microphone access is required to start the conversation.')
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
      setError('Unable to start session. Verify agent configuration.')
    } finally { setBusy(false) }
  }, [agentId, conversation, ensureMic, userId])

  const stop = useCallback(async () => {
    setBusy(true)
    try { await conversation.endSession() } finally { setBusy(false) }
  }, [conversation])

  const mute = useCallback(() => setMicMuted(true), [])
  const unmute = useCallback(() => setMicMuted(false), [])
  const connected = conversation.status === 'connected'
  const speaking = connected && conversation.isSpeaking

  return (
    <motion.section
      id="voice-assistant"
      className="section-container"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div variants={fadeUp}>
          <span className="line-accent" />
          <p className="text-xs font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--fg-muted)' }}>
            Interactive
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-12" style={{ color: 'var(--fg)' }}>
            Voice Conversation
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Controls */}
          <motion.div variants={fadeUp} className="md:flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: connected ? 'var(--fg)' : 'var(--border)' }}
              />
              <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>
                {connected ? 'Connected' : 'Disconnected'} • {conversation.isSpeaking ? 'Speaking' : 'Listening'}
              </p>
            </div>
            <p className="text-base leading-[1.8] mb-4" style={{ color: 'var(--fg-secondary)' }}>
              Speak with my personal voice assistant powered by ElevenLabs. Grant microphone access to start a real-time conversation. Please note that the conversation is limited to 3 minutes.
            </p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mb-4 rounded-lg px-3 py-2 text-sm"
                  style={{ background: 'var(--tag-bg)', border: '1px solid var(--border)', color: 'var(--fg)' }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {agentIdMissing && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mb-4 rounded-lg px-3 py-2 text-sm"
                  style={{ background: 'var(--tag-bg)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
                >
                  Agent ID missing. Set NEXT_PUBLIC_AGENT_ID in environment.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-3">
              {!connected ? (
                <motion.button
                  onClick={start}
                  disabled={busy || agentIdMissing}
                  className="btn-primary disabled:opacity-50 cursor-pointer"
                  whileHover={reduce ? {} : { scale: 1.02 }}
                  whileTap={reduce ? {} : { scale: 0.98 }}
                >
                  <Phone size={16} /> Start
                </motion.button>
              ) : (
                <motion.button
                  onClick={stop}
                  disabled={busy}
                  className="btn-secondary disabled:opacity-50 cursor-pointer"
                  whileHover={reduce ? {} : { scale: 1.02 }}
                  whileTap={reduce ? {} : { scale: 0.98 }}
                >
                  <PhoneOff size={16} /> Stop
                </motion.button>
              )}
              {connected && (
                <motion.button
                  onClick={micMuted ? unmute : mute}
                  className="btn-secondary cursor-pointer"
                  whileHover={reduce ? {} : { scale: 1.02 }}
                  whileTap={reduce ? {} : { scale: 0.98 }}
                >
                  {micMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  {micMuted ? 'Unmute' : 'Mute'}
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Visualizer */}
          <motion.div variants={fadeUp} className="md:flex-1 w-full">
            <div
              className="relative rounded-2xl w-full aspect-video flex items-center justify-center overflow-hidden"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
              }}
            >
              <WavesCanvas speaking={speaking} reduce={!!reduce} />
              <motion.button
                onClick={connected ? stop : start}
                disabled={busy || agentIdMissing}
                className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  background: connected ? 'var(--accent)' : 'var(--tag-bg)',
                  color: connected ? 'var(--accent-fg)' : 'var(--fg)',
                  border: connected ? 'none' : '1px solid var(--border)',
                }}
                whileHover={reduce ? {} : { scale: 1.04 }}
                whileTap={reduce ? {} : { scale: 0.96 }}
                animate={speaking ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: reduce ? 0 : 0.8, repeat: speaking ? Infinity : 0, ease: 'easeInOut' }}
              >
                {busy ? (
                  <Loader2 className="w-7 h-7 animate-spin" />
                ) : connected ? (
                  <MicOff className="w-7 h-7" />
                ) : (
                  <Mic className="w-7 h-7" />
                )}
              </motion.button>

              {/* Audio bars */}
              <div className="absolute inset-x-0 bottom-4 flex items-end justify-center gap-1 h-8">
                {Array.from({ length: 18 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full"
                    style={{ transformOrigin: 'bottom', background: 'var(--fg)' }}
                    animate={speaking ? { scaleY: [0.6, 1.3, 0.8, 1.1, 0.7] } : { scaleY: 0.6 }}
                    transition={{ duration: reduce ? 0 : 1.2, repeat: speaking ? Infinity : 0, ease: 'easeInOut', delay: i * 0.04 }}
                  />
                ))}
              </div>

              <div className="absolute bottom-6 text-center">
                <motion.p
                  className="text-xs font-medium"
                  style={{ color: 'var(--fg-muted)' }}
                  animate={speaking ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                  transition={{ duration: reduce ? 0 : 1, repeat: speaking ? Infinity : 0, ease: 'easeInOut' }}
                >
                  {connected ? (speaking ? 'Speaking' : 'Listening') : 'Tap to start'}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}