import { Preloader } from '../components/layout/Preloader'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { DesktopShell } from './DesktopShell'
import { MobileApp } from './MobileApp'
import { UiProvider } from './ui-state'

export default function App() {
  const isDesktop = useMediaQuery('(min-width: 640px)')

  return (
    <UiProvider>
      <Preloader />
      {isDesktop ? <DesktopShell /> : <MobileApp />}
    </UiProvider>
  )
}
