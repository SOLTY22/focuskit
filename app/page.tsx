export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      
      <h1 className="text-5xl font-bold">FocusKit</h1>

      <p className="text-zinc-400 text-center max-w-md">
        Simple productivity tools to help you focus, manage your tasks,
        and stay consistent every day.
      </p>

      <div className="flex gap-4">
        <a
          href="/tools/pomodoro"
          className="px-6 py-3 bg-white text-black rounded-xl hover:bg-zinc-200 transition"
        >
          Start Focusing
        </a>

        <a
          href="/tools/tasks"
          className="px-6 py-3 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition"
        >
          Manage Tasks
        </a>
      </div>

    </main>
  )
}
