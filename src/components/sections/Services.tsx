import { Fragment, useEffect, useRef, useState } from 'react'
import sphere from '../../assets/images/sphere.jpg'
import { services } from '../../content/services'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useStackPin } from '../../hooks/useStackPin'
import { TYPEWRITER_FAST_MS } from '../ui/Typewriter'
import styles from './sections.module.css'

const TITLE_FIRST = 'Закрываем все,'
const TITLE_REST = 'что нужно\nдля роста прибыли\nи\u00A0удовольствия\nот\u00A0бизнеса!'
const TITLE_FULL = `${TITLE_FIRST}\n${TITLE_REST}`
const TITLE_LABEL =
  'Закрываем все, что нужно для роста прибыли и удовольствия от бизнеса!'

const CARD_COUNT = services.length

export function Services({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
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
    stepU: 50,
    reduceMotion,
  })

  return (
    <section
      id="napravlenija"
      className={styles.services}
      ref={sectionRef}
      data-static={reduceMotion || undefined}
    >
      <div className={styles.servicesPin} ref={pinRef}>
        <div className={styles.servicesIntro}>
          <h2 className={styles.servicesIntroInner} aria-label={TITLE_LABEL} ref={titleRef}>
            <ServicesTypewriter active={inView} reduceMotion={reduceMotion} />
          </h2>
          <img
            className={styles.servicesMesh}
            src={sphere}
            alt=""
            width={171}
            height={172}
            aria-hidden
          />
        </div>

        <div className={styles.serviceList} ref={listRef}>
          {services.map((service, index) => (
              <article
                key={service.id}
                className={styles.serviceCard}
                style={{ ['--stack-i' as string]: index }}
              >
                <div className={styles.serviceHead}>
                  <img
                    className={styles.serviceIcon}
                    src={service.icon}
                    alt=""
                    width={35}
                    height={35}
                  />
                  <h3 className={styles.serviceName}>{service.title}</h3>
                </div>
                <div className={styles.servicePanel}>
                  <div className={styles.servicePanelInner}>
                    <p className={styles.serviceLead}>{service.lead}</p>
                    <div className={styles.serviceRow}>
                      <img
                        className={styles.serviceThumb}
                        src={service.media}
                        alt=""
                        width={70}
                        height={125}
                      />
                      <p className={styles.serviceBody}>{service.body}</p>
                    </div>
                  </div>
                </div>
              </article>
          ))}
        </div>
      </div>
      <div className={styles.servicesSpacer} data-stack-spacer="" aria-hidden />
    </section>
  )
}

function ServicesTypewriter({
  active,
  reduceMotion,
}: {
  active: boolean
  reduceMotion: boolean
}) {
  const full = TITLE_FULL
  const [count, setCount] = useState(reduceMotion ? full.length : 0)

  useEffect(() => {
    if (reduceMotion) {
      setCount(full.length)
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
      if (current >= full.length) window.clearInterval(id)
    }, TYPEWRITER_FAST_MS)

    return () => window.clearInterval(id)
  }, [active, reduceMotion, full])

  const visible = full.slice(0, count)
  const nl = visible.indexOf('\n')
  const first = nl === -1 ? visible : visible.slice(0, nl)
  const rest = nl === -1 ? '' : visible.slice(nl + 1)
  const done = count >= full.length
  const typingFirst = !done && count <= TITLE_FIRST.length
  const showCaret = !done && active && !reduceMotion

  return (
    <>
      <span className={styles.servicesTitleRow}>
        <span className={styles.servicesBadge}>что мы делаем</span>
        <span className={styles.servicesTitleFirst} aria-hidden>
          {first}
          {showCaret && typingFirst ? <span className={styles.typewriterCaret} /> : null}
        </span>
      </span>
      <span className={styles.servicesTitleRest} aria-hidden>
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
