import { Fragment, useEffect, useMemo, useState } from 'react'

export const TYPEWRITER_MS = 62
/** Section titles (non-Hero): faster than Hero, still a calm reveal. */
export const TYPEWRITER_FAST_MS = Math.round(TYPEWRITER_MS / 2.2)

type TypewriterProps = {
  text: string
  className?: string
  caretClassName?: string
  reduceMotion?: boolean
  /** When false, stays empty until true (e.g. in-view). Default true. */
  active?: boolean
  intervalMs?: number
}

/** Character-by-character reveal with blinking caret (Hero-style). */
export function Typewriter({
  text,
  className,
  caretClassName,
  reduceMotion = false,
  active = true,
  intervalMs = TYPEWRITER_MS,
}: TypewriterProps) {
  const [count, setCount] = useState(reduceMotion ? text.length : 0)
  const done = count >= text.length

  useEffect(() => {
    if (reduceMotion) {
      setCount(text.length)
      return
    }
    if (!active) {
      setCount(0)
      return
    }

    setCount(0)
    let current = 0
    const id = window.setInterval(() => {
      current += 1
      setCount(current)
      if (current >= text.length) window.clearInterval(id)
    }, intervalMs)

    return () => window.clearInterval(id)
  }, [text, reduceMotion, active, intervalMs])

  const visible = text.slice(0, count)

  return (
    <span className={className} aria-hidden>
      {visible.split('\n').map((line, index, lines) => (
        <Fragment key={index}>
          {line}
          {index < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
      {!done && active && !reduceMotion ? <span className={caretClassName} /> : null}
    </span>
  )
}

export type TypewriterSegment = {
  text: string
  className?: string
}

type TypewriterSegmentsProps = {
  segments: TypewriterSegment[]
  caretClassName?: string
  reduceMotion?: boolean
  active?: boolean
  intervalMs?: number
}

/** Types through styled segments in order (preserves per-span layout). */
export function TypewriterSegments({
  segments,
  caretClassName,
  reduceMotion = false,
  active = true,
  intervalMs = TYPEWRITER_MS,
}: TypewriterSegmentsProps) {
  const fullText = useMemo(() => segments.map((s) => s.text).join(''), [segments])
  const fullLength = fullText.length
  const [count, setCount] = useState(reduceMotion ? fullLength : 0)

  useEffect(() => {
    if (reduceMotion) {
      setCount(fullLength)
      return
    }
    if (!active) {
      setCount(0)
      return
    }

    setCount(0)
    let current = 0
    const id = window.setInterval(() => {
      current += 1
      setCount(current)
      if (current >= fullLength) window.clearInterval(id)
    }, intervalMs)

    return () => window.clearInterval(id)
  }, [fullText, fullLength, reduceMotion, active, intervalMs])

  const done = count >= fullLength
  let cursor = 0

  return (
    <>
      {segments.map((seg, index) => {
        const start = cursor
        cursor += seg.text.length
        const take = Math.max(0, Math.min(count - start, seg.text.length))
        const visible = seg.text.slice(0, take)
        const showCaret =
          !done && active && !reduceMotion && count >= start && count < start + seg.text.length

        return (
          <span key={index} className={seg.className} aria-hidden>
            {visible.split('\n').map((line, lineIndex, lines) => (
              <Fragment key={lineIndex}>
                {line}
                {lineIndex < lines.length - 1 ? <br /> : null}
              </Fragment>
            ))}
            {showCaret ? <span className={caretClassName} /> : null}
          </span>
        )
      })}
    </>
  )
}
