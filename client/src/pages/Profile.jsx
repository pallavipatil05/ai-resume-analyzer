import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Profile() {

  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const userId = localStorage.getItem('userId')

        const res = await axios.get(
          `http://localhost:5000/api/profile/${userId}`
        )

        setProfile(res.data)

      } catch (err) {

        console.log(err)

      }

    }

    fetchProfile()

  }, [])

  if (!profile) {

    return (

      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        Loading Profile...
      </div>

    )

  }

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-10">

        <h1 className="text-4xl font-bold text-purple-400 mb-8">
          User Profile
        </h1>

        <div className="space-y-5 text-xl">

          <p>
            <strong>Name:</strong> {profile.name}
          </p>

          <p>
            <strong>Email:</strong> {profile.email}
          </p>

          <p>
            <strong>Total Resumes:</strong> {profile.totalResumes}
          </p>

          <p>
            <strong>Average ATS:</strong> {profile.averageATS}
          </p>

          <p>
            <strong>Highest ATS:</strong> {profile.highestATS}
          </p>

        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="mt-10 bg-purple-500 px-8 py-4 rounded-xl hover:bg-purple-600"
        >
          Back to Dashboard
        </button>

      </div>

    </div>

  )

}

export default Profile