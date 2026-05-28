const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('../config/db')

const registerUser = async (req, res) => {

  const { name, email, password } = req.body

  let conn

  try {

    conn = await db.getConnection()

    const rows = await conn.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if (rows.length > 0) {

      return res.status(400).json({
        message: 'Email Already Exists'
      })

    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await conn.query(
      'INSERT INTO users(name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    res.status(201).json({
      message: 'User Registered Successfully'
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: 'Registration Failed'
    })

  } finally {

    if (conn) conn.release()

  }

}

const loginUser = async (req, res) => {

  const { email, password } = req.body

  let conn

  try {

    conn = await db.getConnection()

    const rows = await conn.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if (rows.length === 0) {

      return res.status(404).json({
        message: 'User Not Found'
      })

    }

    const user = rows[0]

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {

      return res.status(401).json({
        message: 'Invalid Password'
      })

    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    )

    res.status(200).json({
      message: 'Login Successful',
      token
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: 'Login Failed'
    })

  } finally {

    if (conn) conn.release()

  }

}

module.exports = {
  registerUser,
  loginUser
}