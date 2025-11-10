import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchFiles = async () => {
  const response = await fetch("http://localhost:3000/export");
  if (!response.ok) throw new Error("Erreur lors du fetch des fichiers");
  return response.json();
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

const useFiles = () => {
  const queryClient = useQueryClient();

  const { data: files, isLoading, error } = useQuery({
    queryKey: ["files"],
    queryFn: fetchFiles,
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
