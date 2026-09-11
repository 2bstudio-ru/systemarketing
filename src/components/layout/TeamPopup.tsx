import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import closeIcon from '../../assets/images/team/close.svg'
import type { TeamMember } from '../../content/team'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import styles from './team-popup.module.css'

type Props = {
  member: TeamMember | null
  onClose: () => void
  scrollRoot?: HTMLElement | null
}

function overlayHost(scrollRoot?: HTMLElement | null) {
  return scrollRoot?.closest('.phoneScreen') ?? null
}

/** Tilda Zero team popups (#zeropopup1–10) @ 360 */
export function TeamPopup({ member, onClose, scrollRoot }: Props) {
  const open = Boolean(member)
  useBodyScrollLock(open, scrollRoot)
  const host = overlayHost(scrollRoot)

  const popup = (
    <AnimatePresence>
      {member ? (
        <motion.div
          key={member.id}
          className={styles.root}
          role="dialog"
          aria-modal="true"
          aria-label={member.name}
          initial={false}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <button type="button" className={styles.backdrop} aria-label="Закрыть" onClick={onClose} />

          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.42, 0, 0.58, 1] }}
          >
            <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">
              <img src={closeIcon} alt="" width={25} height={25} />
            </button>

            <p className={styles.name}>{member.name}</p>
            <h2 className={styles.role}>{member.role.replace(/\n/g, ' ')}</h2>

            <img className={styles.photo} src={member.photo} alt="" width={280} height={280} />

            <ul className={styles.points}>
              {member.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  return host ? createPortal(popup, host) : popup
}
