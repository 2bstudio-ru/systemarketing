import { useMediaQuery } from '../../hooks/useMediaQuery'
import { Typewriter } from '../ui/Typewriter'
import heroMark from '../../assets/icons/hero-mark.svg'
import heroPoster from '../../assets/images/hero-poster.jpg'
import heroVideo from '../../assets/videos/hero.mp4'
import styles from './sections.module.css'

const TITLE_WHITE = 'Превращаем\nвложения'
const TITLE_MINT = 'в\u00A0поток\nклиентов'
const TITLE_FULL = 'Превращаем вложения в поток клиентов'

export function Hero() {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.heroMedia} aria-hidden>
        <img className={styles.heroPoster} src={heroPoster} alt="" />
        {reduceMotion ? null : (
          <video
            className={styles.heroVideo}
            src={heroVideo}
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        )}
      </div>

      <div className={styles.heroTop}>
        <div className={styles.heroKicker}>
          <div className={styles.heroKickerLabel}>Профессиональная команда маркетинга</div>
          <div className={styles.heroKickerMark}>
            <img src={heroMark} alt="" width={18} height={18} aria-hidden />
          </div>
        </div>
        <h1 className={styles.heroTitle} aria-label={TITLE_FULL}>
          <Typewriter
            text={TITLE_WHITE}
            caretClassName={styles.heroTitleCaret}
            reduceMotion={reduceMotion}
          />
          <Typewriter
            text={TITLE_MINT}
            className={styles.mint}
            caretClassName={styles.heroTitleCaret}
            reduceMotion={reduceMotion}
          />
        </h1>
      </div>

      <div className={styles.heroCallouts}>
        <p>
          <span className={styles.calloutWord}>Думаем</span> как собственник.
        </p>
        <p>
          <span className={styles.calloutWord}>Действуем</span> как партнеры.
        </p>
      </div>
    </section>
  )
}
