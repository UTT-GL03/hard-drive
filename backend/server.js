import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid"; 

const app = express();
const PORT = 3000;

// Pour accepter les requêtes depuis le front
app.use(cors());
app.use(express.json());

// Dossier où on stocke les fichiers uploadés
const uploadDir = path.join(process.cwd(), "files", "documents");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const dataFilePath = path.join(process.cwd(), "files", "sample_data.json");

// Config multer pour enregistrer les fichiers dans /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// --- Endpoint 1: Upload ---
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "Aucun fichier reçu." });

  try {
    // Lire le JSON existant
    let data = { folders: [], documents: [] };
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, "utf8");
      data = JSON.parse(raw);
    }

    // 🧩 Récupération du folder_id envoyé par le front
    let { folder_id } = req.body;
    if (!folder_id || folder_id === "null") {
        folder_id = null;
    }

    // Création du nouveau document
    const newDoc = {
      id: uuidv4(),
      title: path.parse(req.file.originalname).name,
      created_at: new Date().toISOString(),
      size: req.file.size,
      folder_id: folder_id || null, // le folder_id du front ou null
      type: path.extname(req.file.originalname).replace(".", ""),
    };

    // Ajout dans la liste des documents
    data.documents.push(newDoc);

    // Sauvegarde dans sample_data.json
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");

    res.json({
      message: "Fichier uploadé avec succès !",
      file: newDoc,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du JSON :", error);
    res.status(500).json({ error: "Erreur serveur pendant l’upload." });
  }
});


// --- Endpoint 2: Export ---
app.get("/export", (req, res) => {
  const filePath = path.join(process.cwd(), "files", "sample_data.json");

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Fichier sample_data.json introuvable." });
  }

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(data);
    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la lecture du fichier." });
  }
});

app.get("/export/:uid", (req, res) => {
  const { uid } = req.params;

  try {
    // Vérifier que le fichier JSON existe
    if (!fs.existsSync(dataFilePath)) {
      return res.status(404).json({ error: "Aucun fichier de référence trouvé." });
    }

    // Lire et parser sample_data.json
    const raw = fs.readFileSync(dataFilePath, "utf8");
    const data = JSON.parse(raw);

    // Chercher le document correspondant à l'uid
    const doc = data.documents.find((d) => d.id === uid);
    if (!doc) {
      return res.status(404).json({ error: "Document introuvable dans JSON." });
    }

    // Construire le chemin physique vers le fichier
    const fileName = `${doc.title}.${doc.type}`;
    const filePath = path.join(uploadDir, fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Fichier physique introuvable." });
    }

    // Envoyer le fichier pour téléchargement
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors du téléchargement." });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});
