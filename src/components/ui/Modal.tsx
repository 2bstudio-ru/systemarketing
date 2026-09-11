import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import styles from './ui.module.css'

type Props = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  scrollRoot?: HTMLElement | null
}

function overlayHost(scrollRoot?: HTMLElement | null) {
  return scrollRoot?.closest('.phoneScreen') ?? null
}

export function Modal({ open, title, onClose, children, scrollRoot }: Props) {
  useBodyScrollLock(open, scrollRoot)

  const host = overlayHost(scrollRoot)

  const modal = (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={false}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <button type="button" className={styles.overlay} aria-label="Закрыть" onClick={onClose} />
          <motion.div
            className={styles.dialog}
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
            transition={{ duration: 0.25, ease: [0.42, 0, 0.58, 1] }}
          >
            <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
              ×
            </button>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  return host ? createPortal(modal, host) : modal
}

export function EmbedVideo({ src }: { src: string }) {
  return (
    <iframe
      className={styles.video}
      src={src}
      title="Видео"
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;"
      allowFullScreen
    />
  )
}
