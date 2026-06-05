const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/authRoutes')
const resumeRoutes = require('./routes/resumeRoutes')
const historyRoutes = require('./routes/historyRoutes')
const app = express()
const analyticsRoutes = require('./routes/analyticsRoutes')

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/history', historyRoutes)
app.use( '/api/analytics',analyticsRoutes)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})