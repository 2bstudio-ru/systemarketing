import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { UiContext } from './ui-context'
import type { ModalState } from './ui-types'

export function UiProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState<ModalState | null>(null)

  const openMenu = useCallback(() => setMenuOpen(true), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const openModal = useCallback((next: ModalState) => {
    setMenuOpen(false)
    setModal(next)
  }, [])
  const closeModal = useCallback(() => setModal(null), [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      setModal(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo(
    () => ({ menuOpen, modal, openMenu, closeMenu, openModal, closeModal }),
    [menuOpen, modal, openMenu, closeMenu, openModal, closeModal],
  )

  return <UiContext value={value}>{children}</UiContext>
}
