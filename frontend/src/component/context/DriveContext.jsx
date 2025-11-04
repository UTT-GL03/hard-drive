import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DriveContext = createContext();

export const DriveProvider = ({ children }) => {
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [allFolders, setAllFolders] = useState([]);
  const navigate = useNavigate();

  const goToFolder = (folderId) => {
    setCurrentFolderId(folderId);
    navigate(folderId ? `/${folderId}` : '/');
  };

  return (
    <DriveContext.Provider value={{ currentFolderId, setCurrentFolderId, allFolders, setAllFolders, goToFolder }}>
      {children}
    </DriveContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDrive = () => useContext(DriveContext);
