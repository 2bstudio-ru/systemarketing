import bg from '../../assets/images/final/bg.svg'
import cardMark from '../../assets/images/final/card-mark.svg'
import iconMail from '../../assets/images/final/icon-mail.svg'
import iconPhone from '../../assets/images/final/icon-phone.svg'
import iconTelegram from '../../assets/images/final/icon-telegram.svg'
import logo from '../../assets/images/final/logo.svg'
import mark from '../../assets/images/final/mark.svg'
import pattern from '../../assets/images/final/pattern.svg'
import watermark from '../../assets/images/final/watermark.svg'
import { navItems, site } from '../../content/site'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { TYPEWRITER_FAST_MS, Typewriter } from '../ui/Typewriter'
import styles from './sections.module.css'

const TITLE = 'Система в маркетинге\nуверенность в будущем'
const TITLE_LABEL = 'Система в маркетинге уверенность в будущем'

/** Tilda Zero rec1855010291 @ 360 */
export function FinalCta({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
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
    <section id="contacts" className={styles.final}>
      <div className={styles.finalBoard}>
        <img className={styles.finalBg} src={bg} alt="" aria-hidden />
        <img className={styles.finalPattern} src={pattern} alt="" aria-hidden />
        <img className={styles.finalMark} src={mark} alt="" aria-hidden />

        <a className={styles.finalLogo} href="/" aria-label="Система">
          <img src={logo} alt="" width={110} height={17} />
        </a>

        <h2 className={styles.finalTitle} aria-label={TITLE_LABEL} ref={ref}>
          <Typewriter
            text={TITLE}
            caretClassName={styles.typewriterCaret}
            reduceMotion={reduceMotion}
            active={inView}
            intervalMs={TYPEWRITER_FAST_MS}
          />
        </h2>
        <div className={styles.finalDivider} aria-hidden />
        <p
          className={`${styles.finalLead} ${styles.textFade} ${
            leadInView || reduceMotion ? styles.textFadeIn : ''
          }`}
          ref={leadRef}
        >
          Команда Система — больше чем директор по маркетингу.
          <br />
          Эффективнее, чем агентство!
        </p>

        <div className={styles.finalCard}>
          <img className={styles.finalCardMark} src={cardMark} alt="" aria-hidden />

          <div className={styles.finalCol}>
            <h3 className={styles.finalColTitle}>информация</h3>
            <nav className={styles.finalNav} aria-label="Информация">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className={styles.finalContacts}>
            <h3 className={styles.finalColTitle}>
              Способы
              <br />
              связи
            </h3>
            <div className={styles.finalContactList}>
              <a className={styles.finalContact} href={`tel:${site.phone}`}>
                <img src={iconPhone} alt="" width={25} height={25} />
                <span>+7(908)158-62-03</span>
              </a>
              <a className={styles.finalContact} href={`mailto:${site.email}`}>
                <img src={iconMail} alt="" width={25} height={25} />
                <span>e-mail</span>
              </a>
              <a
                className={styles.finalContact}
                href={site.telegram}
                target="_blank"
                rel="noreferrer"
              >
                <img src={iconTelegram} alt="" width={25} height={25} />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.finalBar}>
          <span className={styles.finalMetaLeft}>{site.copyright}</span>
          <span className={styles.finalMetaRight}>{site.privacy}</span>
        </div>

        {/* Clipped to the white footer card width; sits above the card like Tilda */}
        <div className={styles.finalWatermarkClip} aria-hidden>
          <div className={styles.finalWatermark}>
            <img src={watermark} alt="" />
            <img src={watermark} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
