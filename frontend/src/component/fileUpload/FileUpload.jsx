import { useState } from "react";
import "./FileUpload.scss";
import { useParams } from "react-router-dom";
import useFiles from "../../hooks/useFiles";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const {slug} = useParams();
  const {addFile} = useFiles()

  // Quand l’utilisateur sélectionne un fichier
  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  // Envoi du fichier au backend
  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Aucun fichier sélectionné.");
      return;
    }

    setIsUploading(true);
    setMessage("");

    try {
        addFile({ file, folder: slug })
        setMessage(`✅ Fichier uploadé`);
    } catch (error) {
        console.error(error);
        setMessage("❌ Erreur pendant l’upload.");
    } finally {
        setIsUploading(false);
    }
  };

  return (
    <div className="file-upload">
      <h2>Upload d’un fichier</h2>

      <input type="file" onChange={handleChange} />

      {file && <p>📄 {file.name}</p>}

      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Envoi..." : "Uploader"}
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default FileUpload;
