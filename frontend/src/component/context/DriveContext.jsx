import { createContext, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PathWay from './Path';
import createPersistedState from 'use-persisted-state';

const DriveContext = createContext();

const usePathState = createPersistedState('path');

// Todo, faire le cas quand on cherche un id directement qui n'est pas dans la liste
export const DriveProvider = ({ children }) => {
  const [path, setPath] = usePathState([]);
  const navigate = useNavigate();
  const {slug} = useParams();

  const verifyPath = () => {
    const pathIdList = path.map(({uid}) => uid);

    if (!slug) return setPath([]);

    if (pathIdList.includes(slug) && pathIdList.indexOf(slug) + 1 != pathIdList.length) {
      return setPath([...path.splice(0, pathIdList.indexOf(slug) + 1)])
    } 
  }


  useEffect(() => {
    verifyPath()
  }, [slug])
  

  const goToFolder = (folderId, folderName) => {
    const p = new PathWay(folderId, folderName);

    if (!folderId) {
      navigate('/')
      return setPath([])
    }

    navigate(`/${folderId}`);

    if (path.map(({uid}) => uid).includes(folderId)) return;
    setPath([...path, p])
  };

  return (
    <DriveContext.Provider value={{ goToFolder, path }}>
      {children}
    </DriveContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDrive = () => useContext(DriveContext);
