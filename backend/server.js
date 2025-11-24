import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid"; 

const app = express();
const PORT = 3000;

const db_url = 'http://db:5984/hard-drive-db'

// Pour accepter les requêtes depuis le front
app.use(cors());
app.use(express.json());

// Dossier où on stocke les fichiers uploadés
const uploadDir = path.join(process.cwd(), "files", "documents");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Config multer pour enregistrer les fichiers dans /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// --- Endpoint 1: Upload ---
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "Aucun fichier reçu." });

  try {
    // Récupération du folder_id envoyé par le front
    let { folder_id } = req.body;
    if (!folder_id || folder_id === "null") {
        folder_id = null;
    }

    const doc = {
      id: uuidv4(),
      title: path.parse(req.file.originalname).name,
      type: 'doc',
      created_at: new Date().toISOString(),
      size: req.file.size,
      folder_id: folder_id || null, // le folder_id du front ou null
      file_type: path.extname(req.file.originalname).replace(".", ""),
    };

    const response = await fetch(`${db_url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc),
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Erreur CouchDB" });
    }

    const result = await response.json();

    res.json({
      message: "Document enregistré avec succès",
      id: result.id,
      rev: result.rev,
      document: doc,
    });

  } catch (error) {
    console.error("Erreur lors de la mise à jour du JSON :", error);
    res.status(500).json({ error: "Erreur serveur pendant l’upload." });
  }
});


// --- Endpoint 2: Export ---
app.get("/export", async (req, res) => {
  try {
    const dbResponse = await fetch(`${db_url}/_all_docs?include_docs=true`)

    if (!dbResponse.ok) {
      return res.status(500).json({ error: "Erreur API DB." });
    }

    const dbData = await dbResponse.json();

    const folders = dbData.rows.map(({doc}) => doc).filter(({type}) => type === 'folder');
    const documents = dbData.rows.map(({doc}) => doc).filter(({type}) => type === 'doc');
    res.json({folders, documents});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l’appel API." });
  }
});

// --- Endpoint 2: Export specific file---
app.get("/export/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const dbResponse = await fetch(`${db_url}/${uid}`);
    const doc = await dbResponse.json();

    // Construire le chemin physique vers le fichier
    const fileName = `${doc.title}.${doc.file_type}`;
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
