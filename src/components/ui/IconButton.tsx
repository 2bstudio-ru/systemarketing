import type { AnchorHTMLAttributes } from 'react'
import styles from './ui.module.css'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  src: string
  label: string
}

export function IconButton({ src, label, className, ...props }: Props) {
  return (
    <a className={[styles.iconBtn, className].filter(Boolean).join(' ')} aria-label={label} {...props}>
      <img src={src} alt="" width={29} height={29} />
    </a>
  )
}
