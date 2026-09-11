import type { ReactNode } from 'react'
import styles from './ui.module.css'

export function SectionEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={[styles.eyebrow, className].filter(Boolean).join(' ')}>{children}</p>
}
