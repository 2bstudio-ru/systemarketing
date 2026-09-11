import { useEffect, useState } from 'react'
import teamFrame from '../../assets/images/team/frame.svg'
import { useUi } from '../../app/use-ui'
import { team } from '../../content/team'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { TYPEWRITER_FAST_MS } from '../ui/Typewriter'
import styles from './sections.module.css'

const TITLE_FIRST = 'Система — это'
const TITLE_REST = 'профессиональная\nкоманда, а не агентство!'
const TITLE_FULL = `${TITLE_FIRST}\n${TITLE_REST}`
const TITLE_LABEL = 'Система — это профессиональная команда, а не агентство!'

/** Tilda Zero rec1855010061 @ 360 */
export function Team({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
  const { openModal } = useUi()
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { ref, inView } = useInView<HTMLHeadingElement>({
    root: scrollRoot ?? null,
    threshold: 0.35,
  })

  return (
    <section id="team" className={styles.team}>
      <div className={styles.teamBoard}>
        <header className={styles.teamHead}>
          <h2 className={styles.teamTitle} aria-label={TITLE_LABEL} ref={ref}>
            <TeamTypewriter active={inView} reduceMotion={reduceMotion} />
          </h2>
          <div className={styles.teamTaglines}>
            <p className={styles.teamTagline}>Наша команда —</p>
            <p className={styles.teamTagline}>ваша команда</p>
          </div>
        </header>

        <ul className={styles.teamList}>
          {team.map((member) => (
            <li key={member.id}>
              <button
                type="button"
                className={styles.teamRow}
                onClick={() => openModal({ kind: 'team', id: member.id })}
              >
                <span className={styles.teamPhoto}>
                  <img src={member.photo} alt="" />
                  <img className={styles.teamPhotoFrame} src={teamFrame} alt="" aria-hidden />
                </span>
                <span className={styles.teamRole}>
                  {member.role.split('\n').map((line, i) => (
                    <span key={i}>
                      {i > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </span>
                <span className={styles.teamName}>{member.name}</span>
                <span className={styles.teamMore}>подробнее +</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function TeamTypewriter({
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
  const restLines = rest === '' ? [] : rest.split('\n')
  const done = count >= TITLE_FULL.length
  const typingFirst = !done && count <= TITLE_FIRST.length
  const showCaret = !done && active && !reduceMotion

  return (
    <>
      <span className={styles.teamTitleRow}>
        <span className={styles.teamBadge}>команда</span>
        <span aria-hidden>
          {first}
          {showCaret && typingFirst ? <span className={styles.typewriterCaret} /> : null}
        </span>
      </span>
      {restLines.map((line, index) => (
        <span key={index} className={styles.teamTitleLine} aria-hidden>
          {line}
          {showCaret && !typingFirst && index === restLines.length - 1 ? (
            <span className={styles.typewriterCaret} />
          ) : null}
        </span>
      ))}
    </>
  )
}
