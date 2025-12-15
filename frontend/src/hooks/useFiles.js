import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const fetchFiles = async (slug, page, limit = 10) => {
  const selector = slug
    ? {
        "$or": [
          { "type": { "$eq": "folder" }, "parent_id": { "$eq": slug } },
          { "type": { "$eq": "doc" }, "folder_id": { "$eq": slug } }
        ]
      }
    : {
        "$or": [
          { "type": { "$eq": "folder" }, "parent_id": { "$in": [null, ""] } },
          { "type": { "$eq": "doc" }, "folder_id": { "$in": [null, ""] } }
        ]
      };

  const params = new URLSearchParams({
    selector: JSON.stringify(selector),
    limit: limit.toString(),
    skip: ((page - 1) * limit).toString(),
  });

  const response = await fetch(`http://localhost:3000/export?${params}`);

  if (!response.ok) throw new Error("Erreur lors de la récupération des fichiers");
  const data = await response.json();
  return data;
};

const uploadFile = async ({ file, folder, retention }) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder_id", folder ? folder : null)
  formData.append("retention", retention);

  const response = await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Erreur lors de l'upload");
  return response.json();
};

const deleteFile = async (fileId) => {
  const response = await fetch(`http://localhost:3000/delete/${fileId}`, {
    method: "DELETE",
  });
  
  if (!response.ok) throw new Error("Erreur lors de la suppression");
  return response.json();
}

const useFiles = (slug) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["files", slug, page],
    queryFn: () => fetchFiles(slug, page, limit),
    keepPreviousData: true,
  });

  const { mutate: addFile } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (newDoc) => {
      queryClient.setQueryData(["files", slug, page], oldData => {
        if (!oldData) return { folders: [], documents: [newDoc.document], total: 1 };
        return {
          ...oldData,
          documents: [newDoc.document, ...oldData.documents],
          total: oldData.total + 1,
        };
      });
    },
  });

  const { mutate: removeFile } = useMutation({
    mutationFn: deleteFile,
    onSuccess: (_, fileId) => {
      queryClient.setQueryData(["files", slug, page], oldData => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          documents: oldData.documents.filter(d => d._id !== fileId),
          total: oldData.total - 1,
        };
      });
    },
  });

  const totalPages = data?.total ? Math.ceil(data.total / limit) : 1;

  return { files: data, isLoading, error, page, setPage, totalPages, addFile, removeFile };
};

export default useFiles;
