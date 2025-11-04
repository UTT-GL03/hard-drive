import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './component/homepage/Homepage'
import { DriveProvider } from './component/context/DriveContext.jsx';

function App() {
  return (
    <Router>
      <DriveProvider>
        <Routes>
          <Route path="/:slug?" element={<Homepage />} />
        </Routes>
      </DriveProvider>
    </Router>
  )
}

export default App
