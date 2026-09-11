import { useEffect, type RefObject } from 'react'

type Options = {
  sectionRef: RefObject<HTMLElement | null>
  pinRef: RefObject<HTMLElement | null>
  listRef: RefObject<HTMLElement | null>
  scrollRoot?: HTMLElement | null
  cardCount: number
  /** Final stacked offset per card, in artboard units (50 services, 0 cases). */
  stepU: number
  /** Gap between full cards in the open list, artboard units. */
  gapU?: number
  reduceMotion: boolean
}

/**
 * Sticky pin under chrome + spacer travel.
 * Cards start as a spaced on-page list; each next card docks onto the stack
 * in sequence (the rest of the list waits / follows behind).
 */
export function useStackPin({
  sectionRef,
  pinRef,
  listRef,
  scrollRoot,
  cardCount,
  stepU,
  gapU = 20,
  reduceMotion,
}: Options) {
  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const list = listRef.current
    if (!section || !pin || !list) return

    const cards = [...list.querySelectorAll<HTMLElement>('article')]
    const chrome = (scrollRoot ?? document).querySelector('header')
    const spacer = section.querySelector<HTMLElement>('[data-stack-spacer]')
    const steps = Math.max(1, cardCount - 1)

    const reset = () => {
      if (spacer) spacer.style.height = ''
      for (const card of cards) {
        card.style.transform = ''
        card.style.opacity = ''
        card.style.pointerEvents = ''
      }
    }

    if (reduceMotion) {
      reset()
      return
    }

    let padTop = 0
    let stackTravel = 1
    let openExtra = 0
    let frame = 0

    const measure = () => {
      const cs = getComputedStyle(section)
      padTop = parseFloat(cs.paddingTop) || 0
      const u = section.clientWidth / 360
      const stepPx = stepU * u
      const cardH = cards[0]?.offsetHeight || 240 * u
      const gapPx = gapU * u
      openExtra = Math.max(cardH + gapPx - stepPx, 1)
      stackTravel = Math.max(1, steps * Math.max(cardH * 1.15, 280 * u))
      // Spacer = stack travel only; section padding-bottom is the standard --section-gap
      if (spacer) spacer.style.height = `${stackTravel}px`
    }

    const setTf = (el: HTMLElement, value: string) => {
      if (el.style.transform !== value) el.style.transform = value
    }

    const update = () => {
      frame = 0
      const stick = chrome
        ? chrome.getBoundingClientRect().bottom
        : (scrollRoot?.getBoundingClientRect().top ?? 0)
      const raw = stick - (section.getBoundingClientRect().top + padTop)
      // One unit per card after the first: 0 → open list, N-1 → fully stacked
      const active =
        raw <= 2 ? 0 : Math.min(steps, Math.max(0, (raw / stackTravel) * steps))
      const docked = Math.floor(active + 1e-6)
      const local = Math.min(1, Math.max(0, active - docked))

      for (let i = 0; i < cards.length; i += 1) {
        const card = cards[i]
        let y = 0
        if (i <= docked) {
          y = 0
        } else if (i === docked + 1) {
          // Current card docks onto the stack
          y = (1 - local) * openExtra
        } else {
          // Rest of the list stays spaced, follows behind the active card
          y = (i - docked - local) * openExtra
        }
        setTf(card, y < 0.5 ? 'translate3d(0, 0, 0)' : `translate3d(0, ${y}px, 0)`)
        if (card.style.opacity !== '1') card.style.opacity = '1'
        if (card.style.pointerEvents !== '') card.style.pointerEvents = ''
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    const onResize = () => {
      measure()
      update()
    }

    measure()
    update()
    const target: HTMLElement | Window = scrollRoot ?? window
    target.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      target.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      reset()
    }
  }, [sectionRef, pinRef, listRef, scrollRoot, cardCount, stepU, gapU, reduceMotion])
}
