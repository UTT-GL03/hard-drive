import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchFiles = async (folderId) => {
  let selector;

  if (folderId) {
    // On récupère les fichiers/dossiers dans ce dossier
    selector = {
      "$or": [
        { "type": { "$eq": "folder" }, "parent_id": { "$eq": folderId } },
        { "type": { "$eq": "doc" }, "folder_id": { "$eq": folderId } }
      ]
    };
  } else {
    // Racine : parent_id ou folder_id null ou ""
    selector = {
      "$or": [
        { "type": { "$eq": "folder" }, "parent_id": { "$in": [null, ""] } },
        { "type": { "$eq": "doc" }, "folder_id": { "$in": [null, ""] } }
      ]
    };
  }

  const response = await fetch("http://localhost:3000/export",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      selector
    }),
  });

  const data = await response.json();

  return data;
};

const uploadFile = async ({ file, folder }) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder_id", folder ? folder : null)

  const response = await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Erreur lors de l'upload");
  return response.json();
};

const useFiles = (slug) => {
  const queryClient = useQueryClient();

  const { data: files, isLoading, error } = useQuery({
    queryKey: ["files", slug],
    queryFn: () => fetchFiles(slug),
    enabled: slug !== undefined,
  });

  const { mutate: addFile } = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });

  return { files, isLoading, error, addFile };
};

export default useFiles;
