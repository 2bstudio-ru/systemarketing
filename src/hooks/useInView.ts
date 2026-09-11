import { useEffect, useRef, useState } from 'react'

type Options = {
  root?: Element | null
  rootMargin?: string
  threshold?: number
  /** Once visible, stay true even if scrolled away. Default true. */
  once?: boolean
}

/** Becomes true when `ref` intersects the viewport (or scroll root). */
export function useInView<T extends Element>({
  root = null,
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.35,
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || (once && inView)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setInView(true)
        if (once) observer.disconnect()
      },
      { root, rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [root, rootMargin, threshold, once, inView])

  return { ref, inView }
}
