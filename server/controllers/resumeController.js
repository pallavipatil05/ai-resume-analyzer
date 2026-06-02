const fs = require('fs')
const pdfParse = require('pdf-parse')
const roles = require('../services/jobRoles')
const db = require('../config/db')

const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No resume uploaded'
      })
    }

    const dataBuffer = fs.readFileSync(req.file.path)
    const pdfData = await pdfParse(dataBuffer)

    const resumeText = pdfData.text
    const selectedRole = req.body.role

    const skillsDatabase = [
      'java',
      'javascript',
      'react',
      'node',
      'express',
      'html',
      'css',
      'mysql',
      'mariadb',
      'mongodb',
      'git',
      'github',
      'python',
      'php',
      'c',
      'c++'
    ]

    const foundSkills = skillsDatabase.filter(skill =>
      resumeText.toLowerCase().includes(skill.toLowerCase())
    )

    // =========================
    // JOB MATCH ANALYSIS
    // =========================

    let jobMatch = null
    let missingSkills = []

    if (selectedRole && roles[selectedRole]) {
      const roleSkills = roles[selectedRole]

      const matchedSkills = roleSkills.filter(skill =>
        foundSkills.includes(skill)
      )

      jobMatch = Math.round(
        (matchedSkills.length / roleSkills.length) * 100
      )

      missingSkills = roleSkills.filter(
        skill => !foundSkills.includes(skill)
      )
    }

    // =========================
    // ATS SCORE
    // =========================

    let atsScore = 0

    atsScore += Math.min(foundSkills.length * 3, 30)

    if (
      resumeText.toLowerCase().includes('bachelor') ||
      resumeText.toLowerCase().includes('b.e') ||
      resumeText.toLowerCase().includes('btech')
    ) {
      atsScore += 15
    }

    const projectCount =
      (resumeText.match(/project/gi) || []).length

    atsScore += Math.min(projectCount * 5, 15)

    if (
      resumeText.includes('@') &&
      /\d{10}/.test(resumeText)
    ) {
      atsScore += 10
    }

    if (
      resumeText.toLowerCase().includes('internship') ||
      resumeText.toLowerCase().includes('experience')
    ) {
      atsScore += 15
    }

    if (
      resumeText.toLowerCase().includes('certificate') ||
      resumeText.toLowerCase().includes('certification')
    ) {
      atsScore += 15
    }

    if (atsScore > 100) {
      atsScore = 100
    }

    // =========================
    // SUGGESTIONS
    // =========================

    const suggestions = []

    if (
      !resumeText.toLowerCase().includes('internship') &&
      !resumeText.toLowerCase().includes('experience')
    ) {
      suggestions.push('Add internship experience')
    }

    if (
      !resumeText.toLowerCase().includes('certificate') &&
      !resumeText.toLowerCase().includes('certification')
    ) {
      suggestions.push('Add certifications')
    }

    if (foundSkills.length < 10) {
      suggestions.push('Add more technical skills')
    }

    // =========================
    // STRENGTHS & WEAKNESSES
    // =========================

    const strengths = []
    const weaknesses = []

    if (foundSkills.length >= 8) {
      strengths.push('Strong technical skill set')
    }

    if (projectCount >= 2) {
      strengths.push('Good project experience')
    }

    if (
      resumeText.includes('@') &&
      /\d{10}/.test(resumeText)
    ) {
      strengths.push('Complete contact information')
    }

    if (
      !resumeText.toLowerCase().includes('internship') &&
      !resumeText.toLowerCase().includes('experience')
    ) {
      weaknesses.push('No internship or work experience')
    }

    if (
      !resumeText.toLowerCase().includes('certificate') &&
      !resumeText.toLowerCase().includes('certification')
    ) {
      weaknesses.push('No certifications found')
    }

    if (foundSkills.length < 6) {
      weaknesses.push('Limited technical skills')
    }

    const userId = req.body.userId

let conn

try {

  conn = await db.getConnection()

  await conn.query(
    `
    INSERT INTO resume_history
    (user_id, ats_score, job_match)
    VALUES (?, ?, ?)
    `,
    [
      userId,
      atsScore,
      jobMatch || 0
    ]
  )

} finally {

  if (conn) conn.release()

}

    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({
      message: 'Resume Parsed Successfully',
      text: resumeText,
      skills: foundSkills,
      atsScore,
      suggestions,
      jobMatch,
      missingSkills,
      strengths,
      weaknesses,
      stats: {
        skillsCount: foundSkills.length,
        projectsCount: projectCount
      }
    })

  } catch (err) {
    console.error('PDF ERROR:', err)

    res.status(500).json({
      message: err.message
    })
  }
}

module.exports = {
  analyzeResume
}