import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Registration from './pages/Registration'
import AppPage from './pages/AppPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </Router>
  )
}

export default App
