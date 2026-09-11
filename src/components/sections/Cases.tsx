import { Fragment, useEffect, useRef, useState } from 'react'
import playIcon from '../../assets/images/cases/play.svg'
import { useUi } from '../../app/use-ui'
import { cases } from '../../content/cases'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useStackPin } from '../../hooks/useStackPin'
import { TYPEWRITER_FAST_MS } from '../ui/Typewriter'
import styles from './sections.module.css'

const TITLE_FIRST = 'Наши кейсы'
const TITLE_REST = '— это решение задач собственников'
const TITLE_FULL = `${TITLE_FIRST}\n${TITLE_REST}`
const TITLE_LABEL = 'Наши кейсы — это решение задач собственников'

const CARD_COUNT = cases.length

export function Cases({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
  const { openModal } = useUi()
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { ref: titleRef, inView } = useInView<HTMLHeadingElement>({
    root: scrollRoot ?? null,
    threshold: 0.35,
  })

  useStackPin({
    sectionRef,
    pinRef,
    listRef,
    scrollRoot,
    cardCount: CARD_COUNT,
    stepU: 0,
    reduceMotion,
  })

  return (
    <section
      id="cases"
      className={styles.cases}
      ref={sectionRef}
      data-static={reduceMotion || undefined}
    >
      <div className={styles.casesPin} ref={pinRef}>
        <header className={styles.casesIntro}>
          <h2 className={styles.casesIntroInner} aria-label={TITLE_LABEL} ref={titleRef}>
            <CasesTypewriter active={inView} reduceMotion={reduceMotion} />
          </h2>
        </header>

        <div className={styles.caseList} ref={listRef}>
          {cases.map((item, index) => (
            <article
              key={item.id}
              className={styles.caseCard}
              style={{ ['--stack-i' as string]: index }}
            >
              <div
                className={styles.caseCardFace}
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <button
                  type="button"
                  className={styles.caseMedia}
                  onClick={() => openModal({ kind: 'case', id: item.id })}
                  aria-label={`Смотреть кейс ${item.name}`}
                >
                  <img className={styles.caseImage} src={item.image} alt="" />
                  <img className={styles.casePlay} src={playIcon} alt="" width={30} height={30} />
                </button>

                <div className={styles.caseBody}>
                  <span className={styles.caseIndex}>[{item.index}]</span>
                  <h3 className={styles.caseName}>{item.name}</h3>
                  <p className={styles.caseQuote}>{item.quote}</p>
                  <button
                    type="button"
                    className={styles.caseMore}
                    onClick={() => openModal({ kind: 'case', id: item.id })}
                  >
                    подробнее о кейсе +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.casesSpacer} data-stack-spacer="" aria-hidden />
    </section>
  )
}

function CasesTypewriter({
  active,
  reduceMotion,
}: {
  active: boolean
  reduceMotion: boolean
}) {
  const [count, setCount] = useState(reduceMotion ? TITLE_FULL.length : 0)

  useEffect(() => {
    if (reduceMotion) {
      setCount(TITLE_FULL.length)
      return
    }
    if (!active) {
      setCount(0)
      return
    }

    setCount(0)
    let current = 0
    const id = window.setInterval(() => {
      current += 1
      setCount(current)
      if (current >= TITLE_FULL.length) window.clearInterval(id)
    }, TYPEWRITER_FAST_MS)

    return () => window.clearInterval(id)
  }, [active, reduceMotion])

  const visible = TITLE_FULL.slice(0, count)
  const nl = visible.indexOf('\n')
  const first = nl === -1 ? visible : visible.slice(0, nl)
  const rest = nl === -1 ? '' : visible.slice(nl + 1)
  const done = count >= TITLE_FULL.length
  const typingFirst = !done && count <= TITLE_FIRST.length
  const showCaret = !done && active && !reduceMotion

  return (
    <>
      <span className={styles.casesTitleRow}>
        <span className={styles.casesBadge}>кейсы</span>
        <span className={styles.casesTitle} aria-hidden>
          {first}
          {showCaret && typingFirst ? <span className={styles.typewriterCaret} /> : null}
        </span>
      </span>
      <span className={styles.casesLead} aria-hidden>
        {rest.split('\n').map((line, index, lines) => (
          <Fragment key={index}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
          </Fragment>
        ))}
        {showCaret && !typingFirst ? <span className={styles.typewriterCaret} /> : null}
      </span>
    </>
  )
}
