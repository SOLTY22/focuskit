'use client'

import { useEffect, useState } from 'react'

export const metadata = {
  title: 'Tasks - FocusKit',
  description:
    'Manage your daily tasks and stay organized with FocusKit task manager.',
}

type Task = {
  id: number
  text: string
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('tasks')
    if (saved) setTasks(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    if (!input.trim()) return
    setTasks([...tasks, { id: Date.now(), text: input }])
    setInput('')
  }

  function removeTask(id: number) {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center gap-6 p-6">
      <h1 className="text-4xl font-bold">Tasks</h1>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-4 py-2 rounded text-black"
          placeholder="New task"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-white text-black rounded"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between bg-zinc-900 px-4 py-2 rounded"
          >
            {task.text}
            <button onClick={() => removeTask(task.id)}>✕</button>
          </li>
        ))}
      </ul>
    </main>
  )
}
