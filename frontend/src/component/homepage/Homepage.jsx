import { useState, useRef } from 'react'
import Headings from '../heading/Headings'
import SideBar from '../sidebar/Sidebar'
import Table from '../table/Table'
import './Homepage.scss'
// import fileSystemData from '../../../assets/sample_data.json'
import useFiles from '../../hooks/useFiles'
import { Loader } from 'lucide-react'

export default function Homepage() {
  const [sidebarWidth, setSidebarWidth] = useState(300)
  const wrapperRef = useRef(null)
  const isResizing = useRef(false)
  const [currentView, setCurrentView] = useState("Mon Drive");
  // État pour l'ID du dossier actuellement ouvert dans "Mon Drive". Null pour la racine.
  const [currentFolderId, setCurrentFolderId] = useState(null);

  const { files } = useFiles();

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

  const handleViewChange = (newView) => {
    setCurrentView(newView);
    // Réinitialiser l'ID du dossier quand on change de vue
    setCurrentFolderId(null); 
  };

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
        <SideBar activeItem={currentView} setActiveItem={handleViewChange} />
        <div className="resizer" onMouseDown={startResize} />
      </div>
      <div className="main-content">
        {files
          ?  <Table 
              data={files} 
              currentView={currentView}
              currentFolderId={currentFolderId}
              setCurrentFolderId={setCurrentFolderId}
              allFolders={files ? files.folders : []}
            />
          : <div className="loader-container">
              <Loader />
            </div>
        }
      </div>
    </div>
  )
}

