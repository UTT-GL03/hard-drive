import './Table.scss'
import BreadCrumbs from '../breadCrumbs/BreadCrumbs';
import { useDrive } from '../context/DriveContext.jsx';
import { useEffect } from 'react';

const Table = ({ data }) => {
    const { currentFolderId, allFolders, setAllFolders, goToFolder } = useDrive();
    
    useEffect(() => {
        if (allFolders.length === 0 && data?.folders) {
            setAllFolders(data.folders);
        }
    }, [allFolders, data, setAllFolders]);

    const filter_data = {
        folders: data.folders
            .filter(f => f.parent_id === currentFolderId || (currentFolderId === undefined && f.parent_id === null)),
        documents: data.documents
            .filter(d => d.folder_id === currentFolderId || (currentFolderId === undefined && d.folder_id === null)),
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

    return (
        <div className="table-container">
            <BreadCrumbs/>
                  
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
                            onClick={() => goToFolder(f.id)}
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