import { useEffect } from 'react'

/**
 * Freeze scroll without `overflow: hidden` on the scroll root —
 * that reset sticky stacks and scrollTop, so the modal backdrop
 * briefly blurred empty gray instead of the page under the popup.
 */
export function useBodyScrollLock(locked: boolean, root?: HTMLElement | null) {
  useEffect(() => {
    if (!locked) return

    const target = root ?? null

    if (target) {
      const scrollTop = target.scrollTop
      target.classList.add('is-scroll-locked')
      target.dataset.scrollLocked = '1'

      const prevent = (event: Event) => {
        event.preventDefault()
      }

      const keepScroll = () => {
        if (target.scrollTop !== scrollTop) target.scrollTop = scrollTop
      }

      target.addEventListener('wheel', prevent, { passive: false })
      target.addEventListener('touchmove', prevent, { passive: false })
      target.addEventListener('scroll', keepScroll)

      return () => {
        target.classList.remove('is-scroll-locked')
        delete target.dataset.scrollLocked
        target.removeEventListener('wheel', prevent)
        target.removeEventListener('touchmove', prevent)
        target.removeEventListener('scroll', keepScroll)
        target.scrollTop = scrollTop
      }
    }

    const scrollY = window.scrollY
    const { body } = document
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      overflow: body.style.overflow,
      width: body.style.width,
    }

    body.classList.add('is-scroll-locked')
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'

    return () => {
      body.classList.remove('is-scroll-locked')
      body.style.position = previous.position
      body.style.top = previous.top
      body.style.left = previous.left
      body.style.right = previous.right
      body.style.width = previous.width
      body.style.overflow = previous.overflow
      window.scrollTo(0, scrollY)
    }
  }, [locked, root])
}
