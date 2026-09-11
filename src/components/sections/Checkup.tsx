import { useEffect, useRef } from 'react'
import ctaArrow from '../../assets/icons/cta-arrow-mint.svg'
import cardBg from '../../assets/images/checkup/card-bg.svg'
import listBg from '../../assets/images/checkup/list-bg.svg'
import noteBg from '../../assets/images/checkup/note-bg.svg'
import { site } from '../../content/site'
import styles from './sections.module.css'

const items: { mark: string; rest: string; prefix?: string }[] = [
  {
    mark: 'Диагностика',
    rest: ' продуктов, сайта, соц. сетей, рекламы и процессов',
  },
  {
    mark: 'поиск «горлышек»',
    rest: ' в маркетинге, продажах и аналитике',
    prefix: 'Быстрый ',
  },
  {
    mark: 'Четкий план',
    rest: ': от быстрых денег к стратегическим шагам',
  },
]

/**
 * Tilda Zero rec1855009721 @ 360
 * Note group #1765535819107000025:
 *   top 725 / 280×185
 *   SBS scroll trg=1 (viewport bottom) trgofst=650
 *   my: 0 → -130 over di=950
 *
 * By the time the note is on screen, progress is already ~0.7,
 * so it sits over the dark card like in the original.
 */
export function Checkup({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
  const sectionRef = useRef<HTMLElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const board = boardRef.current
    const note = noteRef.current
    if (!board || !note) return

    const NOTE_TOP = 725
    const SHIFT = -130
    const DIST = 950
    const OFFSET = 650

    let frame = 0

    const update = () => {
      frame = 0
      const rootTop = scrollRoot ? scrollRoot.getBoundingClientRect().top : 0
      const rootHeight = scrollRoot ? scrollRoot.clientHeight : window.innerHeight
      const u = board.getBoundingClientRect().width / 360
      if (u <= 0) return

      // Layout Y (ignore current transform) — same as Tilda group top 725
      const noteLayoutTop = board.getBoundingClientRect().top + NOTE_TOP * u
      // trg=1 + trgofst 650: animation starts 650u before note hits viewport bottom
      const startLine = rootTop + rootHeight + OFFSET * u
      const progress = Math.min(1, Math.max(0, (startLine - noteLayoutTop) / (DIST * u)))
      note.style.transform = `translate3d(0, ${SHIFT * u * progress}px, 0)`
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    onScroll()

    const targets = new Set<EventTarget>()
    if (scrollRoot) targets.add(scrollRoot)
    targets.add(window)

    targets.forEach((t) => t.addEventListener('scroll', onScroll, { passive: true }))
    window.addEventListener('resize', onScroll)

    const io = new IntersectionObserver(onScroll, {
      root: scrollRoot ?? null,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    })
    io.observe(note)
    io.observe(board)

    return () => {
      cancelAnimationFrame(frame)
      targets.forEach((t) => t.removeEventListener('scroll', onScroll))
      window.removeEventListener('resize', onScroll)
      io.disconnect()
    }
  }, [scrollRoot])

  return (
    <section id="checkup" className={styles.checkup} ref={sectionRef}>
      <div className={styles.checkupBoard} ref={boardRef}>
        <div className={styles.checkupCard}>
          <img className={styles.checkupCardBg} src={cardBg} alt="" aria-hidden />

          <h2 className={styles.checkupTitle}>
            проведем Чек-ап
            <br />
            вашего бизнеса
          </h2>
          <p className={styles.checkupLead}>
            Покажем, где теряется прибыль и&nbsp;как ее&nbsp;можно быстро прибавить за&nbsp;минимум
            времени и&nbsp;денег
          </p>

          <div className={styles.checkupListWrap}>
            <img className={styles.checkupListBg} src={listBg} alt="" aria-hidden />
            <h3 className={styles.checkupIncluded}>Что включено:</h3>
            <ul className={styles.checkupList}>
              {items.map((item) => (
                <li key={item.mark}>
                  {item.prefix}
                  <span className={styles.checkupHl}>{item.mark}</span>
                  {item.rest}
                </li>
              ))}
            </ul>

            <a
              className={styles.checkupCta}
              href={site.telegram}
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.checkupCtaIcon}>
                <img src={ctaArrow} alt="" width={30} height={30} />
              </span>
              <span className={styles.checkupCtaLabel}>Записаться на аудит</span>
            </a>
          </div>
        </div>

        <aside className={styles.checkupNote} ref={noteRef}>
          <img className={styles.checkupNoteBg} src={noteBg} alt="" aria-hidden />
          <p className={styles.checkupNoteStar}>[*]</p>
          <p className={styles.checkupNoteText}>
            <span className={styles.checkupNoteHl}>Более 15 лет опыта</span> помогают нам увидеть
            типичные узкие места в&nbsp;маркетинге, продажах и&nbsp;бизнесе, которые ваша команда
            пропустила
          </p>
        </aside>
      </div>
    </section>
  )
}
