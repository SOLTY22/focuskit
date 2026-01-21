export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 bg-zinc-900 text-white flex gap-6">
      <a href="/" className="font-bold">
        FocusKit
      </a>

      <a
        href="/tools/pomodoro"
        className="text-zinc-400 hover:text-white"
      >
        Pomodoro
      </a>

      <a
        href="/tools/tasks"
        className="text-zinc-400 hover:text-white"
      >
        Tasks
      </a>
    </nav>
  )
}
