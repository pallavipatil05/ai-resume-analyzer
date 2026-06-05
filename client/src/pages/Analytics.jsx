import { useEffect, useState } from 'react'
import axios from 'axios'

function Analytics() {

  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const userId =
          localStorage.getItem('userId')

        const res = await axios.get(
          `http://localhost:5000/api/analytics/${userId}`
        )

        setAnalytics(res.data)

      } catch (err) {

        console.log(err)

      }

    }

    fetchAnalytics()

  }, [])

  if (!analytics) {

    return (

      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        Loading Analytics...
      </div>

    )

  }

  return (

    <div className="min-h-screen bg-slate-900 text-white p-8">

      <h1 className="text-4xl font-bold text-center text-purple-400 mb-10">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-center">

          <h2 className="text-xl text-gray-300">
            Total Resumes
          </h2>

          <p className="text-5xl font-bold text-purple-400 mt-3">
            {analytics.totalResumes}
          </p>

        </div>

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-center">

          <h2 className="text-xl text-gray-300">
            Average ATS Score
          </h2>

          <p className="text-5xl font-bold text-green-400 mt-3">
            {analytics.averageATS}
          </p>

        </div>

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-center">

          <h2 className="text-xl text-gray-300">
            Highest ATS Score
          </h2>

          <p className="text-5xl font-bold text-yellow-400 mt-3">
            {analytics.highestATS}
          </p>

        </div>

      </div>

      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl">

        <h2 className="text-2xl font-bold text-purple-400 mb-6">
          Resume Analysis Records
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/20">

                <th className="p-3 text-left">
                  ATS Score
                </th>

                <th className="p-3 text-left">
                  Job Match
                </th>

                <th className="p-3 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {analytics.history.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-white/10"
                >

                  <td className="p-3">
                    {item.ats_score}
                  </td>

                  <td className="p-3">
                    {item.job_match}%
                  </td>

                  <td className="p-3">
                    {new Date(
                      item.uploaded_at
                    ).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}

export default Analytics