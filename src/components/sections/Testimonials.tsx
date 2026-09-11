import { useState } from 'react'
import reviewClose from '../../assets/icons/review-close.svg'
import reviewPlus from '../../assets/icons/review-plus.svg'
import { testimonials } from '../../content/testimonials'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { TYPEWRITER_FAST_MS, Typewriter } from '../ui/Typewriter'
import styles from './sections.module.css'

/** Tilda Zero rec1855009831 @ 360 */
export function Testimonials({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
  const [openId, setOpenId] = useState<string | null>(testimonials[0]?.id ?? null)
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const { ref, inView } = useInView<HTMLHeadingElement>({
    root: scrollRoot ?? null,
    threshold: 0.35,
  })

  return (
    <section id="testimonials" className={styles.testimonials}>
      <header className={styles.testimonialsHead}>
        <span className={styles.testimonialsBadge}>Отзывы</span>
        <h2 className={styles.testimonialsTitle} aria-label="За что нас ценят?" ref={ref}>
          <Typewriter
            text="За что нас ценят?"
            caretClassName={styles.typewriterCaret}
            reduceMotion={reduceMotion}
            active={inView}
            intervalMs={TYPEWRITER_FAST_MS}
          />
        </h2>
      </header>

      <ul className={styles.testimonialsList}>
        {testimonials.map((item) => {
          const open = openId === item.id
          return (
            <li key={item.id} className={styles.testimonialItem} data-open={open || undefined}>
              <button
                type="button"
                className={styles.testimonialTrigger}
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <span className={styles.testimonialItemTitle}>
                  {item.title.split('\n').map((line, i) => (
                    <span key={i}>
                      {i > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </span>
                <span className={styles.testimonialToggle} aria-hidden>
                  <img
                    className={styles.testimonialTogglePlus}
                    src={reviewPlus}
                    alt=""
                    width={25}
                    height={25}
                  />
                  <img
                    className={styles.testimonialToggleClose}
                    src={reviewClose}
                    alt=""
                    width={25}
                    height={25}
                  />
                </span>
              </button>

              <div className={styles.testimonialCollapse}>
                <div className={styles.testimonialCollapseInner}>
                  <div className={styles.testimonialBody}>
                    <p className={styles.testimonialQuote}>{item.quote}</p>
                    <div className={styles.testimonialAuthor}>
                      <img
                        className={styles.testimonialPhoto}
                        src={item.photo}
                        alt=""
                        width={40}
                        height={40}
                      />
                      <div className={styles.testimonialMeta}>
                        <p className={styles.testimonialName}>{item.name}</p>
                        <p className={styles.testimonialRole}>
                          {item.role.split('\n').map((line, i) => (
                            <span key={i}>
                              {i > 0 ? <br /> : null}
                              {line}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
