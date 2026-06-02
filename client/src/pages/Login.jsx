import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      )

      localStorage.setItem(
  'token',
  res.data.token
)

localStorage.setItem(
  'userId',
  res.data.user.id
)

localStorage.setItem(
  'userName',
  res.data.user.name
)

alert(res.data.message)

navigate('/dashboard')

    } catch (err) {

      console.log(err)

      alert(
        err.response?.data?.message ||
        'Login Failed'
      )

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <form
        onSubmit={handleSubmit}
        className="w-[400px] p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20"
      >

        <h1 className="text-4xl font-bold text-center text-purple-400">
          Login
        </h1>

        <div className="mt-8 flex flex-col gap-5">

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="p-4 rounded-xl bg-white/10 border border-white/20 outline-none text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="p-4 rounded-xl bg-white/10 border border-white/20 outline-none text-white"
          />

          <button
            type="submit"
            className="bg-purple-500 p-4 rounded-xl text-lg hover:scale-105 transition"
          >
            Login
          </button>

        </div>

      </form>

    </div>

  )
}

export default Login