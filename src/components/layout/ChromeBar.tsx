import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/images/logo-white.svg'
import mail from '../../assets/icons/mail.svg'
import menu from '../../assets/icons/menu.svg'
import phone from '../../assets/icons/phone.svg'
import telegram from '../../assets/icons/telegram.svg'
import { useUi } from '../../app/use-ui'
import { site } from '../../content/site'
import { IconButton } from '../ui/IconButton'
import styles from './layout.module.css'

export function ChromeBar({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
  const { openMenu } = useUi()
  const chromeRef = useRef<HTMLElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const chrome = chromeRef.current
    const sentinel = sentinelRef.current
    if (!chrome || !sentinel) return

    let frame = 0

    const update = () => {
      frame = 0
      const portTop = scrollRoot?.getBoundingClientRect().top ?? 0
      // Sentinel sits in normal flow at the chrome's pin start.
      // Only when it has scrolled past the top is the bar actually stuck —
      // don't trust chrome.getBoundingClientRect() alone (WebKit quirks).
      const next = sentinel.getBoundingClientRect().bottom <= portTop + 0.5
      setStuck((prev) => (prev === next ? prev : next))
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    const target: HTMLElement | Window = scrollRoot ?? window
    target.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.visualViewport?.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      target.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.visualViewport?.removeEventListener('resize', onScroll)
    }
  }, [scrollRoot])

  return (
    <>
      <div className={styles.chromeSentinel} ref={sentinelRef} aria-hidden />
      <header
        className={styles.chrome}
        ref={chromeRef}
        data-stuck={stuck ? '' : undefined}
      >
        <a href="#top" aria-label="Система">
          <img className={styles.logo} src={logo} alt="Система" width={110} height={17} />
        </a>
        <div className={styles.actions}>
          <IconButton href={`tel:${site.phone}`} src={phone} label="Телефон" />
          <IconButton href={`mailto:${site.email}`} src={mail} label="Электронная почта" />
          <IconButton href={site.telegram} src={telegram} label="Telegram" target="_blank" rel="noreferrer" />
          <button type="button" className={styles.menuBtn} onClick={openMenu} aria-label="Открыть меню">
            <img src={menu} alt="" width={84} height={22} />
          </button>
        </div>
      </header>
    </>
  )
}
