import playIcon from '../../assets/images/screencast/play.svg'
import poster from '../../assets/images/screencast/poster.jpg'
import { useUi } from '../../app/use-ui'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { TYPEWRITER_FAST_MS, Typewriter } from '../ui/Typewriter'
import styles from './sections.module.css'

const TITLE = 'Подсмотрите\nза работой системы'
const TITLE_LABEL = 'Подсмотрите за работой системы'

/** Tilda Zero rec1855009791 @ 360 */
export function Screencast({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
  const { openModal } = useUi()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { ref, inView } = useInView<HTMLHeadingElement>({
    root: scrollRoot ?? null,
    threshold: 0.35,
  })

  return (
    <section id="screencast" className={styles.screencast}>
      <h2 className={styles.screencastTitle} aria-label={TITLE_LABEL} ref={ref}>
        <Typewriter
          text={TITLE}
          caretClassName={styles.typewriterCaret}
          reduceMotion={reduceMotion}
          active={inView}
          intervalMs={TYPEWRITER_FAST_MS}
        />
      </h2>
      <p className={styles.screencastLead}>
        Скринкаст нашего цифрового подхода — на примере реального проекта и отчета
      </p>

      <button
        type="button"
        className={styles.screencastMedia}
        onClick={() => openModal({ kind: 'screencast' })}
        aria-label="Смотреть скринкаст"
      >
        <img className={styles.screencastPoster} src={poster} alt="" />
        <img className={styles.screencastPlay} src={playIcon} alt="" width={30} height={30} />
      </button>
    </section>
  )
}
