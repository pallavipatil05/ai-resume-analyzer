import { useState } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import {
  CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar'

import 'react-circular-progressbar/dist/styles.css'

function ResumeUpload() {

  const [file, setFile] = useState(null)

  const [message, setMessage] = useState('')
  const [resumeText, setResumeText] = useState('')
  const [skills, setSkills] = useState([])
  const [atsScore, setAtsScore] = useState(0)
  const [suggestions, setSuggestions] = useState([])

  const [selectedRole, setSelectedRole] = useState('')
  const [jobMatch, setJobMatch] = useState(null)
  const [missingSkills, setMissingSkills] = useState([])
  const [strengths, setStrengths] = useState([])
  const [weaknesses, setWeaknesses] = useState([])

  // Skill Gap Analyzer
  const [skillGap, setSkillGap] = useState([])
  const [skillMatchPercentage, setSkillMatchPercentage] = useState(0)

  const [stats, setStats] = useState({
    skillsCount: 0,
    projectsCount: 0
  })

  // Learning roadmap data
  const learningResources = {

    html: {
      level: 'Beginner',
      description:
        'Learn HTML structure, semantic elements, forms and accessibility.',
      duration: '1 week'
    },

    css: {
      level: 'Beginner',
      description:
        'Learn layouts, Flexbox, Grid, responsive design and animations.',
      duration: '1–2 weeks'
    },

    javascript: {
      level: 'Beginner',
      description:
        'Learn variables, functions, arrays, objects, DOM and ES6+.',
      duration: '2–3 weeks'
    },

    react: {
      level: 'Intermediate',
      description:
        'Learn components, props, state, hooks and React routing.',
      duration: '2 weeks'
    },

    typescript: {
      level: 'Intermediate',
      description:
        'Learn types, interfaces, generics and TypeScript with React.',
      duration: '1–2 weeks'
    },

    node: {
      level: 'Intermediate',
      description:
        'Learn Node.js, modules, APIs and backend development.',
      duration: '2 weeks'
    },

    express: {
      level: 'Intermediate',
      description:
        'Learn Express routing, middleware and REST APIs.',
      duration: '1 week'
    },

    mysql: {
      level: 'Intermediate',
      description:
        'Learn SQL queries, joins, relationships and database design.',
      duration: '1–2 weeks'
    },

    mongodb: {
      level: 'Intermediate',
      description:
        'Learn MongoDB collections, documents, queries and CRUD operations.',
      duration: '1–2 weeks'
    },

    git: {
      level: 'Beginner',
      description:
        'Learn Git, branches, commits, merging and GitHub workflows.',
      duration: '1 week'
    },

    docker: {
      level: 'Intermediate',
      description:
        'Learn containers, images, Dockerfiles and Docker Compose.',
      duration: '1 week'
    },

    aws: {
      level: 'Advanced',
      description:
        'Learn cloud fundamentals, EC2, S3 and basic deployment.',
      duration: '2–3 weeks'
    },

    'rest api': {
      level: 'Intermediate',
      description:
        'Learn REST principles, HTTP methods, status codes and API design.',
      duration: '1 week'
    },

    tailwind: {
      level: 'Beginner',
      description:
        'Learn utility classes, responsive design and component styling.',
      duration: '1 week'
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  // Calculate skill gap based on selected role
  const calculateSkillGap = (role, userSkills) => {

    const roleSkills = {

      frontend: [
        'html',
        'css',
        'javascript',
        'react',
        'typescript',
        'tailwind',
        'git'
      ],

      backend: [
        'java',
        'node',
        'express',
        'mysql',
        'mongodb',
        'rest api',
        'git'
      ],

      fullstack: [
        'html',
        'css',
        'javascript',
        'react',
        'node',
        'express',
        'mysql',
        'mongodb',
        'git',
        'typescript'
      ]
    }

    const requiredSkills = roleSkills[role] || []

    const normalizedUserSkills = userSkills.map(skill =>
      skill.toLowerCase()
    )

    const missing = requiredSkills.filter(skill =>
      !normalizedUserSkills.includes(skill)
    )

    const matched = requiredSkills.filter(skill =>
      normalizedUserSkills.includes(skill)
    )

    const percentage =
      requiredSkills.length > 0
        ? Math.round(
            (matched.length / requiredSkills.length) * 100
          )
        : 0

    setSkillGap(missing)
    setSkillMatchPercentage(percentage)
  }

  const handleUpload = async () => {

    if (!file) {
      return alert('Please select a resume')
    }

    if (!selectedRole) {
      return alert('Please select a target role')
    }

    const formData = new FormData()

    formData.append('resume', file)
    formData.append('role', selectedRole)
    formData.append(
      'userId',
      localStorage.getItem('userId')
    )

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
      setSkills(res.data.skills || [])
      setAtsScore(res.data.atsScore || 0)
      setSuggestions(res.data.suggestions || [])

      setJobMatch(res.data.jobMatch)
      setMissingSkills(res.data.missingSkills || [])
      setStrengths(res.data.strengths || [])
      setWeaknesses(res.data.weaknesses || [])

      // Calculate Skill Gap
      const detectedSkills = res.data.skills || []

      calculateSkillGap(
        selectedRole,
        detectedSkills
      )

      if (res.data.stats) {
        setStats(res.data.stats)
      }

    } catch (err) {

      console.log(err)

      setMessage(
        err.response?.data?.message ||
        err.message ||
        'Upload Failed'
      )
    }
  }

  const downloadReport = () => {

    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.text(
      'AI Resume Analysis Report',
      20,
      20
    )

    doc.setFontSize(14)

    doc.text(
      `ATS Score: ${atsScore}/100`,
      20,
      40
    )

    doc.text(
      `Skills Found: ${skills.join(', ')}`,
      20,
      60
    )

    if (jobMatch !== null) {

      doc.text(
        `Job Match: ${jobMatch}%`,
        20,
        80
      )
    }

    if (missingSkills.length > 0) {

      doc.text(
        `Missing Skills: ${missingSkills.join(', ')}`,
        20,
        100
      )
    }

    if (suggestions.length > 0) {

      doc.text(
        `Suggestions: ${suggestions.join(', ')}`,
        20,
        120
      )
    }

    doc.save('Resume_Report.pdf')
  }

  return (

    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">

      <div className="w-full max-w-3xl p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-purple-400 mb-8">
          Upload Your Resume
        </h1>

        {/* Upload */}
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

        {/* Target Role */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-700 text-white border border-white/20 mt-6"
        >

          <option value="" className="text-black">
            Select Target Role
          </option>

          <option value="frontend" className="text-black">
            Frontend Developer
          </option>

          <option value="backend" className="text-black">
            Backend Developer
          </option>

          <option value="fullstack" className="text-black">
            Full Stack Developer
          </option>

        </select>

        {/* Analyze */}
        <button
          onClick={handleUpload}
          className="w-full mt-8 bg-purple-500 hover:bg-purple-600 transition p-4 rounded-xl text-lg font-semibold"
        >
          Analyze Resume
        </button>

        {/* Download */}
        <button
          onClick={downloadReport}
          className="w-full mt-6 bg-green-500 hover:bg-green-600 p-4 rounded-xl font-semibold"
        >
          Download Analysis Report
        </button>

        {/* Message */}
        {message && (

          <p className="text-center mt-6 text-green-400">
            {message}
          </p>

        )}

        {/* Resume Text */}
        {resumeText && (

          <div className="mt-8 bg-black/20 p-4 rounded-xl">

            <h2 className="text-xl font-bold mb-3 text-white">
              Extracted Resume Text
            </h2>

            <pre className="whitespace-pre-wrap text-sm text-gray-300">
              {resumeText}
            </pre>

          </div>

        )}

        {/* Detected Skills */}
        {skills.length > 0 && (

          <div className="mt-8">

            <h2 className="text-2xl font-bold text-purple-400 mb-4">
              Detected Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {skills.map((skill, index) => (

                <span
                  key={index}
                  className="px-4 py-2 bg-purple-500 rounded-full"
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

        )}

        {/* ATS Score */}
        {atsScore > 0 && (

          <div className="mt-8 bg-white/10 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-purple-400 mb-3">
              ATS Score
            </h2>

            <div className="w-48 h-48 mx-auto">

              <CircularProgressbar
                value={atsScore}
                text={`${atsScore}%`}
                styles={buildStyles({
                  textSize: '16px',
                  pathColor: '#8b5cf6',
                  textColor: '#ffffff',
                  trailColor: '#1e293b'
                })}
              />

            </div>

          </div>

        )}

        {/* Job Match */}
        {jobMatch !== null && (

          <div className="mt-8 bg-white/10 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-blue-400 mb-3">
              Job Match Score
            </h2>

            <div className="text-6xl font-bold text-green-400">
              {jobMatch}%
            </div>

          </div>

        )}

        {/* Missing Skills */}
        {missingSkills.length > 0 && (

          <div className="mt-8 bg-white/10 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Missing Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {missingSkills.map((skill, index) => (

                <span
                  key={index}
                  className="px-4 py-2 bg-red-500 rounded-full"
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

        )}

        {/* Skill Gap Analysis */}
        {selectedRole && skills.length > 0 && (

          <div className="mt-8 bg-white/10 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              🎯 Skill Gap Analysis
            </h2>

            <p className="text-gray-300 mb-4">

              Target Role:

              <span className="text-white font-semibold ml-2">

                {selectedRole === 'frontend'
                  ? 'Frontend Developer'
                  : selectedRole === 'backend'
                  ? 'Backend Developer'
                  : 'Full Stack Developer'}

              </span>

            </p>

            <p className="text-gray-300 mb-2">
              Skill Match
            </p>

            <div className="w-full bg-slate-700 rounded-full h-5">

              <div
                className="bg-green-500 h-5 rounded-full transition-all duration-500"
                style={{
                  width: `${skillMatchPercentage}%`
                }}
              />

            </div>

            <p className="text-center text-green-400 font-bold mt-2">
              {skillMatchPercentage}%
            </p>

            <h3 className="text-xl font-semibold text-red-400 mt-6 mb-3">
              Skills to Learn
            </h3>

            {skillGap.length > 0 ? (

              <div className="flex flex-wrap gap-3">

                {skillGap.map((skill, index) => (

                  <span
                    key={index}
                    className="px-4 py-2 bg-red-500 rounded-full"
                  >
                    ❌ {skill}
                  </span>

                ))}

              </div>

            ) : (

              <p className="text-green-400 font-semibold">
                🎉 You have all the required skills for this role!
              </p>

            )}

          </div>

        )}

        {/* Personalized Learning Roadmap */}
        {skillGap.length > 0 && (

          <div className="mt-8 bg-white/10 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-purple-400 mb-6">
              📚 Personalized Learning Roadmap
            </h2>

            <p className="text-gray-300 mb-6">
              Learn these skills to improve your suitability for the selected role.
            </p>

            <div className="space-y-5">

              {skillGap.map((skill, index) => {

                const resource =
                  learningResources[skill.toLowerCase()] || {
                    level: 'Intermediate',
                    description:
                      `Learn the fundamentals and practical applications of ${skill}.`,
                    duration: '1–2 weeks'
                  }

                return (

                  <div
                    key={index}
                    className="bg-slate-800 p-5 rounded-2xl border border-white/10"
                  >

                    <div className="flex justify-between items-center">

                      <h3 className="text-xl font-bold text-white">
                        {index + 1}️⃣ {skill}
                      </h3>

                      <span className="text-sm bg-blue-500 px-3 py-1 rounded-full">
                        {resource.level}
                      </span>

                    </div>

                    <p className="text-gray-300 mt-3">
                      {resource.description}
                    </p>

                    <p className="text-green-400 mt-3 font-semibold">
                      ⏱ Estimated time: {resource.duration}
                    </p>

                  </div>

                )
              })}

            </div>

          </div>

        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (

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

        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-8">

          <div className="bg-white/10 p-6 rounded-2xl">

            <h3 className="text-lg text-gray-300">
              Skills Found
            </h3>

            <p className="text-4xl font-bold text-purple-400">
              {stats.skillsCount}
            </p>

          </div>

          <div className="bg-white/10 p-6 rounded-2xl">

            <h3 className="text-lg text-gray-300">
              Projects Found
            </h3>

            <p className="text-4xl font-bold text-green-400">
              {stats.projectsCount}
            </p>

          </div>

        </div>

        {/* Strengths */}
        {strengths.length > 0 && (

          <div className="mt-8 bg-white/10 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Resume Strengths
            </h2>

            {strengths.map((item, index) => (

              <p key={index}>
                ✅ {item}
              </p>

            ))}

          </div>

        )}

        {/* Weaknesses */}
        {weaknesses.length > 0 && (

          <div className="mt-8 bg-white/10 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Areas to Improve
            </h2>

            {weaknesses.map((item, index) => (

              <p key={index}>
                ⚠️ {item}
              </p>

            ))}

          </div>

        )}

      </div>

    </div>

  )
}

export default ResumeUpload