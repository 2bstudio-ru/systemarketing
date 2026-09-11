import { useEffect, useMemo, useRef } from 'react'
import pattern from '../../assets/images/about/pattern.jpg'
import playIcon from '../../assets/images/about/play.svg'
import playYt from '../../assets/images/about/play-yt.svg'
import { useUi } from '../../app/use-ui'
import { aboutItems } from '../../content/about'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { TYPEWRITER_FAST_MS, TypewriterSegments } from '../ui/Typewriter'
import styles from './sections.module.css'

const TITLE_LABEL = 'Познакомьтесь с нами ближе'

/**
 * Tilda Zero rec1855009861 @ 360
 * Cards 02–04 SBS scroll (trg=1, ofst=0):
 *   02 my 0→-30 / di 1000
 *   03 my 0→+50 / di 1000
 *   04 my 0→-50 / di 800
 */
export function About({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
  const { openModal } = useUi()
  const boardRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { ref, inView } = useInView<HTMLHeadingElement>({
    root: scrollRoot ?? null,
    threshold: 0.35,
  })
  const segments = useMemo(
    () => [
      { text: 'Познакомьтесь', className: styles.aboutTitleA },
      { text: 'с нами ближе', className: styles.aboutTitleB },
    ],
    [],
  )

  useEffect(() => {
    const board = boardRef.current
    if (!board) return

    const cards = [
      ...board.querySelectorAll<HTMLElement>('[data-parallax-my]'),
    ]

    if (reduceMotion) {
      cards.forEach((card) => {
        card.style.transform = ''
      })
      return
    }

    let frame = 0

    const update = () => {
      frame = 0
      const rootTop = scrollRoot ? scrollRoot.getBoundingClientRect().top : 0
      const rootHeight = scrollRoot ? scrollRoot.clientHeight : window.innerHeight
      const boardTop = board.getBoundingClientRect().top
      const u = board.getBoundingClientRect().width / 360
      if (u <= 0) return

      // trg=1: animation keyed to viewport bottom; ofst=0
      const startLine = rootTop + rootHeight

      for (const card of cards) {
        const my = Number(card.dataset.parallaxMy)
        const di = Number(card.dataset.parallaxDi)
        const top = Number(card.dataset.parallaxTop)
        if (!Number.isFinite(my) || !Number.isFinite(di) || !Number.isFinite(top) || di <= 0) {
          continue
        }
        const layoutTop = boardTop + top * u
        const progress = Math.min(1, Math.max(0, (startLine - layoutTop) / (di * u)))
        card.style.transform = `translate3d(0, ${my * u * progress}px, 0)`
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()

    const targets = new Set<EventTarget>()
    if (scrollRoot) targets.add(scrollRoot)
    targets.add(window)
    targets.forEach((t) => t.addEventListener('scroll', onScroll, { passive: true }))
    window.addEventListener('resize', onScroll)

    const io = new IntersectionObserver(onScroll, {
      root: scrollRoot ?? null,
      threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
    })
    io.observe(board)
    cards.forEach((card) => io.observe(card))

    return () => {
      cancelAnimationFrame(frame)
      targets.forEach((t) => t.removeEventListener('scroll', onScroll))
      window.removeEventListener('resize', onScroll)
      io.disconnect()
    }
  }, [scrollRoot, reduceMotion])

  return (
    <section id="about" className={styles.about}>
      <div
        className={styles.aboutBoard}
        style={{ backgroundImage: `url(${pattern})` }}
        ref={boardRef}
      >
        <header className={styles.aboutHead}>
          <span className={styles.aboutBadge}>о нас</span>
          <h2 className={styles.aboutTitle} aria-label={TITLE_LABEL} ref={ref}>
            <TypewriterSegments
              segments={segments}
              caretClassName={styles.typewriterCaret}
              reduceMotion={reduceMotion}
              active={inView}
              intervalMs={TYPEWRITER_FAST_MS}
            />
          </h2>
        </header>

        {aboutItems.map((item) => {
          const faceStyle = {
            ['--about-left' as string]: item.left,
            ['--about-top' as string]: item.top,
            ['--about-w' as string]: item.width,
            ['--about-h' as string]: item.height,
            ['--about-media-h' as string]: item.mediaHeight,
            ['--about-rot' as string]: `${item.rotate}deg`,
          }

          const open = () => {
            if (item.href) {
              window.open(item.href, '_blank', 'noopener,noreferrer')
              return
            }
            openModal({ kind: 'about', id: item.id })
          }

          return (
            <button
              key={item.id}
              type="button"
              className={`${styles.aboutCard} ${item.wide ? styles.aboutCardWide : ''}`}
              style={faceStyle}
              onClick={open}
              aria-label={item.title.replace('\n', ' ')}
              {...(item.parallax
                ? {
                    'data-parallax-my': item.parallax.my,
                    'data-parallax-di': item.parallax.di,
                    'data-parallax-top': item.top,
                  }
                : {})}
            >
              <span className={styles.aboutCardFace}>
                <span className={styles.aboutMedia}>
                  <img className={styles.aboutImage} src={item.image} alt="" />
                  <img
                    className={item.wide ? styles.aboutPlayYt : styles.aboutPlay}
                    src={item.wide ? playYt : playIcon}
                    alt=""
                    width={item.wide ? 40 : 30}
                    height={item.wide ? 28 : 30}
                  />
                </span>
                <span className={styles.aboutCaption}>
                  <span className={styles.aboutCardTitle}>
                    {item.title.split('\n').map((line, i) => (
                      <span key={i}>
                        {i > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </span>
                  <span className={styles.aboutIndex}>[{item.index}]</span>
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
