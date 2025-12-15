import { useState } from "react";
import "./FileUpload.scss";
import { useParams } from "react-router-dom";
import useFiles from "../../hooks/useFiles";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [retention, setRetention] = useState("1y");
  const {slug} = useParams();
  const {addFile, page} = useFiles(slug);

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
        addFile({ file, folder: slug, retention, page });
        setMessage(`✅ Fichier uploadé`);
        setFile(null);
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

      <div className="retention-container">
        <input type="number" min="1" defaultValue="1" id="retention-value" />
        <select
          onChange={(e) => {
            const value = document.getElementById("retention-value").value;
            const unit = e.target.value;
            setRetention(`${value}${unit}`);
          }}
        >
          <option value="m">Minute(s)</option>
          <option value="h">Heure(s)</option>
          <option value="d">Jour(s)</option>
          <option value="y" selected>Année(s)</option>
        </select>
      </div>

      

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
