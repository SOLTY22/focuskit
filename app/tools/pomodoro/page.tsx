'use client'

import { useEffect, useState } from 'react'

const DEFAULT_TIME = 25 * 60

// 🔊 Beep sound بدون ملفات
const playBeep = () => {
  const audioCtx = new AudioContext()
  const oscillator = audioCtx.createOscillator()
  const gainNode = audioCtx.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.value = 800
  gainNode.gain.value = 0.1

  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)

  oscillator.start()
  oscillator.stop(audioCtx.currentTime + 0.4)
}

export default function PomodoroPage() {
  const [time, setTime] = useState(DEFAULT_TIME)
  const [isRunning, setIsRunning] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem('pomodoro-time')
    const savedRunning = localStorage.getItem('pomodoro-running')

    if (savedTime) setTime(Number(savedTime))
    if (savedRunning) setIsRunning(savedRunning === 'true')
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('pomodoro-time', time.toString())
    localStorage.setItem('pomodoro-running', isRunning.toString())
  }, [time, isRunning])

  // Timer logic
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setIsRunning(false)
          playBeep() // 🔊 تنبيه
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  const setSession = (minutes: number) => {
    setIsRunning(false)
    setTime(minutes * 60)
  }

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-900 text-white p-8 rounded-2xl w-full max-w-md flex flex-col items-center gap-6">

        <h1 className="text-3xl font-bold">Pomodoro</h1>

        {/* اختيار المدة */}
        <div className="flex gap-2">
          {[15, 25, 50].map((m) => (
            <button
              key={m}
              onClick={() => setSession(m)}
              className={`px-4 py-2 rounded-lg text-sm transition
                ${time === m * 60
                  ? 'bg-white text-black'
                  : 'bg-zinc-800 hover:bg-zinc-700'}
              `}
            >
              {m} min
            </button>
          ))}
        </div>

        {/* التايمر + Animation */}
        <div
          className={`text-6xl font-mono transition-all duration-300
            ${isRunning
              ? 'text-green-400 scale-110 animate-pulse'
              : 'text-white'}
          `}
        >
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>

        {/* الأزرار */}
        <div className="flex gap-4 w-full">
          {!isRunning ? (
            <button
              onClick={() => setIsRunning(true)}
              className="flex-1 py-3 bg-white text-black rounded-xl hover:bg-zinc-200 transition"
            >
              Start
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="flex-1 py-3 bg-zinc-700 rounded-xl hover:bg-zinc-600 transition"
            >
              Pause
            </button>
          )}

          <button
            onClick={() => {
              setIsRunning(false)
              setTime(DEFAULT_TIME)
            }}
            className="flex-1 py-3 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition"
          >
            Reset
          </button>
        </div>

      </div>
    </main>
  )
}
