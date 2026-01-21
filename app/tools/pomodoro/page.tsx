'use client'

import { useEffect, useState } from 'react'

export const metadata = {
  title: 'Pomodoro Timer - FocusKit',
  description:
    'Use the Pomodoro timer to stay focused and improve productivity with timed work sessions.',
}

const DEFAULT_TIME = 25 * 60

export default function PomodoroPage() {
  const [time, setTime] = useState(DEFAULT_TIME)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [running])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-black text-white">
      <h1 className="text-4xl font-bold">Pomodoro</h1>

      <div className="text-6xl font-mono">
        {Math.floor(time / 60)
          .toString()
          .padStart(2, '0')}
        :
        {(time % 60).toString().padStart(2, '0')}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setRunning(!running)}
          className="px-6 py-3 bg-white text-black rounded-xl"
        >
          {running ? 'Pause' : 'Start'}
        </button>

        <button
          onClick={() => {
            setTime(DEFAULT_TIME)
            setRunning(false)
          }}
          className="px-6 py-3 border border-zinc-700 rounded-xl"
        >
          Reset
        </button>
      </div>
    </main>
  )
}
