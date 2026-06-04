import { useEffect, useState } from 'react'
import axios from 'axios'

function History() {

  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const userId =
          localStorage.getItem('userId')

        const res = await axios.get(
          `http://localhost:5000/api/history/${userId}`
        )

        setHistory(res.data)

      } catch (err) {

        console.log(err)

      } finally {

        setLoading(false)

      }

    }

    fetchHistory()

  }, [])

  return (

    <div className="min-h-screen bg-slate-900 p-8">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-purple-400 mb-8 text-center">
          Resume Analysis History
        </h1>

        {loading ? (

          <div className="text-center text-white">
            Loading...
          </div>

        ) : history.length === 0 ? (

          <div className="text-center text-gray-400">
            No Resume History Found
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden">

              <thead>

                <tr className="bg-purple-600 text-white">

                  <th className="p-4 text-left">
                    ATS Score
                  </th>

                  <th className="p-4 text-left">
                    Job Match
                  </th>

                  <th className="p-4 text-left">
                    Uploaded Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {history.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-white/10 text-white"
                  >

                    <td className="p-4">
                      {item.ats_score}
                    </td>

                    <td className="p-4">
                      {item.job_match}%
                    </td>

                    <td className="p-4">
                      {new Date(
                        item.uploaded_at
                      ).toLocaleString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  )

}

export default History