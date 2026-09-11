import bg from '../../assets/images/partners/bg.svg'
import mark from '../../assets/images/partners/mark.svg'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { TYPEWRITER_FAST_MS, Typewriter } from '../ui/Typewriter'
import styles from './sections.module.css'

const TITLE = 'Работаем не с\u00A0сотней проектов,\nа\u00A0вдолгую с\u00A0избранными'
const TITLE_LABEL = 'Работаем не с сотней проектов, а вдолгую с избранными'

/** Tilda Zero rec1855010021 @ 360 */
export function LongTerm({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { ref, inView } = useInView<HTMLHeadingElement>({
    root: scrollRoot ?? null,
    threshold: 0.35,
  })
  const { ref: leadRef, inView: leadInView } = useInView<HTMLParagraphElement>({
    root: scrollRoot ?? null,
    threshold: 0.25,
  })

  return (
    <section className={styles.longTerm}>
      <div className={styles.longTermBoard}>
        <img className={styles.longTermBg} src={bg} alt="" aria-hidden />
        <img className={styles.longTermMark} src={mark} alt="" aria-hidden />
        <h2 className={styles.longTermTitle} aria-label={TITLE_LABEL} ref={ref}>
          <Typewriter
            text={TITLE}
            caretClassName={styles.typewriterCaret}
            reduceMotion={reduceMotion}
            active={inView}
            intervalMs={TYPEWRITER_FAST_MS}
          />
        </h2>
        <p
          className={`${styles.longTermLead} ${styles.textFade} ${
            leadInView || reduceMotion ? styles.textFadeIn : ''
          }`}
          ref={leadRef}
        >
          Выбираем проекты, которые нас вдохновляют, и&nbsp;проходим с&nbsp;клиентами все этапы
          роста.
          <br />
          <br />
          Даже кризисы и&nbsp;пандемию. Потому что мы&nbsp;— настоящие партнеры
        </p>
      </div>
    </section>
  )
}
