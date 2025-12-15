import './Table.scss';
import BreadCrumbs from '../breadCrumbs/BreadCrumbs';
import { useDrive } from '../context/DriveContext.jsx';
import { useParams } from 'react-router-dom';
import { Download, Folder, Trash } from 'lucide-react';
import useFiles from '../../hooks/useFiles.js';

const Table = () => {
  const { goToFolder } = useDrive();
  const { slug } = useParams();
  const { files, page, setPage, totalPages, isLoading, removeFile } = useFiles(slug);

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (isoString) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleDateString('fr-FR', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const downloadFile = (fileId) => {
    const file = files.documents.find(d => d._id === fileId);
    const link = document.createElement("a");
    link.href = `http://localhost:3000/export/${fileId}`;
    link.download = `${file.title}.${file.type}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const deleteFile =  (fileId) => {
    if (!window.confirm('Supprimer ce fichier ?')) return;
    removeFile(fileId);
  }

  if (isLoading) return <p>Chargement...</p>;

  return (
    <div className="table-container">
      <BreadCrumbs />

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
          {files?.folders.map(f => (
            <tr key={f._id} className='folder' onClick={() => goToFolder(f._id, f.name)}>
              <td><div className="icon-container"><Folder /> {f.name}</div></td>
              <td>{formatDate(f.created_at)}</td>
              <td>-</td>
              <td></td>
            </tr>
          ))}
          {files?.documents.map(d => (
            <tr key={d._id} className='document'>
              <td>{d.title}</td>
              <td>{formatDate(d.created_at)}</td>
              <td>{formatSize(d.size)}</td>
              <td className="actions">
                <a className='btn' onClick={() => downloadFile(d._id)}><Download /></a>
                <a className='btn delete' onClick={() => deleteFile(d._id)}><Trash /></a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        <div className="pagination">
            <button disabled={page <= 1} onClick={() => setPage(p => Math.max(p - 1, 1))}>
                Précédent
            </button>

            {[...Array(totalPages)].map((_, i) => (
                <button
                key={i}
                className={page === i + 1 ? "active" : ""}
                onClick={() => setPage(i + 1)}
                >
                {i + 1}
                </button>
            ))}

            <button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(p + 1, totalPages))}>
                Suivant
            </button>
        </div>
    </div>
  );
};

export default Table;
