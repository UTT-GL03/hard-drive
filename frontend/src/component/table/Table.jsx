import './Table.scss'
import BreadCrumbs from '../breadCrumbs/BreadCrumbs';

const Table = ({ data, currentView, currentFolderId, setCurrentFolderId, allFolders }) => {

    // Fonction utilitaire pour formater la taille des fichiers
    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const allItems = [
        ...data.folders.map(f => ({ 
            ...f, 
            type: 'folder', 
            name: f.name, 
            date: f.created_at, 
            size: '-' 
        })),
        ...data.documents.map(d => ({ 
            ...d, 
            type: 'document', 
            name: d.title, 
            date: d.created_at, 
            size: formatSize(d.size)
        }))
    ].sort((a, b) => {
        if (a.type !== b.type) {
            return a.type === 'folder' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
    });

    // Fonction utilitaire pour la date
    const formatDate = (isoString) => {
        if (!isoString) return '-';
        return new Date(isoString).toLocaleDateString('fr-FR', {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };
    
    const handleFolderClick = (folderId) => {
        if (currentView === "Mon Drive") {
            setCurrentFolderId(folderId);
        }
    };

    return (
        <div className="table-container">
            <BreadCrumbs
                currentFolderId={currentFolderId}
                setCurrentFolderId={setCurrentFolderId}
                allFolders={allFolders}
            />
                  
            <table className="file-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Créé le</th>
                        <th>Taille</th>
                    </tr>
                </thead>
                <tbody>
                    {allItems.length === 0 ? (
                        <tr><td colSpan="3">Aucun élément dans cette vue.</td></tr>
                    ) : (
                        allItems.map((item) => (
                            <tr 
                                key={item.id} 
                                className={item.type}
                                onClick={() => item.type === 'folder' ? handleFolderClick(item.id) : null}
                            >
                                <td>{item.type === 'folder' ? '📁' : '📄'} {item.name}</td>
                                <td>{formatDate(item.date)}</td>
                                <td>{item.size}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table;