import { useState } from 'react'
import type { Service } from '../../content/services'
import styles from './ui.module.css'

export function Accordion({ items }: { items: Service[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div>
      {items.map((item) => {
        const open = openId === item.id
        return (
          <div key={item.id} className={styles.accordion}>
            <button
              type="button"
              className={styles.accBtn}
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className={styles.accTitle}>{item.title}</span>
              <span className={styles.accPlus} aria-hidden>
                {open ? '–' : '+'}
              </span>
            </button>
            {open ? (
              <div className={styles.accBody}>
                <p>{item.lead}</p>
                <p style={{ marginTop: 10 }}>{item.body}</p>
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
