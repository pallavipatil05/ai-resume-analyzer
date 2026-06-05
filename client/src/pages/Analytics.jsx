import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

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
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        Loading Analytics...
      </div>
    )

  }

  return (

    <div className="min-h-screen bg-slate-900 text-white p-8">

      <h1 className="text-4xl font-bold text-center text-purple-400 mb-10">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-white/10 p-6 rounded-2xl text-center">
          <h2 className="text-xl text-gray-300">
            Total Resumes
          </h2>

          <p className="text-5xl font-bold text-purple-400 mt-3">
            {analytics.totalResumes}
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl text-center">
          <h2 className="text-xl text-gray-300">
            Average ATS
          </h2>

          <p className="text-5xl font-bold text-green-400 mt-3">
            {analytics.averageATS}
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl text-center">
          <h2 className="text-xl text-gray-300">
            Highest ATS
          </h2>

          <p className="text-5xl font-bold text-yellow-400 mt-3">
            {analytics.highestATS}
          </p>
        </div>

      </div>

      <div className="bg-white p-4 rounded-2xl">

        <h2 className="text-2xl font-bold text-black mb-4">
          ATS Trend
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <LineChart
            data={analytics.history}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="id"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="ats_score"
              stroke="#8b5cf6"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  )

}

export default Analytics