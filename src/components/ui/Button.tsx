import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './ui.module.css'

type Shared = {
  children: ReactNode
  variant?: 'solid' | 'ghost'
  className?: string
}

type AsButton = Shared &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type AsLink = Shared &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

export function Button({ variant = 'solid', className, children, ...props }: AsButton | AsLink) {
  const cls = [styles.button, variant === 'ghost' ? styles.ghost : '', className]
    .filter(Boolean)
    .join(' ')

  if ('href' in props && props.href) {
    const { href, ...rest } = props
    return (
      <a className={cls} href={href} {...rest}>
        {children}
      </a>
    )
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type={buttonProps.type ?? 'button'} className={cls} {...buttonProps}>
      {children}
    </button>
  )
}
