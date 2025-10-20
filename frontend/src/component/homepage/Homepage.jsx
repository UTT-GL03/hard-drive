import { useState, useRef } from 'react'
import Headings from '../heading/Headings'
import SideBar from '../sidebar/Sidebar'
import Table from '../table/Table'
import './Homepage.scss'

export default function Homepage() {
  const [sidebarWidth, setSidebarWidth] = useState(300)
  const wrapperRef = useRef(null)
  const isResizing = useRef(false)

  const startResize = () => {
    isResizing.current = true
  }

  const stopResize = () => {
    isResizing.current = false
  }

  const handleResize = (e) => {
    if (isResizing.current) {
      const newWidth = e.clientX
      if (newWidth > 100 && newWidth < 500) setSidebarWidth(newWidth)
    }
  }

  return (
    <div 
      className="wrapper-homepage"
      ref={wrapperRef}
      onMouseMove={handleResize}
      onMouseUp={stopResize}
      onMouseLeave={stopResize}
      style={{ gridTemplateColumns: `${sidebarWidth}px 1fr` }}
    >
      <div className="glass-overlay"></div>
      <div className="headings"><Headings /></div>
      <div className="sidebar">
        <SideBar />
        <div className="resizer" onMouseDown={startResize} />
      </div>
      <div className="main-content"><Table /></div>
    </div>
  )
}
