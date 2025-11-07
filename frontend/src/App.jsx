import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './component/homepage/Homepage'
import { DriveProvider } from './component/context/DriveContext.jsx';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/:slug?" element={<DriveProvider><Homepage/></DriveProvider>} />
        </Routes>
    </Router>
  )
}

export default App
