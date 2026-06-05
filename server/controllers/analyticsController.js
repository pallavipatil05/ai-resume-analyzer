const db = require('../config/db')

const getAnalytics = async (req, res) => {

  let conn

  try {

    const { userId } = req.params

    conn = await db.getConnection()

    const history = await conn.query(
      `
      SELECT *
      FROM resume_history
      WHERE user_id = ?
      ORDER BY uploaded_at ASC
      `,
      [userId]
    )

    const totalResumes = history.length

    const averageATS =
      totalResumes > 0
        ? Math.round(
            history.reduce(
              (sum, item) => sum + item.ats_score,
              0
            ) / totalResumes
          )
        : 0

    const highestATS =
      totalResumes > 0
        ? Math.max(
            ...history.map(item => item.ats_score)
          )
        : 0

    res.json({
      totalResumes,
      averageATS,
      highestATS,
      history
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: 'Failed to load analytics'
    })

  } finally {

    if (conn) conn.release()

  }

}

module.exports = {
  getAnalytics
}