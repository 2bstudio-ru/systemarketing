import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import closeBtn from '../../assets/images/cases/close-popup.svg'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import styles from './video-popup.module.css'

type Props = {
  open: boolean
  title: string
  src: string | null
  orientation?: 'portrait' | 'landscape'
  onClose: () => void
  scrollRoot?: HTMLElement | null
}

function overlayHost(scrollRoot?: HTMLElement | null) {
  return scrollRoot?.closest('.phoneScreen') ?? null
}

/** Portrait about videos 320×580; landscape screencast/cases 320×180 */
export function VideoPopup({
  open,
  title,
  src,
  orientation = 'portrait',
  onClose,
  scrollRoot,
}: Props) {
  useBodyScrollLock(open && Boolean(src), scrollRoot)
  const host = overlayHost(scrollRoot)
  const landscape = orientation === 'landscape'

  const popup = (
    <AnimatePresence>
      {open && src ? (
        <motion.div
          key={src}
          className={styles.root}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={false}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <button type="button" className={styles.backdrop} aria-label="Закрыть" onClick={onClose} />

          <motion.div
            className={`${styles.stage} ${landscape ? styles.stageLandscape : ''}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.42, 0, 0.58, 1] }}
          >
            <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
              <img src={closeBtn} alt="" width={85} height={25} />
            </button>

            <div className={`${styles.frame} ${landscape ? styles.frameLandscape : ''}`}>
              <iframe
                src={src}
                title={title}
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  return host ? createPortal(popup, host) : popup
}
