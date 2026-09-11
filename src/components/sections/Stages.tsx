import { useEffect, useMemo, useRef, useState } from 'react'
import sphere from '../../assets/images/stages/sphere.jpg'
import tgIcon from '../../assets/images/stages/tg-icon.svg'
import { site } from '../../content/site'
import { stages } from '../../content/stages'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { TYPEWRITER_FAST_MS, TypewriterSegments } from '../ui/Typewriter'
import styles from './sections.module.css'

const TITLE_LABEL = 'Как с нами работать?'

/** Tilda Zero rec1855010041 @ 360 */
export function Stages({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
  const listRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [progressPx, setProgressPx] = useState(8)
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { ref: titleRef, inView } = useInView<HTMLHeadingElement>({
    root: scrollRoot ?? null,
    threshold: 0.35,
  })
  const titleSegments = useMemo(
    () => [
      { text: 'Как с нами', className: styles.stagesTitleA },
      { text: 'работать?', className: styles.stagesTitleB },
    ],
    [],
  )

  useEffect(() => {
    const list = listRef.current
    const track = trackRef.current
    if (!list || !track) return

    const items = [...list.querySelectorAll<HTMLElement>('[data-stage]')]
    const dots = [...list.querySelectorAll<HTMLElement>('[data-dot]')]
    if (!items.length || !dots.length) return

    let frame = 0

    const update = () => {
      const rootTop = scrollRoot ? scrollRoot.getBoundingClientRect().top : 0
      const rootHeight = scrollRoot ? scrollRoot.clientHeight : window.innerHeight
      const marker = rootTop + rootHeight * 0.36

      const trackRect = track.getBoundingClientRect()
      const trackTop = trackRect.top
      const trackH = trackRect.height

      const centers = dots.map((dot) => {
        const r = dot.getBoundingClientRect()
        return r.top + r.height / 2 - trackTop
      })

      let next = 0
      centers.forEach((cy, i) => {
        if (cy <= marker - trackTop) next = i
      })

      // Continuous fill: follow the marker, snapped between dots
      let fill = centers[0] ?? 0
      const localMarker = marker - trackTop

      if (localMarker <= centers[0]) {
        fill = Math.max(centers[0] * 0.15, Math.min(centers[0], localMarker))
      } else if (localMarker >= centers[centers.length - 1]) {
        fill = centers[centers.length - 1]
      } else {
        for (let i = 0; i < centers.length - 1; i += 1) {
          const a = centers[i]
          const b = centers[i + 1]
          if (localMarker >= a && localMarker <= b) {
            const t = (localMarker - a) / (b - a)
            fill = a + (b - a) * t
            break
          }
        }
      }

      setActive(next)
      setProgressPx(Math.max(4, Math.min(trackH, fill)))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    const target: HTMLElement | Window = scrollRoot ?? window
    target.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      target.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [scrollRoot])

  return (
    <section id="stages" className={styles.stages}>
      <div className={styles.stagesBoard}>
        <img className={styles.stagesSphereA} src={sphere} alt="" aria-hidden />
        <img className={styles.stagesSphereB} src={sphere} alt="" aria-hidden />

        <header className={styles.stagesHead}>
          <span className={styles.stagesBadge}>этапы</span>
          <h2 className={styles.stagesTitle} aria-label={TITLE_LABEL} ref={titleRef}>
            <TypewriterSegments
              segments={titleSegments}
              caretClassName={styles.typewriterCaret}
              reduceMotion={reduceMotion}
              active={inView}
              intervalMs={TYPEWRITER_FAST_MS}
            />
          </h2>
          <p className={styles.stagesComfort}>[Просто и комфортно]</p>
        </header>

        <div className={styles.stagesList} ref={listRef}>
          <div className={styles.stagesTrack} ref={trackRef} aria-hidden>
            <span className={styles.stagesLine} />
            <span className={styles.stagesProgress} style={{ height: progressPx }} />
          </div>

          {stages.map((item, i) => {
            const reached = i <= active
            const current = i === active
            return (
              <article
                key={item.index}
                className={styles.stageItem}
                data-stage={item.index}
                data-active={current || undefined}
                data-reached={reached || undefined}
              >
                <span className={styles.stagesDot} data-dot aria-hidden />
                <div className={styles.stageHead}>
                  <span className={styles.stageIndex}>[{item.index}]</span>
                  <h3 className={styles.stageTitle}>{item.title}</h3>
                </div>
                <p className={styles.stageBody}>{item.body}</p>
                {item.index === '01' ? (
                  <a
                    className={styles.stageTelegram}
                    href={site.telegram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className={styles.stageTelegramIcon}>
                      <img src={tgIcon} alt="" width={12} height={11} />
                    </span>
                    <span className={styles.stageTelegramLabel}>Telegram</span>
                  </a>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
