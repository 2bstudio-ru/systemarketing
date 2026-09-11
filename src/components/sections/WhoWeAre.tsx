import { useMemo } from 'react'
import ctaArrow from '../../assets/icons/cta-arrow-mint.svg'
import whoDeco from '../../assets/images/who-deco.jpg'
import whoVideo from '../../assets/videos/who.mp4'
import { useUi } from '../../app/use-ui'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { TYPEWRITER_FAST_MS, TypewriterSegments } from '../ui/Typewriter'
import styles from './sections.module.css'

const TITLE_LABEL = 'с 2011 года строим маркетинг, который приносит измеримую прибыль'

/** Tilda Zero rec1855062561 @ 360 + Annex video rec1855009661 */
export function WhoWeAre({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
  const { openModal } = useUi()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { ref, inView } = useInView<HTMLHeadingElement>({
    root: scrollRoot ?? null,
    threshold: 0.4,
  })
  const segments = useMemo(
    () => [
      { text: 'с\u00A02011\u00A0года', className: styles.whoTitleA },
      { text: 'строим', className: styles.whoTitleB },
      {
        text: 'маркетинг, который приносит измеримую прибыль',
        className: styles.whoTitleC,
      },
    ],
    [],
  )

  return (
    <div className={styles.whoPin}>
      <section id="dljakogo" className={`${styles.white} ${styles.who}`}>
        <div className={styles.whoBoard}>
          <h2 className={styles.whoTitle} aria-label={TITLE_LABEL} ref={ref}>
            <TypewriterSegments
              segments={segments}
              caretClassName={styles.typewriterCaret}
              reduceMotion={reduceMotion}
              active={inView}
              intervalMs={TYPEWRITER_FAST_MS}
            />
          </h2>

          <div className={styles.whoMedia}>
            <video
              className={styles.whoVideo}
              src={whoVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Медиа"
            />
          </div>

          <img className={styles.whoDeco} src={whoDeco} alt="" width={131} height={87} aria-hidden />

          <p className={styles.whoLead}>
            От&nbsp;сайта и&nbsp;рекламы до&nbsp;глубинной аналитики и&nbsp;развития вашего персонала
          </p>

          <button type="button" className={styles.whoCta} onClick={() => openModal({ kind: 'discuss' })}>
            <span className={styles.whoCtaIcon} aria-hidden>
              <img src={ctaArrow} alt="" width={30} height={30} />
            </span>
            <span className={styles.whoCtaLabel}>Обсудить проект</span>
          </button>
        </div>
      </section>
    </div>
  )
}
