import './Table.scss'
import BreadCrumbs from '../breadCrumbs/BreadCrumbs';
import { useDrive } from '../context/DriveContext.jsx';
import { useParams } from 'react-router-dom';
import { Download, Folder } from 'lucide-react';

const Table = ({ data }) => {
    const { goToFolder } = useDrive();
    const {slug} = useParams();

    const filter_data = {
        folders: data.folders
            .filter(f => f.parent_id === slug || (slug === undefined && f.parent_id === null)),
        documents: data.documents
            .filter(d => d.folder_id === slug || (slug === undefined && d.folder_id === null)),
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

    //temporaire pour le download
    const downloadFile = (fileId) => {
        const file = data.documents.find(d => d.id === fileId);
        const link = document.createElement("a");
        link.href = `http://localhost:3000/export/${fileId}`;
        link.download = `${file.title}.${file.type}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filter_data.folders.map(f => (
                        <tr 
                            key={f.id} 
                            className='folder'
                            onClick={() => goToFolder(f.id, f.name)}
                        >
                            <td><div className="icon-container"><Folder /> {f.name}</div></td>
                            <td>{formatDate(f.created_at)}</td>
                            <td>-</td>
                            <td></td>
                        </tr>
                    ))}
                    {filter_data.documents.map(d => (
                        <tr 
                            key={d.id} 
                            className='document'
                        >
                            <td>{d.title}</td>
                            <td>{formatDate(d.created_at)}</td>
                            <td>{formatSize(d.size)}</td>
                            <td ><a className='btn' onClick={() => downloadFile(d.id)} download><Download /></a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;