import { useState } from 'react'
import axios from 'axios'

function ResumeUpload() {

  const [file, setFile] = useState(null)
const [message, setMessage] = useState('')
const [resumeText, setResumeText] = useState('')
const [skills, setSkills] = useState([])
const [atsScore, setAtsScore] = useState(0)
const [suggestions, setSuggestions] = useState([])
  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {

    if (!file) {
      return alert('Please select a resume')
    }

    const formData = new FormData()

    formData.append('resume', file)

    try {

      const res = await axios.post(
        'http://localhost:5000/api/resume/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      setMessage(res.data.message)
      setResumeText(res.data.text)
      setSkills(res.data.skills)
      setAtsScore(res.data.atsScore)
      setSuggestions(res.data.suggestions)
    } catch (err) {

      console.log(err)

      setMessage(
  err.response?.data?.message ||
  err.message ||
  'Upload Failed'
)

    }

  }

  return (

    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">

      <div className="w-full max-w-2xl p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-purple-400 mb-8">
          Upload Your Resume
        </h1>

        <div className="border-2 border-dashed border-purple-400 rounded-2xl p-12 text-center">

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="text-white"
          />

          <p className="text-gray-300 mt-4">
            Upload your PDF resume for AI analysis
          </p>

        </div>
        {
  resumeText && (

    <div className="mt-8 bg-black/20 p-4 rounded-xl">

      <h2 className="text-xl font-bold mb-3">
        Extracted Resume Text
      </h2>

      <pre className="whitespace-pre-wrap text-sm">
        {resumeText}
      </pre>

    </div>

  )
}
{
  skills.length > 0 && (

    <div className="mt-8">

      <h2 className="text-2xl font-bold text-purple-400 mb-4">
        Detected Skills
      </h2>

      <div className="flex flex-wrap gap-3">

        {
          skills.map((skill, index) => (

            <span
              key={index}
              className="px-4 py-2 bg-purple-500 rounded-full"
            >
              {skill}
            </span>

          ))
        }

      </div>

    </div>

  )
}
{
  atsScore > 0 && (

    <div className="mt-8 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">

      <h2 className="text-2xl font-bold text-purple-400 mb-3">
        ATS Score
      </h2>

      <div className="text-6xl font-bold text-green-400">
        {atsScore}/100
      </div>

    </div>

  )
}
{
  suggestions.length > 0 && (

    <div className="mt-8 bg-white/10 p-6 rounded-2xl">

      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        Resume Suggestions
      </h2>

      <ul className="space-y-2">

        {suggestions.map((item, index) => (

          <li key={index}>
            ⚠ {item}
          </li>

        ))}

      </ul>

    </div>

  )
}

        <button
          onClick={handleUpload}
          className="w-full mt-8 bg-purple-500 hover:bg-purple-600 transition p-4 rounded-xl text-lg font-semibold"
        >
          Analyze Resume
        </button>

        {message && (
          <p className="text-center mt-6 text-green-400">
            {message}
          </p>
        )}

      </div>

    </div>

  )

}

export default ResumeUpload