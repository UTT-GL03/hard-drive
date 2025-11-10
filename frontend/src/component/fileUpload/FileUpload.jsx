import { useState } from "react";
import "./FileUpload.scss";
import { useParams } from "react-router-dom";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const {slug} = useParams();

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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder_id", slug ? slug : null); 

    try {
      const response = await fetch("http://backend:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l’envoi du fichier");
      }

      const data = await response.json();
      setMessage(`✅ Fichier uploadé : ${data.file.title}.${data.file.type}`);
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
