import { useEffect, useState } from "react";

const useFiles = () => {
  const [files, setFiles] = useState(null);

  const fetchFiles = async () => {
    try {
        const response = await fetch("http://localhost:3000/export"); 
        const data = await response.json();
        setFiles(data);
      } catch (err) {
        console.error("Erreur lors du chargement du JSON :", err);
      }
  }

  const uploadFile = async (file, folder) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder_id", folder ? folder : null); 


    const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Erreur lors de l’envoi du fichier");
    }

    const data = await response.json();
    return data
  }

  useEffect(() => {
    fetchFiles();
  }, []); 

  return {files, uploadFile};
};

export default useFiles;
