import { useEffect, useState } from "react";

const useFiles = () => {
  const [files, setFiles] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:3000/export"); 
        const data = await response.json();
        setFiles(data);
      } catch (err) {
        console.error("Erreur lors du chargement du JSON :", err);
      }
    };

    fetchFiles();
  }, []); 

  return files;
};

export default useFiles;
