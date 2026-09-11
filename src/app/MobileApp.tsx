import { ChromeBar } from '../components/layout/ChromeBar'
import { ModalHost } from '../components/layout/ModalHost'
import { SideMenu } from '../components/layout/SideMenu'
import { About } from '../components/sections/About'
import { Cases } from '../components/sections/Cases'
import { Checkup } from '../components/sections/Checkup'
import { FinalCta } from '../components/sections/FinalCta'
import { Hero } from '../components/sections/Hero'
import { LongTerm } from '../components/sections/LongTerm'
import { Screencast } from '../components/sections/Screencast'
import { Services } from '../components/sections/Services'
import { Stages } from '../components/sections/Stages'
import { Team } from '../components/sections/Team'
import { TelegramAsk } from '../components/sections/TelegramAsk'
import { Testimonials } from '../components/sections/Testimonials'
import { WhoWeAre } from '../components/sections/WhoWeAre'
import { useHashScroll } from '../hooks/useHashScroll'
import { useUi } from './use-ui'
import styles from './shell.module.css'

export function MobileApp({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
  const { closeMenu } = useUi()
  useHashScroll(closeMenu)

  return (
    <div className={styles.app}>
      <main>
        <Hero />
        <ChromeBar scrollRoot={scrollRoot} />
        <WhoWeAre scrollRoot={scrollRoot} />
        <Services scrollRoot={scrollRoot} />
        <Checkup scrollRoot={scrollRoot} />
        <Cases scrollRoot={scrollRoot} />
        <TelegramAsk />
        <Screencast scrollRoot={scrollRoot} />
        <Testimonials scrollRoot={scrollRoot} />
        <About scrollRoot={scrollRoot} />
        <LongTerm scrollRoot={scrollRoot} />
        <Stages scrollRoot={scrollRoot} />
        <Team scrollRoot={scrollRoot} />
        <FinalCta scrollRoot={scrollRoot} />
      </main>
      <SideMenu scrollRoot={scrollRoot} />
      <ModalHost scrollRoot={scrollRoot} />
    </div>
  )
}
