import { createContext } from 'react'
import type { ModalState } from './ui-types'

export type UiContextValue = {
  menuOpen: boolean
  modal: ModalState | null
  openMenu: () => void
  closeMenu: () => void
  openModal: (modal: ModalState) => void
  closeModal: () => void
}

export const UiContext = createContext<UiContextValue | null>(null)
