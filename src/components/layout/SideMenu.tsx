import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import logo from '../../assets/images/logo-menu.svg'
import mail from '../../assets/icons/menu-mail.svg'
import phone from '../../assets/icons/menu-phone.svg'
import telegram from '../../assets/icons/menu-telegram.svg'
import { useUi } from '../../app/use-ui'
import { navItems, site } from '../../content/site'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import styles from './layout.module.css'

function overlayHost(scrollRoot?: HTMLElement | null) {
  return scrollRoot?.closest('.phoneScreen') ?? null
}

export function SideMenu({ scrollRoot }: { scrollRoot?: HTMLElement | null }) {
  const { menuOpen, closeMenu } = useUi()
  useBodyScrollLock(menuOpen, scrollRoot)

  const host = overlayHost(scrollRoot)

  const menu = (
    <AnimatePresence>
      {menuOpen ? (
        <motion.div
          className={styles.drawer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
        >
          <button
            type="button"
            className={styles.drawerOverlay}
            aria-label="Закрыть меню"
            onClick={closeMenu}
          />
          <motion.aside
            className={styles.drawerPanel}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
          >
            <button
              type="button"
              className={styles.closeMenu}
              onClick={closeMenu}
              aria-label="Закрыть меню"
            />
            <div className={styles.menuTop}>
              <img className={styles.menuLogo} src={logo} alt="Система" width={180} height={27} />
              <nav className={styles.nav} aria-label="Разделы">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={closeMenu}>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className={styles.menuFooter}>
              <div className={styles.socials}>
                <a className={styles.menuSocial} href={`tel:${site.phone}`} aria-label="Телефон">
                  <img src={phone} alt="" width={30} height={30} />
                </a>
                <a className={styles.menuSocial} href={`mailto:${site.email}`} aria-label="Электронная почта">
                  <img src={mail} alt="" width={30} height={30} />
                </a>
                <a
                  className={styles.menuSocial}
                  href={site.telegram}
                  aria-label="Telegram"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={telegram} alt="" width={30} height={30} />
                </a>
              </div>
              <a
                className={styles.menuCta}
                href={site.telegram}
                target="_blank"
                rel="noreferrer"
              >
                Обсудить проект
              </a>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  return host ? createPortal(menu, host) : menu
}
