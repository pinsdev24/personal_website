'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useConversation } from '@elevenlabs/react'
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX, Loader2 } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

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

      const bg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.1, w / 2, h / 2, Math.max(w, h))
      bg.addColorStop(0, speaking ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.04)')
      bg.addColorStop(0.45, speaking ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.03)')
      bg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

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

      const lg = ctx.createLinearGradient(0, 0, w, 0)
      lg.addColorStop(0, 'rgba(168,85,247,0.30)')
      lg.addColorStop(0.5, 'rgba(99,102,241,0.35)')
      lg.addColorStop(1, 'rgba(34,211,238,0.25)')
      ctx.lineWidth = 1.4
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
      agent: {
        language,
      },
    },
  })

  const userId = useMemo(() => `visitor-${crypto.randomUUID()}`, [])
  const agentId = process.env.NEXT_PUBLIC_AGENT_ID

  useEffect(() => {
    setAgentIdMissing(!agentId)
  }, [agentId])

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
    } finally {
      setBusy(false)
    }
  }, [agentId, conversation, ensureMic, userId])

  const stop = useCallback(async () => {
    setBusy(true)
    try {
      await conversation.endSession()
    } finally {
      setBusy(false)
    }
  }, [conversation])

  const mute = useCallback(() => setMicMuted(true), [])
  const unmute = useCallback(() => setMicMuted(false), [])
  const connected = conversation.status === 'connected'
  const speaking = connected && conversation.isSpeaking

  return (
    <motion.section id="voice-assistant" className="px-4 py-8 sm:py-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduce ? 0 : 0.6, ease: 'easeOut' }}>
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tighter pb-6 sm:pb-8 pt-3 sm:pt-5">
        Voice Conversation
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
        <div className="md:flex-1">
          <div className="flex items-center gap-2">
            <div className={(conversation.status === 'connected' ? 'bg-[#8b5cf6]' : 'bg-[#3b4164]') + ' w-2 h-2 rounded-full'}></div>
            <p className="text-white text-sm">
              {conversation.status === 'connected' ? 'Connected' : 'Disconnected'} • {conversation.isSpeaking ? 'Speaking' : 'Listening'}
            </p>
          </div>
          <p className="text-[#96c5a9] text-base sm:text-lg leading-relaxed mt-3">
            Speak with my personal voice assistant powered by ElevenLabs. Grant microphone access to start a real-time conversation. Please note that the conversation is limited to 3 minutes.
          </p>
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: reduce ? 0 : 0.2 }} className="mt-3 rounded-lg border border-red-500/40 bg-red-500/15 text-red-300 px-3 py-2">
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {agentIdMissing && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: reduce ? 0 : 0.2 }} className="mt-3 rounded-lg border border-yellow-300/40 bg-yellow-300/10 text-yellow-300 px-3 py-2">
                Agent ID missing. Set NEXT_PUBLIC_AGENT_ID in environment.
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {conversation.status !== 'connected' ? (
              <motion.button
                onClick={start}
                disabled={busy || agentIdMissing}
                className="inline-flex items-center justify-center gap-2 rounded-full h-10 px-6 bg-[#8b5cf6] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#7c3aed] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]/70 cursor-pointer"
                aria-label="Start conversation"
                whileHover={reduce ? {} : { scale: 1.03 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
              >
                <Phone className="w-4 h-4" /> Start
              </motion.button>
            ) : (
              <motion.button
                onClick={stop}
                disabled={busy}
                className="inline-flex items-center justify-center gap-2 rounded-full h-10 px-6 bg-white/10 text-white backdrop-blur-sm text-base font-bold leading-normal tracking-[0.015em] hover:bg-white/20 disabled:opacity-60"
                aria-label="Stop conversation"
                whileHover={reduce ? {} : { scale: 1.03 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
              >
                <PhoneOff className="w-4 h-4" /> Stop
              </motion.button>
            )}
            {conversation.status === 'connected' && (
              <motion.button
                onClick={micMuted ? unmute : mute}
                className="inline-flex items-center justify-center gap-2 rounded-full h-10 px-5 bg-[#264532] text-white text-base font-semibold hover:bg-[#1a2c20]"
                aria-label={micMuted ? 'Unmute microphone' : 'Mute microphone'}
                whileHover={reduce ? {} : { scale: 1.03 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
              >
                {micMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />} {micMuted ? 'Unmute' : 'Mute'}
              </motion.button>
            )}
          </div>
        </div>
        <div className="md:flex-1 w-full">
          <div className="relative rounded-2xl border border-[#264532] bg-[#0f1b13] shadow-xl w-full aspect-video flex items-center justify-center overflow-hidden">
            <WavesCanvas speaking={speaking} reduce={!!reduce} />
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(99,102,241,0.12),transparent_50%),radial-gradient(120%_80%_at_100%_100%,rgba(168,85,247,0.10),transparent_50%)]"
              animate={{ opacity: connected ? (speaking ? 1 : 0.6) : 0 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
            ></motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={speaking ? { opacity: [0.35, 0.65, 0.35], scale: [1, 1.06, 1] } : { opacity: 0, scale: 1 }}
              transition={{ duration: reduce ? 0 : 1.2, repeat: speaking ? Infinity : 0, ease: 'easeInOut' }}
            >
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full">
                <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(from 0deg,#8b5cf6 0%, #6366f1 35%, #22d3ee 70%, #8b5cf6 100%)', filter: 'blur(10px)' }}></div>
                <div className="absolute inset-0 rounded-full ring-2 ring-[#8b5cf6]/60"></div>
              </div>
            </motion.div>
            <motion.button
              onClick={conversation.status === 'connected' ? stop : start}
              disabled={busy || agentIdMissing}
              className={(conversation.status === 'connected'
                ? 'bg-[#8b5cf6] text-white hover:bg-[#7c3aed] cursor-pointer'
                : 'bg-[#1b2a22] text-white hover:bg-[#152019]') + ' relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]/70 cursor-pointer'}
              aria-label={conversation.status === 'connected' ? 'End conversation' : 'Start conversation'}
              whileHover={reduce ? {} : { scale: 1.03 }}
              whileTap={reduce ? {} : { scale: 0.98 }}
              animate={speaking ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: reduce ? 0 : 0.8, repeat: speaking ? Infinity : 0, ease: 'easeInOut' }}
            >
              {busy ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : conversation.status === 'connected' ? (
                <MicOff className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
              {speaking && (
                <span className="absolute -inset-1 rounded-full border border-[#8b5cf6]/40 animate-pulse"></span>
              )}
            </motion.button>
            <div className="absolute inset-x-0 bottom-4 flex items-end justify-center gap-1 h-8">
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 rounded-full bg-[#8b5cf6]"
                  style={{ transformOrigin: 'bottom' }}
                  animate={speaking ? { scaleY: [0.6, 1.3, 0.8, 1.1, 0.7] } : { scaleY: 0.6 }}
                  transition={{ duration: reduce ? 0 : 1.2, repeat: speaking ? Infinity : 0, ease: 'easeInOut', delay: i * 0.04 }}
                ></motion.div>
              ))}
            </div>
            <div className="absolute bottom-6 text-center">
              <motion.p className="text-white text-sm" animate={speaking ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }} transition={{ duration: reduce ? 0 : 1, repeat: speaking ? Infinity : 0, ease: 'easeInOut' }}>
                {connected ? (speaking ? 'Assistant is speaking' : 'Assistant is listening') : 'Tap to start'}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}