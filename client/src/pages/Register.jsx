import { useState } from 'react'
import axios from 'axios'

function Register() {

  const [formData, setFormData] = useState({
    name: '',
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
        'http://localhost:5000/api/auth/register',
        formData
      )

      alert(res.data.message)

    } catch (err) {

      console.log(err)

      alert(
        err.response?.data?.message ||
        err.message ||
        'Registration Failed'
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
          Register
        </h1>

        <div className="mt-8 flex flex-col gap-5">

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            className="p-4 rounded-xl bg-white/10 border border-white/20 outline-none text-white"
          />

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
            Register
          </button>

        </div>

      </form>

    </div>

  )
}

export default Register