import { useEffect, useRef, useState } from 'react'
import logoBright from '../../assets/images/preloader-logo-bright.png'
import logoDim from '../../assets/images/preloader-logo-dim.png'
import styles from './Preloader.module.css'

function measureProgress() {
  const fontsDone = document.fonts?.status === 'loaded' ? 1 : 0

  const images = Array.from(document.images)
  const imagesDone = images.length
    ? images.filter((img) => img.complete).length / images.length
    : 1

  const videos = Array.from(document.querySelectorAll('video'))
  const videosDone = videos.length
    ? videos.filter((video) => video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA).length /
      videos.length
    : 1

  const windowDone =
    document.readyState === 'complete' ? 1 : document.readyState === 'interactive' ? 0.55 : 0.2

  return fontsDone * 0.2 + imagesDone * 0.45 + videosDone * 0.2 + windowDone * 0.15
}

/** Load gate: gradient + dim→bright logo reveal top-to-bottom. */
export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  const targetRef = useRef(0)
  const displayRef = useRef(0)
  const finishingRef = useRef(false)

  useEffect(() => {
    const started = performance.now()
    let raf = 0
    let finishTimer = 0
    let settled = false

    const setTarget = (value: number) => {
      targetRef.current = Math.min(1, Math.max(targetRef.current, value))
    }

    const finish = () => {
      if (settled) return
      settled = true
      finishingRef.current = true
      targetRef.current = 1
    }

    const measure = () => {
      setTarget(measureProgress())
      const elapsed = performance.now() - started
      if ((targetRef.current >= 0.98 && elapsed >= 700) || elapsed >= 10000) {
        finish()
      }
    }

    const frame = () => {
      measure()

      const target = finishingRef.current ? 1 : targetRef.current
      // Critically damped chase — smooth even when target jumps
      const ease = finishingRef.current ? 0.12 : 0.065
      displayRef.current += (target - displayRef.current) * ease

      if (finishingRef.current && displayRef.current > 0.995) {
        displayRef.current = 1
        setProgress(1)
        if (!finishTimer) {
          finishTimer = window.setTimeout(() => setLeaving(true), 320)
        }
        return
      }

      setProgress(displayRef.current)
      raf = window.requestAnimationFrame(frame)
    }

    void document.fonts?.ready.then(() => setTarget(measureProgress()))
    window.addEventListener('load', measure)

    raf = window.requestAnimationFrame(frame)

    return () => {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(finishTimer)
      window.removeEventListener('load', measure)
    }
  }, [])

  useEffect(() => {
    if (!leaving) return
    const id = window.setTimeout(() => setGone(true), 500)
    return () => window.clearTimeout(id)
  }, [leaving])

  useEffect(() => {
    if (!gone) return
    document.documentElement.classList.remove('is-booting')
  }, [gone])

  useEffect(() => {
    if (gone) return
    const { body, documentElement } = document
    const prevBody = body.style.overflow
    const prevHtml = documentElement.style.overflow
    body.style.overflow = 'hidden'
    documentElement.style.overflow = 'hidden'
    return () => {
      body.style.overflow = prevBody
      documentElement.style.overflow = prevHtml
    }
  }, [gone])

  if (gone) return null

  const revealed = progress * 100
  const clip = `inset(0px 0px ${100 - revealed}% 0px)`

  return (
    <div
      className={`${styles.root}${leaving ? ` ${styles.leaving}` : ''}`}
      aria-busy={!leaving}
      aria-live="polite"
      aria-label="Загрузка"
    >
      <div className={styles.bg} aria-hidden />

      <div className={styles.logoStage}>
        <img className={styles.logoDim} src={logoDim} alt="" width={206} height={233} />
        <img
          className={styles.logoBright}
          src={logoBright}
          alt=""
          width={206}
          height={233}
          style={{ clipPath: clip, WebkitClipPath: clip }}
        />
      </div>
    </div>
  )
}
