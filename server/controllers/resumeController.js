const fs = require('fs')
const pdfParse = require('pdf-parse')

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
let atsScore = 0

// Skills (30 Marks)
atsScore += Math.min(foundSkills.length * 3, 30)

// Education (15 Marks)
if (
  resumeText.toLowerCase().includes('bachelor') ||
  resumeText.toLowerCase().includes('b.e') ||
  resumeText.toLowerCase().includes('btech')
) {
  atsScore += 15
}

// Projects (15 Marks)
const projectCount =
  (resumeText.match(/project/gi) || []).length

atsScore += Math.min(projectCount * 5, 15)

// Contact Info (10 Marks)
if (
  resumeText.includes('@') &&
  /\d{10}/.test(resumeText)
) {
  atsScore += 10
}

// Experience (15 Marks)
if (
  resumeText.toLowerCase().includes('internship') ||
  resumeText.toLowerCase().includes('experience')
) {
  atsScore += 15
}

// Certifications (15 Marks)
if (
  resumeText.toLowerCase().includes('certificate') ||
  resumeText.toLowerCase().includes('certification')
) {
  atsScore += 15
}
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

   res.status(200).json({
  message: 'Resume Parsed Successfully',
  text: resumeText,
  skills: foundSkills,
  atsScore,
  suggestions
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