import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import closeBtn from '../../assets/images/cases/close-popup.svg'
import type { CaseStudy } from '../../content/cases'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import styles from './case-popup.module.css'

type Props = {
  item: CaseStudy | null
  onClose: () => void
  scrollRoot?: HTMLElement | null
}

function overlayHost(scrollRoot?: HTMLElement | null) {
  return scrollRoot?.closest('.phoneScreen') ?? null
}

/** Tilda Zero case popups (#zeropopupcase1–6) @ 360 */
export function CasePopup({ item, onClose, scrollRoot }: Props) {
  const open = Boolean(item)
  useBodyScrollLock(open, scrollRoot)
  const host = overlayHost(scrollRoot)

  const popup = (
    <AnimatePresence>
      {item ? (
        <motion.div
          key={item.id}
          className={styles.root}
          role="dialog"
          aria-modal="true"
          aria-label={item.popupTitle ?? item.name}
          initial={false}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          {/* Backdrop must not sit under opacity animation — that kills backdrop-filter. */}
          <button type="button" className={styles.backdrop} aria-label="Закрыть" onClick={onClose} />

          <motion.div
            className={styles.stage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.42, 0, 0.58, 1] }}
          >
            <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
              <img src={closeBtn} alt="" width={85} height={25} />
            </button>

            <div className={styles.card}>
              <div className={styles.video}>
                {item.video ? (
                  <div className={styles.videoFrame}>
                    <iframe
                      src={item.video}
                      title={item.popupTitle ?? item.name}
                      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <img className={styles.videoPoster} src={item.image} alt="" />
                )}
              </div>

              <div className={styles.body}>
                <h2 className={styles.title}>{item.popupTitle ?? item.name}</h2>
                <p className={styles.text}>{item.result}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  return host ? createPortal(popup, host) : popup
}
