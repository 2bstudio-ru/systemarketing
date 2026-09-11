import { useState } from 'react'
import desktopBg from '../assets/images/desktop-bg.jpg'
import iphoneFrame from '../assets/images/iphone-frame.png'
import statusbar from '../assets/images/iphone-statusbar.svg'
import logo from '../assets/images/logo-wordmark.svg'
import { desktopCopy } from '../content/site'
import { useMoscowClock } from '../hooks/useMoscowClock'
import { MobileApp } from './MobileApp'
import styles from './shell.module.css'

export function DesktopShell() {
  const [screen, setScreen] = useState<HTMLDivElement | null>(null)
  const time = useMoscowClock()

  return (
    <div className={styles.desktop} style={{ ['--desktop-bg' as string]: `url(${desktopBg})` }}>
      <div className={styles.side}>
        <img className={styles.logo} src={logo} alt="Система" width={390} height={59} />
        <p className={styles.tagline}>{desktopCopy.tagline}</p>
      </div>

      <div className={styles.phone}>
        <div className={styles.statusPlate} aria-hidden />
        <img className={styles.bezel} src={iphoneFrame} alt="" width={380} height={782} />
        <img className={styles.status} src={statusbar} alt="" width={350} height={42} />
        <span className={styles.clock}>{time}</span>
        <div className={`${styles.screen} phoneScreen`}>
          <div className={styles.screenScroll} ref={setScreen}>
            <MobileApp scrollRoot={screen} />
          </div>
        </div>
      </div>

      <p className={styles.sideRight}>{desktopCopy.aside}</p>
    </div>
  )
}
