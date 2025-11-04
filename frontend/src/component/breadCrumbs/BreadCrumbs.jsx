import { useDrive } from "../context/DriveContext.jsx";

const BreadCrumbs = () => {
  const { currentFolderId, allFolders, goToFolder } = useDrive();

  const getPath = () => {
    const path = [];
    let folderId = currentFolderId;
    while (folderId) {
      const folder = allFolders.find((f) => f.id === folderId);
      if (folder) {
        path.unshift(folder);
        folderId = folder.parent_id;
      } else break;
    }
    return path;
  };

  const path = getPath();

  return (
    <div className="breadcrumbs">
      <span className="breadcrumb-item" onClick={() => goToFolder(null)}>
        Mon Drive
      </span>
      {path.map((folder) => (
        <span key={folder.id}>
          <span className="breadcrumb-separator"> {">"} </span>
          <span
            className="breadcrumb-item"
            onClick={() => goToFolder(folder.id)}
          >
            {folder.name}
          </span>
        </span>
      ))}
    </div>
  );
};

export default BreadCrumbs;
