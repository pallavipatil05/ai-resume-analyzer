import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ResumeUpload from './pages/ResumeUpload'
import History from './pages/History'
import Analytics from './pages/Analytics'

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
  path="/upload"
  element={<ResumeUpload />}
/>
        <Route
  path="/history"
  element={<History />}
/>
<Route
  path="/analytics"
  element={<Analytics />}
/>

      </Routes>

    </BrowserRouter>

  )

}

export default App