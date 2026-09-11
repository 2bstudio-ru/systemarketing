import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import cardBg from '../../assets/images/discuss/card-bg.svg'
import closeIcon from '../../assets/images/discuss/close.svg'
import mailIcon from '../../assets/images/discuss/mail.svg'
import phoneIcon from '../../assets/images/discuss/phone.svg'
import telegramIcon from '../../assets/images/discuss/telegram.svg'
import vkIcon from '../../assets/images/discuss/vk.svg'
import { site } from '../../content/site'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import styles from './discuss.module.css'

type Props = {
  open: boolean
  onClose: () => void
  scrollRoot?: HTMLElement | null
}

function overlayHost(scrollRoot?: HTMLElement | null) {
  return scrollRoot?.closest('.phoneScreen') ?? null
}

/** Tilda Zero popup rec2145126541 @ 360 — #zeropopupdiscuss */
export function DiscussPopup({ open, onClose, scrollRoot }: Props) {
  useBodyScrollLock(open, scrollRoot)
  const host = overlayHost(scrollRoot)

  const popup = (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={styles.root}
          role="dialog"
          aria-modal="true"
          aria-label="Обсудить проект"
          initial={false}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button type="button" className={styles.backdrop} aria-label="Закрыть" onClick={onClose} />
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
          >
            <img className={styles.cardBg} src={cardBg} alt="" aria-hidden />
            <div className={styles.cardFrame} aria-hidden />

            <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
              <img src={closeIcon} alt="" width={25} height={25} />
            </button>

            <h2 className={styles.title}>
              Напишите напрямую
              <br />
              Илье
            </h2>

            <div className={styles.socials}>
              <a
                className={styles.social}
                href={site.telegram}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
              >
                <img src={telegramIcon} alt="" width={33} height={33} />
              </a>
              <a
                className={styles.social}
                href={site.vk}
                target="_blank"
                rel="noreferrer"
                aria-label="VK"
              >
                <img src={vkIcon} alt="" width={33} height={33} />
              </a>
              <a className={styles.social} href={`mailto:${site.email}`} aria-label="Электронная почта">
                <img src={mailIcon} alt="" width={33} height={33} />
              </a>
            </div>

            <h2 className={styles.title}>
              или просто
              <br />
              позвоните
            </h2>

            <a className={styles.phone} href={`tel:${site.phone}`}>
              <span className={styles.phoneIcon} aria-hidden>
                <img src={phoneIcon} alt="" width={30} height={30} />
              </span>
              <span className={styles.phoneLabel}>{site.phoneCompact}</span>
            </a>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  return host ? createPortal(popup, host) : popup
}
