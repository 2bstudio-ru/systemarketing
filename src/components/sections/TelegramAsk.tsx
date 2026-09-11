import badge from '../../assets/images/telegram/badge.svg'
import frame38 from '../../assets/images/telegram/frame38.svg'
import arrow from '../../assets/images/telegram/arrow.svg'
import { site } from '../../content/site'
import styles from './sections.module.css'

/** Tilda Zero rec1855009771 @ 360 — artboard 360×245 */
export function TelegramAsk() {
  return (
    <section className={styles.telegramAsk}>
      <div className={styles.telegramBoard}>
        <div
          className={styles.telegramBg}
          style={{ backgroundImage: `url(${frame38})` }}
          aria-hidden
        />
        <div className={styles.telegramGlass} aria-hidden />
        <div className={styles.telegramFrame} aria-hidden />

        <img
          className={styles.telegramBadge}
          src={badge}
          alt="Telegram"
          width={95}
          height={20}
        />

        <h2 className={styles.telegramTitle}>
          Задайте нам свой
          <br />
          вопрос в Telegram
        </h2>

        <a
          className={styles.telegramCta}
          href={site.telegram}
          target="_blank"
          rel="noreferrer"
        >
          <span className={styles.telegramCtaCircle}>
            <img src={arrow} alt="" width={16} height={16} />
          </span>
          <span className={styles.telegramCtaLabel}>спросить</span>
        </a>
      </div>
    </section>
  )
}
