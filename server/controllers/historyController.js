const db = require('../config/db')

const getHistory = async (req, res) => {

  let conn

  try {

    const { userId } = req.params

    conn = await db.getConnection()

    const rows = await conn.query(
      `
      SELECT *
      FROM resume_history
      WHERE user_id = ?
      ORDER BY uploaded_at DESC
      `,
      [userId]
    )

    res.status(200).json(rows)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: 'Failed to fetch history'
    })

  } finally {

    if (conn) conn.release()

  }

}

module.exports = {
  getHistory
}