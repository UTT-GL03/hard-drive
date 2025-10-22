

const BreadCrumbs = ({ currentFolderId, setCurrentFolderId, allFolders }) => {
    const getPath = () => {
        const path = [];
        let folderId = currentFolderId;

        while (folderId) {
            const folder = allFolders.find(f => f.id === folderId);
            if (folder) {
                path.unshift(folder);
                folderId = folder.parent_id;
            } else {
                break;
            }
        }

        return path;
    };

    const path = getPath();

    return (
        <div className="breadcrumbs">
            <span className="breadcrumb-item" onClick={() => setCurrentFolderId(null)}>
                Mon Drive
            </span>
            {path.map((folder) => (
                <span key={folder.id}>
                    <span className="breadcrumb-separator"> / </span>
                    <span
                        className="breadcrumb-item"
                        onClick={() => setCurrentFolderId(folder.id)}
                    >
                        {folder.name}
                    </span>
                </span>
            ))}
        </div>
    );
}

export default BreadCrumbs;