import { Link } from 'react-router-dom'

function Dashboard() {

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-5xl font-bold text-purple-400">
        AI Resume Analyzer Dashboard
      </h1>

      <p className="mt-5 text-xl text-gray-300">
        Welcome to your dashboard 🚀
      </p>

      <Link
        to="/upload"
        className="inline-block mt-10 bg-purple-500 px-8 py-4 rounded-xl text-lg hover:bg-purple-600 transition"
      >
        Upload Resume
      </Link>

    </div>

  )

}

export default Dashboard