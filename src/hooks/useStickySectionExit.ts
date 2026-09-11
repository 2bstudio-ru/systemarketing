import { useEffect, type RefObject } from 'react'

/** Keeps card sticky `top` flush under the live title height. */
export function useStickyIntroHeight(
  sectionRef: RefObject<HTMLElement | null>,
  cssVar: '--services-intro-h' | '--cases-intro-h',
) {
  useEffect(() => {
    const section = sectionRef.current
    const intro = section?.querySelector<HTMLElement>('[data-stack-intro]')
    if (!section || !intro) return

    const apply = () => {
      section.style.setProperty(cssVar, `${intro.offsetHeight}px`)
    }

    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(intro)
    window.addEventListener('resize', apply)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', apply)
      section.style.removeProperty(cssVar)
    }
  }, [sectionRef, cssVar])
}
