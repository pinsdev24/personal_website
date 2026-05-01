"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Shield, BarChart2 } from 'lucide-react'

type ConsentState = 'pending' | 'accepted' | 'declined'

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent') as ConsentState | null
    setConsent(stored ?? 'pending')
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setConsent('accepted')
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setConsent('declined')
  }

  const visible = consent === 'pending'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          aria-modal="false"
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 32, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="cookie-banner"
        >
          {/* Top row */}
          <div className="cookie-banner__header">
            <div className="cookie-banner__icon-wrap">
              <Cookie size={18} strokeWidth={1.8} />
            </div>
            <span className="cookie-banner__title">Cookie Preferences</span>
            <button
              onClick={handleDecline}
              aria-label="Close cookie banner"
              className="cookie-banner__close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <p className="cookie-banner__body">
            We use cookies to enhance your browsing experience, analyse site traffic via{' '}
            <strong>Vercel Analytics</strong> and measure performance with{' '}
            <strong>Speed Insights</strong>. No personal data is sold.
          </p>

          {/* Expandable details */}
          <button
            className="cookie-banner__details-toggle"
            onClick={() => setShowDetails(v => !v)}
            aria-expanded={showDetails}
          >
            {showDetails ? 'Hide details' : 'Learn more'} ↓
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="cookie-banner__details"
              >
                <div className="cookie-banner__detail-row">
                  <Shield size={14} />
                  <div>
                    <strong>Essential</strong> — Always active. Required for the site to function (theme, scroll).
                  </div>
                </div>
                <div className="cookie-banner__detail-row">
                  <BarChart2 size={14} />
                  <div>
                    <strong>Analytics</strong> — Vercel Analytics & Speed Insights collect anonymous usage metrics.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="cookie-banner__actions">
            <button
              id="cookie-decline"
              onClick={handleDecline}
              className="btn-secondary cookie-banner__btn-sm"
            >
              Decline
            </button>
            <button
              id="cookie-accept"
              onClick={handleAccept}
              className="btn-primary cookie-banner__btn-sm"
            >
              Accept all
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
