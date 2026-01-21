'use client'

import { useEffect, useState } from 'react'

type Task = {
  id: number
  text: string
  done: boolean
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')

  // Load
  useEffect(() => {
    const saved = localStorage.getItem('tasks-v3')
    if (saved) setTasks(JSON.parse(saved))
  }, [])

  // Save
  useEffect(() => {
    localStorage.setItem('tasks-v3', JSON.stringify(tasks))
  }, [tasks])

  const completedCount = tasks.filter(t => t.done).length

  const addTask = () => {
    if (!input.trim()) return
    setTasks([
      ...tasks,
      { id: Date.now(), text: input, done: false }
    ])
    setInput('')
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.done))
  }

  return (
    <main className="min-h-screen bg-black text-white flex justify-center pt-24">
      <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-sm text-zinc-400">
              {completedCount} / {tasks.length} completed
            </p>
          </div>

          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="text-xs text-zinc-400 hover:text-white transition"
            >
              Clear done
            </button>
          )}
        </div>

        {/* Add Task */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            className="flex-1 px-3 py-2 bg-zinc-800 rounded outline-none focus:ring-2 focus:ring-zinc-600 transition"
            placeholder="Add a new task..."
          />
          <button
            onClick={addTask}
            className="px-4 bg-white text-black rounded hover:bg-zinc-200 transition active:scale-95"
          >
            Add
          </button>
        </div>

        {/* Tasks */}
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map(task => (
              <li
                key={task.id}
                className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg
                           transition-all duration-200 hover:bg-zinc-700"
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="accent-green-500 w-4 h-4"
                  />
                  <span
                    className={`transition ${
                      task.done
                        ? 'line-through text-zinc-400'
                        : ''
                    }`}
                  >
                    {task.text}
                  </span>
                </label>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-zinc-400 hover:text-red-400 transition active:scale-90"
                  title="Delete"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          // Empty State
          <div className="flex flex-col items-center gap-2 text-zinc-500 py-10 animate-pulse">
            <span className="text-4xl">📝</span>
            <p>No tasks yet</p>
            <p className="text-sm">Add your first task above</p>
          </div>
        )}

      </div>
    </main>
  )
}
