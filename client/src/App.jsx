import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'

import Login from './pages/Login'
import Register from './pages/Register'

function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">

      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full top-0 left-0"></div>

      <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full bottom-0 right-0"></div>

      <Navbar />

      <Hero />

    </div>
  )
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App