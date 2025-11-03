import './Table.scss'
import BreadCrumbs from '../breadCrumbs/BreadCrumbs';
import { useNavigate, useParams } from 'react-router-dom';

const Table = ({ data, currentView, currentFolderId, setCurrentFolderId, allFolders }) => {
    const {slug: folder_id} = useParams();
    const navigate = useNavigate();
    const filter_data = {
        folders: data.folders
            .filter(f => f.parent_id === folder_id || (folder_id === undefined && f.parent_id === null)),
        documents: data.documents
            .filter(d => d.folder_id === folder_id || (folder_id === undefined && d.folder_id === null)),
    }

    // Fonction utilitaire pour formater la taille des fichiers
    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Fonction utilitaire pour la date
    const formatDate = (isoString) => {
        if (!isoString) return '-';
        return new Date(isoString).toLocaleDateString('fr-FR', {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };
    
    const handleFolderClick = (folderId) => {
        if (currentView === "Mon Drive") {
            navigate(`/${folderId}`)
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
                    {filter_data.folders.map(f => (
                        <tr 
                            key={f.id} 
                            className='folder'
                            onClick={() => handleFolderClick(f.id)}
                        >
                            <td>{'📁'} {f.name}</td>
                            <td>{formatDate(f.created_at)}</td>
                            <td>-</td>
                        </tr>
                    ))}
                    {filter_data.documents.map(d => (
                        <tr 
                            key={d.id} 
                            className='document'
                        >
                            <td>{'📄'} {d.title}</td>
                            <td>{formatDate(d.created_at)}</td>
                            <td>{formatSize(d.size)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;