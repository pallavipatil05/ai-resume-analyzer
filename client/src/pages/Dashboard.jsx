import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {

  const navigate = useNavigate()

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-5xl font-bold text-purple-400">
        AI Resume Analyzer Dashboard
      </h1>

      <p className="mt-5 text-xl text-gray-300">
        Welcome to your dashboard 🚀
      </p>

      <div className="flex gap-4 mt-10">

        <Link
          to="/upload"
          className="bg-purple-500 px-8 py-4 rounded-xl text-lg hover:bg-purple-600 transition"
        >
          Upload Resume
        </Link>

        <button
          onClick={() => navigate('/history')}
          className="bg-blue-500 px-8 py-4 rounded-xl text-lg hover:bg-blue-600 transition"
        >
          View History
        </button>
        <button
  onClick={() => navigate('/analytics')}
  className="bg-green-500 px-8 py-4 rounded-xl text-lg hover:bg-green-600 transition"
>
  Analytics
</button>

      </div>

    </div>

  )

}

export default Dashboard