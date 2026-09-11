import type { ModalState } from '../../app/ui-types'
import { useUi } from '../../app/use-ui'
import { aboutItems } from '../../content/about'
import { cases } from '../../content/cases'
import { site } from '../../content/site'
import { team } from '../../content/team'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { CasePopup } from './CasePopup'
import { DiscussPopup } from './DiscussPopup'
import { TeamPopup } from './TeamPopup'
import { VideoPopup } from './VideoPopup'
import styles from '../sections/sections.module.css'

const SCREENCAST_SRC = 'https://kinescope.io/embed/x8mwjhCZ6YFG5cmQaVA3UM'

export function ModalHost({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
  const { modal, closeModal } = useUi()
  const isDiscuss = modal?.kind === 'discuss'
  const caseItem =
    modal?.kind === 'case' ? (cases.find((c) => c.id === modal.id) ?? null) : null
  const teamMember =
    modal?.kind === 'team' ? (team.find((t) => t.id === modal.id) ?? null) : null
  const aboutItem =
    modal?.kind === 'about' ? (aboutItems.find((a) => a.id === modal.id) ?? null) : null

  const videoSrc =
    modal?.kind === 'video'
      ? modal.src
      : modal?.kind === 'screencast'
        ? SCREENCAST_SRC
        : aboutItem?.video ?? null
  const videoTitle =
    modal?.kind === 'video'
      ? modal.title
      : modal?.kind === 'screencast'
        ? 'Скринкаст'
        : (aboutItem?.title.replace(/\n/g, ' ') ?? 'Видео')
  const videoOrientation =
    modal?.kind === 'video'
      ? (modal.orientation ?? 'landscape')
      : modal?.kind === 'screencast'
        ? 'landscape'
        : 'portrait'

  const useSheet =
    Boolean(modal) &&
    !isDiscuss &&
    modal?.kind !== 'case' &&
    modal?.kind !== 'team' &&
    modal?.kind !== 'video' &&
    modal?.kind !== 'screencast' &&
    !(modal?.kind === 'about' && aboutItem?.video)

  return (
    <>
      <DiscussPopup open={isDiscuss} onClose={closeModal} scrollRoot={scrollRoot} />
      <CasePopup item={caseItem} onClose={closeModal} scrollRoot={scrollRoot} />
      <TeamPopup member={teamMember} onClose={closeModal} scrollRoot={scrollRoot} />
      <VideoPopup
        open={Boolean(videoSrc) && (modal?.kind === 'video' || modal?.kind === 'screencast' || Boolean(aboutItem?.video))}
        title={videoTitle}
        src={videoSrc}
        orientation={videoOrientation}
        onClose={closeModal}
        scrollRoot={scrollRoot}
      />
      <Modal
        open={useSheet}
        title={modalTitle(modal)}
        onClose={closeModal}
        scrollRoot={scrollRoot}
      >
        {useSheet && modal ? <ModalBody /> : null}
      </Modal>
    </>
  )
}

function ModalBody() {
  const { modal } = useUi()
  if (!modal) return null

  if (modal.kind === 'audit') {
    return (
      <>
        <h2 className={styles.modalTitle}>Чек-ап бизнеса</h2>
        <div className={styles.modalBody}>
          <p>Покажем, где теряется прибыль и как ее можно быстро прибавить за минимум времени и денег.</p>
          <p>Диагностика продуктов, сайта, соц. сетей, рекламы и процессов.</p>
        </div>
        <div className={styles.ctaBlock}>
          <Button href={site.telegram} target="_blank" rel="noreferrer">
            Записаться на аудит
          </Button>
        </div>
      </>
    )
  }

  if (modal.kind === 'about') {
    const item = aboutItems.find((a) => a.id === modal.id)
    if (!item || item.video) return null
    return (
      <>
        <h2 className={styles.modalTitle}>{item.title.replace('\n', ' ')}</h2>
        <div className={styles.modalBody}>
          <p>{item.body}</p>
        </div>
      </>
    )
  }

  return null
}

function modalTitle(modal: ModalState | null) {
  if (!modal) return 'Окно'
  if (modal.kind === 'discuss') return 'Обсудить проект'
  if (modal.kind === 'audit') return 'Чек-ап бизнеса'
  if (modal.kind === 'screencast' || modal.kind === 'video') return 'Видео'
  if (modal.kind === 'case') return cases.find((c) => c.id === modal.id)?.name ?? 'Кейс'
  if (modal.kind === 'about') return aboutItems.find((a) => a.id === modal.id)?.title ?? 'О нас'
  return team.find((t) => t.id === modal.id)?.name ?? 'Команда'
}
