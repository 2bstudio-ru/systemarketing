import styles from './ui.module.css'

type Props = {
  className?: string
  label?: string
  tone?: 'light' | 'dark'
}

export function MediaPlaceholder({ className, label = 'медиа', tone = 'light' }: Props) {
  return (
    <div
      className={[styles.mediaPh, tone === 'dark' ? styles.mediaPhDark : '', className]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      {label}
    </div>
  )
}
