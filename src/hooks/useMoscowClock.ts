import { useEffect, useState } from 'react'

function formatMoscowTime(date = new Date()) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Moscow',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

export function useMoscowClock() {
  const [time, setTime] = useState(formatMoscowTime)

  useEffect(() => {
    const tick = () => setTime(formatMoscowTime())
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])

  return time
}
