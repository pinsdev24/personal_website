'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useConversation } from '@elevenlabs/react'
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX, Loader2 } from 'lucide-react'

export default function VoiceConversation() {
  const [agentIdMissing, setAgentIdMissing] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [micMuted, setMicMuted] = useState(false)

  const conversation = useConversation({
    onConnect: () => {},
    onDisconnect: () => {},
    onError: (err) => {
      setError('Failed to connect. Check agent settings.')
      console.error(err)
    },
    onStatusChange: () => {},
    onModeChange: () => {},
    micMuted,
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

  return (
    <section id="voice-assistant" className="px-4 py-8 sm:py-12">
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tighter pb-6 sm:pb-8 pt-3 sm:pt-5">
        Voice Conversation
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
        <div className="md:flex-1">
          <div className="flex items-center gap-2">
            <div className={(conversation.status === 'connected' ? 'bg-[#38e07b]' : 'bg-[#366348]') + ' w-2 h-2 rounded-full'}></div>
            <p className="text-white text-sm">
              {conversation.status === 'connected' ? 'Connected' : 'Disconnected'} • {conversation.isSpeaking ? 'Speaking' : 'Listening'}
            </p>
          </div>
          <p className="text-[#96c5a9] text-base sm:text-lg leading-relaxed mt-3">
            Speak with my personal voice assistant powered by ElevenLabs. Grant microphone access to start a real-time conversation.
          </p>
          {error && (
            <div className="mt-3 rounded-lg border border-red-500/40 bg-red-500/15 text-red-300 px-3 py-2">
              {error}
            </div>
          )}
          {agentIdMissing && (
            <div className="mt-3 rounded-lg border border-yellow-300/40 bg-yellow-300/10 text-yellow-300 px-3 py-2">
              Agent ID missing. Set ELEVENLABS_AGENT_ID in environment.
            </div>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {conversation.status !== 'connected' ? (
              <button
                onClick={start}
                disabled={busy || agentIdMissing}
                className="inline-flex items-center justify-center gap-2 rounded-full h-10 px-6 bg-[#38e07b] text-[#122118] text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 disabled:opacity-60"
                aria-label="Start conversation"
              >
                <Phone className="w-4 h-4" /> Start
              </button>
            ) : (
              <button
                onClick={stop}
                disabled={busy}
                className="inline-flex items-center justify-center gap-2 rounded-full h-10 px-6 bg-white/10 text-white backdrop-blur-sm text-base font-bold leading-normal tracking-[0.015em] hover:bg-white/20 disabled:opacity-60"
                aria-label="Stop conversation"
              >
                <PhoneOff className="w-4 h-4" /> Stop
              </button>
            )}
            {conversation.status === 'connected' && (
              <button
                onClick={micMuted ? unmute : mute}
                className="inline-flex items-center justify-center gap-2 rounded-full h-10 px-5 bg-[#264532] text-white text-base font-semibold hover:bg-[#1a2c20]"
                aria-label={micMuted ? 'Unmute microphone' : 'Mute microphone'}
              >
                {micMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />} {micMuted ? 'Unmute' : 'Mute'}
              </button>
            )}
          </div>
        </div>
        <div className="md:flex-1 w-full">
          <div className="relative rounded-2xl border border-[#264532] bg-[#1a2c20] shadow-xl w-full aspect-video flex items-center justify-center overflow-hidden">
            <div className={(conversation.status === 'connected' ? 'opacity-100' : 'opacity-0') + ' absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(56,224,123,0.08),transparent_50%),radial-gradient(120%_80%_at_100%_100%,rgba(56,224,123,0.06),transparent_50%)] transition-opacity duration-500'}></div>
            <button
              onClick={conversation.status === 'connected' ? stop : start}
              disabled={busy || agentIdMissing}
              className={(conversation.status === 'connected'
                ? 'bg-[#38e07b] text-[#122118] hover:bg-opacity-90'
                : 'bg-[#264532] text-white hover:bg-[#1a2c20]') + ' relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38e07b]'}
              aria-label={conversation.status === 'connected' ? 'End conversation' : 'Start conversation'}
            >
              {busy ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : conversation.status === 'connected' ? (
                <MicOff className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
              {conversation.isSpeaking && (
                <span className="absolute -inset-1 rounded-full border border-[#38e07b]/40 animate-pulse"></span>
              )}
            </button>
            <div className="absolute bottom-6 text-center">
              <p className="text-white text-sm">
                {conversation.status === 'connected' ? (conversation.isSpeaking ? 'Assistant is speaking' : 'Assistant is listening') : 'Tap to start'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}