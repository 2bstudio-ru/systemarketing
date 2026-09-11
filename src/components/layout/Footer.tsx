import { navItems, site } from '../../content/site'
import { SectionEyebrow } from '../ui/SectionEyebrow'
import styles from './layout.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <SectionEyebrow>информация</SectionEyebrow>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          textTransform: 'uppercase',
          letterSpacing: '-0.5px',
          marginTop: 10,
        }}
      >
        Способы связи
      </h2>
      <div className={styles.footerGrid}>
        <nav className={styles.footerNav} aria-label="Навигация">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className={styles.contacts}>
          <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>e-mail</a>
          <a href={site.telegram} target="_blank" rel="noreferrer">
            Telegram
          </a>
        </div>
      </div>
      <div className={styles.footerMeta}>
        <span>{site.copyright}</span>
        <span>{site.privacy}</span>
      </div>
    </footer>
  )
}
