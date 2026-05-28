import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="w-[90%] mx-auto mt-6 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex justify-between items-center">

      <h1 className="text-3xl font-bold text-cyan-400">
        AI Resume Analyzer
      </h1>

      <div className="flex gap-4">

        <Link to="/login">
          <button className="px-6 py-2 rounded-xl bg-cyan-500 hover:scale-105 transition">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="px-6 py-2 rounded-xl bg-purple-500 hover:scale-105 transition">
            Register
          </button>
        </Link>

      </div>

    </nav>
  )
}

export default Navbar