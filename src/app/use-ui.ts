import { use } from 'react'
import { UiContext } from './ui-context'

export function useUi() {
  const ctx = use(UiContext)
  if (!ctx) throw new Error('useUi must be used within UiProvider')
  return ctx
}
