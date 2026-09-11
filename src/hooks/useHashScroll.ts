import { useEffect } from 'react'

export function useHashScroll(onNavigate?: () => void) {
  useEffect(() => {
    const scrollToHash = (hash: string) => {
      const id = hash.replace('#', '')
      if (!id || id === 'menuopen') return
      const node = document.getElementById(id)
      node?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      onNavigate?.()
    }

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest('a[href^="#"]')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || href === '#menuopen') return
      event.preventDefault()
      history.pushState(null, '', href)
      scrollToHash(href)
    }

    document.addEventListener('click', onClick)
    if (window.location.hash) scrollToHash(window.location.hash)
    return () => document.removeEventListener('click', onClick)
  }, [onNavigate])
}
